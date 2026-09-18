// 管理画面ログインのためのセッション管理。
// - パスコード自体はCookieに入れず、署名付きトークン(有効期限つき)を発行します。
// - Web Crypto API (crypto.subtle) のみを使っているため、
//   middleware(Edge runtime)・Server Action(Node runtime)のどちらからも
//   同じコードで呼び出せます。
//
// 本番でスタッフが複数人いる/権限を分けたい等の要件が出てきたら、
// Supabase Auth のようなちゃんとした認証基盤への切り替えを検討してください。
// 現状は「宿のPC・iPadから、合言葉を知っている人だけが管理画面に入れればよい」
// という小規模施設向けのシンプルな設計です。

export const ADMIN_COOKIE_NAME = "sameura_admin";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30日

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET が設定されていません。.env.local または Vercel の環境変数を確認してください。");
  }
  return secret;
}

async function hmac(message) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function verifyPasscode(input) {
  const expected = process.env.ADMIN_PASSCODE;
  if (!expected) return false;
  return typeof input === "string" && input.length > 0 && input === expected;
}

export async function createSessionToken() {
  const issuedAt = Date.now().toString();
  const signature = await hmac(issuedAt);
  return `${issuedAt}.${signature}`;
}

export async function isValidSessionToken(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) return false;
  const [issuedAt, signature] = token.split(".");
  if (!issuedAt || !signature) return false;

  const expected = await hmac(issuedAt);
  if (expected !== signature) return false;

  const age = (Date.now() - Number(issuedAt)) / 1000;
  if (!Number.isFinite(age) || age < 0 || age > SESSION_MAX_AGE_SECONDS) return false;

  return true;
}

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: SESSION_MAX_AGE_SECONDS,
};
