'use client'

import { useState, useMemo } from 'react'
import ServiceCard, { stackTools } from './ServiceCard'
import ToolIcon from './ToolIcon'
import { SearchIcon, XIcon } from './Icons'
import type { PostData } from '../../types/postData'

const ITEMS_PER_PAGE = 24

type PopularTool = { id: string; name: string; count: number }

type Props = {
  posts: PostData[]
  popularTools: PopularTool[]
}

function chipClass(selected: boolean) {
  return `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors ${
    selected
      ? 'border-fg bg-fg text-bg'
      : 'border-line bg-surface text-fg-2 hover:border-line-strong hover:text-fg'
  }`
}

export default function ServiceGrid({ posts, popularTools }: Props) {
  const [query, setQuery] = useState('')
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [selectedTools, setSelectedTools] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE)

  const years = useMemo(
    () =>
      Array.from(new Set(posts.map((post) => post.date.slice(0, 4)))).sort(
        (a, b) => b.localeCompare(a),
      ),
    [posts],
  )

  const filteredPosts = useMemo(() => {
    let result = posts

    if (selectedYear) {
      result = result.filter((post) => post.date.startsWith(selectedYear))
    }

    // 選択したツールをすべて使っているサービスに絞る（AND）
    if (selectedTools.length > 0) {
      result = result.filter((post) => {
        const ids = new Set(stackTools(post).map(({ id }) => id))
        return selectedTools.every((id) => ids.has(id))
      })
    }

    const q = query.trim().toLowerCase()
    if (q) {
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.author.toLowerCase().includes(q) ||
          post.stack.some(({ detail }) =>
            detail.some(({ name }) => name.toLowerCase().includes(q)),
          ),
      )
    }

    return sortOrder === 'oldest' ? [...result].reverse() : result
  }, [posts, query, selectedYear, selectedTools, sortOrder])

  const resetPaging = () => setDisplayCount(ITEMS_PER_PAGE)
  const toggleTool = (id: string) => {
    setSelectedTools((current) =>
      current.includes(id) ? current.filter((t) => t !== id) : [...current, id],
    )
    resetPaging()
  }
  const isFiltered = Boolean(
    query.trim() || selectedYear || selectedTools.length,
  )
  const clearAll = () => {
    setQuery('')
    setSelectedYear(null)
    setSelectedTools([])
    resetPaging()
  }

  const visiblePosts = filteredPosts.slice(0, displayCount)
  const remaining = filteredPosts.length - displayCount

  return (
    <div>
      <div className="space-y-3">
        <div className="flex gap-2">
          <label className="relative flex-1">
            <span className="sr-only">サービスを検索</span>
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="サービス名・作者・技術名で検索"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                resetPaging()
              }}
              className="w-full rounded-lg border border-line bg-surface py-2.5 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent"
            />
          </label>
          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as 'newest' | 'oldest')
            }
            aria-label="並び順"
            className="shrink-0 rounded-lg border border-line bg-surface px-2.5 text-sm text-fg-2 outline-none focus:border-accent"
          >
            <option value="newest">新しい順</option>
            <option value="oldest">古い順</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 w-10 shrink-0 text-xs text-muted">技術</span>
          {popularTools.map((tool) => (
            <button
              key={tool.id}
              type="button"
              aria-pressed={selectedTools.includes(tool.id)}
              onClick={() => toggleTool(tool.id)}
              className={chipClass(selectedTools.includes(tool.id))}
            >
              <ToolIcon
                id={tool.id}
                name={tool.name}
                size={16}
                className="rounded-sm"
              />
              {tool.name}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 w-10 shrink-0 text-xs text-muted">年</span>
          {years.map((year) => (
            <button
              key={year}
              type="button"
              aria-pressed={selectedYear === year}
              onClick={() => {
                setSelectedYear(selectedYear === year ? null : year)
                resetPaging()
              }}
              className={`${chipClass(selectedYear === year)} font-mono`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 mt-6 flex items-center justify-between gap-3 text-sm">
        <p className="text-fg-2" aria-live="polite">
          <span className="font-mono font-semibold text-fg">
            {filteredPosts.length}
          </span>{' '}
          件のサービス
        </p>
        {isFiltered && (
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-fg"
          >
            <XIcon className="h-3.5 w-3.5" />
            条件をクリア
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((post) => (
          <ServiceCard key={post.id} post={post} />
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

      {filteredPosts.length === 0 && (
        <div className="rounded-xl border border-dashed border-line py-16 text-center text-sm text-muted">
          条件に合うサービスが見つかりません
        </div>
      )}
    </div>
  )
}
