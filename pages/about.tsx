import Layout from '../components/Layout'
import { NextPage } from 'next'
import Head from 'next/head'
import { getFBCStackData } from '../lib/posts'
import * as utilStyles from '../styles/utils'
import { Box } from '@chakra-ui/react'
import ServiceContent from '../components/ServiceContent'
import { GetStaticProps } from 'next'
import type { PostData } from '../types/postData'

type Props = {
  postData: PostData
}

export const getStaticProps: GetStaticProps = async () => {
  const postData = await getFBCStackData()
  return {
    props: {
      postData,
    },
  }
}

const About: NextPage<Props> = ({ postData }) => {
  return (
    <Layout>
      <Head>
        <title>FBC Stackについて</title>
      </Head>
      <article>
        <Box sx={utilStyles.headingXl}>{postData.title}について</Box>
        <Box pt={2}>
          <ServiceContent postData={postData} />
        </Box>
      </article>
    </Layout>
  )
}

export default About
