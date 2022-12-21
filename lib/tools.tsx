import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { ToolData } from '../types/toolData'

const toolsDirectory = path.join(process.cwd(), 'tools')

export function getAllToolsData() {
  const fileNames = fs.readdirSync(toolsDirectory)
  const allToolsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    return getToolData(id)
  })
  return allToolsData
}

export function getToolData(id: string) {
  const fullPath = path.join(toolsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)
  const markdownContent = matterResult.content

  const data = {
    toolID: id,
    markdownContent,
    ...(matterResult.data as ToolData),
  }

  return data
}
