import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'What AI Signal is and who writes it.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-copy px-[clamp(24px,5vw,72px)] pb-24 pt-[clamp(28px,4vw,60px)]">
      <h1
        className="font-display text-fg"
        style={{ fontSize: 'clamp(30px,3.6vw,52px)', fontWeight: 560, lineHeight: 1.02, letterSpacing: '-0.02em' }}
      >
        About AI Signal
      </h1>
      <div className="prose prose-lg mt-10 max-w-none dark:prose-invert">
        <p>
          AI Signal is a running account of what&rsquo;s actually happening in artificial intelligence — new
          models, the tools built on top of them, and the industry moves that explain why any of it matters —
          written for people who build with this technology and people who are simply trying to keep up with it.
        </p>
        <p>
          The starting assumption is that both audiences deserve the same thing: pieces that get to the point, use
          real names and numbers instead of vague hand-waving, and stop once they&rsquo;ve made their case. No
          manufactured urgency, no unearned hype, no restating a press release with different adjectives.
        </p>
        <p>
          AI Signal is written and edited by SisQo. New pieces publish regularly — when there&rsquo;s
          something worth writing about, not on a fixed schedule for its own sake.
        </p>
        <p>
          Questions, corrections, or a story worth covering? Reach out at{' '}
          <a href="https://sisqo.dev" target="_blank" rel="noopener noreferrer">
            sisqo.dev
          </a>
          .
        </p>
      </div>
    </div>
  )
}
