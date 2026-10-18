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

  /* ── 3. 例图：按数据重建（空数组 = 保留 HTML 里写死的图）
        一项可以是 "路径"，也可以是 {src, r, zoom, cx, cy}
        r = 槽位比例 '1:1' | '3:4' | '4:3'（不写 = 按原图自动判定）
        zoom/cx/cy = 只记「看哪一块」，原图像素不动 ── */
  /* 槽位比例：和 js/winxp.js 的判定必须一致 */
  function shotRatio(w, h) {
    var r = w / h;
    if (r > 0.9 && r < 1.15) return '1 / 1';
    if (r >= 1.15) return '4 / 3';
    return '3 / 4';
  }
  /* content.js 允许手改，所以写死的比例也过滤一遍 */
  function fixedRatio(r) {
    return (r === '1:1' || r === '3:4' || r === '4:3') ? r.replace(':', ' / ') : '';
  }
  function num(v, d) { var n = Number(v); return isFinite(n) ? n : d; }
  /* '3 / 4' → 0.75（cropRatio 和固定比例都写成这种带空格的 CSS 值） */
  function ratioOf(css) {
    var p = String(css || '').split('/');
    return p.length === 2 ? num(p[0], 0) / num(p[1], 1) : 0;
  }
  /* 图片要放大多少才铺满槽位框（再乘缩放）：框比图窄 → 按宽铺满（kx>1），反之按高铺满 */
  function coverK(rF, rI) {
    if (!rF || !rI) return { kx: 1, ky: 1 };
    return { kx: Math.max(1, rI / rF), ky: Math.max(1, rF / rI) };
  }
  /* 裁剪窗口中心不能跑出图外：cx ∈ [0.5/k, 1-0.5/k]，k = 该方向的铺满倍数 × 缩放（k=1 时只能取 0.5） */
  function pan(v, k) {
    var lo = 0.5 / k, hi = 1 - 0.5 / k;
    return Math.min(hi, Math.max(lo, num(v, 0.5)));
  }

  var cards = document.querySelectorAll('.cm-cards .cm-card');
  (cm.cards || []).forEach(function (card, i) {
    var box = cards[i] && cards[i].querySelector('.cm-card-shots');
    if (!box || !card || !card.shots || !card.shots.length) return;
    box.innerHTML = '';
    card.shots.forEach(function (it) {
      var o = (typeof it === 'string') ? { src: it } : (it || {});
      if (!o.src) return;
      var z = num(o.zoom, 1);
      var fx = fixedRatio(o.r);
      var a = document.createElement('a');
      a.href = enc(o.src);
      a.target = '_blank';
      a.rel = 'noopener';
      var im = document.createElement('img');
      im.src = enc(o.src);
      im.loading = 'lazy';
      im.alt = '';
      if (fx || z > 1.001) {
        /* 指定了比例或裁剪过：a 当裁剪框（overflow:hidden），img 按「原图比例 × 铺满倍数 × 缩放」放大再偏移。
           注意宽高不能都写 z：那样会把框拉成槽位比例、图被 cover 定死，缩放和拖动就不起作用了 */
        a.className = 'crop';
        a.style.aspectRatio = fx || '3 / 4';
        var paint = function () {
          var w = im.naturalWidth, h = im.naturalHeight;
          if (!w || !h) return;
          var rF = ratioOf(fx) || ratioOf(shotRatio(w, h));
          a.style.aspectRatio = fx || shotRatio(w, h);
          var k = coverK(rF, w / h), kx = k.kx * z, ky = k.ky * z;
          var cx = pan(o.cx, kx), cy = pan(o.cy, ky);
          im.style.width = (kx * 100) + '%';
          im.style.height = (ky * 100) + '%';
          im.style.left = ((0.5 - cx * kx) * 100) + '%';
          im.style.top = ((0.5 - cy * ky) * 100) + '%';
        };
        if (im.complete && im.naturalWidth) paint();
        else im.addEventListener('load', paint);
      }
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
