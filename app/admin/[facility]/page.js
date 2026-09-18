import { notFound } from "next/navigation";
import { getProperty, getContentStatus } from "@/lib/content";
import { logoutAdmin } from "@/lib/authActions";

const PAGES = [
  { p: "", label: "トップ / Top" },
  { p: "arrival", label: "到着・チェックイン / Arrival" },
  { p: "stay", label: "滞在中のご案内 / Your Stay" },
  { p: "stay/amenities", label: "アメニティ / Amenities" },
  { p: "stay/wifi", label: "Wi-Fi" },
  { p: "stay/toilet", label: "トイレ / Toilet" },
  { p: "stay/bath", label: "お風呂 / Bath" },
  { p: "stay/kitchen", label: "キッチン・お米 / Kitchen" },
  { p: "stay/bbq", label: "BBQ" },
  { p: "stay/waste", label: "ゴミ / Waste" },
  { p: "stay/announcement", label: "町内放送 / Announcement" },
  { p: "stay/longstay", label: "長期滞在 / Long Stay" },
  { p: "stay/mail", label: "郵便物 / Mail" },
  { p: "rules", label: "宿泊ルール / House Rules" },
  { p: "checkout", label: "チェックアウト / Check-out" },
  { p: "other", label: "ペット同伴 / Pet Guests" },
];

export default async function AdminDashboardPage({ params }) {
  const facilityId = params.facility;
  const [prop, status] = await Promise.all([getProperty(facilityId), getContentStatus(facilityId)]);
  if (!prop) notFound();

  return (
    <div>
      <div className="admin-header">
        <div>
          <div className="h-t">{prop.name_ja}</div>
          <div style={{ fontSize: 12, color: "var(--ink-muted)" }}>Guest Guide 管理</div>
        </div>
        <form action={logoutAdmin}>
          <button type="submit" style={{ background: "none", border: "none", color: "var(--ink-muted)", fontSize: 12.5, cursor: "pointer" }}>
            ログアウト
          </button>
        </form>
      </div>

      <div className="admin-body">
        <div className="dash-actions">
          <a className="dash-btn primary" href={`/admin/${facilityId}/edit`}>
            サイトを編集
          </a>
          <a className="dash-btn" href={`/${facilityId}`} target="_blank" rel="noreferrer">
            公開サイトを見る
          </a>
        </div>

        <div className="dash-status">
          <div className="ds-row">
            <span>公開状態</span>
            <strong className={status?.dirty ? "warn" : "ok"}>
              {status?.dirty ? "● 未公開の変更あり" : "● 公開中"}
            </strong>
          </div>
          <div className="ds-row">
            <span>最終公開</span>
            <strong>
              {status?.publishedAt ? new Date(status.publishedAt).toLocaleString("ja-JP") : "未公開"}
            </strong>
          </div>
        </div>

        <details className="dash-pagelist">
          <summary>ページ一覧(補助)</summary>
          <ul>
            {PAGES.map((pg) => (
              <li key={pg.p}>
                <a href={`/admin/${facilityId}/edit${pg.p ? "/" + pg.p : ""}`}>{pg.label}</a>
              </li>
            ))}
          </ul>
        </details>

        <p className="dash-adv" style={{ color: "var(--ink-muted)" }}>
          「さめうらを楽しむ」「周辺案内」の2ページは近日追加予定です。
        </p>
      </div>
    </div>
  );
}
