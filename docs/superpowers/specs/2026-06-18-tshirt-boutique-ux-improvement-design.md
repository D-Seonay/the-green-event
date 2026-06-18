# Spécification Design : Amélioration UX Boutique T-shirt

## 1. Vision et Objectifs
L'objectif est d'améliorer l'expérience utilisateur de la page produit t-shirt suite à l'ajout de 9 nouvelles images haute qualité. On souhaite passer d'un affichage basique à une présentation "Premium" qui met en valeur la qualité du coton biologique et les détails du produit, tout en restant fidèle à l'identité visuelle du festival (organique, arrondie, nature).

## 2. Architecture du Composant `ProductCarousel`
Le composant remplacera le carousel actuel dans `app/boutique/[id]/page.tsx`.

### Structure visuelle
- **Main Display :** Image principale dans un conteneur avec un arrondi prononcé (`rounded-[4rem]`).
- **Thumbnail Strip :** Une rangée horizontale de miniatures cliquables sous l'image principale.
- **Eco-Badge :** Un badge "100% BIO" flottant sur l'image pour renforcer le message écologique.

### Interactions
- **Navigation :**
    - Clic sur une miniature pour changer l'image principale.
    - Support du "Swipe" sur mobile.
    - Synchronisation entre les miniatures et l'affichage principal (via Embla Carousel).
- **Zoom HD :**
    - Sur Desktop : Effet de zoom fluide au survol (`scale: 1.5` ou plus) qui suit la souris.
    - Sur Mobile : Possibilité d'ouvrir l'image en plein écran via une lightbox.

## 3. Optimisation des Assets
Les images actuelles (`WhatsApp Image...`) seront renommées pour le SEO et la maintenabilité :
- `t-shirt-1.jpeg` -> `t-shirt-face.jpeg`
- `WhatsApp Image... (1).jpeg` -> `t-shirt-detail-zoom.jpeg`
- etc.

## 4. Stack Technique
- **Carousel :** `embla-carousel-react` (utilisé par shadcn/ui).
- **Animation :** `framer-motion` pour les transitions d'opacité et les effets de survol.
- **Image :** `next/image` avec `mix-blend-multiply` pour une intégration parfaite sur fond crème.

## 5. Critères de Succès
- Navigation fluide entre les 9 images sans ralentissement.
- Rendu impeccable sur mobile (pas de débordement horizontal, touch targets > 44px).
- Amélioration perçue de la "qualité" du produit grâce aux détails visibles via le zoom.
