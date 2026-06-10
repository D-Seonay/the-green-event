import type { Product, Artist, NavLink, FloatingElement, GalleryImage, Sponsor } from '@/types';
import Cube from '@/components/ui/Cube';
import Leaf from '@/components/ui/Leaf';

export const NAV_LINKS: NavLink[] = [
  { href: '#concept', label: 'Le Concept' },
  { href: '/programmation', label: 'Programmation' },
  { href: '/boutique', label: 'Boutique' },
  { href: '#infos', label: 'Infos Pratiques' },
];

export const PRODUCTS: Product[] = [
  {
    id: 4,
    name: 'T-shirt Green Fest 2026',
    price: '<s>25€</s> 20€ en précommande',
    description: 'T-shirt collector 100% coton bio.',
    longDescription: "Affichez votre soutien au festival avec notre t-shirt officiel 2026. Fabriqué en coton 100% biologique et issu du commerce équitable.",
    image: '/products/t-shirt/face-avant.jpg',
    gallery: [
      '/products/t-shirt/face-avant.jpg',
      '/products/t-shirt/face-arriere.jpg'
    ],
    rotation: 2,
    helloAssoUrl: 'https://www.helloasso.com/associations/the-green-event/boutiques/tee-shirt-tge-green-fest-2026',
    helloAssoSlug: 'tee-shirt-tge-green-fest-2026',
    category: 'clothes',
    ecoSpecs: ['100% Coton Biologique', 'Commerce Équitable'],
    isMystery: false,
  },
  {
    id: 1,
    name: 'Bientôt disponible',
    price: '-',
    description: 'La boutique officielle arrive bientôt.',
    longDescription: "La boutique officielle de The Green Fest ouvrira très prochainement. Restez connectés pour découvrir notre merchandising exclusif !",
    image: '/placeholder.svg',
    rotation: -2.5,
    helloAssoUrl: '',
    category: 'goodies',
    ecoSpecs: ['Bientôt'],
    isMystery: true,
  },
  {
    id: 2,
    name: 'Bientôt disponible',
    price: '-',
    description: 'La boutique officielle arrive bientôt.',
    longDescription: "La boutique officielle de The Green Fest ouvrira très prochainement. Restez connectés pour découvrir notre merchandising exclusif !",
    image: '/placeholder.svg',
    rotation: 3,
    helloAssoUrl: '',
    category: 'goodies',
    ecoSpecs: ['Bientôt'],
    isMystery: true,
  },
  {
    id: 3,
    name: 'Bientôt disponible',
    price: '-',
    description: 'La boutique officielle arrive bientôt.',
    longDescription: "La boutique officielle de The Green Fest ouvrira très prochainement. Restez connectés pour découvrir notre merchandising exclusif !",
    image: '/placeholder.svg',
    rotation: -1,
    helloAssoUrl: '',
    category: 'goodies',
    ecoSpecs: ['Bientôt'],
    isMystery: true,
  },
];

export const ARTISTS: Artist[] = [
  {
    name: 'BLACK ANGER',
    slug: 'black-anger',
    image: '/artists/blackAngers/blackAngers-1.png',
    imageAlt: 'Le groupe Black Anger en session pop-rock.',
    rotation: 2.5,
    genre: 'POP-ROCK',
    timeSlot: '16:00 - 17:00',
    bio: "Black Anger est un groupe de rock amateur composé de deux guitaristes, d'un bassiste et d'un batteur. Sans prétention, le groupe reprend avec plaisir des classiques pop-rock français et anglais, dans une ambiance conviviale et énergique. Entre riffs entraînants et bonne humeur, Black Anger partage avant tout la passion de la musique et le plaisir de jouer ensemble.",
    gallery: ['/artists/blackAngers/blackAngers-1.png', '/artists/blackAngers/blackAngers-2.jpg'],
    socials: {},
    keywords: ['Black Anger', 'Rock', 'Pop-Rock', 'Groupe Amateur'],
    seoDescription: 'Découvrez Black Anger, groupe de pop-rock amateur, en concert au Green Fest 2026.'
  },
  {
    name: 'LOOWS',
    slug: 'loows',
    image: '/artists/LOOWS/LOOWS-1.png',
    imageAlt: 'LOOWS, jeune DJ passionné de vinyles originaire de Vertou.',
    rotation: -2.5,
    genre: 'HOUSE',
    timeSlot: '17:15 - 19:00',
    bio: "LOOWS, jeune DJ passionné de vinyles originaire de Vertou, fera son grand retour pour la troisième édition de The Green Fest. Amoureux des sons dansants et des rythmes envoûtants, il vous embarquera dans un voyage musical vibrant, où les sonorités house réchaufferont l'atmosphère et feront rayonner l'esprit de l'été. Avec une sélection soigneusement élaborée, mêlant classiques intemporels et pépites ensoleillées, LOOWS promet une expérience immersive et festive, idéale pour célébrer la musique et la convivialité.",
    gallery: ['/artists/LOOWS/LOOWS-1.png', '/artists/LOOWS/LOOWS-2.png', '/artists/LOOWS/LOOWS-3.png'],
    socials: {},
    keywords: ['LOOWS', 'DJ', 'House', 'Vinyl', 'Vertou'],
    seoDescription: 'Découvrez LOOWS, DJ house passionné de vinyles, en concert au Green Fest 2026.'
  },
  {
    name: 'Artiste Mystère',
    slug: 'mystery-1',
    image: '/placeholder.svg',
    imageAlt: 'Silhouette d\'un artiste mystère sur fond de végétation luxuriante, prochainement dévoilé.',
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
    imageAlt: 'Cadre naturel et festif attendant l\'annonce d\'un nouvel artiste électro.',
    rotation: 4,
    genre: 'À DÉCOUVRIR',
    timeSlot: '',
    bio: "La suite de la programmation sera dévoilée très prochainement. Restez connectés pour découvrir les prochains artistes qui rejoindront l'affiche de The Green Fest !",
    socials: {},
    isMystery: true,
  },
];

export const FLOATING_ELEMENTS: FloatingElement[] = [
  { x: [-100, 100], y: [-50, 50], className: "top-1/4 left-1/4", component: Cube },
  { x: [50, -50], y: [20, -20], className: "top-1/2 right-1/4", component: Leaf },
  { x: [-20, 20], y: [50, -100], className: "bottom-1/4 left-1/3", component: Leaf },
  { x: [100, -100], y: [-30, 30], className: "top-1/3 right-1/3", component: Cube },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: '1',
    src: '/img/Photo_1.jpg',
    alt: 'Vue sur un spécimen de The Green Fest 2025.',
    tilt: -4,
    speed: 0.2,
    depth: 1
  },
  {
    id: '2',
    src: '/img/3.jpg',
    alt: 'Plan de la foule de The Green Fest 2025.',
    tilt: 3,
    speed: 0.4,
    depth: 2
  },
  {
    id: '3',
    src: '/img/4.jpg',
    alt: 'Vue de la scène de The Green Fest 2025.',
    tilt: -2,
    speed: 0.15,
    depth: 1
  },
  {
    id: '4',
    src: '/img/21062025-IMG_0684.jpg',
    alt: '2 festivaliers posant pour une photo.',
    tilt: 5,
    speed: 0.3,
    depth: 3
  },
  {
    id: '5',
    src: '/img/image.jpg',
    alt: 'The Green Fest en grand format.',
    tilt: -3,
    speed: 0.25,
    depth: 2
  },
  {
    id: '6',
    src: '/artists/LOOWS/LOOWS-1.png',
    alt: 'LOOWS, DJ house originaire de Vertou.',
    tilt: 4,
    speed: 0.35,
    depth: 1
  }
];

export const SPONSORS: Sponsor[] = [
  { id: 1, name: 'La Soupape', logoSrc: '/partners/laSoupape.png', alt: 'Logo de La Soupape, partenaire local de Vertou.' },
  { id: 2, name: 'Umami', logoSrc: '/partners/umami.jpeg', alt: 'Logo de Umami, restaurant partenaire engagé.' },
  { id: 3, name: 'Crédit Mutuel', logoSrc: '/partners/creditMutuel.jpeg', alt: 'Logo du Crédit Mutuel, partenaire financier du festival.' },
];