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
    image: '/products/t-shirt/t-shirt-2026-face.jpeg',
    gallery: [
      '/products/t-shirt/t-shirt-2026-face.jpeg',
      '/products/t-shirt/t-shirt-2026-back.jpeg',
      '/products/t-shirt/t-shirt-2026-label.jpeg',
      '/products/t-shirt/t-shirt-2026-texture.jpeg',
      '/products/t-shirt/t-shirt-2026-sleeve.jpeg',
      '/products/t-shirt/t-shirt-2026-detail-1.jpeg',
      '/products/t-shirt/t-shirt-2026-detail-2.jpeg',
      '/products/t-shirt/t-shirt-2026-folded.jpeg',
      '/products/t-shirt/t-shirt-2026-vibe.jpeg'
    ],
    rotation: 2,
    helloAssoUrl: 'https://www.helloasso.com/associations/the-green-event/boutiques/tee-shirt-tge-green-fest-2026',
    helloAssoSlug: 'tee-shirt-tge-green-fest-2026',
    category: 'clothes',
    ecoSpecs: ['100% Coton Biologique', 'Commerce Équitable'],
    isMystery: false,
  },
  {
    id: 5,
    name: 'Eco Cup THE GREEN FEST 2026',
    price: '2€',
    description: 'Le gobelet réutilisable collector de la dernière édition.',
    longDescription: "Notre gobelet réutilisable THE GREEN FEST 2026 une édition collector unique. C'est la dernière occasion de repartir avec ce gobelet emblématique du festival. Zéro déchet, 100% souvenir.",
    image: '/products/eco-cup/eco-cup-1.jpg',
    gallery: [
      '/products/eco-cup/eco-cup-1.jpg',
      '/products/eco-cup/eco-cup-2.jpg',
      '/products/eco-cup/eco-cup-3.jpg',
    ],
    rotation: -2.5,
    helloAssoUrl: 'https://www.helloasso.com/associations/the-green-event/boutiques/eco-cup-the-green-fest-2026',
    helloAssoSlug: 'eco-cup-the-green-fest-2026',
    category: 'accessories',
    ecoSpecs: ['Gobelet réutilisable', 'Zéro déchet', 'Édition limitée 2026'],
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
    name: 'B-OKIN',
    slug: 'b-okin',
    image: '/artists/b-okin/b-okin-1.jpeg',
    imageAlt: 'B-OKIN, DJ electro nantais passionné par le son sous toutes ses formes.',
    rotation: 3,
    genre: 'ELECTRO / TECH HOUSE',
    timeSlot: '19:00 - 20:15',
    bio: "DJ electro nantais passionné par le son sous toutes ses formes, B-okin est là pour vous faire découvrir son univers electro. Avec des inspirations de la tech house, drum and Bass et des années 2010, préparés vous à des moments de nostalgies mais surtout d'unicités. Ici pas de dj stars les seules stars c'est vous !",
    gallery: [
      '/artists/b-okin/b-okin-1.jpeg',
      '/artists/b-okin/b-okin-2.jpeg',
      '/artists/b-okin/b-okin-3.jpeg',
      '/artists/b-okin/b-okin-4.jpeg',
      '/artists/b-okin/b-okin-5.jpeg',
      '/artists/b-okin/b-okin-6.jpeg',
      '/artists/b-okin/b-okin-7.jpeg',
      '/artists/b-okin/b-okin-8.jpeg'
    ],
    socials: {},
    keywords: ['B-OKIN', 'DJ', 'Electro', 'Tech House', 'Nantes'],
    seoDescription: 'Découvrez B-OKIN, DJ electro nantais passionné, en concert au Green Fest 2026.'
  },
  {
    name: 'RoXas',
    slug: 'roxas',
    image: '/artists/Roxas/roxas-1.jpeg',
    imageAlt: 'Portrait de RoXas, artiste hip-hop et rap aux multiples influences.',
    rotation: 2,
    genre: 'RAP / HIP-HOP',
    timeSlot: '21:40 - 22:55',
    bio: "RoXas, passionné de musique et profondément ancré dans l'univers du hip-hop, vous embarquera pour une performance intense et immersive. Préparez-vous à découvrir toute sa polyvalence: un mélange explosif de rap old school, de textes marquants, d'ambiances sombres et de sonorités variées mêlant Hip-Hop, Bossa Nova, Electronique, Drum and Bass, House. Entre énergie brute et influences éclectiques, RoXaS vous fera voyager à travers les multiples facettes du rap actuel.",
    gallery: ['/artists/Roxas/roxas-1.jpeg'],
    socials: {},
    keywords: ['RoXas', 'Hip-Hop', 'Rap', 'Drum and Bass', 'House', 'Bossa Nova', 'Electronique'],
    seoDescription: 'Découvrez RoXas, artiste de rap et hip-hop aux multiples influences, en concert au Green Fest 2026.'
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
    { id: 4, name: 'Katanga', logoSrc: '/partners/katanga.png', alt: 'Logo de Katanga, partenaire du festival.' },
    { id: 5, name: 'Min Nantes Métropole', logoSrc: '/partners/minNantesMétropole.png', alt: 'Logo de Min Nantes Métropole, partenaire du festival.' },
    ];  
