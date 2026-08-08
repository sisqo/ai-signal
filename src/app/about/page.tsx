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
          AI Signal is a running account of what is happening in artificial intelligence. New models, the tools
          built on top of them, and the moves that explain why any of it matters. It is written for people who
          build with this technology, and for people who are just trying to keep up.
        </p>
        <p>
          Every piece is written in simple English. Most readers here do not speak English as a first language,
          so the sentences stay short and every technical term gets explained. The stakes come first, in plain
          words. Then come the numbers.
        </p>
        <p>
          Direct framing is the house style. Invented drama is not. Every date, price, and name is checked
          against at least two sources before it appears, and every claim that can be linked is linked. No
          manufactured urgency, no headline the piece cannot back up, no press release restated with different
          adjectives.
        </p>
        <p>
          AI Signal is written and edited by SisQo. New pieces publish regularly. They go out when there is
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
