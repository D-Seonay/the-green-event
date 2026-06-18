# Plan d'implémentation : Amélioration UX Boutique T-shirt

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Améliorer l'affichage des t-shirts avec un carousel premium incluant des vignettes, un zoom HD et une optimisation SEO des images.

**Architecture:** Création d'un composant dédié `ProductCarousel` utilisant Embla Carousel pour la gestion des images et Framer Motion pour les interactions. Mise à jour de la structure de données des produits.

**Tech Stack:** Next.js, Tailwind CSS, Framer Motion, Embla Carousel (shadcn/ui), Lucide React.

---

### Task 1: Optimisation SEO et Renommage des Images

**Files:**
- Modify: `public/products/t-shirt/` (Renommage via shell)

- [ ] **Step 1: Renommer les images WhatsApp avec des noms explicites**
Run:
```bash
mv "public/products/t-shirt/t-shirt-1.jpeg" "public/products/t-shirt/t-shirt-2026-face.jpeg"
mv "public/products/t-shirt/WhatsApp Image 2026-06-17 at 15.01.06.jpeg" "public/products/t-shirt/t-shirt-2026-back.jpeg"
mv "public/products/t-shirt/WhatsApp Image 2026-06-17 at 15.01.06 (1).jpeg" "public/products/t-shirt/t-shirt-2026-label.jpeg"
mv "public/products/t-shirt/WhatsApp Image 2026-06-17 at 15.01.06 (2).jpeg" "public/products/t-shirt/t-shirt-2026-texture.jpeg"
mv "public/products/t-shirt/WhatsApp Image 2026-06-17 at 15.01.06 (3).jpeg" "public/products/t-shirt/t-shirt-2026-sleeve.jpeg"
mv "public/products/t-shirt/WhatsApp Image 2026-06-17 at 15.01.06 (4).jpeg" "public/products/t-shirt/t-shirt-2026-detail-1.jpeg"
mv "public/products/t-shirt/WhatsApp Image 2026-06-17 at 15.01.06 (6).jpeg" "public/products/t-shirt/t-shirt-2026-detail-2.jpeg"
mv "public/products/t-shirt/WhatsApp Image 2026-06-17 at 15.01.06 (7).jpeg" "public/products/t-shirt/t-shirt-2026-folded.jpeg"
mv "public/products/t-shirt/WhatsApp Image 2026-06-17 at 15.01.06 (8).jpeg" "public/products/t-shirt/t-shirt-2026-vibe.jpeg"
```

- [ ] **Step 2: Vérifier le renommage**
Run: `ls public/products/t-shirt/`
Expected: Liste des fichiers renommés.

- [ ] **Step 3: Commit**
Run: `git add public/products/t-shirt/ && git commit -m "assets: rename t-shirt images for SEO"`

---

### Task 2: Mise à jour des données produits

**Files:**
- Modify: `lib/data.ts`

- [ ] **Step 1: Mettre à jour l'objet du t-shirt avec les nouveaux chemins d'images**
Modify `lib/data.ts`:
```typescript
// Remplacer l'objet t-shirt existant (id: 4)
  {
    id: 4,
    name: 'T-shirt Green Fest 2026',
    price: '<s>25€</s> 20€ en précommande',
    description: 'T-shirt collector 100% coton bio.',
    longDescription: "Affichez votre soutien au festival avec notre t-shirt officiel 2026. Fabriqué en coton 100% biologique et issu du commerce équitable.",
    image: '/products/t-shirt/t-shirt-2026-face.jpeg',
    gallery: [
      '/products/t-shirt/t-shirt-2026-face.jpeg',
      '/products/t-shirt/t-shirt-2026-back.jpeg',
      '/products/t-shirt/t-shirt-2026-label.jpeg',
      '/products/t-shirt/t-shirt-2026-texture.jpeg',
      '/products/t-shirt/t-shirt-2026-sleeve.jpeg',
      '/products/t-shirt/t-shirt-2026-detail-1.jpeg',
      '/products/t-shirt/t-shirt-2026-detail-2.jpeg',
      '/products/t-shirt/t-shirt-2026-folded.jpeg',
      '/products/t-shirt/t-shirt-2026-vibe.jpeg'
    ],
    // ... reste des propriétés inchangées
  }
```

- [ ] **Step 2: Commit**
Run: `git add lib/data.ts && git commit -m "data: update t-shirt images gallery"`

---

### Task 3: Création du composant ProductCarousel

**Files:**
- Create: `components/ui/ProductCarousel.tsx`

- [ ] **Step 1: Créer le composant avec support des vignettes et du zoom**
Implementation details:
- Utiliser `useCarousel` de Embla.
- Créer deux instances d'Embla (main et thumbs).
- Ajouter un état `selectedIndex`.
- Implémenter l'effet de zoom au survol avec Framer Motion.

```tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';

interface ProductCarouselProps {
  images: string[];
  productName: string;
}

export function ProductCarousel({ images, productName }: ProductCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainViewportRef, emblaMainApi] = useEmblaCarousel({ loop: true });
  const [thumbViewportRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on('select', onSelect);
    emblaMainApi.on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="overflow-hidden bg-cream rounded-[2rem] sm:rounded-[4rem] shadow-2xl relative group" ref={mainViewportRef}>
        <div className="flex">
          {images.map((src, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 relative aspect-square">
              <motion.div 
                className="w-full h-full relative overflow-hidden cursor-zoom-in"
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              >
                <Image
                  src={src}
                  alt={`${productName} - view ${index + 1}`}
                  fill
                  className="object-cover mix-blend-multiply"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={index === 0}
                />
              </motion.div>
            </div>
          ))}
        </div>
        {/* Eco Badge Overlay */}
        <div className="absolute top-6 right-6 z-10">
            <span className="bg-leaf text-cream px-4 py-1 rounded-full font-display font-bold text-sm shadow-lg">100% BIO</span>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="overflow-hidden" ref={thumbViewportRef}>
        <div className="flex gap-3 px-2">
          {images.map((src, index) => (
            <button
              key={index}
              onClick={() => onThumbClick(index)}
              className={cn(
                "relative flex-[0_0_80px] aspect-square rounded-xl overflow-hidden bg-cream transition-all duration-300 border-2",
                index === selectedIndex ? "border-leaf scale-105" : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={src}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover mix-blend-multiply"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**
Run: `git add components/ui/ProductCarousel.tsx && git commit -m "feat: add ProductCarousel component with thumbnails and zoom"`

---

### Task 4: Intégration dans la page de détail produit

**Files:**
- Modify: `app/boutique/[id]/page.tsx`

- [ ] **Step 1: Remplacer l'ancien carousel par le nouveau composant `ProductCarousel`**
Modify `app/boutique/[id]/page.tsx`:
```tsx
// Importer le nouveau composant
import { ProductCarousel } from '@/components/ui/ProductCarousel';

// Dans le composant ProductDetailPage, remplacer le bloc Carousel existant par :
<ProductCarousel images={product.gallery || [product.image]} productName={product.name} />
```

- [ ] **Step 2: Supprimer les imports inutilisés (Carousel, etc.)**

- [ ] **Step 3: Vérifier le rendu sur mobile et desktop**

- [ ] **Step 4: Commit**
Run: `git add app/boutique/[id]/page.tsx && git commit -m "feat: integrate new ProductCarousel in product detail page"`
