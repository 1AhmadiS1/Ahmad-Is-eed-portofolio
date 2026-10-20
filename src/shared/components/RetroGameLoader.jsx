import { useState, useEffect } from 'react';

const RETRO_EMOJIS = ['👾', '🕹️', '🪙', '🍄', '⚔️', '💣', '⭐', '💾', '💎', '🏆'];

const RETRO_MESSAGES = [
  { min: 0, text: '🪙 INSERT COIN... CONNECTING TO SYSTEM' },
  { min: 20, text: '🕹️ BOOTING 8-BIT RUNTIME ENGINES' },
  { min: 45, text: '👾 SPAWNING BACKEND PIPELINES & SCHEMAS' },
  { min: 70, text: '⚔️ EQUIPPING PRODUCTION FIREWALLS' },
  { min: 90, text: '⭐ OVERCLOCKING FULL-STACK SERVERS' },
  { min: 100, text: '🏆 LEVEL 1 READY: PLAYER 1 START!' },
];

export function RetroGameLoader({ onComplete }) {
  const [progress, setProgress] = useState(1);
  const [spriteIndex, setSpriteIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [hideScreen, setHideScreen] = useState(false);

  // Strictly lock document and body scroll to eliminate any scrollbar
  useEffect(() => {
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
    };
  }, []);

  useEffect(() => {
    // Increment progress from 1 to 100 in retro arcade pacing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const jump = prev < 70 ? Math.floor(Math.random() * 3) + 2 : Math.floor(Math.random() * 2) + 1;
        const next = Math.min(100, prev + jump);
        return next;
      });
    }, 36);

    return () => clearInterval(interval);
  }, []);

  // Cycle emojis as progress advances
  useEffect(() => {
    const emojiInterval = setInterval(() => {
      setSpriteIndex((prev) => (prev + 1) % RETRO_EMOJIS.length);
    }, 160);

    return () => clearInterval(emojiInterval);
  }, []);

  // When reaching 100%, show victory banner briefly then slide up
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsDone(true);
        setTimeout(() => {
          setHideScreen(true);
          document.documentElement.style.overflow = '';
          document.body.style.overflow = '';
          if (onComplete) onComplete();
        }, 400);
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  if (hideScreen) return null;

  // Determine current retro message
  const currentMessage =
    [...RETRO_MESSAGES].reverse().find((m) => progress >= m.min)?.text ||
    RETRO_MESSAGES[0].text;

  // Total blocks for the pixel bar (20 blocks total)
  const totalBlocks = 20;
  const filledBlocks = Math.round((progress / 100) * totalBlocks);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-paper px-4 transition-all duration-500 ease-in-out ${
        isDone ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
      style={{
        backgroundImage:
          'linear-gradient(rgba(25, 33, 36, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(25, 33, 36, 0.05) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* ─── RETRO ARCADE CABINET BOX ─── */}
      <div className="relative w-full max-w-lg border-2 border-ink bg-paper p-6 sm:p-8 shadow-[8px_8px_0_0_#192124]">
        {/* Retro Header Bar */}
        <div className="flex items-center justify-between border-b-2 border-ink pb-3 font-mono text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">
          <div className="flex items-center gap-2">
            <span className="inline-block size-2 rounded-full bg-red animate-ping" />
            <span className="text-red font-black">AHMAD IS'EED</span>
            <span className="text-muted/40">//</span>
            <span className="text-ink">SYSTEM BOOT</span>
          </div>

          <div className="flex items-center gap-1.5 text-muted">
            <span className="text-ink font-bold">1P READY</span>
            <span className="mx-1">|</span>
            <span className="text-red">WORLD 1-1</span>
          </div>
        </div>

        {/* Big Retro Animated Emoji Hero Stage */}
        <div className="my-8 flex flex-col items-center justify-center text-center">
          {/* Animated Sprite with floating bounce */}
          <div className="relative mb-3 flex size-24 items-center justify-center border-2 border-dashed border-ink/40 bg-white shadow-[4px_4px_0_0_#ff432b]">
            <span className="text-5xl transition-transform duration-150 transform hover:scale-125 select-none">
              {RETRO_EMOJIS[spriteIndex]}
            </span>

            {/* Corner pixel dots */}
            <span className="absolute -left-1 -top-1 size-2 bg-red" />
            <span className="absolute -right-1 -top-1 size-2 bg-ink" />
            <span className="absolute -left-1 -bottom-1 size-2 bg-ink" />
            <span className="absolute -right-1 -bottom-1 size-2 bg-red" />
          </div>

          {/* Running Emoji Party Line */}
          <div className="mb-4 flex items-center justify-center gap-2.5 text-lg select-none">
            {RETRO_EMOJIS.slice(0, 7).map((emoji, idx) => (
              <span
                key={idx}
                className={`transition-all duration-300 ${
                  idx === spriteIndex % 7
                    ? 'scale-125 -translate-y-1 drop-shadow-md'
                    : 'opacity-40 grayscale-[40%]'
                }`}
              >
                {emoji}
              </span>
            ))}
          </div>

          {/* Percentage Counter with Giant Typography */}
          <div className="flex items-baseline gap-2 font-mono">
            <span className="text-5xl sm:text-6xl font-black tracking-tight text-ink">
              {progress}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-red">%</span>
          </div>

          {/* Retro Status Text */}
          <p className="mt-3 min-h-[20px] font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-muted">
            {currentMessage}
          </p>
        </div>

        {/* ─── 8-BIT CHUNKY PROGRESS BAR ─── */}
        <div className="space-y-2">
          {/* Progress track */}
          <div className="relative flex h-7 sm:h-8 w-full items-center border-2 border-ink bg-white p-1 shadow-inner">
            <div
              className="h-full bg-red transition-all duration-100 ease-out flex items-center justify-end overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Animated striped bar pattern */}
              <div
                className="h-full w-full opacity-25"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, #000 0, #000 6px, transparent 6px, transparent 12px)',
                }}
              />
            </div>

            {/* Walking Sprite Indicator along progress track */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none transition-all duration-100 select-none text-base"
              style={{ left: `${Math.max(4, Math.min(96, progress))}%` }}
            >
              <span className="drop-shadow-md">
                {progress === 100 ? '🏁' : '👾'}
              </span>
            </div>
          </div>

          {/* Retro ASCII Bar Blocks Display */}
          <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] font-bold text-muted uppercase tracking-widest pt-1">
            <span>
              {'█'.repeat(filledBlocks)}
              {'░'.repeat(totalBlocks - filledBlocks)}
            </span>
            <span className="text-ink font-black">
              {progress < 100 ? 'LOADING...' : 'COMPLETE!'}
            </span>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 flex items-center justify-between border-t-2 border-ink/15 pt-4 font-mono text-[10px] font-black uppercase tracking-wider">
          <span className="flex items-center gap-1.5 text-muted">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>SYS.STARTUP // AHMAD IS'EED</span>
          </span>

          <span className="flex items-center gap-1 text-red font-mono font-bold tracking-widest text-[9px]">
            <span>INSERT COIN</span>
            <span>🪙</span>
          </span>
        </div>
      </div>

      {/* Retro Bottom Coin Slot Note */}
      <div className="mt-4 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-muted animate-pulse">
        ★ READY FOR PRODUCTION SYSTEMS ★
      </div>
    </div>
  );
}
