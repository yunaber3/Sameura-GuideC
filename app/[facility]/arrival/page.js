import { notFound } from "next/navigation";
import { getProperty, getPublishedContent } from "@/lib/content";
import { isAdminRequest } from "@/lib/session";
import { normalizeLang, t } from "@/lib/t";
import PageHeader from "@/components/PageHeader";
import EditPageFab from "@/components/EditPageFab";

export default async function ArrivalPage({ params, searchParams }) {
  const facilityId = params.facility;
  const lang = normalizeLang(searchParams?.lang);

  const [prop, content, admin] = await Promise.all([
    getProperty(facilityId),
    getPublishedContent(facilityId),
    isAdminRequest(),
  ]);
  if (!prop || !content) notFound();

  const p = content.pages?.arrival || {};
  const parkingUrl = content.photos?.parking;

  return (
    <div className="page">
      <PageHeader
        facilityId={facilityId}
        lang={lang}
        backHref={`/${facilityId}?lang=${lang}`}
        currentPath={`/${facilityId}/arrival`}
      />
      <div className="pagehead">
        <div className="en-label">Arrival</div>
        <h1>{lang === "ja" ? "到着・チェックイン" : "Arrival & Check-in"}</h1>
      </div>

      <div className="timecard">
        <div className="half">
          <div className="lab">{lang === "ja" ? "チェックイン" : "Check-in"}</div>
          <div className="val">
            {t(p.checkinFrom, lang)} – {t(p.checkinTo, lang)}
          </div>
        </div>
        <div className="half">
          <div className="lab">{lang === "ja" ? "チェックアウト" : "Check-out"}</div>
          <div className="val">
            {t(p.checkoutBy, lang)}
            {lang === "ja" ? "まで" : ""}
          </div>
        </div>
      </div>

      <div className="section">
        <h2>{lang === "ja" ? "アクセス" : "Access"}</h2>
        <p className="lede">{p.address}</p>
        <a className="link-cta" href={p.mapUrl} target="_blank" rel="noreferrer">
          {lang === "ja" ? "Google Mapsで開く" : "Open in Google Maps"}
        </a>
        {t(p.carNote, lang) && <p className="lede" style={{ marginTop: 14 }}>{t(p.carNote, lang)}</p>}

        <details className="card" style={{ padding: "4px 18px" }}>
          <summary style={{ padding: "12px 0", cursor: "pointer" }}>
            {lang === "ja" ? "公共交通機関でお越しの方" : "Arriving by public transport"}
          </summary>
          <ol className="steps" style={{ padding: 0 }}>
            {(p.transitSteps || []).map((s, i) => (
              <li key={i}>
                <span className="num">{i + 1}</span>
                <span className="txt">{t(s, lang)}</span>
              </li>
            ))}
          </ol>
          <p style={{ marginTop: 10, marginBottom: 14, color: "var(--ink-muted)", fontSize: 13 }}>
            {t(p.transitNote, lang)}
          </p>
        </details>
      </div>

      <div className="section">
        <h2>{lang === "ja" ? "駐車場" : "Parking"}</h2>
        <div className="photoph">
          {parkingUrl ? (
            <img src={parkingUrl} alt="" />
          ) : (
            <>
              <span className="icon">📷</span>
              <span className="cap">
                {lang === "ja" ? "宿の外観写真(駐車スペース)" : "Exterior photo showing the parking space"}
              </span>
            </>
          )}
        </div>
        <p className="lede">{t(p.parkingText1, lang)}</p>
        <p className="lede">{t(p.parkingText2, lang)}</p>
      </div>

      <div className="section">
        <h2>{lang === "ja" ? "鍵・入室" : "Key & Entry"}</h2>
        <div className="card">
          <ol className="steps" style={{ padding: 0 }}>
            {(p.keySteps || []).map((s, i) => (
              <li key={i}>
                <span className="num">{i + 1}</span>
                <span className="txt">{t(s, lang)}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="pagefoot">
        <a href={`/${facilityId}/help?lang=${lang}`}>{lang === "ja" ? "困ったとき" : "Need help?"}</a>
      </div>

      {admin && <EditPageFab editHref={`/admin/${facilityId}/edit/arrival?lang=${lang}`} lang={lang} />}
    </div>
  );
}
