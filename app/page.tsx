import { getSortedPostsData } from './lib/posts'
import { getToolUsageCounts } from './lib/stats'
import { getAllToolsData } from './lib/tools'
import ServiceGrid from './components/ServiceGrid'

const POPULAR_TOOL_COUNT = 12

export default function Home() {
  const posts = getSortedPostsData()
  const usage = getToolUsageCounts()
  const toolNames = new Map(
    getAllToolsData().map((t) => [t.toolID, t.toolName]),
  )
  const popularTools = Object.entries(usage)
    .sort(([, a], [, b]) => b - a)
    .slice(0, POPULAR_TOOL_COUNT)
    .map(([id, count]) => ({ id, name: toolNames.get(id) ?? id, count }))

  const years = posts.map(({ date }) => date.slice(0, 4)).sort()
  const facts = [
    { value: posts.length, label: 'サービス' },
    { value: Object.keys(usage).length, label: 'ツール' },
    { value: `${years[0]}–${years[years.length - 1]}`, label: '掲載期間' },
  ]

  return (
    <>
      <section className="pb-10 pt-2 sm:pb-14">
        <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">
          Fjord Boot Camp Graduates
        </p>
        <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
          卒業生がつくったサービスと、
          <br className="hidden sm:block" />
          その技術スタック。
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fg-2 sm:text-base">
          FBC卒業生が作成した自作サービスの技術スタックデータベースです。技術名で絞り込んで、同じ構成のサービスや実装例を探せます。
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
          Services
        </h2>
        <ServiceGrid posts={posts} popularTools={popularTools} />
      </section>
    </>
  )
}
