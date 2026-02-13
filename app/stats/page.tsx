import type { Metadata } from 'next'
import Link from 'next/link'
import { getStatsData } from '../lib/stats'
import Breadcrumb from '../components/Breadcrumb'
import YearlyRankingTabs from '../components/YearlyRankingTabs'

export const metadata: Metadata = {
  title: '統計',
}

function StatCard({
  label,
  value,
  unit,
}: {
  label: string
  value: number | string
  unit?: string
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 text-center">
      <div className="text-3xl font-bold text-gray-800">
        {value}
        {unit && (
          <span className="ml-1 text-base font-normal text-gray-400">
            {unit}
          </span>
        )}
      </div>
      <div className="mt-1 text-xs text-gray-500">{label}</div>
    </div>
  )
}

function rateColor(rate: number): string {
  if (rate >= 80) return 'bg-blue-600 text-white'
  if (rate >= 60) return 'bg-blue-500 text-white'
  if (rate >= 40) return 'bg-blue-400 text-white'
  if (rate >= 20) return 'bg-blue-200 text-blue-900'
  if (rate > 0) return 'bg-blue-50 text-blue-700'
  return 'text-gray-200'
}

export default function StatsPage() {
  const stats = getStatsData()

  const maxServicesByYear = Math.max(
    ...stats.servicesByYear.map((d) => d.count),
  )
  const maxTopTools = stats.topTools[0]?.count || 1

  return (
    <>
      <Breadcrumb items={[{ label: '統計' }]} />
      <div className="pb-1">
        <h1 className="text-xl font-bold">統計ダッシュボード</h1>
        <p className="mt-1 text-sm text-light-text">
          FBC卒業生のサービスと技術スタックの分析
        </p>
      </div>

      {/* Summary cards */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        <StatCard label="サービス数" value={stats.totalServices} />
        <StatCard label="ツール数" value={stats.totalTools} />
        <StatCard
          label="平均ツール数/サービス"
          value={stats.avgToolsPerService}
        />
      </div>

      {/* Services by year */}
      <section className="mt-8">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 bg-gray-50 px-5 py-3">
            <h2 className="text-sm font-semibold text-gray-700">
              年別サービス登録数
            </h2>
          </div>
          <div className="p-5">
            <div className="space-y-2">
              {stats.servicesByYear.map(({ year, count }) => (
                <div key={year} className="flex items-center gap-3">
                  <span className="w-12 shrink-0 text-right text-xs text-gray-500">
                    {year}
                  </span>
                  <div className="flex flex-1 items-center gap-2">
                    <div className="h-6 flex-1 rounded-full bg-gray-100">
                      <div
                        className="h-6 rounded-full bg-blue-500 transition-all"
                        style={{
                          width: `${maxServicesByYear > 0 ? (count / maxServicesByYear) * 100 : 0}%`,
                          minWidth: count > 0 ? '4px' : '0',
                        }}
                      />
                    </div>
                    <span className="w-8 shrink-0 text-sm font-semibold text-gray-700">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Overall Top 20 */}
      <section className="mt-5">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 bg-gray-50 px-5 py-3">
            <h2 className="text-sm font-semibold text-gray-700">
              全期間 人気ツール Top 20
            </h2>
          </div>
          <div className="p-5">
            <div className="space-y-1.5">
              {stats.topTools.slice(0, 20).map((tool, i) => (
                <div key={tool.name} className="flex items-center gap-3">
                  <span className="w-6 shrink-0 text-right text-xs font-medium text-gray-400">
                    {i + 1}
                  </span>
                  <Link
                    href={`/tools/${tool.toolID}`}
                    className="w-32 shrink-0 truncate text-sm text-gray-700 hover:text-blue-600 md:w-40"
                  >
                    {tool.name}
                  </Link>
                  <div className="flex flex-1 items-center gap-2">
                    <div className="h-5 flex-1 rounded-full bg-gray-100">
                      <div
                        className="h-5 rounded-full bg-amber-400 transition-all"
                        style={{
                          width: `${(tool.count / maxTopTools) * 100}%`,
                          minWidth: '4px',
                        }}
                      />
                    </div>
                    <span className="w-10 shrink-0 text-right text-xs font-semibold text-gray-600">
                      {tool.count}件
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Year-by-year Top 20 */}
      <section className="mt-5">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 bg-gray-50 px-5 py-3">
            <h2 className="text-sm font-semibold text-gray-700">
              年別 人気ツール Top 20
            </h2>
            <p className="mt-0.5 text-xs text-gray-400">
              各年のサービスにおける採用数と採用率
            </p>
          </div>
          <YearlyRankingTabs rankings={stats.yearlyRankings} />
        </div>
      </section>

      {/* Trend heatmap table */}
      <section className="mt-5">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 bg-gray-50 px-5 py-3">
            <h2 className="text-sm font-semibold text-gray-700">
              年別採用率の推移
            </h2>
            <p className="mt-0.5 text-xs text-gray-400">
              全期間TOP20 ∪ 各年TOP20 に登場したツールの採用率（%）
            </p>
          </div>
          <div className="overflow-x-auto p-5">
            {/* Legend */}
            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-gray-400">
              <span>採用率:</span>
              <span className="inline-flex items-center gap-1">
                <span className="inline-block h-3 w-5 rounded bg-blue-50" />
                1-19%
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="inline-block h-3 w-5 rounded bg-blue-200" />
                20-39%
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="inline-block h-3 w-5 rounded bg-blue-400" />
                40-59%
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="inline-block h-3 w-5 rounded bg-blue-500" />
                60-79%
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="inline-block h-3 w-5 rounded bg-blue-600" />
                80%+
              </span>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="sticky left-0 z-10 bg-white pb-2 pr-2 text-left font-medium text-gray-500 after:pointer-events-none after:absolute after:right-0 after:top-0 after:h-full after:w-4 after:shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
                    <span className="flex items-baseline gap-2">
                      <span>ツール</span>
                      <span className="text-gray-400">計</span>
                    </span>
                  </th>
                  {stats.sortedYears.map((year) => (
                    <th
                      key={year}
                      className="pb-2 px-1 text-center font-medium text-gray-500"
                    >
                      {year.slice(2)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stats.trendTable.map((row) => (
                  <tr key={row.name} className="border-b border-gray-50">
                    <td className="sticky left-0 z-10 bg-white py-1.5 pr-2 after:pointer-events-none after:absolute after:right-0 after:top-0 after:h-full after:w-4 after:shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
                      <span className="flex items-baseline gap-2">
                        <Link
                          href={`/tools/${row.toolID}`}
                          className="truncate text-gray-700 hover:text-blue-600"
                        >
                          {row.name}
                        </Link>
                        <span className="shrink-0 text-gray-400 font-semibold">
                          {row.totalCount}
                        </span>
                      </span>
                    </td>
                    {row.rates.map(({ year, rate }) => (
                      <td key={year} className="py-1.5 px-0.5 text-center">
                        {rate > 0 ? (
                          <span
                            className={`inline-flex h-6 min-w-[28px] items-center justify-center rounded px-1 text-xs font-medium ${rateColor(rate)}`}
                          >
                            {rate}
                          </span>
                        ) : (
                          <span className="text-gray-200">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

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
