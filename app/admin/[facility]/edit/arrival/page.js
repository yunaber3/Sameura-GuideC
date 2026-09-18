import { notFound } from "next/navigation";
import { getProperty, getContentStatus } from "@/lib/content";
import { normalizeLang, t } from "@/lib/t";
import EditBar from "@/components/EditBar";
import EditableText from "@/components/EditableText";
import EditablePhoto from "@/components/EditablePhoto";

export default async function EditArrivalPage({ params, searchParams }) {
  const facilityId = params.facility;
  const lang = normalizeLang(searchParams?.lang);

  const [prop, status] = await Promise.all([getProperty(facilityId), getContentStatus(facilityId)]);
  if (!prop || !status) notFound();

  const content = status.draft;
  const p = content.pages?.arrival || {};
  const parkingUrl = content.photos?.parking;

  return (
    <div className="page">
      <EditBar
        facilityId={facilityId}
        lang={lang}
        dirty={status.dirty}
        guestHref={`/${facilityId}/arrival?lang=${lang}`}
        currentEditPath={`/admin/${facilityId}/edit/arrival`}
      />
      <div className="pagehead">
        <div className="en-label">Arrival</div>
        <h1>{lang === "ja" ? "到着・チェックイン" : "Arrival & Check-in"}</h1>
      </div>

      <div className="timecard">
        <div className="half">
          <div className="lab">{lang === "ja" ? "チェックイン" : "Check-in"}</div>
          <div className="val">
            <EditableText
              facilityId={facilityId}
              path={`pages.arrival.checkinFrom.${lang}`}
              initialValue={t(p.checkinFrom, lang)}
            />
            {" – "}
            <EditableText
              facilityId={facilityId}
              path={`pages.arrival.checkinTo.${lang}`}
              initialValue={t(p.checkinTo, lang)}
            />
          </div>
        </div>
        <div className="half">
          <div className="lab">{lang === "ja" ? "チェックアウト" : "Check-out"}</div>
          <div className="val">
            <EditableText
              facilityId={facilityId}
              path={`pages.arrival.checkoutBy.${lang}`}
              initialValue={t(p.checkoutBy, lang)}
            />
            {lang === "ja" ? "まで" : ""}
          </div>
        </div>
      </div>

      <div className="section">
        <h2>{lang === "ja" ? "アクセス" : "Access"}</h2>
        <p className="lede">
          <EditableText facilityId={facilityId} path="pages.arrival.address" initialValue={p.address} />
        </p>
        <p style={{ fontSize: 11.5, color: "var(--ink-muted)", marginBottom: 14 }}>
          Google Maps URL:{" "}
          <EditableText facilityId={facilityId} path="pages.arrival.mapUrl" initialValue={p.mapUrl} />
        </p>
        <div className="lede">
          <EditableText
            facilityId={facilityId}
            path={`pages.arrival.carNote.${lang}`}
            initialValue={t(p.carNote, lang)}
            multiline
            placeholder={lang === "ja" ? "車でのアクセス案内(空欄でも構いません)" : "Driving directions (optional)"}
          />
        </div>

        <div className="card" style={{ padding: "4px 18px" }}>
          <p style={{ padding: "12px 0 0", fontWeight: 600, fontSize: 13 }}>
            {lang === "ja" ? "公共交通機関でお越しの方" : "Arriving by public transport"}
          </p>
          <ol className="steps" style={{ padding: 0 }}>
            {(p.transitSteps || []).map((s, i) => (
              <li key={i}>
                <span className="num">{i + 1}</span>
                <span className="txt">
                  <EditableText
                    facilityId={facilityId}
                    path={`pages.arrival.transitSteps.${i}.${lang}`}
                    initialValue={t(s, lang)}
                  />
                </span>
              </li>
            ))}
          </ol>
          <p style={{ padding: "0 0 14px", color: "var(--ink-muted)", fontSize: 13 }}>
            <EditableText
              facilityId={facilityId}
              path={`pages.arrival.transitNote.${lang}`}
              initialValue={t(p.transitNote, lang)}
            />
          </p>
        </div>
      </div>

      <div className="section">
        <h2>{lang === "ja" ? "駐車場" : "Parking"}</h2>
        <EditablePhoto
          facilityId={facilityId}
          slot="parking"
          url={parkingUrl}
          labelJa="宿の外観写真(駐車スペース)"
          labelEn="Exterior photo showing the parking space"
          lang={lang}
        />
        <p className="lede">
          <EditableText
            facilityId={facilityId}
            path={`pages.arrival.parkingText1.${lang}`}
            initialValue={t(p.parkingText1, lang)}
          />
        </p>
        <p className="lede">
          <EditableText
            facilityId={facilityId}
            path={`pages.arrival.parkingText2.${lang}`}
            initialValue={t(p.parkingText2, lang)}
          />
        </p>
      </div>

      <div className="section">
        <h2>{lang === "ja" ? "鍵・入室" : "Key & Entry"}</h2>
        <div className="card">
          <ol className="steps" style={{ padding: 0 }}>
            {(p.keySteps || []).map((s, i) => (
              <li key={i}>
                <span className="num">{i + 1}</span>
                <span className="txt">
                  <EditableText
                    facilityId={facilityId}
                    path={`pages.arrival.keySteps.${i}.${lang}`}
                    initialValue={t(s, lang)}
                  />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
