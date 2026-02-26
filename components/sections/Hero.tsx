'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Cube from '@/components/ui/Cube';
import Leaf from '@/components/ui/Leaf';

const Hero = () => {
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

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button 
            size="xl" 
            className="bg-[#00A651] hover:bg-[#008a44] text-[#FEF7E0] font-display font-black text-xl px-12 py-8 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            BILLETTERIE
          </Button>
        </motion.div>
      </div>

      {/* Layer 3 & 4: SVG Transition Mask & Decorations */}
      <div className="absolute bottom-0 left-0 w-full z-30 pointer-events-none">
        {/* Wavy Stroke Decoration (Cream Line following mask) */}
        <svg
          className="absolute bottom-0 w-full h-[150px] md:h-[200px]"
          viewBox="0 0 1440 200"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M0,100 C240,150 480,50 720,100 C960,150 1200,50 1440,100"
            stroke="#FEF7E0"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>

        {/* The Solid Mask (Blends into next section) */}
        <svg
          className="relative block w-full h-[120px] md:h-[180px]"
          viewBox="0 0 1440 180"
          fill="#0a3f25"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,180 L1440,180 L1440,60 C1200,20 960,120 720,60 C480,0 240,100 0,60 Z" />
        </svg>

        {/* Floating Geometric Elements (Jazz à Vienne Style) */}
        <div className="absolute top-0 w-full h-full">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 15, -15, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            >
              {i % 2 === 0 ? (
                <Cube className="w-8 h-8 text-[#FEF7E0]" />
              ) : (
                <Leaf className="w-10 h-10 text-[#00A651]" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
