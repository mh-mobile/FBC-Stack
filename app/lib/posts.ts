import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getAllToolsData } from './tools'
import { PostData } from '../../types/postData'
import { ToolData } from '../../types/toolData'

const postsDirectory = path.join(process.cwd(), 'posts')

// Cache parsed posts to avoid repeated file I/O during build
let cachedSortedPosts: PostData[] | null = null

// 公開中（published: true）のサービスだけをページとして生成する
export function getAllPostIds() {
  return getSortedPostsData().map(({ id }) => ({ id }))
}

export function getFBCStackData() {
  return getPostData('fbc_stack')
}

export function getToolsName({ stack }: PostData): string[] {
  const toolSet = new Set<string>()
  stack.forEach(({ detail }) => detail.forEach(({ name }) => toolSet.add(name)))
  return Array.from(toolSet)
}

function createToolPathInfo(postData: PostData): { [key: string]: string } {
  const toolNames = getToolsName(postData)
  const allToolsData = getAllToolsData()

  return toolNames.reduce(
    (accum: { [key: string]: string }, current) => {
      for (const { toolID, toolName, alias } of allToolsData) {
        if (
          toolName?.toLowerCase() === current.toLowerCase() ||
          alias?.some((name) => name.toLowerCase() === current.toLowerCase())
        ) {
          accum[current] = toolID
          break
        }
      }
      return accum
    },
    {},
  )
}

export function getPostData(id: string): PostData {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const markdownContent = matterResult.content
  const toolPathInfo = createToolPathInfo(matterResult.data as PostData)

  return {
    ...(matterResult.data as PostData),
    id,
    markdownContent,
    toolPathInfo,
  }
}

// 構成要素だけを書いたサービスも、親ツールを採用しているものとして集計する
// （例: Stimulus / Turbo だけを記載 → Hotwire の採用にも数える）
export const IMPLIED_TOOLS: Record<string, string> = {
  turbo: 'hotwire',
  turbo_rails: 'hotwire',
  stimulus: 'hotwire',
  stimulus_rails: 'hotwire',
}

// サービスが採用しているツールIDの集合（重複なし、IMPLIED_TOOLS による親ツールを含む）。採用数の集計はすべてこれを使う
export function getPostToolIDs(post: PostData): Set<string> {
  const ids = new Set(Object.values(post.toolPathInfo ?? {}))
  ids.forEach((id) => {
    if (IMPLIED_TOOLS[id]) ids.add(IMPLIED_TOOLS[id])
  })
  return ids
}

export function getFilteredPostsData({ toolID }: ToolData): PostData[] {
  return getSortedPostsData().filter((post) => getPostToolIDs(post).has(toolID))
}

export function getToolsNameInPostsData(): string[] {
  const postDatas = getSortedPostsData()
  const toolsNameSet = postDatas
    .map(({ stack }) => stack)
    .flat()
    .map(({ detail }) => detail)
    .flat()
    .map(({ name }) => name)
    .reduce((accumulator: { [key: string]: boolean }, name) => {
      accumulator[name] = true
      return accumulator
    }, {})
  return Object.keys(toolsNameSet)
}

export function getSortedPostsData(): PostData[] {
  if (cachedSortedPosts) return cachedSortedPosts

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    return getPostData(id)
  })
  const publishedPostsData = allPostsData.filter(({ published }) => published)

  cachedSortedPosts = publishedPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) return 1
    if (a > b) return -1
    return 0
  })
  return cachedSortedPosts
}
