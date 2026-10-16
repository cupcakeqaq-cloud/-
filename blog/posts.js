/* ─────────────────────────────────────────────────────────────
   博客「已发布」文章 —— 由本地后台「博客」页签生成（npm start 后打开 /admin/）
   手改也行，但注意：下面的排序工具在上面，数据在文件最底下，
   后台保存时会从 window.BLOG_POSTS 那一行往后整段重写。

     id       决定地址 blog.html#/p-xxx，写完别改（改了旧链接失效）
     date     YYYY-MM-DD
     tags     自由词，数组，可以多个
     summary  手写摘要；留空则前台自动截正文前 120 字
     html     正文（HTML 片段，前台会过一遍标签白名单）
     pinned   true = 置顶（列表最前，带 ★）

   草稿在同目录 blog/drafts.js（写进 .gitignore 了，不进仓库）
   ───────────────────────────────────────────────────────────── */

/* 排序：置顶优先 → 日期倒序（前台博客页、主页两个小窗、后台列表都用它） */
window.blogAll = function () {
  return (window.BLOG_POSTS || []).slice().sort(function (a, b) {
    var p = (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
    if (p) return p;
    return String(b.date || '').localeCompare(String(a.date || ''));
  });
};

/* 最近 n 篇（主页入口窗 3 篇、侧栏小窗 5 篇） */
window.blogRecent = function (n) {
  return window.blogAll().slice(0, Number(n) > 0 ? Number(n) : 5);
};

window.BLOG_POSTS = [];
