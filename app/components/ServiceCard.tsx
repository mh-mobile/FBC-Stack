import Link from 'next/link'
import Image from 'next/image'
import DateDisplay from './DateDisplay'
import ToolIcon from './ToolIcon'
import { SpeakerIcon } from './Icons'
import type { ServiceSummary } from '../lib/summary'

const MAX_ICONS = 7

// カード全体はタイトルのリンクを広げてクリック可能にする。
// ツールアイコンはマウス/タッチ用の近道として個別にリンクし、キーボードではカード1件につき1回のTabで済むよう tabIndex=-1 にする
export default function ServiceCard({ service }: { service: ServiceSummary }) {
  const { id, title, author, date, hasAudio, summary, tools } = service

  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold leading-snug">
          <Link
            href={`/posts/${id}`}
            className="outline-none after:absolute after:inset-0 after:rounded-xl group-hover:text-accent"
          >
            {title}
          </Link>
        </h3>
        {hasAudio && (
          <span
            className="relative z-10 shrink-0 rounded-full bg-accent-soft p-1 text-accent"
            title="音声概要あり"
          >
            <SpeakerIcon className="h-3.5 w-3.5" />
            <span className="sr-only">音声概要あり</span>
          </span>
        )}
      </div>

      {summary && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-fg-2">{summary}</p>
      )}

      {tools.length > 0 && (
        <ul
          className="pointer-events-none relative z-10 mt-4 flex flex-wrap gap-1.5"
          aria-label="技術スタック"
        >
          {tools.slice(0, MAX_ICONS).map((tool) => (
            <li key={tool.id}>
              <Link
                href={`/tools/${tool.id}`}
                title={tool.name}
                tabIndex={-1}
                className="pointer-events-auto block rounded-md"
              >
                <ToolIcon id={tool.id} name={tool.name} hasIcon={tool.hasIcon} size={32} />
                <span className="sr-only">{tool.name}</span>
              </Link>
            </li>
          ))}
          {tools.length > MAX_ICONS && (
            <li
              className="pointer-events-auto flex h-8 items-center rounded-md bg-surface-2 px-2 font-mono text-xs text-fg-2"
              title={tools
                .slice(MAX_ICONS)
                .map(({ name }) => name)
                .join(', ')}
            >
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
          alt=""
          className="h-5 w-5 rounded-full bg-surface-2 object-cover"
        />
        <span className="truncate text-fg-2">{author}</span>
        <span className="ml-auto shrink-0">
          <DateDisplay dateString={date} />
        </span>
      </div>
    </article>
  )
}
