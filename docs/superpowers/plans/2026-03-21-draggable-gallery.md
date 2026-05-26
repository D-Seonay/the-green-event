# Draggable Gallery Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add free-form drag interactions to the homepage gallery images while maintaining parallax scroll effects.

**Architecture:** 
- Use nested `motion.div` elements in `CollageImage` to separate parallax transforms from drag transforms.
- Parent `GallerySection` provides the boundary constraints via `useRef`.

**Tech Stack:** Next.js 16, Framer Motion, Tailwind CSS.

---

## Chunk 1: Component Refactoring

### Task 1: Update CollageImage Logic
**Files:**
- Modify: `components/ui/CollageImage.tsx`

- [ ] **Step 1: Add drag prop and constraints**
- [ ] **Step 2: Nest transforms**
Wrap the current `motion.div` (parallax) around a new `motion.div` (drag) to prevent jumpy behavior.
- [ ] **Step 3: Add z-index boost during drag**
- [ ] **Step 4: Commit**
```bash
git add components/ui/CollageImage.tsx
git commit -m "feat: enable drag on gallery images"
```

### Task 2: Update GallerySection Constraints
**Files:**
- Modify: `components/sections/GallerySection.tsx`

- [ ] **Step 1: Pass section ref to children**
- [ ] **Step 2: Commit**
```bash
git add components/sections/GallerySection.tsx
git commit -m "feat: pass drag constraints to gallery images"
```

## Chunk 2: Final Polish

### Task 3: Interaction Tuning
**Files:**
- Modify: `components/ui/CollageImage.tsx`

- [ ] **Step 1: Refine visual feedback (glow, scale)**
- [ ] **Step 2: Ensure drag-to-click transition works for Lightbox**
- [ ] **Step 3: Commit**

### Task 4: Verification
- [ ] **Step 1: Run npm run build**
- [ ] **Step 2: Commit**
