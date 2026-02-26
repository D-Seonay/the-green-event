"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Bus, Car } from "lucide-react";
import WaveDivider from "../ui/WaveDivider";

const InfosSection = () => {
  const infos = [
    {
      icon: Calendar,
      title: "Dates",
      detail: "4 Juillet 2026",
    },
    {
      icon: MapPin,
      title: "Lieu",
      detail: "Vertou (44)",
      subtitle: "Parc de la Sèvre",
    },
    {
      icon: Bus,
      title: "Transports",
      detail: "Bus 28",
      subtitle: "Dépose à 3 minutes à pied",
    },
    {
      icon: Car,
      title: "Accès",
      detail: "Covoiturage",
      subtitle: "💡 Pensez au covoiturage !",
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
            {/* Real Google Map */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Map Container with organic shape */}
                <div className="absolute inset-0 bg-forest rounded-[40%_60%_60%_40%_/_60%_40%_60%_40%] overflow-hidden border-4 border-forest shadow-2xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2712.151791606953!2d-1.4845670873775743!3d47.17446457103324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4805e900623215b5%3A0xcabb2b7c631ca41b!2sTHE%20GREEN%20EVENT!5e0!3m2!1sfr!2sfr!4v1772036758885!5m2!1sfr!2sfr"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1) brightness(0.9)' }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps - The Green Event"
                  />
                </div>

                {/* Location Label */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-cream px-4 py-2 rounded-full shadow-lg border-2 border-forest z-10">
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
