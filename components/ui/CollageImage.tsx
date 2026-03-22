'use client';

import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { GalleryImage } from '@/types';

interface CollageImageProps {
  image: GalleryImage;
  onClick: (image: GalleryImage) => void;
  index: number;
}

const CollageImage = ({ image, onClick, index }: CollageImageProps) => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Parallax: Each image moves at a slightly different speed
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : 500 * image.speed]
  );

  // Depth of field: Blur reduces as image enters center view
  // Note: This is an expensive effect, using it subtly
  const blur = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [shouldReduceMotion ? 0 : 4, 0, shouldReduceMotion ? 0 : 4]
  );

  return (
    <motion.div
      style={{ y, zIndex: image.depth }}
      className="relative cursor-pointer group"
      onClick={() => onClick(image)}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      <motion.div
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
        className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-cream/10 bg-forest/50"
      >
        <div className="relative aspect-[4/5] sm:aspect-square md:aspect-[3/4]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-forest/20 mix-blend-multiply transition-opacity group-hover:opacity-0" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CollageImage;
