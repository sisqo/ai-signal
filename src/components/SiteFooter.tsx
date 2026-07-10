import Link from 'next/link'
import { LogoMark } from './LogoMark'
import { EqualizerBars } from './EqualizerBars'
import { SubscribeForm } from './SubscribeForm'

export function SiteFooter() {
  return (
    <footer className="mt-24 overflow-hidden border-t border-line px-[clamp(24px,5vw,72px)] pb-12 pt-[clamp(56px,7vw,96px)]">
      <div className="grid max-w-feed grid-cols-[repeat(auto-fit,minmax(260px,1fr))] [gap:clamp(40px,6vw,80px)]">
        <div className="max-w-[400px]">
          <Link href="/" className="flex items-center gap-2.5">
            <LogoMark className="h-[26px] w-[26px]" />
            <span className="font-display text-xl font-semibold text-fg">AI Signal</span>
          </Link>
          <p className="mt-4 font-display text-lg leading-snug text-muted">
            Notes on artificial intelligence, for practitioners and the curious alike.
          </p>
          <p className="mt-8 font-mono text-xs tracking-[0.14em] text-faint">SUBSCRIBE TO THE SIGNAL</p>
          <SubscribeForm />
        </div>

        <div>
          <p className="font-mono text-xs tracking-[0.14em] text-faint">READ</p>
          <div className="mt-3.5 flex flex-col gap-3.5 font-mono text-sm">
            <Link href="/articles" className="text-muted transition-colors duration-200 hover:text-accent">
              All Articles
            </Link>
            <Link href="/about" className="text-muted transition-colors duration-200 hover:text-accent">
              About
            </Link>
          </div>
        </div>

        <div>
          <p className="font-mono text-xs tracking-[0.14em] text-faint">MORE</p>
          <div className="mt-3.5 flex flex-col gap-3.5 font-mono text-sm">
            <a
              href="/rss.xml"
              aria-label="Subscribe to AI Signal via RSS"
              className="text-muted transition-colors duration-200 hover:text-accent"
            >
              RSS
            </a>
            <a
              href="https://sisqo.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors duration-200 hover:text-accent"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      <div className="mt-14 flex items-end gap-5">
        <EqualizerBars variant="footer" />
        <span className="font-display text-[clamp(32px,5vw,64px)] font-semibold leading-[0.9] tracking-[-0.02em] text-fg">
          AI Signal
        </span>
      </div>

      <div className="mt-[clamp(48px,6vw,72px)] flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-[13px] text-faint">
        <div className="flex items-center gap-3">
          <EqualizerBars variant="mini" />
          <span>© {new Date().getFullYear()} AI Signal</span>
        </div>
        <span>by SisQo</span>
      </div>
    </footer>
  )
}
