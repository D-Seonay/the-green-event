'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';

const CookieBanner = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsOpen(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[100] md:max-w-md"
        >
          <div className="relative overflow-hidden bg-forest border-2 border-cream/10 rounded-3xl shadow-2xl p-6 md:p-8">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-leaf/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-leaf/20 flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-leaf" />
                </div>
                <h3 className="font-display font-black text-cream text-xl uppercase tracking-tighter">
                  Cookies & Nature
                </h3>
              </div>
              
              <p className="font-body text-cream/70 text-sm md:text-base leading-relaxed mb-6">
                On utilise quelques cookies pour que ton expérience au Green Event soit au top. 
                C&apos;est promis, on respecte ta vie privée autant que la forêt de Vertou. 🌲
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleAccept}
                  className="bg-leaf hover:bg-leaf/90 text-cream font-display font-bold uppercase tracking-widest text-xs h-11 flex-1 rounded-xl shadow-lg transition-all active:scale-95"
                >
                  Accepter
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleDecline}
                  className="border-cream/20 text-cream/60 hover:bg-cream/5 hover:text-cream font-display font-bold uppercase tracking-widest text-xs h-11 flex-1 rounded-xl transition-all active:scale-95"
                >
                  Refuser
                </Button>
              </div>
              
              <div className="mt-4 text-center">
                <Link 
                  href="/mentions-legales" 
                  className="text-[10px] font-mono text-cream/30 hover:text-leaf uppercase tracking-widest transition-colors"
                >
                  En savoir plus sur tes données
                </Link>
              </div>
            </div>

            {/* Close button (optional) */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1 text-cream/20 hover:text-cream transition-colors"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
