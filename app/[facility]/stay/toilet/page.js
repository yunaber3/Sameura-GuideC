import { notFound } from "next/navigation";
import { getProperty, getPublishedContent } from "@/lib/content";
import { isAdminRequest } from "@/lib/session";
import { normalizeLang, t } from "@/lib/t";
import PageHeader from "@/components/PageHeader";
import EditPageFab from "@/components/EditPageFab";

export default async function ToiletPage({ params, searchParams }) {
  const facilityId = params.facility;
  const lang = normalizeLang(searchParams?.lang);
  const [prop, content, admin] = await Promise.all([
    getProperty(facilityId),
    getPublishedContent(facilityId),
    isAdminRequest(),
  ]);
  if (!prop || !content) notFound();

  const p = content.pages?.toilet || {};
  const toiletUrl = content.photos?.toilet;

  return (
    <div className="page">
      <PageHeader
        facilityId={facilityId}
        lang={lang}
        backHref={`/${facilityId}/stay?lang=${lang}`}
        currentPath={`/${facilityId}/stay/toilet`}
      />
      <div className="photoph" style={{ margin: "0 20px 0", aspectRatio: "3/2" }}>
        {toiletUrl ? (
          <img src={toiletUrl} alt="" />
        ) : (
          <>
            <span className="icon">📷</span>
            <span className="cap">{lang === "ja" ? "トイレ全体の写真" : "Photo of the toilet"}</span>
          </>
        )}
      </div>
      <div className="pagehead" style={{ paddingTop: 8 }}>
        <div className="en-label">Toilet</div>
        <h1>{lang === "ja" ? "簡易水洗トイレの使い方" : "How to Use the Simplified Flush Toilet"}</h1>
      </div>
      <div className="section">
        <p className="lede">{t(p.intro, lang)}</p>
        <div className="card">
          <ol className="steps" style={{ padding: 0 }}>
            {(p.steps || []).map((s, i) => (
              <li key={i}>
                <span className="num">{i + 1}</span>
                <span className={"txt" + (s.emph ? " emph" : "")}>{t(s, lang)}</span>
              </li>
            ))}
          </ol>
        </div>
        {p.videoUrl && (
          <a className="link-cta" href={p.videoUrl} target="_blank" rel="noreferrer">
            {lang === "ja" ? "動画で使い方を見る" : "Watch the how-to video"}
          </a>
        )}
        <div className="notice">
          <p className="nt-title">{t(p.noticeTitle, lang)}</p>
          <p className="nt-body">{t(p.noticeBody, lang)}</p>
        </div>
      </div>
      <div className="pagefoot">
        <a href={`/${facilityId}/help?lang=${lang}`}>{lang === "ja" ? "困ったとき" : "Need help?"}</a>
      </div>
      {admin && <EditPageFab editHref={`/admin/${facilityId}/edit/stay/toilet?lang=${lang}`} lang={lang} />}
    </div>
  );
}
