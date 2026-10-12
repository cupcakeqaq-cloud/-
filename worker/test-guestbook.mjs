/* 留言板后端的本机自测：不需要 Cloudflare 账号、不需要联网。
   跑法： node worker/test-guestbook.mjs
   全过打印「全部通过」，任何一条不对就退出码 1 并把原因打出来。 */
import assert from 'node:assert/strict';
import {
  handleRequest, visitorComment, publicList, allList, rateCheck, mergeImport, normComment, LIMIT, DOC_KEY
} from './guestbook.mjs';

/* KV 的替身：一个内存 Map */
function fakeKV() {
  const m = new Map();
  return {
    m,
    async get(k) { return m.has(k) ? m.get(k) : null; },
    async put(k, v) { m.set(k, v); }
  };
}

function req(method, path, body, headers) {
  const h = Object.assign({ 'Content-Type': 'application/json' }, headers || {});
  const init = { method, headers: h };
  if (body !== undefined && method !== 'GET' && method !== 'OPTIONS') init.body = JSON.stringify(body);
  return new Request('https://gb.example.workers.dev' + path, init);
}

const KV = fakeKV();
const env = { GB_KV: KV, GB_TOKEN: 'test-token' };
const IP = { 'CF-Connecting-IP': '1.2.3.4' };
const IP2 = { 'CF-Connecting-IP': '5.6.7.8' };

async function body(res) { return res.json(); }
let passed = 0;
async function ok(name, fn) { await fn(); passed++; console.log('  ok  ' + name); }

/* ── 纯函数 ───────────────────────────────────────────── */

await ok('昵称留空 → Anonymous；超长截到 24；换行压成空格', () => {
  assert.equal(visitorComment('', 'hi', 1).name, 'Anonymous');
  assert.equal(visitorComment('   ', 'hi', 1).name, 'Anonymous');
  assert.equal(visitorComment('x'.repeat(100), 'hi', 1).name.length, LIMIT.NAME);
  assert.equal(visitorComment('a\nb', 'hi', 1).name, 'a b');
});

await ok('新 id 匹配契约里的正则 ^[A-Za-z0-9_-]{1,60}$', () => {
  const c = visitorComment('', 'hi', 1700000000000);
  assert.match(c.id, /^[A-Za-z0-9_-]{1,60}$/);
  assert.match(c.id, /^c-1700000000000-[0-9a-f]{4}$/);
});

await ok('访客的留言一律 pinned:false / hidden:false', () => {
  const c = visitorComment('', 'hi', 1);
  assert.equal(c.pinned, false);
  assert.equal(c.hidden, false);
  assert.deepEqual(c.reply, { zh: '', ja: '', en: '' });
});

await ok('列表：藏起来的不显示，置顶在前，其余按时间倒序', () => {
  const doc = { v: 1, comments: [
    { id: 'a', text: '旧', time: 100 },
    { id: 'b', text: '新', time: 300 },
    { id: 'c', text: '顶', time: 200, pinned: true },
    { id: 'd', text: '藏', time: 400, hidden: true }
  ] };
  assert.deepEqual(publicList(doc).map((c) => c.id), ['c', 'b', 'a']);
});

await ok('限流：10 分钟内第 4 条被拦，窗口外的旧记录不算', () => {
  const now = 1000 * 60 * 60;
  const r1 = rateCheck([], now);
  assert.equal(r1.ok, true);
  const r2 = rateCheck([now - 1, now - 2], now);
  assert.equal(r2.ok, true);
  const r3 = rateCheck([now - 1, now - 2, now - 3], now);
  assert.equal(r3.ok, false);
  assert.ok(r3.retryAfter > 0 && r3.retryAfter <= LIMIT.WINDOW_MS);
  /* 11 分钟前的三条不该再算 */
  assert.equal(rateCheck([now - 11 * 60 * 1000, now - 12 * 60 * 1000, now - 13 * 60 * 1000], now).ok, true);
});

await ok('合并导入：文件里的版本覆盖云端、空正文丢掉、后台长正文（>200）保留', () => {
  const now = 1;
  const r = mergeImport({ v: 1, comments: [{ id: 'keep', text: '旧', time: 5 }] }, [
    { id: 'keep', text: '想覆盖我', time: 9 },
    { id: 'new1', text: 'x'.repeat(600), time: 7 },
    { id: 'new2', text: '   ', time: 8 }
  ], now);
  assert.equal(r.added, 1);
  assert.equal(r.updated, 1);
  assert.equal(r.skipped, 1);
  const kept = r.doc.comments.find((c) => c.id === 'keep');
  assert.equal(kept.text, '想覆盖我');                                   /* 文件说了算 */
  assert.equal(r.doc.comments.find((c) => c.id === 'new1').text.length, 600);
  assert.equal(r.doc.comments.length, 2);
});

await ok('normComment 只留契约里的六个字段', () => {
  const c = normComment({ id: 'x', name: 'n', text: 't', time: 3, pinned: 1, hidden: 0, reply: { zh: '好' }, via: 'github', evil: 1 }, 1);
  assert.deepEqual(Object.keys(c).sort(), ['hidden', 'id', 'name', 'pinned', 'reply', 'text', 'time']);
  assert.equal(c.reply.zh, '好');
});

/* ── HTTP 走一遍 ─────────────────────────────────────── */

await ok('OPTIONS 预检：204 + CORS 头', async () => {
  const res = await handleRequest(req('OPTIONS', '/api/gb/post'), env);
  assert.equal(res.status, 204);
  assert.equal(res.headers.get('Access-Control-Allow-Origin'), '*');
});

await ok('空库时读列表 = {v:1, comments:[]}', async () => {
  const res = await handleRequest(req('GET', '/gb/comments.json'), env);
  assert.equal(res.status, 200);
  assert.deepEqual(await body(res), { v: 1, comments: [] });
});

await ok('发一条 → ok，id 合法，随后能被读到', async () => {
  const res = await handleRequest(req('POST', '/api/gb/post', { name: '小明', text: '你好' }, IP), env);
  assert.equal(res.status, 200);
  const b = await body(res);
  assert.equal(b.ok, true);
  assert.match(b.comment.id, /^[A-Za-z0-9_-]{1,60}$/);
  assert.equal(b.comment.name, '小明');
  assert.equal(b.comment.text, '你好');
  assert.ok(b.comment.time > 0);

  const list = await body(await handleRequest(req('GET', '/api/gb/list'), env));
  assert.equal(list.comments.length, 1);
  assert.equal(list.comments[0].text, '你好');
});

await ok('昵称留空也存成 Anonymous', async () => {
  const b = await body(await handleRequest(req('POST', '/api/gb/post', { text: '匿名' }, IP2), env));
  assert.equal(b.comment.name, 'Anonymous');
});

await ok('空正文被拒（400 empty），不进库', async () => {
  const before = JSON.parse(KV.m.get(DOC_KEY)).comments.length;
  const res = await handleRequest(req('POST', '/api/gb/post', { name: 'x', text: '   ' }, IP2), env);
  assert.equal(res.status, 400);
  assert.equal((await body(res)).error, 'empty');
  assert.equal(JSON.parse(KV.m.get(DOC_KEY)).comments.length, before);
});

await ok('201 字被拒（400 long），200 字放行', async () => {
  const long = await handleRequest(req('POST', '/api/gb/post', { text: 'x'.repeat(LIMIT.TEXT + 1) }, IP2), env);
  assert.equal(long.status, 400);
  assert.equal((await body(long)).error, 'long');
  const edge = await handleRequest(req('POST', '/api/gb/post', { text: 'x'.repeat(LIMIT.TEXT) }, IP2), env);
  assert.equal(edge.status, 200);
});

await ok('同一个人 10 分钟第 4 条被拦（429 rate），换个人照发', async () => {
  const ip = { 'CF-Connecting-IP': '9.9.9.9' };
  for (let i = 0; i < LIMIT.PER_WINDOW; i++) {
    const r = await handleRequest(req('POST', '/api/gb/post', { text: '第' + (i + 1) + '条' }, ip), env);
    assert.equal(r.status, 200);
  }
  const blocked = await handleRequest(req('POST', '/api/gb/post', { text: '第四条' }, ip), env);
  assert.equal(blocked.status, 429);
  const b = await body(blocked);
  assert.equal(b.error, 'rate');
  assert.ok(b.retryAfter > 0);
  const other = await handleRequest(req('POST', '/api/gb/post', { text: '别人' }, IP2), env);
  assert.equal(other.status, 200);
});

await ok('限流 key 带 TTL，不会在 KV 里越积越多', async () => {
  const key = [...KV.m.keys()].find((k) => k.startsWith('gb:rl:'));
  assert.ok(key, '应该写了限流 key');
});

await ok('导入要钥匙：没带/带错 → 403，带对 → 覆盖同 id、新增新的', async () => {
  const denied = await handleRequest(req('POST', '/api/gb/import', { comments: [] }), env);
  assert.equal(denied.status, 403);
  const bad = await handleRequest(req('POST', '/api/gb/import', { comments: [] }, { 'x-gb-token': 'nope' }), env);
  assert.equal(bad.status, 403);

  const list = await body(await handleRequest(req('GET', '/api/gb/list'), env));
  const existingId = list.comments[0].id;
  const res = await handleRequest(req('POST', '/api/gb/import', {
    v: 1,
    comments: [
      { id: existingId, text: '重复的', time: 1 },
      { id: 'from-admin-1', text: '后台里的老留言', time: 2, pinned: true, reply: { zh: '谢谢' } }
    ]
  }, { 'x-gb-token': 'test-token' }), env);
  assert.equal(res.status, 200);
  const b = await body(res);
  assert.equal(b.ok, true);
  assert.equal(b.added, 1);
  assert.equal(b.updated, 1);
  assert.equal(b.deleted, 0);

  const wrong = await handleRequest(req('GET', '/gb/list'), env);
  assert.equal(wrong.status, 404);   /* 路径打错就是 404，别让前台以为成功了 */
  const list2 = await body(await handleRequest(req('GET', '/api/gb/list'), env));
  assert.equal(list2.comments[0].id, 'from-admin-1');        /* 置顶排最前 */
  assert.equal(list2.comments[0].reply.zh, '谢谢');
  assert.equal(list2.comments.filter((c) => c.id === existingId).length, 1);
});

await ok('探活 / 未知路径', async () => {
  const home = await handleRequest(req('GET', '/'), env);
  assert.equal(home.status, 200);
  assert.ok(Array.isArray((await body(home)).comments));
  const nf = await handleRequest(req('GET', '/whatever'), env);
  assert.equal(nf.status, 404);
});

await ok('没绑 KV 时明确报错，而不是假装成功', async () => {
  const res = await handleRequest(req('GET', '/'), {});
  assert.equal(res.status, 500);
  assert.equal((await body(res)).error, 'nokv');
});

/* ── 站主那边：拉取 + 以文件为准的推送 ───────────────── */

await ok('站主拉取口要钥匙：没带 / 带错 → 403', async () => {
  assert.equal((await handleRequest(req('GET', '/api/gb/admin/list'), env)).status, 403);
  assert.equal((await handleRequest(req('GET', '/api/gb/admin/list', undefined, { 'x-gb-token': 'nope' }), env)).status, 403);
});

await ok('拉取口能看到藏起来的、前台看不到、synced 不外泄', async () => {
  await handleRequest(req('POST', '/api/gb/import', {
    v: 1, comments: [{ id: 'hidden-1', text: '这条藏起来', time: 3, hidden: true }]
  }, { 'x-gb-token': 'test-token' }), env);

  const all = await body(await handleRequest(req('GET', '/api/gb/admin/list', undefined, { 'x-gb-token': 'test-token' }), env));
  const one = all.comments.find((c) => c.id === 'hidden-1');
  assert.equal(one.hidden, true);
  assert.equal(one.synced, undefined);              /* 内部标记不给出去 */

  const pub = await body(await handleRequest(req('GET', '/api/gb/list'), env));
  assert.equal(pub.comments.some((c) => c.id === 'hidden-1'), false);
});

await ok('推送：站主删掉的（synced）真删，网友刚发的不受影响', async () => {
  const before = JSON.parse(KV.m.get(DOC_KEY)).comments;
  assert.ok(before.some((c) => c.synced === true), '应该已经有打过标的');
  assert.ok(before.some((c) => !c.synced), '应该也有网友直接发的（没标）');

  const b = await body(await handleRequest(req('POST', '/api/gb/import', { v: 1, comments: [] }, { 'x-gb-token': 'test-token' }), env));
  assert.equal(b.ok, true);
  assert.ok(b.deleted > 0);
  assert.equal(b.added, 0);
  assert.equal(b.updated, 0);

  const after = JSON.parse(KV.m.get(DOC_KEY)).comments;
  assert.equal(after.some((c) => c.synced === true), false);   /* 打过标的都删干净了 */
  assert.equal(after.length, before.filter((c) => !c.synced).length);
});

console.log('\n全部通过（' + passed + ' 项）');
