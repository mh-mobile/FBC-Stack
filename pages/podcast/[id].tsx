import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import fs from 'fs'
import path from 'path'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import Layout, { siteTitle } from '../../components/Layout'
import PodcastPlayer from '../../components/PodcastPlayer'
import Date from '../../components/Date'
import { PodcastData } from '../../types/podcastData'
import Image from 'next/image'
import { getBlurDataURL } from '../../lib/image'

type Props = {
  podcastData: PodcastData
}

export const getStaticPaths: GetStaticPaths = async () => {
  // audio-posts.jsonからすべてのポッドキャストIDを取得
  const audioPostsPath = path.join(process.cwd(), 'public', 'audio-posts.json')
  let audioPosts = []

  if (fs.existsSync(audioPostsPath)) {
    const audioPostsContent = fs.readFileSync(audioPostsPath, 'utf8')
    audioPosts = JSON.parse(audioPostsContent)
  }

  // すべてのポッドキャストIDからパスを生成
  const paths = audioPosts.map((post: any) => ({
    params: { id: post.id },
  }))

  // podcast_dataディレクトリからも追加のIDを取得
  const podcastDataDir = path.join(process.cwd(), 'podcast_data')
  if (fs.existsSync(podcastDataDir)) {
    const podcastDataFiles = fs.readdirSync(podcastDataDir)

    // .jsonファイルのみを処理
    podcastDataFiles
      .filter((file) => file.endsWith('.json'))
      .forEach((file) => {
        const id = file.replace(/\.json$/, '')

        // 既存のパスに含まれていない場合のみ追加
        if (!paths.some((path) => path.params.id === id)) {
          paths.push({ params: { id } })
        }
      })
  }

  console.log('Generated paths:', paths)

  return {
    paths,
    fallback: 'blocking', // 新しいポッドキャストが追加された場合にビルド時に生成されなかったパスもサポート
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const postId = params?.id as string

  try {
    // ポッドキャストデータの読み込み
    const podcastDataPath = path.join(
      process.cwd(),
      'podcast_data',
      `${postId}.json`,
    )

    if (fs.existsSync(podcastDataPath)) {
      const podcastDataContent = fs.readFileSync(podcastDataPath, 'utf8')
      const podcastData = JSON.parse(podcastDataContent) as PodcastData

      return {
        props: {
          podcastData,
        },
        revalidate: 86400, // 24時間（1日）ごとに再生成
      }
    }

    // ポッドキャストデータがない場合は、既存の音声投稿データから生成
    const audioPostsPath = path.join(
      process.cwd(),
      'public',
      'audio-posts.json',
    )

    if (fs.existsSync(audioPostsPath)) {
      const audioPostsContent = fs.readFileSync(audioPostsPath, 'utf8')
      const audioPosts = JSON.parse(audioPostsContent)

      const postData = audioPosts.find((post: any) => post.id === postId)

      if (postData) {
        const podcastData: PodcastData = {
          id: postId,
          title: postData.title,
          date: postData.date,
          author: postData.author,
          audioUrl: `https://pub-43e7ac942c624b64bc0adcef98aeffcf.r2.dev/${postId}.m4a`,
          duration: 600, // デフォルト値
          summary: postData.description?.slice(0, 150) || '', // 説明文から短いサマリーを生成
          showNotes: [],
          chapters: [
            { timestamp: '0:00', title: postData.title, startTime: 0 },
          ],
        }

        return {
          props: {
            podcastData,
          },
          revalidate: 86400, // 24時間（1日）ごとに再生成
        }
      }
    }

    // データが見つからない場合は404
    return {
      notFound: true,
      revalidate: 86400, // 24時間（1日）後に再試行
    }
  } catch (error) {
    console.error('Error loading podcast data:', error)
    return {
      notFound: true,
      revalidate: 86400, // 24時間（1日）後に再試行
    }
  }
}

const PodcastDetail: NextPage<Props> = ({ podcastData }) => {
  const router = useRouter()

  return (
    <Layout>
      <Head>
        <title>
          {podcastData.title} | {siteTitle}
        </title>
      </Head>

      <Container maxW="3xl" py={8}>
        <VStack spacing={6} align="stretch">
          <VStack spacing={4} align="stretch">
            <Heading size="lg">{podcastData.title}</Heading>

            <HStack spacing={3}>
              <Box
                rounded="full"
                overflow="hidden"
                width="30px"
                height="30px"
                position="relative"
              >
                <Image
                  src={`https://github.com/${podcastData.author}.png`}
                  alt={podcastData.author}
                  fill
                  style={{ objectFit: 'cover' }}
                  placeholder="blur"
                  blurDataURL={getBlurDataURL()}
                />
              </Box>
              <Text>{podcastData.author}</Text>
              <Text color="gray.500">
                <Date dateString={podcastData.date} />
              </Text>
            </HStack>
          </VStack>

          <PodcastPlayer
            audioUrl={podcastData.audioUrl}
            title={podcastData.title}
            showNotes={podcastData.showNotes}
            chapters={podcastData.chapters}
            summary={podcastData.summary}
          />
        </VStack>
      </Container>
    </Layout>
  )
}

export default PodcastDetail
