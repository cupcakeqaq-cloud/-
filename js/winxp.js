/* ══════════════════════════════════════════════════════════
   winXP 外壳：任务栏 / 开始菜单 / 可拖动窗口 / 电源流程 / 假 404
   规格抄自开源项目 winXP-master (MIT, ShizukuIchi)
   本文件不依赖任何框架，暴露 window.XP 给各页面与应用使用。
   ══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var ICON = 'assets/winxp/windowsIcons/';
  var MINE = 'assets/winxp/minesweeper/';

  /* 允许被 iframe 嵌入的站点白名单（其余一律按「假 404」处理：
     浏览器拿不到跨域 iframe 的真实内容，只能靠白名单 + 超时兜底） */
  var EMBEDDABLE = [
    'wikipedia.org', 'wikimedia.org', 'archive.org', 'jspaint.app',
    'classic.minecraft.net', 'example.com', 'openstreetmap.org',
    'neocities.org', 'codepen.io', 'itch.io', 'player.vimeo.com',
    'youtube.com/embed', 'bandcamp.com', 'w3.org', 'developer.mozilla.org'
  ];

  var XP = window.XP = {
    ICON: ICON,
    MINE: MINE,
    apps: [],
    registry: {},
    wins: [],
    layer: null,
    zTop: 50
  };

  function t(k, vars) { return window.t ? window.t(k, vars) : k; }
  function byId(id) { return document.getElementById(id); }
  function mk(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* ══════════ 应用注册 ══════════ */
  XP.register = function (app) {
    XP.apps.push(app);
    XP.registry[app.key] = app;
  };

  XP.launch = function (key) {
    var app = XP.registry[key];
    if (!app) {
      /* 页面里原生存在的窗口（.win[data-win]）：重新打开 / 还原 / 聚焦 */
      var own = XP.wins.filter(function (w) { return w.adopted && w.key === key; })[0];
      if (own) { reopen(own); restoreWin(own); focusWin(own); return own; }
      return null;
    }
    if (app.single !== false) {
      var found = XP.wins.filter(function (w) { return w.key === key; })[0];
      if (found) { focusWin(found); return found; }
    }
    return XP.openWindow({
      key: key,
      title: app.name,
      icon: app.icon,
      w: app.w || 420,
      h: app.h || 320,
      build: app.build
    });
  };

  /* ══════════ 窗口 ══════════ */
  function bodyOf(rec) { return rec.el.querySelector('.win-body'); }

  XP.openWindow = function (o) {
    var rec = { key: o.key, title: o.title, icon: o.icon, min: false, floating: true, ph: null };
    var el = mk('div', 'win floating');
    el.style.left = o.x != null ? o.x + 'px' : Math.max(12, Math.round((window.innerWidth - o.w) / 2) + (Math.random() * 40 - 20)) + 'px';
    el.style.top = o.y != null ? o.y + 'px' : (52 + Math.round(Math.random() * 48)) + 'px';
    el.style.zIndex = ++XP.zTop;

    var bar = mk('div', 'titlebar');
    bar.innerHTML =
      (o.icon ? '<img class="tb-icon" src="' + o.icon + '" alt="">' : '') +
      '<span class="tb-title">' + esc(o.title) + '</span>' +
      '<span class="tb-btns"><i class="tb-min" title="Minimize">—</i>' +
      (o.noMax ? '' : '<i class="tb-max" title="Maximize">□</i>') +
      (o.closable === false ? '' : '<i class="tb-close" title="Close">×</i>') + '</span>';
    el.appendChild(bar);

    var body = mk('div', 'win-body');
    body.style.width = o.w + 'px';
    body.style.height = o.h + 'px';
    el.appendChild(body);

    rec.el = el;
    rec.body = body;
    XP.layer.appendChild(el);
    XP.wins.push(rec);
    bindWindow(rec);
    addTask(rec);
    if (o.build) o.build(body, rec);
    focusWin(rec);
    return rec;
  };

  function closeWin(rec) {
    /* 页面里本来就写好的窗口（data-win）：关闭 = 先归位再隐藏，任务栏按钮撤掉，
       之后可以用开始菜单的「整理所有窗口」把它们全部请回来 */
    if (rec.adopted) {
      if (rec.floating) toFlow(rec);
      rec.el.classList.remove('maximized');
      rec.el.classList.add('closed');
      rec.min = false;
      if (rec.maxBtn) { rec.maxBtn.classList.remove('restore'); }
      if (rec.task) { rec.task.remove(); rec.task = null; }
      if (XP.active === rec) XP.active = null;
      syncTasks();
      return;
    }
    if (rec.ph) { rec.ph.remove(); rec.ph = null; }
    if (rec.task) rec.task.remove();
    rec.el.remove();
    XP.wins = XP.wins.filter(function (w) { return w !== rec; });
    if (XP.wins.length) focusWin(XP.wins[XP.wins.length - 1]);
  }

  /* 关闭过的页面窗口重新出现 */
  function reopen(rec) {
    if (!rec.el.classList.contains('closed')) return;
    rec.el.classList.remove('closed');
    if (!rec.task) addTask(rec);
  }

  function focusWin(rec) {
    if (rec.min) { rec.min = false; rec.el.classList.remove('minimized'); }
    if (rec.floating) rec.el.style.zIndex = (XP.zTop = XP.zTop >= 68 ? 50 : XP.zTop + 1);
    XP.wins.forEach(function (w) { w.el.classList.toggle('blur', w !== rec); });
    XP.active = rec;
    syncTasks();
  }

  function minimizeWin(rec) {
    rec.min = true;
    rec.el.classList.add('minimized');
    if (XP.active === rec) XP.active = null;
    syncTasks();
  }

  function restoreWin(rec) {
    rec.min = false;
    rec.el.classList.remove('minimized');
    if (!rec.floating) {
      try { rec.el.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) { rec.el.scrollIntoView(); }
    } else {
      focusWin(rec);
    }
    syncTasks();
  }

  /* 文档流 ⇄ 浮动 切换（原位置留占位，可一键归位） */
  function toFloat(rec) {
    if (rec.floating) return;
    var r = rec.el.getBoundingClientRect();
    var b = bodyOf(rec).getBoundingClientRect();
    var ph = mk('div', 'win-placeholder');
    ph.style.height = Math.round(r.height) + 'px';
    rec.el.parentNode.insertBefore(ph, rec.el);
    rec.ph = ph;
    XP.layer.appendChild(rec.el);
    rec.el.classList.add('floating');
    rec.el.style.left = Math.round(r.left) + 'px';
    rec.el.style.top = Math.round(r.top) + 'px';
    rec.el.style.zIndex = (XP.zTop = XP.zTop >= 68 ? 50 : XP.zTop + 1);
    bodyOf(rec).style.width = Math.round(b.width) + 'px';
    bodyOf(rec).style.height = Math.round(b.height) + 'px';
    rec.floating = true;
  }

  function toFlow(rec) {
    if (!rec.floating) return;
    if (rec.ph) {
      rec.ph.parentNode.insertBefore(rec.el, rec.ph);
      rec.ph.remove();
      rec.ph = null;
    }
    rec.el.classList.remove('floating');
    rec.el.style.left = rec.el.style.top = rec.el.style.zIndex = '';
    rec.body.style.width = rec.body.style.height = '';
    rec.floating = false;
  }

  XP.toFlow = toFlow;
  XP.toFloat = toFloat;

  /* 最大化 / 还原（还原时回到原来的位置；本来是页面内窗口的还原回文档流） */
  function toggleMax(rec) {
    var b = bodyOf(rec);
    if (rec.maxed) {
      rec.maxed = false;
      rec.el.classList.remove('maximized');
      b.style.width = rec.prevW || '';
      b.style.height = rec.prevH || '';
      if (rec.prevFloating) {
        rec.el.style.left = rec.prevL || '';
        rec.el.style.top = rec.prevT || '';
      } else {
        toFlow(rec);
      }
    } else {
      rec.prevFloating = rec.floating;
      rec.prevW = b.style.width; rec.prevH = b.style.height;
      rec.prevL = rec.el.style.left; rec.prevT = rec.el.style.top;
      if (!rec.floating) toFloat(rec);
      rec.maxed = true;
      rec.el.classList.add('maximized');
      b.style.width = ''; b.style.height = '';
      rec.el.style.left = ''; rec.el.style.top = '';
      rec.el.style.zIndex = (XP.zTop = XP.zTop >= 68 ? 50 : XP.zTop + 1);
    }
    if (rec.maxBtn) rec.maxBtn.classList.toggle('restore', !!rec.maxed);
    focusWin(rec);
    syncTasks();
  }

  /* 右下角握把：拖动缩放窗口，内部用 flex 自适应 */
  function bindGrip(rec) {
    if (rec.fixed || rec.grip) return;
    var g = mk('div', 'win-grip');
    rec.el.appendChild(g);
    rec.grip = g;
    var sizing = false, sx = 0, sy = 0, w0 = 0, h0 = 0;
    g.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) return;
      focusWin(rec);
      if (!rec.floating) toFloat(rec);
      if (rec.maxed) toggleMax(rec);
      var b = bodyOf(rec);
      sizing = true;
      sx = e.clientX; sy = e.clientY;
      w0 = b.offsetWidth; h0 = b.offsetHeight;
      try { g.setPointerCapture(e.pointerId); } catch (err) {}
      e.preventDefault();
      e.stopPropagation();
    });
    g.addEventListener('pointermove', function (e) {
      if (!sizing) return;
      var b = bodyOf(rec);
      b.style.width = Math.max(190, w0 + e.clientX - sx) + 'px';
      b.style.height = Math.max(110, h0 + e.clientY - sy) + 'px';
    });
    function end(e) {
      if (!sizing) return;
      sizing = false;
      try { g.releasePointerCapture(e.pointerId); } catch (err) {}
    }
    g.addEventListener('pointerup', end);
    g.addEventListener('pointercancel', end);
  }

  function bindWindow(rec) {
    var bar = rec.el.querySelector('.titlebar');
    if (!bar) return;
    var dragging = false, sx = 0, sy = 0, ox = 0, oy = 0, moved = false;

    bar.addEventListener('pointerdown', function (e) {
      if (e.target.closest('.tb-btns')) return;
      if (e.button !== 0) return;
      focusWin(rec);
      dragging = true; moved = false;
      var r = rec.el.getBoundingClientRect();
      sx = e.clientX; sy = e.clientY; ox = r.left; oy = r.top;
      try { bar.setPointerCapture(e.pointerId); } catch (err) {}
      e.preventDefault();
    });

    bar.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      if (!moved && Math.abs(dx) + Math.abs(dy) > 3) {
        moved = true;
        if (!rec.floating) { toFloat(rec); ox = rec.el.getBoundingClientRect().left; oy = rec.el.getBoundingClientRect().top; sx = e.clientX; sy = e.clientY; dx = dy = 0; }
      }
      if (!rec.floating) return;
      var w = rec.el.offsetWidth, h = rec.el.offsetHeight;
      var nx = Math.min(window.innerWidth - 44, Math.max(44 - w, ox + dx));
      var ny = Math.min(window.innerHeight - 46, Math.max(0, oy + dy));
      rec.el.style.left = Math.round(nx) + 'px';
      rec.el.style.top = Math.round(ny) + 'px';
    });

    function end(e) {
      if (!dragging) return;
      dragging = false;
      try { bar.releasePointerCapture(e.pointerId); } catch (err) {}
    }
    bar.addEventListener('pointerup', end);
    bar.addEventListener('pointercancel', end);

    /* 双击标题栏 = 浮动 / 归位 切换（唯一的一键归位入口，另一处在开始菜单） */
    bar.addEventListener('dblclick', function (e) {
      if (e.target.closest('.tb-btns')) return;
      if (rec.floating) toFlow(rec); else toFloat(rec);
    });

    var min = bar.querySelector('.tb-min');
    if (min) min.addEventListener('click', function () {
      if (rec.min) restoreWin(rec); else minimizeWin(rec);
    });
    var max = bar.querySelector('.tb-max');
    if (max) {
      rec.maxBtn = max;
      max.addEventListener('click', function () { toggleMax(rec); });
    }
    var cls = bar.querySelector('.tb-close');
    if (cls) cls.addEventListener('click', function () { closeWin(rec); });

    rec.el.addEventListener('pointerdown', function () { focusWin(rec); }, true);
    bindGrip(rec);
  }

  /* 接管 HTML 里已经写好的窗口（带 data-win 的 .win） */
  XP.adopt = function (el) {
    if (el.__xp) return null;
    el.__xp = 1;
    var bar = el.querySelector('.titlebar');
    var ico = bar && bar.querySelector('.tb-icon');
    var title = bar && bar.querySelector('.tb-title');
    /* 固定式窗口（委托页/资源页的浏览器窗）：不可拖动、不可最大化/关闭，只留按钮做装饰 */
    var fixed = el.hasAttribute('data-fixed');
    if (fixed) el.classList.add('browser-fixed');
    var btns = bar && bar.querySelector('.tb-btns');
    if (btns && !btns.querySelector('.tb-close')) {
      btns.innerHTML = '<i class="tb-min" title="Minimize">—</i><i class="tb-max" title="Maximize">□</i><i class="tb-close" title="Close">×</i>';
    }
    var rec = {
      key: el.id || 'win-' + XP.wins.length,
      el: el,
      body: el.querySelector('.win-body'),
      title: title ? title.textContent : '',
      icon: ico ? ico.getAttribute('src') : '',
      min: false, floating: false, ph: null, adopted: true, fixed: fixed
    };
    XP.wins.push(rec);
    if (!fixed) { bindWindow(rec); addTask(rec); }
    return rec;
  };

  /* ══════════ 任务栏 ══════════ */
  var taskTasks;
  function addTask(rec) {
    if (!taskTasks) taskTasks = byId('taskTasks');
    if (!taskTasks) return;
    var b = mk('button', 'task-item');
    b.type = 'button';
    b.innerHTML = (rec.icon ? '<img src="' + rec.icon + '" alt="">' : '') + '<span></span>';
    b.querySelector('span').textContent = rec.title;
    b.title = rec.title;
    b.addEventListener('click', function () {
      if (rec.min) restoreWin(rec);
      else if (XP.active === rec) minimizeWin(rec);
      else { if (!rec.floating) rec.el.scrollIntoView({ block: 'nearest' }); focusWin(rec); }
    });
    rec.task = b;
    taskTasks.appendChild(b);
    syncTasks();
  }

  function syncTasks() {
    XP.wins.forEach(function (w) {
      if (!w.task) return;
      w.task.classList.toggle('active', !w.min && XP.active === w);
    });
    var st = byId('startBtn');
    if (st) { /* 开始按钮的按下态 */ }
  }

  function relabelTasks() {
    XP.wins.forEach(function (w) {
      var tt = w.el.querySelector('.tb-title');
      if (tt) w.title = tt.textContent;
      if (w.task) { w.task.querySelector('span').textContent = w.title; w.task.title = w.title; }
    });
  }

  function tickClock() {
    var c = byId('taskClock');
    if (!c) return;
    var d = new Date();
    var h = d.getHours() % 12; if (h === 0) h = 12;
    c.textContent = h + ':' + String(d.getMinutes()).padStart(2, '0') + ' ' + (d.getHours() < 12 ? 'AM' : 'PM');
  }

  /* ══════════ 开始菜单 ══════════ */
  /* 导航（返回主页 / 委托相关事宜 / 资源配布）+ Survivor 友链；extern 的新标签打开 */
  var NAV = [
    { key: 'index', nameKey: 'menuHome', icon: ICON + 'windows.png', href: 'index.html' },
    { key: 'commission', nameKey: 'menuCommission', icon: ICON + '887(32x32).png', href: 'commission.html' },
    { key: 'resources', nameKey: 'menuResources', icon: ICON + '318(32x32).png', href: 'resources.html' },
    { key: 'friend', nameKey: 'menuFriend', icon: 'assets/icon/survivor.png', href: 'https://cupcakeqaq-cloud.github.io/survivor/', extern: true }
  ];

  function itemName(def) { return def.name || t(def.nameKey); }

  function buildMenu() {
    var menu = byId('startMenu');
    if (!menu) return;
    var page = document.body.getAttribute('data-page') || 'index';

    var left = [];
    NAV.forEach(function (n) {
      if (n.key === page || (n.key === 'index' && page === 'index')) return;
      left.push({ nav: n });
    });
    if (left.length) left.push({ sep: true });
    XP.apps.forEach(function (a) {
      if (a.key === 'computer') return;
      left.push({ app: a });
    });
    /* 页面里原生的窗口（自我介绍 / 留言板）也给个入口，图标取标题栏图标；
       名字已经作为导航项或应用出现在菜单里的（委托相关事宜 / 资源配布）跳过，避免重复 */
    var usedNames = {};
    NAV.forEach(function (n) { usedNames[itemName(n)] = 1; });
    XP.apps.forEach(function (a) { usedNames[itemName(a)] = 1; });
    XP.wins.forEach(function (w) {
      if (!w.adopted || w.fixed) return;
      if (XP.registry[w.key]) return;
      var ico = w.el.querySelector('.tb-icon');
      var ttl = w.el.querySelector('.tb-title');
      var nm = ttl ? ttl.textContent : w.key;
      if (usedNames[nm]) return;
      usedNames[nm] = 1;
      left.push({
        app: { key: w.key, name: nm, icon: ico ? ico.getAttribute('src') : ICON + 'windows.png' }
      });
    });

    var right = [];
    if (XP.registry.computer) right.push({ app: XP.registry.computer });
    right.push({ sep: true });
    right.push({ act: 'arrange', name: t('menuArrange'), icon: ICON + '289(32x32).png' });

    function render(list, small) {
      return list.map(function (it) {
        if (it.sep) return '<div class="sm-sep"></div>';
        var def = it.app || it.nav;
        var key = def ? def.key : 'act:' + it.act;
        var icon = def ? def.icon : it.icon;
        var name = def ? itemName(def) : it.name;
        var dbl = small ? '' : '';
        return '<div class="sm-item' + dbl + '" data-key="' + esc(key) + '">' +
          '<img src="' + icon + '" alt="">' +
          '<div class="sm-txt"><span>' + esc(name) + '</span></div></div>';
      }).join('');
    }

    menu.innerHTML =
      '<div class="sm-head"><img class="sm-avatar" src="icon.png" alt="">' +
      '<span class="sm-name">12あKa@被告人杯糕_</span></div>' +
      '<div class="sm-body">' +
      '<div class="sm-left">' + render(left, false) + '</div>' +
      '<div class="sm-right">' + render(right, true) + '</div>' +
      '</div>' +
      '<div class="sm-foot">' +
      '<button type="button" data-pw="logoff"><img src="' + ICON + '546(32x32).png" alt="">' + esc(t('pwLogOff')) + '</button>' +
      '<button type="button" data-pw="turnoff"><img src="' + ICON + '310(32x32).png" alt="">' + esc(t('pwTurnOffShort')) + '</button>' +
      '</div>';

    menu.addEventListener('click', function (e) {
      var item = e.target.closest('.sm-item');
      if (item) {
        var key = item.getAttribute('data-key');
        if (key.indexOf('act:') === 0) {
          if (key === 'act:arrange') {
            XP.wins.slice().forEach(function (w) {
              reopen(w);
              if (w.min) restoreWin(w);
              toFlow(w);
            });
          }
        } else {
          var app = XP.registry[key];
          if (app) XP.launch(key);
          else {
            var nav = NAV.filter(function (n) { return n.key === key; })[0];
            if (nav) {
              if (nav.extern) window.open(nav.href, '_blank', 'noopener');
              else location.href = nav.href;
              return;
            }
          }
        }
        hideMenu();
        return;
      }
      var pw = e.target.closest('[data-pw]');
      if (pw) { hideMenu(); powerDialog(pw.getAttribute('data-pw')); }
    });
  }

  function showMenu() { var m = byId('startMenu'); if (m) m.hidden = false; }
  function hideMenu() { var m = byId('startMenu'); if (m) m.hidden = true; }

  function bindStart() {
    var btn = byId('startBtn');
    var menu = byId('startMenu');
    if (!btn || !menu) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      menu.hidden = !menu.hidden;
    });
    document.addEventListener('click', function (e) {
      if (menu.hidden) return;
      if (menu.contains(e.target) || btn.contains(e.target)) return;
      hideMenu();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hideMenu(); });
  }

  /* ══════════ 电源流程 ══════════ */
  var dialog = null, mask = null, screen = null;

  function gray(on) { document.body.classList.toggle('grayed', on); }

  function closePowerDialog() {
    if (dialog) { dialog.remove(); dialog = null; }
    if (mask) { mask.remove(); mask = null; }
  }

  function runningCount() {
    return Math.max(1, document.querySelectorAll('.win:not(.minimized)').length);
  }

  function powerDialog(mode) {
    closePowerDialog();
    removeScreen();
    gray(true);
    mask = mk('div', 'power-mask');
    document.body.appendChild(mask);

    var isTurn = mode === 'turnoff';
    dialog = mk('div', 'powerdlg');
    dialog.innerHTML =
      '<div class="powerdlg-head"><span>' + esc(t(isTurn ? 'pwTurnTitle' : 'pwLogoffTitle')) + '</span>' +
      '<img src="' + ICON + 'windows-off.png" alt=""></div>' +
      '<div class="powerdlg-body">' +
      (isTurn
        ? '<button type="button" class="pw-btn" data-act="standby"><img src="' + ICON + '310(32x32).png" alt=""><span>' + esc(t('pwStandby')) + '</span></button>' +
          '<button type="button" class="pw-btn" data-act="turnoff"><img src="' + ICON + '310(32x32).png" alt=""><span>' + esc(t('pwTurnOff')) + '</span></button>' +
          '<button type="button" class="pw-btn" data-act="restart"><img src="' + ICON + 'restart.ico" alt=""><span>' + esc(t('pwRestart')) + '</span></button>'
        : '<button type="button" class="pw-btn" data-act="switch"><img src="' + ICON + '290.png" alt="" style="border:1px solid #fff;border-radius:3px"><span>' + esc(t('pwSwitch')) + '</span></button>' +
          '<button type="button" class="pw-btn" data-act="logoff"><img src="' + ICON + '546(32x32).png" alt=""><span>' + esc(t('pwLogOff')) + '</span></button>') +
      '</div>' +
      '<div class="powerdlg-foot"><button type="button" class="pw-cancel" data-act="cancel">' + esc(t('pwCancel')) + '</button></div>';

    dialog.addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]');
      if (!b) return;
      var act = b.getAttribute('data-act');
      if (act === 'cancel') { closePowerDialog(); gray(false); return; }
      if (act === 'standby' || act === 'switch' || act === 'logoff') { welcome(); return; }
      if (act === 'turnoff') { closePowerDialog(); offScreen(t('pwShuttingDown'), shutdownScreen, 2600); return; }
      if (act === 'restart') { closePowerDialog(); offScreen(t('pwRestarting'), welcome, 2600); return; }
    });

    document.body.appendChild(dialog);
  }

  function removeScreen() { if (screen) { screen.remove(); screen = null; } }

  function offScreen(text, next, delay) {
    removeScreen();
    gray(false);
    screen = mk('div', 'power-screen off');
    screen.innerHTML = '<div class="ps-text ps-dots">' + esc(text) + '</div>';
    document.body.appendChild(screen);
    setTimeout(function () { removeScreen(); next(); }, delay || 2400);
  }

  function shutdownScreen() {
    removeScreen();
    screen = mk('div', 'power-screen shutdown');
    screen.innerHTML =
      '<img src="' + ICON + 'windows.png" alt="" style="height:52px">' +
      '<div class="ps-text">' + esc(t('pwSafeToTurnOff')) + '</div>' +
      '<button type="button" class="ps-btn">' + esc(t('pwRestartNow')) + '</button>';
    screen.querySelector('.ps-btn').addEventListener('click', function () { welcome(); });
    document.body.appendChild(screen);
  }

  function welcome() {
    closePowerDialog();
    gray(false);
    removeScreen();
    var n = runningCount();
    screen = mk('div', 'welcome');
    screen.innerHTML =
      '<div class="welcome-l">' +
        /* 左侧 UI 照站主给的 P3 参考（XP 官方商标定式：旗标 + Microsoft® / Windows™ xp） */
        '<div class="wl-mark">' +
          '<img src="assets/winxp/windows-logo.png" alt="Microsoft Windows XP">' +
          '<div class="wl-word">' +
            '<span class="wl-ms">Microsoft<sup>®</sup></span>' +
            '<span class="wl-win">Windows<sup>™</sup><i>xp</i></span>' +
          '</div>' +
        '</div>' +
        '<div class="wl-tip">' + esc(t('wlTip')) + '</div>' +
      '</div>' +
      '<div class="welcome-r">' +
        '<button type="button" class="welcome-user">' +
          '<img src="icon.png" alt="">' +
          '<span><span class="wu-name">12あKa@被告人杯糕_</span><br>' +
          '<span class="wu-sub">' + esc(t('wlRunning', { n: n })) + '</span></span>' +
        '</button>' +
      '</div>' +
      '<div class="welcome-foot">' +
        '<button type="button" data-act="turnoff">' + esc(t('wlShutdown')) + '</button>' +
        '<span>' + esc(t('wlHint')) + '</span>' +
      '</div>';
    screen.addEventListener('click', function (e) {
      if (e.target.closest('[data-act="turnoff"]')) { removeScreen(); powerDialog('turnoff'); return; }
      if (e.target.closest('.welcome-user')) { removeScreen(); }
    });
    document.body.appendChild(screen);
  }

  XP.powerDialog = powerDialog;
  XP.welcome = welcome;

  /* ══════════ XP 提示框 ══════════ */
  XP.msg = function (title, text, icon) {
    var wrap = mk('div', 'xp-msg');
    icon = icon || ICON + '147(32x32).png'; /* 红叉错误图标：素材包里唯一的 32px 原生错误图标 */
    wrap.innerHTML =
      '<div class="xp-dialog">' +
        '<div class="titlebar"><img class="tb-icon" src="' + icon + '" alt="">' +
        '<span class="tb-title">' + esc(title) + '</span>' +
        '<span class="tb-btns"><i class="tb-close" title="Close">×</i></span></div>' +
        '<div class="dlg-body"><img class="dlg-ico" src="' + icon + '" alt="" style="width:32px;height:32px">' +
        '<div class="dlg-msg"><b>' + esc(title) + '</b><br>' + esc(text) + '</div></div>' +
        '<div class="dlg-btns"><button type="button" class="dlg-btn">OK</button></div>' +
      '</div>';
    function close() { wrap.remove(); document.removeEventListener('keydown', onKey); }
    function onKey(e) { if (e.key === 'Escape' || e.key === 'Enter') close(); }
    wrap.querySelector('.dlg-btn').addEventListener('click', close);
    wrap.querySelector('.tb-close').addEventListener('click', close);
    wrap.addEventListener('click', function (e) { if (e.target === wrap) close(); });
    document.addEventListener('keydown', onKey);
    document.body.appendChild(wrap);
    return wrap;
  };

  /* ══════════ iframe 嵌入 + 假 404 兜底 ══════════ */
  XP.embeddable = function (url) {
    return EMBEDDABLE.some(function (d) { return url.indexOf(d) !== -1; });
  };

  XP.notFound = function (stage, url, retry) {
    stage.innerHTML =
      '<div class="ie404">' +
        '<img class="ie404-ico" src="' + ICON + 'ie-paper.png" alt="">' +
        '<h2>' + esc(t('nfTitle')) + '</h2>' +
        '<p>' + esc(t('nfLede')) + '</p>' +
        '<p>' + esc(t('nfWhy')) + '</p>' +
        '<ol><li>' + esc(t('nfLi1')) + '</li><li>' + esc(t('nfLi2')) + '</li><li>' + esc(t('nfLi3')) + '</li></ol>' +
        '<hr>' +
        '<p class="ie404-tech">' + esc(t('nfTech')) + '<br>' + esc(url) + '</p>' +
        '<div class="ie404-act"><button type="button" data-nf="retry">' + esc(t('nfRetry')) + '</button>' +
        '<button type="button" data-nf="open">' + esc(t('nfNewTab')) + '</button></div>' +
      '</div>';
    stage.querySelector('[data-nf="retry"]').addEventListener('click', function () {
      if (retry) retry(); else stage.innerHTML = '';
    });
    stage.querySelector('[data-nf="open"]').addEventListener('click', function () {
      window.open(url, '_blank', 'noopener');
    });
  };

  /* 白名单内的站点才真嵌；超时未加载完成 -> 假 404 */
  XP.frame = function (stage, url, opts) {
    opts = opts || {};
    if (opts.check !== false && !XP.embeddable(url)) {
      XP.notFound(stage, url, function () { XP.frame(stage, url, opts); });
      return null;
    }
    stage.innerHTML = '<div class="app-loading">Loading…</div>';
    var f = mk('iframe', 'app-frame');
    f.setAttribute('referrerpolicy', 'no-referrer');
    f.setAttribute('allow', 'fullscreen; gamepad; autoplay');
    var settled = false;
    var timer = setTimeout(function () {
      if (settled) return;
      /* 已经不在这块 stage 里了 = 用户在这期间 navigated 走了（浏览器 back/forward/home），
         这时**绝不能**再往 stage 里塞 404，否则会把新页面盖掉（站主 m02125 第 5 条实测到的坑）。 */
      if (!f.parentNode) return;
      if (opts.onFail) opts.onFail(); else XP.notFound(stage, url, function () { XP.frame(stage, url, opts); });
    }, opts.timeout || 9000);
    f.addEventListener('load', function () {
      settled = true;
      clearTimeout(timer);
      if (!f.parentNode) return;
      var hint = stage.querySelector('.app-loading');
      if (hint) hint.remove();
    });
    f.src = url;
    stage.appendChild(f);
    return f;
  };

  /* ══════════ 启动 ══════════ */
  function boot() {
    XP.layer = byId('winLayer');
    taskTasks = byId('taskTasks');

    document.querySelectorAll('[data-win]').forEach(function (el) { XP.adopt(el); });

    /* 固定式浏览窗口的地址栏 + 返回（back 与「返回主页」都回主页） */
    var ieAddr = byId('ieAddr');
    if (ieAddr) ieAddr.value = location.href;
    var ieHome = byId('ieHome');
    if (ieHome) ieHome.addEventListener('click', function () { location.href = 'index.html'; });
    var ieBack = byId('ieBack');
    if (ieBack) ieBack.addEventListener('click', function () {
      if (history.length > 1) history.back();
      else location.href = 'index.html';
    });

    /* 桌面快捷方式：单击选中，双击打开（XP 手感） */
    document.querySelectorAll('[data-desk]').forEach(function (b) {
      b.addEventListener('click', function () {
        document.querySelectorAll('[data-desk].sel').forEach(function (o) { o.classList.remove('sel'); });
        b.classList.add('sel');
      });
      b.addEventListener('dblclick', function () {
        var app = b.getAttribute('data-app');
        if (app) { XP.launch(app); return; }
        var href = b.getAttribute('data-href');
        if (href) location.href = href;
      });
    });

    buildMenu();
    bindStart();
    tickClock();
    setInterval(tickClock, 15000);

    /* 例图裁剪：按图片自然宽高比自动判定 竖3:4 / 方1:1 / 横4:3（不写死比例字段，将来编辑器接管也不用改） */
    document.querySelectorAll('.cm-card-shots img').forEach(function (im) {
      function fix() {
        if (!im.naturalWidth || !im.naturalHeight) return;
        var r = im.naturalWidth / im.naturalHeight;
        im.classList.toggle('ratio-sq', r > 0.9 && r < 1.15);
        im.classList.toggle('ratio-land', r >= 1.15);
      }
      if (im.complete) fix();
      im.addEventListener('load', fix);
    });

    document.addEventListener('langchange', function () {
      relabelTasks();
      buildMenu();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
