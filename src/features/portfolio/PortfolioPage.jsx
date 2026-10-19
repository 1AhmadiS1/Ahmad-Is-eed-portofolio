import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SkillsSection } from './components/SkillsSection';
import { WorkSection } from './components/WorkSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SpaceRoomInterlude } from './components/interludes/SpaceRoomInterlude';
import { RetroGameLoader } from '@/shared/components/RetroGameLoader';
import { BackToTop } from '@/shared/components/BackToTop';
import { ScrollReveal } from '@/shared/components/ScrollReveal';
import { usePortfolioData } from './usePortfolioData';

export default function PortfolioPage() {
  const [initialLoading, setInitialLoading] = useState(true);
  const { skills, projects, loading } = usePortfolioData();

  return (
    <>
      {initialLoading && (
        <RetroGameLoader onComplete={() => setInitialLoading(false)} />
      )}
      {!initialLoading && (
        <div className="min-h-screen w-full bg-paper text-ink flex flex-col">
          <Header />
          <main className="w-full flex-1">
            <Hero />

            {/* ─── SPACE ROOM 01 (BETWEEN HERO & SKILLS): 3D RINGED PLANET ─── */}
            <ScrollReveal threshold={0.08}>
              <SpaceRoomInterlude
                variant="planet"
                sectorLabel="SECTOR 01 // ORBITAL STATION"
              />
            </ScrollReveal>

            <ScrollReveal threshold={0.08}>
              <SkillsSection skills={skills} />
            </ScrollReveal>

            {/* ─── SPACE ROOM 02 (BETWEEN SKILLS & WORK): HYPERSPACE WARP TUNNEL ─── */}
            <ScrollReveal threshold={0.08}>
              <SpaceRoomInterlude
                variant="warp"
                sectorLabel="SECTOR 02 // HYPERSPACE WARP"
              />
            </ScrollReveal>

            <ScrollReveal threshold={0.08}>
              <WorkSection projects={projects} loading={loading} />
            </ScrollReveal>

            {/* ─── SPACE ROOM 03 (BETWEEN WORK & CONTACT): DEEP SPACE BEACON ─── */}
            <ScrollReveal threshold={0.08}>
              <SpaceRoomInterlude
                variant="satellite"
                sectorLabel="SECTOR 03 // COMMS RELAY"
              />
            </ScrollReveal>

            <ScrollReveal threshold={0.08}>
              <ContactSection />
            </ScrollReveal>
          </main>
          <Footer />
          <BackToTop />
        </div>
      )}
    </>
  );
}

