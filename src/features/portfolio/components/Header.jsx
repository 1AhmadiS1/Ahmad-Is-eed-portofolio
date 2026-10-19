import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Menu, X, Terminal, Volume2, VolumeX, Sparkles } from 'lucide-react';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [coins, setCoins] = useState(2);
  const [score, setScore] = useState(9840);
  const [floatingPoints, setFloatingPoints] = useState([]);
  const nextPointId = useRef(0);

  // ─── 8-BIT RETRO SOUND SYNTHESIZER (Pure Web Audio API) ───
  const playSound = (type = 'select') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'coin') {
        // Classic 8-bit coin chime (B5 -> E6)
        osc.type = 'square';
        osc.frequency.setValueAtTime(987.77, ctx.currentTime);
        osc.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.07);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.32);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.32);
      } else if (type === 'select') {
        // Arcade menu select blip
        osc.type = 'square';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.05); // G5
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === 'toggle') {
        // Mechanical switch sound
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch {
      // Audio context restricted or unavailable
    }
  };

  // Track scroll position for dynamic sticky navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section tracking for active indicator
      const sections = ['contact', 'projects', 'skills', 'about'];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('about');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll on mobile when menu is active
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ─── PLAYABLE COIN INSERT HANDLER ───
  const handleInsertCoin = (e) => {
    e.preventDefault();
    e.stopPropagation();
    playSound('coin');
    setCoins((c) => c + 1);
    setScore((s) => s + 100);

    const newId = nextPointId.current++;
    setFloatingPoints((prev) => [...prev, { id: newId, text: '+100 PTS' }]);
    setTimeout(() => {
      setFloatingPoints((prev) => prev.filter((p) => p.id !== newId));
    }, 1000);
  };

  const navItems = [
    { id: 'about', num: '01', emoji: '👾', label: 'About', href: '#about' },
    { id: 'skills', num: '02', emoji: '⚡', label: 'Skills', href: '#skills' },
    { id: 'projects', num: '03', emoji: '⚔️', label: 'Projects', href: '#projects' },
    { id: 'contact', num: '04', emoji: '📮', label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'border-b-2 border-ink bg-paper/95 backdrop-blur-md shadow-[0_4px_0_0_#192124]'
            : 'border-b-2 border-ink bg-paper/85 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto w-full max-w-[1440px] px-3 sm:px-6 md:px-8 lg:px-12">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            {/* ─── RETRO ARCADE 1P BADGE ─── */}
            <a
              href="#about"
              aria-label="Ahmad Is'eed home"
              className="group relative flex items-center gap-2.5 sm:gap-3.5 focus:outline-none"
              onClick={() => {
                playSound('select');
                setMenuOpen(false);
              }}
            >
              {/* Arcade Cartridge Box / Monogram Insignia */}
              <div className="relative grid size-10 sm:size-11 shrink-0 place-items-center border-2 border-ink bg-ink text-white shadow-[3px_3px_0_0_#ff432b] transition-all duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:shadow-[5px_5px_0_0_#ff432b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent pointer-events-none" />
                <svg className="size-5 sm:size-6 text-white transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3L4 20H8.5L10 16.5H14L15.5 20H20L12 3Z" fill="currentColor" />
                  <path d="M12 7.5L13.5 12.5H10.5L12 7.5Z" fill="#ff432b" />
                  <circle cx="12" cy="10" r="0.9" fill="#00e599" />
                </svg>
                <span className="absolute -right-1 -top-1 size-2 bg-red border border-ink" />
                <span className="absolute -bottom-1 -left-1 size-1.5 bg-acid border border-ink" />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-wider text-ink transition-colors duration-150 group-hover:text-red">
                    AHMAD IS'EED
                  </span>
                  <span className="inline-block border border-ink bg-acid px-1 font-mono text-[8px] font-black uppercase tracking-wider text-ink shadow-[1px_1px_0_0_#192124]">
                    1P
                  </span>
                </div>

                <div className="mt-0.5 flex items-center gap-2 font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-muted">
                  <span className="text-red font-black inline-flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-red animate-pulse" />
                    SYS.ENGINEER
                  </span>
                  <span className="hidden sm:inline text-muted/50">//</span>
                  <span className="hidden sm:inline text-ink font-black">LVL.99</span>
                </div>
              </div>
            </a>

            {/* ─── PLAYABLE RETRO ARCADE BUTTONS NAV (md and above) ─── */}
            <nav className="hidden md:flex items-center gap-2 border-2 border-ink bg-paper-deep/60 p-1.5 shadow-[3px_3px_0_0_#192124]">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => playSound('select')}
                    className={`group relative flex items-center gap-1.5 border-2 px-3 py-1.5 font-mono text-xs font-black uppercase tracking-wider transition-all duration-100 ${
                      isActive
                        ? 'border-ink bg-red text-white shadow-[2px_2px_0_0_#192124] translate-x-[1px] translate-y-[1px]'
                        : 'border-transparent bg-white/70 text-ink hover:border-ink hover:bg-white hover:-translate-y-0.5 hover:shadow-[2px_2px_0_0_#192124]'
                    } active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`}
                  >
                    {/* Blinking arcade selection cursor */}
                    <span
                      className={`text-[10px] ${
                        isActive
                          ? 'text-acid inline-block animate-pulse'
                          : 'opacity-0 group-hover:opacity-100 text-red'
                      }`}
                    >
                      ▶
                    </span>

                    {/* Micro-hover playful jump on emojis */}
                    <span className="text-sm select-none transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-125 inline-block">
                      {item.emoji}
                    </span>

                    <span className="tracking-tight">{item.label}</span>

                    <span
                      className={`text-[9px] font-bold ${
                        isActive ? 'text-acid' : 'text-muted group-hover:text-ink'
                      }`}
                    >
                      [{item.num}]
                    </span>
                  </a>
                );
              })}
            </nav>

            {/* ─── RIGHT ARCADE HUD & PLAYABLE BUTTONS ─── */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Playable Coin Insert Button with Sound & Animation */}
              <div className="relative group">
                <button
                  type="button"
                  onClick={handleInsertCoin}
                  className="flex items-center gap-1.5 border-2 border-ink bg-acid px-2.5 py-1.5 font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-ink shadow-[3px_3px_0_0_#192124] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#192124] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                  title="Click to insert coin and get points!"
                >
                  <span className="text-sm transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125 inline-block">
                    🪙
                  </span>
                  <span className="hidden sm:inline">COIN</span>
                  <span className="rounded bg-ink px-1 text-white font-mono">{coins}</span>
                </button>

                {/* Floating points popups with bouncy float */}
                {floatingPoints.map((pt) => (
                  <span
                    key={pt.id}
                    className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs font-black text-red drop-shadow animate-bounce"
                  >
                    {pt.text}
                  </span>
                ))}
              </div>

              {/* 8-Bit Sound Mute Toggle */}
              <button
                type="button"
                onClick={() => {
                  setSoundEnabled((prev) => {
                    const next = !prev;
                    if (next) playSound('coin');
                    return next;
                  });
                }}
                className={`grid size-9 place-items-center border-2 border-ink transition-all shadow-[2px_2px_0_0_#192124] hover:-translate-y-0.5 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                  soundEnabled ? 'bg-white text-ink' : 'bg-paper-deep text-muted opacity-70'
                }`}
                title={soundEnabled ? 'Sound FX Enabled (Click to Mute)' : 'Sound FX Muted (Click to Enable)'}
                aria-label="Toggle retro game audio"
              >
                {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>

              {/* Start Game / Contact CTA */}
              <a
                href="#contact"
                onClick={() => playSound('coin')}
                className="group relative hidden lg:inline-flex items-center gap-1.5 border-2 border-ink bg-white px-3 py-1.5 font-mono text-[10px] font-black uppercase tracking-wider text-ink shadow-[3px_3px_0_0_#192124] transition-all hover:-translate-y-0.5 hover:bg-ink hover:text-white hover:shadow-[4px_4px_0_0_#ff432b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                <span>PRESS START</span>
                <ArrowUpRight
                  size={13}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-red"
                />
              </a>

              {/* Mobile Arcade Menu Toggle */}
              <button
                type="button"
                onClick={() => {
                  playSound('toggle');
                  setMenuOpen((prev) => !prev);
                }}
                className={`relative grid size-10 place-items-center border-2 border-ink transition-all md:hidden focus:outline-none shadow-[3px_3px_0_0_#192124] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                  menuOpen
                    ? 'bg-red text-white'
                    : 'bg-white text-ink hover:bg-paper-deep'
                }`}
                aria-label={menuOpen ? 'Close game menu' : 'Open game menu'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* ─── RETRO ARCADE MARQUEE TELEMETRY BAR ─── */}
        <div
          className={`border-t-2 border-ink bg-ink text-acid transition-all duration-200 ${
            scrolled ? 'h-0 overflow-hidden opacity-0' : 'h-6 sm:h-7 opacity-100'
          }`}
        >
          <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-3 sm:px-6 md:px-8 lg:px-12 font-mono text-[8px] sm:text-[9px] font-black uppercase tracking-widest overflow-hidden">
            <span className="flex items-center gap-1.5 truncate">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-red opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-red" />
              </span>
              <span className="text-white">SCORE</span>
              <span className="text-acid">{String(score).padStart(6, '0')}</span>
            </span>

            <span className="hidden sm:flex items-center gap-2 text-white">
              <span className="text-red animate-pulse">★</span>
              <span>MISSION: BACKEND & FULL-STACK ENGAGEMENTS</span>
              <span className="text-red animate-pulse">★</span>
            </span>

            <span className="flex items-center gap-1.5 text-acid">
              <Sparkles size={10} className="text-acid" />
              <span className="text-white">CREDIT</span>
              <span>{String(coins).padStart(2, '0')}</span>
            </span>
          </div>
        </div>
      </header>

      {/* ─── MOBILE ARCADE PAUSE MENU DRAWER ─── */}
      {menuOpen && (
        <div
          className="fixed inset-0 top-16 sm:top-20 z-40 bg-ink/50 backdrop-blur-sm md:hidden transition-opacity duration-200"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed left-0 right-0 top-16 sm:top-20 z-40 origin-top border-b-4 border-ink bg-paper px-4 py-5 shadow-2xl transition-all duration-200 ease-out md:hidden ${
          menuOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="space-y-3.5">
          {/* Arcade Cabinet Pause Banner */}
          <div className="flex items-center justify-between border-2 border-ink bg-ink px-3 py-1.5 font-mono text-[10px] font-black uppercase tracking-widest text-acid">
            <span className="flex items-center gap-1.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-red opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-red" />
              </span>
              <span>PAUSE // SELECT STAGE</span>
            </span>
            <span className="text-white">HP: ♥♥♥</span>
          </div>

          {/* Playable Arcade Nav Buttons */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    playSound('select');
                    setMenuOpen(false);
                  }}
                  className={`group flex items-center justify-between border-2 border-ink p-3 font-mono font-black uppercase tracking-wider transition-all duration-100 ${
                    isActive
                      ? 'bg-red text-white shadow-[4px_4px_0_0_#192124] translate-x-1'
                      : 'bg-white text-ink shadow-[3px_3px_0_0_#192124] hover:bg-paper-deep'
                  } active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg select-none">{item.emoji}</span>
                    <span className="text-red font-mono text-xs">[{item.num}]</span>
                    <span className="text-sm font-black tracking-tight">{item.label}</span>
                  </div>

                  <span className="text-xs group-hover:translate-x-1 transition-transform">
                    {isActive ? '◀ READY' : '▶'}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Arcade Insert Coin & Score in Mobile Drawer */}
          <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px] font-black">
            <button
              type="button"
              onClick={handleInsertCoin}
              className="flex items-center justify-center gap-1.5 border-2 border-ink bg-acid p-2.5 text-ink shadow-[3px_3px_0_0_#192124] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            >
              <span className="text-sm">🪙</span>
              <span>INSERT COIN ({coins})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSoundEnabled((prev) => {
                  const next = !prev;
                  if (next) playSound('coin');
                  return next;
                });
              }}
              className="flex items-center justify-center gap-1.5 border-2 border-ink bg-white p-2.5 text-ink shadow-[3px_3px_0_0_#192124] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            >
              {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              <span>AUDIO: {soundEnabled ? 'ON' : 'OFF'}</span>
            </button>
          </div>

          {/* Primary Action Button */}
          <a
            href="#contact"
            onClick={() => {
              playSound('coin');
              setMenuOpen(false);
            }}
            className="flex w-full items-center justify-center gap-2 border-2 border-ink bg-ink p-3 font-mono text-xs font-black uppercase tracking-wider text-acid shadow-[3px_3px_0_0_#ff432b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            <Terminal size={14} />
            <span>PRESS START // GET IN TOUCH</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </>
  );
}
