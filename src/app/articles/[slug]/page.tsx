import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import type { Metadata } from 'next'
import { getAllSlugs, getArticleBySlug, isPublished } from '@/lib/content'
import { MdxImage } from '@/components/MdxImage'
import { MetaLine } from '@/components/ArticleIndexRow'
import { ReadingProgress } from '@/components/ReadingProgress'

export const revalidate = 3600

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article || !isPublished(article.date)) return {}
  return {
    title: article.title,
    description: article.dek,
    openGraph: { title: article.title, description: article.dek, type: 'article' },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article || !isPublished(article.date)) notFound()

  return (
    <>
      <ReadingProgress />
      <article className="mx-auto max-w-copy animate-[fadeUp_0.5s_ease_both] px-[clamp(24px,5vw,72px)] pb-10 pt-[clamp(28px,4vw,60px)]">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 font-mono text-[13px] text-muted transition-colors duration-200 hover:text-accent"
        >
          ← Back to the wire
        </Link>
        <div style={{ marginBottom: '24px' }}>
          <MetaLine article={article} readingTime={article.readingTime} tagClassName="text-accent" />
        </div>
        <h1
          className="font-display text-fg"
          style={{ fontSize: 'clamp(30px,3.6vw,52px)', fontWeight: 560, lineHeight: 1.02, letterSpacing: '-0.02em' }}
        >
          {article.title}
        </h1>
        <p
          className="font-display italic text-muted"
          style={{ marginTop: '28px', fontSize: 'clamp(19px,1.6vw,24px)', lineHeight: 1.5 }}
        >
          {article.dek}
        </p>
        <div className="h-px bg-line" style={{ margin: '46px 0' }} />

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <MDXRemote
            source={article.content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            components={{ img: MdxImage }}
          />
        </div>

        <div className="h-px bg-line" style={{ margin: '56px 0 40px' }} />
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 font-mono text-sm text-accent transition-[gap] duration-200 hover:gap-4"
        >
          More from AI Signal <span aria-hidden="true">→</span>
        </Link>
      </article>
    </>
  )
}
