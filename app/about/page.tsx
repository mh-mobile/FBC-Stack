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
        <Link href="/" className="text-external-link hover:underline">
          &larr; Back to home
        </Link>
      </div>
    </article>
  )
}
