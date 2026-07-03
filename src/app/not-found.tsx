import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <p className="font-mono text-sm text-muted">404</p>
      <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
        This page went quiet.
      </h1>
      <Link
        href="/"
        className="mt-8 inline-block border-b border-primary text-primary transition-colors duration-150 ease-out-quart hover:text-ink hover:border-ink"
      >
        Back to AI Signal
      </Link>
    </div>
  )
}
