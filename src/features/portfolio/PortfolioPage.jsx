import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SkillsSection } from './components/SkillsSection';
import { WorkSection } from './components/WorkSection';
import { EducationSection } from './components/EducationSection';
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
        <div className="min-h-screen w-full max-w-full bg-paper text-ink flex flex-col overflow-x-hidden">
          <Header />
          <main className="w-full max-w-full flex-1 overflow-x-hidden">
            <Hero />

            {/* ─── SPACE ROOM 01 (BETWEEN HERO & SKILLS): 3D RINGED PLANET ─── */}
            <ScrollReveal>
              <SpaceRoomInterlude
                variant="planet"
                sectorLabel="SECTOR 01 // ORBITAL STATION"
              />
            </ScrollReveal>

            <ScrollReveal>
              <SkillsSection skills={skills} />
            </ScrollReveal>

            {/* ─── SPACE ROOM 02 (BETWEEN SKILLS & WORK): HYPERSPACE WARP TUNNEL ─── */}
            <ScrollReveal>
              <SpaceRoomInterlude
                variant="warp"
                sectorLabel="SECTOR 02 // HYPERSPACE WARP"
              />
            </ScrollReveal>

            <ScrollReveal>
              <WorkSection projects={projects} loading={loading} />
            </ScrollReveal>

            {/* ─── SPACE ROOM 03 (BETWEEN WORK & EDUCATION): WARP ─── */}
            <ScrollReveal>
              <SpaceRoomInterlude
                variant="planet"
                sectorLabel="SECTOR 03 // ACADEMY APPROACH"
              />
            </ScrollReveal>

            <ScrollReveal>
              <EducationSection />
            </ScrollReveal>

            {/* ─── SPACE ROOM 04 (BETWEEN EDUCATION & CONTACT): DEEP SPACE BEACON ─── */}
            <ScrollReveal>
              <SpaceRoomInterlude
                variant="satellite"
                sectorLabel="SECTOR 04 // COMMS RELAY"
              />
            </ScrollReveal>

            <ScrollReveal>
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

