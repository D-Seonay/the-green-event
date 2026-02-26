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
      title: "Artiste non trouvé | The Green Event",
    };
  }

  return {
    title: `${artist.name} | Programmation The Green Event 2026`,
    description: `Découvrez ${artist.name} au Green Event 2026. ${artist.bio.substring(0, 150)}...`,
    openGraph: {
      title: `${artist.name} | The Green Event`,
      description: artist.bio.substring(0, 160),
      url: `https://thegreenevent.fr/programmation/${slug}`,
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

  if (!artist) {
    notFound();
  }

  return <ArtistDetailClient artist={artist} />;
};

export default ArtistDetailPage;
