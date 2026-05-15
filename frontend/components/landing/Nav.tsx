'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Logo } from '@/components/brand/Logo'
import { Button } from '@/components/ui/Button'

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#process',  label: 'Méthode' },
  { href: '#cases',    label: 'Cas clients' },
  { href: '#stack',    label: 'Stack' },
  { href: '#faq',      label: 'FAQ' },
]

export function Nav({ onBook }: { onBook: () => void }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        background: 'color-mix(in oklab, var(--bg) 88%, transparent)',
        backdropFilter: 'saturate(140%) blur(14px)',
        WebkitBackdropFilter: 'saturate(140%) blur(14px)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="wrap flex items-center justify-between h-[68px]">
        <Logo />

        <nav className="nav-links flex gap-1 items-center" aria-label="Sections">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-sans text-[13.5px] tracking-[-0.005em] px-3 py-2 rounded-lg transition-colors duration-100"
              style={{ color: 'var(--ink-muted)' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.color = 'var(--ink)'
                el.style.background = 'var(--surface-hover)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.color = 'var(--ink-muted)'
                el.style.background = ''
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Basculer le thème"
              className="flex items-center gap-1.5 h-8 px-3 rounded-lg border font-mono text-[11px] tracking-[0.08em] uppercase transition-colors duration-100 cursor-pointer"
              style={{
                borderColor: 'var(--border)',
                color: 'var(--ink-muted)',
                background: 'transparent',
              }}
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <circle cx="8" cy="8" r="3.5" />
                <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.4 1.4M11.6 11.6L13 13M3 13l1.4-1.4M11.6 4.4L13 3" />
              </svg>
              {theme === 'dark' ? 'LIGHT' : 'DARK'}
            </button>
          )}
          <Button size="sm" onClick={onBook}>
            Parler à l'équipe
          </Button>
        </div>
      </div>
    </header>
  )
}
