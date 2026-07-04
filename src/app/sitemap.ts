import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/content'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles()

  return [
    { url: SITE_URL, lastModified: articles[0]?.date, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/articles`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.3 },
    ...articles.map((article) => ({
      url: `${SITE_URL}/articles/${article.slug}`,
      lastModified: article.date,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
