import Head from 'next/head'
import Link from 'next/link'
import { Box, Container } from '@chakra-ui/react'
import Header from './Header'
import Footer from './Footer'
import * as utilStyles from '../styles/utils'

export const siteTitle = 'FBC Stack'
export const siteDescription =
  'FBC(Fjord Boot Camp)の卒業生が作成したサービスの技術スタックデータベースです。'

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode
  home?: boolean
}) {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
  const ogpImageURL = `${baseURL}/images/fbcstack_ogp.png`

  return (
    <Container maxW="3xl">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={baseURL} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={ogpImageURL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${baseURL}`} />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={ogpImageURL} />
      </Head>
      <header>
        {home ? (
          <>
            <Header />
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box sx={utilStyles.heading2Xl}>{siteTitle}</Box>
            </Box>
          </>
        ) : (
          <>
            <Header />
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <Box mt={10}>
          <Link href="/">← Back to home</Link>
        </Box>
      )}
      <footer>
        <Box py={5}>
          <Footer />
        </Box>
      </footer>
    </Container>
  )
}
