'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center bg-forest text-cream px-4 relative overflow-hidden">
      <div className="z-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-8xl md:text-9xl font-black mb-4 font-display"
        >
          404
        </motion.h1>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold mb-6 font-display"
        >
          Perdu dans la forêt ?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto mb-10 opacity-80"
        >
          Même les meilleurs explorateurs s&apos;égarent parfois. Retrouvez votre chemin vers la scène principale.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link 
            href="/"
            className="inline-block bg-leaf text-cream font-bold py-3 px-8 rounded-full transition-transform hover:scale-105"
          >
            Retour à l&apos;accueil
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
