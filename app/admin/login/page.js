import { loginAdmin } from "@/lib/authActions";

export default function AdminLoginPage({ searchParams }) {
  const error = searchParams?.error;
  const next = searchParams?.next || "/admin";

  return (
    <div className="admin-gate">
      <h1>Admin</h1>
      <p>宿泊者には表示されない、運営者専用のログイン画面です。</p>
      <form action={loginAdmin}>
        <input type="hidden" name="next" value={next} />
        <input type="password" name="passcode" placeholder="合言葉" autoFocus required />
        {error && <p className="error">合言葉が違います。もう一度お試しください。</p>}
        <button type="submit">ログイン</button>
      </form>
      <p>
        <a href="/sameura" style={{ color: "var(--ink-muted)", fontSize: 12.5 }}>
          ← Guest Guideへ戻る
        </a>
      </p>
    </div>
  );
}
