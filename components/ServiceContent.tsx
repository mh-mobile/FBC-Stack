import Link from 'next/link'
import type { NextPage } from 'next'
import { Grid, GridItem, Text, ListItem, Box } from '@chakra-ui/react'
import ToolButton from './ToolButton'
import ReactMarkdown from 'react-markdown'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import type { PostData } from '../types/postData'

type Props = {
  postData: PostData
}

const ServiceContent: NextPage<Props> = ({ postData }) => {
  return (
    <Box>
      <Box>
        <ReactMarkdown
          components={ChakraUIRenderer({
            p: ({ children }) => (
              <Text fontSize="ml" mb={4}>
                {children}
              </Text>
            ),
            a: ({ href, children }) => (
              <Link color="teal.500" href={href ?? ''}>
                {children}
              </Link>
            ),
            li: ({ children }) => <ListItem fontSize="ml">{children}</ListItem>,
          })}
          linkTarget="_blank"
        >
          {postData.markdownContent}
        </ReactMarkdown>
      </Box>
      <Box py={5}>
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
                        href={`/tools/${postData.toolPathInfo![name]}`}
                        passHref
                        legacyBehavior
                        key="{name}"
                      >
                        <ToolButton
                          name={name}
                          id={postData.toolPathInfo![name]}
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
      </Box>
    </Box>
  )
}

export default ServiceContent
