"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface FloatingElementProps {
  className?: string;
  variant: "cube" | "leaf" | "circle";
  size?: "sm" | "md" | "lg" | "xl";
  blur?: boolean;
  style?: React.CSSProperties;
}

const FloatingElement = ({ 
  className = "", 
  variant, 
  size = "md", 
  blur = false,
  style 
}: FloatingElementProps) => {
  const sizeClasses = {
    sm: "w-8 h-8 md:w-12 md:h-12",
    md: "w-16 h-16 md:w-24 md:h-24",
    lg: "w-24 h-24 md:w-40 md:h-40",
    xl: "w-40 h-40 md:w-64 md:h-64",
  };

  const blurClass = blur ? "blur-sm opacity-30" : "opacity-60";

  if (variant === "cube") {
    return (
      <div 
        className={`${sizeClasses[size]} ${blurClass} ${className}`}
        style={style}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-cream">
          <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" />
        </svg>
      </div>
    );
  }

  if (variant === "leaf") {
    return (
      <div 
        className={`${sizeClasses[size]} ${blurClass} ${className}`}
        style={style}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-cream">
          <path d="M50 5 C80 20, 95 50, 80 80 C60 95, 40 95, 20 80 C5 50, 20 20, 50 5 Z" />
          <path d="M50 20 L50 85 M35 40 L50 55 M65 40 L50 55" 
                className="stroke-forest stroke-2 fill-none opacity-50" />
        </svg>
      </div>
    );
  }

  return (
    <div 
      className={`${sizeClasses[size]} ${blurClass} rounded-full bg-cream ${className}`}
      style={style}
    />
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
