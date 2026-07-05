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

AI Signal is a **Next.js 15 App Router** editorial blog about AI, generated from MDX files. Single locale (English), no i18n.

**Content pipeline:**
- Articles live at `content/articles/<slug>.mdx`. Frontmatter fields: `title`, `slug`, `dek` (one-line teaser), `date`, `tag`, optional `featured`.
- `src/lib/content.ts` reads the directory with `gray-matter`, computes reading time with `reading-time`, and sorts by date descending. `getAllArticles()` returns every article regardless of date; `getPublishedArticles()` (built on `isPublished()`) filters to those whose `date` has started — use the latter almost everywhere, since it's what makes scheduled publishing work (see below).
- `src/app/articles/[slug]/page.tsx` renders the frontmatter-driven `<h1>`/dek itself, then renders the MDX body via `next-mdx-remote/rsc`. **The MDX body must not repeat the title as a leading `# H1`** — the template already renders it from frontmatter, so an MDX file should start directly with the lead paragraph or a `##` subsection.
- The homepage (`src/app/page.tsx`) picks the `featured: true` article among *published* ones (or falls back to the most recent published one) as a large lead treatment via `FeaturedArticle`, and renders the rest as hairline-divided rows via `ArticleRow` — both in `src/components/ArticleIndexRow.tsx`. This list is intentionally not a card grid (see DESIGN.md's anti-references).

**Scheduled publishing:**
- An article's `date` can be in the future — `/new-article`'s `--publish YYYY-MM-DD` flag writes, commits, and pushes it immediately, but it stays hidden until that date. This works because a handful of routes (`/`, `/articles`, `/articles/[slug]`, `sitemap.ts`, `rss.xml`, `atom.xml`, `feed.json`) are no longer pure build-time static output — they carry `export const revalidate = 3600`. That's **not** a timer that reruns them every hour on its own: Next's ISR is stale-while-revalidate, so a route only re-executes `isPublished()` against the current date when a *request* comes in more than an hour after its last render. In practice, the very first visitor to hit a scheduled article after its date has passed can still get one stale cached response (a 404, if that's the first hit since before the date) while a fresh render kicks off in the background — confirmed locally: a page built (and cached as 404) before its deadline served that stale 404 to the first request after the deadline, then flipped to 200 on the next request seconds later, with no rebuild involved. No rebuild, deploy hook, or cron is needed either way — the same deploy just starts showing the article once enough requests have flowed through past its date.
- "Published" means the article's date has started at **midnight Europe/Rome**, not UTC — `isPublished()` in `src/lib/content.ts` compares ISO date strings against `Intl.DateTimeFormat(..., { timeZone: 'Europe/Rome' })`'s idea of "today" rather than doing manual UTC-offset math, so it doesn't need special-casing for CET/CEST.
- Visiting a scheduled article's URL directly before its date returns a 404, same as if the slug didn't exist — `generateStaticParams()` still pre-builds every article's page (including future-dated ones) so the content is genuinely already deployed, but the page itself calls `notFound()` (and `generateMetadata` returns `{}`) until `isPublished()` is true.
- Precision is date-only (no time-of-day) by design — the frontmatter schema is unchanged, and staleness is bounded by the 1-hour revalidation window (plus whatever gap there is until the next actual request), not an exact minute. There's no dedicated tool for tracking what's queued; `grep date: content/articles/*.mdx` is enough at this blog's volume.

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

## Editorial Guidelines

Voice, structure, and sourcing rules for every post in `content/articles/`. This is the single source of truth for editorial style — `new-article`'s writing step defers to this section rather than restating it; don't let the two drift apart.

- **Cold open, no throat-clearing.** Every article opens on a concrete fact, date, or number — never a generic framing sentence ("In today's fast-moving AI landscape..."). This is the most consistent trait across published posts; keep it that way.
- **Every piece works for both readers.** `PRODUCT.md` defines two overlapping audiences — practitioners who want depth without condescension, and tech-curious generalists who want a concept, trend, or implication explained clearly. Don't solve this by splitting coverage into "some deep pieces, some accessible ones" — write every single piece as an inverted pyramid instead. The opening (the cold-open fact plus the paragraph or two after it) has to work for a reader who's never touched the tool or heard of the benchmark: state the stake or implication in plain terms before anything else. Only after that does the piece descend into the technical mechanism, data, or architecture for the reader who wants it. A reader who stops after two paragraphs should still walk away understanding why the story matters — titles and deks can stay as specific and insider-facing as the story calls for (that's not where this rule applies); it's the body's job to carry a reader in.
- **Gloss jargon on first use.** Any acronym, benchmark name, or specialist term (CVSS, SWE-Bench, ISR, token pricing, and the like) gets a short plain-English gloss — a parenthetical or an appositive — the first time it appears in a piece. Always, not just for terms that seem obscure; that judgment call is exactly how coverage quietly drifts back to insider-only. It costs the practitioner reader a few words and keeps the rest of the piece legible to everyone else.
- **Invisible narrator.** No first person ("I think") and no editorial "we" for the publication itself. Reserve direct second-person ("you") for closing/advice sections that tell the reader what to do — keep it out of body analysis.
- **Voice:** direct, concrete, opinionated where earned, real names/dates/numbers instead of vague hand-waving, no AI-blog filler ("in today's fast-paced world of..."), no unearned hype.
- **American English** spelling throughout (color, program, license, etc.).
- **Structure:** a few `##` sections; a comparison table or code block only if the topic genuinely calls for one; a closing section that gives the reader something actionable, not a recap of what was just said. Length follows the topic — existing posts run roughly 600–1000 words, not a hard limit.
- **Titles:** don't lean on "Actually" / "Really" / "Truly" to promise the piece cuts through hype — earn that through the title's specificity instead.
- **Cite everything citable.** Any specific external claim with a findable URL — an announcement, survey, benchmark, repo, docs page — gets an inline markdown link on first mention. No exception for "well-known" sources.
- **Link other AI Signal articles too**, the same way: when referencing another published piece by name, hyperlink it (`[our article on X](/articles/slug)`) rather than a bare prose mention.
- **Tags:** reuse an existing tag (`Tools`, `Industry`, `Society`) if the topic reasonably fits; keep the vocabulary small and curated. `Tools` is practitioner-facing coverage of specific tools, frameworks, and comparisons. `Industry` is company and strategic moves — funding, M&A, research initiatives, org changes. `Society` is policy and regulation, work/societal impact, and consumer-facing AI products — stories whose primary relevance is to a general reader, not just tech-industry watchers. Add a new tag only when a topic genuinely doesn't fit any existing one — don't pre-invent categories for stories that haven't been written yet.
