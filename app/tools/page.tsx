import type { Metadata } from 'next'
import { getSortedPostsData } from '../lib/posts'
import { getAllToolsData, hasToolIcon } from '../lib/tools'
import ToolSearch from '../components/ToolSearch'
import Breadcrumb from '../components/Breadcrumb'
import PageHeader from '../components/PageHeader'
import { pageMetadata } from '../lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'みんなのツール',
  description: 'FBC卒業生のサービスで使われている技術の一覧。カテゴリごとに採用数の多い順で並べています。',
  path: '/tools',
})

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
  api連携: '外部サービス・API',
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
    // 同じツールを複数カテゴリに書いているサービスもあるので、採用数は1サービス1回だけ数える
    const counted = new Set<string>()
    for (const stackCategory of post.stack) {
      const rawCat = stackCategory.name
      const normalizedCat = categoryMap[rawCat.toLowerCase()] || rawCat

      for (const { name } of stackCategory.detail) {
        // Find matching tool
        const tool = allTools.find(
          (t) =>
            t.toolName.toLowerCase() === name.toLowerCase() ||
            t.alias?.some((a) => a.toLowerCase() === name.toLowerCase()),
        )
        if (!tool) continue

        let existing = toolStats.get(tool.toolID)
        if (!existing) {
          existing = { totalCount: 0, categoryCounts: new Map() }
          toolStats.set(tool.toolID, existing)
        }
        if (!counted.has(tool.toolID)) {
          counted.add(tool.toolID)
          existing.totalCount++
        }
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
      const cat = categoryOrder.includes(bestCategory) ? bestCategory : 'その他'
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
  const aliasByID = new Map(getAllToolsData().map((t) => [t.toolID, t.alias]))

  // 検索では別名でもヒットさせる
  const allToolsForSearch = [...toolsWithStats]
    .sort((a, b) => b.usageCount - a.usageCount)
    .map(({ toolID, toolName, usageCount }) => ({
      toolID,
      toolName,
      usageCount,
      hasIcon: hasToolIcon(toolID),
      alias: aliasByID.get(toolID),
    }))

  return (
    <>
      <Breadcrumb items={[{ label: 'みんなのツール' }]} />
      <PageHeader
        title="みんなのツール"
        description={`サービスで使われている ${allToolsForSearch.length} の技術を、カテゴリごとに採用数の多い順で並べています。`}
      />
      <ToolSearch
        allToolsData={allToolsForSearch}
        grouped={grouped.map(({ category, tools }) => ({
          category,
          tools: tools.map((tool) => ({ ...tool, hasIcon: hasToolIcon(tool.toolID) })),
        }))}
      />
    </>
  )
}
