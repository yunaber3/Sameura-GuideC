import { notFound } from "next/navigation";
import { getProperty, getContentStatus } from "@/lib/content";
import { normalizeLang } from "@/lib/t";
import EditBar from "@/components/EditBar";
import EditableText from "@/components/EditableText";
import EditablePhoto from "@/components/EditablePhoto";
import Icon from "@/components/Icon";

const NAV_CARDS = [
  { key: "arrival", ja: "到着・チェックイン", en: "Arrival & Check-in", ic: "car" },
  { key: "stay", ja: "滞在中のご案内", en: "Your Stay", ic: "home" },
  { key: "experience", ja: "さめうらを楽しむ", en: "Experience Sameura", ic: "leaf" },
  { key: "local", ja: "周辺案内", en: "Local Guide", ic: "mappin" },
  { key: "rules", ja: "宿泊ルール", en: "House Rules", ic: "clipboard" },
  { key: "checkout", ja: "チェックアウト", en: "Check-out", ic: "key" },
];

export default async function EditTopPage({ params, searchParams }) {
  const facilityId = params.facility;
  const lang = normalizeLang(searchParams?.lang);

  const [prop, status] = await Promise.all([getProperty(facilityId), getContentStatus(facilityId)]);
  if (!prop || !status) notFound();

  const content = status.draft;
  const heroUrl = content.photos?.hero;

  return (
    <div className="page">
      <EditBar
        facilityId={facilityId}
        lang={lang}
        dirty={status.dirty}
        guestHref={`/${facilityId}?lang=${lang}`}
        currentEditPath={`/admin/${facilityId}/edit`}
      />

      <div className="hero-photo">
        <EditablePhoto
          facilityId={facilityId}
          slot="hero"
          url={heroUrl}
          labelJa="宿の外観写真"
          labelEn="Exterior photo of the inn"
          lang={lang}
          className="photoph"
        />
      </div>

      <div className="hero-sheet">
        <div className="eyebrow">Guest Guide</div>
        <h1>{prop.name_ja}</h1>
        <div className="en-name">{prop.name_en}</div>
        <div className="lede">
          <EditableText
            facilityId={facilityId}
            path={`pages.top.intro.${lang}`}
            initialValue={content.pages?.top?.intro?.[lang]}
            multiline
            placeholder={lang === "ja" ? "トップページの案内文" : "Top page intro text"}
          />
        </div>
      </div>

      <div className="navgrid">
        {NAV_CARDS.map((c) => (
          <div key={c.key} className="navcard" style={{ cursor: "default" }}>
            <span className="tile-ic">
              <Icon name={c.ic} />
            </span>
            <span>
              <span className="jp">{lang === "ja" ? c.ja : c.en}</span>
              <span className="en">{c.en}</span>
            </span>
          </div>
        ))}
      </div>
      <p style={{ textAlign: "center", fontSize: 12, color: "var(--ink-muted)", margin: "4px 20px 20px" }}>
        {lang === "ja"
          ? "※ メニューカードの項目名は現時点では固定です(文言編集は今後追加予定)。"
          : "Menu card labels are fixed for now (text editing coming soon)."}
      </p>
    </div>
  );
}
