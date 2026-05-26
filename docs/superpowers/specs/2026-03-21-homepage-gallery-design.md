# Design Spec: Homepage Gallery - Floating Forest

## 1. Overview
Add an immersive, high-impact gallery section to the homepage of "The Green Event". The design follows the "Jazz à Vienne" collage aesthetic, integrated with the "Stealth / Dark Mode Absolute" project style.

## 2. Architecture & Components

### 2.1 `GallerySection.tsx`
- **Location**: `components/sections/GallerySection.tsx`
- **Responsibility**: Main container. Tracks scroll progress for the entire section to drive parallax effects.
- **Visuals**: Full-bleed background (`bg-forest`), section heading with Montserrat Black, and a subtle "connecting thread" SVG path.

### 2.2 `CollageImage.tsx`
- **Location**: `components/ui/CollageImage.tsx`
- **Props**: `src`, `alt`, `tilt`, `speed`, `depth` (z-index/scale multiplier).
- **Animations**: 
  - **Parallax**: `y` translation linked to scroll progress.
  - **Depth of Field**: Subtle `blur` (optional CSS filter) that decreases as the image enters the center of the viewport.
  - **Hover**: Scale up (`1.05`) and drop shadow increase.

### 2.3 `Lightbox.tsx`
- **Location**: `components/ui/Lightbox.tsx`
- **Functionality**: Full-screen modal using `AnimatePresence` and `Portal`.
- **Interaction**: Close on backdrop click or Escape key. Navigation between images.

## 3. Data Schema
Update `lib/data.ts` to include:
```typescript
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  tilt: number;   // rotation in degrees
  speed: number;  // parallax multiplier (0.1 - 0.5)
  depth: number;  // z-index and scale base (1 - 3)
}
```

## 4. Visual & Responsive Rules
- **Tilted Cards**: Every image must have a slight rotation (+/- 3deg to 6deg).
- **Overlapping**: Images should overlap slightly to create depth.
- **Responsive Strategy**: 
  - **Mobile**: The "collage" simplifies into a dynamic 2-column grid with reduced parallax and no overlapping to maintain readability.
  - **Desktop**: Full floating collage with overlapping and varied speeds.
- **The "Thread"**: A decorative SVG path (`stroke-dasharray`) that moves with scroll progress, visually connecting at least 3 major images in the section.

## 5. Performance & A11y
- **Images**: Use `next/image` with appropriate `sizes` and `priority` for above-the-fold content (if applicable).
- **A11y**: 
  - `aria-label` for the lightbox and close button.
  - Images marked as decorative if they lack semantic meaning, or given descriptive `alt` text.
  - Support `useReducedMotion` to disable parallax.

## 6. Implementation Plan
1. Create a new branch `feat/homepage-gallery`.
2. Add `GALLERY_IMAGES` data structure and initial set.
3. Scaffold `GallerySection` and add it to `app/page.tsx`.
4. Implement `CollageImage` with parallax logic.
5. Build and integrate `Lightbox` for immersive viewing.
6. Verify responsive behavior and performance.
