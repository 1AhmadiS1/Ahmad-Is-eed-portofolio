import { useState } from 'react';
import { Trophy, Coins, Sparkles, Send } from 'lucide-react';

/**
 * ArcadeHighScoreInterlude — Classic Neo-Geo / Capcom arcade high score hall of fame
 * and interactive coin-op receptacle.
 * Sits between Projects and Contact. Takes ~420px of space.
 * Features a retro leaderboard, interactive coin insertion counter,
 * and a 3D arcade joystick module.
 */
export function ArcadeHighScoreInterlude() {
  const [credits, setCredits] = useState(2);
  const [coinInserted, setCoinInserted] = useState(false);
  const [joyPos, setJoyPos] = useState({ x: 0, y: 0 });

  const insertCoin = () => {
    setCoinInserted(true);
    setCredits((prev) => prev + 1);
    setTimeout(() => setCoinInserted(false), 1000);
  };

  const wobbleJoystick = () => {
    setJoyPos({ x: (Math.random() - 0.5) * 30, y: (Math.random() - 0.5) * 30 });
    setTimeout(() => setJoyPos({ x: 0, y: 0 }), 300);
  };

  const leaders = [
    { rank: '1ST', name: 'AHMAD', score: '999,990', role: 'FULL-STACK ENGINEER' },
    { rank: '2ND', name: 'DJANGO', score: '840,200', role: 'BACKEND ARCHITECT' },
    { rank: '3RD', name: 'DOCKER', score: '720,100', role: 'CONTAINER DEPLOYER' },
    { rank: '4TH', name: 'YOUR CO', score: '550,000', role: 'NEXT PROJECT PARTNER' },
  ];

  return (
    <section className="interlude-section high-score-section relative w-full border-y-3 border-ink bg-[#161214] text-white py-12 sm:py-16 overflow-hidden select-none">
      {/* ─── CRT SCANLINES & AMBIENT VIGNETTE ─── */}
      <div className="interlude-scanlines" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* ─── TOP MARQUEE: STAGE CLEAR ─── */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 border-2 border-acid bg-black px-4 py-1.5 shadow-[3px_3px_0_0_#ff432b] mb-3">
            <Trophy size={14} className="text-acid" />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-acid">
              STAGE 03 CLEAR // ALL MISSIONS RECORDED
            </span>
          </div>
          <h3 className="font-mono text-2xl sm:text-4xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_10px_rgba(255,67,43,0.35)]">
            ARCADE HALL OF FAME
          </h3>
          <p className="font-mono text-xs text-white/60 uppercase tracking-widest mt-1">
            HIGH SCORES & MULTIPLAYER COMMS TERMINAL
          </p>
        </div>

        {/* ─── 2-COLUMN DISPLAY: LEADERBOARD + COIN-OP RECEPTACLE ─── */}
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6 items-stretch">
          
          {/* LEFT: RETRO ARCADE HIGH SCORE TABLE */}
          <div className="border-3 border-white/20 bg-black/80 p-4 sm:p-6 shadow-[5px_5px_0_0_#ff432b] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/20 pb-2 mb-3 font-mono text-[9px] font-black uppercase tracking-wider text-acid">
                <span>RANK &amp; CODENAME</span>
                <span className="hidden sm:inline">ENGINEERING ROLE</span>
                <span>SCORE / PTS</span>
              </div>

              <div className="space-y-2">
                {leaders.map((lead, idx) => (
                  <div
                    key={lead.rank}
                    className={`flex items-center justify-between p-2 font-mono text-xs border ${
                      idx === 0
                        ? 'border-acid bg-acid/10 text-white font-black'
                        : 'border-white/10 text-white/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={idx === 0 ? 'text-acid font-black' : 'text-red font-bold'}>
                        {lead.rank}
                      </span>
                      <span className="font-black tracking-wider">{lead.name}</span>
                    </div>

                    <span className="hidden sm:inline text-[10px] text-white/50 font-semibold truncate max-w-[140px]">
                      {lead.role}
                    </span>

                    <span className="font-mono font-black text-acid tracking-wider">
                      {lead.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[9px] text-white/50 uppercase">
              <span>LEADERBOARD REFRESHED</span>
              <span className="text-acid font-bold">READY FOR FINAL STAGE</span>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE 3D COIN SLOT & ARCADE JOYSTICK */}
          <div className="border-3 border-white/20 bg-black/80 p-5 shadow-[5px_5px_0_0_#d8ff66] flex flex-col justify-between items-center text-center">
            
            {/* Top Credits Display */}
            <div className="w-full flex items-center justify-between border-b border-white/15 pb-2 mb-4">
              <span className="font-mono text-[9px] font-black uppercase tracking-wider text-acid">
                CREDITS: 0{credits}
              </span>
              <span className="font-mono text-[9px] font-bold text-red uppercase tracking-widest animate-pulse">
                ● 2-PLAYER READY
              </span>
            </div>

            {/* 3D Joystick Interactive Element */}
            <div className="my-2 flex flex-col items-center">
              <button
                type="button"
                onClick={wobbleJoystick}
                className="arcade-joystick-unit cursor-pointer"
                title="Wobble the 3D Arcade Joystick"
              >
                <div className="joystick-base">
                  <div
                    className="joystick-shaft"
                    style={{
                      transform: `rotateX(${joyPos.y}deg) rotateY(${joyPos.x}deg)`,
                    }}
                  >
                    <div className="joystick-ball" />
                  </div>
                </div>
              </button>
              <span className="font-mono text-[8px] font-bold text-white/40 uppercase tracking-widest mt-2">
                TAP JOYSTICK TO ENGAGE
              </span>
            </div>

            {/* Interactive Coin Slot Button */}
            <div className="w-full mt-4">
              <button
                type="button"
                onClick={insertCoin}
                className={`w-full arcade-btn arcade-btn--live flex items-center justify-center gap-2 py-3 px-4 shadow-[3px_3px_0_0_#d8ff66] cursor-pointer ${
                  coinInserted ? 'scale-95 brightness-125' : ''
                }`}
              >
                <Coins size={16} className={coinInserted ? 'animate-spin' : ''} />
                <span>{coinInserted ? '🪙 COIN ACCEPTED! +1' : 'INSERT COIN TO CONNECT'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ─── BOTTOM PROMPT: DISPATCH TO COMMS ─── */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-black uppercase tracking-[0.2em] text-acid animate-pulse">
            <span>DISPATCHING SECURE COMMS TERMINAL BELOW</span>
            <span>▼</span>
          </div>
        </div>
      </div>
    </section>
  );
}
