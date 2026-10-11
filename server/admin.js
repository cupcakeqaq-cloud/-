'use strict';

/**
 * 自介网页 · 本地后台（网站编辑器）服务端
 * 零依赖，只用 Node.js 内置模块。由根目录 server.js 挂载：
 *     const admin = require('./server/admin.js');  admin.handle(req, res, url)
 *
 * 能干什么：
 *   - 改文案（三语）、改委托页例图/开放状态、改资源页下载项、管留言
 *   - 上传小文件到 uploads/、大文件到 GitHub Releases
 *   - 一键 git add/commit/push（走 GitHub Pages 自动更新）
 *
 * 配置在根目录 .env（第一次启动会自动生成一份并打印密码）：
 *   ADMIN_PASSWORD / GITHUB_TOKEN / GITHUB_REPO / GIT_BRANCH / RELEASE_TAG / GIT_PATH / SESSION_SECRET
 *
 * 安全边界：密码 + HttpOnly 会话 Cookie（自己签的 HMAC），登录失败 5 次锁 15 分钟；
 *          密码与 token 只在 .env（已 gitignore），不进仓库、不进浏览器。
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const https = require('https');
const { execFile } = require('child_process');

const ROOT = path.join(__dirname, '..');
const ENV_FILE = path.join(ROOT, '.env');
const ENV_EXAMPLE = path.join(ROOT, '.env.example');
const CONTENT_JS = path.join(ROOT, 'js', 'content.js');
const GB_JSON = path.join(ROOT, 'gb', 'comments.json');
const UPLOAD_DIR = path.join(ROOT, 'uploads');
const PICTURE_DIR = path.join(ROOT, 'picture');

const SESSION_MS = 12 * 60 * 60 * 1000;   // 会话 12 小时
const LOCK_MS = 15 * 60 * 1000;           // 密码错 5 次锁 15 分钟
const LOCK_AFTER = 5;

const IMG_EXT = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
const FILE_EXT = ['.zip', '.7z', '.rar', '.tar', '.gz', '.pdf', '.txt', '.mp3', '.wav', '.ogg'];
const MAX_IMG = 30 * 1024 * 1024;
const MAX_SMALL = 100 * 1024 * 1024;
const MAX_JSON = 4 * 1024 * 1024;

// ───────────────────────── .env ─────────────────────────

function parseEnv(text) {
  const out = {};
  String(text).split(/\r?\n/).forEach(function (line) {
    const m = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(line);
    if (!m) return;
    let v = m[2].trim();
    if ((v[0] === '"' && v[v.length - 1] === '"') || (v[0] === "'" && v[v.length - 1] === "'")) {
      v = v.slice(1, -1);
    }
    out[m[1]] = v;
  });
  return out;
}

function randPw() {
  const abc = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  const b = crypto.randomBytes(16);
  for (let i = 0; i < 16; i++) s += abc[b[i] % abc.length];
  return s;
}

/** 读 .env；没有就从 .env.example 生成一份（随机密码 + 随机会话密钥） */
function loadEnv() {
  if (!fs.existsSync(ENV_FILE)) {
    let tpl = '';
    try { tpl = fs.readFileSync(ENV_EXAMPLE, 'utf8'); } catch (e) { tpl = 'ADMIN_PASSWORD=\nSESSION_SECRET=\nGITHUB_TOKEN=\n'; }
    const pw = randPw();
    tpl = tpl.replace(/^ADMIN_PASSWORD=.*$/m, 'ADMIN_PASSWORD=' + pw);
    tpl = tpl.replace(/^SESSION_SECRET=.*$/m, 'SESSION_SECRET=' + crypto.randomBytes(32).toString('hex'));
    fs.writeFileSync(ENV_FILE, tpl, 'utf8');
    console.log('★ 已生成 ' + ENV_FILE);
    console.log('★ 后台登录密码：' + pw + '   （想改就编辑 .env 里的 ADMIN_PASSWORD）');
  }
  const file = parseEnv(fs.readFileSync(ENV_FILE, 'utf8'));
  const cfg = {
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || file.ADMIN_PASSWORD || '',
    GITHUB_TOKEN: process.env.GITHUB_TOKEN || file.GITHUB_TOKEN || '',
    GITHUB_REPO: process.env.GITHUB_REPO || file.GITHUB_REPO || 'cupcakeqaq-cloud/CupCakeQAQ-site',
    GIT_BRANCH: process.env.GIT_BRANCH || file.GIT_BRANCH || 'main',
    RELEASE_TAG: process.env.RELEASE_TAG || file.RELEASE_TAG || 'assets',
    GIT_PATH: process.env.GIT_PATH || file.GIT_PATH || 'git',
    SESSION_SECRET: process.env.SESSION_SECRET || file.SESSION_SECRET || '',
  };
  if (!cfg.SESSION_SECRET) {
    cfg.SESSION_SECRET = crypto.randomBytes(32).toString('hex');
    fs.appendFileSync(ENV_FILE, '\nSESSION_SECRET=' + cfg.SESSION_SECRET + '\n', 'utf8');
  }
  return cfg;
}

const CFG = loadEnv();

// ───────────────────────── 鉴权 ─────────────────────────

const sessions = new Map();   // token -> 过期时间戳
const fails = new Map();      // ip -> { n, until }

function hashPw(pw) {
  return crypto.scryptSync(String(pw), 'cupcake-admin-salt', 32);
}
function pwOK(input) {
  if (!CFG.ADMIN_PASSWORD) return false;
  const a = hashPw(input);
  const b = hashPw(CFG.ADMIN_PASSWORD);
  return crypto.timingSafeEqual(a, b);
}
function clientIP(req) {
  return (req.socket && req.socket.remoteAddress) || '?';
}
function locked(ip) {
  const f = fails.get(ip);
  if (!f) return 0;
  if (f.until > Date.now()) return f.until - Date.now();
  return 0;
}
function noteFail(ip) {
  const f = fails.get(ip) || { n: 0, until: 0 };
  f.n += 1;
  if (f.n >= LOCK_AFTER) { f.until = Date.now() + LOCK_MS; f.n = 0; }
  fails.set(ip, f);
}
function cookies(req) {
  const out = {};
  String(req.headers.cookie || '').split(';').forEach(function (p) {
    const i = p.indexOf('=');
    if (i > 0) out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim());
  });
  return out;
}
function authed(req) {
  const t = cookies(req).cupcake_admin;
  if (!t) return false;
  const exp = sessions.get(t);
  if (!exp) return false;
  if (exp < Date.now()) { sessions.delete(t); return false; }
  return true;
}
function newSession(res) {
  const t = crypto.randomBytes(24).toString('hex');
  sessions.set(t, Date.now() + SESSION_MS);
  res.setHeader('Set-Cookie',
    'cupcake_admin=' + t + '; Path=/; Max-Age=' + Math.floor(SESSION_MS / 1000) + '; HttpOnly; SameSite=Lax');
  return t;
}

// ───────────────────────── 小工具 ─────────────────────────

function json(res, code, obj) {
  const body = Buffer.from(JSON.stringify(obj), 'utf8');
  res.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': body.length,
    'Cache-Control': 'no-store',
  });
  res.end(body);
}
function fail(res, code, msg) { json(res, code, { ok: false, error: msg }); }
function str(v, max) { return typeof v === 'string' ? v.slice(0, max || 4000) : ''; }
function tri(v, max) {
  const o = {};
  if (v && typeof v === 'object') {
    ['zh', 'ja', 'en'].forEach(function (l) { if (typeof v[l] === 'string') o[l] = v[l].slice(0, max || 4000); });
  }
  return o;
}
function readBody(req, limit) {
  return new Promise(function (resolve, reject) {
    const chunks = [];
    let n = 0;
    req.on('data', function (c) {
      n += c.length;
      if (n > limit) { reject(new Error('内容过大')); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', function () { resolve(Buffer.concat(chunks)); });
    req.on('error', reject);
  });
}
async function readJson(req) {
  const buf = await readBody(req, MAX_JSON);
  if (!buf.length) return {};
  return JSON.parse(buf.toString('utf8'));
}
function listDir(dir) {
  try {
    return fs.readdirSync(dir).filter(function (f) {
      return fs.statSync(path.join(dir, f)).isFile();
    });
  } catch (e) { return []; }
}
function asciiName(orig, allowExt) {
  const ext = path.extname(String(orig || '')).toLowerCase();
  if (allowExt.indexOf(ext) === -1) throw new Error('不允许的文件类型：' + (ext || '（没有扩展名）'));
  let base = path.basename(String(orig || ''), ext).replace(/[^A-Za-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);
  if (!base) base = 'file';
  const d = new Date();
  const pad = function (n) { return (n < 10 ? '0' : '') + n; };
  const stamp = '' + d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate());
  return stamp + '-' + base + '-' + crypto.randomBytes(3).toString('hex') + ext;
}

// ───────────────────────── 内容读写 ─────────────────────────

function readContent() {
  try {
    const t = fs.readFileSync(CONTENT_JS, 'utf8');
    const at = t.indexOf('window.CONTENT');
    const eq = t.indexOf('=', at);
    const s = t.slice(eq + 1).trim().replace(/;\s*$/, '');
    return JSON.parse(s);
  } catch (e) {
    return null;
  }
}

/** 校验 + 收敛成固定形状（多余字段一律丢掉，防手改后写坏前台） */
function normContent(c) {
  if (!c || typeof c !== 'object') throw new Error('内容格式不对');
  const out = { i18n: {}, commission: { status: 'open', cards: [] }, resources: { items: [] } };

  if (c.i18n && typeof c.i18n === 'object') {
    Object.keys(c.i18n).forEach(function (k) {
      if (!/^[A-Za-z0-9_]{1,60}$/.test(k)) return;
      const e = tri(c.i18n[k]);
      if (Object.keys(e).length) out.i18n[k] = e;
    });
  }

  const st = c.commission && c.commission.status;
  out.commission.status = (st === 'paused' || st === 'closed') ? st : 'open';

  const cards = (c.commission && c.commission.cards) || [];
  out.commission.cards = [0, 1, 2, 3].map(function (i) {
    const card = cards[i] || {};
    const shots = Array.isArray(card.shots) ? card.shots : [];
    return {
      shots: shots.filter(function (s) { return typeof s === 'string' && s.trim(); }).slice(0, 6),
    };
  });

  const items = (c.resources && c.resources.items) || [];
  out.resources.items = items.slice(0, 20).map(function (it) {
    if (!it || typeof it !== 'object') return null;
    return {
      icon: str(it.icon, 300) || 'assets/winxp/windowsIcons/846(32x32).png',
      name: tri(it.name),
      size: tri(it.size),
      href: str(it.href, 600),
    };
  }).filter(function (it) {
    return it && (it.href || it.name.zh || it.name.en || it.name.ja);
  });

  return out;
}

function writeContent(obj) {
  const old = fs.existsSync(CONTENT_JS) ? fs.readFileSync(CONTENT_JS, 'utf8') : '';
  const at = old.indexOf('window.CONTENT');
  const head = at > 0 ? old.slice(0, at) : '';
  const body = head + 'window.CONTENT = ' + JSON.stringify(obj, null, 2) + ';\n';
  fs.writeFileSync(CONTENT_JS, body, 'utf8');
}

function readComments() {
  try {
    const j = JSON.parse(fs.readFileSync(GB_JSON, 'utf8'));
    return Array.isArray(j.comments) ? j : { v: 1, comments: [] };
  } catch (e) {
    return { v: 1, comments: [] };
  }
}

function normComments(list) {
  if (!Array.isArray(list)) throw new Error('留言格式不对');
  return list.slice(0, 2000).map(function (c) {
    if (!c || typeof c !== 'object') return null;
    const id = /^[A-Za-z0-9_-]{1,60}$/.test(String(c.id || '')) ? String(c.id) : 'c-' + Date.now() + '-' + crypto.randomBytes(2).toString('hex');
    return {
      id: id,
      name: str(c.name, 60),
      text: str(c.text, 2000),
      time: Number(c.time) > 0 ? Number(c.time) : Date.now(),
      pinned: !!c.pinned,
      hidden: !!c.hidden,
      reply: tri(c.reply),
    };
  }).filter(function (c) { return c && c.text; });
}

function writeComments(doc) {
  fs.mkdirSync(path.dirname(GB_JSON), { recursive: true });
  fs.writeFileSync(GB_JSON, JSON.stringify(doc, null, 2) + '\n', 'utf8');
}

// ───────────────────────── git ─────────────────────────

function git(args) {
  return new Promise(function (resolve) {
    try {
      execFile(CFG.GIT_PATH, args, { cwd: ROOT, maxBuffer: 16 * 1024 * 1024, windowsHide: true, encoding: 'utf8' },
        function (err, stdout, stderr) {
          resolve({ ok: !err, out: String(stdout || ''), err: String(stderr || '') + (err && !stderr ? String(err.message) : '') });
        });
    } catch (e) {
      // execFile 在 spawn 失败时会直接抛（比如 GIT_PATH 写错、被系统策略拦住），别让整个后台跟着挂
      resolve({ ok: false, out: '', err: '调用 git 失败：' + (e.message || e) });
    }
  });
}

async function gitSummary() {
  const r = await git(['status', '--porcelain']);
  if (!r.ok) return { ok: false, error: (r.err || '').trim(), changed: [] };
  const changed = r.out.split(/\r?\n/).filter(Boolean);
  return { ok: true, changed: changed };
}

// ───────────────────────── GitHub（大文件 Releases） ─────────────────────────

function ghHeaders(extra) {
  return Object.assign({
    'Authorization': 'Bearer ' + CFG.GITHUB_TOKEN,
    'User-Agent': 'cupcake-admin',
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }, extra || {});
}
function httpsJson(opts, body) {
  return new Promise(function (resolve, reject) {
    const r = https.request(opts, function (res) {
      const chunks = [];
      res.on('data', function (c) { chunks.push(c); });
      res.on('end', function () {
        const txt = Buffer.concat(chunks).toString('utf8');
        let j = null;
        try { j = JSON.parse(txt); } catch (e) {}
        resolve({ status: res.statusCode, json: j, text: txt });
      });
    });
    r.on('error', reject);
    if (body) r.write(body);
    r.end();
  });
}
async function gh(method, apiPath, body) {
  const payload = body ? Buffer.from(JSON.stringify(body), 'utf8') : null;
  const res = await httpsJson({
    method: method,
    hostname: 'api.github.com',
    path: apiPath,
    headers: ghHeaders(payload ? { 'Content-Type': 'application/json', 'Content-Length': payload.length } : {}),
  }, payload);
  return res;
}
async function ensureRelease() {
  const get = await gh('GET', '/repos/' + CFG.GITHUB_REPO + '/releases/tags/' + encodeURIComponent(CFG.RELEASE_TAG));
  if (get.status === 200 && get.json && get.json.id) return get.json;
  const made = await gh('POST', '/repos/' + CFG.GITHUB_REPO + '/releases', {
    tag_name: CFG.RELEASE_TAG,
    name: CFG.RELEASE_TAG,
    body: '站主的大文件资源（由本地后台自动上传，别手删）',
  });
  if (made.status === 201 && made.json && made.json.id) return made.json;
  throw new Error('创建 Release 失败：' + made.status + ' ' + (made.text || '').slice(0, 300));
}
/** 浏览器 → GitHub 直通流式上传，不落盘、不占内存 */
function ghUpload(releaseId, name, req, size) {
  return new Promise(function (resolve, reject) {
    const r = https.request({
      method: 'POST',
      hostname: 'uploads.github.com',
      path: '/repos/' + CFG.GITHUB_REPO + '/releases/' + releaseId + '/assets?name=' + encodeURIComponent(name),
      headers: ghHeaders({ 'Content-Type': 'application/octet-stream', 'Content-Length': size }),
    }, function (res) {
      const chunks = [];
      res.on('data', function (c) { chunks.push(c); });
      res.on('end', function () {
        const txt = Buffer.concat(chunks).toString('utf8');
        let j = null;
        try { j = JSON.parse(txt); } catch (e) {}
        resolve({ status: res.statusCode, json: j, text: txt });
      });
    });
    r.on('error', reject);
    req.on('error', function (e) { r.destroy(); reject(e); });
    req.pipe(r);
  });
}

// ───────────────────────── 路由 ─────────────────────────

async function route(req, res, url) {
  const p = url.pathname;

  // ── 登录 ──
  if (p === '/api/login' && req.method === 'POST') {
    if (!CFG.ADMIN_PASSWORD) return fail(res, 500, '还没设密码：请编辑 .env 里的 ADMIN_PASSWORD');
    const ip = clientIP(req);
    const left = locked(ip);
    if (left) return fail(res, 429, '密码错太多次，请等 ' + Math.ceil(left / 60000) + ' 分钟再试');
    let body = {};
    try { body = await readJson(req); } catch (e) { return fail(res, 400, '请求格式不对'); }
    if (!pwOK(body.password)) { noteFail(ip); return fail(res, 401, '密码不对'); }
    fails.delete(ip);
    newSession(res);
    return json(res, 200, { ok: true });
  }

  if (p === '/api/logout' && req.method === 'POST') {
    const t = cookies(req).cupcake_admin;
    if (t) sessions.delete(t);
    res.setHeader('Set-Cookie', 'cupcake_admin=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax');
    return json(res, 200, { ok: true });
  }

  if (p === '/api/whoami' && req.method === 'GET') {
    return json(res, 200, { ok: true, authed: authed(req) });
  }

  // 以下都要登录
  if (p.indexOf('/api/') === 0 && !authed(req)) return fail(res, 401, '没登录');

  if (p === '/api/state' && req.method === 'GET') {
    const files = { pictures: listDir(PICTURE_DIR), uploads: listDir(UPLOAD_DIR) };
    return json(res, 200, {
      ok: true,
      content: readContent() || normContent({}),
      comments: readComments(),
      git: await gitSummary(),
      files: files,
      repo: CFG.GITHUB_REPO,
      branch: CFG.GIT_BRANCH,
      hasToken: !!CFG.GITHUB_TOKEN,
      releaseTag: CFG.RELEASE_TAG,
    });
  }

  if (p === '/api/files' && req.method === 'GET') {
    return json(res, 200, { ok: true, pictures: listDir(PICTURE_DIR), uploads: listDir(UPLOAD_DIR) });
  }

  if (p === '/api/save' && req.method === 'POST') {
    let body;
    try { body = await readJson(req); } catch (e) { return fail(res, 400, '请求格式不对'); }
    let clean;
    try { clean = normContent(body.content); } catch (e) { return fail(res, 400, e.message); }
    writeContent(clean);
    return json(res, 200, { ok: true, content: clean, git: await gitSummary() });
  }

  if (p === '/api/gb' && req.method === 'POST') {
    let body;
    try { body = await readJson(req); } catch (e) { return fail(res, 400, '请求格式不对'); }
    let doc;
    try { doc = { v: 1, comments: normComments(body.comments) }; } catch (e) { return fail(res, 400, e.message); }
    writeComments(doc);
    return json(res, 200, { ok: true, comments: doc, git: await gitSummary() });
  }

  if (p === '/api/upload' && req.method === 'POST') {
    const kind = url.searchParams.get('kind') === 'file' ? 'file' : 'image';
    const allow = kind === 'file' ? FILE_EXT : IMG_EXT;
    let name;
    try { name = asciiName(url.searchParams.get('name'), allow); } catch (e) { return fail(res, 400, e.message); }
    let buf;
    try { buf = await readBody(req, kind === 'file' ? MAX_SMALL : MAX_IMG); }
    catch (e) { return fail(res, 413, e.message); }
    if (!buf.length) return fail(res, 400, '空文件');
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    const rel = 'uploads/' + name;
    fs.writeFileSync(path.join(UPLOAD_DIR, name), buf);
    return json(res, 200, { ok: true, path: rel, bytes: buf.length });
  }

  if (p === '/api/release' && req.method === 'POST') {
    if (!CFG.GITHUB_TOKEN) return fail(res, 500, '还没配 GITHUB_TOKEN：编辑 .env 里那一行（见 .env.example 的建法说明）');
    const size = Number(req.headers['content-length'] || 0);
    if (!size) return fail(res, 411, '上传必须带 Content-Length（文件太大走了分块传输）');
    let name;
    try { name = asciiName(url.searchParams.get('name'), FILE_EXT); } catch (e) { return fail(res, 400, e.message); }
    try {
      const rel = await ensureRelease();
      // 同名 asset 不能覆盖 → 先删（GitHub 的规矩）
      const list = await gh('GET', '/repos/' + CFG.GITHUB_REPO + '/releases/' + rel.id + '/assets?per_page=100');
      const old = list.json && Array.isArray(list.json) ? list.json.filter(function (a) { return a.name === name; })[0] : null;
      if (old) await gh('DELETE', '/repos/' + CFG.GITHUB_REPO + '/releases/assets/' + old.id);
      const up = await ghUpload(rel.id, name, req, size);
      if (up.status !== 201 || !up.json) return fail(res, 502, '上传到 Releases 失败：' + up.status + ' ' + (up.text || '').slice(0, 300));
      const short = name.length > 40 ? name.slice(0, 16) + '…' + name.slice(-14) : name;
      return json(res, 200, { ok: true, path: up.json.browser_download_url, name: name, bytes: size, note: short });
    } catch (e) {
      return fail(res, 502, '上传到 Releases 失败：' + (e.message || e));
    }
  }

  if (p === '/api/git' && req.method === 'POST') {
    let body;
    try { body = await readJson(req); } catch (e) { return fail(res, 400, '请求格式不对'); }
    const msg = str(body.message, 200).trim() || '后台更新内容';
    const log = [];
    const st = await git(['status', '--porcelain']);
    if (!st.ok) return fail(res, 500, 'git status 失败：' + st.err.trim());
    if (!st.out.trim()) return json(res, 200, { ok: true, nothing: true, log: '没有改动，不用提交' });

    let r = await git(['add', '-A']);
    log.push('$ git add -A\n' + r.out + r.err);
    if (!r.ok) return fail(res, 500, log.join('\n'));

    r = await git(['commit', '-m', msg]);
    log.push('$ git commit -m ' + JSON.stringify(msg) + '\n' + r.out + r.err);
    if (!r.ok) return fail(res, 500, log.join('\n'));

    r = await git(['push', 'origin', CFG.GIT_BRANCH]);
    log.push('$ git push origin ' + CFG.GIT_BRANCH + '\n' + r.out + r.err);
    if (!r.ok) {
      return json(res, 200, {
        ok: false,
        pushed: false,
        log: log.join('\n'),
        error: '已提交到本地仓库，但推送失败（常见原因：GitHub 连接被重置，或 GitHub 网页端改过文件导致分叉）。重试一次；还不行就在 GitHub Desktop 里处理。',
      });
    }
    return json(res, 200, { ok: true, pushed: true, log: log.join('\n') });
  }

  return fail(res, 404, '没有这个接口');
}

/** @returns {boolean} true = 这个请求后台接管了 */
function handle(req, res, url) {
  if (url.pathname.indexOf('/api/') !== 0) return false;
  Promise.resolve()
    .then(function () { return route(req, res, url); })
    .catch(function (e) {
      try { fail(res, 500, '后台出错：' + (e && e.message ? e.message : e)); } catch (e2) {}
      console.error('[admin]', e);
    });
  return true;
}

module.exports = { handle, ADMIN_HTML: path.join(ROOT, 'admin.html'), CFG: CFG, _test: { normContent, normComments, asciiName, parseEnv, readContent } };
