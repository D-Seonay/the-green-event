import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ConceptSection from "@/components/ConceptSection";
import ProgrammationSection from "@/components/ProgrammationSection";
import InfosSection from "@/components/InfosSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-forest overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <ConceptSection />
        <ProgrammationSection />
        <InfosSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
