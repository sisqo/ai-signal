# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server with Turbopack
npm run build    # production build with Turbopack
npm start        # serve production build (run build first)
npm run lint     # eslint .
```

No test runner is configured. There is no separate typecheck script; use `npx tsc --noEmit`.

## Architecture

AI Signal is a **Next.js 15 App Router** editorial blog about AI, statically generated at build time from MDX files. Single locale (English), no i18n.

**Content pipeline:**
- Articles live at `content/articles/<slug>.mdx`. Frontmatter fields: `title`, `slug`, `dek` (one-line teaser), `date`, `tag`, optional `featured`.
- `src/lib/content.ts` reads the directory with `gray-matter`, computes reading time with `reading-time`, and sorts by date descending.
- `src/app/articles/[slug]/page.tsx` renders the frontmatter-driven `<h1>`/dek itself, then renders the MDX body via `next-mdx-remote/rsc`. **The MDX body must not repeat the title as a leading `# H1`** — the template already renders it from frontmatter, so an MDX file should start directly with the lead paragraph or a `##` subsection.
- The homepage (`src/app/page.tsx`) picks the `featured: true` article (or falls back to the most recent) as a large lead treatment via `FeaturedArticle`, and renders the rest as hairline-divided rows via `ArticleRow` — both in `src/components/ArticleIndexRow.tsx`. This list is intentionally not a card grid (see DESIGN.md's anti-references).

**Design system:**
- `PRODUCT.md` (strategic brief) and `DESIGN.md` (token-level visual spec: colors, type scale, component rules, in Google Stitch format) are the source of truth for any design work — read them before changing styling. `.impeccable/design.json` is a gitignored sidecar for the impeccable skill's live-iteration tool; regenerate it with `/impeccable document` if it drifts from DESIGN.md, don't hand-maintain it.
- Colors are OKLCH CSS custom properties in `src/app/globals.css` (`:root` = light, `.dark` = dark override), surfaced as Tailwind color names (`bg`, `surface`, `ink`, `muted`, `primary`, `accent`) in `tailwind.config.js`. Dark is the default theme (`src/app/providers.tsx`, `next-themes` with `defaultTheme="dark"`, `enableSystem={false}`) — light is fully supported via the header toggle, just not the initial state.
- **Tailwind Typography gotcha:** `@tailwindcss/typography`'s `prose-invert` variant does *not* automatically inherit the `DEFAULT` theme's custom overrides (blockquote/code/link rules etc.) — it's a fully separate theme key. `tailwind.config.js` works around this by building one `shared` css object and spreading it into both `DEFAULT` and `invert`. If you add a new prose override, add it to that shared object, not just `DEFAULT`, or it will silently revert to Tailwind's defaults in dark mode (this previously caused a stray border-left on blockquotes in dark mode).
- Fenced code blocks (`pre`) get a deliberate fixed near-black panel (`#0f0d0c` bg / `#f1eeec` text) regardless of page theme — a "terminal" treatment, not Tailwind's default slate. Inline `code` uses the theme-adaptive `surface`/`ink` tokens instead.
- Fonts: Fraunces (display/serif), Public Sans (body), JetBrains Mono (labels/metadata/code) loaded via `next/font/google` in `src/lib/fonts.ts` and exposed as CSS variables consumed by `tailwind.config.js`'s `fontFamily`.

**Logo:**
- `src/components/LogoMark.tsx` is an inline SVG using `fill="currentColor"` (recolors with the wrapping element's text color — brand navy `#12314f` in light mode, white in dark, set at each call site) plus Tailwind's `fill-bg`/`stroke-bg` utilities for the mark's cutout details (so those stay theme-adaptive too).
- Its `viewBox="212 236.5 600 600"` is a deliberately tight crop computed from the source artwork's actual bounding box — the original supplied `logo.svg` has a `0 0 1024 1024` viewBox where the mark only fills about half the canvas. If the logo art is ever swapped, recompute the crop (render at high res, take the alpha-channel bbox) rather than reusing these numbers verbatim.
- Static favicons/icons (`src/app/icon0.png`, `icon1.svg`, `apple-icon.png`, `public/icon-192.png`, `public/icon-512.png`, referenced from `src/app/manifest.ts`) were rasterized from the same source SVG with a one-off Python/cairo script — there's no npm script for this; regenerating them after a logo change is a manual step.

**Deployment:**
- Vercel project `ai-signal` (team scope `sisqoz`), domain `ai-signal.sisqo.dev`, auto-deploys on push to `main`.
- `vercel.json` pins `"framework": "nextjs"`. This is load-bearing, not decorative: the Vercel project was created before any code existed, so Vercel persisted a stale "Other" framework preset with a static `public/` output directory expectation. Without the override, builds succeed locally but fail on Vercel looking for a `public/` dir. Don't remove it.
