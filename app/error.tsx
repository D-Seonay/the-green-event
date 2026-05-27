'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, Home, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Error Boundary:', error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-forest text-cream px-4 relative overflow-hidden">
      {/* Background Mist */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(0,166,81,0.15)_0%,transparent_70%)] blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 text-center max-w-lg"
      >
        <div className="w-20 h-20 bg-leaf/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <AlertTriangle className="w-10 h-10 text-leaf" />
        </div>

        <h1 className="text-4xl md:text-6xl font-black mb-6 font-display uppercase tracking-tighter">
          Oups, un petit bug technique...
        </h1>
        
        <p className="font-body text-lg md:text-xl text-cream/70 leading-relaxed mb-10">
          Même la nature a ses imprévus. Nous avons été informés de ce problème et nous travaillons pour le résoudre.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => reset()}
            className="bg-leaf hover:bg-leaf/90 text-cream h-12 px-8 rounded-xl font-display font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <RefreshCcw className="w-5 h-5" />
            Réessayer
          </Button>
          
          <Button 
            asChild
            variant="outline"
            className="border-cream/20 text-cream hover:bg-cream/5 h-12 px-8 rounded-xl font-display font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Link href="/">
              <Home className="w-5 h-5" />
              Retour à l&apos;accueil
            </Link>
          </Button>
        </div>

        {error.digest && (
          <p className="mt-8 font-mono text-[10px] text-cream/30 uppercase tracking-[0.2em]">
            ID Erreur : {error.digest}
          </p>
        )}
      </motion.div>
    </main>
  );
}
