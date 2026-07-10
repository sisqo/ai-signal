'use client'

export function SubscribeForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mt-3 flex items-center gap-1 rounded-[9px] border border-line py-1 pl-3 pr-1 transition-colors duration-200 focus-within:border-accent hover:border-accent"
    >
      <input
        type="email"
        required
        placeholder="you@domain.com"
        className="min-w-0 flex-1 bg-transparent py-1.5 font-mono text-sm text-fg placeholder:text-faint focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-bg transition-opacity duration-200 hover:opacity-85"
      >
        →
      </button>
    </form>
  )
}
