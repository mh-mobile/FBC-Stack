'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import DateDisplay from './DateDisplay'
import { getBlurDataURL } from '../lib/image'
import type { PostData } from '../../types/postData'

type Props = {
  post: PostData
}

function ToolIcon({ toolID, name }: { toolID: string; name: string }) {
  const [show, setShow] = useState(true)
  if (!show) return <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{name}</span>

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
      <Image
        src={`/images/tool/${toolID}.png`}
        width={14}
        height={14}
        alt={name}
        className="h-3.5 w-3.5 object-contain"
        onError={() => setShow(false)}
      />
      {name}
    </span>
  )
}

export default function ServiceCard({ post }: Props) {
  const { id, title, author, date, stack, hasAudio, toolPathInfo } = post

  // Collect unique tool names with their toolIDs (for displaying icons)
  const toolBadges: { name: string; toolID: string }[] = []
  if (toolPathInfo && stack) {
    const seen = new Set<string>()
    for (const category of stack) {
      for (const detail of category.detail) {
        const toolID = toolPathInfo[detail.name]
        if (toolID && !seen.has(toolID)) {
          seen.add(toolID)
          toolBadges.push({ name: detail.name, toolID })
        }
        if (toolBadges.length >= 5) break
      }
      if (toolBadges.length >= 5) break
    }
  }

  return (
    <Link href={`/posts/${id}`} className="block group">
      <div className="rounded-lg bg-card-bg p-5 transition-shadow hover:shadow-md h-full flex flex-col">
        <h3 className="font-semibold text-base leading-snug mb-3">{title}</h3>

        {/* Tech stack badges */}
        {toolBadges.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {toolBadges.map(({ name, toolID }) => (
              <ToolIcon key={toolID} toolID={toolID} name={name} />
            ))}
          </div>
        )}

        {/* Author + date + audio badge */}
        <div className="mt-auto flex items-center gap-2 text-sm">
          <div className="shrink-0 overflow-hidden rounded-full">
            <Image
              src={`https://github.com/${author}.png`}
              width={24}
              height={24}
              placeholder="blur"
              blurDataURL={getBlurDataURL()}
              alt={`${author}のアバター`}
              className="h-6 w-6 object-cover"
            />
          </div>
          <span className="text-gray-700 truncate">{author}</span>
          <span className="text-light-text text-xs">
            <DateDisplay dateString={date} />
          </span>
          {hasAudio && (
            <span className="ml-auto inline-flex items-center gap-0.5 rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                />
              </svg>
              Audio
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
