export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="5" y="5" width="14" height="14" rx="3" stroke="var(--color-fg)" strokeWidth="1.6" />
      <g stroke="var(--color-fg)" strokeWidth="1.6" strokeLinecap="round">
        <line x1="9" y1="5" x2="9" y2="2.2" />
        <line x1="15" y1="5" x2="15" y2="2.2" />
        <line x1="9" y1="19" x2="9" y2="21.8" />
        <line x1="15" y1="19" x2="15" y2="21.8" />
        <line x1="5" y1="9" x2="2.2" y2="9" />
        <line x1="5" y1="15" x2="2.2" y2="15" />
        <line x1="19" y1="9" x2="21.8" y2="9" />
        <line x1="19" y1="15" x2="21.8" y2="15" />
      </g>
      <g stroke="var(--color-accent)" strokeWidth="1.7" strokeLinecap="round">
        <line x1="12" y1="9.2" x2="12" y2="14.8" />
        <line x1="9.2" y1="12" x2="14.8" y2="12" />
        <line x1="10" y1="10" x2="14" y2="14" />
        <line x1="14" y1="10" x2="10" y2="14" />
      </g>
    </svg>
  )
}
