'use client';

import { motion } from 'framer-motion';
import Cube from '@/components/ui/Cube';
import Leaf from '@/components/ui/Leaf';

interface MysteryArtistCardProps {
  rotation?: number;
}

/**
 * MysteryArtistCard Component
 * 
 * A premium placeholder card for artists whose identity hasn't been revealed yet.
 * Features floating elements, a silhouette effect, and smooth Framer Motion animations.
 */
export default function MysteryArtistCard({ rotation = 3 }: MysteryArtistCardProps) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05, 
        rotate: 0,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      initial={{ rotate: rotation }}
      className="bg-cream p-4 rounded-[2.5rem] shadow-2xl overflow-hidden cursor-help group"
    >
      <div className="relative aspect-[4/5] bg-forest rounded-[2rem] overflow-hidden flex flex-col items-center justify-center border-4 border-forest/10">
        
        {/* Radial Glow - Nature/Electro Vibe */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-leaf/30 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Floating Background Elements (Cubes & Leaves) */}
        <motion.div
          whileInView={{ 
            y: [0, -15, 0],
            rotate: [0, 15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          viewport={{ once: false }}
          className="absolute top-12 left-10 text-leaf/20"
        >
          <Cube className="w-10 h-10" />
        </motion.div>

        <motion.div
          whileInView={{ 
            y: [0, 15, 0],
            rotate: [0, -15, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          viewport={{ once: false }}
          className="absolute bottom-24 right-10 text-leaf/20"
        >
          <Leaf className="w-12 h-12" />
        </motion.div>

        {/* Mystery Silhouette with Heavy Blur */}
        <div className="relative z-10">
           <motion.div 
             whileInView={{ 
               scale: [1, 1.05, 1],
               opacity: [0.3, 0.4, 0.3]
             }}
             transition={{
               duration: 4,
               repeat: Infinity,
               ease: "easeInOut"
             }}
             viewport={{ once: false }}
             className="blur-3xl"
           >
             <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-48 h-48 text-leaf"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
           </motion.div>
           
           {/* Secondary cleaner silhouette for subtle definition */}
           <div className="absolute inset-0 opacity-10 blur-sm pointer-events-none">
             <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-48 h-48 text-cream"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
           </div>
        </div>

        {/* Reveal Announcement Text */}
        <div className="absolute bottom-8 left-0 right-0 text-center px-4">
          <span className="text-cream/90 font-bold text-[10px] sm:text-xs tracking-[0.4em] uppercase block mb-1 drop-shadow-sm">
            Identité révélée
          </span>
          <span className="text-leaf font-black text-xs sm:text-sm tracking-[0.5em] uppercase">
            Bientôt
          </span>
        </div>
      </div>
    </motion.div>
  );
}
