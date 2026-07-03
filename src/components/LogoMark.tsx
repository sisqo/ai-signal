export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1024 1024" className={className} fill="none" aria-hidden="true">
      <defs>
        <g id="pin">
          <rect x="-9" y="0" width="18" height="46" rx="6" />
        </g>
      </defs>

      <g fill="currentColor">
        <use href="#pin" x="410" y="316" />
        <use href="#pin" x="461" y="316" />
        <use href="#pin" x="547" y="316" />
        <use href="#pin" x="598" y="316" />

        <use href="#pin" x="410" y="662" transform="rotate(180 410 685)" />
        <use href="#pin" x="461" y="662" transform="rotate(180 461 685)" />
        <use href="#pin" x="512" y="662" transform="rotate(180 512 685)" />
        <use href="#pin" x="563" y="662" transform="rotate(180 563 685)" />
        <use href="#pin" x="614" y="662" transform="rotate(180 614 685)" />

        <use href="#pin" x="284" y="424" transform="rotate(-90 284 447)" />
        <use href="#pin" x="284" y="475" transform="rotate(-90 284 498)" />
        <use href="#pin" x="284" y="526" transform="rotate(-90 284 549)" />
        <use href="#pin" x="284" y="577" transform="rotate(-90 284 600)" />
        <use href="#pin" x="284" y="628" transform="rotate(-90 284 651)" />

        <use href="#pin" x="740" y="424" transform="rotate(90 740 447)" />
        <use href="#pin" x="740" y="475" transform="rotate(90 740 498)" />
        <use href="#pin" x="740" y="526" transform="rotate(90 740 549)" />
        <use href="#pin" x="740" y="577" transform="rotate(90 740 600)" />
        <use href="#pin" x="740" y="628" transform="rotate(90 740 651)" />
      </g>

      <rect x="328" y="362" width="352" height="352" rx="54" fill="currentColor" />
      <rect x="345" y="379" width="318" height="318" rx="40" className="fill-bg" />
      <rect x="359" y="393" width="290" height="290" rx="30" fill="currentColor" />

      <path
        d="M 612 296 C 596 280, 626 266, 656 271 C 692 277, 720 302, 722 338 C 724 368, 703 390, 674 392 C 655 393, 636 388, 620 378"
        fill="none"
        stroke="currentColor"
        strokeWidth="17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="612" cy="296" r="11" fill="currentColor" />

      <path
        d="M 620 378 C 605 392, 588 415, 578 440 C 570 460, 566 470, 563 479"
        fill="none"
        className="stroke-bg"
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g className="stroke-bg" strokeWidth="6" strokeLinecap="round">
        <line x1="563" y1="479" x2="527" y2="511" />
        <line x1="445" y1="479" x2="481" y2="511" />
        <line x1="563" y1="597" x2="527" y2="565" />
        <line x1="445" y1="597" x2="481" y2="565" />
      </g>

      <g className="fill-bg">
        <circle cx="563" cy="479" r="15" />
        <circle cx="445" cy="479" r="15" />
        <circle cx="563" cy="597" r="15" />
        <circle cx="445" cy="597" r="15" />
      </g>

      <path
        d="M 504 452 Q 517 528 592 538 Q 517 548 504 624 Q 491 548 416 538 Q 491 528 504 452 Z"
        className="fill-bg"
      />

      <g fill="currentColor">
        <rect x="452" y="742" width="24" height="70" rx="4" />
        <rect x="493" y="762" width="24" height="50" rx="4" />
        <rect x="534" y="782" width="24" height="30" rx="4" />
        <rect x="575" y="796" width="20" height="16" rx="4" />
      </g>
    </svg>
  )
}
