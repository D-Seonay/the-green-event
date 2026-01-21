"use client";

import { motion } from "framer-motion";
import { Leaf, Headphones, Users } from "lucide-react";
import WaveDivider from "./WaveDivider";

const ConceptSection = () => {
  const values = [
    {
      icon: Leaf,
      title: "Écologie",
      description: "Un festival éco-responsable, zéro déchet et en harmonie avec la nature.",
    },
    {
      icon: Headphones,
      title: "Musique",
      description: "Une programmation électronique éclectique, du lo-fi house au techno mélodique.",
    },
    {
      icon: Users,
      title: "Convivialité",
      description: "Un événement intergénérationnel où chacun trouve sa place.",
    },
  ];

  return (
    <section id="concept" className="relative">
      {/* Wave Transition */}
      <WaveDivider variant="cream-to-forest" className="-mt-1 bg-forest" />

      {/* Content */}
      <div className="bg-cream py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display font-black text-forest text-4xl md:text-6xl lg:text-7xl mb-6">
              L'ÉLECTRO AU GRAND AIR
            </h2>
            <p className="font-body text-forest/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              The Green Event, c'est bien plus qu'un festival. C'est une expérience unique qui marie 
              les sonorités électroniques avec la beauté naturelle du Parc de la Sèvre à Vertou. 
              Un rendez-vous estival pour tous les amoureux de musique et de nature.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-forest mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-10 h-10 md:w-12 md:h-12 text-cream" />
                </div>
                <h3 className="font-display font-bold text-forest text-xl md:text-2xl mb-3">
                  {value.title}
                </h3>
                <p className="font-body text-forest/70 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConceptSection;
