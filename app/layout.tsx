import type { Metadata } from "next";
import { Inter, Montserrat, Nunito } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ClientLayout from "@/components/layout/ClientLayout";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata: Metadata = {
  title: "The Green Event | Festival Électro & Nature à Vertou",
  description: "Le festival électronique intergénérationnel et éco-responsable au cœur du parc de la Sèvre à Vertou. Musique, nature et partage.",
  keywords: ["Festival", "Électro", "Vertou", "Musique", "Nature", "Éco-responsable", "Nantes", "Parc de la Sèvre", "The Green Event"],
  authors: [{ name: "The Green Event" }],
  creator: "Seonay",
  metadataBase: new URL('https://thegreenevent.fr'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "The Green Event | Festival Électro & Nature à Vertou",
    description: "Le festival électronique intergénérationnel et éco-responsable au cœur du parc de la Sèvre à Vertou.",
    url: 'https://thegreenevent.fr',
    siteName: 'The Green Event',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'The Green Event Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Green Event | Festival Électro & Nature à Vertou",
    description: "Le festival électronique intergénérationnel et éco-responsable au cœur du parc de la Sèvre à Vertou.",
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={cn(
        "min-h-screen bg-background font-body antialiased",
        inter.variable,
        montserrat.variable,
        nunito.variable
      )}>
        <ClientLayout>
          <Navbar />
          {children}
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
