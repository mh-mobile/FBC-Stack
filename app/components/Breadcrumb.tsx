import Link from 'next/link'
import { ChevronRightIcon } from './Icons'

type BreadcrumbItem = {
  label: string
  href?: string
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="パンくずリスト" className="pb-4">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-muted">
        <li>
          <Link href="/" className="transition-colors hover:text-fg">
            ホーム
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex min-w-0 items-center gap-1">
            <ChevronRightIcon className="h-3 w-3 shrink-0" />
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-fg"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="truncate text-fg-2">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
