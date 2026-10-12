/* 本机试跑留言板：不起 Cloudflare、不要账号，就能把「发 + 读」整条链路走通。
   跑法： 双击根目录的「本机试跑留言板.bat」，或 node worker/dev-server.mjs
   然后浏览器打开 http://127.0.0.1:8787/

   它干两件事：
     1. 把仓库当前目录当静态站发出去（index.html / js / css / gb 都在里面）；
     2. 把 /api/gb/* 和 /gb/comments.json 交给 worker/guestbook.mjs 处理 —— 和线上跑的
        是同一份代码，只是 KV 换成了本地文件 worker/.dev-kv.json（已 gitignore）。

   因为整站同源，js/config.js 里的 DANMAKU_API 保持空串就行，什么都不用改。 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { handleRequest } from './guestbook.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const KVF = path.join(import.meta.dirname, '.dev-kv.json');
const PORT = 8787;

/* KV 的替身：一个 JSON 文件，关掉再开数据还在，方便反复试 */
function loadKV() {
  try { return JSON.parse(fs.readFileSync(KVF, 'utf8')); } catch (e) { return {}; }
}
const KV = {
  async get(k) { const m = loadKV(); return Object.prototype.hasOwnProperty.call(m, k) ? m[k] : null; },
  async put(k, v) { const m = loadKV(); m[k] = v; fs.writeFileSync(KVF, JSON.stringify(m, null, 2), 'utf8'); }
};

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.wav': 'audio/wav', '.mp3': 'audio/mpeg',
  '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.md': 'text/markdown; charset=utf-8'
};

const isApi = (p) => p === '/gb/comments.json' || p.startsWith('/api/');

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1:' + PORT);

  if (isApi(url.pathname)) {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const raw = Buffer.concat(chunks);
    const init = { method: req.method, headers: req.headers };
    if (raw.length && req.method !== 'GET' && req.method !== 'HEAD') init.body = raw;
    const out = await handleRequest(new Request(url, init), { GB_KV: KV, GB_TOKEN: 'dev-token' });
    res.writeHead(out.status, Object.fromEntries(out.headers));
    res.end(Buffer.from(await out.arrayBuffer()));
    return;
  }

  let file = path.join(ROOT, decodeURIComponent(url.pathname));
  if (url.pathname === '/' || url.pathname === '') file = path.join(ROOT, 'index.html');
  if (!file.startsWith(ROOT)) { res.writeHead(403); res.end('403'); return; }   /* 防目录穿越 */
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(buf);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('留言板本机试跑已启动： http://127.0.0.1:' + PORT + '/');
  console.log('（试跑数据存在 worker/.dev-kv.json，不动你的 gb/comments.json；Ctrl+C 或关窗口停掉）');
});
