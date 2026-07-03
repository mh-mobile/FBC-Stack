import { getSortedPostsData, getFilteredPostsData } from './posts'
import { getAllToolsData } from './tools'
import type { PostData } from '../../types/postData'
import type { ToolData } from '../../types/toolData'

function getToolIDSet(post: PostData): Set<string> {
  return new Set(Object.values(post.toolPathInfo ?? {}))
}

// 技術スタックのJaccard類似度が高い順に他のサービスを返す
export function getRelatedPosts(currentId: string, limit = 4): PostData[] {
  const posts = getSortedPostsData()
  const current = posts.find(({ id }) => id === currentId)
  if (!current) return []

  const currentTools = getToolIDSet(current)
  if (currentTools.size === 0) return []

  const scored = posts
    .filter(({ id }) => id !== currentId)
    .map((post) => {
      const tools = getToolIDSet(post)
      let shared = 0
      tools.forEach((toolID) => {
        if (currentTools.has(toolID)) shared++
      })
      const unionSize = currentTools.size + tools.size - shared
      return {
        post,
        shared,
        similarity: unionSize > 0 ? shared / unionSize : 0,
      }
    })
    // 共通ツール1件だけの偶然の一致は除外
    .filter(({ shared }) => shared >= 2)

  return scored
    .sort(
      (a, b) =>
        b.similarity - a.similarity ||
        b.shared - a.shared ||
        b.post.date.localeCompare(a.post.date),
    )
    .slice(0, limit)
    .map(({ post }) => post)
}

export type CoUsedTool = {
  toolID: string
  toolName: string
  count: number
  rate: number
}

// 対象ツールを採用しているサービスで、一緒に使われているツールを集計する
export function getCoUsedTools(toolData: ToolData, limit = 12): CoUsedTool[] {
  const posts = getFilteredPostsData(toolData)
  if (posts.length === 0) return []

  const countMap = new Map<string, number>()
  for (const post of posts) {
    getToolIDSet(post).forEach((toolID) => {
      if (toolID === toolData.toolID) return
      countMap.set(toolID, (countMap.get(toolID) || 0) + 1)
    })
  }

  const allTools = getAllToolsData()
  return Array.from(countMap.entries())
    .map(([toolID, count]) => ({
      toolID,
      toolName: allTools.find((t) => t.toolID === toolID)?.toolName ?? toolID,
      count,
      rate: Math.round((count / posts.length) * 100),
    }))
    .sort((a, b) => b.count - a.count || a.toolName.localeCompare(b.toolName))
    .slice(0, limit)
}

export type YearlyAdoption = {
  year: string
  count: number
  total: number
  rate: number
}

// 対象ツールの年ごとの採用サービス数と採用率を返す
export function getToolYearlyAdoption(toolData: ToolData): YearlyAdoption[] {
  const totalByYear = new Map<string, number>()
  for (const post of getSortedPostsData()) {
    const year = post.date.slice(0, 4)
    totalByYear.set(year, (totalByYear.get(year) || 0) + 1)
  }

  const countByYear = new Map<string, number>()
  for (const post of getFilteredPostsData(toolData)) {
    const year = post.date.slice(0, 4)
    countByYear.set(year, (countByYear.get(year) || 0) + 1)
  }

  return Array.from(totalByYear.keys())
    .sort()
    .map((year) => {
      const total = totalByYear.get(year) || 0
      const count = countByYear.get(year) || 0
      return {
        year,
        count,
        total,
        rate: total > 0 ? Math.round((count / total) * 100) : 0,
      }
    })
}
