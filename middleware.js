import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isValidSessionToken } from "./lib/auth";

// /admin 配下(ログイン画面自体を除く)は、有効なセッションCookieが
// なければ自動的にログイン画面へ飛ばします。
// これにより「管理者としてログインしていない人には、管理UIが
// 一切表示されない」ことをアプリ全体で保証します。

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const isAdminPath = pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");
  if (!isAdminPath) return NextResponse.next();

  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const valid = await isValidSessionToken(token);

  if (!valid) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
