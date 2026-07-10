const VARIANTS = {
  eyebrow: { delays: [0, 0.18, 0.36, 0.54], duration: '1.0s', bar: 'w-[3px]', box: 'h-[22px] gap-[3px]' },
  footer: {
    delays: [0, 0.2, 0.4, 0.6, 0.8],
    duration: '1.1s',
    bar: 'w-[5px]',
    box: 'h-[clamp(40px,7vw,90px)] gap-[5px]',
  },
  mini: { delays: [0, 0.18, 0.36], duration: '1.0s', bar: 'w-[2.5px]', box: 'h-[12px] gap-[3px]' },
}

export function EqualizerBars({ variant = 'eyebrow' }: { variant?: keyof typeof VARIANTS }) {
  const { delays, duration, bar, box } = VARIANTS[variant]

  return (
    <div className={`flex items-end ${box}`} aria-hidden="true">
      {delays.map((delay, i) => (
        <div
          key={i}
          className={`${bar} h-full origin-bottom animate-[eq_1s_ease-in-out_infinite] bg-accent`}
          style={{ animationDelay: `${delay}s`, animationDuration: duration }}
        />
      ))}
    </div>
  )
}
