import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'What Signal is and who writes it.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-4">
      <h1 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
        About Signal
      </h1>
      <div className="prose prose-lg mt-10 max-w-none dark:prose-invert">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
          ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
      </div>
    </div>
  )
}
