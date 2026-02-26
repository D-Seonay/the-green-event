'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ARTISTS } from '@/lib/data';
import ArtistCard from '@/components/cards/ArtistCard';
import SectionTitle from '@/components/ui/SectionTitle';

const ProgrammationClient = () => {
  return (
    <main className="bg-forest text-cream pt-20">
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-24">
            <SectionTitle>Programmation</SectionTitle>
          </div>
          
          {/* This could be a reusable ConnectingLine component if needed */}
          <div className="absolute inset-0 w-full h-full overflow-hidden opacity-30">
            <svg width="100%" height="100%" viewBox="0 0 1200 1000" preserveAspectRatio="none">
              <motion.path
                d="M -50,150 Q 150,50 300,150 T 600,150 T 900,150 T 1250,150 M -50,450 Q 150,350 300,450 T 600,450 T 900,450 T 1250,450 M -50,750 Q 150,650 300,750 T 600,750 T 900,750 T 1250,750"
                fill="none"
                stroke="hsl(var(--cream))"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, ease: 'easeInOut' }}
                viewport={{ once: true, amount: 0.2 }}
              />
            </svg>
          </div>

          <div className="relative max-w-7xl mx-auto z-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-8 sm:gap-y-24">
              {ARTISTS.map((artist, index) => (
                <ArtistCard key={artist.name} artist={artist} index={index} />
              ))}
            </div>

            <div className="mt-24 text-center">
              <Button variant="outline" size="lg" className="bg-cream text-forest hover:bg-cream/90 group">
                VOIR PLUS
                <ArrowDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProgrammationClient;
