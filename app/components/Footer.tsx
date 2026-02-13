import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-100 pt-6 pb-4">
      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
        {/* Left: branding */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            &copy; 2022{currentYear > 2022 ? `–${currentYear}` : ''} mh-mobile
          </span>
          <a
            href="https://github.com/mh-mobile/FBC-Stack"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md p-1 text-gray-400 transition-colors hover:text-gray-600"
          >
            <Image
              src="/images/tool/github.png"
              width={18}
              height={18}
              alt="GitHub"
              className="h-[18px] w-[18px] opacity-60"
            />
          </a>
        </div>

        {/* Right: legal links */}
        <div className="flex items-center gap-4 text-sm">
          <Link
            href="/terms"
            className="text-gray-400 transition-colors hover:text-gray-600"
          >
            利用規約
          </Link>
          <span className="text-gray-200">|</span>
          <Link
            href="/privacy"
            className="text-gray-400 transition-colors hover:text-gray-600"
          >
            プライバシーポリシー
          </Link>
        </div>
      </div>
    </footer>
  )
}
