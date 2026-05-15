import { Logo } from '@/components/brand/Logo'

const COLS = [
  {
    title: 'Société',
    links: [
      { label: 'À propos',  href: '#' },
      { label: 'Équipe',    href: '#' },
      { label: 'Carrières', href: '#' },
      { label: 'Presse',    href: '#' },
    ],
  },
  {
    title: 'Ressources',
    links: [
      { label: 'Cas clients',    href: '#cases' },
      { label: 'Méthode',        href: '#process' },
      { label: 'Journal',        href: '#' },
      { label: 'Design system',  href: '#' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'hello@nodal-ai-services.com', href: 'mailto:hello@nodal-ai-services.com' },
      { label: '+33 1 83 62 87 00',           href: 'tel:+33183628700' },
      { label: 'Paris · 9ᵉ',                  href: '#' },
      { label: 'Mentions légales',            href: '#' },
    ],
  },
]

const SOCIAL = [
  {
    label: 'LinkedIn',
    d: 'M3 5h2v9H3zM4 2a1.25 1.25 0 1 1 0 2.5A1.25 1.25 0 0 1 4 2zM7 5h2v1.3c.4-.7 1.4-1.5 2.7-1.5 2 0 2.3 1.3 2.3 3V14h-2V8.3c0-1-.2-1.8-1.4-1.8-1.2 0-1.6.8-1.6 1.8V14H7z',
  },
  {
    label: 'GitHub',
    d: 'M8 0a8 8 0 0 0-2.5 15.6c.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.4.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-3.9 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.6 7.6 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.5.8 1.2.8 2.1 0 3-1.8 3.7-3.6 3.9.3.2.5.7.5 1.5v2.2c0 .2.1.5.5.4A8 8 0 0 0 8 0z',
  },
]

export function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        borderColor: 'var(--border)',
        paddingTop: 80,
        paddingBottom: 56,
        background: 'var(--bg-sunken)',
      }}
    >
      <div className="wrap">
        {/* Top grid */}
        <div
          className="footer-grid grid gap-12 mb-16"
          style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}
        >
          <div className="flex flex-col gap-4" style={{ maxWidth: '32ch' }}>
            <Logo />
            <p
              className="font-serif italic text-[22px] leading-[1.35] tracking-[-0.01em] mt-1"
              style={{ color: 'var(--ink-muted)' }}
            >
              L&apos;IA qui parle votre métier.
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h5
                className="font-mono text-[11px] tracking-[0.12em] uppercase mb-3.5 font-medium"
                style={{ color: 'var(--ink-subtle)' }}
              >
                {col.title}
              </h5>
              <ul className="list-none p-0 m-0 flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[14px] transition-colors duration-100"
                      style={{ color: 'var(--ink-muted)' }}
                      onMouseEnter={(e) => {
                        ;(e.currentTarget as HTMLElement).style.color = 'var(--ink)'
                      }}
                      onMouseLeave={(e) => {
                        ;(e.currentTarget as HTMLElement).style.color = 'var(--ink-muted)'
                      }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex justify-between items-center pt-6 border-t flex-wrap gap-4"
          style={{ borderColor: 'var(--border)' }}
        >
          <span
            className="font-mono text-[11px] tracking-[0.06em]"
            style={{ color: 'var(--ink-subtle)' }}
          >
            © 2026 NODAL SAS · SIRET 894 217 503 00012 · RGPD COMPLIANT
          </span>
          <div className="flex gap-1.5">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="w-8 h-8 rounded-lg border flex items-center justify-center transition-colors duration-100"
                style={{ borderColor: 'var(--border)', color: 'var(--ink-muted)' }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.color = 'var(--ink)'
                  el.style.borderColor = 'var(--border-strong)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.color = 'var(--ink-muted)'
                  el.style.borderColor = 'var(--border)'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Colossal wordmark */}
        <div
          className="font-serif italic leading-[0.85] tracking-[-0.045em] mt-6 -mb-6 select-none"
          style={{ fontSize: 'clamp(96px,22vw,360px)', color: 'var(--ink)' }}
          aria-hidden="true"
        >
          Nodal.
        </div>
      </div>
    </footer>
  )
}
