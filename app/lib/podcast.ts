import fs from 'fs'
import path from 'path'

const podcastDirectory = path.join(process.cwd(), 'podcast_data')

export type PodcastData = {
  id: string
  title: string
  date: string
  author: string
  audioUrl: string
  duration: number
  summary: string
  showNotes: { title: string; url?: string }[]
  chapters: { timestamp: string; title: string; startTime: number }[]
  transcriptUrl: string
}

export function getPodcastData(postId: string): PodcastData | null {
  const fullPath = path.join(podcastDirectory, `${postId}.json`)
  try {
    if (!fs.existsSync(fullPath)) return null
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    return JSON.parse(fileContents) as PodcastData
  } catch {
    return null
  }
}

export function getAllPodcastData(): PodcastData[] {
  try {
    const fileNames = fs.readdirSync(podcastDirectory)
    return fileNames
      .filter((f) => f.endsWith('.json'))
      .map((fileName) => {
        const fileContents = fs.readFileSync(
          path.join(podcastDirectory, fileName),
          'utf8',
        )
        return JSON.parse(fileContents) as PodcastData
      })
      .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  } catch {
    return []
  }
}
