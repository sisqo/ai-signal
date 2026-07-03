import { getAllArticles } from '@/lib/content'
import { FeaturedArticle, ArticleRow } from '@/components/ArticleIndexRow'

export default function HomePage() {
  const articles = getAllArticles()
  const featured = articles.find((a) => a.featured) ?? articles[0]
  const rest = articles.filter((a) => a.slug !== featured?.slug)

  return (
    <div className="mx-auto max-w-3xl px-6">
      <div className="border-b border-surface pt-4">
        {featured && <FeaturedArticle article={featured} readingTime={featured.readingTime} />}
      </div>

      <div className="pb-20">
        {rest.map((article) => (
          <ArticleRow key={article.slug} article={article} readingTime={article.readingTime} />
        ))}
      </div>
    </div>
  )
}
