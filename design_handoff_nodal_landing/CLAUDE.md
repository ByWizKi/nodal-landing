# Instructions Claude Code — Projet Nodal

Tu travailles sur la landing page de **Nodal**, une agence IA pour PME.
Lis ce fichier en entier avant tout. Lis aussi `README.md` pour le brief produit.

## Mission

Recréer la landing page de Nodal dans un vrai framework de production (par défaut **Next.js 14+ App Router + TypeScript + Tailwind CSS**, sauf si l'utilisateur préfère autre chose).

## Source de vérité

- `references/landing.html` — c'est la maquette à reproduire. **Ouvre-la dans un navigateur** pour voir le rendu interactif.
- `tokens.css` — variables CSS du design system, à respecter strictement.
- `references/landing.css` — styles précis (utiles pour comprendre les compositions).
- `assets/logo-mark.svg` — le logo officiel.

## Règles d'implémentation

1. **Pas de copier-coller du HTML brut.** Recrée chaque section avec des composants React idiomatiques (`<Hero />`, `<Services />`, etc.).
2. **Tokens stricts.** Aucune couleur, taille, ou spacing ne doit être inventé. Tout vient de `tokens.css`. Si tu utilises Tailwind, étends `tailwind.config.js` avec ces tokens.
3. **Polices** : charge `Instrument Serif`, `Geist`, et `Geist Mono` via `next/font/google`.
4. **Mode sombre** : implémente via `next-themes` ou un toggle simple avec attribut `data-theme="dark"` sur `<html>`.
5. **Responsive** : les breakpoints sont à 560 / 720 / 900 / 1100 / 1280 px (voir les media queries dans `references/landing.css`).
6. **Accessibilité** : H1-H6 dans l'ordre, alt sur les SVG décoratifs = "", boutons avec `aria-label` quand sans texte.
7. **Performance** : optimise les images, lazy-load les sections sous le fold.

## Structure de fichiers recommandée

```
app/
  layout.tsx
  page.tsx                    ← assemble les sections
  globals.css                 ← imports + tokens
components/
  brand/
    Logo.tsx                  ← Mark + wordmark
    LogoMark.tsx              ← juste le mark SVG
  landing/
    Hero.tsx
    LogoStrip.tsx
    Services.tsx
    Method.tsx
    Cases.tsx
    Stack.tsx
    Testimonial.tsx
    FAQ.tsx
    CTA.tsx
    Footer.tsx
  ui/
    Button.tsx                ← btn-primary / btn-secondary / btn-ghost / btn-danger
    Badge.tsx
    Card.tsx
public/
  logo-mark.svg
  logo-mark-outline.svg
tailwind.config.ts            ← étendu avec les tokens
```

## Tokens importants à mapper dans tailwind.config.ts

```ts
theme: {
  extend: {
    colors: {
      paper: { 0: '#FFFFFF', 50: '#FAFAF7', 100: '#F4F4EE', 200: '#EAEAE2',
               300: '#D8D8CE', 400: '#B5B5A8', 500: '#8A8A7C', 600: '#5F5F55',
               700: '#3D3D36', 800: '#1F1F1B', 900: '#0E0E0C' },
      cobalt: { 50: '#EEF1FE', 100: '#DDE3FD', 200: '#B9C4FB', 300: '#8B9DF8',
                400: '#5C76F2', 500: '#2B4FE8', 600: '#1E3CC9', 700: '#182FA0',
                800: '#14267D', 900: '#0E1B5C' },
    },
    fontFamily: {
      serif: ['"Instrument Serif"', 'serif'],
      sans: ['Geist', 'sans-serif'],
      mono: ['"Geist Mono"', 'monospace'],
    },
    boxShadow: {
      sm: '0 1px 2px rgba(15,23,42,0.04), 0 1px 1px rgba(15,23,42,0.03)',
      md: '0 2px 4px rgba(15,23,42,0.04), 0 8px 24px -8px rgba(15,23,42,0.08)',
      lg: '0 4px 8px rgba(15,23,42,0.04), 0 24px 48px -12px rgba(15,23,42,0.12)',
      xl: '0 8px 16px rgba(15,23,42,0.06), 0 40px 80px -16px rgba(15,23,42,0.18)',
    },
  },
}
```

## Tone de la copy (à conserver tel quel)

- **Slogan principal** : *« L'IA qui parle votre métier. »*
- **Sub** : « Nodal conçoit des outils SaaS et des automatisations sur mesure pour les PME. On part de votre métier — pas d'un modèle générique — et on livre des workflows que vos équipes pilotent au quotidien. »
- **CTA primaire** : « Cartographier mon métier »
- **CTA secondaire** : « Voir les cas clients »
- **URL** : nodal-ai-services.com
- **Email** : hello@nodal-ai-services.com

## Comportements à respecter

- Theme toggle clair/sombre (button dans la nav, persiste via localStorage)
- Le hero a un graphe SVG animé en fond (nodes qui pulsent, edges dashed qui défilent — voir `references/landing.html` ligne 100-180)
- Les CTAs ont un état hover (background plus foncé)
- Les FAQ items peuvent être des `<details>/<summary>` ou un accordéon contrôlé

## À NE PAS faire

- Ne pas ajouter de framework UI tiers (Material, Chakra, shadcn) — code from scratch avec les tokens.
- Ne pas inventer de nouvelles couleurs, polices, ou tailles.
- Ne pas changer le slogan ou le ton de la copy sans demander.
- Ne pas réutiliser le système de "Tweaks" du prototype — c'est juste pour l'exploration design, pas pour la prod.

## Si tu as un doute

Demande à l'utilisateur avant de prendre une liberté créative. Le design est haute-fidélité — chaque détail compte.
