export function LogoStrip() {
  return (
    <section
      className="border-b"
      style={{ borderColor: 'var(--border)', padding: '28px 0' }}
    >
      <div className="wrap flex items-center gap-12 flex-wrap justify-between">
        <span
          className="font-mono text-[11px] tracking-[0.12em] uppercase whitespace-nowrap"
          style={{ color: 'var(--ink-subtle)' }}
        >
          Choisis par des PME ambitieuses —
        </span>
        <div
          className="flex gap-10 items-center flex-wrap"
          style={{ color: 'var(--ink-muted)', opacity: 0.85 }}
        >
          <span className="font-serif italic text-[22px] tracking-[-0.01em]">
            Roussel{' '}
            <span className="font-sans not-italic font-semibold text-[14px]">SAS</span>
          </span>
          <span className="font-sans font-bold text-[18px] tracking-[-0.02em]">
            Atelier Beaumont
          </span>
          <span className="font-mono text-[15px] tracking-[0.02em]">méca·loire</span>
          <span className="font-serif italic text-[22px] tracking-[-0.01em]">
            Pâtisserie&nbsp;
            <em>Léon</em>
          </span>
          <span className="font-sans font-medium text-[16px] tracking-[-0.01em]">
            CLAVERA &amp; Co.
          </span>
          <span className="font-mono text-[14px] tracking-[0.1em] uppercase">
            NORD·LOGISTIQUE
          </span>
        </div>
      </div>
    </section>
  )
}
