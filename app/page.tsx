'use client';

import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/HeroSection';
import ConceptSection from '@/components/ConceptSection';
import ProgrammationSection from '@/components/ProgrammationSection';
import InfosSection from '@/components/InfosSection';
import SponsorsSection from '@/components/sections/Sponsors';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ConceptSection />
      <ProgrammationSection />
      <InfosSection />
      <SponsorsSection />
      <Footer />
    </main>
  );
}
