import type { MetadataRoute } from 'next'
import { getSortedPostsData } from './lib/posts'
import { getAllToolsData } from './lib/tools'
import { SITE_URL } from './lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/', '/tools', '/stats', '/about', '/terms', '/privacy']
  return [
    ...pages.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...getSortedPostsData().map(({ id, date }) => ({
      url: `${SITE_URL}/posts/${id}`,
      lastModified: date,
    })),
    ...getAllToolsData().map(({ toolID }) => ({ url: `${SITE_URL}/tools/${toolID}` })),
  ]
}
