'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { PRODUCTS } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/Footer';

const ProductDetailPage = () => {
  const params = useParams();
  const productId = Number(params.id);
  const product = PRODUCTS.find(p => p.id === productId);

  if (!product) {
    notFound();
  }

  const bounceTransition = {
    y: {
      duration: 0.4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeOut"
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-[#0a3f25] text-[#FEF7E0] min-h-screen">
        <div className="container mx-auto px-4 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/boutique" className="inline-flex items-center gap-2 font-body text-[#FEF7E0]/80 hover:text-white transition-colors group mb-8">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Retour à la boutique
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column: Image */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative aspect-square"
            >
              <div className="absolute inset-0 bg-[#FEF7E0] rounded-[4rem] transform -rotate-6 transition-all duration-500 hover:rotate-0 hover:scale-105 shadow-2xl">
                 <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-[4rem] mix-blend-multiply"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
              </div>
            </motion.div>

            {/* Right Column: Info */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                className="flex flex-col"
            >
              <h1 className="font-display text-4xl md:text-6xl font-extrabold uppercase break-words">
                {product.name}
              </h1>
              <p className="font-body text-4xl font-black text-[#00A651] my-3">{product.price}</p>
              
              <p className="font-body text-base text-[#FEF7E0]/80 leading-relaxed my-3">
                {product.longDescription}
              </p>

              {/* Eco-Impact Section */}
              <div className="bg-[#FEF7E0]/10 rounded-lg p-4 my-5">
                <h3 className="font-display font-bold text-base mb-2">Impact Écologique</h3>
                <ul className="space-y-1">
                    {product.ecoSpecs.map((spec, index) => (
                        <li key={index} className="flex items-center gap-2 font-body text-sm">
                            <CheckCircle className="w-4 h-4 text-[#00A651]" />
                            <span>{spec}</span>
                        </li>
                    ))}
                </ul>
              </div>

              {/* CTA */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="mt-auto"
              >
                  <Button asChild size="lg" className="w-full h-auto py-3 bg-[#00A651] text-white hover:bg-[#00A651]/90 transition-colors text-lg font-bold uppercase tracking-wider shadow-lg">
                    <Link href={product.helloAssoUrl} target="_blank" rel="noopener noreferrer">
                       <motion.span
                         animate={{ y: [-2, 2] }}
                         transition={bounceTransition}
                       >
                        Acheter sur HelloAsso
                       </motion.span>
                    </Link>
                  </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
