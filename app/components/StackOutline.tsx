import { stackAnchor } from './TechStack'
import type { PostData } from '../../types/postData'

// 詳細ページのサイドバー: カテゴリへのジャンプと、バージョン付きの主要技術
export default function StackOutline({ postData }: { postData: PostData }) {
  // 同じツール・バージョンが複数カテゴリに書かれていても1行にまとめる
  const versioned = Array.from(
    new Map(
      postData.stack
        .flatMap(({ detail }) => detail)
        .filter(({ version }) => version)
        .map(({ name, version }) => [`${name}@${version}`, { name, version }]),
    ).values(),
  )

  return (
    <div className="space-y-6 text-sm">
      <div>
        <h2 className="mb-2 text-xs font-medium text-muted">カテゴリ</h2>
        <ul className="space-y-0.5">
          {postData.stack.map(({ name, detail }, index) => (
            <li key={`${name}-${index}`}>
              <a
                href={`#${stackAnchor(index)}`}
                className="flex items-center justify-between rounded-md px-2 py-1.5 text-fg-2 transition-colors hover:bg-surface-2 hover:text-fg"
              >
                <span className="truncate">{name}</span>
                <span className="font-mono text-xs text-muted">
                  {detail.length}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      {versioned.length > 0 && (
        <div>
          <h2 className="mb-2 text-xs font-medium text-muted">バージョン</h2>
          <dl className="space-y-1.5 px-2">
            {versioned.map(({ name, version }) => (
              <div
                key={`${name}@${version}`}
                className="flex items-baseline justify-between gap-3"
              >
                <dt className="truncate text-fg-2">{name}</dt>
                <dd className="shrink-0 font-mono text-xs">
                  {String(version)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  )
}
