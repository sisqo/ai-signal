import { ImageResponse } from 'next/og'
import { getAllSlugs, getArticleBySlug, isPublished, formatDate } from '@/lib/content'
import {
  OG_COLORS,
  OG_SIZE,
  OG_CONTENT_TYPE,
  loadOgFonts,
  truncate,
  OgMasthead,
  OgFooterDomain,
  OgEqualizerBars,
} from '@/lib/og-image'

export const alt = 'AI Signal article'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const revalidate = 3600

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  const fonts = await loadOgFonts()

  // A scheduled article's page 404s until its date arrives (see root CLAUDE.md's "Scheduled
  // publishing" section) — the social card must not leak its title/dek before then either.
  if (!article || !isPublished(article.date)) {
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            background: OG_COLORS.bg,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <OgMasthead />
        </div>
      ),
      { ...size, fonts }
    )
  }

  const titleSize = article.title.length <= 55 ? 60 : article.title.length <= 85 ? 50 : 42
  const title = truncate(article.title, 140)
  const dek = truncate(article.dek, 130)

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: OG_COLORS.bg,
          padding: '52px 64px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <OgMasthead compact />
          <OgEqualizerBars />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <span
              style={{
                fontFamily: 'JetBrains Mono',
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: '0.1em',
                color: OG_COLORS.accent,
              }}
            >
              {article.tag.toUpperCase()}
            </span>
            <span style={{ display: 'flex', fontFamily: 'JetBrains Mono', fontSize: 15, color: OG_COLORS.faint }}>
              &middot;
            </span>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 15, color: OG_COLORS.muted }}>
              {formatDate(article.date)}
            </span>
          </div>
          <span
            style={{
              fontFamily: 'Newsreader',
              fontWeight: 600,
              fontSize: titleSize,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: OG_COLORS.fg,
              maxWidth: 1060,
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontFamily: 'Newsreader',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 22,
              lineHeight: 1.5,
              color: OG_COLORS.muted,
              marginTop: 22,
              maxWidth: 900,
            }}
          >
            {dek}
          </span>
        </div>

        <div style={{ display: 'flex', width: '100%', height: 1, background: OG_COLORS.line }} />
        <div style={{ display: 'flex', marginTop: 22 }}>
          <OgFooterDomain />
        </div>
      </div>
    ),
    { ...size, fonts }
  )
}
