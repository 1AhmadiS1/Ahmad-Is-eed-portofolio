import { useState } from 'react';
import { Zap, Shield, Rocket, Sparkles, Heart } from 'lucide-react';

/**
 * PowerUpLabInterlude — Retro game inventory / power-up chamber.
 * Sits between Hero and Skills. Takes ~400px of space.
 * Features 3 interactive 3D power-up cartridges with soundless particle bursts,
 * an authentic retro HP/XP HUD bar, and classic arcade game aesthetics.
 */
export function PowerUpLabInterlude() {
  const [selectedBuff, setSelectedBuff] = useState(0);
  const [activated, setActivated] = useState(null);
  const [xp, setXp] = useState(9990);

  const powerUps = [
    {
      id: 0,
      title: 'FAST APIS',
      buff: '+99 VELOCITY',
      desc: 'Sub-millisecond query responses & low-latency REST architecture.',
      icon: <Zap size={24} className="text-acid" />,
      color: '#d8ff66',
      badge: 'SPEED BUFF',
    },
    {
      id: 1,
      title: 'RBAC SHIELD',
      buff: '+100 DEFENSE',
      desc: 'Role-based access control with secure JWT & token authorization.',
      icon: <Shield size={24} className="text-red" />,
      color: '#ff432b',
      badge: 'SECURITY',
    },
    {
      id: 2,
      title: 'CLOUD SCALE',
      buff: '+999 CAPACITY',
      desc: 'Dockerized microservices & scalable AWS EC2, RDS, and S3 pipelines.',
      icon: <Rocket size={24} className="text-blue" />,
      color: '#2556e8',
      badge: 'INFRASTRUCTURE',
    },
  ];

  const handleSelect = (idx) => {
    setSelectedBuff(idx);
    setActivated(idx);
    setXp((prev) => prev + 500);
    setTimeout(() => setActivated(null), 1200);
  };

  return (
    <section className="interlude-section powerup-lab-section relative w-full border-y-3 border-ink bg-[#14181a] text-white py-12 sm:py-16 overflow-hidden">
      {/* ─── RETRO CRT SCANLINE OVERLAY ─── */}
      <div className="interlude-scanlines" />

      {/* ─── AMBIENT CRT PHOSPHOR GLOW ─── */}
      <div className="absolute inset-0 bg-radial-vignette opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* ─── TOP RETRO HUD: PLAYER STATS & HEALTH ─── */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-2 border-white/20 bg-black/60 p-3 sm:p-4 shadow-[4px_4px_0_0_#ff432b] mb-8">
          <div className="flex items-center gap-3">
            <span className="grid size-7 place-items-center bg-red text-white font-mono text-xs font-black">
              1P
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-acid">
                  PLAYER 01 // AHMAD IS'EED
                </span>
                <span className="text-red animate-pulse flex items-center">
                  <Heart size={10} fill="currentColor" />
                  <Heart size={10} fill="currentColor" />
                  <Heart size={10} fill="currentColor" />
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-[8px] font-bold text-white/50 uppercase">HP BAR:</span>
                <div className="w-32 sm:w-48 h-2.5 bg-black border border-white/30 p-0.5">
                  <div className="h-full bg-gradient-to-r from-red via-acid to-acid w-[92%] animate-pulse" />
                </div>
                <span className="font-mono text-[9px] font-black text-acid">100%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 font-mono text-[9px] font-black uppercase tracking-widest">
            <div>
              <span className="text-white/40 block text-[7px]">SCORE / XP</span>
              <span className="text-acid text-sm sm:text-base font-black tracking-wider leading-none">
                {xp.toLocaleString()} PTS
              </span>
            </div>
            <div className="hidden sm:block">
              <span className="text-white/40 block text-[7px]">STAGE TRANSITION</span>
              <span className="text-white text-sm font-black leading-none">ORIGIN ➔ ARSENAL</span>
            </div>
            <span className="retro-pixel-badge animate-bounce">
              STAGE 02 INCOMING
            </span>
          </div>
        </div>

        {/* ─── TITLE BANNER: EYE-CATCHING PIXEL HEADER ─── */}
        <div className="text-center mb-8">
          <span className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-red inline-block mb-1">
            ⚡ BONUS CHAMBER // EQUIP YOUR LOADOUT ⚡
          </span>
          <h3 className="font-mono text-xl sm:text-3xl font-black uppercase tracking-tight text-white">
            SELECT A SYSTEM POWER-UP
          </h3>
          <p className="font-mono text-xs text-white/60 uppercase tracking-widest mt-1">
            CLICK A CARTRIDGE TO CHARGE THE ARCHITECTURE
          </p>
        </div>

        {/* ─── 3 INTERACTIVE 3D POWER-UP CARTRIDGES ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {powerUps.map((buff, idx) => {
            const isSelected = selectedBuff === idx;
            const isPuff = activated === idx;
            return (
              <button
                key={buff.id}
                type="button"
                onClick={() => handleSelect(idx)}
                className={`powerup-cartridge group relative flex flex-col justify-between p-5 text-left border-3 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-acid bg-black shadow-[6px_6px_0_0_#d8ff66] -translate-y-2'
                    : 'border-white/30 bg-black/80 hover:border-red hover:shadow-[5px_5px_0_0_#ff432b] hover:-translate-y-1'
                }`}
              >
                {/* 3D Cartridge Notch */}
                <div className="flex items-center justify-between border-b border-white/15 pb-3 mb-3">
                  <span className="font-mono text-[9px] font-black uppercase tracking-wider text-white/60">
                    SLOT 0{idx + 1} // {buff.badge}
                  </span>
                  <span className="size-2 rounded-full" style={{ backgroundColor: buff.color }} />
                </div>

                {/* Icon & Buff Title */}
                <div className="py-2">
                  <div
                    className={`grid size-12 place-items-center border-2 border-white/20 bg-white/5 mb-3 group-hover:scale-110 transition-transform ${
                      isPuff ? 'animate-ping' : ''
                    }`}
                  >
                    {buff.icon}
                  </div>
                  <h4 className="font-mono text-lg font-black uppercase tracking-tight text-white">
                    {buff.title}
                  </h4>
                  <span className="font-mono text-xs font-black uppercase tracking-wider text-acid block mt-0.5">
                    {buff.buff}
                  </span>
                  <p className="mt-2 text-xs font-semibold text-white/70 leading-relaxed">
                    {buff.desc}
                  </p>
                </div>

                {/* Bottom Cartridge Connector Pins */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[9px]">
                  <span className="text-white/40 tracking-wider">STATUS</span>
                  <span
                    className={`font-black uppercase tracking-widest ${
                      isSelected ? 'text-acid' : 'text-white/60 group-hover:text-red'
                    }`}
                  >
                    {isSelected ? '✓ LOADED IN MEMORY' : 'CLICK TO EQUIP'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
