import Link from 'next/link'
import { getPublishedArticles } from '@/lib/content'
import { FeaturedArticle, ArticleRow } from '@/components/ArticleIndexRow'

export const revalidate = 3600

const HOMEPAGE_ROW_LIMIT = 8

export default function HomePage() {
  const articles = getPublishedArticles()
  const featured = articles.find((a) => a.featured) ?? articles[0]
  const rest = articles.filter((a) => a.slug !== featured?.slug)
  const visible = rest.slice(0, HOMEPAGE_ROW_LIMIT)
  const hasMore = rest.length > HOMEPAGE_ROW_LIMIT

  return (
    <div className="mx-auto max-w-3xl px-6">
      <div className="border-b border-surface pt-4">
        {featured && <FeaturedArticle article={featured} readingTime={featured.readingTime} />}
      </div>

      <div className="pb-20">
        {visible.map((article) => (
          <ArticleRow key={article.slug} article={article} readingTime={article.readingTime} />
        ))}
        {hasMore && (
          <div className="pt-8">
            <Link
              href="/articles"
              className="inline-block rounded-sm px-7 py-3.5 font-mono text-xs font-medium tracking-wide text-ink transition-colors duration-150 ease-out-quart hover:bg-ink hover:text-bg"
            >
              View all articles
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
