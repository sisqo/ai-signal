'use client'

import { useState, type FormEvent } from 'react'

export function SiteFooter() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <footer className="border-t border-surface">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-lg font-semibold text-ink">Signal</p>
          <p className="mt-2 text-muted">
            Notes on artificial intelligence, for practitioners and the curious alike.
          </p>
        </div>

        <div className="w-full max-w-sm">
          {submitted ? (
            <p className="font-mono text-sm text-muted">You&rsquo;re on the list. More soon.</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex items-end gap-4">
              <div className="flex-1">
                <label htmlFor="email" className="font-mono text-xs uppercase tracking-wide text-muted">
                  Get new articles by email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="mt-2 w-full border-b border-muted bg-transparent py-2 text-ink placeholder:text-muted focus:border-2 focus:border-primary focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 rounded-sm bg-primary px-6 py-3 font-mono text-xs font-medium uppercase tracking-wide text-[color:var(--color-on-primary)] transition-colors duration-150 ease-out-quart hover:bg-ink hover:text-bg"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 pb-10 font-mono text-xs text-muted">
        © {new Date().getFullYear()} Signal
      </div>
    </footer>
  )
}
