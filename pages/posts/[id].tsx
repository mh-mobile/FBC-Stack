import Layout from '../../components/Layout'
import ServiceContent from '../../components/ServiceContent'
import Image from 'next/image'
import Link from 'next/link'
import Date from '../../components/Date'
import Head from 'next/head'
import type { NextPage } from 'next'
import { VStack, HStack } from '@chakra-ui/react'
import { getAllPostIds, getPostData } from '../../lib/posts'
import * as utilStyles from '../../styles/utils'
import { Grid, GridItem, Text, ListItem, Box } from '@chakra-ui/react'
import ToolButton from '../../components/ToolButton'
import { GetStaticProps, GetStaticPaths } from 'next'
import ReactMarkdown from 'react-markdown'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import remarkGfm from 'remark-gfm'
import type { PostData } from '../../types/postData'

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
              />
            </Box>
            <Text>{postData.author}</Text>
            {postData.code.map(({ repository }) => (
              <Link href={repository} key={repository} legacyBehavior>
                <a target="_blank" rel="noopener noreferrer">
                  <Image
                    src={`/images/tool/github.png`}
                    width="30"
                    height="30"
                    alt="repository"
                  />
                </a>
              </Link>
            ))}
            {postData.blog?.length > 0 && (
              <Link href={postData.blog} legacyBehavior>
                <a target="_blank" rel="noopener noreferrer">
                  <Image
                    src={`/images/blog.png`}
                    width="30"
                    height="30"
                    alt="blog"
                  />
                </a>
              </Link>
            )}
            {postData.website?.length > 0 && (
              <Link href={postData.website} legacyBehavior>
                <a target="_blank" rel="noopener noreferrer">
                  <Image
                    src={`/images/website.png`}
                    width="30"
                    height="30"
                    alt="website"
                  />
                </a>
              </Link>
            )}
          </HStack>
          <Box pt={2}>
            <ServiceContent postData={postData} />
          </Box>
        </VStack>
      </article>
    </Layout>
  )
}

export default Post
