'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import SmoothScroller from '@/components/SmoothScroller';
import ScrollToTop from '@/components/ui/ScrollToTop';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  return (
    <>
      {loading && <LoadingScreen />}
      <SmoothScroller>
        {children}
      </SmoothScroller>
      <ScrollToTop />
    </>
  );
}
