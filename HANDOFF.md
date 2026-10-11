# 交接文档 · 12あKa@被告人杯糕_ 自介网页

> 给接手的 AI / 协作者：读完这份就能无缝接手。**整站已改造为 Windows XP 风格**（窗口外壳 / 任务栏 / 开始菜单 / 桌面快捷方式 / 电源流程 / 6 个 XP 应用），仍是**纯静态零构建**，直接推 GitHub Pages 即可。
>
> 最新一轮（第 7 批 3 条）：音源撤换成**一个** `voice dl/芙兰朵露v1.0.0-beta.zip`（33.2MB）—— `ゴースト_A.zip`（65.3MB）与 `林屿.zip`（55.9MB）已从仓库删除，资源页 `.rs-item` 从两条减到一条，i18n 的 `voiceSizeGhost`/`voiceSizeLin` 合并成 `voiceSizeFlan`，顺手删掉没人引用的死键 `titleVoice`；资源简介 `rsIntro` 改成「什么都有可能放 —— 不定时上传本人制作的东西」（三语同步）；个人简介 `bio` 改成站主 2026-10-12 自己在 GitHub 网页端提交的那句半成品声明（保留「18↑一般通过十八线低精力画手」前缀 + 「此网页暂时为半成品，大部分文本为ai自动填写的占位符，请无视。」）。
> 上一轮（第 6 批 3 条）：开始菜单友链显示名改成 **Survivor**（`menuFriend` 三语同值）；中文「委托受理」全站改成 **「委托相关事宜」**（只动中文，日/英仍是 依頼受付 / Commission）；委托价目**按语言换算货币** —— 新增 `cmCard1Price~cmCard3Price` 三个 i18n 键（zh `¥320-520` / ja `6,500〜11,000円` / en `$45-75`），汇率 1 CNY = 21 JPY = 0.14 USD，日元取 500 整、美元取 5 整。
> 上一轮（站主第 5 批 5 条）已落地：崩坏效果**去掉整页扭动/skew**（只留扫描线+频闪+RGB 鬼影）；**全站字体换成思源黑体那一路的无衬线**（像素字体退役，XP 外壳用 Tahoma）；自介窗侧栏 `328→380px`、名字 16px 不换行，不再被挤压；委托页**去掉价目卡片大编号**、**委托流程改成普通文字行**（不再一步一个盒子）；**浏览器组件的 Back/Forward 做成真历史**（书签首页也进历史，`XP.frame` 超时不再覆盖已导航走的页面）。
> 上上一批（第 4 批 6 条）：删标题栏两端渐隐、崩坏加强、报错音效、GitHub 外链、开始菜单友链、登录窗照 P3 改成官方商标定式。

---

## 一、项目概览

| 项目 | 内容 |
|---|---|
| 本地目录 | `E:\自介网页` |
| 仓库 | `https://github.com/cupcakeqaq-cloud/CupCakeQAQ-site` |
| 线上地址 | `https://cupcakeqaq-cloud.github.io/CupCakeQAQ-site/` |
| 托管 | GitHub Pages（`main` 分支 / root，`.nojekyll`） |
| 技术栈 | 纯静态：原生 HTML + CSS + 原生 JS（无框架、无构建、无依赖、无 npm 包） |
| 主题 | 千禧年个人博客 / Windows XP / cutecore / 废萌 |
| 站主 | 自由插画师，CN「12あKa@被告人杯糕_」 |

**三个页面**：

| 文件 | 作用 |
|---|---|
| `index.html` | 主页：自介 + 留言板 + 委托/资源两个入口 |
| `commission.html` | 委托相关事宜：状态 / 价目表 / 申请方式 / 精选例图 / 联系方式 |
| `resources.html` | 资源配布：简介 / 下载 / 使用说明 |

---

## 二、目录结构

```
E:\自介网页
├─ index.html            主页（桌面快捷方式 + 自介 + 评论区 + 委托/资源入口）
├─ commission.html       委托相关事宜页（整页固定窗 + 浏览器式 UI + 4 张业务卡片）
├─ resources.html        资源配布页（整页固定窗 + 浏览器式 UI）
├─ css/
│  ├─ style.css          博客层样式（字体/配色/窗口内排版/桌面图标/评论区/彩蛋）
│  └─ winxp.css          XP 外壳样式（窗口/任务栏/开始菜单/电源/各应用/固定浏览器窗）
├─ js/
│  ├─ i18n.js           三语字典 + 语言栏（会自动把 #langDrop 挪进任务栏托盘）
│  ├─ winxp.js          ★ XP 外壳核心（窗口系统/任务栏/开始菜单/电源/假404）
│  ├─ apps.js           6 个 XP 应用（扫雷/记事本/画图/浏览器/Minecraft/我的电脑）
│  ├─ guestbook.js      留言板评论区（localStorage）
│  ├─ easteregg.js      玩具鸭 + 30 连击故障彩蛋
│  ├─ starfield.js      背景星星字符画
│  └─ config.js         留言板后端地址占位（当前空）
├─ server.js             本地预览服务器（纯静态托管，无 API）
├─ package.json
├─ assets/
│  ├─ winxp/             ★ 从开源项目 winXP-master 拷来的全部 XP 素材（166 文件 / 266 KB）
│  │  ├─ windowsIcons/   131 个 XP 图标 PNG/ICO（含 start.png、各类系统图标）
│  │  ├─ minesweeper/    30 个扫雷素材（笑脸/LED 数字/格子/雷/旗）
│  │  ├─ sounds/error.wav
│  │  ├─ empty.png       开始菜单「(Empty)」占位图
│  │  ├─ xp-flag.png     自制的 XP 旗标（从 windows.png 裁出并抠掉外圈白底）
│  │  └─ minecraft.png   自制的 32px 草方块图标（diag/make_minecraft_icon.py 生成）
│  ├─ fonts/             像素字体 3 个 woff2（Fusion Pixel Font，OFL）
│  ├─ background/        windows.jpg（大背景=XP 蓝天草地）、cute.jpg
│  ├─ icon/              5 个外链图标（mihuashi / gmail / bilibili / x / marshmallow）
│  ├─ stickers/anime/    5 张装饰 GIF（当前页面已不使用，留着备用）
│  └─ star.txt           盲文星星字符画（29 行）
├─ picture/              14 张画作（委托页卡片的例图来源，现在是手工挑选硬编码在 HTML 里）
├─ Easter egg/           1.png / 2.png / 音效.wav（彩蛋资源）
├─ voice dl/             芙兰朵露v1.0.0-beta.zip（33.2MB，第 7 批换上的唯一音源）
├─ diag/                 站主自己的 X 账号诊断资料 + 两个生成用脚本
├─ icon.png              头像（也用作开始菜单头部与欢迎界面头像）
└─ .nojekyll             禁用 Jekyll（Pages 必需）
```

> 已删除：`js/danmaku.js`（弹幕屏）、`js/main.js`（时钟+计数器）、`js/gallery.js` + `gallery.js` + `gallery.json` + `refresh-gallery.cjs`（画廊渲染与清单，委托页改成手工挑图后整套废弃，git 历史里能找回）、`README.md`（站主要求不留）、`server.js` 里的弹幕/SSE 与 `/api/gallery` 接口。

---

## 三、XP 外壳系统（最重要的一节）

### 3.1 `css/winxp.css`

`:root` 里放着从 winXP 原版**逐段照抄**的渐变：

| 变量 | 用途 |
|---|---|
| `--xp-face #ece9d8` | 窗口内容区米色 |
| `--xp-blue #0831d9` / `--xp-blue-blur #6582f5` | 窗口外框（聚焦/失焦） |
| `--xp-gradient` / `--xp-gradient-blur` | 标题栏 15 段聚焦渐变 / 失焦渐变 |
| `--xp-taskbar` | 任务栏 16 段渐变 |
| `--xp-tray` | 托盘区渐变（原版没取到精确值，是近似的） |

主要类（**新页面必须复用这些名字**）：

- 窗口：`.win`（3px 外框 + 8px 上圆角 + flex 列）、`.win.blur`、`.win.floating`（position:fixed）、`.win.minimized`、`.win.closed`（页面窗口关掉=藏起来，DOM 还在，可复原）、`.win-placeholder`（占位用，**已设成完全不可见**）、`.win.maximized`、`.win-grip`（右下角缩放手柄）、`.titlebar`、`.tb-icon`、`.tb-title`、`.tb-btns`、`.tb-min`、`.tb-max`（`.restore` 变还原图标）、`.tb-close`、`.win-body`、`.win-body.flush`
- 整页固定浏览器窗（委托/资源页）：`.win.browser-fixed`、`.ie-home`、`.ie-back`、`.ie-back-txt`、`.ie-addr`、`.ie-page`、`.ie-wrap`
- 委托页两栏：`.ie-cols`（`302px + 1fr`）、`.cm-side`（左栏，`position:sticky`）、`.cm-panel`；右侧卡片：`.cm-card`、`.cm-card-no`、`.cm-card-price`、`.cm-card-desc`、`.cm-card-shots`、`.cm-shots-hint`、`.cm-sec`、`.cm-contact`
- 例图预设比例（**由 JS 按图片自然宽高比自动打 class，不要写死比例字段**）：`.cm-card-shots img` 默认 3:4、`img.ratio-sq` = 1:1、`img.ratio-land` = 4:3；都是 `object-fit:cover` + `object-position:top center`
- 资源页：`.rs-item`、`.rs-info`、`.rs-name`、`.rs-size`、`.rs-dl`
- 桌面快捷方式：`.desktop`（宽 78px、`gap:6px`，1180px 以下隐藏）、`.desk-icon`、`.desk-icon.sel`
- 评论区：`.gb-body`（`250px + 1fr` 两栏：左编辑 / 右列表）、`.gb-side`、`.gb-main`、`.gb-pager`、`.gb-page-info`、`.gb-item`、`.gb-head`、`.gb-name`、`.gb-time`、`.gb-del`、`.gb-text`、`.gb-empty`、`.gb-form`、`.gb-send`、`.gb-hint`（**已无 `.gb-ava`**，站主要求不显示头像）
- 任务栏：`.taskbar`、`.task-start`、`.task-tasks`、`.task-item`、`.task-tray`、`.task-clock`
- 开始菜单：`.startmenu`、`.sm-head`、`.sm-avatar`、`.sm-name`、`.sm-body`、`.sm-left`、`.sm-right`、`.sm-item`、`.sm-txt`、`.sm-sub`、`.sm-sep`、`.sm-grow`、`.sm-foot`
- 电源：`body.grayed`、`.power-mask`、`.powerdlg*`、`.pw-btn`、`.pw-cancel`、`.power-screen`、`.welcome*`
- 假 404：`.ie404`、`.ie404-ico`、`.ie404-tech`、`.ie404-act`
- 应用通用：`.app-bar`、`.app-stage`、`.app-col`、`.app-frame`、`.app-loading`
- 扫雷：`.mine-frame`、`.mine-top`、`.mine-led`、`.mine-face`、`.mine-grid`、`.mine-cell`

### 3.2 `js/winxp.js`（`window.XP`）

| API | 作用 |
|---|---|
| `XP.register(app)` | 注册应用（`apps.js` 里调用） |
| `XP.launch(key)` | 打开应用窗口；`single:true` 的应用已存在则聚焦；**注册表里没有该 key 时回落到 `XP.wins` 里同 key 的页面原生窗口**（`reopen` + `restoreWin` + `focusWin`，留言板入口靠这条） |
| `XP.openWindow({key,title,icon,w,h,x,y,noMax,build})` | 造一个应用窗口（默认带 − □ ×） |
| `XP.adopt(el)` | 接管 HTML 里带 `data-win` 的 `.win`；带 `data-fixed` 的走「整页固定窗」分支（加 `.browser-fixed`、不拖动、不建任务栏按钮、三个按钮纯装饰） |
| `XP.toFloat(rec)` / `XP.toFlow(rec)` | 脱离文档流浮到屏幕上 / 归位（原位置留一个**不可见**的 `.win-placeholder` 占位，防止布局跳动） |
| `XP.closeWin(rec)` / `XP.reopen(rec)` | 关掉（页面窗口=加 `.closed` 藏起来 + 撤任务栏按钮）/ 复原 |
| `XP.toggleMax(rec)` | 最大化 / 还原（记 `prevFloating/prevW/prevH/prevL/prevT`，还原时回填） |
| `XP.bindGrip(rec)` | 右下角 `.win-grip` 拖拽改 `.win-body` 的 width/height（最小 190×110） |
| `XP.msg(title,text,icon)` | XP 提示框（默认图标 `147(32x32).png` 红叉） |
| `XP.embeddable(url)` | URL 是否在可嵌入白名单 |
| `XP.frame(stage,url,opts)` | 白名单 + 超时兜底地嵌 iframe；先放 `.app-loading` 占位 |
| `XP.notFound(stage,url,retry)` | 假装 404 页 |
| `XP.powerDialog('turnoff'\|'logoff')` | 电源对话框 + 全屏灰化 |
| `XP.welcome()` | 欢迎（登录）界面 |
| `XP.apps` / `XP.registry` / `XP.wins` / `XP.layer` | 状态 |

**窗口机制要点**

- 尺寸写在 `.win-body` 的内联 style 上（不是 `.win`）：应用窗口由 `openWindow` 写宽高，用户拖 `.win-grip` 也改这两个值，`.win` 自适应内容。**`.win-body` 必须是 `flex: 1 1 auto`** —— 曾经写成 `flex:1`（=flex-basis 0）把内联高度压扁，画图窗口只剩 210px 高。
- **z-index 层级（改之前先读 `css/style.css` `.page` 上方那段注释）**：star-field 1 → `.desktop` 6 → `.duck` **85**（压在任务栏下面、盖在所有窗口上面）→ `.page` 76 → `#winLayer` 80 → `.taskbar` 90 → `.startmenu` 92 → `.lang-drop` 95 → power-mask 119 → welcome 120 → xp-msg 125 → powerdlg 130 → bsod 140。
  - **原理**：站主要求「鸭子压在任务栏下、但永远在所有窗口之上」，所以顺序是 `.page` 76 < `#winLayer` 80 < `.duck` 85 < `.taskbar` 90。改任何一个都要连带确认这条链。
- 拖标题栏用 pointer capture；位移 >3px 才脱离文档流；双击标题栏 = 浮动/归位切换；`.tb-min` 最小化（进任务栏）；`.tb-max` 最大化；`.tb-close` 关闭。
- 任务栏按钮标签取自窗口的 `.tb-title`，`langchange` 时自动同步；时钟 12 小时制 AM/PM，每 15s 刷新。
- **语言切换在任务栏托盘里**（XP 语言栏那样，菜单向上弹出）：`i18n.js` 的 `bind()` 会把 `#langDrop` 从 HTML 原位挪进 `.task-tray`。**别改回 `position:fixed` 右上角** —— 最大化窗口或整页固定窗会把标题栏按钮压住。
- **开始菜单**：左栏 = 其它页面的导航（委托相关事宜 / 资源配布 / 返回主页）+ 除「我的电脑」外的全部应用 + **页面原生窗口（自我介绍 / 留言板）** + 分隔；右栏 = 我的电脑 + 「整理所有窗口」（把所有窗口 `reopen` + 归位 + 还原最大化）；底部 = 注销 / 关闭计算机。头部头像用站主的 `icon.png`，名字硬编码 `12あKa@被告人杯糕_`。
  - 追加原生窗口时**必须按显示名去重**（`usedNames`：先把 NAV 与应用的名字收进去，同名跳过）—— 委托相关事宜 / 资源配布在页面上是原生窗口，菜单里已经作为导航项出现过，否则会重复列两遍。注意 `#commissionEntry` 的 `key` 和 NAV 的 `key` 不一样，只能按文本比。

### 3.3 电源流程（`m00097` 站主要求）

- 点电源项 → `body.grayed` + `.power-mask`（**灰化用 `backdrop-filter: grayscale(1) brightness(.62)` 做在遮罩上**，`@keyframes powerGray` 5s：0%~30% 原色 → 100% 全灰）。
  - ⚠️ 不要改回给 `.page/.taskbar` 加 `filter`：壁纸是 `body` 的背景，那样永远灰不到；而给 `body` 加 `filter` 会破坏所有 `position:fixed` 后代。
- 关闭计算机 → 黑屏「Windows 正在关机…」→ 蓝底「你现在可以安全地关闭计算机了」+「重新开机」按钮 → 欢迎界面。
- 重新启动 → 黑屏 → 欢迎界面；注销/待机/切换用户 → 直接欢迎界面。
- 欢迎界面：左栏 `assets/winxp/windows-logo.png`（站主给的高清四格旗，自带透明通道，132px，**不要加 `image-rendering:pixelated`**）+ `Microsoft Windowsxp`（字距已加宽）+「要开始，请单击您的用户名」；右栏头像 + **站主名 `12あKa@被告人杯糕_`**（与开始菜单头一致）+ **动态窗口数**（`.win:not(.minimized)` 的个数）；底栏「关闭计算机」；点用户名回到页面。

### 3.4 iframe 与「假装 404」

- 白名单 `EMBEDDABLE`：`wikipedia.org, wikimedia.org, archive.org, jspaint.app, classic.minecraft.net, example.com, openstreetmap.org, neocities.org, codepen.io, itch.io, player.vimeo.com, youtube.com/embed, bandcamp.com, w3.org, developer.mozilla.org`。
- 不在白名单 → 直接假 404；在白名单 → 嵌 iframe，`load` 事件取消计时器，**超时**（画图 9s / 浏览器 10s / Minecraft 20s）未加载 → 假 404 或降级（画图降级到自研画板）。
- **已知限制（照实写）**：跨域 iframe 读不到内容，被 X-Frame-Options / CSP 拦掉的站点在 Chrome 里**仍会触发 load**，所以「假 404」主要靠白名单 + 超时兜底，不是真探测。

---

## 四、页面结构

### 统一骨架（三个页面相同）

```
body[data-page=...]
├─ .star-field#starField            星星层
├─ .lang-drop#langDrop              语言栏（HTML 里在这，JS 会把它挪进任务栏托盘）
├─ .desktop#desktop                 桌面快捷方式（仅 index.html，双击打开）
├─ main.page                        主页是 height:calc(100vh - 30px) + overflow:hidden（**整页不滚**）
│   └─ …各页面内容（窗口都是 <section class="win" data-win>）
├─ footer.taskbar                   任务栏（start 按钮 + #taskTasks + 托盘图标 + 语言栏 + #taskClock）
├─ div.startmenu#startMenu[hidden]  开始菜单（JS 生成内容）
├─ button.duck#duck                 玩具鸭彩蛋（仅 index.html）
└─ div#winLayer                     XP 应用窗口容器
```

窗口 HTML 模板（**所有页面统一，三个按钮都要有**）：

```html
<section class="win" id="xxx" data-win>
  <div class="titlebar">
    <img class="tb-icon" src="assets/winxp/windowsIcons/xxx.png" alt="">
    <span class="tb-title" data-i18n="titleXxx">标题</span>
    <span class="tb-btns"><i class="tb-min" title="Minimize">—</i><i class="tb-max" title="Maximize">□</i><i class="tb-close" title="Close">×</i></span>
  </div>
  <div class="win-body">…内容…</div>
</section>
```

- `data-win` 是 `XP.adopt` 的钩子；页面窗口 = 可拖、可最小化到任务栏、可最大化、可关闭（关掉只是藏起来，开始菜单「整理所有窗口」能复原）。
- 整页固定窗（委托/资源页）用 `data-win data-fixed`：占满整屏、不参与拖动、三个按钮是装饰。
- `.tb-*` 里的 `—` `□` `×` 字符必须留着（CSS 用 `font-size:0` + 伪元素画图形）。`.tb-close` 是纯 CSS 画的，**不要改回字符**。

### index.html
- **布局**：`.page` 固定一屏高、不滚动；`.blog-cols` = `minmax(0,1fr) 328px` 两栏。左 `.main-col` 是 2×2 栅格：第一行 `#commissionEntry` + `#resourcesEntry` 并排，第二行 `#guestbook` 整行（左编辑框 / 右评论列表）；右 `.side-col` 只放 `#profile`，撑满整屏，头图 `.profile-banner` 高 118px、`background-position:center top`（从底端裁短）。
  - ⚠️ `.main-col` / `.side-col` 必须**同时**写 `grid-column` 和 `grid-row`，只写 column 会被网格的稀疏自动排布丢到第二行（踩过）。
  - 900px 以下放弃「一屏不滚」：`body` 恢复滚动、`.page` 改 `height:auto`、两栏改单列。
- `.desktop` **八个**桌面快捷方式：我的电脑 / Internet Explorer / 委托相关事宜（href）/ 资源配布（href）/ 扫雷 / 画图 / Minecraft / 留言板（`mail.png`，`data-app="guestbook"`）。单击选中、双击打开。
- `#profile`：头图 + 头像 + 名字 + `.bio-card` 简介 + `.links-card` 5 个外链。
- `#guestbook`：评论区（`js/guestbook.js` 渲染）。
- **已按站主要求删除**：站头横幅、访客计数、更新日志、弹幕屏、画廊面板、委托窗口、音源窗口、全部 GIF 贴纸、**全部页脚 `.foot-note`**。

### commission.html（站主给版式参考图后整页重做）
- `<section class="win" id="cmWin" data-win data-fixed>` 占满整屏（`inset: 0 0 30px 0`），`.win-body.flush` 内是 `.ie-home` + `.ie-page > .ie-wrap`。
- `.ie-home` = 浏览器式工具条：`.ie-back#ieBack`（`back.png` 图标按钮，点了 `history.back()`，没历史就回主页）+ `.ie-back-txt#ieHome`「← 返回主页」（**占据原 forward 的位置**，没有 forward）+ `Address` + `#ieAddr`（只读，显示当前 URL）。
- 正文 `.ie-page`（背景 `#ebe0cb` 暖色）整页可滚动，`.ie-wrap` 内是 `.ie-cols` 两栏：
  - 左 `.cm-side`（`position:sticky`）三个 `.cm-panel`：受理状态（`.cm-open` + `.cm-status-note`，**绿呼吸灯 `.cm-dot` 已按站主要求删除**）/ 委托申请方式（`.cm-steps` 三条，紧凑不分模块）/ 联系方式（`.cm-contact` 五个外链）。
  - 右 `.cm-cards` 四张 `.cm-card`，每张按站主参考图版式：标题、`.cm-card-price`（大号蓝字，**值来自 i18n 的 `cmCard1Price~cmCard3Price`，按语言换算货币**）、两行说明、下面三张等宽例图（点开原图）。末尾 `.note-box`（价目备注）+ `.cm-shots-hint`。
- 四档：01 白底头像 ¥320-520 / 02 半身插画 ¥600-900 / 03 全身插画 ¥1000-1500 / 04 场景·多人（私信议价）。**01 是站主的真实价，02~04 是我编的占位，等站主改。**
- 例图是**手工挑选硬编码**在 HTML 里的（01=插画53/57/54、02=插画34-RE/47-2/56、03=插画35/67/59、04=插画31/37/62）。换图直接改 HTML 的 `<img src="picture/...">`。
- 例图比例由 `js/winxp.js` 的 `boot()` 按 `naturalWidth/Height` 自动打 `.ratio-sq` / `.ratio-land`（**为将来接后端编辑器留的后路：不要在 HTML 里写死比例字段**）。
- 脚本只要：`js/i18n.js` → `js/config.js` → `js/winxp.js` → `js/starfield.js`。

### resources.html
同款固定浏览器窗。正文三段：资源简介 / 下载（`.rs-item` 一条：名称 + 体积 + `a.rs-dl`）/ 使用说明。
zip 的 href 必须保持：`voice%20dl/%E8%8A%99%E5%85%B0%E6%9C%B5%E9%9C%B2v1.0.0-beta.zip`（芙兰朵露 v1.0.0-beta，33.2MB），带 `download`。**文件名是非 ASCII，加文件时必须重新做 URL 编码**（`芙`=%E8%8A%99 `兰`=%E5%85%B0 `朵`=%E6%9C%B5 `露`=%E9%9C%B2），编码错了点下载就是 404。

---

## 五、XP 图标对照表（`assets/winxp/windowsIcons/`）

文件名带括号（如 `676(16x16).png`），**CSS 里写 `url("...676(16x16).png")` 必须带引号**。

| 用途 | 文件 |
|---|---|
| 我的电脑 / 开始按钮 / XP 旗标 | `676(32x32).png` / `start.png` / `windows.png`（旗标本体包围盒 10,1→30,20） |
| 记事本 / 画图 / 浏览器 | `327(32x32).png` / `680(32x32).png` / `ie.png` |
| 注销 / 关机 / 重启 / 切换用户 | `546(32x32).png` / `310(32x32).png` / `restart.ico` / `290.png` |
| 提示框红叉 / 盾牌 / 声音 / USB | `147(32x32).png` / `229(16x16).png` / `690(16x16).png` / `394(16x16).png` |
| 文件夹 / 硬盘 / 光驱 | `318(32x32).png` / `334(48x48).png` / `111(48x48).png` |
| 资源配布按钮 / 邮件 / 窗口关机图 | `887(32x32).png` / `mail.png` / `windows-off.png` |
| **站主自己的图**（不是 winXP 素材） | `assets/icon/GitHub.png`（540×540，站主给的 GitHub 标）、`assets/icon/survivor.png`（64×62，站主给的 P2 友链标，从 79×77 webp 缩的）、`assets/winxp/windows-logo.png`（站主给的高清四格旗，1000×883 自带透明）、`assets/winxp/minecraft.png`（站主给的高清等距草方块 467×512） |
| IE 工具条 | `back.png` `forward.png` `stop.png` `refresh.png` `home.png`（32x32）、`ie-paper.png` |
| 扫雷 | 见 `assets/winxp/minesweeper/`（`smile/ohh/dead/win/flag/question/misflagged/mine-icon/mine-death/open1-8/digit0-9/digit-.png`） |

**素材包里没有 3.5" 软盘图标**（所以我的电脑里没有 A: 项，宁缺勿错图标）。
**不要用**原作者的 `user.png`（头像换成站主 `icon.png`）与 `github-logo.png`，也不要有任何 ShizukuIchi 的外链/star 按钮。

---

## 六、各功能模块

### 1. 多语言 `js/i18n.js`
- `DICT` 每条含 `zh / ja / en`；标记：`data-i18n` / `data-i18n-placeholder` / `data-i18n-title` / `data-i18n-aria`。
- 选择存 `localStorage`（key `cupcake-lang-v2`），非法值回落中文。
- 切换时派发 `document` 上的 `langchange` 事件（任务栏标签、开始菜单、留言板、评论区都监听它）。
- `bind()` 里还会把 `#langDrop` 挪进 `.task-tray`（做成 XP 语言栏，菜单向上弹）。
- 页面级的接线在 `js/winxp.js` 的 `boot()`：填 `#ieAddr`、把 `#ieHome` 指向 `index.html`、`#ieBack` 走 `history.back()`（没历史回落主页）、桌面快捷方式 `[data-desk]` 单击选中 / 双击按 `data-app` 或 `data-href` 打开。
- **改文案只改 `DICT`**；HTML 里的中文只是首次渲染兜底。
- **陷阱**：由 JS 托管文案的元素**不要**加 `data-i18n`，否则切换语言会打架。
- 新增 key 时三语都要写全（缺失会回落 `zh`，再缺失显示 key 本身）。

### 2. 留言板 / 评论区 `js/guestbook.js`
- **localStorage 本地存储**（key `cupcake-guestbook-v1`，最多 200 条，名字 ≤24 字、正文 ≤300 字），刷新不丢、换设备不同步。
- **每页 8 条（`PER_PAGE = 8`）+ 只有 `‹ ›` 翻页**（站主要求，没有页码按钮）；`.gb-pager` 里是 `#gbPrev` / `#gbPageInfo`（`当前页 / 总页数`）/ `#gbNext`，到头就 `disabled`。
- 每条渲染：名字 / 时间（`YYYY-MM-DD HH:MM`）/ `×` 删除 / 正文。**不显示头像**（`.gb-ava` 与 `hash()` 已按站主要求删除）。
- 删除按 `ts` 精确匹配（不是下标），否则翻页后索引错位删错条。
- 一律用 `textContent` 写入（防 XSS）；空态用 `gbEmpty`（「暂无评论」）；`langchange` 时重渲染；发送后回到第 1 页。
- 后端能力已撤（`js/config.js` 的 `window.DANMAKU_API` 只是开关占位，**当前没有任何网络代码**）。若以后要跨访客共享，需要新写接口契约（老的弹幕接口已从 `server.js` 删除，且字段形状和新留言板对不上）。

### 3. 彩蛋 `js/easteregg.js` + CSS
- 点击鸭子：`1.png ↔ 2.png` + 按扁回弹 + `音效.wav`；`new Image()` 预加载过两张图。
- 连点 30 次：乱码 → 抖屏/色差（频闪已按站主要求加快：`glitchShake .07s steps(2)`、`.glitch-flash .14s steps(2)`、新增 `@keyframes glitchHue` 做元素级 invert/hue-rotate）→ 报错弹窗雨 →「你在期待什么？」→ XP 蓝屏 → `location.reload()`。
- **文案跟随语言**（站主要求）：局部 `TT(key, fallback)` 包 `window.t`；结尾弹窗走 `ceInfoTitle / ceFeatured / ceOk`。**蓝屏不翻译，纯英文**（见六.7）。
- 故障原因/模块名/STOP 码每次随机：`rndHex(n)` 十六进制、`rndAscii(n)` **纯 ASCII 乱码（驱动文件名用它，别用汉字乱码 `rndGarble`，在日/英界面里像排版事故）**；塞 `innerHTML` 前一律过 `esc()`。
- 约束：**`body` 上不能加 `transform`**（fixed 后代全失效）；乱码逻辑用 `isExcluded()` 排除 UI，改结构要同步。

### 4. 背景星星 `js/starfield.js`
`fetch('assets/star.txt')`，file:// 时用内置副本；随机位置/大小、白发光、**同屏最多 4 个**（站主嫌多，从 8 减到 4）、每 0.9~2s 尝试一次、**无旋转倾斜**。

### 5. 六个 XP 应用 `js/apps.js`（界面全英文）
| 应用 | 窗口尺寸 | 说明 |
|---|---|---|
| Minesweeper | 224×252 | 三档难度（9×9/10、16×16/40、30×16/99）、真实 PNG 素材、LED 雷数/计时、笑脸重开、首点保证安全、左键翻开（0 格 flood）、右键 旗→问号→空。**未实现**：中键 chording |
| Notepad | 460×340 | New / Delete / Save as .txt / Word wrap + 字数统计 |
| Paint | 720×520 | 先嵌 `https://jspaint.app/`，9s 超时或失败 → 降级到自研画板（20 色 XP 调色板 + 1/3/6/12px 笔刷 + Clear + Save PNG） |
| Internet Explorer | 760×520 | **真历史记录**：`history` 数组 + `ptr`，`HOME='about:home'` 书签页也是其中一条，`paint()` 统一按 `history[ptr]` 渲染 → Back/Forward/Home/Refresh 全部可用（无前/后可退时对应按钮 `opacity:.4`）；Address+Go；书签首页 5 项（Wikipedia 中文 / Internet Archive / Minecraft Classic / jspaint / OpenStreetMap）；非网址输入 → 走维基搜索；不可嵌站点 → 假 404 +「在新标签打开」 |
| Minecraft | 894×610 | iframe `https://classic.minecraft.net/`（20s 超时）+ 工具条「在新标签打开」+ WASD 操作提示 |
| My Computer | 620×440 | 左栏系统任务/其他位置，右栏 硬盘组（C:、D:）+ 可移动存储（CD Drive (E:)）；双击磁盘或点侧栏 → XP 提示框「设备未就绪」。**不含任何站主个人信息，也没有原作者的 About Me** |

注册顺序就是开始菜单顺序：minesweeper → notepad → paint → browser → minecraft → computer（computer 注册在最后 → 出现在右栏）。

### 6. 其他
- 玩具鸭 z-index **85**：`bottom:18px`、大小 300px 贴右下角。**压在任务栏（90）下面、但在所有窗口（`#winLayer` 80）上面**（站主 m01181 第 2 条），只在主界面（index.html）有；登录页/跳转页没有鸭子。
- 外链 5 项：米画师 `https://www.mihuashi.com/profiles/2838272`、bilibili `https://space.bilibili.com/88149046`、X `https://x.com/CupCakeQAQ_`、マシュマロ `https://marshmallow-qa.com/me`；**邮箱那项是悬停显示 `cupcakeqaq@gmail.com` 气泡的 `div`，故意不做 mailto**。

### 7. 配色与排版（**照抄 winXP-master 的 XP 原生配色**，站主 m01710 要求）
- 主色**不再是自己调的复古色，也不是粉色**，全部取自开源工程 `src/WinXP/apps/MyComputer/index.js` 的样式块。`css/style.css` 的 `:root`（变量名沿用旧的，所以引用它的地方自动跟着变）：
  `--ink #000`、`--dark #0c327d`、`--accent #0c327d`（窗格项文字/主色）、`--accent2 #2f6ac4`（任务窗格标题蓝；**原版是 `#1c68ff`，站主 m01947 说「窗口部分文字饱和度不用这么高」→ 降了一档**）、`--accent-soft #a8bcff`（任务窗格渐变浅端）、`--accent-bg #ece9d8`（= XP 米色）、`--line #b9b9b9`（= 原版状态栏边框 `rgb(185,185,185)`）、`--sel #316ac5`。
  原版参考值（重建配色时照这个抄）：任务窗格标题 `#1c68ff`、窗格项文字 `#0c327d`、窗格渐变 `rgb(240,240,255) → rgb(168,188,255)` + 底部 `rgba(198,211,255,.87)`、选中项 `linear-gradient(to bottom,#748aff,#4057d3)` / 边框 `rgba(122,122,255,.6)`、内容区 `#fff`、状态栏 `#dedede`、工具条 `linear-gradient(to right,#edede5,#ede8cd)`。
- **所有按钮统一成留言板发送按钮（`.gb-send`）那一种**（站主明确要求，别再各写各的）：`linear-gradient(180deg,#fdfdfd,#dfe4ee)` + `1px solid #9aa7c0` + `border-radius:3px` + `color:#143a7a` + `padding:5px 18px` + `font-size:12px`，hover `brightness(1.04)` / active `brightness(.94)`。已应用到 `.btn`、`.rs-dl`、`.gb-send`、`.gb-pager button`、`.xp-dialog .dlg-btn`、`.power-screen .ps-btn`。
  - 例外（故意不统一）：`.pw-cancel`（电源对话框的取消按钮，是从参考工程 Modal 原样抄的多层 box-shadow）；`.cm-open`（受理状态的绿字 `#4c7a34`，语义色）。
- **标题栏 − □ × 直接照抄 `src/WinXP/Windows/HeaderButtons.js`**（22×22、白 1px 描边、圆角 3px、蓝/红径向渐变 + `inset` 阴影、图标用伪元素按原版 `left/top` 数值绝对定位）。参考工程 `clear.css` 也是 `border-box`，和本站一致，所以数值可以原样搬。
  - ⚠️ **`.tb-close` 的选择器必须写成 `.tb-btns .tb-close`**：基础样式 `.tb-btns i`（0,1,1）优先级高于 `.tb-close`（0,1,0），不加前缀关闭按钮会被压回蓝色。
  - **标题栏两端原本那 15px 深蓝渐隐（`.titlebar:before/:after`）站主明确说「莫名其妙多了这种渐变」→ 已整块删除**，恢复方法写在 `css/winxp.css` 该处注释里。
- **欢迎界面左侧商标照站主给的 P3 参考**（XP 官方定式）：`.wl-mark` 内是旗标 `assets/winxp/windows-logo.png`（`align-self:flex-end`）+ `.wl-word` 两行 —— `.wl-ms` = `Microsoft®`（12px、上标 ® 7px）、`.wl-win` = `Windows™`（27px 粗体）+ `<i>xp</i>`（15px 常规）。原来的单行 `.wl-brand` 已删除。
  - **`.cn`（名字）曾经有 `text-shadow: 2px 2px 0 #ffd9ec`，站主说「名字有两层」就是这个硬投影 → 已删除，别再给名字加实心投影。**
- 主页整页不滚动：`.page` = `height:calc(100vh - 30px); overflow:hidden`，`.blog-cols: flex:1; min-height:0`，各窗口 `height:100%; min-height:0`；`.side-col > #profile{flex:1}` 撑满。
- 桌面图标顺序（站主指定）：我的电脑 → Internet Explorer → 委托相关事宜 → 资源配布 → **留言板** → 扫雷 → 画图 → Minecraft。
- **蓝屏（彩蛋结尾）不做多语言，纯英文**（站主要求保证还原度）：文案硬编码在 `js/easteregg.js` 的 `showBSOD()`，只有结尾那个「你在期待什么？」弹窗跟随语言。`js/i18n.js` 里的 `bsod*` 键已删。
- **字体（站主 m02125 第 2 条：英文/数字不要像素体）**：`@font-face 'Pixel'` 三份 woff2 现在**全站不再引用**（留着备用，浏览器不会下载）；`css/style.css` 的 `:root` 多了两个变量 —— `--font-body`（正文：`'Noto Sans SC','Source Han Sans SC','Source Han Sans CN','Microsoft YaHei','PingFang SC',Tahoma,system-ui,sans-serif`）与 `--font-ui`（XP 外壳：`Tahoma` 打头，最还原）。**`css/winxp.css` 里所有 `Tahoma,'Pixel'` 都换成了 `var(--font-ui)`**。
  - ⚠️ `.star-art`（ASCII 字符画星星）**必须保留等宽字体** `'Consolas','Courier New',monospace`，它不跟 `--font-body`。
- **自介窗加宽（站主 m02125 第 3 条）**：`.blog-cols` 侧栏 `328px → 380px`，`.avatar-frame` 84→80px，`.cn` 18px→**16px 且 `white-space:nowrap`**（原来 `word-break:break-all` 会把结尾的 `_` 甩到第二行，看着像被挤压）。
- **委托页的两处简化（站主 m02125 第 4 条）**：① 价目卡片右上角的大编号 `.cm-card-no`（01~04）**已从 HTML 与 CSS 里彻底删除**；② 「委托流程」不再是「一步一个盒子」——`.cm-steps li` 去掉 white 卡背景/边框/`♥` 伪元素，改成普通行内文字（`.cm-panel .cm-steps li{padding:0}` + `b{display:inline;margin-right:4px}`）。
- **崩坏故障**（m01947 第 2 条要「强度再高点」，m02125 第 1 条又要求**窗口别扭来扭去**）：抖动/倾斜整块 `glitchShake` **已删**（`.page`/`.taskbar` 不再有任何 transform 动画）。现在故障感只靠：逐元素 `glitchHue .26s`（invert + hue-rotate）反相、`.glitch-overlay` 三层扫描线（`inset:-14%`、透明度 .28/.12/.5、`.07s` 位移 + `.34s` 频闪）、文字 RGB 鬼影 `rgba(214,60,92,.42)`/`rgba(90,190,220,.42)`、图片 `saturate(2.1) contrast(1.5) hue-rotate(24deg)`。**想再加强度就加扫描线/频闪，不要加位移和 skew。**
- **报错弹窗音效**：`js/easteregg.js` 的 `spawnError()` 每次调用 `playErrorSound()`，复用 `assets/winxp/sounds/error.wav`（原版 `ErrorBox` 用的那个），**节流 260ms**（报错窗 170ms 一个，全响会炸成噪音）。
- **站主的两个外链**（m01947 第 4/5 条）：`#profile` 的「找到我」与委托页「联系方式」都加了 GitHub `https://github.com/cupcakeqaq-cloud`（图标 `assets/icon/GitHub.png`，540×540）；开始菜单左栏导航组加了友链 → `https://cupcakeqaq-cloud.github.io/survivor/`（图标 `assets/icon/survivor.png`，由站主给的 P2 缩到 64×62），NAV 里标了 `extern:true`，点击用 `window.open(..., '_blank', 'noopener')`。**第 6 批把显示名从「友链」改成 `Survivor`**（`menuFriend`，三语同值 —— 站点名是专有名词，不翻译）。

---

## 七、本地运行与验证

```bash
cd E:\自介网页
node server.js          # http://127.0.0.1:3000（PORT 可覆盖）
```

- 语法自检（无构建，改完至少跑一次）：`node --check js/winxp.js`（逐个文件）。
- **无头截图验证法（本项目一直在用，很好使）**：

```powershell
$edge='C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
& $edge --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=6000 `
  --window-size=1400,1000 --screenshot="diag\shots\x.png" "http://127.0.0.1:3000/index.html"
```

- 直接用 file:// 打开也行，但中文目录要写成 `file:///E:/%E8%87%AA%E4%BB%8B%E7%BD%91%E9%A1%B5/index.html`。
- **无头环境的已知假象**：没有 WebGL 且 file:// 起源时，`jspaint.app` / `classic.minecraft.net` 不会渲染，会走超时降级（这是环境问题，不是 bug）。实测 iframe 本身可用（嵌维基页面正常）。
- **验证页面交互 / 弹层的临时测试台**（本项目一直在用，比手动点靠谱）：新建 `_probe.html`，里面动态造一个**撑满视口的** `<iframe src="index.html">`，按 `?act=...` 去点真元素再截图。**关键：iframe 的父元素必须有高度**（`html,body,#host{height:100%}`），否则 iframe 高度为 0，页面里的 `100vh` 会算成 0，截出来是一堆塌掉的窗口（踩过）。

```html
<div id="host"></div>
<script>
var q = location.search;
var lang = (q.match(/lang=(\w+)/) || [])[1];            // zh|ja|en，先写 localStorage 再造 iframe
if (lang) localStorage.setItem('cupcake-lang-v2', lang);
var f = document.createElement('iframe');
f.src = (q.match(/page=([\w.]+)/) || [])[1] || 'index.html';
f.id = 'f'; document.getElementById('host').appendChild(f);
f.addEventListener('load', function () {
  var w = f.contentWindow, d = f.contentDocument;
  var act = (q.match(/act=([a-z]+)/) || [])[1] || '';
  setTimeout(function () {
    if (!d.getElementById('startBtn')) return;
    if (act === 'menu')    d.getElementById('startBtn').click();       // 开始菜单
    if (act === 'welcome') w.XP.welcome();                             // 欢迎界面
    if (act === 'glitch')  for (var i = 0; i < 30; i++) d.getElementById('duck').click();  // 崩坏序列
    if (act === 'gb')      for (var j = 1; j <= 12; j++) {             // 灌 12 条留言测翻页
      d.getElementById('gbName').value = '访客' + j;
      d.getElementById('gbText').value = '第 ' + j + ' 条测试留言';
      d.getElementById('gbSend').click();
    }
  }, 400);
});
</script>
```

  配合 `--virtual-time-budget`：`4200` ≈ 抓到乱码/报错雨，`9000` ≈ 抓到结尾弹窗，`14000` ≈ 抓到蓝屏。
  （无头下 `--dump-dom` 拿不到 JS 执行后的 DOM，所以别指望用它验证；**验完记得删 `_probe.html`、`_dbg.html`、`diag/shots/`**。）
- **量布局**用 `_dbg.html`：iframe 里 `getBoundingClientRect()` + `getComputedStyle()` 把 `.page/.blog-cols/.main-col/.side-col/#profile/#guestbook` 的几何打印到页面上再截图，比肉眼猜快得多（栅格塌到第二行就是靠它定位的）。

---

## 八、git 工作流

系统 PATH 里**没有 git**，用 GitHub Desktop 自带的：

```powershell
$git = 'C:\Users\CupCakeQAQ_\AppData\Local\GitHubDesktop\app-3.6.6\resources\app\git\cmd\git.exe'
& $git -C 'E:\自介网页' add -A
& $git -C 'E:\自介网页' commit -m "..."
& $git -C 'E:\自介网页' push origin main
```

**已知问题**：
- GitHub 连接**间歇性被重置**（`Recv failure: Connection was reset`），重试即可。
- 站主会**在 GitHub 网页端直接改文件**导致分叉；推送被拒时先 `git fetch` 比对，内容一致就 `git reset --hard origin/main`（发生过一次）。
- 大文件（`voice dl/` 那个 33.2MB 的 zip）已在仓库里，别再往主仓库放大文件。历史上曾同时放两个 zip 共 126MB，第 7 批已删掉两个旧的换成一个。

---

## 九、踩过的坑（别重犯）

| 坑 | 结论 |
|---|---|
| `body` 加 `transform` / `filter` | 破坏所有 `position: fixed` 子元素 → 电源灰化改用遮罩的 `backdrop-filter` |
| `.win-body` 写 `flex:1` | flex-basis 归零，压过内联 height，窗口被压扁 → 必须 `flex: 1 1 auto` |
| 面板窗口尺寸写在 `.win` 上 | 拖右下角缩放要改的是 `.win-body` 的宽高 → 尺寸一律写在 `.win-body` 内联 style |
| `.titlebar:before/:after` 定位成 `left:-12px / right:-12px` | 15px 宽的深蓝侧翼渐变溢出到窗口圆角外，右上角多出一块蓝方块（站主给的 bug 图）→ 必须 `left:0 / right:0` |
| 语言下拉固定在右上角 | 最大化窗口/整页固定窗会压住标题栏按钮 → 挪进任务栏托盘当语言栏 |
| 虚线占位框 `.win-placeholder` | 站主明确不要虚线 → 已设成 `visibility:hidden`（只占位不显示） |
| 玩具鸭 z-index 高于 `.page` | 会压住页面窗口里的按钮（留言板发送）→ 鸭子 **85** / `.page` 76 / `#winLayer` 80 / 任务栏 90（站主要求鸭子压任务栏下、但盖住所有窗口） |
| `.tb-close` 写成裸类名 | 被 `.tb-btns i`（0,1,1）压回蓝色 → 必须 `.tb-btns .tb-close` |
| 用 write 工具重建刚删掉的临时文件（如 `_probe.html` / `_t.html`） | 会失败并提示 `file no longer exists — re-read the file, then retry` → 换个新文件名（`_p9.html` 之类）即可，验完一起删 |
| 给站主导出预览图 | 站主 m01947 明确说「不要导出预览图给我看，纯浪费 token」→ 自己用无头截图看，汇报只用文字 |
| `XP.frame` 的超时回调晚于导航 | 用户在 iframe 加载超时前点了 Back/Home，超时回调仍会往 stage 塞假 404、把新页面盖掉 → 回调里先判 `if (!f.parentNode) return;`（`load` 回调同理） |
| 换字体时漏掉 `.star-art` | 星星是 ASCII 字符画，跟了 `--font-body` 会错位 → 它必须自己写 `monospace` |
| `.main-col` / `.side-col` 只写 `grid-column` | 网格稀疏自动排布会把主栏丢到**第二行**（表现为两个入口窗掉到页面下半部、上方全是草地）→ 必须同时写 `grid-row: 1` |
| 开始菜单列出页面原生窗口时不去重 | `#commissionEntry` 的 `key` 与 NAV 的 `key` 不同名，会重复列一遍 → 按**显示文本**去重（`usedNames`） |
| iframe 父元素没有高度 | `_probe.html` 造 iframe 时 `#host` 没高度 → iframe 高度 0 → 页面里 `100vh` 算成 0，整页塌掉 → 必须 `html,body,#host{height:100%}` |
| 用 `var(--hotpink)` 之类的旧变量 | 复古配色改造已把粉色系变量全部删除（现在只有 `--accent / --accent2 / --accent-soft / --accent-bg / --line / --sel / --ink / --dark`）→ 出现旧变量名就是漏改，颜色会失效 |
| JS 里手工拼的 HTML 塞乱码 | 乱码字符含 `< > & "` → 塞 `innerHTML` 前必须过 `esc()` |
| 驱动文件名用汉字乱码 | 在日/英界面里像排版事故 → 用 `rndAscii()` 纯 ASCII |
| `.tb-close { … }` 写不出红色按钮 | 基础样式 `.tb-btns i`（0,1,1）优先级压过 `.tb-close`（0,1,0）→ 选择器必须写 `.tb-btns .tb-close` |
| 用 `Set-Content -Encoding utf8NoBOM` 改文件 | 这台机器是 PowerShell 5.1，**没有 utf8NoBOM**（会报「无法将值转换为类型」）→ 用 `$enc = New-Object System.Text.UTF8Encoding($false); [IO.File]::ReadAllText($p,[Text.Encoding]::UTF8) … [IO.File]::WriteAllText($p,$t,$enc)` |
| 给站主贴/导出预览图 | 站主明确说「不要导出预览图给我看，纯浪费 token」→ 截图只自己看，放 `%TEMP%`，别 `present` |
| 图标文件名带括号 | CSS `url()` 里必须加引号 |
| 贴纸 `.gif-comm-br` 放在窗口外 | 会锚定到 `.page` 飘到画面中间 → 必须放在某个 `.win`（已 `position:relative`）；现在页面已不用 GIF 贴纸 |
| 窗口按钮用 `×` 字符 | 基线不居中 + 会被乱码逻辑替换 → 用纯 CSS 伪元素画 |
| 电源对话框没有取消灰化 | 取消时要移除 `body.grayed` 与遮罩 |
| 窗口 z-index 超过任务栏 | 会盖住任务栏 → 应用窗口在 50~68 循环 |
| `data-i18n` 加在 JS 托管元素上 | 切换语言被打回旧文案 → 由 JS 独占 |
| 画廊脚本放在没有 `#galleryGrid` 的页面 | 直接报错 → 画廊已整套删除，别再引入 |
| `worker.js`/`deno.ts` 放主仓库 | 210MB 仓库被当静态站构建，额度爆掉、账号暂停 |
| 开发用截图/测试页留在仓库 | GitHub Pages 会一起发布、白占体积 → 验证完记得删（`diag/shots/`、`_t.html`） |

---

## 十、未完成 / 可继续做的

- **委托页的卡片文案与价位**：标题与两行说明在 `js/i18n.js` 的 `cmCard1~4Title/Desc1/Desc2`；**价位也在 i18n 里**（`cmCard1Price~cmCard3Price`，三语各一份：zh `¥320-520` / ja `6,500〜11,000円` / en `$45-75`）。换算基准（1 CNY = 21 JPY = 0.14 USD，日元取 500 整、美元取 5 整）写在 `js/i18n.js` 委托卡片那段的注释里，**改汇率就改那三对数字**。第 4 档「私信议价」走 `cmPriceTalk`。**01 白底头像 ¥320-520 是站主米画师的真实价，02~04（¥600-900 / ¥1000-1500 / 私信议价）是我编的占位**，等站主给正式内容 —— 改价时三语都要改。
- 委托状态写「接受中」（`cmStatusOpen`），换状态只改这个词。
- 例图是手工挑选硬编码在 `commission.html` 里的（4 档 × 3 张），加图要手动补 `<img>`；比例由 JS 自动判定（3:4 / 1:1 / 4:3 三套预设）。
- **站主打算以后写一个后端网站编辑器**（本轮明确了，但暂不实现）→ 所以不要把例图比例、卡片内容写死成不可替换的结构，能数据化就数据化。
- 留言板暂无后端（见六.2）。
- 扫雷没做中键 chording。
- `assets/stickers/anime/` 里 5 张 GIF 现在都没用到（站主要求去掉页面所有 GIF），留着备用。
- 移动端只做了基础响应式（1180px 隐藏桌面图标、900px 放弃一屏不滚改单列、700px 各面板收窄），没有针对触摸拖拽做优化。
- `diag/icon_sheet.py`（生成图标接触表）、`diag/make_minecraft_icon.py`（生成草方块图标）留着备用；`diag/sheet.png`、`diag/pic_sheet.png` 是挑图标/挑例图用的接触表。`diag/` 其余是站主自己的 X 账号诊断资料。

---

## 十一、站主的沟通偏好（重要）

- **要严格执行要求，不要自作主张**。改动前不确定就先问清楚再动手。
- **不要再写 README 文件**（明确要求，本文档是唯一需要维护的说明）。
- 反馈直接，会说「××有 bug」「××不对」。**别辩解、别写长道歉**，直接修 + 简短说明。
- 讨厌：无意义的装饰、莫名其妙的标签词汇、刻意的设计、低级 emoji 装饰、留白过多。
- 喜欢：紧凑极繁排版、千禧年个人博客味、颜文字分隔线、**XP 界面高还原度**。
- 涉及第三方服务**必须先说清风险和限制**再动手（之前后端方案反复失败：Cloudflare 被墙 → Deno 额度爆 → Render 要绑卡）。
- 沟通用中文。
