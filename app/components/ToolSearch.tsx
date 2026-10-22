'use client'

import { useState } from 'react'
import ToolRow from './ToolRow'
import Panel from './Panel'
import { SearchIcon } from './Icons'

type Tool = {
  toolID: string
  toolName: string
  usageCount: number
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

const anchor = (i: number) => `category-${i}`

export default function ToolSearch({ allToolsData, grouped }: Props) {
  const [filter, setFilter] = useState('')
  const q = filter.trim().toLowerCase()
  const maxUsage = Math.max(1, ...allToolsData.map((t) => t.usageCount))

  const filteredItems = allToolsData.filter(
    ({ toolName, alias }) =>
      toolName.toLowerCase().includes(q) ||
      alias?.some((a) => a.toLowerCase().includes(q)),
  )

  const row = ({ toolID, toolName, usageCount }: Tool) => (
    <ToolRow
      key={toolID}
      id={toolID}
      name={toolName}
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
          type="text"
          placeholder="ツール名・別名で検索（例: rails, acm）"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full rounded-lg border border-line bg-surface py-2.5 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent"
        />
      </label>

      {q ? (
        <div className="mt-6">
          <p className="mb-3 text-sm text-fg-2" aria-live="polite">
            <span className="font-mono font-semibold text-fg">
              {filteredItems.length}
            </span>{' '}
            件のツール
          </p>
          {filteredItems.length > 0 ? (
            <Panel bodyClassName="grid grid-cols-1 gap-x-4 p-2 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map(row)}
            </Panel>
          ) : (
            <div className="rounded-xl border border-dashed border-line py-16 text-center text-sm text-muted">
              該当するツールが見つかりません
            </div>
          )}
        </div>
      ) : (
        <>
          <nav aria-label="カテゴリ" className="mt-4 flex flex-wrap gap-1.5">
            {grouped.map(({ category, tools }, i) => (
              <a
                key={category}
                href={`#${anchor(i)}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-xs text-fg-2 transition-colors hover:border-line-strong hover:text-fg"
              >
                {category}
                <span className="font-mono text-muted">{tools.length}</span>
              </a>
            ))}
          </nav>
          <div className="mt-6 space-y-4">
            {grouped.map(({ category, tools }, i) => (
              <Panel
                key={category}
                id={anchor(i)}
                title={category}
                action={
                  <span className="font-mono text-xs text-muted">
                    {tools.length} tools
                  </span>
                }
                bodyClassName="grid grid-cols-1 gap-x-4 p-2 sm:grid-cols-2 lg:grid-cols-3"
              >
                {tools.map(row)}
              </Panel>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
