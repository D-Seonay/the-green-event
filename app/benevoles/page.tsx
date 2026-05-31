import { Metadata } from 'next';
import BenevolesClient from './BenevolesClient';

export const metadata: Metadata = {
  title: "Devenir Bénévole | The Green Fest Vertou",
  description: "Rejoins la Green Team ! Formulaire d'inscription pour devenir bénévole au festival The Green Fest à Vertou (44). Participe à une aventure humaine et éco-responsable.",
  openGraph: {
    title: "Devenir Bénévole | The Green Fest",
    description: "Rejoins la Green Team ! Formulaire d'inscription pour devenir bénévole au festival The Green Fest à Vertou.",
    url: 'https://thegreenfest.fr/benevoles',
    images: [
      {
        url: '/img/21062025-IMG_0684.jpg',
        width: 1200,
        height: 630,
        alt: 'Devenir Bénévole The Green Fest',
      },
    ],
  },
};

export default function BenevolesPage() {
  return <BenevolesClient />;
}
