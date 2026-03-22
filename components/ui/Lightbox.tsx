'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from '@/types';

interface LightboxProps {
  image: GalleryImage | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Lightbox = ({ image, onClose, onNext, onPrev }: LightboxProps) => {
  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (image) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [image]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10"
          onClick={onClose}
        >
          {/* Controls */}
          <button
            className="absolute top-6 right-6 text-cream/50 hover:text-cream z-[110] transition-colors"
            onClick={onClose}
            aria-label="Close lightbox"
          >
            <X size={40} strokeWidth={1.5} />
          </button>

          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 text-cream/50 hover:text-cream z-[110] transition-colors hidden md:block"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Previous image"
          >
            <ChevronLeft size={60} strokeWidth={1} />
          </button>

          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 text-cream/50 hover:text-cream z-[110] transition-colors hidden md:block"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Next image"
          >
            <ChevronRight size={60} strokeWidth={1} />
          </button>

          {/* Image Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-w-5xl max-h-[80vh]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-contain"
                priority
              />
            </div>
            
            {/* Metadata (Stealth style) */}
            <div className="mt-8 text-center space-y-2">
              <h3 className="text-xl font-display font-black text-cream uppercase tracking-widest italic">
                {image.alt}
              </h3>
              <p className="text-sm font-mono text-leaf uppercase tracking-[0.3em]">
                Green Event 2026 — Memories
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
