---
name: new-article-schedule
description: Batch-schedules N future AI Signal articles at once, one per calendar day, filling the next N free days on the publishing calendar starting tomorrow (skipping any day that already has something scheduled). Always proposes 2N candidate stories up front and asks which N to write — there's no auto mode and no topic argument, this is purely for stocking up the schedule ahead of time, not for a single specific story (use /new-article --publish for that). Use when the user wants to queue up several days of articles in advance (e.g. "/new-article-schedule 5", "schedulami 5 articoli per i prossimi giorni", "riempi la prossima settimana di articoli", "queue up a week of posts").
user-invocable: true
argument-hint: "<number of articles to schedule>"
---

Writes and schedules N new AI Signal posts at once (this repo), one per calendar day, using the same scheduled-publishing mechanism as `/new-article`'s `--publish` flag — see root `CLAUDE.md`'s "Scheduled publishing" section for how that works under the hood (ISR, `isPublished()`, 404-until-date). This skill only adds the batch-scheduling and multi-candidate-picking logic on top; it defers to `/new-article`'s Steps 3–4 for how an individual article actually gets written, rather than restating those rules here.

## Parse the argument

The argument is a single positive integer N — how many articles to actually write and schedule. If it's missing, not a whole number, or not positive, ask for it before doing anything else. There's no mode and no topic argument: this skill always runs discovery (never a user-given topic) and always proposes candidates before writing (never fully automatic, unlike `/new-article auto`).

## Step 1: Find the target dates

1. Read every file in `content/articles/*.mdx` and collect every `date` already in use — past-published articles and already-scheduled future ones both count.
2. Starting from **tomorrow** (Europe/Rome — e.g. `TZ=Europe/Rome date -d "+1 day" +%Y-%m-%d` for the first candidate, then +1 day each step), walk forward day by day and take the **next N days that don't already have an article, skipping any that do**. In the normal case (nothing scheduled past the current run) this is just N consecutive days starting the day after the last currently-scheduled article. But if a stray one-off `--publish` date sits further out and lands inside this span, skip past just that single day rather than jumping the whole batch past it — this fills the calendar as densely as the user actually asked for ("a partire dal primo giorno utile... uno per ogni giorno"), rather than leaving earlier free days empty over a single collision.
3. That gives N target dates, in order: `d1 < d2 < ... < dN` (not necessarily consecutive, if a skip happened).

## Step 2: Survey what's already published or scheduled

Same as `/new-article`'s Step 1: read every article's frontmatter and skim the body, so the candidates proposed next don't re-tread a story already published *or already sitting in the schedule* for a later date. Note which file currently has `featured: true` — you'll need it in Step 5b.

## Step 3: Discovery research

Run the same broad discovery pass as `/new-article` with no topic given: several varied web searches for new model releases, agentic coding tools and IDEs, notable developer-tooling launches, and industry moves relevant to a practitioner audience (see `PRODUCT.md`). Skip anything Step 2 already covers. Unlike `/new-article ask` (which can present multiple angles on one story when a topic is given), every candidate here must be a genuinely **different underlying story** — this is filling a real calendar, not exploring framings of a single announcement.

Keep searching until there are at least **2N** distinct, well-sourced, uncovered stories. If fewer than 2N solid candidates turn up even after a thorough pass, say so plainly and present what's actually there rather than padding the list with weak filler.

## Step 4: Propose 2N, ask for N

Present all 2N candidates as a plain numbered list in your response — title + one-line pitch each, nothing more, no research dump. Don't use a widget (it caps at 4 options; this needs to scale past that). Ask the user to reply with exactly N picks, **in the order they want them scheduled** — their first pick lands on `d1`, their second on `d2`, and so on through `dN`. Do not proceed past this point until they reply.

## Step 5: Research and write each picked article

For each of the N picks, in the order given:

1. Deep-research it to the same standard as `/new-article` (cross-check specific facts — dates, version numbers, prices, names, quotes — across at least two sources; soften with "reportedly"/"according to X" or drop anything that can't be corroborated).
2. Write it following `/new-article`'s Step 3 exactly (voice, structure, citations, and tagging all live in root `CLAUDE.md`'s Editorial Guidelines; same MDX gotchas; same optional chart treatment for numeric comparisons) — don't restate those rules here.
3. Frontmatter matches `/new-article`'s Step 4, with one difference: `date` is this article's assigned target date (`d1` for the first pick, `d2` for the second, etc.), not today.

### Step 5b: Move `featured` to the end of the batch, not nowhere

This is not a no-op step — check the actual homepage logic (`src/app/page.tsx`) before assuming otherwise: `articles.find((a) => a.featured) ?? articles[0]` only falls back to "most recent published" when **no** published article is flagged. It does not mean "most recent among flagged ones." Whatever article is flagged today stays the `find()` match — and therefore the eternal lead — for every single day of this batch unless its flag is actually removed, since it will keep outranking every new unflagged article regardless of how much more recent they are.

So: remove `featured: true` from whichever file has it today (found in Step 2), exactly like `/new-article`'s Step 5 — and set `featured: true` on the **last** article in the batch (the one dated `dN`), not on any of the others. During the span from `d1` to `d(N-1)`, none of the published articles are flagged, so the `?? articles[0]` fallback correctly promotes whichever of them is most recently published on any given day — that's what makes the day-by-day rotation work. Once `dN` publishes, it's both the most recent *and* the flagged one, so it becomes the new steady-state lead exactly like a normal `/new-article` run leaves one — preserving the "exactly one `featured: true` at a time" invariant Step 2 (and `/new-article`'s Step 1) expect.

## Step 6: Verify once, for the whole batch

Run, in order, and fix anything that fails before moving on — same as `/new-article`'s Step 6:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

One build covers all N new files; there's no need to rebuild per article.

## Step 7: Publish once, for the whole batch

```bash
git add -A
git commit -m "..."   # list all N titles and their scheduled dates
git push
```

Push triggers Vercel's auto-deploy, same as always. Every one of these N articles is future-dated, so — unlike a normal same-day `/new-article` run — expect **every one of them to 404** right after this deploy; that's correct behavior, not a failure. Don't try to verify any of them return 200.

## Step 8: Report back

List all N articles with their titles and assigned dates (`d1` through `dN`) and the overall span (first date to last date). Make clear they're committed and deployed already, but stay hidden until their respective dates — this is a "written and queued" summary, not a "live" one.
