// 施設ごとの初期コンテンツ。HTML試作版のデータ構造をそのまま踏襲しています。
// scripts/seed.mjs から Supabase へ投入します。
// 今回のNext.js版で実際に画面を作っているのは pages.top / pages.arrival /
// pages.stay(トイレのみ) ですが、他のページ分のデータも先に入れておくことで、
// 後から同じパターンでページを追加するだけで済むようにしています。

export const properties = [
  { id: "sameura", name_ja: "一軒宿さめうら", name_en: "Ikkenyado Sameura", enabled: true },
  { id: "asemi", name_ja: "一軒宿あせみ", name_en: "Ikkenyado Asemi", enabled: false },
];

export const sameuraContent = {
  settings: {
    wifi: { ssid: "", password: "" },
    contact: { line: "", tel: "", email: "" },
  },
  photos: {},
  pages: {
    top: {
      intro: {
        ja: "ご滞在に必要な情報を\nこちらからご確認いただけます。",
        en: "Everything you need for your stay is here.",
      },
    },
    arrival: {
      address: "〒781-3618　高知県長岡郡本山町吉野440",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=%E9%AB%98%E7%9F%A5%E7%9C%8C%E9%95%B7%E5%B2%A1%E9%83%A1%E6%9C%AC%E5%B1%B1%E7%94%BA%E5%90%89%E9%87%8E440",
      checkinFrom: { ja: "15:00", en: "3:00 PM" },
      checkinTo: { ja: "18:00", en: "6:00 PM" },
      checkoutBy: { ja: "10:00", en: "10:00 AM" },
      carNote: { ja: "", en: "" },
      transitSteps: [
        { ja: "JR大杉駅", en: "JR Ōsugi Station" },
        { ja: "嶺北観光自動車バスに乗車", en: "Take the Reihoku Kankō bus" },
        { ja: "「吉野」で下車", en: 'Get off at "Yoshino"' },
        { ja: "徒歩約2分", en: "About a 2-minute walk" },
      ],
      transitNote: {
        ja: "バスは本数が少ないため、時刻表を事前にご確認ください。",
        en: "Buses are infrequent — please check the timetable in advance.",
      },
      parkingText1: {
        ja: "駐車スペースは、一軒宿さめうらの前のみです。",
        en: "Parking is available only in the space directly in front of Ikkenyado Sameura.",
      },
      parkingText2: {
        ja: "近隣の敷地や道路など、その他の場所には駐車しないようお願いいたします。",
        en: "Please do not park in neighboring properties, on the road, or anywhere else nearby.",
      },
      keySteps: [
        { ja: "カバーを下げます", en: "Lower the cover." },
        {
          ja: "事前にお知らせした番号にダイヤルを合わせます",
          en: "Set the dial to the number sent to you in advance.",
        },
        { ja: "黒いレバーを下げます", en: "Lower the black lever." },
        { ja: "鍵を取り出して入室してください", en: "Take out the key and enter." },
      ],
    },
    amenities: {
      intro: {
        ja: "タオルはご用意がございます。洗顔用具・パジャマなど、身の回り品はご持参ください。",
        en: "Towels are provided. Please bring your own toiletries and sleepwear.",
      },
      bath: {
        ja: "ボディーソープ・シャンプー・リンスは、お風呂場に備え付けのものをご利用いただけます。",
        en: "Body soap, shampoo, and conditioner are provided in the bathroom for your use.",
      },
    },
    toilet: {
      intro: { ja: "こちらのトイレは簡易水洗式です。", en: "This toilet is a simplified flush type." },
      steps: [
        { ja: "使用後はボタンを押して水を流してください。", en: "After use, press the button to flush." },
        {
          ja: "水流が弱いため、トイレットペーパーが流れにくい場合があります。",
          en: "Because the water flow is gentle, toilet paper may not flush easily.",
        },
        {
          ja: "トイレットペーパーは、弱い水流で無理に流そうとせず、備え付けの水鉄砲を使って流してください。",
          en: "Please don't force paper through with the weak flow — use the water gun provided to flush it instead.",
          emph: true,
        },
      ],
      videoUrl: "",
      noticeTitle: { ja: "節水にご協力ください", en: "Please help us conserve water" },
      noticeBody: {
        ja: "大量の水を流すと、汲み取り便槽がいっぱいになります。必要以上に水を流さないようお願いいたします。",
        en: "Flushing large amounts of water fills the holding tank quickly. Please avoid using more water than necessary.",
      },
    },
    bath: {
      note: {
        ja: "内容は準備中です。写真と詳しい手順は後日追加されます。",
        en: "This page is still being prepared. Photos and detailed steps will be added soon.",
      },
      stepTitles: [
        { ja: "浴槽の栓", en: "Bath plug" },
        { ja: "お湯をためる", en: "Filling the bath" },
        { ja: "必要な操作", en: "Other steps" },
      ],
    },
    kitchen: {
      body1: {
        ja: "キッチンの調理器具・食器・基本的な調味料は自由にお使いいただけます。",
        en: "You're welcome to use the kitchen's cookware, dishes, and basic seasonings freely.",
      },
      body2: { ja: "お米もご自由にお使いください。", en: "Rice is also available for you to use freely." },
      body3: {
        ja: "使用した食器・調理器具は、洗って元の場所へお戻しください。",
        en: "Please wash any dishes or cookware you use and return them to where you found them.",
      },
      seasonings: { ja: "塩・砂糖・醤油・みりん・味噌 など", en: "Salt, sugar, soy sauce, mirin, miso, and more" },
      equipment: {
        ja: "鍋・フライパン・包丁・食器なども利用可能です。",
        en: "Pots, pans, knives, and dishes are also available.",
      },
    },
    bbq: {
      body1: { ja: "BBQコンロは隣のガレージにあります。", en: "The BBQ grill is in the garage next door." },
      body2: { ja: "ご自由にお使いください。", en: "Please feel free to use it." },
      quietNote: {
        ja: "20:00以降の屋外でのBBQ、大きな声での会話はご遠慮ください。",
        en: "Please avoid outdoor BBQ and loud conversation outside after 20:00.",
      },
    },
    waste: {
      longStayNote: {
        ja: "室内のゴミ箱がいっぱいになりましたら、外のダストボックスへ入れてください。",
        en: "If the indoor bin fills up, please place your waste in the outdoor dust box.",
      },
    },
    announcement: {
      body: {
        ja: "当吉野地区では12時と17時に、警報のようなアラームが鳴ります。\nこちらは通常の町内放送で、災害の警報ではありませんのでご安心ください。\nその他の町内放送が流れる場合もあります。",
        en: "In the Yoshino area, an alarm-like sound is played at 12:00 and 17:00.\nThis is a regular local broadcast, not a disaster warning — there's no need for concern.\nOther public announcements may occasionally be broadcast as well.",
      },
    },
    longstay: { body: { ja: "", en: "" } },
    mail: { body: { ja: "", en: "" } },
    experience: {
      cards: [
        {
          key: "garden",
          titleJa: "畑・野菜",
          titleEn: "Garden & Vegetables",
          body: {
            ja: "一軒宿さめうらでは、庭の野菜や花などを滞在中に楽しむことができます。料理に利用できるものもあります。",
            en: "At Ikkenyado Sameura, you can enjoy the vegetables and flowers growing in the garden during your stay. Some can be used in cooking.",
          },
        },
        {
          key: "herbs",
          titleJa: "ハーブ",
          titleEn: "Herbs",
          body: {
            ja: "庭で育つハーブも、お料理にお役立てください。",
            en: "Herbs from the garden are also here for you to use in your cooking.",
          },
        },
        {
          key: "chickens",
          titleJa: "鶏と卵",
          titleEn: "Chickens & Eggs",
          body: {
            ja: "宿では鶏を飼っており、卵をお楽しみいただけます。卵は消毒されていないため、生食はお控えください。",
            en: "We keep chickens on the property and you're welcome to enjoy their eggs. As the eggs are not disinfected, please avoid eating them raw.",
          },
        },
        { key: "wild", titleJa: "庭の野草", titleEn: "Wild Plants", body: { ja: "", en: "" } },
      ],
    },
    local: { spots: { food: [], shopping: [], activities: [], spots: [] } },
    rules: {
      items: [
        {
          ja: "貴重品は、ご自身で管理をお願い致します。万が一、紛失や損失がございましても責任を負いかねますので、あらかじめご了承ください。",
          en: "Please look after your own valuables. We regret that we cannot be held responsible for any loss or damage.",
        },
        { ja: "ベッドやお布団での飲食はご遠慮ください。", en: "Please do not eat or drink on the beds or futons." },
        {
          ja: "館内はすべて禁煙です。喫煙される場合は敷地内の屋外で、灰皿はご自身でご用意ください。",
          en: "No smoking anywhere indoors. If smoking, please do so outdoors on the property and bring your own ashtray.",
        },
        {
          ja: "夜20時以降は、屋外でのBBQや大きな声での会話はご遠慮ください。近隣にお住まいの方へのご配慮にご協力をお願いします。",
          en: "Please avoid outdoor BBQ and loud conversation outdoors after 20:00, out of consideration for our neighbors.",
        },
        {
          ja: "宿泊者以外の方が入室される場合は、必ず事前にお知らせください。",
          en: "If anyone who is not a registered guest will be joining you, please let us know in advance.",
        },
      ],
    },
    help: {
      categories: [
        { ja: "お湯について", en: "About hot water" },
        { ja: "トイレについて", en: "About the toilet" },
        { ja: "設備について", en: "About the facilities" },
        { ja: "その他のお問い合わせ", en: "Other inquiries" },
      ],
    },
    other: {
      pet: {
        items: [
          {
            title: { ja: "しつけ・ノミ駆除について", en: "House-training & flea prevention" },
            body: {
              ja: "室内でトイレの粗相をしない「しつけ」のできたワンちゃんがお泊まりできます。ノミ駆除を済ませてからお越しください。普段粗相をしないワンちゃんでも、環境が変わると緊張して粗相をしてしまうことがあります。もし粗相をしてしまったら、飼い主様ご自身できれいに片付けた上、粗相の場所を必ずご報告ください(公式LINE等でご連絡ください)。",
              en: "Dogs that are house-trained (no accidents indoors) are welcome to stay. Please make sure fleas have been treated before your visit. Even dogs that don't normally have accidents may get nervous in an unfamiliar environment. If an accident happens, please clean it up yourself and be sure to let us know where it occurred (e.g. via our official LINE).",
            },
          },
          {
            title: { ja: "就寝はケージ・ベッドで", en: "Sleeping in their own crate or bed" },
            body: {
              ja: "ペットは専用のケージやベッドで寝かせてください。人用のベッド・お布団に乗せるのは厳禁です。",
              en: "Please have your pet sleep in their own crate or bed. Pets are strictly prohibited from getting on the human beds or futons.",
            },
          },
          {
            title: { ja: "畳エリアでは靴下を着用", en: "Socks required in tatami-mat areas" },
            body: {
              ja: "ペットが畳のエリアに入るときは、靴下を着用させてください。",
              en: "Please have your pet wear socks when entering tatami-mat areas.",
            },
          },
          {
            title: { ja: "浴室でのシャンプーについて", en: "Bathing & shampooing" },
            body: {
              ja: "浴室での愛犬の入浴・シャンプーはお控えください。外の洗い場でのシャンプーは可能です。ペット用シャンプーはご持参ください。浴室内のシャンプーはご利用いただけません。",
              en: "Please refrain from bathing or shampooing your dog in the indoor bathroom. Shampooing is allowed at the outdoor wash area — please bring your own pet shampoo, as indoor bathroom shampoo cannot be used on pets.",
            },
          },
          {
            title: { ja: "ペットのゴミについて", en: "Pet waste" },
            body: {
              ja: "ペットのゴミは専用のゴミ箱へお願いします。匂いが漏れないよう袋に入れて口をしっかり閉じてからお入れください。",
              en: "Please dispose of pet waste in the dedicated pet waste bin. Please seal it tightly in a bag to prevent odor before placing it in the bin.",
            },
          },
          {
            title: { ja: "ペット用品をお忘れの場合", en: "If you forget any pet supplies" },
            body: {
              ja: "当施設の備え付け以外のペット用品が必要な方は、お近くのマルニ・コメリ・末広等でペット用品のお取り扱いがございます。",
              en: "For pet supplies beyond what the property provides, nearby stores such as Maruni, Komeri, and Suehiro carry pet supplies.",
            },
          },
          {
            title: { ja: "畑・お庭でのトイレは禁止", en: "No pet toileting in the garden or fields" },
            body: {
              ja: "敷地内の畑やお庭でのペットのトイレはおやめください。畑やお庭の草花は、お客様が食用にも使われます。また木が枯れる可能性もございます。",
              en: "Please do not let your pet relieve itself in the garden or vegetable patch on the property. Guests also use the plants there for food, and it could damage or kill the plants.",
            },
          },
          {
            title: { ja: "チェックアウト時の清掃にご協力ください", en: "Please help with cleanup at check-out" },
            body: {
              ja: "ペットのトイレの始末、抜け毛は粘着テープで取るなど、お掃除にご協力をお願いいたします。",
              en: "Please help clean up after your pet — dispose of pet waste and use a lint roller or tape to remove pet hair, etc.",
            },
          },
        ],
      },
    },
  },
};
