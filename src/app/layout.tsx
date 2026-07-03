import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { fraunces, publicSans, jetbrainsMono } from '@/lib/fonts'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://ai-signal.sisqo.dev'),
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
}

export const viewport: Viewport = {
  themeColor: '#020202',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${publicSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
