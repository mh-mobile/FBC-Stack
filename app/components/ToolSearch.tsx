'use client'

import { useState } from 'react'
import ToolBadge from './ToolBadge'
import type { ToolData } from '../../types/toolData'

type Props = {
  allToolsData: ToolData[]
}

export default function ToolSearch({ allToolsData }: Props) {
  const [filter, setFilter] = useState('')

  const filteredItems = allToolsData.filter(
    ({ toolName, alias }) =>
      toolName?.toLowerCase().includes(filter.toLowerCase()) ||
      alias?.some((a) => a.toLowerCase().includes(filter.toLowerCase())),
  )

  return (
    <div>
      <div className="relative mb-6">
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
          placeholder="ツールを検索"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
        />
      </div>

      <div className="mb-2 text-sm text-light-text">
        {filteredItems.length} 件のツール
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
        {filteredItems.map(({ toolID, toolName }) => (
          <ToolBadge key={toolID} id={toolID} name={toolName} version="" />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="py-12 text-center text-gray-400">
          該当するツールが見つかりません
        </div>
      )}
    </div>
  )
}
