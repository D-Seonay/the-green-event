# SEO & Performance Optimization Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Optimize "The Green Event" website for search engine visibility, accessibility, and performance.

**Architecture:** A multi-layered approach involving technical SEO (metadata, JSON-LD), performance (image/video optimization, lazy loading), and accessibility (ARIA, semantic HTML) refinements.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS, Framer Motion, Lucide React, Sharp.

---

## Chunk 1: Data Structures & Metadata

### Task 1: Update Data Types
**Files:**
- Modify: `types/index.ts`
- Modify: `lib/data.ts`

- [ ] **Step 1: Add SEO fields to Artist and Product types**
```typescript
// types/index.ts
export interface Artist {
  // ... existing
  keywords?: string[];
  seoDescription?: string;
}
// Do the same for Product if it exists
```
- [ ] **Step 2: Update ARTISTS data with SEO fields**
```typescript
// lib/data.ts
export const ARTISTS: Artist[] = [
  {
    // ...
    keywords: ["Techno", "Melodic", "Vertou"],
    seoDescription: "Description optimized for SEO"
  },
  // ...
];
```
- [ ] **Step 3: Commit**
```bash
git add types/index.ts lib/data.ts
git commit -m "data: add SEO fields to artists"
```

### Task 2: Global Metadata & Indexing
**Files:**
- Modify: `app/layout.tsx`
- Create: `public/manifest.json`
- Modify: `public/robots.txt`

- [ ] **Step 1: Enhance layout metadata**
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  // ... existing
  keywords: ["Festival", "Électro", "Vertou", "Musique", "Nature", "Éco-responsable", "Nantes", "Parc de la Sèvre", "The Green Event"],
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.png', // Ideally apple-touch-icon.png
  },
  manifest: '/manifest.json',
};
```
- [ ] **Step 2: Create manifest.json**
- [ ] **Step 3: Update robots.txt with sitemap**
- [ ] **Step 4: Commit**
```bash
git add app/layout.tsx public/manifest.json public/robots.txt
git commit -m "seo: update global metadata and indexing"
```

## Chunk 2: Structured Data (JSON-LD)

### Task 3: Home Page Schema
**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Enhance Festival JSON-LD**
```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Festival',
  // ... add performers and offers
};
```
- [ ] **Step 2: Commit**

### Task 4: Artist Page Schema
**Files:**
- Modify: `app/programmation/[slug]/page.tsx`

- [ ] **Step 1: Add MusicGroup/Person JSON-LD to Server Component**
- [ ] **Step 2: Commit**

## Chunk 3: Performance (Images & Video)

### Task 5: Sharp & Image Optimization
**Files:**
- Modify: `package.json`
- Modify: `components/sections/Hero.tsx`
- Modify: `app/programmation/[slug]/ArtistDetailClient.tsx`

- [ ] **Step 1: Install sharp**
Run: `npm install sharp`
- [ ] **Step 2: Add video poster to Hero**
- [ ] **Step 3: Add priority to LCP images**
- [ ] **Step 4: Commit**

### Task 6: Lazy Loading
**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Use next/dynamic for Sponsors and Newsletter**
- [ ] **Step 2: Commit**

## Chunk 4: Accessibility & Semantic HTML

### Task 7: ARIA Sweep & Semantic Fixes
**Files:**
- Modify: `components/ui/WaveDivider.tsx`
- Modify: `components/ui/Cube.tsx`
- Modify: `components/ui/Leaf.tsx`
- Modify: `components/layout/Footer.tsx`

- [ ] **Step 1: Add aria-hidden="true" to decorative SVGs**
- [ ] **Step 2: Add aria-label to social links**
- [ ] **Step 3: Audit heading levels**
- [ ] **Step 4: Commit**
