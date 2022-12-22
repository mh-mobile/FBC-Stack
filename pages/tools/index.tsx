import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/Layout'
import { useState } from 'react'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import ToolButton from '../../components/ToolButton'
import { Grid, GridItem, Box } from '@chakra-ui/react'
import { getToolsNameInPostsData } from '../../lib/posts'
import { getAllToolsData } from '../../lib/tools'
import type { GetStaticProps } from 'next'
import type { ToolData } from '../../types/toolData'
import * as utilStyles from '../../styles/utils'

type Props = {
  allToolsData: ToolData[]
}

// 実際に使用されているツールのみを抽出する
const getAllToolsDataInUse = () => {
  const toolsNameInServices = getToolsNameInPostsData().map((name) =>
    name.toLowerCase(),
  )
  const allToolsData = getAllToolsData().filter((toolData) => {
    return (
      toolsNameInServices.includes(toolData.toolName.toLowerCase()) ||
      toolData.alias?.some((name) =>
        toolsNameInServices.includes(name.toLowerCase()),
      )
    )
  })
  return allToolsData
}

export const getStaticProps: GetStaticProps = async () => {
  const allToolsData = getAllToolsDataInUse()
  return {
    props: {
      allToolsData,
    },
  }
}

const Tools = ({ allToolsData }) => {
  const [items, setItems] = useState(allToolsData)
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredItems = items.filter(
    ({ toolName, alias }) =>
      toolName?.toLowerCase().includes(filter.toLowerCase()) ||
      alias?.some((alias) =>
        alias.toLowerCase().includes(filter.toLowerCase()),
      ),
  )

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Box sx={utilStyles.headingXl} py={4}>
        Tools
      </Box>
      <Box p={1} sx={utilStyles.contentMd}>
        <Box>
          <InputGroup>
            <InputLeftElement>
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="ツールを検索"
              value={filter}
              onChange={handleFilterChange}
            />
          </InputGroup>
        </Box>
        <Box py={4}></Box>
        <Grid
          templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
          gap={{ base: 3, md: 6 }}
        >
          {filteredItems.map(({ toolID, toolName }) => (
            <GridItem w="100%" key={toolID}>
              <Link
                href={`/tools/${toolID}`}
                passHref
                legacyBehavior
                key="{toolID}"
              >
                <ToolButton name={toolName} id={toolID} version="" />
              </Link>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Layout>
  )
}

export default Tools
