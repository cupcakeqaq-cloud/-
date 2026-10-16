'use strict';

/**
 * 博客数据读写自检（零依赖）：node server/test-blog.js
 * 只碰 blog/posts.js，跑完会还原原文件。
 * 防的坑：后台保存把 posts.js 里排序工具函数冲掉、空数组读不回来。
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const A = require('./admin.js')._test;
const POSTS = path.join(__dirname, '..', 'blog', 'posts.js');
const backup = fs.readFileSync(POSTS, 'utf8');

try {
  A.writeJsArray(POSTS, 'window.BLOG_POSTS', [
    { id: 'p-a', title: '一', date: '2026-02-14', tags: ['生活'], summary: '摘要', html: '<p>正文</p>', pinned: true },
    { id: 'p-b', title: '二', date: '2026-02-01', tags: [], summary: '', html: '<p>x</p>', pinned: false },
  ]);
  const back = A.readJsArray(POSTS, 'window.BLOG_POSTS');
  assert.strictEqual(back.length, 2, '读回数量不对');
  assert.strictEqual(back[0].id, 'p-a');
  assert.strictEqual(back[1].html, '<p>x</p>');
  assert.ok(fs.readFileSync(POSTS, 'utf8').indexOf('window.blogRecent') > 0, '工具函数被冲掉了');

  A.writeJsArray(POSTS, 'window.BLOG_POSTS', []);
  assert.deepStrictEqual(A.readJsArray(POSTS, 'window.BLOG_POSTS'), [], '空数组读不回来');
  assert.ok(fs.readFileSync(POSTS, 'utf8').indexOf('window.blogAll') > 0, '清空后工具函数被冲掉了');

  const n = A.normPost({ title: ' x ', tags: ['a', 'a', ''], html: '<p>1</p>' });
  assert.strictEqual(n.title, 'x');
  assert.deepStrictEqual(n.tags, ['a']);
  assert.ok(/^p-/.test(n.id) && /^\d{4}-\d{2}-\d{2}$/.test(n.date), 'id/日期兜底不对');
  assert.strictEqual(A.normPost({ title: '   ' }), null, '没标题的应该丢掉');
  assert.deepStrictEqual(A.normPosts([{ title: 'a' }, null, { title: '' }], 5).length, 1);

  console.log('✓ 博客数据读写自检通过');
} finally {
  fs.writeFileSync(POSTS, backup, 'utf8');
}
