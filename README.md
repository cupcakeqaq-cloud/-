# 使用的开源工程

本站（<https://cupcakeqaq-cloud.github.io/CupCakeQAQ-site/>）的原生代码为站主自己写的，
界面上的 Windows XP 视觉素材不是自绘的，来自下面这两个开源工程，在此按各自的授权声明出处。

| 工程 | 作者 | 授权 | 用在本站的哪里 |
|---|---|---|---|
| [winXP](https://github.com/ShizukuIchi/winXP) | Shizuku Yang | MIT | `assets/winxp/` 全部 XP 素材（168 个文件：`windowsIcons/` 132 个图标、`minesweeper/` 30 个扫雷素材、`sounds/error.wav`、`windows-logo.png`、`xp-flag.png`、`minecraft.png`、`empty.png`）。配色与窗口规格照抄自该工程 `src/WinXP/apps/MyComputer/index.js` 样式块与 `src/WinXP/Windows/HeaderButtons.js`，落在 `css/style.css`（`:root` 配色变量）和 `css/winxp.css` / `js/winxp.js`（标题栏、任务栏、开始菜单） |
| [Fusion Pixel Font<br>（缝合像素字体）](https://github.com/TakWolf/fusion-pixel-font) | TakWolf | SIL Open Font License 1.1 | `assets/fonts/fusion-12px-{latin,ja,zh_hans}.woff2`（当前页面上**未启用**，保留备用） |

授权原文随素材一起放在仓库里，别删：

- winXP（MIT）→ [`assets/winxp/LICENSE-MIT.txt`](assets/winxp/LICENSE-MIT.txt)
- Fusion Pixel Font（OFL-1.1）→ [`assets/fonts/LICENSE-OFL.txt`](assets/fonts/LICENSE-OFL.txt)

OFL 授权下**再分发字体文件必须保留授权文件**，所以 `assets/fonts/LICENSE-OFL.txt` 不能删；
`assets/winxp/LICENSE-MIT.txt` 同理要跟素材待在一起。

## winXP 工程原文声明

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

## 不是开源的素材

- **站主本人的作品**：`picture/`、`Easter egg/`、`icon.png`、`voice dl/` 里的音源，以及各页面文案 —— © 12あKa@被告人杯糕_，保留所有权利。音源使用条款见站内「资源配布」页。
- **第三方平台图标**：`assets/icon/` 下的米画师 / bilibili / X / GitHub / マシュマロ / Gmail 图标，版权归各自平台所有，这里只作外链标识使用。
- **Windows XP** 的名称与商标归 Microsoft 所有。本站只是界面上的致敬复刻，与 Microsoft 无任何关系。
