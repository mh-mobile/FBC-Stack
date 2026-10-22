import type { Metadata } from 'next'
import { getAllToolsData, getToolData } from '../../lib/tools'
import { getFilteredPostsData, getSortedPostsData } from '../../lib/posts'
import { getCoUsedTools, getToolYearlyAdoption } from '../../lib/related'
import ServiceCard from '../../components/ServiceCard'
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const toolData = getToolData(id)
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
  const description = `「${toolData.toolName}」を採用しているFBC卒業生のサービス一覧`

  return {
    title: toolData.toolName,
    description,
    openGraph: {
      title: `${toolData.toolName} | FBC Stack`,
      description,
      url: `${baseURL}/tools/${id}`,
      images: [`${baseURL}/images/fbcstack_ogp.png`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${toolData.toolName} | FBC Stack`,
      description,
      images: [`${baseURL}/images/fbcstack_ogp.png`],
    },
  }
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

      {(hasAdoption || coUsedTools.length > 0) && (
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {hasAdoption && (
            <Panel
              title="年別採用率"
              description="各年に登録されたサービスのうち、このツールを採用した割合"
            >
              <ColumnChart
                caption={`${toolData.toolName}の年別採用率`}
                max={Math.max(...yearlyAdoption.map(({ rate }) => rate))}
                data={yearlyAdoption.map(({ year, count, total, rate }) => ({
                  label: year.slice(2),
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
              description={`${toolData.toolName}を採用しているサービスでの併用率`}
              bodyClassName="grid grid-cols-1 gap-x-4 p-2 sm:grid-cols-2"
            >
              {coUsedTools.map(({ toolID, toolName, rate, count }) => (
                <ToolRow
                  key={toolID}
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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {allPostsData.map((post) => (
            <ServiceCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </>
  )
}
