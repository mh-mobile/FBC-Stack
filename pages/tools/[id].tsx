import Head from 'next/head'
import { NextPage } from 'next'
import { useState } from 'react'
import Image from 'next/image'
import {
  HStack,
  Tag,
  TagLabel,
  TagRightIcon,
  Grid,
  GridItem,
  Box,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import Layout, { siteTitle } from '../../components/Layout'
import * as utilStyles from '../../styles/utils'
import { getFilteredPostsData } from '../../lib/posts'
import { getAllToolsData, getToolData } from '../../lib/tools'
import type { GetStaticProps, GetStaticPaths } from 'next'
import type { ToolData } from '../../types/toolData'
import type { PostData } from '../../types/postData'
import ServiceListItem from '../../components/ServiceListItem'
import ExternalLink from '../../components/ExternalLink'

type Props = {
  allPostsData: PostData[]
  toolData: ToolData
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allToolsData = getAllToolsData()
  const paths = allToolsData.map(({ toolID }) => {
    return { params: { id: toolID } }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const toolData = await getToolData(params.id as string)
  const allPostsData = await getFilteredPostsData(toolData)

  return {
    props: {
      allPostsData,
      toolData,
    },
  }
}

const Tool: NextPage<Props> = ({ allPostsData, toolData }) => {
  const [imageSrc, setImageSrc] = useState(
    `/images/tool/${toolData.toolID}.png`,
  )

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Box sx={utilStyles.headingXl}>
        <HStack justify="center" py={5}>
          <Image
            src={imageSrc}
            alt="logo"
            width={50}
            height="55"
            onError={() => setImageSrc('/images/noimage.png')}
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </HStack>
        <Box display="flex" justifyContent="center" alignItems="center">
          &quot;{toolData.toolName}&quot;を採用しているサービス（
          {allPostsData.length}）
        </Box>
      </Box>
      <HStack justify="center" pb={5}>
        <ExternalLink href={toolData.url}>
          <Tag size={'md'} key={'md'} variant="outline" colorScheme="blue">
            <TagLabel>{toolData.url}</TagLabel>
            <TagRightIcon as={ExternalLinkIcon} />
          </Tag>
        </ExternalLink>
      </HStack>
      <Box sx={utilStyles.contentMd} p={1}>
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
          gap={{ base: 2, md: 6 }}
        >
          {allPostsData.map(({ id, date, title, author }) => (
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

export default Tool
