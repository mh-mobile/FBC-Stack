import type { Stack } from './stack'

type GitHubRepository = {
  repository: string
  description: string[]
}

export type PostData = {
  id: string
  date: string
  title: string
  author: string
  website?: string
  blog?: string
  deepwiki?: string // Added deepwiki field
  published: boolean
  hasAudio: boolean
  code: GitHubRepository[]
  stack: Stack
  toolPathInfo?: { [key: string]: string }
  markdownContent: string
}
