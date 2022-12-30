import type { NextPage } from 'next'
import { getAllPostIds, getPostData } from '../../../lib/posts'
import { GetStaticProps, GetStaticPaths } from 'next'
import type { PostData } from '../../../types/postData'
import { Box, Grid, GridItem } from '@chakra-ui/react'
import Link from 'next/link'
import ToolButton from '../../../components/ToolButton'

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

const EmbedPost: NextPage<Props> = ({ postData }) => {
  return (
    <Box id="stack">
      {postData.stack.map(({ name, detail }) => (
        <Box key="{name}" p={5} mb={5} border="1px solid #eee">
          <Box>
            <b>
              {name} ({detail.length})
            </b>
          </Box>
          <Box pt={2}>
            <Grid
              templateColumns={{
                base: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              }}
              gap={{ base: 3, md: 6 }}
            >
              {detail.map(({ name, version }) => (
                <GridItem w="100%" key={name}>
                  <Link
                    href={`/tools/${postData.toolPathInfo[name]}`}
                    passHref
                    legacyBehavior
                    key="{name}"
                  >
                    <ToolButton
                      target="_blank"
                      name={name}
                      id={postData.toolPathInfo[name]}
                      version={version}
                    />
                  </Link>
                </GridItem>
              ))}
            </Grid>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default EmbedPost
