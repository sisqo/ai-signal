import { ImageResponse } from 'next/og'
import { OG_COLORS, OG_SIZE, OG_CONTENT_TYPE, loadOgFonts, OgMasthead, OgFooterDomain, OgEqualizerBars } from '@/lib/og-image'

export const alt = 'AI Signal — Notes on artificial intelligence'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
  const fonts = await loadOgFonts()

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: OG_COLORS.bg,
          padding: '56px 64px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <OgMasthead />
          <OgEqualizerBars />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
          <span
            style={{
              fontFamily: 'JetBrains Mono',
              fontWeight: 500,
              fontSize: 16,
              letterSpacing: '0.12em',
              color: OG_COLORS.accent,
              marginBottom: 22,
            }}
          >
            THE AI BEAT
          </span>
          <span
            style={{
              fontFamily: 'Newsreader',
              fontWeight: 600,
              fontSize: 68,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: OG_COLORS.fg,
              maxWidth: 980,
            }}
          >
            Notes on artificial intelligence
          </span>
          <span
            style={{
              fontFamily: 'Newsreader',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 26,
              lineHeight: 1.5,
              color: OG_COLORS.muted,
              marginTop: 26,
              maxWidth: 820,
            }}
          >
            An editorial-quality blog about artificial intelligence, for practitioners and the curious alike.
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', width: '100%', height: 1, background: OG_COLORS.line }} />
        </div>
        <div style={{ display: 'flex', marginTop: 24 }}>
          <OgFooterDomain />
        </div>
      </div>
    ),
    { ...size, fonts }
  )
}
