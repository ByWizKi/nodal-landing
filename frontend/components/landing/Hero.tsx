import { Button, ButtonLink } from '@/components/ui/Button'

export function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section
      className="relative overflow-hidden isolate border-b"
      style={{ padding: '88px 0 80px', borderColor: 'var(--border)' }}
    >
      {/* Animated graph backdrop */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
        style={{
          opacity: 0.7,
          maskImage:
            'radial-gradient(ellipse 70% 90% at 100% 50%, #000 25%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 90% at 100% 50%, #000 25%, transparent 80%)',
        }}
      >
        <svg
          viewBox="0 0 1200 700"
          preserveAspectRatio="xMaxYMid slice"
          className="w-full h-full"
        >
          <defs>
            <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background edges (faint) */}
          <g stroke="var(--ink-subtle)" strokeWidth="0.6" opacity="0.35" fill="none">
            <path d="M900 80 L1020 200" /><path d="M900 80 L760 220" />
            <path d="M1020 200 L1100 360" /><path d="M760 220 L860 380" />
            <path d="M1020 200 L860 380" /><path d="M1100 360 L1000 520" />
            <path d="M860 380 L1000 520" /><path d="M1000 520 L840 620" />
            <path d="M860 380 L700 480" /><path d="M700 480 L840 620" />
            <path d="M1180 80 L1020 200" /><path d="M620 100 L760 220" />
          </g>

          {/* Active edges (animated dashes) */}
          <g stroke="var(--accent)" strokeWidth="1.4" fill="none" strokeDasharray="4 6" opacity="0.7">
            <path d="M900 80 L1020 200">
              <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M1020 200 L860 380">
              <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="3.4s" repeatCount="indefinite" />
            </path>
            <path d="M860 380 L1000 520">
              <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2.8s" repeatCount="indefinite" />
            </path>
            <path d="M1000 520 L840 620">
              <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="3.6s" repeatCount="indefinite" />
            </path>
          </g>

          {/* Nodes */}
          <g>
            <circle cx="900" cy="80" r="20" fill="url(#node-glow)" opacity="0.7" />
            <circle cx="900" cy="80" r="6" fill="var(--accent)" />
            <circle cx="1020" cy="200" r="20" fill="url(#node-glow)" opacity="0.7" />
            <circle cx="1020" cy="200" r="7" fill="var(--accent)" />
            <circle cx="760" cy="220" r="5" fill="var(--ink-muted)" opacity="0.6" />
            <circle cx="1180" cy="80" r="5" fill="var(--ink-muted)" opacity="0.5" />
            <circle cx="620" cy="100" r="5" fill="var(--ink-muted)" opacity="0.5" />
            <circle cx="1100" cy="360" r="6" fill="var(--ink-muted)" opacity="0.7" />
            <circle cx="860" cy="380" r="22" fill="url(#node-glow)" opacity="0.8" />
            <circle cx="860" cy="380" r="8" fill="var(--accent)" />
            <circle cx="700" cy="480" r="5" fill="var(--ink-muted)" opacity="0.6" />
            <circle cx="1000" cy="520" r="20" fill="url(#node-glow)" opacity="0.7" />
            <circle cx="1000" cy="520" r="7" fill="var(--accent)" />
            <circle cx="840" cy="620" r="6" fill="var(--accent)" />
          </g>

          {/* Moving data dots */}
          <circle r="4" fill="var(--accent)">
            <animateMotion dur="3s" repeatCount="indefinite" path="M900 80 L1020 200" />
          </circle>
          <circle r="4" fill="var(--accent)">
            <animateMotion dur="3.4s" repeatCount="indefinite" path="M1020 200 L860 380" begin="0.4s" />
          </circle>
          <circle r="4" fill="var(--accent)">
            <animateMotion dur="2.8s" repeatCount="indefinite" path="M860 380 L1000 520" begin="0.8s" />
          </circle>
          <circle r="4" fill="var(--accent)">
            <animateMotion dur="3.6s" repeatCount="indefinite" path="M1000 520 L840 620" begin="1.2s" />
          </circle>
        </svg>
      </div>

      <div className="wrap">
        {/* Two-column grid */}
        <div
          className="hero-grid grid items-center"
          style={{ gridTemplateColumns: '1.25fr 1fr', gap: 64 }}
        >
          {/* Left: content */}
          <div style={{ maxWidth: 720 }}>
            {/* Eyebrow pill */}
            <div
              className="inline-flex items-center gap-3 mb-8 border rounded-full"
              style={{
                padding: '6px 14px 6px 10px',
                borderColor: 'var(--border)',
                background: 'var(--bg-elevated)',
              }}
            >
              <span className="pulse-dot" />
              <span
                className="font-mono text-[11px] tracking-[0.08em] uppercase"
                style={{ color: 'var(--ink-muted)' }}
              >
                Studio Nodal v0.4 · 3 créneaux libres
              </span>
            </div>

            <h1
              className="font-serif font-normal m-0 leading-[0.95] tracking-[-0.032em]"
              style={{ fontSize: 'clamp(56px,8.6vw,124px)', color: 'var(--ink)' }}
            >
              L'IA qui parle
              <br />
              <em className="italic" style={{ color: 'var(--accent)' }}>
                votre métier.
              </em>
            </h1>

            <p
              className="mt-8 text-[18px] leading-[1.55]"
              style={{ color: 'var(--ink-muted)', maxWidth: '56ch' }}
            >
              Nodal conçoit des outils SaaS et des automatisations sur mesure pour
              les PME. On part de votre métier — pas d'un modèle générique — et on
              livre des workflows que vos équipes pilotent au quotidien.
            </p>

            <div className="mt-10 flex flex-wrap gap-3 items-center">
              <Button size="lg" onClick={onBook}>
                Cartographier mon métier
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
              <ButtonLink href="#cases" variant="secondary" size="lg">
                Voir les cas clients
              </ButtonLink>
            </div>
          </div>

          {/* Right: product peek card */}
          <div
            className="hero-visual flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="relative w-full" style={{ maxWidth: 520 }}>
              <span
                className="absolute -top-3.5 left-8 z-10 font-mono text-[10px] tracking-[0.14em] uppercase rounded-full px-3 py-1.5"
                style={{ background: 'var(--ink)', color: 'var(--ink-inverse)' }}
              >
                EN PRODUCTION
              </span>
              <div
                className="w-full border rounded-2xl overflow-hidden"
                style={{
                  background: 'var(--bg-elevated)',
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow-xl)',
                  transform: 'rotate(-1deg)',
                }}
              >
                {/* Browser chrome bar */}
                <div
                  className="flex items-center gap-2.5 px-3.5 py-2.5 border-b"
                  style={{ background: 'var(--bg-sunken)', borderColor: 'var(--border)' }}
                >
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full"
                        style={{ background: 'var(--border-strong)' }}
                      />
                    ))}
                  </div>
                  <div
                    className="flex-1 flex items-center justify-center border rounded font-mono text-[10px] tracking-[0.04em]"
                    style={{
                      height: 18,
                      borderColor: 'var(--border)',
                      background: 'var(--surface)',
                      color: 'var(--ink-subtle)',
                    }}
                  >
                    app.nodal.fr / studio / qualification-leads
                  </div>
                </div>

                {/* Card body */}
                <div style={{ padding: '20px 22px 22px' }}>
                  <h4
                    className="font-serif italic text-[24px] tracking-[-0.015em] m-0 mb-1"
                    style={{ color: 'var(--ink)' }}
                  >
                    Qualification entrante.
                  </h4>
                  <div
                    className="font-mono text-[10px] tracking-[0.1em] uppercase mb-4"
                    style={{ color: 'var(--ink-subtle)' }}
                  >
                    ROUSSEL SAS · WORKFLOW 14 NŒUDS · V0.4.2
                  </div>

                  {/* KPIs */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      { k: 'Runs · 30j', v: '1 247' },
                      { k: 'Précision', v: '94,2%' },
                      { k: 'Latence', v: '3,2s' },
                    ].map(({ k, v }) => (
                      <div
                        key={k}
                        className="flex flex-col gap-1 border rounded-lg p-2.5"
                        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                      >
                        <span
                          className="font-mono text-[9px] tracking-[0.1em] uppercase"
                          style={{ color: 'var(--ink-subtle)' }}
                        >
                          {k}
                        </span>
                        <span
                          className="font-serif text-[22px] leading-none tracking-[-0.015em]"
                          style={{ color: 'var(--ink)' }}
                        >
                          {v}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Run list */}
                  <div className="flex flex-col gap-2">
                    {[
                      { status: 'ok',   nm: 'Lead 1247 · Roussel SAS',     sub: 'ICP match · score 87', dur: '3.1s' },
                      { status: 'ok',   nm: 'Lead 1246 · Atelier Beaumont', sub: 'ICP match · score 72', dur: '2.8s' },
                      { status: 'warn', nm: 'Lead 1245 · contact@inco',     sub: 'Enrichi · Clearbit',   dur: '8.4s' },
                      { status: 'ok',   nm: 'Lead 1244 · Mécanique Loire',  sub: 'ICP match · score 91', dur: '2.9s' },
                    ].map((r, i) => (
                      <div
                        key={i}
                        className="grid items-center gap-2.5 py-2 text-[12px]"
                        style={{
                          gridTemplateColumns: '10px 1fr auto',
                          borderTop: i === 0 ? 'none' : '1px solid var(--border)',
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            background:
                              r.status === 'warn' ? 'var(--amber-500)' : 'var(--green-500)',
                          }}
                        />
                        <span style={{ color: 'var(--ink)' }}>
                          {r.nm}
                          <span
                            className="block font-mono text-[10px] mt-0.5 tracking-[0.02em]"
                            style={{ color: 'var(--ink-subtle)' }}
                          >
                            {r.sub}
                          </span>
                        </span>
                        <span
                          className="font-mono text-[10px]"
                          style={{ color: 'var(--ink-muted)' }}
                        >
                          {r.dur}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          className="hero-stats mt-16 pt-6 border-t grid gap-8"
          style={{ borderColor: 'var(--border)', gridTemplateColumns: 'repeat(4,1fr)' }}
        >
          {[
            { k: 'PME accompagnées',           v: '42' },
            { k: 'Heures économisées / mois',  v: '8 400' },
            { k: 'Workflows en production',    v: '137' },
            { k: 'Délai moyen de mise en prod', v: <>21<span className="font-sans text-[18px]" style={{ color: 'var(--ink-muted)' }}> jours</span></> },
          ].map(({ k, v }) => (
            <div key={k} className="flex flex-col gap-1.5">
              <span
                className="font-mono text-[10px] tracking-[0.14em] uppercase"
                style={{ color: 'var(--ink-subtle)' }}
              >
                {k}
              </span>
              <span
                className="font-serif text-[32px] leading-none tracking-[-0.02em]"
                style={{ color: 'var(--ink)' }}
              >
                {v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
