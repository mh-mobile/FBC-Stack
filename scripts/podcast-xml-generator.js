const fs = require('fs')
const path = require('path')

// Configuration
const PODCAST_DATA_DIR = path.join(process.cwd(), 'podcast_data')
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'podcast.xml')
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://fbc-stack.vercel.app'
const STORAGE_BASE_URL = 'https://fbc-stack-storage.com'
const PODCAST_IMAGE_URL = `${STORAGE_BASE_URL}/fbcstack_podcast.jpg`

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

// フォーマットされた日付を取得
function getFormattedDate(dateString) {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      // 無効な日付の場合は現在の日付を使用
      return new Date().toUTCString()
    }
    return date.toUTCString()
  } catch (error) {
    console.error(`Invalid date: ${dateString}`, error)
    return new Date().toUTCString()
  }
}

// タイムスタンプ（MM:SS形式）を秒に変換する関数
function parseTimestampToSeconds(timestamp) {
  // HH:MM:SS 形式をチェック
  if (/^\d+:\d+:\d+$/.test(timestamp)) {
    const [hours, minutes, seconds] = timestamp.split(':').map(Number)
    return hours * 3600 + minutes * 60 + seconds
  }
  // MM:SS 形式をチェック
  else if (/^\d+:\d+$/.test(timestamp)) {
    const [minutes, seconds] = timestamp.split(':').map(Number)
    return minutes * 60 + seconds
  }
  // 数値のみの場合（秒として扱う）
  else if (!isNaN(timestamp)) {
    return parseInt(timestamp, 10)
  }
  // 変換できない場合は0を返す
  return 0
}

// Main function
function main() {
  console.log(`Generating podcast XML from ${PODCAST_DATA_DIR}...`)

  // Ensure podcast data directory exists
  if (!fs.existsSync(PODCAST_DATA_DIR)) {
    console.error(`Podcast data directory not found: ${PODCAST_DATA_DIR}`)
    process.exit(1)
  }

  try {
    // Read podcast data files
    const podcastFiles = fs
      .readdirSync(PODCAST_DATA_DIR)
      .filter((file) => file.endsWith('.json'))

    console.log(`Found ${podcastFiles.length} podcast data files`)

    if (podcastFiles.length === 0) {
      console.error('No podcast data files found')
      process.exit(1)
    }

    const podcastData = []

    // 各ポッドキャストデータを読み込む
    for (const file of podcastFiles) {
      try {
        const filePath = path.join(PODCAST_DATA_DIR, file)
        const content = fs.readFileSync(filePath, 'utf8')
        const data = JSON.parse(content)

        podcastData.push(data)
      } catch (error) {
        console.error(`Error reading podcast data from ${file}:`, error)
      }
    }

    // 日付順にソート（新しい順）
    podcastData.sort((a, b) => new Date(b.date) - new Date(a.date))

    const items = podcastData.map((podcast) => {
      const audioUrl = `${STORAGE_BASE_URL}/${podcast.id}.m4a`
      const duration = podcast.duration || 600
      const fileSize = podcast.fileSize
      const pubDate = getFormattedDate(podcast.date)

      // すべてのテキストフィールドをエスケープ
      const safeTitle = escapeXml(podcast.title)
      const safeDescription = escapeXml(
        podcast.summary ||
          podcast.description ||
          `${podcast.title}の技術スタックに関する音声概要`,
      )
      const safeAuthor = escapeXml(podcast.author)

      // Show NotesとChaptersをエピソード詳細に含める
      let contentEncoded = `<![CDATA[<p>${safeDescription}</p>`

      // Show Notes情報を追加
      if (podcast.showNotes && podcast.showNotes.length > 0) {
        contentEncoded += '<h3>Show Notes</h3><ul>'
        podcast.showNotes.forEach((note) => {
          if (note.url) {
            contentEncoded += `<li><a href="${escapeXml(note.url)}">${escapeXml(
              note.title,
            )}</a></li>`
          } else {
            contentEncoded += `<li>${escapeXml(note.title)}</li>`
          }
        })
        contentEncoded += '</ul>'
      }

      // Show NotesとChapterの間に空白行を追加
      contentEncoded += '<br/>'

      // チャプター情報を追加（存在する場合）
      if (podcast.chapters && podcast.chapters.length > 0) {
        contentEncoded += '<h3>チャプター</h3><ul>'
        podcast.chapters.forEach((chapter) => {
          contentEncoded += `<li><strong>${
            chapter.timestamp
          }</strong> ${escapeXml(chapter.title)}</li>`
        })
        contentEncoded += '</ul>'
      }

      contentEncoded += ']]>'

      // ポッドキャスト名前空間を使用したチャプターマーカー（PodcastIndex形式）
      let podcastChapters = ''
      let pscChapters = ''

      if (podcast.chapters && podcast.chapters.length > 0) {
        // PodcastIndex形式のチャプター
        podcast.chapters.forEach((chapter) => {
          const startTimeInSeconds = parseTimestampToSeconds(chapter.timestamp)
          podcastChapters += `
      <podcast:chapter start="${startTimeInSeconds}" title="${escapeXml(
            chapter.title,
          )}" />`
        })

        // Podlove Simple Chapters形式
        pscChapters = `
      <psc:chapters>
${podcast.chapters
  .map(
    (chapter) =>
      `        <psc:chapter start="${chapter.timestamp}" title="${escapeXml(
        chapter.title,
      )}" />`,
  )
  .join('\n')}
      </psc:chapters>`
      }

      return `    <item>
      <title>${safeTitle}</title>
      <description>${safeDescription}</description>
      <pubDate>${pubDate}</pubDate>
      <enclosure url="${audioUrl}" type="audio/x-m4a" length="${fileSize}"/>
      <guid isPermaLink="false">${BASE_URL}/posts/${podcast.id}</guid>
      <link>${BASE_URL}/posts/${podcast.id}</link>
      <itunes:duration>${Math.floor(duration / 60)}:${(duration % 60)
        .toString()
        .padStart(2, '0')}</itunes:duration>
      <itunes:author>${safeAuthor}</itunes:author>
      <itunes:title>${safeTitle}</itunes:title>
      <itunes:subtitle>${
        safeDescription.length > 120
          ? safeDescription.substring(0, 117) + '...'
          : safeDescription
      }</itunes:subtitle>
      <itunes:summary>${safeDescription}</itunes:summary>
      <itunes:explicit>no</itunes:explicit>
      <itunes:episodeType>full</itunes:episodeType>
      <itunes:image href="${PODCAST_IMAGE_URL}"/>${podcastChapters}${pscChapters}
      <content:encoded>${contentEncoded}</content:encoded>
    </item>`
    })

    // チャンネル情報のセットアップ
    const safeDescription = escapeXml(
      'フィヨルドブートキャンプ卒業生が作成した各サービスの技術スタックに関する音声概要をポッドキャストとして配信しています。各エピソードはNotebookLMで生成され、使用している技術や実装の特徴について簡潔に解説しています。',
    )

    const channelInfo = {
      title: 'FBC Stack: みんなのポッドキャスト',
      description: safeDescription,
      author: 'FBC Stack',
      email: 'mh.mobiler@gmail.com',
      language: 'ja-jp',
      copyright: `Copyright ${new Date().getFullYear()} FBC Stack`,
      lastBuildDate: new Date().toUTCString(),
      mainCategory: 'Technology',
    }

    // RSSフィードの生成
    const podcastXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:googleplay="http://www.google.com/schemas/play-podcasts/1.0"
  xmlns:podcast="https://podcastindex.org/namespace/1.0"
  xmlns:psc="http://podlove.org/simple-chapters">
  <channel>
    <title>${escapeXml(channelInfo.title)}</title>
    <link>${BASE_URL}</link>
    <language>${channelInfo.language}</language>
    <description>${channelInfo.description}</description>
    <copyright>${escapeXml(channelInfo.copyright)}</copyright>
    <lastBuildDate>${channelInfo.lastBuildDate}</lastBuildDate>
    <pubDate>${
      podcastData.length > 0
        ? getFormattedDate(podcastData[0].date)
        : channelInfo.lastBuildDate
    }</pubDate>
    
    <atom:link href="${BASE_URL}/podcast.xml" rel="self" type="application/rss+xml" />
    
    <itunes:author>${escapeXml(channelInfo.author)}</itunes:author>
    <itunes:owner>
      <itunes:name>${escapeXml(channelInfo.author)}</itunes:name>
      <itunes:email>${channelInfo.email}</itunes:email>
    </itunes:owner>
    <itunes:image href="${PODCAST_IMAGE_URL}"/>
    <itunes:summary>${channelInfo.description}</itunes:summary>
    <itunes:category text="${channelInfo.mainCategory}"/>
    <itunes:explicit>no</itunes:explicit>
    <itunes:type>episodic</itunes:type>
    
    <googleplay:author>${escapeXml(channelInfo.author)}</googleplay:author>
    <googleplay:description>${channelInfo.description}</googleplay:description>
    <googleplay:image href="${PODCAST_IMAGE_URL}"/>
    <googleplay:category text="${channelInfo.mainCategory}"/>
    <googleplay:explicit>no</googleplay:explicit>
    
${items.join('\n')}
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
      `Generated podcast XML feed with ${podcastData.length} episodes at: ${OUTPUT_FILE}`,
    )

    // 明示的にプロセスを終了
    process.exit(0)
  } catch (error) {
    console.error('Error generating podcast XML:', error)
    process.exit(1)
  }
}

// Execute main function
try {
  main()
} catch (error) {
  console.error('Fatal error:', error)
  process.exit(1)
}
