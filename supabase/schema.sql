-- ============================================================
-- 一軒宿さめうら Guest Guide - Supabase スキーマ
-- Supabaseダッシュボード > SQL Editor に貼り付けて実行してください
-- ============================================================

-- 施設一覧(将来「一軒宿あせみ」等を追加する際もここに1行足すだけ)
create table if not exists properties (
  id text primary key,
  name_ja text not null,
  name_en text not null,
  enabled boolean not null default true
);

-- 施設ごとのコンテンツ本体
-- draft   = 管理画面で編集中の内容(まだ宿泊者には見えない)
-- published = 実際にGuest Guideとして表示される内容
create table if not exists content (
  facility_id text primary key references properties(id) on delete cascade,
  draft jsonb not null,
  published jsonb not null,
  published_at timestamptz,
  updated_at timestamptz not null default now()
);

-- Row Level Security: このテーブルへの読み書きはサーバー側
-- (Service Roleキー)からのみ行うため、匿名アクセスは全面禁止にします。
alter table properties enable row level security;
alter table content enable row level security;
-- ポリシーを1つも作らないことで、anonキー経由のアクセスは常に拒否されます。
-- サーバー側コードは Service Role キーを使うため、RLSの影響を受けず読み書きできます。

-- 写真等のアップロード用ストレージバケット
insert into storage.buckets (id, name, public)
values ('photos', 'photos', true)
on conflict (id) do nothing;

-- 初期データ(施設)
insert into properties (id, name_ja, name_en, enabled) values
  ('sameura', '一軒宿さめうら', 'Ikkenyado Sameura', true),
  ('asemi', '一軒宿あせみ', 'Ikkenyado Asemi', false)
on conflict (id) do nothing;

-- 初期データ(コンテンツ) — この後 npm run seed で正式な初期内容を投入します。
-- 空のままだとアプリはエラーにならず「準備中」と表示されます。
insert into content (facility_id, draft, published)
values (
  'sameura',
  '{"settings":{"wifi":{"ssid":"","password":""},"contact":{"line":"","tel":"","email":""}},"photos":{},"pages":{}}'::jsonb,
  '{"settings":{"wifi":{"ssid":"","password":""},"contact":{"line":"","tel":"","email":""}},"photos":{},"pages":{}}'::jsonb
)
on conflict (facility_id) do nothing;
