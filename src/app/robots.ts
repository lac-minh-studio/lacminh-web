import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/domain/home/config/site-config'

export default function robots(): MetadataRoute.Robots {
  const base = (SITE_URL || 'https://lacminhstudio.com').replace(/\/$/, '')
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api'],
    },
    sitemap: `${base}/sitemap.xml`,
  }
}
