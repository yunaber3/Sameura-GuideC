"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE_NAME, isValidSessionToken } from "./auth";
import {
  getDraftContent,
  saveDraftContent,
  publishContent,
  setByPath,
} from "./content";
import { getSupabaseServerClient } from "./supabase";

async function requireAdmin() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  const valid = await isValidSessionToken(token);
  if (!valid) {
    throw new Error(
      "管理者セッションが切れています。お手数ですが管理画面に戻ってログインし直してください。"
    );
  }
}

// 1つのテキストフィールドを下書きに保存する(インライン編集の保存先)
// path の例: "pages.arrival.parkingText1.ja"
export async function saveDraftField(facilityId, path, value) {
  await requireAdmin();
  const draft = await getDraftContent(facilityId);
  if (!draft) throw new Error("下書きコンテンツが見つかりません: " + facilityId);
  setByPath(draft, path, value);
  await saveDraftContent(facilityId, draft);
  return { ok: true };
}

// 写真を1枚アップロードし、指定したスロット(例: "hero", "parking")に紐づける
export async function uploadDraftPhoto(facilityId, slot, formData) {
  await requireAdmin();
  const file = formData.get("file");
  if (!file || typeof file === "string") throw new Error("ファイルが選択されていません");

  const supabase = getSupabaseServerClient();
  const ext = (file.name && file.name.split(".").pop()) || "jpg";
  const path = `${facilityId}/${slot}-${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("photos")
    .upload(path, file, { upsert: true, contentType: file.type || "image/jpeg" });
  if (uploadError) throw uploadError;

  const { data: publicUrlData } = supabase.storage.from("photos").getPublicUrl(path);
  const url = publicUrlData.publicUrl;

  const draft = await getDraftContent(facilityId);
  if (!draft.photos) draft.photos = {};
  draft.photos[slot] = url;
  await saveDraftContent(facilityId, draft);

  return { ok: true, url };
}

// 写真を削除してプレースホルダーに戻す
export async function clearDraftPhoto(facilityId, slot) {
  await requireAdmin();
  const draft = await getDraftContent(facilityId);
  if (draft.photos) delete draft.photos[slot];
  await saveDraftContent(facilityId, draft);
  return { ok: true };
}

// 下書きの内容を公開する。公開後、宿泊者向けページのキャッシュを更新する。
export async function publishFacility(facilityId) {
  await requireAdmin();
  await publishContent(facilityId);
  revalidatePath(`/${facilityId}`, "layout");
  return { ok: true };
}
