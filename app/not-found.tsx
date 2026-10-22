import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="flex flex-col items-center py-24 text-center">
      <p className="font-mono text-6xl font-semibold tracking-tight text-line-strong">
        404
      </p>
      <h1 className="mt-4 text-xl font-semibold">ページが見つかりません</h1>
      <p className="mt-2 text-sm text-fg-2">
        URLが間違っているか、ページが移動・削除された可能性があります。
      </p>
      <div className="mt-8 flex gap-2">
        <Link
          href="/"
          className="rounded-lg bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85"
        >
          サービス一覧へ
        </Link>
        <Link
          href="/tools"
          className="rounded-lg border border-line bg-surface px-4 py-2 text-sm text-fg-2 transition-colors hover:text-fg"
        >
          ツール一覧へ
        </Link>
      </div>
    </section>
  )
}
