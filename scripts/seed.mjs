// 初期データをSupabaseへ投入するスクリプト。
// 実行前に .env.local を作成し、`npm run seed` で実行してください。
//
// 使い方:
//   1. supabase/schema.sql をSupabaseのSQL Editorで実行(テーブル作成)
//   2. .env.local を用意 (.env.local.example を参考に)
//   3. npm install
//   4. npm run seed
//
// 既存のdraft/publishedデータがある場合は上書きされるので、
// 初回セットアップ時のみ実行してください。

import { createClient } from "@supabase/supabase-js";
import { properties, sameuraContent } from "../lib/seedData.js";
import { config } from "dotenv";

config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "エラー: .env.local に NEXT_PUBLIC_SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY を設定してください。"
  );
  process.exit(1);
}

const supabase = createClient(url, key);

async function main() {
  console.log("施設情報を登録中...");
  const { error: propError } = await supabase.from("properties").upsert(properties);
  if (propError) throw propError;

  console.log("さめうらのコンテンツを登録中...");
  const { error: contentError } = await supabase.from("content").upsert({
    facility_id: "sameura",
    draft: sameuraContent,
    published: sameuraContent,
    published_at: new Date().toISOString(),
  });
  if (contentError) throw contentError;

  console.log("完了しました。/sameura と /admin にアクセスして確認してください。");
}

main().catch((err) => {
  console.error("投入に失敗しました:", err.message);
  process.exit(1);
});
