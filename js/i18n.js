/* 多语言字典与切换逻辑：中文 / 日本語 / English（下拉式，默认中文） */
(function () {
  var DICT = {
    pageTitle: {
      zh: '12あKa@被告人杯糕_ ★ 个人主页',
      ja: '12あKa@被告人杯糕_ ★ ホームページ',
      en: '12あKa@被告人杯糕_ ★ Homepage'
    },
    commissionPageTitle: {
      zh: '委托相关事宜 ★ 12あKa@被告人杯糕_',
      ja: '依頼受付 ★ 12あKa@被告人杯糕_',
      en: 'Commission ★ 12あKa@被告人杯糕_'
    },
    resourcesPageTitle: {
      zh: '资源配布 ★ 12あKa@被告人杯糕_',
      ja: '素材配布 ★ 12あKa@被告人杯糕_',
      en: 'Resources ★ 12あKa@被告人杯糕_'
    },
    backHome: { zh: '← 返回主页', ja: '← ホームへ戻る', en: '← Back to home' },

    /* ---------- 页面窗口标题 ---------- */
    titleProfile: { zh: '自我介绍', ja: '自己紹介', en: 'About' },
    titleGuestbook: { zh: '留言板', ja: '掲示板', en: 'Guestbook' },
    titleCommission: { zh: '委托相关事宜', ja: '依頼受付', en: 'Commission' },
    titleResources: { zh: '资源配布', ja: '素材配布', en: 'Resources' },

    /* ---------- 自我介绍 ---------- */
    aboutTitle: { zh: '简介', ja: '紹介', en: 'About' },
    bio: {
      zh: '18↑一般通过十八线低精力画手，此网页暂时为半成品，大部分文本为ai自动填写的占位符，请无视。',
      ja: '18↑ 一般通過の低浮上絵描き。このページはまだ半完成品で、テキストの大半はAIが自動で入れたプレースホルダーです。スルーしてください。',
      en: '18+ generally low-energy illustrator. This page is still a work in progress — most of the text is AI-filled placeholder, please ignore it.'
    },
    linksTitle: { zh: '找到我', ja: '見つけてね', en: 'Find me' },
    email: { zh: '邮箱', ja: 'メール', en: 'Email' },

    /* ---------- 开始菜单 ---------- */
    menuHome: { zh: '返回主页', ja: 'ホームに戻る', en: 'Home' },
    menuCommission: { zh: '委托相关事宜', ja: '依頼受付', en: 'Commission' },
    menuResources: { zh: '资源配布', ja: '素材配布', en: 'Resources' },
    menuFriend: { zh: 'Survivor', ja: 'Survivor', en: 'Survivor' },
    menuArrange: { zh: '整理所有窗口', ja: 'ウィンドウを整列', en: 'Arrange windows' },

    /* ---------- 桌面快捷方式 ---------- */
    deskComputer: { zh: '我的电脑', ja: 'マイ コンピュータ', en: 'My Computer' },
    deskMines: { zh: '扫雷', ja: 'マインスイーパ', en: 'Minesweeper' },
    deskPaint: { zh: '画图', ja: 'ペイント', en: 'Paint' },
    deskMusic: { zh: '音乐', ja: '音楽', en: 'Music' },

    /* ---------- 留言板（存在 Cloudflare KV，前台只读+发） ---------- */
    gbPlaceholder: { zh: '写点什么吧…', ja: 'なにか書いてね…', en: 'Say something…' },
    gbSend: { zh: '发送', ja: '送信', en: 'Send' },
    gbEmpty: { zh: '暂无评论', ja: 'まだコメントがありません', en: 'No comments yet' },
    gbHint: {
      zh: '留言所有人都能看到。发出后自己删不掉（要删请找我）。正文最多 200 字，10 分钟内最多发 3 条。',
      ja: 'コメントは誰でも見られます。投稿後は自分で削除できません（削除は管理人まで）。本文は 200 字まで、10 分間に 3 件までです。',
      en: 'Comments are visible to everyone. You cannot delete your own post (ask the site owner to). Max 200 characters, up to 3 posts per 10 minutes.'
    },
    gbName: { zh: '名字（留空则显示 Anonymous）', ja: '名前（空欄なら Anonymous）', en: 'Name (blank = Anonymous)' },
    gbTimeNow: { zh: '刚刚', ja: 'たった今', en: 'just now' },
    gbLoading: { zh: '加载中…', ja: '読み込み中…', en: 'Loading…' },
    gbErrList: { zh: '留言加载失败，稍后再试。', ja: 'コメントを読み込めませんでした。あとでもう一度どうぞ。', en: 'Could not load comments. Please try again later.' },
    gbErrNet: { zh: '发送失败：连不上留言服务器，稍后再试。', ja: '送信できませんでした。サーバーに接続できません。', en: 'Send failed: cannot reach the comment server.' },
    gbErrRate: {
      zh: '发得太快了，10 分钟内最多 3 条，请等 {min} 分钟再发。',
      ja: '投稿が速すぎます。10 分間に 3 件までです。約 {min} 分後にもう一度どうぞ。',
      en: 'Too fast — up to 3 posts per 10 minutes. Try again in about {min} min.'
    },
    gbErrLong: { zh: '正文最多 200 字。', ja: '本文は 200 字までです。', en: 'Max 200 characters.' },

    /* ---------- 主页上的两个入口 ---------- */
    ceText: {
      zh: '委托流程、价目表、申请方式与例图都搬到独立页面了，点击下面的按钮进入。',
      ja: '依頼の流れ・料金表・申し込み方法・サンプルは専用ページに移動しました。',
      en: 'Process, price list, how to apply and samples all live on a separate page now.'
    },
    ceGo: { zh: '进入委托相关事宜页 →', ja: '依頼受付ページへ →', en: 'Open commission page →' },
    reText: {
      zh: '音源等资源的下载与使用说明搬到独立页面了，点击下面的按钮进入。',
      ja: '音源などのダウンロードと使い方は専用ページに移動しました。',
      en: 'Downloads and usage notes moved to a separate page.'
    },
    reGo: { zh: '进入资源配布页 →', ja: '素材配布ページへ →', en: 'Open resources page →' },

    /* ---------- 委托页 ---------- */
    cmStatusTitle: { zh: '目前是否接受委托', ja: '依頼受付状況', en: 'Commission status' },
    cmStatusOpen: { zh: '接受中', ja: '受付中', en: 'OPEN' },
    /* 另外两个状态：由 js/content.js 的 commission.status 决定用哪个，改文案改这里 */
    cmStatusPaused: { zh: '暂停接单', ja: '一時受付停止', en: 'PAUSED' },
    cmStatusClosed: { zh: '已停止接单', ja: '受付終了', en: 'CLOSED' },
    cmStatusNote: {
      zh: '档期随时变动，来问价之前建议先私信确认一下当前排期 ♡',
      ja: 'スケジュールは変動します。お問い合わせ前にDMでご確認ください ♡',
      en: 'Slots change often — please DM me to confirm the current schedule first ♡'
    },
    cmPriceTitle: { zh: '委托价目表', ja: '料金表', en: 'Price list' },
    cmPriceTalk: { zh: '私信议价', ja: 'DMで相談', en: 'DM to discuss' },
    cmPriceNote: {
      zh: '※ 上表价格与工期为占位内容（工期单位为工作日），正式价目待站长补充；商用／加急另计。',
      ja: '※ 上記の料金と納期は仮の内容です（納期は営業日）。正式な料金表は追って更新します。商用・特急は別途。',
      en: '※ Prices and lead times above are placeholders (lead time in business days) to be filled in by the owner. Commercial use and rush orders cost extra.'
    },
    cmApplyTitle: { zh: '委托申请方式', ja: '申し込み方法', en: 'How to apply' },
    cmApply1b: { zh: '① 私信联系', ja: '① DMで連絡', en: '① Get in touch' },
    cmApply1d: {
      zh: '通过米画师 / X / マシュマロ 任意一个渠道私信我，附上用途与参考图。',
      ja: 'ミファシ・X・マシュマロのいずれかからDMしてください。用途と参考画像を添えて。',
      en: 'DM me on MiHuashi / X / Marshmallow with the intended use and references.'
    },
    cmApply2b: { zh: '② 说明需求', ja: '② 内容を伝える', en: '② Brief me' },
    cmApply2d: {
      zh: '说明用途、预算、期望工期，以及角色设定／构图要求。',
      ja: '用途・予算・希望納期、キャラ設定や構図の希望を教えてください。',
      en: 'Tell me the use, budget, deadline, plus character settings and composition wishes.'
    },
    cmApply3b: { zh: '③ 确认后开工', ja: '③ 確認して着手', en: '③ Confirm and start' },
    cmApply3d: {
      zh: '确认报价与排期后支付定金，草稿 → 上色 → 完稿逐步交付。',
      ja: '料金とスケジュールを確認し、着手金をお支払いいただいてからラフ→着色→完成へ進みます。',
      en: 'After confirming the quote and schedule, pay the deposit; then sketch → color → final delivery.'
    },

    /* ---------- 委托页卡片（01 白底头像用的是站长米画师实价，02-04 为占位）
       价位按语言换算当地货币，汇率基准写在这里，改汇率就改这三对数字：
       1 CNY = 21 JPY = 0.14 USD（日元取 500 整、美元取 5 整） ---------- */
    cmCard1Title: { zh: '白底头像', ja: '白背景アイコン', en: 'Flat-color icon' },
    cmCard1Price: { zh: '¥320-520', ja: '6,500〜11,000円', en: '$45-75' },
    cmCard1Desc1: { zh: '塑造成仅做如例图所示简单二分', ja: '塗りは例のようにシンプルな二分まで', en: 'Shading kept to the simple two-tone shown' },
    cmCard1Desc2: { zh: '需要小物添加／抱娃之类的ok', ja: '小物追加・抱っこなどはOK', en: 'Props, plushies and the like are fine' },
    cmCard2Title: { zh: '半身插画', ja: '半身イラスト', en: 'Half-body illustration' },
    cmCard2Price: { zh: '¥600-900', ja: '12,500〜19,000円', en: '$85-125' },
    cmCard2Desc1: { zh: '膝上／腰上半身构图', ja: '腰上〜膝上の半身構図', en: 'Waist-up to knee-up composition' },
    cmCard2Desc2: { zh: '可按需求加背景与光效', ja: 'ご希望に応じて背景やライティングも', en: 'Backgrounds and lighting available on request' },
    cmCard3Title: { zh: '全身插画', ja: '全身イラスト', en: 'Full-body illustration' },
    cmCard3Price: { zh: '¥1000-1500', ja: '21,000〜31,500円', en: '$140-210' },
    cmCard3Desc1: { zh: '全身构图，含简单背景', ja: '全身構図、簡単な背景付き', en: 'Full body with a simple background' },
    cmCard3Desc2: { zh: '复杂设定／多套服装另议', ja: '複雑な設定・衣装違いは別途お見積り', en: 'Complex designs or extra outfits quoted separately' },
    cmCard4Title: { zh: '场景／多人', ja: 'シチュエーション・複数人', en: 'Scene / multiple characters' },
    cmCard4Desc1: { zh: '横构图场景、双人以上互动', ja: '横長の構図、二人以上の絡み', en: 'Wide compositions, two or more characters' },
    cmCard4Desc2: { zh: '按复杂度报价，先私信沟通', ja: '複雑さでお見積り、まずはDMで', en: 'Quoted by complexity — DM me first' },
    cmLinksTitle: { zh: '联系方式', ja: '連絡先', en: 'Contact' },

    /* ---------- 资源页 ---------- */
    rsIntroTitle: { zh: '资源配布页面', ja: 'リソース配布ページ', en: 'Resource distribution' },
    rsIntro: {
      zh: '这里什么都有可能放 —— 会不定时上传本人制作的东西，看到更新就下载吧。',
      ja: 'ここに置くものは何でもありです —— 本人が作ったものを不定期にアップします。更新があったらダウンロードしていってください。',
      en: 'Anything goes here — I upload things I make now and then. Grab whatever you see when it updates.'
    },
    rsDownloadTitle: { zh: '资源下载分享', ja: 'リソースのダウンロード共有', en: 'Resource downloads' },
    /* 显示名跟着语言走；zip 的文件名是中文的，改不了（改了链接就 404） */
    voiceNameFlan: { zh: '芙兰朵露 v1.0.0-beta', ja: 'フランドール v1.0.0-beta', en: 'Flandre v1.0.0-beta' },
    voiceSizeFlan: { zh: '约 33.2 MB · zip', ja: '約 33.2 MB · zip', en: '~33.2 MB · zip' },
    voiceDownload: { zh: '↓ 下载', ja: '↓ ダウンロード', en: '↓ Download' },
    voiceNoteTitle: { zh: '使用说明：', ja: '使い方：', en: 'How to use:' },
    voiceNote: {
      zh: '下载并解压 zip，将音源文件夹放入 UTAU 的 voice 目录，编辑器内选择该音源即可使用。请勿二次配布或倒卖；转载／使用请标注音源作者。商用请先联系确认 ♡',
      ja: 'zipを解凍し、音源フォルダをUTAUのvoiceフォルダに入れて、エディタで選択すれば使用できます。二次配布・転売は禁止。転載・使用時は音源作者を明記してください。商用利用は事前にご連絡ください ♡',
      en: 'Unzip and place the voicebank folder into UTAU\'s voice folder, then select it in the editor. No redistribution or resale; please credit the author when using or sharing. Contact me for commercial use ♡'
    },

    /* ---------- 电源流程 ---------- */
    pwLogoffTitle: { zh: '注销 Windows', ja: 'Windows のログオフ', en: 'Log Off Windows' },
    pwTurnTitle: { zh: '注销 Windows', ja: 'Windows のログオフ', en: 'Log Off Windows' },
    pwStandby: { zh: '待机', ja: 'スタンバイ', en: 'Stand By' },
    pwTurnOff: { zh: '关闭计算机', ja: '電源を切る', en: 'Turn Off' },
    pwRestart: { zh: '重新启动', ja: '再起動', en: 'Restart' },
    pwSwitch: { zh: '切换用户', ja: 'ユーザーの切り替え', en: 'Switch User' },
    pwLogOff: { zh: '注销', ja: 'ログオフ', en: 'Log Off' },
    pwCancel: { zh: '取消', ja: 'キャンセル', en: 'Cancel' },
    pwTurnOffShort: { zh: '关闭计算机', ja: '電源を切る', en: 'Turn Off Computer' },
    pwShuttingDown: { zh: 'Windows 正在关机', ja: 'Windows を終了しています', en: 'Windows is shutting down' },
    pwRestarting: { zh: 'Windows 正在重新启动', ja: 'Windows を再起動しています', en: 'Windows is restarting' },
    pwSafeToTurnOff: {
      zh: '你现在可以安全地关闭计算机了。',
      ja: 'コンピュータの電源を切っても安全です。',
      en: 'It is now safe to turn off your computer.'
    },
    pwRestartNow: { zh: '重新开机', ja: '再起動', en: 'Restart' },

    /* ---------- 欢迎界面 ---------- */
    wlTip: { zh: '要开始，请单击您的用户名', ja: '開始するにはユーザー名をクリックしてください', en: 'To begin, click your user name' },
    wlRunning: { zh: '{n} 程序正在运行', ja: '{n} 個のプログラムが実行中', en: '{n} programs running' },
    wlShutdown: { zh: '关闭计算机', ja: '電源を切る', en: 'Turn off computer' },
    wlHint: { zh: '单击用户名登录', ja: 'ユーザー名をクリックしてログオン', en: 'Click the user name to log on' },

    /* ---------- 假 404（外链兜底） ---------- */
    nfTitle: { zh: '无法显示网页', ja: 'ページを表示できません', en: 'The page cannot be displayed' },
    nfLede: {
      zh: '您要访问的网页目前无法显示。该站点不允许被嵌入到其他页面中。',
      ja: 'アクセスしようとしたページは表示できません。このサイトは他のページへの埋め込みを許可していません。',
      en: 'The page you are looking for is currently unavailable. This site does not allow itself to be embedded in other pages.'
    },
    nfWhy: { zh: '这可能是因为：', ja: '原因として考えられること：', en: 'This might be because:' },
    nfLi1: { zh: '该站点发送了禁止嵌入的响应头（X-Frame-Options / CSP）', ja: '埋め込みを禁止するヘッダー（X-Frame-Options / CSP）が送信されている', en: 'The site sends headers that forbid embedding (X-Frame-Options / CSP)' },
    nfLi2: { zh: 'Web 地址输入有误，或该站点已下线', ja: 'アドレスが間違っている、またはサイトが閉鎖されている', en: 'The address is misspelled, or the site is offline' },
    nfLi3: { zh: '网络连接被中断（本地网络或站点被墙）', ja: '接続が遮断されている（ローカル回線・ブロックなど）', en: 'The connection was interrupted (local network or blocked)' },
    nfTech: { zh: 'HTTP 404 - 找不到文件', ja: 'HTTP 404 - ファイルが見つかりません', en: 'HTTP 404 - File not found' },
    nfRetry: { zh: '重试', ja: '再試行', en: 'Retry' },
    nfNewTab: { zh: '在新标签打开', ja: '新しいタブで開く', en: 'Open in a new tab' },

    /* ---------- 我的电脑 ---------- */
    compNotReady: {
      zh: '无法访问 {drive}。设备未就绪，或该位置没有可用的磁盘。',
      ja: '{drive} にアクセスできません。デバイスの準備ができていないか、ディスクがありません。',
      en: 'Cannot access {drive}. The device is not ready or there is no disk at this location.'
    },
    compNoSearch: {
      zh: '搜索引擎尚未安装。（笑）',
      ja: '検索エンジンはまだインストールされていません。（笑）',
      en: 'No search engine is installed yet. (lol)'
    },

    /* ---------- 彩蛋 ---------- */
    duckAria: { zh: '玩具鸭彩蛋', ja: 'おもちゃのアヒルのお楽しみ', en: 'Toy duck surprise' },
    ceInfoTitle: { zh: '信息', ja: '情報', en: 'Information' },
    ceFeatured: { zh: '你在期待什么？', ja: '何を期待してるの？', en: 'What were you expecting?' },
    ceOk: { zh: '确定', ja: 'OK', en: 'OK' },
    /* 蓝屏文案**不做多语言**（站主要求纯英文保证还原度），已硬编码在 js/easteregg.js */

    /* ---------- 个人博客 ---------- */
    blogPageTitle: {
      zh: '个人博客 ★ 12あKa@被告人杯糕_',
      ja: '個人ブログ ★ 12あKa@被告人杯糕_',
      en: 'Blog ★ 12あKa@被告人杯糕_'
    },
    titleBlog: { zh: '个人博客', ja: '個人ブログ', en: 'Blog' },
    menuBlog: { zh: '个人博客', ja: '個人ブログ', en: 'Blog' },
    blTagline: {
      zh: '感想 · 生活记录 · 资源存档',
      ja: '感想・生活記録・素材アーカイブ',
      en: 'Thoughts · daily life · archive'
    },
    blSearchPh: { zh: '搜索文章…', ja: '記事を検索…', en: 'Search posts…' },
    blSearchGo: { zh: '搜索', ja: '検索', en: 'Search' },
    blTagsTitle: { zh: '标签', ja: 'タグ', en: 'Tags' },
    blMonthsTitle: { zh: '按月归档', ja: '月別アーカイブ', en: 'Archive' },
    blRecentTitle: { zh: '最近更新', ja: '最近の更新', en: 'Recent posts' },
    blAboutTitle: { zh: '关于本博', ja: 'このブログについて', en: 'About' },
    blAbout: {
      zh: '放我平时写的东西：感想、生活流水账、收集到的资源。想到什么写什么，不定期更新。',
      ja: '感想・日常・集めた素材などを置いています。気が向いたときに更新します。',
      en: 'Thoughts, daily notes and collected resources. Updated whenever I feel like it.'
    },
    blAll: { zh: '全部文章', ja: 'すべての記事', en: 'All posts' },
    blCount: { zh: '共 {n} 篇', ja: '全 {n} 件', en: '{n} posts' },
    blEmpty: {
      zh: '还没有文章……第一篇正在酝酿中♡',
      ja: 'まだ記事がありません……最初の一本を準備中♡',
      en: 'No posts yet… the first one is brewing ♡'
    },
    blEmptySearch: { zh: '没有找到匹配的文章。', ja: '一致する記事はありません。', en: 'No matching posts.' },
    blBackList: { zh: '← 返回列表', ja: '← 一覧へ戻る', en: '← Back to list' },
    blReadMore: { zh: '阅读全文 →', ja: '続きを読む →', en: 'Read more →' },
    blPinned: { zh: '置顶', ja: '固定', en: 'Pinned' },
    blPrev: { zh: '上一篇', ja: '前の記事', en: 'Previous' },
    blNext: { zh: '下一篇', ja: '次の記事', en: 'Next' },
    blEntryText: {
      zh: '感想、生活记录、各种资源存档都写在博客里，点下面的按钮进去看。',
      ja: '感想・生活記録・素材アーカイブはブログに書いています。下のボタンからどうぞ。',
      en: 'Thoughts, daily notes and resource archives live in the blog — click below to read.'
    },
    blEntryGo: { zh: '进入博客 →', ja: 'ブログへ →', en: 'Enter blog →' },
    blFilterTag: { zh: '标签：{tag}', ja: 'タグ：{tag}', en: 'Tag: {tag}' },
    blFilterMonth: { zh: '{month} 的文章', ja: '{month} の記事', en: 'Posts from {month}' },
    blSearched: { zh: '搜索「{q}」', ja: '「{q}」の検索結果', en: 'Search: {q}' }
  };

  var STORE_KEY = 'cupcake-lang-v2';
  var LANGS = ['zh', 'ja', 'en'];
  var LANG_NAME = { zh: '中文', ja: '日本語', en: 'English' };

  function currentLang() {
    var s = null;
    try { s = localStorage.getItem(STORE_KEY); } catch (e) {}
    return LANGS.indexOf(s) !== -1 ? s : 'zh';
  }

  function t(key, vars) {
    var entry = DICT[key];
    var s = (entry && entry[currentLang()]) || (entry && entry.zh) || key;
    if (vars) {
      for (var k in vars) s = s.split('{' + k + '}').join(String(vars[k]));
    }
    return s;
  }

  function apply() {
    var lang = currentLang();
    document.documentElement.lang = lang === 'ja' ? 'ja' : (lang === 'en' ? 'en' : 'zh-CN');

    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var key = el.getAttribute('data-i18n');
      var val = DICT[key] && DICT[key][lang];
      if (val != null) el.textContent = val;
    }

    var ph = document.querySelectorAll('[data-i18n-placeholder]');
    for (var j = 0; j < ph.length; j++) {
      var p = ph[j];
      var pk = p.getAttribute('data-i18n-placeholder');
      var pv = DICT[pk] && DICT[pk][lang];
      if (pv != null) p.setAttribute('placeholder', pv);
    }

    var tt = document.querySelectorAll('[data-i18n-title]');
    for (var m = 0; m < tt.length; m++) {
      var te = tt[m];
      var tk = te.getAttribute('data-i18n-title');
      var tv = DICT[tk] && DICT[tk][lang];
      if (tv != null) te.setAttribute('title', tv);
    }

    var ar = document.querySelectorAll('[data-i18n-aria]');
    for (var a = 0; a < ar.length; a++) {
      var ae = ar[a];
      var ak = ae.getAttribute('data-i18n-aria');
      var av = DICT[ak] && DICT[ak][lang];
      if (av != null) ae.setAttribute('aria-label', av);
    }

    // 下拉按钮与选中项
    var toggle = document.getElementById('langToggle');
    if (toggle) toggle.textContent = LANG_NAME[lang] + ' ▾';
    var opts = document.querySelectorAll('.lang-opt');
    for (var b = 0; b < opts.length; b++) {
      opts[b].classList.toggle('active', opts[b].getAttribute('data-lang') === lang);
    }

    document.dispatchEvent(new CustomEvent('langchange'));
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) === -1) return;
    try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
    apply();
  }

  window.I18N = DICT;
  window.t = t;
  window.getLang = currentLang;
  window.setLang = setLang;

  function closeMenu() {
    var menu = document.getElementById('langMenu');
    var toggle = document.getElementById('langToggle');
    if (menu) menu.hidden = true;
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  function bind() {
    /* 语言下拉挪进任务栏托盘（XP 语言栏），避免盖住最大化窗口的标题栏按钮 */
    var drop0 = document.getElementById('langDrop');
    var tray = document.querySelector('.task-tray');
    if (drop0 && tray) tray.insertBefore(drop0, tray.firstChild);
    var toggle = document.getElementById('langToggle');
    var menu = document.getElementById('langMenu');
    if (toggle && menu) {
      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = menu.hidden;
        menu.hidden = !open;
        toggle.setAttribute('aria-expanded', String(open));
      });
    }
    var opts = document.querySelectorAll('.lang-opt');
    for (var i = 0; i < opts.length; i++) {
      (function (btn) {
        btn.addEventListener('click', function () {
          setLang(btn.getAttribute('data-lang'));
          closeMenu();
        });
      })(opts[i]);
    }
    document.addEventListener('click', function (e) {
      var drop = document.getElementById('langDrop');
      if (drop && !drop.contains(e.target)) closeMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
    apply();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();
