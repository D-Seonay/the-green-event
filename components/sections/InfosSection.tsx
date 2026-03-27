"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin, Bus, Car } from "lucide-react";
import WaveDivider from "../ui/WaveDivider";
import Cube from "../ui/Cube";
import Leaf from "../ui/Leaf";

const FloatingIcon = ({ children, x, y, className }: { children: React.ReactNode, x: number[], y: number[], className: string }) => {
  const targetRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const yValue = useTransform(scrollYProgress, [0, 1], y);
  const xValue = useTransform(scrollYProgress, [0, 1], x);

  return (
    <motion.div ref={targetRef} style={{ y: yValue, x: xValue }} className={`absolute ${className} pointer-events-none opacity-10 hidden md:block`}>
      {children}
    </motion.div>
  );
};

const InfosSection = () => {
  const infos = [
    {
      icon: Calendar,
      title: "Date",
      detail: "4 Juillet 2026",
      rotation: -2,
      delay: 0.1,
    },
    {
      icon: MapPin,
      title: "Lieu",
      detail: "Vertou (44)",
      subtitle: "Parc de la Sèvre",
      rotation: 3,
      delay: 0.2,
    },
    {
      icon: Bus,
      title: "Transports",
      detail: "Bus 28",
      subtitle: "Dépose à 3 min",
      rotation: -3,
      delay: 0.3,
    },
    {
      icon: Car,
      title: "Accès",
      detail: "Covoiturage",
      subtitle: "💡 Pensez-y !",
      rotation: 2,
      delay: 0.4,
    },
  ];

  return (
    <section id="infos" className="relative overflow-hidden">
      {/* Wave Transition */}
      <WaveDivider variant="cream-to-forest" className="-mt-1 bg-forest" />

      <div className="bg-cream py-20 md:py-40 relative">
        {/* Floating background elements */}
        <FloatingIcon x={[-50, 50]} y={[-100, 100]} className="top-20 left-10">
          <Cube className="w-20 h-20 text-forest" />
        </FloatingIcon>
        <FloatingIcon x={[30, -30]} y={[50, -50]} className="bottom-40 right-10">
          <Leaf className="w-24 h-24 text-leaf" />
        </FloatingIcon>
        <FloatingIcon x={[-20, 20]} y={[-80, 80]} className="top-1/2 left-1/4">
          <Leaf className="w-12 h-12 text-forest" />
        </FloatingIcon>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center mb-24 md:mb-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-forest rounded-lg shadow-xl transform rotate-2"></div>
              <h2 className="relative bg-cream text-forest px-8 py-4 text-5xl md:text-8xl font-display font-black uppercase tracking-tighter italic">
                PRATIQUE
              </h2>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-12 text-forest/60 font-mono uppercase tracking-[0.4em] text-sm md:text-base text-center"
            >
              Toutes les clés du festival
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-7xl mx-auto">
            {/* Map Column */}
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Decorative background for map */}
              <div className="absolute -inset-4 bg-leaf/20 blur-3xl rounded-full"></div>
              <div className="absolute inset-0 bg-forest rounded-[2rem] transform rotate-3 scale-105 shadow-xl opacity-10"></div>
              
              <div className="relative aspect-square md:aspect-[4/3] max-w-2xl mx-auto">
                <div className="absolute inset-0 bg-forest rounded-3xl overflow-hidden border-8 border-forest shadow-2xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2712.151791606953!2d-1.4845670873775743!3d47.17446457103324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4805e900623215b5%3A0xcabb2b7c631ca41b!2sTHE%20GREEN%20EVENT!5e0!3m2!1sfr!2sfr!4v1772036758885!5m2!1sfr!2sfr"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(0.1) contrast(1.1) brightness(0.95)' }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps - The Green Event"
                  />
                </div>

                {/* Floating Map Label */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-leaf text-cream px-8 py-3 rounded-xl shadow-2xl transform -rotate-1 z-10 font-display font-black text-lg md:text-xl uppercase tracking-wider"
                >
                  VERTOU • PARC DE LA SÈVRE
                </motion.div>
              </div>
            </motion.div>

            {/* Info Cards Column */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 order-1 lg:order-2">
              {infos.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotate: info.rotation }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    delay: info.delay,
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                  className="group relative bg-forest p-8 rounded-2xl shadow-xl transition-all duration-300"
                >
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-leaf/10 rounded-bl-full pointer-events-none group-hover:bg-leaf/20 transition-colors"></div>
                  
                  <div className="flex flex-col h-full">
                    <div className="mb-6 w-12 h-12 rounded-xl bg-leaf flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <info.icon className="w-6 h-6 text-cream" />
                    </div>
                    
                    <div className="mt-auto">
                      <p className="font-mono text-leaf/60 text-xs uppercase tracking-[0.2em] mb-2">
                        {info.title}
                      </p>
                      <h3 className="font-display font-black text-cream text-2xl md:text-3xl leading-tight mb-2 uppercase tracking-tighter">
                        {info.detail}
                      </h3>
                      {info.subtitle && (
                        <p className="font-body text-cream/60 text-sm leading-relaxed">
                          {info.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfosSection;
