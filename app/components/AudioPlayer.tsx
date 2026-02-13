'use client'

import { useState } from 'react'

type Chapter = {
  timestamp: string
  title: string
  startTime: number
}

type ShowNote = {
  title: string
  url?: string
}

type Props = {
  postId: string
  title: string
  summary?: string
  chapters?: Chapter[]
  showNotes?: ShowNote[]
}

export default function AudioPlayer({
  postId,
  title,
  summary,
  chapters,
  showNotes,
}: Props) {
  const [audioExists, setAudioExists] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const audioUrl = `https://fbc-stack-storage.com/${postId}.m4a`

  if (!audioExists) return null

  return (
    <div className="my-4 rounded-lg border border-blue-100 bg-blue-50/50 p-4">
      <div className="mb-3 flex items-center gap-2">
        <svg
          className="h-5 w-5 text-blue-600"
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
        <h3 className="text-sm font-semibold text-blue-800">
          音声概要 - NotebookLM
        </h3>
      </div>

      {summary && (
        <p className="mb-3 text-sm text-gray-600">{summary}</p>
      )}

      <audio
        controls
        className="mb-3 w-full"
        onError={() => setAudioExists(false)}
        src={audioUrl}
      />

      {(chapters?.length || showNotes?.length) && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
        >
          <svg
            className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
          {isExpanded ? '詳細を閉じる' : 'チャプター・ショーノートを表示'}
        </button>
      )}

      {isExpanded && (
        <div className="mt-3 space-y-4">
          {chapters && chapters.length > 0 && (
            <div>
              <h4 className="mb-2 text-xs font-semibold text-gray-500 uppercase">
                チャプター
              </h4>
              <ul className="space-y-1">
                {chapters.map((chapter, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="shrink-0 rounded bg-gray-200 px-1.5 py-0.5 font-mono text-xs text-gray-600">
                      {chapter.timestamp}
                    </span>
                    <span className="text-gray-700">{chapter.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {showNotes && showNotes.length > 0 && (
            <div>
              <h4 className="mb-2 text-xs font-semibold text-gray-500 uppercase">
                ショーノート
              </h4>
              <ul className="space-y-1">
                {showNotes.map((note, i) => (
                  <li key={i} className="text-sm">
                    {note.url ? (
                      <a
                        href={note.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-external-link hover:underline"
                      >
                        {note.title}
                      </a>
                    ) : (
                      <span className="text-gray-700">{note.title}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
