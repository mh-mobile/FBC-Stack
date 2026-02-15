import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPostIds, getPostData } from '../../lib/posts'
import { getPodcastData } from '../../lib/podcast'
import { getBlurDataURL } from '../../lib/image'
import DateDisplay from '../../components/DateDisplay'
import ExternalLink from '../../components/ExternalLink'
import ServiceContent from '../../components/ServiceContent'
import AudioPlayer from '../../components/AudioPlayer'
import Breadcrumb from '../../components/Breadcrumb'

export function generateStaticParams() {
  return getAllPostIds()
}

export function generateMetadata({
  params,
}: {
  params: { id: string }
}): Metadata {
  const postData = getPostData(params.id)
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
  const description = `${postData.author}が作成した「${postData.title}」の技術スタック情報`

  return {
    title: postData.title,
    description,
    openGraph: {
      title: postData.title,
      description,
      url: `${baseURL}/posts/${params.id}`,
      images: [`${baseURL}/images/fbcstack_ogp.png`],
    },
    twitter: {
      card: 'summary_large_image',
      title: postData.title,
      description,
      images: [`${baseURL}/images/fbcstack_ogp.png`],
    },
  }
}

export default function PostPage({ params }: { params: { id: string } }) {
  const postData = getPostData(params.id)
  const podcastData = postData.hasAudio ? getPodcastData(params.id) : null

  const totalTools = postData.stack.reduce(
    (sum, cat) => sum + cat.detail.length,
    0,
  )

  return (
    <article>
      <Breadcrumb items={[{ label: postData.title }]} />

      {/* Hero section */}
      <div className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8">
        <h1 className="text-2xl font-extrabold leading-tight md:text-3xl">
          {postData.title}
        </h1>

        {/* Author & date */}
        <div className="mt-4 flex items-center gap-3">
          <div className="shrink-0 overflow-hidden rounded-full ring-2 ring-white">
            <Image
              src={`https://github.com/${postData.author}.png`}
              width={36}
              height={36}
              alt={`${postData.author}のアバター`}
              placeholder="blur"
              blurDataURL={getBlurDataURL()}
              className="h-9 w-9 object-cover"
            />
          </div>
          <div>
            <div className="text-sm font-medium">{postData.author}</div>
            <div className="text-xs text-light-text">
              <DateDisplay dateString={postData.date} />
            </div>
          </div>
          <span className="ml-2 rounded-full bg-gray-200 px-2.5 py-0.5 text-xs text-gray-600">
            {totalTools} tools
          </span>
        </div>

        {/* External links */}
        <div className="mt-4 flex flex-wrap gap-2">
          {postData.code.map(({ repository }) => (
            <span key={repository} className="contents">
              <ExternalLink href={repository}>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50">
                  <Image
                    src="/images/tool/github.png"
                    width={16}
                    height={16}
                    alt=""
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                  GitHub
                </span>
              </ExternalLink>
              <ExternalLink
                href={repository.replace('github.com', 'deepwiki.com')}
              >
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50">
                  <Image
                    src="/images/deepwiki.png"
                    width={16}
                    height={16}
                    alt=""
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                  DeepWiki
                </span>
              </ExternalLink>
            </span>
          ))}

          {postData.blog && postData.blog.length > 0 && (
            <ExternalLink href={postData.blog}>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50">
                <Image
                  src="/images/blog.png"
                  width={16}
                  height={16}
                  alt=""
                  className="h-4 w-4"
                />
                Blog
              </span>
            </ExternalLink>
          )}

          {postData.website && postData.website.length > 0 && (
            <ExternalLink href={postData.website}>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50">
                <Image
                  src="/images/website.png"
                  width={16}
                  height={16}
                  alt=""
                  className="h-4 w-4"
                />
                Website
              </span>
            </ExternalLink>
          )}
        </div>
      </div>

      {/* Audio Player */}
      {postData.hasAudio && (
        <div className="mt-5">
          <AudioPlayer
            postId={postData.id}
            title={postData.title}
            summary={podcastData?.summary}
            chapters={podcastData?.chapters}
            showNotes={podcastData?.showNotes}
          />
        </div>
      )}

      {/* Content */}
      <div className="mt-5">
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
