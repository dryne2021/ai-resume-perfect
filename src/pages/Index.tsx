import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ResumeBuilder } from "@/components/ResumeBuilder";
import { Footer } from "@/components/Footer";
import DepthCube from "@/components/DepthCube";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Depth-shaded rotating cube showcase */}
      <section className="w-full h-[70vh] md:h-[80vh]">
        <DepthCube />
      </section>
      <HeroSection />
      <FeaturesSection />
      <ResumeBuilder />
      <Footer />
    </div>
  );
};

export default Index;
