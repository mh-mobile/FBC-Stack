'use client'

import { useState } from 'react'
import Link from 'next/link'

type YearlyRanking = {
  year: string
  serviceCount: number
  tools: { name: string; count: number; rate: number; toolID: string }[]
}

export default function YearlyRankingTabs({
  rankings,
}: {
  rankings: YearlyRanking[]
}) {
  const reversed = [...rankings].reverse()
  const [selected, setSelected] = useState(reversed[0]?.year || '')
  const current = reversed.find((r) => r.year === selected)

  return (
    <div>
      {/* Year tabs */}
      <div className="flex gap-1 overflow-x-auto border-b border-gray-100 px-5 pt-3">
        {reversed.map((yr) => (
          <button
            key={yr.year}
            onClick={() => setSelected(yr.year)}
            className={`shrink-0 rounded-t-lg px-3 py-2 text-xs font-medium transition-colors ${
              selected === yr.year
                ? 'border-b-2 border-blue-500 bg-white text-blue-600'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`}
          >
            {yr.year}
          </button>
        ))}
      </div>

      {/* Content */}
      {current && (
        <div className="p-5">
          <p className="mb-3 text-xs text-gray-400">
            {current.serviceCount}サービス中の採用数・採用率
          </p>
          <div className="space-y-1">
            {current.tools.map((tool, i) => (
              <div key={tool.name} className="flex items-center gap-2">
                <span className="w-5 shrink-0 text-right text-xs text-gray-400">
                  {i + 1}
                </span>
                <Link
                  href={`/tools/${tool.toolID}`}
                  className="w-28 shrink-0 truncate text-xs text-gray-700 hover:text-blue-600 md:w-36"
                >
                  {tool.name}
                </Link>
                <div className="flex flex-1 items-center gap-1.5">
                  <div className="h-4 flex-1 rounded-full bg-gray-100">
                    <div
                      className="h-4 rounded-full bg-emerald-400"
                      style={{
                        width: `${tool.rate}%`,
                        minWidth: tool.count > 0 ? '3px' : '0',
                      }}
                    />
                  </div>
                  <span className="w-16 shrink-0 text-right text-xs text-gray-500">
                    {tool.count}件{' '}
                    <span className="text-gray-400">({tool.rate}%)</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
