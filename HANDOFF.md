# 交接文档 · 12あKa@被告人杯糕_ 自介网页

> 给接手的 AI / 协作者：读完这份就能无缝接手。**整站已改造为 Windows XP 风格**（窗口外壳 / 任务栏 / 开始菜单 / 桌面快捷方式 / 电源流程 / 6 个 XP 应用），仍是**纯静态零构建**，直接推 GitHub Pages 即可。
>
> 最新一轮（第 10 批 4+3 条，**已落地，等站主验收**，详见第十六节）：① 错误弹窗的 **OK 按钮照 `winXP-master` 的 ErrorBox 源码重做**（80×22、1px 黑细边、平面无圆角，`:active` 反向内阴影 + 文字下移 1px），只动弹窗按钮，其它 Luna 按钮不动；② 自介名字号 **24px**（原来 12px 太小）；③ 两个跳转页 `.ie-page` 换成 `assets/background/web.jpg` 星纹壁纸 + 中间 980px 白卡，**左右各透一条背景**；④ 播放器两个 bug 修复（**切歌瞬间读到上一首的时长/位置** → 进度跳到一大半；`saveState()` 把上一首的位置配新歌文件名存进 `localStorage` → 进度乱序），统一收口到新的 `metrics()` 守卫；⑤ 播放器 UI **整文件重做成 Windows 7 Frutiger Aero**（左封面+歌名歌手+N of 12+进度+走带、右侧可滚动歌单，窗口 620×340 长方形，砍掉七段数码管）；⑥ 播放器图标换站主给的 **P4**（CD+蓝音符 → `assets/winxp/music.png`）；⑦ 桌面快捷方式把**音乐挪到留言板下面**。
> 上一轮（第 9 批 6 条，**已落地**，详见第十四节）：① 4 处错误弹窗全部换成源码同款高清图标（`897(32x32).png`，整数倍最近邻放大 + `srcset`）；② 假 404 的 IE 纸页图标放大到原生 48px；③ 新增 **Windows Media Player** 音乐播放器（普通 XP 应用，12 首按站主截图顺序，读内嵌 ID3 歌名/歌手/封面，`music/日刊：遺書.jpg` 兜底）；④ 跨页后台续播（`localStorage`），跳转页任务栏**不加**播放器按钮；⑤ 修「跳转页任务栏一片空白」的 bug；⑥ **全站正文回像素体**（XP 外壳仍 Tahoma）+ 正文字号吸附 12/24px，两个跳转页配色统一成 XP Luna 蓝。
> 第 9 批另一条线（**留言板后端**，详见第十五节）：访客留言改存 **Cloudflare Pages 函数 + KV**（网页仍托管在 GitHub Pages，不搬家）；匿名发言（昵称留空 = `Anonymous`）、直发不审核、不要验证码；防护只做「正文 ≤200 字 + 同 IP 10 分钟 3 条」；前台**去掉删除按钮**并提示「发出后自己删不掉」、**去掉 localStorage**；`worker/` 下 9 个文件 + 三个双击就能跑的 .bat（本机试跑 / 推送 / 拉取）。**已部署到 `https://cupcake-gb-api.pages.dev`，线上体检 16 项、本机自测 21 项全过**。原方案的 Cloudflare Worker 因为 `*.workers.dev` 在国内被 DNS 污染 + TLS 阻断而弃用（证据见 15.5）。
> 上一轮（第 8 批 2 条）：**资源页下载项的名字硬编码成中文**，切到日/英后页面上只剩这一个词是中文，和全页语言对不上 → 新增 i18n 键 `voiceNameFlan`（zh `芙兰朵露 v1.0.0-beta` / ja `フランドール v1.0.0-beta` / en `Flandre v1.0.0-beta`），`resources.html` 的 `.rs-name` 挂上 `data-i18n`。**只改显示名，`href` 里的 zip 文件名不动**（文件名是中文的，改了链接就 404）。另按站主要求补了 `README.md`（只写开源归属，见第十一节）并把两份授权原文随素材放进仓库。
> 上一轮（第 7 批 3 条）：音源撤换成**一个** `voice dl/芙兰朵露v1.0.0-beta.zip`（33.2MB）—— `ゴースト_A.zip`（65.3MB）与 `林屿.zip`（55.9MB）已从仓库删除，资源页 `.rs-item` 从两条减到一条，i18n 的 `voiceSizeGhost`/`voiceSizeLin` 合并成 `voiceSizeFlan`，顺手删掉没人引用的死键 `titleVoice`；资源简介 `rsIntro` 改成「什么都有可能放 —— 不定时上传本人制作的东西」（三语同步）；个人简介 `bio` 改成站主 2026-10-12 自己在 GitHub 网页端提交的那句半成品声明（保留「18↑一般通过十八线低精力画手」前缀 + 「此网页暂时为半成品，大部分文本为ai自动填写的占位符，请无视。」）。
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
│  ├─ guestbook.js      留言板评论区（读 Cloudflare Worker，见第十五节）
│  ├─ easteregg.js      玩具鸭 + 30 连击故障彩蛋
│  ├─ starfield.js      背景星星字符画
│  └─ config.js         留言板后端地址（`window.DANMAKU_API`，现填 Pages 网址；见第十五节）
├─ server.js             本地预览服务器（纯静态托管 + 本机后台 API）
├─ package.json
├─ worker/               ★ 留言板云端代码（Cloudflare Pages 函数，见第十五节）
│  ├─ guestbook.mjs       全部逻辑（路由 / 规范化 / 限流 / 合并导入），本机可测
│  ├─ functions/[[path]].js  Pages 函数入口：只把请求转给 `guestbook.mjs`
│  ├─ public/index.html    自检页（打开后端根地址看到的那张）
│  ├─ public/_routes.json  只让 `/api/*` 和 `/gb/*` 进函数，其余走静态文件
│  ├─ wrangler.toml        Pages 部署配置（项目名 + `pages_build_output_dir` + KV 绑定 `GB_KV`）
│  ├─ test-guestbook.mjs   本机自测：假 KV + 21 项断言（`node worker/test-guestbook.mjs`）
│  ├─ test-live.mjs        线上体检：对已部署地址真发一条再删掉（`node worker/test-live.mjs`）
│  ├─ dev-server.mjs       本机试跑：8787 端口，假 KV 存 `worker/.dev-kv.json`（已 gitignore）
│  ├─ import-to-kv.mjs     把 `gb/comments.json` 同步到云端（以本机为准；后台删掉的真删）
│  └─ pull-from-kv.mjs     把云端上网友发的留言（含藏起来的）拉回 `gb/comments.json`
├─ 本机试跑留言板.bat       双击 = 起 worker/dev-server.mjs 并打开 127.0.0.1:8787
├─ 推送留言到Cloudflare.bat 双击 = 跑 worker/import-to-kv.mjs（读 .env 的 GB_API_URL / GB_TOKEN）
├─ 拉取云端留言.bat         双击 = 跑 worker/pull-from-kv.mjs（把网友的留言拉回后台）
├─ 启动后台.bat           双击 = 起本机后台（server.js，3000 端口）
├─ assets/
│  ├─ winxp/             ★ 从开源项目 winXP-master 拷来的全部 XP 素材（166 文件 / 266 KB）
│  │  ├─ windowsIcons/   131 个 XP 图标 PNG/ICO（含 start.png、各类系统图标）
│  │  ├─ minesweeper/    30 个扫雷素材（笑脸/LED 数字/格子/雷/旗）
│  │  ├─ sounds/error.wav
│  │  ├─ empty.png       开始菜单「(Empty)」占位图
│  │  ├─ xp-flag.png     自制的 XP 旗标（从 windows.png 裁出并抠掉外圈白底）
│  │  ├─ minecraft.png   自制的 32px 草方块图标（diag/make_minecraft_icon.py 生成）
│  │  └─ LICENSE-MIT.txt winXP 工程的 MIT 授权原文（**必须跟素材待在一起，别删**）
│  ├─ fonts/             像素字体 3 个 woff2（Fusion Pixel Font，OFL）+ LICENSE-OFL.txt（**别删**）
│  ├─ background/        windows.jpg（大背景=XP 蓝天草地）、cute.jpg
│  ├─ icon/              5 个外链图标（mihuashi / gmail / bilibili / x / marshmallow）
│  ├─ stickers/anime/    5 张装饰 GIF（当前页面已不使用，留着备用）
│  └─ star.txt           盲文星星字符画（29 行）
├─ picture/              14 张画作（委托页卡片的例图来源，现在是手工挑选硬编码在 HTML 里）
├─ Easter egg/           1.png / 2.png / 音效.wav（彩蛋资源）
├─ voice dl/             芙兰朵露v1.0.0-beta.zip（33.2MB，第 7 批换上的唯一音源）
├─ diag/                 站主自己的 X 账号诊断资料 + 两个生成用脚本
├─ icon.png              头像（也用作开始菜单头部与欢迎界面头像）
├─ README.md             开源工程归属 + 授权声明（**只写这个**，开发文档是 HANDOFF.md）
└─ .nojekyll             禁用 Jekyll（Pages 必需）
```

> 已删除：`js/danmaku.js`（弹幕屏）、`js/main.js`（时钟+计数器）、`js/gallery.js` + `gallery.js` + `gallery.json` + `refresh-gallery.cjs`（画廊渲染与清单，委托页改成手工挑图后整套废弃，git 历史里能找回）、`server.js` 里的弹幕/SSE 与 `/api/gallery` 接口。
>
> `README.md` 曾在第 4 批被站主要求删掉（当时理由：本文档已够用），**第 8 批站主又要求加回来，但只写「开源工程归属 + 授权声明」**，不写开发细节——两个文档别互相抄：开发/结构/踩坑看本文档，出处与授权看 `README.md`。

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
- 委托页两栏：`.ie-cols`（`302px + 1fr`）、`.cm-side`（左栏，`position:sticky`）、`.cm-panel`；右侧卡片：`.cm-card`、`.cm-card-no`、`.cm-card-price`、`.cm-card-desc`、`.cm-card-shots`、`.cm-sec`、`.cm-contact`
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
  - 右 `.cm-cards` 四张 `.cm-card`，每张按站主参考图版式：标题、`.cm-card-price`（大号蓝字，**值来自 i18n 的 `cmCard1Price~cmCard3Price`，按语言换算货币**）、两行说明、下面三张等宽例图（点开原图）。末尾 `.note-box`（价目备注）。**`<p class="cm-shots-hint">`「点击例图可在新标签查看原图」这条提示站主后来说去掉，四处一起清了：`commission.html`、`js/i18n.js` 的 key、`css/winxp.css` 的规则、`js/admin.js` 文案表的 `['cmShotsHint', '委托页', '例图下方提示']`。**
- 四档：01 白底头像 ¥320-520 / 02 半身插画 ¥600-900 / 03 全身插画 ¥1000-1500 / 04 场景·多人（私信议价）。**01 是站主的真实价，02~04 是我编的占位，等站主改。**
- 例图是**手工挑选硬编码**在 HTML 里的（01=插画53/57/54、02=插画34-RE/47-2/56、03=插画35/67/59、04=插画31/37/62）。换图直接改 HTML 的 `<img src="picture/...">`。
- 例图比例由 `js/winxp.js` 的 `boot()` 按 `naturalWidth/Height` 自动打 `.ratio-sq` / `.ratio-land`（**为将来接后端编辑器留的后路：不要在 HTML 里写死比例字段**）。
- 脚本只要：`js/i18n.js` → `js/config.js` → `js/winxp.js` → `js/starfield.js`。

### resources.html
同款固定浏览器窗。正文三段：资源简介 / 下载（`.rs-item` 一条：名称 + 体积 + `a.rs-dl`）/ 使用说明。
**下载项的显示名走 i18n（`voiceNameFlan`），不是硬编码** —— 名字曾经写死在 HTML 里，切日/英后整页只剩这一个词是中文（第 8 批修掉）。加新资源时照这个模式：显示名进 `DICT`，`href` 指向真实文件名。
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
- **留言存在 Cloudflare Pages 函数 + KV**（第十五节）；前台只剩「读」「发」两件事，**没有 localStorage、没有删除按钮**。
- **每页 8 条（`PER_PAGE = 8`）+ 只有 `‹ ›` 翻页**（站主要求，没有页码按钮）；`.gb-pager` 里是 `#gbPrev` / `#gbPageInfo`（`当前页 / 总页数`）/ `#gbNext`，到头就 `disabled`。
- 每条渲染：名字 / 时间（`YYYY-MM-DD HH:MM`）/ 正文 /（有回复时）站主回复 `.gb-reply`。**不显示头像**（`.gb-ava` 与 `hash()` 已按站主要求删除）。
- 读取：`GET API + 'gb/comments.json'`（`API = String(window.DANMAKU_API||'').replace(/\/+$/,'')`，非空时补一个结尾斜杠；`cache:'no-store'`）；**后端连不上自动回落**读 GitHub Pages 上那份 `gb/comments.json`（只读，仍能看到站主后台里的留言），再失败就显示 `gbErrList` 那条文案，**不白屏**。
- 发送：`POST API + 'api/gb/post'`，body `{name,text}`；昵称留空由服务端存成 `Anonymous`；正文 200 字上限由 `#gbText` 的 `maxlength="200"` + 服务端双重把关。成功后**直接拿服务端返回的这条插进列表**（KV 读取最长 60 秒延迟，重读可能看不到刚发的），不重读。
- 失败弹窗走 `window.XP.msg(标题, 文案)`：`429` → `gbErrRate`（带 `{min}` 分钟数）、`400 long` → `gbErrLong`、连不上 → `gbErrNet`。
- 一律用 `textContent` 写入（防 XSS）；空态 `gbEmpty`、加载中 `gbLoading`；`langchange` 只重渲染、**不重新请求**；发送后回到第 1 页。
- **发送框下面必须写明**「发出后自己删不掉」（`gbHint`，站主要求：访客发之前就要看到；要删只能站主在后台做）。
- 站主回复：`reply` 是三语字段，前台**取第一份填了的（zh → ja → en）**、固定不跟页面语言变（站主原话：「谁用什么语言留言我就用啥语言回复，不需要语言区分」）。

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
- 委托状态写「接受中」（`cmStatusOpen`），换状态只改这个词 —— **后台做好后改状态在后台点，见十二**。
- 例图是手工挑选硬编码在 `commission.html` 里的（现为 4 档 × 3 张），加图要手动补 `<img>`；比例由 JS 自动判定（3:4 / 1:1 / 4:3 三套预设）。**后台做好后例图数据化到 `js/content.js`，见十二**（`content-render.js` 重建 `.cm-card-shots`，比例判定逻辑不变）。
- **站主的后端网站编辑器就是第十二节**：本地 Node 后台，不要写死结构、能数据化就数据化。
- 留言板前端由另一个对话负责、后端存储定成仓库里的 `gb/comments.json`，契约见 12.3；本后台只做管理（删/隐藏/置顶/回复），不负责访客写入。**评论区的后端构思、读/写路径方案与交接边界见第十三节（给另一个会话的交接单）。**
- 扫雷没做中键 chording。
- `assets/stickers/anime/` 里 5 张 GIF 现在都没用到（站主要求去掉页面所有 GIF），留着备用。
- 移动端只做了基础响应式（1180px 隐藏桌面图标、900px 放弃一屏不滚改单列、700px 各面板收窄），没有针对触摸拖拽做优化。
- `diag/icon_sheet.py`（生成图标接触表）、`diag/make_minecraft_icon.py`（生成草方块图标）留着备用；`diag/sheet.png`、`diag/pic_sheet.png` 是挑图标/挑例图用的接触表。`diag/` 其余是站主自己的 X 账号诊断资料。

---

## 十二、本地后台（网站编辑器）

**状态：已实现，并在本机跑通验证（见 12.11）。** 站主需求（m00001）：能改介绍等文案、委托页例图/文本/委托开放状态、上传文件资源；后续追加：留言评论区管理也合并进来。

### 12.1 目标与硬约束

- 不碰代码就能改：三页全部文案（三语）、委托页四档卡片（标题/价格/两行说明/例图 1~6 张）、委托开放状态、资源页下载项、留言区（删/隐藏/置顶/回复）、上传图片与文件、大文件走 GitHub Releases、一键提交并推送。
- 保持**纯静态零构建零依赖**；后台也只用 node 内置模块，**不装任何 npm 包**。
- 后台跑在站主自己电脑（局域网可访问、要密码）；内容进 git 仓库走 Pages 分发；**不重写成 React、不引数据库**。
- 唯一一把钥匙：GitHub 细粒度 token（只勾 `Contents: Read and write`、只授权本仓库），存 `E:\自介网页\.env`，**绝不进仓库、绝不进浏览器**。泄露 = 别人能改这个仓库，碰不到账号其它东西。

### 12.2 文件清单

| 文件 | 动作 | 作用 |
|---|---|---|
| `server.js` | 改 | 静态托管不变；`require('./server/admin.js')` 挂后台路由。缺 `admin.js` 时照旧只跑静态 |
| `server/admin.js` | 新增 | 后台服务端：登录、内容读写、上传、git、Releases（纯 node 内置） |
| `admin.html` | 新增 | 后台界面：朴素紧凑表单 + 少量内联 CSS（站主选的，**不做 XP 皮肤**） |
| `js/admin.js` | 新增 | 后台前端逻辑（原生 JS） |
| `js/content.js` | **生成** | 唯一内容数据文件（后台写、前台读） |
| `js/content-render.js` | 新增 | 把 `CONTENT` 渲染进 DOM（约 60 行，手写） |
| `gb/comments.json` | 新增 | 留言数据。**不能放 `data/`**，那个目录被 `.gitignore` 忽略 |
| `uploads/` | 新增目录 | 后台传的新图 / 小文件；文件名自动 ASCII 化 |
| `.env.example` | 新增 | `ADMIN_PASSWORD` / `GITHUB_TOKEN` / `SESSION_SECRET` / `GIT_PATH` 模板 |
| `.env` | 新增 | 真密码与 token，**gitignore 掉** |
| `.gitignore` | 改 | 补 `.env` |
| 三个 `*.html` | 改 | 各加两行 `<script>`（`js/content.js`、`js/content-render.js`，紧跟 `js/i18n.js` 之后） |

### 12.3 数据契约

`js/content.js`（后台生成、机器写、diff 友好）：

```js
window.CONTENT = {
  "i18n": { "cmCard1Title": { "zh": "…", "ja": "…", "en": "…" } },   // 只放改过的 key
  "commission": {
    "status": "open",                                                 // open | paused | closed
    "cards": [ { "shots": ["uploads/20260101-a3f9.png"] } ]           // 固定 4 项，每项 1~6 张
  },
  "resources": {
    "items": [ { "icon": "assets/winxp/windowsIcons/846(32x32).png",
                 "name": { "zh": "", "ja": "", "en": "" },
                 "size": { "zh": "", "ja": "", "en": "" },
                 "href": "voice dl/芙兰朵露v1.0.0-beta.zip" } ]
  }
};
```

- **文案覆盖**：`content.js` 里只存改过的 key，解析期 `Object.assign` 进 `js/i18n.js` 的 `DICT`（i18n.js 的 `apply()` 在 `DOMContentLoaded` 才跑，时序天然安全）。`js/i18n.js` 只加了两处（`cmStatusPaused`/`cmStatusClosed` 两个状态 key + 导出 `window.getLang`），其余一字未动，删掉 `content.js` 就完全回到加后台之前的样子 —— 就是参考工程那个「DB 优先、静态兜底」的路子。
- **卡片文案**仍走 DICT key（`cmCard1Title/Price/Desc1/Desc2` 等），不另立字段，少一个数据源。04 档无价格、走 `cmPriceTalk`，与现状一致。
- **例图**：`content-render.js` 按数据重建 `.cm-card-shots` 的 `<img>`（1~6 张，超出自动换行），脚本在 `js/winxp.js` 的 `boot()` 之前解析，所以现有的 `naturalWidth/Height` 自动判比例、`ratio-sq/ratio-land` 那套**不用改**。
- **URL 编码**：`href` 允许写非 ASCII 文件名，`content-render.js` 里自动 `encodeURI()` —— 根治「手工百分号编码，编错就 404」那个坑。

`gb/comments.json`：

```json
{ "v": 1,
  "comments": [
    { "id": "c-1735689600000-a3f9", "name": "访客", "text": "留言正文",
      "time": 1735689600000, "pinned": false, "hidden": false,
      "reply": { "zh": "", "ja": "", "en": "" } }
  ] }
```

- 排序：`pinned` 优先，其余按 `time` 倒序（前后台同一套规则）。
- `hidden: true` = 前台不显示、后台留着可恢复；删除 = 从数组移除并提交。
- **写入方是另一个对话**：它需要一个能 commit 这个文件（或提供写接口）的免费服务，本后台不管写入，只读 + 管（增删/隐藏/置顶/回复），每次改之前重新读文件。两边同时写则最后写的赢 —— 量小，不引锁（`ponytail:` 注释）。

### 12.4 接口（JSON，`/api/*`，除 `login` 外都要会话 Cookie）

| 方法 | 路径 | 作用 |
|---|---|---|
| POST | `/api/login` | 校验密码，下发 HttpOnly 会话 Cookie |
| POST | `/api/logout` | 清 Cookie |
| GET | `/api/state` | 返回 `content` + `comments` + git 改动摘要 |
| POST | `/api/save` | 校验并写 `js/content.js` |
| POST | `/api/gb` | 整文件写 `gb/comments.json` |
| POST | `/api/upload?name=&kind=` | 原始字节直传（不走 multipart，免解析），存 `uploads/`，回 `{path}` |
| POST | `/api/release?name=` | 传大文件到 Releases，回公开下载链接 |
| POST | `/api/git` | `git add -A` → `commit` → `push`，原样回显 git 输出 |

### 12.5 后台界面（朴素表单，五个页签）

1. **文案** — 每个字段三语并排（zh / ja / en）。分组标签表写在 `js/admin.js` 的 `LABELS` 里：主页 / 委托页 / 资源页 / 桌面·菜单·杂项 / 其他；**不在表里的 key 自动落「其他」**，所以 i18n.js 以后加 key 后台不会漏。
2. **委托页** — 开放状态三选一（接受中 / 暂满 / 已关闭，新增 2 个 DICT key）；四档卡片：标题 / 价格 / 两行说明 / 例图（上传新图、从 `picture/` 老图里挑、拖动排序、删，1~6 张）。
3. **资源页** — 下载项列表：显示名（三语）、大小（三语）、文件（小文件直传 `uploads/`，大文件走 Releases 并自动回填链接）。
4. **留言** — 列表 + 隐藏 / 置顶 / 删除 / 三语回复；默认只显示未隐藏的。
5. **提交** — 列出改动文件名与增删行摘要，一个「提交并推送」按钮；git 报错原样显示，不吞。

### 12.6 鉴权与安全

- 密码在 `.env`（`ADMIN_PASSWORD`），服务端用 `node:crypto` 的 `scrypt` 比对；会话 = HttpOnly + HMAC 签名的 Cookie，**不引第三方库**。
- 同一 IP 密码错 5 次锁 15 分钟（内存 Map）。
- 绑定 `0.0.0.0`，启动时控制台打印 `http://127.0.0.1:3000/admin/` 与局域网地址（手机同一 WiFi 直接开）。
- 上传白名单类型 + 单文件大小上限；后台不暴露公网。
- `admin.html` 会随 Pages 一起发布（GitHub Pages 发的是整个仓库）—— 它只是个空表单、接口指向本机 `/api`，不含任何秘密；密码和 token 只在 `.env` 里。
- 首次启动缺 `.env` 时自动生成一份（随机会话密钥 + 随机密码）并打印到控制台，站主照着改。

### 12.7 大文件 → GitHub Releases

- 用同一个 token：首次自动创建 tag `assets` 的 release，之后复用。
- 上传：`POST https://uploads.github.com/repos/cupcakeqaq-cloud/CupCakeQAQ-site/releases/{id}/assets?name=<ascii>`。
- 同名 asset 已存在 → 先 `DELETE` 再传；单文件 ≤2GB；拿回的 `https://github.com/.../releases/download/assets/<file>` 自动回填资源页 `href`。
- 不用 Git LFS：Pages 上 LFS 文件不能直接下载。

### 12.8 这轮明确不做

数据库 / React / 多用户 / 图片压缩（超 2MB 后台只提示自己压）/ 留言板前端（另一个对话的地盘）/ 把后台暴露到公网。

### 12.9 站主首次使用

1. 复制 `.env.example` 为 `.env`，填 `ADMIN_PASSWORD` 和 `GITHUB_TOKEN`（建 token 的步骤写在 `.env.example` 注释里）。
2. **双击项目根目录的 `启动后台.bat`**（最省事，见下），或 `npm start`，按控制台打印的地址打开后台。
3. 改完点「保存」，再点「提交并推送」，等 1~2 分钟 Pages 更新。

**`启动后台.bat`（启动器，本批新增）**：双击就完事 —— 它自己 `cd` 到脚本所在目录、按 PATH 找 `node`（找不到就再试 `%ProgramFiles%\nodejs`、`%ProgramFiles(x86)%\nodejs`、`%LOCALAPPDATA%\Programs\nodejs`、`%APPDATA%\nvm`，全都没有就提示去 nodejs.org 装一个然后 `pause` 住不闪退）、起 `node server.js`、3 秒后自动用默认浏览器打开 `http://127.0.0.1:3000/admin/`。**如果 3000 端口已经在监听，它只开页面、不再起第二个进程**。用法就是：双击 → 改内容 → 关掉那个黑窗口就是停后台（重启前记得先点「提交并推送」）。
- 实现注意（踩过的坑，别改回去）：`.bat` 必须存成 **GBK（代码页 936）且不带 BOM**，**不能写 `chcp 65001`**；写成 UTF-8 时 cmd.exe 会把多字节汉字切错，报一串 `'xxx' is not recognized as an internal or external command`（实测过）。node 往控制台写字是走 `WriteConsoleW`，所以 GBK 控制台里 node 的中文照样正常显示，不需要切代码页。等待也不要写 `timeout /t`（stdio 被重定向时它直接报 `ERROR: Input redirection is not supported`），用 `ping -n 3 127.0.0.1 >nul`。
- 本工具会话里**没法验证「双击弹出可见窗口」**：`Start-Process 启动后台.bat` 会卡住、也起不出可见控制台（沙箱/会话限制）；用 `cmd /c "启动后台.bat"` 跑逻辑是通的（实测起了 PID 34208、`admin.html`/`index.html` 都 200），所以启动器本身逻辑是验过的，剩下那步交给站主双击。

**后台要长期开着的话，自己开一个终端跑 `npm start` 最稳**：后台是普通 Node 进程，关掉终端/那个进程，页面就变成「无法连接」。如果它挂在别人的工具会话上（比如我这边用后台任务起的），会话一收摊进程就跟着没了 —— 站主已经踩过一次：页面突然打不开，就是进程没了。重启就是再 `npm start` 一次（或 `node server.js`）；`.env` 里的密码不变，重启后**登录会话会失效，要重新登录**（会话只存在内存里，这是故意的）。
4. 改 `server/admin.js` 之后必须重启进程才会生效（`js/*.js`、`admin.html` 是每次请求现读的，不用重启）。

### 12.10 验证方式

- `node --check` 覆盖 `server/admin.js`、`js/admin.js`、`js/content-render.js`。
- 无头 Edge 打开 `/admin/` 自己看渲染，**不给站主导图**（见第七节）。
- 改一条文案 → 保存 → 前台刷新核对；上传一张图 → 确认 `uploads/` 落地且前台显示；留言隐藏/置顶 → 前台核对。
- 推送是真的推 GitHub，用一次真实文案改动来测（这本身就是功能验收）。
- 收尾删掉一切临时文件与 `diag/shots/`（Pages 会一起发布）。

### 12.11 实现记录 + 验证证据（本批）

与 12.1~12.10 设计稿的**差异，以本节为准**：

- 文案分组表在 `js/admin.js` 里叫 `FIELDS`（`[key, 分组, 中文标签]`），分组为：主页 / 委托页 / 资源页 / 桌面·菜单 / 留言板·彩蛋 / 电源·开机·404 / 其他；DICT 里有、`FIELDS` 里没列的 key 自动落「其他」，以后加 key 后台不会漏。
- 状态三选一实际文案：`open` → `cmStatusOpen`「接受中」/ `paused` → `cmStatusPaused`「暂停接单」/ `closed` → `cmStatusClosed`「已停止接单」。`.cm-open` 上加 `.cm-paused`（棕 `#a06a1f`）/ `.cm-closed`（暗红 `#8a4b4b`），配色加在 `css/winxp.css:945-946`。
- 会话不用 HMAC：`crypto.randomBytes(24)` 的随机 token 存服务端内存 Map，12 小时过期。重启后台 = 全部退出登录（单管理员、本机跑，够用）。
- 12.4 之外还加了 `GET /api/whoami`（决定显示登录框还是后台）与 `GET /api/files`（图库列表）。
- 「提交」页**只列改动文件名**，没有增删行摘要；按钮是「保存 + 提交并推送」，先存后推，防止忘了保存。
- 上传实测限制：图片 `png/jpg/jpeg/gif/webp` ≤30MB，其他 `zip/7z/rar/tar/gz/pdf/txt/mp3/wav/ogg` ≤100MB，超 100MB 走 Releases；存进 `uploads/`，文件名强制 ASCII 化 `YYYYMMDD-原名-6位hex.ext`（非 ASCII 会被剥掉，`芙兰朵露v1.0.0-beta.zip` → `20261012-v1.0.0-beta-0cc6de.zip`）。
- 「留空 = 用默认值」：后台**没法把一句文案改空**（故意的，怕误删）。
- `resources.items` 初始就是现有那一条（href 保持中文名 `voice dl/芙兰朵露v1.0.0-beta.zip`）；列表被清空时前台回落 `resources.html` 里写死的那条。

**顺手修掉的两个真问题**

- `server.js` 的 `serveStatic` 以前会把 `.env`、`.git/config` 也照发出去 —— 后台允许局域网访问，等于把 GitHub token 送给整个局域网。现在**任何以 `.` 开头的路径段一律 403**（实测 `/.env`、`/.gitignore`、`/.git/config` 全部 403）。
- `server/admin.js` 里 `git()` 用的 `execFile` 在 spawn 失败时是**同步抛异常**（不走回调），会把整个 `/api/state` 打挂、后台开不了。已包 try/catch：git 不可用时后台照常打开，「提交」页只显示红字提示。

**验证证据（本机实测）**

- `node --check` 全过：`server.js`、`server/admin.js`、`js/admin.js`、`js/content-render.js`、`js/content.js`、`js/i18n.js`。
- 接口：`/api/whoami` 未登录回 `{authed:false}`；未登录 `/api/state` 401「没登录」；错密码 401「密码不对」；对密码下发 Cookie；`/api/upload` 传 png 回 `uploads/20261012-t31-655e8a.png`，传 `.exe` 回 400「不允许的文件类型：.exe」；`/api/gb` 把非法 id 重写成 `c-<time>-<hex>`、丢掉空正文项、`time:0` 填成当前时间。
- 前台渲染（无头 Edge `--dump-dom` 实测）：改 `bio` 后 `index.html` 的 `<p class="bio">` 显示新文案；`status=paused` 后 `commission.html` 的徽章变成 `<span class="cm-open cm-paused" data-i18n="cmStatusPaused">暂停接单</span>`；01 档例图被重建成 2 张，其中新上传的 png 被 `js/winxp.js` 的 `boot()` 打上 `class="ratio-land"` —— **比例自动判定对重建出来的图依然有效**；`resources.html` 长出第二条 `.rs-item` 且链接正确。
- 后台界面：临时 `_probe.html`（真接口 + 真密码登录，验完已删）dump 了五个页签 —— 文案页 100 个字段三语齐全、委托页状态/例图/图库下拉正常、资源页三语输入与「上传大文件」按钮（无 token 时禁用）正常、留言页的日期/置顶/隐藏/三语回复正常、提交页正常。
- 临时文件全部删除：`_probe.html`、`_tmp-body.json`、`_tmp-gb.json`、`uploads/`（测试上传）、`diag/dom-*.html`、`diag/shots/`。

**提交推送与网络（本批实测，重要）**

- 本批两个提交都推上去了：`85de086`（后台全套 16 个文件）和 `74c7883`（删掉误提交的 `_tmp-git.json`）。远端 `main` 现在就是 `74c7883`，GitHub Pages 已更新（线上实测：`commission.html` 4 块例图共 12 张、状态是默认的 `cmStatusOpen`；`resources.html` 只有 1 条 `.rs-item`；`_tmp-git.json` 在 raw 和 Pages 上都是 404）。
- **踩的坑：`/api/git` 会 `git add -A` 整个仓库**，我用临时文件传提交信息时把 `_tmp-git.json` 一起提交了（已在下一个提交里删掉）。以后给 `/api/git` 传 body 的临时 JSON 一律放仓库外（`$env:TEMP\dsh-gitmsg.json`）。同理：后台点「提交并推送」之前，工作区里不能有任何不想公开的临时文件。
- **本仓库单独配了 git 代理**：`git config http.proxy http://127.0.0.1:7897`（站主本机的代理端口）。原因：不配代理时 `git push` 直连 `github.com:443` 会 `Failed to connect ... after 21s`，而 PowerShell 走系统代理能通 —— git 不读 Windows 系统代理，只读自己的配置和 `HTTP(S)_PROXY` 环境变量。后台 `/api/git` 调的是同一个 git，所以这条配置同时也让后台的「提交并推送」能用。**站主如果关掉/换掉代理**：要么 `git config --unset http.proxy`，要么把端口改成新的，否则推送会连不上。
- `git push` 会走本机 `credential.helper=manager` 的已存凭据，所以**推送不需要 `.env` 里的 `GITHUB_TOKEN`**；那个 token 只用于 `/api/release` 传大文件到 Releases。

**站主实测反馈修掉的 bug（登录不进后台）**

- 现象：站主打开 `http://127.0.0.1:3000/admin/` 和局域网地址，输入密码毫无反应，**连「密码不对」都不弹**。
- 根因：带斜杠的 `/admin/` 是把 `admin.html` 的内容直接发出去，但**浏览器地址栏停在 `/admin/`**，于是页面里那两个相对路径的 `<script src="js/…">` 被解析成 `/admin/js/i18n.js`、`/admin/js/admin.js` → 两个都 404（实测 `/admin/js/i18n.js -> 404`）→ 脚本一行都没执行 → 表单变成死的：点「登录」没反应、回车没反应、也没有任何报错。
- 修法：`server.js` 把 `/admin` 和 `/admin/` **302 到 `/admin.html`**，地址栏变成 `/admin.html` 后相对路径就对了（admin.html 里保持相对路径，这样它扔到 Pages 上也不会烂）。
- 修完实测（无头 Edge 真点）：错密码 → `#loginMsg` 显示「密码不对」；对密码 → 登录框隐藏、后台显示、`#hint` 显示「已读取（N 个文件还没提交）」。
- 顺带：启动时把登录密码打印到控制台（之前只有「首次自动生成」那一次打印，站主根本没看到过）。

**站主下一步就两件事**

1. `.env` 里的 `ADMIN_PASSWORD` 是首次启动自动生成的随机串（只打印在控制台）。想换成好记的就改那一行，然后重启 `npm start`。
2. `.env` 里的 `GITHUB_TOKEN` 目前是空的 → 「上传大文件到 Releases」按钮是**禁用**的。按 `.env.example` 注释建一个细粒度 token（只授权本仓库、权限 `Contents: Read and write`）填进去再重启。不填也能用：改文案、换例图、传小文件、管留言、提交推送都正常。

### 12.12 例图裁剪 + 比例（参数版，本批新增）

站主需求（本轮）：**上传例图时能裁剪自己想展示的部分**。选定的做法是「只存看哪一块的参数，原图像素不动」—— 不新增文件、不掉画质、仓库不变大；已有的例图也能重裁。

**数据契约（12.3 的扩展）**：`commission.cards[i].shots[j]` 现在有两种写法 ——

- 老写法：`"picture/插画53.png"`（没裁剪过、也没指定比例的，文件里一个字符都不变）
- 对象写法：`{"src":"picture/插画53.png","r":"1:1","zoom":2,"cx":0.45,"cy":0.519}`（只写用到的字段）

`r` = 槽位比例，只能是 `"1:1"` / `"3:4"` / `"4:3"` 三个值之一，**不写 = 自动（按原图判定，和以前一样）**；`zoom` = 放大倍数 1~4；`cx/cy` = 显示窗口中心在「放大后的图框」里的比例 0~1（0.5 = 居中）。**`zoom<=1.001` 且没写 `r` 时一律写回纯字符串**，所以没动过的例图都不会被动。夹取范围 `cx/cy ∈ [0.5/zoom, 1-0.5/zoom]`（zoom=1 时只能 0.5，也就是不能平移）—— 这条规则在服务端 `clampPan`、前台 `pan`、后台夹取三处是**同一套**。

**渲染原理**（`js/content-render.js`）：给 `<a>` 加 `.crop` 当裁剪框（`position:relative; overflow:hidden`），里面的 `<img>` 绝对定位、`width/height = zoom*100%`、`left = (0.5-cx*zoom)*100%`、`top = (0.5-cy*zoom)*100%`、`object-fit:cover; object-position:top center`；CSS 在 `css/winxp.css:986-995`。

- 为什么不用 `object-view-box`：Firefox 不支持，裁剪会**静默失效**（看着完全没裁），所以用「绝对定位 + 父级 overflow:hidden」。
- 槽位比例仍按图片自然宽高比来（`content-render.js` 的 `shotRatio` 与 `js/winxp.js:748-758` 同一套规则）；裁剪过的图由 JS 在 `img.onload` 里把真实比例写到 `<a>` 的 `aspect-ratio` 上，没载入前先按 3:4 占位。

**槽位比例也能自己选（每张例图各自选）**：每张例图下面有一个下拉 —— **自动（按原图判定）/ 1:1 方 / 3:4 竖 / 4:3 横**，裁剪弹层里也有同一个下拉。选了比例，前台这个槽位就固定按那个比例显示（多余的部分被 `object-fit:cover` 切掉）；不选就是现在这样按原图自动判定。**现有 12 张例图全是「自动」，没被改动。** 想让一档三张看起来整齐，就三张都选同一个比例。

**后台用法**（`admin.html` 的 `#crop` 弹层 + `js/admin.js`）：委托页每张例图旁有「裁剪」按钮、下面有「比例」下拉；**新上传的图在上传成功后会自动打开裁剪框**。弹层里拖 = 平移，滑块 = 缩放（100%~400%），另有「恢复默认」「取消」「确定」，Escape 也能关。预览框用的就是上面那套算法和 CSS，所以**预览 = 保存后的前台**（实测两边 style 逐字节一致）。

- 精度：`cx/cy/zoom` 存盘保留 3 位小数，预览也按 3 位小数画（`paintCrop` 里的 `c3`），与服务端 `round3` 对齐 —— 不对齐的话预览 `top:-53.75%` 而前台 `-53.8%`。
- 例图上的标记：裁剪过的会显示 `裁剪 2×`，路径旁好认。

**验证证据（本机实测）**

- 接口：`{zoom:1.5,cx:0.6,cy:0.4}` 存进去原样出来，同档另一张仍是纯字符串；非法值 `{zoom:9,cx:5,cy:-3}` → `{zoom:4,cx:0.875,cy:0.125}`（**夹取生效**）；`{zoom:1,…}` → 退回纯字符串。
- 比例：`{src,r:"1:1"}` 存成 `{src,r}`（不写 zoom/cx/cy）；`{src,r:"bogus",zoom:1}` → 退回纯字符串（乱写的比例不认）；`{src,r:"4:3",zoom:2,cx:0.6,cy:0.4}` → 三项并存。
- 前台（无头 Edge `--dump-dom`）：`<a class="crop" style="aspect-ratio: 3 / 4;"><img style="width:150%; height:150%; left:-40%; top:-10%">`；横图 `插画31.png` 的 `<a>` 拿到 `aspect-ratio: 4 / 3`（`img.onload` 补比例那步有效）。
- 前台比例：`r:"1:1"` → `aspect-ratio: 1 / 1` + img `100%/100% left:0% top:0%`；`r:"4:3"` → `4 / 3`；`r:"3:4"` + `zoom:2,cx:0.6,cy:0.4` → `3 / 4` + img `200%/200% left:-70% top:-30%`（与手算一致）。**回归：纯字符串的例图渲染结果和以前一模一样**（没有 `class="crop"`，`js/winxp.js` 照旧打 `ratio-land`）。
- 后台（临时探针：真密码登录、真点按钮、真拖鼠标；验完已删）：360×480 的框、滑块拖到 200%、拖动 (36,-18)px → 存盘 `cx:0.45, cy:0.519`（= `0.5-36/720`、`0.5+18/960`，与手算一致），图旁标记变「裁剪 2×」，**预览 style 与前台 style 完全一致**。
- **顺手修掉一个真 bug（信任边界）**：服务端原来把 `cx/cy` 各自夹到 `[0,1]`、没跟 `zoom` 联动 → 手工发 `{zoom:4,cx:1}` 会让图框只盖住一半（`left:-350%`，右边露底色）。现在三处共用 `clampPan` 的范围。

**站主这边要注意的一件事（本批教训）**

- 站主在浏览器里点「提交并推送」时，后台执行的是 `git add -A` + 提交**整个工作区**。本批我写到一半的裁剪代码和**测试用的裁剪参数**就被 4 个「后台更新内容」提交（`5a65180` / `9a8e49f` / `b54de0e` / `00088b6`）带上了远端，`js/content.js` 里一度是「插画53 放大 4×」的测试数据。已把站主自己的内容原样复原并随本批推上去。
- 所以：**点「提交并推送」之前，先看一眼「提交」页列出的文件名**；里面有你不认识的文件（比如正在开发的临时文件）就先别提交。

---

## 十三、评论区后端：构思 + 方案（**交接给「留言板前端」那个会话**）

> 本文档第 2 节（`js/guestbook.js` 现状）、12.3（留言数据契约）、12.4（后台留言管理）已经写了「是什么」；这一节写**后端到底怎么落地**，以及前台要做到什么程度。**第 13.7 的三件事要站主先拍板，其余可以照做。**
> **（本节方案已落地，见第十五节：站主拍板「能发 / 直发 / 去掉本地 localStorage」，写入通道选的 13.5 里的 C。以下 13.4~13.7 保留原样，只当决策记录看。）**

### 13.1 结论先讲

评论区分两条腿，**读的那条不需要任何新基础设施，现在就能做**：

1. **读**：前台直接读仓库里那个 `gb/comments.json` —— **GitHub Pages 就是它的静态服务器**。本机实测 `https://cupcakeqaq-cloud.github.io/CupCakeQAQ-site/gb/comments.json` → `200`、`Content-Type: application/json; charset=utf-8`，内容就是后台写的那份。所以「后端只读接口」= 一个静态文件，零成本、零第三方、和站主内容一起走 git 历史（可回滚）。
2. **写**（访客提交）：静态站没有服务端，**必须另选一条写入通道**，见 13.5。在站主拍板之前，前台先保留现在的 localStorage 本地留言，远端只读 —— 功能不退步。
3. **绝对不能让前台直接写仓库**：写 `gb/comments.json` 需要仓库写权限，把 token 放进网页 = 任何人拿到就能改你整个仓库（比「评论被刷」严重得多）。唯一的例外是让访客自己的 GitHub 账号授权（那就是 Giscus 那类成品）。

### 13.2 数据契约（**两边都按这个来，别再改**）

顶层：`{ "v": 1, "comments": [ …最多 2000 条… ] }`

单条：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | 必须匹配 `^[A-Za-z0-9_-]{1,60}$`，不合法服务端会重写成 `c-<时间戳>-<4位hex>`（`server/admin.js:321`） |
| `name` | string | 昵称，≤60 字 |
| `text` | string | 正文，≤2000 字；**空正文的条目会被丢掉** |
| `time` | number | 毫秒时间戳；`0`/非法会被填成当前时间 |
| `pinned` | bool | 置顶 |
| `hidden` | bool | 隐藏（前台必须不显示） |
| `reply` | `{zh,ja,en}` | 站主的三语回复，空串 = 没回复（`tri()` 收敛） |

- 校验与裁剪全在服务端（`server/admin.js:317-332` 的 `normComments`）：**写入方只管把原文发过去，别自己按别的长度截断**。
- 前台**必须**用 `textContent` 写正文和昵称（防 XSS），别用 `innerHTML`。
- **排序/过滤规则（写死，免得两边不一致）**：过滤掉 `hidden` → `pinned` 为 true 的在最前 → 其余按 `time` 倒序；分页 **8 条/页**（和现在 `.gb-pager`、`gbPageInfo` 一致）。
- 本地留言的形状是 `{name,text,ts}`（`js/guestbook.js:4` 的 key、`:102` 的写入），跟远端 `time` 不一样：前台内部先归一到 `{name,text,time}` 再渲染；没有 `id` 的旧数据用 `time + name` 当 key。

### 13.3 已经有的东西（别重复造）

- **后台已经能管留言**：`admin.html` 留言页（列表 / 隐藏 / 置顶 / 删除 / 三语回复），接口 `POST /api/gb`（需登录，body `{v:1,comments:[…]}`），读写 `gb/comments.json`，`GET /api/state` 里也带 `comments`。**它只负责管理，不负责访客写入**（`HANDOFF.md:427`）。
- `js/config.js` 的 `window.DANMAKU_API` 是**开关占位，现在代码里没有任何地方用它**；要接外部写入通道就拿它当基址（空串 = 同源），**别再新增全局变量**。
- `js/guestbook.js`（118 行）是现在的前台：localStorage key `cupcake-guestbook-v1`、上限 200 条、8 条/页、只有 `‹ ›` 翻页、按 `ts` 精确删除。改造点就在这里。
- 文案在 `js/i18n.js` 的 `DICT`（三语），相关 key：`gbPlaceholder` / `gbSend` / `gbEmpty` / `gbHint` / `gbName` / `gbTimeNow` / `gbLoading` / `gbErrList` / `gbErrNet` / `gbErrRate` / `gbErrLong`（`gbDelete` 已随删除按钮一起去掉）。**新增文案必须 zh/ja/en 三语补齐**（缺了回落 zh）；**由 JS 托管文案的元素不要加 `data-i18n`**（切语言会打架），JS 里走 `window.t(key)`；新增 key 记得补进 `js/admin.js` 的 `FIELDS` 表（后台文案页按它列条目）。
- 样式：`.gb-*` 那套已经定好（`HANDOFF.md:106`），按钮统一用 `.gb-send` 那一种（`HANDOFF.md:293`），**别另起一套皮肤**；评论区不要头像（`HANDOFF.md:106`，站主明确要求）。

### 13.4 读路径怎么做（前台照这个写）

- 取数据：`fetch((window.DANMAKU_API || '') + 'gb/comments.json')`。`DANMAKU_API` 为空 = 同源相对路径 —— **本地 `node server.js` 和线上 Pages 都是同源**，所以本地也能直接测。
- **Pages 的 CDN 会缓存静态文件**：实测推送 `js/content.js` 后线上约 **10 分钟**才变（加 `?t=<时间戳>` 能立刻拿到新的）。所以站主在后台改完留言，访客最多晚 10 分钟看到。想要即时：请求加 `cache:'no-store'` 或时间戳 query（文件才几十字节，缓存收益可以忽略）。
- **失败兜底**：fetch 失败/超时（离线、被墙）→ 回落渲染 localStorage 里的本地留言，**别白屏、别把别人的本地留言弄丢**。
- 合并策略（如果保留本地留言）：自己的本地留言排在最前、标一句「仅本机可见」，远端留言按 13.2 的规则接在后面。
- 不做：轮询、SSE、弹幕式滚动（老的弹幕屏与 `/api` 弹幕接口都已删除，`HANDOFF.md:78`）。

### 13.5 写路径：五个候选（**要站主拍板，别自己选**）

| 方案 | 访客要做什么 | 站主要做什么 | 代价 / 风险 |
| --- | --- | --- | --- |
| **A. 只读 + 站主手工录/精选** | 不能直接发 | 后台粘贴 / 导入 | 零基础设施、零滥用；本质是「精选留言板」而不是评论区 |
| **B. Giscus**（GitHub Discussions，免费无服务器） | 要有 GitHub 账号并授权 | 开 Discussions、贴 widget | 国内访问 GitHub 不稳；画师粉丝基本没有 GitHub 账号 → 实际几乎没人能留言 |
| **C. 免费云函数/边缘函数**（Cloudflare Workers / Deno Deploy / Vercel） | 打开就能发 | 建服务、部署、配仓库 token 自动 commit | **历史上三次翻车：Cloudflare 被墙 → Deno 额度爆 → Render 要绑卡**；按站主要求，动它之前必须先把限制讲清楚 |
| **D. 本机后台 + 内网穿透**（Cloudflare Tunnel / frp / Tailscale Funnel） | 打开就能发 | 电脑常开 + 隧道常开 | 站主关机就收不到留言；隧道同样有被墙风险 |
| **E. 第三方表单/问卷**（金数据 / 腾讯问卷 / Google Form）收集，站主导出导入 | 打开链接填 | 定期导出 | 零后端、国内可用；多一次跳转、样式不统一 |

- **推荐：先落 A**（读 + 后台管理都已完成，前台只读一把就上线），写入路径等站主拍板再加，**不用推倒重来** —— A 的契约和 C/D/E 完全一致。
- 不管最后选 B–E 哪条，插入端**只做一件事**：把 `POST {name,text}` 规范化成 13.2 的契约，然后追加进 `gb/comments.json`（或直接调 GitHub Contents API 改这个文件）。
- **最低限度的防滥用**（不能省，评论区一旦公开就是垃圾场）：正文/昵称长度裁剪、同 IP 频率限制（同 IP 30 秒 1 条；`server/admin.js` 里的登录限流器可以照抄思路）、正文里的 HTML 一律当纯文本、可选 `hidden:true` 先入审核队列等站主放行。
- **并发**：本机后台和写入服务可能同时改这个文件 → **最后写的赢**（量小、不引锁，`HANDOFF.md:501` 已有 `ponytail:` 注释）。写入服务必须「先 GET 最新文件 → 追加 → 写回」，别缓存整份文档。

### 13.6 交接边界

- **另一个会话做**：前台渲染（改 `js/guestbook.js` 或新文件）、`js/i18n.js` 补三语文案、必要的 CSS（沿用 `.gb-*`）、本机自测。
- **另一个会话别碰**：`server/`（本机后台）、`js/content.js`（后台托管的内容文件）、`js/admin.js`、`admin.html`、`.env`。留言数据文件 `gb/comments.json` 由后台/写入服务维护，**前台只读**。
- 不引新依赖（原生 `fetch` + 现有 DOM 代码足够），不重写页面结构。
- 自测方法：`node --check`；`node server.js` 后打开 `index.html`，核对「空态 / 翻页 / 隐藏不显示 / 置顶在最前 / 三语切换后文案跟着变 / fetch 失败时回落本地留言」；**别留临时文件**（Pages 会一起发布）；**改完把结论写进本文件**。

### 13.7 站主要拍板的三件事

1. **访客能不能直接发留言？** 能 → 从 13.5 里挑一条（各自的硬伤已列）；不能 → 走 A。
2. **先审后发还是直发？** 先审 = 写入时置 `hidden:true`，站主在后台放行；直发 = 立刻出现在前台。
3. **本地 localStorage 留言留不留？** 留 = 只在自己浏览器看得到（现在的行为），去掉 = 前台只显示远端留言。

---

## 十五、留言板后端：Cloudflare Pages 函数 + KV（**已部署 + 线上体检通过** + 站主能管网友留言）

> 站主拍板：**留言存 Cloudflare**（**网站不搬家**，前台仍在 GitHub Pages）、**匿名发言**（GitHub 登录这次不做）、**直发不审核**、**不要人机验证**、**只做基本防护**、**前台去掉删除按钮**、**去掉本地 localStorage**、**两边都有同一条时以本机那份为准（见 15.8）**。第十三节是当时的方案分析（13.5 的 C 方案）。**部署形态在 15.4 从 Worker 换成了 Pages**：`*.workers.dev` 在国内被 DNS 污染 + TLS 阻断（实测证据见 15.5），`*.pages.dev` 实测能连。

### 15.1 站主拍板的决定（照这个做，别再改）

| 问题 | 决定 |
| --- | --- |
| 留言存哪 | **Cloudflare Pages 函数 + KV**（原方案 Worker 弃用，原因见 15.4 / 15.5）；GitHub Pages 继续托管网页，一个字不改 |
| 访客身份 | **匿名**：自己填昵称，留空 = `Anonymous`；**GitHub 登录这次不做**（要做必须服务端持 Client Secret，纯静态站做不到） |
| 先审还是直发 | **直发**（写进去立刻出现在前台，没有审核队列） |
| 人机验证 | **不要** |
| 防滥用 | **只做基本防护**：正文 ≤200 字、同 IP **10 分钟内最多 3 条** |
| 前台删除按钮 | **去掉**，访客发完删不掉；发送框下面必须写清「发出后自己删不掉」（删除只能站主做） |
| 本地 localStorage 留言 | **去掉**，前台只显示远端 |
| 两边都有同一条时 | **以站主本机那份为准**（`gb/comments.json` 覆盖云端），所以置顶 / 隐藏 / 回复 / 改正文都能同步上去；他在后台**删掉的会从云端真删**；**他拉取之后网友新发的照旧保留** |
| 改动范围 | **只能影响访客端**：`server/`、`admin.html`、`gb/comments.json` 一个字没动 |

### 15.2 数据流（两边各管一份，别互相假设）

```
访客（GitHub Pages 上的 index.html）
  │ js/guestbook.js，基址 = js/config.js 的 window.DANMAKU_API（现为 https://cupcake-gb-api.pages.dev）
  ├─ 读：GET  <后端>/gb/comments.json           → {v:1,comments:[…]}（只给没 hidden 的）
  │       连不上 → 自动回落 GET gb/comments.json（GitHub Pages 上那份，只读，不白屏）
  └─ 写：POST <后端>/api/gb/post {name,text}    → {ok:true,comment}
            400 empty / 400 long / 429 rate(+retryAfter) / 500

站主：admin.html（本机 3000 端口）管 gb/comments.json —— 隐藏 / 置顶 / 删除 / 三语回复
      「推送留言到Cloudflare.bat」→ 以这份为准同步进 KV（同 id 覆盖、本机删掉的从云端真删）
      「拉取云端留言.bat」→ 把 KV 里网友发的（含 hidden 的）并回这份，之后站主才管得着
```

- **两张表**：本机后台不知道 KV 的存在，Worker 也不改 `gb/comments.json`。两边靠两个 .bat 对表：**拉取**把网友留言并进本机（含藏起来的），**推送**把本机这份同步回云端。
- `id` 由 Worker 生成：`c-<毫秒时间戳>-<4位hex>`，符合契约 `^[A-Za-z0-9_-]{1,60}$`。
- 云端每条「推送过的」留言都打了内部标记 `synced:true`（只存在 KV 里，接口一律剥掉不外泄）：推送时**本机这份里没有、又打过标的**就是站主在后台删掉的 → 真删；**没有标**的是网友新发的 → 留着。

### 15.3 接口清单与常量（`worker/guestbook.mjs`）

| 方法 | 路径 | 行为 |
| --- | --- | --- |
| GET | `/` · `/gb/comments.json` · `/api/gb/list` | `{v:1,comments:[…]}`；过滤 `hidden` → `pinned` 在前 → `time` 倒序 |
| POST | `/api/gb/post` | body `{name,text}` → `{ok:true,comment}`；`400 empty`（空正文）/ `400 long`（>200 字）/ `429 rate`（带 `retryAfter` 毫秒）/ `500`（KV 没绑或写失败） |
| GET | `/api/gb/admin/list` | 站主「拉取」用：**含 `hidden` 的全部**；头 `x-gb-token` 不对 → `403 denied`（没配 Secret → `500 notoken`） |
| POST | `/api/gb/import` | 头 `x-gb-token` 必须等于 Secret `GB_TOKEN` → `{ok:true,added,updated,deleted,skipped,total}`；**以本机那份为准**：同 `id` 覆盖、打过 `synced` 又不在 payload 里的真删、没标的新留言保留；不符 `403 denied` |
| OPTIONS | 任意 | `204` + CORS（`*`） |

- 常量（文件顶部 `LIMIT`）：`NAME:24` / `TEXT:200` / `IMPORTED:2000`（搬进来时保留后台写过的长正文）/ `PER_WINDOW:3` / `WINDOW_MS:600000` / `MAX:2000`。
- 入口是 `worker/functions/[[path]].js`（Pages 函数只做接线：`onRequest(ctx) → handleRequest(ctx.request, ctx.env)`），**全部逻辑在 `worker/guestbook.mjs`**，所以本机 node 能直接 import 测。Pages 上 `/` 由 `worker/public/index.html` 静态页接管，**自检要开 `/api/gb/list`**。
- KV 绑定名固定 **`GB_KV`**（Cloudflare 里变量名必须一模一样）。
- 留言整份存**一个 key `gb:comments`**；限流 key `gb:rl:<IP>`（`expirationTtl:600`，不会越积越多）。
- **两处有意的取舍**（文件里留了 `ponytail:` 注释）：① 整份存一个 key → 读-改-写，极端并发下可能丢一条；② 同一个 key 每秒只能写 1 次（Cloudflare 限制），同一秒来 4 条不同 IP 的留言，第 4 条可能写失败。个人站量级够用；真要撑住改成「一条留言一个 key」或上 Durable Object。

### 15.4 部署形态与现状（**已部署完成**，2026-10）

**用的是 Cloudflare Pages 项目 `cupcake-gb-api`，不是 Worker。** 原因：Worker 的临时域名 `*.workers.dev` 在国内被拦死（实测证据见 15.5），`*.pages.dev` 实测能连。KV 还是原来那个 namespace，数据不用搬。

| 项 | 值 |
| --- | --- |
| 后端网址 | **`https://cupcake-gb-api.pages.dev`** |
| 入口 | `worker/functions/[[path]].js`（只做接线）→ `worker/guestbook.mjs`（全部逻辑） |
| 只让函数接管的路径 | `worker/public/_routes.json`：`/api/*`、`/gb/*`；`/` 返回 `worker/public/index.html` 那张静态自检页 |
| KV 绑定 | 变量名 **`GB_KV`** → namespace `gb`（id `0727b2d9ef0b41de846e64c8b2d68e19`） |
| Secret | **`GB_TOKEN`**（值 = 本机 `.env` 里那串，两边一字不差） |
| 配置文件 | `worker/wrangler.toml`（`pages_build_output_dir = "public"` + KV 绑定） |

我用的命令（在 `worker/` 目录里跑；站主这台机器上 wrangler 已登录 `cupcakeqaq@gmail.com`，不用再登录）：

```
npx --yes wrangler@latest pages project create cupcake-gb-api --production-branch main
npx --yes wrangler@latest pages secret put GB_TOKEN --project-name=cupcake-gb-api   （值从 .env 的 GB_TOKEN 来）
npx --yes wrangler@latest pages deploy --project-name=cupcake-gb-api --branch=main
```

**以后改了 `worker/guestbook.mjs` 要重新部署，只要再跑最后那条 `pages deploy`。**（`--branch=main` 别省：省了只会出随机预览地址，生产地址不更新。）

- **旧的 Worker 还在**（`cupcake-gb.cupcakeqaq.workers.dev`，同一套逻辑的旧版本），国内连不上、没人用；它的配置 `worker/wrangler.jsonc` 已删（一个目录不能同时放 `wrangler.jsonc` 和 `wrangler.toml`）。不用管它、也不用删。
- **自检地址**：浏览器打开 `https://cupcake-gb-api.pages.dev/api/gb/list` → 看到 `{"v":1,"comments":[]}` 就是好的（**`/` 现在是静态页，不再是接口**）。
- **`GB_TOKEN` 绝不能写进任何网页文件**（`js/config.js` 只放网址，网址公开无害）。钥匙公开 = 谁都能往你留言板塞东西。
- 两个 .bat 写的是 **GBK 编码**（cmd 里中文才不乱码），别用编辑器「另存为 UTF-8」。

### 15.5 免费额度与风险（诚实版，别只看「免费」）

- **Pages / Workers 免费额度**：请求 10 万次/天；**KV** 免费 读 10 万次/天、写 1000 次/天、存储 1GB、**同一个 key 每秒最多写 1 次**（Pages 与 Workers 共用这套额度）。
- **`*.workers.dev` 在国内被拦死（实测证据，2026-10，站主这台机器）**：公网 DoH 查 `cupcake-gb.cupcakeqaq.workers.dev` 真实地址是 `172.67.220.10`，本机解析出来却是 `199.59.150.39`（**DNS 污染**）；强行 `curl --resolve` 到真实 IP，TCP 连上了（1.2 秒）但 TLS 阶段直接 **`Connection was reset`**（SNI 阻断）。同一台机器实测能通：`api.cloudflare.com`（所以命令行能部署）、`github.com`、**`*.pages.dev`**（`astro-paper.pages.dev` 返回 200，本机 DNS 与真实 IP 一致）、`*.deno.dev`。→ 这就是从 Worker 换到 Pages 的原因；**以后别再回头用 workers.dev**。
- **KV 是最终一致的**：写完之后别的地区读到，最长要 60 秒。所以「A 发的留言，B 最多 60 秒后才看到」；A 自己那条立刻显示（前台直接用了接口返回的那条，没重读）。
- 免费额度**不需要绑卡**；Cloudflare 有时会抽查新账号做验证，真被要求绑卡就停下来告诉我。
- **防滥用只有那两条**：有意的攻击者换 IP 可以刷；撞满 1000 次写/天，当天就没人能留言了。要真挡住得上 Cloudflare Turnstile（加验证码）——站主已明确不要，先这样。

### 15.6 本批改了什么 / 没碰什么

- **新增**：`worker/guestbook.mjs`、`worker/functions/[[path]].js`、`worker/public/index.html`、`worker/public/_routes.json`、`worker/wrangler.toml`、`worker/test-guestbook.mjs`、`worker/test-live.mjs`、`worker/dev-server.mjs`、`worker/import-to-kv.mjs`、`worker/pull-from-kv.mjs`、`本机试跑留言板.bat`、`推送留言到Cloudflare.bat`、`拉取云端留言.bat`。
- **删除**：`worker/wrangler.jsonc`（Worker 时代的配置，换成 Pages 用的 `worker/wrangler.toml`）。
- **改动**：`js/guestbook.js`（重写：纯远端、无删除按钮、**地址统一补结尾斜杠**）、`index.html`（留言板那段：`maxlength="200"` + 新提示文案）、`js/i18n.js`（`gb*` 文案：新增 `gbLoading` / `gbErrList` / `gbErrNet` / `gbErrRate` / `gbErrLong`，去掉 `gbDelete`）、`css/winxp.css`（删 `.gb-del` 两条，加 `.gb-reply` / `.gb-send:disabled`）、`js/config.js`（注释 + 填 `https://cupcake-gb-api.pages.dev`）、`js/admin.js`（`FIELDS` 表：加 4 个新 key、去掉 `gbDelete`、改掉 `gbHint` 标签里那句旧吐槽）、`.env` / `.env.example`（**`GB_WORKER_URL` 改名 `GB_API_URL`**，值/说明都改成 Pages）、`.gitignore`（加 `worker/.dev-kv.json`、`worker/.wrangler/`）。
- **没碰**：`server/`（后台服务端）、`admin.html`、`gb/comments.json`、`js/content.js`；**后台的留言长度上限（name 60 / text 2000）和整个后台行为一个字没变**（站主要求）。
- ⚠ **并行改动注意**：第 9 批（第十四节）也在改 `index.html` / `js/i18n.js` / `css/style.css`。本批在这几个文件里的改动点（留言板那一段 HTML、`gb*` 文案、`.gb-*` 样式）与它不重叠，但**两个会话不要同时整文件覆盖写同一个文件**，否则会互相吞掉。

### 15.7 本机验证证据

- `node worker/test-guestbook.mjs` → **21 项全过**：匿名归一化、id 合契约、访客留言强制 `pinned/hidden:false`、排序过滤、10 分钟窗口限流、导入去重 / 保留后台长正文、只留契约六字段、OPTIONS 预检、空库、发一条、空正文 400、201 字 400 / 200 字 200、同 IP 第 4 条 429、限流 key 带 TTL、导入 403、未知路径、没绑 KV 报 500、拉取口没钥匙 403、拉取能看到 hidden 且 `synced` 不外泄、推送时本机删掉的真删且网友新发的保留。
- `node worker/dev-server.mjs`（8787）真跑一遍：`GET /api/gb/list` → `{"v":1,"comments":[]}`；空正文 → 400；正常一条 → `{"ok":true,"comment":{"id":"c-1791809642357-61ad",…}}`；中文昵称/正文经 JSON `\u` 转义发出后**原样存回**（比对 `True`）；连发三次状态码 `200,429,429`（窗口内第 3 条放行、第 4/5 条被拦）。
- 服务返回的 `/js/guestbook.js` 含 `api/gb/post`、**不含** `gb-del`；`/` 含 `maxlength="200"` 与新提示文案。
- **两个 .bat 端到端真跑过一遍**（本机假 KV，跑完已还原 `gb/comments.json` 与 `.env`）：访客 POST 一条 → 「拉取」报「新增 1 条」并落进 `gb/comments.json` → 在文件里给它置顶 + 回复「谢谢你来」+ 隐藏，另加一条只有本机的 → 「推送」报「新增 1 条，更新 1 条，删掉 0 条」，云端读回 `hidden=True pinned=True reply=谢谢你来` → 把那条从文件里删掉再「推送」→ 报「更新 1 条，删掉 1 条」，云端只剩另一条（**网友新发的没被误删**）。
- **部署后线上体检**（对 `https://cupcake-gb-api.pages.dev` 真跑）：`node worker/test-live.mjs` → **16 项通过、0 失败**：探活、空正文 400、201 字 400、正常发一条 200、昵称留空 → `Anonymous`、id 形如 `c-<时间戳>-<4位hex>`、公开列表可见、`admin/list` 无钥匙 403 / 带钥匙 200、`import` 打标 200 / 无钥匙 403、以文件为准清空后真删、清理干净，**外加「前台地址拼出来能打开」那一项**。
- **前台拼地址的坑（已修，别再犯）**：`js/config.js` 里网址不带结尾斜杠，而 `js/guestbook.js` 是 `API + 'gb/comments.json'`、`API + 'api/gb/post'` 拼的 → 会拼成 `https://cupcake-gb-api.pages.devgb/comments.json`：**永远发不出去，读还会悄悄回落成「只读」**（看着像后端挂了，其实是网址拼错）。修法：`var API = String(window.DANMAKU_API||'').replace(/\/+$/,''); if (API) API += '/';`（收尾斜杠只在这一个地方补）。`worker/test-live.mjs` 最后一项专门照抄这个逻辑去真开一次 `/gb/comments.json`，防它复发。
- 本机 3000 端口的服务返回的 `/js/config.js` 含 `pages.dev`、`/js/guestbook.js` 含 `API += '/'`（改完确认过服务端拿到的是新文件，不是缓存）。
- **修「后台删不掉留言」这个 bug（2026-10，站主报的，原因见 15.8）改完重跑**：`node worker/test-guestbook.mjs` → **21 项全过**；`node worker/test-live.mjs` → **17 项通过、0 失败**，其中新增一项「站主流程：拉取打标记 → 后台删 → 推送 → 云端真删了」；体检现在会**先快照云端已有留言再测、测完原样保留**（报「站主云端现有 N 条真实留言，本次体检会原样保留」），不会再误删站主的留言。
- **两个脚本连线上真跑一遍（不是假 KV）**：访客 POST 一条 → 双击「拉取」报「新增 2 条」并且**顺手给云端打了标记** → 在 `gb/comments.json` 里删掉测试那条 → 「推送」报「更新 1 条，删掉 1 条」，云端只剩站主那条 → 再把站主那条也删掉 → 「推送」被防手滑拦下（退出码 9）→ 弹 Y/N 问句按 **Y**（＝`--force`）→ 报「删掉 1 条」，云端清空。**站主那条测试评论就是这样删掉的。**
- **.bat 编码的坑（踩过，别再踩）**：用 PowerShell here-string 往 .bat 里插内容，插进去的是 **LF 换行**，而 .bat 其余部分是 CRLF → cmd 解析 `if errorlevel 9 (` 这类块会散架（报 `'rlevel' is not recognized`）。**写完必须把裸 LF 全部换成 CRLF，再以 GBK（codepage 936）存回**。

### 15.8 站主怎么管网友的留言（已实现：两个 .bat 对表）

站主拍板要做「拉回本机后台管理」。网友留言只在 KV 里，本机后台看不到，所以两边靠两个双击脚本对表：

1. 双击 **「拉取云端留言.bat」** → 把 KV 里网友发的留言（**含他藏起来的**）并回 `gb/comments.json`；同一个 `id` **以本机那份为准**（他自己改过、还没推送的不会被云端覆盖）。
2. 双击「启动后台.bat」→ 在 留言板 页面照常**隐藏 / 置顶 / 三语回复 / 删除**。
3. 双击 **「推送留言到Cloudflare.bat」** → 以本机这份为准同步回云端：同 `id` 覆盖、本机删掉的从云端真删、**他拉取之后网友新发的留言不动**（等下次拉取再进后台）。

- 「站主删掉的」和「网友新发的」靠内部标记区分：推送过的都打 `synced:true`，推送时**本机没有 + 打过标** = 他删的 → 真删；**没有标** = 网友新发的 → 留着。这个标记只存在 KV 里，两个接口都会剥掉（前台和「拉取」都看不到）。
- 顺序很重要：**先拉取 → 再改 → 再推送**。只推送不拉取不会丢留言（网友新发的会被当成「新发的」保留），但站主在后台就看不到那些新留言，得先拉一次。
- **踩过的坑：站主 2026-10 报的「后台删不掉留言」**。以前「拉取」只写本机文件、**不告诉云端**，所以网友那条从来没被打过标记；站主拉取后在后台把它删掉、再推送时，云端只看到「这条我没见过」→ 当成网友新发的留下来 → 表现就是**删不掉**。修法：**「拉取」写完文件后立刻把同一份 POST 给 `/api/gb/import`**，把这批留言都打上标记（`worker/pull-from-kv.mjs` 末段；失败会明确提示「重新拉一次」）。**没改 `worker/guestbook.mjs`，所以线上函数不用重新部署**，只改了本机两个脚本。
- **防手滑**：`gb/comments.json` 为空、云端却还有留言时，「推送」会先拦一下（`worker/import-to-kv.mjs` 退出码 9），防止文件被 git 还原成空的之后一推就把云端清空；**确实要清空**（比如删掉最后一条）就在 .bat 弹出的问句里按 **Y**（等于 `--force`）。

- **仓库变重了（推之前先知道）**：2026-10 这次推送要上传 **101.7 MB**（新对象 96 个），站主这台机器的 Wi-Fi 上传只有约 100 KB/s，**推了 25 分钟才完**（`git push` 期间一直没输出，看着像卡死，其实在传）。这些重量来自 `music/*.mp3`（每首约 10 MB）和 `picture/*.png`（几张 10~17 MB）、`voice dl/萌兰露v1.0.0-beta.zip`（34 MB）——是并行会话和后台「保存 + 提交并推送」`git add -A` 一起带进来的。**以后要加大文件走 Releases，别直接提交进仓库**（HANDOFF 里早有一条同样的提醒）；查「这次要上传多少」可以用 `git rev-list --objects origin/main..HEAD` 配合 `git cat-file --batch-check` 把 blob 大小加起来。
- 三个 .bat 都是 GBK 编码（cmd 里中文才不乱码），且都只会读 `.env` 里的网址和钥匙，不碰任何网页文件。

### 15.9 下一步

1. ✅ 后端**已部署**到 `https://cupcake-gb-api.pages.dev`，线上体检 16 项全过，`js/config.js` 已填好网址。
2. ✅ 站主已在浏览器打开 `https://cupcake-gb-api.pages.dev/api/gb/list`，看到 `{"v":1,"comments":[]}`（＝他这条网络通）。
3. `gb/comments.json` 里已有的留言：双击「推送留言到Cloudflare.bat」搬一次（**现在文件里是空的，可以先跳过**）。
4. ✅ **已推到 GitHub**：`6784623..a27753e main -> main`（站主拍板「所有工程，包括另外一个会话做的网页调整全都推上去」，所以这一个提交里也含第十四 / 十六节的东西）。推完 75 秒后线上已生效：`.../js/config.js` 里是 `window.DANAMKU_API = 'https://cupcake-gb-api.pages.dev'`，`.../js/guestbook.js` 是新的远端版（含 `API += '/'`）。**留言板现在线上就能用了。**
5. 之后日常：双击「拉取云端留言.bat」看网友留言 → 后台处理 → 双击「推送留言到Cloudflare.bat」同步回去（见 15.8）。
6. GitHub 登录这次不做；将来要做必须服务端持 Client Secret，等我评估完再谈。
7. 2026-10 修了站主报的「后台删不掉留言」（原因与改法见 15.8）：改的是**本机两个脚本**，`worker/guestbook.mjs` 一个字没动，**线上函数不用重新部署**。本次提交 `fb95a7a`。

---

## 十一、站主的沟通偏好（重要）

- **要严格执行要求，不要自作主张**。改动前不确定就先问清楚再动手。
- **README 只写开源归属**（第 4 批曾要求删掉，第 8 批又要求加回来）：内容限于「用了哪些开源工程、谁写的、什么授权、用在哪、授权原文在哪」，加上「哪些不是开源」。**开发细节、结构说明、踩坑记录一律留在本文档**，别往 README 里搬 —— 本文档仍是唯一需要维护的开发说明。
- 反馈直接，会说「××有 bug」「××不对」。**别辩解、别写长道歉**，直接修 + 简短说明。
- 讨厌：无意义的装饰、莫名其妙的标签词汇、刻意的设计、低级 emoji 装饰、留白过多。
- 喜欢：紧凑极繁排版、千禧年个人博客味、颜文字分隔线、**XP 界面高还原度**。
- 涉及第三方服务**必须先说清风险和限制**再动手（之前后端方案反复失败：Cloudflare 被墙 → Deno 额度爆 → Render 要绑卡）。
- 沟通用中文。

---

## 十四、第 9 批：错误弹窗高清化 + 音乐播放器 + 字体回归（**已落地，等站主确认配色**）

### 14.1 站主原话与最终拍板（本轮不再重问）

原话（`m00007`）：「网页内触发的所有的错误弹窗都换成高清版本，素材可以试试在 winXP-master.zip 里找」+「新增音乐播放器，做成小组件、能打开窗口、窗口内 UI 必须古早感、要显示歌手信息和封面（难就统一用音乐目录下的 jpg）、目录 `E:\自介网页\music`、播放顺序＝截图序号」。
另加两条硬规则：**① 没把握必须问到清楚为止，问清楚前不许动手；② 此后每一步大改都要写进本文件。**

拍板结果（6 问 6 答）：

| 问题 | 站主决定 |
|---|---|
| 歌名/歌手用 ID3 还是截图 | **「以内嵌为准，截图后面跟的是歌名翻译，只需要根据截图排序就行」** → 显示一律取 ID3 的 TIT2 / TPE1；截图里的「（軌域）」「（替代品）」是**翻译，不显示**；截图**只用来定顺序** |
| 像素体范围 | **只正文回像素体**，XP 外壳（标题栏/任务栏/开始菜单/按钮）保留 Tahoma |
| 字号 | **吸附到 12px / 24px**（像素字体只有 12px 及整数倍才清晰） |
| 假 404 的图标 | **保留 IE 纸页**（`ie-paper.png` 16px 最近邻放大到原生 48px），不换 897 |
| 跳转页要不要播放器按钮 | **不要**（纯后台播放）；另报 bug：**跳转页任务栏一片空白** |
| 跳转页配色 | **「你挑一套配色给我看」** → 由我做主按 XP Luna 蓝统一，改完截图给站主确认 |

### 14.2 素材事实（别再重新侦察）

- `assets/winxp/windowsIcons/` 共 125 个 PNG，**素材包最大只有 48px**（只有 `111(48x48)` `318(48x48)` `334(48x48)` 三张），36 张 32x32，其余 16x16 或无尺寸后缀。
- **码源事实**：winXP-master 的 `src/WinXP/apps/ErrorBox/index.js` 用的错误图标是 **`897(32x32).png`**，`.error__img{width:30px;height:30px}`；其 `apps/index.js` 里 Error 应用的列表图标是 `897(16x16).png`。→ 站主「照着源码来」＝统一 897。
- `897(32x32).png` = 经典 XP 红球 + 白叉；`147(32x32).png` = 纯红叉（**旧的默认图标，本轮退役**）；`310(32x32).png` = 红方块白圈（关机）；`334(48x48)/(32x32)` = 硬盘；`ie-paper.png` = **16×16**（旧 CSS 拿它撑 48px ＝ 全站最糊的一处）；`846(32x32).png` = 原版 Windows Media Player 彩色圆环图标（播放器就用它）。
- `music/` = 12 首 mp3（约 101MB）+ 唯一一张 `日刊：遺書.jpg`（600×600，**全角冒号**）。12 首**全部是 ID3v2.3**、UTF-8、**都带 APIC 内嵌封面 + TIT2 + TPE1**；TPE1 用半角 `/` 分隔（`ぬゆり/GUMI`）；TALB 全是 `日刊:遺書`。
- `music/` 不在 `.gitignore` 里；**站主自己 `git add music/` 后推送**（101MB，本会话不提交 git）。

### 14.3 高清素材怎么做（**整数倍最近邻，不许插值**）

生成目录 **`assets/winxp/windowsIcons/hd/`**（⚠️ 必须和原图标同目录下的 `hd/`，因为 `XP.hd()` 是按 `src` 的目录推出来的；**第一版误放到 `assets/winxp/hd/`，线上 404 变破图**）。文件名 `<原名>@<N>x.png`，N 为**相对素材原生尺寸**的倍数。只生成「显示尺寸 > 原生尺寸」的那几张，不批量放大 125 张：

| 文件 | 原生 | 用途 | 显示的 CSS 尺寸 |
|---|---|---|---|
| `897(32x32)@2x.png` + `@3x` | 32 | 所有错误弹窗图标 | 32px（1× 直接用原生文件，2×/3× 屏吃 @2x/@3x） |
| `334(32x32)@2x.png` + `@3x` | 32 | 我的电脑「设备未就绪」提示 | 32px |
| `ie-paper@3x.png` + `@6x` + `@9x` | 16 | 假 404 的 `.ie404-ico` | 48px（＝原生 3×，1× 就该用 @3x 那张） |

**生成方法：逐像素块拷贝**（`$b.SetPixel($x,$y,$a.GetPixel([int][math]::Floor($x/$m),[int][math]::Floor($y/$m)))`）。
⚠️ **不要用 `Graphics.DrawImage` + `NearestNeighbor`**：源 PNG 带 DPI 元数据时缩放基准会偏移，实测 897 出现 524/1179 个错位像素；块拷贝的复核脚本（`错位像素=` 计数）5 个文件全部 0。

写法固定成「1× 用真实存在的文件当 `src`，再挂 `srcset="…2x, …3x"`」——只登记有高清版的图标，**没有高清版的绝不写 srcset**（会 404 变破图）。CSS 配 `image-rendering: pixelated`（只在整数倍且按原尺寸显示时安全，所以必须成对出现）。

### 14.4 改动清单（按落地顺序）

1. **`js/winxp.js`**
   - `XP.msg()` 默认图标 `147(32x32)` → `897(32x32)`；弹窗图标统一走 `XP.dlgIcon(src, size=32)`，CSS 不再靠 `font-size` 撑大小（`<img>` 带 `width/height` 属性）。
   - `XP.notFound()` 的 `.ie404-ico` 换 48px 高清三档。
   - 新增 `XP.hd(src, size)` 小工具：登记表 `ICON_NATIVE`（原生尺寸）+ `HD_MULT`（有哪几档高清），**只引用真实存在的文件**（唯一真源，弹窗与 404 都走它）。
   - `XP.adopt()`：**固定式窗口也建任务栏按钮**（修「跳转页任务栏空白」）；`addTask()` 里固定窗口点击只聚焦、**不最小化**（最小化会把整页留空），并 `focusWin` 让它显示为按下态。
   - 新增 `rec.onClose` 钩子（`closeWin` 里调用）——播放器关窗＝停止靠它。
2. **`js/easteregg.js`**：两处文字 `⚠`（`spawnError()` 与 `showFeaturedDialog()`）换成 897 高清 `<img class="dlg-ico">`。
3. **`js/apps.js`**：`XP.msg(label, compNotReady, …)` 的 `229(16x16)`（16px 图撑 32px ＝ 2 倍糊）换成原生 32px 的 `334(32x32).png`（光驱图标，语义对得上「设备未就绪」）。
4. **`css/style.css`**：`--font-body` 首位加 `'Pixel'`（XP 外壳的 `--font-ui` 不动、仍 Tahoma）；`.main-col .win-body, .side-col .win-body` 显式用像素体（`.win` 本身是外壳），所以 6 个 XP 应用不受影响；`.dlg-ico` 加 `image-rendering: pixelated`；正文字号吸附 12/24（`.divider` 14→12、`.bio-title` 15→12、`.note-box` 13→12、`.cn` 16→12、`.bio` 14→12、`.social-label` 13→12、`.entry-text` 13→12、`.cm-open` 17→**24**、`.cm-status-note` 13→12、`.cm-steps li` 13→12）。
5. **`js/player.js`（新）** + **`css/player.css`（新）**
   - 单例 `<audio>`（**不放在窗口里**，窗口只是 UI），`XP.register({key:'music', name:'Windows Media Player', icon: ICON+'846(32x32).png', w:430, h:560, build})`。
   - 12 首顺序写死在 `player.js`（数组＝截图顺序）；歌名/歌手/封面走 ID3v2 解析（`fetch` + `Range: bytes=0-65535`，边下边解，解完 `reader.cancel()`，避免为封面拖走整个 8-11MB）；解析失败回落文件名 `歌手 - 歌名.mp3`，封面回落 `music/日刊：遺書.jpg`（`file://` 下 fetch 必失败 → 全走兜底）。
   - UI＝WMP 9 皮肤（蓝黑面板 + 大封面 + 歌名/歌手 + CSS 七段式蓝色 LCD 时间 + 进度条 + 音量 + 上一首/播放/下一首 + 12 首列表），标准一套控件，**打开时不自动播**。播放器文字一律 12px（原 10/11/13px 太小且糊）。
   - **最小化继续播；关窗＝停止**（走 `rec.onClose`）。
   - 跨页续播：`localStorage` 键 `cupcake-music-v1` 存 `{file, t}`（只在播放中写，暂停即清）、音量 `cupcake-music-vol`；跳转页只加载引擎、**不建窗口不建按钮**，加载后接着放；被浏览器拦自动播放就挂一次性 `pointerdown` 续播。
6. **`i18n.js`**：只新增桌面快捷方式名（`deskMusic`，zh 音乐 / ja 音楽 / en Music），播放器 UI 文案沿用「XP 应用界面全英文」的既有约定。
7. **`index.html`**：桌面加第 9 个快捷方式（`data-app="music"`，图标 846）；引 `css/player.css` + `js/player.js`。
8. **`commission.html` / `resources.html`**：只引 `js/player.js`（后台续播），**不加窗口/按钮**。
9. **`css/winxp.css`**：两个跳转页配色统一成 XP Luna 蓝——旧暖米色系（标题 `#8a5a22` / 虚线 `#d8c9ad` / 悬停 `#f7edd8` / 例图底 `#f3ecdd` / 卡片阴影 `rgba(120,80,40,.12)`）全部退役，换成 **`#0c327d` 海军蓝字 + `linear-gradient(180deg,#fbfcff,#c9d7f4)` 标题条 + `#9ab0dd` 描边 + `#eef3fc` 悬停/例图底 + `rgba(12,50,125,.10)` 阴影**；`.cm-panel > h2` 与 `.cm-sec > h2` 用负 margin 顶到面板边缘做成一整条（XP 任务窗格标题条）；`.ie404` 与 `.ie-wrap` 改 `var(--font-body)`（404 页与跳转页正文＝像素体），内容字号吸附 12/24（`.cm-open` 19→24、`.cm-card h3` 21→24、`.cm-card-price` 30→24、`.ie404 h2` 20→24、其余 13/14/15/11.5/12.5→12）；`.desk-icon span` 显式 `var(--font-ui)`（桌面快捷方式名属于外壳，仍是 Tahoma 11px）。

### 14.5 已知限制（先说清楚，别当 bug 修）

- 跨页续播天然有 ~0.2s 断点，且**浏览器可能拦自动播放**（降级为首次点击续播）；这是物理限制，不是代码问题。回到主页也会接着放（同一条 `resume()` 逻辑），不想这样就在主页按暂停。
- 封面走 `fetch` 读内嵌 APIC：`file://` 直接开 HTML 时必然失败（走到 jpg 兜底）；`node server.js` 下 `server.js` **不实现 Range**，所以本地会多下一点数据再 `cancel()`（GitHub Pages 支持 Range，线上只取头部）。解析上限 8MB，超了就不读了。
- `music/` 101MB 进仓库会让 `git clone` 变慢；站主知情并已决定全量上线（**发布前站主自己 `git add music/`**，本会话不提交 git）。
- 无头截图里 `--virtual-time-budget` 下媒体不走时间轴（`currentTime` 停在 0、`t` 不增长），所以「续播后进度前进」没法用截图证明，只能看 mp3 是否被重新请求。

### 14.6 本轮验证证据

命令形态（沙箱策略已是 danger-full-access + 审批 never，不需要再申请升级）：

```
node --check js/winxp.js js/player.js js/easteregg.js js/apps.js js/i18n.js   # 全部通过
& $edge --headless=new --disable-gpu --no-first-run --user-data-dir="$env:TEMP\edge-shot-<随机>" `
  --hide-scrollbars --virtual-time-budget=6000 --window-size=1400,1000 `
  --screenshot="E:\自介网页\diag\shots\x.png" "http://127.0.0.1:3000/<page>"
```

| 验图（`diag/shots/`，gitignored） | 结论 |
|---|---|
| `index.png` | 桌面 **9 个**快捷方式（新增「音乐」/846 图标）；任务栏 4 个按钮（自我介绍 / 委托相关事宜 / 资源配布 / 留言板） |
| `music.png`（经 `_probe.html?act=music` 双击桌面图标） | 播放器窗口成型：**第 1 首内嵌 APIC 封面真的解析出来了**（没走 jpg 兜底）、歌名 おるびたる / 歌手 ぬゆり、七段式 LCD `00:00`、总长 `--:--`、12 首列表顺序＝截图顺序、歌手右对齐、打开时无高亮（**不自动播**） |
| `msg.png` | `XP.msg` 弹窗：标题栏小图标 + 正文 897 红球 **32px 清晰无插值**（并放大 3× 复看确认边缘是硬像素） |
| `nf404.png` | 假 404：`ie-paper` 48px 高清版（放大 2× 复看，蓝 e 与纸页是硬像素块）；标题 24px 像素体 |
| `duck.png`（连点 `#duck` 30 次） | 报错弹窗雨 4 个窗的图标**全部是 897 真图标**（不再是文字 `⚠`） |
| `commission.png` / `resources.png` | 跳转页 Luna 蓝标题条 + 深蓝标题字 + 像素体正文；**任务栏出现「委托相关事宜」/「资源配布」按钮（bug 修复）** |
| `_probe.html?act=xpage`（已删） | 先写 `localStorage['cupcake-music-v1']={"file":"ぬゆり - おるびたる.mp3","t":5}` 再加载 `commission.html`：**mp3 请求数=2、首个请求就是 おるびたる.mp3**（＝跳转页真的接着放）；`MusicPlayer=true`；`任务栏按钮数=1 文案="委托相关事宜"` |

素材正确性另用块拷贝复核脚本验过：`hd/` 里 7 个文件的「错位像素」计数全为 0。

---

## 十六、第 10 批：错误框 OK 按钮照源码 + 自介名号 + 跳转页镂空 + 播放器重做（**已落地，等站主验收**）

### 16.1 站主原话与拍板

> 站主 m00615：「按钮UI有问题（P1）为正常版，P2为我的网页（OK按钮不一致，这个也直接给我去扒源代码），其他地方不用改 / 另外自介名字的字号有问题，太小了，适当调大 / 以及跳转页左右两边太空了，左右各做两条空白镂空并且设置网页背景，背景使用 `E:\自介网页\assets\background\web.jpg` / 有拿不准的地方必须问我」
>
> 站主 m00628：「还有，音乐播放器有问题，会有听完歌后跳转到下一首下一首的进度直接跳了一大半，另外听歌进度全是乱序的 / 以及音乐UI也要重做，做成Windows7那样的frutiger aero 风格，大致草稿为p5，不要做过于花里胡哨的时长显示（音乐的图标改成P4，以及改一下桌面图标顺序，放在留言板下面）」

站主四答（本轮不再重问）：① 跳转页镂空＝**居中白卡、两侧各透一条背景**；② 播放器列表＝**放窗口右侧、可滚动**，窗口**固定长方形**（比例自定）；③ 播放器 bug 现象确认「对，就是这个现象」；④ 自介名字号＝**24px**。

### 16.2 素材事实

- **P4 播放器图标**：源 webp 736×736 RGBA、四角 alpha=0（真透明），alpha bbox `(47,50,691,658)` → 裁成 644×608 → 补正方形 → LANCZOS 缩到 32×32 → **`assets/winxp/music.png`**（2851B）。转换脚本 `diag/mk_music_icon.py`（可重跑）。
  - 坑：**系统 `System.Drawing` 解不了 webp**（报「内存不足」）；用插件自带 Python + Pillow 12.3.0：`C:\Users\CupCakeQAQ_\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\python\python.exe`。
- **`assets/background/web.jpg`**：1200×675、60668B，浅青绿渐变 + 白/青描边星星圆环壁纸（配 Luna 蓝白卡不冲突）。
- **ErrorBox 源码按钮**（`winXP-master/src/WinXP/apps/ErrorBox/index.js`，styled-components 原文）：`width:80px; height:22px; display:flex; border:1px solid black; justify-content:center; align-items:center; box-shadow:inset -1px -1px 1px black`；`:hover:active { box-shadow:inset 1px 1px 1px black; &>*{transform:translate(1px,1px)} }`；容器 `background-color:#f5f5f5; font-size:11px; padding:12px`。

### 16.3 改动清单

1. **`css/style.css`**：`.xp-dialog .dlg-btn` 整条换成源码样式 —— `font-size:11px; width:80px; height:22px; padding:0; line-height:20px; border:1px solid #000; border-radius:0; background:transparent; color:#000; box-shadow:inset -1px -1px 1px #000`，`:active` 反向 + `padding:1px 0 0 1px`（＝源码的 translate，只挪文字不挪边框）；删掉原来的 `filter: brightness()` 两行。**只动弹窗按钮**，`.pw-btn`/`.btn`/`.rs-dl`/`.gb-send` 等 Luna 蓝按钮一律不碰。
2. **`css/style.css`**：自介名字 `.cn` `12px→24px`（像素体只有 12 及整数倍清晰），响应式里 `.side-col .cn` 同步 24px。
3. **`css/winxp.css`**：`.ie-page` 加 `padding:14px 14px 0` + `background:#eaf6fb url("../assets/background/web.jpg") center / cover no-repeat fixed`；`.ie-wrap` 改 `max-width:980px` + 白底 + `border-radius:6px` + `box-shadow:0 0 0 1px #b9c9e8, 0 10px 30px rgba(12,50,125,.18)` ＝ 居中白卡、左右各透一条壁纸。
4. **`css/player.css` 整文件重写**成 Windows 7 Frutiger Aero：`.wmp` 浅蓝玻璃渐变里左右分栏 —— 左 `.wmp-left`（`.wmp-hero`＝`.wmp-screen` **190px** 玻璃高光封面（m00815 微调：148→176→190）+ `.wmp-meta` 歌名 **22px** `#10395f`（m00815：15px 调大）/ 歌手 13px `#5c81a1`，文字在封面旁垂直居中；`.wmp-bar`＝`.wmp-cur` + 凹槽 `.wmp-seek`(`.wmp-seekfill`/`.wmp-knob`) + `.wmp-rem`；`.wmp-ctl`＝30×26 玻璃蓝 `.wmp-btn`（`::before/::after` 画 |◀ ▶ ▶| 与暂停双竖条）+ 音量图标 `690(16x16).png` + 自绘 range），右 `.wmp-right` 214px 可滚动列表（`.wmp-row` 两行式：序号 / 歌名 / 歌手，`.on` 玻璃蓝高亮）。**七段数码管那套 CSS（`.wmp-lcd/.lcd-d/.s0-.s6/.lcd-colon`）整段删除**（站主：「不要做过于花里胡哨的时长显示」）；**「N of 12」计数（`.wmp-count`）已按 m00815 删除**。
5. **`js/player.js`**：删掉 `SEG` 七段表 / `showTime()` / 数码管 DOM / `mkEl()` / 死函数 `esc()` / 没用的 `var ICON`；新增 **`metrics()`**（唯一时间出口）；`build()` DOM 换成上条那套；时间文本＝`00:00` / `-00:00`（「N of 12」随 m00815 一起去掉）；注册改 `XP.register({ key:'music', name:'Windows Media Player', icon:'assets/winxp/music.png', w:620, h:340, build:build })`（**长方形 + P4 图标**）。
6. **`index.html`**：桌面快捷方式顺序改成 我的电脑 → IE → 委托相关事宜 → 资源配布 → **留言板 → 音乐** → 扫雷 → 画图 → Minecraft（音乐从末尾挪到留言板下面），图标换 `assets/winxp/music.png`。

### 16.4 两个 bug 的根因（别再退回）

- **「下一首进度直接跳了一大半」**：切歌那一瞬间 `audio.src` 刚换、`readyState` 已归 0，但 `audio.duration` / `audio.currentTime` **仍能读到上一首播完的值** —— 旧 `render()` 直接读它，于是新歌一出现进度条就在 ~90%。现在 `render()` 与 `seekTo()` **一律只从 `metrics()` 取**（`cur<0 || readyState<1 || !isFinite(duration)` 就返回 `{t:0,d:0}`）。
- **「进度全是乱序」** 同源且更隐蔽：旧 `saveState()` 只判断「没暂停」，于是过渡窗口里会把**上一首的位置配上新歌的文件名**写进 `localStorage`，下次打开就停在一个莫名其妙的位置。现在 `saveState()` 加 `if (!mt.d) return;` 守卫；`pause` 监听也从「一律清状态」改成 `if (audio.paused) clearState()`，避免 `ended → next()` 之后旧播放的 pause 事件把新歌的续播状态清掉。

### 16.5 已知限制

- 无头截图下 `--virtual-time-budget` 不推进媒体时间轴，所以「切歌后进度是否正确」只能验到「UI 立刻归零 + 高亮/歌名/封面跟随」，**实际听感要站主自己跑一遍确认**。
- `.wmp` 里是被窗口 body 包着的（`.win-body` 是 Tahoma 外壳字体），列表里的日文用系统回退字体渲染（像素体只覆盖到 12px 拉丁/汉字/假名区段，播放器属于 XP 应用、按既有约定保持 Tahoma）。

### 16.6 本轮验证证据

```
# 语法
node --check js/player.js        # 通过（PATH 里的 node 与插件自带 node 都过）
# 无头截图（策略已是 danger-full-access + 审批 never，别申请升级；必须看 stderr 的 "N bytes written"）
& $edge --headless=new --disable-gpu --no-first-run --user-data-dir="$env:TEMP\edge-shot-<随机>" `
  --hide-scrollbars --virtual-time-budget=7000 --window-size=1400,1000 `
  --screenshot="E:\自介网页\diag\shots\<name>.png" "http://127.0.0.1:3000/<page>"
```

| 验图（`diag/shots/`，gitignored） | 结论 |
|---|---|
| `index.png` | 桌面快捷方式顺序＝我的电脑/IE/委托/资源/留言板/**音乐**/扫雷/画图/Minecraft（音乐已在留言板下面）；「音乐」图标＝新 P4（CD+蓝音符）；自介名字 24px 明显变大 |
| `music.png`（`_probe2.html?act=music`） | 新 Frutiger Aero 皮肤成型：左大封面（190px，第 1 首内嵌 APIC）＋歌名 おるびたる 22px／歌手 ぬゆり／`00:00 — -00:00`／玻璃蓝走带键＋音量；右栏 `PLAYLIST` 12 行可滚动、两行式（歌名/歌手）、打开时无高亮（不自动播）；窗口 620×340 长方形，标题栏与任务栏图标＝新 P4；**「N of 12」已按 m00815 删除** |
| `_probe2.html?act=next`（报告已删图） | 点播放→点下一首后：`cur=00:00  rem=-00:00  fill=0%  高亮行=02  歌名=DE-Pression` ＝ **切歌后进度归零、不吃上一首的值**（16.4 的修复生效） |
| `msg.png` | `XP.msg('C:\\', "Something's wrong!")`：OK 按钮＝源码同款 80×22 平面黑细边（与 P1 一致），正文仍 897 红球 32px 硬像素 |
| `commission.png` / `resources.png` | `.ie-page` 换成 web.jpg 星纹壁纸，中间 980px 白卡居中、**左右各透一条背景**；卡内仍是 Luna 蓝标题条 + 像素体正文 |

临时探针 `_probe2.html` / `_probe3.html` / `_probe4.html` 与临时验图（`_next.png`、`_pz.png`）用完都已删；`diag/shots/` 里保留 8 张正式验图供站主查看（`diag/` 已 gitignore，不进仓库）。

### 16.7 站主验收后的两次微调（m00815 / 比例锁）

- **m00815**（微调播放器）：封面 `.wmp-screen` 148→**190px**、歌名 `.wmp-title` 15→**22px**（歌手 13px）、**删掉「1 of 12」计数**（`.wmp-count` 的 DOM / `render()` 写入 / CSS 规则全部移除，不是藏起来）；顺手把 `.wmp-hero` 改 `align-items:center`，让歌名歌手在封面旁垂直居中。
- **m00874「比例微调一下固定这样，无论怎么缩放都不会改变比例」→ 第一版做错了**：当时只在 `.wmp` 上写死 620×340 + `transform:scale(var(--wmp-scale))`（`.wmp-body` flex 居中 + `ResizeObserver` 观察 `.win-body` 算系数），结果是**内容等比但窗口外框照旧会被拉长**，被站主 m00911 当场否掉。下面这版才是对的；`fit()` 那套（`--wmp-scale`）**留着别删**，它保证内容不超过窗口。
- **m00874 → m00911 纠正后的最终做法**（站主 `m00911` 原话：「我是说整个窗口比例不变啊，不是内部页面比例不变」）：
  - `css/winxp.css`：`.win.keep-ratio { aspect-ratio: var(--win-ratio); }` + `.win.keep-ratio > .win-body { min-height:0; overflow:hidden; }`（第二行必须写，否则内容的最小高度会把窗口顶高、比例锁不住）；最大化时 `.win.maximized.keep-ratio { right:auto; bottom:auto; border-radius:8px; box-shadow:3px 6px 20px rgba(0,0,0,.45) }`，因为 `.win.maximized` 原本是 `left/top/right/bottom` 全定的铺满写法，**不放掉 right/bottom 就没法只改宽度**。
  - `js/winxp.js`：
    - `XP.openWindow` 里建完窗口后，若 `o.ratio` 存在 → 用**实测外框**算 `--win-ratio`：`cw0 = el.offsetWidth - body.offsetWidth`、`ch0 = el.offsetHeight - body.offsetHeight`，`--win-ratio = (o.w + cw0) / (o.h + ch0)`（≈1.6738，即**站主验收时那个默认窗口的形状**），并给窗口加 `.keep-ratio` 类。比例只在建窗时算一次，之后全交给 CSS，不再做任何 chrome 加减法。
    - `toggleMax`：`rec.ratio` 的窗口最大化＝`ow = min(视口宽-8, (视口高-30-8) * R)`、`oh = ow / R`，只写 `el.style.width`（高度由 `aspect-ratio` 自己跟）+ 居中 `left/top` + 清空 `.win-body` 的内联宽高（否则 flex 的 stretch 被内联宽度挡住、内容填不满），**不铺满屏幕**；还原时只摘 `.maximized`（**别摘 `.keep-ratio`**，那是窗口自带的身形锁）并清掉 `el.style.width`。
    - `bindGrip`：`rec.ratio` 的窗口拖的是**外框宽度**（`el.style.width = ew + dx`）并同样清空 `.win-body` 内联宽高；非锁比例窗口保持原来的「宽高各拖各的」。
    - `XP.launch` 透传 `ratio: app.ratio`；rec 上存 `ratio` 与 `baseW/baseH`。
  - `js/player.js`：注册改成 `XP.register({ …, w:620, h:340, ratio: 620 / 340, … })`（`ratio` 只是「要锁身形」的开关 + 设计比例，实际锁的是外框）。
  - `.wmp` 上的 `fit()`（`min(body.clientWidth/620, body.clientHeight/340)`）保留：外框锁死后内容区比例会有几 px 偏差，`fit()` 保证内容永远不超过窗口（留一点 Aero 渐变边，肉眼无感）。
  - 证据（`--window-size=1400,1000`，`getBoundingClientRect()` 实测）：常态 626×374＝**1.6738**、拖握把 +300/+40 后 926×553.2＝**1.6738**、最大化 1366×816.1＝**1.6738** —— 三个尺寸外框比例完全一致；`diag/shots/music.png` / `music-max.png` 两张图肉眼同形（最大化不再铺满，四周留桌面）。

---

## 十七、第 11 批：个人博客（**本轮新增，边做边在 17.4 追加**）

### 17.1 站主原话与拍板（本轮不再重问）

站主原话要点（m00001）：新增一个功能「个人博客」，主要发布我个人的文章，作用就是普通的博客，用于我个人的感想／生活记录／各种资源存档，但暂时想不到怎么排版显得美观且合理；个人博客通过后端编辑，要求可插入图文。并且此后必须遵守两条规则：**① 在确认有百分百把握做完任务前，务必先让站主回答疑问，直到完全知道该怎么做为止，在此之前不要进行任何操作；② 此后每一步大改都要写到交接文件里。**

两轮问答的拍板（全部由站主点选，不是实现者决定的）：

| 项 | 拍板结果 |
|---|---|
| 排版 | **甲「千禧年博客主站」**：`blog.html` 沿用跳转页的固定式 IE 窗口 + 左 200px 侧栏（站点名／颜文字分隔线／标签／按月归档／最新 5 篇／关于）+ 右主区的列表页与文章页切换 |
| 入口 | 主页主栏整行「个人博客」入口窗（**窗里直接列最近 3 篇标题+日期，点标题直达**）+ 桌面快捷方式 + 开始菜单项 |
| 正文编辑 | **富文本所见即所得**（`contenteditable` + `document.execCommand`，存 HTML），零新依赖 |
| 工具栏 | 加粗/斜体/下划线、H2/H3/正文、无序列表/有序列表/引用、插入图片、插入链接/分隔线/清除格式、图片并排/图片居中（六组全要） |
| 文章字段 | 标题、日期、**标签（多个自由词）**、摘要（手写；留空则前台自动截正文前 120 字）、**置顶**、**草稿**；**不要分类、不要封面图** |
| 草稿 | **真不发布**：草稿存 `blog/drafts.js` 并写进 `.gitignore`（换机器／重装会丢，站主已知并接受） |
| 文章地址 | `blog.html#/文章id`（纯静态，零配置） |
| 语言 | 文章正文单语（写什么显示什么）；博客页面的界面文案走站点三语 i18n |
| 插图 | 传进 `uploads/`，后台在浏览器端自动压到长边 1600px（JPEG 质量 0.85；透明 PNG 仍存 PNG） |
| 评论 | **不做** |
| 附赠 | 做「主页侧栏最近文章小窗」+「博客侧栏站内搜索」；**归档页与 RSS 不做** |
| 重复小窗 | 主页「入口窗 3 篇」与「侧栏小窗 5 篇」**两个都留** |

### 17.2 数据契约（前台/后台按这个来）

```js
// blog/posts.js —— 已发布（会推上线，前台加载）
window.BLOG_POSTS = [
  { id: 'p-1735689600000', title: '标题', date: '2026-02-14',
    tags: ['生活记录'], summary: '', html: '<p>正文…</p>', pinned: false }
];
// blog/drafts.js —— 草稿（.gitignore，只有本地后台读，前台永不加载）
window.BLOG_DRAFTS = [ /* 同形状 */ ];
```

- `id` 决定哈希地址（`blog.html#/p-xxxx`）；排序＝`pinned` 优先，再按 `date` 倒序，同日按数组顺序。
- `html` 允许的标签：`h2 h3 p br strong b em i u s ul ol li blockquote a img figure figcaption hr div span code pre`；属性只留 `href src alt title class`；前台渲染前过一遍白名单清洗（防手抖粘进 `<script>`）。
- 图片块约定：单张＝`<figure class="bl-figure"><img src="uploads/..." alt=""></figure>`；两张并排＝`<div class="bl-row">` 里放两个 `figure`；`.bl-mid` = 居中。

### 17.3 改动清单（按落地顺序）

| # | 文件 | 动作 |
|---|---|---|
| 1 | `HANDOFF.md` | 新增本节（就是这里） |
| 2 | `blog/posts.js`、`blog/drafts.js` | 新增数据层（含 `window.blogRecent(n)`、`window.blogAll()` 小工具） |
| 3 | `.gitignore` | 加 `blog/drafts.js` |
| 4 | `server/admin.js` | 新增 `GET`/`POST /api/blog`（读回/写入 posts+drafts）；**图片上传复用现有 `POST /api/upload?kind=image`，服务器端不改上传逻辑** |
| 5 | `admin.html` | 加引 `blog/posts.js` + `blog/drafts.js`；博客页签用的少量样式 |
| 6 | `js/admin.js` | `TABS` 加「博客」；新增 `viewBlog()`、编辑器与元数据表单、`act` 前缀 `b-*` 的点击/输入处理；`FIELDS` 登记新 i18n key（分组「博客」） |
| 7 | `js/admin.css` | —— 后台样式是 `admin.html` 内联 `<style>`，所以第 7 项并入第 5 项，**不新建 css 文件** |
| 8 | `blog.html`、`css/blog.css`、`js/blog.js` | 前台博客页（hash 路由 / 列表 / 文章 / 标签 / 搜索 / 侧栏） |
| 9 | `index.html` | 主栏整行「个人博客」入口窗（最近 3 篇）+ 侧栏「最近文章」小窗（5 篇）+ 脚本引入 |
| 10 | `css/style.css` | 补 `#blogEntry` 的栅格位置并顺延 `#guestbook` 的行 |
| 11 | `js/winxp.js` | `NAV` 加「个人博客」（开始菜单项）；`index.html` 加一个桌面快捷方式 |
| 12 | `js/i18n.js` | 博客文案三语 key（含入口窗、前台博客页、侧栏小窗） |

### 17.4 实现记录 + 验证证据

**新增文件**

| 文件 | 规模 | 干什么 |
|---|---|---|
| `blog/posts.js` | 30 行 | `window.BLOG_POSTS = []` ＋ `window.blogAll()`（置顶优先 → 日期倒序）、`window.blogRecent(n)`。**工具函数在文件上半部、数据永远在最底下**，后台保存时从 `window.BLOG_POSTS` 那一行往后整段重写，所以手写的注释和工具不会被冲掉 |
| `blog/drafts.js` | 8 行 | `window.BLOG_DRAFTS = []`；已进 `.gitignore`，前台从不加载 |
| `blog.html` | 122 行 | 前台博客页：固定式 IE 窗口（`data-fixed`）+ `.ie-home`（后退 / `← 返回主页` / 地址栏）+ `.ie-page > .ie-wrap > .bl-cols`（左 `.bl-side`、右 `#blMain`） |
| `css/blog.css` | 118 行 | 博客页与两个小窗的样式（全 `.bl-*`），沿用跳转页的纸面配色 |
| `js/blog.js` | 205 行 | 前台唯一脚本：哈希路由（`#/`、`#/p-xxx`、`#/tag/词`、`#/month/2026-02`、`#/search/词`）、列表/文章/标签/月归档/搜索、侧栏（标签计数＋按月计数＋最新 5 篇）、主页两个小窗（3 篇 / 5 篇）、正文标签白名单清洗 `clean()`、摘要兜底 `plain().slice(0,120)`；`langchange` 时全部重画 |
| `server/test-blog.js` | 42 行 | 零依赖自检：`node server/test-blog.js`（写→读回→清空→再读，顺带拦「后台保存把工具函数冲掉」这个坑） |

**改动文件**

| 文件 | 改了什么 |
|---|---|
| `server/admin.js` | 31-32 行加 `BLOG_JS`/`BLOG_DRAFT_JS`；319-376 行加 `readJsArray/writeJsArray/normPost/normPosts`（读＝用 `^window\.XXX\s*=` 正则定位后 `JSON.parse`，写＝保留前面的注释再重写整段）；535 行 `/api/state` 多回一个 `blog:{posts,drafts}`；568-580 行新增 `POST /api/blog`；662 行 `_test` 多导出四个函数。**图片上传复用现有 `/api/upload?kind=image`，服务器端上传逻辑一行没改** |
| `js/admin.js` | 70-72 行 `FIELDS` 加三个「博客」分组文案；271-279 行 `sync()` 收下 `blog`；284 行 `TABS` 加「博客」；298 行 `render()` 分支；423-620 行编辑器（`FMT` 走 `document.execCommand`、`BACT`＝插图/居中/两图并排/拆开并排、`bShrink()` 在浏览器端压到长边 1600px）；960-1035 行 `b-*` 动作分派；1084 行 mousedown 保住正文选区（不然点工具栏就把选区丢了） |
| `admin.html` | 只加 `.bl-*` 后台样式（77-94 行）。**故意不引 `blog/posts.js`**——后台数据从 `/api/state` 拿，引了文件反而会在保存后读到旧数据 |
| `css/style.css` | 161-193 行：双栏布局。**现状（见 17.8）**：主栏两行（委托＋资源并排 → 留言板整行）；侧栏「自介 `flex:1` 撑满 ＋ `#blogEntry` `flex:none` 贴底」；撑满规则只管主栏 `.main-col > .win` |
| `index.html` | 11 行引 `css/blog.css`；36-38 行桌面快捷方式「个人博客」（图标 `327(32x32).png`）；134-147 行侧栏底部的「个人博客」入口窗（`#blEntryList`，最近 5 篇 ＋ 进入按钮，**位置见 17.8**）；154 行起主栏只有委托／资源／留言板；253-256 行按顺序引 `blog/posts.js`、`js/blog.js` |
| `js/winxp.js` | 486 行 `NAV` 加一项 `{key:'blog', nameKey:'menuBlog', icon: ICON+'327(32x32).png', href:'blog.html'}`（开始菜单里出现） |
| `js/i18n.js` | `DICT` 加 25 个 `bl*` 文案（225-267 行），三语都写全 |
| `.gitignore` | 加 `blog/drafts.js` |

**验证证据**

1. `node --check` 过：`js/blog.js`、`js/admin.js`、`js/i18n.js`、`js/winxp.js`、`blog/posts.js`、`blog/drafts.js`、`server/admin.js`。
2. `node server/test-blog.js` → `✓ 博客数据读写自检通过`。
3. 端到端（真起服务器、真走 HTTP，脚本 `diag/bl-e2e.js`）：登录拿会话 → `POST /api/upload` 传图 → `POST /api/blog` 写 3 篇（1 篇置顶、1 篇含 `.bl-row` 并排图＋居中图＋引用、1 篇草稿）→ `GET /api/state` 读回 `posts=3 drafts=1 置顶=1 标签=["公告","置顶"]`，并排的 `class="bl-row"` 原样保住 → 再 `--reset` 清空并删掉测试图。**交出去的仓库是干净的：`blog/posts.js`、`blog/drafts.js` 都是空数组，`uploads/` 里没有测试图。**
4. 静态自检（脚本 `diag/bl-check.js`，20 项全过）：132 个文案 key 三语齐全；5 个 HTML 里 90 处 `data-i18n` 都有对应 key；`js/blog.js`＋`js/admin.js` 里 12 个 `t()` key 存在；`FIELDS` 里 131 个 key 全存在；HTML 引用的本地文件全部存在；`blog.html`/`index.html` 都没引草稿；`js/blog.js` 用的 8 个元素 id 在页面上都存在；排序结果 `cba`、`blogRecent(2)`＝`cb`。

**视觉验收（一开始做不到，后来做到了）**：早期沙箱不让拉无头浏览器 —— `msedge --headless` 被拒（crashpad `OpenProcess: 拒绝访问 (0x5)`），`Start-Process` 直接 `Access is denied`，一张截图都没写出来，所以第一轮只有文件级／DOM 契约级检查。**会话后半段沙箱策略改成 danger-full-access 之后截图跑通了**，用第 7 节那个无头 Edge 配方（`--headless=new --hide-scrollbars --virtual-time-budget=7000 --window-size=1400,1000`），截图只放 `diag/shots/`（已 gitignore，自己看，不给站主导出）：

- `diag/shots/bl-list.png`：博客列表页（3 篇示例）—— 标签计数、按月归档、「最近更新」、日期／置顶／标签徽章、摘要与「阅读全文」全部对位。
- `diag/shots/bl-post1.png`：文章页 —— 正文排版（H2/H3、列表、引用、行内 `code`／`pre`）、`figure.bl-figure.bl-mid` 单图居中＋图注、`.bl-row` 两张并排，都对；`.ie-page` 内部滚动、窗口固定不动。
- `diag/shots/bl-index.png`：主页 —— 主栏两行（委托＋资源 ／ 留言板整行）、留言板拿回高度、侧栏「自介撑满 ＋ 博客入口贴底」。
- 空状态（0 篇）也截过：`blog.html` 与入口窗都显示「还没有文章…第一篇正在酝酿中♡」。

站主仍建议自己开 `http://127.0.0.1:3000/index.html`、`/blog.html`、`/admin/` 扫一眼（我的截图是 1400×1000 这一种窗口尺寸）。

### 17.6 如果站主觉得不合适，最省事的两个改动

1. **侧栏那个博客入口窗还是太高**：`js/blog.js` 的 `homeFill()` 里 `mini(all(), 5)` 改成 `3`，能省约 40px（入口窗里的最近文章从 5 篇变 3 篇）。
2. **图标不合适**：`assets/winxp/windowsIcons/` 里任选一个 32×32 的 png，替换 `index.html` 桌面快捷方式与 `js/winxp.js:486` 两处路径即可，其它地方不用动。

### 17.7 站主验收后的调整：入口与最新内容合并成一个窗

站主原话（附主页截图）：「**最近更新直接把自介覆盖掉了**，调整一下，先给我提出方案再进行修改」。

**病因**：`css/style.css` 的通用规则 `.main-col > .win, .side-col > .win { height: 100%; min-height: 0; }` 是给「侧栏只有一个窗、撑满侧栏」写的。新加的侧栏小窗 `#blogRecent` 也吃到了这条，于是它自撑满整个侧栏、把 `#profile` 挤成 0 高（截图里只剩一条标题栏那个就是自介窗）。当时给它加的 `flex: none` 管不住 `height`，所以没生效。**教训：往 `.main-col` / `.side-col` 里加第二个窗之前，先看这两条通用规则。**

**站主定案（不用甲乙丙三案，直接合并）**：主页的「博客入口」和「最新内容」合并成一个窗 —— 主栏那一个「个人博客」窗里：一行说明 ＋ **最近 5 篇（日期＋标题）** ＋ 进入按钮；侧栏的「最近更新」小窗删掉，侧栏回到只有「自我介绍」撑满一屏。

**本次改动**

| 文件 | 改了什么 |
|---|---|
| `index.html` | 删掉侧栏那个 `#blogRecent` 小窗（原 134-143 行，含 `#blSideList`） |
| `css/style.css` | 删掉 `.side-col > #blogRecent { flex: none; }`（原 192 行），并把双栏布局的注释改回「侧栏只有自介一个窗」 |
| `js/blog.js` | `homeFill()` 里入口窗的 `mini(all(), 3)` → `mini(all(), 5)`，去掉 `#blSideList` 那一支；头部注释同步改成「主页入口窗里的最近文章」 |

**验证**：`node --check js/blog.js`、`node server/test-blog.js` 通过；`node diag/bl-check.js` 20 项全过（其中「js/blog.js 引用的元素 id 在页面上都存在」这条会在漏删 DOM 时立刻报错）。视觉仍请站主自己刷新 `index.html` 确认（沙箱开不了无头浏览器，见 17.4 末段）。

### 17.5 已知限制（先说清楚，别当 bug 修）

- 草稿只在本地 `blog/drafts.js`（`.gitignore`）：换电脑、重装、`git clean` 都会丢，后台里删掉草稿不可恢复。
- 文章地址是哈希地址（`#/p-xxx`）：搜索引擎收录一般，站外分享链接带 `#`。
- 正文是站主自己写的 HTML，前台只做标签白名单清洗，不保证样式完全一致（前台 CSS 会统一控制正文排版）。
- 富文本用 `document.execCommand`（已废弃但各浏览器仍支持）：只保证 Chrome／Edge（站主用的后台环境）表现正常。

### 17.8 站主验收后的调整：博客入口窗挪到侧栏底部（m00575）

站主原话：「**现在的问题是留言板空间被挤压了，给我一个排版优化方案并且在我确认后实践**」。我先出了四个方案（甲 入口窗挪侧栏／乙 主栏一行三格／丙 原地把入口窗压矮／丁 允许整页滚动），站主回：「**侧栏底部不行吗。。。。**」→ 按「侧栏：自介在上撑满 ＋ 博客入口窗贴底」实施（等价于甲，只差入口窗在侧栏的上下位置）。

**病因（布局机制，以后往主栏加窗先看这条）**：留言板是主栏里唯一吃 `minmax(0, 1fr)` 的行 —— 主栏每多出一行 `auto` 高度，留言板就少同样多。博客入口窗（5 篇时约 200px）整行插在主栏第一行，留言板就正好少了这 200px。而 `.page` 的高度是 `calc(100vh - 30px)` 且 `overflow: hidden`（整页不滚动、窗口内部自己滚，是既有设计），所以视口一矮就压得很难看。**教训：`1fr` 的那一行是「剩下的都给它」，其它行的高矮都从它身上扣。**

**本次改动**

| 文件 | 改了什么 |
|---|---|
| `index.html` | `#blogEntry` 整段（含 `#blEntryList`）从 `.main-col` 挪进 `aside.side-col`（`#profile` 之后、`</aside>` 之前，现在在 134-147 行）；主栏注释改成「两个跳转入口 + 留言板」 |
| `css/style.css` | 主栏回到两行：`grid-template-rows: auto minmax(0, 1fr)`，`#commissionEntry`/`#resourcesEntry` 回 `grid-row: 1`、`#guestbook` 回 `grid-row: 2`；删掉 `.main-col > #blogEntry` 那条；加 `.side-col > #blogEntry { flex: none; }`；撑满规则收窄成只管主栏 `.main-col > .win { height: 100%; min-height: 0; }`（侧栏：自介 `flex:1` 撑满剩余、博客窗按内容高度） |
| `js/blog.js` | **一行没改**：填的还是同一个 `#blEntryList`，窄了也不会坏 |

**效果**：主栏完全恢复成「委托＋资源并排 ／ 留言板整行」的原样，留言板拿回约 200px；侧栏变成「自介（撑满剩余）＋ 博客入口（贴底）」。

**验证**：`node diag/bl-check.js` 20 项里 19 项过（唯一没过的仍是「`blog/posts.js` 现在有 3 篇示例」那条故意的，见 17.9）；元素 id 契约检查通过。视觉请站主刷新确认（沙箱开不了无头浏览器，见 17.4 末段）。

### 17.9 临时给站主看效果的 3 篇示例文章（已按站主选择删掉）

`diag/bl-seed.js`（临时脚本，`diag/` 已 gitignore）：`node diag/bl-seed.js` 往 `blog/posts.js` 写 3 篇示例（置顶 ＋ 全格式 ＋ 无摘要 ＋ 标签），`node diag/bl-seed.js --reset` 一条命令删光 —— **本地想再看排版随时能再塞回来**。站主选「先删掉 3 篇示例再推」后已执行 `--reset`：`blog/posts.js`／`blog/drafts.js` 都是 0 篇，`node diag/bl-check.js` **20 项全绿**（之前没过的第 20 项就是这条）。

### 17.10 推送到 GitHub（本轮）

站主原话：「**先直接把更新推到GitHub上吧**」。

- 提交 `c3c67a4`：`个人博客：新增前台 blog.html（列表/文章/标签/月归档/搜索）与后台「博客」页签（富文本、草稿、插图压缩）+ 主页侧栏入口`，14 个文件、+1162 / −16；`5ff2b71..c3c67a4  main -> main`，本地与远端已同步。
- 用命令行 git 推（exe 路径见第 8 节）。**`blog/drafts.js` 没上线**（`.gitignore:2` 挡住，`git check-ignore -v blog/drafts.js` 验证过）；`diag/` 也没进仓库；没有 music／voice dl 之类大文件被顺带加上。
- **坑 1（以后推送必看）**：git 全局配了 `http.proxy = http://127.0.0.1:7897`。站主的代理软件没开时，`git push` 直接报 `Failed to connect to github.com port 443 via 127.0.0.1`。绕过办法：`git -c http.proxy= push origin main`（本轮就是这么推上去的；直连需要沙箱外，见坑 2）。
- **坑 2（本会话特有，不是站主环境的问题）**：我这轮起的后台服务器跑在沙箱里，后台自己的 git 调用拿不到输出 —— `/api/state` 回 `{"ok":false,"error":"调用 git 失败：spawn EPERM"}`（沙箱不允许子进程用管道抓 stdout，Node 的 `execFile` 默认就是管道）。**站主照常 `启动后台.bat` 不受影响**，后台「提交」页该怎么用还怎么用。

### 17.11 截图验收时顺手修的一处 ＋ 一个已知遮挡

1. **修了（`css/blog.css`）**：`.bl-title` / `.bl-tagline` 原来是行内元素，在 238px 的博客侧栏里站名和副标题挤在一行，「资源存档」被折到第二行（第一版截图里很难看）。改成两者各占一行（`.bl-tagline` 加 `margin-top: 4px`）；顺手删掉那条不起作用的 `.bl-lead { gap: 6px; }` —— `.cm-panel` 不是 flex 容器，`gap` 本来就没效果。
2. **已知遮挡（不是 bug，但站主得知道）**：`css/style.css:326` 的鸭子玩具 `.duck { position: fixed; right: 6px; bottom: 18px; z-index: 85 }`，按同文件 134-135 行那段注释是**故意压在所有窗口之上**的「桌面玩具」。博客入口窗现在贴在侧栏最底部，正好在它脚下：玩具会盖住窗口右下角一块（正文左对齐，正常长度的标题都在玩具左边，只有极长标题的尾巴可能被挡）。要彻底避开只有三条路 —— 入口窗挪回自介上面（站主已否）、侧栏底部留白（站主讨厌留白）、或把 `.duck` 的 `right`/`bottom` 挪几像素。**等站主定，本轮不动。**
3. 本轮 `blog/posts.js`／`blog/drafts.js` 已再次清空（截图用的 3 篇示例又 `--reset` 掉了），`node diag/bl-check.js` 20 项全绿。

---

## 十八、第 12 批：首篇置顶文章（介绍功能 + 开源素材）+ 主页置顶标记（**本轮**）

### 18.1 站主原话与本轮拍板

站主原话（m00001）：「**我现在想发置顶文章，主要介绍一下此网站的功能（以及使用了哪些开源素材）**；顺便帮我检查一下网站博客的置顶功能是否正常／置顶文章标题能否显示在主页博客栏上」。并再次确认两条规则：**① 确认百分百把握前必须先让站主回答疑问，在此之前不要操作；② 此后每一步大改都要写进交接文件。**

三轮问答的拍板（全部由站主点选）：

| 项 | 拍板结果 |
|---|---|
| 文章怎么落地 | **我只给文案，站主自己在本地后台 `/admin/` 粘贴保存**（不写进 `blog/posts.js`） |
| 篇幅 | 中等，约 800 字，分节，每个功能一句 + 素材授权清单 |
| 配图 | **纯文字，先上线**（不上传截图、不插图） |
| 主页置顶标记 | **加 ★**（复用列表页的 `.bl-pin` 徽章，只改 `js/blog.js` 一行） |
| 后台粘贴方式 | 站主选「**只要纯文字，自己排**」→ 所以**不做预览页、不给 HTML 源码**给站主往 contenteditable 里粘（直接粘 HTML 源码会变成字面文本，这个坑已知） |
| 标题 / 标签 / 日期 | 「本站使用说明：功能一览 + 开源素材感谢名单」／`公告`、`站务`／`2026-10-18`；**摘要留空**（前台自动截正文前 120 字） |
| 自我说明 | 文章里**要提「AI 协助开发」**，措辞由实现者拟、站主确认（见 18.6） |

### 18.2 置顶功能检查结论（站主要问的两个问题）

**① 置顶功能本身正常**，链路四处都对得上（改前状态）：

- `blog/posts.js:17-23` `window.blogAll()`：`pinned` 优先，再按 `date` 倒序（同日按数组顺序）；`blogRecent(n)` 用的就是它。
- `js/blog.js:70-73` `metaOf()`：**博客列表页与文章页**的 `pinned` 会渲染成「置顶」徽章 `<span class="bl-pin">`（样式在 `css/blog.css:66-69`，10px 橙底小徽章），文案 key 是 `js/i18n.js:255` 的 `blPinned`（zh 置顶 / ja 固定 / en Pinned）。
- 后台 `js/admin.js:497` 有「置顶（前台排最前面）」勾选框，`server/admin.js:384` 落盘时 `pinned: !!p.pinned` 保留。
- 排序验证：`node diag/bl-check.js` 的用例集 `{a 2026-01-01, b 2026-03-01, c 2025-01-01 pinned}` 排序得到 `cba`、`blogRecent(2)` 得到 `cb`。

**② 主页博客栏（侧栏入口窗 `#blogEntry` > `#blEntryList`，`index.html:144`）原本只显示「日期 + 标题」**，`mini()` 里没有置顶标记 —— 置顶文章会排在第一条，但看不出它是置顶的。本轮按站主选择补上 ★。

### 18.3 改动清单

| # | 文件 | 动作 |
|---|---|---|
| 1 | `js/blog.js` 170-174 行 `mini()` | 置顶文章在日期后面插 `<span class="bl-pin">★</span> `，**直接复用博客列表页那个徽章 class，零新增 CSS**。`mini()` 同时供给主页入口窗（5 篇）与博客页侧栏「最新更新」（5 篇），所以两处一起生效 |
| 2 | `diag/bl-check.js`（gitignore，本地自检） | 新增 `[7] 主页置顶标记` 两组断言：`js/blog.js` 的 `mini()` 必须带 ★ 标记；`css/blog.css` 必须有 `.bl-pin` 样式。总数 20 → **22 项** |
| 3 | `HANDOFF.md` | 本节 |

**未改**：`blog/posts.js`（仍是空数组，站主自己粘）、`blog.html`、`css/blog.css`、`js/i18n.js`、后台（`js/admin.js` / `server/admin.js`）—— 一行都没动。

### 18.4 验证证据

- `node --check js/blog.js` → 通过。
- `node diag/bl-check.js` → **22 项全过**（含新增的两项：「js/blog.js 的 mini() 给置顶文章加了 ★ 标记」「css/blog.css 里有 .bl-pin 徽章样式」；「blog/posts.js 与 blog/drafts.js 都是空的」这项也仍然通过，因为文章由站主自己粘进后台，本轮没往数据文件里写东西）。
- **别在本会话再起服务器**：站主自己的 `启动后台.bat` 已经占着 3000 端口（`node server.js` 报 `EADDRINUSE 0.0.0.0:3000`）。`Get-NetTCPConnection -LocalPort 3000` 在沙箱里会误报「free」，**判断端口要直接 `Invoke-WebRequest` 探一下**。已探明 `http://127.0.0.1:3000/blog.html` → 200、`/admin/` → 200、`/index.html` → 200，且服务出去的是**改过的新 `js/blog.js`**（响应里能搜到 `bl-pin">★`），站主刷新即可看到效果。
- 视觉验收仍交给站主：文章粘进去后，主页侧栏博客窗第一条应显示成「2026-10-18 ★ 本站使用说明…」，博客列表页第一条带「置顶」徽章。

### 18.5 置顶文章文案（站主自己粘进后台，全文存档以便以后改站时同步改文）

后台里要填的字段：**标题**「本站使用说明：功能一览 + 开源素材感谢名单」／**日期** `2026-10-18`／**标签** `公告`、`站务`／**摘要留空**／勾选**置顶**／正文＝下面这段纯文字（站主自己套小标题和列表按钮）。

```
这里是 12あKa@被告人杯糕_ 的个人主页。说是主页，其实被我改成了一个 Windows XP 桌面：能开窗口、能点开始菜单、能关机，也能在这里看画、看委托、看资源、留言、看博客。下面把能点的东西和我借用的素材一次讲清楚，省得你到处乱点。

┈┈┈┈┈┈┈┈ ✧ ┈┈┈┈┈┈┈┈

一、这个站怎么用

整站就是一张 XP 桌面：左边桌面图标双击就开；左下角「开始」按钮里是所有入口和窗口清单；右下角是时钟和语言栏。窗口可以拖标题栏挪位置、双击标题栏浮起来或归位、按最小化收进任务栏、按关闭就藏起来（再到开始菜单里点开即可）。右下角还能拖大小。

会用 Windows 的人不需要说明书，这也是我选这层皮的原因之一。

二、能玩的七个窗口

・我的电脑：看这个站里的文件。
・记事本、画图：记事本真能打字；画图嵌的是在线画板，加载不出来会退成本地画板。
・扫雷：左键开格、右键插旗，踩雷重来。
・Internet Explorer：能嵌一部分允许被嵌的网站（维基、archive.org、在线画板之类），不允许嵌的会给你一张「找不到页面」的 404。
・Minecraft：浏览器里跑的那个经典版，要联网。
・媒体播放器：12 首，歌单在右侧；关掉窗口还在放，换页面也不断。

三、正经用处

・自我介绍：主页侧栏，包括我在画什么、去哪里找我。
・委托相关事宜：接不接委托、价目、申请流程、例图都在那一页。价目会按语言换算货币，日元和美元不是一个数。
・资源配布：我做的东西和音源，下载入口与使用说明在这页。请勿倒卖，转载标注原作者。
・留言板：主页右侧。不用注册，昵称可留空；正文最多 200 字；同一网络 10 分钟最多 3 条；发出去自己删不掉，要删找我。
・个人博客：就是这个页面。列表带标签、按月归档和搜索，置顶的文章永远排最前面。

整站支持中文 / 日本語 / English，语言栏在任务栏右下角。

四、藏得比较深的几个

・右下角那只玩具鸭，连点 30 次会有点东西发生，建议别在公司电脑上试。
・点「关闭计算机」是一整套真的关机流程：灰化、黑屏、可以安全关闭，还能重新开机。
・错误弹窗要点 OK 才消失，它不是装饰。

┈┈┈┈┈┈┈┈ ✧ ┈┈┈┈┈┈┈┈

五、用到的开源素材（按各自授权声明出处）

・winXP — 作者 Shizuku Yang，MIT 授权，github.com/ShizukuIchi/winXP
　用在这：XP 图标、扫雷的全部素材、报错音效、旗标，以及窗口标题栏 / 任务栏 / 开始菜单的配色与按钮规格。授权原文随素材放在 assets/winxp/LICENSE-MIT.txt。
・Fusion Pixel Font（缝合像素字体）— 作者 TakWolf，SIL Open Font License 1.1，github.com/TakWolf/fusion-pixel-font
　用在这：字体文件随仓库保留，页面目前未启用，留着备用。授权原文在 assets/fonts/LICENSE-OFL.txt；OFL 要求再分发必须带上它，所以这个文件不会删。

除上面两项，剩下的 HTML / CSS / JS 都是本站自己写的。

哪些不是开源：
・我自己的画、彩蛋素材、头像、音源 —— 版权在我，转载和商用请先问我。
・米画师 / bilibili / X / GitHub / マシュマロ 的图标版权归各平台，这里只用于标外链。
・Windows XP 的名字和商标归 Microsoft。本站只是界面层面的致敬复刻，和微软没有任何关系。

六、关于 AI 协助

不装：这个站的代码是现代工具和我一起磨出来的。页面结构、XP 窗口与任务栏逻辑、七个应用、博客前后台、留言板后端，都是我把需求定下来、由 AI 协助写出来的；要什么不要什么、复刻到什么程度、每一处「不对，改」是我自己判断的。素材、画作、音源是我自己的。写在这里不是免责，是免得有人以为这种站该一个人从零手敲。

┈┈┈┈┈┈┈┈ ✧ ┈┈┈┈┈┈┈┈

七、最后

站还在施工，有些页面的文字还是占位符，价目表也没定稿，看到了别太当真。发现 bug、想看什么、想催更，留言板或者邮箱 cupcakeqaq@gmail.com 都行。

感谢读到这里的你。下次来可能又多了点东西。
```

**文章里刻意不写的内容**（以后别自作主张加）：`worker/` 与 Cloudflare Pages/KV 的技术细节、本地后台的用法、`HANDOFF.md` 的存在、站内各文件名与目录结构 —— 都是开发细节，公开文章里不提。

### 18.6 等站主拍板的两件事

1. **第六节「关于 AI 协助」的措辞**：现在是「AI 协助、需求与取舍由我定」这一版。站主若想更短/更具体（逐项列出哪些部分由 AI 写）就改这一节，其它节不动。
2. **`README.md:3` 口径冲突**：README 现写「本站的原生代码为站主自己写的」，文章里说了有 AI 协助。README 的**本意**是「原生代码不是从 winXP 工程抄的」，但字面容易被读成「没借助 AI」。站主若在意，把那句改成「原生代码为站主自己实现（非从下列开源工程复制）」之类；**本轮没动 README**，等站主定。

---

## 十九、第 13 批：博客图标换 P1、开始菜单与待机界面头像换 P2（**本轮**）

### 19.1 站主原话

（m00114）「**最后一点要求：帮我把博客的所有图标改成 P1，电脑开始界面以及待机界面的用户头像将默认的 icon 改成 P2**」，随附两张图（P1＝绿蓝光泽小人，透明底；P2＝灰底白色小人剪影，中间一条黑色横条遮名字）。

### 19.2 三问拍板（全由站主点选）

| 问题 | 拍板 |
|---|---|
| 「博客的所有图标」范围 | **只改桌面快捷方式 + 开始菜单两项**（本来都用 `327(32x32).png`）。博客页标题栏的 `ie.png`（与其他子页一致）与博客页 favicon（全站共用 `icon.png`）**不动** |
| P2 覆盖范围 | **仅开始菜单顶部头像 + 待机界面用户头像**。浏览器标签页 favicon（`icon.png`）与主页侧栏自介大头像（`index.html:89` 同 `icon.png`）**保持站主真实头像** |
| P2 中间那条黑色横条 | **保留原样**（不裁） |

**为什么不直接替换 `icon.png`**：`icon.png`（根目录，540KB）同时喂了「favicon ×4 页 / 侧栏自介 84px 圆头像 / 开始菜单 42px 头像 / 待机界面 52px 头像」四处，直接换会把站主真实头像全灭。所以新增独立素材、只改引用它的那两行。

### 19.3 改动清单

| # | 文件 / 位置 | 动作 |
|---|---|---|
| 1 | 新增 `assets/icon/blog.png` | P1 缩成 **64×64 PNG（保留透明通道）**，供 32px 桌面图标 / 30px 开始菜单项 2 倍显示 |
| 2 | 新增 `assets/icon/user-default.png` | P2 缩成 **104×104 PNG**（RGB，黑条保留），供 42px / 52px 头像 2 倍显示 |
| 3 | `index.html:37` 桌面「博客」快捷方式 | `327(32x32).png` → `assets/icon/blog.png` |
| 4 | `js/winxp.js:486` 开始菜单 NAV 里的 blog 项 | `ICON + '327(32x32).png'` → `'assets/icon/blog.png'`（照第 489 行 friend 项的写法用字面路径） |
| 5 | `js/winxp.js:547` 开始菜单顶部头像 `.sm-avatar` | `src="icon.png"` → `src="assets/icon/user-default.png"` |
| 6 | `js/winxp.js:700` 待机 / 欢迎界面头像 `.welcome-user img` | 同上 |
| 7 | `diag/bl-check.js` | 新增 `[8] 图标与头像` 8 项断言（新引用存在、尺寸正确、旧 `327(32x32).png` 已消失、`winxp.js` 不再直接拿 `icon.png` 当头像）；`[6]` 那条「posts.js 与 drafts.js 都是空的」**改成只拦明显测试数据**（id/title 含 test/bltest/测试），因为站主已经开始发真文章了 |
| 8 | `HANDOFF.md` | 本节 |

**未改**：`blog/posts.js`（站主的文章数据，一字未动）、`blog.html`（标题栏仍 `ie.png`）、`icon.png`、侧栏自介头像、`blog.html:8` favicon、`css` 全部（新图沿用原有 32/30/42/52px 尺寸，没有新增样式）。

### 19.4 验证证据

- `node --check js/winxp.js` → 通过。
- `node diag/bl-check.js` → **31 项全过**（新增的 `[8]` 8 项全绿：「desktop 用 blog.png」「开始菜单用 blog.png」「blog.png 是 64x64 PNG」「已不再引用 327(32x32).png」「开始菜单头像用 user-default.png」「待机头像用 user-default.png」「user-default.png 是 104x104 PNG」「winxp.js 里已不直接把 icon.png 当头像用」）。
- 两张新 PNG 已目视确认：`assets/icon/blog.png` 透明底、`assets/icon/user-default.png` 灰底白小人 + 黑条。
- 服务器不需要重启（站主自己的 `启动后台.bat` 已在跑，静态文件直接生效），刷新页面即可看到桌面博客图标、开始菜单博客项、开始菜单顶部头像、待机/欢迎界面头像的变化。

### 19.5 顺手发现的两件事（都不属于本批改动）

1. **站主已经自己发了文章，但没勾置顶**：`blog/posts.js` 里现有 1 篇（标题「食用须知」、日期 2026-10-18、标签「网站介绍」、`"pinned": false`）。代码链路本身没问题（`js/admin.js:1066` 的 `onChange` 会写 `BE.post.pinned`，`document.addEventListener('change', onChange)` 在 1090 行绑好，`server/admin.js:384` 落盘 `!!p.pinned`）——**是编辑时没勾那个框**。站主要做的是：后台 → 博客 → 那篇 → 编辑 → 勾「置顶（前台排最前面）」→ 保存改动。勾上之前，主页 ★ 和列表页「置顶」徽章都不会出现（`pinned:false` 的文章本来就不该显示置顶标记）。
2. **`diag/bl-check.js` 第 `[6]` 项的语义本轮改了**（见 19.3 #7）：之前「数据文件必须为空」是为了防测试数据上线；站主开始发真文章后，这项改成只拦 `test*`/`测试` 这类明显测试数据。以后不要把它改回「必须为空」。


---

## 二十、第 14 批：开始菜单 / 待机界面用户名改成 Administrator（**本轮**）

站主原话（m00234）：「对了，开始菜单栏和待机页面的用户名改成电脑系统默认的用户名会更好一点」。问了一句「电脑系统默认的用户名指哪个」→ 站主选 **Administrator**（XP 默认账户；正好和 P2 那张黑条遮名字的默认头像配套）。

| # | 文件 / 位置 | 改动 |
|---|---|---|
| 1 | js/winxp.js:548 开始菜单顶部 .sm-name | `12あKa@被告人杯糕_` → `Administrator` |
| 2 | js/winxp.js:701 待机/欢迎界面 .wu-name | 同上 |
| 3 | diag/bl-check.js | [8] 多加 1 项：sm-name">Administrator 与 wu-name">Administrator 都在 → 32 项全过 |
| 4 | HANDOFF.md | 本节 |

**未改**：页面 `<title>` / `<meta description>` / 主页侧栏 `h1.cn` / 博客文章署名 —— 那些是站主的站点品牌名，不是 OS 用户名；`js/i18n.js` 也没动（账户名不参与翻译，日文 XP 同样显示 Administrator）。

验证：`node --check js/winxp.js` 通过；`node diag/bl-check.js` **32 项全过**；服务端 `/js/winxp.js` 已含两处 `Administrator`（刷新页面即生效，不用重启）。

---

## 二十一、第 15 批：去掉「可以安全地关闭计算机了」页的 logo（**本轮**）

站主发言（m00265，附截图）：「此页面此前一直没触发过，现在才发现（logo）显示 bug，把logo去掉吧」——截图里 `assets/winxp/windowsIcons/windows.png` 是**带白底的方块**，在蓝色关机底上露出一个白框（XP 原版那页是深蓝底 + 白字 + 重启按钮，没有白底方块）。按指示**直接去掉 logo**，不换图、不改底色。

| # | 文件 / 位置 | 改动 |
|---|---|---|
| 1 | `js/winxp.js` `shutdownScreen()`（669-676 行附近） | 删掉 `'<img src="' + ICON + 'windows.png" alt="" style="height:52px">' +`，只留 `ps-text` + `ps-btn`（重新开机）；CSS 没动，`.power-screen.shutdown` 本来就是 `flex column; gap:30px; 居中`，删掉后文字和按钮仍然居中竖排 |
| 2 | `diag/bl-check.js` | `[8]` 多加 1 项：抓 `function shutdownScreen()` 函数体裁剪，断言里面没有 `<img` → 33 项全过 |
| 3 | `HANDOFF.md` | 本节 |

进这页的路径不变：开始菜单「关闭计算机」→ 关机 → 灰化闪屏 → 这页 → 点「重新开机」回欢迎界面。

验证：`node --check js/winxp.js` 通过；`node diag/bl-check.js` **33 项全过**；服务端 `/js/winxp.js` 已确认无 logo。

**待确认**：站主原话里「邮箱显示bug」这句没对上皮——本页没有邮箱相关内容，已按「logo 显示 bug，去掉 logo」处理。若「邮箱显示」是另外某处（留言板、资源页、后台），等站主指位置再修。
