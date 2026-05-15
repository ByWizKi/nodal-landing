import { SectionHead } from './SectionHead'

const INTEGRATIONS = [
  { logo: 'HubSpot',     role: 'CRM',        style: 'bold' },
  { logo: 'Pipedrive',   role: 'CRM',        style: 'serif' },
  { logo: 'Pennylane',   role: 'Compta',     style: 'bold' },
  { logo: 'Sage',        role: 'ERP',        style: 'serif' },
  { logo: 'Cegid',       role: 'ERP',        style: 'bold' },
  { logo: 'notion',      role: 'Docs',       style: 'mono' },
  { logo: 'Slack',       role: 'Messagerie', style: 'bold' },
  { logo: 'teams',       role: 'Messagerie', style: 'mono' },
  { logo: 'Airtable',    role: 'Données',    style: 'serif' },
  { logo: 'Stripe',      role: 'Paiement',   style: 'bold' },
  { logo: 'Salesforce',  role: 'CRM',        style: 'serif' },
  { logo: '+ 40 autres', role: 'API REST',   style: 'mono' },
]

const logoStyle = (s: string) =>
  ({
    bold:  'font-sans font-semibold text-[18px] tracking-[-0.02em]',
    serif: 'font-serif italic text-[26px] tracking-[-0.01em]',
    mono:  'font-mono text-[16px] tracking-[-0.01em] lowercase',
  }[s] ?? '')

export function Stack() {
  return (
    <section
      id="stack"
      className="section-pad border-t"
      style={{ padding: '128px 0', borderColor: 'var(--border)' }}
    >
      <div className="wrap">
        <SectionHead
          num="04 — STACK"
          title={
            <>
              On hérite
              <br />
              de la{' '}
              <em className="italic" style={{ color: 'var(--accent)' }}>
                vôtre
              </em>
              .
            </>
          }
          desc="Nodal ne remplace pas votre CRM, votre ERP ou votre messagerie. On s'y connecte — proprement, à l'API, jamais par scraping. Voici nos intégrations natives."
        />

        <div
          className="stack-grid grid gap-px rounded-xl overflow-hidden border"
          style={{
            gridTemplateColumns: 'repeat(6,1fr)',
            background: 'var(--border)',
            borderColor: 'var(--border)',
          }}
        >
          {INTEGRATIONS.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-3 p-5 text-center"
              style={{ background: 'var(--bg-elevated)', aspectRatio: '1.3/1' }}
            >
              <span className={logoStyle(item.style)} style={{ color: 'var(--ink)' }}>
                {item.logo}
              </span>
              <span
                className="font-mono text-[10px] tracking-[0.1em] uppercase"
                style={{ color: 'var(--ink-subtle)' }}
              >
                {item.role}
              </span>
            </div>
          ))}
        </div>

        <div
          className="infra-grid mt-12 p-8 border rounded-xl grid gap-12"
          style={{
            background: 'var(--bg-elevated)',
            borderColor: 'var(--border)',
            gridTemplateColumns: 'repeat(3,1fr)',
          }}
        >
          {[
            {
              eyebrow: 'Hébergement',
              title: 'OVH · Roubaix.',
              desc: 'Vos données restent en France. Conformité RGPD by design.',
            },
            {
              eyebrow: 'Modèles IA',
              title: 'Claude · Mistral · GPT.',
              desc: "On choisit le modèle pour le job — pas l'inverse.",
            },
            {
              eyebrow: 'Sécurité',
              title: 'SOC 2 · ISO 27001.',
              desc: "Vos données n'entraînent aucun modèle externe.",
            },
          ].map((item, i) => (
            <div key={i}>
              <div
                className="font-mono text-[11px] tracking-[0.12em] uppercase mb-2"
                style={{ color: 'var(--ink-subtle)' }}
              >
                {item.eyebrow}
              </div>
              <div
                className="font-serif italic text-[22px] tracking-[-0.01em]"
                style={{ color: 'var(--ink)' }}
              >
                {item.title}
              </div>
              <p
                className="text-[13px] leading-[1.5] mt-2 m-0"
                style={{ color: 'var(--ink-muted)' }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
