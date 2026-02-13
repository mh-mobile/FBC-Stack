import type { Metadata } from 'next'
import Link from 'next/link'
import { getToolsNameInPostsData } from '../lib/posts'
import { getAllToolsData } from '../lib/tools'
import ToolSearch from '../components/ToolSearch'

export const metadata: Metadata = {
  title: 'Tools',
}

function getAllToolsDataInUse() {
  const toolsNameInServices = getToolsNameInPostsData().map((name) =>
    name.toLowerCase(),
  )
  return getAllToolsData().filter((toolData) => {
    return (
      toolsNameInServices.includes(toolData.toolName.toLowerCase()) ||
      toolData.alias?.some((name) =>
        toolsNameInServices.includes(name.toLowerCase()),
      )
    )
  })
}

export default function ToolsPage() {
  const allToolsData = getAllToolsDataInUse()

  return (
    <>
      <h1 className="py-4 text-3xl font-extrabold">Tools</h1>
      <div className="p-1">
        <ToolSearch allToolsData={allToolsData} />
      </div>
      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          ホームに戻る
        </Link>
      </div>
    </>
  )
}
