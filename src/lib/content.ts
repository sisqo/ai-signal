import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const contentDir = path.join(process.cwd(), 'content', 'articles')

export type ArticleMeta = {
  title: string
  slug: string
  dek: string
  date: string
  tag: string
  featured?: boolean
}

export type Article = ArticleMeta & {
  content: string
  readingTime: string
}

export function getAllArticles(): Article[] {
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.mdx'))

  const articles = files.map((file) => {
    const source = fs.readFileSync(path.join(contentDir, file), 'utf8')
    const { data, content } = matter(source)
    const stats = readingTime(content)

    return {
      ...(data as ArticleMeta),
      content,
      readingTime: `${Math.max(1, Math.round(stats.minutes))} min`,
    }
  })

  return articles.sort((a, b) => (a.date < b.date ? 1 : -1))
}

// Articles can carry a future `date` to be scheduled ahead of time (see /new-article's
// --publish flag). A date is "published" once its day has started in Europe/Rome — comparing
// ISO date strings against "today" in that zone sidesteps manual UTC offset/DST math entirely.
export function isPublished(date: string): boolean {
  const todayInRome = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome' }).format(new Date())
  return date <= todayInRome
}

export function getPublishedArticles(): Article[] {
  return getAllArticles().filter((a) => isPublished(a.date))
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(contentDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const source = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(source)
  const stats = readingTime(content)

  return {
    ...(data as ArticleMeta),
    content,
    readingTime: `${Math.max(1, Math.round(stats.minutes))} min`,
  }
}

export function getAllSlugs(): string[] {
  return getAllArticles().map((a) => a.slug)
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
