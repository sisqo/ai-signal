---
name: AI Signal
description: An editorial-quality blog about artificial intelligence
colors:
  bg-light: "#f6f4ef"
  surface-light: "#fdfcfa"
  fg-light: "#1b1d21"
  muted-light: "#585d64"
  faint-light: "#8b9096"
  line-light: "#d5d6d8"
  accent-light: "#2f9e57"
  accent-2-light: "#26824a"
  bg-dark: "#111214"
  surface-dark: "#1c1e21"
  fg-dark: "#f2f3f4"
  muted-dark: "#8b9096"
  faint-dark: "#4e5358"
  line-dark: "#33363a"
  accent-dark: "#bef264"
  accent-2-dark: "#a3d95f"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(3rem, 1.5rem + 7vw, 7rem)"
    fontWeight: 560
    lineHeight: 0.94
    letterSpacing: "-0.028em"
  headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(1.75rem, 1.2rem + 3.4vw, 3rem)"
    fontWeight: 540
    lineHeight: 1.03
    letterSpacing: "-0.017em"
  title:
    fontFamily: "IBM Plex Sans, -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "21px"
    fontWeight: 400
    lineHeight: 1.72
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
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
    backgroundColor: "{colors.accent-light}"
    textColor: "{colors.bg-light}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "10px 22px"
  button-primary-hover:
    backgroundColor: "{colors.accent-2-light}"
    textColor: "{colors.bg-light}"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.accent-2-light}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0px"
---

# Design System: AI Signal

## 1. Overview

**Creative North Star: "The Wire Dispatch"**

AI Signal reads like a wire-service feed for the AI beat: a scrolling ticker of signal, a masthead that announces itself, and a front page built like a newspaper's — one large lead dispatch, then a hairline-divided list of everything else, each entry stamped with a big outlined index numeral like a wire item number. The system keeps the original editorial soul (serif headlines, hairline dividers, a monospace label face for metadata) but adds brand personality that the "Quiet Signal" era deliberately avoided: a single signature accent color running through everything, small live motion (an equalizer pulse, a marquee ticker, reading-progress), and eyebrow labels that announce a section the way a wire desk announces a feed.

Dark is the default reading mode and the more considered of the two — near-black with a bright signal-lime accent. Light is a fully designed alternate with a warm, paper-toned background, not an inverted afterthought.

**Key Characteristics:**
- One accent color, one job family: signal lime (dark) / signal green (light) carries links, hover states, the CTA arrow, category tags, and the live-motion motifs (ticker diamond, equalizer bars, reading-progress glow). There's no second brand hue — the old two-color amber/teal split is gone, collapsed into one accent used consistently everywhere emphasis is needed.
- Editorial index, not a card grid: one large featured "dispatch" up top, then a hairline-divided list, each row carrying an oversized outlined index numeral (`01`, `02`, …) that recolors on hover — a wire-service front page, not a blog archive.
- Eyebrow labels are back, deliberately: "LATEST DISPATCH" above the lead story, "MORE FROM THE WIRE" above the list. They're part of the wire-desk voice, not a decoration to avoid.
- Quiet, purposeful motion: a four/five-bar equalizer pulse (masthead + footer), a slow marquee ticker of short signal phrases, and a reading-progress bar that glows in the accent color. All motion respects `prefers-reduced-motion`.
- A monospace label face for metadata (date, reading time, tag, nav, ticker) — unchanged in spirit from before, still never a body face.

**Layout posture:** Header, ticker, and footer are full-bleed — no `max-width` container, just `clamp(24px,5vw,72px)` side padding — so they read as page-wide furniture, not a centered column. The home page's featured story and article list share a `max-width: 1120px` cap but no `margin: 0 auto`: on wide viewports the content hugs the left padding edge, like a newspaper front page starting at its left margin, rather than floating centered. The single-article reading view breaks that pattern deliberately — `max-width: 780px`, `margin: 0 auto` — a focused, book-like column in contrast to the front page's left-to-right sprawl.

## 2. Colors

The palette is one near-neutral architecture (paper/near-black, one hairline gray, two text weights) plus a single accent, expressed at two intensities (`accent` / `accent-2`) rather than two separate brand hues.

### Accent
- **Signal Lime** (dark, `#bef264` — `oklch(0.88 0.18 126)`) / **Signal Green** (light, `#2f9e57` — `oklch(0.55 0.16 150)`): the one accent color. Used for links, hover states, the lead story's eyebrow + CTA, the ticker's diamond separators, the equalizer bars, the reading-progress fill, and — at full intensity — the featured story's category label.
- **Dimmer variant** (`accent-2`, `#a3d95f` dark / `#26824a` light): the same hue at lower emphasis. Used for list-row category tags and link-hover states, so a hovered link or a secondary tag reads as "the same color family, one notch down" rather than a different meaning entirely.

### Logo (theme-adaptive, no fixed brand color)
- **Chip mark**: a rounded-rect chip with eight pin leads and a lime asterisk at its center. Unlike the old logo, it has no fixed brand hex — the chip body and pins are drawn in `--color-fg` (so they read as ink on paper / white on near-black) and the center asterisk is always drawn in `--color-accent`. The mark is generated directly from CSS custom properties (`src/components/LogoMark.tsx`), not a cropped import from outside artwork, so it never needs manual recoloring work when the palette shifts. Static rasterized favicons (which can't reference live CSS) freeze one fixed pair of colors instead — see `scripts/generate-favicons.py`.

### Neutral
- **Paper** (`#f6f4ef` light / `oklch(0.972 0.005 95)`): body background, light mode. Deliberately warm — a soft, considered off-white, not a stark white. This is an intentional break from the old "no-cream" rule: the wire-dispatch identity wants a paper feel, not a clinical one.
- **Surface** (`#fdfcfa` light / `#1c1e21` dark): the mono-callout / card background tint, barely distinguishable from `bg` — reserved for the rare block that needs to sit "on" the page rather than "in" it.
- **Ink** (`fg`, `#1b1d21` light / `#f2f3f4` dark): primary text.
- **Muted** (`#585d64` light / `#8b9096` dark): deks and secondary body text.
- **Faint** (`#8b9096` light / `#4e5358` dark): metadata, labels, ticker copy — one step quieter than muted.
- **Line** (`#d5d6d8` light / `#33363a` dark): hairline dividers and borders, the only structural device besides whitespace.
- **Near-Black** (`#111214` dark, `oklch(0.155 0.006 250)`): body background, dark mode — the default reading surface.

### Named Rules
**The One-Accent Rule.** There is exactly one accent color family (`accent` / `accent-2`). It never splits into a second hue for a different meaning — if a future addition needs a distinct "this is metadata, not action" color, that's a deliberate departure from this rule and belongs in a review, not a quiet addition.

**The Warm-Paper Rule.** Light mode's background is a warm, paper-toned off-white (`#f6f4ef`), not stark white. This replaces the old "no-cream" rule outright — the wire-dispatch identity wants the page to feel like newsprint, not a clinical white canvas.

## 3. Typography

**Display Font:** Newsreader (variable, optical-size axis enabled, italic supported)
**Body Font:** IBM Plex Sans (400/500) — UI chrome, deks on the home page, nav
**Label/Mono Font:** JetBrains Mono (400/500/700)

**Character:** Newsreader is a warm, high-contrast transitional serif built for long optical-size range — it carries both the huge masthead/featured-headline treatment and the article body copy itself (a deliberate shift from the old system, where body copy ran in the sans face and serif was reserved for headlines only). IBM Plex Sans is the humanist grotesk for UI chrome: nav, the home-page dek, footer descriptions. JetBrains Mono is the label face — metadata, the ticker, nav links, eyebrow labels — never a body face.

### Hierarchy (selected roles — full fluid scale lives in `tokens.css` / Tailwind arbitrary values in components)
- **Featured H1** (560, `clamp(48px, 7vw, 112px)`, 0.94 leading, `-0.028em` tracking): the homepage lead story.
- **Article H1** (560, `clamp(40px, 5.4vw, 78px)`, 0.98 leading, `-0.024em` tracking): single-article view, and reused for the "All Articles" / About headings.
- **List H2** (540, `clamp(28px, 3.4vw, 48px)`, 1.03 leading, `-0.017em` tracking): secondary article-list titles.
- **Article body** (400, 21px, 1.72 leading): article prose — set in Newsreader, not the sans face.
- **Article H2** (600, 31px, 1.15 leading, `-0.01em` tracking): in-body section headers.
- **Blockquote** (Newsreader italic, 29px, 1.32 leading, `-0.012em` tracking, accent left rule): pull-quotes.
- **Dek (home)**: IBM Plex Sans, `clamp(18px, 1.5vw, 23px)`, 1.5 leading, muted.
- **Dek (article)**: Newsreader italic, `clamp(19px, 1.6vw, 24px)`, 1.5 leading, muted.
- **Label**: JetBrains Mono, 13–14px, 0.02–0.16em tracking — byline, date, reading time, tag, nav, ticker, eyebrows.
- **List index numeral**: Newsreader 500, `clamp(52px, 7vw, 104px)`, 0.8 leading, outlined (`-webkit-text-stroke: 1.4px currentColor` + transparent fill) so it recolors with the row on hover.
- **Footer wordmark**: Newsreader 600, `clamp(52px, 11vw, 150px)`, 0.82 leading, `-0.03em` tracking.

### Named Rules
**The Serif-Reads Rule.** Newsreader now carries both headlines and continuous article body reading — a deliberate merge of the old system's headline/body split. IBM Plex Sans is reserved for UI chrome and the home page's dek, not article prose. JetBrains Mono remains label-only; it never sets a full sentence.

**The Eyebrow-Is-Allowed Rule.** Uppercase tracked mono labels may sit above a section as a standalone eyebrow ("LATEST DISPATCH," "MORE FROM THE WIRE") — this reverses the old system's No-Kicker rule by design, because the wire-desk voice calls for it. An eyebrow still always sits immediately beside or above the thing it announces; it doesn't float free of any content.

## 4. Elevation

Still flat by design — no `box-shadow` vocabulary for structure or grouping. The one exception is intentional and motion-tied: the reading-progress bar's accent fill carries a soft `box-shadow: 0 0 12px var(--color-accent)` glow, because it's meant to read as a live signal indicator, not a resting surface. Depth and grouping everywhere else still come from the `line` hairline and generous whitespace.

### Named Rules
**The Flat-Structure Rule.** No `box-shadow` is used to imply elevation, grouping, or hierarchy. The reading-progress glow is the one narrow exception — a motion/signal effect, not a structural one — and shouldn't be read as license to add shadows elsewhere.

## 5. Components

### Buttons
- **Primary:** accent fill, `bg` text, Label typography, `md` (8px) corner radius, `10px 22px` padding. Used sparingly — the shipped site mostly prefers mono text links with a gap-widening arrow (`READ DISPATCH →`, `More from AI Signal →`) over filled buttons.
- **Subscribe button:** a circular accent-filled arrow (`→`) button, 32px, paired with the footer's bottom-border email field — the one filled control that ships today.

### Links & CTAs (signature interaction)
- **Style:** mono text in `accent`, with a small icon gap (`10px`) that widens (`16px`) on hover/focus over ~200ms — used for the featured CTA, the article footer link, and the "view all articles" link. This replaces card/button chrome as the primary call-to-action pattern.

### Tags
- No background fill, no border, no pill shape — Label-face text in `accent-2` (list rows) or `accent` (the featured story). Still deliberately inert: no distinct hover/selected state, because tag-filtered views don't exist yet. Revisit the day they ship.

### Article Index Row (signature component)
Each entry: an oversized outlined index numeral (Newsreader, `-webkit-text-stroke`, transparent fill, tied to `currentColor` so it recolors with the row), a Headline-weight title, a single-line Muted dek, and a Label-face metadata line (date · reading time · tag in `accent-2`). Rows are separated by a 1px `line` hairline; on hover the whole row shifts `translateX(10px)` and recolors toward `accent`, turning the outlined numeral solid-feeling without ever filling it. The lead/featured story breaks the pattern once at the top of the homepage: an eyebrow (equalizer bars + "LATEST DISPATCH"), a huge Display-size title, and a two-line dek — the newspaper front page's lead treatment.

### Signal Ticker
A full-width marquee strip, 1px `line` border top and bottom, looping short mono phrases separated by an accent "◆", `34s` linear scroll. Purely decorative brand furniture (not a live headline feed) — content is duplicated once for a seamless loop and hidden from assistive tech (`aria-hidden`), since a screen reader gains nothing from a repeating decorative strip.

### Equalizer Bars
Three sizes of the same motif — `eyebrow` (4 bars, next to "LATEST DISPATCH"), `footer` (5 bars, beside the masthead wordmark), `mini` (3 bars, in the footer's bottom bar) — each bar scaling `0.22 → 1 → 0.22` on a staggered delay. Always `accent`-colored; always disabled under `prefers-reduced-motion`.

### Reading Progress
A fixed 2px bar at the very top of the article view only, filled in `accent` with a glow, width driven by scroll position. The one place a `box-shadow` is intentional (see Elevation).

### Article Body Chart
Unchanged from the prior system: an SVG bar chart, 1px `line` border, `sm` (4px) radius, generous padding — the same deliberate treatment given to blockquotes. Bar fill is `accent`; the zero-baseline rule and axis are `line`; labels are Label face. Inlined into the page markup (not `<img src>`'d) so it repaints on the theme toggle. See `scripts/generate-chart.mjs` and `src/components/MdxImage.tsx`.

### Inputs
- **Style:** the footer email field is a rounded (`9px`) `1px line` border container, transparent background, that turns `accent` on focus/hover — the only input currently shipped. It's presentational for now (see PRODUCT.md) since no newsletter provider is wired up yet.

### Logo
- **Mark:** the chip/pins/asterisk SVG described under Colors — fully token-driven, no fixed hex. Paired inline with the Newsreader wordmark in the header and the (much larger) footer masthead treatment.

### Navigation
- **Style:** header is full-bleed (no max-width container, just `clamp(24px,5vw,72px)` side padding) with no border of its own — the Signal Ticker directly beneath it supplies the visual separation instead of a header hairline, so the two don't double up. Logomark + Newsreader wordmark + mono tagline ("— For people who build") sit left; mono nav links ("Articles" in `fg`/hover `accent`, "About" in `muted`/hover `fg`) plus a circular theme toggle sit right.
- **Theme toggle:** a 38px circular `1px line`-bordered button showing a `◐` glyph that rotates 180° between states (border turns `accent` on hover).
- **Mobile:** nav links collapse into a full-height overlay panel, Display-face link list, toggled by the same button that opens/closes a hamburger icon.

## 6. Do's and Don'ts

### Do:
- **Do** use `accent`/`accent-2` for every job that needs emphasis — link, hover, CTA, tag, live-motion motif. One accent family, many intensities, never a second hue.
- **Do** build the article index as an outlined-numeral, hairline-divided list with one larger featured lead, not a grid of equal-weight cards.
- **Do** set article body copy in Newsreader (serif), not IBM Plex Sans — the body/headline split from the old system is gone.
- **Do** give every animation (equalizer, ticker, entrance) a `prefers-reduced-motion` fallback.
- **Do** let an eyebrow label ("LATEST DISPATCH," "MORE FROM THE WIRE") sit above the section it announces — that's part of the wire-desk voice now.

### Don't:
- **Don't** reintroduce a second brand hue for "metadata vs. action" — that split belonged to the old amber/teal system and is gone.
- **Don't** apply `border-left`/`border-right` as a colored accent stripe on a row or card (the blockquote's accent rule and the mono-callout's accent-2 rule are the two narrow, named exceptions).
- **Don't** use gradient text anywhere.
- **Don't** add `box-shadow` for structure or grouping — the reading-progress glow is the one motion-tied exception, not a precedent.
- **Don't** claim the footer's subscribe form is functional in copy or behavior beyond a visual placeholder until a real newsletter provider is wired up (see PRODUCT.md).
