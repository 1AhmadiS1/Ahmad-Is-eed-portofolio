import { ArrowDown, ArrowUpRight, MapPin, Terminal, FileDown } from 'lucide-react';
import { HeroVisual } from './HeroVisual';
import { playArcadeSound } from '@/shared/utils/sound';

export function Hero() {
  return (
    <section
      id="about"
      className="relative mx-auto grid w-full max-w-[1440px] gap-10 px-4 pb-14 pt-10 sm:px-6 md:px-8 lg:min-h-[calc(100vh-76px)] lg:grid-cols-[1fr_500px] lg:items-center lg:px-12 lg:py-16 overflow-x-clip"
    >
      <span id="top" className="absolute -top-24" />
      {/* LEFT SIDE */}
      <div className="min-w-0">

        {/* Location / status (Wave 1) */}
        <div className="hero-wave-1 mb-8 flex flex-wrap items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-muted">
          <span className="inline-flex items-center gap-1.5 text-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-red shadow-[0_0_0_3px_rgba(220,38,38,0.1)]" />
          </span>
          <span className="text-red">01</span>

          <span className="mx-1 h-px w-7 bg-ink/20" />

          <MapPin size={13} />

          <span>Hebron, Palestine</span>
        </div>

        {/* Technical label (Wave 2) */}
        <div className="hero-wave-2 mb-5 inline-flex items-center gap-2 font-mono text-[11px] font-black uppercase tracking-[0.22em] text-red">
          <Terminal size={14} />
          Software Engineer & Systems Builder
        </div>

        {/* Name (Wave 3) */}
        <div className="hero-wave-3 relative border-l-2 border-red pl-4">
          <span className="absolute -top-4 left-4 font-mono text-[9px] font-black tracking-[0.18em] text-muted">
            /01
          </span>

          <h1 className="clean-name">
            Ahmad Is'eed
          </h1>
        </div>

        {/* Main copy (Wave 4) */}
        <div className="hero-wave-4 mt-9 max-w-[720px] pl-3 sm:pl-5">
          <p className="mb-2 font-mono text-xs font-black uppercase tracking-[0.18em] text-red">
            Full-stack Developer
          </p>

          <h2 className="max-w-[680px] text-[clamp(1.75rem,3.4vw,3.8rem)] font-black leading-[1.05] tracking-[-0.035em] text-ink break-words">
            Turning ideas into{' '}
            <span className="relative inline-block after:absolute after:bottom-[-5px] after:left-0 after:right-0 after:h-[2px] after:bg-red">
              production-ready systems.
            </span>
          </h2>

          <p className="mt-6 max-w-[600px] text-[15px] leading-7 text-muted">
            I'm a backend-focused developer who enjoys building the systems that make applications work. I mainly work with Python, Django REST Framework, PostgreSQL, and React, and I've built and deployed APIs, dashboards, and full-stack applications using Docker and AWS. I like solving real problems, learning by building, and turning ideas into reliable software.
          </p>
        </div>

        {/* Buttons (Wave 5) */}
        <div className="hero-wave-5 mt-8 flex flex-wrap gap-2.5 sm:gap-3 max-w-full">
          <a
            href="#projects"
            onClick={() => playArcadeSound('select')}
            className="solid-button text-[11px] sm:text-xs"
          >
            See the work
            <ArrowDown size={17} strokeWidth={2.4} />
          </a>

          <a
            href="/Ahmad_Iseed_CV.pdf"
            download="Ahmad_Iseed_CV.pdf"
            onClick={() => playArcadeSound('select')}
            className="outline-button large text-[11px] sm:text-xs border-2 border-ink bg-white shadow-[3px_3px_0_0_#ff432b] hover:bg-paper-deep hover:translate-x-[-1px] hover:translate-y-[-2px] transition-all"
            title="Download Ahmad Is'eed Curriculum Vitae (PDF)"
          >
            Download CV
            <FileDown size={16} strokeWidth={2.4} className="text-red" />
          </a>

          <a
            href="mailto:ahmad.imad.iseed@gmail.com"
            onClick={() => playArcadeSound('select')}
            className="outline-button large text-[11px] sm:text-xs"
          >
            Contact Ahmad
            <ArrowUpRight size={15} strokeWidth={2.4} />
          </a>
        </div>

        {/* Stack (Wave 6) */}
        <div className="hero-wave-6 mt-10 flex flex-wrap items-center gap-4 border-t border-ink/10 pt-5">
          <span className="font-mono text-[9px] font-black tracking-[0.2em] text-muted">
            CORE STACK
          </span>

          <div className="flex flex-wrap items-center font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-ink">
            <span className="mx-3 h-1 w-1 rounded-full bg-red" />
            <span>Python</span>

            <span className="mx-3 h-1 w-1 rounded-full bg-red" />

            <span>Django REST</span>

            <span className="mx-3 h-1 w-1 rounded-full bg-red" />

            <span>React</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (Wave Visual) */}
      <div className="hero-wave-visual">
        <HeroVisual />
      </div>
    </section>
  );
}