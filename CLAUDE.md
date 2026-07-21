# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**The Green Fest** — website for an eco-responsible electronic music festival in Vertou (France), organized by the association *The Green Event*. The site is in French.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build
npm run lint      # ESLint check
```

No test runner is configured (testing libraries are installed but unused).

## Architecture

Next.js 15 App Router project (no `src/` directory — all code is at root level).

### Key directories

- `app/` — pages and API routes (App Router)
- `components/layout/` — Navbar, Footer, CookieBanner, ClientLayout (wraps every page)
- `components/sections/` — homepage sections (Hero, Concept, Gallery, Programmation, Newsletter, Infos, Sponsors)
- `components/ui/` — shadcn/ui primitives + custom festival UI (Cube, Leaf, Lightbox, WaveDivider, etc.)
- `components/cards/` — ArtistCard, MysteryArtistCard, ComingSoonProductCard
- `lib/data.ts` — single source of truth for all static data: `ARTISTS`, `PRODUCTS`, `SPONSORS`, `GALLERY_IMAGES`, `NAV_LINKS`, `FLOATING_ELEMENTS`
- `lib/mail.ts` — Nodemailer wrapper (falls back to mock mode when `EMAIL_USER`/`EMAIL_PASS` env vars are absent)
- `types/index.ts` — shared TypeScript types: `Artist`, `Product`, `GalleryImage`, `Sponsor`, `NavLink`, `FloatingElement`

### Pages

| Route                       | Description                                  |
| --------------------------- | -------------------------------------------- |
| `/`                         | Homepage with all homepage sections          |
| `/programmation`            | Artist grid                                  |
| `/programmation/[slug]`     | Individual artist page                       |
| `/boutique`                 | Merch shop (links to HelloAsso for checkout) |
| `/boutique/[id]`            | Product detail                               |
| `/benevoles`                | Volunteer sign-up form                       |
| `/cgv`, `/mentions-legales` | Legal pages                                  |

### API routes

- `POST /api/newsletter` — sends confirmation email to subscriber + admin alert via Nodemailer
- `POST /api/benevoles` — volunteer form submission, same email mechanism

### Design system

- **Color palette**: deep forest green (`--forest` / `--background`), creamy beige (`--cream` / `--foreground`), vivid leaf green (`--leaf` / `--accent`). Defined as CSS HSL variables in `app/globals.css`, referenced as Tailwind tokens (`bg-forest`, `text-cream`, `text-leaf`, etc.)
- **Fonts**: Montserrat (`font-display`) for headings, Nunito (`font-body`) for body text
- **Animations**: Framer Motion for scroll/entry animations; Lenis for smooth scrolling (via `SmoothScroller` component); custom Tailwind keyframes (`float`, `float-slow`, `float-reverse`, `pulse`)
- **UI components**: shadcn/ui (Radix UI + Tailwind); do not add new component libraries

### Content management pattern

All static content (artists, products, sponsors, gallery images) lives in `lib/data.ts` as typed arrays. To add an artist or product, add an entry there — pages consume these arrays directly with no CMS.

The `isMystery: true` flag on `Artist` and `Product` entries renders placeholder "mystery" cards instead of real content.

### Email

`lib/mail.ts` uses Gmail via Nodemailer. Required env vars: `EMAIL_USER`, `EMAIL_PASS` (Gmail App Password), `CONTACT_EMAIL`. Without them, emails are logged to console in mock mode.
