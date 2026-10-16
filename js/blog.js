/* 个人博客前台：blog.html 的列表／文章／标签／搜索，以及主页「个人博客」入口窗里的最近文章。
   数据在 blog/posts.js（window.BLOG_POSTS）—— 这里只负责画，不负责存。
   地址用哈希：blog.html#/p-xxx（文章）、#/tag/标签、#/month/2026-02、#/search/词 */
(function () {
  'use strict';

  var ON_BLOG = (document.body.getAttribute('data-page') === 'blog');
  var PAGE = ON_BLOG ? '' : 'blog.html';

  /* 正文白名单：后台富文本只吐这些标签，手改文件写坏也不会带进脚本 */
  var OK_TAG = {
    P: 1, BR: 1, H2: 1, H3: 1, H4: 1, STRONG: 1, B: 1, EM: 1, I: 1, U: 1, S: 1,
    UL: 1, OL: 1, LI: 1, BLOCKQUOTE: 1, IMG: 1, FIGURE: 1, FIGCAPTION: 1, HR: 1,
    DIV: 1, SPAN: 1, CODE: 1, PRE: 1, A: 1
  };
  var OK_ATTR = { href: 1, src: 1, alt: 1, title: 1, class: 1 };

  function byId(id) { return document.getElementById(id); }
  function t(k, v) { return window.t ? window.t(k, v) : k; }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function all() { return window.blogAll ? window.blogAll() : []; }
  function tagsOf(p) { return Array.isArray(p.tags) ? p.tags : []; }
  function dateOf(p) { return String(p.date || ''); }
  function idOf(p) { return String(p.id || ''); }
  function postHref(p) { return PAGE + '#/' + encodeURIComponent(idOf(p)); }
  function tagHref(k) { return PAGE + '#/tag/' + encodeURIComponent(k); }

  /* ── 正文清洗：拆掉白名单外的标签、删掉白名单外的属性；外链一律新标签打开
        （不新开的话点一下就把整个 winXP 窗口导航走了） ── */
  function clean(html) {
    var box = document.createElement('div');
    box.innerHTML = String(html || '');
    fix(box);
    return box.innerHTML;
  }
  function fix(node) {
    Array.prototype.slice.call(node.children).forEach(function (el) {
      if (!OK_TAG[el.tagName]) {
        el.parentNode.replaceChild(document.createTextNode(el.textContent || ''), el);
        return;
      }
      Array.prototype.slice.call(el.attributes).forEach(function (a) {
        var n = a.name.toLowerCase();
        var bad = (n === 'href' || n === 'src') && /^\s*(javascript|vbscript|data):/i.test(a.value);
        if (!OK_ATTR[n] || bad) el.removeAttribute(a.name);
      });
      if (el.tagName === 'A') { el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener'); }
      fix(el);
    });
  }
  function plain(html) {
    var box = document.createElement('div');
    box.innerHTML = clean(html);
    return String(box.textContent || '').replace(/\s+/g, ' ').trim();
  }
  /* 摘要：写了就用写的，没写就截正文前 120 字 */
  function summary(p) {
    if (p.summary) return p.summary;
    var s = plain(p.html);
    return s.length > 120 ? s.slice(0, 120) + '…' : s;
  }

  function chips(tags) {
    return tags.map(function (k) { return '<a class="bl-tag sm" href="' + tagHref(k) + '">' + esc(k) + '</a>'; }).join(' ');
  }
  function metaOf(p) {
    return '<div class="bl-meta"><span class="bl-date">' + esc(dateOf(p)) + '</span>' +
      (p.pinned ? '<span class="bl-pin">' + esc(t('blPinned')) + '</span>' : '') + chips(tagsOf(p)) + '</div>';
  }

  /* ── 路由 ── */
  function route() {
    var h = String(location.hash || '').replace(/^#\/?/, '');
    if (!h) return { v: 'list' };
    var seg = h.split('/');
    if (seg[0] === 'tag') return { v: 'tag', q: decodeURIComponent(seg.slice(1).join('/') || '') };
    if (seg[0] === 'month') return { v: 'month', q: seg[1] || '' };
    if (seg[0] === 'search') return { v: 'search', q: decodeURIComponent(seg.slice(1).join('/') || '') };
    return { v: 'post', id: decodeURIComponent(seg.join('/')) };
  }

  function search(q) {
    var s = String(q || '').toLowerCase();
    if (!s) return [];
    return all().filter(function (p) {
      var hay = String(p.title || '') + ' ' + summary(p) + ' ' + plain(p.html) + ' ' + tagsOf(p).join(' ');
      return hay.toLowerCase().indexOf(s) >= 0;
    });
  }

  /* ── 画 ── */
  function listHtml(title, list) {
    var head = '<div class="bl-head"><h1>' + esc(title) + '</h1>' +
      '<span class="bl-count">' + esc(t('blCount', { n: list.length })) + '</span></div>';
    if (!all().length) return head + '<div class="bl-empty">' + esc(t('blEmpty')) + '</div>';
    if (!list.length) return head + '<div class="bl-empty">' + esc(t('blEmptySearch')) + '</div>';
    return head + list.map(function (p) {
      return '<article class="bl-item">' + metaOf(p) +
        '<h2 class="bl-ititle"><a href="' + postHref(p) + '">' + esc(p.title) + '</a></h2>' +
        '<p class="bl-sum">' + esc(summary(p)) + '</p>' +
        '<a class="bl-more" href="' + postHref(p) + '">' + esc(t('blReadMore')) + '</a></article>';
    }).join('');
  }

  function postHtml(p, list) {
    if (!p) return listHtml(t('blAll'), []);
    var i = list.indexOf(p), prev = list[i - 1], next = list[i + 1];
    var nav = '';
    if (prev) nav += '<a class="bl-prev" href="' + postHref(prev) + '">← ' + esc(t('blPrev')) + '：' + esc(prev.title) + '</a>';
    if (next) nav += '<a class="bl-next" href="' + postHref(next) + '">' + esc(t('blNext')) + '：' + esc(next.title) + ' →</a>';
    return '<article class="bl-post">' + metaOf(p) +
      '<h1 class="bl-ptitle">' + esc(p.title) + '</h1>' +
      '<div class="bl-body">' + clean(p.html) + '</div>' +
      (nav ? '<div class="bl-nav">' + nav + '</div>' : '') +
      '<a class="bl-back" href="' + PAGE + '#/">' + esc(t('blBackList')) + '</a></article>';
  }

  function render() {
    var box = byId('blMain');
    if (!box) return;
    var list = all(), r = route();
    if (r.v === 'post') {
      box.innerHTML = postHtml(list.filter(function (p) { return idOf(p) === r.id; })[0], list);
    } else if (r.v === 'tag') {
      box.innerHTML = listHtml(t('blFilterTag', { tag: r.q }), list.filter(function (p) { return tagsOf(p).indexOf(r.q) >= 0; }));
    } else if (r.v === 'month') {
      box.innerHTML = listHtml(t('blFilterMonth', { month: r.q }), list.filter(function (p) { return dateOf(p).slice(0, 7) === r.q; }));
    } else if (r.v === 'search') {
      box.innerHTML = listHtml(t('blSearched', { q: r.q }), search(r.q));
    } else {
      box.innerHTML = listHtml(t('blAll'), list);
    }
  }

  /* ── 侧栏（博客页）── */
  function sideFill() {
    var list = all();
    var tags = {}, months = {};
    list.forEach(function (p) {
      tagsOf(p).forEach(function (k) { tags[k] = (tags[k] || 0) + 1; });
      var m = dateOf(p).slice(0, 7);
      if (m) months[m] = (months[m] || 0) + 1;
    });
    var tagBox = byId('blTags');
    if (tagBox) {
      var tk = Object.keys(tags).sort();
      tagBox.innerHTML = list.length
        ? '<a class="bl-tag" href="' + PAGE + '#/">' + esc(t('blAll')) + ' <b>' + list.length + '</b></a>' +
          tk.map(function (k) { return '<a class="bl-tag" href="' + tagHref(k) + '">' + esc(k) + ' <b>' + tags[k] + '</b></a>'; }).join('')
        : '<span class="bl-none">—</span>';
    }
    var mBox = byId('blMonths');
    if (mBox) {
      var mk = Object.keys(months).sort().reverse();
      mBox.innerHTML = mk.length
        ? mk.map(function (k) { return '<a class="bl-tag" href="' + PAGE + '#/month/' + k + '">' + esc(k) + ' <b>' + months[k] + '</b></a>'; }).join('')
        : '<span class="bl-none">—</span>';
    }
    var rBox = byId('blRecent');
    if (rBox) rBox.innerHTML = mini(list, 5);
  }

  /* 主页入口窗（5 篇）与博客页侧栏（5 篇）用的是同一段 */
  function mini(list, n) {
    if (!list.length) return '<li class="bl-none">' + esc(t('blEmpty')) + '</li>';
    return list.slice(0, n).map(function (p) {
      return '<li><span class="bl-rd">' + esc(dateOf(p)) + '</span><a href="' + postHref(p) + '">' + esc(p.title) + '</a></li>';
    }).join('');
  }
  function homeFill() {
    var entry = byId('blEntryList');
    if (entry) entry.innerHTML = mini(all(), 5);
  }

  function boot() {
    sideFill();
    homeFill();
    render();

    var inp = byId('blSearch'), go = byId('blSearchGo');
    function doSearch() {
      var q = inp ? inp.value.trim() : '';
      location.hash = q ? '#/search/' + encodeURIComponent(q) : '#/';
      if (!q) render();
    }
    if (go) go.addEventListener('click', doSearch);
    if (inp) inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') doSearch(); });

    window.addEventListener('hashchange', function () {
      if (inp) inp.value = (route().v === 'search' ? route().q : '');
      render();
      var page = document.querySelector('.ie-page');
      if (page) page.scrollTop = 0;
    });
    document.addEventListener('langchange', function () { sideFill(); homeFill(); render(); });
  }

  boot();
})();
