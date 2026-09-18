import { t } from "@/lib/t";
import { getByPath } from "@/lib/content";
import EditableText from "@/components/EditableText";
import EditablePhoto from "@/components/EditablePhoto";

// GuestBlocks.jsx の編集モード版。同じ blocks 定義を使い、
// 表示をその場で書き換えられる部品に差し替えて描画します。
export default function EditBlocks({ blocks, pageData, lang, content, facilityId, pageKey }) {
  return (
    <>
      {blocks.map((block, i) => (
        <EditBlock
          key={i}
          block={block}
          pageData={pageData}
          lang={lang}
          content={content}
          facilityId={facilityId}
          pageKey={pageKey}
        />
      ))}
    </>
  );
}

function EditBlock({ block, pageData, lang, content, facilityId, pageKey }) {
  const basePath = `pages.${pageKey}`;

  if (block.type === "text") {
    if (block.static) {
      return (
        <div className="section">
          <p className="lede" style={{ color: "var(--ink-muted)" }}>
            {lang === "ja" ? block.ja : block.en}{" "}
            <span style={{ fontSize: 11 }}>({lang === "ja" ? "固定文言" : "fixed text"})</span>
          </p>
        </div>
      );
    }
    return (
      <div className="section">
        <div className="lede">
          <EditableText
            facilityId={facilityId}
            path={`${basePath}.${block.path}.${lang}`}
            initialValue={t(getByPath(pageData, block.path), lang)}
            multiline={block.multiline}
            placeholder={lang === "ja" ? block.placeholderJa : block.placeholderEn}
          />
        </div>
      </div>
    );
  }

  if (block.type === "photo") {
    const url = content.photos?.[block.slot];
    return (
      <div className="section">
        <EditablePhoto
          facilityId={facilityId}
          slot={block.slot}
          url={url}
          labelJa={block.labelJa}
          labelEn={block.labelEn}
          lang={lang}
        />
      </div>
    );
  }

  if (block.type === "notice") {
    return (
      <div className="section">
        <div className="notice">
          {block.titleJa && <p className="nt-title">{lang === "ja" ? block.titleJa : block.titleEn}</p>}
          <div className="nt-body">
            <EditableText
              facilityId={facilityId}
              path={`${basePath}.${block.path}.${lang}`}
              initialValue={t(getByPath(pageData, block.path), lang)}
              multiline
            />
          </div>
        </div>
      </div>
    );
  }

  if (block.type === "steps") {
    const items = getByPath(pageData, block.path) || [];
    return (
      <div className="section">
        <div className="card">
          <ol className="steps" style={{ padding: 0 }}>
            {items.map((s, i) => (
              <li key={i}>
                <span className="num">{i + 1}</span>
                <span className="txt">
                  <EditableText
                    facilityId={facilityId}
                    path={`${basePath}.${block.path}.${i}.${lang}`}
                    initialValue={t(s, lang)}
                  />
                  {" "}
                  {lang === "ja" ? block.suffixJa : block.suffixEn}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  if (block.type === "list") {
    const items = getByPath(pageData, block.path) || [];
    if (block.style === "card") {
      return (
        <div style={{ padding: "0 20px" }}>
          {items.map((it, i) => (
            <div key={i} className="info-item">
              <p className="it-title">
                <EditableText
                  facilityId={facilityId}
                  path={`${basePath}.${block.path}.${i}.title.${lang}`}
                  initialValue={t(it.title, lang)}
                />
              </p>
              <div className="it-body">
                <EditableText
                  facilityId={facilityId}
                  path={`${basePath}.${block.path}.${i}.body.${lang}`}
                  initialValue={t(it.body, lang)}
                  multiline
                />
              </div>
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className="section">
        <ul className="rulelist">
          {items.map((it, i) => (
            <li key={i}>
              <EditableText
                facilityId={facilityId}
                path={`${basePath}.${block.path}.${i}.${lang}`}
                initialValue={t(it, lang)}
                multiline
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (block.type === "wifi") {
    const w = content.settings?.wifi || {};
    return (
      <div className="section">
        <div className="wifi-card">
          <div className="wifi-row">
            <div>
              <div className="k">Network / SSID</div>
              <div className="v">
                <EditableText facilityId={facilityId} path="settings.wifi.ssid" initialValue={w.ssid} placeholder="—" />
              </div>
            </div>
          </div>
          <div className="wifi-row">
            <div>
              <div className="k">Password</div>
              <div className="v">
                <EditableText
                  facilityId={facilityId}
                  path="settings.wifi.password"
                  initialValue={w.password}
                  placeholder="—"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (block.type === "checklist") {
    const items = [
      { ja: "照明をすべて消しました", en: "Turned off all the lights" },
      { ja: "エアコンをすべてOFFにしました", en: "Turned off the air conditioning" },
      { ja: "忘れ物がないか確認しました", en: "Checked for forgotten belongings" },
      { ja: "鍵を返却しました", en: "Returned the key" },
    ];
    return (
      <div className="section">
        <p style={{ fontSize: 11.5, color: "var(--ink-muted)", marginBottom: 8 }}>
          {lang === "ja" ? "(このチェックリストの項目は現時点では固定です)" : "(Checklist items are fixed for now)"}
        </p>
        <ul className="checklist">
          {items.map((it, i) => (
            <li key={i}>
              <label>
                <input type="checkbox" disabled />
                <span>{t(it, lang)}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (block.type === "checkoutTime") {
    return (
      <div className="big-time">
        <span className="lab">{lang === "ja" ? "チェックアウト" : "Check-out by"}</span>
        <EditableText
          facilityId={facilityId}
          path={`pages.arrival.checkoutBy.${lang}`}
          initialValue={t(getByPath(content, "pages.arrival.checkoutBy"), lang)}
        />
        {lang === "ja" ? "まで" : ""}
      </div>
    );
  }

  return null;
}
