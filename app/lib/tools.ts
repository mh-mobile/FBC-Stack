import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { ToolData } from '../../types/toolData'

const toolsDirectory = path.join(process.cwd(), 'tools')

export function getAllToolsData(): ToolData[] {
  const fileNames = fs.readdirSync(toolsDirectory)
  return fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    return getToolData(id)
  })
}

export function getToolData(id: string): ToolData {
  const fullPath = path.join(toolsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  return {
    ...(matterResult.data as ToolData),
    toolID: id,
    markdownContent: matterResult.content,
  }
}
