import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { ToolData } from '../../types/toolData'

const toolsDirectory = path.join(process.cwd(), 'tools')
const toolIconDirectory = path.join(process.cwd(), 'public', 'images', 'tool')

// Cache parsed tools to avoid repeated file I/O during build
let cachedAllTools: ToolData[] | null = null

export function getAllToolsData(): ToolData[] {
  if (cachedAllTools) return cachedAllTools

  const fileNames = fs.readdirSync(toolsDirectory)
  cachedAllTools = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    return getToolData(id)
  })
  return cachedAllTools
}

export function findToolByName(name: string): ToolData | undefined {
  const lower = name.toLowerCase()
  return getAllToolsData().find(
    (t) =>
      t.toolName.toLowerCase() === lower ||
      t.alias?.some((a) => a.toLowerCase() === lower),
  )
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

let cachedIconIDs: Set<string> | null = null

// ロゴ画像があるか（無いツールは画像を取りに行かず頭文字を表示する）
export function hasToolIcon(id: string): boolean {
  if (!cachedIconIDs) {
    cachedIconIDs = new Set(
      fs.readdirSync(toolIconDirectory).map((file) => file.replace(/\.png$/, '')),
    )
  }
  return cachedIconIDs.has(id)
}
