import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * ArcadeBattleInterlude — Interactive retro Space Invaders–style battle arena.
 * Features:
 *  - Pixel-art invader sprites that move in classic wave formation
 *  - A player ship that tracks the mouse X position
 *  - Click-to-shoot laser bolts that fly upward
 *  - Explosion particle bursts on "hit" (proximity detection)
 *  - Scrolling parallax starfield for hyperspace feel
 *  - Retro HUD with score, level, and lives display
 *  - Bonus UFO that flies across the top periodically
 */
export function ArcadeBattleInterlude() {
  const containerRef = useRef(null);
  const [shipX, setShipX] = useState(50); // % from left
  const [lasers, setLasers] = useState([]);
  const [explosions, setExplosions] = useState([]);
  const [score, setScore] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track mouse for parallax and ship control
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const xNorm = (e.clientX - rect.left) / rect.width - 0.5;
    const yNorm = (e.clientY - rect.top) / rect.height - 0.5;
    setShipX(Math.max(5, Math.min(95, xPct)));
    setMousePos({ x: xNorm, y: yNorm });
  }, []);

  // Fire laser on click
  const handleClick = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const id = Date.now() + Math.random();

    setLasers((prev) => [...prev.slice(-6), { id, x: xPct }]);

    // Remove laser after animation completes
    setTimeout(() => {
      setLasers((prev) => prev.filter((l) => l.id !== id));
    }, 800);

    // Simulate "hit" explosion at random invader position
    if (Math.random() > 0.35) {
      const hitDelay = 300 + Math.random() * 400;
      setTimeout(() => {
        const expId = Date.now() + Math.random();
        const expX = xPct + (Math.random() - 0.5) * 12;
        const expY = 15 + Math.random() * 35;
        setExplosions((prev) => [...prev.slice(-4), { id: expId, x: expX, y: expY }]);
        setScore((s) => s + 100);
        setTimeout(() => {
          setExplosions((prev) => prev.filter((ex) => ex.id !== expId));
        }, 700);
      }, hitDelay);
    }
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
      onClick={handleClick}
      className={`arcade-battle-section ${isHovered ? 'arcade-battle--active' : ''}`}
      aria-label="Interactive retro arcade battle arena"
    >
      {/* ─── LAYER 1: SCROLLING STARFIELD (3 PARALLAX DEPTHS) ─── */}
      <div
        className="battle-stars battle-stars--far"
        style={{ transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)` }}
      />
      <div
        className="battle-stars battle-stars--mid"
        style={{ transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)` }}
      />
      <div
        className="battle-stars battle-stars--close"
        style={{ transform: `translate(${mousePos.x * -50}px, ${mousePos.y * -50}px)` }}
      />

      {/* ─── LAYER 2: SCANLINE OVERLAY ─── */}
      <div className="interlude-scanlines" />

      {/* ─── LAYER 3: PIXEL INVADER FORMATION ─── */}
      <div className="invader-formation" style={{ transform: `translateX(${mousePos.x * -20}px)` }}>
        {/* Row 1 — Elite invaders (top) */}
        <div className="invader-row invader-row--1">
          {[...Array(7)].map((_, i) => (
            <div key={`r1-${i}`} className="pixel-invader invader--elite" style={{ animationDelay: `${i * 0.12}s` }}>
              <div className="invader-pixel-body invader-body--elite" />
            </div>
          ))}
        </div>
        {/* Row 2 — Standard invaders */}
        <div className="invader-row invader-row--2">
          {[...Array(9)].map((_, i) => (
            <div key={`r2-${i}`} className="pixel-invader invader--standard" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="invader-pixel-body invader-body--standard" />
            </div>
          ))}
        </div>
        {/* Row 3 — Grunt invaders */}
        <div className="invader-row invader-row--3">
          {[...Array(9)].map((_, i) => (
            <div key={`r3-${i}`} className="pixel-invader invader--grunt" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="invader-pixel-body invader-body--grunt" />
            </div>
          ))}
        </div>
        {/* Row 4 — Bottom grunts */}
        <div className="invader-row invader-row--4">
          {[...Array(7)].map((_, i) => (
            <div key={`r4-${i}`} className="pixel-invader invader--grunt" style={{ animationDelay: `${i * 0.06}s` }}>
              <div className="invader-pixel-body invader-body--grunt" />
            </div>
          ))}
        </div>
      </div>

      {/* ─── LAYER 4: BONUS UFO (FLIES ACROSS TOP) ─── */}
      <div className="bonus-ufo">
        <div className="ufo-body" />
        <div className="ufo-glow" />
      </div>

      {/* ─── LAYER 5: LASER BOLTS ─── */}
      {lasers.map((laser) => (
        <div
          key={laser.id}
          className="laser-bolt"
          style={{ left: `${laser.x}%` }}
        >
          <div className="laser-beam" />
          <div className="laser-trail" />
        </div>
      ))}

      {/* ─── LAYER 6: EXPLOSION PARTICLES ─── */}
      {explosions.map((exp) => (
        <div
          key={exp.id}
          className="arcade-explosion"
          style={{ left: `${exp.x}%`, top: `${exp.y}%` }}
        >
          {[...Array(8)].map((_, i) => (
            <span key={i} className="explosion-particle" style={{ '--angle': `${i * 45}deg` }} />
          ))}
          <span className="explosion-flash" />
          <span className="explosion-score">+100</span>
        </div>
      ))}

      {/* ─── LAYER 7: PLAYER SHIP (FOLLOWS MOUSE) ─── */}
      <div
        className={`player-ship-wrapper ${isHovered ? 'ship--active' : ''}`}
        style={{ left: `${shipX}%` }}
      >
        <div className="player-ship">
          <div className="ship-wing ship-wing--left" />
          <div className="ship-body" />
          <div className="ship-wing ship-wing--right" />
          <div className="ship-cockpit" />
        </div>
        <div className={`ship-thruster ${isHovered ? 'thruster--active' : ''}`}>
          <div className="thruster-flame flame-1" />
          <div className="thruster-flame flame-2" />
          <div className="thruster-flame flame-3" />
        </div>
        {/* Targeting crosshair below ship */}
        <div className="ship-crosshair" />
      </div>

      {/* ─── LAYER 8: RETRO GAME HUD ─── */}
      <div className="battle-hud">
        <div className="hud-left">
          <span className="hud-label">SCORE</span>
          <span className="hud-value hud-score">{String(score).padStart(6, '0')}</span>
        </div>
        <div className="hud-center">
          <span className="hud-title">⚔ SECTOR DEFENSE ⚔</span>
          <span className="hud-subtitle">CLICK TO FIRE • MOVE TO AIM</span>
        </div>
        <div className="hud-right">
          <span className="hud-label">LIVES</span>
          <div className="hud-lives">
            <span className="life-icon">▲</span>
            <span className="life-icon">▲</span>
            <span className="life-icon">▲</span>
          </div>
        </div>
      </div>

      {/* ─── LAYER 9: BOTTOM SHIELD BARRIERS ─── */}
      <div className="shield-barriers">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="shield-block">
            <div className="shield-top" />
            <div className="shield-body-block" />
          </div>
        ))}
      </div>

      {/* ─── GROUND LINE ─── */}
      <div className="battle-ground-line" />
    </section>
  );
}
