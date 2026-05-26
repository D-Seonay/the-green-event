# Design Spec: Gallery Grid Quick-Zoom

## 1. Overview
Add a dedicated "Zoom" button to each gallery image in the grid. This provides a direct, discoverable way for users to open the immersive Lightbox view.

## 2. Architecture & Components

### 2.1 `CollageImage.tsx`
- **New Element**: A floating action button (FAB) styled zoom icon.
- **Position**: Top-right or bottom-right corner of the image card.
- **Interaction**:
  - **Desktop**: Opacity 0 by default, fades to 1 on image hover.
  - **Mobile**: Always visible at a slightly reduced scale.
- **Logic**: The button click triggers the existing `onClick(image)` prop.

### 2.2 Visual Style
- **Icon**: `Maximize2` or `Search` from Lucide React.
- **Colors**:
  - Background: `bg-forest/80` with `backdrop-blur-sm`.
  - Icon: `text-cream`.
  - Hover: `bg-leaf text-white`.
- **Animation**: Simple Framer Motion `initial/animate` for the hover fade.

## 3. Implementation Plan
1. Create a new branch `feat/gallery-zoom`.
2. Update `CollageImage.tsx` to include the zoom button.
3. Add Framer Motion logic for the hover reveal.
4. Ensure the button is properly positioned and accessible.
5. Verify that clicking the button opens the Lightbox as expected.
