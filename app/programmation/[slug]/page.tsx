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
