# Handoff — Nodal Landing Page

Tu vas implémenter la landing page de **Nodal** (agence IA pour PME) dans un vrai codebase.
Ce dossier contient le design system complet et la landing de référence en HTML.

## Ce que contient ce dossier

```
design_handoff_nodal_landing/
├── README.md                  ← tu es ici (vue d'ensemble + brief produit)
├── CLAUDE.md                  ← instructions pour Claude Code en priorité absolue
├── tokens.css                 ← variables CSS du design system (couleurs, type, spacing)
├── assets/
│   ├── logo-mark.svg          ← logo Nodal (4 nœuds + 3 arêtes formant un N)
│   └── logo-mark-outline.svg  ← variante outline
└── references/
    ├── landing.html           ← LA référence à reproduire (open dans un navigateur)
    ├── design-system.html     ← guidelines complètes (logo, couleurs, type, composants)
    ├── styles.css             ← tokens + utilities (déjà inclus dans tokens.css)
    ├── landing.css            ← styles spécifiques à la landing
    └── script.js              ← interactions (theme toggle, tweaks)
```

⚠️ **Les fichiers `references/` sont des prototypes HTML.** Ils montrent l'intention visuelle et le comportement attendu. **Ne les copie pas tels quels en production** — recrée-les dans le framework cible.

## Fidélité : haute fidélité (hifi)

Toutes les couleurs, typos, tailles, ombres, espacements sont définitifs. Reproduis pixel-perfect.

## Brand brief

**Nom :** Nodal  
**Métier :** Agence IA pour PME (outils SaaS sur mesure + automatisation de workflows)  
**Cible :** Dirigeants de PME (industrie, services, retail) qui ne sont pas techniques  
**Positioning :** « D'abord la carte. Ensuite l'IA. » — on commence toujours par cartographier le métier  
**Slogan :** *« L'IA qui parle votre métier. »*  
**URL :** nodal-ai-services.com

## Design system

### Couleurs (light mode — défaut)

| Rôle | Variable | Hex |
|---|---|---|
| Background | `--bg` | `#FAFAF7` (paper-50) |
| Surface | `--bg-elevated` | `#FFFFFF` |
| Ink | `--ink` | `#0E0E0C` |
| Ink muted | `--ink-muted` | `#5F5F55` |
| Border | `--border` | `#EAEAE2` |
| Accent (cobalt) | `--accent` | `#2B4FE8` |

### Couleurs (dark mode)

| Rôle | Hex |
|---|---|
| Background | `#0B0B0A` |
| Surface | `#131312` |
| Ink | `#F2F1EC` |
| Border | `#232220` |
| Accent | `#7C95FF` |

Voir `tokens.css` pour la palette complète (ladders cobalt 50→900, paper 0→900, semantics).

### Typographie

- **Display / headlines** : `Instrument Serif` (italique surtout) — Google Fonts
- **UI / body** : `Geist` (300, 400, 500, 600, 700)
- **Data / labels** : `Geist Mono` (uppercase + tracking 0.08em–0.14em pour les eyebrows)

Échelle : voir `--t-display-1` à `--t-caption` dans `tokens.css`.

### Spacing & radii

Échelle de 4 (`--s-1` = 4px → `--s-11` = 192px).  
Radii : 0, 4, 8, 12, 16, 24, 999px.

### Élévation

`--shadow-sm` → `--shadow-xl` (4 niveaux discrets, voir tokens).

## Composants utilisés sur la landing

(détaillés dans `references/landing.html` + `references/landing.css`)

- **Nav sticky** avec brand lockup + liens + theme toggle + CTA primary
- **Hero** 2 colonnes : headline serif italique + sub + CTA / aperçu produit (mock Studio) avec animations SVG
- **Logo strip** clients avec différents traitements typographiques (placeholders)
- **Section "Services"** : 3 cartes côte à côte, séparées par borders, avec icônes 24px
- **Section "Méthode"** : 4 steps numérotés, layout grid
- **Cases studies** : 3 fiches client avec stats + citation + tags
- **Stack grid** : 12 intégrations dans une grille de cellules
- **Testimonial** : grosse citation serif italique avec attribution
- **FAQ** : accordéon-style 2 colonnes (question serif, réponse sans)
- **CTA final** : pleine page, headline 144px, fond animé
- **Footer** : 4 colonnes + colossal wordmark italique

## Interactions

- Theme toggle (clair ↔ sombre) — toggle via `data-theme` sur `<html>`
- Tweaks panel (édition vivante des accroches) — peut être skippé en prod
- Smooth scroll sur les ancres
- Animations SVG dans le hero (nodes qui pulsent, edges dashed qui défilent)

## Fichiers à reproduire dans ton codebase

Si tu utilises **Next.js + React + Tailwind** :
- Crée `app/page.tsx` ou `pages/index.tsx` pour la landing
- Place `tokens.css` dans `app/globals.css` (ou équivalent), ou convertis en `tailwind.config.js`
- Place les SVG dans `public/`
- Crée des composants `Hero.tsx`, `Services.tsx`, `Method.tsx`, `Cases.tsx`, `Stack.tsx`, `Testimonial.tsx`, `FAQ.tsx`, `CTA.tsx`, `Footer.tsx`

Si tu utilises **autre chose** : applique le design avec les patterns de ton framework. Garde fidèle aux tokens.

## Pour démarrer avec Claude Code

```bash
cd /chemin/vers/design_handoff_nodal_landing
claude
```

Puis dans Claude Code, dis-lui :
> Lis CLAUDE.md, puis recrée la landing de Nodal dans Next.js (App Router + TypeScript + Tailwind). Garde fidèle aux références HTML et utilise tokens.css comme source de vérité pour les couleurs/typos/espacements.

Claude Code lira `CLAUDE.md` automatiquement à chaque session — c'est là que sont les règles d'implémentation.

## Questions ?

Si quelque chose n'est pas clair dans le design, dis à Claude Code d'ouvrir `references/landing.html` dans le navigateur — c'est la source de vérité visuelle.
