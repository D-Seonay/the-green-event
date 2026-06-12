import type { SVGProps } from 'react';

export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  longDescription: string;
  image: string;
  gallery?: string[];
  rotation: number;
  helloAssoUrl: string;
  helloAssoSlug?: string;
  category: 'clothes' | 'accessories' | 'goodies';
  ecoSpecs: string[];
  keywords?: string[];
  seoDescription?: string;
  isMystery?: boolean;
}

export interface Artist {
  name: string;
  slug: string;
  image: string;
  imageAlt: string;
  rotation: number;
  bio: string;
  genre: string;
  timeSlot: string;
  gallery?: string[];
  socials: {
    instagram?: string;
    spotify?: string;
    soundcloud?: string;
  };
  keywords?: string[];
  seoDescription?: string;
  isMystery?: boolean;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  tilt: number;
  speed: number;
  depth: number;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface FloatingElement {
  x: number[];
  y: number[];
  className: string;
  component: React.ComponentType<IconProps>;
}

export type IconProps = SVGProps<SVGSVGElement>;

export interface Sponsor {
  id: number;
  name: string;
  logoSrc: string;
  alt: string;
  url?: string;
}
