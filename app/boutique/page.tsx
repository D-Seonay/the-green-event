'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import WaveDivider from '@/components/WaveDivider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/Footer';

const PRODUCTS = [
  {
    id: 1,
    name: 'T-Shirt Green 2026',
    price: '20€',
    description: 'Coton bio, tout doux, tout vert.',
    image: '/placeholder.svg',
    rotation: -2.5,
    helloAssoUrl: 'https://www.helloasso.com',
  },
  {
    id: 2,
    name: 'Eco-Cup Collector',
    price: '2€',
    description: 'Le gobelet réutilisable officiel.',
    image: '/placeholder.svg',
    rotation: 3,
    helloAssoUrl: 'https://www.helloasso.com',
  },
  {
    id: 3,
    name: 'Tote Bag Nature',
    price: '10€',
    description: 'Fait en matériaux recyclés.',
    image: '/placeholder.svg',
    rotation: 1.5,
    helloAssoUrl: 'https://www.helloasso.com',
  },
  {
    id: 4,
    name: 'Le Bob du Festival',
    price: '15€',
    description: 'Indispensable pour chiller au soleil.',
    image: '/placeholder.svg',
    rotation: -4,
    helloAssoUrl: 'https://www.helloasso.com',
  },
    {
    id: 5,
    name: 'Affiche Officielle',
    price: '12€',
    description: 'Le visuel de l\'édition 2026.',
    image: '/placeholder.svg',
    rotation: 2,
    helloAssoUrl: 'https://www.helloasso.com',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
        type: 'spring',
        stiffness: 100,
    }
},
};

const BoutiquePage = () => {
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

          {/* Products Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 mt-16"
          >
            {PRODUCTS.map((product) => (
              <motion.div
                key={product.id}
                variants={cardVariants}
                style={{ rotate: product.rotation }}
                whileHover={{ scale: 1.05, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-[#FEF7E0] rounded-2xl shadow-lg overflow-hidden text-[#052013]"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover mix-blend-multiply"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-bold uppercase">{product.name}</h3>
                  <p className="font-body text-3xl font-black text-[#00A651] my-2">{product.price}</p>
                  <p className="font-body text-sm text-[#052013]/70 mb-4">{product.description}</p>
                  <Button asChild className="w-full bg-[#0a3f25] text-white hover:bg-[#00A651] transition-colors font-bold uppercase tracking-wider">
                    <Link href={product.helloAssoUrl} target="_blank" rel="noopener noreferrer">
                      Acheter (HelloAsso)
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BoutiquePage;
