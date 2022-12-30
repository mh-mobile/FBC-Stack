import chromium from 'chrome-aws-lambda'
import { scrollPageToBottom } from 'puppeteer-autoscroll-down'
import puppeteer from 'puppeteer-core'
import { getAllPostIds } from '../../../lib/posts'

async function captureStack(url: string) {
  await chromium.font(
    'https://raw.githack.com/minoryorg/Noto-Sans-CJK-JP/master/fonts/NotoSansCJKjp-Regular.ttf',
  )

  const browser = await puppeteer.launch({
    args: chromium.args.concat('--lang=ja'),
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  })

  const page = await browser.newPage()
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'ja-JP',
  })
  await page.goto(url, {
    waitUntil: 'networkidle2',
    timeout: 30000,
  })

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

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const capturedURL = `${baseURL}/posts/${id}`
  const buffer = await captureStack(capturedURL)

  res.setHeader('Content-Type', 'image/png')
  res.setHeader(
    'Cache-Control',
    'public, immutable, no-transform, s-maxage=86400, max-age=86400',
  )
  res.end(buffer, 'binary')
}
