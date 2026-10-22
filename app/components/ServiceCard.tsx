import Link from 'next/link'
import Image from 'next/image'
import DateDisplay from './DateDisplay'
import ToolIcon from './ToolIcon'
import { SpeakerIcon } from './Icons'
import { getBlurDataURL } from '../lib/image'
import type { PostData } from '../../types/postData'

const MAX_ICONS = 8

// 本文の最初の段落をプレーンテキスト化して概要として使う
function excerpt(markdown: string): string {
  const paragraph =
    markdown
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .find((p) => p && !p.startsWith('#') && !p.startsWith('![')) ?? ''
  return paragraph
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^\s*(#+|>)\s*/gm, '')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function stackTools(post: PostData): { id: string; name: string }[] {
  const tools: { id: string; name: string }[] = []
  const seen = new Set<string>()
  for (const category of post.stack) {
    for (const { name } of category.detail) {
      const id = post.toolPathInfo?.[name]
      if (id && !seen.has(id)) {
        seen.add(id)
        tools.push({ id, name })
      }
    }
  }
  return tools
}

// カード全体はタイトルのリンクを広げてクリック可能にし、ツールアイコンは個別にツールページへ飛べるようにする
export default function ServiceCard({ post }: { post: PostData }) {
  const { id, title, author, date, hasAudio, markdownContent } = post
  const tools = stackTools(post)
  const summary = excerpt(markdownContent ?? '')

  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold leading-snug">
          <Link
            href={`/posts/${id}`}
            className="after:absolute after:inset-0 after:rounded-xl group-hover:text-accent"
          >
            {title}
          </Link>
        </h3>
        {hasAudio && (
          <span
            className="shrink-0 rounded-full bg-accent-soft p-1 text-accent"
            title="音声概要あり"
          >
            <SpeakerIcon className="h-3.5 w-3.5" />
            <span className="sr-only">音声概要あり</span>
          </span>
        )}
      </div>

      {summary && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-fg-2">
          {summary}
        </p>
      )}

      {tools.length > 0 && (
        <ul
          className="relative z-10 mt-4 flex flex-wrap gap-1.5"
          aria-label="技術スタック"
        >
          {tools.slice(0, MAX_ICONS).map((tool) => (
            <li key={tool.id}>
              <Link
                href={`/tools/${tool.id}`}
                title={tool.name}
                className="block rounded-md"
              >
                <ToolIcon id={tool.id} name={tool.name} size={26} />
                <span className="sr-only">{tool.name}</span>
              </Link>
            </li>
          ))}
          {tools.length > MAX_ICONS && (
            <li className="flex h-[26px] items-center rounded-md bg-surface-2 px-1.5 font-mono text-[11px] text-muted">
              +{tools.length - MAX_ICONS}
            </li>
          )}
        </ul>
      )}

      <div className="mt-auto flex items-center gap-2 pt-4 text-xs text-muted">
        <Image
          src={`https://github.com/${author}.png`}
          width={20}
          height={20}
          placeholder="blur"
          blurDataURL={getBlurDataURL()}
          alt=""
          className="h-5 w-5 rounded-full object-cover"
        />
        <span className="truncate text-fg-2">{author}</span>
        <span className="ml-auto shrink-0">
          <DateDisplay dateString={date} />
        </span>
      </div>
    </article>
  )
}
