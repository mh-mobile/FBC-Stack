import Link from 'next/link'
import { GitHubIcon } from './Icons'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <span>
            &copy; 2022{currentYear > 2022 ? `–${currentYear}` : ''} mh-mobile
          </span>
          <a
            href="https://github.com/mh-mobile/FBC-Stack"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHubリポジトリ"
            className="rounded p-1 transition-colors hover:text-fg"
          >
            <GitHubIcon />
          </a>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/terms" className="transition-colors hover:text-fg">
            利用規約
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-fg">
            プライバシーポリシー
          </Link>
        </div>
      </div>
    </footer>
  )
}
