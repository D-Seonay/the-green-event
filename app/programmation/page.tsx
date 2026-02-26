import React from 'react';
import { Metadata } from 'next';
import ProgrammationClient from './ProgrammationClient';

export const metadata: Metadata = {
  title: "Programmation | The Green Event 2026",
  description: "Découvrez tous les artistes et DJs à l'affiche de la 3ème édition du Green Event à Vertou. Une programmation électro, jazz et fusion au cœur du parc de la Sèvre.",
  openGraph: {
    title: "Programmation | The Green Event 2026",
    description: "Découvrez tous les artistes et DJs à l'affiche de la 3ème édition du Green Event à Vertou.",
    url: 'https://thegreenevent.fr/programmation',
  }
};

const ProgrammationPage = () => {
  return <ProgrammationClient />;
};

export default ProgrammationPage;
