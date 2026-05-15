export function SectionHead({
  num,
  title,
  desc,
}: {
  num: string
  title: React.ReactNode
  desc: string
}) {
  return (
    <div
      className="section-head grid mb-[72px]"
      style={{ gridTemplateColumns: '200px 1fr', gap: 64 }}
    >
      <div
        className="font-mono text-[11px] tracking-[0.16em] uppercase pt-4"
        style={{ color: 'var(--ink-subtle)' }}
      >
        {num}
      </div>
      <div>
        <h2
          className="font-serif font-normal m-0 mb-6 leading-none tracking-[-0.025em]"
          style={{ fontSize: 'clamp(40px,5.5vw,76px)', color: 'var(--ink)' }}
        >
          {title}
        </h2>
        <p
          className="font-serif text-[22px] leading-[1.4] tracking-[-0.01em] m-0"
          style={{ color: 'var(--ink-muted)', maxWidth: '52ch' }}
        >
          {desc}
        </p>
      </div>
    </div>
  )
}
