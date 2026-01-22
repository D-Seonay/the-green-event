'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import WaveDivider from '@/components/WaveDivider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/Footer';
import { PRODUCTS } from '@/lib/data';

type Category = 'all' | 'clothes' | 'accessories' | 'goodies';

const categories: { label: string; value: Category }[] = [
    { label: 'TOUT', value: 'all' },
    { label: 'VÊTEMENTS', value: 'clothes' },
    { label: 'ACCESSOIRES', value: 'accessories' },
    { label: 'GOODIES', value: 'goodies' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
        type: 'spring',
        stiffness: 100,
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
        duration: 0.2
    }
  }
};

const BoutiquePage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') {
      return PRODUCTS;
    }
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <Navbar />
      <main className="bg-[#0a3f25] text-[#FEF7E0]">
        <div className="container mx-auto px-4 py-24 sm:py-32">
          {/* Header */}
          <header className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display text-5xl md:text-7xl font-extrabold uppercase"
            >
              La Boutique Officielle
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 font-body text-lg md:text-xl text-[#FEF7E0]/80"
            >
              Soutenez le festival avec nos goodies éco-responsables.
            </motion.p>
          </header>
          
          <WaveDivider variant="forest-to-cream" />
          
          {/* Filters */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2 md:gap-4 my-8"
          >
            {categories.map((cat) => (
                <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`px-4 py-2 rounded-full font-body font-bold text-sm uppercase tracking-wider transition-all duration-300
                        ${activeCategory === cat.value 
                            ? 'bg-[#00A651] text-white shadow-lg' 
                            : 'bg-transparent border border-[#FEF7E0]/50 text-[#FEF7E0]/80 hover:bg-[#FEF7E0]/10 hover:text-white'
                        }
                    `}
                >
                    {cat.label}
                </button>
            ))}
          </motion.div>


          {/* Products Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 mt-16"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{ rotate: product.rotation }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="bg-[#FEF7E0] rounded-2xl shadow-lg text-[#052013] overflow-hidden group"
                >
                  <Link href={`/boutique/${product.id}`} className="block">
                    <div className="relative w-full h-64 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-400"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-2xl font-bold uppercase truncate">{product.name}</h3>
                      <p className="font-body text-3xl font-black text-[#00A651] my-2">{product.price}</p>
                      <p className="font-body text-sm text-[#052013]/70 mb-4 h-10">{product.description}</p>
                       <Button asChild className="w-full bg-[#0a3f25] text-white hover:bg-[#00A651] transition-colors font-bold uppercase tracking-wider">
                        <span>Voir détails</span>
                      </Button>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BoutiquePage;
