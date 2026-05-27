# Design Spec: Global Professional Audit & Mystery Visuals

## 1. Problem Statement
The current website is in a high-quality state but lacks the final "professional" polish required for a commercial-grade festival site. Key issues include:
- Unused dependencies (`react-router-dom`) affecting bundle size.
- Linting configuration errors.
- Generic placeholders for unrevealed content (Artists/Shop).
- Accessibility and performance gaps preventing a perfect 100/100 Lighthouse score.

## 2. Proposed Solution

### A. Technical Sanitation
- **Dependency Cleanup**: Remove `react-router-dom`. Verify `react-query` usage; remove if unused.
- **Lint Fix**: Correct the project directory configuration in `package.json` or `.eslintrc.json` to allow `next lint` to run.
- **Next.js 16 Support**: Ensure all core components and animations are compatible with the Next.js 16 beta/canary features.

### B. "Mystery" Visual Identity
Create dedicated components to replace generic placeholders:
- **`MysteryArtistCard.tsx`**: 
    - Radial gradient background (`forest` to `leaf`).
    - Blurred silhouette using CSS masks.
    - Floating animated cubes and leaves using `framer-motion`.
- **`ComingSoonProductCard.tsx`**:
    - Focus on the "Cube" logo element.
    - "Collection 2026" badging.
    - Premium hover states (scale + subtle glow).

### C. Lighthouse 100/100 Strategy
- **Accessibility**:
    - Explicit `aria-label` for all icon-only buttons (Socials, Mobile Menu).
    - Keyboard navigation audit (ensure all interactive elements have visible focus states).
    - Semantic HTML check (H1 -> H2 -> H3 hierarchy).
- **Performance**:
    - `next/image` optimization: Add `priority` to Hero images.
    - Precise `sizes` attributes to prevent layout shifts and over-downloading.
    - Font loading optimization (`font-display: swap`).
- **SEO**:
    - Complete Meta tags for all pages (CGV, Mentions Légales).
    - Descriptive `alt` tags for all images in `lib/data.ts`.

## 3. Data Integration
Update `lib/data.ts` to include:
- `isMystery: boolean` for Artists and Products.
- Refined descriptions for "Coming Soon" items.

## 4. Testing & Validation
- **Lint**: `npm run lint` must pass.
- **Build**: `npm run build` must succeed.
- **Performance**: Manual Lighthouse audit target (100/100/100/100 on Desktop).
- **Responsive**: Verify "Mystery" animations on mobile (reduced motion if necessary).
