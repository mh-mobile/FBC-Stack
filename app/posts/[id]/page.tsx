import Image from 'next/image'
import type { Metadata } from 'next'
import { getAllPostIds, getPostData } from '../../lib/posts'
import { getPodcastData } from '../../lib/podcast'
import { getRelatedPosts } from '../../lib/related'
import { pageMetadata } from '../../lib/site'
import { toServiceSummary } from '../../lib/summary'
import { getToolUsageCounts } from '../../lib/stats'
import DateDisplay from '../../components/DateDisplay'
import AudioPlayer from '../../components/AudioPlayer'
import Breadcrumb from '../../components/Breadcrumb'
import ServiceCard from '../../components/ServiceCard'
import MarkdownRenderer from '../../components/MarkdownRenderer'
import TechStack from '../../components/TechStack'
import StackOutline from '../../components/StackOutline'
import {
  BookIcon,
  ExternalIcon,
  GitHubIcon,
  GlobeIcon,
  WikiIcon,
} from '../../components/Icons'

export function generateStaticParams() {
  return getAllPostIds()
}

// 存在しないIDは404にする（未指定だとオンデマンド描画でENOENTの500になる）
export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const postData = getPostData(id)
  return pageMetadata({
    title: postData.title,
    description: `${postData.author}が作成した「${postData.title}」の技術スタック情報`,
    path: `/posts/${id}`,
  })
}

function LinkButton({
  href,
  icon,
  label,
  primary = false,
}: {
  href: string
  icon: React.ReactNode
  label: string
  primary?: boolean
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        primary
          ? 'bg-fg text-bg hover:opacity-85'
          : 'border border-line bg-surface text-fg-2 hover:border-line-strong hover:text-fg'
      }`}
    >
      {icon}
      {label}
      <ExternalIcon className="h-3.5 w-3.5 opacity-60" />
      <span className="sr-only">（新しいタブで開く）</span>
    </a>
  )
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const postData = getPostData(id)
  const podcastData = postData.hasAudio ? getPodcastData(id) : null
  const relatedPosts = getRelatedPosts(id, 3)
  const usage = getToolUsageCounts()
  // 同じツールを複数カテゴリに書いている場合があるので、名前で重複を除いて数える
  const totalTools = new Set(
    postData.stack.flatMap(({ detail }) => detail.map(({ name }) => name.toLowerCase())),
  ).size
  // リポジトリが複数あるときはボタンにリポジトリ名を添えて区別する
  const repoLabel = (repository: string, label: string) =>
    postData.code.length > 1
      ? `${label} (${repository.replace(/\/$/, '').split('/').pop()})`
      : label

  return (
    <article>
      <Breadcrumb items={[{ label: postData.title }]} />

      <header className="border-b border-line pb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {postData.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-fg-2">
          <a
            href={`https://github.com/${postData.author}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-fg"
          >
            <Image
              src={`https://github.com/${postData.author}.png`}
              width={28}
              height={28}
              alt=""
              className="h-7 w-7 rounded-full bg-surface-2 object-cover"
            />
            {postData.author}
          </a>
          <span className="text-muted">
            <DateDisplay dateString={postData.date} />
          </span>
          <span className="text-muted">
            <span className="font-mono">{totalTools}</span> ツール ·{' '}
            <span className="font-mono">{postData.stack.length}</span> カテゴリ
          </span>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {postData.website && (
            <LinkButton
              href={postData.website}
              icon={<GlobeIcon />}
              label="Website"
              primary
            />
          )}
          {postData.code.map(({ repository }) => (
            <span key={repository} className="contents">
              <LinkButton
                href={repository}
                icon={<GitHubIcon />}
                label={repoLabel(repository, 'GitHub')}
              />
              <LinkButton
                href={repository.replace('github.com', 'deepwiki.com')}
                icon={<WikiIcon />}
                label={repoLabel(repository, 'DeepWiki')}
              />
            </span>
          ))}
          {postData.blog && (
            <LinkButton href={postData.blog} icon={<BookIcon />} label="Blog" />
          )}
        </div>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="min-w-0 space-y-10">
          {postData.hasAudio && (
            <AudioPlayer
              postId={postData.id}
              summary={podcastData?.summary}
              chapters={podcastData?.chapters}
              showNotes={podcastData?.showNotes}
            />
          )}

          {postData.markdownContent.trim() && (
            <section>
              <h2 className="mb-3 text-lg font-semibold">概要</h2>
              <MarkdownRenderer content={postData.markdownContent} />
            </section>
          )}

          <section id="stack" className="scroll-mt-28 sm:scroll-mt-20">
            <h2 className="mb-4 text-lg font-semibold">技術スタック</h2>
            <TechStack postData={postData} usage={usage} />
          </section>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <StackOutline postData={postData} />
          </div>
        </aside>
      </div>

      {relatedPosts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-lg font-semibold">似た技術スタックのサービス</h2>
          <p className="mb-4 mt-1 text-sm text-muted">
            使用ツールの構成が近いサービスです。実装の参考にどうぞ
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((post) => (
              <ServiceCard key={post.id} service={toServiceSummary(post)} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
