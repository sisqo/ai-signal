import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-copy px-[clamp(24px,5vw,72px)] py-32 text-center">
      <p className="font-mono text-sm text-muted">404</p>
      <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-fg sm:text-5xl">
        This page went quiet.
      </h1>
      <Link
        href="/"
        className="mt-8 inline-block border-b border-accent text-accent transition-colors duration-150 hover:border-fg hover:text-fg"
      >
        Back to AI Signal
      </Link>
    </div>
  )
}
