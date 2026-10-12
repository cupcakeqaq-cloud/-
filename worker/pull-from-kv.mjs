/* 「拉取云端留言」：把 Cloudflare KV 里的留言（含你藏起来的那些）并回 gb/comments.json。
   为什么要这么做：网友发的留言只在云端，拉回本机你才能在后台隐藏 / 置顶 / 回复 / 删除。

   规矩（不会丢东西）：
     · 同一个 id 两边都有 → 以你本机这份为准（你还没推送的改动不会被云端覆盖掉）
     · 云端多出来的（网友新发的）→ 追加进来
     · 拉完顺手告诉云端「这些都在你本机那份里了」——没有这一步，你在后台把某条删掉再推送时，
       云端会以为那是网友刚发的、不肯删（站主 2026-10 踩过这个坑，见 HANDOFF 15.8）

   不用手敲命令：双击根目录的「拉取云端留言.bat」。
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
    console.log('钥匙不对（Cloudflare 那边拒绝了）。检查 .env 的 GB_TOKEN 和 Cloudflare 里的 Secret GB_TOKEN 是否一模一样。');
    process.exit(1);
  }
  if (!res.ok || !Array.isArray(b.comments)) {
    console.log('拉不回来：HTTP ' + res.status + ' ' + (b.error || ''));
    process.exit(1);
  }
  remote = b.comments;
} catch (e) {
  console.log('连不上那个地址：' + e.message);
  console.log('（检查 GB_API_URL 有没有打错、Cloudflare Pages 上有没有部署成功）');
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

/* 把「这些留言已经在你本机那份里了」同步回云端（Worker 会给它们打 synced 标记）。
   Worker 就是靠这个标记区分「你在后台删掉的」和「网友刚发的」：
   少了这一步，你删掉某条再推送，云端会当成网友新发的而留下它 —— 这就是删不掉的原因。 */
try {
  const res = await fetch(url + '/api/gb/import', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-gb-token': token },
    body: JSON.stringify(next)
  });
  const b = await res.json().catch(() => ({}));
  if (!res.ok || !b.ok) throw new Error('HTTP ' + res.status + ' ' + (b.error || ''));
  console.log('已告诉云端：这 ' + next.comments.length + ' 条都在你本机那份里了（之后你在后台删掉它们，推送时会真的删）。');
} catch (e) {
  console.log('注意：这次没能把「已拉取」这个标记同步回云端（' + e.message + '）。');
  console.log('      这样你在后台删掉留言后可能推送不掉，重新双击一次「拉取云端留言.bat」再试。');
}
console.log('');
console.log('接下来：双击「启动后台.bat」，在 留言板 页面隐藏 / 置顶 / 回复 / 删除，');
console.log('        改完再双击「推送留言到Cloudflare.bat」，把改动同步回云端。');
