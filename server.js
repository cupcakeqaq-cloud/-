'use strict';

/**
 * 自介网页 · 本地预览服务（零依赖，纯 Node.js 内置模块）
 * 功能：
 *   1. 静态文件托管（HTML/CSS/JS/图片/字体/声库 zip）
 *
 * 启动：node server.js  （端口可用环境变量 PORT 覆盖，默认 3000）
 * 说明：这只是本地预览用的服务器，线上站是 GitHub Pages 纯静态托管。
 *       留言板是 localStorage 本地存储，不需要后端。
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.bmp': 'image/bmp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.zip': 'application/zip',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
};

// ---- 静态文件 ----
function serveStatic(req, res, pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch (e) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Bad Request');
    return;
  }

  const filePath = path.normalize(path.join(ROOT, decoded));
  // 防目录穿越
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const stat = fs.statSync(filePath);

  res.writeHead(200, {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Content-Length': stat.size,
    'Cache-Control': 'no-cache',
    'Accept-Ranges': 'bytes',
  });

  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
  stream.on('error', () => res.end());
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://' + (req.headers.host || 'localhost'));
  const pathname = url.pathname;

  if (pathname === '/') {
    serveStatic(req, res, '/index.html');
    return;
  }
  serveStatic(req, res, pathname);
});

server.listen(PORT, HOST, () => {
  console.log('★ 自介网页服务已启动： http://' + (HOST === '0.0.0.0' ? '127.0.0.1' : HOST) + ':' + PORT);
});
