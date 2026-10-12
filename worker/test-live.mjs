/* 线上体检：对已经部署好的 Cloudflare Worker 真跑一遍（会写一条测试留言，跑完自己删掉）
   用法：node worker/test-live.mjs
   地址取 .env 的 GB_WORKER_URL（没有就用下面这个默认值），钥匙取 .env 的 GB_TOKEN。 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const env = Object.fromEntries(
  fs.readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n')
    .filter((l) => /^[A-Z_]+=/.test(l))
    .map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()])
);
const BASE = (env.GB_WORKER_URL || 'https://cupcake-gb.cupcakeqaq.workers.dev').replace(/\/+$/, '');
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

const root = await call('/');
ok('探活 GET / 返回 200', root.status === 200, 'status=' + root.status);
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

const imp1 = await call('/api/gb/import', 'POST', { v: 1, comments: [c] }, { 'x-gb-token': TOKEN });
ok('import 打标记（200）', imp1.status === 200, 'status=' + imp1.status + ' ' + imp1.text.slice(0, 120));

const bad = await call('/api/gb/import', 'POST', { v: 1, comments: [] });
ok('import 没钥匙被拒（403）', bad.status === 403, 'status=' + bad.status);

const imp2 = await call('/api/gb/import', 'POST', { v: 1, comments: [] }, { 'x-gb-token': TOKEN });
ok('以文件为准：清空后那条被删', imp2.status === 200 && (imp2.json?.deleted ?? 0) >= 1, imp2.text.slice(0, 120));

const final = await call('/api/gb/list');
ok('清理干净：列表已空', (final.json?.comments || []).length === 0, '剩 ' + (final.json?.comments || []).length + ' 条');

console.log(`\n结果：${pass} 项通过，${fail} 项失败`);
process.exit(fail ? 1 : 0);
