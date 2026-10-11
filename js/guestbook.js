/* 留言板：存档在 localStorage（刷新不丢、换设备不同步）。
   预留后端开关：把 js/config.js 里的 window.DANAMKU_API 填上地址即可改成远端存储。 */
(function () {
  var KEY = 'cupcake-guestbook-v1';
  var PER_PAGE = 8;          /* 每页条数（站主要求 8） */
  var list = document.getElementById('gbList');
  if (!list) return;

  var nameIn = document.getElementById('gbName');
  var textIn = document.getElementById('gbText');
  var sendBtn = document.getElementById('gbSend');
  var prevBtn = document.getElementById('gbPrev');
  var nextBtn = document.getElementById('gbNext');
  var pageInfo = document.getElementById('gbPageInfo');

  var page = 1;

  function T(key, fallback) {
    return window.t ? t(key) : fallback;
  }
  function load() {
    try {
      var raw = JSON.parse(localStorage.getItem(KEY));
      return Array.isArray(raw) ? raw : [];
    } catch (e) { return []; }
  }
  function save(items) {
    try { localStorage.setItem(KEY, JSON.stringify(items.slice(0, 200))); } catch (e) {}
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function fmt(ts) {
    var d = new Date(ts);
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) +
      ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  }

  function render() {
    var items = load();
    var pages = Math.max(1, Math.ceil(items.length / PER_PAGE));
    if (page > pages) page = pages;
    if (page < 1) page = 1;

    list.innerHTML = '';
    if (!items.length) {
      var empty = document.createElement('p');
      empty.className = 'gb-empty';
      empty.textContent = T('gbEmpty', '暂无评论');
      list.appendChild(empty);
    } else {
      items.slice((page - 1) * PER_PAGE, page * PER_PAGE).forEach(function (item) {
        var row = document.createElement('div');
        row.className = 'gb-item';

        var head = document.createElement('div');
        head.className = 'gb-head';

        var name = document.createElement('span');
        name.className = 'gb-name';
        name.textContent = item.name || 'Anonymous';

        var time = document.createElement('span');
        time.className = 'gb-time';
        time.textContent = fmt(item.ts);

        var del = document.createElement('button');
        del.className = 'gb-del';
        del.type = 'button';
        del.textContent = '×';
        del.title = T('gbDelete', '删除');
        del.addEventListener('click', function () {
          var now = load();
          /* 按 ts 精确删除，避免翻页后索引错位 */
          var at = -1;
          for (var k = 0; k < now.length; k++) { if (now[k].ts === item.ts) { at = k; break; } }
          if (at >= 0) { now.splice(at, 1); save(now); }
          render();
        });

        var text = document.createElement('p');
        text.className = 'gb-text';
        text.textContent = item.text;

        head.appendChild(name);
        head.appendChild(time);
        head.appendChild(del);
        row.appendChild(head);
        row.appendChild(text);
        list.appendChild(row);
      });
    }

    if (pageInfo) pageInfo.textContent = page + ' / ' + pages;
    if (prevBtn) prevBtn.disabled = page <= 1;
    if (nextBtn) nextBtn.disabled = page >= pages;
  }

  function send() {
    var text = (textIn.value || '').trim();
    if (!text) { textIn.focus(); return; }
    var name = (nameIn.value || '').trim().slice(0, 24);
    var items = load();
    items.unshift({ name: name, text: text.slice(0, 300), ts: Date.now() });
    save(items);
    textIn.value = '';
    page = 1;
    render();
    list.scrollTop = 0;
  }

  sendBtn.addEventListener('click', send);
  textIn.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) send();
  });
  if (prevBtn) prevBtn.addEventListener('click', function () { page--; render(); list.scrollTop = 0; });
  if (nextBtn) nextBtn.addEventListener('click', function () { page++; render(); list.scrollTop = 0; });
  document.addEventListener('langchange', render);
  render();
})();
