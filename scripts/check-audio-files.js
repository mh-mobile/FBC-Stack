/**
 * check-audio-files.js
 * 
 * podcast_dataディレクトリ内の各JSONファイルに対応するm4aオーディオファイルが
 * Cloudflare R2ストレージに存在するかを確認します。
 */

const fs = require('fs')
const path = require('path')
const https = require('https')

const PODCAST_DATA_DIR = path.join(process.cwd(), 'podcast_data')
const AUDIO_BASE_URL = 'https://pub-43e7ac942c624b64bc0adcef98aeffcf.r2.dev'

/**
 * 特定のIDのオーディオファイルが存在するかをチェックします
 */
function checkAudioExists(postId) {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      console.log(`Request for ${postId} timed out`)
      resolve(false)
    }, 5000)

    const url = `${AUDIO_BASE_URL}/${postId}.m4a`
    const req = https.request(url, { method: 'HEAD' }, (res) => {
      clearTimeout(timeout)
      resolve(res.statusCode === 200)
    })

    req.on('error', (err) => {
      clearTimeout(timeout)
      console.error(`Error checking ${postId}: ${err.message}`)
      resolve(false)
    })

    req.end()
  })
}

/**
 * podcast_dataディレクトリ内の各JSONファイルに対して、
 * 対応するオーディオファイルが存在するかをチェックします
 */
async function checkPodcastAudioFiles() {
  console.log('Checking podcast audio files existence...')

  // podcast_dataディレクトリが存在するか確認
  if (!fs.existsSync(PODCAST_DATA_DIR)) {
    console.error(`Podcast data directory not found: ${PODCAST_DATA_DIR}`)
    process.exit(1)
  }

  // JSONファイルを取得
  const podcastFiles = fs.readdirSync(PODCAST_DATA_DIR)
    .filter(file => file.endsWith('.json'))
  
  console.log(`Found ${podcastFiles.length} podcast data files`)
  
  if (podcastFiles.length === 0) {
    console.log('No podcast data files found')
    process.exit(1)
  }

  // 一度に処理するファイル数を制限
  const BATCH_SIZE = 5
  let processedCount = 0
  let existsCount = 0
  let missingCount = 0

  // バッチ処理
  for (let i = 0; i < podcastFiles.length; i += BATCH_SIZE) {
    const batch = podcastFiles.slice(i, i + BATCH_SIZE)
    console.log(
      `Checking files ${i + 1} to ${Math.min(i + BATCH_SIZE, podcastFiles.length)} of ${podcastFiles.length}`
    )

    const batchPromises = batch.map(async (file) => {
      const postId = file.replace(/\.json$/, '')
      processedCount++
      
      try {
        const exists = await checkAudioExists(postId)
        
        if (exists) {
          existsCount++
          console.log(`✓ Audio file for ${postId} exists`)
          return { id: postId, exists: true }
        } else {
          missingCount++
          console.error(`✗ Audio file for ${postId} does not exist`)
          return { id: postId, exists: false }
        }
      } catch (err) {
        missingCount++
        console.error(`Error checking ${postId}: ${err.message}`)
        return { id: postId, exists: false, error: err.message }
      }
    })

    await Promise.all(batchPromises)
  }

  console.log(`\nAudio file check completed for ${processedCount} podcast files:`)
  console.log(`- ${existsCount} audio files exist`)
  console.log(`- ${missingCount} audio files are missing`)

  return { processedCount, existsCount, missingCount }
}

// スクリプト実行
(async () => {
  try {
    await checkPodcastAudioFiles()
    process.exit(0)
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
})()
