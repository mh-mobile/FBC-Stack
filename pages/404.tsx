import Layout from '../components/Layout'
import Image from "next/legacy/image";
import Head from 'next/head'
import { HStack } from '@chakra-ui/react'

const Custom404 = () => {
  return (
    <Layout>
      <Head>
        <title>404</title>
      </Head>
      <section>
        <HStack justify="center">
          <Image src={`/images/404.png`} width="300" height="300" alt="404" />
        </HStack>
      </section>
    </Layout>
  )
}

export default Custom404
