import { Grid, GridItem, Box } from '@chakra-ui/react'
import chromium from 'chrome-aws-lambda'
import { NextPage } from 'next'
import Link from 'next/link'
import { scrollPageToBottom } from 'puppeteer-autoscroll-down'
import puppeteer from 'puppeteer-core'
import ToolButton from '../../../components/ToolButton'
import { getAllPostIds, getPostData } from '../../../lib/posts'
import { PostData } from '../../../types/postData'
import ReactDOM from 'react-dom/server'

type Props = {
  postData: PostData
}

const ServiceStack: NextPage<Props> = ({ postData }) => {
  return (
    <Box py={5} id="stack">
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

async function captureStack(postData: PostData) {
  // await chromium.font(
  //   'https://raw.githack.com/minoryorg/Noto-Sans-CJK-JP/master/fonts/NotoSansCJKjp-Regular.ttf',
  // )

  const browser = await puppeteer.launch({
    args: chromium.args.concat('--lang=ja'),
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  })

  const page = await browser.newPage()
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'ja-JP',
  })

  const props = { postData }
  const markup = ReactDOM.renderToStaticMarkup(<ServiceStack {...props} />)
  const html = `<!doctype html>${markup}`

  // HTMLをセットして、ページの読み込み完了を待つ
  await page.setContent(html, { waitUntil: 'networkidle2' })

  // 画面外の遅延ローディングの画像をキャプチャするために、
  // 画面下部にスクロールした上でキャプチャする。
  await page.evaluate((_) => {
    window.scrollTo(0, 0)
  })
  const lastPosition = await scrollPageToBottom(page, {
    size: 400,
    stepsLimit: 50,
  })

  await page.waitForTimeout(100)
  var stackElement = await page.$('#stack')
  const buffer = await stackElement.screenshot()
  browser.close()
  return buffer
}

export default async function handler(req, res) {
  const { id } = req.query
  const allPostIds = getAllPostIds().map((value) => value.params.id)
  if (!allPostIds.includes(id)) {
    res.statusCode = 404
    res.end('Not Found')
    return
  }

  const postData = getPostData(id as string) as PostData
  const buffer = await captureStack(postData)

  res.setHeader('Content-Type', 'image/png')
  res.setHeader(
    'Cache-Control',
    'public, immutable, no-transform, s-maxage=86400, max-age=86400',
  )
  res.end(buffer, 'binary')
}
