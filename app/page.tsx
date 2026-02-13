import { getSortedPostsData } from './lib/posts'
import ServiceGrid from './components/ServiceGrid'

// Extract unique stack categories from all posts
function getCategories(posts: { stack: { name: string }[] }[]): string[] {
  const categoryCount = new Map<string, number>()
  for (const post of posts) {
    for (const stackItem of post.stack) {
      categoryCount.set(
        stackItem.name,
        (categoryCount.get(stackItem.name) || 0) + 1,
      )
    }
  }
  // Sort by frequency (most used first)
  return Array.from(categoryCount.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => name)
}

export default function Home() {
  const allPostsData = getSortedPostsData()
  const categories = getCategories(allPostsData)

  return (
    <>
      <div className="flex items-center justify-center py-2">
        <h1 className="text-4xl font-extrabold tracking-tight">FBC Stack</h1>
      </div>
      <h2 className="px-4 py-3 text-2xl font-bold">Services</h2>
      <ServiceGrid posts={allPostsData} categories={categories} />
    </>
  )
}
