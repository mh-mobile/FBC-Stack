import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllToolsData, getToolData } from '../../lib/tools'
import { getFilteredPostsData } from '../../lib/posts'
import ServiceCard from '../../components/ServiceCard'
import ToolImage from './ToolImage'

export function generateStaticParams() {
  const allToolsData = getAllToolsData()
  return allToolsData.map(({ toolID }) => ({ id: toolID }))
}

export function generateMetadata({
  params,
}: {
  params: { id: string }
}): Metadata {
  const toolData = getToolData(params.id)
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
  const description = `「${toolData.toolName}」を採用しているFBC卒業生のサービス一覧`

  return {
    title: toolData.toolName,
    description,
    openGraph: {
      title: `${toolData.toolName} | FBC Stack`,
      description,
      url: `${baseURL}/tools/${params.id}`,
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

export default function ToolDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const toolData = getToolData(params.id)
  const allPostsData = getFilteredPostsData(toolData)

  return (
    <>
      <div className="flex justify-center py-5">
        <ToolImage toolID={toolData.toolID} />
      </div>

      <h1 className="text-center text-2xl font-extrabold">
        &quot;{toolData.toolName}&quot;を採用しているサービス（
        {allPostsData.length}）
      </h1>

      <div className="flex justify-center pb-5 pt-2">
        <a
          href={toolData.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-full border border-blue-300 px-3 py-1 text-sm text-external-link hover:bg-blue-50 transition-colors"
        >
          {toolData.url}
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
        </a>
      </div>

      <div className="p-1">
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
