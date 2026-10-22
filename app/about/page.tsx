import type { Metadata } from 'next'
import { getFBCStackData } from '../lib/posts'
import { getToolUsageCounts } from '../lib/stats'
import Breadcrumb from '../components/Breadcrumb'
import PageHeader from '../components/PageHeader'
import MarkdownRenderer from '../components/MarkdownRenderer'
import TechStack from '../components/TechStack'

export const metadata: Metadata = {
  title: 'FBC Stackについて',
}

export default function AboutPage() {
  const postData = getFBCStackData()

  return (
    <article className="max-w-3xl">
      <Breadcrumb items={[{ label: 'FBC Stackについて' }]} />
      <PageHeader title={`${postData.title}について`} />
      <MarkdownRenderer content={postData.markdownContent} />
      <section className="mt-12">
        <h2 className="mb-4 text-lg font-semibold">このサイトの技術スタック</h2>
        <TechStack postData={postData} usage={getToolUsageCounts()} />
      </section>
    </article>
  )
}
