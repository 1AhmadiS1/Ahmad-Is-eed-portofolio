import { useState, useEffect, useCallback } from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { RetroGitHubWarp } from './RetroGitHubWarp';
import { Rocket, ChevronLeft, ChevronRight, Gamepad2 } from 'lucide-react';
import { playArcadeSound } from '@/shared/utils/sound';

export function WorkSection({ projects = [], loading = false }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('right');
  const [touchStartX, setTouchStartX] = useState(null);

  const prevProject = useCallback(() => {
    if (!projects.length) return;
    playArcadeSound('swap');
    setSlideDirection('left');
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  }, [projects.length]);

  const nextProject = useCallback(() => {
    if (!projects.length) return;
    playArcadeSound('swap');
    setSlideDirection('right');
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  }, [projects.length]);

  const jumpToProject = (idx) => {
    if (idx === currentIndex) return;
    playArcadeSound('swap');
    setSlideDirection(idx > currentIndex ? 'right' : 'left');
    setCurrentIndex(idx);
  };

  // Keyboard navigation (Left / Right arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === 'ArrowLeft') prevProject();
      if (e.key === 'ArrowRight') nextProject();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevProject, nextProject]);

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) nextProject();
    else if (diff < -50) prevProject();
    setTouchStartX(null);
  };

  const currentProject = projects[currentIndex] || projects[0];
  const prevIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
  const prevProjectData = projects[prevIndex];
  const nextProjectData = projects[nextIndex];

  return (
    <section
      id="projects"
      className="work-section relative border-t-2 border-ink w-full max-w-full overflow-x-hidden bg-paper"
    >
      <span id="work" className="absolute -top-20" />

      {/* ─── ARCADE TOP HUD BAR ─── */}
      <div className="skills-header-bar wave-child-1">
        <div className="mx-auto max-w-[1580px] px-4 sm:px-6 md:px-8 lg:px-12 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-8 place-items-center border-2 border-ink bg-blue text-white shadow-[2px_2px_0_0_#192124]">
              <Rocket size={16} />
            </div>
            <div>
              <span className="font-mono text-[8px] font-black uppercase tracking-[0.2em] text-blue block">
                STAGE 03 // MISSION DOSSIER
              </span>
              <span className="font-mono text-[11px] font-black uppercase tracking-wider text-ink">
                FEATURED WORK & DEPLOYMENTS
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4 font-mono text-[9px] font-black uppercase tracking-widest">
            <span className="text-muted">
              MISSIONS: <span className="text-blue font-bold">{projects.length}</span> SHIPPED
            </span>
            <span className="text-muted">
              STATUS: <span className="text-ink font-bold">ONLINE / PRODUCTION</span>
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1580px] px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-14">
        {/* ─── SECTION HEADING & SWAPPER CONTROLS ─── */}
        <div className="wave-child-2 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="kicker">⚡ Case Files & Systems</span>
            <h2 className="section-title">
              Selected<br className="hidden sm:block" /> Missions
            </h2>
            <p className="mt-3 max-w-[540px] text-sm sm:text-base font-semibold leading-relaxed text-muted">
              Explore production-ready systems and verified cloud deployments. Use the left & right arcade swapper to cycle through missions.
            </p>
          </div>

          {/* Top Swapper HUD Controls */}
          <div className="self-start md:self-end flex items-center gap-3">
            <div className="border-2 border-ink bg-paper px-3 py-2 shadow-[2px_2px_0_0_#192124] flex items-center gap-2">
              <Gamepad2 size={15} className="text-red animate-pulse" />
              <span className="font-mono text-xs font-black uppercase tracking-wider text-ink">
                MISSION {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
            </div>

            {/* Prev / Next Arcade Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevProject}
                className="arcade-swapper-btn"
                title="Previous Mission (Left Arrow Key)"
                aria-label="Previous Mission"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={nextProject}
                className="arcade-swapper-btn"
                title="Next Mission (Right Arrow Key)"
                aria-label="Next Mission"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* ─── INTERACTIVE MISSION SWAPPER ARENA (CYBER HOLO-STAGE) ─── */}
        <div
          className="wave-child-3 cyber-holo-stage relative mt-6"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Swapper Flexbox: Left Wing + Center Card + Right Wing */}
          <div className="flex items-center justify-center gap-3 lg:gap-6 relative z-10">

            {/* Left Thrust Wing (Desktop) */}
            {prevProjectData && (
              <button
                type="button"
                onClick={prevProject}
                className="arcade-thrust-wing hidden lg:flex items-center"
                title={`Swap to: ${prevProjectData.name}`}
              >
                <div className="arcade-thrust-wing-btn">
                  <ChevronLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
                </div>
                <div className="hidden xl:flex flex-col text-left">
                  <span className="font-mono text-[8px] font-black uppercase text-red tracking-widest">
                    ◀ PREV MISSION
                  </span>
                  <span className="font-mono text-[10px] font-bold text-ink truncate max-w-[130px]">
                    {prevProjectData.name}
                  </span>
                </div>
              </button>
            )}

            {/* Active Mission Console Wrapper with Cyber Corner Laser Brackets */}
            <div className="w-full max-w-3xl relative arcade-console-wrapper shadow-[0_12px_40px_rgba(25,33,36,0.12)]">
              {/* 4 Cyber Corner Laser Brackets */}
              <span className="cyber-corner cyber-corner--tl" />
              <span className="cyber-corner cyber-corner--tr" />
              <span className="cyber-corner cyber-corner--bl" />
              <span className="cyber-corner cyber-corner--br" />

              {/* Holographic Cockpit Status Bar */}
              <div className="flex items-center justify-between border-2 border-b-0 border-ink bg-ink px-3 sm:px-4 py-2 text-white shadow-[2px_2px_0_0_#ff432b]">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-red animate-ping" />
                  <span className="font-mono text-[8px] sm:text-[9px] font-black uppercase tracking-[0.18em] text-acid">
                    ACTIVE TELEMETRY // DOSSIER 0{currentIndex + 1}
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 font-mono text-[7px] sm:text-[8px] font-black uppercase tracking-widest text-white/70">
                  <span className="text-acid">STATUS: VERIFIED</span>
                  <span>•</span>
                  <span>CPU: 100% OK</span>
                </div>
              </div>

              {/* Active Project Card with Directional Arcade Slide Animation */}
              {currentProject && (
                <div
                  key={currentProject.id || currentIndex}
                  className={slideDirection === 'right' ? 'animate-arcade-slide-right' : 'animate-arcade-slide-left'}
                >
                  <ProjectCard
                    project={currentProject}
                    index={currentIndex}
                    onInspect={(p) => {
                      playArcadeSound('expand');
                      setSelectedProject(p);
                    }}
                  />
                </div>
              )}
            </div>

            {/* Right Thrust Wing (Desktop) */}
            {nextProjectData && (
              <button
                type="button"
                onClick={nextProject}
                className="arcade-thrust-wing hidden lg:flex items-center"
                title={`Swap to: ${nextProjectData.name}`}
              >
                <div className="hidden xl:flex flex-col text-right">
                  <span className="font-mono text-[8px] font-black uppercase text-red tracking-widest">
                    NEXT MISSION ▶
                  </span>
                  <span className="font-mono text-[10px] font-bold text-ink truncate max-w-[130px]">
                    {nextProjectData.name}
                  </span>
                </div>
                <div className="arcade-thrust-wing-btn">
                  <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            )}
          </div>

          {/* ─── MISSION STAGE HIGHWAY SELECTOR TABS ─── */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3">
            <div className="stage-highway-track w-full max-w-xl">
              <div className="flex items-center gap-2 flex-wrap justify-center relative z-10">
                {projects.map((proj, idx) => {
                  const isActive = idx === currentIndex;
                  const stageNum = String(idx + 1).padStart(2, '0');
                  return (
                    <button
                      key={proj.id || idx}
                      type="button"
                      onClick={() => jumpToProject(idx)}
                      className={`arcade-stage-pill flex items-center gap-1.5 ${isActive ? 'arcade-stage-pill--active' : ''}`}
                      title={proj.name}
                    >
                      {isActive && <span className="text-[10px] text-acid animate-bounce">★</span>}
                      <span>{stageNum}</span>
                      <span className="hidden sm:inline font-bold">
                        {proj.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-3 text-muted font-mono text-[9px] uppercase tracking-widest mt-1">
              <span>◄ USE ARROW KEYS OR SWIPE TO CYCLE MISSIONS ►</span>
            </div>
          </div>
        </div>

        {/* ─── 3D RETRO ARCADE WARP ARROW TO GITHUB ARCHIVE ─── */}
        <div className="mt-14 sm:mt-16">
          <RetroGitHubWarp />
        </div>

        {/* ─── BOTTOM RETRO STATS RACK ─── */}
        <div className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-2 border-ink bg-ink p-3 sm:p-4 shadow-[4px_4px_0_0_#2556e8]">
            <div className="flex items-center gap-3">
              <span className="text-xl">🛰️</span>
              <div>
                <span className="font-mono text-[8px] font-black uppercase tracking-[0.2em] text-acid block">
                  SYSTEM RELIABILITY
                </span>
                <span className="font-mono text-sm sm:text-base font-black text-white uppercase tracking-wider">
                  Production Architectures & Verified Deployments
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 font-mono text-[9px] font-black uppercase tracking-widest">
              <div className="text-center">
              </div>
              <div className="text-center">
                <span className="block text-white/50 text-[8px]">STATUS</span>
                <span className="block text-base sm:text-lg text-white leading-none">ALL MISSIONS</span>
              </div>
              <div className="text-center">
                <span className="block text-white/50 text-[8px]">PIPELINES</span>
                <span className="block text-base sm:text-lg text-red leading-none">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── FULLSCREEN MISSION DOSSIER MODAL ─── */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => {
            playArcadeSound('close');
            setSelectedProject(null);
          }}
        />
      )}
    </section>
  );
}
