import Link from 'next/link'
import type { ArticleMeta } from '@/lib/content'
import { formatDate } from '@/lib/content'

function MetaLine({ article, readingTime }: { article: ArticleMeta; readingTime: string }) {
  return (
    <p className="font-mono text-sm tracking-wide text-muted">
      <time dateTime={article.date}>{formatDate(article.date)}</time> &middot; {readingTime} &middot;{' '}
      <span className="text-accent">{article.tag}</span>
      {article.featured && <> &middot; Featured</>}
    </p>
  )
}

export function FeaturedArticle({ article, readingTime }: { article: ArticleMeta; readingTime: string }) {
  return (
    <article>
      <Link href={`/articles/${article.slug}`} className="group block py-10">
        <MetaLine article={article} readingTime={readingTime} />
        <h1 className="mt-3 font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink transition-colors duration-150 ease-out-quart group-hover:text-primary sm:text-6xl">
          {article.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{article.dek}</p>
      </Link>
    </article>
  )
}

export function ArticleRow({ article, readingTime }: { article: ArticleMeta; readingTime: string }) {
  return (
    <article>
      <Link href={`/articles/${article.slug}`} className="group block border-b border-surface py-8">
        <h2 className="font-display text-2xl font-medium leading-tight tracking-tight text-ink transition-colors duration-150 ease-out-quart group-hover:text-primary sm:text-3xl">
          {article.title}
        </h2>
        <p className="mt-2 max-w-xl text-muted">{article.dek}</p>
        <div className="mt-3">
          <MetaLine article={article} readingTime={readingTime} />
        </div>
      </Link>
    </article>
  )
}
