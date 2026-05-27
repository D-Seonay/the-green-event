import { useTransform, MotionValue } from 'framer-motion';
import useMediaQuery from '../hooks/use-media-query';

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
  const isMobile = useMediaQuery('(max-width: 768px)'); // Tailwind's 'md' breakpoint

  const transform = useTransform(
    scrollYProgress, 
    [0, 1], 
    [`${-speed * 2}%`, `${speed * 2}%`]
  );

  const staticValue = useTransform(scrollYProgress, [0, 1], ['0%', '0%']);

  return isMobile ? staticValue : transform;
}
