# Design Spec: Static Sponsors Grid

## 1. Overview
Replace the current infinite horizontal marquee animation in the Sponsors section with a static, responsive grid layout. This addresses the request to "stop the rotation/movement" and provides a cleaner, more stable view of the festival's partners.

## 2. Visual Design
- **Layout:** A centered grid of sponsor logos.
- **Background:** Maintain the `bg-forest` background to match the festival's "Deep Forest" aesthetic.
- **Logo Treatment:**
    - Logos should be contained within clear or subtly bordered areas.
    - Circular logos (like Umami) will be respected within the grid cells.
    - Hover effect: Subtle scale-up (`scale-110`) and increased opacity to maintain interactivity without distracting movement.

## 3. Component Updates (`Sponsors.tsx`)
- **Remove `marqueeVariants`:** Delete the Framer Motion animation logic that drives the `x` translation.
- **Remove Duplication:** No longer need `duplicatedSponsors` array.
- **Grid Implementation:** Use Tailwind CSS grid classes:
    - Mobile: `grid-cols-2` (2 logos per row).
    - Tablet: `grid-cols-3`.
    - Desktop: `grid-cols-3` or `grid-cols-6` depending on total count (currently 6).
- **Responsive Spacing:** Use `gap-8` or `gap-12` to ensure logos don't feel crowded.

## 4. Technical Implementation
- **File:** `components/sections/Sponsors.tsx`
- **Logic Change:**
    - Replace `<motion.div variants={marqueeVariants} animate="animate" className="flex">` with a standard `<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center justify-items-center">`.
    - Ensure `Image` components have `object-contain` to handle different logo aspect ratios correctly.

## 5. Success Criteria
- The marquee animation is completely stopped.
- All sponsor logos (especially the circular ones) are visible simultaneously in a centered grid.
- The section feels stable and professional.
