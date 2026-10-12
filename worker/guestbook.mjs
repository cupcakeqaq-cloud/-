/* ══════════════════════════════════════════════════════════
   留言板后端 —— Cloudflare Pages 函数 + KV（2026-10 起从 Worker 换成 Pages）
   ──────────────────────────────────────────────────────────
   为什么不用 Workers：`*.workers.dev` 这个临时域名在国内被 DNS 污染 + TLS 阻断
   （站主这台机器实测：解析到假 IP，强行连真实 IP 也被 reset），而 `*.pages.dev` 实测能连。
   部署形态：Cloudflare Pages 项目 `cupcake-gb-api`，入口 worker/functions/[[path]].js，
   KV 还是原来那个 namespace，数据不用搬。
   站主拍板：匿名发言（自己填昵称，留空 = Anonymous）、直发不审核、
   访客自己删不掉（只能站主在后台清理）、正文 200 字以内、
   同一个人（同 IP）10 分钟最多 3 条。

   接口路径刻意和静态站保持一致，前台只换基址、其余一个字不用改：
     GET  /                    （探活：看到 {"v":1,...} 就是起来了）
     GET  /gb/comments.json    读留言（= 下面这个的别名，和 Pages 上的路径一致）
     GET  /api/gb/list         读留言（藏起来的读者看不到）
     GET  /api/gb/admin/list   站主「拉取」用：含藏起来的全部，要请求头 x-gb-token
     POST /api/gb/post         {name,text} → 追加一条，返回 {ok:true,comment}
     POST /api/gb/import       {v:1,comments:[…]} + 请求头 x-gb-token → 以站主那份为准合并
                               （他在后台改的覆盖云端；网友新发的留着）
     OPTIONS *                 CORS 预检

   数据结构完全按 HANDOFF.md 第 13.2 节的契约：
     {v:1, comments:[{id,name,text,time,pinned,hidden,reply:{zh,ja,en}}]}

   本文件是标准 ES module，既能被 Pages 函数 import 上线，也能被 node 直接 import 做本机自测
   （worker/test-guestbook.mjs 传一个假 KV 进来）；部署步骤见 HANDOFF.md 第十五节。
   ══════════════════════════════════════════════════════════ */

export const LIMIT = {
  NAME: 24,            /* 昵称：和前台 #gbName 的 maxlength 一致 */
  TEXT: 200,           /* 访客正文：站主要求 200 字以内 */
  IMPORTED: 2000,      /* 从站主后台搬进来的留言：按 13.2 契约放宽到 2000，站主后台不受影响 */
  PER_WINDOW: 3,       /* 同一 IP 每个时间窗最多几条 */
  WINDOW_MS: 10 * 60 * 1000,
  MAX: 2000,           /* 库里最多留多少条 */
  REPLY: 2000          /* 站主三语回复每语言的上限 */
};

export const DOC_KEY = 'gb:comments';
const rlKey = (ip) => 'gb:rl:' + ip;

/* 留言板本来就人人可发，限制 Origin 挡不住脚本，索性全开（不涉及 cookie） */
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-gb-token',
  'Access-Control-Max-Age': '86400'
};

/* ────────────── 纯函数：本机可测，不碰网络 ────────────── */

function str(v, max) { return String(v == null ? '' : v).slice(0, max); }

/* 三语回复：形状和 server/admin.js 的 tri() 保持一致，前台自己挑一份显示 */
export function tri(reply) {
  return {
    zh: str(reply && reply.zh, LIMIT.REPLY),
    ja: str(reply && reply.ja, LIMIT.REPLY),
    en: str(reply && reply.en, LIMIT.REPLY)
  };
}

/* 新留言的 id：和 server/admin.js:321 的重写格式一致（c-<时间戳>-<4位hex>） */
export function newId(now) {
  const b = new Uint8Array(2);
  crypto.getRandomValues(b);
  let hex = '';
  for (let i = 0; i < b.length; i++) hex += b[i].toString(16).padStart(2, '0');
  return 'c-' + (now || Date.now()) + '-' + hex;
}

/* 把任意来源的一条留言规范化成契约里的六个字段，其它字段一律丢掉（照抄 normComments 的思路） */
export function normComment(raw, now, maxText) {
  if (!raw || typeof raw !== 'object') return null;
  const id = /^[A-Za-z0-9_-]{1,60}$/.test(String(raw.id || '')) ? String(raw.id) : newId(now);
  return {
    id: id,
    name: str(raw.name, LIMIT.NAME),
    text: str(raw.text, maxText || LIMIT.IMPORTED).replace(/\r/g, '').trim(),
    time: Number(raw.time) > 0 ? Number(raw.time) : now,
    pinned: !!raw.pinned,
    hidden: !!raw.hidden,
    reply: tri(raw.reply)
  };
}

/* 访客发的那条：昵称/正文/时间由服务端定，pinned/hidden 一律 false（访客不许插队、不许自隐） */
export function visitorComment(name, text, now) {
  const nick = str(name, LIMIT.NAME).replace(/\s+/g, ' ').trim() || 'Anonymous';
  return {
    id: newId(now),
    name: nick,
    text: String(text).replace(/\r/g, '').trim(),
    time: now,
    pinned: false,
    hidden: false,
    reply: { zh: '', ja: '', en: '' }
  };
}

/* 排序：置顶的在前 → 其余按时间倒序 */
function sortAll(doc) {
  const arr = (doc && Array.isArray(doc.comments) ? doc.comments : []).filter((c) => c && c.id);
  return arr.sort((a, b) => ((b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)) || ((b.time || 0) - (a.time || 0)));
}

/* 只把契约里的六个字段给出去：synced 这种内部标记绝不外泄 */
function shape(c) {
  return {
    id: c.id, name: c.name, text: c.text, time: c.time,
    pinned: !!c.pinned, hidden: !!c.hidden, reply: tri(c.reply)
  };
}

/* 前台要的列表：藏起来的不给 */
export function publicList(doc) {
  return sortAll(doc).filter((c) => !c.hidden).map(shape);
}

/* 站主「拉取」用：藏起来的也要（拉回后台他才改得动） */
export function allList(doc) {
  return sortAll(doc).map(shape);
}

/* 限流判定。now 由调用方给，方便本机直接把时钟推着测 */
export function rateCheck(times, now) {
  const keep = (Array.isArray(times) ? times : []).filter((t) => typeof t === 'number' && now - t < LIMIT.WINDOW_MS);
  if (keep.length >= LIMIT.PER_WINDOW) {
    return { ok: false, times: keep, retryAfter: Math.max(1000, LIMIT.WINDOW_MS - (now - Math.min.apply(null, keep))) };
  }
  return { ok: true, times: keep.concat([now]), retryAfter: 0 };
}

/* 库满 2000 条时只留最新的（和 gb/comments.json 的上限一致） */
function cap(list) {
  if (list.length <= LIMIT.MAX) return list;
  return list.slice().sort((a, b) => (b.time || 0) - (a.time || 0)).slice(0, LIMIT.MAX);
}

/* 合并导入 —— 站主那份 gb/comments.json 说了算：
     · 两边都有：用文件里的版本覆盖云端（他在后台改的正文/置顶/隐藏/回复都会生效）
     · 只有文件里有：新增
     · 云端有、文件里没有、但打着 synced:true：他在后台把它删了 → 真删
     · 云端有、文件里没有、也没有 synced 标记：网友刚发的 → 留着，等下次「拉取」并回后台
   空正文一律丢掉（和 server/admin.js 的 normComments 一个规矩） */
export function mergeImport(doc, incoming, now) {
  const list = (doc && Array.isArray(doc.comments) ? doc.comments : []).slice();
  const byId = new Map(list.filter((c) => c && c.id).map((c) => [c.id, c]));
  const keep = new Set();
  let added = 0, updated = 0, deleted = 0, skipped = 0;
  for (const raw of (Array.isArray(incoming) ? incoming : [])) {
    const c = normComment(raw, now, LIMIT.IMPORTED);
    if (!c || !c.text) { skipped++; continue; }
    if (byId.has(c.id)) updated++; else added++;
    keep.add(c.id);
    byId.set(c.id, Object.assign(c, { synced: true }));
  }
  const next = [];
  byId.forEach((c) => {
    if (!keep.has(c.id) && c.synced === true) { deleted++; return; }
    next.push(c);
  });
  return { doc: { v: 1, comments: cap(next) }, added: added, updated: updated, deleted: deleted, skipped: skipped };
}

/* ────────────── KV 与路由 ────────────── */

async function readDoc(kv) {
  try {
    const j = JSON.parse((await kv.get(DOC_KEY)) || '');
    return j && Array.isArray(j.comments) ? { v: 1, comments: j.comments } : { v: 1, comments: [] };
  } catch (e) {
    return { v: 1, comments: [] };
  }
}

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: Object.assign({ 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }, CORS)
  });
}

async function postComment(request, env) {
  let body;
  try { body = await request.json(); } catch (e) { return json({ ok: false, error: 'bad' }, 400); }

  const now = Date.now();
  const text = String((body && body.text) == null ? '' : body.text).replace(/\r/g, '').trim();
  if (!text) return json({ ok: false, error: 'empty' }, 400);
  if (text.length > LIMIT.TEXT) return json({ ok: false, error: 'long', max: LIMIT.TEXT }, 400);

  const ip = request.headers.get('CF-Connecting-IP') || request.headers.get('x-forwarded-for') || '0.0.0.0';
  let times = [];
  try { times = JSON.parse((await env.GB_KV.get(rlKey(ip))) || '[]'); } catch (e) { times = []; }
  const rl = rateCheck(times, now);
  if (!rl.ok) {
    return json({ ok: false, error: 'rate', retryAfter: rl.retryAfter, per: LIMIT.PER_WINDOW, windowMs: LIMIT.WINDOW_MS }, 429);
  }

  const doc = await readDoc(env.GB_KV);
  const c = visitorComment(body && body.name, text, now);
  doc.comments.push(c);
  /* 先落留言、再记限流：宁可少记一次限流，也不能把留言弄丢。
     ponytail: KV 是最终一致的「读-改-写」，同一秒内的两条并发留言可能丢一条；
     个人站量级可以接受，真要严格就换 Durable Object（每天几千条以上再说） */
  await env.GB_KV.put(DOC_KEY, JSON.stringify({ v: 1, comments: cap(doc.comments) }));
  try {
    /* KV 免费额度限「同一个 key 每秒 1 次写」：同一个人连点两下可能撞上，撞了就不记 */
    await env.GB_KV.put(rlKey(ip), JSON.stringify(rl.times), { expirationTtl: 600 });
  } catch (e) {}

  return json({ ok: true, comment: c });
}

/* 站主专属接口的看门人：没配钥匙 → 500（别装作能用），钥匙不对 → 403 */
function auth(request, env) {
  if (!env.GB_TOKEN) return json({ ok: false, error: 'notoken' }, 500);
  if ((request.headers.get('x-gb-token') || '') !== env.GB_TOKEN) return json({ ok: false, error: 'denied' }, 403);
  return null;
}

async function importComments(request, env) {
  const no = auth(request, env);
  if (no) return no;

  let body;
  try { body = await request.json(); } catch (e) { return json({ ok: false, error: 'bad' }, 400); }

  const doc = await readDoc(env.GB_KV);
  const r = mergeImport(doc, body && body.comments, Date.now());
  await env.GB_KV.put(DOC_KEY, JSON.stringify(r.doc));
  return json({
    ok: true, added: r.added, updated: r.updated, deleted: r.deleted,
    skipped: r.skipped, total: r.doc.comments.length
  });
}

export async function handleRequest(request, env) {
  const path = (new URL(request.url).pathname.replace(/\/+$/, '') || '/');
  if ((request.method || 'GET').toUpperCase() === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
  if (!env || !env.GB_KV) return json({ ok: false, error: 'nokv' }, 500);

  if (request.method === 'GET' && path === '/api/gb/admin/list') {
    const no = auth(request, env);
    if (no) return no;
    return json({ v: 1, comments: allList(await readDoc(env.GB_KV)) });
  }
  if (request.method === 'GET' && (path === '/' || path === '/gb/comments.json' || path === '/api/gb/list')) {
    return json({ v: 1, comments: publicList(await readDoc(env.GB_KV)) });
  }
  if (request.method === 'POST' && path === '/api/gb/post') return postComment(request, env);
  if (request.method === 'POST' && path === '/api/gb/import') return importComments(request, env);
  return json({ ok: false, error: 'notfound' }, 404);
}

/* Pages 函数的入口（worker/functions/[[path]].js 负责把 ctx 拆成 request / env） */
export const onRequest = (ctx) => handleRequest(ctx.request, ctx.env);
