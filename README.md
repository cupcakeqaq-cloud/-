# 12あKa@被告人杯糕_ 的个人站

千禧年风格的 Windows XP 界面个人主页：自我介绍、委托价目与流程、音源配布、留言板。

线上地址：<https://cupcakeqaq-cloud.github.io/CupCakeQAQ-site/>

纯原生 HTML / CSS / JavaScript，**没有构建步骤，也没有任何运行时依赖**。本地预览：

```bash
node server.js          # http://127.0.0.1:3000
```

---

## 使用的开源工程

站内的 Windows XP 视觉素材不是自绘的，来自下面这两个开源工程，在此按各自的授权声明出处。

| 工程 | 作者 | 授权 | 用在哪 |
|---|---|---|---|
| [winXP](https://github.com/ShizukuIchi/winXP) | Shizuku Yang | MIT | `assets/winxp/` 全部 XP 图标、窗口与扫雷素材（166 个文件）；`css/style.css` 的配色取自该工程 `src/WinXP/apps/MyComputer/index.js` 的样式块 |
| [Fusion Pixel Font<br>（缝合像素字体）](https://github.com/TakWolf/fusion-pixel-font) | TakWolf | SIL Open Font License 1.1 | `assets/fonts/fusion-12px-*.woff2`（当前页面上**未启用**，保留备用） |

授权原文随素材一起放在仓库里：

- winXP（MIT）→ [`assets/winxp/LICENSE-MIT.txt`](assets/winxp/LICENSE-MIT.txt)
- Fusion Pixel Font（OFL-1.1）→ [`assets/fonts/LICENSE-OFL.txt`](assets/fonts/LICENSE-OFL.txt)

字体用 OFL 授权时，**再分发字体文件必须保留该授权文件**，所以 `assets/fonts/LICENSE-OFL.txt` 不要删。同理 `assets/winxp/LICENSE-MIT.txt` 要跟素材待在一起。

### winXP 工程原文声明

```
The MIT License (MIT)

Copyright (c) 2019 Shizuku Yang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 不是开源的素材

- **站主本人的作品**：`picture/`、`Easter egg/`、`icon.png`、`voice dl/` 里的音源，以及各页面文案 —— © 12あKa@被告人杯糕_，保留所有权利。音源的使用条款见站内「资源配布」页。
- **第三方平台图标**：`assets/icon/` 下的米画师 / bilibili / X / GitHub / マシュマロ / Gmail 图标，版权归各自平台所有，这里只作为外链标识使用。
- **Windows XP** 的名称与商标归 Microsoft 所有。本页只是界面上的致敬复刻，与 Microsoft 没有任何关系。

---

## 目录速览

```
index.html          桌面 + 自介窗 + 留言板 + 两个入口窗
commission.html     委托相关事宜（价目 / 流程 / 例图 / 联系方式）
resources.html      资源配布（简介 / 下载 / 使用说明）
js/winxp.js         WinXP 窗口系统（标题栏、任务栏、开始菜单、缩放、电源流程）
js/i18n.js          中文 / 日本語 / English 三语文案表
js/apps.js          记事本、画图、扫雷、我的电脑、Minecraft 等应用
js/guestbook.js     留言板（localStorage，无后端）
assets/winxp/       XP 素材（来自 winXP 工程）
picture/            站主的画作
```
