import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTitle = ({ children, className = '' }: SectionTitleProps) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <motion.div
        className="absolute -inset-2 bg-cream transform -rotate-3 rounded-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
        viewport={{ once: true }}
      />
      <motion.h2
        className="relative text-4xl md:text-6xl font-extrabold text-forest px-6 py-2"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', delay: 0.3 }}
        viewport={{ once: true }}
      >
        {children}
      </motion.h2>
    </div>
  );
};

export default SectionTitle;
