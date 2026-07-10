'use client'

import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const d = document.documentElement
      const max = d.scrollHeight - d.clientHeight
      setProgress(max > 0 ? Math.min(100, (d.scrollTop / max) * 100) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5" aria-hidden="true">
      <div
        className="h-full bg-accent transition-[width] duration-[80ms] ease-linear"
        style={{ width: `${progress}%`, boxShadow: '0 0 12px var(--color-accent)' }}
      />
    </div>
  )
}
