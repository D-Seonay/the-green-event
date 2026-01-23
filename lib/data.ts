import type { Product, Artist, NavLink, FloatingElement } from '@/types';
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
    name: 'T-Shirt Green 2026',
    price: '20€',
    description: 'Coton bio, tout doux, tout vert.',
    longDescription: "Affichez votre soutien avec ce t-shirt en coton 100% biologique, imprimé en France avec des encres à base d'eau. Sa coupe unisexe et son confort en feront votre meilleur allié pour danser jusqu'au bout de la nuit.",
    image: '/placeholder.svg',
    rotation: -2.5,
    helloAssoUrl: 'https://www.helloasso.com',
    category: 'clothes',
    ecoSpecs: ['100% Coton Bio', 'Fabriqué en France', 'Encres à base d\'eau'],
  },
  {
    id: 2,
    name: 'Eco-Cup Collector',
    price: '2€',
    description: 'Le gobelet réutilisable officiel.',
    longDescription: 'Indispensable pour vous rafraîchir tout au long du festival, notre Eco-Cup est consignée et réutilisable. Un souvenir pratique et un geste pour la planète !',
    image: '/placeholder.svg',
    rotation: 3,
    helloAssoUrl: 'https://www.helloasso.com',
    category: 'goodies',
    ecoSpecs: ['Zéro Déchet', 'Réutilisable'],
  },
  {
    id: 3,
    name: 'Tote Bag Nature',
    price: '10€',
    description: 'Fait en matériaux recyclés.',
    longDescription: "Transportez vos affaires avec style grâce à notre tote bag fabriqué à partir de bouteilles en plastique recyclées. Robuste, pratique et orné du logo du festival.",
    image: '/placeholder.svg',
    rotation: 1.5,
    helloAssoUrl: 'https://www.helloasso.com',
    category: 'accessories',
    ecoSpecs: ['Matériaux Recyclés', 'Vegan'],
  },
  {
    id: 4,
    name: 'Le Bob du Festival',
    price: '15€',
    description: 'Indispensable pour chiller au soleil.',
    longDescription: "Le soleil tape fort en été à Vertou ! Protégez-vous avec style grâce au bob officiel du Green Event. Confortable et tendance, il est le couvre-chef de choix pour tout festivalier averti.",
    image: '/placeholder.svg',
    rotation: -4,
    helloAssoUrl: 'https://www.helloasso.com',
    category: 'accessories',
    ecoSpecs: ['Protection Solaire', 'Style Inimitable'],
  },
  {
    id: 5,
    name: 'Affiche Officielle',
    price: '12€',
    description: "Le visuel de l'édition 2026.",
    longDescription: "Ramenez un morceau de la magie du festival à la maison avec l'affiche officielle de l'édition 2026. Imprimée sur du papier recyclé, elle décorera parfaitement votre intérieur.",
    image: '/placeholder.svg',
    rotation: 2,
    helloAssoUrl: 'https://www.helloasso.com',
    category: 'goodies',
    ecoSpecs: ['Papier Recyclé', 'Décoration Durable'],
  },
   {
    id: 6,
    name: 'Sweat à Capuche',
    price: '45€',
    description: 'Pour les soirées un peu fraîches.',
    longDescription: "Quand le soleil se couche, restez au chaud avec notre sweat à capuche ultra-confortable. Fabriqué en coton bio et polyester recyclé, il est parfait pour les fins de soirée.",
    image: '/placeholder.svg',
    rotation: -1,
    helloAssoUrl: 'https://www.helloasso.com',
    category: 'clothes',
    ecoSpecs: ['Coton Bio', 'Polyester Recyclé'],
  },
];

export const ARTISTS: Artist[] = [
  { name: 'DIANA KRALL', image: '/placeholder.svg', rotation: -3 },
  { name: 'GOGO PENGUIN', image: '/placeholder.svg', rotation: 2 },
  { name: "HIROMI'S SONICWONDER", image: '/placeholder.svg', rotation: 4 },
  { name: 'JALEN NGONDA', image: '/placeholder.svg', rotation: -2 },
  { name: 'CHRISTONE "KINGFISH" INGRAM', image: '/placeholder.svg', rotation: 3 },
  { name: 'LIZZ WRIGHT', image: '/placeholder.svg', rotation: -4 },
  { name: 'YUSSEF DAYES', image: '/placeholder.svg', rotation: 2 },
  { name: 'ROBERT GLASPER', image: '/placeholder.svg', rotation: -1 },
];

export const FLOATING_ELEMENTS: FloatingElement[] = [
    { x: [-100, 100], y: [-50, 50], className: "top-1/4 left-1/4", component: Cube },
    { x: [50, -50], y: [20, -20], className: "top-1/2 right-1/4", component: Leaf },
    { x: [-20, 20], y: [50, -100], className: "bottom-1/4 left-1/3", component: Leaf },
    { x: [100, -100], y: [-30, 30], className: "top-1/3 right-1/3", component: Cube },
];