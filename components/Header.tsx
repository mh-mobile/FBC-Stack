import Image from "next/legacy/image";
import Link from 'next/link'
import { HStack } from '@chakra-ui/react'
import HeaderRightMenu from './HeaderRightMenu'

const Header = () => {
  return (
    <HStack style={{ width: '100%' }}>
      <HStack spacing="24px" justify="start" style={{ width: '100%' }}>
        <Link href="/">
          <Image
            priority
            src="/images/fbcstack.png"
            height={100}
            width={100}
            alt=""
          />
        </Link>
        <HeaderRightMenu />
      </HStack>
    </HStack>
  )
}

export default Header
