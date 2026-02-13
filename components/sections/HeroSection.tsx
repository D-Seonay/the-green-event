'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Cube from '@/components/ui/Cube';
import Leaf from '@/components/ui/Leaf';

const HeroSection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <section ref={targetRef} className="relative h-screen w-full">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute w-full h-full object-cover"
      >
        <source src="/theGreenEvent.MP4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-forest/60" />

      {/* Parallax Elements */}
      <motion.div style={{ y: y1, x: x1 }} className="absolute top-1/4 left-1/4">
        <Cube className="text-cream opacity-20" />
      </motion.div>
      <motion.div style={{ y: y2, x: x2 }} className="absolute top-1/2 right-1/4">
        <Leaf className="text-leaf opacity-30" />
      </motion.div>
      <motion.div style={{ y: y3 }} className="absolute bottom-1/4 left-1/3">
        <Cube className="text-cream opacity-10" />
      </motion.div>
      <motion.div style={{ y: y1, x: x2 }} className="absolute bottom-1/2 right-1/3">
        <Leaf className="text-leaf opacity-50" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-4">
        <h1
          className="text-5xl md:text-8xl font-display font-black text-cream drop-shadow-lg leading-tight"
        >
          THE GREEN EVENT
        </h1>
        <h2 className="mt-4 text-xl md:text-2xl text-leaf drop-shadow-md">
          MUSIQUE ÉLECTRONIQUE & NATURE À VERTOU
        </h2>
      </div>
    </section>
  )
}

export default HeroSection;