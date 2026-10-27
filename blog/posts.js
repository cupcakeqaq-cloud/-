/* ─────────────────────────────────────────────────────────────
   博客「已发布」文章 —— 由本地后台「博客」页签生成（npm start 后打开 /admin/）
   手改也行，但注意：下面的排序工具在上面，数据在文件最底下，
   后台保存时会从 window.BLOG_POSTS 那一行往后整段重写。

     id       决定地址 blog.html#/p-xxx，写完别改（改了旧链接失效）
     date     YYYY-MM-DD
     tags     自由词，数组，可以多个
     summary  手写摘要；留空则前台自动截正文前 120 字
     html     正文（HTML 片段，前台会过一遍标签白名单）
     pinned   true = 置顶（列表最前，带 ★）
     i18n     可选，日文/英文版：{ ja: {title, summary, html}, en: {...} }
              缺哪个语言就回落中文；标签、日期、置顶三语共用

   草稿在同目录 blog/drafts.js（写进 .gitignore 了，不进仓库）
   ───────────────────────────────────────────────────────────── */

/* 排序：置顶优先 → 日期倒序（前台博客页、主页两个小窗、后台列表都用它） */
window.blogAll = function () {
  return (window.BLOG_POSTS || []).slice().sort(function (a, b) {
    var p = (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
    if (p) return p;
    return String(b.date || '').localeCompare(String(a.date || ''));
  });
};

/* 最近 n 篇（主页入口窗 3 篇、侧栏小窗 5 篇） */
window.blogRecent = function (n) {
  return window.blogAll().slice(0, Number(n) > 0 ? Number(n) : 5);
};

/* 一篇文章某个字段（title / summary / html）在指定语言下的内容。
   中文存在文章本身（title/summary/html），日文英文存在 p.i18n.ja / p.i18n.en 里；
   没写的那种语言就回落中文（前台永远不会空着）。lang 缺省 = 当前站点语言。 */
window.postText = function (p, field, lang) {
  if (!p) return '';
  lang = lang || (window.getLang ? window.getLang() : 'zh');
  var order = [lang, 'zh', 'ja', 'en'];
  for (var i = 0; i < order.length; i++) {
    var l = order[i], v;
    if (l === 'zh') v = p[field];
    else v = p.i18n && p.i18n[l] ? p.i18n[l][field] : '';
    if (String(v == null ? '' : v).trim()) return v;
  }
  return '';
};

window.BLOG_POSTS = [
  {
    "id": "p-1792306390501",
    "title": "【食用须知】关于本站~✧⁺⸜(●˙▾˙●)⸝⁺✧",
    "date": "2026-10-18",
    "tags": [
      "网站介绍"
    ],
    "summary": "关于12あKa@被告人杯糕_ 的个人网站食用手册~☆",
    "html": "<p><br>欢迎光临！这里是 12あKa@被告人杯糕_ 的个人网站！以下是一些本网站的说明，以及祝大家游玩愉快~☆</p><p>┈┈┈┈┈┈┈┈ ✧ ┈┈┈┈┈┈┈┈</p><p><br></p><p>一、主播主播这个网站要怎么用呀？</p><p><br></p><p>整站基本模拟了windowsXP的风格，操作方式也模拟了WindowsXP，也就是说基本可以把这个网站当成电脑桌面小游戏！（大概）</p><p>——左测桌面图标双击就能打开对应的窗口；</p><p>——左下角「开始」按钮里是所有入口和窗口清单；</p><p>——整站支持中文 / 日本語 / English，语言栏在任务栏右下角。但是部分文本（如部分博客、评论）不会随切换网站语言而变化。；</p><p>——窗口可以拖标题栏挪位置、双击标题栏可归位、按最小化收进任务栏、按关闭就关闭（什么废话）、拖拽右下角可以调整窗口大小。</p><p><br>所以说和电脑桌面操作方式基本无异，当成在小学机房玩电脑就好了（bushi）</p><p><br></p><p>二、哇真的都能点开啊！那么哪些是能玩的窗口呢？</p><p><br></p><p>・我的电脑：装饰作用大于实用性的窗口，点进去会发现啥都点不动（）</p><p>・记事本、画图：记事本真的能打字；画图嵌的是在线画板，所以网络差的时候有可能会加载不出来。并且网站内两个功能的文件都能保存。</p><p>・扫雷：如名字一样的，就是扫雷小游戏。</p><p>・Internet Explorer：能浏览一小部分内嵌的网站（维基、archive.org、在线画板之类的），如果在网址栏输入其他网址一般是打不开的。</p><p>・Minecraft：也是内嵌的在线网站，可以玩到远古版本的MC。以及因为是内嵌的别的网站，所以会和画板一样，网络不好的时候会有可能加载不出来。</p><p>・媒体播放器：强行给网站塞了我最喜欢专辑《日刊:遺書》（是的我做播放器功能其实只是为了安利XD），歌曲共12 首，不关闭窗口或者暂停音乐的话音乐换页面也不断。<br>（播放器还有一点bug不过懒得修了也能凑合用）<br>・注销和关闭计算机：不管怎么点都会进入待机启动页面xddddd。<br><br></p><p><br></p><p>三、不对吧主播这是个人网站呀为什么这么多花里胡哨的东西！</p><p><br></p><p>哈哈我也不知道，但是个人网站的性质还是在的，这些功能是一打开网站就能看到的东西：</p><p>・自我介绍：主页侧栏，包含了站主简短的自我介绍以及各平台的主页链接。</p><p>・委托相关事宜：绘画委托相关都会扔在这里、包括价目表、申请流程以及例图都在那一页。价目会按语言换算货币。</p><p>・资源配布：我整出来的各种各样的赛博小垃圾会随机掉落在这里给大家把玩（）</p><p>・留言板：本质匿名留言板；正文最多 200 字；同一网络 10 分钟最多 3 条；发出去自己删不掉，要删评请联系站主。</p><p>・个人博客：就是这个页面！</p><p><br></p><p>┈┈┈┈┈┈┈┈ ✧ ┈┈┈┈┈┈┈┈</p><p><br></p><p>五、网站用到的开源素材</p><p><br></p><p>・winXP — 作者 Shizuku Yang，MIT 授权，github.com/ShizukuIchi/winXP</p><p>　用在这：XP 图标、扫雷的全部素材、报错音效、旗标，以及窗口标题栏 / 任务栏 / 开始菜单的配色与按钮规格。授权原文随素材放在 assets/winxp/LICENSE-MIT.txt。</p><p>・Fusion Pixel Font（缝合像素字体）— 作者 TakWolf，SIL Open Font License 1.1，github.com/TakWolf/fusion-pixel-font。</p><p><br></p><p>除上面两项，剩下的 HTML / CSS / JS 有使用Deepseek V4.1Flash协助制作。</p><p><br></p><p>哪些不是开源：</p><p>・我自己的画。<br></p><p>・网站使用的部分贴图来自网络，如果侵权请联系我删改！！</p><p>・米画师 / bilibili / X / GitHub / マシュマロ 的图标版权归各平台，这里只用于标外链。</p><p>・Windows XP 的名字和商标归 Microsoft。本站只是界面层面的致敬复刻，和微软没有任何关系。</p><p><br></p><p>六、关于 AI 协助</p><p>由于个人技术力有限，对代码和网页搭建几乎是完全不了解，所以这个站的代码是大肥鱼和我一起磨出来的（感谢梁圣，感谢大肥鱼。）</p><p>整个网站的创意由我决定，而AI则是进行代码编写，帮我实践我的想法。</p><p>（写这个是免得有人以为该站为本人手搓出来的，我本人其实是一问三不知的小白TT......）</p><p><br>七、关于友链</p><p>我甚至不知道这个网站有没有人来玩所以暂时没考虑这个模块ww</p><p>如果有机会的话或许会更新！(*ﾟ∀ﾟ*)</p><p>┈┈┈┈┈┈┈┈ ✧ ┈┈┈┈┈┈┈┈</p><p><br></p><p>最后感谢读到这里的你~祝游玩愉快！<br>（对了主页右下角那个小东西真的不试试多点几次吗xd）<br></p><figure class=\"bl-figure\"><figure class=\"bl-figure\"><img src=\"uploads/20261018-133-e3b322.png\" alt=\"\"></figure></figure>",
    "pinned": true,
    "i18n": {
      "ja": {
        "title": "【ご利用にあたって】当サイトについて~✧⁺⸜(●˙▾˙●)⸝⁺✧",
        "summary": "ようこそ！ここは 12あKa@被告人杯糕_ の個人サイトです！以下に当サイトの説明をまとめました。どうぞお楽しみください~☆",
        "html": "<p class=\"ds-markdown-paragraph\"><span class=\"\">ようこそ！ここは 12あKa@被告人杯糕_ の個人サイトです！以下に当サイトの説明をまとめました。どうぞお楽しみください~☆</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">┈┈┈┈┈┈┈┈ ✧ ┈┈┈┈┈┈┈┈</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">一、ねえねえ、このサイトってどうやって使うの？</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">サイト全体はWindows XPの見た目を再現していて、操作感もWindows XPに似せています。つまり、ほぼPCのデスクトップ用ミニゲーム感覚で遊べます！（たぶん）</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">――左側のデスクトップアイコンをダブルクリックすると、対応するウィンドウが開きます；</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">――左下の「スタート」ボタンに、すべての入口とウィンドウ一覧があります；</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">――サイト全体が中国語 / 日本語 / Englishに対応しています。言語バーはタスクバー右下にあります。ただし、一部のテキスト（一部のブログやコメントなど）はサイトの言語を切り替えても変化しません；</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">――ウィンドウはタイトルバーをドラッグして移動でき、タイトルバーをダブルクリックすると元の位置に戻り、最小化するとタスクバーに収納され、閉じるボタンで閉じられ、右下をドラッグするとサイズを変更できます。</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">つまりPCのデスクトップ操作とほぼ同じです。小学校のPC室で遊んでいる気分でどうぞ（なんてね）。</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">二、わっ、本当に全部クリックできる！じゃあどのウィンドウが遊べるの？</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">・マイコンピュータ：実用性より飾り要素が強いウィンドウ。開いても何もクリックできません（）</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">・メモ帳、ペイント：メモ帳は本当に文字が打てます；ペイントはオンラインお絵かきボードを埋め込んでいるので、ネットが弱いと読み込めないことがあります。また、両機能ともサイト内でファイルを保存できます。</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">・マインスイーパー：名前の通り、マインスイーパーのミニゲームです。</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">・Internet Explorer：一部の埋め込みサイト（Wikipedia、</span><a href=\"https://archive.org/\" target=\"_blank\" rel=\"noreferrer\"><span class=\"\">archive.org</span></a><span class=\"\">、オンラインお絵かきボードなど）を閲覧できます。アドレスバーに他のURLを入力しても基本開けません。</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">・Minecraft：これも埋め込みのオンラインサイトで、かなり古いバージョンのMCが遊べます。他のサイトを埋め込んでいるので、お絵かきボード同様、ネットが弱いと読み込めないことがあります。</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">・メディアプレイヤー：無理やりサイトに私の好きなアルバム『日刊:遺書』を入れました（そう、プレイヤー機能を作ったのは布教のためですXD）。曲は全12曲。ウィンドウを閉じないか音楽を止めない限り、ページを変えても音楽は流れ続けます。</span><br><span class=\"\">（プレイヤーにはちょっとバグがありますが、直すのが面倒なのでそのまま使ってます）</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">・ログオフとシャットダウン：どうクリックしてもスタンバイ画面に入ります（笑）。</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">三、ちょっと待って、これ個人サイトだよね？なんでこんなに色々あるの！</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">はは、自分でもわからないけど、個人サイトの性質はちゃんとあります。これらの機能はサイトを開いてすぐ見られるものです：</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">・自己紹介：ホームのサイドバーに、サイト主の簡単な自己紹介と各プラットフォームのリンクがあります。</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">・依頼関連：絵の依頼関連はすべてここにまとめています。料金表、申請フロー、例図もそのページにあります。料金は言語に応じて通貨換算されます。</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">・リソース配布：私が作った色々なサイバーなガラクタがランダムにここに落ちてきます。遊んでみてください（）</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">・掲示板：実質匿名掲示板です。本文は最大200文字；同一ネットワークから10分間に最大3件；投稿後は自分で削除できません。削除したい場合はサイト主に連絡してください。</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">・個人ブログ：このページです！</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">┈┈┈┈┈┈┈┈ ✧ ┈┈┈┈┈┈┈┈</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">五、サイトで使用しているオープンソース素材</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">・winXP — 作者 Shizuku Yang、MITライセンス、</span><a href=\"https://github.com/ShizukuIchi/winXP\" target=\"_blank\" rel=\"noreferrer\"><span class=\"\">github.com/ShizukuIchi/winXP</span></a><span class=\"\"></span><br><span class=\"\">　使用箇所：XPアイコン、マインスイーパーの全素材、エラー音、旗、ウィンドウタイトルバー / タスクバー / スタートメニューの配色とボタン仕様。ライセンス原文は素材と一緒に assets/winxp/LICENSE-MIT.txt に置いています。</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">・Fusion Pixel Font（缝合像素字体）— 作者 TakWolf、SIL Open Font License 1.1、</span><a href=\"https://github.com/TakWolf/fusion-pixel-font\" target=\"_blank\" rel=\"noreferrer\"><span class=\"\">github.com/TakWolf/fusion-pixel-font</span></a></p><p class=\"ds-markdown-paragraph\"><span class=\"\">上記2つ以外のHTML / CSS / JSはDeepSeek V4.1Flashの協力を得て制作しています。</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">オープンソースでないもの：</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">・私自身の絵。</span><br><span class=\"\">・サイトで使用している一部の画像はネットからお借りしています。権利侵害があれば連絡いただければ削除・修正します！！</span><br><span class=\"\">・米画师 / bilibili / X / GitHub / マシュマロ のアイコンの著作権は各プラットフォームに帰属します。ここでは外部リンク用のアイコンとしてのみ使用しています。</span><br><span class=\"\">・Windows XPの名前と商標はMicrosoftに帰属します。当サイトはインターフェース面でのオマージュ復刻であり、Microsoftとは一切関係ありません。</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">六、AI協力について</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">個人の技術力が限られているため、コードやWeb制作はほぼ完全に素人です。なのでこのサイトのコードはDeepSeekと一緒に作り上げました。</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">サイト全体のコンセプトは私が決め、AIがコードを書いて私のアイデアを形にする手助けをしてくれています。</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">（これを書いておかないと、このサイトを私が全部手打ちしたと思われそうなので……私は実は右も左もわからない初心者ですTT......）</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">七、相互リンクについて</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">このサイトに人が来るかどうかすらわからないので、今は考えていません（笑）</span><br><span class=\"\">機会があれば更新するかも！(</span><em>ﾟ∀ﾟ</em><span class=\"\">)</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">┈┈┈┈┈┈┈┈ ✧ ┈┈┈┈┈┈┈┈</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">最後まで読んでくれてありがとう~どうぞお楽しみください！</span><br><span class=\"\">（そういえばホーム右下の小さいやつ、何回かクリックしてみない？XD）</span></p><figure class=\"bl-figure\"><img src=\"uploads/20261018-133-88513f.png\" alt=\"\"></figure>"
      },
      "en": {
        "title": "[Usage Notes] About This Site ~✧⁺⸜(●˙▾˙●)⸝⁺✧",
        "summary": "Welcome! This is the personal website of 12あKa@被告人杯糕_! Below are some notes about the site. Enjoy your visit~☆",
        "html": "<p class=\"ds-markdown-paragraph\"><span class=\"\">Welcome! This is the personal website of 12あKa@被告人杯糕_! Below are some notes about the site. Enjoy your visit~☆</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">┈┈┈┈┈┈┈┈ ✧ ┈┈┈┈┈┈┈┈</span></p><ol start=\"1\"><li><p class=\"ds-markdown-paragraph\"><span class=\"\">So, how do I use this website?</span></p></li></ol><p class=\"ds-markdown-paragraph\"><span class=\"\">The whole site basically mimics the Windows XP look, and the controls mimic Windows XP too — so you can pretty much treat it like a desktop mini-game for your PC! (probably)</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">— Double-click the desktop icons on the left to open the corresponding window;</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">— The \"Start\" button in the bottom-left corner contains all the entries and the window list;</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">— The site supports 中文 / 日本語 / English. The language bar is at the bottom-right of the taskbar. However, some text (like some blog posts and comments) will not change when you switch the site language;</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">— Windows can be moved by dragging the title bar, snapped back by double-clicking the title bar, minimized to the taskbar, closed with the close button (yes, obviously), and resized by dragging the bottom-right corner.</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">So it's basically the same as desktop PC controls. Just treat it like you're playing on an elementary school computer lab PC (just kidding).</span></p><ol start=\"2\"><li><p class=\"ds-markdown-paragraph\"><span class=\"\">Whoa, everything really is clickable! So which windows are actually playable?</span></p></li></ol><p class=\"ds-markdown-paragraph\"><span class=\"\">· My Computer: A window that's more decorative than practical — you'll find nothing is clickable ()</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">· Notepad, Paint: Notepad actually lets you type; Paint embeds an online drawing board, so it may fail to load if your connection is poor. Files created in both can be saved on the site.</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">· Minesweeper: Exactly what it says — a Minesweeper mini-game.</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">· Internet Explorer: Can browse a small selection of embedded sites (Wikipedia, </span><a href=\"https://archive.org/\" target=\"_blank\" rel=\"noreferrer\"><span class=\"\">archive.org</span></a><span class=\"\">,</span><span class=\"\"> online drawing board, etc.). Entering other URLs in the address bar generally won't open anything.</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">· Minecraft: Also an embedded online site — you can play an ancient version of MC. And since it's an embedded third-party site, like the drawing board, it may fail to load if your connection is poor.</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">· Media Player: I forcibly stuffed my favorite album \"日刊:遺書\" into the site (yes, I made the player feature purely to evangelize XD). 12 tracks total. If you don't close the window or pause the music, it keeps playing even when you change pages.</span><br><span class=\"\">(The player has a few bugs but I couldn't be bothered to fix them — it works well enough.)</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">· Log Off and Shut Down: No matter how you click, you end up on a standby screen (lol).</span></p><ol start=\"3\"><li><p class=\"ds-markdown-paragraph\"><span class=\"\">Wait—this is a personal website, right? Why is there so much fancy stuff!</span></p></li></ol><p class=\"ds-markdown-paragraph\"><span class=\"\">Haha, I don't know either, but it's still a personal website at heart. These features are what you'll see as soon as you open the site:</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">· About Me: In the homepage sidebar — a short self-introduction and links to my pages on various platforms.</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">· Commissions: All art commission info goes here — price list, application process, and sample images are all on that page. Prices are converted by currency based on language.</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">· Resource Distribution: A bunch of random digital junk I've made drops here for you to play with ()</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">· Message Board: Essentially an anonymous message board; max 200 characters per post; up to 3 posts per 10 minutes from the same network; you can't delete your own posts after submitting — contact the site owner to delete.</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">· Personal Blog: This page!</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">┈┈┈┈┈┈┈┈ ✧ ┈┈┈┈┈┈┈┈</span></p><ol start=\"5\"><li><p class=\"ds-markdown-paragraph\"><span class=\"\">Open-source assets used on this site</span></p></li></ol><p class=\"ds-markdown-paragraph\"><span class=\"\">· winXP — by Shizuku Yang, MIT License, </span><a href=\"https://github.com/ShizukuIchi/winXP\" target=\"_blank\" rel=\"noreferrer\"><span class=\"\">github.com/ShizukuIchi/winXP</span></a><span class=\"\"></span><br><span class=\"\">Used for: XP icons, all Minesweeper assets, error sound effects, flags, and the color scheme and button specs of the window title bar / taskbar / Start menu. The original license text is placed alongside the assets at assets/winxp/LICENSE-MIT.txt.</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">· Fusion Pixel Font — by TakWolf, SIL Open Font License 1.1, </span><a href=\"https://github.com/TakWolf/fusion-pixel-font\" target=\"_blank\" rel=\"noreferrer\"><span class=\"\">github.com/TakWolf/fusion-pixel-font</span></a></p><p class=\"ds-markdown-paragraph\"><span class=\"\">Aside from the above two, the remaining HTML / CSS / JS was made with assistance from DeepSeek V4.1Flash.</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">What is NOT open source:</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">· My own artwork.</span><br><span class=\"\">· Some images used on the site are from the internet. If there's any infringement, please contact me and I'll remove or modify them!!</span><br><span class=\"\">· The icons for 米画师 / bilibili / X / GitHub / マシュマロ belong to their respective platforms; they are used here only as icons for external links.</span><br><span class=\"\">· The Windows XP name and trademark belong to Microsoft. This site is purely a UI-level homage and has no affiliation with Microsoft.</span></p><ol start=\"6\"><li><p class=\"ds-markdown-paragraph\"><span class=\"\">About AI Assistance</span></p></li></ol><p class=\"ds-markdown-paragraph\"><span class=\"\">Due to limited personal technical ability, I'm basically a complete beginner at code and web development, so the code for this site was built together with DeepSeek.</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">The overall creative vision of the site is mine, while AI handles the code writing and helps me bring my ideas to life.</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">(I'm writing this so nobody thinks I hand-coded the whole site — I'm actually a total novice who knows nothing TT......)</span></p><ol start=\"7\"><li><p class=\"ds-markdown-paragraph\"><span class=\"\">About Links</span></p></li></ol><p class=\"ds-markdown-paragraph\"><span class=\"\">I don't even know if anyone visits this site, so I haven't considered this section for now (lol)</span><br><span class=\"\">I might update it if the opportunity arises! (</span><em>ﾟ∀ﾟ</em><span class=\"\">)</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">┈┈┈┈┈┈┈┈ ✧ ┈┈┈┈┈┈┈┈</span></p><p class=\"ds-markdown-paragraph\"><span class=\"\">Thanks for reading all the way to the end~ Enjoy your visit!</span><br><span class=\"\">(By the way, why not try clicking that little thing in the bottom-right corner of the homepage a few times? XD)</span></p><figure class=\"bl-figure\"><img src=\"uploads/20261018-133-bf2a44.png\" alt=\"\"></figure>"
      }
    }
  },
  {
    "id": "p-1792312270195",
    "title": "PostPet21资源分享",
    "date": "2026-10-18",
    "tags": [
      "资源配布"
    ],
    "summary": "因为本人想玩PostpPet但是下载到的资源完全打不开所以强行破解并且兼容了win11，总之做都做了所以在这边分享出来供大家游玩 (*´∀`)~♥",
    "html": "<figure class=\"bl-figure\">总之最终通过破解玩到了这款互联网文物ww<br>主要是做了高版本Windows系统的兼容和汉化，原版为英文版，也有进行破解。<br>直接在站内资源配布页就能下载到！包内修改器似乎还有点问题，直接无视吧。<br>详细的使用说明还请查看压缩包内的readme文件！<br>最后：文件仅供个人学习交流，希望大家不要大规模传播</figure><figure class=\"bl-figure\"><img src=\"uploads/20261018-Snipaste_2026-10-17_19-14-58-f047ff.png\" alt=\"\"></figure>",
    "pinned": false,
    "i18n": {
      "ja": {
        "title": "PostPet21 リソース配布",
        "summary": "PostPetを遊びたくてダウンロードしたけど全然起動できなかったので、半ば強引にクラックしてWindows 11でも動くようにしました。せっかく作ったので、ここでみんなに配布します (*´∀`)~♥",
        "html": "<figure class=\"bl-figure\">最終的にクラックして、このインターネットの遺物を遊べるようになりましたww<br>主に新しいバージョンの Windows での動作互換と中国語化をやりました。オリジナルは英語版で、クラックも入れています。<br>サイト内の「リソース配布」ページからそのままダウンロードできます！パッケージ内の改造ツールにはまだ不具合があるみたいなので、気にしないでください。<br>詳しい使い方は同梱の readme ファイルを見てください！<br>最後に：ファイルは個人の学習・交流用です。大規模な再配布はご遠慮ください。</figure><figure class=\"bl-figure\"><img src=\"uploads/20261018-Snipaste_2026-10-17_19-14-58-f047ff.png\" alt=\"\"></figure>"
      },
      "en": {
        "title": "PostPet21 Resources",
        "summary": "I wanted to play PostPet but the files I downloaded wouldn't open at all, so I cracked it and got it running on Windows 11. Since I already did the work, I'm sharing it here for everyone to play (*´∀`)~♥",
        "html": "<figure class=\"bl-figure\">In the end I cracked it and finally got to play this internet relic ww<br>I mainly handled compatibility with newer Windows versions and Chinese localization. The original is the English version, and it is cracked as well.<br>You can download it straight from the Resources page on this site! The editor tool bundled in the package still seems a bit buggy, just ignore it.<br>For detailed instructions, check the readme file inside the archive!<br>One last thing: these files are for personal study and sharing only, please do not redistribute them widely.</figure><figure class=\"bl-figure\"><img src=\"uploads/20261018-Snipaste_2026-10-17_19-14-58-f047ff.png\" alt=\"\"></figure>"
      }
    }
  },
  {
    "id": "p-1792996407405",
    "title": "关于芙兰桌宠v1.1.0-beta的更新内容以及一点杂谈~<3",
    "date": "2026-10-26",
    "tags": [
      "感想",
      "更新日志",
      "碎碎念"
    ],
    "summary": "主要还是一点碎碎念啦......更新已经发布于GitHub，感兴趣的话可以去下载看看(*´꒳`*)b",
    "html": "<b>偷偷进行了一个版本更新~说实话我不知道版本号应该怎么写哦不知道这样对不对......（汗颜）</b><p><b>总之是一个还在测试的版本！虽然根本没把视频做好也不知道有没有人真的下载这个玩</b><br></p><h3>★更新内容★</h3><ul><li>最最最主要也是最大的更新是加入了联网模式！其他新增功能都是依赖于联网功能的——<br>开启联网后可以给芙兰接入LLM模型的API从而做到实时生成回复进行角色扮演~不过毕竟是AI，所以肯定会有不可控的ooc情况发生（角色扮演提示词已经努力了......orz）</li></ul><ul><li>另外也加入了简单的语音输入，按住语音热键后就能识别你说的话，并且芙兰在识别后会对你进行回复！不过准确率非常堪忧.而且bug很多......后续会考虑阉割这个功能(´;ω;`)</li><li>进入联网模式并且接入AIP后在菜单栏新增了聊天功能！想和芙兰酱聊天可以直接在聊天框输入你想说的话~</li><li>以及给芙兰加了个读取后台进程猜你在干什么的小功能，不过毕竟只是读取后台进程所以可能会有瞎编你屏幕显示内容的情况。<br></li></ul><p></p><figure class=\"bl-figure sel bl-mid\"><img src=\"uploads/20261026-C9CE2554886F75ED35E9AB5A33AA4B-a25a30.png\" alt=\"\"></figure><figure class=\"bl-figure sel bl-mid\"><span style=\"text-align: start;\">（甚至能看出来我在打地灵殿ww）</span></figure><p></p><ul><li>最后提一些小更新：<br>之前项目仅公开了源码，虽然允许使用但是限制比较严格，而且都是个人要求......后来想了一下觉得这样也太小家子气了所以决定完全开源！现在项目基于GPLv3协议开源，但是仍然保留了一点个人的小请求，做不到完全遵守也不影响你使用。<br>优化了点击反馈，现在加入了按压回弹的小动画，加强了一点互动感~（不过还有一点小问题，可以期待后续优化）<br>修复了已知的bug。<br>增加了更多bug。<br></li></ul><hr><br><p></p><h3>★碎碎念/杂谈★</h3><p>说实话之前完全没想过自己会有朝一日会使用到GitHub并且在上面发布开源项目，根本没发宣传视频但是在GitHub获得了招笑的两个Star我是想不到的hhh</p><p><br>其实想说的很多都在README上了，不过我感觉开源项目的README上有个人要求会导致有人觉得我很小气。其实无非就三点“我不希望被倒卖程序”、“我做的东西被拿去干坏事”和“我不希望有人用AI生图盈利”。<br>前者大家应该能理解吧，关于AI生图的态度我在README最后的碎碎念也写了，这边直接复制过来吧（我废话真的好多对不起）：</p><p><strong>我很抵触AI生图，也不认为使用AI工具做出来的东西能完全算作是使用者的作品。</strong>\n事实确实如此，我本质上其实只是个小画师，并不是什么程序员，所以关于我对AI生图技术的态度大伙应该是可以猜个大概的。\n<br><strong>然而我并不否认AI技术的便捷性</strong>，对于不会画画的人来说AI生图确实能填补自己不会画画的短板，就像我想做出这个程序但是对代码一窍不通一样，AI工具的便捷象征的也是时代和技术的进步。\n但是AI生图技术必然逃不开模型训练无授权盗用人类画师的作品进行“炼丹”这个争议点，所以作为画师的我永远无法接受“AI图也有著作权，我可以把AI图说成是自己的作品”这个说法。因此我真的真的非常不希望有人在魔改此程序贴图时使用AI后不明确标注并且进行商用，<strong>不过换言之，你不把我的贴图拿去当生图原型并且好好标注该标注的东西那么免费发布完全没问题。</strong>\n<br>所以这归根结底只是立场问题，你真的这么做我也阻止不了你。<br><br></p><h3>关于宣传视频：其实短期内应该是做不出来了，近期在忙别的事，所以可能得到十一月才能做出来。</h3>那么有的人就要问了：录屏演示一遍不就完了吗？为什么被你说的像是个很麻烦的事情？<br>答：并不想这么做，录屏的话我的完播率怎么办？（被打）而且这么做的话完全不够吸引人，我从本站的介绍视频里已经深刻体会到了这点......虽然我完全是十八线路边一条0个人认识的底边，但是我希望我做的东西能被更多人看到，所以这个介绍视频我觉得必须认真点做，要足够吸引人！<br>......但是对于做视频其实我也没有很多经验，AE完全用不利索，只能一点点摸索着搞了，难受啊555555<br>以及视频难产也有一点现实因素——本人身心状况一直很堪忧，有的时候甚至是那种根本没力气也没动力起来做任何事的状态，所以在此期间很多事都被耽误了，也包括了做这个视频，所以现在都还停留在新建文件夹的状态......真希望自己一直是能量满满每天都能做很多事的状态啊，空悲切。<br><br><h3>感觉这个网站和这篇文章都没什么人能看到，所以如果你看完了这篇文章，我由衷的感谢你看到这里！｡:.ﾟヽ(*´∀`)ﾉﾟ.:｡<br><p>（本来想着最后放个rkgk简单庆祝一下版本更新来着结果手感太差而且还在躯体化根本画不出来，先这样吧之后再修改！）<br><br></p></h3><p></p>",
    "pinned": false
  },
  {
    "id": "p-1793068162846",
    "title": "喜报！！本站终于有域名了！撒花撒花✧◝(⁰▿⁰)◜✧",
    "date": "2026-10-27",
    "tags": [
      "碎碎念"
    ],
    "summary": "终于换掉丑丑的GitHub子域名了~~",
    "html": "<h2>★本站现在域名为cupcakeqaq.top<span style=\"font-weight: normal;\">★<br></span><p><span style=\"font-weight: normal;\"><br></span></p></h2><p><span style=\"font-weight: normal;\">纠结了很久最后还是买了！嘿嘿终于有自己的域名了<br></span><span style=\"font-weight: normal;\">（是的我特地发个文章就是为了说这点屁事xd</span></p><p></p>",
    "pinned": false,
    "i18n": {
      "ja": {
        "title": "朗報！！当サイトについにドメインができました！パチパチ〜✧◝(⁰▿⁰)◜✧",
        "summary": "やっとダサいGitHubのサブドメインを卒業できたよ〜",
        "html": "<h2>★当サイトのドメインは cupcakeqaq.top になりました★</h2><p><br></p><p>ずっと悩んだ末に、ついに買っちゃいました！へへ、念願のマイドメインです。</p><p>（そう、このどうでもいい報告をするためにわざわざ記事を書きました）</p>"
      },
      "en": {
        "title": "Great news!! The site finally has its own domain! Confetti! Confetti! ✧◝(⁰▿⁰)◜✧",
        "summary": "Finally ditched that ugly GitHub subdomain~~",
        "html": "<h2>★This site is now at cupcakeqaq.top★</h2><p><br></p><p>I went back and forth for a long time, but I finally bought it! Hehe, I've got my own domain now.</p><p>(Yes, I wrote a whole post just to announce this trivial little thing.)</p>"
      }
    }
  }
];
