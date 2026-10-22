import Link from 'next/link'
import ToolIcon from './ToolIcon'
import { hasToolIcon } from '../lib/tools'
import type { PostData } from '../../types/postData'

type Props = {
  postData: PostData
  usage: Record<string, number>
}

export const stackAnchor = (index: number) => `stack-${index}`

// カテゴリごとに「ロゴ・名前・バージョン・サイト内の採用数」を1行ずつ並べる
export default function TechStack({ postData, usage }: Props) {
  return (
    <div className="space-y-6">
      {postData.stack.map(({ name, detail }, index) => (
        <section
          key={`${name}-${index}`}
          id={stackAnchor(index)}
          className="scroll-mt-28 sm:scroll-mt-20"
        >
          <h3 className="mb-2 flex items-baseline gap-2 text-xs font-medium text-muted">
            {name}
            <span className="font-mono">{detail.length}</span>
          </h3>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {detail.map(({ name: toolName, version }, i) => {
              const toolId = postData.toolPathInfo?.[toolName]
              const body = (
                <>
                  <ToolIcon
                    id={toolId ?? ''}
                    name={toolName}
                    hasIcon={Boolean(toolId) && hasToolIcon(toolId!)}
                    size={36}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">
                      {toolName}
                    </span>
                    {toolId && usage[toolId] && (
                      <span className="block text-xs text-muted">
                        {usage[toolId]} サービスで採用
                      </span>
                    )}
                  </span>
                  {version && (
                    <span className="shrink-0 rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs text-fg-2">
                      {String(version)}
                    </span>
                  )}
                </>
              )
              const rowClass =
                'flex items-center gap-3 rounded-lg border border-line bg-surface px-3 py-2.5'
              return (
                <li key={`${toolName}-${i}`}>
                  {toolId ? (
                    <Link
                      href={`/tools/${toolId}`}
                      className={`${rowClass} transition-colors hover:border-line-strong hover:bg-surface-2`}
                    >
                      {body}
                    </Link>
                  ) : (
                    <div className={rowClass}>{body}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}
