'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FALLBACK_ARTISTS as ARTISTS } from '@/lib/fallback';
import FloatingElement from '@/components/FloatingElements';
import Leaf from '@/components/ui/Leaf';
import Cube from '@/components/ui/Cube';

export default function NotFound() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArtists = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return ARTISTS.filter(artist => 
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.genre?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center bg-forest text-cream px-4 relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Mist layers */}
        <motion.div 
          animate={{ 
            x: [-100, 100],
            opacity: [0.1, 0.2, 0.1] 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-0 left-0 w-[200%] h-full bg-[radial-gradient(circle,rgba(254,247,224,0.1)_0%,transparent_70%)] blur-3xl"
        />
        
        <motion.div 
          animate={{ 
            x: [100, -100],
            opacity: [0.05, 0.15, 0.05] 
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute bottom-0 right-0 w-[200%] h-full bg-[radial-gradient(circle,rgba(254,247,224,0.08)_0%,transparent_70%)] blur-3xl"
        />

        {/* Floating elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-[15%] left-[10%]"
        >
          <FloatingElement component={Leaf} size="md" blur />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -15, 0]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-[60%] left-[15%]"
        >
          <FloatingElement component={Cube} size="sm" />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -40, 0],
            rotate: [0, 20, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-[20%] right-[15%]"
        >
          <FloatingElement component={Leaf} size="lg" blur />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, 25, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute bottom-[20%] right-[10%]"
        >
          <FloatingElement component={Cube} size="md" blur />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-[40%] right-[30%] opacity-20"
        >
          <FloatingElement component={Leaf} size="sm" />
        </motion.div>
      </div>

      <div className="z-10 text-center w-full max-w-4xl mx-auto py-20">
        {/* Search Bar (always visible) */}
        <div className="mb-12 max-w-md mx-auto relative px-4">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un artiste..." 
            className="w-full bg-cream/10 border-2 border-transparent focus:border-leaf rounded-full py-4 px-6 text-cream placeholder:text-cream/40 outline-none transition-all shadow-xl"
          />
          <button className="absolute right-6 top-1/2 -translate-y-1/2 bg-leaf p-2 rounded-full hover:scale-110 transition-transform">
            <svg className="w-5 h-5 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!searchTerm.trim() ? (
            <motion.div
              key="error-message"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-8xl md:text-9xl font-black mb-4 font-display">404</h1>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 font-display">Perdu dans la forêt ?</h2>
              <p className="max-w-md mx-auto mb-10 opacity-80">
                Même les meilleurs explorateurs s&apos;égarent parfois. Retrouvez votre chemin vers la scène principale.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/" className="bg-leaf text-cream px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-leaf/20">
                  Retour à l&apos;accueil
                </Link>
                <Link href="/programmation" className="border-2 border-cream text-cream px-8 py-3 rounded-full font-bold hover:bg-cream hover:text-forest transition-all">
                  Programmation
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="search-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="px-4"
            >
              {filteredArtists.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredArtists.map((artist, idx) => (
                    <Link 
                      key={artist.slug} 
                      href={`/programmation/${artist.slug}`}
                      className="group relative"
                    >
                      <motion.div
                        initial={{ opacity: 0, rotate: 0 }}
                        animate={{ opacity: 1, rotate: artist.rotation || (idx % 2 === 0 ? 3 : -3) }}
                        className="bg-cream p-3 rounded-xl shadow-xl transition-transform group-hover:scale-105"
                      >
                        <div className="aspect-square relative overflow-hidden rounded-lg mb-3">
                          <Image src={artist.image} alt={artist.name} fill className="object-cover" />
                        </div>
                        <h3 className="text-forest font-bold text-sm md:text-base">{artist.name}</h3>
                        <p className="text-forest/60 text-xs uppercase tracking-wider">{artist.genre}</p>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-xl opacity-60">Aucun artiste trouvé pour &quot;{searchTerm}&quot;</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
