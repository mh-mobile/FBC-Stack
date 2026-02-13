import type { Metadata } from 'next'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'
import { getAllToolsData } from '../lib/tools'
import ToolSearch from '../components/ToolSearch'
import type { ToolData } from '../../types/toolData'

export const metadata: Metadata = {
  title: 'Tools',
}

type ToolWithStats = {
  toolID: string
  toolName: string
  usageCount: number
  category: string
}

// Map English/variant category names to canonical Japanese names
const categoryMap: Record<string, string> = {
  frontend: 'フロントエンド',
  backend: 'バックエンド',
  infra: 'インフラ',
  'ci/cd': 'CI/CD',
  'linter/formatter': 'Linter/Formatter',
  // インフラ系に統合
  デプロイ: 'インフラ',
  デプロイツール: 'インフラ',
  aws: 'インフラ',
  環境構築: 'インフラ',
  // 外部サービス・APIに統合
  外部サービス: '外部サービス・API',
  'api連携': '外部サービス・API',
}

const categoryOrder = [
  'フロントエンド',
  'バックエンド',
  'データベース',
  'インフラ',
  '認証',
  '外部サービス・API',
  'CI/CD',
  'テスト',
  'Linter/Formatter',
  'その他',
]

function getToolsWithStats(): ToolWithStats[] {
  const posts = getSortedPostsData()
  const allTools = getAllToolsData()

  // Build a map: toolID -> { totalCount, categoryCounts }
  const toolStats = new Map<
    string,
    { totalCount: number; categoryCounts: Map<string, number> }
  >()

  for (const post of posts) {
    for (const stackCategory of post.stack) {
      const rawCat = stackCategory.name
      const normalizedCat =
        categoryMap[rawCat.toLowerCase()] || rawCat

      for (const { name } of stackCategory.detail) {
        // Find matching tool
        const tool = allTools.find(
          (t) =>
            t.toolName.toLowerCase() === name.toLowerCase() ||
            t.alias?.some(
              (a) => a.toLowerCase() === name.toLowerCase(),
            ),
        )
        if (!tool) continue

        let existing = toolStats.get(tool.toolID)
        if (!existing) {
          existing = { totalCount: 0, categoryCounts: new Map() }
          toolStats.set(tool.toolID, existing)
        }
        existing.totalCount++
        existing.categoryCounts.set(
          normalizedCat,
          (existing.categoryCounts.get(normalizedCat) || 0) + 1,
        )
      }
    }
  }

  return Array.from(toolStats.entries()).map(
    ([toolID, { totalCount, categoryCounts }]) => {
      const tool = allTools.find((t) => t.toolID === toolID)!
      // Pick the category where this tool is used most often
      let bestCategory = 'その他'
      let bestCount = 0
      categoryCounts.forEach((count, cat) => {
        if (count > bestCount) {
          bestCount = count
          bestCategory = cat
        }
      })
      const cat = categoryOrder.includes(bestCategory)
        ? bestCategory
        : 'その他'
      return {
        toolID,
        toolName: tool.toolName,
        usageCount: totalCount,
        category: cat,
      }
    },
  )
}

function groupByCategory(
  tools: ToolWithStats[],
): { category: string; tools: ToolWithStats[] }[] {
  const groups = new Map<string, ToolWithStats[]>()
  for (const tool of tools) {
    const list = groups.get(tool.category) || []
    list.push(tool)
    groups.set(tool.category, list)
  }

  // Sort tools within each category by usage count (descending)
  groups.forEach((list) => {
    list.sort((a, b) => b.usageCount - a.usageCount)
  })

  // Sort categories by predefined order
  return categoryOrder
    .filter((cat) => groups.has(cat))
    .map((cat) => ({ category: cat, tools: groups.get(cat)! }))
}

export default function ToolsPage() {
  const toolsWithStats = getToolsWithStats()
  const grouped = groupByCategory(toolsWithStats)

  // For search: convert to ToolData format
  const allToolsForSearch: (ToolData & { usageCount: number })[] =
    toolsWithStats
      .sort((a, b) => b.usageCount - a.usageCount)
      .map((t) => ({
        toolID: t.toolID,
        toolName: t.toolName,
        usageCount: t.usageCount,
        url: '',
        markdownContent: '',
      }))

  return (
    <>
      <div className="pb-1 pt-4">
        <h1 className="text-xl font-bold">みんなのツール</h1>
        <p className="mt-1 text-sm text-light-text">
          サービスで使用されている技術一覧
        </p>
      </div>
      <div className="mt-3 p-1">
        <ToolSearch
          allToolsData={allToolsForSearch}
          grouped={grouped}
        />
      </div>
      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          ホームに戻る
        </Link>
      </div>
    </>
  )
}
