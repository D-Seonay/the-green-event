import type { SVGProps } from 'react';

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

export interface Artist {
  name: string;
  image: string;
  rotation: number;
  time?: string;
  description?: string;
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

export interface IconProps extends SVGProps<SVGSVGElement> {
  // You can add any custom props for your icons here if needed
}
