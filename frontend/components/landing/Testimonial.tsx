export function Testimonial() {
  return (
    <section
      className="border-t"
      style={{ borderColor: 'var(--border)', padding: '80px 0' }}
    >
      <div className="wrap">
        <div
          className="testimonial-grid grid items-start"
          style={{ gridTemplateColumns: '80px 1fr', gap: 48 }}
        >
          <div
            className="font-serif italic leading-[0.6] tracking-[-0.06em] pt-6 select-none"
            style={{ fontSize: 144, color: 'var(--accent)' }}
            aria-hidden="true"
          >
            &ldquo;
          </div>
          <div>
            <blockquote
              className="font-serif font-normal m-0 leading-[1.2] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(28px,3.5vw,48px)', color: 'var(--ink)' }}
            >
              On a vu passer trois agences IA. Nodal est la première qui a commencé
              par{' '}
              <em className="italic" style={{ color: 'var(--accent)' }}>
                écouter
              </em>{' '}
              avant de proposer. Six mois plus tard, l&apos;outil tourne, mes équipes
              le défendent. C&apos;est devenu un avantage compétitif.
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-serif italic text-[22px] shrink-0"
                style={{ background: 'var(--surface-hover)', color: 'var(--ink-muted)' }}
                aria-hidden="true"
              >
                M
              </div>
              <div className="flex flex-col gap-0.5">
                <span
                  className="text-[14px] font-medium"
                  style={{ color: 'var(--ink)' }}
                >
                  Mathieu Roussel
                </span>
                <span
                  className="font-mono text-[11px] tracking-[0.06em] uppercase"
                  style={{ color: 'var(--ink-subtle)' }}
                >
                  Président · Roussel SAS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
