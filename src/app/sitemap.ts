import type { MetadataRoute } from 'next'
import { JOB_POSITIONS } from '@/data/careers'
import { SITE_URL } from '@/const'

const BASE_URL = SITE_URL || 'https://lacminhstudio.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()

  // Static routes
  const base = BASE_URL.replace(/\/$/, '')

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${base}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${base}/careers`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${base}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Dynamic career routes (từ data hiện tại)
  const careerRoutes: MetadataRoute.Sitemap = JOB_POSITIONS.map((job) => ({
    url: `${base}/careers/${job.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...careerRoutes]
}
