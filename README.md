# 一軒宿さめうら Guest Guide

宿泊者向けデジタルGuest Guide + 運営者向け管理画面。

- 公開画面: Next.js(サーバーコンポーネント) — 宿泊者は毎回最新の「公開版」データを見ます
- データ: Supabase(Postgres)— `content`テーブルに `draft`(下書き)と`published`(公開)を分けて保持
- 管理画面: `/admin` からログイン。実際のGuest Guideの画面そのものを開いて、その場で文章や写真をクリックして編集 → 下書き保存 → 公開、という流れ

**現在の実装範囲**: トップ・到着案内・滞在中のご案内(メニュー)・トイレ の4ページ分のみ動作します。まずこの4ページでGitHub→Vercel→Supabaseの流れが問題なく動くことを確認してから、同じパターンで残りのページを追加していきます。

---

## セットアップ手順

### STEP 1. Supabaseプロジェクトを作成

1. https://supabase.com にログイン(アカウントがなければ作成)
2. 「New Project」で新しいプロジェクトを作成(リージョンは Tokyo (ap-northeast-1) がおすすめ)
3. プロジェクトが起動したら、左メニューの **SQL Editor** を開く
4. このリポジトリの `supabase/schema.sql` の中身を全部コピーして貼り付け、実行(Run)する
   → `properties` テーブルと `content` テーブルができ、施設情報(さめうら・あせみ)が登録されます
5. 左メニューの **Project Settings → API** を開き、以下をメモしておく
   - `Project URL`
   - `service_role` キー(**anon keyではなく、service_role キー**を使います。他人に絶対に教えないでください)

### STEP 2. GitHubリポジトリを作成してコードを登録

お使いのパソコンのターミナルで、このプロジェクトフォルダに移動してから:

```bash
cd sameura-app
git init
git add .
git commit -m "Initial commit: Guest Guide MVP"
```

GitHub上で新しい空のリポジトリを作成した後:

```bash
git remote add origin https://github.com/【あなたのユーザー名】/【リポジトリ名】.git
git branch -M main
git push -u origin main
```

### STEP 3. ローカルで動作確認(任意ですが推奨)

```bash
npm install
cp .env.local.example .env.local
```

`.env.local` を開いて、STEP 1でメモした値を入力:

```
NEXT_PUBLIC_SUPABASE_URL=(SupabaseのProject URL)
SUPABASE_SERVICE_ROLE_KEY=(Supabaseのservice_roleキー)
ADMIN_PASSCODE=(管理画面ログインの合言葉。好きな文字列に)
SESSION_SECRET=(ターミナルで `openssl rand -hex 32` を実行して出た文字列)
```

初期コンテンツを投入:

```bash
npm run seed
```

開発サーバーを起動して確認:

```bash
npm run dev
```

- http://localhost:3000/sameura … 宿泊者向け画面
- http://localhost:3000/admin … 管理画面(合言葉でログイン)

### STEP 4. Vercelへデプロイ

1. https://vercel.com にログイン(GitHubアカウントでログインするのが簡単です)
2. 「Add New... → Project」→ 先ほどのGitHubリポジトリを選択してImport
3. 「Environment Variables」の欄に、`.env.local` と同じ4つの値を入力
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSCODE`
   - `SESSION_SECRET`
4. 「Deploy」を押す。数分で公開されます
5. 発行されたURL(例: `https://sameura-app.vercel.app`)の `/sameura` にアクセスして確認

ローカルで `npm run seed` を実行済みなら、Vercel上でも同じSupabaseを見ているのでそのままデータが表示されます。まだ実行していない場合は、ローカルで一度だけ `npm run seed` を実行してください(本番のSupabaseへ直接データが入ります)。

### STEP 5. 管理画面を試す

1. `https://(あなたのVercel URL)/admin` を開く
2. `.env.local` (Vercelの環境変数)に設定した合言葉でログイン
3. 「サイトを編集」→ 実際のトップページが編集モードで開く
4. 文章をクリックして書き換え → フォーカスを外すと自動で下書き保存
5. 上部バーの「公開」ボタンを押すと、その内容が宿泊者向け画面にも反映される

---

## 今後、残りのページを追加する方法

`app/[facility]/` 以下に、同じ構造でページを追加していきます(例: `app/[facility]/stay/wifi/page.js`)。
対応する編集モード版を `app/admin/[facility]/edit/` 以下の同じパスに追加します。
コンテンツのデータは `lib/seedData.js` にすでに全ページ分入っているので、新しいページのコードを書くだけで動きます。

## セキュリティについて

- 管理画面のログインは「合言葉+署名付きCookie」という、小規模施設向けのシンプルな方式です。スタッフ全員が同じ合言葉を使う想定です。個人ごとにアカウントを分けたい、権限を分けたい等の要件が出てきたら、Supabase Authなどへの切り替えをご相談ください。
- `SUPABASE_SERVICE_ROLE_KEY` はデータベースを無制限に読み書きできる強力な鍵です。GitHubには絶対にコミットしないでください(`.gitignore` で `.env.local` は除外済みです)。Vercelの環境変数にのみ設定してください。
