---
name: AI Signal
description: An editorial-quality blog about artificial intelligence
colors:
  bg-light: "#ffffff"
  surface-light: "#f3f3f3"
  ink-light: "#15100d"
  muted-light: "#5b5755"
  primary-light: "#bc5000"
  accent-light: "#004868"
  bg-dark: "#020202"
  surface-dark: "#0f0d0c"
  ink-dark: "#f1eeec"
  muted-dark: "#9b9795"
  primary-dark: "#ee8628"
  accent-dark: "#008292"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.75rem, 1.75rem + 5vw, 5rem)"
    fontWeight: 460
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.75rem, 1.35rem + 2vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Public Sans, -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Public Sans, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  none: "0px"
  sm: "4px"
  md: "8px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.primary-light}"
    textColor: "{colors.bg-light}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.ink-light}"
    textColor: "{colors.bg-light}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-light}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "14px 28px"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.accent-light}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0px"
---

# Design System: AI Signal

## 1. Overview

**Creative North Star: "The Quiet Signal"**

AI Signal is what's left when the noise of AI-startup marketing is stripped away: a well-set page, a confident headline, enough white space to think in. The system takes its cue from a well-edited magazine or a serious independent newsletter — the kind of publication where the typography does the persuading and the interface gets out of the way. Warmth comes from one honey-amber ink used with intent, not from a beige backdrop; precision comes from a strict type scale and a flat, hairline-divided layout, not from cards and shadows.

The system explicitly rejects wiki/documentation coldness — no tabular layouts, no neutral system-font hierarchy, no sterile density — and just as explicitly rejects the generic AI-SaaS template: no cream/sand backgrounds, no gradient text, no hero section with fake metrics, no identical icon-and-heading card grids, no tiny uppercase eyebrow sitting above every section.

**Key Characteristics:**
- Pure white (light) / near-black (dark) surfaces — the warmth lives in the amber primary and the serif display face, never in the background. Dark is the default on first visit; light remains a fully designed, equally correct alternate, not an afterthought.
- Editorial index, not a card grid: articles are a hairline-divided list with one featured lead story, the way a front page works.
- One warm primary (honey-amber) and one cool accent (deep teal), each used for a distinct job, never blended into a gradient.
- A quiet monospace label face for metadata (date, reading time, tag) — a technical wink for the practitioner reader, never the body face.

## 2. Colors

The palette is deliberately narrow: near-neutral architecture (pure white/black, one hairline gray) plus exactly two brand colors, each with one job. OKLCH values are canonical; hex in the frontmatter is the sRGB projection for tooling compliance.

### Primary
- **Honey Amber** (`#bc5000` light / `#ee8628` dark — `oklch(0.56 0.17 55)` / `oklch(0.72 0.16 57)`): the single warm signature color. Used for links, the primary CTA fill, hover underlines, and the lead story's headline rule. Verified 4.91:1 (light) and 7.97:1 (dark) against body background; white text on the light-mode fill hits 4.91:1, near-black text on the dark-mode fill hits 7.25:1.

### Logo (fixed, theme-independent)
- **Brand Navy** (`#12314f`): the supplied logomark's only color — a chip/circuit icon with a signal-style spark at its center. It does not participate in the primary/accent system and never changes with the color strategy. It renders as-is (navy) on light backgrounds; in dark mode the mark switches to white via `currentColor` so it stays legible against Near-Black, the one place in the system where a color is swapped purely for contrast rather than for meaning.

### Secondary
- **Deep Teal** (`#004868` light / `#008292` dark — `oklch(0.36 0.12 220)` / `oklch(0.54 0.13 205)`): the cool counterpoint to amber. Reserved for tags/category labels and secondary links — anything that needs to read as "metadata" rather than "primary action." Never appears in the same control as primary. Contrast against primary verified at 2.00:1 (light) / 1.75:1 (dark) — always visually distinguishable when adjacent.

### Neutral
- **Paper White** (`#ffffff` — `oklch(1.000 0.000 0)`): body background, light mode. Pure white, zero chroma — deliberately not the warm-cream "AI default." Warmth is carried by primary and typography only.
- **Ink** (`#15100d` — `oklch(0.18 0.01 55)`): body text, light mode. 18.83:1 against Paper White.
- **Muted Ink** (`#5b5755` — `oklch(0.46 0.006 55)`): secondary text, captions, timestamps prose. 7.14:1 against Paper White.
- **Hairline Gray** (`#f3f3f3` — `oklch(0.965 0.000 0)`): the only surface tint — section dividers, subtle card-free grouping. Zero brand hue, so it never drifts toward cream.
- **Near-Black** (`#020202` — `oklch(0.09 0.000 0)`): body background, dark mode. True near-black, zero chroma.
- **Paper Ink (dark)** (`#f1eeec` — `oklch(0.95 0.004 55)`): body text, dark mode. 17.87:1 against Near-Black.
- **Muted Ink (dark)** (`#9b9795` — `oklch(0.68 0.006 55)`): secondary text, dark mode. 7.17:1 against Near-Black.
- **Elevated Charcoal** (`#0f0d0c` — `oklch(0.16 0.004 55)`): the dark-mode surface tint, for the same sparing role as Hairline Gray.

### Named Rules
**The One-Job Rule.** Primary (amber) means "action or emphasis." Accent (teal) means "metadata or category." A color never does both jobs on the same page — if teal starts marking links, retire amber from links entirely.

**The No-Cream Rule.** Body background is pure white or true near-black, full stop. If a background ever reads as cream, sand, or parchment, it has drifted and must be corrected back to zero chroma.

## 3. Typography

**Display Font:** Fraunces (with Georgia, serif fallback)
**Body Font:** Public Sans (with -apple-system, sans-serif fallback)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, monospace fallback)

**Character:** Fraunces is a warm, slightly soft transitional serif — it carries the "considered magazine" feeling in headlines without tipping into the overused Playfair-Display cliché. Public Sans is a humanist grotesk built for long reading sessions: even color, no gimmicks. JetBrains Mono appears only at small sizes, for metadata — a quiet nod to the practitioner half of the audience.

### Hierarchy
- **Display** (460, `clamp(2.75rem, 1.75rem + 5vw, 5rem)`, 1.05): article titles and the homepage masthead lead. `text-wrap: balance`.
- **Headline** (500, `clamp(1.75rem, 1.35rem + 2vw, 2.75rem)`, 1.15): section headers, secondary article-list titles.
- **Title** (600, 1.25rem, 1.3): card-free sub-groupings, author names, pull-quote attribution.
- **Body** (400, 1.125rem, 1.7): article prose. Capped at 68ch measure. `text-wrap: pretty`.
- **Label** (500, 0.8125rem, 1.4, `0.02em` tracking): byline, date, reading time, category tag — always attached to a specific piece of metadata, never floating above a section as a kicker.

### Named Rules
**The Two-Voice Rule.** Only two families carry real reading weight: Fraunces for anything the reader scans, Public Sans for anything the reader reads continuously. JetBrains Mono is a label face only — it never sets a full sentence.

**The No-Kicker Rule.** Uppercase tracked mono labels attach to a byline, a date, or a tag. They never sit alone above a heading as a section eyebrow.

## 4. Elevation

Flat by design — there is no shadow vocabulary. Depth and grouping come from the Hairline Gray / Elevated Charcoal surface tint and from generous whitespace (the `spacing.lg` / `spacing.xl` steps), the way a printed page uses margin and rule lines instead of drop shadows. The one physical touch is the 1px hairline border (Hairline Gray at full opacity in light mode, a low-opacity Paper Ink in dark mode) used to separate list rows and the sticky header from content below it.

### Named Rules
**The Flat-By-Default Rule.** No `box-shadow` anywhere in the system. If something needs to feel "raised," widen its margin or add a hairline rule — never a shadow.

## 5. Components

### Buttons
- **Shape:** barely-rounded corners (4px, `rounded.sm`) — enough to soften, not enough to feel like an app.
- **Primary:** Honey Amber fill, Paper White text (light) / Ink text (dark), Label typography, `14px 28px` padding. Reserved for a single, deliberate per-page action — not currently used anywhere in the shipped site.
- **Hover / Focus:** background shifts to Ink (light) / Paper Ink (dark) over 160ms ease-out-quart; focus-visible gets a 2px Honey Amber outline offset 2px.
- **Ghost:** transparent background, Ink text, same padding/shape — used for secondary actions ("Read more," pagination).

### Tags
- **Style:** no background fill, no border, no pill shape — just Deep Teal Label-face text. Sits inline with byline metadata, never as a standalone badge grid.
- **State:** deliberately inert — no hover/underline state of its own, no "selected" state. Tag filtering doesn't exist yet; giving the tag a distinct hover treatment before that destination is real would make it look clickable-but-broken rather than restrained. Revisit this the day tag-filtered views ship, not before.

### Article Index Row (signature component)
Replaces the card grid entirely. Each entry: Headline-weight title (Fraunces), a single-line Muted Ink dek in Body face, and a Label-face metadata line (date · reading time · tag in Deep Teal). Rows are separated by a 1px Hairline Gray rule, full-bleed within the content column — no border-left stripe, no box, no shadow. The lead/featured story at the top of the homepage breaks the row pattern once: full Display-size title plus a two-line dek, to establish hierarchy the way a newspaper front page does with its lead story.

### Article Body Chart
- **Style:** an SVG bar chart wrapped in a bordered figure — 1px Hairline Gray border, `sm` (4px) corner radius, generous inner padding, matching the deliberate treatment already given to code blocks and tables rather than sitting bare in the body copy. Bar fill is Honey Amber; the zero-baseline rule and axis are Hairline Gray; row labels are Ink, value labels are Muted Ink, both in Label face (Mono). A Label-face, Muted Ink caption sits below the figure, sourced from the image's alt text — the same typographic treatment as the article byline metadata line, not a separate caption style.
- **Theme behavior:** the SVG's fills and font-family reference the same `--color-*`/`--font-jetbrains-mono` custom properties as the rest of the page, and the markup is inlined into the document (not loaded via `<img src>`) specifically so it repaints on the light/dark toggle instead of freezing at generation time. See `scripts/generate-chart.mjs` and `src/components/MdxImage.tsx`.
- **Scope:** bar charts only, generated from data already cited in the article body (benchmarks, comparisons, percentages) — not decorative photography or hero imagery, which stay out of scope per the anti-references in `PRODUCT.md`.

### Inputs
- **Style:** bottom-border only (1px Muted Ink), transparent background, no corner radius, no box. Not currently used anywhere in the shipped site; the primitive is defined for whatever text input need comes next (search, comments).
- **Focus:** border shifts to 2px Honey Amber, no glow/shadow.

### Logo
- **Mark:** the supplied chip-and-spark icon (Brand Navy `#12314f`, white in dark mode via `currentColor`), paired inline with the Fraunces wordmark in the header and footer. Fixed brand asset — not part of the primary/accent system, never recolored to Honey Amber or Deep Teal.

### Navigation
- **Style:** sticky header, Paper White/Near-Black background (matches body, not Hairline Gray), 1px Hairline Gray bottom border on scroll only. Logomark (Brand Navy / white in dark mode) plus wordmark set in Fraunces at Title size, as a single lockup. Nav links in Body face, Ink color, Honey Amber underline on hover (transform-based, no layout shift). Theme toggle sits at the far right as a simple sun/moon icon button, no background.
- **Masthead tagline:** "— For people who build" set in Mono face, Body Small size, Muted Ink, immediately after the wordmark on the same line. Hidden below `md` (768px) — the sticky header's single row has to fit the logo lockup, nav links or the hamburger, and the theme toggle in whatever width is left, so the tagline is the first thing to go rather than wrapping or crowding those. Distinct from the longer descriptive line ("Notes on artificial intelligence, for practitioners and the curious alike") used in the footer and meta/OG description — the two are intentionally different lengths for different jobs, not an inconsistency to reconcile.
- **Mobile:** nav links collapse into a full-height overlay panel (not a dropdown), Display-face link list, dismissible via the same toggle icon rotated to an ×.

## 6. Do's and Don'ts

### Do:
- **Do** keep body background at zero chroma — pure white (`#ffffff`) in light mode, true near-black (`#020202`) in dark mode.
- **Do** use Honey Amber for exactly one job at a time: action or emphasis, never both in the same view.
- **Do** build the article index as hairline-divided rows with one larger featured lead, not a grid of equal-weight cards.
- **Do** cap body prose at 68ch and set body line-height to 1.7 for long-form reading.
- **Do** give every animation a `prefers-reduced-motion` fallback (instant or crossfade).

### Don't:
- **Don't** use a cream, sand, or parchment body background — the "saturated AI default of 2026" this project explicitly rejects.
- **Don't** apply `border-left`/`border-right` as a colored accent stripe on any row, card, or callout.
- **Don't** use gradient text (`background-clip: text` + gradient) anywhere.
- **Don't** build an icon-and-heading card grid for the article index — that is wiki/doc coldness and SaaS-template sameness both, and this project rejects both by name.
- **Don't** place an uppercase tracked label above a section as a floating "eyebrow" — Label typography only ever attaches to real metadata (byline, date, tag).
- **Don't** add `box-shadow` anywhere; elevation in this system is flat by rule.
