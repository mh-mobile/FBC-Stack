import Layout from '../../components/Layout'
import ServiceContent from '../../components/ServiceContent'
import Image from 'next/image'
import Date from '../../components/Date'
import Head from 'next/head'
import type { NextPage } from 'next'
import { getAllPostIds, getPostData } from '../../lib/posts'
import * as utilStyles from '../../styles/utils'
import {
  HStack,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { GetStaticProps, GetStaticPaths } from 'next'
import type { PostData } from '../../types/postData'
import ExternalLink from '../../components/ExternalLink'
import { getBlurDataURL } from '../../lib/image'
import { useState } from 'react'

type Props = {
  postData: PostData
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = getPostData(params?.id as string)
  return {
    props: {
      postData,
    },
  }
}

const Post: NextPage<Props> = ({ postData }) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <Box sx={utilStyles.headingXl}>{postData.title}</Box>
        <VStack spacing="10px" align="start">
          <Box color="lightText">
            <Date dateString={postData.date} />
          </Box>
          <HStack spacing="10px" justify="start">
            <Box rounded="full" overflow="hidden">
              <Image
                src={`https://github.com/${postData.author}.png`}
                width={25}
                height={25}
                alt=""
                placeholder="blur"
                blurDataURL={getBlurDataURL()}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </Box>
            <Text>{postData.author}</Text>
            {postData.code.map(({ repository }) => (
              <>
                <ExternalLink href={repository} key={repository}>
                  <Image
                    src={`/images/tool/github.png`}
                    width="30"
                    height="30"
                    alt="repository"
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />
                </ExternalLink>
                <ExternalLink
                  href={repository.replace('github.com', 'deepwiki.com')}
                  key={repository + '-deepwiki'}
                >
                  <Image
                    src={`/images/deepwiki.png`}
                    width="30"
                    height="30"
                    alt="deepwiki"
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />
                </ExternalLink>
              </>
            ))}
            {postData.blog && postData.blog.length > 0 && (
              <ExternalLink href={postData.blog}>
                <Image
                  src={`/images/blog.png`}
                  width="30"
                  height="30"
                  alt="blog"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                />
              </ExternalLink>
            )}
            {postData.website && postData.website.length > 0 && (
              <ExternalLink href={postData.website}>
                <Image
                  src={`/images/website.png`}
                  width="30"
                  height="30"
                  alt="website"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                />
              </ExternalLink>
            )}
            <AudioSummaryModal postId={postData.id} title={postData.title} />
          </HStack>
          <Box pt={2}>
            <ServiceContent postData={postData} />
          </Box>
        </VStack>
      </article>
    </Layout>
  )
}

const AudioSummaryModal = ({
  postId,
  title,
}: {
  postId: string
  title: string
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioExists, setAudioExists] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const audioUrl = `https://fbc-stack-storage.com/${postId}.m4a`

  const handleClick = async () => {
    setIsLoading(true)

    try {
      const response = await fetch(`/api/check-audio?postId=${postId}`)
      const data = await response.json()
      setAudioExists(data.exists)
    } catch (error) {
      setAudioExists(false)
    } finally {
      setIsLoading(false)
      onOpen()
    }
  }

  return (
    <>
      <Box
        as="span"
        onClick={handleClick}
        cursor="pointer"
        _hover={{ opacity: 0.8 }}
        title="音声概要を聞く"
      >
        <Image
          src="/images/audio_summary.png"
          width="30"
          height="30"
          alt="音声概要"
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: 'sm', md: 'md' }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          mx={{ base: '4', md: 'auto' }}
          width={{ base: 'auto', md: 'md' }}
        >
          <ModalHeader
            fontSize={{ base: 'md', md: 'lg' }}
            px={{ base: 3, md: 6 }}
            py={{ base: 2, md: 4 }}
          >
            <Text noOfLines={1}>「{title}」の音声概要</Text>
          </ModalHeader>
          <ModalBody px={{ base: 3, md: 6 }} py={{ base: 2, md: 4 }}>
            {isLoading ? (
              <Text>音声ファイルを確認中...</Text>
            ) : !audioExists ? (
              <Text>
                申し訳ありませんが、この投稿の音声概要は現在利用できません。
              </Text>
            ) : (
              <>
                <Text mb={4} fontSize={{ base: 'sm', md: 'md' }}>
                  NotebookLMで生成した音声概要をお聴きください。このサービスの特徴や使用技術についての要約が含まれています。
                </Text>
                <Box
                  as="audio"
                  controls
                  w="100%"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onError={() => setAudioExists(false)}
                  src={audioUrl}
                  mb={4}
                  sx={{
                    // Custom styling for audio controls to fit mobile screens
                    '&::-webkit-media-controls-panel': {
                      backgroundColor: 'gray.100',
                    },
                    '&::-webkit-media-controls': {
                      width: '100%',
                    },
                  }}
                />
              </>
            )}
          </ModalBody>
          <ModalFooter px={{ base: 3, md: 6 }} py={{ base: 2, md: 3 }}>
            <Button
              colorScheme="blue"
              size={{ base: 'sm', md: 'md' }}
              onClick={onClose}
            >
              閉じる
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Post
