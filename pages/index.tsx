import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layout'
import * as utilStyles from '../styles/utils'
import type { GetStaticProps, NextPage } from 'next'
import type { PostData } from '../types/postData'
import { getSortedPostsData } from '../lib/posts'
import { Heading, Grid, GridItem, Box } from '@chakra-ui/react'
import ServiceListItem from '../components/ServiceListItem'

type Props = {
  allPostsData: PostData[]
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

const Home: NextPage<Props> = ({ allPostsData }) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Box sx={utilStyles.headingXl} p={4}>
        Services
      </Box>
      <Box sx={utilStyles.contentMd} p={1}>
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
          gap={{ base: 2, md: 6 }}
        >
          {allPostsData.map(({ id, date, author, title, stack }) => (
            <GridItem w="100%" key={id}>
              <ServiceListItem
                id={id}
                title={title}
                author={author}
                date={date}
              />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Layout>
  )
}

export default Home
