# Design Spec: Product Image Carousel

Add a multi-image gallery (carousel) to the product detail page to allow users to see different angles of a product (e.g., front and back of the T-shirt).

## User Story
As a user, I want to see multiple images of a product so that I can better understand its design and details before purchasing.

## Architecture

### 1. Data Model Update
- Modify `Product` interface in `types/index.ts`:
  - Add `gallery?: string[]` field.
- Update `PRODUCTS` in `lib/data.ts`:
  - For the T-shirt (id: 4), add `gallery: ['/products/t-shirt/face-avant.jpg', '/products/t-shirt/face-arriere.jpg']`.

### 2. UI Component Update
- File: `app/boutique/[id]/page.tsx`
- Implementation:
  - Import `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext` from `@/components/ui/carousel`.
  - Check if `product.gallery` exists.
  - If yes, render the `Carousel` component instead of the single `Image`.
  - Use `CarouselContent` and `CarouselItem` to loop through the gallery.
  - Maintain the existing styling (rounded corners, shadow, mix-blend-multiply if applicable).
  - Add dots or small thumbnails below the carousel for navigation.

### 3. Visual Aesthetic
- Maintain the tilted background effect (`-rotate-6`) but ensure it doesn't interfere with the carousel interaction.
- Ensure the carousel is responsive and works well on mobile (touch swipe).

## Testing Plan
- Navigate to the T-shirt product page.
- Verify that both images are visible in the carousel.
- Test swiping/dragging on mobile.
- Test arrow navigation on desktop.
- Verify that other products (without a gallery) still work correctly (either show a single image or use their single image as a 1-item gallery).
