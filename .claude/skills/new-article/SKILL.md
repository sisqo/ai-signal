---
name: new-article
description: Writes and publishes a new AI Signal blog post end to end — research, write, verify, commit, push, deploy. Two independent choices, both optional in the argument string — a mode ("auto" or "ask") and a topic. No mode given defaults to "auto". No topic given triggers discovery: find the most interesting recent AI/agentic-coding-tools news not already covered on the site. An optional `--publish YYYY-MM-DD` flag anywhere in the string schedules the article for a future date instead of publishing it today — the piece is still written, committed, and pushed immediately, but stays hidden (404) on the live site until that date. Use whenever the user wants a new article written for this blog (e.g. "/new-article", "/new-article ask", "/new-article the new Gemini release", "/new-article ask the new Gemini release", "/new-article --publish 2026-07-15 the new Gemini release", "scrivi un nuovo articolo", "scrivi un articolo da pubblicare il 15 luglio").
user-invocable: true
argument-hint: "[auto|ask] [--publish YYYY-MM-DD] [optional topic — omit to auto-discover the day's most interesting uncovered story]"
---

Publishes one new post to AI Signal (this repo).

## Parse the arguments first

The argument string carries three independent, optional pieces: a **mode**, an optional **`--publish` date**, and a **topic**.

- First, look for `--publish YYYY-MM-DD` anywhere in the string. If present, remove it from the string (mode/topic parsing below runs on what's left) and remember the date — this is the article's scheduled publish date instead of today.
- Then, on what remains: if the first word is exactly `auto` or `ask` (case-insensitive), that's the mode; everything after it is the topic (which may be empty). Otherwise there's no mode word — mode defaults to `auto`, and the *entire* remaining string is the topic (which may be empty).

So: `/new-article` → auto, no topic, publish today. `/new-article ask` → ask, no topic, publish today. `/new-article the new Gemini release` → auto, topic = "the new Gemini release", publish today. `/new-article --publish 2026-07-15 ask the new Gemini release` → ask, topic = "the new Gemini release", scheduled for 2026-07-15.

**`auto` mode**: fully automatic, no confirmation gate anywhere. Once the article is written and verified, commit, push, and deploy without waiting for approval — this is the house default the user chose.

**`ask` mode**: before writing anything, generate exactly 5 candidate subjects and present them as a plain numbered list in your response (title + one-line pitch each, nothing more — no full drafts, no research dump). Then stop and wait for the user's reply picking one (plain conversational text — don't use a widget capped at 4 options, the user asked for 5). Once they pick, proceed through research → write → verify → publish → report with no further gate, exactly like `auto`.

## Step 1: Survey what's already published

Before anything else, read every file in `content/articles/*.mdx`. For each, note the frontmatter (`title`, `slug`, `dek`, `date`, `tag`, `featured`) and skim the body. Build a mental map of what's already been covered — specific tools, releases, and angles — so you don't re-tread the same story. A genuine follow-up (a major new version, a reversal, a significant update to something covered before) is fair game; restating the same announcement from a slightly different angle is not.

Also note which file currently has `featured: true` — there should be exactly one. You'll need it in Step 5.

While surveying, also look for a genuine internal-link opportunity: does the new topic naturally reference or build on an already-published piece? If so, plan to link it in the new article (see root `CLAUDE.md`'s Editorial Guidelines).

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

Voice, structure, length, titling, citation, and tagging rules all live in root `CLAUDE.md`'s **Editorial Guidelines** section — read it before writing and follow it exactly. Don't restate or re-derive those rules here; this skill only adds the mechanical bits below.

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
date: "YYYY-MM-DD"   # today, per current system context — or the --publish date if one was given
tag: "..."
featured: true
---
```

For `tag`: see root `CLAUDE.md`'s Editorial Guidelines for the reuse policy.

## Step 5: Un-feature the previous lead

Edit whichever file had `featured: true` (found in Step 1) and remove that line — only the newest article should be featured, and always set `featured: true` on the new one regardless of whether it publishes today or on a future `--publish` date. This is safe even when scheduling weeks out: the homepage only looks for `featured: true` among already-*published* articles (see `src/lib/content.ts`'s `getPublishedArticles`), falling back to the most recent published article if none match. So during the gap between writing a scheduled article and its publish date, the old article keeps showing as the de facto lead via that fallback — nothing needs a second edit later, and there's no gap where the homepage has no lead at all.

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

Push triggers Vercel's auto-deploy regardless of the article's `date` — scheduling doesn't delay this step, it only delays what the deployed site actually shows. Give the deploy 30–60 seconds, then check `https://ai-signal.sisqo.dev/articles/<slug>`:
- **Publishing today:** confirm it returns 200 before declaring done.
- **Scheduled (`--publish` in the future):** confirm it currently returns 404 (expected — that's the gating working) rather than 200. A 200 here means the date didn't make it into the frontmatter correctly.

## Step 8: Report back

Tell the user what happened: title, and a one-line note on where the story came from (which sources, or which topic/pick they gave you).
- **Published today:** give the live URL — the article is already live by the time you say this.
- **Scheduled:** state the publish date clearly and that the article is committed and deployed but stays hidden until then. It appears automatically once the site gets a request more than an hour after its last render of that page, past midnight Europe/Rome on that date — no rebuild needed, but also no exact-second guarantee (see CLAUDE.md's "Scheduled publishing" section) — this is a completion summary for "written and queued," not "live."
