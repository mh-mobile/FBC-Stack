---
name: add_service
description: 新しい自作サービスをFBC Stackに登録する。GitHubリポジトリURL（+任意でブログ・公開サイトURL）または .claude/post_source/*.yaml を渡すと、リポジトリを解析して posts/<id>.md を生成し、ツール定義との整合チェック・ビルド確認を経てPRを作成する。「サービスを登録して」「新しい自作サービスを追加して」と言われたら使う。
---

# 自作サービスの登録

新しい自作サービスの技術スタックmdを作成し、PRを出すまでを行います。

## 入力

`$ARGUMENTS` は次のいずれか:

- GitHubリポジトリURL（例: `https://github.com/user/my-service`）。ブログURL・公開サイトURLが併記されていれば使う
- `.claude/post_source/<id>.yaml` のID（従来の /tech_stack_create 互換。yamlがあればその情報を優先する）

## 手順

### 1. サービスIDの決定と準備

- リポジトリ名を snake_case にしたものをサービスID `<id>` とする（例: `Tenpai-Speeder` → `tenpai_speeder`）
- `posts/<id>.md` が既に存在しないか確認する
- mainから `feature/add-<id>` ブランチを作成する

### 2. 情報収集

リポジトリを解析して技術スタックを把握する:

- `gh api repos/<owner>/<repo>` — description, homepage（website候補）, owner（author）
- README — サービス概要、使用技術セクション
- 依存関係ファイル（存在するものだけでよい）:
  - `Gemfile` / `Gemfile.lock` — Rails・gem類。バージョンは Gemfile.lock から
  - `package.json` — JSフレームワーク・ビルドツール
  - `.ruby-version` / `.node-version` / `mise.toml` — 言語バージョン
  - `config/database.yml` / `docker-compose.yml` — データベース
  - `Dockerfile` / `fly.toml` / `render.yaml` / `vercel.json` / `app.json` — デプロイ先
  - `.github/workflows/*` — CI/CD
  - `.rubocop.yml` / `.eslintrc*` / `biome.json` — Linter/Formatter
- ブログ記事があれば読む（技術選定の記述はスタックの根拠として最優先）

### 3. posts/<id>.md の作成

`posts/campus.md` をフォーマットの手本にする。

frontmatter:

```yaml
---
title: 'サービス名'          # 正式表記（READMEやサイトのロゴに合わせる）
date: 'YYYY-MM-DD'           # サービスの公開日（ブログ記事の日付が目安）。不明なら今日
author: 'GitHubユーザー名'
code:
  - repository: 'https://github.com/...'
    description: ''
blog: 'https://...'          # あれば
website: 'https://...'       # あれば
published: true
hasAudio: false              # 音声概要は後から別途追加するので必ず false
stack:
  - name: フロントエンド
    detail:
      - name: Hotwire
      - name: Tailwind CSS
  ...
---
```

stack作成の方針:

- カテゴリ名は次から選ぶ: `フロントエンド` / `バックエンド` / `データベース` / `テスト` / `Linter/Formatter` / `認証` / `外部サービス・API` / `インフラ`（または `デプロイ`）/ `CI/CD`
- 主要なツールに絞る（サイト全体の平均は12個/サービス程度。Gemfileの全gemを列挙しない）
- `version` は言語・フレームワーク・DBなど主要なものだけでよい
- ツール名の表記は既存の `tools/*.md` の toolName / alias に合わせる（次のステップで機械チェックする）

本文はfrontmatterの直後に2〜4文でサービスの説明を書く。README・ブログの説明をもとに、何ができるサービスかを簡潔に。

### 4. 整合チェック

```bash
node .claude/skills/add_service/scripts/check_post.mjs <id>
```

- `NG: ツール「X」は一致しません` → 表記ゆれなら既存表記に直す。本当に新しいツールなら `tools/<tool_id>.md` を作成する:

  ```yaml
  ---
  toolName: 正式名称
  alias:
    - 表記ゆれ候補
  url: https://公式サイト
  ---
  ```

- `WARN: アイコン ... がありません` → そのままでも動く（noimage表示）が、PR本文に「アイコン未登録」として明記する
- exit 0 になるまで修正する

### 5. ビルド確認

`npm run build` が通り、ビルドログの `/posts/<id>` が生成されていることを確認する。

### 6. コミットとPR

- `posts/<id>.md`（+ 新規作成した `tools/*.md`、yaml源があれば `.claude/post_source/<id>.yaml`）をコミットする
- mainに対してPRを作成する。PR本文には以下を含める:
  - サービス概要（1〜2文）
  - スタックの要約（カテゴリごとの主要ツール）
  - スタックの根拠（どのファイル・記事から判断したか）
  - 新規追加した tools/*.md とアイコン未登録の注意（あれば）

## 注意

- スタックはリポジトリの実ファイルを根拠にする。READMEの記述と依存ファイルが食い違う場合は依存ファイルを優先し、PR本文でその旨に触れる
- 既存の posts/*.md や tools/*.md は変更しない（このSkillは追加専用）
