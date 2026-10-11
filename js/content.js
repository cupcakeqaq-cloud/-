/* ─────────────────────────────────────────────────────────────
   内容数据文件 —— 由本地后台生成（npm start 后打开 /admin/）
   手改也行，但别删这个文件：删掉就完全回落到 js/i18n.js 的 DICT
   与 commission.html / resources.html 里写死的初始值。

     i18n              只放「改过的」文案 key，覆盖 js/i18n.js 的 DICT；
                       没改过的不要写进来（少写少出错）
     commission.status open | paused | closed → 受理状态面板
     commission.cards  四档例图，数组顺序 = 页面四张卡片顺序；
                       某项为空数组 = 用 commission.html 里写死的那三张
     resources.items   资源页下载项；href 可以写中文文件名，前台自动 URL 编码
   ───────────────────────────────────────────────────────────── */
window.CONTENT = {
  "i18n": {},
  "commission": {
    "status": "open",
    "cards": [
      {
        "shots": [
          "picture/插画53.jpg",
          "picture/插画57.jpg",
          "picture/插画54.jpg"
        ]
      },
      {
        "shots": [
          "picture/插画34-RE.png",
          "picture/插画47-2.png",
          "picture/插画56.jpg"
        ]
      },
      {
        "shots": [
          "picture/插画35.png",
          "picture/插画67.png",
          "picture/插画59.png"
        ]
      },
      {
        "shots": [
          "picture/插画31.png",
          "picture/插画37.png",
          "picture/插画62.png"
        ]
      }
    ]
  },
  "resources": {
    "items": [
      {
        "icon": "assets/winxp/windowsIcons/846(32x32).png",
        "name": {
          "zh": "芙兰朵露 v1.0.0-beta",
          "ja": "フランドール v1.0.0-beta",
          "en": "Flandre v1.0.0-beta"
        },
        "size": {
          "zh": "约 33.2 MB · zip",
          "ja": "約 33.2 MB · zip",
          "en": "~33.2 MB · zip"
        },
        "href": "voice dl/芙兰朵露v1.0.0-beta.zip"
      }
    ]
  }
};
