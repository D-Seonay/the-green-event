'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { PRODUCTS } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ProductCarousel } from '@/components/ui/ProductCarousel';

const ProductDetailPage = () => {
  const params = useParams();
  const productId = Number(params.id);
  const product = PRODUCTS.find(p => p.id === productId);

  if (!product || product.isMystery) {
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name,
    'description': product.longDescription,
    'image': product.image.startsWith('http') ? product.image : `https://thegreenfest.fr${product.image}`,
    'offers': {
      '@type': 'Offer',
      'url': `https://thegreenfest.fr/boutique/${product.id}`,
      'price': product.price.replace(/[^\d.]/g, '') || '0',
      'priceCurrency': 'EUR',
      'availability': 'https://schema.org/InStock'
    }
  };

  return (
    <main className="bg-forest text-cream min-h-screen pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/boutique" className="inline-flex items-center gap-2 font-body text-cream/80 hover:text-white transition-colors group mb-8">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Retour à la boutique
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: Image/Carousel */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            <ProductCarousel 
              images={product.gallery && product.gallery.length > 0 ? product.gallery : [product.image]} 
              productName={product.name} 
            />
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
            <p className="font-body text-4xl font-bold text-leaf my-3" dangerouslySetInnerHTML={{ __html: product.price }} />
            
            <p className="font-body text-base text-cream/80 leading-relaxed my-3">
              {product.longDescription}
            </p>

            {/* Eco-Impact Section */}
            <div className="bg-cream/10 rounded-lg p-4 my-5">
              <h3 className="font-display font-bold text-base mb-2">Impact Écologique</h3>
              <ul className="space-y-1">
                  {product.ecoSpecs.map((spec, index) => (
                      <li key={index} className="flex items-center gap-2 font-body text-sm">
                          <CheckCircle className="w-4 h-4 text-leaf" />
                          <span>{spec}</span>
                      </li>
                  ))}
              </ul>
            </div>

            {/* CTA or Widget */}
            {product.helloAssoSlug ? (
              <div className="mt-8 space-y-6">
                <iframe
                  id="haWidget"
                  allowTransparency={true}
                  scrolling="auto"
                  src={`https://www.helloasso.com/associations/the-green-event/boutiques/${product.helloAssoSlug}/widget`}
                  style={{ width: '100%', height: '750px', border: 'none' }}
                  onLoad={() => {
                    if (typeof window !== 'undefined') {
                      window.addEventListener('message', (e) => {
                        const dataHeight = e.data.height;
                        const haWidgetElement = document.getElementById('haWidget') as HTMLIFrameElement | null;
                        if (haWidgetElement && dataHeight > parseFloat(haWidgetElement.height || '0')) {
                          haWidgetElement.height = dataHeight + 'px';
                        }
                      });
                    }
                  }}
                />
              </div>
            ) : (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="mt-auto"
                >
                    <Button asChild size="lg" className="w-full h-auto py-3 bg-leaf text-cream hover:bg-leaf/90 transition-colors text-lg font-bold uppercase tracking-wider shadow-lg">
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
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
