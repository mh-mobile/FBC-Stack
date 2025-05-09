const fs = require('fs')
const path = require('path')
const https = require('https')
const matter = require('gray-matter')

const POSTS_DIRECTORY = path.join(process.cwd(), 'posts')
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'audio-posts.json')
const AUDIO_BASE_URL = 'https://pub-43e7ac942c624b64bc0adcef98aeffcf.r2.dev'

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

async function processAudioFiles() {
  console.log('Checking audio files existence...')

  const postIds = fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))

  const results = []

  const BATCH_SIZE = 5

  for (let i = 0; i < postIds.length; i += BATCH_SIZE) {
    const batch = postIds.slice(i, i + BATCH_SIZE)
    console.log(
      `Checking files ${i + 1} to ${Math.min(
        i + BATCH_SIZE,
        postIds.length,
      )} of ${postIds.length}`,
    )

    const batchPromises = batch.map(async (postId) => {
      try {
        const exists = await checkAudioExists(postId)

        if (exists) {
          const fullPath = path.join(POSTS_DIRECTORY, `${postId}.md`)
          const fileContents = fs.readFileSync(fullPath, 'utf8')
          const { data, content } = matter(fileContents)

          if (data.published) {
            return {
              id: postId,
              title: data.title,
              date: data.date,
              author: data.author,
              description: content.split('\n\n')[0].trim(),
            }
          }
        }
      } catch (err) {
        console.error(`Error processing ${postId}: ${err.message}`)
      }

      return null
    })

    const batchResults = await Promise.all(batchPromises)
    results.push(...batchResults.filter(Boolean))
  }

  results.sort((a, b) => new Date(b.date) - new Date(a.date))

  const outputDir = path.dirname(OUTPUT_FILE)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2))

  console.log(`Found ${results.length} posts with audio files`)
  console.log(`Results saved to ${OUTPUT_FILE}`)

  return results.length
}

;(async () => {
  try {
    await processAudioFiles()
    console.log('Audio file check completed successfully')
    process.exit(0)
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
})()
