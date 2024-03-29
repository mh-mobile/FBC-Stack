import Layout from '../components/Layout'
import ExternalLink from '../components/ExternalLink'
import Head from 'next/head'
import * as utilStyles from '../styles/utils'
import { Text, Box } from '@chakra-ui/react'

const Privacy = () => {
  return (
    <Layout>
      <Head>
        <title>プライバシーポリシー</title>
      </Head>
      <article>
        <Box sx={utilStyles.headingXl}>プライバシーポリシー</Box>
        <Box style={{ paddingTop: '20px' }}>
          <Text p={2}>
            当サイトでは、提供するサービス向上のためにGoogle社のアクセス解析ツール「Google
            アナリティクス」を使用しています。Google
            アナリティクスはデータの収集のためにCookie(※)を使用し、取得されたデータはGoogle社により同社のプライバシーポリシーに基づいて管理されます。
          </Text>

          <Text p={2}>
            Googleアナリティクスに関する説明は、
            <ExternalLink href="https://marketingplatform.google.com/about/analytics/terms/jp/">
              <Box as={'span'} color="externalLink">
                Googleアナリティクス利用規約
              </Box>
            </ExternalLink>
            と
            <ExternalLink href="https://policies.google.com/technologies/ads">
              <Box as={'span'} color="externalLink">
                Googleプライバシーポリシー
              </Box>
            </ExternalLink>
            をご確認ください。
          </Text>

          <Text p={2}>
            また、Google による情報収集を無効化したい場合は、Google社が提供する
            <ExternalLink href="https://tools.google.com/dlpage/gaoptout">
              <Box as={'span'} color="externalLink">
                Google アナリティクス オプトアウト アドオン
              </Box>
            </ExternalLink>
            からオプトアウトの設定が可能です。
          </Text>
          <Text p={2}>
            ※Cookieとは、利用者がウェブサイトに訪問した際、ブラウザーを通して利用者のコンピューターに一時的にデータを記録する仕組みのことです。Cookieには、利用者の端末に関する情報やサイトへの訪問回数といった情報が記録され、サイトへの訪問者としての利用者の識別として利用されます。
          </Text>
        </Box>
      </article>
    </Layout>
  )
}

export default Privacy
