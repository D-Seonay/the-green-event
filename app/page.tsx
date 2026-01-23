'use client';

import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import ConceptSection from '@/components/sections/ConceptSection';
import ProgrammationSection from '@/components/sections/ProgrammationSection';
import InfosSection from '@/components/sections/InfosSection';
import SponsorsSection from '@/components/sections/Sponsors';
import NewsletterSection from '@/components/sections/NewsletterSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ConceptSection />
      <ProgrammationSection />
      <InfosSection />
      <SponsorsSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
