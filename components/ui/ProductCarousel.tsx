'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';
import Lightbox from '@/components/ui/Lightbox';

interface ProductCarouselProps {
  images: string[];
  productName: string;
}

export function ProductCarousel({ images, productName }: ProductCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [mainViewportRef, emblaMainApi] = useEmblaCarousel({ loop: true });
  const [thumbViewportRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on('select', onSelect);
    emblaMainApi.on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  const toggleLightbox = () => setIsLightboxOpen(!isLightboxOpen);

  const navigateLightbox = (direction: number) => {
    if (!emblaMainApi) return;
    if (direction > 0) emblaMainApi.scrollNext();
    else emblaMainApi.scrollPrev();
  };

  const currentGalleryImage = isLightboxOpen ? {
    id: selectedIndex.toString(),
    src: images[selectedIndex],
    alt: `${productName} - vue ${selectedIndex + 1}`,
    tilt: 0,
    speed: 0,
    depth: 0
  } : null;

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Main Image */}
        <div className="overflow-hidden bg-cream rounded-[2rem] sm:rounded-[4rem] shadow-2xl relative group" ref={mainViewportRef}>
          <div className="flex">
            {images.map((src, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 relative aspect-square">
                <motion.div 
                  className="w-full h-full relative overflow-hidden cursor-zoom-in"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                  onClick={toggleLightbox}
                >
                  <Image
                    src={src}
                    alt={`${productName} - view ${index + 1}`}
                    fill
                    className="object-cover mix-blend-multiply"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </motion.div>
              </div>
            ))}
          </div>
          {/* Eco Badge Overlay */}
          <div className="absolute top-6 right-6 z-10 pointer-events-none">
              <span className="bg-leaf text-cream px-4 py-1 rounded-full font-display font-bold text-sm shadow-lg">100% BIO</span>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="overflow-hidden" ref={thumbViewportRef}>
          <div className="flex gap-3 px-2">
            {images.map((src, index) => (
              <button
                key={index}
                onClick={() => onThumbClick(index)}
                className={cn(
                  "relative flex-[0_0_80px] aspect-square rounded-xl overflow-hidden bg-cream transition-all duration-300 border-2",
                  index === selectedIndex ? "border-leaf scale-105" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover mix-blend-multiply"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <Lightbox 
        image={currentGalleryImage}
        onClose={() => setIsLightboxOpen(false)}
        onNext={() => navigateLightbox(1)}
        onPrev={() => navigateLightbox(-1)}
      />
    </>
  );
}
