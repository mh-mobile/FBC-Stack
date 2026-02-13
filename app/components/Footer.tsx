import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-3">
        <span>&copy; 2022 mh-mobile</span>
        <a
          href="https://github.com/mh-mobile/FBC-Stack"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/tool/github.png"
            width={20}
            height={20}
            alt="repository"
            className="h-auto max-w-full"
          />
        </a>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/terms" className="text-external-link hover:opacity-80">
          利用規約
        </Link>
        <Link href="/privacy" className="text-external-link hover:opacity-80">
          プライバシーポリシー
        </Link>
      </div>
    </div>
  )
}
