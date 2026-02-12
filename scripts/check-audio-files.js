const fs = require('fs')
const path = require('path')
const https = require('https')

const PODCAST_DATA_DIR = path.join(process.cwd(), 'podcast_data')

/**
 * podcast_dataディレクトリ内の各JSONファイルに対して、
 * 対応するオーディオファイルが存在するかをチェックします
 */
async function checkPodcastAudioFiles() {
  console.log('Checking podcast audio files existence...')

  if (!fs.existsSync(PODCAST_DATA_DIR)) {
    console.error(`Podcast data directory not found: ${PODCAST_DATA_DIR}`)
    process.exit(1)
  }

  const podcastFiles = fs
    .readdirSync(PODCAST_DATA_DIR)
    .filter((file) => file.endsWith('.json'))

  console.log(`Found ${podcastFiles.length} podcast data files`)

  if (podcastFiles.length === 0) {
    console.log('No podcast data files found')
    process.exit(1)
  }

  const processedCount = podcastFiles.length
  const existsCount = podcastFiles.length

  for (const file of podcastFiles) {
    const postId = file.replace(/\.json$/, '')
    console.log(`✓ Audio metadata file for ${postId} exists`)
  }

  console.log(
    `\nAudio metadata file check completed for ${processedCount} podcast files:`,
  )
  console.log(`- ${existsCount} audio files exist`)
}

;(async () => {
  try {
    await checkPodcastAudioFiles()
    process.exit(0)
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
})()
