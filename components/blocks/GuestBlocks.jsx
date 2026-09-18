import { t } from "@/lib/t";
import { getByPath } from "@/lib/content";

// PAGE_SCHEMAS の blocks 配列を、実際のゲスト向けHTML(読み取り専用)に変換する。
// 新しいページは lib/pageSchemas.js に定義を1つ足すだけで、ここのコードは
// 変更不要です。
export default function GuestBlocks({ blocks, pageData, lang, content }) {
  return (
    <>
      {blocks.map((block, i) => (
        <GuestBlock key={i} block={block} pageData={pageData} lang={lang} content={content} />
      ))}
    </>
  );
}

function GuestBlock({ block, pageData, lang, content }) {
  if (block.type === "text") {
    if (block.static) {
      return (
        <div className="section">
          <p className="lede">{lang === "ja" ? block.ja : block.en}</p>
        </div>
      );
    }
    const val = t(getByPath(pageData, block.path), lang);
    if (!val) return null;
    return (
      <div className="section">
        <p className="lede">{val}</p>
      </div>
    );
  }

  if (block.type === "photo") {
    const url = content.photos?.[block.slot];
    return (
      <div className="section">
        <div className="photoph">
          {url ? (
            <img src={url} alt="" />
          ) : (
            <>
              <span className="icon">📷</span>
              <span className="cap">{lang === "ja" ? block.labelJa : block.labelEn}</span>
            </>
          )}
        </div>
      </div>
    );
  }

  if (block.type === "notice") {
    const body = t(getByPath(pageData, block.path), lang);
    if (!body) return null;
    return (
      <div className="section">
        <div className="notice">
          {block.titleJa && <p className="nt-title">{lang === "ja" ? block.titleJa : block.titleEn}</p>}
          <p className="nt-body">{body}</p>
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
                  {t(s, lang)} {lang === "ja" ? block.suffixJa : block.suffixEn}
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
              <p className="it-title">{t(it.title, lang)}</p>
              <p className="it-body">{t(it.body, lang)}</p>
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className="section">
        <ul className="rulelist">
          {items.map((it, i) => (
            <li key={i}>{t(it, lang)}</li>
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
              <div className="v">{w.ssid || "—"}</div>
            </div>
          </div>
          <div className="wifi-row">
            <div>
              <div className="k">Password</div>
              <div className="v">{w.password || "—"}</div>
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
        <ul className="checklist">
          {items.map((it, i) => (
            <li key={i}>
              <label>
                <input type="checkbox" />
                <span>{t(it, lang)}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (block.type === "checkoutTime") {
    const checkoutBy = t(getByPath(content, "pages.arrival.checkoutBy"), lang);
    return (
      <div className="big-time">
        <span className="lab">{lang === "ja" ? "チェックアウト" : "Check-out by"}</span>
        {checkoutBy}
        {lang === "ja" ? "まで" : ""}
      </div>
    );
  }

  return null;
}
