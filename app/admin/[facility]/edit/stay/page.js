import { notFound } from "next/navigation";
import { getProperty, getContentStatus } from "@/lib/content";
import { normalizeLang } from "@/lib/t";
import EditBar from "@/components/EditBar";

const ITEMS = [
  { k: "amenities", ja: "アメニティ", en: "Amenities" },
  { k: "wifi", ja: "Wi-Fi", en: "Wi-Fi" },
  { k: "toilet", ja: "トイレ", en: "Toilet" },
  { k: "bath", ja: "お風呂", en: "Bath" },
  { k: "kitchen", ja: "キッチン・お米", en: "Kitchen & Rice" },
  { k: "bbq", ja: "BBQ", en: "BBQ" },
  { k: "waste", ja: "ゴミ", en: "Waste" },
  { k: "announcement", ja: "町内放送", en: "Town Announcement" },
  { k: "longstay", ja: "長期滞在のお客様", en: "Long Stay" },
  { k: "mail", ja: "郵便物・宅配", en: "Mail & Delivery" },
];

export default async function EditStayMenuPage({ params, searchParams }) {
  const facilityId = params.facility;
  const lang = normalizeLang(searchParams?.lang);
  const [prop, status] = await Promise.all([getProperty(facilityId), getContentStatus(facilityId)]);
  if (!prop || !status) notFound();

  return (
    <div className="page">
      <EditBar
        facilityId={facilityId}
        lang={lang}
        dirty={status.dirty}
        guestHref={`/${facilityId}/stay?lang=${lang}`}
        currentEditPath={`/admin/${facilityId}/edit/stay`}
      />
      <div className="pagehead">
        <div className="en-label">Your Stay</div>
        <h1>{lang === "ja" ? "滞在中のご案内" : "Your Stay"}</h1>
      </div>
      <ul className="menulist">
        {ITEMS.map((i) => (
          <li key={i.k}>
            <a href={`/admin/${facilityId}/edit/stay/${i.k}?lang=${lang}`}>
              <span>
                <span className="jp">{lang === "ja" ? i.ja : i.en}</span>
                <span className="en">{i.en}</span>
              </span>
              <span className="arrow">›</span>
            </a>
          </li>
        ))}
      </ul>
      <p style={{ padding: "0 20px", fontSize: 12.5, color: "var(--ink-muted)" }}>
        {lang === "ja"
          ? "各ページを開いて、文章をタップすると編集できます。"
          : "Open each page and tap the text to edit it."}
      </p>
    </div>
  );
}
