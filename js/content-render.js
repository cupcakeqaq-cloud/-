/* 把 js/content.js 的数据渲染进页面（数据的消费者，不含数据）
   加载顺序必须是：js/i18n.js → js/content.js → 本文件 → js/config.js → js/winxp.js …
   本文件在解析期同步跑完，所以 js/winxp.js 的 boot() 量例图比例时 DOM 已经定型。 */
(function () {
  var C = window.CONTENT;
  if (!C) return;

  function lang() { return (window.getLang && window.getLang()) || 'zh'; }
  /* 三语字段取值：当前语言 → zh → 空 */
  function pick(v) {
    if (v == null) return '';
    if (typeof v === 'string') return v;
    return v[lang()] || v.zh || v.en || v.ja || '';
  }
  /* 允许写中文文件名：百分号编码交给这里，编错不了 */
  function enc(u) { return encodeURI(String(u == null ? '' : u)); }

  /* ── 1. 文案覆盖：只覆盖 content.js 里写了的 key ── */
  if (C.i18n && window.I18N) {
    Object.keys(C.i18n).forEach(function (k) {
      var v = C.i18n[k];
      if (!v || typeof v !== 'object') return;
      var base = window.I18N[k] || (window.I18N[k] = {});
      ['zh', 'ja', 'en'].forEach(function (l) {
        if (typeof v[l] === 'string' && v[l] !== '') base[l] = v[l];
      });
    });
  }

  /* ── 2. 受理状态：换 data-i18n 指向的 key + 换配色 class（文案交给 i18n 写） ── */
  var cm = C.commission || {};
  var st = document.querySelector('.cm-lead .cm-open');
  if (st && (cm.status === 'paused' || cm.status === 'closed')) {
    st.setAttribute('data-i18n', cm.status === 'paused' ? 'cmStatusPaused' : 'cmStatusClosed');
    st.classList.add(cm.status === 'paused' ? 'cm-paused' : 'cm-closed');
  }

  /* ── 3. 例图：按数据重建（空数组 = 保留 HTML 里写死的图） ── */
  var cards = document.querySelectorAll('.cm-cards .cm-card');
  (cm.cards || []).forEach(function (card, i) {
    var box = cards[i] && cards[i].querySelector('.cm-card-shots');
    if (!box || !card || !card.shots || !card.shots.length) return;
    box.innerHTML = '';
    card.shots.forEach(function (src) {
      var a = document.createElement('a');
      a.href = enc(src);
      a.target = '_blank';
      a.rel = 'noopener';
      var im = document.createElement('img');
      im.src = enc(src);
      im.loading = 'lazy';
      im.alt = '';
      a.appendChild(im);
      box.appendChild(a);
    });
  });

  /* ── 4. 资源页下载项（items 为空 = 保留 HTML 里写死的那条） ── */
  var rs = C.resources || {};
  function renderRes() {
    var first = document.querySelector('.rs-item');
    if (!first || !rs.items || !rs.items.length) return;
    var host = first.parentNode;
    Array.prototype.slice.call(host.querySelectorAll('.rs-item')).forEach(function (n) {
      host.removeChild(n);
    });
    rs.items.forEach(function (it) {
      var row = document.createElement('div');
      row.className = 'rs-item';

      var ic = document.createElement('img');
      ic.src = it.icon || 'assets/winxp/windowsIcons/846(32x32).png';
      ic.alt = '';
      row.appendChild(ic);

      var info = document.createElement('div');
      info.className = 'rs-info';
      var nm = document.createElement('div');
      nm.className = 'rs-name';
      nm.textContent = pick(it.name);
      var sz = document.createElement('div');
      sz.className = 'rs-size';
      sz.textContent = pick(it.size);
      info.appendChild(nm);
      info.appendChild(sz);
      row.appendChild(info);

      var a = document.createElement('a');
      a.className = 'rs-dl';
      a.href = enc(it.href);
      a.setAttribute('download', '');
      a.textContent = (window.t ? window.t('voiceDownload') : '↓ 下载');
      row.appendChild(a);

      host.appendChild(row);
    });
  }
  renderRes();
  /* 自己生成的节点没有 data-i18n，语言切换后要自己重画一遍 */
  document.addEventListener('langchange', renderRes);
})();
