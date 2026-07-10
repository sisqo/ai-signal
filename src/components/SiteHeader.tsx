'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { LogoMark } from './LogoMark'

const links = [
  { href: '/', label: 'Articles' },
  { href: '/about', label: 'About' },
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className="relative z-20">
      <div className="flex items-center justify-between px-[clamp(24px,5vw,72px)] py-[30px]">
        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-0.5">
          <Link href="/" className="flex items-center gap-3.5">
            <LogoMark className="h-8 w-8" />
            <span className="font-display text-[25px] font-semibold tracking-tight text-fg">AI Signal</span>
          </Link>
          <span className="whitespace-nowrap font-mono text-[13px] tracking-wide text-faint">
            — For people who build
          </span>
        </div>

        <nav className="hidden items-center gap-[clamp(20px,3vw,44px)] font-mono text-sm sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors duration-200 ${
                link.href === '/' ? 'text-fg hover:text-accent' : 'text-muted hover:text-fg'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative grid h-9 w-9 place-items-center"
          >
            <span
              className={`absolute h-[1.5px] w-5 bg-fg transition-transform duration-200 ${
                menuOpen ? 'rotate-45' : '-translate-y-1.5'
              }`}
            />
            <span
              className={`absolute h-[1.5px] w-5 bg-fg transition-opacity duration-150 ${
                menuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute h-[1.5px] w-5 bg-fg transition-transform duration-200 ${
                menuOpen ? '-rotate-45' : 'translate-y-1.5'
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-x-0 top-[73px] bottom-0 z-30 flex flex-col items-start gap-2 bg-bg px-[clamp(24px,5vw,72px)] pt-8 transition-opacity duration-200 sm:hidden ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="font-display text-4xl font-medium tracking-tight text-fg"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  )
}
