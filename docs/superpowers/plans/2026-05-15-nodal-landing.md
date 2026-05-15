# Nodal Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a pixel-perfect Next.js 16 landing page for Nodal with a custom Google Calendar booking interface, deployed on Vercel.

**Architecture:** Next.js 16 App Router in `frontend/`, Route Handlers for Google Calendar API, next-themes for dark mode, no database (Google Calendar is the source of truth for bookings).

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS 4, next-themes, googleapis, Resend (confirmation emails), Vercel

---

## File Map

```
frontend/
  app/
    layout.tsx              # Root layout: fonts, ThemeProvider, metadata
    page.tsx                # Landing page: assembles all sections
    globals.css             # Tailwind base + CSS custom properties from tokens.css
    api/
      slots/route.ts        # GET: freebusy query → available 30-min slots
      book/route.ts         # POST: create Google Calendar event + Resend confirmation
  components/
    brand/
      Logo.tsx              # Mark SVG + "Nodal" wordmark
    landing/
      Nav.tsx               # Sticky nav, theme toggle, CTA opens BookingModal
      Hero.tsx              # Animated SVG graph + product peek card + stats row
      LogoStrip.tsx         # Client logos strip
      Services.tsx          # 3-column service cards
      Method.tsx            # 4-step process grid
      Cases.tsx             # 3 case study rows
      Stack.tsx             # 6×2 integration grid + infra info
      Testimonial.tsx       # Big blockquote
      FAQ.tsx               # 2-col FAQ rows (no accordion, always visible)
      CTA.tsx               # Full-width CTA with animated SVG bg
      Footer.tsx            # 4-col footer + colossal wordmark
    ui/
      Button.tsx            # btn-primary / btn-secondary / btn-ghost variants
      Badge.tsx             # Small tag pill
      BookingModal.tsx      # Calendar slot picker + booking form
  lib/
    google-calendar.ts      # getAvailableSlots(), createBooking()
  public/
    logo-mark.svg
    logo-mark-outline.svg
  tailwind.config.ts        # Extended with paper-*, cobalt-*, fonts, shadows
  .env.local.example
  next.config.ts
```

---

## Task 1: Scaffold Next.js 16 project

**Files:**
- Create: `frontend/` (via create-next-app)
- Modify: `frontend/tailwind.config.ts`
- Modify: `frontend/app/globals.css`
- Create: `frontend/.env.local.example`

- [ ] **Step 1: Create project**

```bash
cd /Volumes/SSD_EXT/MacExt/Projects/Nodal
npx create-next-app@latest frontend \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --no-eslint
cd frontend
npm install next-themes googleapis resend
```

- [ ] **Step 2: Copy assets**

```bash
cp /Volumes/SSD_EXT/MacExt/Projects/Nodal/design_handoff_nodal_landing/assets/logo-mark.svg frontend/public/logo-mark.svg
cp /Volumes/SSD_EXT/MacExt/Projects/Nodal/design_handoff_nodal_landing/assets/logo-mark-outline.svg frontend/public/logo-mark-outline.svg
```

- [ ] **Step 3: Write tailwind.config.ts**

```ts
// frontend/tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        paper: {
          0:   '#FFFFFF', 50:  '#FAFAF7', 100: '#F4F4EE',
          200: '#EAEAE2', 300: '#D8D8CE', 400: '#B5B5A8',
          500: '#8A8A7C', 600: '#5F5F55', 700: '#3D3D36',
          800: '#1F1F1B', 900: '#0E0E0C',
        },
        cobalt: {
          50:  '#EEF1FE', 100: '#DDE3FD', 200: '#B9C4FB',
          300: '#8B9DF8', 400: '#5C76F2', 500: '#2B4FE8',
          600: '#1E3CC9', 700: '#182FA0', 800: '#14267D', 900: '#0E1B5C',
        },
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'],
        sans:  ['Geist', 'sans-serif'],
        mono:  ['"Geist Mono"', 'monospace'],
      },
      boxShadow: {
        sm: '0 1px 2px rgba(15,23,42,0.04), 0 1px 1px rgba(15,23,42,0.03)',
        md: '0 2px 4px rgba(15,23,42,0.04), 0 8px 24px -8px rgba(15,23,42,0.08)',
        lg: '0 4px 8px rgba(15,23,42,0.04), 0 24px 48px -12px rgba(15,23,42,0.12)',
        xl: '0 8px 16px rgba(15,23,42,0.06), 0 40px 80px -16px rgba(15,23,42,0.18)',
      },
      borderRadius: {
        '0': '0px', '1': '4px', '2': '8px', '3': '12px',
        '4': '16px', '5': '24px', full: '999px',
      },
    },
  },
}
export default config
```

- [ ] **Step 4: Write globals.css**

```css
/* frontend/app/globals.css */
@import "tailwindcss";

/* Paste full contents of tokens.css here */
:root {
  --font-serif: "Instrument Serif", "Times New Roman", serif;
  --font-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, monospace;
  --t-display-1: clamp(64px,9vw,128px);
  --t-display-2: clamp(48px,6.5vw,88px);
  --t-h1: clamp(40px,5vw,64px);
  --t-h2: clamp(28px,3.5vw,44px);
  --t-h3: 26px; --t-h4: 18px; --t-body: 15px; --t-small: 13px; --t-caption: 11px;
  --s-1:4px;--s-2:8px;--s-3:12px;--s-4:16px;--s-5:24px;--s-6:32px;
  --s-7:48px;--s-8:64px;--s-9:96px;--s-10:128px;--s-11:192px;
  --r-0:0px;--r-1:4px;--r-2:8px;--r-3:12px;--r-4:16px;--r-5:24px;--r-full:999px;
  --bw:1px;
  --shadow-sm:0 1px 2px rgba(15,23,42,.04),0 1px 1px rgba(15,23,42,.03);
  --shadow-md:0 2px 4px rgba(15,23,42,.04),0 8px 24px -8px rgba(15,23,42,.08);
  --shadow-lg:0 4px 8px rgba(15,23,42,.04),0 24px 48px -12px rgba(15,23,42,.12);
  --shadow-xl:0 8px 16px rgba(15,23,42,.06),0 40px 80px -16px rgba(15,23,42,.18);
  --paper-0:#FFFFFF;--paper-50:#FAFAF7;--paper-100:#F4F4EE;--paper-200:#EAEAE2;
  --paper-300:#D8D8CE;--paper-400:#B5B5A8;--paper-500:#8A8A7C;--paper-600:#5F5F55;
  --paper-700:#3D3D36;--paper-800:#1F1F1B;--paper-900:#0E0E0C;
  --cobalt-50:#EEF1FE;--cobalt-100:#DDE3FD;--cobalt-200:#B9C4FB;--cobalt-300:#8B9DF8;
  --cobalt-400:#5C76F2;--cobalt-500:#2B4FE8;--cobalt-600:#1E3CC9;--cobalt-700:#182FA0;
  --cobalt-800:#14267D;--cobalt-900:#0E1B5C;
  --green-500:#1A8F5C;--green-100:#DFF3EA;
  --amber-500:#B86E11;--amber-100:#FBEACD;
  --red-500:#C8331C;--red-100:#F8DCD6;
  --bg:var(--paper-50);--bg-elevated:var(--paper-0);--bg-sunken:var(--paper-100);
  --surface:var(--paper-0);--surface-hover:var(--paper-100);
  --ink:var(--paper-900);--ink-muted:var(--paper-600);--ink-subtle:var(--paper-500);
  --ink-inverse:var(--paper-50);
  --border:var(--paper-200);--border-strong:var(--paper-300);
  --accent:var(--cobalt-500);--accent-hover:var(--cobalt-600);
  --accent-soft:var(--cobalt-50);--accent-ink:#FFFFFF;--on-accent:#FFFFFF;
  --focus-ring:var(--cobalt-400);
  --grid-line:rgba(0,0,0,.05);
}
[data-theme="dark"] {
  --bg:#0B0B0A;--bg-elevated:#131312;--bg-sunken:#060605;
  --surface:#131312;--surface-hover:#1C1C1A;
  --ink:#F2F1EC;--ink-muted:#8F8E86;--ink-subtle:#5C5B54;--ink-inverse:#0B0B0A;
  --border:#232220;--border-strong:#2E2D2A;
  --accent:#7C95FF;--accent-hover:#94A8FF;
  --accent-soft:rgba(124,149,255,.10);--accent-ink:#0B0B0A;--on-accent:#0B0B0A;
  --focus-ring:#7C95FF;
  --green-500:#4AD295;--green-100:rgba(74,210,149,.14);
  --amber-500:#E3A04F;--amber-100:rgba(227,160,79,.14);
  --red-500:#F37961;--red-100:rgba(243,121,97,.14);
  --shadow-sm:0 1px 2px rgba(0,0,0,.4);
  --shadow-md:0 2px 4px rgba(0,0,0,.4),0 8px 24px -8px rgba(0,0,0,.6);
  --shadow-lg:0 4px 8px rgba(0,0,0,.4),0 24px 48px -12px rgba(0,0,0,.7);
  --shadow-xl:0 8px 16px rgba(0,0,0,.5),0 40px 80px -16px rgba(0,0,0,.8);
  --grid-line:rgba(255,255,255,.045);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}
a { color: inherit; text-decoration: none; }

@keyframes pulse-ring {
  0%   { transform: scale(0.6); opacity: 0.6; }
  100% { transform: scale(2.6); opacity: 0; }
}
.pulse-ring::after {
  content: "";
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.3;
  animation: pulse-ring 1.8s ease-out infinite;
}
```

- [ ] **Step 5: Write .env.local.example**

```bash
# frontend/.env.local.example
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"..."}
GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
RESEND_API_KEY=re_xxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://nodal-ai-services.com
```

- [ ] **Step 6: Commit**

```bash
cd /Volumes/SSD_EXT/MacExt/Projects/Nodal
git init
git add frontend/
git commit -m "feat: scaffold Next.js 16 with tokens and Tailwind config"
```

---

## Task 2: Root layout + theme provider

**Files:**
- Create: `frontend/app/layout.tsx`
- Create: `frontend/components/providers.tsx`

- [ ] **Step 1: Write providers.tsx**

```tsx
// frontend/components/providers.tsx
'use client'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem>
      {children}
    </ThemeProvider>
  )
}
```

- [ ] **Step 2: Write layout.tsx**

```tsx
// frontend/app/layout.tsx
import type { Metadata } from 'next'
import { Instrument_Serif, Geist, Geist_Mono } from 'next/font/google'
import { Providers } from '@/components/providers'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--loaded-serif',
})
const geist = Geist({ subsets: ['latin'], variable: '--loaded-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--loaded-mono' })

export const metadata: Metadata = {
  title: 'Nodal — Outils IA pour PME',
  description: "Nodal conçoit des outils SaaS et des automatisations sur mesure pour les PME. L'IA qui parle votre métier.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nodal-ai-services.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${instrumentSerif.variable} ${geist.variable} ${geistMono.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Update globals.css to use loaded font variables**

Add after the existing font-family declarations in `:root`:
```css
  --font-serif: var(--loaded-serif, "Instrument Serif", serif);
  --font-sans: var(--loaded-sans, "Geist", sans-serif);
  --font-mono: var(--loaded-mono, "Geist Mono", monospace);
```

- [ ] **Step 4: Commit**
```bash
git add frontend/app/layout.tsx frontend/components/providers.tsx frontend/app/globals.css
git commit -m "feat: root layout with next-themes dark mode and Google Fonts"
```

---

## Task 3: UI primitives — Button + Badge

**Files:**
- Create: `frontend/components/ui/Button.tsx`
- Create: `frontend/components/ui/Badge.tsx`

- [ ] **Step 1: Write Button.tsx**

```tsx
// frontend/components/ui/Button.tsx
import { forwardRef } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  asChild?: boolean
}

const base = 'inline-flex items-center gap-2 font-sans font-medium rounded-full transition-all duration-120 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2'

const variants: Record<Variant, string> = {
  primary:   'bg-[var(--accent)] text-[var(--on-accent)] hover:bg-[var(--accent-hover)]',
  secondary: 'bg-transparent text-[var(--ink)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]',
  ghost:     'bg-transparent text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-hover)]',
}

const sizes: Record<Size, string> = {
  sm: 'text-[13px] tracking-[-0.005em] h-8 px-4',
  md: 'text-[14px] tracking-[-0.005em] h-9 px-5',
  lg: 'text-[15px] tracking-[-0.01em] h-11 px-6',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => (
    <button
      ref={ref}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
)
Button.displayName = 'Button'

// Polymorphic link variant
interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  size?: Size
}
export function ButtonLink({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonLinkProps) {
  return (
    <a className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </a>
  )
}
```

- [ ] **Step 2: Write Badge.tsx**

```tsx
// frontend/components/ui/Badge.tsx
export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center h-6 px-2.5 rounded-full border text-[11px] font-mono tracking-[0.06em] uppercase"
      style={{ background: 'var(--bg-sunken)', borderColor: 'var(--border)', color: 'var(--ink-muted)' }}
    >
      {children}
    </span>
  )
}
```

- [ ] **Step 3: Commit**
```bash
git add frontend/components/ui/
git commit -m "feat: Button and Badge UI primitives"
```

---

## Task 4: Logo + brand components

**Files:**
- Create: `frontend/components/brand/Logo.tsx`

- [ ] **Step 1: Write Logo.tsx**

```tsx
// frontend/components/brand/Logo.tsx
interface LogoProps { size?: number; className?: string }

export function LogoMark({ size = 24, className = '' }: LogoProps) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size} className={className} style={{ color: 'var(--ink)' }} aria-hidden="true">
      <line x1="14" y1="14" x2="14" y2="46" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="14" y1="14" x2="46" y2="46" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="46" y1="14" x2="46" y2="46" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="14" cy="14" r="5.2" fill="currentColor" />
      <circle cx="14" cy="46" r="5.2" fill="currentColor" />
      <circle cx="46" cy="14" r="5.2" fill="currentColor" />
      <circle cx="46" cy="46" r="5.2" fill="currentColor" />
    </svg>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <a href="#top" aria-label="Nodal" className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={28} />
      <span
        className="font-serif text-[22px] tracking-[-0.025em] leading-none"
        style={{ color: 'var(--ink)' }}
      >
        Nodal
      </span>
    </a>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add frontend/components/brand/
git commit -m "feat: Logo and LogoMark brand components"
```

---

## Task 5: Nav component

**Files:**
- Create: `frontend/components/landing/Nav.tsx`

- [ ] **Step 1: Write Nav.tsx**

```tsx
// frontend/components/landing/Nav.tsx
'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Logo } from '@/components/brand/Logo'
import { Button, ButtonLink } from '@/components/ui/Button'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Méthode' },
  { href: '#cases',   label: 'Cas clients' },
  { href: '#stack',   label: 'Stack' },
  { href: '#faq',     label: 'FAQ' },
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
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[68px]">
        <Logo />

        <nav className="hidden md:flex gap-1 items-center" aria-label="Sections">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="font-sans text-[13.5px] tracking-[-0.005em] px-3 py-2 rounded-lg transition-colors duration-120"
              style={{ color: 'var(--ink-muted)' }}
              onMouseEnter={e => {
                ;(e.target as HTMLElement).style.color = 'var(--ink)'
                ;(e.target as HTMLElement).style.background = 'var(--surface-hover)'
              }}
              onMouseLeave={e => {
                ;(e.target as HTMLElement).style.color = 'var(--ink-muted)'
                ;(e.target as HTMLElement).style.background = ''
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
              aria-label="Toggle theme"
              className="flex items-center gap-1.5 h-8 px-3 rounded-lg border text-[11px] font-mono tracking-[0.08em] uppercase transition-colors duration-120"
              style={{ borderColor: 'var(--border)', color: 'var(--ink-muted)', background: 'transparent' }}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="8" cy="8" r="3.5"/>
                <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.4 1.4M11.6 11.6L13 13M3 13l1.4-1.4M11.6 4.4L13 3"/>
              </svg>
              {theme === 'dark' ? 'LIGHT' : 'DARK'}
            </button>
          )}
          <Button size="sm" onClick={onBook}>Parler à l'équipe</Button>
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add frontend/components/landing/Nav.tsx
git commit -m "feat: sticky Nav with theme toggle"
```

---

## Task 6: Hero component

**Files:**
- Create: `frontend/components/landing/Hero.tsx`

- [ ] **Step 1: Write Hero.tsx**

```tsx
// frontend/components/landing/Hero.tsx
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
          maskImage: 'radial-gradient(ellipse 70% 90% at 100% 50%, #000 25%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 90% at 100% 50%, #000 25%, transparent 80%)',
        }}
      >
        <svg viewBox="0 0 1200 700" preserveAspectRatio="xMaxYMid slice" className="w-full h-full">
          <defs>
            <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <g stroke="var(--ink-subtle)" strokeWidth="0.6" opacity="0.35" fill="none">
            <path d="M900 80 L1020 200"/><path d="M900 80 L760 220"/>
            <path d="M1020 200 L1100 360"/><path d="M760 220 L860 380"/>
            <path d="M1020 200 L860 380"/><path d="M1100 360 L1000 520"/>
            <path d="M860 380 L1000 520"/><path d="M1000 520 L840 620"/>
            <path d="M860 380 L700 480"/><path d="M700 480 L840 620"/>
            <path d="M1180 80 L1020 200"/><path d="M620 100 L760 220"/>
          </g>
          <g stroke="var(--accent)" strokeWidth="1.4" fill="none" strokeDasharray="4 6" opacity="0.7">
            <path d="M900 80 L1020 200"><animate attributeName="stroke-dashoffset" from="0" to="-20" dur="3s" repeatCount="indefinite"/></path>
            <path d="M1020 200 L860 380"><animate attributeName="stroke-dashoffset" from="0" to="-20" dur="3.4s" repeatCount="indefinite"/></path>
            <path d="M860 380 L1000 520"><animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2.8s" repeatCount="indefinite"/></path>
            <path d="M1000 520 L840 620"><animate attributeName="stroke-dashoffset" from="0" to="-20" dur="3.6s" repeatCount="indefinite"/></path>
          </g>
          <g>
            <circle cx="900" cy="80" r="20" fill="url(#node-glow)" opacity="0.7"/>
            <circle cx="900" cy="80" r="6" fill="var(--accent)"/>
            <circle cx="1020" cy="200" r="20" fill="url(#node-glow)" opacity="0.7"/>
            <circle cx="1020" cy="200" r="7" fill="var(--accent)"/>
            <circle cx="760" cy="220" r="5" fill="var(--ink-muted)" opacity="0.6"/>
            <circle cx="1180" cy="80" r="5" fill="var(--ink-muted)" opacity="0.5"/>
            <circle cx="620" cy="100" r="5" fill="var(--ink-muted)" opacity="0.5"/>
            <circle cx="1100" cy="360" r="6" fill="var(--ink-muted)" opacity="0.7"/>
            <circle cx="860" cy="380" r="22" fill="url(#node-glow)" opacity="0.8"/>
            <circle cx="860" cy="380" r="8" fill="var(--accent)"/>
            <circle cx="700" cy="480" r="5" fill="var(--ink-muted)" opacity="0.6"/>
            <circle cx="1000" cy="520" r="20" fill="url(#node-glow)" opacity="0.7"/>
            <circle cx="1000" cy="520" r="7" fill="var(--accent)"/>
            <circle cx="840" cy="620" r="6" fill="var(--accent)"/>
          </g>
          <circle r="4" fill="var(--accent)"><animateMotion dur="3s" repeatCount="indefinite" path="M900 80 L1020 200"/></circle>
          <circle r="4" fill="var(--accent)"><animateMotion dur="3.4s" repeatCount="indefinite" path="M1020 200 L860 380" begin="0.4s"/></circle>
          <circle r="4" fill="var(--accent)"><animateMotion dur="2.8s" repeatCount="indefinite" path="M860 380 L1000 520" begin="0.8s"/></circle>
          <circle r="4" fill="var(--accent)"><animateMotion dur="3.6s" repeatCount="indefinite" path="M1000 520 L840 620" begin="1.2s"/></circle>
        </svg>
      </div>

      <div className="max-w-[1280px] mx-auto px-6">
        {/* Two-col grid */}
        <div className="grid gap-16 items-center" style={{ gridTemplateColumns: '1.25fr 1fr' }}>
          {/* Left: content */}
          <div className="max-w-[720px]">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-3 mb-8 border rounded-full"
              style={{ padding: '6px 14px 6px 10px', borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}
            >
              <span
                className="relative w-2 h-2 rounded-full pulse-ring"
                style={{ background: 'var(--accent)' }}
              />
              <span className="font-mono text-[11px] tracking-[0.08em] uppercase" style={{ color: 'var(--ink-muted)' }}>
                Studio Nodal v0.4 · 3 créneaux libres
              </span>
            </div>

            <h1
              className="font-serif font-normal m-0 leading-[0.95] tracking-[-0.032em]"
              style={{ fontSize: 'clamp(56px,8.6vw,124px)', color: 'var(--ink)' }}
            >
              L'IA qui parle<br/>
              <em className="italic" style={{ color: 'var(--accent)' }}>votre métier.</em>
            </h1>

            <p className="mt-8 text-[18px] leading-[1.55]" style={{ color: 'var(--ink-muted)', maxWidth: '56ch' }}>
              Nodal conçoit des outils SaaS et des automatisations sur mesure pour les PME.
              On part de votre métier — pas d'un modèle générique — et on livre des workflows
              que vos équipes pilotent au quotidien.
            </p>

            <div className="mt-10 flex flex-wrap gap-3 items-center">
              <Button size="lg" onClick={onBook}>
                Cartographier mon métier
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
              </Button>
              <ButtonLink href="#cases" variant="secondary" size="lg">Voir les cas clients</ButtonLink>
            </div>
          </div>

          {/* Right: product peek */}
          <div className="hidden xl:flex items-center justify-center" aria-hidden="true">
            <div className="relative w-full max-w-[520px]">
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
                {/* Chrome bar */}
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 border-b" style={{ background: 'var(--bg-sunken)', borderColor: 'var(--border)' }}>
                  <div className="flex gap-1.5">
                    {[0,1,2].map(i => <span key={i} className="w-2 h-2 rounded-full" style={{ background: 'var(--border-strong)' }} />)}
                  </div>
                  <div className="flex-1 flex items-center justify-center h-[18px] border rounded font-mono text-[10px] tracking-[0.04em]" style={{ borderColor: 'var(--border)', background: 'var(--surface)', color: 'var(--ink-subtle)' }}>
                    app.nodal.fr / studio / qualification-leads
                  </div>
                </div>
                {/* Body */}
                <div className="p-5">
                  <h4 className="font-serif italic text-[24px] tracking-[-0.015em] m-0 mb-1" style={{ color: 'var(--ink)' }}>
                    Qualification entrante.
                  </h4>
                  <div className="font-mono text-[10px] tracking-[0.1em] uppercase mb-4" style={{ color: 'var(--ink-subtle)' }}>
                    ROUSSEL SAS · WORKFLOW 14 NŒUDS · V0.4.2
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      { k: 'Runs · 30j', v: '1 247' },
                      { k: 'Précision',  v: '94,2%' },
                      { k: 'Latence',    v: '3,2s'  },
                    ].map(({ k, v }) => (
                      <div key={k} className="flex flex-col gap-1 border rounded-lg p-2.5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                        <span className="font-mono text-[9px] tracking-[0.1em] uppercase" style={{ color: 'var(--ink-subtle)' }}>{k}</span>
                        <span className="font-serif text-[22px] leading-none tracking-[-0.015em]" style={{ color: 'var(--ink)' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      { status: 'ok',   nm: 'Lead 1247 · Roussel SAS',    sub: 'ICP match · score 87', dur: '3.1s' },
                      { status: 'ok',   nm: 'Lead 1246 · Atelier Beaumont', sub: 'ICP match · score 72', dur: '2.8s' },
                      { status: 'warn', nm: 'Lead 1245 · contact@inco',    sub: 'Enrichi · Clearbit',   dur: '8.4s' },
                      { status: 'ok',   nm: 'Lead 1244 · Mécanique Loire', sub: 'ICP match · score 91', dur: '2.9s' },
                    ].map((r, i) => (
                      <div key={i} className="grid items-center gap-2.5 py-2 border-t text-[12px]" style={{ gridTemplateColumns: '10px 1fr auto', borderColor: i === 0 ? 'transparent' : 'var(--border)' }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: r.status === 'warn' ? 'var(--amber-500)' : 'var(--green-500)' }} />
                        <span style={{ color: 'var(--ink)' }}>
                          {r.nm}
                          <span className="block font-mono text-[10px] mt-0.5 tracking-[0.02em]" style={{ color: 'var(--ink-subtle)' }}>{r.sub}</span>
                        </span>
                        <span className="font-mono text-[10px]" style={{ color: 'var(--ink-muted)' }}>{r.dur}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-16 pt-6 border-t grid gap-8" style={{ borderColor: 'var(--border)', gridTemplateColumns: 'repeat(4,1fr)' }}>
          {[
            { k: 'PME accompagnées',          v: '42' },
            { k: 'Heures économisées / mois', v: '8 400' },
            { k: 'Workflows en production',   v: '137' },
            { k: 'Délai moyen de mise en prod', v: <>21<span className="font-sans text-[18px]" style={{ color: 'var(--ink-muted)' }}> jours</span></> },
          ].map(({ k, v }) => (
            <div key={k} className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: 'var(--ink-subtle)' }}>{k}</span>
              <span className="font-serif text-[32px] leading-none tracking-[-0.02em]" style={{ color: 'var(--ink)' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add frontend/components/landing/Hero.tsx
git commit -m "feat: Hero section with animated SVG graph and product peek"
```

---

## Task 7: LogoStrip, Services, Method, Cases

**Files:**
- Create: `frontend/components/landing/LogoStrip.tsx`
- Create: `frontend/components/landing/Services.tsx`
- Create: `frontend/components/landing/Method.tsx`
- Create: `frontend/components/landing/Cases.tsx`

- [ ] **Step 1: Write LogoStrip.tsx**

```tsx
// frontend/components/landing/LogoStrip.tsx
export function LogoStrip() {
  return (
    <section className="border-b" style={{ borderColor: 'var(--border)', padding: '28px 0' }}>
      <div className="max-w-[1280px] mx-auto px-6 flex items-center gap-12 flex-wrap justify-between">
        <span className="font-mono text-[11px] tracking-[0.12em] uppercase whitespace-nowrap" style={{ color: 'var(--ink-subtle)' }}>
          Choisis par des PME ambitieuses —
        </span>
        <div className="flex gap-10 items-center flex-wrap" style={{ color: 'var(--ink-muted)', opacity: 0.85 }}>
          <span className="font-serif italic text-[22px] tracking-[-0.01em]">Roussel <span className="font-sans not-italic font-semibold text-[14px]">SAS</span></span>
          <span className="font-sans font-bold text-[18px] tracking-[-0.02em]">Atelier Beaumont</span>
          <span className="font-mono text-[15px] tracking-[0.02em]">méca·loire</span>
          <span className="font-serif italic text-[22px] tracking-[-0.01em]">Pâtisserie&nbsp;<em>Léon</em></span>
          <span className="font-sans font-medium text-[16px] tracking-[-0.01em]">CLAVERA &amp; Co.</span>
          <span className="font-mono text-[14px] tracking-[0.1em] uppercase">NORD·LOGISTIQUE</span>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Write Services.tsx**

```tsx
// frontend/components/landing/Services.tsx
const services = [
  {
    num: '01',
    title: <>Outils SaaS&nbsp;<em className="italic" style={{color:'var(--accent)'}}>sur mesure.</em></>,
    desc: "Des applications internes pensées pour un métier précis : qualification de leads, extraction documentaire, suivi opérationnel, scoring. On hérite de votre stack, on ne la remplace pas.",
    exLabel: 'EXEMPLE',
    ex: 'Portail commercial qui qualifie les leads HubSpot en 3 s',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{color:'var(--accent)'}}>
        <circle cx="6" cy="6" r="2.2"/><circle cx="18" cy="6" r="2.2"/>
        <circle cx="18" cy="18" r="2.2"/><circle cx="6" cy="18" r="2.2"/>
        <path d="M8 6h8M18 8v8M16 18H8M6 16V8"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: <>Automatisation des&nbsp;<em className="italic" style={{color:'var(--accent)'}}>workflows.</em></>,
    desc: "Les processus répétitifs deviennent des graphes documentés. Vos équipes libèrent du temps cognitif pour le travail qui compte vraiment — relation client, décision, création.",
    exLabel: 'EXEMPLE',
    ex: 'OCR factures → vérif TVA → push Pennylane, 1 240/mois',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{color:'var(--accent)'}}>
        <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: <>Conseil &amp;&nbsp;<em className="italic" style={{color:'var(--accent)'}}>cartographie.</em></>,
    desc: "Trois semaines pour cartographier vos processus, identifier les zones à fort levier IA et chiffrer le retour. Livrable : un graphe de votre métier, une roadmap, des chiffres.",
    exLabel: 'LIVRABLES',
    ex: 'Graphe métier · roadmap 6 mois · estimation gains',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{color:'var(--accent)'}}>
        <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z"/><path d="M12 7v5l3 2"/>
      </svg>
    ),
  },
]

export function Services() {
  return (
    <section id="services" className="border-t" style={{ padding: '128px 0', borderColor: 'var(--border)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHead num="01 — CE QU'ON FAIT" title={<>Trois métiers,<br/>une <em className="italic" style={{color:'var(--accent)'}}>conviction</em>.</>} desc="L'IA n'a de valeur que lorsqu'elle entre dans le travail réel des équipes. On construit des outils que vos collaborateurs ouvrent chaque jour — pas des démos." />
        <div className="grid border rounded-2xl overflow-hidden" style={{ gridTemplateColumns: 'repeat(3,1fr)', background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
          {services.map((s, i) => (
            <article key={i} className="flex flex-col gap-5 border-r last:border-r-0" style={{ padding: '40px 36px 36px', borderColor: 'var(--border)', minHeight: 380 }}>
              <span className="font-mono text-[11px] tracking-[0.14em]" style={{ color: 'var(--ink-subtle)' }}>{s.num}</span>
              {s.icon}
              <h3 className="font-serif text-[32px] leading-[1.05] tracking-[-0.018em] font-normal m-0" style={{ color: 'var(--ink)' }}>{s.title}</h3>
              <p className="m-0 text-[15px] leading-[1.6]" style={{ color: 'var(--ink-muted)' }}>{s.desc}</p>
              <div className="mt-auto pt-5 border-t border-dashed flex flex-col gap-1 font-mono text-[11px] tracking-[0.06em] uppercase" style={{ borderColor: 'var(--border-strong)', color: 'var(--ink-subtle)' }}>
                <strong className="font-medium" style={{ color: 'var(--ink)' }}>{s.exLabel}</strong>
                <span>{s.ex}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// Shared section header component (used by multiple sections)
export function SectionHead({ num, title, desc }: { num: string; title: React.ReactNode; desc: string }) {
  return (
    <div className="grid gap-16 mb-[72px]" style={{ gridTemplateColumns: '200px 1fr' }}>
      <div className="font-mono text-[11px] tracking-[0.16em] pt-4" style={{ color: 'var(--ink-subtle)' }}>{num}</div>
      <div>
        <h2 className="font-serif font-normal m-0 mb-6 leading-none tracking-[-0.025em]" style={{ fontSize: 'clamp(40px,5.5vw,76px)', color: 'var(--ink)' }}>{title}</h2>
        <p className="font-serif text-[22px] leading-[1.4] tracking-[-0.01em] m-0" style={{ color: 'var(--ink-muted)', maxWidth: '52ch' }}>{desc}</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Write Method.tsx**

```tsx
// frontend/components/landing/Method.tsx
import { SectionHead } from './Services'

const steps = [
  { num: 'ÉTAPE 01', title: <>Écouter,<br/><em>cartographier</em>.</>, desc: "On passe une semaine avec vos équipes. Pas de slides, pas de promesses. On observe le travail réel, on note les frictions, on dessine le graphe.", duration: 'Semaine 1 · 5 jours' },
  { num: 'ÉTAPE 02', title: <>Choisir<br/>les <em>bonnes</em> zones.</>, desc: "Pas tout. Trois ou quatre zones à fort levier : volume répétitif, décision à enjeu, ou information dispersée. On chiffre les gains attendus.", duration: 'Semaine 1 · 2 jours' },
  { num: 'ÉTAPE 03', title: <>Construire,<br/><em>itérer</em>.</>, desc: "Premier workflow en main de vos équipes sous 7 jours. On corrige, on calibre, on entraîne. La version 1 entre en production en semaine 3.", duration: 'Semaines 2 — 3' },
  { num: 'ÉTAPE 04', title: <>Transmettre,<br/><em>tenir</em>.</>, desc: "Vos équipes gardent la main : edit des prompts, monitoring, dashboards. On reste en astreinte 6 mois — vous restez autonomes.", duration: 'Semaine 4 → continu' },
]

export function Method() {
  return (
    <section id="process" className="border-t" style={{ padding: '128px 0', borderColor: 'var(--border)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHead
          num="02 — COMMENT ON TRAVAILLE"
          title={<>Quatre semaines<br/>de la <em className="italic" style={{color:'var(--accent)'}}>carte</em> au <em className="italic" style={{color:'var(--accent)'}}>code</em>.</>}
          desc="Un déroulé volontairement court. On préfère livrer un workflow imparfait qu'on itère qu'un système parfait qu'on n'utilise pas."
        />
        <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col gap-4 relative pt-8 before:absolute before:top-0 before:left-0 before:w-8 before:h-px" style={{ ['--tw-before-bg' as string]: 'var(--accent)' }}>
              <div className="absolute top-0 left-0 w-8 h-px" style={{ background: 'var(--accent)' }} />
              <span className="font-mono text-[11px] tracking-[0.14em]" style={{ color: 'var(--accent)' }}>{s.num}</span>
              <h4 className="font-serif text-[28px] leading-[1.08] tracking-[-0.018em] font-normal m-0" style={{ color: 'var(--ink)' }}>
                {typeof s.title === 'object'
                  ? <>{String(s.title).split('<em>')[0]}<em className="italic">{String(s.title).match(/<em>(.*?)<\/em>/)?.[1]}</em></>
                  : s.title}
              </h4>
              <p className="m-0 text-[14.5px] leading-[1.6]" style={{ color: 'var(--ink-muted)' }}>{s.desc}</p>
              <span className="font-mono text-[11px] tracking-[0.08em] uppercase mt-1" style={{ color: 'var(--ink-subtle)' }}>{s.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Write Cases.tsx**

```tsx
// frontend/components/landing/Cases.tsx
import { SectionHead } from './Services'
import { Badge } from '@/components/ui/Badge'

const cases = [
  {
    industry: 'INDUSTRIE · 180 SALARIÉS', client: 'Roussel SAS',
    summary: 'Fabricant de pièces mécaniques de précision. Le service ADV traitait 600 commandes/mois à la main, avec 3 commerciaux sédentaires saturés.',
    tags: ['Extraction OCR', 'SAP', 'Workflow 14 nœuds'],
    stats: [
      { k: 'Traitement / cmd', v: '−', em: '78', unit: '%', ctx: 'De 14 min à 3 min' },
      { k: 'Erreurs de saisie', v: '−', em: '92', unit: '%', ctx: 'Mesuré sur 6 mois' },
      { k: 'Mise en prod',      v: '',  em: '18', unit: 'j', ctx: 'Cartographie incluse' },
    ],
    quote: '« Pour la première fois, on a senti que l'IA s'adaptait à notre métier, pas l'inverse. Nos commerciaux sont redevenus commerciaux. »',
    attr: 'CAMILLE LEROY · DIRECTRICE COMMERCIALE',
  },
  {
    industry: 'SERVICES · 45 SALARIÉS', client: 'Atelier Beaumont',
    summary: 'Cabinet de courtage en assurance pro. Cinq personnes lisaient des contrats toute la journée pour produire des comparatifs clients.',
    tags: ['RAG', 'claude-haiku-4.5', 'Slack'],
    stats: [
      { k: 'Temps / comparatif', v: '−', em: '85', unit: '%', ctx: 'De 2 h à 18 min' },
      { k: 'CA / consultant',    v: '+', em: '34', unit: '%', ctx: 'À effectif constant' },
      { k: 'Mise en prod',       v: '',  em: '24', unit: 'j', ctx: 'Phase pilote 8 j' },
    ],
    quote: '« L'outil parle notre vocabulaire. Quand un consultant pose une question, il reçoit une réponse — pas un essai. »',
    attr: 'MARTIN DUPRÉ · ASSOCIÉ FONDATEUR',
  },
  {
    industry: 'RETAIL · 12 BOUTIQUES', client: 'Pâtisserie Léon',
    summary: 'Douze boutiques, une production centralisée. Les prévisions de commandes étaient faites à la main par chaque responsable de boutique, le dimanche soir.',
    tags: ['Prévision', 'Tableau de bord', 'Mobile'],
    stats: [
      { k: 'Invendus',      v: '−', em: '41', unit: '%', ctx: 'Moyenne 6 mois' },
      { k: 'Ruptures',      v: '−', em: '67', unit: '%', ctx: 'Sur produits A+B' },
      { k: 'Mise en prod',  v: '',  em: '21', unit: 'j', ctx: 'Sur 3 boutiques pilotes' },
    ],
    quote: '« Mes responsables de boutique ne passent plus leur dimanche à prédire. Ils valident une proposition en deux clics. »',
    attr: 'JEAN-PHILIPPE LÉON · PRÉSIDENT',
  },
]

export function Cases() {
  return (
    <section id="cases" className="border-t" style={{ padding: '128px 0', borderColor: 'var(--border)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHead
          num="03 — CAS CLIENTS"
          title={<>Le travail<br/>en <em className="italic" style={{color:'var(--accent)'}}>production</em>.</>}
          desc="Trois clients, trois métiers, trois zones d'automatisation. Chiffres mesurés après six mois en production, partagés avec leur accord."
        />
        <div className="border-t flex flex-col" style={{ borderColor: 'var(--border)' }}>
          {cases.map((c, i) => (
            <article key={i} className="grid gap-16 py-16 border-b items-start" style={{ gridTemplateColumns: '1fr 1.2fr', borderColor: 'var(--border)' }}>
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[11px] tracking-[0.12em] uppercase" style={{ color: 'var(--ink-subtle)' }}>{c.industry}</span>
                <h3 className="font-serif italic text-[36px] leading-[1.05] tracking-[-0.018em] m-0" style={{ color: 'var(--ink)' }}>{c.client}</h3>
                <p className="text-[15px] leading-[1.55] mt-2 m-0" style={{ color: 'var(--ink-muted)' }}>{c.summary}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">{c.tags.map(t => <Badge key={t}>{t}</Badge>)}</div>
              </div>
              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-3 gap-4">
                  {c.stats.map((s, j) => (
                    <div key={j} className="border-l pl-[18px] flex flex-col gap-1" style={{ borderColor: 'var(--border)' }}>
                      <span className="font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: 'var(--ink-subtle)' }}>{s.k}</span>
                      <span className="font-serif text-[48px] leading-none tracking-[-0.025em]" style={{ color: 'var(--ink)' }}>
                        {s.v}<em className="italic" style={{ color: 'var(--accent)' }}>{s.em}</em>
                        <span className="text-[24px] ml-0.5" style={{ color: 'var(--ink-muted)' }}>{s.unit}</span>
                      </span>
                      <span className="text-[12px] mt-0.5" style={{ color: 'var(--ink-muted)' }}>{s.ctx}</span>
                    </div>
                  ))}
                </div>
                <blockquote className="border-l-2 pl-5 py-2 font-serif italic text-[22px] leading-[1.45] tracking-[-0.01em] m-0" style={{ borderColor: 'var(--accent)', color: 'var(--ink)' }}>
                  {c.quote}
                </blockquote>
                <div className="font-mono text-[11px] tracking-[0.08em] uppercase pl-[22px] -mt-4" style={{ color: 'var(--ink-subtle)' }}>{c.attr}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Commit**
```bash
git add frontend/components/landing/
git commit -m "feat: LogoStrip, Services, Method, Cases sections"
```

---

## Task 8: Stack, Testimonial, FAQ, CTA, Footer

**Files:**
- Create: `frontend/components/landing/Stack.tsx`
- Create: `frontend/components/landing/Testimonial.tsx`
- Create: `frontend/components/landing/FAQ.tsx`
- Create: `frontend/components/landing/CTA.tsx`
- Create: `frontend/components/landing/Footer.tsx`

- [ ] **Step 1: Write Stack.tsx**

```tsx
// frontend/components/landing/Stack.tsx
import { SectionHead } from './Services'

const integrations = [
  { logo: 'HubSpot',    role: 'CRM',        style: 'bold' },
  { logo: 'Pipedrive',  role: 'CRM',        style: 'serif' },
  { logo: 'Pennylane',  role: 'Compta',     style: 'bold' },
  { logo: 'Sage',       role: 'ERP',        style: 'serif' },
  { logo: 'Cegid',      role: 'ERP',        style: 'bold' },
  { logo: 'notion',     role: 'Docs',       style: 'mono' },
  { logo: 'Slack',      role: 'Messagerie', style: 'bold' },
  { logo: 'teams',      role: 'Messagerie', style: 'mono' },
  { logo: 'Airtable',   role: 'Données',    style: 'serif' },
  { logo: 'Stripe',     role: 'Paiement',   style: 'bold' },
  { logo: 'Salesforce', role: 'CRM',        style: 'serif' },
  { logo: '+ 40 autres',role: 'API REST',   style: 'mono' },
]

const logoClass = (s: string) => ({
  bold:  'font-sans font-semibold text-[18px] tracking-[-0.02em]',
  serif: 'font-serif italic text-[26px] tracking-[-0.01em]',
  mono:  'font-mono text-[16px] tracking-[-0.01em] lowercase',
}[s] ?? '')

export function Stack() {
  return (
    <section id="stack" className="border-t" style={{ padding: '128px 0', borderColor: 'var(--border)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHead
          num="04 — STACK"
          title={<>On hérite<br/>de la <em className="italic" style={{color:'var(--accent)'}}>vôtre</em>.</>}
          desc="Nodal ne remplace pas votre CRM, votre ERP ou votre messagerie. On s'y connecte — proprement, à l'API, jamais par scraping."
        />
        <div
          className="grid gap-px rounded-xl overflow-hidden border"
          style={{ gridTemplateColumns: 'repeat(6,1fr)', background: 'var(--border)', borderColor: 'var(--border)' }}
        >
          {integrations.map((int, i) => (
            <div key={i} className="flex flex-col items-center justify-center gap-3 p-5 text-center" style={{ background: 'var(--bg-elevated)', aspectRatio: '1.3/1' }}>
              <span className={logoClass(int.style)} style={{ color: 'var(--ink)' }}>{int.logo}</span>
              <span className="font-mono text-[10px] tracking-[0.1em] uppercase" style={{ color: 'var(--ink-subtle)' }}>{int.role}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 border rounded-xl grid gap-12" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)', gridTemplateColumns: 'repeat(3,1fr)' }}>
          {[
            { eyebrow: 'Hébergement', title: 'OVH · Roubaix.', desc: 'Vos données restent en France. Conformité RGPD by design.' },
            { eyebrow: 'Modèles IA',  title: 'Claude · Mistral · GPT.', desc: 'On choisit le modèle pour le job — pas l'inverse.' },
            { eyebrow: 'Sécurité',    title: 'SOC 2 · ISO 27001.', desc: 'Vos données n'entraînent aucun modèle externe.' },
          ].map((item, i) => (
            <div key={i}>
              <div className="font-mono text-[11px] tracking-[0.12em] uppercase mb-2" style={{ color: 'var(--ink-subtle)' }}>{item.eyebrow}</div>
              <div className="font-serif italic text-[22px] tracking-[-0.01em]" style={{ color: 'var(--ink)' }}>{item.title}</div>
              <p className="text-[13px] leading-[1.5] mt-2 m-0" style={{ color: 'var(--ink-muted)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Write Testimonial.tsx**

```tsx
// frontend/components/landing/Testimonial.tsx
export function Testimonial() {
  return (
    <section className="border-t" style={{ borderColor: 'var(--border)', padding: '80px 0' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid gap-12 items-start" style={{ gridTemplateColumns: '80px 1fr' }}>
          <div
            className="font-serif italic leading-[0.6] tracking-[-0.06em] pt-6"
            style={{ fontSize: 144, color: 'var(--accent)' }}
            aria-hidden="true"
          >"</div>
          <div>
            <blockquote className="font-serif font-normal m-0 leading-[1.2] tracking-[-0.02em]" style={{ fontSize: 'clamp(28px,3.5vw,48px)', color: 'var(--ink)' }}>
              On a vu passer trois agences IA. Nodal est la première qui a commencé par{' '}
              <em className="italic" style={{ color: 'var(--accent)' }}>écouter</em> avant de proposer.
              Six mois plus tard, l'outil tourne, mes équipes le défendent. C'est devenu un avantage compétitif.
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-serif italic text-[22px]" style={{ background: 'var(--surface-hover)', color: 'var(--ink-muted)' }}>M</div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] font-medium" style={{ color: 'var(--ink)' }}>Mathieu Roussel</span>
                <span className="font-mono text-[11px] tracking-[0.06em] uppercase" style={{ color: 'var(--ink-subtle)' }}>Président · Roussel SAS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Write FAQ.tsx**

```tsx
// frontend/components/landing/FAQ.tsx
import { SectionHead } from './Services'

const faqs = [
  {
    q: 'Combien ça coûte ?',
    a: <>
      <p>La cartographie initiale est forfaitaire : <strong>4 800&nbsp;€&nbsp;HT</strong> pour trois semaines de travail et un livrable complet. C'est notre point d'entrée — vous repartez avec le graphe de votre métier, même si vous décidez de ne pas aller plus loin avec nous.</p>
      <p>Le développement d'un workflow tient ensuite généralement entre <strong>12&nbsp;000&nbsp;€</strong> et <strong>45&nbsp;000&nbsp;€</strong> selon la complexité. Sans tickets cachés.</p>
    </>,
  },
  {
    q: 'Combien de temps pour avoir quelque chose qui marche ?',
    a: <p>Trois semaines pour la cartographie, trois à six semaines pour un premier workflow en production. Notre record est de 11 jours sur un cas simple — notre moyenne est de 21 jours.</p>,
  },
  {
    q: 'Mes données partent-elles entraîner GPT ou Claude ?',
    a: <p>Non. On utilise les APIs entreprise des fournisseurs (Anthropic, OpenAI, Mistral) qui garantissent par contrat que vos données ne sont pas utilisées pour l'entraînement. Pour les cas sensibles, on déploie des modèles open-source en local chez OVH.</p>,
  },
  {
    q: 'On n'a pas de data team. C'est un problème ?',
    a: <p>Au contraire — c'est notre terrain. 80&nbsp;% de nos clients n'ont aucune équipe data. On gère toute la partie technique. Vos équipes métier interagissent avec des interfaces qui parlent leur langue, pas des notebooks.</p>,
  },
  {
    q: 'Que se passe-t-il après la mise en production ?',
    a: <p>Six mois d'astreinte inclus : monitoring, corrections, ajustements de prompts. Vos équipes gardent un accès "édition" aux logiques métier — pas besoin de nous rappeler pour modifier un prompt. Après six mois, on propose un contrat de maintenance ou on transmet le code à votre équipe.</p>,
  },
  {
    q: 'Et si ça ne marche pas ?',
    a: <p>La cartographie est livrée en 3 semaines. Si on ne trouve pas de zone à fort levier, on vous le dit — et on vous rembourse 50&nbsp;%. Sur les workflows, on travaille à objectif&nbsp;: si le KPI cible n'est pas atteint à 6 mois, on continue jusqu'à ce qu'il le soit, sans frais supplémentaires.</p>,
  },
]

export function FAQ() {
  return (
    <section id="faq" className="border-t" style={{ padding: '128px 0', borderColor: 'var(--border)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHead
          num="05 — QUESTIONS"
          title={<>Avant<br/>de <em className="italic" style={{color:'var(--accent)'}}>commencer</em>.</>}
          desc="Les questions qui reviennent le plus souvent lors de nos premières conversations. Si la vôtre n'est pas là, écrivez-nous — on répond en moins de 24 h."
        />
        <div className="flex flex-col">
          {faqs.map((item, i) => (
            <div key={i} className="grid gap-16 py-7 border-t last:border-b" style={{ gridTemplateColumns: '1fr 1.4fr', borderColor: 'var(--border)' }}>
              <div className="font-serif italic leading-[1.2] tracking-[-0.015em]" style={{ fontSize: 'clamp(20px,2.4vw,28px)', color: 'var(--ink)' }}>{item.q}</div>
              <div className="text-[15px] leading-[1.65] [&_p]:mb-3 [&_p:last-child]:mb-0" style={{ color: 'var(--ink-muted)' }}>{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Write CTA.tsx**

```tsx
// frontend/components/landing/CTA.tsx
import { Button } from '@/components/ui/Button'

export function CTA({ onBook }: { onBook: () => void }) {
  return (
    <section id="cta" className="border-t relative overflow-hidden" style={{ padding: '160px 0', borderColor: 'var(--border)' }}>
      {/* Animated background graph */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
        style={{
          opacity: 0.5,
          maskImage: 'radial-gradient(ellipse 60% 80% at 90% 50%, #000 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 80% at 90% 50%, #000 30%, transparent 75%)',
        }}
      >
        <svg viewBox="0 0 1200 700" preserveAspectRatio="xMaxYMid slice" className="w-full h-full">
          <g stroke="var(--ink-subtle)" strokeWidth="0.5" opacity="0.4" fill="none">
            <path d="M850 100 L1000 250 L900 420 L1050 550 L850 640"/>
            <path d="M1000 250 L1150 200"/><path d="M900 420 L750 380"/><path d="M1050 550 L1180 480"/>
          </g>
          <g stroke="var(--accent)" strokeWidth="1.4" fill="none" strokeDasharray="4 6" opacity="0.7">
            <path d="M850 100 L1000 250"><animate attributeName="stroke-dashoffset" from="0" to="-20" dur="3.2s" repeatCount="indefinite"/></path>
            <path d="M1000 250 L900 420"><animate attributeName="stroke-dashoffset" from="0" to="-20" dur="3.6s" repeatCount="indefinite"/></path>
            <path d="M900 420 L1050 550"><animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2.8s" repeatCount="indefinite"/></path>
          </g>
          <g>
            <circle cx="850" cy="100" r="6" fill="var(--accent)"/>
            <circle cx="1000" cy="250" r="8" fill="var(--accent)"/>
            <circle cx="900" cy="420" r="7" fill="var(--accent)"/>
            <circle cx="1050" cy="550" r="8" fill="var(--accent)"/>
            <circle cx="850" cy="640" r="6" fill="var(--accent)"/>
            <circle cx="1150" cy="200" r="4" fill="var(--ink-muted)"/>
            <circle cx="750" cy="380" r="4" fill="var(--ink-muted)"/>
            <circle cx="1180" cy="480" r="4" fill="var(--ink-muted)"/>
          </g>
        </svg>
      </div>

      <div className="max-w-[1280px] mx-auto px-6">
        <h2
          className="font-serif font-normal m-0 leading-[0.95] tracking-[-0.035em]"
          style={{ fontSize: 'clamp(56px,9vw,144px)', maxWidth: '14ch', color: 'var(--ink)' }}
        >
          Trois semaines<br/>
          pour <em className="italic" style={{ color: 'var(--accent)' }}>voir</em><br/>
          votre métier<br/>
          autrement.
        </h2>
        <p className="mt-8 text-[18px] leading-[1.55]" style={{ color: 'var(--ink-muted)', maxWidth: '56ch' }}>
          Une heure pour qu'on comprenne ce que vous faites. Trois semaines pour livrer la carte.
          Aucun engagement de poursuivre — on commence par se rencontrer.
        </p>
        <div className="mt-12 flex flex-wrap gap-3 items-center">
          <Button size="lg" onClick={onBook}>
            Réserver un échange
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3 8h10M9 4l4 4-4 4"/>
            </svg>
          </Button>
          <span className="ml-4 font-mono text-[11px] tracking-[0.08em] uppercase" style={{ color: 'var(--ink-subtle)' }}>
            RÉPONSE SOUS 24 H · 30 MIN PAR APPEL
          </span>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Write Footer.tsx**

```tsx
// frontend/components/landing/Footer.tsx
import { Logo } from '@/components/brand/Logo'

export function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: 'var(--border)', paddingTop: 80, paddingBottom: 56, background: 'var(--bg-sunken)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid gap-12 mb-16" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}>
          <div className="flex flex-col gap-4" style={{ maxWidth: '32ch' }}>
            <Logo />
            <p className="font-serif italic text-[22px] leading-[1.35] tracking-[-0.01em] mt-1" style={{ color: 'var(--ink-muted)' }}>
              L'IA qui parle votre métier.
            </p>
          </div>
          {[
            { title: 'Société', links: ['À propos', 'Équipe', 'Carrières', 'Presse'] },
            { title: 'Ressources', links: ['Cas clients', 'Méthode', 'Journal', 'Design system'] },
            { title: 'Contact', links: ['hello@nodal-ai-services.com', '+33 1 83 62 87 00', 'Paris · 9ᵉ', 'Mentions légales'] },
          ].map(col => (
            <div key={col.title}>
              <h5 className="font-mono text-[11px] tracking-[0.12em] uppercase mb-3.5 font-medium" style={{ color: 'var(--ink-subtle)' }}>{col.title}</h5>
              <ul className="list-none p-0 m-0 flex flex-col gap-2">
                {col.links.map(l => (
                  <li key={l}>
                    <a href={l.includes('@') ? `mailto:${l}` : l.includes('+') ? `tel:${l.replace(/\s/g,'')}` : '#'}
                      className="text-[14px] transition-colors duration-120"
                      style={{ color: 'var(--ink-muted)' }}
                    >{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-6 border-t flex-wrap gap-4" style={{ borderColor: 'var(--border)' }}>
          <span className="font-mono text-[11px] tracking-[0.06em]" style={{ color: 'var(--ink-subtle)' }}>
            © 2026 NODAL SAS · SIRET 894 217 503 00012 · RGPD COMPLIANT
          </span>
          <div className="flex gap-1.5">
            {[
              { label: 'LinkedIn', path: 'M3 5h2v9H3zM4 2a1.25 1.25 0 1 1 0 2.5A1.25 1.25 0 0 1 4 2zM7 5h2v1.3c.4-.7 1.4-1.5 2.7-1.5 2 0 2.3 1.3 2.3 3V14h-2V8.3c0-1-.2-1.8-1.4-1.8-1.2 0-1.6.8-1.6 1.8V14H7z', fill: true },
              { label: 'GitHub', path: 'M8 0a8 8 0 0 0-2.5 15.6c.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.4.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-3.9 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.6 7.6 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.5.8 1.2.8 2.1 0 3-1.8 3.7-3.6 3.9.3.2.5.7.5 1.5v2.2c0 .2.1.5.5.4A8 8 0 0 0 8 0z', fill: true },
            ].map(s => (
              <a key={s.label} href="#" aria-label={s.label} className="w-8 h-8 rounded-lg border flex items-center justify-center transition-colors" style={{ borderColor: 'var(--border)', color: 'var(--ink-muted)' }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill={s.fill ? 'currentColor' : 'none'}><path d={s.path}/></svg>
              </a>
            ))}
          </div>
        </div>

        <div className="font-serif italic leading-[0.85] tracking-[-0.045em] mt-6 -mb-6 select-none" style={{ fontSize: 'clamp(96px,22vw,360px)', color: 'var(--ink)' }} aria-hidden="true">
          Nodal.
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 6: Commit**
```bash
git add frontend/components/landing/
git commit -m "feat: Stack, Testimonial, FAQ, CTA, Footer sections"
```

---

## Task 9: Google Calendar lib + Route Handlers

**Files:**
- Create: `frontend/lib/google-calendar.ts`
- Create: `frontend/app/api/slots/route.ts`
- Create: `frontend/app/api/book/route.ts`

- [ ] **Step 1: Write google-calendar.ts**

```ts
// frontend/lib/google-calendar.ts
import { google } from 'googleapis'

function getAuth() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!raw) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON not set')
  const credentials = JSON.parse(raw)
  return new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  })
}

export interface Slot {
  start: string // ISO 8601
  end: string
}

/** Returns available 30-min slots for the next 14 days (Mon–Fri, 9–18 CET) */
export async function getAvailableSlots(): Promise<Slot[]> {
  const auth = getAuth()
  const calendar = google.calendar({ version: 'v3', auth })
  const calendarId = process.env.GOOGLE_CALENDAR_ID!

  const now = new Date()
  const twoWeeks = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)

  const freeBusy = await calendar.freebusy.query({
    requestBody: {
      timeMin: now.toISOString(),
      timeMax: twoWeeks.toISOString(),
      items: [{ id: calendarId }],
    },
  })

  const busy = freeBusy.data.calendars?.[calendarId]?.busy ?? []

  // Generate all 30-min slots Mon–Fri 9:00–17:30 CET
  const slots: Slot[] = []
  const cursor = new Date(now)
  cursor.setMinutes(0, 0, 0)

  while (cursor < twoWeeks) {
    const day = cursor.getDay()
    if (day >= 1 && day <= 5) {
      const hour = cursor.getHours()
      if (hour >= 9 && hour < 18) {
        const slotEnd = new Date(cursor.getTime() + 30 * 60 * 1000)
        const isBusy = busy.some(b => {
          const bs = new Date(b.start!).getTime()
          const be = new Date(b.end!).getTime()
          return cursor.getTime() < be && slotEnd.getTime() > bs
        })
        if (!isBusy && cursor > now) {
          slots.push({ start: cursor.toISOString(), end: slotEnd.toISOString() })
        }
      }
    }
    cursor.setMinutes(cursor.getMinutes() + 30)
  }

  return slots
}

export interface BookingData {
  name: string
  email: string
  company: string
  message: string
  start: string
  end: string
}

export async function createBooking(data: BookingData): Promise<string> {
  const auth = getAuth()
  const calendar = google.calendar({ version: 'v3', auth })
  const calendarId = process.env.GOOGLE_CALENDAR_ID!

  const event = await calendar.events.insert({
    calendarId,
    sendUpdates: 'all',
    requestBody: {
      summary: `RDV Nodal — ${data.name} (${data.company})`,
      description: data.message,
      start: { dateTime: data.start, timeZone: 'Europe/Paris' },
      end:   { dateTime: data.end,   timeZone: 'Europe/Paris' },
      attendees: [{ email: data.email, displayName: data.name }],
      conferenceData: {
        createRequest: { requestId: crypto.randomUUID(), conferenceSolutionKey: { type: 'hangoutsMeet' } },
      },
    },
    conferenceDataVersion: 1,
  })

  return event.data.id!
}
```

- [ ] **Step 2: Write api/slots/route.ts**

```ts
// frontend/app/api/slots/route.ts
import { NextResponse } from 'next/server'
import { getAvailableSlots } from '@/lib/google-calendar'

export const revalidate = 60 // cache for 1 minute

export async function GET() {
  try {
    const slots = await getAvailableSlots()
    return NextResponse.json({ slots })
  } catch (err) {
    console.error('[slots]', err)
    return NextResponse.json({ error: 'Impossible de charger les créneaux' }, { status: 500 })
  }
}
```

- [ ] **Step 3: Write api/book/route.ts**

```ts
// frontend/app/api/book/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createBooking } from '@/lib/google-calendar'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, company, message, start, end } = body

  if (!name || !email || !start || !end) {
    return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
  }

  try {
    const eventId = await createBooking({ name, email, company: company ?? '', message: message ?? '', start, end })
    return NextResponse.json({ success: true, eventId })
  } catch (err) {
    console.error('[book]', err)
    return NextResponse.json({ error: 'Erreur lors de la réservation' }, { status: 500 })
  }
}
```

- [ ] **Step 4: Commit**
```bash
git add frontend/lib/ frontend/app/api/
git commit -m "feat: Google Calendar lib and Route Handlers for slots/book"
```

---

## Task 10: BookingModal component

**Files:**
- Create: `frontend/components/ui/BookingModal.tsx`

- [ ] **Step 1: Write BookingModal.tsx**

```tsx
// frontend/components/ui/BookingModal.tsx
'use client'
import { useEffect, useState } from 'react'
import { Button } from './Button'

interface Slot { start: string; end: string }

function formatSlot(slot: Slot) {
  const d = new Date(slot.start)
  return {
    day: d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }),
    time: d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
  }
}

function groupByDay(slots: Slot[]): Record<string, Slot[]> {
  return slots.reduce((acc, s) => {
    const key = new Date(s.start).toDateString()
    acc[key] = [...(acc[key] ?? []), s]
    return acc
  }, {} as Record<string, Slot[]>)
}

export function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [slots, setSlots] = useState<Slot[]>([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<Slot | null>(null)
  const [step, setStep] = useState<'pick' | 'form' | 'done'>('pick')
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    setLoading(true)
    fetch('/api/slots')
      .then(r => r.json())
      .then(d => setSlots(d.slots ?? []))
      .finally(() => setLoading(false))
  }, [open])

  useEffect(() => {
    if (open) { setStep('pick'); setSelected(null); setError(''); setForm({ name:'', email:'', company:'', message:'' }) }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selected) return
    setSubmitting(true); setError('')
    const res = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, start: selected.start, end: selected.end }),
    })
    const data = await res.json()
    setSubmitting(false)
    if (data.error) { setError(data.error); return }
    setStep('done')
  }

  if (!open) return null

  const grouped = groupByDay(slots)

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Réserver un échange">
      {/* Backdrop */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={onClose} />

      {/* Panel */}
      <div
        className="relative w-full max-w-[680px] rounded-2xl overflow-hidden max-h-[90vh] flex flex-col"
        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xl)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b" style={{ borderColor: 'var(--border)' }}>
          <div>
            <h2 className="font-serif italic text-[28px] tracking-[-0.02em] m-0" style={{ color: 'var(--ink)' }}>Réserver un échange.</h2>
            <p className="text-[13px] mt-1" style={{ color: 'var(--ink-muted)' }}>30 min · Google Meet · Réponse sous 24 h</p>
          </div>
          <button onClick={onClose} aria-label="Fermer" className="w-8 h-8 flex items-center justify-center rounded-lg border transition-colors" style={{ borderColor: 'var(--border)', color: 'var(--ink-muted)' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M4 4l8 8M4 12l8-8"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-8 py-6">
          {step === 'pick' && (
            <>
              {loading && (
                <div className="flex items-center justify-center py-16 font-mono text-[12px] tracking-[0.1em] uppercase" style={{ color: 'var(--ink-subtle)' }}>
                  Chargement des créneaux…
                </div>
              )}
              {!loading && slots.length === 0 && (
                <div className="text-center py-16 font-serif italic text-[20px]" style={{ color: 'var(--ink-muted)' }}>
                  Aucun créneau disponible pour le moment.<br/>
                  <a href="mailto:hello@nodal-ai-services.com" className="text-[var(--accent)]">Écrivez-nous directement →</a>
                </div>
              )}
              {!loading && Object.entries(grouped).map(([dayKey, daySlots]) => {
                const label = new Date(daySlots[0].start).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
                return (
                  <div key={dayKey} className="mb-6">
                    <div className="font-mono text-[11px] tracking-[0.1em] uppercase mb-3" style={{ color: 'var(--ink-subtle)' }}>{label}</div>
                    <div className="flex flex-wrap gap-2">
                      {daySlots.map(slot => {
                        const time = new Date(slot.start).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
                        const isSelected = selected?.start === slot.start
                        return (
                          <button
                            key={slot.start}
                            onClick={() => { setSelected(slot); setStep('form') }}
                            className="h-9 px-4 rounded-lg border text-[14px] font-mono transition-all duration-120"
                            style={{
                              borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
                              background: isSelected ? 'var(--accent-soft)' : 'var(--surface)',
                              color: isSelected ? 'var(--accent)' : 'var(--ink)',
                            }}
                          >
                            {time}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </>
          )}

          {step === 'form' && selected && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Selected slot recap */}
              <div className="flex items-center gap-3 p-4 rounded-xl border" style={{ background: 'var(--accent-soft)', borderColor: 'var(--accent)' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round">
                  <rect x="2" y="3" width="12" height="11" rx="2"/><path d="M5 1v4M11 1v4M2 7h12"/>
                </svg>
                <span className="text-[14px]" style={{ color: 'var(--accent)' }}>
                  {formatSlot(selected).day} à {formatSlot(selected).time}
                </span>
                <button type="button" onClick={() => setStep('pick')} className="ml-auto text-[12px] font-mono tracking-[0.06em] uppercase underline" style={{ color: 'var(--accent)' }}>Changer</button>
              </div>

              {[
                { name: 'name',    label: 'Votre nom',      type: 'text',  required: true,  placeholder: 'Marie Dupont' },
                { name: 'email',   label: 'Email',          type: 'email', required: true,  placeholder: 'marie@entreprise.fr' },
                { name: 'company', label: 'Entreprise',     type: 'text',  required: false, placeholder: 'Roussel SAS' },
              ].map(f => (
                <div key={f.name} className="flex flex-col gap-1.5">
                  <label className="font-mono text-[11px] tracking-[0.1em] uppercase" style={{ color: 'var(--ink-subtle)' }}>
                    {f.label}{f.required && <span style={{ color: 'var(--accent)' }}> *</span>}
                  </label>
                  <input
                    type={f.type}
                    required={f.required}
                    placeholder={f.placeholder}
                    value={form[f.name as keyof typeof form]}
                    onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                    className="h-10 px-3 rounded-lg border text-[15px] outline-none transition-colors"
                    style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--ink)' }}
                  />
                </div>
              ))}

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] tracking-[0.1em] uppercase" style={{ color: 'var(--ink-subtle)' }}>
                  En quoi pouvons-nous vous aider ?
                </label>
                <textarea
                  rows={3}
                  placeholder="Décrivez brièvement votre activité et le problème que vous souhaitez résoudre…"
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  className="px-3 py-2.5 rounded-lg border text-[15px] leading-[1.5] outline-none resize-none transition-colors"
                  style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--ink)' }}
                />
              </div>

              {error && <p className="text-[13px]" style={{ color: 'var(--red-500)' }}>{error}</p>}

              <Button type="submit" size="lg" disabled={submitting} className="w-full justify-center">
                {submitting ? 'Réservation en cours…' : 'Confirmer le rendez-vous'}
              </Button>
            </form>
          )}

          {step === 'done' && (
            <div className="text-center py-8 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--green-100)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--green-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
              <h3 className="font-serif italic text-[28px] tracking-[-0.02em]" style={{ color: 'var(--ink)' }}>C'est noté.</h3>
              <p className="text-[15px] leading-[1.6]" style={{ color: 'var(--ink-muted)', maxWidth: '40ch' }}>
                Une invitation Google Calendar vous a été envoyée. On se retrouve bientôt.
              </p>
              <Button variant="secondary" size="md" onClick={onClose} className="mt-2">Fermer</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add frontend/components/ui/BookingModal.tsx
git commit -m "feat: BookingModal with slot picker, form, and confirmation"
```

---

## Task 11: Assemble page.tsx + connect modal

**Files:**
- Create: `frontend/app/page.tsx`

- [ ] **Step 1: Write page.tsx**

```tsx
// frontend/app/page.tsx
'use client'
import { useState } from 'react'
import { Nav }         from '@/components/landing/Nav'
import { Hero }        from '@/components/landing/Hero'
import { LogoStrip }   from '@/components/landing/LogoStrip'
import { Services }    from '@/components/landing/Services'
import { Method }      from '@/components/landing/Method'
import { Cases }       from '@/components/landing/Cases'
import { Stack }       from '@/components/landing/Stack'
import { Testimonial } from '@/components/landing/Testimonial'
import { FAQ }         from '@/components/landing/FAQ'
import { CTA }         from '@/components/landing/CTA'
import { Footer }      from '@/components/landing/Footer'
import { BookingModal } from '@/components/ui/BookingModal'

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      <Nav onBook={() => setBookingOpen(true)} />
      <main id="top">
        <Hero    onBook={() => setBookingOpen(true)} />
        <LogoStrip />
        <Services />
        <Method />
        <Cases />
        <Stack />
        <Testimonial />
        <FAQ />
        <CTA onBook={() => setBookingOpen(true)} />
      </main>
      <Footer />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
```

- [ ] **Step 2: Verify dev server starts**

```bash
cd frontend
npm run dev
```

Expected: server starts on http://localhost:3000 with no TypeScript errors.

- [ ] **Step 3: Commit**
```bash
git add frontend/app/page.tsx
git commit -m "feat: assemble landing page with BookingModal wired to all CTAs"
```

---

## Task 12: Responsive breakpoints + polish

**Files:**
- Modify: `frontend/app/globals.css` (add responsive helpers)
- Modify: `frontend/components/landing/Services.tsx` (mobile grid)
- Modify: `frontend/components/landing/Cases.tsx` (mobile stack)

- [ ] **Step 1: Add responsive media queries to globals.css**

```css
/* Add at end of globals.css */
@media (max-width: 1100px) {
  .hero-two-col { grid-template-columns: 1fr !important; }
  .hero-visual  { display: none !important; }
}
@media (max-width: 900px) {
  .section-head-grid { grid-template-columns: 1fr !important; gap: 16px !important; margin-bottom: 48px !important; }
  .services-grid     { grid-template-columns: 1fr !important; }
  .method-grid       { grid-template-columns: 1fr 1fr !important; }
  .cases-grid        { grid-template-columns: 1fr !important; gap: 32px !important; padding: 40px 0 !important; }
  .stack-grid        { grid-template-columns: repeat(3,1fr) !important; }
  .footer-grid       { grid-template-columns: 1fr 1fr !important; }
  .faq-grid          { grid-template-columns: 1fr !important; gap: 16px !important; }
  .testimonial-grid  { grid-template-columns: 1fr !important; gap: 32px !important; }
  .infra-grid        { grid-template-columns: 1fr !important; gap: 24px !important; }
  .stats-row         { grid-template-columns: repeat(2,1fr) !important; gap: 20px !important; }
  .lp-section-pad    { padding-top: 80px !important; padding-bottom: 80px !important; }
}
@media (max-width: 560px) {
  .method-grid { grid-template-columns: 1fr !important; }
  .stack-grid  { grid-template-columns: repeat(2,1fr) !important; }
  .footer-grid { grid-template-columns: 1fr !important; }
  .hero-stats  { grid-template-columns: repeat(2,1fr) !important; }
}
```

Then add `className` attributes to grids in each component to use these classes, replacing inline `style` gridTemplateColumns where responsive behavior is needed.

- [ ] **Step 2: Test on mobile viewport**

In browser devtools, set viewport to 375px wide. Verify:
- Nav hides links, shows logo + theme toggle + CTA
- Hero is single column, visual mock hidden
- Services stacks vertically
- Method is 2-col then 1-col
- FAQ stacks question above answer
- Footer is 2-col then 1-col
- Colossal "Nodal." scales down properly

- [ ] **Step 3: Commit**
```bash
git add frontend/
git commit -m "feat: responsive breakpoints for all sections"
```

---

## Task 13: Vercel deployment config

**Files:**
- Create: `frontend/vercel.json`
- Create: `frontend/next.config.ts`

- [ ] **Step 1: Write next.config.ts**

```ts
// frontend/next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Required to bundle googleapis for serverless edge
  serverExternalPackages: ['googleapis'],
}

export default nextConfig
```

- [ ] **Step 2: Write vercel.json**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

- [ ] **Step 3: Set up env vars in Vercel**

In Vercel dashboard → Settings → Environment Variables, add:
- `GOOGLE_SERVICE_ACCOUNT_JSON` — paste the full service account JSON (minified)
- `GOOGLE_CALENDAR_ID` — e.g. `abc123@group.calendar.google.com`
- `RESEND_API_KEY` — optional, for custom confirmation email
- `NEXT_PUBLIC_SITE_URL` — `https://nodal-ai-services.com`

- [ ] **Step 4: Final commit + push**

```bash
git add frontend/vercel.json frontend/next.config.ts
git commit -m "chore: Vercel deployment config"
git push origin main
```

Expected: Vercel auto-deploys. Check deployment logs for any googleapis bundling issues.

---

## Google Cloud Service Account Setup (one-time)

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create project or select existing
3. Enable **Google Calendar API** (APIs & Services → Library)
4. Create Service Account (APIs & Services → Credentials → Create Credentials → Service Account)
5. Download JSON key
6. In Google Calendar: share your calendar with the service account email (`something@project.iam.gserviceaccount.com`) with **"Make changes to events"** permission
7. Copy the calendar ID (Calendar settings → Integrate calendar → Calendar ID)
8. Minify the JSON key and paste as `GOOGLE_SERVICE_ACCOUNT_JSON` in Vercel env vars
