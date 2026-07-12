#!/usr/bin/env node
// Notifies IndexNow (fanned out to Bing, Yandex, Naver, Seznam, and Yep — Google doesn't
// participate) about every currently-published page, so they don't have to wait for their own
// crawlers to notice new or changed content. Free, no account or secret needed: the "key" below
// is a public verification token, not a credential — its matching proof file lives at
// public/<key>.txt (served at https://ai-signal.sisqo.dev/<key>.txt) per the IndexNow protocol.
//
// Runs on a schedule (see .github/workflows/ping-indexnow.yml), not on every push: a --publish'd
// article is committed to git well before its date, and submitting its URL early would just
// hand search engines a 404 to crawl before the page is actually live (see root CLAUDE.md's
// "Scheduled publishing" section). Idempotent by design — IndexNow submission is a "these URLs
// may have changed" notice, not a scarce one-shot action, so resubmitting the full published set
// every run needs no dedup/state tracking, unlike the Bluesky announcer.

import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'

const SITE_URL = 'https://ai-signal.sisqo.dev'
const CONTENT_DIR = join(process.cwd(), 'content', 'articles')
const INDEXNOW_KEY = 'e04254c79f6e48aea8ecdadb1adfcba8'
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

function isPublished(date) {
  const todayInRome = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome' }).format(new Date())
  return date <= todayInRome
}

function getPublishedSlugs() {
  const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'))
  return files
    .map((file) => matter(readFileSync(join(CONTENT_DIR, file), 'utf8')).data)
    .filter((a) => isPublished(a.date))
    .map((a) => a.slug)
}

async function main() {
  const host = new URL(SITE_URL).host
  const urlList = [
    SITE_URL,
    `${SITE_URL}/articles`,
    ...getPublishedSlugs().map((slug) => `${SITE_URL}/articles/${slug}`),
  ]

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList,
    }),
  })

  if (!res.ok) {
    throw new Error(`IndexNow submission failed: ${res.status} ${await res.text()}`)
  }

  console.log(`IndexNow: submitted ${urlList.length} URLs (HTTP ${res.status}).`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
