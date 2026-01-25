"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Car } from "lucide-react";
import WaveDivider from "../ui/WaveDivider";

const InfosSection = () => {
  const infos = [
    {
      icon: Calendar,
      title: "Dates",
      detail: "4 Juillet 2026",
      subtitle: "🎶🌿The Green Fest – 3ᵉ édition 🎶🌿",
    },
    {
      icon: MapPin,
      title: "Lieu",
      detail: "Vertou (44)",
      subtitle: "Parc de la Sèvre",
    },
    {
      icon: Car,
      title: "Accès",
      detail: "Pensez covoiturage !",
      subtitle: "Navettes depuis Nantes",
    },
  ];

  return (
    <section id="infos" className="relative">
      {/* Wave Transition */}
      <WaveDivider variant="cream-to-forest" className="-mt-1 bg-forest" />

      <div className="bg-cream py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display font-black text-forest text-4xl md:text-6xl mb-4">
              INFOS PRATIQUES
            </h2>
            <p className="font-body text-forest/70 text-lg md:text-xl">
              Tout ce qu&apos;il faut savoir pour profiter au maximum
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Stylized Map */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Map Background */}
                <div className="absolute inset-0 bg-forest rounded-[40%_60%_60%_40%_/_60%_40%_60%_40%] overflow-hidden">
                  {/* Stylized Map Pattern */}
                  <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 200">
                    {/* River/Path lines */}
                    <path
                      d="M20,100 Q50,80 80,100 T140,100 T200,80"
                      fill="none"
                      stroke="hsl(var(--cream))"
                      strokeWidth="3"
                    />
                    <path
                      d="M0,140 Q40,120 80,140 T160,130 T200,150"
                      fill="none"
                      stroke="hsl(var(--cream))"
                      strokeWidth="2"
                    />
                    {/* Dots representing trees/nature */}
                    {[...Array(12)].map((_, i) => (
                      <circle
                        key={i}
                        cx={30 + (i % 4) * 45}
                        cy={40 + Math.floor(i / 4) * 50}
                        r="4"
                        fill="hsl(var(--cream))"
                      />
                    ))}
                  </svg>

                  {/* Location Pin */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      className="relative"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <MapPin className="w-12 h-12 md:w-16 md:h-16 text-leaf" fill="hsl(var(--leaf))" />
                    </motion.div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-forest/50 rounded-full blur-sm" />
                  </div>
                </div>

                {/* Location Label */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-cream px-4 py-2 rounded-full shadow-lg border-2 border-forest">
                  <p className="font-display font-bold text-forest text-sm whitespace-nowrap">
                    Vertou - Parc de la Sèvre
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Info Blocks */}
            <div className="space-y-6 md:space-y-8">
              {infos.map((info, index) => (
                <motion.div
                  key={info.title}
                  className="flex items-start gap-4 md:gap-6 group"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-forest flex items-center justify-center group-hover:bg-leaf transition-colors duration-300">
                    <info.icon className="w-7 h-7 md:w-8 md:h-8 text-cream" />
                  </div>
                  <div>
                    <p className="font-body text-forest/60 text-sm uppercase tracking-wider mb-1">
                      {info.title}
                    </p>
                    <h3 className="font-display font-bold text-forest text-xl md:text-2xl">
                      {info.detail}
                    </h3>
                    <p className="font-body text-forest/70">
                      {info.subtitle}
                    </p>
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
