import { notFound } from "next/navigation";
import { getProperty, getContentStatus } from "@/lib/content";
import { normalizeLang, t } from "@/lib/t";
import EditBar from "@/components/EditBar";
import EditableText from "@/components/EditableText";
import EditablePhoto from "@/components/EditablePhoto";

export default async function EditToiletPage({ params, searchParams }) {
  const facilityId = params.facility;
  const lang = normalizeLang(searchParams?.lang);
  const [prop, status] = await Promise.all([getProperty(facilityId), getContentStatus(facilityId)]);
  if (!prop || !status) notFound();

  const content = status.draft;
  const p = content.pages?.toilet || {};
  const toiletUrl = content.photos?.toilet;

  return (
    <div className="page">
      <EditBar
        facilityId={facilityId}
        lang={lang}
        dirty={status.dirty}
        guestHref={`/${facilityId}/stay/toilet?lang=${lang}`}
        currentEditPath={`/admin/${facilityId}/edit/stay/toilet`}
      />
      <div style={{ margin: "0 20px" }}>
        <EditablePhoto
          facilityId={facilityId}
          slot="toilet"
          url={toiletUrl}
          labelJa="トイレ全体の写真"
          labelEn="Photo of the toilet"
          lang={lang}
        />
      </div>
      <div className="pagehead" style={{ paddingTop: 8 }}>
        <div className="en-label">Toilet</div>
        <h1>{lang === "ja" ? "簡易水洗トイレの使い方" : "How to Use the Simplified Flush Toilet"}</h1>
      </div>
      <div className="section">
        <p className="lede">
          <EditableText facilityId={facilityId} path={`pages.toilet.intro.${lang}`} initialValue={t(p.intro, lang)} />
        </p>
        <div className="card">
          <ol className="steps" style={{ padding: 0 }}>
            {(p.steps || []).map((s, i) => (
              <li key={i}>
                <span className="num">{i + 1}</span>
                <span className={"txt" + (s.emph ? " emph" : "")}>
                  <EditableText
                    facilityId={facilityId}
                    path={`pages.toilet.steps.${i}.${lang}`}
                    initialValue={t(s, lang)}
                  />
                </span>
              </li>
            ))}
          </ol>
        </div>
        <p style={{ fontSize: 11.5, color: "var(--ink-muted)", marginBottom: 14 }}>
          Video URL:{" "}
          <EditableText facilityId={facilityId} path="pages.toilet.videoUrl" initialValue={p.videoUrl} />
        </p>
        <div className="notice">
          <p className="nt-title">
            <EditableText
              facilityId={facilityId}
              path={`pages.toilet.noticeTitle.${lang}`}
              initialValue={t(p.noticeTitle, lang)}
            />
          </p>
          <div className="nt-body">
            <EditableText
              facilityId={facilityId}
              path={`pages.toilet.noticeBody.${lang}`}
              initialValue={t(p.noticeBody, lang)}
              multiline
            />
          </div>
        </div>
      </div>
    </div>
  );
}
