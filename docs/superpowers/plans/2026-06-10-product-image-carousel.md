# Product Image Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a multi-image carousel to the product detail page to show different product angles.

**Architecture:** Update the `Product` type to include a `gallery` array, add images to the T-shirt data, and replace the static image on the product page with a `Carousel` component from Shadcn UI (Embla).

**Tech Stack:** Next.js (App Router), Framer Motion, Embla Carousel (Shadcn UI), TypeScript.

---

### Task 1: Update Product Interface

**Files:**
- Modify: `types/index.ts`

- [ ] **Step 1: Add gallery field to Product interface**

```typescript
export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  longDescription: string;
  image: string;
  gallery?: string[]; // Add this line
  rotation: number;
  helloAssoUrl: string;
  helloAssoSlug?: string;
  category: 'clothes' | 'accessories' | 'goodies';
  ecoSpecs: string[];
  keywords?: string[];
  seoDescription?: string;
  isMystery?: boolean;
}
```

- [ ] **Step 2: Verify type safety**
Ensure no immediate type errors in files importing `Product` (like `lib/data.ts`).

- [ ] **Step 3: Commit**

```bash
git add types/index.ts
git commit -m "types: add gallery field to Product interface"
```

---

### Task 2: Update T-shirt Data

**Files:**
- Modify: `lib/data.ts`

- [ ] **Step 1: Add gallery images to T-shirt product (ID: 4)**

```typescript
export const PRODUCTS: Product[] = [
  {
    id: 4,
    name: 'T-shirt Green Fest 2026',
    // ... other fields
    image: '/products/t-shirt/face-avant.jpg',
    gallery: [
      '/products/t-shirt/face-avant.jpg',
      '/products/t-shirt/face-arriere.jpg'
    ],
    // ...
  },
  // ...
];
```

- [ ] **Step 2: Commit**

```bash
git add lib/data.ts
git commit -m "data: add gallery images to T-shirt product"
```

---

### Task 3: Implement Carousel in Product Detail Page

**Files:**
- Modify: `app/boutique/[id]/page.tsx`

- [ ] **Step 1: Import Carousel components**

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
```

- [ ] **Step 2: Replace static Image with Carousel**

Update the left column to render a carousel if `product.gallery` exists.

```tsx
{/* Left Column: Image/Carousel */}
<motion.div 
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.7, ease: 'easeOut' }}
  className="relative"
>
  {product.gallery && product.gallery.length > 0 ? (
    <Carousel className="w-full">
      <CarouselContent>
        {product.gallery.map((src, index) => (
          <CarouselItem key={index}>
            <div className="relative aspect-square bg-[#FEF7E0] rounded-[4rem] overflow-hidden shadow-2xl">
                <Image
                  src={src}
                  alt={`${product.name} - image ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover mix-blend-multiply"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {product.gallery.length > 1 && (
        <>
          <CarouselPrevious className="left-4 bg-[#00A651] text-white border-none hover:bg-[#00A651]/90" />
          <CarouselNext className="right-4 bg-[#00A651] text-white border-none hover:bg-[#00A651]/90" />
        </>
      )}
    </Carousel>
  ) : (
    <div className="absolute inset-0 bg-[#FEF7E0] rounded-[4rem] transform -rotate-6 transition-all duration-500 hover:rotate-0 hover:scale-105 shadow-2xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority
          className="object-cover rounded-[4rem] mix-blend-multiply"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
    </div>
  )}
</motion.div>
```

*Note: I removed the `-rotate-6` from the carousel container to avoid clipping issues with Embla, but kept it for the fallback single image.*

- [ ] **Step 3: Add Dots/Thumbnails indicator**

Add a simple dot indicator below the carousel to show current slide.

- [ ] **Step 4: Verify rendering**
Run `npm run build` or check in browser if possible.

- [ ] **Step 5: Commit**

```bash
git add app/boutique/[id]/page.tsx
git commit -m "feat: implement product image carousel"
```
