import { Metadata } from 'next';
import BoutiqueClient from './BoutiqueClient';

export const metadata: Metadata = {
  title: "Boutique Officielle | The Green Fest",
  description: "Soutenez le festival The Green Fest avec nos goodies et vêtements éco-responsables. Découvrez notre collection exclusive.",
  openGraph: {
    title: "Boutique Officielle | The Green Fest",
    description: "Soutenez le festival The Green Fest avec nos goodies et vêtements éco-responsables.",
    url: 'https://thegreenfest.fr/boutique',
    images: [
      {
        url: '/placeholder.svg',
        width: 1200,
        height: 630,
        alt: 'Boutique The Green Fest',
      },
    ],
  },
};


export default function BoutiquePage() {
  return <BoutiqueClient />;
}
