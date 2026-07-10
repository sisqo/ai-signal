import Link from 'next/link'
import { getPublishedArticles } from '@/lib/content'
import { FeaturedArticle, ArticleRow } from '@/components/ArticleIndexRow'

export const revalidate = 3600

const HOMEPAGE_ROW_LIMIT = 8

export default function HomePage() {
  const articles = getPublishedArticles()
  const featured = articles[0]
  const rest = articles.slice(1)
  const visible = rest.slice(0, HOMEPAGE_ROW_LIMIT)
  const hasMore = rest.length > HOMEPAGE_ROW_LIMIT

  return (
    <div className="max-w-feed px-[clamp(24px,5vw,72px)] pb-10 pt-[clamp(48px,7vw,104px)]">
      {featured && <FeaturedArticle article={featured} readingTime={featured.readingTime} />}

      {visible.length > 0 && (
        <>
          <div className="flex items-center gap-5" style={{ margin: '88px 0 8px' }}>
            <span className="font-mono text-[13px] tracking-[0.16em] text-faint">MORE FROM THE WIRE</span>
            <div className="h-px flex-1 bg-line" />
          </div>

          {visible.map((article, i) => (
            <ArticleRow key={article.slug} article={article} readingTime={article.readingTime} index={i} />
          ))}
        </>
      )}

      {hasMore && (
        <div className="pt-10">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2.5 font-mono text-[13px] text-accent transition-[gap] duration-200 hover:gap-4"
          >
            VIEW ALL ARTICLES <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
    </div>
  )
}
