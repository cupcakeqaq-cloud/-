/* 「拉取云端留言」：把 Cloudflare KV 里的留言（含你藏起来的那些）并回 gb/comments.json。
   为什么要这么做：网友发的留言只在云端，拉回本机你才能在后台隐藏 / 置顶 / 回复 / 删除。

   规矩（不会丢东西）：
     · 同一个 id 两边都有 → 以你本机这份为准（你还没推送的改动不会被云端覆盖掉）
     · 云端多出来的（网友新发的）→ 追加进来

   不用手敲命令：双击根目录的「拉取云端留言.bat」。
   需要的两个值写在 .env 里（不会进仓库）：
     GB_WORKER_URL = Worker 地址，例如 https://cupcake-gb.你的账号.workers.dev
     GB_TOKEN      = 和 Cloudflare 里那个 Secret 一模一样的钥匙
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
const url = (cfg.GB_WORKER_URL || '').replace(/\/+$/, '');
const token = cfg.GB_TOKEN || '';

if (!url || !token) {
  console.log('还没配好，先打开 .env 填这两行（.env 不会进仓库）：');
  console.log('  GB_WORKER_URL = 你的 Worker 地址（在 Cloudflare 的 Worker 页面能看到）' + (url ? '' : '   ← 缺这个'));
  console.log('  GB_TOKEN      = 和 Cloudflare 里那个 Secret 一样的钥匙' + (token ? '' : '   ← 缺这个'));
  process.exit(1);
}

let doc = { v: 1, comments: [] };
try {
  const j = JSON.parse(fs.readFileSync(GB, 'utf8').replace(/^\uFEFF/, ''));   /* 记事本存过的文件会带 BOM，先剥掉 */
  if (j && Array.isArray(j.comments)) doc = j;
} catch (e) {
  console.log('读不了 gb/comments.json（当成空的继续）：' + e.message);
}
const local = doc.comments.filter((c) => c && c.id);
const have = new Set(local.map((c) => c.id));
console.log('本机 gb/comments.json 里共 ' + local.length + ' 条，去云端取…');
console.log('  服务器：' + url);

let remote;
try {
  const res = await fetch(url + '/api/gb/admin/list', { headers: { 'x-gb-token': token } });
  const b = await res.json().catch(() => ({}));
  if (res.status === 403 || b.error === 'denied') {
    console.log('钥匙不对（Cloudflare 那边拒绝了）。检查 .env 的 GB_TOKEN 和 Worker 里的 Secret 是否一模一样。');
    process.exit(1);
  }
  if (!res.ok || !Array.isArray(b.comments)) {
    console.log('拉不回来：HTTP ' + res.status + ' ' + (b.error || ''));
    process.exit(1);
  }
  remote = b.comments;
} catch (e) {
  console.log('连不上那个地址：' + e.message);
  console.log('（检查 GB_WORKER_URL 有没有打错、Worker 有没有部署成功；国内有时连不上 *.workers.dev）');
  process.exit(1);
}

/* 云端的条目本来就只有契约里的六个字段（Worker 已经把内部标记剥掉了），直接追加即可 */
const fresh = remote.filter((c) => c && c.id && !have.has(c.id));
const next = { v: 1, comments: local.concat(fresh) };
fs.mkdirSync(path.dirname(GB), { recursive: true });
fs.writeFileSync(GB, JSON.stringify(next, null, 2) + '\n', 'utf8');

console.log(fresh.length
  ? '拉回来了：新增 ' + fresh.length + ' 条（网友发的），本机原有的 ' + local.length + ' 条没动。'
  : '云端没有新留言，什么都没变。');
console.log('现在 gb/comments.json 共 ' + next.comments.length + ' 条。');
console.log('');
console.log('接下来：双击「启动后台.bat」，在 留言板 页面隐藏 / 置顶 / 回复 / 删除，');
console.log('        改完再双击「推送留言到Cloudflare.bat」，把改动同步回云端。');
