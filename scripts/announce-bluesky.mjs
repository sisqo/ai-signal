#!/usr/bin/env node
// Posts a Bluesky announcement for each article that has newly become published since the
// last run. Runs on a schedule (see .github/workflows/announce-bluesky.yml), not on every
// push: a --publish'd article is committed to git well before its date, and would get
// announced before the site actually shows it if this fired on push instead (see root
// CLAUDE.md's "Scheduled publishing" section).
//
// Required env vars: BLUESKY_IDENTIFIER, BLUESKY_APP_PASSWORD (an app password, not the
// account's real login password — generate one at bsky.app under Settings > App Passwords).

import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'

const SITE_URL = 'https://ai-signal.sisqo.dev'
const CONTENT_DIR = join(process.cwd(), 'content', 'articles')
const STATE_PATH = join(process.cwd(), 'data', 'bluesky-announced.json')
const BLUESKY_SERVICE = 'https://bsky.social'
const POST_TEXT_LIMIT = 280 // Bluesky's actual cap is 300 graphemes; stay a little short of it.

function isPublished(date) {
  const todayInRome = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome' }).format(new Date())
  return date <= todayInRome
}

function loadAnnounced() {
  try {
    return JSON.parse(readFileSync(STATE_PATH, 'utf8'))
  } catch {
    return []
  }
}

function saveAnnounced(slugs) {
  writeFileSync(STATE_PATH, `${JSON.stringify(slugs, null, 2)}\n`)
}

function truncate(text, maxLength) {
  if (text.length <= maxLength) return text
  const cut = text.slice(0, maxLength)
  const lastSpace = cut.lastIndexOf(' ')
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`
}

function getPublishedArticles() {
  const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'))
  return files
    .map((file) => matter(readFileSync(join(CONTENT_DIR, file), 'utf8')).data)
    .filter((a) => isPublished(a.date))
    .sort((a, b) => (a.date < b.date ? -1 : 1))
}

async function createSession(identifier, password) {
  const res = await fetch(`${BLUESKY_SERVICE}/xrpc/com.atproto.server.createSession`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password }),
  })
  if (!res.ok) throw new Error(`Bluesky login failed: ${res.status} ${await res.text()}`)
  return res.json()
}

// Cache-busted so a scheduled article that just became published can't serve the stale,
// pre-date generic fallback that opengraph-image.tsx renders before its date arrives.
async function uploadThumbnail(accessJwt, articleUrl) {
  const res = await fetch(`${articleUrl}/opengraph-image?v=${Date.now()}`)
  if (!res.ok) return null
  const buffer = Buffer.from(await res.arrayBuffer())
  const contentType = res.headers.get('content-type') || 'image/png'

  const uploadRes = await fetch(`${BLUESKY_SERVICE}/xrpc/com.atproto.repo.uploadBlob`, {
    method: 'POST',
    headers: { 'Content-Type': contentType, Authorization: `Bearer ${accessJwt}` },
    body: buffer,
  })
  if (!uploadRes.ok) return null
  return (await uploadRes.json()).blob
}

async function postArticle(session, article) {
  const articleUrl = `${SITE_URL}/articles/${article.slug}`
  const text = truncate(`${article.title}\n\n${article.dek}`, POST_TEXT_LIMIT)
  const thumb = await uploadThumbnail(session.accessJwt, articleUrl)

  const record = {
    $type: 'app.bsky.feed.post',
    text,
    embed: {
      $type: 'app.bsky.embed.external',
      external: {
        uri: articleUrl,
        title: article.title,
        description: article.dek,
        ...(thumb ? { thumb } : {}),
      },
    },
    createdAt: new Date().toISOString(),
  }

  const res = await fetch(`${BLUESKY_SERVICE}/xrpc/com.atproto.repo.createRecord`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.accessJwt}` },
    body: JSON.stringify({ repo: session.did, collection: 'app.bsky.feed.post', record }),
  })
  if (!res.ok) throw new Error(`Bluesky post failed for ${article.slug}: ${res.status} ${await res.text()}`)
}

async function main() {
  const announced = new Set(loadAnnounced())
  const toAnnounce = getPublishedArticles().filter((a) => !announced.has(a.slug))

  if (toAnnounce.length === 0) {
    console.log('No new published articles to announce.')
    return
  }

  const identifier = process.env.BLUESKY_IDENTIFIER
  const password = process.env.BLUESKY_APP_PASSWORD
  if (!identifier || !password) {
    console.error('Missing BLUESKY_IDENTIFIER or BLUESKY_APP_PASSWORD env vars.')
    process.exit(1)
  }

  const session = await createSession(identifier, password)

  for (const article of toAnnounce) {
    console.log(`Announcing: ${article.slug}`)
    await postArticle(session, article)
    announced.add(article.slug)
  }

  saveAnnounced([...announced].sort())
  console.log(`Announced ${toAnnounce.length} article(s).`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
