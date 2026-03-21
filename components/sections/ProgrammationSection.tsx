'use client';

import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Cube from '@/components/ui/Cube';
import Leaf from '@/components/ui/Leaf';
import useMediaQuery from '@/hooks/use-media-query';
import WaveDivider from '../ui/WaveDivider';
import ArtistCard from '@/components/cards/ArtistCard';

import { ARTISTS } from '@/lib/data';

const featuredArtists = ARTISTS.slice(0, 8);

const ConnectingLine = () => {
  const targetRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start center', 'end center'],
  });

  const isMobile = useMediaQuery('(max-width: 768px)');

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  if (isMobile) {
    return (
      <div ref={targetRef} className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px h-full overflow-hidden">
        <motion.div
          className="w-full bg-cream/30"
          style={{ height: pathLength }}
        />
      </div>
    );
  }

  return (
    <div ref={targetRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <motion.path
          d="M -50,150 Q 150,50 300,150 T 600,150 T 900,150 T 1250,150 M -50,450 Q 150,350 300,450 T 600,450 T 900,450 T 1250,450"
          fill="none"
          stroke="rgba(254, 247, 224, 0.2)"
          strokeWidth="2"
          strokeDasharray="10 15"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
};


const FloatingIcon = ({ children, x, y, className }: { children: React.ReactNode, x: number[], y: number[], className: string }) => {
  const targetRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const isMobile = useMediaQuery('(max-width: 768px)');
  const yValue = useTransform(scrollYProgress, [0, 1], y);
  const xValue = useTransform(scrollYProgress, [0, 1], x);

  return (
    <motion.div ref={targetRef} style={{ y: isMobile ? 0 : yValue, x: isMobile ? 0 : xValue }} className={`absolute ${className} ${isMobile ? 'hidden' : ''}`}>
      {children}
    </motion.div>
  );
};

export default function ProgrammationSection() {
  const sectionRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={sectionRef} className="relative py-12 px-4 md:py-32 md:px-8 overflow-hidden bg-forest">
      <WaveDivider variant="forest-to-cream" />

      <div className="absolute top-16 left-8 md:left-16 z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="absolute -inset-2 transform -rotate-2 rounded-lg bg-cream shadow-xl"></div>
          <h2 className="relative px-8 py-3 text-5xl font-display font-black md:text-8xl text-forest uppercase tracking-tighter">
            ARTISTES
          </h2>
        </motion.div>
      </div>

      <ConnectingLine />

      <FloatingIcon x={[-100, 100]} y={[-50, 50]} className="top-1/4 left-1/4">
        <Cube className="w-12 h-12 opacity-20 text-cream" aria-hidden="true" />
      </FloatingIcon>
      <FloatingIcon x={[50, -50]} y={[20, -20]} className="top-1/2 right-1/4">
        <Leaf className="w-16 h-16 opacity-20 text-cream" aria-hidden="true" />
      </FloatingIcon>
      <FloatingIcon x={[-20, 20]} y={[50, -100]} className="bottom-1/4 left-1/3">
        <Leaf className="w-10 h-10 opacity-20 text-cream" aria-hidden="true" />
      </FloatingIcon>
      <FloatingIcon x={[100, -100]} y={[-30, 30]} className="top-1/3 right-1/3">
        <Cube className="w-16 h-16 opacity-20 text-cream" aria-hidden="true" />
      </FloatingIcon>


      <div className="relative z-10 max-w-7xl mx-auto mt-64">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-16 md:gap-x-12 md:gap-y-32">
          {featuredArtists.map((artist, index) => (
            <ArtistCard key={artist.name} artist={artist} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32 text-center"
        >
          <Button variant="outline" size="lg" className="h-16 px-10 text-xl font-display font-black group bg-cream text-forest hover:bg-cream/90 transition-all duration-500 hover:scale-110 border-0 shadow-2xl uppercase tracking-widest">
            VOIR TOUTE LA PROG
            <ArrowDown className="ml-3 h-6 w-6 transition-transform group-hover:translate-y-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}