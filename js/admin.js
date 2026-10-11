/* 网站编辑器后台前端（配 server/admin.js 用；这个文件也会随 Pages 发布，
   但它只是个空表单：所有接口都指向本机 /api/*，里面没有任何密码或 token） */
(function () {
  'use strict';

  var DICT = window.I18N || {};
  var LANGS = ['zh', 'ja', 'en'];
  var LANG_LABEL = { zh: '中文', ja: '日本語', en: 'English' };

  /* [key, 分组, 中文标签]；DICT 里有而这里没列的 key 会自动落进「其他」 */
  var FIELDS = [
    ['pageTitle', '主页', '浏览器标题：主页'],
    ['commissionPageTitle', '主页', '浏览器标题：委托页'],
    ['resourcesPageTitle', '主页', '浏览器标题：资源页'],
    ['titleProfile', '主页', '窗口标题：自我介绍'],
    ['titleGuestbook', '主页', '窗口标题：留言板'],
    ['titleCommission', '主页', '窗口标题：委托页'],
    ['titleResources', '主页', '窗口标题：资源页'],
    ['aboutTitle', '主页', '「简介」小标题'],
    ['bio', '主页', '简介正文'],
    ['linksTitle', '主页', '「找到我」小标题'],
    ['email', '主页', '邮箱标签'],
    ['ceText', '主页', '委托入口说明文字'],
    ['ceGo', '主页', '委托入口按钮'],
    ['reText', '主页', '资源入口说明文字'],
    ['reGo', '主页', '资源入口按钮'],

    ['backHome', '委托页', '「返回主页」按钮'],
    ['cmStatusTitle', '委托页', '受理状态标题'],
    ['cmStatusOpen', '委托页', '状态文字：接受中'],
    ['cmStatusPaused', '委托页', '状态文字：暂停接单'],
    ['cmStatusClosed', '委托页', '状态文字：已停止接单'],
    ['cmStatusNote', '委托页', '状态下方备注'],
    ['cmPriceTitle', '委托页', '价目表标题'],
    ['cmPriceTalk', '委托页', '「私信议价」（04 档没价格时显示这个）'],
    ['cmPriceNote', '委托页', '价目表下方备注'],
    ['cmApplyTitle', '委托页', '申请方式标题'],
    ['cmApply1b', '委托页', '流程①标题'],
    ['cmApply1d', '委托页', '流程①说明'],
    ['cmApply2b', '委托页', '流程②标题'],
    ['cmApply2d', '委托页', '流程②说明'],
    ['cmApply3b', '委托页', '流程③标题'],
    ['cmApply3d', '委托页', '流程③说明'],
    ['cmShotsHint', '委托页', '例图下方提示'],
    ['cmCard1Title', '委托页', '01 档标题'],
    ['cmCard1Price', '委托页', '01 档价格'],
    ['cmCard1Desc1', '委托页', '01 档说明一'],
    ['cmCard1Desc2', '委托页', '01 档说明二'],
    ['cmCard2Title', '委托页', '02 档标题'],
    ['cmCard2Price', '委托页', '02 档价格'],
    ['cmCard2Desc1', '委托页', '02 档说明一'],
    ['cmCard2Desc2', '委托页', '02 档说明二'],
    ['cmCard3Title', '委托页', '03 档标题'],
    ['cmCard3Price', '委托页', '03 档价格'],
    ['cmCard3Desc1', '委托页', '03 档说明一'],
    ['cmCard3Desc2', '委托页', '03 档说明二'],
    ['cmCard4Title', '委托页', '04 档标题'],
    ['cmCard4Desc1', '委托页', '04 档说明一'],
    ['cmCard4Desc2', '委托页', '04 档说明二'],
    ['cmLinksTitle', '委托页', '「联系方式」标题'],

    ['rsIntroTitle', '资源页', '资源简介标题'],
    ['rsIntro', '资源页', '资源简介正文'],
    ['rsDownloadTitle', '资源页', '「下载」标题'],
    ['voiceNameFlan', '资源页', '旧字段：下载项名称（下载列表为空时才用）'],
    ['voiceSizeFlan', '资源页', '旧字段：下载项大小（下载列表为空时才用）'],
    ['voiceDownload', '资源页', '下载按钮文字'],
    ['voiceNoteTitle', '资源页', '使用说明标题'],
    ['voiceNote', '资源页', '使用说明正文'],

    ['menuHome', '桌面·菜单', '开始菜单：返回主页'],
    ['menuCommission', '桌面·菜单', '开始菜单：委托'],
    ['menuResources', '桌面·菜单', '开始菜单：资源'],
    ['menuFriend', '桌面·菜单', '开始菜单：Survivor'],
    ['menuArrange', '桌面·菜单', '开始菜单：整理窗口'],
    ['deskComputer', '桌面·菜单', '桌面图标：我的电脑'],
    ['deskMines', '桌面·菜单', '桌面图标：扫雷'],
    ['deskPaint', '桌面·菜单', '桌面图标：画图'],
    ['compNotReady', '桌面·菜单', '我的电脑：设备未就绪提示'],
    ['compNoSearch', '桌面·菜单', '我的电脑：没装搜索引擎'],

    ['gbPlaceholder', '留言板·彩蛋', '留言输入框提示'],
    ['gbSend', '留言板·彩蛋', '留言：发送按钮'],
    ['gbEmpty', '留言板·彩蛋', '留言：空列表提示'],
    ['gbHint', '留言板·彩蛋', '留言板说明（现在这句已经不准确了，等留言板前端改完再改）'],
    ['gbName', '留言板·彩蛋', '留言：名字输入框'],
    ['gbDelete', '留言板·彩蛋', '留言：删除按钮'],
    ['gbTimeNow', '留言板·彩蛋', '留言：刚刚'],
    ['duckAria', '留言板·彩蛋', '玩具鸭彩蛋无障碍标签'],
    ['ceInfoTitle', '留言板·彩蛋', '彩蛋弹窗标题'],
    ['ceFeatured', '留言板·彩蛋', '彩蛋弹窗正文'],
    ['ceOk', '留言板·彩蛋', '彩蛋弹窗按钮'],

    ['pwLogoffTitle', '电源·开机·404', '注销窗标题'],
    ['pwTurnTitle', '电源·开机·404', '关机窗标题'],
    ['pwStandby', '电源·开机·404', '待机'],
    ['pwTurnOff', '电源·开机·404', '关闭计算机'],
    ['pwRestart', '电源·开机·404', '重新启动'],
    ['pwSwitch', '电源·开机·404', '切换用户'],
    ['pwLogOff', '电源·开机·404', '注销'],
    ['pwCancel', '电源·开机·404', '取消'],
    ['pwTurnOffShort', '电源·开机·404', '关闭计算机（短）'],
    ['pwShuttingDown', '电源·开机·404', '正在关机'],
    ['pwRestarting', '电源·开机·404', '正在重新启动'],
    ['pwSafeToTurnOff', '电源·开机·404', '可以安全关机了'],
    ['pwRestartNow', '电源·开机·404', '重新开机按钮'],
    ['wlTip', '电源·开机·404', '欢迎界面提示'],
    ['wlRunning', '电源·开机·404', '欢迎界面：程序正在运行'],
    ['wlShutdown', '电源·开机·404', '欢迎界面：关闭计算机'],
    ['wlHint', '电源·开机·404', '欢迎界面：单击用户名'],
    ['nfTitle', '电源·开机·404', '假404 标题'],
    ['nfLede', '电源·开机·404', '假404 首段'],
    ['nfWhy', '电源·开机·404', '假404「可能是因为」'],
    ['nfLi1', '电源·开机·404', '假404 原因一'],
    ['nfLi2', '电源·开机·404', '假404 原因二'],
    ['nfLi3', '电源·开机·404', '假404 原因三'],
    ['nfTech', '电源·开机·404', '假404 HTTP 行'],
    ['nfRetry', '电源·开机·404', '假404 重试按钮'],
    ['nfNewTab', '电源·开机·404', '假404 新标签打开']
  ];
  var GROUPS = ['主页', '委托页', '资源页', '桌面·菜单', '留言板·彩蛋', '电源·开机·404', '其他'];
  var FK = {};
  FIELDS.forEach(function (f) { FK[f[0]] = { group: f[1], label: f[2] }; });

  var S = {
    tab: 'text', ready: false,
    content: null, i18n: {}, status: 'open', cmCards: [], resItems: [], commentsList: [],
    git: null, files: { pictures: [], uploads: [] },
    repo: '', branch: '', tag: 'assets', hasToken: false
  };

  // ───────── 小工具 ─────────
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function enc(u) { return encodeURI(String(u == null ? '' : u)); }
  function num(v, d) { var n = Number(v); return isFinite(n) ? n : d; }
  function c3(n) { return Math.round(n * 1000) / 1000; }

  /* ── 例图裁剪：内存里例图统一是对象 {src,zoom,cx,cy}，存回去时再按 toWire 还原 ──
     zoom=放大倍数（1~4）；cx/cy = 看到的那一块的中心，在「放大后的图框」里的比例（0~1，默认 0.5） */
  function sh(s) {
    if (typeof s === 'string') return { src: s, zoom: 1, cx: 0.5, cy: 0.5 };
    s = s || {};
    var z = Math.min(4, Math.max(1, num(s.zoom, 1)));
    return { src: String(s.src || ''), zoom: z, cx: clampPan(s.cx, z), cy: clampPan(s.cy, z) };
  }
  /* 裁剪窗口不能跑出图外：cx ∈ [0.5/z, 1-0.5/z]（z=1 时只能取 0.5，也就是没法平移） */
  function clampPan(v, z) {
    var lo = 0.5 / z, hi = 1 - 0.5 / z;
    return Math.min(hi, Math.max(lo, num(v, 0.5)));
  }
  function normCards(cards) {
    return (cards || []).map(function (c) {
      return { shots: (((c || {}).shots) || []).map(sh).filter(function (o) { return o.src; }) };
    });
  }
  /* 没放大就是纯字符串（老写法，文件里不会多出参数）；放大过才写对象 */
  function toWire(o) {
    if (!o || !o.src) return null;
    var z = o.zoom;
    if (!(z > 1.001)) return o.src;
    return { src: o.src, zoom: c3(z), cx: c3(clampPan(o.cx, z)), cy: c3(clampPan(o.cy, z)) };
  }
  function clone(o) { return JSON.parse(JSON.stringify(o || {})); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function hint(msg, err) {
    var h = $('#hint');
    if (!h) return;
    h.textContent = msg || '';
    h.className = err ? 'err' : '';
  }
  function parseRes(r) {
    return r.text().then(function (t) {
      var j = null;
      try { j = JSON.parse(t); } catch (e) {}
      if (!r.ok || !j || j.ok === false) {
        throw new Error((j && j.error) || ('HTTP ' + r.status + (t ? '：' + t.slice(0, 200) : '')));
      }
      return j;
    });
  }
  function api(p, o) { return fetch(p, o).then(parseRes); }
  function post(p, body) {
    return api(p, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  }
  function pickFile(accept, cb) {
    var inp = document.createElement('input');
    inp.type = 'file';
    if (accept) inp.accept = accept;
    inp.onchange = function () { if (inp.files && inp.files[0]) cb(inp.files[0]); };
    inp.click();
  }

  // ───────── 登录 ─────────
  function doLogin() {
    var msg = $('#loginMsg');
    msg.textContent = '登录中…';
    post('/api/login', { password: $('#pw').value }).then(function () {
      $('#login').hidden = true;
      $('#app').hidden = false;
      boot();
    }).catch(function (e) { msg.textContent = e.message; });
  }

  function boot() {
    hint('读取中…');
    api('/api/state').then(function (j) {
      sync(j.content, j.comments);
      S.git = j.git;
      S.files = j.files || S.files;
      S.repo = j.repo || ''; S.branch = j.branch || ''; S.tag = j.releaseTag || 'assets'; S.hasToken = !!j.hasToken;
      S.ready = true;
      renderTabs();
      render();
      hint('已读取（' + (((j.git || {}).changed) || []).length + ' 个文件还没提交）');
    }).catch(function (e) { hint('读取失败：' + e.message, true); });
  }

  function sync(content, comments) {
    S.content = content;
    S.i18n = clone(content.i18n);
    S.status = content.commission.status;
    S.cmCards = normCards(content.commission.cards);
    S.resItems = content.resources.items || [];
    S.commentsList = (comments && comments.comments) || [];
  }

  // ───────── 布局 ─────────
  var TABS = [['text', '文案'], ['cm', '委托页'], ['res', '资源页'], ['gb', '留言'], ['git', '提交']];

  function renderTabs() {
    $('#tabs').innerHTML = TABS.map(function (t) {
      return '<button data-tab="' + t[0] + '">' + t[1] + '</button>';
    }).join('');
  }

  function render() {
    $$('#tabs button').forEach(function (b) { b.classList.toggle('on', b.dataset.tab === S.tab); });
    var v = $('#view');
    if (S.tab === 'text') v.innerHTML = viewText();
    else if (S.tab === 'cm') v.innerHTML = viewCm();
    else if (S.tab === 'res') v.innerHTML = viewRes();
    else if (S.tab === 'gb') v.innerHTML = viewGb();
    else v.innerHTML = viewGit();
  }

  // ───────── 文案页 ─────────
  function cur(k, l) {
    var ov = S.i18n[k];
    if (ov && typeof ov[l] === 'string' && ov[l].trim() !== '') return ov[l];
    return (DICT[k] && DICT[k][l]) || '';
  }

  function fieldRow(k) {
    var m = FK[k] || { label: k };
    var long = Math.max.apply(null, LANGS.map(function (l) { return cur(k, l).length; })) > 44;
    var cells = LANGS.map(function (l) {
      var v = esc(cur(k, l));
      if (long) return '<textarea data-k="' + esc(k) + '" data-l="' + l + '" rows="3" placeholder="' + LANG_LABEL[l] + '">' + v + '</textarea>';
      return '<input type="text" data-k="' + esc(k) + '" data-l="' + l + '" placeholder="' + LANG_LABEL[l] + '" value="' + v + '">';
    }).join('');
    var tag = cur(k, 'zh').indexOf('{') >= 0 ? ' <span class="pill warn">{ } 占位别删</span>' : '';
    var has = S.i18n[k] ? '<span class="pill warn">已改</span>' : '';
    return '<div class="f"><div class="fl"><b>' + esc(m.label) + ' ' + has + '</b><code>' + esc(k) + '</code>' + tag +
      '<button class="mini" data-act="reset" data-k="' + esc(k) + '">恢复默认</button></div>' +
      '<div class="fi">' + cells + '</div></div>';
  }

  function viewText() {
    var buckets = {};
    GROUPS.forEach(function (g) { buckets[g] = []; });
    Object.keys(DICT).forEach(function (k) {
      var g = (FK[k] && FK[k].group) || '其他';
      (buckets[g] = buckets[g] || []).push(k);
    });
    var out = '<div class="grp"><div class="tip">三语都改了才会生效；留空 = 用网站自带的默认值。改完点右上角「保存改动」。</div></div>';
    GROUPS.forEach(function (g) {
      var ks = buckets[g] || [];
      if (!ks.length) return;
      out += '<div class="grp"><h3>' + esc(g) + '（' + ks.length + '）</h3>' + ks.map(fieldRow).join('') + '</div>';
    });
    return out;
  }

  // ───────── 委托页 ─────────
  function shotBox(o, i, j) {
    var z = num(o.zoom, 1);
    var tag = z > 1.001 ? ' <span class="pill warn">裁剪 ' + String(c3(z)) + '×</span>' : '';
    return '<div class="shot"><img src="' + esc(enc(o.src)) + '" alt="" loading="lazy">' +
      '<div class="u">' +
      '<button data-act="crop" data-i="' + i + '" data-j="' + j + '">裁剪</button>' +
      '<button data-act="up" data-i="' + i + '" data-j="' + j + '">↑</button>' +
      '<button data-act="down" data-i="' + i + '" data-j="' + j + '">↓</button>' +
      '<button class="del" data-act="rm" data-i="' + i + '" data-j="' + j + '">删除</button>' +
      '</div><div class="p">' + esc(o.src) + tag + '</div></div>';
  }

  function galleryOptions() {
    var out = '';
    (S.files.pictures || []).forEach(function (f) { out += '<option value="picture/' + esc(f) + '">picture/' + esc(f) + '</option>'; });
    (S.files.uploads || []).forEach(function (f) { out += '<option value="uploads/' + esc(f) + '">uploads/' + esc(f) + '</option>'; });
    return out;
  }

  function viewCm() {
    var radio = [['open', '接受中'], ['paused', '暂停接单'], ['closed', '已停止接单']].map(function (r) {
      return '<label style="margin-right:14px"><input type="radio" name="cmst" value="' + r[0] + '"' +
        (S.status === r[0] ? ' checked' : '') + ' style="width:auto"> ' + r[1] + '</label>';
    }).join('');
    var cards = S.cmCards.map(function (card, i) {
      var shots = (card.shots || []);
      var grid = shots.length ? shots.map(function (p, j) { return shotBox(p, i, j); }).join('')
        : '<div class="tip">这一档没例图（前台会保留 html 里写死的三张）</div>';
      return '<div class="card"><h4>0' + (i + 1) + ' · ' + esc(cur('cmCard' + (i + 1) + 'Title', 'zh')) +
        ' <span class="pill">' + shots.length + ' 张</span></h4><div class="bd">' +
        '<div class="shots">' + grid + '</div>' +
        '<div class="row2"><button data-act="add-img" data-i="' + i + '">＋ 上传新图</button>' +
        '<select data-act="sel" data-i="' + i + '"><option value="">从图库选一张…</option>' + galleryOptions() + '</select>' +
        '<button data-act="add-pick" data-i="' + i + '">插入选中的图</button></div>' +
        '</div></div>';
    }).join('');
    return '<div class="grp"><h3>受理状态</h3><div class="bd">' + radio +
      '<div class="tip" style="border:0;padding:6px 0 0">只改徽章状态；徽章上的字在「文案」页的 cmStatusOpen / cmStatusPaused / cmStatusClosed。</div>' +
      '</div></div>' +
      '<div class="grp"><h3>四档例图（每档最多 6 张，顺序就是前台的显示顺序）</h3><div class="bd">' + cards + '</div></div>';
  }

  // ───────── 资源页 ─────────
  function triInputs(i, field, obj, ph) {
    obj = obj || {};
    return LANGS.map(function (l) {
      return '<input type="text" data-ri="' + i + '" data-rf="' + field + '.' + l + '" placeholder="' +
        LANG_LABEL[l] + ' ' + esc(ph) + '" value="' + esc(obj[l] || '') + '">';
    }).join('');
  }

  function viewRes() {
    var list = S.resItems.map(function (it, i) {
      return '<div class="item"><div class="hd"><b>第 ' + (i + 1) + ' 项</b>' +
        '<button data-act="r-up" data-i="' + i + '">↑</button>' +
        '<button data-act="r-down" data-i="' + i + '">↓</button>' +
        '<button class="del" data-act="r-rm" data-i="' + i + '">删除</button></div>' +
        '<div class="lab">显示名称（三语）</div><div class="tri">' + triInputs(i, 'name', it.name, '芙兰朵露 v1.0.0-beta') + '</div>' +
        '<div class="lab">大小／格式（三语）</div><div class="tri">' + triInputs(i, 'size', it.size, '约 33.2 MB · zip') + '</div>' +
        '<div class="lab">下载链接（uploads/xxx.zip 或 Releases 的 https 链接，中文文件名也行）</div>' +
        '<input type="text" data-ri="' + i + '" data-rf="href" value="' + esc(it.href) + '">' +
        '<div class="lab">图标路径</div><input type="text" data-ri="' + i + '" data-rf="icon" value="' + esc(it.icon) + '">' +
        '<div class="row2"><button data-act="r-small" data-i="' + i + '">上传小文件（进 uploads/，≤100MB）</button>' +
        '<button data-act="r-big" data-i="' + i + '"' + (S.hasToken ? '' : ' disabled') + '>上传大文件（进 Releases，≤2GB）</button>' +
        (S.hasToken ? '' : '<span class="tip" style="border:0">（要先在 .env 里填 GITHUB_TOKEN）</span>') + '</div>' +
        '</div>';
    }).join('');
    return '<div class="grp"><h3>下载项（前台照这个列表画；列表为空时才用 html 里写死的那条）</h3>' +
      '<div class="tip">小文件进仓库 `uploads/`（会让仓库变大，别放大的）；大文件进 GitHub Releases（不占仓库体积，链接自动填进这一项）。</div>' +
      '<div class="bd">' + (list || '<div class="tip">还没有下载项</div>') +
      '<div class="row2"><button data-act="r-add">＋ 新增一项</button></div></div></div>';
  }

  // ───────── 留言页 ─────────
  function viewGb() {
    var cs = S.commentsList;
    var head = '<div class="grp"><h3>留言管理（' + cs.length + ' 条）</h3>' +
      '<div class="tip">留言数据在 `gb/comments.json`（那个留言板前端由另一个对话做）。改完点「保存改动」；隐藏 = 前台不显示。</div>';
    if (!cs.length) return head + '<div class="bd"><div class="tip">现在还没有留言。</div></div></div>';

    var sorted = cs.slice().sort(function (a, b) {
      return ((b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)) || ((b.time || 0) - (a.time || 0));
    });
    var list = sorted.map(function (c) {
      var d = new Date(c.time || 0);
      var t = d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
      var reply = c.reply || {};
      return '<div class="item"><div class="hd"><b>' + esc(c.name || '（匿名）') + '</b><span class="pill">' + t + '</span>' +
        (c.pinned ? '<span class="pill warn">置顶</span>' : '') + (c.hidden ? '<span class="pill off">已隐藏</span>' : '') +
        '<button data-act="g-pin" data-id="' + esc(c.id) + '">' + (c.pinned ? '取消置顶' : '置顶') + '</button>' +
        '<button data-act="g-hide" data-id="' + esc(c.id) + '">' + (c.hidden ? '显示' : '隐藏') + '</button>' +
        '<button class="del" data-act="g-rm" data-id="' + esc(c.id) + '">删除</button></div>' +
        '<div style="white-space:pre-wrap;background:#fafafa;border:1px solid #eee;padding:5px 7px">' + esc(c.text) + '</div>' +
        '<div class="lab">站主回复（三语，留空 = 没有回复）</div><div class="tri">' +
        LANGS.map(function (l) {
          return '<input type="text" data-gid="' + esc(c.id) + '" data-gl="' + l + '" placeholder="' + LANG_LABEL[l] +
            '" value="' + esc(reply[l] || '') + '">';
        }).join('') + '</div></div>';
    }).join('');
    return head + '<div class="bd">' + list + '</div></div>';
  }

  // ───────── 提交页 ─────────
  function viewGit() {
    var changed = (S.git && S.git.changed) || [];
    var gitBad = S.git && S.git.ok === false
      ? '<div class="tip" style="color:#a33">git 用不了：' + esc(S.git.error || '') + '　（检查 .env 里的 GIT_PATH 指对了没有）</div>' : '';
    return '<div class="grp"><h3>提交并推送 → ' + esc(S.repo) + ' · ' + esc(S.branch) + '</h3><div class="bd">' + gitBad +
      '<div class="lab">本地还没提交的改动（' + changed.length + ' 个文件）</div>' +
      '<div class="tip" style="margin-bottom:6px">' + (changed.length ? changed.map(esc).join('<br>') : '没有改动') + '</div>' +
      '<div class="lab">提交说明</div><input type="text" id="gitmsg" value="后台更新内容">' +
      '<div class="row2"><button class="pri" data-act="git-go">保存 + 提交并推送</button>' +
      '<button data-act="git-refresh">刷新状态</button></div>' +
      '<div class="tip" style="border:0;padding:6px 0 0">推成功后，GitHub Pages 大约 1~2 分钟会自动更新线上站。</div>' +
      '<pre id="gitout">（还没操作）</pre></div></div>';
  }

  function refreshGit() {
    return api('/api/state').then(function (j) {
      S.git = j.git; S.files = j.files || S.files;
      if (S.tab === 'git') render();
      return j;
    });
  }

  // ───────── 收集 → 保存 ─────────
  function collect() {
    var i18n = {};
    Object.keys(S.i18n).forEach(function (k) {
      var o = S.i18n[k] || {};
      var def = DICT[k] || {};
      var keep = {}, diff = false;
      LANGS.forEach(function (l) {
        var v = o[l];
        if (typeof v !== 'string' || v.trim() === '') return;   // 留空 = 用默认
        keep[l] = v;
        if (v !== (def[l] === undefined ? '' : def[l])) diff = true;
      });
      if (diff) i18n[k] = keep;
    });
    return {
      i18n: i18n,
      commission: {
        status: S.status,
        cards: S.cmCards.map(function (c) { return { shots: (c.shots || []).map(toWire).filter(Boolean).slice(0, 6) }; })
      },
      resources: {
        items: S.resItems.map(function (it) {
          return { icon: it.icon, name: it.name, size: it.size, href: it.href };
        })
      }
    };
  }

  function saveBoth() {
    return post('/api/save', { content: collect() }).then(function (j) {
      S.git = j.git || S.git;
      S.content = j.content;
      return post('/api/gb', { v: 1, comments: S.commentsList });
    }).then(function (k) {
      S.commentsList = k.comments.comments;
      if (k.git) S.git = k.git;
      S.i18n = clone(S.content.i18n);
      S.status = S.content.commission.status;
      S.cmCards = normCards(S.content.commission.cards);
      S.resItems = S.content.resources.items;
    });
  }

  function doSave() {
    hint('保存中…');
    saveBoth().then(function () {
      hint('已写进本地文件（还没提交）。去「提交」页点一下提交并推送。');
      if (S.tab === 'gb') render();
    }).catch(function (e) { hint('保存失败：' + e.message, true); });
  }

  // ───────── 上传 ─────────
  function uploadImg(file, i) {
    hint('正在上传 ' + file.name + '…');
    fetch('/api/upload?kind=image&name=' + encodeURIComponent(file.name),
      { method: 'POST', headers: { 'Content-Type': 'application/octet-stream' }, body: file })
      .then(parseRes)
      .then(function (j) {
        S.files.uploads.push(j.path.replace(/^uploads\//, ''));
        S.cmCards[i].shots.push(sh(j.path));
        render();
        hint('已上传 ' + j.path + '，记得点「保存改动」');
        openCrop(i, S.cmCards[i].shots.length - 1);   /* 传完直接开裁剪框，让站主挑要露的那一块 */
      })
      .catch(function (e) { hint('上传失败：' + e.message, true); });
  }

  function uploadSmall(file, i) {
    hint('正在上传 ' + file.name + '…');
    fetch('/api/upload?kind=file&name=' + encodeURIComponent(file.name),
      { method: 'POST', headers: { 'Content-Type': 'application/octet-stream' }, body: file })
      .then(parseRes)
      .then(function (j) {
        S.files.uploads.push(j.path.replace(/^uploads\//, ''));
        S.resItems[i].href = j.path;
        render();
        hint('已上传到 ' + j.path + '，记得点「保存改动」');
      })
      .catch(function (e) { hint('上传失败：' + e.message, true); });
  }

  function uploadBig(file, i) {
    if (!S.hasToken) { hint('还没配 GITHUB_TOKEN，见 .env.example 里的说明', true); return; }
    hint('正在把 ' + file.name + ' 传到 GitHub Releases…大文件要几分钟，别关页面');
    fetch('/api/release?name=' + encodeURIComponent(file.name),
      { method: 'POST', headers: { 'Content-Type': 'application/octet-stream' }, body: file })
      .then(parseRes)
      .then(function (j) {
        if (i != null && S.resItems[i]) S.resItems[i].href = j.path;
        render();
        hint('已传到 Releases 并填进下载链接，记得点「保存改动」\n' + j.path);
      })
      .catch(function (e) { hint('大文件上传失败：' + e.message, true); });
  }

  // ───────── git ─────────
  function gitGo() {
    var msg = ($('#gitmsg') || {}).value || '后台更新内容';
    var out = $('#gitout');
    if (out) out.textContent = '先保存，再提交推送…';
    hint('提交推送中…');
    saveBoth().then(function () {
      return post('/api/git', { message: msg });
    }).then(function (j) {
      if (out) out.textContent = j.log || '';
      if (j.nothing) hint('没有改动，不用提交');
      else if (j.ok) { hint('已提交并推送！等 1~2 分钟线上就更新了。'); return refreshGit(); }
      else hint(j.error || '推送失败', true);
    }).catch(function (e) {
      if (out) out.textContent = e.message;
      hint('提交失败：' + e.message, true);
    });
  }

  // ───────── 裁剪弹层 ─────────
  /* 预览框和前台 .cm-card-shots a.crop 用同一套算法：a 当裁剪框，img 放大 z 倍再按 cx/cy 偏移 */
  var cr = null;   // 正在裁的 {i, j, src, zoom, cx, cy}

  /* 槽位比例和前台一致（js/content-render.js 的 shotRatio / js/winxp.js 的判定） */
  function cropRatio() {
    var im = $('#cropImg');
    var w = im.naturalWidth, h = im.naturalHeight;
    if (!w || !h) return '3 / 4';
    var r = w / h;
    if (r > 0.9 && r < 1.15) return '1 / 1';
    if (r >= 1.15) return '4 / 3';
    return '3 / 4';
  }

  function paintCrop() {
    if (!cr) return;
    var f = $('#cropFrame'), im = $('#cropImg'), z = cr.zoom;
    im.style.width = (z * 100) + '%';
    im.style.height = (z * 100) + '%';
    im.style.left = ((0.5 - cr.cx * z) * 100) + '%';
    im.style.top = ((0.5 - cr.cy * z) * 100) + '%';
    f.style.aspectRatio = cropRatio();
    $('#cropZoom').value = String(Math.round(z * 100));
    $('#cropVal').textContent = z.toFixed(2) + '×';
  }

  function openCrop(i, j) {
    var card = S.cmCards[i];
    var o = card && card.shots && card.shots[j];
    if (!o) return;
    var z = Math.min(4, Math.max(1, num(o.zoom, 1)));
    cr = { i: i, j: j, src: o.src, zoom: z, cx: clampPan(o.cx, z), cy: clampPan(o.cy, z) };
    $('#cropSrc').textContent = o.src;
    var im = $('#cropImg');
    im.onload = paintCrop;
    im.src = enc(o.src);
    paintCrop();
    $('#crop').hidden = false;
  }

  function closeCrop() {
    cr = null;
    $('#crop').hidden = true;
    $('#cropImg').src = '';
  }

  function applyCrop() {
    if (!cr) return;
    var o = S.cmCards[cr.i] && S.cmCards[cr.i].shots[cr.j];
    if (!o) { closeCrop(); return; }
    o.zoom = cr.zoom; o.cx = cr.cx; o.cy = cr.cy;
    var cropped = o.zoom > 1.001;
    closeCrop();
    if (S.tab !== 'cm') S.tab = 'cm';
    render();
    hint(cropped ? '裁剪已设置（记得点「保存改动」）' : '已恢复成整张显示（记得点「保存改动」）');
  }

  function bindCrop() {
    $('#cropOk').onclick = applyCrop;
    $('#cropCancel').onclick = closeCrop;
    $('#cropReset').onclick = function () {
      if (!cr) return;
      cr.zoom = 1; cr.cx = 0.5; cr.cy = 0.5;
      paintCrop();
    };
    var zl = $('#cropZoom');
    zl.oninput = function () {
      if (!cr) return;
      cr.zoom = Math.min(4, Math.max(1, num(zl.value, 100) / 100));
      /* 换倍数时保持原来的中心点（cx 是相对图框的比例，中心点在图上的位置不变），再夹回合法范围 */
      cr.cx = clampPan(cr.cx, cr.zoom);
      cr.cy = clampPan(cr.cy, cr.zoom);
      paintCrop();
    };

    /* 拖动：拖 dx 像素 → 窗口在放大 z 倍的图上挪动，除以框宽×倍数 */
    var f = $('#cropFrame'), down = false, sx = 0, sy = 0, ox = 0, oy = 0;
    f.addEventListener('pointerdown', function (e) {
      if (!cr) return;
      down = true; sx = e.clientX; sy = e.clientY; ox = cr.cx; oy = cr.cy;
      f.classList.add('drag');
      if (f.setPointerCapture) f.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    f.addEventListener('pointermove', function (e) {
      if (!down || !cr) return;
      var r = f.getBoundingClientRect();
      cr.cx = clampPan(ox - (e.clientX - sx) / (r.width * cr.zoom), cr.zoom);
      cr.cy = clampPan(oy - (e.clientY - sy) / (r.height * cr.zoom), cr.zoom);
      paintCrop();
    });
    function up(e) {
      if (!down) return;
      down = false;
      f.classList.remove('drag');
      if (f.releasePointerCapture && e.pointerId != null) {
        try { f.releasePointerCapture(e.pointerId); } catch (err) {}
      }
    }
    f.addEventListener('pointerup', up);
    f.addEventListener('pointercancel', up);
  }

  // ───────── 事件 ─────────
  function findShot(i, j) {
    var card = S.cmCards[i];
    if (!card || !card.shots || !card.shots[j]) return null;
    return { card: card, j: j };
  }
  function move(arr, j, d) {
    var k = j + d;
    if (k < 0 || k >= arr.length) return;
    var t = arr[j]; arr[j] = arr[k]; arr[k] = t;
  }

  function onClick(e) {
    var t = e.target;
    var tab = t.dataset && t.dataset.tab;
    if (tab) { S.tab = tab; render(); return; }

    var act = t.dataset && t.dataset.act;
    if (!act) return;
    var i = Number(t.dataset.i), j = Number(t.dataset.j);

    if (act === 'reset') { delete S.i18n[t.dataset.k]; render(); hint('已恢复默认：' + t.dataset.k); return; }

    if (act === 'add-img') { pickFile('image/*', function (f) { uploadImg(f, i); }); return; }
    if (act === 'crop') { openCrop(i, j); return; }
    if (act === 'add-pick') {
      var sel = $('select[data-act="sel"][data-i="' + i + '"]');
      if (!sel || !sel.value) { hint('先在下拉里选一张图', true); return; }
      S.cmCards[i].shots.push(sh(sel.value));
      render();
      return;
    }
    if (act === 'up' || act === 'down') {
      var s = findShot(i, j);
      if (s) { move(s.card.shots, j, act === 'up' ? -1 : 1); render(); }
      return;
    }
    if (act === 'rm') {
      var s2 = findShot(i, j);
      if (s2) { s2.card.shots.splice(j, 1); render(); }
      return;
    }

    if (act === 'r-add') { S.resItems.push({ icon: 'assets/winxp/windowsIcons/846(32x32).png', name: { zh: '', ja: '', en: '' }, size: { zh: '', ja: '', en: '' }, href: '' }); render(); return; }
    if (act === 'r-rm') { S.resItems.splice(i, 1); render(); return; }
    if (act === 'r-up') { move(S.resItems, i, -1); render(); return; }
    if (act === 'r-down') { move(S.resItems, i, 1); render(); return; }
    if (act === 'r-small') { pickFile('', function (f) { uploadSmall(f, i); }); return; }
    if (act === 'r-big') { pickFile('', function (f) { uploadBig(f, i); }); return; }

    if (act === 'g-pin' || act === 'g-hide' || act === 'g-rm') {
      var id = t.dataset.id;
      var idx = -1;
      S.commentsList.forEach(function (c, n) { if (c.id === id) idx = n; });
      if (idx < 0) return;
      if (act === 'g-rm') { if (!confirm('真的删掉这条留言？')) return; S.commentsList.splice(idx, 1); }
      if (act === 'g-pin') S.commentsList[idx].pinned = !S.commentsList[idx].pinned;
      if (act === 'g-hide') S.commentsList[idx].hidden = !S.commentsList[idx].hidden;
      render();
      return;
    }

    if (act === 'git-go') { gitGo(); return; }
    if (act === 'git-refresh') { refreshGit().then(function () { hint('状态已刷新'); }).catch(function (er) { hint(er.message, true); }); return; }
  }

  function onInput(e) {
    var t = e.target, d = t.dataset || {};
    if (d.k && d.l) { (S.i18n[d.k] = S.i18n[d.k] || {})[d.l] = t.value; return; }
    if ('ri' in d && d.rf) {
      var it = S.resItems[Number(d.ri)];
      if (!it) return;
      var parts = d.rf.split('.');
      if (parts.length === 2) { it[parts[0]] = it[parts[0]] || {}; it[parts[0]][parts[1]] = t.value; }
      else it[d.rf] = t.value;
      return;
    }
    if (d.gid && d.gl) {
      S.commentsList.forEach(function (c) {
        if (c.id !== d.gid) return;
        c.reply = c.reply || {};
        c.reply[d.gl] = t.value;
      });
    }
  }

  function onChange(e) {
    if (e.target.name === 'cmst') S.status = e.target.value;
  }

  function onKey(e) {
    if (e.key === 'Escape' && cr) { closeCrop(); return; }
    if (e.key === 'Enter' && $('#login') && !$('#login').hidden) doLogin();
  }

  // ───────── 启动 ─────────
  document.addEventListener('click', onClick);
  document.addEventListener('input', onInput);
  document.addEventListener('change', onChange);
  document.addEventListener('keydown', onKey);
  document.addEventListener('DOMContentLoaded', function () {
    $('#doLogin').onclick = doLogin;
    $('#save').onclick = doSave;
    $('#reload').onclick = function () { if (confirm('重新读取会丢掉没保存的改动，继续？')) boot(); };
    $('#logout').onclick = function () { post('/api/logout', {}).then(function () { location.reload(); }); };
    bindCrop();
    api('/api/whoami').then(function (j) {
      if (j.authed) { $('#login').hidden = true; $('#app').hidden = false; boot(); }
      else $('#pw').focus();
    }).catch(function () { $('#pw').focus(); });
  });
})();
