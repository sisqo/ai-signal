import { Feed, type Item } from 'feed'
import { getAllArticles } from './content'
import { SITE_URL } from './site'

const SITE_TITLE = 'AI Signal'
const SITE_DESCRIPTION = 'Notes on artificial intelligence, for practitioners and the curious alike.'
const AUTHOR = { name: 'SisQo', link: 'https://sisqo.dev' }
const MAX_ITEMS = 20

export function buildFeed(): Feed {
  const articles = getAllArticles().slice(0, MAX_ITEMS)

  const feed = new Feed({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    id: SITE_URL,
    link: SITE_URL,
    language: 'en',
    image: `${SITE_URL}/icon-512.png`,
    favicon: `${SITE_URL}/icon-192.png`,
    copyright: `© ${new Date().getFullYear()} AI Signal`,
    updated: articles[0] ? new Date(articles[0].date) : new Date(),
    generator: 'AI Signal feed generator',
    feedLinks: {
      rss2: `${SITE_URL}/rss.xml`,
      atom: `${SITE_URL}/atom.xml`,
      json: `${SITE_URL}/feed.json`,
    },
    author: AUTHOR,
  })

  const tags = new Set<string>()

  for (const article of articles) {
    const url = `${SITE_URL}/articles/${article.slug}`
    const item: Item = {
      title: article.title,
      id: url,
      link: url,
      description: article.dek,
      date: new Date(article.date),
      category: [{ name: article.tag }],
    }
    feed.addItem(item)
    tags.add(article.tag)
  }

  tags.forEach((tag) => feed.addCategory(tag))

  return feed
}
