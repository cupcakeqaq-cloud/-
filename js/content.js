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
      "zh": "请勿倒卖；转载／使用请标注原作者。",
      "ja": "転売禁止。転載・使用の際は原作者を明記してください。",
      "en": "Do not resell. Please credit the original author when reposting or using."
    },
    "cmPriceNote": {
      "zh": "※ 目前价目表为施工状态，文本/图片均为占位符，无实际参考性",
      "ja": "※ 現在、料金表は工事中です。テキスト・画像はすべてプレースホルダーであり、実際の参考にはなりません。",
      "en": "※ 現在、料金表は工事中です。テキスト・画像はすべてプレースホルダーであり、実際の参考にはなりません。"
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
    }
  },
  "commission": {
    "status": "closed",
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
          "zh": "PostPet21-2.1",
          "ja": "PostPet21-2.1-CN",
          "en": "PostPet21-2.1-CN"
        },
        "size": {
          "zh": "",
          "ja": "",
          "en": ""
        },
        "href": "uploads/20261018-PostPet21-2.1-610055.zip"
      },
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
