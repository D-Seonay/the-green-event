import { Metadata } from 'next';
import BenevolesClient from './BenevolesClient';

export const metadata: Metadata = {
  title: "Devenir Bénévole | The Green Event",
  description: "Rejoins la Green Team ! Formulaire d'inscription pour devenir bénévole au festival The Green Event à Vertou.",
  alternates: {
    canonical: '/benevoles',
  },
};

export default function BenevolesPage() {
  return <BenevolesClient />;
}
