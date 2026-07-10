import type { Metadata } from 'next'
import { getPublishedArticles } from '@/lib/content'
import { ArticleRow } from '@/components/ArticleIndexRow'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'All Articles',
  description: 'Every AI Signal article, most recent first.',
}

export default function ArticlesArchivePage() {
  const articles = getPublishedArticles()

  return (
    <div className="max-w-feed px-[clamp(24px,5vw,72px)] pb-24 pt-[clamp(48px,7vw,104px)]">
      <h1
        className="font-display text-fg"
        style={{ fontSize: 'clamp(40px,5.4vw,78px)', fontWeight: 560, lineHeight: 0.98, letterSpacing: '-0.024em' }}
      >
        All Articles
      </h1>
      <div className="mt-14">
        {articles.map((article, i) => (
          <ArticleRow key={article.slug} article={article} readingTime={article.readingTime} index={i} />
        ))}
      </div>
    </div>
  )
}
