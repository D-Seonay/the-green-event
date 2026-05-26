
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const sponsors = [
  { id: 1, name: 'Sponsor 1', logoSrc: '/partners/laSoupape.png' },
  { id: 2, name: 'Sponsor 2', logoSrc: '/partners/umami.jpeg' },
  { id: 3, name: 'Sponsor 3', logoSrc: '/placeholder.svg' },
  { id: 4, name: 'Sponsor 4', logoSrc: '/placeholder.svg' },
  { id: 5, name: 'Sponsor 5', logoSrc: '/placeholder.svg' },
  { id: 6, name: 'Sponsor 6', logoSrc: '/placeholder.svg' },
];

const SponsorsSection = () => {
  return (
    <section id="sponsors" className="relative py-12 overflow-hidden bg-forest md:py-20">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-extrabold md:text-6xl font-display text-cream">
          NOS PARTENAIRES
        </h2>
      </div>

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
    </section>
  );
};

export default SponsorsSection;
