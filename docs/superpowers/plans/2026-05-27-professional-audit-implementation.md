# Global Professional Audit & Mystery Visuals Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the website to professional standards with 100/100 Lighthouse scores and high-fidelity "Coming Soon" visuals.

**Architecture:** Technical sanitation (dependency/lint cleanup), creation of branded "Mystery" components with Framer Motion, and targeted A11y/Perf/SEO audits.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS, Framer Motion.

---

### Task 1: Technical Sanitation

**Files:**
- Modify: `package.json`
- Modify: `.eslintrc.json`

- [ ] **Step 1: Remove unused dependencies**
Remove `react-router-dom` and verify if `@tanstack/react-query` is actually used in the project. If not, remove it.
```bash
npm uninstall react-router-dom @tanstack/react-query
```

- [ ] **Step 2: Fix Linting configuration**
Update the lint script or config to avoid the "Invalid project directory" error. Ensure it points to the root or correct src directories.
Modify `package.json`:
```json
"lint": "next lint"
```
Ensure `.eslintrc.json` is clean.

- [ ] **Step 3: Run and verify lint**
Run: `npm run lint`
Expected: SUCCESS (or specific code errors to fix, but no config errors).

- [ ] **Step 4: Commit**
```bash
git add package.json package-lock.json .eslintrc.json
git commit -m "chore: cleanup dependencies and fix lint config"
```

---

### Task 2: Data Schema & Content Update

**Files:**
- Modify: `types/index.ts`
- Modify: `lib/data.ts`

- [ ] **Step 1: Add isMystery property to types**
Update `Artist` and `Product` interfaces to include `isMystery?: boolean`.

- [ ] **Step 2: Update ARTISTS data**
Add `isMystery: true` to "Bientôt disponible" artists and refine their placeholder content.
```typescript
{
  name: 'Artiste Mystère',
  slug: 'mystery-1',
  image: '/placeholder.svg',
  isMystery: true,
  genre: 'À DÉCOUVRIR',
  // ...
}
```

- [ ] **Step 3: Update PRODUCTS data**
Add `isMystery: true` to "Bientôt disponible" products.

- [ ] **Step 4: Commit**
```bash
git add types/index.ts lib/data.ts
git commit -m "feat: add isMystery flag to artists and products"
```

---

### Task 3: MysteryArtistCard Component

**Files:**
- Create: `components/ui/MysteryArtistCard.tsx`

- [ ] **Step 1: Implement the component with silhouettes and floating elements**
Use Framer Motion for floating cubes/leaves and CSS for the blurred silhouette.
```tsx
'use client';
import { motion } from 'framer-motion';
import Cube from './Cube';
import Leaf from './Leaf';

export default function MysteryArtistCard() {
  return (
    <div className="bg-cream p-4 rounded-2xl shadow-xl rotate-3 h-full">
      <div className="aspect-square bg-forest rounded-xl relative overflow-hidden mb-4">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,166,81,0.4)_0%,transparent_70%)]" />
         <div className="absolute inset-0 opacity-30 filter blur-xl" style={{ maskImage: 'url(...)', maskSize: 'contain' }} />
         <div className="absolute bottom-4 left-0 w-full text-center text-[10px] font-black text-leaf tracking-[0.2em]">IDENTITÉ RÉVÉLÉE BIENTÔT</div>
      </div>
      <h3 className="font-display font-black text-xl text-forest uppercase">Artiste Mystère</h3>
      <p className="text-forest/60 font-bold text-sm uppercase">À VENIR</p>
    </div>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add components/ui/MysteryArtistCard.tsx
git commit -m "feat: implement MysteryArtistCard component"
```

---

### Task 4: ComingSoonProductCard Component

**Files:**
- Create: `components/ui/ComingSoonProductCard.tsx`

- [ ] **Step 1: Implement the shop placeholder component**
Focus on the Cube logo and "Collection 2026" badging.

- [ ] **Step 2: Commit**
```bash
git add components/ui/ComingSoonProductCard.tsx
git commit -m "feat: implement ComingSoonProductCard component"
```

---

### Task 5: Integration in Programmation & Boutique

**Files:**
- Modify: `components/cards/ArtistCard.tsx`
- Modify: `app/boutique/page.tsx`

- [ ] **Step 1: Update ArtistCard to handle mystery state**
If `artist.isMystery` is true, render `MysteryArtistCard`.

- [ ] **Step 2: Update Boutique page to handle mystery state**
Use `ComingSoonProductCard` for items marked as mystery.

- [ ] **Step 3: Commit**
```bash
git add components/cards/ArtistCard.tsx app/boutique/page.tsx
git commit -m "feat: integrate mystery cards into the site"
```

---

### Task 6: Accessibility (ARIA & Semantic)

**Files:**
- Modify: `components/layout/Navbar.tsx`
- Modify: `components/layout/Footer.tsx`
- Modify: `components/sections/NewsletterSection.tsx`

- [ ] **Step 1: Add aria-labels to social and nav icons**
Ensure `X`, `Menu`, `Instagram`, `Facebook` buttons have `aria-label`.

- [ ] **Step 2: Fix focus states**
Ensure all interactive elements have visible `:focus-visible` styles using Tailwind `focus-visible:ring-2`.

- [ ] **Step 3: Commit**
```bash
git add components/layout/Navbar.tsx components/layout/Footer.tsx components/sections/NewsletterSection.tsx
git commit -m "accessibility: add aria-labels and improve focus states"
```

---

### Task 7: Performance (Images & Fonts)

**Files:**
- Modify: `components/sections/Hero.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add priority to Hero images**
Locate the main logo/hero images and add the `priority` prop.

- [ ] **Step 2: Optimize font display**
Ensure `font-display: swap` is used in Google Font configurations (already likely there but verify).

- [ ] **Step 3: Commit**
```bash
git add components/sections/Hero.tsx app/layout.tsx
git commit -m "performance: optimize hero images and font loading"
```

---

### Task 8: SEO & Content Completion

**Files:**
- Modify: `app/mentions-legales/page.tsx`
- Modify: `app/cgv/page.tsx`
- Modify: `lib/data.ts` (alt texts)

- [ ] **Step 1: Add missing metadata to legal pages**
Ensure each page has a proper `Metadata` export.

- [ ] **Step 2: Add descriptive alt texts**
Update `ARTISTS`, `GALLERY_IMAGES`, and `SPONSORS` in `lib/data.ts` with meaningful `alt` strings.

- [ ] **Step 3: Commit**
```bash
git add app/mentions-legales/page.tsx app/cgv/page.tsx lib/data.ts
git commit -m "seo: complete metadata and descriptive alt texts"
```

---

### Task 9: Final Validation

- [ ] **Step 1: Final Build check**
Run: `npm run build`
Expected: SUCCESS.

- [ ] **Step 2: Final Lint check**
Run: `npm run lint`
Expected: SUCCESS.

- [ ] **Step 3: Commit**
```bash
git commit --allow-empty -m "build: final professional audit verification pass"
```
