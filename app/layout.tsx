'use client';

import { useState, useEffect } from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import LoadingScreen from '@/components/LoadingScreen';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="fr">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        {loading ? <LoadingScreen /> : children}
      </body>
    </html>
  );
}
