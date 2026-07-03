import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import type { Metadata } from 'next'
import { getAllSlugs, getArticleBySlug, formatDate } from '@/lib/content'

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.dek,
    openGraph: { title: article.title, description: article.dek, type: 'article' },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-4">
      <p className="font-mono text-sm tracking-wide text-muted">
        {formatDate(article.date)} &middot; {article.readingTime} &middot;{' '}
        <span className="text-accent">{article.tag}</span>
      </p>
      <h1 className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
        {article.title}
      </h1>
      <p className="mt-6 max-w-2xl text-xl text-muted">{article.dek}</p>

      <div className="prose prose-lg mt-14 max-w-none dark:prose-invert">
        <MDXRemote source={article.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </div>
    </article>
  )
}
