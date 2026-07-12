import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

// Static hex equivalents of the .dark OKLCH tokens in globals.css — ImageResponse rasterizes
// to a plain PNG with no theme context, so CSS custom properties can't resolve here.
export const OG_COLORS = {
  bg: '#0a0c0f',
  surface: '#15171a',
  fg: '#eef0f3',
  muted: '#81878d',
  faint: '#44484d',
  line: '#242729',
  accent: '#baec5b',
  accent2: '#a9cd6d',
}

async function loadFont(filename: string) {
  return readFile(join(process.cwd(), 'src/lib/og-fonts', filename))
}

export async function loadOgFonts() {
  const [jbmMedium, jbmBold, newsreaderRegular, newsreaderSemiBold] = await Promise.all([
    loadFont('JetBrainsMono-Medium.woff'),
    loadFont('JetBrainsMono-Bold.woff'),
    loadFont('Newsreader-Regular.woff'),
    loadFont('Newsreader-SemiBold.woff'),
  ])

  return [
    { name: 'JetBrains Mono', data: jbmMedium, weight: 500 as const, style: 'normal' as const },
    { name: 'JetBrains Mono', data: jbmBold, weight: 700 as const, style: 'normal' as const },
    { name: 'Newsreader', data: newsreaderRegular, weight: 400 as const, style: 'normal' as const },
    { name: 'Newsreader', data: newsreaderSemiBold, weight: 600 as const, style: 'normal' as const },
  ]
}

export function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) return text
  const cut = text.slice(0, maxLength)
  const lastSpace = cut.lastIndexOf(' ')
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`
}

// Frozen mid-motion snapshot of the live EqualizerBars "eyebrow" variant (4 bars, 3px wide).
export function OgEqualizerBars() {
  const heights = [8, 20, 13, 22]
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', height: 22, gap: 3 }}>
      {heights.map((h, i) => (
        <div key={i} style={{ width: 3, height: h, background: OG_COLORS.accent, borderRadius: 1 }} />
      ))}
    </div>
  )
}

// Flattened recreation of LogoMark.tsx's chip/pins/asterisk mark — Satori's SVG support
// doesn't reliably cover <g> grouping, so stroke/strokeWidth are set per-element instead.
export function OgLogoMark({ size = 36 }: { size?: number }) {
  const pin = { stroke: OG_COLORS.fg, strokeWidth: 1.6, strokeLinecap: 'round' as const }
  const spark = { stroke: OG_COLORS.accent, strokeWidth: 1.7, strokeLinecap: 'round' as const }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="5" y="5" width="14" height="14" rx="3" stroke={OG_COLORS.fg} strokeWidth="1.6" />
      <line x1="9" y1="5" x2="9" y2="2.2" {...pin} />
      <line x1="15" y1="5" x2="15" y2="2.2" {...pin} />
      <line x1="9" y1="19" x2="9" y2="21.8" {...pin} />
      <line x1="15" y1="19" x2="15" y2="21.8" {...pin} />
      <line x1="5" y1="9" x2="2.2" y2="9" {...pin} />
      <line x1="5" y1="15" x2="2.2" y2="15" {...pin} />
      <line x1="19" y1="9" x2="21.8" y2="9" {...pin} />
      <line x1="19" y1="15" x2="21.8" y2="15" {...pin} />
      <line x1="12" y1="9.2" x2="12" y2="14.8" {...spark} />
      <line x1="9.2" y1="12" x2="14.8" y2="12" {...spark} />
      <line x1="10" y1="10" x2="14" y2="14" {...spark} />
      <line x1="14" y1="10" x2="10" y2="14" {...spark} />
    </svg>
  )
}

export function OgMasthead({ compact = false }: { compact?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <OgLogoMark size={compact ? 28 : 36} />
      <span
        style={{
          fontFamily: 'JetBrains Mono',
          fontWeight: 700,
          fontSize: compact ? 20 : 26,
          letterSpacing: '0.06em',
          color: OG_COLORS.fg,
        }}
      >
        AI SIGNAL
      </span>
    </div>
  )
}

export function OgFooterDomain() {
  return (
    <span style={{ fontFamily: 'JetBrains Mono', fontSize: 15, color: OG_COLORS.muted, letterSpacing: '0.02em' }}>
      ai-signal.sisqo.dev
    </span>
  )
}
