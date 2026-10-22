'use client'

import { useRef, useState } from 'react'
import { ChevronRightIcon, SpeakerIcon } from './Icons'

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
  summary?: string
  chapters?: Chapter[]
  showNotes?: ShowNote[]
}

export default function AudioPlayer({
  postId,
  summary,
  chapters,
  showNotes,
}: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [audioError, setAudioError] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const audioUrl = `https://fbc-stack-storage.com/${postId}.m4a`
  const hasDetails = Boolean(chapters?.length || showNotes?.length)

  // チャプターをクリックしたらその位置から再生する
  const seek = (seconds: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = seconds
    void audio.play()
  }

  return (
    <section className="rounded-xl border border-line bg-surface p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-md bg-accent-soft p-1.5 text-accent">
          <SpeakerIcon className="h-4 w-4" />
        </span>
        <h2 className="text-sm font-semibold">音声概要</h2>
        <span className="text-xs text-muted">NotebookLM</span>
      </div>

      {summary && (
        <p className="mb-3 text-sm leading-relaxed text-fg-2">{summary}</p>
      )}

      {audioError ? (
        <p className="text-sm text-muted">
          音声ファイルを読み込めませんでした。
        </p>
      ) : (
        <audio
          ref={audioRef}
          controls
          preload="none"
          className="w-full"
          onError={() => setAudioError(true)}
          src={audioUrl}
        />
      )}

      {hasDetails && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          className="mt-3 flex items-center gap-1 text-xs text-muted transition-colors hover:text-fg"
        >
          <ChevronRightIcon
            className={`h-3 w-3 transition-transform ${
              isExpanded ? 'rotate-90' : ''
            }`}
          />
          チャプター・ショーノート
        </button>
      )}

      {isExpanded && (
        <div className="mt-3 grid gap-6 border-t border-line pt-4 sm:grid-cols-2">
          {chapters && chapters.length > 0 && (
            <div>
              <h3 className="mb-2 text-xs font-medium text-muted">
                チャプター
              </h3>
              <ul className="space-y-1">
                {chapters.map((chapter, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => seek(chapter.startTime)}
                      disabled={audioError}
                      className="flex w-full items-start gap-2 rounded-md px-1 py-1 text-left text-sm transition-colors hover:bg-surface-2 disabled:pointer-events-none"
                    >
                      <span className="shrink-0 font-mono text-xs leading-5 text-accent">
                        {chapter.timestamp}
                      </span>
                      <span className="text-fg-2">{chapter.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {showNotes && showNotes.length > 0 && (
            <div>
              <h3 className="mb-2 text-xs font-medium text-muted">
                ショーノート
              </h3>
              <ul className="space-y-1.5 text-sm">
                {showNotes.map((note, i) => (
                  <li key={i}>
                    {note.url ? (
                      <a
                        href={note.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        {note.title}
                      </a>
                    ) : (
                      <span className="text-fg-2">{note.title}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
