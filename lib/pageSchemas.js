// 「トイレ」「BBQ」「ゴミ」など、残りの案内ページをコードを1ページずつ
// 書かずに追加できるようにするための定義ファイルです。
// 新しいページを増やしたいときは、ここに1つオブジェクトを足すだけで済みます
// (ゲスト画面・編集画面の両方に自動で反映されます)。
//
// 各ページは title と blocks(ブロックの配列)で構成します。
// ブロックの種類:
//   lead      … 1つの複数行テキスト(挨拶文など)
//   photo     … 写真1枚(スロット名を指定)
//   steps     … 番号付きの手順リスト
//   notice    … タイトル+本文の注意書きボックス
//   list      … 見出し+本文のカードの並び(ルールやペット案内など)
//   text      … 短い一行テキストが複数並ぶもの
//   checklist … チェックボックス付きリスト(表示のみ、状態は保存しない)

export const PAGE_SCHEMAS = {
  "stay/wifi": {
    titleJa: "Wi-Fi",
    titleEn: "Wi-Fi",
    enLabel: "Wi-Fi",
    backTo: "stay",
    blocks: [{ type: "wifi" }],
  },
  "stay/amenities": {
    titleJa: "アメニティ",
    titleEn: "Amenities",
    enLabel: "Amenities",
    backTo: "stay",
    blocks: [
      { type: "text", path: "intro", placeholderJa: "持参のお願い", placeholderEn: "What to bring" },
      {
        type: "notice",
        titleJa: "お風呂場に備え付け",
        titleEn: "Provided in the bathroom",
        path: "bath",
      },
    ],
  },
  "stay/bath": {
    titleJa: "お風呂",
    titleEn: "Bath",
    enLabel: "Bath",
    backTo: "stay",
    blocks: [
      { type: "text", path: "note" },
      { type: "steps", path: "stepTitles", suffixJa: "(準備中)", suffixEn: "(details coming soon)" },
    ],
  },
  "stay/kitchen": {
    titleJa: "キッチン・お米",
    titleEn: "Kitchen & Rice",
    enLabel: "Kitchen & Rice",
    backTo: "stay",
    blocks: [
      { type: "text", path: "body1" },
      { type: "text", path: "body2" },
      { type: "text", path: "body3" },
      { type: "notice", titleJa: "用意している調味料", titleEn: "Seasonings provided", path: "seasonings" },
      { type: "text", path: "equipment" },
    ],
  },
  "stay/bbq": {
    titleJa: "BBQ",
    titleEn: "BBQ",
    enLabel: "BBQ",
    backTo: "stay",
    blocks: [
      { type: "photo", slot: "bbq", labelJa: "BBQコンロの写真", labelEn: "Photo of the BBQ grill" },
      { type: "text", path: "body1" },
      { type: "text", path: "body2" },
      { type: "notice", path: "quietNote" },
    ],
  },
  "stay/waste": {
    titleJa: "ゴミ",
    titleEn: "Waste",
    enLabel: "Waste",
    backTo: "stay",
    blocks: [
      {
        type: "notice",
        titleJa: "2泊以上のお客様へ",
        titleEn: "For guests staying 2 nights or more",
        path: "longStayNote",
      },
      { type: "photo", slot: "wasteBin", labelJa: "外のダストボックスの写真", labelEn: "Photo of the outdoor dust box" },
    ],
  },
  "stay/announcement": {
    titleJa: "町内放送について",
    titleEn: "Town Announcements",
    enLabel: "Town Announcement",
    backTo: "stay",
    blocks: [{ type: "text", path: "body", multiline: true }],
  },
  "stay/longstay": {
    titleJa: "長期滞在のお客様",
    titleEn: "Long Stay",
    enLabel: "Long Stay",
    backTo: "stay",
    blocks: [{ type: "text", path: "body" }],
  },
  "stay/mail": {
    titleJa: "郵便物・宅配",
    titleEn: "Mail & Delivery",
    enLabel: "Mail & Delivery",
    backTo: "stay",
    blocks: [{ type: "text", path: "body" }],
  },
  rules: {
    titleJa: "宿泊ルール",
    titleEn: "House Rules",
    enLabel: "House Rules",
    backTo: "",
    blocks: [{ type: "list", path: "items", style: "plain" }],
  },
  checkout: {
    titleJa: "チェックアウト",
    titleEn: "Check-out",
    enLabel: "Check-out",
    backTo: "",
    blocks: [
      { type: "checklist" },
      { type: "photo", slot: "checkoutKeybox", labelJa: "外にある黒い鍵付きポストの写真", labelEn: "Photo of the black locked postbox outside" },
    ],
  },
  other: {
    titleJa: "ペット同伴のお客様へ",
    titleEn: "For Guests Traveling with Pets",
    enLabel: "Pet Guests",
    backTo: "",
    blocks: [{ type: "list", path: "pet.items", style: "card" }],
  },
};

export function getPageSchema(slug) {
  return PAGE_SCHEMAS[slug] || null;
}
