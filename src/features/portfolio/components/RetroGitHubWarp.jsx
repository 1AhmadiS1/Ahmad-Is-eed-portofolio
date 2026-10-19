import { GitBranch, ExternalLink, Sparkles } from 'lucide-react';

export function RetroGitHubWarp() {
  return (
    <div className="retro-warp-container w-full max-w-3xl mx-auto px-2 sm:px-4">
      {/* 3D Floating Arcade Warp Arrow Sign */}
      <a
        href="https://github.com/1AhmadiS1"
        target="_blank"
        rel="noreferrer"
        className="retro-3d-arrow-sign group"
        title="Warp to GitHub Profile"
      >
        {/* Main Body */}
        <div className="retro-sign-body flex flex-col justify-between py-3.5 px-4 sm:px-6">
          {/* Top Arcade Bar */}
          <div className="flex items-center justify-between gap-3 border-b border-white/15 pb-2">
            <div className="flex items-center gap-2">
              <span className="retro-coin-badge">
                <span className="retro-coin">🪙</span>
                <span className="font-mono text-[9px] font-black uppercase tracking-wider text-acid">
                  INSERT COIN
                </span>
              </span>
              <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-red animate-pulse">
                ★ WARP ZONE ★
              </span>
            </div>

            <span className="font-mono text-[9px] font-black text-acid uppercase tracking-widest hidden sm:inline-flex items-center gap-1">
              <Sparkles size={11} />
              STAGE CLEAR
            </span>
          </div>

          {/* Main Action Banner: Big, Bold, Eye-Appealing */}
          <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="grid size-9 place-items-center border-2 border-acid bg-black text-acid group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-[2px_2px_0_0_#d8ff66]">
                <GitBranch size={20} />
              </div>
              <div>
                <h3 className="font-mono text-base sm:text-lg font-black uppercase tracking-tight text-white group-hover:text-acid transition-colors">
                  EXPLORE MORE ON GITHUB
                </h3>
                <span className="font-mono text-[10px] font-bold text-acid uppercase tracking-wider block">
                  20+ REPOSITORIES & PROJECTS
                </span>
              </div>
            </div>

            {/* Arcade Press Start Button */}
            <span className="retro-start-btn self-start sm:self-center shrink-0">
              <span>PRESS START</span>
              <ExternalLink size={12} />
            </span>
          </div>
        </div>

        {/* Right Side: 3D Animated Arrow Head with Chasing Chevrons */}
        <div className="retro-arrow-head">
          <div className="retro-chevron-chase">
            <span className="retro-chevron chevron-1">▶</span>
            <span className="retro-chevron chevron-2">▶</span>
            <span className="retro-chevron chevron-3">▶</span>
          </div>
          <span className="retro-arrow-tip font-mono text-[10px] font-black text-ink uppercase tracking-widest mt-1">
            WARP
          </span>
        </div>
      </a>
    </div>
  );
}
