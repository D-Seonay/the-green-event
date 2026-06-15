import type { Product, NavLink, FloatingElement, GalleryImage } from '@/types';
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
