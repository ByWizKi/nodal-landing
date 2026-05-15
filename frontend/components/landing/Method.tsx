import { SectionHead } from './SectionHead'

const STEPS = [
  {
    num: 'ÉTAPE 01',
    title: <>Écouter,<br /><em>cartographier</em>.</>,
    desc: "On passe une semaine avec vos équipes. Pas de slides, pas de promesses. On observe le travail réel, on note les frictions, on dessine le graphe.",
    duration: 'Semaine 1 · 5 jours',
  },
  {
    num: 'ÉTAPE 02',
    title: <>Choisir<br />les <em>bonnes</em> zones.</>,
    desc: "Pas tout. Trois ou quatre zones à fort levier : volume répétitif, décision à enjeu, ou information dispersée. On chiffre les gains attendus.",
    duration: 'Semaine 1 · 2 jours',
  },
  {
    num: 'ÉTAPE 03',
    title: <>Construire,<br /><em>itérer</em>.</>,
    desc: "Premier workflow en main de vos équipes sous 7 jours. On corrige, on calibre, on entraîne. La version 1 entre en production en semaine 3.",
    duration: 'Semaines 2 — 3',
  },
  {
    num: 'ÉTAPE 04',
    title: <>Transmettre,<br /><em>tenir</em>.</>,
    desc: "Vos équipes gardent la main : edit des prompts, monitoring, dashboards. On reste en astreinte 6 mois — vous restez autonomes.",
    duration: 'Semaine 4 → continu',
  },
]

export function Method() {
  return (
    <section
      id="process"
      className="section-pad border-t"
      style={{ padding: '128px 0', borderColor: 'var(--border)' }}
    >
      <div className="wrap">
        <SectionHead
          num="02 — COMMENT ON TRAVAILLE"
          title={
            <>
              Quatre semaines
              <br />
              de la{' '}
              <em className="italic" style={{ color: 'var(--accent)' }}>
                carte
              </em>{' '}
              au{' '}
              <em className="italic" style={{ color: 'var(--accent)' }}>
                code
              </em>
              .
            </>
          }
          desc="Un déroulé volontairement court. On préfère livrer un workflow imparfait qu'on itère qu'un système parfait qu'on n'utilise pas."
        />
        <div
          className="method-grid grid gap-8"
          style={{ gridTemplateColumns: 'repeat(4,1fr)' }}
        >
          {STEPS.map((s, i) => (
            <div key={i} className="flex flex-col gap-4 relative pt-8">
              <div
                className="absolute top-0 left-0 w-8 h-px"
                style={{ background: 'var(--accent)' }}
              />
              <span
                className="font-mono text-[11px] tracking-[0.14em]"
                style={{ color: 'var(--accent)' }}
              >
                {s.num}
              </span>
              <h4
                className="font-serif text-[28px] leading-[1.08] tracking-[-0.018em] font-normal m-0"
                style={{ color: 'var(--ink)' }}
              >
                {s.title}
              </h4>
              <p
                className="m-0 text-[14.5px] leading-[1.6]"
                style={{ color: 'var(--ink-muted)' }}
              >
                {s.desc}
              </p>
              <span
                className="font-mono text-[11px] tracking-[0.08em] uppercase mt-1"
                style={{ color: 'var(--ink-subtle)' }}
              >
                {s.duration}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
