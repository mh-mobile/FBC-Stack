import type { Metadata } from 'next'
import { getSortedPostsData } from './lib/posts'
import { getToolUsageCounts } from './lib/stats'
import { getAllToolsData, hasToolIcon } from './lib/tools'
import { toServiceSummary } from './lib/summary'
import ServiceGrid from './components/ServiceGrid'
import { pageMetadata } from './lib/site'

const POPULAR_TOOL_COUNT = 12

export const metadata: Metadata = pageMetadata({ path: '/' })

export default function Home() {
  const posts = getSortedPostsData()
  const usage = getToolUsageCounts()
  const toolNames = new Map(
    getAllToolsData().map((t) => [t.toolID, t.toolName]),
  )
  const popularTools = Object.entries(usage)
    .sort(([, a], [, b]) => b - a)
    .slice(0, POPULAR_TOOL_COUNT)
    .map(([id]) => ({ id, name: toolNames.get(id) ?? id, hasIcon: hasToolIcon(id) }))

  const years = posts.map(({ date }) => date.slice(0, 4)).sort()
  const facts = [
    { value: posts.length, label: 'サービス' },
    { value: Object.keys(usage).length, label: 'ツール' },
    { value: `${years[0]}–${years[years.length - 1]}`, label: '掲載期間' },
  ]

  return (
    <>
      <section className="pb-10 pt-2 sm:pb-14">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">FBC Stack</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fg-2 sm:text-base">
          Fjord Boot Camp 卒業生が作った自作サービスの技術スタックデータベース。
        </p>
        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
          {facts.map(({ value, label }) => (
            <div key={label}>
              <dt className="text-xs text-muted">{label}</dt>
              <dd className="font-mono text-2xl font-semibold tabular-nums">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="services-heading">
        <h2 id="services-heading" className="mb-4 text-lg font-semibold">
          サービス
        </h2>
        <ServiceGrid services={posts.map(toServiceSummary)} popularTools={popularTools} />
      </section>
    </>
  )
}
