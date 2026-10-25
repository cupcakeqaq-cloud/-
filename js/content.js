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
  "i18n": {
    "reText": {
      "zh": "资源的下载与使用说明在独立页面，点击下面的按钮进入。",
      "ja": "リソースのダウンロードと使用説明は専用ページにあります。\n下のボタンをクリックして進んでください。",
      "en": "Download and usage instructions for the resources are on a dedicated page.\nPlease click the button below to continue."
    },
    "voiceNote": {
      "zh": "使用前请仔细阅读压缩包内readme文件！请勿倒卖资源、请勿下载后二配并自称配布者/资源作者。",
      "ja": "使用前に、圧縮ファイル内のreadmeファイルをよくお読みください！ リソースの転売は禁止です。ダウンロード後に二次配布したり、配布者・制作者を名乗ったりしないでください。",
      "en": "Please read the readme file inside the archive carefully before use!\nDo not resell the resources. Do not redistribute them after downloading, or claim to be the distributor/creator."
    },
    "cmPriceNote": {
      "zh": "※ 目前各种原因暂未开放PayPal。",
      "ja": "※ 諸事情により、現在PayPalは未対応です。",
      "en": "※ PayPal is currently unavailable for various reasons."
    },
    "cmStatusNote": {
      "zh": "档期随时变动，来问价之前建议先确认目前委托开放状态。",
      "ja": "スケジュールは随時変動するため、お見積もりについてお問い合わせの前に、現在の依頼受付状況をご確認いただくことをおすすめします。",
      "en": "My schedule changes frequently, so before asking for a quote, please check my current commission availability first."
    },
    "cmApply2d": {
      "zh": "国内非平台约稿那么支付方式基本就是走支付宝/微信这两个了，用哪个支付取决于你。\n在本人确认需求并且接受委托后，需要麻烦你先支付全款的10%作为定金，并且按节点计算分批次的支付完所有金钱，以免在委托中途取消合作时出现金钱纠纷。",
      "ja": "支払い方法はPayPalに統一させていただきます。\n内容を確認し、依頼を承諾した後、全額の10%を手付金として先にお支払いいただきます。その後は進行状況に応じて、分割で全額をお支払いいただきます。これは、途中で依頼がキャンセルになった際の金銭トラブルを防ぐためです。",
      "en": "If you would like to request a commission, please send your budget, the type of artwork you would like, and your requirements to my email address. I will reply within one week of receiving your email."
    },
    "cmApply1d": {
      "zh": "国内一般走米画师约稿。\n线下的话可通过邮箱或者私信联系我，邮箱联系建议一口气发完所有要求以及预算，私信可以详谈。",
      "ja": "ご依頼をご希望の場合は、予算・ご希望の作品タイプ・ご要望を私のメールアドレスまでお送りください。メールを受け取り次第、1週間以内にご返信いたします。",
      "en": "If you would like to request a commission, please send your budget, the type of artwork you would like, and your requirements to my email address. I will reply within one week of receiving your email."
    },
    "cmApply2b": {
      "zh": "② 支付方式",
      "ja": "② 支払い方法",
      "en": "② Payment method"
    },
    "cmApply3d": {
      "zh": "确认报价与排期后支付定金，在定金支付完成后我将开始绘制稿件。\n流程一般是草稿 → 上色 → 完稿逐步交付。各个节点的比例看具体情况，一般会在确认要求后的回复邮件里详细说明。",
      "ja": "スケジュールは随時変動するため、お見積もりについてお問い合わせの前に、現在の依頼受付状況をご確認いただくことをおすすめします。",
      "en": "My schedule changes frequently, so before asking for a quote, please check my current commission availability first."
    },
    "voiceNoteTitle": {
      "zh": "使用前请仔细阅读资源readme",
      "ja": "使用前に、リソースのreadmeをよくお読みください。",
      "en": "Please read the resource readme carefully before use."
    },
    "rsIntroTitle": {
      "zh": "资源配布页面",
      "ja": "リソース配布ページ",
      "en": "Resource distribution"
    },
    "rsDownloadTitle": {
      "zh": "资源下载分享",
      "ja": "リソースのダウンロード共有",
      "en": "Resource downloads"
    },
    "duckAria": {
      "zh": "彩蛋"
    },
    "cmCard1Title": {
      "zh": "简单的白底胸像/半身",
      "ja": "シンプルな白背景の胸像／半身",
      "en": "Simple bust / half-body on white"
    },
    "cmCard1Price": {
      "zh": "¥120~240",
      "ja": "2,500〜5,000円",
      "en": "$17–34"
    },
    "cmCard2Title": {
      "zh": "比较精细的胸像/半身",
      "ja": "やや描き込みの多い胸像／半身",
      "en": "More detailed bust / half-body"
    },
    "cmCard1Desc1": {
      "zh": "完成度如图所示，半身底价在160，要画背景/场景价格另算。",
      "ja": "完成度は画像の通りです。半身の最低価格は160元（約3,400円／約$22）で、背景・シーンの追加は別料金となります。",
      "en": "The level of finish is as shown. The base price for a half-body is ¥160 CNY (about $22); adding a background/scene is charged separately."
    },
    "cmCard1Desc2": {
      "zh": "需要另外添加小物/抱娃OK，指定动作OK。双人or多人按人数乘算。",
      "ja": "小物の追加・ぬいぐるみを抱える構図もOK、ポーズ指定もOKです。2人以上の場合は人数分の料金になります。",
      "en": "Adding small props or a plush to hold is OK, and specifying poses is OK. Two or more characters are charged per person."
    },
    "cmCard2Price": {
      "zh": "¥160~220",
      "ja": "3,500〜4,500円",
      "en": "$22–31"
    },
    "cmCard2Desc1": {
      "zh": "完成度如图，刻画会稍微精细一点，半身底价要200起算，带背景/场景的话价格也是另算。",
      "ja": "完成度は画像の通りで、描き込みはやや多めです。半身の最低価格は200元（約4,200円／約$28）からで、背景・シーン付きは別料金となります。",
      "en": "The finish is as shown, with slightly more detail. A half-body starts at ¥200 CNY (about $28); with a background/scene it is charged separately."
    },
    "cmCard2Desc2": {
      "zh": "需要另外添加小物/抱娃OK，指定动作OK。双人or多人按人数乘算。",
      "ja": "小物の追加・ぬいぐるみを抱える構図もOK、ポーズ指定もOKです。2人以上の場合は人数分の料金になります。",
      "en": "Adding small props or a plush to hold is OK, and specifying poses is OK. Two or more characters are charged per person."
    },
    "cmCard3Title": {
      "zh": "很潦草的插图",
      "ja": "かなりラフなイラスト",
      "en": "Very rough illustration"
    },
    "cmCard3Price": {
      "zh": "¥200~400",
      "ja": "4,000〜8,500円",
      "en": "$28–56"
    },
    "cmCard3Desc1": {
      "zh": "精细度低，氛围效果大于精度，完美主义慎重考虑。",
      "ja": "描き込みは少なめで、精度よりも雰囲気重視です。細部にこだわりたい方はご注意ください。",
      "en": "Low level of detail — atmosphere matters more than precision. Perfectionists, please think twice."
    },
    "cmCard3Desc2": {
      "zh": "可指定场景、动作、想要的氛围。",
      "ja": "シーン・ポーズ・雰囲気のご指定が可能です。",
      "en": "You can specify the scene, the pose, and the atmosphere you want."
    },
    "cmCard4Title": {
      "zh": "其他",
      "ja": "その他",
      "en": "Others"
    },
    "cmCard4Desc1": {
      "zh": "你想约我其他业务的话可以自带价询问试试看！",
      "ja": "別の内容をご依頼されたい場合は、ご希望の価格を添えてお問い合わせください！",
      "en": "If you want to commission something else, feel free to ask with your own price in mind!"
    },
    "cmCard4Desc2": {
      "zh": "（或者看着随便出个价，我看你给的价随机产出，总之就是盲盒XD）",
      "ja": "（あるいはお任せで価格を決めていただいても構いません。いただいた金額に応じてランダムに制作します、いわゆるガチャですXD）",
      "en": "(Or just name any price and I'll make something random based on it — basically a blind box XD)"
    },
    "bio": {
      "zh": "18↑一般通过十八线低精力画手兼自宅警备员。此网站为个人网站，资源分享/个人博客/委托价目都会放在这里。祝游玩愉快☆",
      "ja": "18歳以上／低浮上の絵描き兼自宅警備員。当サイトは個人サイトです。リソース配布／個人ブログ／依頼料金などはこちらにまとめています。どうぞお楽しみください☆",
      "en": "18+ / Low-activity artist & self-appointed stay-at-home guard.This is my personal website. Resource sharing, my personal blog, and commission pricing are all posted here.Enjoy your visit☆"
    }
  },
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
          "uploads/20261018-35-cf2c26.png",
          "uploads/20261018-67-2bed88.jpg"
        ]
      },
      {
        "shots": [
          "uploads/20261018-62-82f31f.png",
          "picture/插画31.png",
          {
            "src": "uploads/20261018-retouch_2025062900192397-bae7e3.jpg",
            "r": "4:3",
            "zoom": 1.1,
            "cx": 0.455,
            "cy": 0.478
          }
        ]
      },
      {
        "shots": [
          "uploads/20261018-38-506427.png",
          "uploads/20261018-28-3039b0.png",
          "uploads/20261018-28-1-096b32.png"
        ]
      }
    ]
  },
  "resources": {
    "items": [
      {
        "icon": "assets/winxp/icon.png",
        "name": {
          "zh": "芙兰朵露 v1.1.0",
          "ja": "フランドール v1.1.0",
          "en": "Flandre v1.1.0"
        },
        "size": {
          "zh": "持续更新，详见GitHub",
          "ja": "継続更新中。詳細はGitHubまで。",
          "en": "Continuously updated. See GitHub for details."
        },
        "href": "https://github.com/cupcakeqaq-cloud/flandre-desktop-pet"
      },
      {
        "icon": "assets/winxp/windowsIcons/846(32x32).png",
        "name": {
          "zh": "PostPet21-2.1",
          "ja": "PostPet21-2.1-CN",
          "en": "PostPet21-2.1-CN"
        },
        "size": {
          "zh": "约 9.98 MB · zip",
          "ja": "約9.98MB · zip",
          "en": "~9.98MB · zip"
        },
        "href": "uploads/20261018-PostPet21-2.1-610055.zip"
      }
    ]
  }
};
