"use client";

import { motion } from "framer-motion";
import { Leaf, Headphones, Users } from "lucide-react";

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
      {/* Content */}
      <div className="bg-cream py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display font-black text-forest text-4xl md:text-6xl mb-6">
              L&apos;ÉLECTRO AU GRAND AIR
            </h2>
            <p className="font-body text-forest/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              The Green Event, c&apos;est bien plus qu&apos;un festival. C&apos;est une expérience unique qui marie
              les sonorités électroniques avec la beauté naturelle du Parc de la Sèvre à Vertou.
              Un rendez-vous estival pour tous les amoureux de musique et de nature.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-16 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-forest mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
                  <value.icon className="w-12 h-12 md:w-16 md:h-16 text-cream" />
                </div>
                <h3 className="font-display font-black text-forest text-2xl md:text-3xl mb-4 uppercase tracking-tighter">
                  {value.title}
                </h3>
                <p className="font-body text-forest/70 text-lg leading-relaxed">
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
