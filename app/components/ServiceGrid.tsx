'use client'

import { useEffect, useMemo, useState } from 'react'
import ServiceCard from './ServiceCard'
import ToolIcon from './ToolIcon'
import { SearchIcon, XIcon } from './Icons'
import type { CardTool, ServiceSummary } from '../lib/summary'

const ITEMS_PER_PAGE = 24

type Sort = 'newest' | 'oldest'

type Filters = {
  query: string
  year: string | null
  tools: string[]
  sort: Sort
}

const EMPTY: Filters = { query: '', year: null, tools: [], sort: 'newest' }

// 絞り込み条件は URL（?q=&year=&tools=a,b&sort=oldest）と同期し、共有や「戻る」で復元できるようにする。
// 静的HTMLには条件なしの一覧を出し、読み込み後に URL の条件を反映する
function readFilters(search: string): Filters {
  const params = new URLSearchParams(search)
  return {
    query: params.get('q') ?? '',
    year: params.get('year'),
    tools: params.get('tools')?.split(',').filter(Boolean) ?? [],
    sort: params.get('sort') === 'oldest' ? 'oldest' : 'newest',
  }
}

function writeFilters({ query, year, tools, sort }: Filters) {
  const params = new URLSearchParams()
  if (query.trim()) params.set('q', query.trim())
  if (year) params.set('year', year)
  if (tools.length) params.set('tools', tools.join(','))
  if (sort === 'oldest') params.set('sort', sort)
  const search = params.toString()
  window.history.replaceState(
    window.history.state,
    '',
    `${window.location.pathname}${search ? `?${search}` : ''}`,
  )
}

function chipClass(selected: boolean) {
  return `inline-flex min-h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs transition-colors ${
    selected
      ? 'border-fg bg-fg text-bg'
      : 'border-line bg-surface text-fg-2 hover:border-line-strong hover:text-fg'
  }`
}

// スマホでは1行の横スクロールにして、右端をフェードさせて続きがあることを示す
const chipRowClass =
  '-mx-4 flex items-center gap-1.5 overflow-x-auto px-4 pb-1 [mask-image:linear-gradient(to_right,black_85%,transparent)] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 sm:[mask-image:none]'

type Props = {
  services: ServiceSummary[]
  popularTools: CardTool[]
}

export default function ServiceGrid({ services, popularTools }: Props) {
  const [filters, setFilters] = useState<Filters>(EMPTY)
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE)

  useEffect(() => {
    setFilters(readFilters(window.location.search))
  }, [])

  const update = (patch: Partial<Filters>) => {
    const next = { ...filters, ...patch }
    setFilters(next)
    setDisplayCount(ITEMS_PER_PAGE)
    writeFilters(next)
  }

  const years = useMemo(
    () =>
      Array.from(new Set(services.map(({ date }) => date.slice(0, 4)))).sort((a, b) =>
        b.localeCompare(a),
      ),
    [services],
  )

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase()
    const result = services.filter((service) => {
      if (filters.year && !service.date.startsWith(filters.year)) return false
      // 選択したツールをすべて使っているサービスに絞る（AND）
      if (filters.tools.length) {
        const ids = new Set(service.toolIDs)
        if (!filters.tools.every((id) => ids.has(id))) return false
      }
      return !q || service.search.includes(q)
    })
    return filters.sort === 'oldest' ? result.reverse() : result
  }, [services, filters])

  const toggleTool = (id: string) =>
    update({
      tools: filters.tools.includes(id)
        ? filters.tools.filter((t) => t !== id)
        : [...filters.tools, id],
    })

  const isFiltered = Boolean(filters.query.trim() || filters.year || filters.tools.length)
  const clearAll = () => update({ query: '', year: null, tools: [] })
  const visible = filtered.slice(0, displayCount)
  const remaining = filtered.length - displayCount

  return (
    <div>
      <div className="space-y-3">
        <div className="flex gap-2">
          <label className="relative flex-1">
            <span className="sr-only">サービスを検索</span>
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="サービス名・作者・技術名で検索"
              value={filters.query}
              onChange={(e) => update({ query: e.target.value })}
              className="w-full rounded-lg border border-line bg-surface py-2.5 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent"
            />
          </label>
          <select
            value={filters.sort}
            onChange={(e) => update({ sort: e.target.value as Sort })}
            aria-label="並び順"
            className="shrink-0 rounded-lg border border-line bg-surface px-2.5 text-sm text-fg-2 outline-none focus:border-accent"
          >
            <option value="newest">新しい順</option>
            <option value="oldest">古い順</option>
          </select>
        </div>

        <div role="group" aria-label="技術で絞り込み" className={chipRowClass}>
          <span className="mr-1 w-8 shrink-0 text-xs text-muted">技術</span>
          {popularTools.map((tool) => {
            const selected = filters.tools.includes(tool.id)
            return (
              <button
                key={tool.id}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleTool(tool.id)}
                className={chipClass(selected)}
              >
                <ToolIcon
                  id={tool.id}
                  name={tool.name}
                  hasIcon={tool.hasIcon}
                  size={18}
                  className="rounded-sm"
                />
                {tool.name}
              </button>
            )
          })}
        </div>

        <div role="group" aria-label="年で絞り込み" className={chipRowClass}>
          <span className="mr-1 w-8 shrink-0 text-xs text-muted">年</span>
          {years.map((year) => (
            <button
              key={year}
              type="button"
              aria-pressed={filters.year === year}
              onClick={() => update({ year: filters.year === year ? null : year })}
              className={`${chipClass(filters.year === year)} font-mono`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 mt-6 flex items-center justify-between gap-3 text-sm">
        <p className="text-fg-2" aria-live="polite">
          <span className="font-mono font-semibold text-fg">{filtered.length}</span>{' '}
          件のサービス
        </p>
        {isFiltered && (
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex min-h-8 items-center gap-1 text-xs text-muted transition-colors hover:text-fg"
          >
            <XIcon className="h-3.5 w-3.5" />
            条件をクリア
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {remaining > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setDisplayCount((c) => c + ITEMS_PER_PAGE)}
            className="rounded-lg border border-line bg-surface px-6 py-2.5 text-sm text-fg-2 transition-colors hover:border-line-strong hover:text-fg"
          >
            もっと見る（残り {remaining} 件）
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-line py-16 text-center text-sm text-muted">
          条件に合うサービスが見つかりません
          <button
            type="button"
            onClick={clearAll}
            className="rounded-lg border border-line bg-surface px-4 py-2 text-fg-2 transition-colors hover:text-fg"
          >
            条件をクリア
          </button>
        </div>
      )}
    </div>
  )
}
