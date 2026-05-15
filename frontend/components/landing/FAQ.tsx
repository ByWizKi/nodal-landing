import { SectionHead } from './SectionHead'

const FAQS = [
  {
    q: 'Combien ça coûte ?',
    a: (
      <>
        <p>
          La cartographie initiale est forfaitaire :{' '}
          <strong>4&nbsp;800&nbsp;€&nbsp;HT</strong> pour trois semaines de travail et
          un livrable complet. C&apos;est notre point d&apos;entrée — vous repartez avec
          le graphe de votre métier, même si vous décidez de ne pas aller plus loin avec
          nous.
        </p>
        <p>
          Le développement d&apos;un workflow tient ensuite généralement entre{' '}
          <strong>12&nbsp;000&nbsp;€</strong> et <strong>45&nbsp;000&nbsp;€</strong> selon
          la complexité. Sans tickets cachés.
        </p>
      </>
    ),
  },
  {
    q: 'Combien de temps pour avoir quelque chose qui marche ?',
    a: (
      <p>
        Trois semaines pour la cartographie, trois à six semaines pour un premier workflow
        en production. Notre record est de 11 jours sur un cas simple — notre moyenne est
        de 21 jours.
      </p>
    ),
  },
  {
    q: 'Mes données partent-elles entraîner GPT ou Claude ?',
    a: (
      <p>
        Non. On utilise les APIs entreprise des fournisseurs (Anthropic, OpenAI, Mistral)
        qui garantissent par contrat que vos données ne sont pas utilisées pour
        l&apos;entraînement. Pour les cas sensibles, on déploie des modèles open-source
        en local chez OVH.
      </p>
    ),
  },
  {
    q: "On n'a pas de data team. C'est un problème ?",
    a: (
      <p>
        Au contraire — c&apos;est notre terrain. 80&nbsp;% de nos clients n&apos;ont
        aucune équipe data. On gère toute la partie technique. Vos équipes métier
        interagissent avec des interfaces qui parlent leur langue, pas des notebooks.
      </p>
    ),
  },
  {
    q: 'Que se passe-t-il après la mise en production ?',
    a: (
      <p>
        Six mois d&apos;astreinte inclus : monitoring, corrections, ajustements de
        prompts. Vos équipes gardent un accès &ldquo;édition&rdquo; aux logiques métier —
        pas besoin de nous rappeler pour modifier un prompt. Après six mois, on propose un
        contrat de maintenance ou on transmet le code à votre équipe.
      </p>
    ),
  },
  {
    q: 'Et si ça ne marche pas ?',
    a: (
      <p>
        La cartographie est livrée en 3 semaines. Si on ne trouve pas de zone à fort
        levier, on vous le dit — et on vous rembourse 50&nbsp;%. Sur les workflows, on
        travaille à objectif&nbsp;: si le KPI cible n&apos;est pas atteint à 6 mois, on
        continue jusqu&apos;à ce qu&apos;il le soit, sans frais supplémentaires.
      </p>
    ),
  },
]

export function FAQ() {
  return (
    <section
      id="faq"
      className="section-pad border-t"
      style={{ padding: '128px 0', borderColor: 'var(--border)' }}
    >
      <div className="wrap">
        <SectionHead
          num="05 — QUESTIONS"
          title={
            <>
              Avant
              <br />
              de{' '}
              <em className="italic" style={{ color: 'var(--accent)' }}>
                commencer
              </em>
              .
            </>
          }
          desc="Les questions qui reviennent le plus souvent lors de nos premières conversations. Si la vôtre n'est pas là, écrivez-nous — on répond en moins de 24 h."
        />
        <div className="flex flex-col">
          {FAQS.map((item, i) => (
            <div
              key={i}
              className="faq-row grid py-7 border-t last:border-b"
              style={{
                gridTemplateColumns: '1fr 1.4fr',
                gap: 64,
                borderColor: 'var(--border)',
              }}
            >
              <div
                className="font-serif italic leading-[1.2] tracking-[-0.015em]"
                style={{ fontSize: 'clamp(20px,2.4vw,28px)', color: 'var(--ink)' }}
              >
                {item.q}
              </div>
              <div
                className="text-[15px] leading-[1.65] [&_p]:mb-3 [&_p:last-child]:mb-0"
                style={{ color: 'var(--ink-muted)' }}
              >
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
