import type { Metadata } from 'next'
import Link from 'next/link'
import { getStatsData } from '../lib/stats'
import Breadcrumb from '../components/Breadcrumb'
import PageHeader from '../components/PageHeader'
import Panel from '../components/Panel'
import ColumnChart from '../components/ColumnChart'
import ToolRow from '../components/ToolRow'
import YearlyRankingTabs from '../components/YearlyRankingTabs'

export const metadata: Metadata = {
  title: '統計',
}

// 採用率を5段階に分け、青の単色ランプ（低→高）に割り当てる
const HEAT_LEVELS = [
  { min: 80, label: '80%+' },
  { min: 60, label: '60–79%' },
  { min: 40, label: '40–59%' },
  { min: 20, label: '20–39%' },
  { min: 1, label: '1–19%' },
]

function heatStyle(rate: number) {
  const index = HEAT_LEVELS.findIndex(({ min }) => rate >= min)
  const step = HEAT_LEVELS.length - index
  return { background: `var(--heat-${step})`, color: `var(--heat-${step}-fg)` }
}

export default function StatsPage() {
  const stats = getStatsData()
  const maxTopTools = stats.topTools[0]?.count || 1
  const latest = stats.servicesByYear[stats.servicesByYear.length - 1]

  const tiles = [
    { label: 'サービス数', value: stats.totalServices },
    { label: 'ツール数', value: stats.totalTools },
    { label: '平均ツール数 / サービス', value: stats.avgToolsPerService },
    { label: `${latest?.year ?? ''}年の登録数`, value: latest?.count ?? 0 },
  ]

  return (
    <>
      <Breadcrumb items={[{ label: '統計' }]} />
      <PageHeader
        title="統計"
        description="FBC卒業生のサービスと技術スタックを、年ごとの登録数・人気ツール・採用率の推移から分析します。"
      />

      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {tiles.map(({ label, value }) => (
          <div
            key={label}
            className="rounded-xl border border-line bg-surface p-4 sm:p-5"
          >
            <dt className="text-xs text-muted">{label}</dt>
            <dd className="mt-1 font-mono text-3xl font-semibold tabular-nums">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel title="年別サービス登録数">
          <ColumnChart
            caption="年別サービス登録数"
            max={Math.max(...stats.servicesByYear.map(({ count }) => count))}
            data={stats.servicesByYear.map(({ year, count }) => ({
              label: year.slice(2),
              value: count,
              display: `${count}`,
              title: `${year}年: ${count} サービス`,
            }))}
          />
        </Panel>

        <Panel
          title="全期間 人気ツール Top 20"
          bodyClassName="grid grid-cols-1 gap-x-4 p-2 sm:grid-cols-2"
        >
          {stats.topTools.slice(0, 20).map((tool, i) => (
            <div key={tool.toolID} className="flex items-center">
              <span className="w-6 shrink-0 text-right font-mono text-xs text-muted">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <ToolRow
                  id={tool.toolID}
                  name={tool.name}
                  ratio={tool.count / maxTopTools}
                  label={`${tool.count}`}
                  title={`${tool.name}: ${tool.count} サービスで採用`}
                />
              </div>
            </div>
          ))}
        </Panel>
      </div>

      <Panel
        className="mt-4"
        title="年別 人気ツール Top 20"
        description="各年のサービスにおける採用数と採用率"
        bodyClassName=""
      >
        <YearlyRankingTabs rankings={stats.yearlyRankings} />
      </Panel>

      <Panel
        className="mt-4"
        title="年別採用率の推移"
        description="全期間Top 20と各年Top 20に登場したツールの採用率（%）"
        bodyClassName="p-4 sm:p-5"
      >
        <ul
          className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted"
          aria-label="凡例"
        >
          {[...HEAT_LEVELS].reverse().map(({ min, label }) => (
            <li key={label} className="inline-flex items-center gap-1.5">
              <span
                className="inline-block h-3 w-5 rounded-sm"
                style={heatStyle(min)}
              />
              {label}
            </li>
          ))}
        </ul>
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0.5 text-xs">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-surface pb-2 pr-3 text-left font-medium text-muted">
                  ツール <span className="ml-1 font-normal">計</span>
                </th>
                {stats.sortedYears.map((year) => (
                  <th
                    key={year}
                    className="pb-2 text-center font-mono font-medium text-muted"
                  >
                    {year.slice(2)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.trendTable.map((row) => (
                <tr key={row.name}>
                  <td className="sticky left-0 z-10 max-w-40 bg-surface py-0.5 pr-3">
                    <span className="flex items-baseline gap-2">
                      <Link
                        href={`/tools/${row.toolID}`}
                        className="truncate text-fg-2 transition-colors hover:text-accent"
                      >
                        {row.name}
                      </Link>
                      <span className="shrink-0 font-mono text-muted">
                        {row.totalCount}
                      </span>
                    </span>
                  </td>
                  {row.rates.map(({ year, rate, count }) => (
                    <td key={year} className="p-0 text-center">
                      {rate > 0 ? (
                        <span
                          title={`${row.name} ${year}年: ${count}件（${rate}%）`}
                          className="flex h-7 min-w-8 items-center justify-center rounded-sm font-mono tabular-nums"
                          style={heatStyle(rate)}
                        >
                          {rate}
                        </span>
                      ) : (
                        <span className="flex h-7 min-w-8 items-center justify-center text-line-strong">
                          ·
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  )
}
