import * as playwright from 'playwright-aws-lambda'
import { getAllPostIds } from '../../../lib/posts'

// ref. https://swet.dena.com/entry/2018/04/26/152326
async function scrollToBottom(page, viewportHeight) {
  const getScrollHeight = () => {
    return Promise.resolve(document.documentElement.scrollHeight)
  }

  let scrollHeight = await page.evaluate(getScrollHeight)
  let currentPosition = 0
  let scrollNumber = 0

  while (currentPosition < scrollHeight) {
    scrollNumber += 1
    const nextPosition = scrollNumber * viewportHeight
    await page.evaluate(function (scrollTo) {
      return Promise.resolve(window.scrollTo(0, scrollTo))
    }, nextPosition)
    await page
      .waitForNavigation({ waitUntil: 'networkidle2', timeout: 5000 })
      .catch((e) => console.log('timeout exceed. proceed to next operation'))
    currentPosition = nextPosition
    scrollHeight = await page.evaluate(getScrollHeight)
  }
}

async function captureStack(url: string) {
  const browser = await playwright.launchChromium({
    headless: true,
  })
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })

  // 技術スタックのセレクターの領域を計算
  const clip = await page.evaluate((s) => {
    const el = document.querySelector(s)
    const { width, height, top: y, left: x } = el.getBoundingClientRect()
    return { width, height, x, y }
  }, '#stack')

  // 画面外の遅延ローディングの画像をキャプチャするために、
  // 画面下部にスクロールした上でキャプチャする。
  await page.evaluate((_) => {
    window.scrollTo(0, 0)
  })
  await scrollToBottom(page, 400)

  await page.waitForTimeout(1000)

  const buffer = await page.locator('#stack').screenshot()
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
