import { SectionHead } from './SectionHead'
import { Badge } from '@/components/ui/Badge'

const CASES = [
  {
    industry: 'INDUSTRIE · 180 SALARIÉS',
    client: 'Roussel SAS',
    summary:
      'Fabricant de pièces mécaniques de précision. Le service ADV traitait 600 commandes/mois à la main, avec 3 commerciaux sédentaires saturés.',
    tags: ['Extraction OCR', 'SAP', 'Workflow 14 nœuds'],
    stats: [
      { k: 'Traitement / cmd', prefix: '−', em: '78', unit: '%', ctx: 'De 14 min à 3 min' },
      { k: 'Erreurs de saisie', prefix: '−', em: '92', unit: '%', ctx: 'Mesuré sur 6 mois' },
      { k: 'Mise en prod', prefix: '', em: '18', unit: 'j', ctx: 'Cartographie incluse' },
    ],
    quote:
      "« Pour la première fois, on a senti que l'IA s'adaptait à notre métier, pas l'inverse. Nos commerciaux sont redevenus commerciaux. »",
    attr: 'CAMILLE LEROY · DIRECTRICE COMMERCIALE',
  },
  {
    industry: 'SERVICES · 45 SALARIÉS',
    client: 'Atelier Beaumont',
    summary:
      'Cabinet de courtage en assurance pro. Cinq personnes lisaient des contrats toute la journée pour produire des comparatifs clients.',
    tags: ['RAG', 'claude-haiku-4.5', 'Slack'],
    stats: [
      { k: 'Temps / comparatif', prefix: '−', em: '85', unit: '%', ctx: 'De 2 h à 18 min' },
      { k: 'CA / consultant', prefix: '+', em: '34', unit: '%', ctx: 'À effectif constant' },
      { k: 'Mise en prod', prefix: '', em: '24', unit: 'j', ctx: 'Phase pilote 8 j' },
    ],
    quote:
      "« L'outil parle notre vocabulaire. Quand un consultant pose une question, il reçoit une réponse — pas un essai. »",
    attr: 'MARTIN DUPRÉ · ASSOCIÉ FONDATEUR',
  },
  {
    industry: 'RETAIL · 12 BOUTIQUES',
    client: 'Pâtisserie Léon',
    summary:
      'Douze boutiques, une production centralisée. Les prévisions de commandes étaient faites à la main par chaque responsable de boutique, le dimanche soir.',
    tags: ['Prévision', 'Tableau de bord', 'Mobile'],
    stats: [
      { k: 'Invendus', prefix: '−', em: '41', unit: '%', ctx: 'Moyenne 6 mois' },
      { k: 'Ruptures', prefix: '−', em: '67', unit: '%', ctx: 'Sur produits A+B' },
      { k: 'Mise en prod', prefix: '', em: '21', unit: 'j', ctx: 'Sur 3 boutiques pilotes' },
    ],
    quote:
      '« Mes responsables de boutique ne passent plus leur dimanche à prédire. Ils valident une proposition en deux clics. »',
    attr: 'JEAN-PHILIPPE LÉON · PRÉSIDENT',
  },
]

export function Cases() {
  return (
    <section
      id="cases"
      className="section-pad border-t"
      style={{ padding: '128px 0', borderColor: 'var(--border)' }}
    >
      <div className="wrap">
        <SectionHead
          num="03 — CAS CLIENTS"
          title={
            <>
              Le travail
              <br />
              en{' '}
              <em className="italic" style={{ color: 'var(--accent)' }}>
                production
              </em>
              .
            </>
          }
          desc="Trois clients, trois métiers, trois zones d'automatisation. Chiffres mesurés après six mois en production, partagés avec leur accord."
        />
        <div className="border-t flex flex-col" style={{ borderColor: 'var(--border)' }}>
          {CASES.map((c, i) => (
            <article
              key={i}
              className="cases-row grid gap-16 py-16 border-b items-start"
              style={{ gridTemplateColumns: '1fr 1.2fr', borderColor: 'var(--border)' }}
            >
              {/* Meta */}
              <div className="flex flex-col gap-4">
                <span
                  className="font-mono text-[11px] tracking-[0.12em] uppercase"
                  style={{ color: 'var(--ink-subtle)' }}
                >
                  {c.industry}
                </span>
                <h3
                  className="font-serif italic text-[36px] leading-[1.05] tracking-[-0.018em] m-0"
                  style={{ color: 'var(--ink)' }}
                >
                  {c.client}
                </h3>
                <p
                  className="text-[15px] leading-[1.55] mt-2 m-0"
                  style={{ color: 'var(--ink-muted)' }}
                >
                  {c.summary}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {c.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </div>

              {/* Stats + quote */}
              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-3 gap-4">
                  {c.stats.map((s, j) => (
                    <div
                      key={j}
                      className="border-l pl-[18px] flex flex-col gap-1"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <span
                        className="font-mono text-[10px] tracking-[0.14em] uppercase"
                        style={{ color: 'var(--ink-subtle)' }}
                      >
                        {s.k}
                      </span>
                      <span
                        className="font-serif text-[48px] leading-none tracking-[-0.025em]"
                        style={{ color: 'var(--ink)' }}
                      >
                        {s.prefix}
                        <em className="italic" style={{ color: 'var(--accent)' }}>
                          {s.em}
                        </em>
                        <span
                          className="text-[24px] ml-0.5"
                          style={{ color: 'var(--ink-muted)' }}
                        >
                          {s.unit}
                        </span>
                      </span>
                      <span
                        className="text-[12px] mt-0.5"
                        style={{ color: 'var(--ink-muted)' }}
                      >
                        {s.ctx}
                      </span>
                    </div>
                  ))}
                </div>
                <blockquote
                  className="border-l-2 pl-5 py-2 font-serif italic text-[22px] leading-[1.45] tracking-[-0.01em] m-0"
                  style={{ borderColor: 'var(--accent)', color: 'var(--ink)' }}
                >
                  {c.quote}
                </blockquote>
                <div
                  className="font-mono text-[11px] tracking-[0.08em] uppercase pl-[22px] -mt-4"
                  style={{ color: 'var(--ink-subtle)' }}
                >
                  {c.attr}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
