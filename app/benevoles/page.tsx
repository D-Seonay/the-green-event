import { Metadata } from 'next';
import BenevolesClient from './BenevolesClient';

export const metadata: Metadata = {
  title: "Devenir Bénévole | The Green Event Vertou",
  description: "Rejoins la Green Team ! Formulaire d'inscription pour devenir bénévole au festival The Green Event à Vertou (44). Participe à une aventure humaine et éco-responsable.",
  alternates: {
    canonical: '/benevoles',
  },
  openGraph: {
    title: "Devenir Bénévole | The Green Event",
    description: "Rejoins la Green Team ! Formulaire d'inscription pour devenir bénévole au festival The Green Event à Vertou.",
    url: 'https://thegreenfest.fr/benevoles',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Devenir Bénévole The Green Event',
      },
    ],
  },
};

export default function BenevolesPage() {
  return <BenevolesClient />;
}
