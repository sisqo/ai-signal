# Product

## Register

brand

## Users

A global readership, most of whom do not read English as a first language. Some read it slowly. Practitioners are part of that audience, not a second readership to balance against it — they get every real number and every real term, delivered in sentences anyone can parse. Readers arrive to understand something — a concept, a trend, an implication — not to operate a tool. They read in short sessions (a coffee break, a commute, a quiet evening) and want the piece to respect that time: get to the point, stay easy to read, don't perform complexity. See root `CLAUDE.md`'s Editorial Guidelines for the sentence-level rules this implies (CEFR A2 mechanics, technical nouns glossed in plain sentences).

## Product Purpose

An editorial-quality blog about AI. The publication's job is to feel like a considered piece of writing you'd trust and want to finish, not another AI-startup content farm. Trust is earned through verified specifics — real names, dates, prices, benchmark numbers, every citable claim linked — not through a restrained register. Success looks like: a reader lands on one article, finishes it, and stays to read a second one.

## Brand Personality

**"The Wire Dispatch."** AI Signal reads like a wire-service feed for the AI beat — a scrolling signal ticker, a masthead that announces itself, a front page built like a newspaper's front page. It's still precise and typography-led, with a signature voice and a small amount of live motion (an equalizer pulse, a marquee, reading-progress). The writing itself is loud: bold framing, the consequence stated first, strong plain verbs. What holds the other end is sourcing, not restraint — every claim verified and linked. Bold framing is the house voice; the unsourced claim is what's banned. Still not a SaaS landing page and not a docs site.

## Anti-references

- Empty curiosity gaps, withheld payoffs, and manufactured surprise in the writing — a headline that promises a reveal the piece doesn't have, or an adjective claiming more than the sources support. (One narrow exception for a payoff-promise line in a title or dek — see `CLAUDE.md`'s Editorial Guidelines.)
- Wiki/documentation coldness: tabular layouts, neutral system typography, sterile hierarchy (explicitly called out as unwanted).
- The generic AI-SaaS template: gradient text, hero sections with big fake metrics, identical icon+heading card grids.
- Generic Medium-style templates with no distinct point of view.
- A second brand hue competing with the signal accent for "action vs. metadata" duty — see DESIGN.md's One-Accent Rule.

Note: the prior iteration of this brief also rejected cream/parchment backgrounds and floating uppercase eyebrow labels above sections. Both are now deliberate parts of the identity (see DESIGN.md's Warm-Paper Rule and Eyebrow-Is-Allowed Rule) — a considered pivot, not scope creep back toward the AI-SaaS template above.

## Design Principles

1. Typography is the interface — the Newsreader/IBM Plex Sans pairing and type scale carry the brand; decoration is secondary.
2. A distinct voice over generic restraint — the wire-desk motifs (ticker, equalizer, eyebrow labels, outlined index numerals) are signature, not decoration to minimize.
3. Reading comes first — for a reader who may be working in a second language. Line length, rhythm, and contrast are tuned for long-form reading, not skimming a dashboard. The single-article view stays a centered, focused column even though the home page's front-page layout is intentionally wider and left-anchored.
4. One accent color family, used everywhere emphasis is needed, never a second competing hue.
5. Light and dark are both first-class — dark mode is the default reading surface; light is a fully designed, equally considered alternate with a warm paper tone, not an inverted afterthought.
6. Motion is quiet and purposeful — equalizer pulses, the ticker marquee, entrance fades, and reading-progress all respect `prefers-reduced-motion`; none of it is essential to understanding the content.

## Known Gaps

- The footer's "Subscribe to the Signal" email field is currently presentational only — no newsletter provider is wired up yet, so submitting it is inert (`preventDefault`, no request sent). Wire it to a real provider before implying to readers that it works.

## Accessibility & Inclusion

WCAG AA minimum: body text ≥4.5:1 contrast, large/display text ≥3:1. Full keyboard navigation for nav and any theme toggle. Respect `prefers-reduced-motion` with instant/crossfade alternatives for all motion. Semantic HTML (`article`, `time`, heading hierarchy) so the content is legible to assistive tech, not just visually.
