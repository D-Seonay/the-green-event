'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Cube from '@/components/ui/Cube';
import Leaf from '@/components/ui/Leaf';
import useMediaQuery from '@/hooks/use-media-query';

const artists = [
  { name: 'DIANA KRALL', image: '/placeholder.svg', rotation: -3 },
  { name: 'GOGO PENGUIN', image: '/placeholder.svg', rotation: 2 },
  { name: 'HIROMI\'S SONICWONDER', image: '/placeholder.svg', rotation: 4 },
  { name: 'JALEN NGONDA', image: '/placeholder.svg', rotation: -2 },
  { name: 'CHRISTONE "KINGFISH" INGRAM', image: '/placeholder.svg', rotation: 3 },
  { name: 'LIZZ WRIGHT', image: '/placeholder.svg', rotation: -4 },
  { name: 'YUSSEF DAYES', image: '/placeholder.svg', rotation: 2 },
  { name: 'ROBERT GLASPER', image: '/placeholder.svg', rotation: -1 },
];

const ArtistCard = ({ artist, index }) => {
  const targetRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const isMobile = useMediaQuery('(max-width: 768px)'); // Tailwind's 'md' breakpoint
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100 * (index % 2 === 0 ? -1 : 1)]);
  const mobileRotation = isMobile ? artist.rotation > 0 ? 1 : -1 : artist.rotation; // Reduce tilt on mobile

  return (
    <motion.div
      ref={targetRef}
      style={{ y: isMobile ? 0 : y }} // Disable vertical parallax on mobile
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div
        className="bg-[#FEF7E0] p-4 rounded-lg shadow-lg"
        style={{ transform: `rotate(${mobileRotation}deg)` }}
      >
        <div className="relative w-full h-56">
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className="object-cover rounded-md filter grayscale" // duotone effect can be complex, using grayscale for now
          />
        </div>
        <h3 className="mt-4 text-center text-lg font-bold text-[#0a3f25]">
          {artist.name}
        </h3>
      </div>
    </motion.div>
  );
};

const ConnectingLine = () => {
  const targetRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start center', 'end center'],
  });

  const isMobile = useMediaQuery('(max-width: 768px)'); // Tailwind's 'md' breakpoint

  // This will animate the stroke-dashoffset to reveal the line
  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  if (isMobile) {
    return (
      <div ref={targetRef} className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px h-full overflow-hidden">
        <motion.div
          className="w-full bg-cream"
          style={{ height: pathLength }} // Animate height for vertical line
        />
      </div>
    );
  }

  return (
    <div ref={targetRef} className="absolute inset-0 w-full h-full overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <motion.path
          d="M -50,150 Q 150,50 300,150 T 600,150 T 900,150 T 1250,150 M -50,450 Q 150,350 300,450 T 600,450 T 900,450 T 1250,450"
          fill="none"
          stroke="#FEF7E0"
          strokeWidth="3"
          strokeDasharray="1"
          strokeDashoffset="0"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
};


const FloatingIcon = ({ children, x, y, className }) => {
    const targetRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ['start end', 'end start'],
    });
  
    const isMobile = useMediaQuery('(max-width: 768px)'); // Tailwind's 'md' breakpoint
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

  return (
    <section ref={sectionRef} className="relative bg-[#0a3f25] py-12 px-4 md:py-20 md:px-8 overflow-hidden">
      <div className="absolute top-8 left-8 z-10">
        <div className="relative">
          <div className="absolute -inset-2 bg-[#FEF7E0] transform -rotate-3 rounded-lg"></div>
          <h2 className="relative text-4xl md:text-6xl font-extrabold text-[#0a3f25] px-6 py-2">
            ARTISTES
          </h2>
        </div>
      </div>
      
      <ConnectingLine />

      <FloatingIcon x={[-100, 100]} y={[-50, 50]} className="top-1/4 left-1/4">
        <Cube className="w-12 h-12 text-[#FEF7E0] opacity-30" />
      </FloatingIcon>
      <FloatingIcon x={[50, -50]} y={[20, -20]} className="top-1/2 right-1/4">
        <Leaf className="w-16 h-16 text-[#FEF7E0] opacity-30" />
      </FloatingIcon>
       <FloatingIcon x={[-20, 20]} y={[50, -100]} className="bottom-1/4 left-1/3">
        <Leaf className="w-10 h-10 text-[#FEF7E0] opacity-30" />
      </FloatingIcon>
      <FloatingIcon x={[100, -100]} y={[-30, 30]} className="top-1/3 right-1/3">
        <Cube className="w-16 h-16 text-[#FEF7E0] opacity-30" />
      </FloatingIcon>


      <div className="relative max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-24 mt-48">
          {artists.map((artist, index) => (
            <ArtistCard key={artist.name} artist={artist} index={index} />
          ))}
        </div>

        <div className="mt-24 text-center">
          <Button variant="outline" size="lg" className="bg-[#FEF7E0] text-[#0a3f25] hover:bg-[#e9e2cf] group h-12">
            VOIR PLUS
            <ArrowDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}