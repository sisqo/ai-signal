'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ThemeToggle } from './ThemeToggle'

const links = [
  { href: '/', label: 'Articles' },
  { href: '/about', label: 'About' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-bg transition-colors duration-200 ease-out-quart ${
        scrolled ? 'border-surface' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-display text-xl font-semibold text-ink">
          Signal
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border-b border-transparent pb-0.5 text-ink transition-colors duration-150 ease-out-quart hover:border-primary"
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
              className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-200 ease-out-quart ${
                menuOpen ? 'rotate-45' : '-translate-y-1.5'
              }`}
            />
            <span
              className={`absolute h-[1.5px] w-5 bg-ink transition-opacity duration-150 ease-out-quart ${
                menuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-200 ease-out-quart ${
                menuOpen ? '-rotate-45' : 'translate-y-1.5'
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-x-0 top-[73px] bottom-0 z-30 flex flex-col items-start gap-2 bg-bg px-6 pt-8 transition-opacity duration-200 ease-out-quart sm:hidden ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="font-display text-4xl font-medium tracking-tight text-ink"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  )
}
