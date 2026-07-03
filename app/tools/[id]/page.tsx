import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllToolsData, getToolData } from '../../lib/tools'
import { getFilteredPostsData } from '../../lib/posts'
import { getCoUsedTools, getToolYearlyAdoption } from '../../lib/related'
import ServiceCard from '../../components/ServiceCard'
import ToolListItem from '../../components/ToolListItem'
import ToolImage from './ToolImage'
import Breadcrumb from '../../components/Breadcrumb'

export function generateStaticParams() {
  const allToolsData = getAllToolsData()
  return allToolsData.map(({ toolID }) => ({ id: toolID }))
}

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

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'みんなのツール', href: '/tools' },
          { label: toolData.toolName },
        ]}
      />

      {/* Hero section */}
      <div className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8">
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <ToolImage toolID={toolData.toolID} toolName={toolData.toolName} />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold md:text-2xl">
              {toolData.toolName}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                {allPostsData.length} サービスで採用
              </span>
              <a
                href={toolData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
                公式サイト
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Yearly adoption trend */}
      {hasAdoption && (
        <section className="mt-5">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-100 bg-gray-50 px-5 py-3">
              <h2 className="text-sm font-semibold text-gray-700">
                年別採用トレンド
              </h2>
              <p className="mt-0.5 text-xs text-gray-400">
                各年に登録されたサービスのうち、このツールを採用した割合
              </p>
            </div>
            <div className="p-5">
              <div className="space-y-2">
                {yearlyAdoption.map(({ year, count, total, rate }) => (
                  <div key={year} className="flex items-center gap-3">
                    <span className="w-12 shrink-0 text-right text-xs text-gray-500">
                      {year}
                    </span>
                    <div className="flex flex-1 items-center gap-2">
                      <div className="h-5 flex-1 rounded-full bg-gray-100">
                        <div
                          className="h-5 rounded-full bg-blue-500 transition-all"
                          style={{
                            width: `${rate}%`,
                            minWidth: count > 0 ? '4px' : '0',
                          }}
                        />
                      </div>
                      <span className="w-24 shrink-0 text-right text-xs text-gray-600">
                        <span className="font-semibold">{count}</span>
                        <span className="text-gray-400"> / {total}件</span>
                        <span className="ml-1 font-semibold">{rate}%</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Frequently co-used tools */}
      {coUsedTools.length > 0 && (
        <section className="mt-5">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-100 bg-gray-50 px-5 py-3">
              <h2 className="text-sm font-semibold text-gray-700">
                一緒によく使われるツール
              </h2>
              <p className="mt-0.5 text-xs text-gray-400">
                {toolData.toolName}
                を採用しているサービスで併用されているツール（併用率）
              </p>
            </div>
            <div className="grid grid-cols-1 gap-0.5 p-2 sm:grid-cols-2 md:grid-cols-3">
              {coUsedTools.map(({ toolID, toolName, rate }) => (
                <ToolListItem
                  key={toolID}
                  toolID={toolID}
                  toolName={toolName}
                  badge={`${rate}%`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services using this tool */}
      <div className="mt-5">
        <h2 className="mb-3 text-sm font-semibold text-gray-500">
          採用サービス
        </h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5">
          {allPostsData.map((post) => (
            <ServiceCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          ツール一覧に戻る
        </Link>
      </div>
    </>
  )
}
