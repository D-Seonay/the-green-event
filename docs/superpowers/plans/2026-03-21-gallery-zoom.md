# Gallery Zoom Button Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Zoom" action button to every gallery image to improve discoverability of the Lightbox view.

**Architecture:** 
- Integrated directly into `CollageImage.tsx`.
- Uses Framer Motion for smooth reveal on hover/focus.
- Consistent with "Stealth / Dark Mode Absolute" design system.

**Tech Stack:** Next.js 16, Framer Motion, Tailwind CSS, Lucide React.

---

## Chunk 1: Implementation

### Task 1: Update CollageImage Component
**Files:**
- Modify: `components/ui/CollageImage.tsx`

- [ ] **Step 1: Import Maximize2 from lucide-react**
- [ ] **Step 2: Add the zoom button to the JSX**
Position it in the bottom-right of the image card.
```tsx
<motion.button
  initial={{ opacity: 0, scale: 0.8 }}
  whileHover={{ scale: 1.1 }}
  className="absolute bottom-4 right-4 z-[60] p-3 rounded-full bg-forest/80 backdrop-blur-md border border-cream/20 text-cream group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300"
  onClick={(e) => { e.stopPropagation(); onClick(image); }}
  aria-label="Zoom image"
>
  <Maximize2 size={20} />
</motion.button>
```
- [ ] **Step 3: Ensure 'group' class is on the main wrapper**
- [ ] **Step 4: Commit**
```bash
git add components/ui/CollageImage.tsx
git commit -m "feat: add zoom button to gallery images"
```

## Chunk 2: Verification

### Task 2: Build & Test
- [ ] **Step 1: Run npm run build**
- [ ] **Step 2: Verify responsive behavior (visible on mobile)**
- [ ] **Step 3: Commit**
