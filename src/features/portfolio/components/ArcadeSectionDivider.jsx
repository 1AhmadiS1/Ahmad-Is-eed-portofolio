import { useState } from 'react';
import { Sparkles, Terminal, Shield, Zap } from 'lucide-react';

/**
 * ArcadeSectionDivider — High-impact 3D retro arcade stage transition
 * placed between sections. Features dual-opposing infinite kinetic marquees,
 * interactive 3D CSS shapes (spinning cube, gyro rings, radar beacon),
 * hazard caution stripes, and authentic stage level-up badges.
 */
export function ArcadeSectionDivider({
  stageFrom = '01: ORIGIN',
  stageTo = '02: ARSENAL',
  badgeText = 'STAGE CLEAR // LEVEL UP',
  variant = 'cube', // 'cube' | 'orb' | 'radar'
  track1 = [
    'DJANGO REST FRAMEWORK',
    'POSTGRESQL ACID',
    'REACT.JS & TAILWIND',
    'AWS CLOUD PRODUCTION',
    'DOCKER CONTAINERS',
    'JWT AUTH & RBAC',
    'REST APIS & SWAGGER',
    'HIGH PERFORMANCE',
  ],
  track2 = [
    'CLASSIFIED ARCHITECTURE ARCHIVE',
    'SYSTEM UPTIME: 99.98%',
    '60 FPS UI ENGINE',
    'LATENCY: 12ms',
    'SECURITY VAULT: SECURE',
    'READY FOR PRODUCTION',
  ],
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="arcade-section-divider-wrap relative w-full overflow-hidden my-8 sm:my-12 py-6 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ─── DUAL-TRACK 3D TILTED MARQUEE RIBBONS ─── */}
      <div className="arcade-divider-skew-container">
        {/* Top Track: Dark Ink & Neon Acid (Runs Left) */}
        <div className="arcade-marquee-track arcade-marquee-track--top">
          <div className={`marquee-inner marquee-inner--left ${isHovered ? 'marquee-inner--slow' : ''}`}>
            {[...track1, ...track1, ...track1, ...track1].map((item, idx) => (
              <span key={idx} className="marquee-item marquee-item--acid">
                <span className="text-red text-xs">⚡</span>
                <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-wider">
                  {item}
                </span>
                <span className="text-acid/40 text-[10px]">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Track: High-Energy Acid & Ink (Runs Right) */}
        <div className="arcade-marquee-track arcade-marquee-track--bottom">
          <div className={`marquee-inner marquee-inner--right ${isHovered ? 'marquee-inner--slow' : ''}`}>
            {[...track2, ...track2, ...track2, ...track2].map((item, idx) => (
              <span key={idx} className="marquee-item marquee-item--hazard">
                <span className="text-ink font-mono text-xs">///</span>
                <span className="font-mono text-[11px] sm:text-xs font-black uppercase tracking-widest text-ink">
                  {item}
                </span>
                <span className="text-ink/40 text-[10px]">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── FLOATING 3D RETRO STAGE BADGE & CENTERPIECE ─── */}
      <div className="arcade-checkpoint-stage flex flex-col items-center justify-center relative z-20 pointer-events-none">
        
        {/* 3D Kinetic Object */}
        <div className={`arcade-3d-token ${isHovered ? 'arcade-3d-token--boost' : ''}`}>
          {variant === 'cube' && (
            <div className="divider-cube-wrap">
              <div className="divider-3d-cube">
                <div className="divider-cube-face divider-cube-front">⚡</div>
                <div className="divider-cube-face divider-cube-back">👾</div>
                <div className="divider-cube-face divider-cube-left">&lt;/&gt;</div>
                <div className="divider-cube-face divider-cube-right">&#123;&#125;</div>
                <div className="divider-cube-face divider-cube-top">★</div>
                <div className="divider-cube-face divider-cube-bottom">▲</div>
              </div>
            </div>
          )}

          {variant === 'orb' && (
            <div className="divider-orb-wrap">
              <div className="divider-gyro-ring ring-1" />
              <div className="divider-gyro-ring ring-2" />
              <div className="divider-diamond-core">★</div>
            </div>
          )}

          {variant === 'radar' && (
            <div className="divider-radar-wrap">
              <div className="divider-radar-sweep" />
              <div className="divider-radar-ring ring-inner" />
              <div className="divider-radar-ring ring-outer" />
              <div className="divider-radar-center">
                <Zap size={14} className="text-acid animate-pulse" />
              </div>
            </div>
          )}
        </div>

        {/* Stage Checkpoint Badge */}
        <div className="arcade-stage-checkpoint-badge mt-2 pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-red animate-ping" />
            <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-acid">
              {stageFrom}
            </span>
            <span className="font-mono text-[9px] font-black text-white">➔</span>
            <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-white">
              {stageTo}
            </span>
            <span className="text-white/30">•</span>
            <span className="font-mono text-[8px] font-bold text-acid uppercase tracking-widest hidden sm:inline">
              {badgeText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
