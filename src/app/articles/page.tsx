import type { Metadata } from 'next'
import { getAllArticles } from '@/lib/content'
import { ArticleRow } from '@/components/ArticleIndexRow'

export const metadata: Metadata = {
  title: 'All Articles',
  description: 'Every AI Signal article, most recent first.',
}

export default function ArticlesArchivePage() {
  const articles = getAllArticles()

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-4">
      <h1 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
        All Articles
      </h1>
      <div className="mt-10">
        {articles.map((article) => (
          <ArticleRow key={article.slug} article={article} readingTime={article.readingTime} />
        ))}
      </div>
    </div>
  )
}
