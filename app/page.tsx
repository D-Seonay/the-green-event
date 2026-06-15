import Hero from '@/components/sections/Hero';
import ConceptSection from '@/components/sections/ConceptSection';
import { getArtists, getEventInfo, getPartners } from '@/lib/strapi';
import dynamic from 'next/dynamic';

const GallerySection = dynamic(() => import('@/components/sections/GallerySection'));
const ProgrammationSection = dynamic(() => import('@/components/sections/ProgrammationSection'));
const InfosSection = dynamic(() => import('@/components/sections/InfosSection'));
const SponsorsSection = dynamic(() => import('@/components/sections/Sponsors'));
const NewsletterSection = dynamic(() => import('@/components/sections/NewsletterSection'));

export default async function Home() {
  // Données dynamiques issues de Strapi (avec repli statique géré dans lib/strapi).
  const [event, artists, sponsors] = await Promise.all([
    getEventInfo(),
    getArtists(),
    getPartners(),
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Festival',
    'name': event.name,
    'startDate': event.startDate,
    'endDate': event.endDate,
    'location': {
      '@type': 'Place',
      'name': event.locationName ?? 'Parc des Viviers',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Boulevard Guichet Serex',
        'addressLocality': 'Vertou',
        'postalCode': '44120',
        'addressRegion': 'Loire-Atlantique',
        'addressCountry': 'FR'
      }
    },
    'description': event.description ?? 'Le festival électronique intergénérationnel et éco-responsable au cœur du parc des Viviers à Vertou. Une expérience immersive entre nature et musique.',
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
    'performer': artists.map(artist => ({
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
      <Hero event={event} />
      <ConceptSection />
      <GallerySection />
      <ProgrammationSection artists={artists} />
      <InfosSection event={event} />
      <SponsorsSection sponsors={sponsors} />
      <NewsletterSection />
    </main>
  );
}
