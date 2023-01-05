import Link from 'next/link'
import type { NextPage } from 'next'
import { Box, HStack } from '@chakra-ui/react'
import Image from 'next/image'
import Date from './Date'
import { getBlurDataURL } from '../lib/image'

type Props = {
  id: string
  title: string
  author: string
  date: string
}

const ServiceListItem: NextPage<Props> = ({ id, title, author, date }) => {
  return (
    <Link href={`/posts/${id}`} style={{ textDecoration: 'none' }}>
      <Box mb={{ base: '20px', md: '0px' }} bg="gray.50" p={5}>
        <Box>{title}</Box>
        <HStack justify="start">
          <Box rounded="full" overflow="hidden">
            <Image
              src={`https://github.com/${author}.png`}
              width={25}
              height={25}
              placeholder="blur"
              blurDataURL={getBlurDataURL()}
              alt=""
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </Box>
          <Box as={'small'}>{author}</Box>
          <Box as={'small'} color="lightText">
            <Date dateString={date} />
          </Box>
        </HStack>
      </Box>
    </Link>
  )
}

export default ServiceListItem
