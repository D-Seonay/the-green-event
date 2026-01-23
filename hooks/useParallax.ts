'use client';

import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { RefObject } from 'react';

interface UseParallaxOptions {
  target?: RefObject<HTMLElement>;
  offset?: string[];
  speed: number;
}

/**
 * A custom hook to create a parallax effect on the y-axis based on scroll progress.
 * @param options - Configuration for the parallax effect.
 * @param options.target - The element to track for scroll progress. If not provided, it uses the window scroll.
 * @param options.offset - The offset of the target element to start and end the parallax effect.
 * @param options.speed - A factor to determine the parallax speed. Negative for up, positive for down.
 * @returns A MotionValue representing the transformed y-position.
 */
export function useParallax(
  scrollYProgress: MotionValue<number>,
  speed: number,
): MotionValue<string> {
  // The y-position will move from -speed% to +speed% of the element's height
  // as the scrollYProgress goes from 0 to 1.
  return useTransform(scrollYProgress, [0, 1], [`${-speed * 2}%`, `${speed * 2}%`]);
}
