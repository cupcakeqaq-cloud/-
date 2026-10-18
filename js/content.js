/* ─────────────────────────────────────────────────────────────
   内容数据文件 —— 由本地后台生成（npm start 后打开 /admin/）
   手改也行，但别删这个文件：删掉就完全回落到 js/i18n.js 的 DICT
   与 commission.html / resources.html 里写死的初始值。

     i18n              只放「改过的」文案 key，覆盖 js/i18n.js 的 DICT；
                       没改过的不要写进来（少写少出错）
                        一个 key 里写了哪种语言就覆盖哪种，没写的回落 DICT，
                        所以改了中文记得把 ja/en 一起补（第 19 批补齐过一次）
     价格换算      1 CNY = 21 JPY = 0.14 USD（日元取 500 整、美元取 5 整）；
                    cmCard*Price 与 cmCard*Desc* 里的外币是写死的字符串，
                    改人民币价时三语要一起改，别只改 zh
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
      "en": "Resource downloads and usage notes are on a dedicated page.\nPlease click the button below to continue."
    },
    "voiceNote": {
      "zh": "使用前请仔细阅读压缩包内readme文件！请勿倒卖资源、请勿下载后二配并自称配布者/资源作者。",
      "ja": "使用前に、圧縮ファイル内のreadmeファイルをよくお読みください！ リソースの転売は禁止です。ダウンロード後に二次配布したり、配布者・制作者を名乗ったりしないでください。",
      "en": "Please read the readme inside the archive carefully before use! Do not resell these resources, and do not redistribute them while claiming to be the distributor or creator."
    },
    "cmPriceNote": {
      "zh": "※ 目前价目表为施工状态，文本/图片均为占位符，无实际参考性",
      "ja": "※ 現在、料金表は工事中です。テキスト・画像はすべてプレースホルダーであり、実際の参考にはなりません。",
      "en": "※ The price list is still under construction — all text and images are placeholders and are not meant to be taken as reference."
    },
    "cmStatusNote": {
      "zh": "档期随时变动，来问价之前建议先确认目前委托开放状态。",
      "ja": "スケジュールは随時変動するため、お見積もりについてお問い合わせの前に、現在の依頼受付状況をご確認いただくことをおすすめします。",
      "en": "My schedule changes at any time, so before asking for a quote, please check whether commissions are currently open."
    },
    "cmApply2d": {
      "zh": "国内非平台约稿那么支付方式基本就是走支付宝/微信这两个了，用哪个支付取决于你。\n在本人确认需求并且接受委托后，需要麻烦你先支付全款的10%作为定金，并且按节点计算分批次的支付完所有金钱，以免在委托中途取消合作时出现金钱纠纷。",
      "ja": "国内（中国）でプラットフォーム外のご依頼の場合、お支払いはAlipayまたはWeChat Payが基本です。どちらを使うかはご希望で選べます。\n内容を確認して依頼を承諾した後、総額の10%を手付金として先にお支払いいただきます。残りの金額は工程ごとの分割払いでお支払いいただきます。途中でキャンセルになった際の金銭トラブルを避けるためです。",
      "en": "For commissions arranged outside a platform (mainland China), payment is basically via Alipay or WeChat Pay — whichever you prefer.\nAfter I confirm the brief and accept the commission, please pay 10% of the full amount upfront as a deposit. The rest is paid in installments by milestone, so that there is no money dispute if the commission is cancelled midway."
    },
    "cmApply1d": {
      "zh": "国内一般走米画师约稿。\n线下的话可通过邮箱或者私信联系我，邮箱联系建议一口气发完所有要求以及预算，私信可以详谈。",
      "ja": "国内（中国）のご依頼は、基本的にMiHuashi（米画師）経由で受けています。\n直接のご依頼はメールまたはDMでご連絡ください。メールの場合はご要望とご予算を一度にすべてお送りいただけると助かります。DMなら詳しくお話しできます。",
      "en": "For commissions from mainland China I usually take them through MiHuashi (米画师).\nFor direct requests, contact me by email or DM — if you email, please send all of your requirements and the budget in one go; DMs are better for talking it through."
    },
    "cmApply2b": {
      "zh": "② 支付方式",
      "ja": "② お支払い方法",
      "en": "② Payment"
    },
    "cmApply3d": {
      "zh": "确认报价与排期后支付定金，在定金支付完成后我将开始绘制稿件。\n流程一般是草稿 → 上色 → 完稿逐步交付。各个节点的比例看具体情况，一般会在确认要求后的回复邮件里详细说明。",
      "ja": "料金とスケジュールをご確認いただいた後、手付金をお支払いください。ご入金確認後に制作を開始します。\n流れはラフ → 彩色 → 完成と段階的に納品します。各工程の割合は案件によって異なり、内容確認後の返信メールで詳しくご説明します。",
      "en": "After you confirm the quote and schedule, please pay the deposit — I start drawing once it has arrived.\nThe process is roughly sketch → coloring → final, delivered step by step. How the total is split across milestones depends on the job and is usually explained in detail in my reply email."
    },
    "voiceNoteTitle": {
      "zh": "使用前请仔细阅读资源readme",
      "ja": "使用前に、リソースのreadmeをよくお読みください。",
      "en": "Please read the resource readme carefully before use."
    },
    "rsIntroTitle": {
      "zh": "自制资源下载",
      "ja": "自作リソースのダウンロード",
      "en": "Download my own resources"
    },
    "rsDownloadTitle": {
      "zh": "转载资源分享",
      "ja": "転載リソースの共有",
      "en": "Shared reposted resources"
    },
    "duckAria": {
      "zh": "彩蛋",
      "ja": "おもちゃのアヒルのお楽しみ",
      "en": "Toy duck surprise"
    },
    "cmCard1Title": {
      "zh": "简单的白底胸像/半身",
      "ja": "シンプルな白背景のバストアップ／半身",
      "en": "Simple flat-color bust / half-body"
    },
    "cmCard1Price": {
      "zh": "¥120-~240",
      "ja": "120〜240元",
      "en": "¥120–240 (CNY)"
    },
    "cmCard2Title": {
      "zh": "比较精细的胸像/半身",
      "ja": "やや細やかなバストアップ／半身",
      "en": "More detailed bust / half-body"
    },
    "cmCard1Desc1": {
      "zh": "完成度如图所示，半身底价在160，要画背景/场景价格另算。",
      "ja": "仕上がりの完成度は画像の通りです。半身の基本料金は160元から、背景・シチュエーションは別料金になります。",
      "en": "The level of finish is as shown — half-body starts at ¥160 (CNY); backgrounds and scenes are priced separately."
    },
    "cmCard1Desc2": {
      "zh": "需要另外添加小物/抱娃OK，指定动作OK。双人or多人按人数乘算。",
      "ja": "小物の追加や抱っこはOK、ポーズ指定もOKです。二人以上の場合は人数分の料金になります。",
      "en": "Extra props or holding a plushie are fine, and you can specify the pose. For two or more characters the price is multiplied by the number of characters."
    },
    "cmCard2Price": {
      "zh": "¥160~220",
      "ja": "160〜220元",
      "en": "¥160–220 (CNY)"
    },
    "cmCard2Desc1": {
      "zh": "完成度如图，刻画会稍微精细一点，半身底价要200起算，带背景/场景的话价格也是另算。",
      "ja": "仕上がりは画像の通りで、描き込みは少し細やかになります。半身の基本料金は200元から、背景・シチュエーションは別料金になります。",
      "en": "The level of finish is as shown, a little more detailed. Half-body starts at ¥200 (CNY); backgrounds and scenes are priced separately."
    },
    "cmCard2Desc2": {
      "zh": "需要另外添加小物/抱娃OK，指定动作OK。双人or多人按人数乘算。",
      "ja": "小物の追加や抱っこはOK、ポーズ指定もOKです。二人以上の場合は人数分の料金になります。",
      "en": "Extra props or holding a plushie are fine, and you can specify the pose. For two or more characters the price is multiplied by the number of characters."
    },
    "cmCard3Title": {
      "zh": "很潦草的插图",
      "ja": "かなりラフなイラスト",
      "en": "Very rough illustration"
    },
    "cmCard3Price": {
      "zh": "¥200~400",
      "ja": "200〜400元",
      "en": "¥200–400 (CNY)"
    },
    "cmCard3Desc1": {
      "zh": "精细度低，氛围效果大于精度，完美主义慎重考虑。",
      "ja": "描き込みは少なめで、精度より雰囲気を重視します。こだわり派の方はご注意ください。",
      "en": "Low level of detail — mood over precision, so perfectionists be warned."
    },
    "cmCard3Desc2": {
      "zh": "可指定场景、动作、想要的氛围。",
      "ja": "シチュエーション・ポーズ・雰囲気はご指定いただけます。",
      "en": "You can specify the scene, the pose and the mood you want."
    },
    "cmCard4Title": {
      "zh": "其他",
      "ja": "その他",
      "en": "Other"
    },
    "cmCard4Desc1": {
      "zh": "你想约我其他业务的话可以自带价询问试试看！",
      "ja": "ほかの内容をご依頼されたい場合は、ご希望の価格を添えてお問い合わせください！",
      "en": "If you want to commission something else, try asking with a price in mind!"
    },
    "cmCard4Desc2": {
      "zh": "（或者看着随便出个价，我看你给的价随机产出，总之就是盲盒XD）",
      "ja": "（あるいは、ざっくり価格を出していただければ、その価格に合わせてランダムに制作します。いわゆるブラインドボックスですXD）",
      "en": "(Or just name any price — I'll make something that fits it. Basically a blind box XD)"
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
