import Hero from '@/components/sections/Hero';
import ConceptSection from '@/components/sections/ConceptSection';
import { ARTISTS } from '@/lib/data';
import dynamic from 'next/dynamic';

const GallerySection = dynamic(() => import('@/components/sections/GallerySection'));
const ProgrammationSection = dynamic(() => import('@/components/sections/ProgrammationSection'));
const InfosSection = dynamic(() => import('@/components/sections/InfosSection'));
const SponsorsSection = dynamic(() => import('@/components/sections/Sponsors'));
const NewsletterSection = dynamic(() => import('@/components/sections/NewsletterSection'));

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Festival',
    'name': 'The Green Fest 2026',
    'startDate': '2026-07-04T14:00:00+02:00',
    'endDate': '2026-07-05T01:00:00+02:00',
    'location': {
      '@type': 'Place',
      'name': 'Parc des Viviers',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Boulevard Guichet Serex',
        'addressLocality': 'Vertou',
        'postalCode': '44120',
        'addressRegion': 'Loire-Atlantique',
        'addressCountry': 'FR'
      }
    },
    'description': 'Le festival électronique intergénérationnel et éco-responsable au cœur du parc des Viviers à Vertou. Une expérience immersive entre nature et musique.',
    'image': [
      'https://thegreenfest.fr/logo.png',
      'https://thegreenfest.fr/img/Photo_1.jpg'
    ],
    'organizer': {
      '@type': 'Organization',
      'name': 'The Green Event',
      'url': 'https://thegreenfest.fr',
      'logo': 'https://thegreenfest.fr/logo.png'
    },
    'performer': ARTISTS.map(artist => ({
      '@type': 'MusicGroup',
      'name': artist.name,
      'url': `https://thegreenfest.fr/programmation/${artist.slug}`
    })),
    'offers': {
      '@type': 'Offer',
      'url': 'https://thegreenfest.fr/boutique',
      'price': '0',
      'priceCurrency': 'EUR',
      'availability': 'https://schema.org/InStock',
      'validFrom': '2026-03-01'
    },
    'eventStatus': 'https://schema.org/EventScheduled',
    'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode'
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
