import Image from 'next/image'
import Link from 'next/link'
import NavLinks from './NavLinks'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur supports-[backdrop-filter]:bg-bg/70">
      <div className="mx-auto flex max-w-6xl flex-col px-4 sm:h-14 sm:flex-row sm:items-center sm:gap-4 sm:px-6">
        <Link
          href="/"
          className="flex h-12 shrink-0 items-center gap-2 sm:h-auto"
        >
          <Image
            priority
            src="/images/fbcstack.png"
            height={28}
            width={28}
            alt=""
            className="h-7 w-7 rounded-md"
          />
          <span className="font-semibold tracking-tight">FBC Stack</span>
        </Link>
        <NavLinks />
      </div>
    </header>
  )
}
