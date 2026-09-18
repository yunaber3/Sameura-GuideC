import "server-only";
import { createClient } from "@supabase/supabase-js";

// 重要: このファイルは必ずサーバー側(Server Component / Server Action /
// Route Handler)からのみ import してください。
// SUPABASE_SERVICE_ROLE_KEY はSupabaseの行レベルセキュリティを
// バイパスできる強い権限を持つため、絶対にブラウザへ送ってはいけません。
// "server-only" パッケージが、誤ってクライアント側からimportした場合に
// ビルドエラーを出して防いでくれます。

let cachedClient = null;

export function getSupabaseServerClient() {
  if (cachedClient) return cachedClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabaseの環境変数が設定されていません。NEXT_PUBLIC_SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY を .env.local (ローカル) または Vercel の Environment Variables に設定してください。"
    );
  }

  cachedClient = createClient(url, key, {
    auth: { persistSession: false },
  });
  return cachedClient;
}
