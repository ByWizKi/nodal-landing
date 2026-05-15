import { Button } from '@/components/ui/Button'

export function CTA({ onBook }: { onBook: () => void }) {
  return (
    <section
      id="cta"
      className="section-pad border-t relative overflow-hidden"
      style={{ padding: '160px 0', borderColor: 'var(--border)' }}
    >
      {/* Animated background graph */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
        style={{
          opacity: 0.5,
          maskImage:
            'radial-gradient(ellipse 60% 80% at 90% 50%, #000 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 80% at 90% 50%, #000 30%, transparent 75%)',
        }}
      >
        <svg
          viewBox="0 0 1200 700"
          preserveAspectRatio="xMaxYMid slice"
          className="w-full h-full"
        >
          <g stroke="var(--ink-subtle)" strokeWidth="0.5" opacity="0.4" fill="none">
            <path d="M850 100 L1000 250 L900 420 L1050 550 L850 640" />
            <path d="M1000 250 L1150 200" />
            <path d="M900 420 L750 380" />
            <path d="M1050 550 L1180 480" />
          </g>
          <g stroke="var(--accent)" strokeWidth="1.4" fill="none" strokeDasharray="4 6" opacity="0.7">
            <path d="M850 100 L1000 250">
              <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="3.2s" repeatCount="indefinite" />
            </path>
            <path d="M1000 250 L900 420">
              <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="3.6s" repeatCount="indefinite" />
            </path>
            <path d="M900 420 L1050 550">
              <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2.8s" repeatCount="indefinite" />
            </path>
          </g>
          <g>
            <circle cx="850" cy="100" r="6" fill="var(--accent)" />
            <circle cx="1000" cy="250" r="8" fill="var(--accent)" />
            <circle cx="900" cy="420" r="7" fill="var(--accent)" />
            <circle cx="1050" cy="550" r="8" fill="var(--accent)" />
            <circle cx="850" cy="640" r="6" fill="var(--accent)" />
            <circle cx="1150" cy="200" r="4" fill="var(--ink-muted)" />
            <circle cx="750" cy="380" r="4" fill="var(--ink-muted)" />
            <circle cx="1180" cy="480" r="4" fill="var(--ink-muted)" />
          </g>
        </svg>
      </div>

      <div className="wrap">
        <h2
          className="font-serif font-normal m-0 leading-[0.95] tracking-[-0.035em]"
          style={{ fontSize: 'clamp(56px,9vw,144px)', maxWidth: '14ch', color: 'var(--ink)' }}
        >
          Trois semaines
          <br />
          pour{' '}
          <em className="italic" style={{ color: 'var(--accent)' }}>
            voir
          </em>
          <br />
          votre métier
          <br />
          autrement.
        </h2>
        <p
          className="mt-8 text-[18px] leading-[1.55]"
          style={{ color: 'var(--ink-muted)', maxWidth: '56ch' }}
        >
          Une heure pour qu&apos;on comprenne ce que vous faites. Trois semaines pour
          livrer la carte. Aucun engagement de poursuivre — on commence par se rencontrer.
        </p>
        <div className="mt-12 flex flex-wrap gap-3 items-center">
          <Button size="lg" onClick={onBook}>
            Réserver un échange
            <svg
              className="w-4 h-4"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Button>
          <span
            className="ml-4 font-mono text-[11px] tracking-[0.08em] uppercase"
            style={{ color: 'var(--ink-subtle)' }}
          >
            RÉPONSE SOUS 24 H · 30 MIN PAR APPEL
          </span>
        </div>
      </div>
    </section>
  )
}
