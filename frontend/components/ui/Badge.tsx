export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center h-6 px-2.5 rounded-full border font-mono text-[11px] tracking-[0.06em] uppercase"
      style={{
        background: 'var(--bg-sunken)',
        borderColor: 'var(--border)',
        color: 'var(--ink-muted)',
      }}
    >
      {children}
    </span>
  )
}
