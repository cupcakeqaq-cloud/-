/* 留言板：留言存在 Cloudflare（worker/guestbook.mjs 那份代码），前台只负责读和发。
   本地 localStorage 那份按站主要求去掉了；访客发完删不掉，只能站主在后台清理。
   后端地址填在 js/config.js 的 window.DANMAKU_API；留空则只读同源 gb/comments.json（能看不能发）。 */
(function () {
  /* 地址统一收成「末尾一定有一个斜杠」，这样下面拼 gb/comments.json、api/gb/post 都不会拼错 */
  var API = String(window.DANAMKU_API || '').replace(/\/+$/, '');
  if (API) API += '/';
  var PER_PAGE = 8;
  var MAX_TEXT = 200;
  var MAX_NAME = 24;

  var list = document.getElementById('gbList');
  if (!list) return;

  var nameIn = document.getElementById('gbName');
  var textIn = document.getElementById('gbText');
  var sendBtn = document.getElementById('gbSend');
  var prevBtn = document.getElementById('gbPrev');
  var nextBtn = document.getElementById('gbNext');
  var pageInfo = document.getElementById('gbPageInfo');

  var page = 1;
  var items = [];
  var busy = false;

  function T(key, fallback, vars) {
    return window.t ? t(key, vars) : fallback;
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function fmt(ts) {
    var d = new Date(ts);
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) +
      ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  }
  /* 站主回复是三语字段，取第一份填了的（zh → ja → en），不跟页面语言走 */
  function replyOf(c) {
    var r = c && c.reply;
    if (!r) return '';
    return r.zh || r.ja || r.en || '';
  }
  function say(text) {
    if (window.XP && window.XP.msg) window.XP.msg(T('titleGuestbook', '留言板'), text);
    else alert(text);
  }
  function emptyState(text) {
    list.innerHTML = '';
    var p = document.createElement('p');
    p.className = 'gb-empty';
    p.textContent = text;
    list.appendChild(p);
  }

  /* 过滤 hidden → pinned 前 → time 倒序，和后台的排序规则一致 */
  function norm(doc) {
    var arr = (doc && doc.comments) || [];
    return arr.filter(function (c) { return c && !c.hidden; })
      .map(function (c) {
        return {
          name: c.name || 'Anonymous',
          text: String(c.text == null ? '' : c.text),
          time: Number(c.time) > 0 ? Number(c.time) : 0,
          pinned: !!c.pinned,
          reply: replyOf(c)
        };
      })
      .sort(function (a, b) { return (b.pinned - a.pinned) || (b.time - a.time); });
  }

  function render() {
    var pages = Math.max(1, Math.ceil(items.length / PER_PAGE));
    if (page > pages) page = pages;
    if (page < 1) page = 1;

    list.innerHTML = '';
    if (!items.length) {
      emptyState(T('gbEmpty', '暂无评论'));
    } else {
      items.slice((page - 1) * PER_PAGE, page * PER_PAGE).forEach(function (item) {
        var row = document.createElement('div');
        row.className = 'gb-item';

        var head = document.createElement('div');
        head.className = 'gb-head';

        var name = document.createElement('span');
        name.className = 'gb-name';
        name.textContent = item.name;

        var time = document.createElement('span');
        time.className = 'gb-time';
        time.textContent = fmt(item.time);

        var text = document.createElement('p');
        text.className = 'gb-text';
        text.textContent = item.text;   /* 一律 textContent，别用 innerHTML */

        head.appendChild(name);
        head.appendChild(time);
        row.appendChild(head);
        row.appendChild(text);

        if (item.reply) {
          var reply = document.createElement('p');
          reply.className = 'gb-reply';
          reply.textContent = item.reply;
          row.appendChild(reply);
        }
        list.appendChild(row);
      });
    }

    if (pageInfo) pageInfo.textContent = page + ' / ' + pages;
    if (prevBtn) prevBtn.disabled = page <= 1;
    if (nextBtn) nextBtn.disabled = page >= pages;
  }

  function getJSON(url) {
    return fetch(url, { cache: 'no-store' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    });
  }

  function load() {
    emptyState(T('gbLoading', '加载中…'));
    var first = getJSON(API ? API + 'gb/comments.json' : 'gb/comments.json');
    /* Worker 连不上时回落读 Pages 上那份（只读），至少不白屏 */
    return first.catch(function () {
      return API ? getJSON('gb/comments.json') : { v: 1, comments: [] };
    }).then(function (doc) {
      items = norm(doc);
      render();
    }).catch(function () {
      items = [];
      emptyState(T('gbErrList', '留言加载失败，稍后再试。'));
    });
  }

  function send() {
    if (busy) return;
    var text = (textIn.value || '').trim();
    if (!text) { textIn.focus(); return; }
    var name = (nameIn.value || '').trim().slice(0, MAX_NAME);

    busy = true;
    sendBtn.disabled = true;
    fetch(API + 'api/gb/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, text: text.slice(0, MAX_TEXT) })
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (b) {
        return { status: r.status, b: b };
      });
    }).then(function (res) {
      var b = res.b || {};
      if (b.ok && b.comment) {
        /* 直接拿服务端返回的这条插进去：KV 读取最长有 60 秒延迟，重读可能看不到刚发的 */
        items = norm({ comments: items.concat([b.comment]) });
        textIn.value = '';
        page = 1;
        render();
        list.scrollTop = 0;
        return;
      }
      if (b.error === 'rate') {
        say(T('gbErrRate', '发得太快了，10 分钟内最多 3 条，请等 {min} 分钟再发。',
          { min: Math.max(1, Math.ceil((b.retryAfter || 0) / 60000)) }));
      } else if (b.error === 'long') {
        say(T('gbErrLong', '正文最多 200 字。'));
      } else if (b.error === 'empty') {
        textIn.focus();
      } else {
        say(T('gbErrNet', '发送失败：连不上留言服务器，稍后再试。'));
      }
    }).catch(function () {
      say(T('gbErrNet', '发送失败：连不上留言服务器，稍后再试。'));
    }).then(function () {
      busy = false;
      sendBtn.disabled = false;
    });
  }

  sendBtn.addEventListener('click', send);
  textIn.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) send();
  });
  if (prevBtn) prevBtn.addEventListener('click', function () { page--; render(); list.scrollTop = 0; });
  if (nextBtn) nextBtn.addEventListener('click', function () { page++; render(); list.scrollTop = 0; });
  document.addEventListener('langchange', render);   /* 只重画，不重取 */
  load();
})();
