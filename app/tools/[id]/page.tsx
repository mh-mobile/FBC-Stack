import type { Metadata } from 'next'
import { getAllToolsData, getToolData, hasToolIcon } from '../../lib/tools'
import { pageMetadata } from '../../lib/site'
import { toServiceSummary } from '../../lib/summary'
import { getFilteredPostsData, getSortedPostsData } from '../../lib/posts'
import { getCoUsedTools, getToolYearlyAdoption } from '../../lib/related'
import ServiceList from '../../components/ServiceList'
import ToolRow from '../../components/ToolRow'
import ToolIcon from '../../components/ToolIcon'
import Breadcrumb from '../../components/Breadcrumb'
import Panel from '../../components/Panel'
import ColumnChart from '../../components/ColumnChart'
import { ExternalIcon } from '../../components/Icons'

export function generateStaticParams() {
  const allToolsData = getAllToolsData()
  return allToolsData.map(({ toolID }) => ({ id: toolID }))
}

// 存在しないIDは404にする（未指定だとオンデマンド描画でENOENTの500になる）
export const dynamicParams = false

const MIN_SAMPLE = 3

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const toolData = getToolData(id)
  return pageMetadata({
    title: toolData.toolName,
    description: `「${toolData.toolName}」を採用しているFBC卒業生のサービス一覧`,
    path: `/tools/${id}`,
  })
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const toolData = getToolData(id)
  const allPostsData = getFilteredPostsData(toolData)
  const coUsedTools = getCoUsedTools(toolData)
  const yearlyAdoption = getToolYearlyAdoption(toolData)
  const hasAdoption = yearlyAdoption.some(({ count }) => count > 0)
  // 採用数が少ないと率がすべて100%になるなど意味のない数字になるため、グラフは一定数以上のときだけ出す
  const showCharts = allPostsData.length >= MIN_SAMPLE
  const totalServices = getSortedPostsData().length
  const share = Math.round(
    (allPostsData.length / Math.max(totalServices, 1)) * 100,
  )
  const firstYear = yearlyAdoption.find(({ count }) => count > 0)?.year

  const facts = [
    { label: '採用サービス', value: `${allPostsData.length}` },
    { label: '全サービスに占める割合', value: `${share}%` },
    ...(firstYear ? [{ label: '初採用', value: firstYear }] : []),
  ]

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'みんなのツール', href: '/tools' },
          { label: toolData.toolName },
        ]}
      />

      <header className="flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-4">
          <ToolIcon
            hasIcon={hasToolIcon(toolData.toolID)}
            id={toolData.toolID}
            name={toolData.toolName}
            size={64}
            className="rounded-xl"
          />
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {toolData.toolName}
            </h1>
            {toolData.alias && toolData.alias.length > 0 && (
              <p className="mt-1 text-xs text-muted">
                別名: {toolData.alias.join(' / ')}
              </p>
            )}
            {toolData.url && (
              <a
                href={toolData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-sm text-accent hover:underline"
              >
                公式サイト
                <ExternalIcon className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
        <dl className="flex gap-8">
          {facts.map(({ label, value }) => (
            <div key={label}>
              <dt className="text-xs text-muted">{label}</dt>
              <dd className="font-mono text-2xl font-semibold tabular-nums">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </header>

      {!showCharts && allPostsData.length > 0 && (
        <p className="mt-8 rounded-xl border border-dashed border-line px-4 py-6 text-center text-sm text-muted">
          採用サービスが {allPostsData.length} 件と少ないため、年別採用率と併用率は表示していません。
        </p>
      )}

      {showCharts && (hasAdoption || coUsedTools.length > 0) && (
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {hasAdoption && (
            <Panel
              title="年別採用率"
              description="各年に登録されたサービスのうち、このツールを採用した割合（括弧内はその年のサービス数）"
            >
              <ColumnChart
                caption={`${toolData.toolName}の年別採用率`}
                max={Math.max(...yearlyAdoption.map(({ rate }) => rate))}
                data={yearlyAdoption.map(({ year, count, total, rate }) => ({
                  label: year.slice(2),
                  sub: `(${total})`,
                  value: rate,
                  display: `${rate}%`,
                  title: `${year}年: ${count} / ${total} サービス（${rate}%）`,
                }))}
              />
            </Panel>
          )}
          {coUsedTools.length > 0 && (
            <Panel
              title="一緒によく使われるツール"
              description={`${toolData.toolName}を採用している ${allPostsData.length} サービスでの併用率`}
              bodyClassName="grid grid-cols-1 gap-x-4 p-2 sm:grid-cols-2"
            >
              {coUsedTools.map(({ toolID, toolName, rate, count }) => (
                <ToolRow
                  key={toolID}
                  hasIcon={hasToolIcon(toolID)}
                  id={toolID}
                  name={toolName}
                  ratio={rate / 100}
                  label={`${rate}%`}
                  title={`${toolName}: ${count} / ${allPostsData.length} サービスで併用`}
                />
              ))}
            </Panel>
          )}
        </div>
      )}

      <section className="mt-12">
        <h2 className="mb-4 text-lg font-semibold">
          採用サービス
          <span className="ml-2 font-mono text-sm font-normal text-muted">
            {allPostsData.length}
          </span>
        </h2>
        <ServiceList services={allPostsData.map(toServiceSummary)} />
      </section>
    </>
  )
}
