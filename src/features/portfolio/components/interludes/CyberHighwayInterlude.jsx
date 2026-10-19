import { useState } from 'react';
import { Compass, Flame, Radio, Zap } from 'lucide-react';

/**
 * CyberHighwayInterlude — Outrun / Synthwave 3D cyber highway warp runway.
 * Sits between Skills and Projects. Takes ~420px of space.
 * Features an infinite 3D perspective grid floor, a hovering retro spacecraft,
 * radar telemetry, and an interactive "WARP BOOST" button.
 */
export function CyberHighwayInterlude() {
  const [isHyper, setIsHyper] = useState(false);

  const toggleBoost = () => {
    setIsHyper(true);
    setTimeout(() => setIsHyper(false), 2400);
  };

  return (
    <section className="interlude-section cyber-highway-section relative w-full border-y-3 border-ink bg-[#0c1012] text-white py-14 sm:py-20 overflow-hidden select-none">
      {/* ─── 3D INFINITE SCROLLING CYBER GRID FLOOR ─── */}
      <div className={`cyber-grid-perspective-stage ${isHyper ? 'cyber-grid--hyper' : ''}`}>
        <div className="cyber-grid-floor" />
      </div>

      {/* ─── HORIZON SUN / LASER BEAM ─── */}
      <div className="cyber-horizon-glow" />

      {/* ─── CRT SCANLINES & VIGNETTE ─── */}
      <div className="interlude-scanlines" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-between min-h-[320px]">
        
        {/* ─── TOP RADAR HUD TELEMETRY ─── */}
        <div className="w-full flex items-center justify-between border-b border-white/15 pb-3">
          <div className="flex items-center gap-2">
            <Radio size={14} className="text-acid animate-pulse" />
            <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-acid">
              TELEMETRY RUNWAY // STAGE 02 ➔ STAGE 03
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[8px] font-black uppercase tracking-widest text-white/60">
            <span className="hidden sm:inline">WARP VECTOR: [31.53° N, 35.10° E]</span>
            <span className="text-red">GRID STATUS: {isHyper ? 'HYPERDRIVE ACTIVE' : 'STEADY FLIGHT'}</span>
          </div>
        </div>

        {/* ─── CENTER: HOVERING ARCADE SPACECRAFT & WARP CORE ─── */}
        <div className="my-8 flex flex-col items-center justify-center relative">
          
          {/* Animated Retro Pixel Ship */}
          <div className={`cyber-arcade-ship ${isHyper ? 'cyber-ship--hyper' : ''}`}>
            {/* Thrust Flame Particles */}
            <div className="ship-thrust-flames">
              <span className="flame flame-1" />
              <span className="flame flame-2" />
              <span className="flame flame-3" />
            </div>

            {/* Pixel Craft Silhouette */}
            <div className="ship-body">
              <div className="ship-wing ship-wing--left">◀</div>
              <div className="ship-cockpit">
                <span className="text-[11px] font-black text-ink">01</span>
              </div>
              <div className="ship-wing ship-wing--right">▶</div>
            </div>
          </div>

          {/* Heading under ship */}
          <div className="text-center mt-6">
            <h3 className="font-mono text-2xl sm:text-4xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_12px_rgba(216,255,102,0.4)]">
              {isHyper ? '⚡ HYPERDRIVE ENGAGED ⚡' : 'WARP INTO THE MISSIONS'}
            </h3>
            <p className="font-mono text-xs text-acid font-bold uppercase tracking-widest mt-1">
              {isHyper ? 'ENTERING CLASSIFIED PRODUCTION SYSTEMS...' : 'STAGE 03 READY // VERIFIED CASE FILES INCOMING'}
            </p>
          </div>
        </div>

        {/* ─── BOTTOM INTERACTIVE HYPERDRIVE BOOST BUTTON ─── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={toggleBoost}
            className="arcade-btn arcade-btn--live flex items-center gap-2 py-3 px-6 text-xs sm:text-sm shadow-[4px_4px_0_0_#d8ff66] cursor-pointer"
          >
            <Flame size={16} className={isHyper ? 'animate-bounce' : ''} />
            <span>{isHyper ? 'WARPING AT MAXIMUM SPEED!' : 'CLICK TO BOOST WARP SPEED'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
