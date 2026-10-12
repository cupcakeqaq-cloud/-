/* 「搬进 KV」：把站主后台管的 gb/comments.json 推到 Cloudflare 的 KV。
   规矩：以本机这份为准 ——
     · 两边都有的 id：用本机的版本覆盖云端（你在后台改的正文/置顶/隐藏/回复都会生效）
     · 只有本机有：新增
     · 你在后台删掉的（云端打着 synced 标记、本机这份里没有了）：从云端删掉
     · 网友刚发的（云端没有 synced 标记）：留着，等下次「拉取云端留言」并回后台

   不用手敲命令：双击根目录的「推送留言到Cloudflare.bat」即可。
   需要的两个值写在 .env 里（不会进仓库）：
     GB_API_URL = 后端地址，例如 https://cupcake-gb-api.pages.dev
     GB_TOKEN   = 和 Cloudflare 里那个 Secret 一模一样的钥匙
*/
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const GB = path.join(ROOT, 'gb', 'comments.json');

function readEnv() {
  const out = {};
  let txt = '';
  try { txt = fs.readFileSync(path.join(ROOT, '.env'), 'utf8'); } catch (e) { return out; }
  txt.split(/\r?\n/).forEach((line) => {
    const s = line.trim();
    if (!s || s[0] === '#') return;
    const at = s.indexOf('=');
    if (at > 0) out[s.slice(0, at).trim()] = s.slice(at + 1).trim().replace(/^["']|["']$/g, '');
  });
  return out;
}

const cfg = readEnv();
const url = (cfg.GB_API_URL || '').replace(/\/+$/, '');
const token = cfg.GB_TOKEN || '';

if (!url || !token) {
  console.log('还没配好，先打开 .env 填这两行（.env 不会进仓库）：');
  console.log('  GB_API_URL = 后端地址（Cloudflare Pages 里那个项目的网址）' + (url ? '' : '   ← 缺这个'));
  console.log('  GB_TOKEN   = 和 Cloudflare 里那个 Secret 一样的钥匙' + (token ? '' : '   ← 缺这个'));
  process.exit(1);
}

let doc;
try {
  doc = JSON.parse(fs.readFileSync(GB, 'utf8').replace(/^\uFEFF/, ''));   /* 用记事本存过的文件会带 BOM，先剥掉 */
} catch (e) {
  console.log('读不了 gb/comments.json：' + e.message);
  process.exit(1);
}
const comments = Array.isArray(doc.comments) ? doc.comments : [];
console.log('本地 gb/comments.json 里共 ' + comments.length + ' 条，开始往 Cloudflare 搬…');
console.log('  服务器：' + url);

try {
  const res = await fetch(url + '/api/gb/import', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-gb-token': token },
    body: JSON.stringify({ v: 1, comments: comments })
  });
  const b = await res.json().catch(() => ({}));

  if (res.status === 403 || b.error === 'denied') {
    console.log('钥匙不对（Cloudflare 那边拒绝了）。检查 .env 的 GB_TOKEN 和 Cloudflare 里的 Secret GB_TOKEN 是否一模一样。');
    process.exit(1);
  }
  if (!res.ok || !b.ok) {
    console.log('搬失败了：HTTP ' + res.status + ' ' + (b.error || ''));
    process.exit(1);
  }
  console.log('搬完了：新增 ' + b.added + ' 条，更新 ' + b.updated + ' 条，删掉 ' + b.deleted + ' 条，云端现在共 ' + b.total + ' 条。');
} catch (e) {
  console.log('连不上那个地址：' + e.message);
  console.log('（检查 GB_API_URL 有没有打错、Cloudflare Pages 上有没有部署成功）');
  process.exit(1);
}
