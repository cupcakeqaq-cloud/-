/* 线上体检：对已经部署好的留言板后端真跑一遍（会写一条测试留言，跑完自己删掉）
   用法：node worker/test-live.mjs
   地址取 .env 的 GB_API_URL（没有就用下面这个默认值），钥匙取 .env 的 GB_TOKEN。 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const env = Object.fromEntries(
  fs.readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n')
    .filter((l) => /^[A-Z_]+=/.test(l))
    .map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()])
);
const BASE = (env.GB_API_URL || 'https://cupcake-gb-api.pages.dev').replace(/\/+$/, '');
const TOKEN = env.GB_TOKEN || '';

let pass = 0, fail = 0;
const ok = (label, cond, extra = '') => {
  if (cond) { pass++; console.log('  ✓ ' + label); }
  else { fail++; console.log('  ✗ ' + label + (extra ? '  → ' + extra : '')); }
};

const call = async (url, method = 'GET', body, headers) => {
  const r = await fetch(BASE + url, {
    method,
    headers: { ...(body ? { 'Content-Type': 'application/json' } : {}), ...(headers || {}) },
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await r.text();
  let json = null;
  try { json = JSON.parse(text); } catch { /* 非 JSON 就留 null */ }
  return { status: r.status, json, text };
};

console.log('体检地址：' + BASE);
console.log('（发一条测试留言 → 检查 → 删掉；10 分钟内重复跑可能撞限流）\n');

const root = await call('/api/gb/list');
ok('探活 GET /api/gb/list 返回 200', root.status === 200, 'status=' + root.status);
ok('内容是 {v:1,comments:[…]}', root.json?.v === 1 && Array.isArray(root.json?.comments), root.text.slice(0, 120));

const empty = await call('/api/gb/post', 'POST', { name: '', text: '' });
ok('空正文被拒（400）', empty.status === 400, 'status=' + empty.status);

const tooLong = await call('/api/gb/post', 'POST', { name: '', text: 'x'.repeat(201) });
ok('201 字被拒（400）', tooLong.status === 400, 'status=' + tooLong.status);

const posted = await call('/api/gb/post', 'POST', { name: '', text: 'cli-test-1' });
ok('正常发一条（200）', posted.status === 200, 'status=' + posted.status + ' ' + posted.text.slice(0, 120));
const c = posted.json?.comment;
ok('昵称留空自动变成 Anonymous', c?.name === 'Anonymous', 'name=' + c?.name);
ok('id 形如 c-<时间戳>-<4位hex>', /^c-\d+-[0-9a-f]{4}$/.test(c?.id || ''), 'id=' + c?.id);

const list = await call('/api/gb/list');
ok('公开列表里能看到刚发的那条', (list.json?.comments || []).some((x) => x.id === c?.id));

const noTok = await call('/api/gb/admin/list');
ok('admin/list 没钥匙被拒（403）', noTok.status === 403, 'status=' + noTok.status);

const withTok = await call('/api/gb/admin/list', 'GET', undefined, { 'x-gb-token': TOKEN });
ok('admin/list 带钥匙返回 200', withTok.status === 200, 'status=' + withTok.status);
ok('admin/list 里能看到那条', (withTok.json?.comments || []).some((x) => x.id === c?.id));

/* 体检自己发的那条最后要删掉，但**绝不能踩到站主真实的留言**：
   先把云端现有的（不含测试那条）快照下来，测完整套流程后原样推回去。 */
const others = (withTok.json?.comments || []).filter((x) => x.id !== c?.id);
console.log('  · 站主云端现有 ' + others.length + ' 条真实留言，本次体检会原样保留');

const imp1 = await call('/api/gb/import', 'POST', { v: 1, comments: [c].concat(others) }, { 'x-gb-token': TOKEN });
ok('import 打标记（200）', imp1.status === 200, 'status=' + imp1.status + ' ' + imp1.text.slice(0, 120));

const bad = await call('/api/gb/import', 'POST', { v: 1, comments: [] });
ok('import 没钥匙被拒（403）', bad.status === 403, 'status=' + bad.status);

/* 站主 2026-10 报的 bug 就是这条：网友发的 →「拉取」（= 上面 imp1 那次打标记）→ 后台删掉 → 再「推送」。
   推送时云端必须真删，不能当成「网友刚发的」留下来。 */
const imp2 = await call('/api/gb/import', 'POST', { v: 1, comments: others }, { 'x-gb-token': TOKEN });
ok('站主流程：拉取打标记 → 后台删 → 推送 → 云端真删了', imp2.status === 200 && (imp2.json?.deleted ?? 0) >= 1, imp2.text.slice(0, 120));

const after = await call('/api/gb/admin/list', 'GET', undefined, { 'x-gb-token': TOKEN });
const left = after.json?.comments || [];
ok('测试那条已经不在云端了', !left.some((x) => x.id === c?.id));
ok('站主的留言一条没少（' + others.length + ' 条）', others.every((o) => left.some((x) => x.id === o.id)), '云端现在 ' + left.length + ' 条');

/* 前台拼地址的方式也要对一遍：js/config.js 里填的地址 + 'gb/comments.json' 必须真能打开。
   这里故意照抄 js/guestbook.js 的收尾斜杠逻辑 —— 以前就踩过「填了网址但不生效」这个坑。 */
const cfg = fs.readFileSync(path.join(ROOT, 'js', 'config.js'), 'utf8');
const m = cfg.match(/window\.DANAMKU_API\s*=\s*'([^']*)'/);
const front = (m ? m[1] : '').replace(/\/+$/, '');
if (!front) {
  ok('前台地址：留空 = 只读同源那份（不算失败）', true);
} else {
  const r = await fetch(front + '/gb/comments.json', { cache: 'no-store' });
  const j = await r.json().catch(() => null);
  ok('前台地址拼出来能打开（' + front + '/gb/comments.json）', r.status === 200 && j?.v === 1, 'status=' + r.status);
}

console.log(`\n结果：${pass} 项通过，${fail} 项失败`);
process.exit(fail ? 1 : 0);
