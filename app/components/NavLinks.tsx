'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Services' },
  { href: '/tools', label: 'みんなのツール' },
  { href: '/stats', label: '統計' },
  { href: '/about', label: 'FBC Stackについて' },
]

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/' || pathname.startsWith('/posts')
  return pathname.startsWith(href)
}

// 狭い画面ではロゴの下に1行で並べ、収まらなければ横スクロールで全項目に届くようにする
export default function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="-mx-4 min-w-0 overflow-x-auto px-3 pb-2 [scrollbar-width:none] sm:mx-0 sm:ml-auto sm:px-0 sm:pb-0">
      <ul className="flex items-center gap-0.5">
        {links.map(({ href, label }) => {
          const active = isActive(pathname, href)
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`block whitespace-nowrap rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                  active
                    ? 'bg-surface-2 font-medium text-fg'
                    : 'text-fg-2 hover:bg-surface-2 hover:text-fg'
                }`}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
