'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Instagram, Music, Cloud, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WaveDivider from '@/components/ui/WaveDivider';
import Cube from '@/components/ui/Cube';
import Leaf from '@/components/ui/Leaf';
import { Artist } from '@/types';

interface Props {
  artist: Artist;
}

const ArtistDetailClient = ({ artist }: Props) => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);
  const yTranslate = useTransform(scrollY, [0, 100], [0, 20]);

  return (
    <main className="bg-forest text-cream min-h-screen pt-24 pb-20 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[10%] opacity-20"
        >
          <Leaf className="w-24 h-24 text-leaf" />
        </motion.div>
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -15, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 left-[5%] opacity-20"
        >
          <Cube className="w-32 h-32 text-leaf" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            href="/programmation"
            className="inline-flex items-center gap-2 text-cream/70 hover:text-leaf transition-colors font-body font-bold group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            RETOUR À LA PROGRAMMATION
          </Link>
        </motion.div>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-20">
          {/* Left Side: Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotate: -5 }}
            animate={{ opacity: 1, x: 0, rotate: artist.rotation }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md lg:max-w-xl aspect-[4/5] lg:aspect-square"
          >
            <div className="absolute inset-0 bg-leaf/20 rounded-3xl -rotate-3 transform scale-105 blur-2xl"></div>
            <div className="relative h-full w-full rounded-3xl overflow-hidden border-4 border-cream/10 shadow-2xl">
              <Image
                src={artist.image}
                alt={artist.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-forest/20 mix-blend-multiply"></div>
            </div>
          </motion.div>

          {/* Right Side: Info */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-block px-4 py-1 bg-leaf text-cream font-display font-black text-sm uppercase tracking-widest rounded-full mb-6 shadow-lg">
                {artist.genre} • {artist.timeSlot}
              </div>

              <h1 className="text-6xl md:text-8xl font-display font-black text-cream leading-none mb-8 uppercase tracking-tighter">
                {artist.name}
              </h1>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {artist.socials.instagram && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 w-12 rounded-full border-cream/20 hover:border-leaf hover:bg-leaf hover:text-cream transition-all duration-300 p-0"
                    asChild
                  >
                    <a href={artist.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <Instagram className="w-5 h-5" />
                    </a>
                  </Button>
                )}
                {artist.socials.spotify && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 w-12 rounded-full border-cream/20 hover:border-leaf hover:bg-leaf hover:text-cream transition-all duration-300 p-0"
                    asChild
                  >
                    <a href={artist.socials.spotify} target="_blank" rel="noopener noreferrer" aria-label="Spotify">
                      <Music className="w-5 h-5" />
                    </a>
                  </Button>
                )}
                {artist.socials.soundcloud && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 w-12 rounded-full border-cream/20 hover:border-leaf hover:bg-leaf hover:text-cream transition-all duration-300 p-0"
                    asChild
                  >
                    <a href={artist.socials.soundcloud} target="_blank" rel="noopener noreferrer" aria-label="SoundCloud">
                      <Cloud className="w-5 h-5" />
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity, y: yTranslate }}
          className="hidden md:flex flex-col items-center gap-2 absolute bottom-18 left-1/2 -translate-x-1/2"
        >
          <span className="text-cream/40 text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap">
            Plus d&apos;informations
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-leaf"
          >
            <ArrowDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>

      <WaveDivider variant="forest-to-cream" className="mb-20" flip />

      {/* Biography Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-leaf mb-10 uppercase tracking-tighter">
              À PROPOS DE L&apos;ARTISTE
            </h2>
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="font-body text-cream/80 leading-relaxed text-xl md:text-2xl italic border-l-4 border-leaf pl-8 mb-12">
                &ldquo;{artist.bio}&rdquo;
              </p>

              <div className="grid md:grid-cols-2 gap-12 mt-16">
                <div>
                  <h3 className="font-display font-bold text-cream text-xl mb-4 uppercase">Le Style</h3>
                  <p className="text-cream/70 font-body leading-relaxed">
                    Un mélange unique de sonorités organiques et de rythmes contemporains,
                    parfaitement adapté au cadre naturel du festival. Chaque performance est
                    une exploration sonore qui dialogue avec l&apos;environnement.
                  </p>
                </div>
                <div>
                  <h3 className="font-display font-bold text-cream text-xl mb-4 uppercase">L&apos;Expérience</h3>
                  <p className="text-cream/70 font-body leading-relaxed">
                    Attendez-vous à une immersion totale. Entre virtuosité technique et
                    émotion brute, cet artiste propose une vision moderne et respectueuse
                    des racines musicales, pour un moment de partage inoubliable.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ArtistDetailClient;
