import "server-only";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, isValidSessionToken } from "./auth";

// ゲスト向けページから「今のブラウザは管理者としてログイン中か」を
// 判定するためのヘルパー。trueの場合のみ、右下に
// 「このページを編集」ボタンを出します。
export async function isAdminRequest() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  return isValidSessionToken(token);
}
