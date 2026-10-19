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
            <SpaceRoomInterlude
              variant="planet"
              sectorLabel="SECTOR 01 // ORBITAL STATION"
            />

            <SkillsSection skills={skills} />

            {/* ─── SPACE ROOM 02 (BETWEEN SKILLS & WORK): HYPERSPACE WARP TUNNEL ─── */}
            <SpaceRoomInterlude
              variant="warp"
              sectorLabel="SECTOR 02 // HYPERSPACE WARP"
            />

            <WorkSection projects={projects} loading={loading} />

            {/* ─── SPACE ROOM 03 (BETWEEN WORK & CONTACT): DEEP SPACE BEACON ─── */}
            <SpaceRoomInterlude
              variant="satellite"
              sectorLabel="SECTOR 03 // COMMS RELAY"
            />

            <ContactSection />
          </main>
          <Footer />
          <BackToTop />
        </div>
      )}
    </>
  );
}

