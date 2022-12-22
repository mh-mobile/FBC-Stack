import Layout from '../../components/Layout'
import ServiceContent from '../../components/ServiceContent'
import Image from 'next/image'
import Date from '../../components/Date'
import Head from 'next/head'
import type { NextPage } from 'next'
import { VStack, HStack } from '@chakra-ui/react'
import { getAllPostIds, getPostData } from '../../lib/posts'
import * as utilStyles from '../../styles/utils'
import { Text, Box } from '@chakra-ui/react'
import { GetStaticProps, GetStaticPaths } from 'next'
import type { PostData } from '../../types/postData'
import ExternalLink from '../../components/ExternalLink'

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
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </Box>
            <Text>{postData.author}</Text>
            {postData.code.map(({ repository }) => (
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
            ))}
            {postData.blog?.length > 0 && (
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
            {postData.website?.length > 0 && (
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
