'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import SmoothScroller from '@/components/SmoothScroller';
import ScrollToTop from '@/components/ui/ScrollToTop';
import ScrollToTopOnNavigation from '@/components/ScrollToTopOnNavigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Check if the page is already loaded
    if (document.readyState === 'complete') {
      const timer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timer);
    } else {
      const handleLoad = () => {
        setTimeout(() => setLoading(false), 500);
      };
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!mounted) return <div className="bg-forest min-h-screen" />;

  return (
    <>
      {loading && <LoadingScreen />}
      <ScrollToTopOnNavigation />
      <SmoothScroller>
        {children}
      </SmoothScroller>
      <ScrollToTop />
    </>
  );
}
