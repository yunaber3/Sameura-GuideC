"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, SESSION_COOKIE_OPTIONS, createSessionToken, verifyPasscode } from "./auth";

export async function loginAdmin(formData) {
  const passcode = formData.get("passcode");
  const next = formData.get("next") || "/admin";

  if (!verifyPasscode(passcode)) {
    redirect(`/admin/login?error=1&next=${encodeURIComponent(next)}`);
  }

  const token = await createSessionToken();
  cookies().set(ADMIN_COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);
  redirect(next);
}

export async function logoutAdmin() {
  cookies().delete(ADMIN_COOKIE_NAME);
  redirect("/admin/login");
}
