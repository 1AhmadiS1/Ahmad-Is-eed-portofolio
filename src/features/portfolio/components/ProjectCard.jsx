import { GitBranch, Globe, Maximize2 } from 'lucide-react';
import { ProjectCRTMonitor } from './ProjectCRTMonitor';
import { playArcadeSound } from '@/shared/utils/sound';

function LinkedinIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.9 0-1.62.72-1.62 1.62 0 .9.72 1.62 1.62 1.62.9 0 1.62-.72 1.62-1.62 0-.9-.72-1.62-1.62-1.62Z" />
    </svg>
  );
}

/**
 * ProjectCard — Arcade mission terminal card featuring embedded CRT monitor,
 * live video demos, screenshot gallery, tech stack chips, and 3D arcade buttons.
 */
export function ProjectCard({ project, index, onInspect }) {
  const caseNumber = String(index + 1).padStart(2, '0');

  return (
    <article className="project-console-card">
      {/* ─── CASE DOSSIER HEADER ─── */}
      <div className="project-card-header">
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center border border-ink bg-ink text-white font-mono text-[10px] font-black shadow-[1px_1px_0_0_#ff432b]">
            {caseNumber}
          </span>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-mono text-[8px] font-black uppercase tracking-[0.2em] text-red block">
                CASE FILE // {project.tag || `MISSION ${caseNumber}`}
              </span>
              {project.period && (
                <span className="font-mono text-[8px] font-bold text-muted uppercase">
                  • {project.period}
                </span>
              )}
            </div>
            <h3 className="font-mono text-sm sm:text-base font-black uppercase tracking-tight text-ink">
              {project.name}
            </h3>
            {project.role && (
              <span className="font-mono text-[9px] font-bold text-blue uppercase tracking-wider block">
                {project.role}
              </span>
            )}
          </div>
        </div>

        {/* Expand button */}
        <button
          type="button"
          onClick={() => {
            playArcadeSound('expand');
            onInspect?.(project);
          }}
          className="crt-icon-btn hidden sm:flex cursor-pointer"
          title="Inspect Full Mission Dossier"
        >
          <Maximize2 size={12} />
        </button>
      </div>

      {/* ─── INTEGRATED CRT MONITOR (VIDEO / GALLERY / SPECS) ─── */}
      <div className="p-3 sm:p-4 bg-paper-deep/30 border-b-2 border-ink">
        <ProjectCRTMonitor
          project={project}
          onExpand={() => {
            playArcadeSound('expand');
            onInspect?.(project);
          }}
        />
      </div>

      {/* ─── PROJECT BODY & TECH STACK ─── */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Tech Stack Header & Chips */}
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-muted">
              // TECHNOLOGIES USED
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(project.skills || []).map((skill) => (
              <span
                key={skill.name || skill.id}
                className="inline-flex items-center gap-1 border border-ink bg-paper px-2 py-0.5 font-mono text-[10px] font-bold text-ink shadow-[1px_1px_0_0_#192124]"
              >
                <span
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: skill.color || '#2556e8' }}
                />
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* ─── ARCADE ACTION CONTROL DECK ─── */}
        <div className="pt-3 border-t border-ink/15 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {project.github_link && (
              <a
                href={project.github_link}
                target="_blank"
                rel="noreferrer"
                onClick={() => playArcadeSound('click')}
                className="arcade-btn arcade-btn--github"
                title="View GitHub Repository"
              >
                <GitBranch size={12} />
                <span>CODE</span>
              </a>
            )}

            {project.linkedin_link && (
              <a
                href={project.linkedin_link}
                target="_blank"
                rel="noreferrer"
                onClick={() => playArcadeSound('click')}
                className="arcade-btn arcade-btn--linkedin"
                title="View LinkedIn Project Post"
              >
                <LinkedinIcon size={12} />
                <span>LINKEDIN</span>
              </a>
            )}

            {project.website_link && (
              <a
                href={project.website_link}
                target="_blank"
                rel="noreferrer"
                onClick={() => playArcadeSound('click')}
                className="arcade-btn arcade-btn--live"
                title="Launch Live Project"
              >
                <Globe size={12} />
                <span>LIVE DEMO</span>
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              playArcadeSound('expand');
              onInspect?.(project);
            }}
            className="arcade-btn arcade-btn--inspect"
            title="Expand Full Mission Dossier"
          >
            <span>EXPAND</span>
            <Maximize2 size={10} />
          </button>
        </div>
      </div>
    </article>
  );
}
