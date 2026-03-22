import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import ConceptSection from '@/components/sections/ConceptSection';
import GallerySection from '@/components/sections/GallerySection';
import ProgrammationSection from '@/components/sections/ProgrammationSection';
import InfosSection from '@/components/sections/InfosSection';
import { ARTISTS } from '@/lib/data';

const SponsorsSection = dynamic(() => import('@/components/sections/Sponsors'));
const NewsletterSection = dynamic(() => import('@/components/sections/NewsletterSection'));

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Festival',
    'name': 'The Green Event 2026',
    'startDate': '2026-07-04T14:00:00+02:00',
    'endDate': '2026-07-05T01:00:00+02:00',
    'location': {
      '@type': 'Place',
      'name': 'Parc de la Sèvre',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Vertou',
        'postalCode': '44120',
        'addressRegion': 'Loire-Atlantique',
        'addressCountry': 'FR'
      }
    },
    'description': 'Le festival électronique intergénérationnel et éco-responsable au cœur du parc de la Sèvre à Vertou.',
    'image': 'https://thegreenevent.fr/logo.png',
    'performer': ARTISTS.map(artist => ({
      '@type': 'MusicGroup',
      'name': artist.name,
      'url': `https://thegreenevent.fr/programmation/${artist.slug}`
    })),
    'offers': {
      '@type': 'Offer',
      'url': 'https://thegreenevent.fr/boutique',
      'availability': 'https://schema.org/InStock'
    }
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <ConceptSection />
      <GallerySection />
      <ProgrammationSection />
      <InfosSection />
      <SponsorsSection />
      <NewsletterSection />
    </main>
  );
}
