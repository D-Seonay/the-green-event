# Homepage Gallery (Floating Forest) Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement an immersive, parallax-driven "Organic Collage" gallery on the homepage with a full-screen lightbox.

**Architecture:** 
- `GallerySection` as the orchestrator using Framer Motion `useScroll`.
- `CollageImage` for individual parallax/tilt/focus logic.
- `Lightbox` using `AnimatePresence` for seamless full-screen transitions.

**Tech Stack:** Next.js 16, Framer Motion, Tailwind CSS, Lucide React.

---

## Chunk 1: Data & Types

### Task 1: Update Schema
**Files:**
- Modify: `types/index.ts`
- Modify: `lib/data.ts`

- [ ] **Step 1: Add GalleryImage interface**
```typescript
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  tilt: number;
  speed: number;
  depth: number;
}
```
- [ ] **Step 2: Add initial GALLERY_IMAGES data**
Use existing artist images and placeholders for now.
- [ ] **Step 3: Commit**
```bash
git add types/index.ts lib/data.ts
git commit -m "data: add gallery schema and initial assets"
```

## Chunk 2: UI Components

### Task 2: CollageImage Component
**Files:**
- Create: `components/ui/CollageImage.tsx`

- [ ] **Step 1: Implement parallax and tilt logic**
Use `useTransform` mapped to section scroll.
- [ ] **Step 2: Add depth of field (blur) effect**
- [ ] **Step 3: Commit**

### Task 3: Lightbox Component
**Files:**
- Create: `components/ui/Lightbox.tsx`

- [ ] **Step 1: Create portal-based lightbox**
- [ ] **Step 2: Add AnimatePresence transitions**
- [ ] **Step 3: Commit**

## Chunk 3: Main Section & Integration

### Task 4: GallerySection Component
**Files:**
- Create: `components/sections/GallerySection.tsx`

- [ ] **Step 1: Build the section container with Montserrat heading**
- [ ] **Step 2: Implement the "Connecting Thread" SVG**
- [ ] **Step 3: Map through images with responsive layout rules**
- [ ] **Step 4: Commit**

### Task 5: Integration
**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Import and place GallerySection between Concept and Programmation**
- [ ] **Step 2: Commit**

## Chunk 4: Final Polish

### Task 6: Verification & Build
- [ ] **Step 1: Run npm run build**
- [ ] **Step 2: Verify responsive behavior (2-column on mobile)**
- [ ] **Step 3: Commit**
