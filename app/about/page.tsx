import Link from 'next/link'
import type { Metadata } from 'next'
import { getFBCStackData } from '../lib/posts'
import ServiceContent from '../components/ServiceContent'

export const metadata: Metadata = {
  title: 'FBC Stackについて',
}

export default function AboutPage() {
  const postData = getFBCStackData()

  return (
    <article>
      <h1 className="my-4 text-3xl font-extrabold">{postData.title}について</h1>
      <div className="pt-2">
        <ServiceContent postData={postData} />
      </div>
      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          ホームに戻る
        </Link>
      </div>
    </article>
  )
}
