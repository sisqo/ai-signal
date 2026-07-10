const ITEMS = [
  'SIGNAL FEED',
  'AGENTIC LOOPS',
  'TOOLS · INDUSTRY · SOCIETY',
  'FOR PEOPLE WHO BUILD',
  'NO HYPE, JUST SIGNAL',
  'EVAL COVERAGE',
]

function TickerTrack() {
  return (
    <>
      {ITEMS.map((item, i) => (
        <span key={i} className="inline-flex items-center">
          <span className="px-[26px]">{item}</span>
          <span className="text-accent">◆</span>
        </span>
      ))}
    </>
  )
}

export function SignalTicker() {
  return (
    <div className="overflow-hidden whitespace-nowrap border-y border-line" aria-hidden="true">
      <div className="inline-flex w-max animate-[marquee_34s_linear_infinite] py-[11px] font-mono text-[12.5px] tracking-[0.08em] text-muted">
        <TickerTrack />
        <TickerTrack />
      </div>
    </div>
  )
}
