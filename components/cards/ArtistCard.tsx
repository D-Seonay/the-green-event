'use client';

import React from 'react';
import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';
import type { Artist } from '@/types';
import { useParallax } from '@/hooks/useParallax';

interface ArtistCardProps {
  artist: Artist;
  index: number;
}

const ArtistCard = ({ artist, index }: ArtistCardProps) => {
  const targetRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  // Use a different speed based on index for a more dynamic effect
  const y = useParallax(scrollYProgress, (index % 3) * 5 + 5);

  return (
    <motion.div
      ref={targetRef}
      style={{ y }}
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1]
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div
        whileHover={{ y: -15 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="group"
      >
        <div
          className="bg-cream p-4 rounded-lg shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:bg-cream/95 overflow-hidden"
          style={{ transform: `rotate(${artist.rotation}deg)` }}
        >
          <div className="relative w-full h-64 overflow-hidden rounded-md">
            <Image
              src={artist.image}
              alt={artist.name}
              fill
              className="object-cover rounded-md filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <h3 className="mt-4 text-center text-xl font-display font-black text-forest uppercase tracking-tighter transition-colors group-hover:text-leaf">
            {artist.name}
          </h3>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ArtistCard;
