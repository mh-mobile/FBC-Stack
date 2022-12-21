import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getAllToolsData } from './tools'
import { PostData } from '../types/postData'
import { ToolData } from '../types/toolData'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export async function getFBCStackData() {
  return getPostData('fbc_stack')
}

export function getToolsName({ stack }: PostData) {
  let toolSet = new Set<string>()
  stack.forEach(({ detail }) => detail.forEach(({ name }) => toolSet.add(name)))
  return Array.from(toolSet)
}

function createToolPathInfo(postData: PostData) {
  const toolNames = getToolsName(postData)
  const allToolsData = getAllToolsData()

  const pathInfo = toolNames.reduce((accum, current) => {
    for (let { toolID, toolName, alias } of allToolsData) {
      if (
        toolName?.toLowerCase() === current.toLowerCase() ||
        alias?.some((name) => name.toLowerCase() === current.toLowerCase())
      ) {
        accum[current] = toolID
        break
      }
    }
    return accum
  }, {})

  return pathInfo
}

export function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)
  const markdownContent = matterResult.content
  const toolNames = getToolsName(matterResult.data as PostData)
  const toolPathInfo = createToolPathInfo(matterResult.data as PostData)

  return {
    id,
    markdownContent,
    toolPathInfo,
    ...(matterResult.data as PostData),
  }
}

export async function getFilteredPostsData({ toolName, alias }: ToolData) {
  const postsData = await getSortedPostsData()
  return postsData.filter(({ stack }) => {
    return stack.some(({ detail }) =>
      detail.some(
        ({ name }) =>
          name.toLowerCase() === toolName.toLowerCase() ||
          alias?.some((alias) => alias.toLowerCase() === name.toLowerCase()),
      ),
    )
  })
}

export async function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    return getPostData(id)
  })
  const publishedPostsData = allPostsData.filter(({ published }) => published)

  return publishedPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}
