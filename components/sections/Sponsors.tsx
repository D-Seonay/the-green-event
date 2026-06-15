
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Sponsor } from '@/types';
import SectionTitle from '@/components/ui/SectionTitle';

interface SponsorsSectionProps {
  sponsors?: Sponsor[];
}

const SponsorsSection = ({ sponsors = [] }: SponsorsSectionProps) => {
  return (
    <section id="sponsors" className="relative py-20 overflow-hidden bg-forest">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <SectionTitle>
            NOS PARTENAIRES
          </SectionTitle>
          <p className="mt-6 text-cream/60 font-mono uppercase tracking-[0.4em] text-sm md:text-base">
            Ils nous soutiennent dans cette aventure
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 items-center justify-items-center max-w-6xl mx-auto mt-12">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="group relative flex items-center justify-center w-full aspect-video md:aspect-square bg-cream/5 rounded-xl p-4 backdrop-blur-sm border border-cream/10 hover:border-cream/20 transition-colors"
            >
              <Image
                src={sponsor.logoSrc}
                alt={sponsor.alt}
                width={160}
                height={160}
                className="max-w-full max-h-full object-contain opacity-60 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
