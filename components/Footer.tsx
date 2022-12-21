import Link from 'next/link'
import Image from 'next/image'
import { Box, HStack, VStack } from '@chakra-ui/react'
import ExternalLink from './ExternalLink'

const Footer = () => {
  return (
    <VStack>
      <HStack justify="center">
        <Box>&copy; 2022 mh-mobile</Box>
        <ExternalLink href="https://github.com/mh-mobile/FBC-Stack">
          <Image
            src={`/images/tool/github.png`}
            width="20"
            height="20"
            alt="repository"
          />
        </ExternalLink>
      </HStack>
      <HStack justify="center" spacing={4}>
        <Link href="/terms">
          <Box as={'span'} color="externalLink">
            利用規約
          </Box>
        </Link>
        <Link href="/privacy">
          <Box as={'span'} color="externalLink">
            プライバシーポリシー
          </Box>
        </Link>
      </HStack>
    </VStack>
  )
}

export default Footer
