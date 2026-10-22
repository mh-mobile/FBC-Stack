import Link from 'next/link'
import ToolIcon from './ToolIcon'

type Props = {
  id: string
  name: string
  // 0〜1。右側の細いバーの長さ（数値の大きさを並びで比べやすくする）
  ratio: number
  label: string
  title?: string
}

export default function ToolRow({ id, name, ratio, label, title }: Props) {
  return (
    <Link
      href={`/tools/${id}`}
      title={title}
      className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-surface-2"
    >
      <ToolIcon id={id} name={name} size={28} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm">{name}</span>
        <span
          className="mt-1 block h-1 rounded-full bg-surface-2"
          aria-hidden="true"
        >
          <span
            className="block h-1 rounded-full bg-accent"
            style={{ width: `${Math.max(ratio * 100, 2)}%` }}
          />
        </span>
      </span>
      <span className="w-12 shrink-0 text-right font-mono text-xs tabular-nums text-fg-2">
        {label}
      </span>
    </Link>
  )
}
