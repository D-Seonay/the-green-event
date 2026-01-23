
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import WaveDivider from '../ui/WaveDivider';

const sponsors = [
  { id: 1, name: 'Sponsor 1', logoSrc: '/placeholder.svg' },
  { id: 2, name: 'Sponsor 2', logoSrc: '/placeholder.svg' },
  { id: 3, name: 'Sponsor 3', logoSrc: '/placeholder.svg' },
  { id: 4, name: 'Sponsor 4', logoSrc: '/placeholder.svg' },
  { id: 5, name: 'Sponsor 5', logoSrc: '/placeholder.svg' },
  { id: 6, name: 'Sponsor 6', logoSrc: '/placeholder.svg' },
  { id: 7, name: 'Sponsor 7', logoSrc: '/placeholder.svg' },
  { id: 8, name: 'Sponsor 8', logoSrc: '/placeholder.svg' },
];

const SponsorsSection = () => {
  const duplicatedSponsors = [...sponsors, ...sponsors];

  const marqueeVariants = {
    animate: {
      x: [0, -1088], // Adjust this value based on the total width of your logos
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 20,
          ease: 'linear',
        },
      },
    },
  };

  return (
    <section id="sponsors" className="relative bg-[#0a3f25] py-20 overflow-hidden">
      <WaveDivider variant="forest-to-cream" className="absolute top-0 w-full" />
      
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-[#FEF7E0]" style={{ fontFamily: 'Montserrat Black, sans-serif' }}>
          NOS PARTENAIRES
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex"
          variants={marqueeVariants}
          animate="animate"
        >
          {duplicatedSponsors.map((sponsor, index) => (
            <div key={index} className="flex-shrink-0 mx-8" style={{ width: '128px' }}>
              <Image
                src={sponsor.logoSrc}
                alt={sponsor.name}
                width={128}
                height={64}
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorsSection;
