import { useState, useRef } from 'react';

/**
 * SpaceRoomInterlude — Atmospheric retro-arcade cosmic space room.
 * Takes ~340px-380px of expansive visual breathing space between sections.
 * Features:
 * - Dynamic mouse-tracking interactive targeting reticle
 * - Dramatic hover reactions: celestial objects accelerate, tilt, and radiate neon energy
 * - Interactive click shockwave: clicking triggers an expanding gravitational pulse wave
 * - Pure cosmic eye-candy with zero text clutter
 */
export function SpaceRoomInterlude({
  variant = 'planet', // 'planet' | 'warp' | 'satellite'
  sectorLabel = 'SECTOR 01 // ORBITAL STATION',
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorCoord, setCursorCoord] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [shockwaves, setShockwaves] = useState([]);
  const containerRef = useRef(null);
  const rAFRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rAFRef.current) return;

    rAFRef.current = window.requestAnimationFrame(() => {
      rAFRef.current = null;
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
      setCursorCoord({
        x: ((clientX - rect.left) / rect.width) * 100,
        y: ((clientY - rect.top) / rect.height) * 100,
      });
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    if (rAFRef.current) {
      window.cancelAnimationFrame(rAFRef.current);
      rAFRef.current = null;
    }
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  const handleClick = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const newWave = { id: Date.now(), x, y };
    setShockwaves((prev) => [...prev.slice(-3), newWave]);
    setTimeout(() => {
      setShockwaves((prev) => prev.filter((w) => w.id !== newWave.id));
    }, 1000);
  };

  const handleTouchStart = (e) => {
    setIsHovered(true);
    const touch = e.touches[0];
    if (!touch || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (touch.clientX - rect.left) / rect.width - 0.5;
    const y = (touch.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
    setCursorCoord({
      x: ((touch.clientX - rect.left) / rect.width) * 100,
      y: ((touch.clientY - rect.top) / rect.height) * 100,
    });
    // Trigger shockwave on tap
    const shockX = ((touch.clientX - rect.left) / rect.width) * 100;
    const shockY = ((touch.clientY - rect.top) / rect.height) * 100;
    const newWave = { id: Date.now(), x: shockX, y: shockY };
    setShockwaves((prev) => [...prev.slice(-3), newWave]);
    setTimeout(() => {
      setShockwaves((prev) => prev.filter((w) => w.id !== newWave.id));
    }, 1000);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    if (!touch || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (touch.clientX - rect.left) / rect.width - 0.5;
    const y = (touch.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
    setCursorCoord({
      x: ((touch.clientX - rect.left) / rect.width) * 100,
      y: ((touch.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsHovered(false);
      setMousePos({ x: 0, y: 0 });
    }, 1000);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`space-room-section relative w-full h-[320px] sm:h-[380px] overflow-hidden select-none border-y-2 border-ink bg-[#07090b] cursor-crosshair transition-colors duration-500 ${
        isHovered ? 'space-room--active' : ''
      }`}
      aria-label="Interactive cosmic space room"
    >
      {/* ─── LAYER 1: DEEP COSMIC STARFIELD ─── */}
      <div
        className={`space-stars space-stars--distant ${isHovered ? 'space-stars--accelerate' : ''}`}
        style={{ transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -25}px)` }}
      />
      <div
        className={`space-stars space-stars--near ${isHovered ? 'space-stars--accelerate' : ''}`}
        style={{ transform: `translate(${mousePos.x * -50}px, ${mousePos.y * -50}px)` }}
      />

      {/* ─── LAYER 2: INTERACTIVE NEBULA GLOW (EXPANDS ON HOVER) ─── */}
      <div
        className={`space-nebula-glow transition-all duration-700 ${
          isHovered ? 'opacity-100 scale-125' : 'opacity-60 scale-100'
        }`}
        style={{
          transform: `translate(-50%, -50%) translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)`,
        }}
      />

      {/* ─── LAYER 3: CRT SCANLINES OVERLAY ─── */}
      <div className="interlude-scanlines" />

      {/* ─── LAYER 4: CLICK GRAVITATIONAL SHOCKWAVES ─── */}
      {shockwaves.map((wave) => (
        <span
          key={wave.id}
          className="cosmic-shockwave"
          style={{ left: `${wave.x}%`, top: `${wave.y}%` }}
        />
      ))}

      {/* ─── LAYER 5: INTERACTIVE RETRO TARGETING RETICLE ─── */}
      {isHovered && (
        <div
          className="cosmic-targeting-reticle"
          style={{ left: `${cursorCoord.x}%`, top: `${cursorCoord.y}%` }}
        >
          <span className="reticle-corner reticle-tl" />
          <span className="reticle-corner reticle-tr" />
          <span className="reticle-corner reticle-bl" />
          <span className="reticle-corner reticle-br" />
          <span className="reticle-dot" />
        </div>
      )}

      {/* ─── LAYER 6: 3D CELESTIAL CENTERPIECE ─── */}
      <div className="relative z-10 size-full flex flex-col items-center justify-center pointer-events-none">
        
        {/* VARIANT A: 3D RINGED PLANET & MOON */}
        {variant === 'planet' && (
          <div
            className={`space-3d-celestial ${
              isHovered ? 'space-celestial--hovered' : ''
            }`}
            style={{
              transform: `translate(${mousePos.x * 45}px, ${mousePos.y * 45}px) rotateX(${
                mousePos.y * -35
              }deg) rotateY(${mousePos.x * 35}deg) scale(${isHovered ? 1.2 : 1})`,
            }}
          >
            {/* Planet Body with Atmospheric Corona on Hover */}
            <div className={`space-planet ${isHovered ? 'planet--active-glow' : ''}`}>
              <div className="planet-crater crater-1" />
              <div className="planet-crater crater-2" />
              <div className="planet-atmosphere-glow" />
            </div>

            {/* Orbiting Planetary Rings (Spins faster on hover) */}
            <div className={`space-planet-ring ${isHovered ? 'ring--fast' : ''}`} />
            <div className={`space-planet-ring ring-outer ${isHovered ? 'ring--fast' : ''}`} />

            {/* Orbiting Mini Moon */}
            <div className={`space-orbiting-moon ${isHovered ? 'moon--fast' : ''}`} />
          </div>
        )}

        {/* VARIANT B: HYPERSPACE WARP TUNNEL */}
        {variant === 'warp' && (
          <div
            className={`space-warp-tunnel ${
              isHovered ? 'warp--hyper' : ''
            }`}
            style={{
              transform: `translate(${mousePos.x * 55}px, ${mousePos.y * 55}px) scale(${
                isHovered ? 1.3 : 1
              })`,
            }}
          >
            <div className="warp-tunnel-ring ring-1" />
            <div className="warp-tunnel-ring ring-2" />
            <div className="warp-tunnel-ring ring-3" />
            <div className="warp-tunnel-ring ring-4" />
            <div className="warp-center-core">✦</div>
          </div>
        )}

        {/* VARIANT C: ORBITAL RETRO SATELLITE BEACON */}
        {variant === 'satellite' && (
          <div
            className={`space-satellite-station ${
              isHovered ? 'satellite--aim' : ''
            }`}
            style={{
              transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px) rotate(${
                mousePos.x * 25
              }deg) scale(${isHovered ? 1.25 : 1})`,
            }}
          >
            {/* Satellite Craft */}
            <div className="satellite-craft">
              <div className={`solar-panel solar-panel--left ${isHovered ? 'panel--charged' : ''}`} />
              <div className="satellite-core">
                <span className="size-2 rounded-full bg-red animate-ping" />
              </div>
              <div className={`solar-panel solar-panel--right ${isHovered ? 'panel--charged' : ''}`} />
            </div>

            {/* Radio Wave Pulses (Fast on hover) */}
            <div className={`satellite-radio-wave wave-1 ${isHovered ? 'wave--rapid' : ''}`} />
            <div className={`satellite-radio-wave wave-2 ${isHovered ? 'wave--rapid' : ''}`} />
          </div>
        )}

        {/* ─── MINIMALIST RETRO HUD BADGE (REACTS TO HOVER & CLICK) ─── */}
        <div className="space-room-hud mt-6 transition-all duration-300">
          <div
            className={`inline-flex items-center gap-2 border px-3.5 py-1.5 transition-all shadow-[2px_2px_0_0_#d8ff66] ${
              isHovered
                ? 'border-acid bg-black text-acid shadow-[3px_3px_0_0_#ff432b] -translate-y-1'
                : 'border-white/20 bg-black/70 text-white'
            }`}
          >
            <span
              className={`size-1.5 rounded-full ${isHovered ? 'bg-red animate-ping' : 'bg-acid animate-pulse'}`}
            />
            <span className="font-mono text-[9px] font-black uppercase tracking-[0.25em]">
              {isHovered ? '● TARGET LOCKED // CLICK TO DISRUPT GRAVITY' : sectorLabel}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
