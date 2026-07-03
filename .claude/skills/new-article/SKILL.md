---
name: new-article
description: Writes and publishes a new AI Signal blog post end to end — research, write, verify, commit, push, deploy. Two independent choices, both optional in the argument string — a mode ("auto" or "ask") and a topic. No mode given defaults to "auto". No topic given triggers discovery: find the most interesting recent AI/agentic-coding-tools news not already covered on the site. Use whenever the user wants a new article written for this blog (e.g. "/new-article", "/new-article ask", "/new-article the new Gemini release", "/new-article ask the new Gemini release", "scrivi un nuovo articolo").
user-invocable: true
argument-hint: "[auto|ask] [optional topic — omit to auto-discover the day's most interesting uncovered story]"
---

Publishes one new post to AI Signal (this repo).

## Parse the arguments first

The argument string carries two independent, optional pieces: a **mode** and a **topic**.

- If the first word is exactly `auto` or `ask` (case-insensitive), that's the mode; everything after it is the topic (which may be empty).
- Otherwise there's no mode word — mode defaults to `auto`, and the *entire* argument string is the topic (which may be empty).

So: `/new-article` → auto, no topic. `/new-article ask` → ask, no topic. `/new-article the new Gemini release` → auto, topic = "the new Gemini release". `/new-article ask the new Gemini release` → ask, topic = "the new Gemini release".

**`auto` mode**: fully automatic, no confirmation gate anywhere. Once the article is written and verified, commit, push, and deploy without waiting for approval — this is the house default the user chose.

**`ask` mode**: before writing anything, generate exactly 5 candidate subjects and present them as a plain numbered list in your response (title + one-line pitch each, nothing more — no full drafts, no research dump). Then stop and wait for the user's reply picking one (plain conversational text — don't use a widget capped at 4 options, the user asked for 5). Once they pick, proceed through research → write → verify → publish → report with no further gate, exactly like `auto`.

## Step 1: Survey what's already published

Before anything else, read every file in `content/articles/*.mdx`. For each, note the frontmatter (`title`, `slug`, `dek`, `date`, `tag`, `featured`) and skim the body. Build a mental map of what's already been covered — specific tools, releases, and angles — so you don't re-tread the same story. A genuine follow-up (a major new version, a reversal, a significant update to something covered before) is fair game; restating the same announcement from a slightly different angle is not.

Also note which file currently has `featured: true` — there should be exactly one. You'll need it in Step 5.

## Step 2: Research (or propose, in `ask` mode)

**No topic given:** run several varied web searches covering the last few days — new model releases, agentic coding tools and IDEs, notable developer-tooling launches, significant AI research or industry moves relevant to a practitioner/technical audience (see PRODUCT.md for who reads this). Skip generic AI business news (stock moves, executive reshuffles) that wouldn't interest that audience. Cross off anything that overlaps with Step 1's map.
- In `auto` mode: pick the single most interesting, well-sourced, genuinely new story and go straight to deep research on it.
- In `ask` mode: shortlist the best candidates from this initial pass, pick 5, and present them (Step 2b) before doing any deeper research on any of them.

**Topic given:** research that specific topic.
- In `auto` mode: go straight to deep research on it (see below), then write.
- In `ask` mode: do a light pass to find 5 different angles/framings for covering that same topic (different possible titles/takes, not 5 unrelated topics), present them (Step 2b), then deep-research only the one picked.

**Deep research standard (applies once a topic is settled, either mode):** pull from multiple sources, not one. Cross-check specific facts — dates, version numbers, prices, names, quotes — across at least two sources before using them. If a detail can't be corroborated, either soften the language ("reportedly", "according to X") or leave it out. Do not invent specifics to fill a gap.

### Step 2b: Presenting the 5 (ask mode only)

Numbered list, five items, each one line: a working title and a half-sentence on why it's a good pick. No preamble beyond a single sentence, no per-item research dump. End by asking which one (or if none land, say so and you'll try another pass). Do not proceed past this point until the user replies.

## Step 3: Write

Match the voice already established in `content/articles/`: direct, concrete, opinionated where earned, real names/dates/numbers instead of vague hand-waving, no AI-blog filler ("in today's fast-paced world of..."), no unearned hype. Structure loosely like the existing posts — a few `##` sections, a comparison table or code block if the topic actually calls for one, a closing take that tells the reader what to actually do with the information. Length follows the topic; the existing posts run roughly 600–1000 words, not a hard limit.

MDX gotchas (see root `CLAUDE.md` for more):
- Do **not** start the body with a `#` H1 repeating the title — the page template renders the title from frontmatter separately. Start with the lead paragraph or a `##` subsection.
- Avoid stray `<`, `{`, `}` outside of fenced code blocks — MDX will try to parse them as JSX.
- Tables (GFM pipe syntax) and fenced code blocks both already work and are styled — use them freely where they genuinely help.

**Charts:** if a table's numbers are more legible as a visual comparison than as rows (a wide spread of values, a ranking, an "X times more" claim), generate a bar chart instead of — or alongside — the table:
1. Write a small JSON file: `{ "unit": "×", "items": [{ "label": "...", "value": 32 }, ...] }`.
2. `node scripts/generate-chart.mjs <data.json> public/articles/<slug>/<name>.svg`
3. Reference it in the MDX body with plain markdown image syntax: `![Caption describing what the chart shows](/articles/<slug>/<name>.svg)`. The alt text becomes the visible caption — write it as a real sentence, not a filename-style label.

This only works for bar charts of data already cited in the article (see `DESIGN.md`'s "Article Body Chart" component). Don't reach for it for decorative or stock photography — that's explicitly out of scope (see `PRODUCT.md`'s anti-references).

## Step 4: Frontmatter

```yaml
---
title: "..."
slug: "kebab-case-slug"
dek: "One sentence teaser, no filler."
date: "YYYY-MM-DD"   # today, per current system context
tag: "..."
featured: true
---
```

For `tag`: reuse an existing tag from Step 1 if the topic reasonably fits one — keep the tag vocabulary small and curated (DESIGN.md's restraint principle applies to taxonomy too, not just color). Only introduce a new tag if the topic genuinely doesn't fit any existing one.

## Step 5: Un-feature the previous lead

Edit whichever file had `featured: true` (found in Step 1) and remove that line — only the newest article should be featured. The homepage falls back to the most recent article automatically if none are featured, but be explicit rather than relying on the fallback.

## Step 6: Verify before publishing

Run, in order, and fix anything that fails before moving on:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

If you used a table or anything visually novel, it's worth a quick local `npm run start` + screenshot check the way past articles were verified, but don't block publishing on it — this is a lower-stakes check than the build passing. If you added a chart, check it in both themes (toggle via the header button) — its colors come from CSS custom properties specifically so they adapt, and a broken toggle would only show up in the theme you didn't screenshot.

## Step 7: Publish

```bash
git add -A
git commit -m "..."   # mention the topic and, briefly, the mode (auto vs. ask) and whether it was discovered or targeted
git push
```

Push triggers Vercel's auto-deploy. Give it 30–60 seconds, then confirm the new article's URL returns 200 on `https://ai-signal.sisqo.dev/articles/<slug>` before declaring done.

## Step 8: Report back

Tell the user what got published: title, live URL, and a one-line note on where the story came from (which sources, or which topic/pick they gave you). This is a completion summary, not a request for approval — the article is already live by the time you say this.
