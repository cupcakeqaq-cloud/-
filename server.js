'use strict';

/**
 * 自介网页 · 本地预览服务 + 本地后台（零依赖，纯 Node.js 内置模块）
 * 功能：
 *   1. 静态文件托管（HTML/CSS/JS/图片/字体/声库 zip）
 *   2. 网站编辑器后台（/admin/ 与 /api/*，实现见 server/admin.js）
 *
 * 启动：node server.js  （端口可用环境变量 PORT 覆盖，默认 3000）
 * 说明：这只是本地预览用的服务器，线上站是 GitHub Pages 纯静态托管。
 */

const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { URL } = require('url');

let admin = null;
try {
  admin = require('./server/admin.js');
} catch (e) {
  console.log('（提示：本地后台没加载成功，只能看静态页 —— ' + e.message + '）');
}

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

  // 不提供任何隐藏文件/目录：.env（后台密码 + GitHub token）、.git 等一律挡住。
  // 后台允许局域网访问，这个口子不堵上等于把 token 发到整个局域网。
  if (decoded.split(/[\\/]/).some((seg) => seg.startsWith('.'))) {
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

  // 后台接口优先（/api/*）
  if (admin && admin.handle(req, res, url)) return;

  // 后台页面（必须重定向到 /admin.html：admin.html 里的 js 用的是相对路径，
  //  如果浏览器地址停在 /admin/，相对路径会变成 /admin/js/*.js 直接 404，页面就成了死表单）
  if (pathname === '/admin' || pathname === '/admin/') {
    res.writeHead(302, { Location: '/admin.html' });
    res.end();
    return;
  }

  if (pathname === '/') {
    serveStatic(req, res, '/index.html');
    return;
  }
  serveStatic(req, res, pathname);
});

/** 列出局域网地址，方便手机/别的电脑打开后台 */
function lanURLs() {
  const out = [];
  const ifaces = os.networkInterfaces();
  Object.keys(ifaces).forEach((name) => {
    (ifaces[name] || []).forEach((a) => {
      if (a.family === 'IPv4' && !a.internal) out.push('http://' + a.address + ':' + PORT + '/admin/');
    });
  });
  return out;
}

server.listen(PORT, HOST, () => {
  console.log('★ 自介网页服务已启动： http://' + (HOST === '0.0.0.0' ? '127.0.0.1' : HOST) + ':' + PORT);
  if (admin) {
    console.log('★ 网站编辑器后台： http://127.0.0.1:' + PORT + '/admin/');
    lanURLs().forEach((u) => console.log('   同一局域网也能开： ' + u));
    if (admin.CFG.ADMIN_PASSWORD) {
      console.log('★ 后台登录密码： ' + admin.CFG.ADMIN_PASSWORD);
      console.log('   想换密码就改项目根目录 .env 里的 ADMIN_PASSWORD，然后重启。');
    } else {
      console.log('★ 注意：.env 里 ADMIN_PASSWORD 是空的，登录不了。');
    }
  }
});
