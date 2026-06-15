'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import Cube from '@/components/ui/Cube';
import { cn } from '@/lib/utils';

interface ComingSoonProductCardProps {
  className?: string;
  rotation?: number;
}

/**
 * ComingSoonProductCard Component
 * 
 * A premium "Coming Soon" product card for the shop section.
 * Features a tilted layout, floating animations, and mystery visuals.
 */
const ComingSoonProductCard = ({ className, rotation = -2 }: ComingSoonProductCardProps) => {
  return (
    <motion.div
      initial={{ rotate: rotation }}
      whileHover={{ scale: 1.05, rotate: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "bg-cream p-3 sm:p-4 rounded-lg shadow-lg transition-all duration-500 hover:shadow-2xl hover:bg-cream/95 overflow-hidden cursor-default",
        className
      )}
    >
      <div className="relative w-full h-48 sm:h-64 bg-forest rounded-md flex flex-col items-center justify-center overflow-hidden group">
        {/* Badge: COLLECTION 2026 */}
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-leaf hover:bg-leaf/90 text-white font-display border-none px-3 py-1 text-[10px] sm:text-xs tracking-wider">
            COLLECTION 2026
          </Badge>
        </div>

        {/* Floating & Pulsing Cube logo */}
        <motion.div
          animate={{
            y: [0, -12, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-cream/20 relative z-0"
        >
          <Cube className="w-20 h-20 sm:w-28 sm:h-28" />
          
          {/* Subtle Glow/Pulse effect behind the cube */}
          <motion.div
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-cream/10 rounded-full blur-2xl -z-10"
          />
        </motion.div>

        {/* BIENTÔT DISPONIBLE text at the bottom of image area */}
        <div className="absolute bottom-4 w-full text-center px-2">
          <motion.span 
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-cream/60 font-display font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase italic"
          >
            BIENTÔT DISPONIBLE
          </motion.span>
        </div>
        
        {/* Decorative corner element */}
        <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-leaf/20 rounded-full blur-xl" />
        <div className="absolute -top-6 -left-6 w-12 h-12 bg-leaf/20 rounded-full blur-xl" />
      </div>

      {/* Product Info (Skeleton Style for Mystery) */}
      <div className="mt-4 space-y-2 px-1">
        <h3 className="text-sm sm:text-lg font-display font-bold text-forest uppercase tracking-tighter">
          Objet Mystère
        </h3>
        <div className="flex justify-between items-center">
          <p className="text-[10px] sm:text-xs font-mono italic text-forest/60 uppercase">
            Prix à venir
          </p>
          <div className="h-1 w-12 bg-leaf/30 rounded-full" />
        </div>
      </div>
    </motion.div>
  );
};

export default ComingSoonProductCard;
