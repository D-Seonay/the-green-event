# Design Spec: SEO & Performance Optimization for The Green Event

## 1. Overview
The goal of this task is to optimize "The Green Event" website for search engine visibility, accessibility, and performance. We aim for high Core Web Vitals (CWV) and a perfect lighthouse score across the board.

## 2. Technical SEO & Metadata

### 2.1 Dynamic Metadata
- **Global Metadata (`app/layout.tsx`)**:
  - Add exhaustive `keywords`.
  - Add `icons` configuration (favicon, apple-touch-icon).
  - Add `manifest: '/manifest.json'`.
  - Add `openGraph.images` for the home page (dedicated asset if possible, or refined logo).
- **Dynamic Pages (`app/programmation/[slug]/page.tsx`, `app/boutique/[id]/page.tsx`)**:
  - Implement dynamic `canonical` URL generation.
  - Refine `generateMetadata` with more specific descriptions.
  - Add keywords for each artist/product.

### 2.2 Indexing & Discovery
- **`public/robots.txt`**: Add `Sitemap: https://thegreenevent.fr/sitemap.xml`.
- **`public/manifest.json`**: Create a basic web manifest for PWA capabilities and better SEO representation.

### 2.3 Structured Data (JSON-LD)
- **Home Page**: Enhance the `Festival` schema with `offers` (link to boutique/tickets), `performers` (list of artists), and `subEvent` if multi-day.
- **Artist & Boutique Pages**: Place the JSON-LD script directly in the Server Components (`page.tsx`) instead of the Client Components to ensure it is in the initial HTML and reduces client-side JS payload.
- **Data Structures**: Update `types/index.ts` and `lib/data.ts` to include `keywords` and `seoDescription` fields for all artists and products.

## 3. Performance & LCP Optimization

### 3.1 Hero Video & LCP
- **Video Poster**: Generate and add a `poster="/hero-poster.png"` to the `<video>` tag in `Hero.tsx`. This asset must be created from a frame of the video.
- **Priority Loading**: Mark the Hero title and main artist images with `priority` in `next/image`.

### 3.2 Image Optimization
- **Sharp**: Add `sharp` to `dependencies` for high-performance image processing in Next.js.
- **Sizes**: Refine `sizes` attribute in `next/image` to prevent over-downloading high-res images on mobile.

### 3.3 Code Splitting & Lazy Loading
- Use `next/dynamic` for `SponsorsSection`, `NewsletterSection`, and other non-critical below-the-fold components.
- This reduces the initial JavaScript bundle size and improves TBT (Total Blocking Time).

## 4. Accessibility (A11y) & Semantic HTML

### 4.1 ARIA Sweep
- **Decorative Elements**: Add `aria-hidden="true"` to `WaveDivider.tsx`, `Cube.tsx`, `Leaf.tsx`, and any other purely visual SVG/elements.
- **Interactive Elements**: Ensure all `Link` and `Button` components have descriptive `aria-label` if they contain only icons (e.g., social links).

### 4.2 Semantic HTML
- **Heading Levels**: Audit all pages to ensure a logical hierarchy (exactly one `h1`, followed by `h2`, then `h3`).
- **Sectioning**: Use `main`, `section`, `article`, `header`, `footer` appropriately.
- **IDs**: Add semantic `id` to sections for anchor linking and better navigation.

### 4.3 Motion Preferences
- Use `useReducedMotion` from `framer-motion` to disable or simplify parallax effects for users who prefer reduced motion.

## 5. Implementation Plan
1. Create a new branch `optimize/seo-performance`.
2. Update metadata and sitemap configuration.
3. Implement JSON-LD across the site.
4. Optimize Hero video and LCP images.
5. Apply accessibility fixes (ARIA/Semantic HTML).
6. Verify with `npm run build` and manual audit.
