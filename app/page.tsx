import HeroSection from '@/components/sections/HeroSection';
import ConceptSection from '@/components/sections/ConceptSection';
import ProgrammationSection from '@/components/sections/ProgrammationSection';
import InfosSection from '@/components/sections/InfosSection';
import SponsorsSection from '@/components/sections/Sponsors';
import NewsletterSection from '@/components/sections/NewsletterSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ConceptSection />
      <ProgrammationSection />
      <InfosSection />
      <SponsorsSection />
      <NewsletterSection />
    </main>
  );
}
