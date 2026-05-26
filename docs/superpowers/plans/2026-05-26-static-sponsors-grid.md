# Static Sponsors Grid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the scrolling sponsor marquee into a static, responsive grid of logos.

**Architecture:** Remove Framer Motion marquee logic and replace it with a standard Tailwind CSS grid.

**Tech Stack:** React, Next.js, Tailwind CSS, Framer Motion (for hover effects).

---

### Task 1: Refactor Sponsors Component

**Files:**
- Modify: `components/sections/Sponsors.tsx`

- [ ] **Step 1: Remove marquee logic and duplication**
Remove the `duplicatedSponsors` array and the `marqueeVariants` object.

```tsx
// Remove
const duplicatedSponsors = [...sponsors, ...sponsors];
const marqueeVariants = { ... };
```

- [ ] **Step 2: Implement static grid layout**
Replace the scrolling container with a responsive grid.

```tsx
// Replace:
// <motion.div className="flex" variants={marqueeVariants} animate="animate">
//   {duplicatedSponsors.map(...)}
// </motion.div>

// With:
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center max-w-6xl mx-auto px-4">
  {sponsors.map((sponsor) => (
    <motion.div 
      key={sponsor.id} 
      className="flex-shrink-0 w-32 md:w-40"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Image
        src={sponsor.logoSrc}
        alt={sponsor.name}
        width={160}
        height={80}
        className="object-contain opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-500"
      />
    </motion.div>
  ))}
</div>
```

- [ ] **Step 3: Verify the changes**
Run the development server and check the Sponsors section. Ensure:
1. The logos are static (not moving).
2. The layout is a grid (2 cols on mobile, 3 on tablet, 6 on desktop).
3. Circular logos like Umami are centered and properly sized.

- [ ] **Step 4: Commit**
```bash
git add components/sections/Sponsors.tsx
git commit -m "feat: replace sponsor marquee with static grid"
```
