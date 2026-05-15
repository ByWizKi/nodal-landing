interface Props { size?: number; className?: string }

export function LogoMark({ size = 24, className = '' }: Props) {
  return (
    <svg
      viewBox="0 0 60 60"
      width={size}
      height={size}
      className={className}
      style={{ color: 'var(--ink)' }}
      aria-hidden="true"
    >
      <line x1="14" y1="14" x2="14" y2="46" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="14" y1="14" x2="46" y2="46" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="46" y1="14" x2="46" y2="46" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="14" cy="14" r="5.2" fill="currentColor" />
      <circle cx="14" cy="46" r="5.2" fill="currentColor" />
      <circle cx="46" cy="14" r="5.2" fill="currentColor" />
      <circle cx="46" cy="46" r="5.2" fill="currentColor" />
    </svg>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <a
      href="#top"
      aria-label="Nodal — accueil"
      className={`inline-flex items-center gap-2.5 ${className}`}
    >
      <LogoMark size={28} />
      <span
        className="font-serif text-[22px] leading-none tracking-[-0.025em]"
        style={{ color: 'var(--ink)' }}
      >
        Nodal
      </span>
    </a>
  )
}
