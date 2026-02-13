import Image from 'next/image'
import Link from 'next/link'
import MobileNav from './MobileNav'

const navLinks = [
  { href: '/about', label: 'FBC Stackについて' },
  { href: '/tools', label: 'みんなのツール' },
  { href: '/stats', label: '統計' },
]

export default function Header() {
  return (
    <header className="border-b border-gray-100">
      <div className="flex items-center justify-between py-3">
        {/* Logo + site name */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            priority
            src="/images/fbcstack.png"
            height={40}
            width={40}
            alt="FBC Stack"
            className="h-10 w-10"
          />
          <span className="text-lg font-bold tracking-tight text-gray-800">
            FBC Stack
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile nav */}
        <MobileNav links={navLinks} />
      </div>
    </header>
  )
}
