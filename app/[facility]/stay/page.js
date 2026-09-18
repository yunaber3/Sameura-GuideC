import { notFound } from "next/navigation";
import { getProperty, getPublishedContent } from "@/lib/content";
import { isAdminRequest } from "@/lib/session";
import { normalizeLang } from "@/lib/t";
import PageHeader from "@/components/PageHeader";
import EditPageFab from "@/components/EditPageFab";

// "built: true" のものだけ実際のページが用意されています。
// それ以外は同じ画面構造の中に順番に追加していく予定の項目です。
const ITEMS = [
  { k: "amenities", ja: "アメニティ", en: "Amenities", built: true },
  { k: "wifi", ja: "Wi-Fi", en: "Wi-Fi", built: true },
  { k: "toilet", ja: "トイレ", en: "Toilet", built: true },
  { k: "bath", ja: "お風呂", en: "Bath", built: true },
  { k: "kitchen", ja: "キッチン・お米", en: "Kitchen & Rice", built: true },
  { k: "bbq", ja: "BBQ", en: "BBQ", built: true },
  { k: "waste", ja: "ゴミ", en: "Waste", built: true },
  { k: "announcement", ja: "町内放送", en: "Town Announcement", built: true },
  { k: "longstay", ja: "長期滞在のお客様", en: "Long Stay", built: true },
  { k: "mail", ja: "郵便物・宅配", en: "Mail & Delivery", built: true },
];

export default async function StayMenuPage({ params, searchParams }) {
  const facilityId = params.facility;
  const lang = normalizeLang(searchParams?.lang);
  const [prop, content, admin] = await Promise.all([
    getProperty(facilityId),
    getPublishedContent(facilityId),
    isAdminRequest(),
  ]);
  if (!prop || !content) notFound();

  return (
    <div className="page">
      <PageHeader
        facilityId={facilityId}
        lang={lang}
        backHref={`/${facilityId}?lang=${lang}`}
        currentPath={`/${facilityId}/stay`}
      />
      <div className="pagehead">
        <div className="en-label">Your Stay</div>
        <h1>{lang === "ja" ? "滞在中のご案内" : "Your Stay"}</h1>
      </div>
      <ul className="menulist">
        {ITEMS.map((i) => (
          <li key={i.k}>
            {i.built ? (
              <a href={`/${facilityId}/stay/${i.k}?lang=${lang}`}>
                <span>
                  <span className="jp">{lang === "ja" ? i.ja : i.en}</span>
                  <span className="en">{i.en}</span>
                </span>
                <span className="arrow">›</span>
              </a>
            ) : (
              <div className="disabled-row">
                <span>
                  <span className="jp">{lang === "ja" ? i.ja : i.en}</span>
                  <span className="en">{lang === "ja" ? "準備中 / Coming soon" : "Coming soon"}</span>
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="pagefoot">
        <a href={`/${facilityId}/help?lang=${lang}`}>{lang === "ja" ? "困ったとき" : "Need help?"}</a>
      </div>
      {admin && <EditPageFab editHref={`/admin/${facilityId}/edit/stay?lang=${lang}`} lang={lang} />}
    </div>
  );
}
