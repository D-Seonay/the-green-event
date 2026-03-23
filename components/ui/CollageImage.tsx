'use client';

import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Maximize2 } from 'lucide-react';
import { GalleryImage } from '@/types';

interface CollageImageProps {
  image: GalleryImage;
  onClick: (image: GalleryImage) => void;
  index: number;
  scrollYProgress: any; // Passing the section scroll progress
  dragConstraints?: React.RefObject<HTMLElement>;
}

const CollageImage = ({ image, onClick, index, scrollYProgress, dragConstraints }: CollageImageProps) => {
  const shouldReduceMotion = useReducedMotion();

  // Parallax: Each image moves at a slightly different speed
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [shouldReduceMotion ? 0 : -100 * image.speed, shouldReduceMotion ? 0 : 100 * image.speed]
  );

  // Depth of field: Blur reduces as image enters center view
  const blur = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [shouldReduceMotion ? 0 : 4, 0, shouldReduceMotion ? 0 : 4]
  );

  return (
    <motion.div
      style={{ y, zIndex: image.depth }}
      className="relative group"
      initial="initial"
      whileHover="hover"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div
        variants={{
          initial: { opacity: 0, scale: 0.9 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }
          }
        }}
        drag
        dragConstraints={dragConstraints}
        dragElastic={0.1}
        dragMomentum={true}
        whileDrag={{ 
          scale: 1.1, 
          zIndex: 100,
          cursor: 'grabbing',
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
        }}
        whileHover={{ 
          scale: 1.05, 
          rotate: 0, 
          zIndex: 50,
          transition: { duration: 0.4 }
        }}
        style={{ 
          rotate: image.tilt,
          filter: `blur(${blur}px)` 
        }}
        className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-cream/10 bg-forest/50 cursor-grab active:cursor-grabbing"
      >
        <div className="relative aspect-[4/5] sm:aspect-square md:aspect-[3/4] pointer-events-none">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-forest/20 mix-blend-multiply transition-opacity group-hover:opacity-0" />
        </div>

        {/* Zoom Button */}
        <motion.button
          variants={{
            initial: { opacity: 0, scale: 0.8 },
            hover: { opacity: 1, scale: 1 },
            visible: { opacity: 0 } // Hidden until hovered on desktop
          }}
          className="absolute bottom-4 right-4 z-[60] p-3 rounded-full bg-forest/80 backdrop-blur-md border border-cream/20 text-cream transition-all duration-300 md:flex hidden items-center justify-center"
          onClick={(e) => { 
            e.stopPropagation(); 
            onClick(image); 
          }}
          aria-label="Agrandir l'image"
        >
          <Maximize2 size={20} />
        </motion.button>

        {/* Mobile Zoom Button (Always visible) */}
        <button
          className="absolute bottom-3 right-3 z-[60] p-2 rounded-full bg-forest/90 backdrop-blur-md border border-cream/20 text-cream md:hidden flex items-center justify-center active:scale-95 transition-transform"
          onClick={(e) => { 
            e.stopPropagation(); 
            onClick(image); 
          }}
          aria-label="Agrandir l'image"
        >
          <Maximize2 size={18} />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default CollageImage;
