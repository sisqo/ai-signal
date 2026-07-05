---
name: new-article-schedule
description: Batch-schedules N future AI Signal articles at once, one per calendar day, filling the next N free days on the publishing calendar starting tomorrow (skipping any day that already has something scheduled). Always proposes 2N candidate stories up front and asks which N to write — there's no auto mode and no topic argument, this is purely for stocking up the schedule ahead of time, not for a single specific story (use /new-article --publish for that). Each picked story is actually written by invoking the /new-article skill itself, once per pick, rather than reimplementing its write/verify/publish logic here. Use when the user wants to queue up several days of articles in advance (e.g. "/new-article-schedule 5", "schedulami 5 articoli per i prossimi giorni", "riempi la prossima settimana di articoli", "queue up a week of posts").
user-invocable: true
argument-hint: "<number of articles to schedule>"
---

Finds N free dates and N good stories to fill them, then writes and schedules each one by actually invoking `/new-article` — once per pick — rather than reimplementing what that skill already does. This skill's own job stops at picking the dates and the topics; `/new-article` still owns research, writing, frontmatter, the `featured` handoff, verification, and publishing, exactly as it does for a single normal run. See root `CLAUDE.md`'s "Scheduled publishing" section for how the underlying hide-until-date mechanism works (ISR, `isPublished()`, 404-until-date).

## Parse the argument

The argument is a single positive integer N — how many articles to actually write and schedule. If it's missing, not a whole number, or not positive, ask for it before doing anything else. There's no mode and no topic argument: this skill always runs discovery (never a user-given topic) and always proposes candidates before writing (never fully automatic, unlike `/new-article auto`).

## Step 1: Find the target dates

1. Read every file in `content/articles/*.mdx` and collect every `date` already in use — past-published articles and already-scheduled future ones both count.
2. Starting from **tomorrow** (Europe/Rome — e.g. `TZ=Europe/Rome date -d "+1 day" +%Y-%m-%d` for the first candidate, then +1 day each step), walk forward day by day and take the **next N days that don't already have an article, skipping any that do**. In the normal case (nothing scheduled past the current run) this is just N consecutive days starting the day after the last currently-scheduled article. But if a stray one-off `--publish` date sits further out and lands inside this span, skip past just that single day rather than jumping the whole batch past it — this fills the calendar as densely as the user actually asked for ("a partire dal primo giorno utile... uno per ogni giorno"), rather than leaving earlier free days empty over a single collision.
3. That gives N target dates, in order: `d1 < d2 < ... < dN` (not necessarily consecutive, if a skip happened).

## Step 2: Survey what's already published or scheduled

Same as `/new-article`'s Step 1: read every article's frontmatter and skim the body, so the 2N candidates proposed next don't re-tread a story already published *or already sitting in the schedule* for a later date. (You don't need to track `featured: true` yourself — Step 5 hands that off to `/new-article`.)

## Step 3: Discovery research

Run the same broad discovery pass as `/new-article`'s Step 2 with no topic given — same categories, not restated here to avoid the two drifting apart (model releases, coding tools, developer tooling, and industry moves, but also AI policy/regulation, work/society impact, and consumer AI products — see `PRODUCT.md`'s two audiences). Skip anything Step 2 already covers. Unlike `/new-article ask` (which can present multiple angles on one story when a topic is given), every candidate here must be a genuinely **different underlying story** — this is filling a real calendar, not exploring framings of a single announcement.

Keep searching until there are at least **2N** distinct, well-sourced, uncovered stories. If fewer than 2N solid candidates turn up even after a thorough pass, say so plainly and present what's actually there rather than padding the list with weak filler.

## Step 4: Propose 2N, ask for N

Present all 2N candidates as a plain numbered list in your response — title + one-line pitch each, nothing more, no research dump. Don't use a widget (it caps at 4 options; this needs to scale past that). Ask the user to reply with exactly N picks, **in the order they want them scheduled** — their first pick lands on `d1`, their second on `d2`, and so on through `dN`. Do not proceed past this point until they reply.

## Step 5: Hand each pick to `/new-article`, one at a time, in order

Don't research or write these yourself — invoke the `/new-article` skill itself for each pick, passing:

- mode `auto` (the topic is already chosen; there's no reason for `/new-article`'s own `ask`-mode sub-list to run inside this)
- `--publish dK`, where `dK` is that pick's assigned target date from Step 1 (the first pick gets `d1`, the second `d2`, and so on)
- the candidate's title + one-line pitch from Step 4 as the topic text, so `/new-article` has a concrete steer for its own research instead of starting from nothing

For example, for the first pick: invoke `/new-article` with args `auto --publish 2026-07-15 <that candidate's title and pitch>`.

Let each invocation run all the way through — its own survey, research, writing, frontmatter, verification, commit, and push — before starting the next one. **Do this strictly in order, one at a time, never in parallel.** This isn't just tidiness: `/new-article`'s own Step 5 un-features whichever article currently has `featured: true` and features the one it just wrote instead. Running the picks in date order lets that logic cascade correctly across the whole batch on its own — by the time the last pick (`dN`) is written, it's the one and only `featured: true` article, exactly as if you'd run `/new-article` that many separate times on the actual calendar days instead of all at once today. Running two picks concurrently (or out of order) would race on that flag and on the git history — don't.

## Step 6: Report back

Once all N are done, roll up what each individual `/new-article` run already reported: every title with its assigned date, the overall span (first date to last date), and a reminder that all of them are committed and deployed already but stay hidden until their own date.
