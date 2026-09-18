import { notFound } from "next/navigation";
import { getProperty, getPublishedContent } from "@/lib/content";
import { normalizeLang, t } from "@/lib/t";
import PageHeader from "@/components/PageHeader";

export default async function HelpPage({ params, searchParams }) {
  const facilityId = params.facility;
  const lang = normalizeLang(searchParams?.lang);
  const [prop, content] = await Promise.all([getProperty(facilityId), getPublishedContent(facilityId)]);
  if (!prop || !content) notFound();

  const p = content.pages?.help || {};
  const contact = content.settings?.contact || {};

  return (
    <div className="page">
      <PageHeader
        facilityId={facilityId}
        lang={lang}
        backHref={`/${facilityId}?lang=${lang}`}
        currentPath={`/${facilityId}/help`}
      />
      <div className="pagehead">
        <div className="en-label">Need Help?</div>
        <h1>{lang === "ja" ? "困ったとき" : "Need Help?"}</h1>
      </div>
      <div className="section">
        {(p.categories || []).map((c, i) => (
          <div key={i} className="card" style={{ padding: "14px 16px" }}>
            <p style={{ margin: 0, fontSize: 13.5 }}>{t(c, lang)}</p>
          </div>
        ))}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24 }}>
          {contact.line && (
            <a
              href={contact.line}
              target="_blank"
              rel="noreferrer"
              style={{
                textAlign: "center",
                padding: 15,
                borderRadius: "var(--radius-pill)",
                background: "var(--accent)",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              {lang === "ja" ? "LINEで問い合わせる" : "Contact us on LINE"}
            </a>
          )}
          {contact.tel && (
            <a
              href={`tel:${contact.tel}`}
              style={{
                textAlign: "center",
                padding: 15,
                borderRadius: "var(--radius-pill)",
                background: "var(--bg-elevated)",
                boxShadow: "var(--shadow-card)",
                color: "var(--ink)",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              {contact.tel}
            </a>
          )}
          {!contact.line && !contact.tel && !contact.email && (
            <p style={{ color: "var(--ink-muted)", fontSize: 13 }}>
              {lang === "ja" ? "連絡先は管理画面から設定できます。" : "Contact details can be set from the admin panel."}
            </p>
          )}
        </div>
        <a
          href={`/${facilityId}/other?lang=${lang}`}
          style={{ display: "block", marginTop: 24, fontSize: 12.5, color: "var(--ink-muted)" }}
        >
          {lang === "ja" ? "ペット同伴のお客様について →" : "For guests with pets →"}
        </a>
      </div>
    </div>
  );
}
