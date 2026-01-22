export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  longDescription: string;
  image: string;
  rotation: number;
  helloAssoUrl: string;
  category: 'clothes' | 'accessories' | 'goodies';
  ecoSpecs: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'T-Shirt Green 2026',
    price: '20€',
    description: 'Coton bio, tout doux, tout vert.',
    longDescription: 'Affichez votre soutien avec ce t-shirt en coton 100% biologique, imprimé en France avec des encres à base d\'eau. Sa coupe unisexe et son confort en feront votre meilleur allié pour danser jusqu\'au bout de la nuit.',
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
    longDescription: 'Transportez vos affaires avec style grâce à notre tote bag fabriqué à partir de bouteilles en plastique recyclées. Robuste, pratique et orné du logo du festival.',
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
    longDescription: 'Le soleil tape fort en été à Vertou ! Protégez-vous avec style grâce au bob officiel du Green Event. Confortable et tendance, il est le couvre-chef de choix pour tout festivalier averti.',
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
    description: 'Le visuel de l\'édition 2026.',
    longDescription: 'Ramenez un morceau de la magie du festival à la maison avec l\'affiche officielle de l\'édition 2026. Imprimée sur du papier recyclé, elle décorera parfaitement votre intérieur.',
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
    longDescription: 'Quand le soleil se couche, restez au chaud avec notre sweat à capuche ultra-confortable. Fabriqué en coton bio et polyester recyclé, il est parfait pour les fins de soirée.',
    image: '/placeholder.svg',
    rotation: -1,
    helloAssoUrl: 'https://www.helloasso.com',
    category: 'clothes',
    ecoSpecs: ['Coton Bio', 'Polyester Recyclé'],
  },
];
