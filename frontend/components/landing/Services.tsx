import { SectionHead } from './SectionHead'

const SERVICES = [
  {
    num: '01',
    title: (
      <>
        Outils SaaS&nbsp;
        <em className="italic" style={{ color: 'var(--accent)' }}>
          sur mesure.
        </em>
      </>
    ),
    desc: "Des applications internes pensées pour un métier précis : qualification de leads, extraction documentaire, suivi opérationnel, scoring. On hérite de votre stack, on ne la remplace pas.",
    exLabel: 'EXEMPLE',
    ex: 'Portail commercial qui qualifie les leads HubSpot en 3 s',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }} aria-hidden="true">
        <circle cx="6" cy="6" r="2.2" /><circle cx="18" cy="6" r="2.2" />
        <circle cx="18" cy="18" r="2.2" /><circle cx="6" cy="18" r="2.2" />
        <path d="M8 6h8M18 8v8M16 18H8M6 16V8" />
      </svg>
    ),
  },
  {
    num: '02',
    title: (
      <>
        Automatisation des&nbsp;
        <em className="italic" style={{ color: 'var(--accent)' }}>
          workflows.
        </em>
      </>
    ),
    desc: "Les processus répétitifs deviennent des graphes documentés. Vos équipes libèrent du temps cognitif pour le travail qui compte vraiment — relation client, décision, création.",
    exLabel: 'EXEMPLE',
    ex: 'OCR factures → vérif TVA → push Pennylane, 1 240/mois',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }} aria-hidden="true">
        <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: (
      <>
        Conseil &amp;&nbsp;
        <em className="italic" style={{ color: 'var(--accent)' }}>
          cartographie.
        </em>
      </>
    ),
    desc: "Trois semaines pour cartographier vos processus, identifier les zones à fort levier IA et chiffrer le retour. Livrable : un graphe de votre métier, une roadmap, des chiffres.",
    exLabel: 'LIVRABLES',
    ex: 'Graphe métier · roadmap 6 mois · estimation gains',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }} aria-hidden="true">
        <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
]

export function Services() {
  return (
    <section
      id="services"
      className="section-pad border-t"
      style={{ padding: '128px 0', borderColor: 'var(--border)' }}
    >
      <div className="wrap">
        <SectionHead
          num="01 — CE QU'ON FAIT"
          title={
            <>
              Trois métiers,
              <br />
              une{' '}
              <em className="italic" style={{ color: 'var(--accent)' }}>
                conviction
              </em>
              .
            </>
          }
          desc="L'IA n'a de valeur que lorsqu'elle entre dans le travail réel des équipes. On construit des outils que vos collaborateurs ouvrent chaque jour — pas des démos."
        />
        <div
          className="services-grid grid border rounded-2xl overflow-hidden"
          style={{
            gridTemplateColumns: 'repeat(3,1fr)',
            background: 'var(--bg-elevated)',
            borderColor: 'var(--border)',
          }}
        >
          {SERVICES.map((s, i) => (
            <article
              key={i}
              className="flex flex-col gap-5 border-r last:border-r-0"
              style={{
                padding: '40px 36px 36px',
                borderColor: 'var(--border)',
                minHeight: 380,
              }}
            >
              <span
                className="font-mono text-[11px] tracking-[0.14em]"
                style={{ color: 'var(--ink-subtle)' }}
              >
                {s.num}
              </span>
              {s.icon}
              <h3
                className="font-serif text-[32px] leading-[1.05] tracking-[-0.018em] font-normal m-0"
                style={{ color: 'var(--ink)' }}
              >
                {s.title}
              </h3>
              <p className="m-0 text-[15px] leading-[1.6]" style={{ color: 'var(--ink-muted)' }}>
                {s.desc}
              </p>
              <div
                className="mt-auto pt-5 border-t border-dashed flex flex-col gap-1 font-mono text-[11px] tracking-[0.06em] uppercase"
                style={{ borderColor: 'var(--border-strong)', color: 'var(--ink-subtle)' }}
              >
                <strong className="font-medium" style={{ color: 'var(--ink)' }}>
                  {s.exLabel}
                </strong>
                <span>{s.ex}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
