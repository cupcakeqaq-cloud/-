/* ══════════════════════════════════════════════════════════
   Windows Media Player（第 9 批，站主 m02318 第 3~5 条）

   设计要点（改动前先读这段）：
   1. <audio> 是**单例引擎**，不放在窗口里。窗口只是一层皮：
      **关窗＝停止播放，最小化继续放**（走 XP 的 rec.onClose 钩子）。
   2. 播放顺序写死在 FILES 里 = 站主截图 01→12 的顺序（截图括号里的
      「（軌域）」「（替代品）」是歌名翻译，站主明确说不显示，只用来对顺序）。
   3. 歌名 / 歌手 / 封面优先读 mp3 **内嵌 ID3v2**（TIT2 / TPE1 / APIC 封面），
      读不到回落文件名 + `music/日刊：遺書.jpg`（所以 file:// 直接开页面时
      封面统一是那张 jpg —— fetch 在 file:// 下必失败，这是浏览器限制不是 bug）。
   4. 跨页续播：localStorage `cupcake-music-v1` 存 {file,t}（**只在播放中写，
      暂停/关窗就删**）；跳转页只加载引擎、不建窗口也不建任务栏按钮。
      # ponytail: 切页必然有 ~0.2s 断点，且浏览器可能拦自动播放，拦了就挂一次
      # 首次点击续播 —— 这是物理限制，别试图用 Web Audio 绕。
   5. UI = Windows 7 Frutiger Aero 皮肤（玻璃渐变浅蓝面板 + 大封面 + 歌名/歌手 +
      `1 of 12` + 普通文字时长 `1:18` / `-0:26` + 右侧可滚动列表），界面文案全英文
      （与另外六个 XP 应用一致）。站主 m00628 明确：不要七段数码管那种花哨时长。
   6. 站主 m00628 报的两个 bug：① 「进度全是乱序的」＝ 七段数码管的数字映射错位
      （`fmt()` 出的 "00:24" 被按字符位置塞进 4 个数码管，冒号那一位被吞掉，
      最后一位数字永远不显示）—— 改成普通文字后自然消失；② 「下一首进度直接跳了
      一大半」＝ 切歌瞬间 `render()` 拿上一首已经播完的 currentTime / duration 算百分比。
      现在一律走 `metrics()`，只在 `audio.readyState >= 1`（新歌元数据到位）时才读值。
   ══════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (!window.XP) return;

  var XP = window.XP;
  var DIR = 'music/';
  var FALLBACK_COVER = DIR + '日刊：遺書.jpg';
  var STATE_KEY = 'cupcake-music-v1';
  var VOL_KEY = 'cupcake-music-vol';

  /* 播放顺序 = 站主截图 01→12 */
  var FILES = [
    'ぬゆり - おるびたる.mp3',
    'ぬゆり,鏡音リン - DE-Pression.mp3',
    'ぬゆり,GUMI - 新しい夜.mp3',
    'ぬゆり - おるたねいと.mp3',
    'ぬゆり,GUMI - ギミイ.mp3',
    'ぬゆり - コーヒーメイカー.mp3',
    'ぬゆり - over_turn.mp3',
    'ぬゆり,majiko - 幾千のテロリズムに.mp3',
    'ぬゆり,GUMI - 灰になってしまいそうだ.mp3',
    'ぬゆり,GUMI - 墜落した水.mp3',
    'ぬゆり,GUMI - 侮蔑.mp3',
    'ぬゆり - 入水.mp3'
  ];

  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function fmt(sec) {
    if (!isFinite(sec) || sec < 0) sec = 0;
    return pad2(Math.floor(sec / 60)) + ':' + pad2(Math.floor(sec % 60));
  }
  function urlOf(f) { return DIR + encodeURIComponent(f); }
  /* 歌手分隔符统一成「 / 」（ID3 里是半角 /，文件名里是半角 ,，站主参考图是「ぬゆり / GUMI」） */
  function pretty(a) { return String(a || '').replace(/\s*[/,]\s*/g, ' / '); }

  /* ── 元数据：文件名先兜底，ID3 到了再覆盖 ── */
  var META = FILES.map(function (f) {
    var base = f.replace(/\.mp3$/i, '');
    var p = base.split(' - ');
    return {
      file: f,
      title: p.length > 1 ? p.slice(1).join(' - ') : base,
      artist: pretty(p.length > 1 ? p[0] : ''),
      cover: FALLBACK_COVER,
      state: 0        /* 0 未取 1 取中 2 取完 */
    };
  });

  /* ── 单例引擎 ── */
  var audio = new Audio();
  var cur = -1, listeners = [], dragged = false;

  audio.preload = 'metadata';
  (function initVol() {
    var v = parseFloat(localStorage.getItem(VOL_KEY));
    audio.volume = isNaN(v) ? 0.9 : Math.min(1, Math.max(0, v));
  })();

  function emit() { listeners.forEach(function (f) { f(); }); }

  /* ══════════ ID3v2 解析（只要头部那点数据，解完立刻掐断连接） ══════════ */
  function ascii(b) { var s = ''; for (var i = 0; i < b.length; i++) s += String.fromCharCode(b[i]); return s; }
  function dec(b, enc) {
    var t = b;
    try {
      if (enc === 1) return new TextDecoder('utf-16le').decode(t);
      if (enc === 2) return new TextDecoder('utf-16be').decode(t);
      if (enc === 3) return new TextDecoder('utf-8').decode(t);
    } catch (e) { /* 老浏览器没有 TextDecoder 就走下面的 latin1 兜底 */ }
    return ascii(t);
  }
  function textOf(f) { return dec(f.subarray(1), f[0]).replace(/\0+/g, '').trim(); }
  function coverOf(f) {
    var enc = f[0], i = 1, z = i;
    while (z < f.length && f[z] !== 0) z++;
    var mime = ascii(f.subarray(i, z)); i = z + 1;
    i++;                                    /* 图片类型 1 字节 */
    if (enc === 1 || enc === 2) {           /* 描述串按编码决定终止符宽度 */
      while (i + 1 < f.length && !(f[i] === 0 && f[i + 1] === 0)) i += 2;
      i += 2;
    } else {
      while (i < f.length && f[i] !== 0) i++;
      i++;
    }
    if (i >= f.length) return null;
    return { mime: mime || 'image/jpeg', data: f.subarray(i) };
  }
  /* 返回 {need:N} 表示 tag 还没读全，要继续喂数据 */
  function parseID3(buf) {
    if (buf.length < 10 || buf[0] !== 0x49 || buf[1] !== 0x44 || buf[2] !== 0x33) return null;
    var ver = buf[3];
    var size = ((buf[6] & 0x7f) << 21) | ((buf[7] & 0x7f) << 14) | ((buf[8] & 0x7f) << 7) | (buf[9] & 0x7f);
    if (buf.length < 10 + size) return { need: 10 + size };
    var end = 10 + size, pos = 10, out = { title: '', artist: '', cover: null };
    while (pos + 10 <= end) {
      var id = ascii(buf.subarray(pos, pos + 4));
      if (id.charCodeAt(0) === 0) break;
      var fs;
      if (ver === 4) fs = ((buf[pos + 4] & 0x7f) << 21) | ((buf[pos + 5] & 0x7f) << 14) | ((buf[pos + 6] & 0x7f) << 7) | (buf[pos + 7] & 0x7f);
      else fs = (buf[pos + 4] << 24) | (buf[pos + 5] << 16) | (buf[pos + 6] << 8) | buf[pos + 7];
      var st = pos + 10;
      if (fs <= 0 || st + fs > end) break;
      var f = buf.subarray(st, st + fs);
      if (id === 'TIT2') out.title = textOf(f);
      else if (id === 'TPE1') out.artist = textOf(f);
      else if (id === 'APIC' && !out.cover) out.cover = coverOf(f);
      pos = st + fs;
    }
    return out;
  }

  function fetchID3(i) {
    var m = META[i];
    if (!m || m.state) return;
    m.state = 1;
    if (typeof fetch !== 'function') { m.state = 2; return; }
    var chunks = [], total = 0, done = false;
    function finish(ids) {
      if (done) return;
      done = true;
      if (ids && !ids.need) {
        if (ids.title) m.title = ids.title;
        if (ids.artist) m.artist = pretty(ids.artist);
        if (ids.cover) {
          try { m.cover = URL.createObjectURL(new Blob([ids.cover.data], { type: ids.cover.mime })); } catch (e) {}
        }
      }
      m.state = 2;
      emit();
    }
    fetch(urlOf(m.file), { headers: { Range: 'bytes=0-65535' } }).then(function (res) {
      if (!res.body || !res.body.getReader) { return res.arrayBuffer().then(function (b) { finish(parseID3(new Uint8Array(b))); }); }
      var reader = res.body.getReader();
      function pump() {
        return reader.read().then(function (r) {
          if (r.done) { finish(parseID3(concat())); return; }
          chunks.push(r.value);
          total += r.value.length;
          var ids = parseID3(concat());
          if (ids && !ids.need) { finish(ids); return reader.cancel(); }
          /* 一张 600×600 的封面通常几百 KB；超过 8MB 说明这文件没有可用 tag，别再拖了 */
          if (total > 8 * 1024 * 1024) { finish(null); return reader.cancel(); }
          return pump();
        });
      }
      return pump();
    }).catch(function () { finish(null); });

    function concat() {
      var u = new Uint8Array(total), o = 0;
      for (var k = 0; k < chunks.length; k++) { u.set(chunks[k], o); o += chunks[k].length; }
      return u;
    }
  }

  /* ══════════ 播放控制 ══════════ */
  /* 进度 / 时长的唯一出口：切歌那一瞬间新歌还没元数据（readyState 已归 0），
     这时如果照旧读 audio.duration / currentTime，拿到的还是上一首播完的值 ——
     站主 m00628 报的「下一首进度直接跳了一大半」就是这么来的。 */
  function metrics() {
    if (cur < 0 || audio.readyState < 1) return { t: 0, d: 0 };
    var d = audio.duration;
    if (!isFinite(d) || d <= 0) return { t: 0, d: 0 };
    var t = audio.currentTime;
    return { t: isFinite(t) && t > 0 ? t : 0, d: d };
  }
  function play(i, at) {
    if (i < 0 || i >= FILES.length) i = 0;
    cur = i;
    dragged = false;
    fetchID3(i);
    audio.src = urlOf(FILES[i]);
    if (at) {
      var once = function () { audio.removeEventListener('loadedmetadata', once); try { audio.currentTime = at; } catch (e) {} emit(); };
      audio.addEventListener('loadedmetadata', once);
    }
    var p = audio.play();
    if (p && p.catch) p.catch(function () { armResume(); });
    emit();
  }
  function toggle() {
    if (cur < 0) { play(0); return; }
    if (audio.paused) { var p = audio.play(); if (p && p.catch) p.catch(function () { armResume(); }); }
    else audio.pause();
    emit();
  }
  function next() { play(cur < 0 ? 0 : (cur + 1) % FILES.length); }
  function prev() {
    if (cur < 0) { play(0); return; }
    if (audio.currentTime > 3) { audio.currentTime = 0; emit(); return; }  /* WMP 手感：播过 3 秒先回开头 */
    play((cur - 1 + FILES.length) % FILES.length);
  }
  function stop() { audio.pause(); try { audio.currentTime = 0; } catch (e) {} clearState(); emit(); }

  var armed = false;
  function armResume() {
    if (armed) return;
    armed = true;
    function go() {
      document.removeEventListener('pointerdown', go, true);
      document.removeEventListener('keydown', go, true);
      if (audio.paused && audio.src) { var p = audio.play(); if (p && p.catch) p.catch(function () {}); }
    }
    document.addEventListener('pointerdown', go, true);
    document.addEventListener('keydown', go, true);
  }

  /* ── 跨页续播状态 ── */
  var lastSave = 0;
  function saveState() {
    if (audio.paused || cur < 0) return;
    var mt = metrics();
    if (!mt.d) return;   /* 新歌元数据还没到位：此刻 audio.currentTime 还是上一首的值，存下去就会「一开就跳到一大半」 */
    try { localStorage.setItem(STATE_KEY, JSON.stringify({ file: FILES[cur], t: mt.t })); } catch (e) {}
  }
  function clearState() { try { localStorage.removeItem(STATE_KEY); } catch (e) {} }

  audio.addEventListener('timeupdate', function () {
    var n = Date.now();
    if (n - lastSave > 900) { lastSave = n; saveState(); }
    emit();
  });
  audio.addEventListener('pause', function () { if (audio.paused) clearState(); emit(); });
  audio.addEventListener('play', emit);
  audio.addEventListener('ended', next);
  audio.addEventListener('volumechange', function () {
    try { localStorage.setItem(VOL_KEY, String(audio.volume)); } catch (e) {}
    emit();
  });
  window.addEventListener('pagehide', saveState);

  /* 进页面就看看上次在放什么（跳转页只有引擎，没有窗口） */
  (function resume() {
    var s = null;
    try { s = JSON.parse(localStorage.getItem(STATE_KEY) || 'null'); } catch (e) {}
    if (!s || !s.file) return;
    var i = FILES.indexOf(s.file);
    if (i < 0) return;
    cur = i;
    fetchID3(i);
    audio.src = urlOf(s.file);
    audio.addEventListener('loadedmetadata', function () {
      if (s.t && (!audio.duration || s.t < audio.duration - 1)) { try { audio.currentTime = s.t; } catch (e) {} }
      var p = audio.play();
      if (p && p.catch) p.catch(function () { armResume(); });
      emit();
    });
  })();

  /* ══════════ 窗口 UI（Windows 7 Frutiger Aero 皮肤） ══════════ */
  function build(body, rec) {
    rec.onClose = function () { stop(); };
    body.classList.add('flush', 'wmp-body');
    body.innerHTML =
      '<div class="wmp">' +
        '<div class="wmp-left">' +
          '<div class="wmp-hero">' +
            '<div class="wmp-screen"><img class="wmp-cover" alt=""></div>' +
            '<div class="wmp-meta">' +
              '<span class="wmp-title">—</span>' +
              '<span class="wmp-artist"></span>' +
            '</div>' +
          '</div>' +
          '<div class="wmp-bar">' +
            '<span class="wmp-cur">0:00</span>' +
            '<div class="wmp-seek" title="Seek"><div class="wmp-seekfill"></div><span class="wmp-knob"></span></div>' +
            '<span class="wmp-rem">-0:00</span>' +
          '</div>' +
          '<div class="wmp-ctl">' +
            '<button type="button" class="wmp-btn prev" aria-label="Previous"></button>' +
            '<button type="button" class="wmp-btn play" aria-label="Play"></button>' +
            '<button type="button" class="wmp-btn next" aria-label="Next"></button>' +
            '<span class="wmp-spacer"></span>' +
            '<span class="wmp-volico" aria-hidden="true"></span>' +
            '<input class="wmp-vol" type="range" min="0" max="100" step="1" aria-label="Volume">' +
          '</div>' +
        '</div>' +
        '<div class="wmp-right">' +
          '<div class="wmp-head">Playlist</div>' +
          '<div class="wmp-list"></div>' +
        '</div>' +
      '</div>';

    var q = function (s) { return body.querySelector(s); };
    var cover = q('.wmp-cover'), title = q('.wmp-title'), artist = q('.wmp-artist');
    var curEl = q('.wmp-cur'), remEl = q('.wmp-rem');
    var seek = q('.wmp-seek'), fill = q('.wmp-seekfill'), knob = q('.wmp-knob');
    var playBtn = q('.wmp-btn.play'), vol = q('.wmp-vol'), list = q('.wmp-list');

    list.innerHTML = FILES.map(function (f, i) {
      return '<button type="button" class="wmp-row" data-i="' + i + '">' +
        '<span class="wmp-n">' + pad2(i + 1) + '</span>' +
        '<span class="wmp-t"></span><span class="wmp-a"></span></button>';
    }).join('');

    function paint(pct) { fill.style.width = pct + '%'; knob.style.left = pct + '%'; }

    function render() {
      var i = cur >= 0 ? cur : 0;
      var m = META[i];
      if (cover.getAttribute('src') !== m.cover) cover.setAttribute('src', m.cover);
      title.textContent = m.title;
      artist.textContent = m.artist;
      var mt = metrics();
      curEl.textContent = fmt(mt.t);
      remEl.textContent = '-' + fmt(mt.d > 0 ? Math.max(0, mt.d - mt.t) : 0);
      paint(mt.d > 0 ? Math.min(100, mt.t / mt.d * 100) : 0);
      playBtn.classList.toggle('playing', cur >= 0 && !audio.paused);
      Array.prototype.forEach.call(list.children, function (row, k) {
        row.classList.toggle('on', k === cur);
        row.querySelector('.wmp-t').textContent = META[k].title;
        row.querySelector('.wmp-a').textContent = META[k].artist;
      });
    }

    playBtn.addEventListener('click', toggle);
    q('.wmp-btn.next').addEventListener('click', next);
    q('.wmp-btn.prev').addEventListener('click', prev);
    list.addEventListener('click', function (e) {
      var row = e.target.closest('.wmp-row');
      if (!row) return;
      var i = +row.getAttribute('data-i');
      if (i === cur) toggle(); else play(i);
    });
    vol.addEventListener('input', function () { audio.volume = vol.value / 100; });
    vol.value = Math.round(audio.volume * 100);

    function seekTo(e) {
      var mt = metrics();                 /* 新歌元数据没到位就不给拖（否则会拿上一首的时长算） */
      if (!mt.d) return;
      var r = seek.getBoundingClientRect();
      var p = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      audio.currentTime = p * mt.d;
      curEl.textContent = fmt(p * mt.d);
      remEl.textContent = '-' + fmt(Math.max(0, mt.d - p * mt.d));
      paint(p * 100);
    }
    seek.addEventListener('pointerdown', function (e) {
      dragged = true;
      try { seek.setPointerCapture(e.pointerId); } catch (err) {}
      seekTo(e); e.preventDefault();
    });
    seek.addEventListener('pointermove', function (e) { if (dragged) seekTo(e); });
    function endSeek(e) {
      if (!dragged) return;
      dragged = false;
      try { seek.releasePointerCapture(e.pointerId); } catch (err) {}
      saveState(); emit();
    }
    seek.addEventListener('pointerup', endSeek);
    seek.addEventListener('pointercancel', endSeek);

    /* 等比缩放：窗口被最大化/拉伸时只动这一个系数（站主 m00874：比例固定不变） */
    var stage = body.querySelector('.wmp');
    function fit() {
      var w = body.clientWidth, h = body.clientHeight;
      if (!w || !h) return;
      var s = Math.min(w / 620, h / 340);
      stage.style.setProperty('--wmp-scale', s.toFixed(4));
    }
    var ro = null;
    if (window.ResizeObserver) { ro = new window.ResizeObserver(fit); ro.observe(body); }
    else window.addEventListener('resize', fit);
    fit();

    listeners.push(render);
    rec.onClose = function () {
      stop();
      listeners = listeners.filter(function (f) { return f !== render; });
      if (ro) ro.disconnect(); else window.removeEventListener('resize', fit);
    };
    if (cur < 0) fetchID3(0);   /* 还没开始听：先把第一首的内嵌封面读出来撑场面 */
    render();
  }

  /* 只有主页把播放器当 XP 应用挂出来（开始菜单 + 桌面快捷方式 + 任务栏）；
     两个跳转页只跑引擎做后台续播，站主 m02318 明确要求那边不留按钮。 */
  var page = document.body.getAttribute('data-page') || 'index';
  if (page === 'index') {
    XP.register({ key: 'music', name: 'Windows Media Player', icon: 'assets/winxp/music.png', w: 620, h: 340, build: build });
  }
  window.MusicPlayer = { play: play, toggle: toggle, next: next, prev: prev, files: FILES.slice() };
})();
