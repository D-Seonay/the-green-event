import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ARTISTS } from '@/lib/data';
import ArtistDetailClient from './ArtistDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artist = ARTISTS.find((a) => a.slug === slug);

  if (!artist) {
    return {
      title: "Artiste non trouvé | The Green Fest",
    };
  }

  return {
    title: `${artist.name} | Programmation The Green Fest 2026`,
    description: `Découvrez ${artist.name} au Green Fest 2026. ${artist.bio.substring(0, 150)}...`,
    openGraph: {
      title: `${artist.name} | The Green Fest`,
      description: artist.bio.substring(0, 160),
      url: `https://thegreenfest.fr/programmation/${slug}`,
      images: [
        {
          url: artist.image,
          width: 800,
          height: 800,
          alt: artist.name,
        },
      ],
    },
  };
}

const ArtistDetailPage = async ({ params }: Props) => {
  const { slug } = await params;
  const artist = ARTISTS.find((a) => a.slug === slug);

  if (!artist || artist.isMystery) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    'name': artist.name,
    'description': artist.bio,
    'genre': artist.genre,
    'image': `https://thegreenfest.fr${artist.image}`,
    'url': `https://thegreenfest.fr/programmation/${slug}`,
    'sameAs': Object.values(artist.socials).filter(Boolean),
    'event': {
      '@type': 'Festival',
      'name': 'The Green Fest 2026',
      'startDate': '2026-07-04T14:00:00+02:00',
      'endDate': '2026-07-05T01:00:00+02:00',
      'eventStatus': 'https://schema.org/EventScheduled',
      'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode',
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
      'offers': {
        '@type': 'Offer',
        'url': 'https://thegreenfest.fr/boutique',
        'price': '0',
        'priceCurrency': 'EUR',
        'availability': 'https://schema.org/InStock',
        'validFrom': '2026-03-01'
      },
      'performer': {
        '@type': 'MusicGroup',
        'name': artist.name,
        'url': `https://thegreenfest.fr/programmation/${slug}`
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtistDetailClient artist={artist} />
    </>
  );
};

export default ArtistDetailPage;
