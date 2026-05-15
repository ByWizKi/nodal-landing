import type { Metadata } from 'next'
import { Instrument_Serif, Geist, Geist_Mono } from 'next/font/google'
import { Providers } from '@/components/providers'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Nodal AI',
  description:
    "Nodal conçoit des outils SaaS et des automatisations sur mesure pour les PME. L'IA qui parle votre métier.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nodal-ai-services.com'
  ),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fr"
      className={`${instrumentSerif.variable} ${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
