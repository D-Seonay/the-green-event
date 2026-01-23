import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { IconProps, FloatingElement as FloatingElementInterface } from '@/types';
import Cube from './ui/Cube';
import Leaf from './ui/Leaf';

interface FloatingElementProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  blur?: boolean;
  style?: React.CSSProperties;
  component: React.ComponentType<IconProps>;
}

const FloatingElement = ({ 
  className = "", 
  size = "md", 
  blur = false,
  style,
  component: Component,
}: FloatingElementProps) => {
  const sizeClasses = {
    sm: "w-8 h-8 md:w-12 md:h-12",
    md: "w-16 h-16 md:w-24 md:h-24",
    lg: "w-24 h-24 md:w-40 md:h-40",
    xl: "w-40 h-40 md:w-64 md:h-64",
  };

  const blurClass = blur ? "blur-sm opacity-30" : "opacity-60";
  const colorClass = "fill-cream stroke-forest"; // Added common color classes

  return (
    <div 
      className={`${sizeClasses[size]} ${blurClass} ${className}`}
      style={style}
    >
      <Component className={`w-full h-full ${colorClass}`} />
    </div>
  );
};

interface ParallaxFloatingElementProps extends FloatingElementProps {
  speed?: number;
  initialY?: number;
  rotation?: number;
}

export const ParallaxFloatingElement = ({
  speed = 0.5,
  initialY = 0,
  rotation = 0,
  ...props
}: ParallaxFloatingElementProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], [initialY, initialY - 300 * speed]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, rotation]);

  return (
    <motion.div
      ref={ref}
      style={{ y, rotate }}
      className="absolute pointer-events-none"
    >
      <FloatingElement {...props} />
    </motion.div>
  );
};

export default FloatingElement;
