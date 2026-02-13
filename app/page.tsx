import { getSortedPostsData } from './lib/posts'
import ServiceGrid from './components/ServiceGrid'

export default function Home() {
  const allPostsData = getSortedPostsData()

  return (
    <>
      <div className="flex items-center justify-center py-2">
        <h1 className="text-4xl font-extrabold tracking-tight">FBC Stack</h1>
      </div>
      <h2 className="px-4 py-3 text-2xl font-bold">Services</h2>
      <ServiceGrid posts={allPostsData} />
    </>
  )
}
