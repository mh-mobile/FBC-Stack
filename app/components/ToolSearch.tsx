'use client'

import { useState } from 'react'
import ToolRow from './ToolRow'
import Panel from './Panel'
import { SearchIcon } from './Icons'

type Tool = {
  toolID: string
  toolName: string
  usageCount: number
  hasIcon: boolean
  alias?: string[]
}

type GroupedTools = {
  category: string
  tools: Tool[]
}

type Props = {
  allToolsData: Tool[]
  grouped: GroupedTools[]
}

// カテゴリごとに最初に見せる件数（残りは「すべて表示」で展開）
const INITIAL_COUNT = 12

const anchor = (i: number) => `category-${i}`

export default function ToolSearch({ allToolsData, grouped }: Props) {
  const [filter, setFilter] = useState('')
  const [expanded, setExpanded] = useState<string[]>([])
  const q = filter.trim().toLowerCase()
  const maxUsage = Math.max(1, ...allToolsData.map((t) => t.usageCount))

  const filteredItems = allToolsData.filter(
    ({ toolName, alias }) =>
      toolName.toLowerCase().includes(q) ||
      alias?.some((a) => a.toLowerCase().includes(q)),
  )

  const row = ({ toolID, toolName, usageCount, hasIcon }: Tool) => (
    <ToolRow
      key={toolID}
      id={toolID}
      name={toolName}
      hasIcon={hasIcon}
      ratio={usageCount / maxUsage}
      label={`${usageCount}`}
      title={`${toolName}: ${usageCount} サービスで採用`}
    />
  )

  return (
    <div>
      <label className="relative block">
        <span className="sr-only">ツールを検索</span>
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="search"
          placeholder="ツール名・別名で検索（例: rails, acm）"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full rounded-lg border border-line bg-surface py-2.5 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent"
        />
      </label>

      {/* 件数の読み上げ用。検索開始前から置いておかないと最初の結果が読み上げられない */}
      <p className={q ? 'mb-3 mt-6 text-sm text-fg-2' : 'sr-only'} aria-live="polite">
        {q && (
          <>
            <span className="font-mono font-semibold text-fg">{filteredItems.length}</span>{' '}
            件のツール
          </>
        )}
      </p>

      {q ? (
        filteredItems.length > 0 ? (
          <Panel bodyClassName="grid grid-cols-1 gap-x-4 p-2 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map(row)}
          </Panel>
        ) : (
          <div className="rounded-xl border border-dashed border-line py-16 text-center text-sm text-muted">
            該当するツールが見つかりません
          </div>
        )
      ) : (
        <>
          <nav aria-label="カテゴリ" className="mt-4 flex flex-wrap gap-1.5">
            {grouped.map(({ category, tools }, i) => (
              <a
                key={category}
                href={`#${anchor(i)}`}
                className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-line bg-surface px-3 text-xs text-fg-2 transition-colors hover:border-line-strong hover:text-fg"
              >
                {category}
                <span className="font-mono text-muted">{tools.length}</span>
              </a>
            ))}
          </nav>
          <div className="mt-6 space-y-4">
            {grouped.map(({ category, tools }, i) => {
              const isExpanded = expanded.includes(category)
              const hidden = tools.length - INITIAL_COUNT
              return (
                <Panel
                  key={category}
                  id={anchor(i)}
                  title={category}
                  action={
                    <span className="font-mono text-xs text-muted">{tools.length} ツール</span>
                  }
                  bodyClassName="p-2"
                >
                  <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 lg:grid-cols-3">
                    {(isExpanded ? tools : tools.slice(0, INITIAL_COUNT)).map(row)}
                  </div>
                  {hidden > 0 && (
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      onClick={() =>
                        setExpanded((current) =>
                          isExpanded
                            ? current.filter((c) => c !== category)
                            : [...current, category],
                        )
                      }
                      className="mt-1 min-h-10 w-full rounded-lg text-xs text-muted transition-colors hover:bg-surface-2 hover:text-fg"
                    >
                      {isExpanded ? '閉じる' : `すべて表示（残り ${hidden} 件）`}
                    </button>
                  )}
                </Panel>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
