'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);
  const yTranslate = useTransform(scrollY, [0, 100], [0, 20]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0a3f25]">
      {/* Layer 0: Full-Screen Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/theGreenEvent.MP4" type="video/mp4" />
        {/* Placeholder if video fails */}
        <div className="absolute inset-0 bg-[#0a3f25]" />
      </video>

      {/* Layer 1: Dark Green Overlay */}
      <div className="absolute inset-0 bg-[#0a3f25]/40 z-10" />

      {/* Layer 2: Centered Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-9xl font-display font-black text-[#FEF7E0] leading-none mb-4 uppercase tracking-tighter drop-shadow-2xl"
        >
          THE GREEN EVENT
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-3xl font-display font-bold text-[#00A651] mb-10 tracking-[0.2em] uppercase"
        >
          L&apos;ÉLECTRO AU GRAND AIR
        </motion.h2>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity, y: yTranslate }}
          className="hidden md:flex flex-col items-center gap-2 absolute bottom-24 left-1/2 -translate-x-1/2"
        >
          <span className="text-cream/40 text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap">
            Découvrir
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-leaf"
          >
            <ArrowDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>

      {/* Layer 3: Solid Mask for section transition */}
      <div className="absolute bottom-0 left-0 w-full z-30 pointer-events-none">
        <svg
          className="relative block w-full h-[120px] md:h-[180px]"
          viewBox="0 0 1440 180"
          fill="#0a3f25"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,180 L1440,180 L1440,60 C1200,20 960,120 720,60 C480,0 240,100 0,60 Z" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
