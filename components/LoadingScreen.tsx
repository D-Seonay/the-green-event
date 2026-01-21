'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// --- DONNÉES POUR LES ÉLÉMENTS FLOTTANTS ---

// Images des artistes (Placeholders)
const FLOATING_IMAGES = [
  { src: "https://picsum.photos/200/200?random=1", top: "12%", left: "5%", rotate: -6 },
  { src: "https://picsum.photos/200/200?random=2", top: "18%", right: "8%", rotate: 12 },
  { src: "https://picsum.photos/200/200?random=3", bottom: "22%", left: "12%", rotate: -12 },
  { src: "https://picsum.photos/200/200?random=4", bottom: "12%", right: "5%", rotate: 6 },
];

// Petites icônes décoratives (Feuilles et Cubes)
const FLOATING_ICONS = [
  { type: 'leaf', top: '25%', left: '35%', rotate: 0, scale: 1 },
  { type: 'cube', top: '65%', right: '30%', rotate: 45, scale: 0.8 },
  { type: 'leaf', bottom: '30%', left: '25%', rotate: -20, scale: 0.9 },
  { type: 'cube', top: '15%', right: '40%', rotate: 15, scale: 0.7 },
  { type: 'leaf', bottom: '15%', left: '50%', rotate: 10, scale: 1.1 },
];

// --- COMPOSANTS SVG ---

const LeafIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const CubeIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
);


const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a3f25] overflow-hidden text-[#FEF7E0]">
      
      {/* ================= ARRIÈRE-PLAN (Z-0) ================= */}
      
      {/* 1. Blobs Flous */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-[#00A651] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 z-0 pointer-events-none"
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], x: [0, -50, 0] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
        className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-[#FEF7E0] rounded-full mix-blend-overlay filter blur-[120px] opacity-10 z-0 pointer-events-none"
      />

      {/* 2. Le Lien Serpentin (Wavy Line) */}
      <svg className="absolute top-0 left-0 w-full h-full z-0 opacity-50 pointer-events-none" viewBox="0 0 1440 800" fill="none" preserveAspectRatio="none">
        <motion.path
            // Une grande courbe de Bézier qui traverse l'écran
            d="M-100,400 C 300,100 800,700 1500,400"
            stroke="#FEF7E0"
            strokeWidth="4"
            strokeDasharray="10 20" // Pointillés style "couture"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
                pathLength: 1, 
                opacity: 1,
                y: [-15, 15, -15] // Légère ondulation verticale
            }}
            transition={{ 
                pathLength: { duration: 2, ease: "easeInOut" },
                opacity: { duration: 1 },
                y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
        />
      </svg>

       {/* 3. Petites Icônes Décoratives Flottantes */}
       {FLOATING_ICONS.map((icon, index) => (
        <motion.div
            key={`icon-${index}`}
            className="absolute z-0 text-[#FEF7E0] opacity-60"
            style={{ top: icon.top, left: icon.left, right: icon.right, bottom: icon.bottom }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
                opacity: 0.6,
                scale: icon.scale,
                y: [0, -15, 0],
                rotate: [icon.rotate, icon.rotate + 15, icon.rotate]
            }}
            transition={{
                delay: index * 0.2,
                duration: 5 + index,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
            }}
        >
            {icon.type === 'leaf' ? <LeafIcon className="w-8 h-8" /> : <CubeIcon className="w-8 h-8" />}
        </motion.div>
       ))}

      {/* 4. Images des Artistes */}
      {FLOATING_IMAGES.map((img, index) => (
        <motion.div
          key={`img-${index}`}
          className="absolute z-0 w-32 h-32 md:w-48 md:h-48 rounded-xl overflow-hidden shadow-2xl border-2 border-[#FEF7E0]/20"
          style={{ top: img.top, left: img.left, right: img.right, bottom: img.bottom, rotate: img.rotate }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 0.3, // Subtil
            scale: 1,
            y: [0, -20, 0],
            rotate: [img.rotate, img.rotate + 5, img.rotate]
          }}
          transition={{
            opacity: { duration: 1 },
            scale: { duration: 1 },
            y: { duration: 4 + index, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
            rotate: { duration: 6 + index, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
          }}
        >
          <div className="absolute inset-0 bg-[#0a3f25] mix-blend-color opacity-50 z-10" />
          <Image src={img.src} alt="Artist Preview" fill className="object-cover grayscale contrast-125" />
        </motion.div>
      ))}

      {/* ================= CONTENU CENTRAL (Z-10) ================= */}
      
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-[#FEF7E0] drop-shadow-lg"
        >
          The Green <br /> Event
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-4 text-sm md:text-lg font-medium tracking-widest text-[#00A651] uppercase bg-[#0a3f25]/80 px-4 py-1 rounded-full backdrop-blur-sm"
        >
          Musique Électronique & Nature
        </motion.p>

        {/* Loader Feuille Pulsante */}
        <motion.div
          className="mt-12 text-[#FEF7E0]"
          animate={{
            scale: [1, 1.15, 1],
            filter: ["drop-shadow(0 0 0px rgba(0, 166, 81, 0))", "drop-shadow(0 0 20px rgba(0, 166, 81, 0.8))", "drop-shadow(0 0 0px rgba(0, 166, 81, 0))"]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <LeafIcon className="w-16 h-16 md:w-20 md:h-20" />
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;