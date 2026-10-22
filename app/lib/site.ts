import type { Metadata } from 'next'

export const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
export const SITE_NAME = 'FBC Stack'
export const SITE_DESCRIPTION =
  'FBC(Fjord Boot Camp)の卒業生が作成したサービスの技術スタックデータベースです。'
export const OGP_IMAGE = '/images/fbcstack_ogp.png'

// ページごとのタイトル・説明・canonical・OGP をまとめて組み立てる（og:type や site_name を落とさないため）
export function pageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path,
}: {
  title?: string
  description?: string
  path: string
}): Metadata {
  const ogTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'ja_JP',
      url: path,
      title: ogTitle,
      description,
      images: [OGP_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [OGP_IMAGE],
    },
  }
}
