import { useEffect } from 'react';
import { X, GitBranch, Globe, CheckCircle2, Terminal } from 'lucide-react';
import { ProjectCRTMonitor } from './ProjectCRTMonitor';
import { playArcadeSound } from '@/shared/utils/sound';

function LinkedinIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.9 0-1.62.72-1.62 1.62 0 .9.72 1.62 1.62 1.62.9 0 1.62-.72 1.62-1.62 0-.9-.72-1.62-1.62-1.62Z" />
    </svg>
  );
}

/**
 * ProjectModal — Declassified mission dossier popup with expanded video player,
 * full screenshot gallery, and direct repo / LinkedIn / live links.
 */
export function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-paper border-3 border-ink shadow-[8px_8px_0_0_#ff432b] overflow-hidden">
        
        {/* ─── MODAL HEADER HUD ─── */}
        <div className="flex items-center justify-between border-b-2 border-ink bg-ink px-4 py-3 text-white">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="grid size-6 place-items-center bg-red text-[11px] font-black border border-white/20">
              ⚡
            </span>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-mono text-[8px] font-black uppercase tracking-[0.2em] text-acid block">
                  CLASSIFIED CASE DOSSIER // {project.tag || 'ARCHIVE'}
                </span>
                {project.period && (
                  <span className="font-mono text-[8px] font-bold text-white/60 uppercase">
                    • {project.period}
                  </span>
                )}
              </div>
              <h3 className="font-mono text-xs sm:text-sm font-black uppercase tracking-wider text-white">
                {project.name}
              </h3>
              {project.role && (
                <span className="font-mono text-[9px] font-bold text-acid uppercase tracking-wider block">
                  {project.role}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid size-8 place-items-center border-2 border-white/30 bg-ink hover:bg-red text-white font-mono text-sm font-black transition-colors"
            aria-label="Close dossier"
          >
            <X size={16} />
          </button>
        </div>

        {/* ─── SCROLLABLE CONTENT BODY ─── */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Main Media Console Display */}
          <div className="w-full">
            <ProjectCRTMonitor project={project} />
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <div>
              <span className="kicker">Mission Briefing</span>
              <p className="mt-2 text-sm sm:text-base font-semibold text-muted leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Architecture Highlights */}
            {project.highlights && (
              <div className="border-2 border-ink bg-paper-deep/40 p-4 shadow-[3px_3px_0_0_#192124]">
                <div className="flex items-center gap-2 mb-3">
                  <Terminal size={14} className="text-red" />
                  <span className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-ink">
                    KEY ENGINEERING DELIVERABLES
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-mono font-bold text-ink/90">
                      <CheckCircle2 size={13} className="text-acid flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Chips */}
            <div>
              <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-muted block mb-2">
                DEPLOYED TECHNOLOGIES
              </span>
              <div className="flex flex-wrap gap-2">
                {(project.skills || []).map((skill) => (
                  <span
                    key={skill.name || skill.id}
                    className="inline-flex items-center gap-1.5 border border-ink bg-paper px-2.5 py-1 font-mono text-[11px] font-bold text-ink shadow-[2px_2px_0_0_#192124]"
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: skill.color || '#2556e8' }}
                    />
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── ACTION CONTROL DECK FOOTER ─── */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-ink bg-paper-deep p-3 sm:p-4">
          <div className="flex items-center gap-2 text-[10px] font-mono font-black text-muted uppercase">
            <span>STATUS:</span>
            <span className="text-red font-bold">READY FOR REVIEW</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {project.github_link && (
              <a
                href={project.github_link}
                target="_blank"
                rel="noreferrer"
                onClick={() => playArcadeSound('click')}
                className="arcade-btn arcade-btn--github"
              >
                <GitBranch size={13} />
                <span>GITHUB REPO</span>
              </a>
            )}

            {project.linkedin_link && (
              <a
                href={project.linkedin_link}
                target="_blank"
                rel="noreferrer"
                onClick={() => playArcadeSound('click')}
                className="arcade-btn arcade-btn--linkedin"
              >
                <LinkedinIcon size={13} />
                <span>LINKEDIN POST</span>
              </a>
            )}

            {project.website_link && (
              <a
                href={project.website_link}
                target="_blank"
                rel="noreferrer"
                onClick={() => playArcadeSound('click')}
                className="arcade-btn arcade-btn--live"
              >
                <Globe size={13} />
                <span>LIVE DEMO</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
