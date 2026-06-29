import { HeroScene } from '@/app/components/sections/HeroScene';
import { HeroContent } from '@/app/components/sections/HeroContent';
import { ZonesGrid } from '@/app/components/sections/ZonesGrid';
import { AISearch } from '@/app/components/sections/AISearch';
import { FeaturedProducts } from '@/app/components/sections/FeaturedProducts';
import { FeatureStrip } from '@/app/components/sections/FeatureStrip';
import { Manifesto } from '@/app/components/sections/Manifesto';
import { Footer } from '@/app/components/layout/Footer';

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden bg-black">
        <HeroScene />
        {/* Gradient vignette over canvas */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black pointer-events-none z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none z-[1]" />
        <HeroContent />
      </section>

      {/* AI Search */}
      <AISearch />

      {/* Zones */}
      <ZonesGrid />

      {/* Featured products */}
      <FeaturedProducts />

      {/* Feature strip */}
      <FeatureStrip />

      {/* Manifesto */}
      <Manifesto />

      {/* Footer */}
      <Footer />
    </>
  );
}
