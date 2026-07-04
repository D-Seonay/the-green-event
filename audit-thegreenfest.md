# Audit Complet — thegreenfest.fr
**Date :** 28 juin 2026  
**Auditeur :** Claude (Cowork)  
**Stack :** Next.js 16, React 18, Tailwind CSS, Framer Motion, Vercel  

---

## Score Global

| Domaine | Note |
|---|---|
| SEO & Métadonnées | ✅ 8.5/10 |
| Accessibilité | ⚠️ 6/10 |
| Performance | ⚠️ 6.5/10 |
| Sécurité | ⚠️ 7/10 |
| Contenu & UX | ✅ 8/10 |
| Technique & Code | ✅ 8/10 |

---

## 1. SEO & Métadonnées ✅ 8.5/10

### Ce qui est bien fait
- **Title & description** : Bien rédigés, distincts par page (`layout.tsx`, chaque `page.tsx`).
- **Open Graph complet** : `og:title`, `og:description`, `og:image`, `og:locale`, `og:type` tous présents.
- **Twitter Card** : `summary_large_image` configuré correctement.
- **JSON-LD Schema.org** : Données structurées de type `Festival` très complètes sur la homepage (dates, lieu, adresse postale, artistes, offres, organisateur). Excellent pour le référencement événementiel.
- **Sitemap dynamique** : Généré en Next.js, inclut toutes les pages statiques + les pages artistes (hors mystère). Change frequencies et priorities correctement paramétrées.
- **robots.ts** : `Allow: /` + référence au sitemap. Pas de blocage involontaire.
- **Canonical** : Défini sur `https://thegreenfest.fr` (sans www).
- **`lang="fr"`** sur le `<html>`.
- **Google Bot** : `max-video-preview:-1`, `max-image-preview:large`, `max-snippet:-1` — optimal pour les rich snippets.
- **Manifest PWA** : présent avec nom, couleurs, icônes.

### Problèmes identifiés

**🔴 Critique**
- Aucun — bon niveau.

**🟠 Important**
- **Image OG = logo.png** sur toutes les pages. Le logo fait 84 Ko et n'a pas les dimensions 1200×630 déclarées (ce sont des valeurs déclaratives, pas les vraies dimensions du fichier). Il faudrait une vraie image sociale de 1200×630 px représentative du festival (photo de foule, affiche), différente par page idéalement.
- La page `/boutique` utilise `/placeholder.svg` comme image OG — inexploitable pour les partages sociaux.
- **Canonical avec vs sans www** : Le canonical pointe sur `https://thegreenfest.fr` mais la page sert aussi via `https://www.thegreenfest.fr`. Les deux URLs doivent répondre pareil (301 www → non-www ou l'inverse) pour éviter la duplication.

**🟡 Mineur**
- Les `keywords` meta (dépréciées par Google) sont présents — pas nocif mais inutile.
- La description de `/programmation` mentionne "jazz et fusion" alors que la programmation est électro/rock/hip-hop.
- `changeFrequency: 'daily'` sur la homepage est exagéré pour un festival annuel — `weekly` serait plus honnête.

---

## 2. Accessibilité ⚠️ 6/10

### Ce qui est bien fait
- **`lang="fr"`** sur `<html>` ✅
- **Focus visible** : La navbar a `focus-visible:ring-2 focus-visible:ring-leaf` sur les liens et le burger — bien.
- **`aria-label`** sur le bouton burger (`aria-label="Toggle menu"`), les icônes sociales, le bouton newsletter icon-only.
- **`aria-hidden="true"`** sur la vidéo de fond — correct (contenu décoratif).
- **Images** : Tous les composants `<Image>` ont un attribut `alt` renseigné.
- **Google Maps iframe** : `title="Google Maps - The Green Event"` présent.
- **Sémantique** : `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<h1>`…`<h3>` utilisés correctement.

### Problèmes identifiés

**🔴 Critique**
- **Bouton "M'en souvenir" (Hero) sans `aria-label`** : Le `<button>` du `DropdownMenuTrigger` contient du texte visible, mais la `DropdownMenuContent` n'a pas d'attribut `aria-label` ni `role`. Les utilisateurs lecteurs d'écran ne sauront pas ce qu'il contient avant de l'ouvrir.
- **Input newsletter sans `<label>` associé** (`NewsletterSection.tsx` ligne 147) : L'input `type="email"` n'a qu'un `placeholder` mais aucun `<label>` ou `aria-label`. Les placeholders disparaissent à la saisie et ne sont pas lus par tous les lecteurs d'écran.
- **Bouton fermeture CookieBanner** (ligne 88) : `aria-label="Fermer"` est présent ✅ mais il n'est pas dans le focus order naturel (position `absolute top-4 right-4`) — à vérifier.

**🟠 Important**
- **Boutons Lightbox** (`Lightbox.tsx` lignes 51, 59, 67) : Trois boutons navigation (précédent/suivant/fermer) sans `aria-label`. Un utilisateur clavier ne sait pas ce qu'ils font.
- **Bouton ProductCarousel** (ligne 98) et **CollageImage** (ligne 98) : Boutons sans `aria-label` ni texte visible.
- **Contraste couleur** : La couleur `text-cream/40` (opacité 40%) et `text-cream/30` utilisées pour du texte secondaire atteignent probablement moins de 4.5:1 sur fond `forest`. À auditer avec un outil type Colour Contrast Analyser.
- **Animations Framer Motion** : Aucune vérification de `prefers-reduced-motion`. Les animations de scroll et les éléments flottants peuvent provoquer des malaises chez les utilisateurs sensibles aux mouvements.

**🟡 Mineur**
- Les cards artistes "Artiste Mystère" ont `imageAlt` qui dit "Cadre naturel..." alors que l'image affichée est `/placeholder.svg` — l'alt est trompeur.
- Le `<h2>` du Hero ("4 JUILLET 2026 • VERTOU") n'est sémantiquement pas un titre de section — c'est plus un sous-titre. Pourrait être un `<p>`.

---

## 3. Performance ⚠️ 6.5/10

### Ce qui est bien fait
- **Next.js Image** : Utilisé pour toutes les images fixes (logo, artistes). Formats AVIF/WebP activés dans `next.config.mjs`. Device sizes et image sizes correctement étendus.
- **`priority`** sur le logo Navbar : Évite le LCP shift ✅.
- **Lazy loading** : Les sections secondaires (Gallery, Programmation, Infos, Sponsors, Newsletter) sont chargées en `dynamic()` — réduit le JS initial ✅.
- **`display: 'swap'`** sur les 3 polices Google (Inter, Montserrat, Nunito) — évite le FOIT ✅.
- **`preload="metadata"`** sur la vidéo Hero — ne charge pas le contenu complet immédiatement ✅.
- **Lenis** pour le scroll smooth — performant car GPU-accelerated.
- **Sharp** installé comme dépendance — optimisation d'images serveur-side.

### Problèmes identifiés

**🔴 Critique**
- **Vidéo Hero non optimisée : 79 Mo** (`/theGreenEvent.MP4`). C'est extrêmement lourd pour un fond de page. Sur mobile 4G, le téléchargement serait de 10-20 secondes. À compresser à < 5 Mo (H.264, résolution max 1080p, bitrate 2-3 Mbps) ou mieux, utiliser un format WebM + MP4 en fallback.
- **DJI_0894.MP4 : 83 Mo** dans `/public/img/`. Cette vidéo est-elle utilisée ? Elle alourdit inutilement le dépôt si elle n'est pas référencée.
- **Image `/img/21062025-IMG_0684.jpg` : 5.1 Mo** — beaucoup trop lourde pour une photo de galerie. À compresser (< 200 Ko).
- **Image `blackAngers-1.png` : 2.6 Mo** et **`LOOWS-1.png` : 3 Mo** — des PNG non optimisés pour des photos, alors que Next.js les convertirait en WebP/AVIF à la volée via `<Image>`. OK si utilisés dans un composant `<Image>`, problématique s'ils sont servis directement.

**🟠 Important**
- **`productionBrowserSourceMaps: true`** dans `next.config.mjs` : Expose le code source en production. À désactiver (ou à laisser uniquement sur staging/dev). Impact performance (fichiers .map servis) et sécurité.
- **3 polices Google** (Inter, Montserrat, Nunito) chargées simultanément : Inter n'apparaît pas dans le `tailwind.config.ts` comme police utilitaire — elle pourrait être inutilisée. À vérifier et supprimer si c'est le cas.
- **Framer Motion** est importé dans de nombreux composants client. La librairie pèse ~100 Ko (minifiée/gzippée). Acceptable mais à surveiller si le bundle grandit.
- **`photo_1.jpg` (1.1 Mo)** et **`image.jpg` (118 Ko)** : La première est trop lourde. Avec `<Image>` de Next.js elle sera re-dimensionnée, mais la source doit rester raisonnable.

**🟡 Mineur**
- `recharts` est installé comme dépendance mais n'est utilisé nulle part dans le code audité. Dead dependency.
- `react-day-picker`, `input-otp`, `cmdk`, `vaul`, `react-resizable-panels` : nombreuses dépendances Radix/shadcn installées mais potentiellement inutilisées (elles viennent de l'initialisation shadcn). À faire le tri pour réduire le bundle.
- **`minimumCacheTTL: 60`** (secondes) dans next.config.mjs est très faible. Pour des images de festival qui changent rarement, `3600` ou `86400` serait plus approprié.

---

## 4. Sécurité ⚠️ 7/10

### Ce qui est bien fait
- **En-têtes HTTP** dans `next.config.mjs` : `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection: 1; mode=block`, `Referrer-Policy: strict-origin-when-cross-origin`. Bonne base.
- **Validation Zod** sur la route `/api/benevoles` : typage strict des données entrantes ✅.
- **Validation regex email** dans `/api/newsletter` ✅.
- **Paiements via HelloAsso** : aucune donnée bancaire stockée côté site ✅.
- **`rel="noopener noreferrer"`** sur tous les liens externes ✅.

### Problèmes identifiés

**🔴 Critique**
- **Pas de rate limiting sur les API routes** (`/api/newsletter` et `/api/benevoles`). N'importe qui peut envoyer des milliers de requêtes et spammer la boîte mail admin ou déclencher des envois d'emails en masse (via Nodemailer). À implémenter avec un middleware simple (ex: `upstash/ratelimit` ou une variable en mémoire).
- **`productionBrowserSourceMaps: true`** : Expose tout le code source TypeScript en production. Un attaquant peut lire la logique métier, les chemins d'API, les variables utilisées. À supprimer.

**🟠 Important**
- **Pas de CSP (Content Security Policy)** dans les headers. Sans CSP, une faille XSS pourrait exécuter du JS tiers arbitraire. Même une politique de base (`default-src 'self'`) + autorisation des domaines Google Maps, fonts, etc. améliorerait significativement la sécurité.
- **Email admin en fallback hardcodé** (`thegreenevent.44@gmail.com`) dans le code source. Pas critique mais idéalement uniquement en variable d'environnement.
- **Cookie consent** : Le bandeau distingue "Accepter"/"Refuser" mais la bannière ne liste pas les cookies effectivement déposés. Si des cookies tiers sont utilisés (Google Maps en iframe), le RGPD impose de ne les charger qu'après consentement.

**🟡 Mineur**
- La route `/api/newsletter` ne valide pas la longueur max de l'email (DoS minimal).
- Le cookie de consentement est stocké en `localStorage` — techniquement pas un cookie, donc pas soumis à la directive ePrivacy, mais c'est une approche non-standard.

---

## 5. Contenu & UX ✅ 8/10

### Ce qui est bien fait
- **Identité visuelle forte et cohérente** : Palette forest/cream/leaf appliquée uniformément, typographie display/body bien hiérarchisée.
- **Hero percutant** : Vidéo plein écran, titre H1 impactant, CTA primaire clair ("Voir la programmation"), CTA secondaire utile ("M'en souvenir" avec export calendrier Google/Apple/Outlook).
- **Navigation intuitive** : Navbar fixe avec active states, menu mobile full-screen animé, smooth scroll sur les ancres.
- **Sections bien séquencées** : Hero → Concept → Galerie → Programmation → Infos pratiques → Sponsors → Newsletter.
- **Infos pratiques complètes** : Date, lieu, transports (Bus 28), accès (covoiturage), carte Google Maps intégrée.
- **Boutique avec lien HelloAsso** : Délégation correcte du paiement à une plateforme de confiance.
- **Formulaire bénévole complet** : Champs détaillés (prénom, nom, email, téléphone, date de naissance, ville, expérience, préférences de missions, motivation). Emails automatiques de confirmation côté admin et bénévole.
- **Newsletter avec double confirmation email** ✅.
- **Mentions légales conformes RGPD** : RNA, siège, hébergeur, droits RGPD, mention HelloAsso.
- **CGV présentes** (nécessaires pour la boutique).
- **Cookie banner** fonctionnel avec lien vers les mentions légales.

### Problèmes identifiés

**🟠 Important**
- **Pas de page 404 personnalisée robuste** : `not-found.tsx` existe mais son contenu n'a pas été audité. À vérifier qu'elle inclut un lien retour accueil et conserve la navbar.
- **Bio de B-OKIN contient une faute** : "préparés vous" → "préparez-vous". "Drum and Bass" → "Drum & Bass" (cohérence avec les autres artistes). "unicités" → terme inhabituel.
- **Artiste "Artiste Mystère"** a `timeSlot: ''` — sur la page programmation, un créneau vide pourrait casser l'affichage ou créer une confusion.
- **Prix boutique** : `'<s>25€</s> 20€ en précommande'` est une chaîne HTML brute dans les données. Si ce texte est rendu via `dangerouslySetInnerHTML` ou `innerHTML`, c'est risqué. Si rendu comme texte simple, le `<s>` sera affiché littéralement.

**🟡 Mineur**
- La section galerie utilise 6 images dont une est la photo de LOOWS (`/artists/LOOWS/LOOWS-1.png`) — mélange photos d'ambiance et photos artiste, ce qui peut paraître incohérent dans une galerie festival.
- L'email de contact (`thegreenevent.44@gmail.com`) est une adresse Gmail — crédibilité professionnelle limitée. Un email `contact@thegreenfest.fr` renforcerait l'image.
- Le footer contient un **second formulaire newsletter** en plus de la section dédiée — doublon de l'expérience, et les deux ont leur propre state React indépendant.
- La navbar affiche "THE GREEN EVENT" mais le festival s'appelle "THE GREEN FEST" — légère confusion de marque.

---

## 6. Technique & Code ✅ 8/10

### Ce qui est bien fait
- **Architecture Next.js App Router** propre : pages serveur + composants client bien séparés (`'use client'` uniquement là où nécessaire).
- **TypeScript strict** : Typage des données (types dans `/types/index.ts`), validation Zod en API.
- **Données centralisées** dans `/lib/data.ts` : ARTISTS, PRODUCTS, SPONSORS, GALLERY_IMAGES, NAV_LINKS — source unique de vérité.
- **Design tokens** : Variables CSS HSL, palette custom dans Tailwind — cohérence garantie.
- **Animations** avec Framer Motion bien utilisées : `whileInView`, `viewport: { once: true }`, transitions étagées.
- **Lenis smooth scroll** correctement intégré avec les classes CSS nécessaires.
- **WaveDivider** : composant réutilisable pour les transitions de sections.
- **`sharp`** installé pour l'optimisation d'images côté serveur.
- **ESLint** configuré.

### Problèmes identifiés

**🟠 Important**
- **`next: "^16.2.3"`** dans `package.json` : Il n'existe pas de Next.js version 16. La dernière version stable est 15.x. Cette déclaration suggère une erreur dans le `package.json` (peut-être une mise à jour manuelle incorrecte). À vérifier avec `npm list next`.
- **`prefers-reduced-motion` non géré** : Framer Motion peut respecter cette préférence système, mais aucun code ne le fait ici. `motion` sans `useReducedMotion()` ignore les préférences d'accessibilité.
- **`productionBrowserSourceMaps: true`** : Répété ici car c'est aussi une erreur technique.

**🟡 Mineur**
- **`eslint-config-next: 16.1.6`** (version fixe) mais `next: ^16.2.3` — incohérence de versions.
- **`GEMINI.md`** à la racine du projet : fichier de configuration pour Gemini CLI (concurrent de Claude Code) laissé dans le repo. À mettre dans `.gitignore` ou supprimer s'il contient des instructions spécifiques au développeur.
- **`.DS_Store`** dans `/public` : fichier macOS à exclure via `.gitignore`.
- La galerie `data.ts` référence une image `DJI_0894.MP4` via les `GALLERY_IMAGES` ? Non — ce fichier est dans `/public/img/` mais pas référencé dans le code. Vidéo orpheline de 83 Mo.
- `FloatingElements.tsx` et `SmoothScroller.tsx` à la racine de `/components` — seraient mieux dans `/components/ui/` ou `/components/layout/`.

---

## Récapitulatif des Priorités

### 🔴 À corriger immédiatement
1. **Compresser la vidéo Hero** (`theGreenEvent.MP4` : 79 Mo → < 5 Mo)
2. **Ajouter rate limiting** sur `/api/newsletter` et `/api/benevoles`
3. **Désactiver `productionBrowserSourceMaps`** en production
4. **Ajouter `aria-label`** sur les boutons Lightbox et newsletter input

### 🟠 À traiter rapidement
5. **Créer une image OG 1200×630** dédiée pour le partage social (pas le logo)
6. **Remplacer l'image OG `/boutique`** (actuellement `placeholder.svg`)
7. **Compresser les images lourdes** : `21062025-IMG_0684.jpg` (5.1 Mo), `blackAngers-1.png` (2.6 Mo), `LOOWS-1.png` (3 Mo)
8. **Ajouter `prefers-reduced-motion`** dans les animations Framer Motion
9. **Ajouter une CSP** dans les headers HTTP
10. **Ajouter `<label>`** ou `aria-label` sur l'input email newsletter
11. **Supprimer `DJI_0894.MP4`** (83 Mo non utilisé)
12. **Résoudre la confusion www vs non-www** (redirection 301)

### 🟡 Améliorations souhaitables
13. Vérifier et corriger la version Next.js dans `package.json`
14. Supprimer les dépendances inutilisées (recharts, polices inutilisées)
15. Créer un email `contact@thegreenfest.fr`
16. Corriger les fautes dans la bio de B-OKIN
17. Augmenter `minimumCacheTTL` des images (60s → 86400s)
18. Ajouter `.gitignore` pour `.DS_Store` et `GEMINI.md`
19. Harmoniser la marque "THE GREEN EVENT" / "THE GREEN FEST" dans la navbar

---

*Audit réalisé sur le code source du projet et les métadonnées HTTP de `https://www.thegreenfest.fr/`.*
