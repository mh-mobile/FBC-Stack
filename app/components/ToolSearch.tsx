'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getBlurDataURL } from '../lib/image'
import type { ToolData } from '../../types/toolData'

type ToolWithStats = ToolData & { usageCount: number }

type GroupedTools = {
  category: string
  tools: { toolID: string; toolName: string; usageCount: number }[]
}

type Props = {
  allToolsData: ToolWithStats[]
  grouped: GroupedTools[]
}

function ToolItem({
  toolID,
  toolName,
  usageCount,
}: {
  toolID: string
  toolName: string
  usageCount: number
}) {
  const [imgSrc, setImgSrc] = useState(`/images/tool/${toolID}.png`)

  return (
    <Link href={`/tools/${toolID}`} className="block">
      <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-gray-100">
        <div className="relative h-8 w-8 shrink-0">
          <Image
            src={imgSrc}
            alt={toolName}
            placeholder="blur"
            blurDataURL={getBlurDataURL()}
            fill
            onError={() => setImgSrc('/images/noimage.png')}
            className="object-contain"
          />
        </div>
        <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-700">
          {toolName}
        </span>
        <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
          {usageCount}
        </span>
      </div>
    </Link>
  )
}

export default function ToolSearch({ allToolsData, grouped }: Props) {
  const [filter, setFilter] = useState('')

  const isSearching = filter.trim().length > 0

  const filteredItems = allToolsData.filter(
    ({ toolName, alias }) =>
      toolName?.toLowerCase().includes(filter.toLowerCase()) ||
      alias?.some((a) => a.toLowerCase().includes(filter.toLowerCase())),
  )

  return (
    <div>
      <div className="relative mb-4">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          type="text"
          placeholder="ツールを検索..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
        />
      </div>

      {isSearching ? (
        <>
          <div className="mb-3 text-sm text-light-text">
            {filteredItems.length} 件のツール
          </div>
          <div className="grid grid-cols-1 gap-0.5 sm:grid-cols-2">
            {filteredItems.map(({ toolID, toolName, usageCount }) => (
              <ToolItem
                key={toolID}
                toolID={toolID}
                toolName={toolName}
                usageCount={usageCount}
              />
            ))}
          </div>
          {filteredItems.length === 0 && (
            <div className="py-12 text-center text-gray-400">
              該当するツールが見つかりません
            </div>
          )}
        </>
      ) : (
        <>
          <div className="mb-3 text-sm text-light-text">
            {allToolsData.length} 件のツール
          </div>
          <div className="space-y-4">
            {grouped.map(({ category, tools }) => (
              <div
                key={category}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white"
              >
                <div className="border-b border-gray-100 bg-gray-50 px-5 py-3">
                  <span className="text-sm font-semibold text-gray-700">
                    {category}
                  </span>
                  <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600">
                    {tools.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-0.5 p-2 sm:grid-cols-2 md:grid-cols-3">
                  {tools.map(({ toolID, toolName, usageCount }) => (
                    <ToolItem
                      key={toolID}
                      toolID={toolID}
                      toolName={toolName}
                      usageCount={usageCount}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
