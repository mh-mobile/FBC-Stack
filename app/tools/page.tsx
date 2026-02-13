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
        <Link href="/" className="text-external-link hover:underline">
          &larr; Back to home
        </Link>
      </div>
    </>
  )
}
