import Link from 'next/link'
import type { ArticleMeta } from '@/lib/content'
import { formatDate } from '@/lib/content'
import { EqualizerBars } from './EqualizerBars'

export function MetaLine({
  article,
  readingTime,
  tagClassName = 'text-accent-2',
}: {
  article: ArticleMeta
  readingTime: string
  tagClassName?: string
}) {
  return (
    <p className="font-mono text-sm tracking-wide text-faint">
      <time dateTime={article.date}>{formatDate(article.date)}</time> &middot; {readingTime} &middot;{' '}
      <span className={tagClassName}>{article.tag}</span>
    </p>
  )
}

export function FeaturedArticle({ article, readingTime }: { article: ArticleMeta; readingTime: string }) {
  return (
    <article className="animate-[fadeUp_0.6s_ease_both]">
      <Link href={`/articles/${article.slug}`} className="group block">
        <div className="flex items-center gap-4" style={{ marginBottom: '26px' }}>
          <EqualizerBars variant="eyebrow" />
          <span className="font-mono text-[13px] tracking-[0.12em] text-accent">LATEST DISPATCH</span>
        </div>
        <div style={{ marginBottom: '22px' }}>
          <MetaLine article={article} readingTime={readingTime} tagClassName="text-accent" />
        </div>
        <h1
          className="font-display text-[clamp(32px,4.6vw,72px)] text-fg transition-colors duration-200 group-hover:text-accent"
          style={{ fontWeight: 560, lineHeight: 0.94, letterSpacing: '-0.028em' }}
        >
          {article.title}
        </h1>
        <p
          className="max-w-[680px] text-[clamp(18px,1.5vw,23px)] leading-[1.5] text-muted"
          style={{ marginTop: '32px' }}
        >
          {article.dek}
        </p>
        <div
          className="inline-flex items-center gap-2.5 font-mono text-[13px] text-accent transition-[gap] duration-200 group-hover:gap-4"
          style={{ marginTop: '26px' }}
        >
          READ DISPATCH <span aria-hidden="true">→</span>
        </div>
      </Link>
    </article>
  )
}

export function ArticleRow({
  article,
  readingTime,
  index,
}: {
  article: ArticleMeta
  readingTime: string
  index: number
}) {
  return (
    <article>
      <Link
        href={`/articles/${article.slug}`}
        className="group grid grid-cols-[clamp(72px,10vw,150px)_1fr] items-start gap-[clamp(18px,3vw,48px)] border-b border-line py-10 text-faint transition duration-300 ease-out hover:translate-x-2.5 hover:text-accent"
      >
        <div
          className="font-display text-[clamp(52px,7vw,104px)] transition-colors duration-300"
          style={{
            fontWeight: 500,
            lineHeight: 0.8,
            WebkitTextStroke: '1.4px currentColor',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className="max-w-[840px]">
          <h2
            className="font-display text-[clamp(28px,3.4vw,48px)] text-fg transition-colors duration-200 group-hover:text-accent"
            style={{ fontWeight: 540, lineHeight: 1.03, letterSpacing: '-0.017em' }}
          >
            {article.title}
          </h2>
          <p className="max-w-[600px] text-[17px] leading-[1.5] text-muted" style={{ marginTop: '16px' }}>
            {article.dek}
          </p>
          <div style={{ marginTop: '18px' }}>
            <MetaLine article={article} readingTime={readingTime} />
          </div>
        </div>
      </Link>
    </article>
  )
}
