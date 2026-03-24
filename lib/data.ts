import type { Product, Artist, NavLink, FloatingElement, GalleryImage } from '@/types';
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
    keywords: ['T-shirt', 'Coton Bio', 'Merchandising', 'Festival'],
    seoDescription: 'Le t-shirt officiel du Green Event 2026 en coton 100% biologique et fabriqué en France.'
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
  {
    name: 'LOOWS',
    slug: 'loows',
    image: '/artists/LOOWS/LOOWS-1.png',
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
    name: 'DIANA KRALL',
    slug: 'diana-krall',
    image: '/placeholder.svg',
    rotation: -3,
    genre: 'JAZZ / PIANO',
    timeSlot: '20:00 - 21:30',
    bio: "Diana Krall est une pianiste et chanteuse de jazz canadienne dont la voix de contralto expressive et le jeu de piano sophistiqué ont fait d'elle l'une des artistes les plus populaires de sa génération. Avec plusieurs Grammy Awards à son actif, elle apporte une élégance intemporelle à la scène du Green Event.",
    socials: {
      instagram: 'https://instagram.com',
      spotify: 'https://spotify.com',
      soundcloud: 'https://soundcloud.com'
    }
  },
  {
    name: 'GOGO PENGUIN',
    slug: 'gogo-penguin',
    image: '/placeholder.svg',
    rotation: 2,
    genre: 'ACOUSTIC ELECTRONICA',
    timeSlot: '18:30 - 19:45',
    bio: "Originaire de Manchester, GoGo Penguin fusionne des influences de jazz, de minimalisme et de musique électronique pour créer un son unique et cinématique. Leur performance promet un voyage hypnotique au cœur du Parc de la Sèvre.",
    socials: {
      instagram: 'https://instagram.com',
      spotify: 'https://spotify.com',
      soundcloud: 'https://soundcloud.com'
    }
  },
  {
    name: "HIROMI'S SONICWONDER",
    slug: 'hiromis-sonicwonder',
    image: '/placeholder.svg',
    rotation: 4,
    genre: 'FUSION / JAZZ-ROCK',
    timeSlot: '22:00 - 23:30',
    bio: "La pianiste virtuose Hiromi Uehara repousse les limites du jazz with son nouveau projet Sonicwonder. Une explosion d'énergie, de technique et de créativité qui va faire vibrer les arbres du festival.",
    socials: {
      instagram: 'https://instagram.com',
      spotify: 'https://spotify.com',
      soundcloud: 'https://soundcloud.com'
    }
  },
  {
    name: 'JALEN NGONDA',
    slug: 'jalen-ngonda',
    image: '/placeholder.svg',
    rotation: -2,
    genre: 'SOUL / R&B',
    timeSlot: '17:00 - 18:00',
    bio: "Avec une voix qui rappelle les légendes de la Motown, Jalen Ngonda apporte une soul authentique et chaleureuse. Son mélange de classicisme et de modernité est le parfait accompagnement pour un début de soirée ensoleillé.",
    socials: {
      instagram: 'https://instagram.com',
      spotify: 'https://spotify.com',
      soundcloud: 'https://soundcloud.com'
    }
  },
  {
    name: 'CHRISTONE "KINGFISH" INGRAM',
    slug: 'christone-kingfish-ingram',
    image: '/placeholder.svg',
    rotation: 3,
    genre: 'BLUES / ROCK',
    timeSlot: '21:00 - 22:30',
    bio: "À seulement 25 ans, Kingfish est déjà considéré comme l'un des plus grands guitaristes de blues de sa génération. Sa passion brute et son toucher exceptionnel promettent un moment d'intensité rare.",
    socials: {
      instagram: 'https://instagram.com',
      spotify: 'https://spotify.com',
      soundcloud: 'https://soundcloud.com'
    }
  },
  {
    name: 'LIZZ WRIGHT',
    slug: 'lizz-wright',
    image: '/placeholder.svg',
    rotation: -4,
    genre: 'VOCAL JAZZ / GOSPEL',
    timeSlot: '19:00 - 20:15',
    bio: "La voix de Lizz Wright est une force de la nature, profonde et apaisante. Son mélange de jazz, de folk et de gospel crée une atmosphère de recueillement et de beauté pure.",
    socials: {
      instagram: 'https://instagram.com',
      spotify: 'https://spotify.com',
      soundcloud: 'https://soundcloud.com'
    }
  },
  {
    name: 'YUSSEF DAYES',
    slug: 'yussef-dayes',
    image: '/placeholder.svg',
    rotation: 2,
    genre: 'CONTEMPORARY JAZZ',
    timeSlot: '20:30 - 22:00',
    bio: "Batteur et producteur de génie, Yussef Dayes est à l'avant-garde de la scène jazz londonienne. Son jeu polyrythmique et ses explorations sonores sont une invitation à la danse et à l'évasion.",
    socials: {
      instagram: 'https://instagram.com',
      spotify: 'https://spotify.com',
      soundcloud: 'https://soundcloud.com'
    }
  },
  {
    name: 'ROBERT GLASPER',
    slug: 'robert-glasper',
    image: '/placeholder.svg',
    rotation: -1,
    genre: 'JAZZ / HIP-HOP',
    timeSlot: '22:30 - 00:00',
    bio: "Robert Glasper est le pont entre le jazz traditionnel et la culture hip-hop moderne. Multi-récompensé aux Grammys, il clôturera la soirée avec un groove irrésistible et des invités surprises.",
    socials: {
      instagram: 'https://instagram.com',
      spotify: 'https://spotify.com',
      soundcloud: 'https://soundcloud.com'
    }
  },
  {
    name: 'KAMAAL WILLIAMS',
    slug: 'kamaal-williams',
    image: '/placeholder.svg',
    rotation: 3,
    genre: '70s FUNK / JAZZ FUSION',
    timeSlot: '19:00 - 20:30',
    bio: "Kamaal Williams, également connu sous le nom de Henry Wu, est une figure centrale de la nouvelle scène jazz britannique. Son mélange de funk des années 70 et de jazz fusion moderne crée une énergie communicative.",
    socials: {
      instagram: 'https://instagram.com',
      spotify: 'https://spotify.com'
    }
  },
  {
    name: 'NUBYA GARCIA',
    slug: 'nubya-garcia',
    image: '/placeholder.svg',
    rotation: -2,
    genre: 'MODERN JAZZ',
    timeSlot: '17:30 - 18:45',
    bio: "Saxophoniste et compositrice de talent, Nubya Garcia est l'une des voix les plus influentes du jazz contemporain. Son jeu puissant et lyrique capture l'essence du renouveau jazz londonien.",
    socials: {
      instagram: 'https://instagram.com',
      spotify: 'https://spotify.com'
    }
  },
  {
    name: 'BADBADNOTGOOD',
    slug: 'badbadnotgood',
    image: '/placeholder.svg',
    rotation: 4,
    genre: 'EXPERIMENTAL JAZZ / HIP-HOP',
    timeSlot: '23:30 - 01:00',
    bio: "Ce collectif canadien redéfinit les frontières entre le jazz, le hip-hop et la musique électronique. Leurs collaborations légendaires et leur approche sans limites garantissent une performance mémorable.",
    socials: {
      instagram: 'https://instagram.com',
      spotify: 'https://spotify.com',
      soundcloud: 'https://soundcloud.com'
    }
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
    alt: 'Ambiance Festival',
    tilt: -4,
    speed: 0.2,
    depth: 1
  },
  {
    id: '2',
    src: '/img/3.jpg',
    alt: 'Scène et Lumières',
    tilt: 3,
    speed: 0.4,
    depth: 2
  },
  {
    id: '3',
    src: '/img/4.jpg',
    alt: 'Public en feu',
    tilt: -2,
    speed: 0.15,
    depth: 1
  },
  {
    id: '4',
    src: '/img/21062025-IMG_0684.jpg',
    alt: 'Moment suspendu',
    tilt: 5,
    speed: 0.3,
    depth: 3
  },
  {
    id: '5',
    src: '/img/image.jpg',
    alt: 'Nature meeting Electro',
    tilt: -3,
    speed: 0.25,
    depth: 2
  },
  {
    id: '6',
    src: '/artists/LOOWS/LOOWS-1.png',
    alt: 'Performance LOOWS',
    tilt: 4,
    speed: 0.35,
    depth: 1
  }
];