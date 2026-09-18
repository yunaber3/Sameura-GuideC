import { notFound } from "next/navigation";
import { getProperty, getPublishedContent } from "@/lib/content";
import { isAdminRequest } from "@/lib/session";
import { normalizeLang, t } from "@/lib/t";
import PageHeader from "@/components/PageHeader";
import EditPageFab from "@/components/EditPageFab";
import Icon from "@/components/Icon";

const NAV_CARDS = [
  { key: "arrival", ja: "到着・チェックイン", en: "Arrival & Check-in", ic: "car", built: true },
  { key: "stay", ja: "滞在中のご案内", en: "Your Stay", ic: "home", built: true },
  { key: "experience", ja: "さめうらを楽しむ", en: "Experience Sameura", ic: "leaf", built: false },
  { key: "local", ja: "周辺案内", en: "Local Guide", ic: "mappin", built: false },
  { key: "rules", ja: "宿泊ルール", en: "House Rules", ic: "clipboard", built: true },
  { key: "checkout", ja: "チェックアウト", en: "Check-out", ic: "key", built: true },
];

export default async function FacilityTopPage({ params, searchParams }) {
  const facilityId = params.facility;
  const lang = normalizeLang(searchParams?.lang);

  const [prop, content, admin] = await Promise.all([
    getProperty(facilityId),
    getPublishedContent(facilityId),
    isAdminRequest(),
  ]);

  if (!prop) notFound();
  if (!prop.enabled || !content) {
    return (
      <div className="page">
        <PageHeader facilityId={facilityId} lang={lang} backHref={null} currentPath={`/${facilityId}`} />
        <div className="empty-note">
          {lang === "ja" ? "このGuest Guideは近日公開予定です。" : "This Guest Guide is coming soon."}
        </div>
      </div>
    );
  }

  const heroUrl = content.photos?.hero;
  const intro = t(content.pages?.top?.intro, lang);

  return (
    <div className="page">
      <PageHeader facilityId={facilityId} lang={lang} backHref={null} currentPath={`/${facilityId}`} />

      <div className="hero-photo">
        {heroUrl ? (
          <img src={heroUrl} alt="" />
        ) : (
          <div className="photoph" style={{ height: "100%", margin: 0, borderRadius: 0 }}>
            <span className="icon">📷</span>
            <span className="cap">{lang === "ja" ? "宿の外観写真" : "Exterior photo of the inn"}</span>
          </div>
        )}
      </div>

      <div className="hero-sheet">
        <div className="eyebrow">Guest Guide</div>
        <h1>{prop.name_ja}</h1>
        <div className="en-name">{prop.name_en}</div>
        <p className="lede">{intro}</p>
      </div>

      <div className="navgrid">
        {NAV_CARDS.map((c) =>
          c.built ? (
            <a key={c.key} className="navcard" href={`/${facilityId}/${c.key}?lang=${lang}`}>
              <span className="tile-ic">
                <Icon name={c.ic} />
              </span>
              <span>
                <span className="jp">{lang === "ja" ? c.ja : c.en}</span>
                <span className="en">{c.en}</span>
              </span>
            </a>
          ) : (
            <div key={c.key} className="navcard" style={{ cursor: "default", opacity: 0.45 }}>
              <span className="tile-ic">
                <Icon name={c.ic} />
              </span>
              <span>
                <span className="jp">{lang === "ja" ? c.ja : c.en}</span>
                <span className="en">{lang === "ja" ? "準備中" : "Coming soon"}</span>
              </span>
            </div>
          )
        )}
      </div>

      <div className="needhelp">
        <div className="t">{lang === "ja" ? "困ったとき" : "Need help?"}</div>
        <a href={`/${facilityId}/help?lang=${lang}`}>{lang === "ja" ? "表示" : "View"}</a>
      </div>

      {admin && (
        <EditPageFab editHref={`/admin/${facilityId}/edit?lang=${lang}`} lang={lang} />
      )}
    </div>
  );
}
