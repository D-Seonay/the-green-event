'use client';

import { useState, useEffect } from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import LoadingScreen from '@/components/LoadingScreen';

const inter = Inter({ subsets: ["latin"] });

// Removed metadata as it's not supported in a 'use client' component.
// If metadata is required, it should be moved to a non-'use client' layout or separate file.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <html lang="fr">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        {loading ? <LoadingScreen /> : children}
      </body>
    </html>
  );
}
