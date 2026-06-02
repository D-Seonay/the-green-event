'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Calendar } from 'lucide-react';
import WaveDivider from '../ui/WaveDivider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);
  const yTranslate = useTransform(scrollY, [0, 100], [0, 20]);

  const eventDetails = {
    title: "The Green Fest 2026",
    description: "Festival électronique intergénérationnel et éco-responsable au cœur du parc des Viviers à Vertou.",
    location: "Parc des Viviers, Boulevard Guichet Serex, 44120 Vertou",
    startTime: "20260704T140000Z",
    endTime: "20260705T010000Z",
  };

  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}&dates=${eventDetails.startTime}/${eventDetails.endTime}`;

  const iCalContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${eventDetails.startTime}
DTEND:${eventDetails.endTime}
SUMMARY:${eventDetails.title}
DESCRIPTION:${eventDetails.description}
LOCATION:${eventDetails.location}
END:VEVENT
END:VCALENDAR`;

  const downloadICal = () => {
    const blob = new Blob([iCalContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'the-green-fest.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0a3f25]">
      {/* Layer 0: Full-Screen Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/logo.png"
        aria-hidden="true"
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/theGreenEvent.MP4" type="video/mp4" />
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
          <span className="block text-3xl md:text-5xl mb-2 text-leaf opacity-90 tracking-widest">Le Festival</span>
          THE GREEN FEST
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-3xl font-display font-bold text-[#00A651] mb-12 tracking-[0.2em] uppercase"
        >
          4 JUILLET 2026 • VERTOU
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center z-30"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="bg-leaf hover:bg-leaf/90 text-cream px-10 py-5 rounded-xl font-display font-black uppercase tracking-wider flex items-center gap-3 shadow-xl transition-all hover:scale-105 active:scale-95">
                <Calendar className="w-6 h-6" />
                M&apos;en souvenir
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#FEF7E0] border-2 border-forest/20 rounded-xl p-2 min-w-[200px] z-50">
              <DropdownMenuItem 
                className="font-display font-bold uppercase tracking-tight p-3 cursor-pointer text-forest hover:bg-leaf hover:text-cream rounded-lg transition-colors focus:bg-leaf focus:text-cream"
                onClick={() => window.open(googleCalendarUrl, '_blank')}
              >
                Google Calendar
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="font-display font-bold uppercase tracking-tight p-3 cursor-pointer text-forest hover:bg-leaf hover:text-cream rounded-lg transition-colors focus:bg-leaf focus:text-cream"
                onClick={downloadICal}
              >
                Apple / Outlook (.ics)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity, y: yTranslate }}
          className="hidden md:flex flex-col items-center gap-2 absolute bottom-24 left-1/2 -translate-x-1/2 z-20"
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

      <WaveDivider variant="forest-to-cream" className="absolute bottom-0 left-0 w-full" flip />

      {/* Layer 3: Solid Mask for section transition */}
      {/* <div className="absolute bottom-0 left-0 w-full z-15 pointer-events-none">
        <svg
          className="relative block w-full h-[120px] md:h-[180px]"
          viewBox="0 0 1440 180"
          fill="#0a3f25"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,180 L1440,180 L1440,60 C1200,20 960,120 720,60 C480,0 240,100 0,60 Z" />
        </svg>
      </div> */}
    </section>
  );
};

export default Hero;
