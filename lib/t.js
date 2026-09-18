// {ja, en} 形式のオブジェクトから指定言語のテキストを取り出す。
// 見つからなければもう一方の言語にフォールバックする。
export function t(obj, lang) {
  if (!obj) return "";
  return obj[lang] || obj.ja || obj.en || "";
}

export function normalizeLang(value) {
  return value === "en" ? "en" : "ja";
}
