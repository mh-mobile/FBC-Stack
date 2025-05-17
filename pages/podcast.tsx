import { useState, useEffect } from 'react'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Spinner,
  useToast,
  Tooltip, // 追加
} from '@chakra-ui/react'
import {
  SearchIcon,
  ExternalLinkIcon,
  CopyIcon,
  CheckIcon,
} from '@chakra-ui/icons'
import Layout, { siteTitle } from '../components/Layout'
import Date from '../components/Date'
import { getBlurDataURL } from '../lib/image'

type AudioPost = {
  id: string
  title: string
  date: string
  author: string
  description: string
  summary?: string // サマリーフィールドを追加（オプショナル）
}

type Props = {
  initialAudioPosts: AudioPost[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  // podcast_dataディレクトリからJSONファイルを読み込む
  const podcastDataDir = path.join(process.cwd(), 'podcast_data')
  let initialAudioPosts: AudioPost[] = []

  if (fs.existsSync(podcastDataDir)) {
    const files = fs
      .readdirSync(podcastDataDir)
      .filter((file) => file.endsWith('.json'))

    // 各ポッドキャストデータを読み込む
    for (const file of files) {
      try {
        const filePath = path.join(podcastDataDir, file)
        const content = fs.readFileSync(filePath, 'utf8')
        const data = JSON.parse(content)

        initialAudioPosts.push({
          id: data.id,
          title: data.title,
          date: data.date,
          author: data.author,
          description: data.description || '',
          summary: data.summary || '',
        })
      } catch (error) {
        console.error(`Error reading podcast data from ${file}:`, error)
      }
    }

    // 日付順にソート
    initialAudioPosts = initialAudioPosts.sort((a, b) => {
      // date-fnsのparseISOとisValidを使って厳密に日付をパース
      const { parseISO, isValid } = require('date-fns')
      const dateA = parseISO(a.date)
      const dateB = parseISO(b.date)
      const timeA = isValid(dateA) ? dateA.getTime() : 0
      const timeB = isValid(dateB) ? dateB.getTime() : 0
      return timeB - timeA
    })
  }

  return {
    props: {
      initialAudioPosts,
    },
  }
}

const PodcastPage: NextPage<Props> = ({ initialAudioPosts }) => {
  const [audioPosts, setAudioPosts] = useState<AudioPost[]>([])
  const [filter, setFilter] = useState('')
  const [filteredPosts, setFilteredPosts] = useState<AudioPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const podcastFeedUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/podcast.xml`
      : '/podcast.xml'
  const toast = useToast()

  useEffect(() => {
    setIsClient(true)
    setAudioPosts(initialAudioPosts)
    setFilteredPosts(initialAudioPosts)
    setIsLoading(false)
  }, [initialAudioPosts])

  useEffect(() => {
    if (!filter || !isClient) {
      setFilteredPosts(audioPosts)
      return
    }

    const filtered = audioPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(filter.toLowerCase()) ||
        post.author.toLowerCase().includes(filter.toLowerCase()) ||
        (post.summary?.toLowerCase() || '').includes(filter.toLowerCase()),
    )

    setFilteredPosts(filtered)
  }, [filter, audioPosts, isClient])

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isCopied])

  const copyFeedUrlToClipboard = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard
        .writeText(podcastFeedUrl)
        .then(() => {
          setIsCopied(true)
          toast({
            title: 'コピーしました',
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        })
        .catch((err) => {
          console.error('クリップボードへのコピーに失敗しました:', err)
          toast({
            title: 'コピーに失敗しました',
            description:
              'ポッドキャストアプリで使用するには URLを手動でコピーしてください',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        })
    }
  }

  if (!isClient) {
    return (
      <Layout>
        <Head>
          <title>みんなのポッドキャスト | {siteTitle}</title>
        </Head>
        <Box as="section" py={8} textAlign="center">
          <Container maxW="3xl">
            <Heading as="h1" size="xl" mb={4}>
              みんなのポッドキャスト
            </Heading>
            <Text>読み込み中...</Text>
          </Container>
        </Box>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>みんなのポッドキャスト | {siteTitle}</title>
        <meta
          name="description"
          content="フィヨルドブートキャンプ卒業生が作成した各サービスの技術スタックに関する音声概要ポッドキャスト"
        />
      </Head>

      <Box as="section" py={8}>
        <Container maxW="3xl">
          <VStack spacing={6} align="stretch">
            <Heading as="h1" size="xl" textAlign="center">
              みんなのポッドキャスト
            </Heading>

            <Text>
              フィヨルドブートキャンプ卒業生が作成した各サービスの技術スタックに関する音声概要をポッドキャストとして配信しています。
              各エピソードはNotebookLMで生成され、使用している技術や実装の特徴について簡潔に解説しています。
            </Text>

            <Box py={4}>
              <VStack spacing={3}>
                <Text textAlign="center" fontSize="sm">
                  ポッドキャストアプリで購読するには以下のURLを使用してください:
                </Text>
                <HStack
                  p={2}
                  bg="gray.100"
                  borderRadius="md"
                  justify="space-between"
                  width="100%"
                  maxW="md"
                  mx="auto"
                >
                  <Text
                    fontSize="sm"
                    fontFamily="monospace"
                    maxW={{ base: '200px', md: '300px' }}
                  >
                    {podcastFeedUrl}
                  </Text>
                  <Tooltip
                    label={
                      isCopied ? 'コピーしました!' : 'クリップボードにコピー'
                    }
                    hasArrow
                  >
                    <Button
                      size="sm"
                      colorScheme={isCopied ? 'green' : 'blue'}
                      leftIcon={isCopied ? <CheckIcon /> : <CopyIcon />}
                      onClick={copyFeedUrlToClipboard}
                    >
                      {isCopied ? 'コピー済み' : 'コピー'}
                    </Button>
                  </Tooltip>
                </HStack>

                <Button
                  as="a"
                  href="/podcast.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                  variant="outline"
                  leftIcon={<ExternalLinkIcon />}
                  mx="auto"
                  mt={1}
                >
                  フィードを直接表示
                </Button>
              </VStack>
            </Box>

            <Box pt={2}>
              <InputGroup>
                <InputLeftElement>
                  <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="サービスまたは作成者を検索"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </InputGroup>
            </Box>

            <Text>エピソード数: {filteredPosts.length}</Text>

            {isLoading ? (
              <Box textAlign="center" py={10}>
                <Spinner size="xl" />
                <Text mt={4}>音声ファイル情報を読み込み中...</Text>
              </Box>
            ) : filteredPosts.length === 0 ? (
              <Box textAlign="center" py={10}>
                <Text>検索条件に一致する音声概要はありません。</Text>
              </Box>
            ) : (
              <VStack spacing={6} align="stretch">
                {filteredPosts.map(
                  ({ id, title, date, author, description, summary }) => (
                    <Box
                      key={id}
                      p={5}
                      borderWidth="1px"
                      borderRadius="lg"
                      bg="gray.50"
                      _hover={{ bg: 'gray.100' }}
                      cursor="pointer"
                      mb={3}
                    >
                      <Link href={`/podcast/${id}`}>
                        <Flex
                          direction={{ base: 'column', md: 'row' }}
                          gap={{ base: 2, md: 3 }}
                        >
                          <Box
                            position="relative"
                            minWidth={{ base: '60px', md: '80px' }}
                            maxWidth={{ base: '60px', md: '80px' }}
                            height={{ base: '60px', md: '80px' }}
                            borderRadius="full"
                            overflow="hidden"
                            mx={{ base: 'auto', md: '0' }}
                            mb={{ base: 3, md: 0 }}
                          >
                            <Image
                              src={`https://github.com/${author}.png`}
                              alt={`${author}のアイコン`}
                              fill
                              style={{ objectFit: 'cover' }}
                              sizes="(max-width: 768px) 100vw, 120px"
                              placeholder="blur"
                              blurDataURL={getBlurDataURL()}
                            />
                          </Box>

                          <Box flex="1">
                            <Heading as="h3" size="md" mb={2}>
                              {title}
                            </Heading>

                            <Text fontSize="sm" mb={2}>
                              by {author}
                            </Text>

                            {/* エピソードの概要を表示 - 全文表示 */}
                            <Text
                              fontSize={{ base: 'md', md: 'sm' }}
                              color="gray.700"
                              mb={3}
                              title={summary || description}
                              whiteSpace="pre-wrap"
                              lineHeight="1.6"
                            >
                              {summary || description}
                            </Text>

                            <Text fontSize="sm" color="gray.500">
                              公開日: <Date dateString={date} />
                            </Text>
                          </Box>
                        </Flex>
                      </Link>
                    </Box>
                  ),
                )}
              </VStack>
            )}
          </VStack>
        </Container>
      </Box>
    </Layout>
  )
}

export default PodcastPage
