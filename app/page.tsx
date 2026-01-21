'use client';

import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/HeroSection';
import ConceptSection from '@/components/ConceptSection';
import ProgrammationSection from '@/components/ProgrammationSection';
import InfosSection from '@/components/InfosSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ConceptSection />
      <ProgrammationSection />
      <InfosSection />
      <Footer />
    </main>
  );
}
