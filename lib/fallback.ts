import type { Artist, Sponsor, EventInfo } from '@/types';

/**
 * Données de repli utilisées lorsque Strapi est indisponible (build hors-ligne,
 * CMS down). Elles reflètent le contenu historique de `lib/data.ts`.
 */

export const FALLBACK_EVENT: EventInfo = {
  name: 'The Green Fest 2026',
  startDate: '2026-07-04T14:00:00.000+02:00',
  endDate: '2026-07-05T01:00:00.000+02:00',
  locationName: 'Parc des Viviers',
  address: 'Boulevard Guichet Serex, 44120 Vertou',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2712.151791606953!2d-1.4845670873775743!3d47.17446457103324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4805e900623215b5%3A0xcabb2b7c631ca41b!2sTHE%20GREEN%20EVENT!5e0!3m2!1sfr!2sfr!4v1772036758885!5m2!1sfr!2sfr',
  description:
    'Festival électronique intergénérationnel et éco-responsable au cœur du parc des Viviers à Vertou.',
  accessItems: [
    { icon: 'calendar', title: 'Date', detail: '4 Juillet 2026' },
    { icon: 'map-pin', title: 'Lieu', detail: 'Vertou (44)', subtitle: 'Parc des Viviers' },
    { icon: 'bus', title: 'Transports', detail: 'Bus 28', subtitle: 'Dépose à 3 min' },
    {
      icon: 'car',
      title: 'Accès',
      detail: 'Covoiturage',
      subtitle: '💡 Pensez-y ! Parking Super U à proximité.',
    },
  ],
};

export const FALLBACK_ARTISTS: Artist[] = [
  {
    name: 'BLACK ANGER',
    slug: 'black-anger',
    image: '/artists/blackAngers/blackAngers-1.png',
    imageAlt: 'Le groupe Black Anger en session pop-rock.',
    rotation: 2.5,
    genre: 'POP-ROCK',
    style: 'POP-ROCK',
    timeSlot: '16:00 - 17:00',
    bio: "Black Anger est un groupe de rock amateur composé de deux guitaristes, d'un bassiste et d'un batteur. Sans prétention, le groupe reprend avec plaisir des classiques pop-rock français et anglais, dans une ambiance conviviale et énergique. Entre riffs entraînants et bonne humeur, Black Anger partage avant tout la passion de la musique et le plaisir de jouer ensemble.",
    gallery: ['/artists/blackAngers/blackAngers-1.png', '/artists/blackAngers/blackAngers-2.jpg'],
    socials: {},
    keywords: ['Black Anger', 'Rock', 'Pop-Rock', 'Groupe Amateur'],
    seoDescription: 'Découvrez Black Anger, groupe de pop-rock amateur, en concert au Green Fest 2026.',
  },
  {
    name: 'LOOWS',
    slug: 'loows',
    image: '/artists/LOOWS/LOOWS-1.png',
    imageAlt: 'LOOWS, jeune DJ passionné de vinyles originaire de Vertou.',
    rotation: -2.5,
    genre: 'HOUSE',
    style: 'HOUSE',
    timeSlot: '17:15 - 19:00',
    bio: "LOOWS, jeune DJ passionné de vinyles originaire de Vertou, fera son grand retour pour la troisième édition de The Green Fest. Amoureux des sons dansants et des rythmes envoûtants, il vous embarquera dans un voyage musical vibrant, où les sonorités house réchaufferont l'atmosphère et feront rayonner l'esprit de l'été. Avec une sélection soigneusement élaborée, mêlant classiques intemporels et pépites ensoleillées, LOOWS promet une expérience immersive et festive, idéale pour célébrer la musique et la convivialité.",
    gallery: ['/artists/LOOWS/LOOWS-1.png', '/artists/LOOWS/LOOWS-2.png', '/artists/LOOWS/LOOWS-3.png'],
    socials: {},
    keywords: ['LOOWS', 'DJ', 'House', 'Vinyl', 'Vertou'],
    seoDescription: 'Découvrez LOOWS, DJ house passionné de vinyles, en concert au Green Fest 2026.',
  },
  {
    name: 'Artiste Mystère',
    slug: 'mystery-1',
    image: '/placeholder.svg',
    imageAlt: "Silhouette d'un artiste mystère sur fond de végétation luxuriante, prochainement dévoilé.",
    rotation: -3,
    genre: 'À DÉCOUVRIR',
    timeSlot: '',
    bio: "La suite de la programmation sera dévoilée très prochainement. Restez connectés pour découvrir les prochains artistes qui rejoindront l'affiche de The Green Fest !",
    socials: {},
    isMystery: true,
  },
  {
    name: 'Artiste Mystère',
    slug: 'mystery-2',
    image: '/placeholder.svg',
    imageAlt: 'Visuel intrigant annonçant un prochain DJ pour le festival The Green Event.',
    rotation: 2,
    genre: 'À DÉCOUVRIR',
    timeSlot: '',
    bio: "La suite de la programmation sera dévoilée très prochainement. Restez connectés pour découvrir les prochains artistes qui rejoindront l'affiche de The Green Fest !",
    socials: {},
    isMystery: true,
  },
  {
    name: 'Artiste Mystère',
    slug: 'mystery-3',
    image: '/placeholder.svg',
    imageAlt: "Cadre naturel et festif attendant l'annonce d'un nouvel artiste électro.",
    rotation: 4,
    genre: 'À DÉCOUVRIR',
    timeSlot: '',
    bio: "La suite de la programmation sera dévoilée très prochainement. Restez connectés pour découvrir les prochains artistes qui rejoindront l'affiche de The Green Fest !",
    socials: {},
    isMystery: true,
  },
];

export const FALLBACK_PARTNERS: Sponsor[] = [
  { id: 1, name: 'La Soupape', logoSrc: '/partners/laSoupape.png', alt: 'Logo de La Soupape, partenaire local de Vertou.' },
  { id: 2, name: 'Umami', logoSrc: '/partners/umami.jpeg', alt: 'Logo de Umami, restaurant partenaire engagé.' },
  { id: 3, name: 'Crédit Mutuel', logoSrc: '/partners/creditMutuel.jpeg', alt: 'Logo du Crédit Mutuel, partenaire financier du festival.' },
  { id: 4, name: 'Katanga', logoSrc: '/partners/katanga.png', alt: 'Logo de Katanga, partenaire du festival.' },
  { id: 5, name: 'Min Nantes Métropole', logoSrc: '/partners/minNantesMétropole.png', alt: 'Logo de Min Nantes Métropole, partenaire du festival.' },
];

// Rotations déterministes appliquées aux cartes artistes (remplace le champ cosmétique supprimé du CMS).
export const ARTIST_ROTATIONS = [2.5, -2.5, -3, 2, 4, -2, 3, -4];
