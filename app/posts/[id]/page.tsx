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

export function generateStaticParams() {
  return getAllPostIds()
}

export function generateMetadata({
  params,
}: {
  params: { id: string }
}): Metadata {
  const postData = getPostData(params.id)
  return {
    title: postData.title,
  }
}

export default function PostPage({ params }: { params: { id: string } }) {
  const postData = getPostData(params.id)
  const podcastData = postData.hasAudio ? getPodcastData(params.id) : null

  return (
    <article>
      <h1 className="my-4 text-3xl font-extrabold leading-tight">
        {postData.title}
      </h1>

      <div className="flex flex-col gap-2.5">
        <div className="text-light-text">
          <DateDisplay dateString={postData.date} />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="shrink-0 overflow-hidden rounded-full">
            <Image
              src={`https://github.com/${postData.author}.png`}
              width={25}
              height={25}
              alt=""
              placeholder="blur"
              blurDataURL={getBlurDataURL()}
              className="h-auto max-w-full"
            />
          </div>
          <span>{postData.author}</span>

          {postData.code.map(({ repository }) => (
            <span key={repository} className="flex items-center gap-2">
              <ExternalLink href={repository}>
                <Image
                  src="/images/tool/github.png"
                  width={30}
                  height={30}
                  alt="repository"
                  className="h-auto max-w-full"
                />
              </ExternalLink>
              <ExternalLink
                href={repository.replace('github.com', 'deepwiki.com')}
              >
                <Image
                  src="/images/deepwiki.png"
                  width={30}
                  height={30}
                  alt="deepwiki"
                  className="h-auto max-w-full"
                />
              </ExternalLink>
            </span>
          ))}

          {postData.blog && postData.blog.length > 0 && (
            <ExternalLink href={postData.blog}>
              <Image
                src="/images/blog.png"
                width={30}
                height={30}
                alt="blog"
                className="h-auto max-w-full"
              />
            </ExternalLink>
          )}

          {postData.website && postData.website.length > 0 && (
            <ExternalLink href={postData.website}>
              <Image
                src="/images/website.png"
                width={30}
                height={30}
                alt="website"
                className="h-auto max-w-full"
              />
            </ExternalLink>
          )}
        </div>

        {/* Audio Player - inline section instead of hidden modal */}
        {postData.hasAudio && (
          <AudioPlayer
            postId={postData.id}
            title={postData.title}
            summary={podcastData?.summary}
            chapters={podcastData?.chapters}
            showNotes={podcastData?.showNotes}
          />
        )}

        <div className="pt-2">
          <ServiceContent postData={postData} />
        </div>
      </div>

      <div className="mt-10">
        <Link href="/" className="text-external-link hover:underline">
          &larr; Back to home
        </Link>
      </div>
    </article>
  )
}
