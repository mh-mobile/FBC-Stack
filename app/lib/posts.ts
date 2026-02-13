import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getAllToolsData } from './tools'
import { PostData } from '../../types/postData'
import { ToolData } from '../../types/toolData'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => ({
    id: fileName.replace(/\.md$/, ''),
  }))
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

export function getFilteredPostsData({ toolName, alias }: ToolData): PostData[] {
  const postsData = getSortedPostsData()
  return postsData.filter(({ stack }) =>
    stack.some(({ detail }) =>
      detail.some(
        ({ name }) =>
          name.toLowerCase() === toolName.toLowerCase() ||
          alias?.some((a) => a.toLowerCase() === name.toLowerCase()),
      ),
    ),
  )
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
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    return getPostData(id)
  })
  const publishedPostsData = allPostsData.filter(({ published }) => published)

  return publishedPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) return 1
    if (a > b) return -1
    return 0
  })
}
