'use client'

import { useState } from 'react'
import ToolRow from './ToolRow'

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
      <div
        role="tablist"
        aria-label="年"
        className="flex gap-1 overflow-x-auto border-b border-line px-3 pt-2"
      >
        {reversed.map((yr) => (
          <button
            key={yr.year}
            type="button"
            role="tab"
            aria-selected={selected === yr.year}
            onClick={() => setSelected(yr.year)}
            className={`-mb-px shrink-0 border-b-2 px-3 py-2 font-mono text-xs transition-colors ${
              selected === yr.year
                ? 'border-accent text-fg'
                : 'border-transparent text-muted hover:text-fg'
            }`}
          >
            {yr.year}
          </button>
        ))}
      </div>

      {current && (
        <div role="tabpanel" className="p-2 sm:p-3">
          <p className="px-2 pb-2 text-xs text-muted">
            {current.serviceCount} サービス中の採用数と採用率
          </p>
          <ol className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 lg:grid-cols-3">
            {current.tools.map((tool, i) => (
              <li key={tool.name} className="flex items-center">
                <span className="w-6 shrink-0 text-right font-mono text-xs text-muted">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <ToolRow
                    id={tool.toolID}
                    name={tool.name}
                    ratio={tool.rate / 100}
                    label={`${tool.rate}%`}
                    title={`${tool.name}: ${tool.count} / ${current.serviceCount} サービス（${tool.rate}%）`}
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
