import { getSortedPostsData } from './posts'
import { getAllToolsData } from './tools'

export type ServicesByYear = { year: string; count: number }[]
export type ToolRanking = { name: string; count: number; toolID: string }[]
export type YearlyRanking = {
  year: string
  serviceCount: number
  tools: { name: string; count: number; rate: number; toolID: string }[]
}
export type TrendRow = {
  name: string
  toolID: string
  totalCount: number
  rates: { year: string; rate: number; count: number }[]
}

export function getStatsData() {
  const posts = getSortedPostsData()
  const allTools = getAllToolsData()

  // --- 年別サービス数 ---
  const yearCountMap = new Map<string, number>()
  for (const post of posts) {
    const year = post.date.slice(0, 4)
    yearCountMap.set(year, (yearCountMap.get(year) || 0) + 1)
  }
  const servicesByYear: ServicesByYear = Array.from(yearCountMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([year, count]) => ({ year, count }))

  // --- 人気ツールランキング ---
  const toolCountMap = new Map<string, { count: number; toolID: string }>()
  for (const post of posts) {
    const seen = new Set<string>()
    for (const cat of post.stack) {
      for (const { name } of cat.detail) {
        const tool = allTools.find(
          (t) =>
            t.toolName.toLowerCase() === name.toLowerCase() ||
            t.alias?.some((a) => a.toLowerCase() === name.toLowerCase()),
        )
        if (!tool || seen.has(tool.toolID)) continue
        seen.add(tool.toolID)
        const existing = toolCountMap.get(tool.toolName)
        if (existing) {
          existing.count++
        } else {
          toolCountMap.set(tool.toolName, { count: 1, toolID: tool.toolID })
        }
      }
    }
  }
  const topTools: ToolRanking = Array.from(toolCountMap.entries())
    .map(([name, { count, toolID }]) => ({ name, count, toolID }))
    .sort((a, b) => b.count - a.count)

  // --- 年別・ツール別の採用数を集計 ---
  const yearToolMap = new Map<string, Map<string, number>>()
  let totalToolsInServices = 0

  for (const post of posts) {
    const year = post.date.slice(0, 4)
    if (!yearToolMap.has(year)) yearToolMap.set(year, new Map())
    const yearMap = yearToolMap.get(year)!
    const seen = new Set<string>()

    let toolCount = 0
    for (const cat of post.stack) {
      for (const { name } of cat.detail) {
        toolCount++
        const tool = allTools.find(
          (t) =>
            t.toolName.toLowerCase() === name.toLowerCase() ||
            t.alias?.some((a) => a.toLowerCase() === name.toLowerCase()),
        )
        if (!tool || seen.has(tool.toolName)) continue
        seen.add(tool.toolName)
        yearMap.set(tool.toolName, (yearMap.get(tool.toolName) || 0) + 1)
      }
    }
    totalToolsInServices += toolCount
  }

  const sortedYears = Array.from(yearCountMap.keys()).sort()

  // --- 年別 TOP 20 ---
  const yearlyRankings: YearlyRanking[] = sortedYears.map((year) => {
    const serviceCount = yearCountMap.get(year) || 0
    const toolMap = yearToolMap.get(year) || new Map<string, number>()
    const tools: YearlyRanking['tools'] = []
    toolMap.forEach((count, name) => {
      const toolData = toolCountMap.get(name)
      tools.push({
        name,
        count,
        rate: serviceCount > 0 ? Math.round((count / serviceCount) * 100) : 0,
        toolID: toolData?.toolID || '',
      })
    })
    tools.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    return { year, serviceCount, tools: tools.slice(0, 20) }
  })

  // --- 推移テーブル: 全期間TOP20 ∪ 各年TOP20 に出たツール ---
  const trendToolSet = new Set<string>()
  // 全期間TOP20
  for (const t of topTools.slice(0, 20)) {
    trendToolSet.add(t.name)
  }
  // 各年TOP20
  for (const yr of yearlyRankings) {
    for (const t of yr.tools) {
      trendToolSet.add(t.name)
    }
  }

  // Build trend rows with year-by-year rates
  const trendTable: TrendRow[] = []
  trendToolSet.forEach((name) => {
    const toolData = toolCountMap.get(name)
    if (!toolData) return
    trendTable.push({
      name,
      toolID: toolData.toolID,
      totalCount: toolData.count,
      rates: sortedYears.map((year) => {
        const total = yearCountMap.get(year) || 0
        const count = yearToolMap.get(year)?.get(name) || 0
        return {
          year,
          count,
          rate: total > 0 ? Math.round((count / total) * 100) : 0,
        }
      }),
    })
  })
  // Sort by total count descending
  trendTable.sort((a, b) => b.totalCount - a.totalCount)

  const avgToolsPerService =
    posts.length > 0
      ? Math.round((totalToolsInServices / posts.length) * 10) / 10
      : 0

  return {
    totalServices: posts.length,
    totalTools: topTools.length,
    avgToolsPerService,
    servicesByYear,
    sortedYears,
    topTools,
    yearlyRankings,
    trendTable,
  }
}
