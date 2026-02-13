import { getSortedPostsData } from './lib/posts'
import ServiceGrid from './components/ServiceGrid'

export default function Home() {
  const allPostsData = getSortedPostsData()

  return (
    <>
      <div className="pb-1 pt-4">
        <h1 className="text-xl font-bold">Services</h1>
        <p className="mt-1 text-sm text-light-text">
          FBC卒業生が作成したサービス一覧
        </p>
      </div>
      <div className="mt-3">
        <ServiceGrid posts={allPostsData} />
      </div>
    </>
  )
}
