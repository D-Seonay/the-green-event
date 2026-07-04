#!/bin/bash
# ============================================================
# Création automatique des issues GitHub — Audit thegreenfest.fr
# Usage: GITHUB_TOKEN=ghp_xxxx bash create-github-issues.sh
# ============================================================

REPO="D-Seonay/the-green-event"
API="https://api.github.com/repos/$REPO/issues"
TOKEN="${GITHUB_TOKEN:?'❌ Définir GITHUB_TOKEN=ghp_... avant de lancer ce script'}"

create_issue() {
  local title="$1"
  local body="$2"
  local labels="$3"

  payload=$(jq -n \
    --arg t "$title" \
    --arg b "$body" \
    --argjson l "$labels" \
    '{title: $t, body: $b, labels: $l}')

  response=$(curl -s -X POST "$API" \
    -H "Authorization: token $TOKEN" \
    -H "Accept: application/vnd.github+json" \
    -H "Content-Type: application/json" \
    -d "$payload")

  number=$(echo "$response" | jq -r '.number // "error"')
  url=$(echo "$response" | jq -r '.html_url // "error"')
  echo "✅ Issue #$number créée : $url"
}

echo "🚀 Création des issues pour $REPO..."
echo ""

# ─────────────────────────────────────────────
# 🔴 CRITIQUES
# ─────────────────────────────────────────────

create_issue \
  "[PERF] 🔴 Compresser la vidéo Hero (79 Mo → < 5 Mo)" \
  "## Problème
La vidéo de fond du Hero (\`/public/theGreenEvent.MP4\`) pèse **79 Mo**. Sur mobile 4G (~10 Mbps), cela représente ~60 secondes de chargement, bloquant le LCP et dégradant fortement la performance perçue.

## Impact
- LCP (Largest Contentful Paint) hors des seuils Core Web Vitals
- Expérience mobile très dégradée
- Consommation de bande passante Vercel élevée

## Solution
Compresser avec FFmpeg :
\`\`\`bash
# WebM (priorité, meilleure compression)
ffmpeg -i theGreenEvent.MP4 -vf \"scale=1920:-2\" -c:v libvpx-vp9 -crf 33 -b:v 0 -an public/theGreenEvent.webm
# MP4 fallback
ffmpeg -i theGreenEvent.MP4 -vf \"scale=1920:-2\" -c:v libx264 -crf 28 -preset slow -an public/theGreenEvent-opt.mp4
\`\`\`
Cible : **< 5 Mo** total, 1080p max, sans audio.

Mettre à jour \`Hero.tsx\` pour servir WebM en priorité :
\`\`\`tsx
<source src=\"/theGreenEvent.webm\" type=\"video/webm\" />
<source src=\"/theGreenEvent-opt.mp4\" type=\"video/mp4\" />
\`\`\`

## Fichiers
- \`/public/theGreenEvent.MP4\` (79 Mo)
- \`/components/sections/Hero.tsx\`" \
  '["performance","critical","good first issue"]'

create_issue \
  "[SEC] 🔴 Ajouter du rate limiting sur les routes API" \
  "## Problème
Les routes \`/api/newsletter\` et \`/api/benevoles\` n'ont **aucun rate limiting**. N'importe qui peut envoyer des milliers de requêtes pour spammer la boîte mail admin ou déclencher des envois massifs de mails via Nodemailer.

## Impact
- Spam de la boîte \`thegreenevent.44@gmail.com\`
- Possibilité de DoS applicatif sur les routes
- Coût potentiel si le provider email facture par volume

## Solution recommandée
Utiliser **Upstash Rate Limit** (gratuit, compatible Vercel Edge) :
\`\`\`bash
npm install @upstash/ratelimit @upstash/redis
\`\`\`

Exemple dans \`/app/api/newsletter/route.ts\` :
\`\`\`ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 m'), // 5 requêtes/min par IP
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return NextResponse.json({ error: 'Trop de requêtes.' }, { status: 429 });
  }
  // ... reste du handler
}
\`\`\`

Alternative simple sans dépendance externe : vérifier le header \`x-forwarded-for\` et maintenir un Map en mémoire (limité aux instances serverless).

## Fichiers
- \`/app/api/newsletter/route.ts\`
- \`/app/api/benevoles/route.ts\`" \
  '["security","critical"]'

create_issue \
  "[SEC] 🔴 Désactiver productionBrowserSourceMaps en production" \
  "## Problème
La config \`next.config.mjs\` a \`productionBrowserSourceMaps: true\`. Cela expose l'intégralité du code source TypeScript compilé aux visiteurs via les DevTools.

## Impact
- Tout le code source (logique métier, chemins d'API, structure) est lisible publiquement
- Facilite le reverse engineering et la recherche de failles
- Charge des fichiers \`.map\` supplémentaires → impact performance

## Solution
Supprimer ou désactiver la ligne dans \`next.config.mjs\` :
\`\`\`js
// Supprimer ou passer à false :
productionBrowserSourceMaps: false, // (c'est la valeur par défaut, la ligne peut être supprimée)
\`\`\`

Si les source maps sont nécessaires pour le débogage, les générer uniquement sur l'environnement de staging via une variable d'environnement :
\`\`\`js
productionBrowserSourceMaps: process.env.NEXT_PUBLIC_ENV === 'staging',
\`\`\`

## Fichier
- \`next.config.mjs\` (ligne 4)" \
  '["security","critical","easy"]'

create_issue \
  "[A11Y] 🔴 Ajouter aria-label sur les boutons sans texte visible" \
  "## Problème
Plusieurs boutons interactifs n'ont ni texte visible, ni \`aria-label\`. Les utilisateurs de lecteurs d'écran (NVDA, VoiceOver) ne peuvent pas savoir à quoi ils servent.

## Boutons concernés

### Lightbox (\`/components/ui/Lightbox.tsx\` lignes 51, 59, 67)
3 boutons de navigation (précédent, suivant, fermer) sans aria-label.

### ProductCarousel (\`/components/ui/ProductCarousel.tsx\` ligne 98)
Bouton de navigation sans aria-label.

### CollageImage (\`/components/ui/CollageImage.tsx\` ligne 98)
Bouton sans aria-label.

### Input newsletter (\`/components/sections/NewsletterSection.tsx\` ligne 147)
\`<input type=\"email\">\` sans \`<label>\` ni \`aria-label\` — uniquement un placeholder (qui n'est pas lu par tous les AT).

## Solution

\`\`\`tsx
// Lightbox
<button aria-label=\"Image précédente\">...</button>
<button aria-label=\"Image suivante\">...</button>
<button aria-label=\"Fermer la lightbox\">...</button>

// Input newsletter
<input
  type=\"email\"
  aria-label=\"Votre adresse email\"
  placeholder=\"votre@email.com\"
  ...
/>
\`\`\`

## Référence
WCAG 2.1 — Critère 4.1.2 (Nom, rôle, valeur) — Niveau A" \
  '["accessibility","critical"]'

echo ""
echo "─────────────────────────────────────────────"
echo "🟠 IMPORTANTES"
echo "─────────────────────────────────────────────"
echo ""

# ─────────────────────────────────────────────
# 🟠 IMPORTANTES
# ─────────────────────────────────────────────

create_issue \
  "[SEO] 🟠 Créer des images Open Graph dédiées (1200×630)" \
  "## Problème
Toutes les pages utilisent \`/logo.png\` comme image de partage social (Open Graph / Twitter Card). Ce logo :
- N'a pas les dimensions 1200×630 px réelles
- N'est pas représentatif du festival (pas de foule, pas d'ambiance)
- La page \`/boutique\` utilise même \`/placeholder.svg\` comme image OG

## Impact
- Aperçus sur Facebook, Twitter/X, WhatsApp peu attractifs
- Taux de clic depuis les partages sociaux sous-optimal

## Solution
Créer au minimum 2 images :

1. **Image OG principale** (\`/public/og-default.jpg\`) — 1200×630 px — photo de foule ou visuel festival
2. **Image OG boutique** (\`/public/og-boutique.jpg\`) — 1200×630 px — visuel merchandising

Mettre à jour les métadonnées :
\`\`\`ts
// app/layout.tsx
images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'The Green Fest 2026 - Vertou' }]

// app/boutique/page.tsx
images: [{ url: '/og-boutique.jpg', width: 1200, height: 630, alt: 'Boutique The Green Fest' }]
\`\`\`

## Outils
- Canva (template 1200×630), Figma, ou Photoshop
- Vérifier le rendu sur : https://www.opengraph.xyz/url/https://thegreenfest.fr" \
  '["seo","enhancement"]'

create_issue \
  "[PERF] 🟠 Compresser les images lourdes du projet" \
  "## Problème
Plusieurs images sources sont beaucoup trop lourdes, même si Next.js \`<Image>\` les optimise à la volée. La source volumineuse impacte les temps de build, le stockage et les cas où les images sont servies directement.

## Images concernées
| Fichier | Taille actuelle | Cible |
|---|---|---|
| \`/public/img/21062025-IMG_0684.jpg\` | **5.1 Mo** | < 300 Ko |
| \`/public/artists/blackAngers/blackAngers-1.png\` | **2.6 Mo** | < 300 Ko (convertir en JPEG) |
| \`/public/artists/LOOWS/LOOWS-1.png\` | **3 Mo** | < 300 Ko (convertir en JPEG) |
| \`/public/img/Photo_1.jpg\` | 1.1 Mo | < 200 Ko |

## Solution
\`\`\`bash
# Installer sharp CLI ou squoosh
npx @squoosh/cli --webp '{}' public/img/21062025-IMG_0684.jpg
npx @squoosh/cli --mozjpeg '{\"quality\":80}' public/artists/blackAngers/blackAngers-1.png

# Ou avec ImageMagick
convert blackAngers-1.png -quality 80 -resize '1200x>' blackAngers-1.jpg
\`\`\`

> Note : les PNG de photos (non-transparentes) doivent être convertis en JPEG." \
  '["performance","enhancement"]'

create_issue \
  "[PERF] 🟠 Supprimer DJI_0894.MP4 (83 Mo — fichier orphelin)" \
  "## Problème
Le fichier \`/public/img/DJI_0894.MP4\` pèse **83 Mo** et n'est référencé nulle part dans le code source. C'est une vidéo orpheline qui alourdit inutilement le dépôt et les déploiements Vercel.

## Vérification
\`\`\`bash
grep -r \"DJI_0894\" app/ components/ lib/ --include=\"*.tsx\" --include=\"*.ts\"
# Aucun résultat
\`\`\`

## Action
\`\`\`bash
rm public/img/DJI_0894.MP4
git add -A && git commit -m 'chore: remove unused 83MB video file'
\`\`\`

Ajouter au \`.gitignore\` les gros fichiers vidéo raw :
\`\`\`
*.MP4
!public/theGreenEvent.MP4
\`\`\`" \
  '["performance","chore","easy"]'

create_issue \
  "[A11Y] 🟠 Respecter prefers-reduced-motion dans les animations Framer Motion" \
  "## Problème
Le site utilise intensivement Framer Motion (scroll parallax, éléments flottants, transitions de page) sans vérifier la préférence système \`prefers-reduced-motion\`. Les utilisateurs sensibles aux mouvements (troubles vestibulaires, épilepsie) peuvent ressentir des malaises.

## WCAG
Critère 2.3.3 — Animation triggered by Interaction (Niveau AAA, mais bonne pratique)

## Solution
Utiliser le hook \`useReducedMotion()\` de Framer Motion :

\`\`\`tsx
import { useReducedMotion } from 'framer-motion';

const ConceptSection = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
    >
      ...
    </motion.div>
  );
};
\`\`\`

Ou globalement avec un variant conditionnel. Désactiver les éléments flottants (\`FloatingElements.tsx\`, parallax dans \`InfosSection.tsx\`) quand la préférence est active.

## Fichiers prioritaires
- \`/components/FloatingElements.tsx\`
- \`/components/sections/InfosSection.tsx\` (parallax)
- \`/components/sections/GallerySection.tsx\`" \
  '["accessibility","enhancement"]'

create_issue \
  "[SEC] 🟠 Ajouter une Content Security Policy (CSP)" \
  "## Problème
Les headers HTTP de \`next.config.mjs\` incluent \`X-Frame-Options\`, \`X-XSS-Protection\` etc. mais **aucune Content Security Policy**. Sans CSP, une faille XSS pourrait charger et exécuter du JavaScript arbitraire depuis n'importe quelle origine.

## Solution
Ajouter un header CSP dans \`next.config.mjs\` :

\`\`\`js
{
  key: 'Content-Security-Policy',
  value: [
    \"default-src 'self'\",
    \"script-src 'self' 'unsafe-inline'\",  // unsafe-inline requis par Next.js
    \"style-src 'self' 'unsafe-inline' fonts.googleapis.com\",
    \"font-src 'self' fonts.gstatic.com\",
    \"img-src 'self' data: blob:\",
    \"media-src 'self'\",
    \"frame-src https://www.google.com\",  // Google Maps embed
    \"connect-src 'self'\",
  ].join('; ')
}
\`\`\`

> Note : tester en mode report-only d'abord (\`Content-Security-Policy-Report-Only\`) pour éviter de casser le site.

## Ressources
- https://csp-evaluator.withgoogle.com/
- https://content-security-policy.com/

## Fichier
- \`next.config.mjs\`" \
  '["security","enhancement"]'

create_issue \
  "[SEO] 🟠 Mettre en place une redirection www → non-www (ou l'inverse)" \
  "## Problème
Le site répond sur \`https://www.thegreenfest.fr\` ET \`https://thegreenfest.fr\` sans redirection 301. Le canonical pointe sur \`https://thegreenfest.fr\` (non-www), mais les deux URLs sont accessibles. Google peut indexer les deux versions, créant un problème de contenu dupliqué.

## Vérification
\`\`\`bash
curl -I https://www.thegreenfest.fr
# Doit retourner 301 → https://thegreenfest.fr
\`\`\`

## Solution (Vercel)
Dans le dashboard Vercel du projet :
1. **Settings → Domains**
2. Sélectionner le domaine \`www.thegreenfest.fr\`
3. Choisir **Redirect to** \`thegreenfest.fr\` (301 Permanent)

Ou via \`vercel.json\` :
\`\`\`json
{
  \"redirects\": [
    {
      \"source\": \"https://www.thegreenfest.fr/:path*\",
      \"destination\": \"https://thegreenfest.fr/:path*\",
      \"permanent\": true
    }
  ]
}
\`\`\`" \
  '["seo","easy"]'

echo ""
echo "─────────────────────────────────────────────"
echo "🟡 MINEURES"
echo "─────────────────────────────────────────────"
echo ""

create_issue \
  "[TECH] 🟡 Vérifier et corriger la version Next.js dans package.json" \
  "## Problème
Le \`package.json\` déclare \`\"next\": \"^16.2.3\"\` mais **Next.js n'a pas de version 16**. La dernière version stable est Next.js 15.x. Il s'agit probablement d'une erreur de saisie manuelle.

## Vérification
\`\`\`bash
npm list next
# Vérifier quelle version est réellement installée
\`\`\`

## Action
1. Vérifier la version installée : \`cat node_modules/next/package.json | grep '\"version\"'\`
2. Corriger \`package.json\` pour correspondre à la version réelle
3. Corriger aussi \`eslint-config-next\` qui doit correspondre à la version Next.js

## Fichier
- \`package.json\`" \
  '["bug","tech-debt","easy"]'

create_issue \
  "[PERF] 🟡 Supprimer les dépendances npm inutilisées" \
  "## Problème
Plusieurs dépendances installées ne semblent pas utilisées dans le code, alourdissant le bundle JS.

## Dépendances suspectes
- \`recharts\` — non utilisé dans le code audité
- \`react-day-picker\` — non utilisé
- \`input-otp\` — non utilisé
- \`cmdk\` — non utilisé
- \`vaul\` — non utilisé
- \`react-resizable-panels\` — non utilisé
- \`Inter\` (police Google) — déclarée dans \`layout.tsx\` mais non référencée dans \`tailwind.config.ts\`

## Action
\`\`\`bash
# Identifier les imports effectifs
npx depcheck

# Supprimer les packages confirmés inutilisés
npm uninstall recharts react-day-picker input-otp cmdk vaul react-resizable-panels
\`\`\`

> Vérifier avant de supprimer que ces packages ne sont pas utilisés indirectement par shadcn/ui.

## Fichiers
- \`package.json\`
- \`app/layout.tsx\` (police Inter à supprimer si inutilisée)" \
  '["performance","chore","tech-debt"]'

create_issue \
  "[UX] 🟡 Corriger les fautes dans la bio de B-OKIN" \
  "## Problème
La bio de l'artiste B-OKIN dans \`/lib/data.ts\` contient plusieurs erreurs :

- **\"préparés vous\"** → **\"préparez-vous\"**
- **\"unicités\"** → terme inhabituel, à reformuler (ex: \"moments uniques\")
- **\"Drum and Bass\"** → cohérence avec les autres artistes : **\"Drum & Bass\"**

## Texte actuel (extrait)
> \"préparés vous à des moments de nostalgies mais surtout d'unicités\"

## Texte corrigé (suggestion)
> \"préparez-vous à des moments de nostalgie, mais surtout à des instants uniques\"

## Fichier
- \`/lib/data.ts\` — entrée \`B-OKIN\`, champ \`bio\`" \
  '["content","easy"]'

create_issue \
  "[PERF] 🟡 Augmenter minimumCacheTTL des images Next.js" \
  "## Problème
La config \`next.config.mjs\` définit \`minimumCacheTTL: 60\` (60 secondes) pour le cache des images optimisées. Pour un site festival dont les images changent rarement, c'est très court — les images sont re-traitées trop souvent.

## Solution
\`\`\`js
// next.config.mjs
images: {
  formats: ['image/avif', 'image/webp'],
  minimumCacheTTL: 86400, // 24 heures (ou 2592000 pour 30 jours)
  // ...
}
\`\`\`

## Fichier
- \`next.config.mjs\`" \
  '["performance","easy"]'

create_issue \
  "[CHORE] 🟡 Nettoyer le dépôt git (.DS_Store, GEMINI.md)" \
  "## Problème
Deux types de fichiers parasites sont présents dans le dépôt :
1. \`/public/.DS_Store\` — fichier système macOS, ne doit pas être versionné
2. \`GEMINI.md\` à la racine — fichier de config Gemini CLI, personnel au développeur

## Solution
\`\`\`bash
# Supprimer du repo
git rm --cached public/.DS_Store GEMINI.md

# Ajouter au .gitignore
echo '.DS_Store' >> .gitignore
echo 'GEMINI.md' >> .gitignore

git add .gitignore
git commit -m 'chore: remove .DS_Store and GEMINI.md, update .gitignore'
\`\`\`" \
  '["chore","easy"]'

echo ""
echo "🎉 Toutes les issues ont été créées !"
echo "Voir : https://github.com/$REPO/issues"
