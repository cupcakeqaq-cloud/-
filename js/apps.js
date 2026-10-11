/* ══════════════════════════════════════════════════════════
   XP 应用：扫雷 / 记事本 / 画图 / 浏览器 / Minecraft / 我的电脑
   依赖 js/winxp.js 暴露的 window.XP（全英文界面，与 XP 一致）
   ══════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (!window.XP) return;

  var XP = window.XP;
  var I = XP.ICON;
  var M = XP.MINE;
  var MC = 'assets/winxp/minecraft.png';

  function t(k, v) { return window.t ? window.t(k, v) : k; }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function stageOf(body) {
    body.classList.add('flush', 'app-col');
    var s = el('div', 'app-stage');
    return s;
  }

  /* ══════════════════════════════════════════════════════════
     扫雷
     ══════════════════════════════════════════════════════════ */
  var LEVELS = [
    { label: 'Beginner', c: 9, r: 9, m: 10 },
    { label: 'Intermediate', c: 16, r: 16, m: 40 },
    { label: 'Expert', c: 30, r: 16, m: 99 }
  ];

  function buildMines(body) {
    body.classList.add('flush', 'app-col');
    var bar = el('div', 'app-bar');
    var stage = el('div', 'app-stage');
    stage.style.cssText = 'background:#c0c0c0;display:flex;align-items:flex-start;justify-content:center;padding:8px;overflow:auto';

    var frame = el('div', 'mine-frame');
    var top = el('div', 'mine-top');
    var ledMines = el('div', 'mine-led', '<i></i><i></i><i></i>');
    var face = el('button', 'mine-face');
    face.type = 'button';
    var ledTime = el('div', 'mine-led', '<i></i><i></i><i></i>');
    top.appendChild(ledMines); top.appendChild(face); top.appendChild(ledTime);
    var grid = el('div', 'mine-grid');
    frame.appendChild(top); frame.appendChild(grid);
    stage.appendChild(frame);

    body.appendChild(bar); body.appendChild(stage);

    var S = {
      lv: LEVELS[0], board: [], open: [], mark: [], flags: 0,
      started: false, over: false, revealed: 0, time: 0, timer: null
    };
    var cells = [];

    function led(node, n) {
      var s = n < 0 ? '-' + String(Math.min(99, -n)).padStart(2, '0') : String(Math.min(999, n)).padStart(3, '0');
      for (var i = 0; i < 3; i++) {
        var ch = s.charAt(i);
        node.children[i].style.backgroundImage =
          'url("' + M + (ch === '-' ? 'digit-' : 'digit' + ch) + '.png")';
      }
    }
    function setFace(name) { face.style.backgroundImage = 'url("' + M + name + '.png")'; }

    function resize() {
      var w = Math.max(224, 46 + S.lv.c * 16);
      var h = 108 + S.lv.r * 16;
      body.style.width = w + 'px';
      body.style.height = h + 'px';
    }

    function build(lv) {
      S.lv = lv;
      S.board = []; S.open = []; S.mark = []; S.flags = 0; S.revealed = 0;
      S.started = false; S.over = false; S.time = 0;
      clearInterval(S.timer); S.timer = null;
      for (var r = 0; r < lv.r; r++) {
        S.board.push([]); S.open.push([]); S.mark.push([]);
        for (var c = 0; c < lv.c; c++) { S.board[r].push(0); S.open[r].push(false); S.mark[r].push(0); }
      }
      grid.style.gridTemplateColumns = 'repeat(' + lv.c + ', 16px)';
      grid.innerHTML = '';
      cells = [];
      for (r = 0; r < lv.r; r++) {
        for (c = 0; c < lv.c; c++) {
          var cell = el('div', 'mine-cell');
          cell.setAttribute('data-r', r);
          cell.setAttribute('data-c', c);
          grid.appendChild(cell);
          cells.push(cell);
        }
      }
      led(ledMines, lv.m); led(ledTime, 0); setFace('smile');
      resize();
    }

    function plant(sr, sc) {
      var pool = [], safe = {};
      for (var dr = -1; dr <= 1; dr++) for (var dc = -1; dc <= 1; dc++) safe[(sr + dr) + ',' + (sc + dc)] = 1;
      for (var r = 0; r < S.lv.r; r++) for (var c = 0; c < S.lv.c; c++) if (!safe[r + ',' + c]) pool.push([r, c]);
      for (var i = pool.length - 1; i > 0; i--) { var j = (Math.random() * (i + 1)) | 0; var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp; }
      for (i = 0; i < S.lv.m && i < pool.length; i++) S.board[pool[i][0]][pool[i][1]] = -1;
      for (r = 0; r < S.lv.r; r++) for (c = 0; c < S.lv.c; c++) {
        if (S.board[r][c] < 0) continue;
        var n = 0;
        for (dr = -1; dr <= 1; dr++) for (dc = -1; dc <= 1; dc++) {
          var nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < S.lv.r && nc >= 0 && nc < S.lv.c && S.board[nr][nc] < 0) n++;
        }
        S.board[r][c] = n;
      }
    }

    function startTimer() {
      if (S.timer) return;
      S.timer = setInterval(function () {
        if (S.over) return;
        S.time++; if (S.time > 999) S.time = 999;
        led(ledTime, S.time);
      }, 1000);
    }

    function paint(r, c) {
      var cell = cells[r * S.lv.c + c];
      var v = S.board[r][c];
      if (S.open[r][c]) {
        cell.className = 'mine-cell open';
        cell.style.backgroundImage = v > 0 ? 'url("' + M + 'open' + v + '.png")' : '';
      } else if (S.mark[r][c] === 1) {
        cell.className = 'mine-cell';
        cell.style.backgroundImage = 'url("' + M + 'flag.png")';
      } else if (S.mark[r][c] === 2) {
        cell.className = 'mine-cell';
        cell.style.backgroundImage = 'url("' + M + 'question.png")';
      } else {
        cell.className = 'mine-cell';
        cell.style.backgroundImage = '';
      }
    }

    function open(r, c) {
      var stack = [[r, c]];
      while (stack.length) {
        var p = stack.pop(), rr = p[0], cc = p[1];
        if (rr < 0 || rr >= S.lv.r || cc < 0 || cc >= S.lv.c) continue;
        if (S.open[rr][cc] || S.mark[rr][cc] === 1) continue;
        S.open[rr][cc] = true; S.revealed++;
        paint(rr, cc);
        if (S.board[rr][cc] === 0) {
          for (var dr = -1; dr <= 1; dr++) for (var dc = -1; dc <= 1; dc++) {
            if (dr || dc) stack.push([rr + dr, cc + dc]);
          }
        }
      }
    }

    function lose(er, ec) {
      S.over = true; clearInterval(S.timer);
      setFace('dead');
      for (var r = 0; r < S.lv.r; r++) for (var c = 0; c < S.lv.c; c++) {
        var cell = cells[r * S.lv.c + c];
        if (S.board[r][c] < 0 && S.mark[r][c] !== 1) {
          cell.className = 'mine-cell' + (r === er && c === ec ? ' boom' : '');
          cell.style.backgroundImage = 'url("' + M + (r === er && c === ec ? 'mine-death' : 'mine-icon') + '.png")';
        } else if (S.board[r][c] >= 0 && S.mark[r][c] === 1) {
          cell.style.backgroundImage = 'url("' + M + 'misflagged.png")';
        }
      }
    }

    function checkWin() {
      if (S.over || S.revealed !== S.lv.r * S.lv.c - S.lv.m) return;
      S.over = true; clearInterval(S.timer);
      setFace('win'); led(ledMines, 0);
      for (var r = 0; r < S.lv.r; r++) for (var c = 0; c < S.lv.c; c++) {
        if (S.board[r][c] < 0 && S.mark[r][c] !== 1) {
          S.mark[r][c] = 1;
          cells[r * S.lv.c + c].style.backgroundImage = 'url("' + M + 'flag.png")';
        }
      }
    }

    function tap(r, c, second) {
      if (S.over) return;
      if (!S.started) { plant(r, c); S.started = true; startTimer(); }
      if (S.open[r][c] || S.mark[r][c] === 1) return;
      if (S.board[r][c] < 0) { S.open[r][c] = true; lose(r, c); return; }
      open(r, c);
      checkWin();
    }

    function mark(r, c) {
      if (S.over || S.open[r][c]) return;
      if (!S.started) { if (S.mark[r][c] === 0) { /* 允许先插旗 */ } }
      S.mark[r][c] = (S.mark[r][c] + 1) % 3;
      S.flags += S.mark[r][c] === 1 ? 1 : (S.mark[r][c] === 2 ? -1 : 0);
      led(ledMines, S.lv.m - S.flags);
      paint(r, c);
    }

    grid.addEventListener('mousedown', function (e) {
      if (e.button !== 0 || S.over) return;
      setFace('ohh');
    });
    document.addEventListener('mouseup', function () { if (!S.over) setFace('smile'); });
    grid.addEventListener('click', function (e) {
      var cell = e.target.closest('.mine-cell');
      if (!cell) return;
      tap(+cell.getAttribute('data-r'), +cell.getAttribute('data-c'));
    });
    grid.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      var cell = e.target.closest('.mine-cell');
      if (!cell) return;
      mark(+cell.getAttribute('data-r'), +cell.getAttribute('data-c'));
    });
    face.addEventListener('click', function () { build(S.lv); });

    LEVELS.forEach(function (lv) {
      var b = el('button', null, lv.label);
      b.type = 'button';
      b.addEventListener('click', function () { build(lv); });
      bar.appendChild(b);
    });

    build(LEVELS[0]);
  }

  /* ══════════════════════════════════════════════════════════
     记事本
     ══════════════════════════════════════════════════════════ */
  function buildNotepad(body) {
    body.classList.add('flush', 'app-col');
    var bar = el('div', 'app-bar');
    var count = el('span', 'bar-item', '0 chars');
    count.style.marginLeft = 'auto';
    count.style.cursor = 'default';

    var ta = el('textarea', 'np-text');
    ta.spellcheck = false;
    ta.placeholder = 'Untitled';

    function upd() { count.textContent = ta.value.length + ' chars'; }
    ta.addEventListener('input', upd);

    var bNew = el('button', null, 'New');
    bNew.type = 'button';
    bNew.addEventListener('click', function () { ta.value = ''; upd(); });

    var bDel = el('button', null, 'Delete');
    bDel.type = 'button';
    bDel.addEventListener('click', function () {
      var i = ta.value.lastIndexOf('\n');
      ta.value = i < 0 ? '' : ta.value.slice(0, i);
      upd();
    });

    var bSave = el('button', null, 'Save as .txt');
    bSave.type = 'button';
    bSave.addEventListener('click', function () {
      var blob = new Blob([ta.value], { type: 'text/plain;charset=utf-8' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'untitled.txt';
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
    });

    var bWrap = el('button', null, 'Word wrap');
    bWrap.type = 'button';
    bWrap.addEventListener('click', function () {
      var off = ta.style.whiteSpace === 'pre';
      ta.style.whiteSpace = off ? '' : 'pre';
      ta.style.overflowX = off ? '' : 'auto';
    });

    bar.appendChild(bNew); bar.appendChild(bDel); bar.appendChild(bSave); bar.appendChild(bWrap); bar.appendChild(count);
    body.appendChild(bar);

    var wrapEl = el('div', 'app-stage');
    wrapEl.appendChild(ta);
    body.appendChild(wrapEl);
    setTimeout(function () { ta.focus(); }, 30);
    upd();
  }

  /* ══════════════════════════════════════════════════════════
     画图：优先嵌 jspaint.app，加载失败自动降级为自研画板
     ══════════════════════════════════════════════════════════ */
  var PAINT_COLORS = ['#000000', '#808080', '#800000', '#ff0000', '#808000', '#ffff00',
    '#008000', '#00ff00', '#008080', '#00ffff', '#000080', '#0000ff',
    '#800080', '#ff00ff', '#ffffff', '#c0c0c0', '#ff8000', '#804000', '#ffc0cb', '#a0e0ff'];

  function localPaint(stage) {
    stage.innerHTML = '';
    stage.classList.add('paint-fallback');
    var wrap = el('div', 'app-col');
    var bar = el('div', 'app-bar');

    var size = 3;
    [1, 3, 6, 12].forEach(function (s) {
      var b = el('button', null, s + 'px');
      b.type = 'button';
      b.addEventListener('click', function () {
        size = s;
        bar.querySelectorAll('button').forEach(function (x) { if (/\d+px/.test(x.textContent)) x.style.background = ''; });
        b.style.background = '#c8dcf8';
      });
      bar.appendChild(b);
    });
    bar.appendChild(el('span', 'bar-item', '·'));

    var color = '#000000';
    var pal = el('div', 'paint-palette');
    PAINT_COLORS.forEach(function (c) {
      var sw = el('button', 'paint-swatch');
      sw.type = 'button';
      sw.style.background = c;
      sw.addEventListener('click', function () {
        color = c;
        pal.querySelectorAll('.paint-swatch').forEach(function (x) { x.classList.remove('active'); });
        sw.classList.add('active');
      });
      if (c === '#000000') sw.classList.add('active');
      pal.appendChild(sw);
    });
    bar.appendChild(pal);

    var cv = el('canvas');
    var ctx = null;
    var clear = el('button', null, 'Clear');
    clear.type = 'button';
    var save = el('button', null, 'Save PNG');
    save.type = 'button';
    clear.style.marginLeft = 'auto';
    bar.appendChild(clear); bar.appendChild(save);

    wrap.appendChild(bar);
    stage.appendChild(wrap);
    var holder = el('div', 'app-stage');
    holder.style.flex = '1';
    holder.appendChild(cv);
    wrap.appendChild(holder);

    function fit() {
      var r = holder.getBoundingClientRect();
      var data = null;
      if (ctx && cv.width) { try { data = ctx.getImageData(0, 0, cv.width, cv.height); } catch (e) {} }
      cv.width = Math.max(80, Math.round(r.width));
      cv.height = Math.max(60, Math.round(r.height));
      ctx = cv.getContext('2d');
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, cv.width, cv.height);
      if (data) { try { ctx.putImageData(data, 0, 0); } catch (e) {} }
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    }
    setTimeout(fit, 0);
    window.addEventListener('resize', fit);

    var drawing = false;
    function pos(e) {
      var r = cv.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    }
    cv.addEventListener('pointerdown', function (e) {
      drawing = true;
      try { cv.setPointerCapture(e.pointerId); } catch (err) {}
      ctx.strokeStyle = color; ctx.lineWidth = size;
      var p = pos(e); ctx.beginPath(); ctx.moveTo(p[0], p[1]);
      ctx.lineTo(p[0] + .01, p[1]); ctx.stroke();
    });
    cv.addEventListener('pointermove', function (e) {
      if (!drawing) return;
      var p = pos(e); ctx.lineTo(p[0], p[1]); ctx.stroke();
    });
    cv.addEventListener('pointerup', function () { drawing = false; });
    cv.addEventListener('pointercancel', function () { drawing = false; });

    clear.addEventListener('click', function () {
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, cv.width, cv.height);
    });
    save.addEventListener('click', function () {
      var a = document.createElement('a');
      a.href = cv.toDataURL('image/png');
      a.download = 'paint.png';
      a.click();
    });
  }

  function buildPaint(body) {
    body.classList.add('flush', 'app-col');
    var bar = el('div', 'app-bar');
    var open = el('button', null, 'Open jspaint.app in a new tab');
    open.type = 'button';
    open.addEventListener('click', function () { window.open('https://jspaint.app/', '_blank', 'noopener'); });
    var hint = el('span', 'bar-item', 'Powered by jspaint.app — falls back to a built-in canvas if it cannot load');
    hint.style.cursor = 'default';
    bar.appendChild(open); bar.appendChild(hint);
    var stage = el('div', 'app-stage');
    body.appendChild(bar); body.appendChild(stage);
    XP.frame(stage, 'https://jspaint.app/', { check: false, timeout: 9000, onFail: function () { localPaint(stage); } });
  }

  /* ══════════════════════════════════════════════════════════
     浏览器（自制 XP 风格 IE：地址栏 + 书签主页 + 假 404 兜底）
     ══════════════════════════════════════════════════════════ */
  var BOOKMARKS = [
    { name: 'Wikipedia 中文', url: 'https://zh.wikipedia.org/wiki/Wikipedia:%E9%A6%96%E9%A1%B5', icon: I + 'earth.png' },
    { name: 'Internet Archive', url: 'https://archive.org/', icon: I + 'earth.png' },
    { name: 'Minecraft Classic', url: 'https://classic.minecraft.net/', icon: MC },
    { name: 'jspaint', url: 'https://jspaint.app/', icon: I + '680(16x16).png' },
    { name: 'OpenStreetMap', url: 'https://www.openstreetmap.org/', icon: I + 'earth.png' }
  ];

  function buildBrowser(body) {
    body.classList.add('flush', 'app-col');
    var bar = el('div', 'browser-bar');
    var addr = el('div', 'browser-addr');
    var stage = el('div', 'app-stage');

    var history = [], ptr = -1;
    var HOME = 'about:home';   /* 书签首页也进历史，否则从首页点进书签后 back 无处可退 */

    function mkBtn(icon, label, fn) {
      var b = el('span', 'bb', '<img src="' + icon + '" alt="">' + (label ? '<span>' + label + '</span>' : ''));
      b.addEventListener('click', fn);
      return b;
    }
    var bBack = mkBtn(I + 'back.png', 'Back', function () { if (ptr > 0) { ptr--; paint(); } });
    var bFwd = mkBtn(I + 'forward.png', 'Forward', function () { if (ptr < history.length - 1) { ptr++; paint(); } });
    var bStop = mkBtn(I + 'stop.png', '', function () { stage.innerHTML = ''; });
    var bRef = mkBtn(I + 'refresh.png', '', function () { paint(); });
    var bHome = mkBtn(I + 'home.png', 'Home', function () { if (history[ptr] !== HOME) go(HOME, true); });
    bar.appendChild(bBack); bar.appendChild(bFwd); bar.appendChild(bStop); bar.appendChild(bRef); bar.appendChild(bHome);

    var input = el('input');
    input.type = 'text';
    input.spellcheck = false;
    input.setAttribute('aria-label', 'Address');
    var lbl = el('label', null, 'Address');
    var goBtn = el('button', null, 'Go');
    goBtn.type = 'button';
    addr.appendChild(lbl); addr.appendChild(input); addr.appendChild(goBtn);

    body.appendChild(bar); body.appendChild(addr); body.appendChild(stage);

    function normalize(v) {
      v = String(v || '').trim();
      if (!v) return '';
      if (/^https?:\/\//i.test(v)) return v;
      if (/^[\w-]+(\.[\w-]+)+([\/?#].*)?$/.test(v)) return 'https://' + v;
      /* 不是网址就当作搜索词 -> 丢给可嵌入的维基百科搜索 */
      return 'https://zh.wikipedia.org/w/index.php?search=' + encodeURIComponent(v);
    }

    function go(url, push) {
      url = normalize(url);
      if (!url) return;
      if (push !== false) {
        history = history.slice(0, ptr + 1);
        history.push(url);
        ptr = history.length - 1;
      }
      paint();
    }

    /* 只负责按当前 history[ptr] 画界面 —— back/forward/home/refresh 都走这里 */
    function paint() {
      var url = history[ptr];
      bBack.style.opacity = ptr > 0 ? 1 : .4;
      bFwd.style.opacity = ptr < history.length - 1 ? 1 : .4;
      if (url === HOME) { input.value = ''; renderHome(); return; }
      input.value = url;
      if (XP.embeddable(url)) {
        stage.innerHTML = '';
        XP.frame(stage, url, { check: false, timeout: 10000, onFail: function () { XP.notFound(stage, url, function () { go(url, false); }); } });
      } else {
        XP.notFound(stage, url, function () { go(url, false); });
      }
    }

    function renderHome() {
      stage.innerHTML = '';
      var h = el('div', 'browser-home');
      var list = '<div class="bh-title">Bookmarks</div><div class="browser-bookmarks">' +
        BOOKMARKS.map(function (b, i) {
          return '<a href="' + b.url + '" data-bm="' + i + '"><img src="' + b.icon + '" alt="">' + b.name + '</a>';
        }).join('') + '</div>';
      h.innerHTML = list;
      h.addEventListener('click', function (e) {
        var a = e.target.closest('[data-bm]');
        if (!a) return;
        e.preventDefault();
        go(a.getAttribute('href') || BOOKMARKS[+a.getAttribute('data-bm')].url, true);
      });
      stage.appendChild(h);
    }

    goBtn.addEventListener('click', function () { go(input.value, true); });
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(input.value, true); });

    function onKey(e) {
      if (e.key === 'Escape') { stage.innerHTML = ''; }
    }
    document.addEventListener('keydown', onKey);
    history = [HOME]; ptr = 0; paint();
  }

  /* ══════════════════════════════════════════════════════════
     Minecraft Classic（iframe 嵌入 + 假 404 兜底）
     ══════════════════════════════════════════════════════════ */
  function buildMinecraft(body) {
    body.classList.add('flush', 'app-col');
    var bar = el('div', 'app-bar');
    var open = el('button', null, 'Open classic.minecraft.net in a new tab');
    open.type = 'button';
    open.addEventListener('click', function () { window.open('https://classic.minecraft.net/', '_blank', 'noopener'); });
    var hint = el('span', 'bar-item', 'Click the game area, then use WASD + mouse. Esc releases the cursor.');
    hint.style.cursor = 'default';
    bar.appendChild(open); bar.appendChild(hint);
    var stage = el('div', 'app-stage');
    stage.style.background = '#000';
    body.appendChild(bar); body.appendChild(stage);
    XP.frame(stage, 'https://classic.minecraft.net/', { timeout: 20000 });
  }

  /* ══════════════════════════════════════════════════════════
     我的电脑
     ══════════════════════════════════════════════════════════ */
  function buildComputer(body) {
    body.classList.add('flush', 'app-col');
    var bar = el('div', 'app-bar');
    [
      ['Back', function () {}],
      ['Up', function () {}],
      ['Search', function () { XP.msg('Search', t('compNoSearch')); }]
    ].forEach(function (it) {
      var b = el('button', null, it[0]);
      b.type = 'button';
      b.addEventListener('click', it[1]);
      bar.appendChild(b);
    });
    var wrap = el('div', 'comp-wrap');
    var side = el('div', 'comp-side');
    var main = el('div', 'comp-main');
    var groups = el('div', 'comp-groups');

    side.innerHTML =
      '<div class="cs-title">System Tasks</div>' +
      '<div class="cs-item" data-loc="info"><img src="' + I + '505(16x16).png" alt="">View system information</div>' +
      '<div class="cs-item" data-loc="add"><img src="' + I + '300(16x16).png" alt="">Add or remove programs</div>' +
      '<div class="cs-item" data-loc="set"><img src="' + I + '302(16x16).png" alt="">Change a setting</div>' +
      '<div class="cs-sep"></div>' +
      '<div class="cs-title">Other Places</div>' +
      '<div class="cs-item" data-loc="docs"><img src="' + I + '318(32x32).png" alt="" style="width:16px;height:16px">My Documents</div>' +
      '<div class="cs-item" data-loc="cpl"><img src="' + I + '300(32x32).png" alt="" style="width:16px;height:16px">Control Panel</div>';

    // 素材包里没有 3.5" 软盘（A:）图标，所以只列硬盘与光驱，避免用错图标
    var DRIVES = [
      { group: 'Hard Disk Drives', icon: I + '334(48x48).png', items: ['Local Disk (C:)', 'Local Disk (D:)'] },
      { group: 'Devices with Removable Storage', icon: I + '111(48x48).png', items: ['CD Drive (E:)'] }
    ];
    groups.innerHTML = DRIVES.map(function (g) {
      return '<div class="comp-group"><h4>' + g.group + '</h4><div class="comp-grid">' +
        g.items.map(function (n) {
          return '<button type="button" class="comp-item" data-drive="' + n + '"><img src="' + g.icon + '" alt=""><span>' + n + '</span></button>';
        }).join('') + '</div></div>';
    }).join('');

    function notReady(label) {
      XP.msg(label, t('compNotReady', { drive: label }), I + '229(16x16).png');
    }
    groups.addEventListener('click', function (e) {
      var it = e.target.closest('.comp-item');
      if (!it) return;
      groups.querySelectorAll('.comp-item').forEach(function (x) { x.style.background = ''; });
      it.style.background = '#c8dcf8';
    });
    groups.addEventListener('dblclick', function (e) {
      var it = e.target.closest('.comp-item');
      if (it) notReady(it.getAttribute('data-drive'));
    });
    side.addEventListener('click', function (e) {
      var it = e.target.closest('[data-loc]');
      if (!it) return;
      notReady(it.textContent.trim());
    });

    main.appendChild(groups);
    wrap.appendChild(side); wrap.appendChild(main);
    body.appendChild(bar); body.appendChild(wrap);
  }

  /* ══════════ 注册应用（顺序 = 开始菜单左栏顺序） ══════════ */
  XP.register({ key: 'minesweeper', name: 'Minesweeper', icon: M + 'mine-icon.png', w: 224, h: 252, build: buildMines });
  XP.register({ key: 'notepad', name: 'Notepad', icon: I + '327(32x32).png', w: 460, h: 340, build: buildNotepad });
  XP.register({ key: 'paint', name: 'Paint', icon: I + '680(32x32).png', w: 720, h: 520, build: buildPaint });
  XP.register({ key: 'browser', name: 'Internet Explorer', icon: I + 'ie.png', w: 760, h: 520, build: buildBrowser });
  XP.register({ key: 'minecraft', name: 'Minecraft', icon: MC, w: 894, h: 610, build: buildMinecraft });
  XP.register({ key: 'computer', name: 'My Computer', icon: I + '676(32x32).png', w: 620, h: 440, build: buildComputer });
})();
