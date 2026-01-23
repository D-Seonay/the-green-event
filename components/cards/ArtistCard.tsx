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
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      <div
        className="bg-cream p-4 rounded-lg shadow-lg transition-transform duration-300 group-hover:rotate-0"
        style={{ transform: `rotate(${artist.rotation}deg)` }}
      >
        <div className="relative w-full h-56 overflow-hidden rounded-md">
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className="object-cover rounded-md filter grayscale group-hover:grayscale-0 transition-all duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <h3 className="mt-4 text-center text-lg font-bold text-forest">
          {artist.name}
        </h3>
      </div>
    </motion.div>
  );
};

export default ArtistCard;
