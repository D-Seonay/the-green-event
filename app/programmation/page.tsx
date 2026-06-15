import React from 'react';
import { Metadata } from 'next';
import { getArtists } from '@/lib/strapi';
import ProgrammationClient from './ProgrammationClient';

export const metadata: Metadata = {
  title: "Programmation | The Green Fest 2026",
  description: "Découvrez tous les artistes et DJs à l'affiche de la 2ème édition de The Green Fest à Vertou. Une programmation électro, jazz et fusion au cœur du parc des Viviers.",
  openGraph: {
    title: "Programmation | The Green Fest 2026",
    description: "Découvrez tous les artistes et DJs à l'affiche de la 2ème édition de The Green Fest à Vertou.",
    url: 'https://thegreenfest.fr/programmation',
  }
};

const ProgrammationPage = async () => {
  const artists = await getArtists();
  return <ProgrammationClient artists={artists} />;
};

export default ProgrammationPage;
