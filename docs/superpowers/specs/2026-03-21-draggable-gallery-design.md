# Design Spec: Draggable Homepage Gallery

## 1. Overview
Add free-form drag interactions to the gallery images on the homepage. This allows users to physically "re-collage" the memories of the event while interacting with the parallax-driven layout.

## 2. Architecture & Components

### 2.1 `GallerySection.tsx`
- **Responsibility**: Container for the draggable collage.
- **Constraints**: Uses a `ref` to define the `dragConstraints` for all child `CollageImage` components, ensuring they don't leave the section boundaries.

### 2.2 `CollageImage.tsx`
- **Location**: `components/ui/CollageImage.tsx`
- **New Props**: `dragConstraints` (passed from parent).
- **Functionality**:
  - **Drag**: Enable `drag` prop from Framer Motion.
  - **Elasticity**: `dragElastic={0.1}` for a natural feel at the edges.
  - **Momentum**: `dragMomentum={true}` to allow "flicking" within the constraints.
  - **State Management**: Manage a `z-index` boost during drag.
- **Parallax Integration**: The `y` transform from scroll progress will be applied to a wrapper, while the drag transform applies to the image itself, allowing them to coexist smoothly.

### 2.3 Visual Feedback
- **whileDrag**:
  - `scale: 1.1`
  - `cursor: grabbing`
  - `shadow: 0 20px 40px rgba(0,0,0,0.4)`
  - `transition: { duration: 0.2 }`

## 3. Implementation Plan
1. Create a new branch `feat/draggable-gallery`.
2. Update `CollageImage.tsx` to support the `drag` prop and visual feedback.
3. Update `GallerySection.tsx` to pass the container `ref` as `dragConstraints`.
4. Refactor the parallax/drag integration to prevent position "jumping".
5. Verify behavior on both desktop and touch devices.
