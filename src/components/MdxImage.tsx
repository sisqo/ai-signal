import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// Charts are generated as static SVGs (see scripts/generate-chart.mjs) whose fills/fonts
// reference the site's CSS custom properties (--color-*, --font-jetbrains-mono) instead of
// literal values. An <img src="chart.svg"> would freeze those at generation time, since an
// externally-referenced SVG document doesn't inherit the host page's CSS. Inlining the raw
// markup instead lets it sit in the same cascade as everything else, so it repaints correctly
// when the theme toggle flips light/dark.
export function MdxImage({ src, alt }: { src?: string; alt?: string }) {
  if (!src) return null

  if (src.startsWith('/') && src.endsWith('.svg')) {
    let svg: string
    try {
      svg = readFileSync(join(process.cwd(), 'public', src), 'utf-8')
    } catch {
      return null
    }
    return (
      <figure className="not-prose my-10">
        <div
          role="img"
          aria-label={alt}
          className="rounded-sm border border-line p-6"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
        {alt && <figcaption className="mt-3 font-mono text-sm tracking-wide text-muted">{alt}</figcaption>}
      </figure>
    )
  }

  return (
    <figure className="not-prose my-10">
      {/* eslint-disable-next-line @next/next/no-img-element -- non-chart images aren't supported yet; plain img is the honest minimal fallback rather than building unused next/image sizing infra */}
      <img src={src} alt={alt ?? ''} className="w-full rounded-sm border border-line" loading="lazy" />
      {alt && <figcaption className="mt-3 font-mono text-sm tracking-wide text-muted">{alt}</figcaption>}
    </figure>
  )
}
