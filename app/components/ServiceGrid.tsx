'use client'

import { useState, useMemo } from 'react'
import ServiceCard from './ServiceCard'
import type { PostData } from '../../types/postData'

const ITEMS_PER_PAGE = 20

type Props = {
  posts: PostData[]
}

export default function ServiceGrid({ posts }: Props) {
  const [query, setQuery] = useState('')
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE)

  // Extract available years from posts (sorted descending)
  const years = useMemo(() => {
    const yearSet = new Set<string>()
    for (const post of posts) {
      yearSet.add(post.date.slice(0, 4))
    }
    return Array.from(yearSet).sort((a, b) => b.localeCompare(a))
  }, [posts])

  const filteredPosts = useMemo(() => {
    let result = posts

    // Year filter
    if (selectedYear) {
      result = result.filter((post) => post.date.startsWith(selectedYear))
    }

    // Text search (title, author, tool names)
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      result = result.filter((post) => {
        if (post.title.toLowerCase().includes(q)) return true
        if (post.author.toLowerCase().includes(q)) return true
        return post.stack.some(({ detail }) =>
          detail.some(({ name }) => name.toLowerCase().includes(q)),
        )
      })
    }

    // Sort
    if (sortOrder === 'oldest') {
      result = [...result].reverse()
    }

    return result
  }, [posts, query, selectedYear, sortOrder])

  // Reset display count when filters change
  const visiblePosts = filteredPosts.slice(0, displayCount)
  const hasMore = displayCount < filteredPosts.length

  return (
    <div>
      {/* Search bar + Sort */}
      <div className="mb-3 flex items-center gap-2 px-1">
        <div className="relative flex-1">
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
            placeholder="サービス名、著者、技術名で検索..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setDisplayCount(ITEMS_PER_PAGE)
            }}
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          />
        </div>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
          className="shrink-0 rounded-md border border-gray-200 bg-white px-2 py-2 text-xs text-gray-600 outline-none"
        >
          <option value="newest">新しい順</option>
          <option value="oldest">古い順</option>
        </select>
      </div>

      {/* Year filter */}
      <div className="mb-3 flex flex-wrap gap-1.5 px-1">
        <button
          onClick={() => {
            setSelectedYear(null)
            setDisplayCount(ITEMS_PER_PAGE)
          }}
          className={`rounded-full px-3 py-1 text-xs transition-colors ${
            selectedYear === null
              ? 'bg-gray-800 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          すべて
        </button>
        {years.map((year) => (
          <button
            key={year}
            onClick={() => {
              setSelectedYear(selectedYear === year ? null : year)
              setDisplayCount(ITEMS_PER_PAGE)
            }}
            className={`rounded-full px-3 py-1 text-xs transition-colors ${
              selectedYear === year
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="mb-3 px-1 text-sm text-light-text">
        {filteredPosts.length} 件のサービス
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5">
        {visiblePosts.map((post) => (
          <ServiceCard key={post.id} post={post} />
        ))}
      </div>

      {/* Show more button */}
      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setDisplayCount((c) => c + ITEMS_PER_PAGE)}
            className="rounded-lg border border-gray-200 bg-white px-8 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            もっと見る（残り {filteredPosts.length - displayCount} 件）
          </button>
        </div>
      )}

      {filteredPosts.length === 0 && (
        <div className="py-12 text-center text-gray-400">
          該当するサービスが見つかりません
        </div>
      )}
    </div>
  )
}
