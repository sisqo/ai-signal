import { LogoMark } from './LogoMark'

export function SiteFooter() {
  return (
    <footer className="border-t border-surface">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex items-center gap-2.5 text-[#12314f] dark:text-white">
          <LogoMark className="h-7 w-7" />
          <span className="font-display text-lg font-semibold text-ink">AI Blog</span>
        </div>
        <p className="mt-2 max-w-sm text-muted">
          Notes on artificial intelligence, for practitioners and the curious alike.
        </p>
      </div>

      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 pb-10 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} AI Blog</span>
        <a
          href="https://sisqo.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted transition-colors duration-150 ease-out-quart hover:text-primary"
        >
          by SisQo
        </a>
      </div>
    </footer>
  )
}
