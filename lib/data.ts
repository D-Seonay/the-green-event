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
    name: 'LOOWS',
    slug: 'loows',
    image: '/artists/LOOWS/LOOWS-1.png',
    imageAlt: 'DJ LOOWS mixant sur des platines vinyles lors d\'une session ensoleillée au Green Fest.',
    rotation: 2.5,
    genre: 'HOUSE',
    timeSlot: '17:15 - 19:00',
    bio: "LOOWS, jeune DJ passionné de vinyles originaire de Vertou, fera son grand retour pour la deuxième édition de The Green Fest. Amoureux des sons dansants et des rythmes envoûtants, il vous embarquera dans un voyage musical vibrant, où les sonorités house réchaufferont l'atmosphère et feront rayonner l'esprit de l'été. Avec une sélection soigneusement élaborée, mêlant classiques intemporels et pépites ensoleillées, LOOWS promet une expérience immersive et festive, idéale pour célébrer la musique et la convivialité.",
    gallery: ['/artists/LOOWS/LOOWS-1.png', '/artists/LOOWS/LOOWS-2.png'],
    socials: {},
    keywords: ['LOOWS', 'House Music', 'DJ Vertou', 'Vinyl'],
    seoDescription: 'Découvrez LOOWS, le DJ House de Vertou, pour une performance vinyle exclusive au Green Event 2026.'
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
    alt: 'Vue d\'ensemble du festival avec un public joyeux dansant au milieu des arbres du parc de la Sèvre.',
    tilt: -4,
    speed: 0.2,
    depth: 1
  },
  {
    id: '2',
    src: '/img/3.jpg',
    alt: 'Gros plan sur une scène en bois décorée de feuillage, illuminée par des projecteurs aux tons chauds.',
    tilt: 3,
    speed: 0.4,
    depth: 2
  },
  {
    id: '3',
    src: '/img/4.jpg',
    alt: 'Foule de festivaliers levant les bras devant un DJ set énergique sous un ciel de fin d\'après-midi.',
    tilt: -2,
    speed: 0.15,
    depth: 1
  },
  {
    id: '4',
    src: '/img/21062025-IMG_0684.jpg',
    alt: 'Détail artistique d\'un élément de décoration suspendu, mêlant matériaux naturels et formes géométriques.',
    tilt: 5,
    speed: 0.3,
    depth: 3
  },
  {
    id: '5',
    src: '/img/image.jpg',
    alt: 'Installation d\'un Chill Out avec des hamacs et des poufs en toile de jute disposés sous les saules pleureurs.',
    tilt: -3,
    speed: 0.25,
    depth: 2
  },
  {
    id: '6',
    src: '/artists/LOOWS/LOOWS-1.png',
    alt: 'L\'artiste LOOWS concentré derrière ses platines vinyles, entouré d\'une végétation immersive.',
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