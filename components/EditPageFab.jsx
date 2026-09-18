// ゲスト画面を管理者として見ているときだけ表示される、
// 「このページを編集」ボタン。押すと同じページの編集モードへ移動する。
export default function EditPageFab({ editHref, lang }) {
  return (
    <a className="edit-page-btn" href={editHref}>
      ✎ {lang === "ja" ? "このページを編集" : "Edit this page"}
    </a>
  );
}
