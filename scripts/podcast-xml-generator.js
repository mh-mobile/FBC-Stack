// scripts/podcast-xml-generator.js の修正版

const fs = require('fs')
const path = require('path')

// Configuration
const INPUT_FILE = path.join(process.cwd(), 'public', 'audio-posts.json')
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'podcast.xml')
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://fbc-stack.vercel.app'
const AUDIO_BASE_URL = 'https://pub-43e7ac942c624b64bc0adcef98aeffcf.r2.dev'
const PODCAST_IMAGE_URL = `${BASE_URL}/images/fbcstack_ogp.png`

// XMLでの特殊文字をエスケープする関数
function escapeXml(unsafe) {
  if (typeof unsafe !== 'string') return ''

  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// Main function
function main() {
  console.log(`Generating podcast XML from ${INPUT_FILE}...`)

  // Ensure input file exists
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`Input file not found: ${INPUT_FILE}`)
    console.error('Please run check-audio-files.js first')
    process.exit(1)
  }

  try {
    // Read audio posts data
    const audioPosts = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'))
    console.log(`Found ${audioPosts.length} posts with audio files`)

    // Generate podcast XML
    const items = audioPosts
      .map((post) => {
        const pubDate = new Date(post.date).toUTCString()
        // すべてのテキストフィールドをエスケープ
        const safeTitle = escapeXml(post.title)
        const safeDescription = escapeXml(post.description)
        const safeAuthor = escapeXml(post.author)

        return `    <item>
    <title>${safeTitle}</title>
    <description>${safeDescription}</description>
    <pubDate>${pubDate}</pubDate>
    <enclosure url="${AUDIO_BASE_URL}/${post.id}.m4a" type="audio/x-m4a" length="1024000"/>
    <guid isPermaLink="false">${post.id}</guid>
    <itunes:duration>10:00</itunes:duration>
    <itunes:author>${safeAuthor}</itunes:author>
    <link>${BASE_URL}/posts/${post.id}</link>
  </item>`
      })
      .join('\n')

    // チャンネル情報もエスケープ
    const safeDescription = escapeXml(
      'フィヨルドブートキャンプ卒業生が作成した各サービスの技術スタックに関する音声概要。NotebookLMで生成された各サービスの使用技術と実装特徴の解説です。',
    )

    const podcastXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>FBC Stack: みんなのポッドキャスト</title>
    <link>${BASE_URL}</link>
    <language>ja-jp</language>
    <itunes:author>FBC Stack</itunes:author>
    <description>${safeDescription}</description>
    <itunes:image href="${PODCAST_IMAGE_URL}"/>
    <itunes:category text="Technology">
      <itunes:category text="Software Development"/>
    </itunes:category>
${items}
  </channel>
</rss>`

    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_FILE)
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // Write XML file
    fs.writeFileSync(OUTPUT_FILE, podcastXml)
    console.log(
      `Generated podcast XML feed with ${audioPosts.length} episodes at: ${OUTPUT_FILE}`,
    )

    // 明示的にプロセスを終了
    process.exit(0)
  } catch (error) {
    console.error('Error generating podcast XML:', error)
    process.exit(1)
  }
}

// Execute main function
main()
