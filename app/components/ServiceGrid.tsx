'use client'

import { useState, useMemo } from 'react'
import ServiceCard from './ServiceCard'
import type { PostData } from '../../types/postData'

type Props = {
  posts: PostData[]
  categories: string[]
}

export default function ServiceGrid({ posts, categories }: Props) {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')

  const filteredPosts = useMemo(() => {
    let result = posts

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

    // Category filter
    if (selectedCategory) {
      result = result.filter((post) =>
        post.stack.some(({ name }) => name === selectedCategory),
      )
    }

    // Sort
    if (sortOrder === 'oldest') {
      result = [...result].reverse()
    }

    return result
  }, [posts, query, selectedCategory, sortOrder])

  return (
    <div>
      {/* Search bar */}
      <div className="mb-4 px-1">
        <div className="relative">
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
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Filter bar */}
      <div className="mb-4 flex flex-wrap items-center gap-2 px-1">
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded-full px-3 py-1 text-xs transition-colors ${
              selectedCategory === null
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            すべて
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                setSelectedCategory(selectedCategory === cat ? null : cat)
              }
              className={`rounded-full px-3 py-1 text-xs transition-colors ${
                selectedCategory === cat
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort toggle */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
          className="ml-auto rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-600 outline-none"
        >
          <option value="newest">新しい順</option>
          <option value="oldest">古い順</option>
        </select>
      </div>

      {/* Results count */}
      <div className="mb-3 px-1 text-sm text-light-text">
        {filteredPosts.length} 件のサービス
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5">
        {filteredPosts.map((post) => (
          <ServiceCard key={post.id} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="py-12 text-center text-gray-400">
          該当するサービスが見つかりません
        </div>
      )}
    </div>
  )
}
