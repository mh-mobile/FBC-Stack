'use client'

import { useState } from 'react'
import ToolRow from './ToolRow'

type YearlyRanking = {
  year: string
  serviceCount: number
  tools: { name: string; count: number; rate: number; toolID: string; hasIcon: boolean }[]
}

// 年の切り替えは押しボタン（aria-pressed）の並びにする。狭い画面では折り返して全年を見せる
export default function YearlyRankingTabs({ rankings }: { rankings: YearlyRanking[] }) {
  const reversed = [...rankings].reverse()
  const [selected, setSelected] = useState(reversed[0]?.year || '')
  const current = reversed.find((r) => r.year === selected)

  return (
    <div>
      <div
        role="group"
        aria-label="表示する年"
        className="flex flex-wrap gap-1 border-b border-line px-3 py-2"
      >
        {reversed.map((yr) => (
          <button
            key={yr.year}
            type="button"
            aria-pressed={selected === yr.year}
            onClick={() => setSelected(yr.year)}
            className={`min-h-8 rounded-md px-3 font-mono text-xs transition-colors ${
              selected === yr.year
                ? 'bg-fg text-bg'
                : 'text-fg-2 hover:bg-surface-2 hover:text-fg'
            }`}
          >
            {yr.year}
          </button>
        ))}
      </div>

      {current && (
        <div className="p-2 sm:p-3">
          <p className="px-2 pb-2 text-xs text-muted" aria-live="polite">
            {current.year}年: {current.serviceCount} サービス中の採用数と採用率
          </p>
          <ol className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 lg:grid-cols-3">
            {current.tools.map((tool, i) => (
              <li key={tool.name} className="flex items-center">
                <span className="w-6 shrink-0 text-right font-mono text-xs text-muted">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <ToolRow
                    id={tool.toolID}
                    name={tool.name}
                    hasIcon={tool.hasIcon}
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
