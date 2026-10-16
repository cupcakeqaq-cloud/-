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

    ['blogPageTitle', '博客', '浏览器标题：博客页'],
    ['titleBlog', '博客', '窗口标题：个人博客'],
    ['menuBlog', '博客', '开始菜单/桌面：个人博客'],
    ['blTagline', '博客', '博客副标题（站点名下面那行）'],
    ['blSearchPh', '博客', '搜索框提示文字'],
    ['blSearchGo', '博客', '搜索按钮'],
    ['blTagsTitle', '博客', '侧栏「标签」标题'],
    ['blMonthsTitle', '博客', '侧栏「按月归档」标题'],
    ['blRecentTitle', '博客', '「最近更新」窗口标题'],
    ['blAboutTitle', '博客', '侧栏「关于本博」标题'],
    ['blAbout', '博客', '侧栏「关于本博」正文'],
    ['blEntryText', '博客', '主页博客入口窗的说明文字'],
    ['blEntryGo', '博客', '主页博客入口窗的按钮'],
    ['blAll', '博客', '列表标题：全部文章 / 侧栏「全部」'],
    ['blCount', '博客', '列表右上角篇数（{n} 换篇数）'],
    ['blEmpty', '博客', '一篇都没有时的提示'],
    ['blEmptySearch', '博客', '搜索/筛选没结果时的提示'],
    ['blReadMore', '博客', '列表里的「阅读全文」'],
    ['blBackList', '博客', '文章页底部「返回列表」'],
    ['blPrev', '博客', '上一篇'],
    ['blNext', '博客', '下一篇'],
    ['blPinned', '博客', '置顶标记'],
    ['blFilterTag', '博客', '标签页标题（{tag} 换标签名）'],
    ['blFilterMonth', '博客', '归档页标题（{month} 换年月）'],
    ['blSearched', '博客', '搜索结果页标题（{q} 换关键词）'],

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
    ['gbHint', '留言板·彩蛋', '留言板说明（留言存在 Cloudflare，发出后访客删不掉）'],
    ['gbName', '留言板·彩蛋', '留言：名字输入框（留空显示 Anonymous）'],
    ['gbTimeNow', '留言板·彩蛋', '留言：刚刚'],
    ['gbLoading', '留言板·彩蛋', '留言：加载中'],
    ['gbErrList', '留言板·彩蛋', '留言：读不到留言时的提示'],
    ['gbErrNet', '留言板·彩蛋', '留言：发不出去时的提示'],
    ['gbErrRate', '留言板·彩蛋', '留言：发太快的提示（{min} 换成分钟数）'],
    ['gbErrLong', '留言板·彩蛋', '留言：正文超过 200 字的提示'],
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
  var GROUPS = ['主页', '委托页', '资源页', '博客', '桌面·菜单', '留言板·彩蛋', '电源·开机·404', '其他'];
  var FK = {};
  FIELDS.forEach(function (f) { FK[f[0]] = { group: f[1], label: f[2] }; });

  var S = {
    tab: 'text', ready: false,
    content: null, i18n: {}, status: 'open', cmCards: [], resItems: [], commentsList: [],
    posts: [], drafts: [],
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

  /* ── 例图：内存里统一是对象 {src,r,zoom,cx,cy}，存回去时再按 toWire 还原 ──
     r = 槽位比例 '1:1' | '3:4' | '4:3'，'' = 自动（按原图判定）
     zoom=放大倍数（1~4）；cx/cy = 看到的那一块的中心，在「放大后的图框」里的比例（0~1，默认 0.5） */
  var RATIOS = [['', '自动'], ['1:1', '1:1 方'], ['3:4', '3:4 竖'], ['4:3', '4:3 横']];
  /* 写死的比例才认，其余一律当自动 */
  function ratioCss(r) { return (r === '1:1' || r === '3:4' || r === '4:3') ? r.replace(':', ' / ') : ''; }
  function ratioName(r) {
    for (var n = 0; n < RATIOS.length; n++) if (RATIOS[n][0] === (r || '')) return RATIOS[n][1];
    return RATIOS[0][1];
  }
  function ratioOptions(cur) {
    return RATIOS.map(function (r) {
      return '<option value="' + r[0] + '"' + (r[0] === (cur || '') ? ' selected' : '') + '>比例：' + r[1] + '</option>';
    }).join('');
  }
  function sh(s) {
    if (typeof s === 'string') return { src: s, r: '', zoom: 1, cx: 0.5, cy: 0.5 };
    s = s || {};
    var z = Math.min(4, Math.max(1, num(s.zoom, 1)));
    return { src: String(s.src || ''), r: ratioCss(s.r) ? s.r : '', zoom: z, cx: clampPan(s.cx, z), cy: clampPan(s.cy, z) };
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
  /* 没放大、也没指定比例就是纯字符串（老写法，文件里不会多出参数）；否则写对象 */
  function toWire(o) {
    if (!o || !o.src) return null;
    var z = o.zoom, r = ratioCss(o.r) ? o.r : '';
    if (!r && !(z > 1.001)) return o.src;
    var out = { src: o.src };
    if (r) out.r = r;
    if (z > 1.001) { out.zoom = c3(z); out.cx = c3(clampPan(o.cx, z)); out.cy = c3(clampPan(o.cy, z)); }
    return out;
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
  function pickFile(accept, cb, multi) {
    var inp = document.createElement('input');
    inp.type = 'file';
    if (accept) inp.accept = accept;
    if (multi) inp.multiple = true;
    inp.onchange = function () { if (inp.files && inp.files[0]) cb(inp.files[0], inp.files); };
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
      sync(j.content, j.comments, j.blog);
      S.git = j.git;
      S.files = j.files || S.files;
      S.repo = j.repo || ''; S.branch = j.branch || ''; S.tag = j.releaseTag || 'assets'; S.hasToken = !!j.hasToken;
      S.ready = true;
      renderTabs();
      render();
      hint('已读取（' + (((j.git || {}).changed) || []).length + ' 个文件还没提交）');
    }).catch(function (e) { hint('读取失败：' + e.message, true); });
  }

  function sync(content, comments, blog) {
    S.content = content;
    S.i18n = clone(content.i18n);
    S.status = content.commission.status;
    S.cmCards = normCards(content.commission.cards);
    S.resItems = content.resources.items || [];
    S.commentsList = (comments && comments.comments) || [];
    S.posts = ((blog || {}).posts) || [];
    S.drafts = ((blog || {}).drafts) || [];
    BE = null;
  }

  // ───────── 布局 ─────────
  var TABS = [['text', '文案'], ['cm', '委托页'], ['res', '资源页'], ['blog', '博客'], ['gb', '留言'], ['git', '提交']];

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
    else if (S.tab === 'blog') v.innerHTML = viewBlog();
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
    var rc = ratioCss(o.r);
    var tag = z > 1.001 ? ' <span class="pill warn">裁剪 ' + String(c3(z)) + '×</span>' : '';
    return '<div class="shot"><img src="' + esc(enc(o.src)) + '" alt="" loading="lazy">' +
      '<div class="u">' +
      '<button data-act="crop" data-i="' + i + '" data-j="' + j + '">裁剪</button>' +
      '<button data-act="up" data-i="' + i + '" data-j="' + j + '">↑</button>' +
      '<button data-act="down" data-i="' + i + '" data-j="' + j + '">↓</button>' +
      '<button class="del" data-act="rm" data-i="' + i + '" data-j="' + j + '">删除</button>' +
      '</div>' +
      '<select class="ratio" data-act="ratio" data-i="' + i + '" data-j="' + j + '"' +
      (rc ? ' title="' + esc(rc) + '"' : '') + '>' + ratioOptions(o.r) + '</select>' +
      '<div class="p">' + esc(o.src) + tag + '</div></div>';
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

  // ───────── 博客页 ─────────
  /* 正在编辑的文章：BE = { draft: 是不是草稿, i: 在数组里的下标（-1 = 新建）, post: {...}, tagsRaw, sel: 选中的图 }
     正文不进 S，直接从 #blEdit 里读（contenteditable） */
  var BE = null;
  /* 工具栏：FMT 走 document.execCommand，BACT 是自己写的动作 */
  var FMT = [['bold', 'B', '加粗'], ['italic', 'I', '斜体'], ['underline', 'U', '下划线'],
    ['h2', '大标题', '二级标题'], ['h3', '小标题', '三级标题'], ['p', '正文', '变回普通段落'],
    ['ul', '• 列表', '无序列表'], ['ol', '1. 列表', '有序列表'], ['quote', '引用', '引用块'],
    ['link', '链接', '给选中的文字加链接'], ['hr', '——', '插入分隔线'], ['clear', '清格式', '清除选中文字的格式']];
  var BACT = [['b-img', '插图', '选一张或多张图，压到长边 1600px 后插到光标处'],
    ['b-mid', '图片居中', '先在正文里点一下那张图'],
    ['b-row', '两图并排', '先点一下第一张图（下一张也得是图）'],
    ['b-unrow', '拆开并排', '取消这两张图的并排']];

  function blogArr(draft) { return draft ? S.drafts : S.posts; }
  function newPost() {
    var d = new Date();
    return {
      id: 'p-' + Date.now(), title: '', date: d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()),
      tags: [], summary: '', html: '', pinned: false
    };
  }
  function parseTags(s) {
    var out = [], seen = {};
    String(s || '').split(/[,，、;；\s]+/).forEach(function (k) {
      k = k.trim().slice(0, 24);
      if (!k || seen[k] || out.length >= 8) return;
      seen[k] = 1; out.push(k);
    });
    return out;
  }
  function bWords(html) {
    var d = document.createElement('div');
    d.innerHTML = String(html || '');
    return String(d.textContent || '').replace(/\s+/g, '').length;
  }

  function bRows(arr, draft) {
    if (!arr.length) return '<div class="tip">还没有' + (draft ? '草稿' : '文章') + '。</div>';
    return arr.map(function (p, i) {
      var tags = (p.tags || []).length ? '<span class="pill">' + esc(p.tags.join('、')) + '</span>' : '';
      return '<div class="item"><div class="hd"><b>' + esc(p.title || '（还没写标题）') + '</b>' +
        '<span class="pill">' + esc(p.date || '') + '</span>' + tags +
        (p.pinned ? '<span class="pill warn">置顶</span>' : '') +
        '<span class="pill off">' + bWords(p.html) + ' 字</span>' +
        '<button data-act="b-edit" data-i="' + i + '" data-draft="' + (draft ? 1 : 0) + '">编辑</button>' +
        (draft ? '<button data-act="b-pub" data-i="' + i + '">发布到前台</button>'
               : '<button data-act="b-unpub" data-i="' + i + '">转成草稿</button>') +
        '<button class="del" data-act="b-del" data-i="' + i + '" data-draft="' + (draft ? 1 : 0) + '">删除</button></div>' +
        (p.summary ? '<div class="lab">' + esc(p.summary) + '</div>' : '') + '</div>';
    }).join('');
  }

  function bListHtml() {
    return '<div class="grp"><h3>个人博客</h3><div class="bd">' +
      '<div class="tip">已发布的文章存在 `blog/posts.js`（推上线，前台能看）；草稿存在 `blog/drafts.js`，它写进了 .gitignore —— <b>只在你这台电脑的本地后台看得到，换台电脑或重装就没了</b>。<br>' +
      '编辑流程：点「编辑」改完 → 点正文下面那排按钮里的「保存这篇文章」→ 再点右上角「保存改动」写进文件 → 最后去「提交」页推送。</div>' +
      '<div class="row2"><button class="pri" data-act="b-new">＋ 新建文章</button><button data-act="b-new-draft">＋ 新建草稿</button></div>' +
      '</div></div>' +
      '<div class="grp"><h3>已发布（' + S.posts.length + ' 篇）</h3><div class="bd">' + bRows(S.posts, false) + '</div></div>' +
      '<div class="grp"><h3>草稿（' + S.drafts.length + ' 篇）</h3><div class="bd">' + bRows(S.drafts, true) + '</div></div>';
  }

  function bEditHtml() {
    try { document.execCommand('defaultParagraphSeparator', false, 'p'); } catch (e) {}
    var p = BE.post;
    var bar = FMT.map(function (c) {
      return '<button data-act="b-fmt" data-cmd="' + c[0] + '" title="' + c[2] + '">' + c[1] + '</button>';
    }).join('') + BACT.map(function (c) {
      return '<button data-act="' + c[0] + '" title="' + c[2] + '">' + c[1] + '</button>';
    }).join('');
    return '<div class="grp"><h3>' + (BE.draft ? '编辑草稿' : '编辑文章') + '（' + esc(p.id) + '）</h3><div class="bd">' +
      '<div class="lab">标题</div><input type="text" data-bf="title" placeholder="文章标题" value="' + esc(p.title || '') + '">' +
      '<div class="lab">日期（前台按日期倒序排）</div><input type="date" data-bf="date" value="' + esc(p.date || '') + '">' +
      '<div class="lab">标签（逗号、顿号或空格隔开，最多 8 个，可以留空）</div>' +
      '<input type="text" data-bf="tags" placeholder="生活记录、感想" value="' + esc(BE.tagsRaw || '') + '">' +
      '<div class="lab">摘要（留空 = 前台自动截正文前 120 字）</div>' +
      '<textarea data-bf="summary" rows="2" placeholder="列表里显示的那两行">' + esc(p.summary || '') + '</textarea>' +
      '<label class="bl-pin"><input type="checkbox" data-bf="pinned"' + (p.pinned ? ' checked' : '') + '> 置顶（前台排最前面）</label>' +
      '</div></div>' +
      '<div class="grp"><h3>正文</h3><div class="bd">' +
      '<div class="tip">选中文字再点按钮；「插图」会先把图压到长边 1600px 再传（透明 PNG 还是 PNG，GIF 原样传）。插完点一下正文里的图，才能用「图片居中 / 两图并排」。</div>' +
      '<div class="bl-tbar">' + bar + '</div>' +
      '<div class="bl-edit" id="blEdit" contenteditable="true">' + (p.html || '') + '</div>' +
      '<div class="row2"><button class="pri" data-act="b-save">保存这篇文章</button><button data-act="b-cancel">返回列表（不保存）</button></div>' +
      '</div></div>';
  }

  function viewBlog() { return BE ? bEditHtml() : bListHtml(); }

  /* 把编辑器里的东西读回 BE */
  function bCommit() {
    if (!BE) return;
    var box = $('#blEdit');
    if (box) BE.post.html = box.innerHTML;
    BE.post.tags = parseTags(BE.tagsRaw);
    BE.post.title = String(BE.post.title || '').trim();
    BE.post.summary = String(BE.post.summary || '').trim();
  }

  /* auto = 点右上角「保存改动」/「提交推送」时顺手存下来的（不弹提示、不改页签） */
  function bSave() {
    bCommit();
    if (!BE) return true;
    if (!BE.post.title) { hint('还没写标题，先写上标题', true); return false; }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(BE.post.date || '')) BE.post.date = newPost().date;
    if (BE.i < 0) blogArr(BE.draft).push(BE.post);
    else blogArr(BE.draft)[BE.i] = BE.post;
    BE = null;
    return true;
  }

  /* 顺手把编辑中的文章收进内存（在保存/推送前调用），收不了就明确报出来 */
  function bAutoCommit() {
    if (!BE) return;
    if (bSave()) hint('编辑中的文章也一起存了（还在内存里，接着写文件）');
  }

  function bFmt(cmd) {
    var box = $('#blEdit');
    if (!box) return;
    box.focus();
    try { document.execCommand('styleWithCSS', false, false); } catch (e) {}   /* 要 <b>/<i>/<u>，不要行内 style */
    if (cmd === 'h2' || cmd === 'h3' || cmd === 'p') document.execCommand('formatBlock', false, cmd);
    else if (cmd === 'quote') document.execCommand('formatBlock', false, 'blockquote');
    else if (cmd === 'ul') document.execCommand('insertUnorderedList');
    else if (cmd === 'ol') document.execCommand('insertOrderedList');
    else if (cmd === 'hr') document.execCommand('insertHorizontalRule');
    else if (cmd === 'clear') document.execCommand('removeFormat');
    else if (cmd === 'link') {
      var u = prompt('链接地址（https:// 开头，或站内路径像 uploads/xxx.zip）：', 'https://');
      if (u) document.execCommand('createLink', false, u);
    } else document.execCommand(cmd);
  }

  /* 图片：选中的那张 figure（点一下正文里的图就选中了） */
  function bFig() {
    if (BE && BE.sel && document.body.contains(BE.sel)) return BE.sel;
    hint('先在正文里点一下那张图，再点这个按钮', true);
    return null;
  }
  function bShrink(file, cb) {
    /* ponytail: 只做长边缩放 + JPEG 0.85，不做质量/格式面板；真嫌大再调 MAX/质量 */
    var MAX = 1600;
    if (!/^image\//.test(file.type) || file.type === 'image/gif' || file.type === 'image/svg+xml') { cb(file, file.name); return; }
    var url = URL.createObjectURL(file), im = new Image();
    var done = function (blob, name) { URL.revokeObjectURL(url); cb(blob, name); };
    im.onerror = function () { done(file, file.name); };
    im.onload = function () {
      try {
        var k = Math.min(1, MAX / Math.max(im.naturalWidth, im.naturalHeight));
        var cv = document.createElement('canvas');
        cv.width = Math.max(1, Math.round(im.naturalWidth * k));
        cv.height = Math.max(1, Math.round(im.naturalHeight * k));
        var cx = cv.getContext('2d');
        var png = file.type === 'image/png';
        if (!png) { cx.fillStyle = '#fff'; cx.fillRect(0, 0, cv.width, cv.height); }
        cx.drawImage(im, 0, 0, cv.width, cv.height);
        var base = String(file.name || 'img').replace(/\.[^.]+$/, '').replace(/[^A-Za-z0-9._-]+/g, '-').slice(0, 30) || 'img';
        cv.toBlob(function (b) {
          if (!b) { done(file, file.name); return; }
          done(b, base + (png ? '.png' : '.jpg'));
        }, png ? 'image/png' : 'image/jpeg', 0.85);
      } catch (e) { done(file, file.name); }
    };
    im.src = url;
  }
  function bInsertImages(files) {
    var list = Array.prototype.slice.call(files || []), box = $('#blEdit'), n = 0;
    (function step() {
      if (n >= list.length) { hint('图插好了；接着点「保存这篇文章」→「保存改动」'); return; }
      var f = list[n++];
      bShrink(f, function (blob, name) {
        hint('正在上传 ' + name + '（' + Math.round(blob.size / 1024) + ' KB）…');
        fetch('/api/upload?kind=image&name=' + encodeURIComponent(name),
          { method: 'POST', headers: { 'Content-Type': 'application/octet-stream' }, body: blob })
          .then(parseRes)
          .then(function (j) {
            S.files.uploads.push(j.path.replace(/^uploads\//, ''));
            if (box) {
              box.focus();
              document.execCommand('insertHTML', false, '<figure class="bl-figure"><img src="' + j.path + '" alt=""></figure>');
            }
            step();
          })
          .catch(function (e) { hint('上传失败：' + e.message, true); });
      });
    })();
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
      return post('/api/blog', { posts: S.posts, drafts: S.drafts });
    }).then(function (m) {
      S.posts = m.posts || S.posts;
      S.drafts = m.drafts || S.drafts;
      if (m.git) S.git = m.git;
    });
  }

  function doSave() {
    hint('保存中…');
    bAutoCommit();
    saveBoth().then(function () {
      hint('已写进本地文件（还没提交）。去「提交」页点一下提交并推送。');
      render();
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
    bAutoCommit();
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

  /* 槽位比例：选了就按选的；没选和前台一致（js/content-render.js 的 shotRatio / js/winxp.js 的判定） */
  function cropRatio() {
    if (cr && ratioCss(cr.r)) return ratioCss(cr.r);
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
    var f = $('#cropFrame'), im = $('#cropImg');
    /* 按存盘时的精度（3 位小数）画，预览才和保存后的前台一模一样 */
    var z = c3(cr.zoom), cx = c3(clampPan(cr.cx, z)), cy = c3(clampPan(cr.cy, z));
    im.style.width = (z * 100) + '%';
    im.style.height = (z * 100) + '%';
    im.style.left = ((0.5 - cx * z) * 100) + '%';
    im.style.top = ((0.5 - cy * z) * 100) + '%';
    f.style.aspectRatio = cropRatio();
    $('#cropZoom').value = String(Math.round(z * 100));
    $('#cropVal').textContent = z.toFixed(2) + '×';
  }

  function openCrop(i, j) {
    var card = S.cmCards[i];
    var o = card && card.shots && card.shots[j];
    if (!o) return;
    var z = Math.min(4, Math.max(1, num(o.zoom, 1)));
    cr = { i: i, j: j, src: o.src, r: o.r, zoom: z, cx: clampPan(o.cx, z), cy: clampPan(o.cy, z) };
    $('#cropSrc').textContent = o.src;
    var rs = $('#cropRatio');
    if (rs) rs.value = o.r || '';
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
    o.zoom = cr.zoom; o.cx = cr.cx; o.cy = cr.cy; o.r = cr.r;
    var set = o.zoom > 1.001 || !!ratioCss(o.r);
    closeCrop();
    if (S.tab !== 'cm') S.tab = 'cm';
    render();
    hint(set ? '已设成「' + ratioName(o.r) + '」' + (o.zoom > 1.001 ? ' + 裁剪 ' + c3(o.zoom) + '×' : '') + '（记得点「保存改动」）'
      : '已恢复成整张 + 自动比例（记得点「保存改动」）');
  }

  function bindCrop() {
    $('#cropOk').onclick = applyCrop;
    $('#cropCancel').onclick = closeCrop;
    $('#cropReset').onclick = function () {
      if (!cr) return;
      cr.zoom = 1; cr.cx = 0.5; cr.cy = 0.5;
      paintCrop();
    };
    var rs = $('#cropRatio');
    if (rs) rs.onchange = function () {
      if (!cr) return;
      cr.r = ratioCss(rs.value) ? rs.value : '';
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
      /* 指针捕获是锦上添花：某些浏览器对非活动指针会抛错，抛了也不该影响拖动 */
      try { if (f.setPointerCapture) f.setPointerCapture(e.pointerId); } catch (err) {}
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
      try { if (f.releasePointerCapture && e.pointerId != null) f.releasePointerCapture(e.pointerId); } catch (err) {}
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

    /* 正文里点一下图 = 选中它（「图片居中 / 两图并排」都作用在选中的这张上） */
    if (t.tagName === 'IMG' && t.closest && t.closest('#blEdit')) {
      var fg = t.closest('figure');
      $$('#blEdit figure, #blEdit img').forEach(function (n) { n.classList.remove('sel'); });
      (fg || t).classList.add('sel');
      if (BE) BE.sel = fg;
      return;
    }

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

    if (act === 'b-new' || act === 'b-new-draft') {
      BE = { draft: act === 'b-new-draft', i: -1, post: newPost(), tagsRaw: '', sel: null };
      render();
      return;
    }
    if (act === 'b-edit') {
      var arr0 = blogArr(t.dataset.draft === '1');
      if (!arr0[i]) return;
      BE = { draft: t.dataset.draft === '1', i: i, post: clone(arr0[i]), tagsRaw: (arr0[i].tags || []).join('、'), sel: null };
      render();
      return;
    }
    if (act === 'b-del') {
      var arr1 = blogArr(t.dataset.draft === '1');
      if (!arr1[i]) return;
      if (!confirm('真的删掉「' + (arr1[i].title || '（没标题）') + '」？\n' + (t.dataset.draft === '1' ? '（草稿删了找不回来）' : ''))) return;
      arr1.splice(i, 1);
      render();
      hint('已删掉（点「保存改动」才写进文件）');
      return;
    }
    if (act === 'b-pub' || act === 'b-unpub') {
      var from = act === 'b-pub' ? S.drafts : S.posts, to = act === 'b-pub' ? S.posts : S.drafts;
      if (!from[i]) return;
      to.push(from.splice(i, 1)[0]);
      render();
      hint('已' + (act === 'b-pub' ? '移进「已发布」' : '移进「草稿」') + '（点「保存改动」才写进文件）');
      return;
    }
    if (act === 'b-fmt') { bFmt(t.dataset.cmd); return; }
    if (act === 'b-img') { pickFile('image/*', function (f, fs) { bInsertImages(fs); }, true); return; }
    if (act === 'b-mid') {
      var fg = bFig();
      if (fg) fg.classList.toggle('bl-mid');
      return;
    }
    if (act === 'b-row') {
      var f1 = bFig();
      if (!f1) return;
      var nx = f1.nextElementSibling;
      if (!nx || nx.tagName !== 'FIGURE') { hint('下一张也得是图：先插第二张图，再点第一张图，然后点这里', true); return; }
      var row = document.createElement('div');
      row.className = 'bl-row';
      f1.parentNode.insertBefore(row, f1);
      row.appendChild(f1);
      row.appendChild(nx);
      return;
    }
    if (act === 'b-unrow') {
      var f2 = bFig();
      if (!f2) return;
      var p2 = f2.parentNode;
      if (!p2 || !p2.classList || !p2.classList.contains('bl-row')) { hint('这张图没有并排', true); return; }
      p2.parentNode.insertBefore(f2, p2);
      if (!p2.querySelector('figure')) p2.parentNode.removeChild(p2);
      return;
    }
    if (act === 'b-save') {
      if (bSave()) { hint('已收进内存（还没写文件）。点右上角「保存改动」写进本地文件。'); render(); }
      return;
    }
    if (act === 'b-cancel') { BE = null; render(); return; }

    if (act === 'git-go') { gitGo(); return; }
    if (act === 'git-refresh') { refreshGit().then(function () { hint('状态已刷新'); }).catch(function (er) { hint(er.message, true); }); return; }
  }

  function onInput(e) {
    var t = e.target, d = t.dataset || {};
    if (d.bf) {
      if (!BE) return;
      if (d.bf === 'tags') BE.tagsRaw = t.value;
      else BE.post[d.bf] = t.value;
      return;
    }
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
    var d = e.target.dataset || {};
    if (d.bf === 'pinned') { if (BE) BE.post.pinned = e.target.checked; return; }
    if (d.act === 'ratio') {
      var s = findShot(Number(d.i), Number(d.j));
      if (!s) return;
      var o = s.card.shots[s.j];
      o.r = ratioCss(e.target.value) ? e.target.value : '';
      render();
      hint('已设成「' + ratioName(o.r) + '」（记得点「保存改动」）');
    }
  }

  function onKey(e) {
    if (e.key === 'Escape' && cr) { closeCrop(); return; }
    if (e.key === 'Enter' && $('#login') && !$('#login').hidden) doLogin();
  }

  // ───────── 启动 ─────────
  document.addEventListener('click', onClick);
  /* 点工具栏别把正文里的焦点和选区弄丢（丢了 execCommand 就没作用了） */
  document.addEventListener('mousedown', function (e) {
    var el = e.target;
    if (el && el.closest && el.closest('.bl-tbar')) e.preventDefault();
  });
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
