// ゲスト向けページの共通ヘッダー(戻るボタン・施設名・言語切り替え)。
// 言語は ?lang=ja / ?lang=en というクエリで管理しているため、
// サーバーコンポーネントのままリンクだけで切り替えられます。
export default function PageHeader({ facilityId, lang, backHref, currentPath }) {
  const mk = (l) => `${currentPath}?lang=${l}`;
  return (
    <div className="topbar">
      {backHref !== null ? (
        <a className="back-btn" href={backHref} aria-label={lang === "ja" ? "戻る" : "Back"}>
          ‹
        </a>
      ) : (
        <span style={{ width: 34, height: 34 }} />
      )}
      <a className="brandmark" href={`/${facilityId}?lang=${lang}`}>
        {lang === "ja" ? "一軒宿さめうら" : "IKKENYADO SAMEURA"}
      </a>
      <span className="langtoggle">
        <a href={mk("ja")} data-active={lang === "ja"}>
          JA
        </a>
        <a href={mk("en")} data-active={lang === "en"}>
          EN
        </a>
      </span>
    </div>
  );
}
