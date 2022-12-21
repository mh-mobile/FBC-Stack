import { useBreakpointValue, HStack, Box } from '@chakra-ui/react'
import { SearchIcon, QuestionOutlineIcon } from '@chakra-ui/icons'
import Link from 'next/link'

const HeaderRightMenu = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  if (isMobile) {
    return (
      <HStack spacing="20px" justify="end" style={{ width: '100%' }}>
        <Link href="/about">
          <QuestionOutlineIcon boxSize={6} />
        </Link>
        <Link href="/tools">
          <SearchIcon boxSize={6} />
        </Link>
      </HStack>
    )
  }
  return (
    <HStack spacing="24px" justify="end" style={{ width: '100%' }}>
      <Link href="/about">
        <Box as={'span'} color="externalLink">
          FBC Stackについて
        </Box>
      </Link>
      <Link href="/tools">
        <Box as={'span'} color="externalLink">
          みんなのツール
        </Box>
      </Link>
    </HStack>
  )
}

export default HeaderRightMenu
