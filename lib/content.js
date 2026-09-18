import "server-only";
import { getSupabaseServerClient } from "./supabase";

// このファイルが、Guest Guideと管理画面がデータを二重管理しないための
// 唯一の入口です。両方とも必ずこの関数群を通してSupabaseにアクセスします。

export async function getProperty(facilityId) {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", facilityId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getAllProperties() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("properties").select("*").order("id");
  if (error) throw error;
  return data || [];
}

// 宿泊者が実際に見る内容(公開版)
export async function getPublishedContent(facilityId) {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("content")
    .select("published, published_at")
    .eq("facility_id", facilityId)
    .maybeSingle();
  if (error) throw error;
  return data ? data.published : null;
}

// 管理画面が編集する内容(下書き版)
export async function getDraftContent(facilityId) {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("content")
    .select("draft")
    .eq("facility_id", facilityId)
    .maybeSingle();
  if (error) throw error;
  return data ? data.draft : null;
}

// 下書き・公開の両方と最終公開日時をまとめて取得(管理ダッシュボード用)
export async function getContentStatus(facilityId) {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("content")
    .select("draft, published, published_at")
    .eq("facility_id", facilityId)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  const dirty = JSON.stringify(data.draft) !== JSON.stringify(data.published);
  return { draft: data.draft, published: data.published, publishedAt: data.published_at, dirty };
}

// 下書きを保存する(まだ宿泊者には反映されない)
export async function saveDraftContent(facilityId, draft) {
  const supabase = getSupabaseServerClient();
  const { error } = await supabase
    .from("content")
    .update({ draft, updated_at: new Date().toISOString() })
    .eq("facility_id", facilityId);
  if (error) throw error;
}

// 下書きの内容を公開する(この瞬間から宿泊者にも反映される)
export async function publishContent(facilityId) {
  const supabase = getSupabaseServerClient();
  const { data, error: fetchError } = await supabase
    .from("content")
    .select("draft")
    .eq("facility_id", facilityId)
    .maybeSingle();
  if (fetchError) throw fetchError;
  if (!data) throw new Error("公開対象のコンテンツが見つかりません: " + facilityId);

  const { error } = await supabase
    .from("content")
    .update({ published: data.draft, published_at: new Date().toISOString() })
    .eq("facility_id", facilityId);
  if (error) throw error;
}

// ネストしたオブジェクトのパス(例: "pages.toilet.intro.ja")を安全に読み書きするための小道具
export function getByPath(obj, path) {
  return path.split(".").reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}
export function setByPath(obj, path, value) {
  const keys = path.split(".");
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (cur[keys[i]] == null || typeof cur[keys[i]] !== "object") cur[keys[i]] = {};
    cur = cur[keys[i]];
  }
  cur[keys[keys.length - 1]] = value;
}
