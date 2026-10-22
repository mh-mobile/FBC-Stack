import { hasToolIcon } from './tools'
import { getPostToolIDs } from './posts'
import type { PostData } from '../../types/postData'

export type CardTool = { id: string; name: string; hasIcon: boolean }

// 一覧カードの表示と絞り込みに必要な分だけに絞ったサービス情報（クライアントへ送る量を減らす）
export type ServiceSummary = {
  id: string
  title: string
  author: string
  date: string
  hasAudio: boolean
  summary: string
  tools: CardTool[]
  // 絞り込み用の採用ツールID（構成要素からの親ツールを含む。例: Stimulus のみ → hotwire も含む）
  toolIDs: string[]
  // 検索対象（タイトル・作者・技術名）を小文字で連結したもの
  search: string
}

const MIN_SUMMARY_LENGTH = 40

function plain(markdown: string): string {
  return markdown
    .replace(/<[^>]+>/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^\s*(#+|>|[-*+]|\d+\.)\s+/gm, '')
    .replace(/(\*\*|__|`)/g, '')
    .replace(/(^|\s)\*([^*\n]+)\*/g, '$1$2')
    .replace(/\s+/g, ' ')
    .trim()
}

// 本文の先頭から段落をつなげ、短すぎない概要文を作る（カード側で2行に切り詰める）
export function excerpt(markdown: string): string {
  let text = ''
  for (const paragraph of markdown.split(/\n\s*\n/)) {
    const line = plain(paragraph)
    if (!line) continue
    text = text ? `${text} ${line}` : line
    if (text.length >= MIN_SUMMARY_LENGTH) break
  }
  return text
}

// スタックに出てくる順で、重複を除いたツール一覧
export function stackTools(post: PostData): CardTool[] {
  const tools: CardTool[] = []
  const seen = new Set<string>()
  for (const category of post.stack) {
    for (const { name } of category.detail) {
      const id = post.toolPathInfo?.[name]
      if (id && !seen.has(id)) {
        seen.add(id)
        tools.push({ id, name, hasIcon: hasToolIcon(id) })
      }
    }
  }
  return tools
}

export function toServiceSummary(post: PostData): ServiceSummary {
  const tools = stackTools(post)
  const toolNames = post.stack.flatMap(({ detail }) => detail.map(({ name }) => name))
  return {
    id: post.id,
    title: post.title,
    author: post.author,
    date: post.date,
    hasAudio: post.hasAudio,
    summary: excerpt(post.markdownContent ?? ''),
    tools,
    toolIDs: Array.from(getPostToolIDs(post)),
    search: [post.title, post.author, ...toolNames].join('\n').toLowerCase(),
  }
}
