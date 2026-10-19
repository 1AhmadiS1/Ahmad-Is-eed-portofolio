import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past 350px
      setVisible(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    // Optional retro 8-bit warp sound effect
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.22);
      }
    } catch {
      // Audio context restricted or unavailable
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <aside
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 transition-all duration-300 ease-out ${
        visible
          ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto'
          : 'translate-y-6 opacity-0 scale-90 pointer-events-none'
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        className="group relative flex items-center gap-2 border-2 border-ink bg-paper px-3 py-2.5 sm:px-3.5 sm:py-2.5 font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-ink shadow-[4px_4px_0_0_#192124] transition-all duration-150 hover:-translate-y-0.5 hover:bg-ink hover:text-white hover:shadow-[5px_5px_0_0_#ff432b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus:outline-none"
        title="Warp to top"
      >
        {/* Animated pixel arrow icon */}
        <div className="grid size-5 sm:size-6 place-items-center rounded bg-ink text-acid transition-colors group-hover:bg-red group-hover:text-white">
          <ArrowUp size={14} strokeWidth={3} className="transition-transform group-hover:-translate-y-0.5" />
        </div>

        {/* Retro button label */}
        <span className="tracking-tight">TOP</span>

        {/* Retro stage indicator badge */}
        <span className="hidden sm:inline border border-ink/20 px-1 font-mono text-[8px] font-bold text-muted group-hover:border-white/30 group-hover:text-acid">
          ▲ 1-1
        </span>
      </button>
    </aside>
  );
}
