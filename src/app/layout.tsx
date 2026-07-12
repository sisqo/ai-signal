import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { newsreader, ibmPlexSans, jetbrainsMono } from '@/lib/fonts'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { SignalTicker } from '@/components/SignalTicker'
import { SITE_URL } from '@/lib/site'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'AI Signal — Notes on artificial intelligence',
    template: '%s — AI Signal',
  },
  description: 'An editorial-quality blog about artificial intelligence, for practitioners and the curious alike.',
  openGraph: {
    title: 'AI Signal',
    description: 'Notes on artificial intelligence, for practitioners and the curious alike.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    types: {
      'application/rss+xml': [{ url: '/rss.xml', title: 'AI Signal (RSS)' }],
      'application/atom+xml': [{ url: '/atom.xml', title: 'AI Signal (Atom)' }],
      'application/feed+json': [{ url: '/feed.json', title: 'AI Signal (JSON Feed)' }],
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#111214',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${newsreader.variable} ${ibmPlexSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <SignalTicker />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
