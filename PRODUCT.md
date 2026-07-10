# Product

## Register

brand

## Users

Two overlapping readerships: AI engineers/practitioners who want depth without condescension, and tech-curious generalists who want AI explained clearly without being talked down to. Both arrive to understand something — a concept, a trend, an implication — not to operate a tool. They read in short sessions (a coffee break, a commute, a quiet evening) and want the piece to respect that time: get to the point, stay readable, don't perform complexity.

## Product Purpose

An editorial-quality blog about AI. Content is Lorem ipsum placeholder for now; the publication's job is to feel like a considered piece of writing you'd trust and want to finish, not another AI-startup content farm. Success looks like: a reader lands on one article and stays to read a second one, because the experience itself signals care.

## Brand Personality

**"The Wire Dispatch."** AI Signal reads like a wire-service feed for the AI beat — a scrolling signal ticker, a masthead that announces itself, a front page built like a newspaper's front page. It's still precise and considered, still typography-led, but it now has a signature voice and a small amount of live motion (an equalizer pulse, a marquee, reading-progress) rather than staying purely restrained. Confidence comes from having a distinct point of view, not from volume — still not a SaaS landing page, not a docs site, not hype-driven.

## Anti-references

- Wiki/documentation coldness: tabular layouts, neutral system typography, sterile hierarchy (explicitly called out as unwanted).
- The generic AI-SaaS template: gradient text, hero sections with big fake metrics, identical icon+heading card grids.
- Generic Medium-style templates with no distinct point of view.
- A second brand hue competing with the signal accent for "action vs. metadata" duty — see DESIGN.md's One-Accent Rule.

Note: the prior iteration of this brief also rejected cream/parchment backgrounds and floating uppercase eyebrow labels above sections. Both are now deliberate parts of the identity (see DESIGN.md's Warm-Paper Rule and Eyebrow-Is-Allowed Rule) — a considered pivot, not scope creep back toward the AI-SaaS template above.

## Design Principles

1. Typography is the interface — the Newsreader/IBM Plex Sans pairing and type scale carry the brand; decoration is secondary.
2. A distinct voice over generic restraint — the wire-desk motifs (ticker, equalizer, eyebrow labels, outlined index numerals) are signature, not decoration to minimize.
3. Reading comes first — line length, rhythm, and contrast are tuned for long-form reading, not skimming a dashboard. The single-article view stays a centered, focused column even though the home page's front-page layout is intentionally wider and left-anchored.
4. One accent color family, used everywhere emphasis is needed, never a second competing hue.
5. Light and dark are both first-class — dark mode is the default reading surface; light is a fully designed, equally considered alternate with a warm paper tone, not an inverted afterthought.
6. Motion is quiet and purposeful — equalizer pulses, the ticker marquee, entrance fades, and reading-progress all respect `prefers-reduced-motion`; none of it is essential to understanding the content.

## Known Gaps

- The footer's "Subscribe to the Signal" email field is currently presentational only — no newsletter provider is wired up yet, so submitting it is inert (`preventDefault`, no request sent). Wire it to a real provider before implying to readers that it works.

## Accessibility & Inclusion

WCAG AA minimum: body text ≥4.5:1 contrast, large/display text ≥3:1. Full keyboard navigation for nav and any theme toggle. Respect `prefers-reduced-motion` with instant/crossfade alternatives for all motion. Semantic HTML (`article`, `time`, heading hierarchy) so the content is legible to assistive tech, not just visually.
