---
name: new-article
description: Writes and publishes a new AI Signal blog post end to end — research, write, verify, commit, push, deploy. With no argument, finds the most interesting recent AI/agentic-coding-tools news not already covered on the site. With a topic argument, does deeper targeted research on that topic instead. Use whenever the user wants a new article written for this blog (e.g. "/new-article", "/new-article the new Gemini release", "scrivi un nuovo articolo").
user-invocable: true
argument-hint: "[optional topic — omit to auto-discover the day's most interesting uncovered story]"
---

Publishes one new post to AI Signal (this repo). Two modes, chosen by whether the user gave a topic as an argument. Auto-publish is the house rule here: once the article is written and verified, commit, push, and deploy without waiting for approval — the user has already opted into that.

## Step 1: Survey what's already published

Before anything else, read every file in `content/articles/*.mdx`. For each, note the frontmatter (`title`, `slug`, `dek`, `date`, `tag`, `featured`) and skim the body. Build a mental map of what's already been covered — specific tools, releases, and angles — so you don't re-tread the same story. A genuine follow-up (a major new version, a reversal, a significant update to something covered before) is fair game; restating the same announcement from a slightly different angle is not.

Also note which file currently has `featured: true` — there should be exactly one. You'll need it in Step 5.

## Step 2: Research

**No topic given (discovery mode):** run several varied web searches covering the last few days — new model releases, agentic coding tools and IDEs, notable developer-tooling launches, significant AI research or industry moves relevant to a practitioner/technical audience (see PRODUCT.md for who reads this). Skip generic AI business news (stock moves, executive reshuffles) that wouldn't interest that audience. From the candidates, cross off anything that overlaps with Step 1's map, then pick the single most interesting, well-sourced, genuinely new story.

**Topic given (targeted mode):** research that specific topic in depth. Pull from multiple sources, not one. Cross-check specific facts — dates, version numbers, prices, names, quotes — across at least two sources before using them. If a detail can't be corroborated, either soften the language ("reportedly", "according to X") or leave it out. Do not invent specifics to fill a gap.

## Step 3: Write

Match the voice already established in `content/articles/`: direct, concrete, opinionated where earned, real names/dates/numbers instead of vague hand-waving, no AI-blog filler ("in today's fast-paced world of..."), no unearned hype. Structure loosely like the existing posts — a few `##` sections, a comparison table or code block if the topic actually calls for one, a closing take that tells the reader what to actually do with the information. Length follows the topic; the existing posts run roughly 600–1000 words, not a hard limit.

MDX gotchas (see root `CLAUDE.md` for more):
- Do **not** start the body with a `#` H1 repeating the title — the page template renders the title from frontmatter separately. Start with the lead paragraph or a `##` subsection.
- Avoid stray `<`, `{`, `}` outside of fenced code blocks — MDX will try to parse them as JSX.
- Tables (GFM pipe syntax) and fenced code blocks both already work and are styled — use them freely where they genuinely help.

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

If you used a table or anything visually novel, it's worth a quick local `npm run start` + screenshot check the way past articles were verified, but don't block publishing on it — this is a lower-stakes check than the build passing.

## Step 7: Publish

```bash
git add -A
git commit -m "..."   # mention the topic and, briefly, the publish mode (discovered vs. targeted)
git push
```

Push triggers Vercel's auto-deploy. Give it 30–60 seconds, then confirm the new article's URL returns 200 on `https://ai-signal.sisqo.dev/articles/<slug>` before declaring done.

## Step 8: Report back

Tell the user what got published: title, live URL, and a one-line note on where the story came from (which sources, or which topic they gave you). This is a completion summary, not a request for approval — the article is already live by the time you say this.
