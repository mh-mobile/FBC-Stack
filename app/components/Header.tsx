import Image from 'next/image'
import Link from 'next/link'
import MobileNav from './MobileNav'

const navLinks = [
  { href: '/about', label: 'FBC Stackについて' },
  { href: '/tools', label: 'みんなのツール' },
]

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between py-2">
      <Link href="/" className="shrink-0">
        <Image
          priority
          src="/images/fbcstack.png"
          height={80}
          width={80}
          alt="FBC Stack"
          className="h-auto max-w-full"
        />
      </Link>

      {/* Desktop nav */}
      <nav className="hidden items-center gap-6 md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-external-link hover:opacity-80 transition-opacity"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile nav */}
      <MobileNav links={navLinks} />
    </header>
  )
}
