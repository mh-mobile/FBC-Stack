// 投稿mdの検証スクリプト
// 使い方: node .claude/skills/add_service/scripts/check_post.mjs <サービスID>
//
// チェック内容:
// 1. frontmatterの必須項目（title / date / author / code / published / hasAudio / stack）
// 2. stack内の各ツール名が tools/*.md の toolName または alias と一致するか
//    （不一致だとサイト上でツールアイコン・詳細ページへのリンクが表示されない）
// 3. カテゴリ名が既存サイトで使われている名前か（警告のみ）

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const id = process.argv[2]
if (!id) {
  console.error('使い方: node check_post.mjs <サービスID>')
  process.exit(1)
}

const root = process.cwd()
const postPath = path.join(root, 'posts', `${id}.md`)
if (!fs.existsSync(postPath)) {
  console.error(`NG: posts/${id}.md が存在しません`)
  process.exit(1)
}

const { data, content } = matter(fs.readFileSync(postPath, 'utf8'))
let hasError = false
const error = (msg) => {
  console.error(`NG: ${msg}`)
  hasError = true
}
const warn = (msg) => console.warn(`WARN: ${msg}`)

// --- 1. 必須項目 ---
if (!data.title) error('title がありません')
if (!/^\d{4}-\d{2}-\d{2}$/.test(String(data.date ?? '')))
  error(`date は 'YYYY-MM-DD' 形式にしてください（現在: ${data.date}）`)
if (!data.author) error('author（GitHubユーザー名）がありません')
if (!Array.isArray(data.code) || !data.code[0]?.repository)
  error('code[0].repository（GitHubリポジトリURL）がありません')
if (typeof data.published !== 'boolean') error('published は true/false で指定してください')
if (typeof data.hasAudio !== 'boolean') error('hasAudio は true/false で指定してください')
if (!Array.isArray(data.stack) || data.stack.length === 0)
  error('stack がありません')
if (!content.trim()) error('本文（サービスの説明）がありません')

// --- 2. ツール名の照合 ---
const toolsDir = path.join(root, 'tools')
const nameToTool = new Map() // 小文字名 -> { toolID, canonical }
for (const file of fs.readdirSync(toolsDir)) {
  const toolID = file.replace(/\.md$/, '')
  const { data: t } = matter(fs.readFileSync(path.join(toolsDir, file), 'utf8'))
  if (t.toolName) nameToTool.set(String(t.toolName).toLowerCase(), { toolID, canonical: t.toolName })
  for (const a of t.alias ?? []) {
    const key = String(a).toLowerCase()
    if (!nameToTool.has(key)) nameToTool.set(key, { toolID, canonical: t.toolName })
  }
}

const knownCategories = new Set(
  [
    'フロントエンド', 'バックエンド', 'データベース', 'インフラ', '認証',
    '外部サービス・API', 'CI/CD', 'テスト', 'Linter/Formatter', 'その他',
    // app/tools/page.tsx の categoryMap で正規化される表記
    'frontend', 'backend', 'infra', 'ci/cd', 'linter/formatter',
    'デプロイ', 'デプロイツール', 'aws', '環境構築', '外部サービス', 'api連携',
  ].map((c) => c.toLowerCase()),
)

let matched = 0
const unmatched = []
for (const category of data.stack ?? []) {
  if (!knownCategories.has(String(category.name ?? '').toLowerCase()))
    warn(`カテゴリ「${category.name}」は既存サイトに無い名前です（ツール一覧では「その他」扱いになる可能性）`)
  for (const { name } of category.detail ?? []) {
    const hit = nameToTool.get(String(name).toLowerCase())
    if (hit) {
      matched++
      console.log(`OK: ${name} -> tools/${hit.toolID}.md`)
      // アイコンの有無も確認
      if (!fs.existsSync(path.join(root, 'public', 'images', 'tool', `${hit.toolID}.png`)))
        warn(`アイコン public/images/tool/${hit.toolID}.png がありません（noimage表示になります）`)
    } else {
      unmatched.push(name)
    }
  }
}

for (const name of unmatched) {
  error(
    `ツール「${name}」は tools/*.md のどの toolName/alias にも一致しません。` +
      '表記ゆれなら既存の表記に修正、新規ツールなら tools/<tool_id>.md を作成してください',
  )
}

console.log(`\n照合結果: ${matched} 件一致 / ${unmatched.length} 件不一致`)
process.exit(hasError ? 1 : 0)
