'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={mounted ? `Switch to ${isDark ? 'light' : 'dark'} mode` : 'Toggle theme'}
      className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full border border-line text-fg transition-colors duration-[250ms] hover:border-accent"
    >
      <span
        className="inline-block text-base transition-transform duration-500"
        style={{ transform: `rotate(${isDark ? '0deg' : '180deg'})` }}
        aria-hidden="true"
      >
        ◐
      </span>
    </button>
  )
}
