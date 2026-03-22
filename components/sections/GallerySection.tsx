'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { GALLERY_IMAGES } from '@/lib/data';
import CollageImage from '../ui/CollageImage';
import Lightbox from '../ui/Lightbox';
import WaveDivider from '../ui/WaveDivider';
import { GalleryImage } from '@/types';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const sectionRef = React.useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Lightbox navigation
  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = GALLERY_IMAGES.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % GALLERY_IMAGES.length;
    setSelectedImage(GALLERY_IMAGES[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedImage) return;
    const currentIndex = GALLERY_IMAGES.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    setSelectedImage(GALLERY_IMAGES[prevIndex]);
  };

  return (
    <section ref={sectionRef} id="gallery" className="relative py-24 md:py-40 bg-forest overflow-hidden">
      <WaveDivider variant="cream-to-forest" className="absolute top-0 w-full" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-32"
        >
          <div className="inline-block relative">
            <div className="absolute -inset-2 transform rotate-1 rounded-lg bg-leaf/20 blur-xl"></div>
            <h2 className="relative text-5xl md:text-8xl font-display font-black text-cream uppercase tracking-tighter italic">
              Souvenirs
            </h2>
          </div>
          <p className="mt-6 text-leaf font-mono uppercase tracking-[0.4em] text-sm md:text-base">
            Instants capturés au cœur du parc
          </p>
        </motion.div>

        {/* Collage Grid */}
        <div className="relative min-h-[600px] md:min-h-[1000px]">
          {/* Decorative Thread (Desktop only) */}
          <div className="absolute inset-0 pointer-events-none hidden md:block">
            <svg width="100%" height="100%" viewBox="0 0 1200 1000" fill="none" preserveAspectRatio="none">
              <motion.path
                d="M 100,100 Q 300,200 500,100 T 900,300 T 1100,600"
                stroke="#00A651"
                strokeWidth="2"
                strokeDasharray="8 12"
                opacity="0.2"
                style={{ pathLength: smoothProgress }}
              />
            </svg>
          </div>

          {/* Desktop Layout (Absolute Positioning for Collage feel) */}
          <div className="hidden md:block">
            {GALLERY_IMAGES.map((image, index) => {
              // Map images to specific positions to create the collage feel
              const positions = [
                { top: '5%', left: '10%', width: '25%' },
                { top: '15%', right: '15%', width: '20%' },
                { top: '40%', left: '35%', width: '30%' },
                { bottom: '10%', left: '5%', width: '22%' },
                { bottom: '20%', right: '10%', width: '28%' },
                { bottom: '5%', left: '45%', width: '18%' },
              ];
              const pos = positions[index % positions.length];

              return (
                <div 
                  key={image.id} 
                  className="absolute" 
                  style={{ 
                    top: pos.top, 
                    left: pos.left, 
                    right: pos.right,
                    width: pos.width 
                  }}
                >
                  <CollageImage 
                    image={image} 
                    onClick={setSelectedImage} 
                    index={index} 
                  />
                </div>
              );
            })}
          </div>

          {/* Mobile Layout (Simple 2-column grid) */}
          <div className="grid grid-cols-2 gap-4 md:hidden">
            {GALLERY_IMAGES.map((image, index) => (
              <CollageImage 
                key={image.id} 
                image={{...image, speed: 0.1}} // Reduced parallax for mobile
                onClick={setSelectedImage} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </div>

      <Lightbox 
        image={selectedImage} 
        onClose={() => setSelectedImage(null)} 
        onNext={handleNext}
        onPrev={handlePrev}
      />

      <WaveDivider variant="forest-to-cream" className="absolute bottom-0 w-full" flip />
    </section>
  );
};

export default GallerySection;
