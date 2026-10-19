import { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, ArrowUpRight, MessageSquare, GitBranch, Radio, Terminal } from 'lucide-react';

function LinkedinIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.9 0-1.62.72-1.62 1.62 0 .9.72 1.62 1.62 1.62.9 0 1.62-.72 1.62-1.62Z" />
    </svg>
  );
}

export function ContactSection() {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    }
  };

  return (
    <section
      id="contact"
      className="contact-section relative border-t-2 border-ink w-full max-w-full overflow-x-hidden bg-paper"
    >
      {/* ─── ARCADE TOP HUD BAR ─── */}
      <div className="skills-header-bar wave-child-1">
        <div className="mx-auto max-w-[1580px] px-4 sm:px-6 md:px-8 lg:px-12 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-8 place-items-center border-2 border-ink bg-red text-white shadow-[2px_2px_0_0_#192124]">
              <Radio size={16} />
            </div>
            <div>
              <span className="font-mono text-[8px] font-black uppercase tracking-[0.2em] text-red block">
                STAGE 04 // COMM RELAY
              </span>
              <span className="font-mono text-[11px] font-black uppercase tracking-wider text-ink">
                DIRECT TRANSMISSION DECK
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4 font-mono text-[9px] font-black uppercase tracking-widest">
            <span className="text-muted flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-acid animate-ping" />
              STATUS: <span className="text-acid font-bold">READY TO TRANSMIT</span>
            </span>
            <span className="text-muted">
              AVAILABILITY: <span className="text-ink font-bold">OPEN FOR OPPORTUNITIES</span>
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1580px] px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-16">
        {/* ─── SECTION TITLE & HOOK ─── */}
        <div className="wave-child-2 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="kicker">⚡ Initiate Contact</span>
            <h2 className="section-title">
              Let's Build<br className="hidden sm:block" /> Something Real
            </h2>
            <p className="mt-4 max-w-[580px] text-sm sm:text-base font-semibold leading-relaxed text-muted">
              Available for full-time backend and full-stack engineering roles, microservice architectures, and ambitious software platforms. Reach out via email, phone, or any channel below.
            </p>
          </div>

          {/* Quick response pledge pill */}
          <div className="self-start md:self-end border-2 border-ink bg-paper p-3 shadow-[3px_3px_0_0_#ff432b]">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-red" />
              <span className="font-mono text-[10px] font-black uppercase tracking-wider text-ink">
                LATENCY // RESPONSE TIME: &lt; 24H
              </span>
            </div>
          </div>
        </div>

        {/* ─── TRANSMISSION CHANNELS GRID ─── */}
        <div className="wave-child-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          
          {/* 1. EMAIL CHANNEL */}
          <div className="contact-card border-2 border-ink bg-paper p-5 sm:p-6 shadow-[4px_4px_0_0_#192124] hover:shadow-[6px_6px_0_0_#ff432b] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b-2 border-ink pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="grid size-7 place-items-center border border-ink bg-red text-white shadow-[1px_1px_0_0_#192124]">
                    <Mail size={14} />
                  </span>
                  <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-red">
                    CHANNEL 01 // EMAIL
                  </span>
                </div>
                <span className="font-mono text-[8px] font-bold text-acid bg-ink px-1.5 py-0.5">
                  PRIMARY
                </span>
              </div>

              <span className="font-mono text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">
                DIRECT INBOX
              </span>
              <a
                href="mailto:ahmad.imad.iseed@gmail.com"
                className="font-mono text-sm sm:text-base font-black text-ink hover:text-red transition-colors block break-all"
              >
                ahmad.imad.iseed@gmail.com
              </a>
              <p className="mt-2 text-xs font-semibold text-muted leading-relaxed">
                Send job opportunities, project inquiries, or interview invitations directly to my personal inbox.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-ink/15 flex items-center gap-2">
              <a
                href="mailto:ahmad.imad.iseed@gmail.com"
                className="flex-1 arcade-btn arcade-btn--live justify-center"
              >
                <Mail size={12} />
                <span>SEND EMAIL</span>
                <ArrowUpRight size={12} />
              </a>

              <button
                type="button"
                onClick={() => handleCopy('ahmad.imad.iseed@gmail.com', 'email')}
                className="arcade-btn bg-paper hover:bg-ink hover:text-white"
                title="Copy email to clipboard"
              >
                {copiedKey === 'email' ? <Check size={13} className="text-acid" /> : <Copy size={13} />}
                <span>{copiedKey === 'email' ? 'COPIED!' : 'COPY'}</span>
              </button>
            </div>
          </div>

          {/* 2. PHONE & WHATSAPP CHANNEL */}
          <div className="contact-card border-2 border-ink bg-paper p-5 sm:p-6 shadow-[4px_4px_0_0_#192124] hover:shadow-[6px_6px_0_0_#25d366] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b-2 border-ink pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="grid size-7 place-items-center border border-ink bg-[#25d366] text-ink shadow-[1px_1px_0_0_#192124]">
                    <Phone size={14} />
                  </span>
                  <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-[#0d9241]">
                    CHANNEL 02 // MOBILE & WA
                  </span>
                </div>
                <span className="font-mono text-[8px] font-bold text-white bg-ink px-1.5 py-0.5">
                  DIRECT
                </span>
              </div>

              <span className="font-mono text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">
                CELLULAR & WHATSAPP
              </span>
              <a
                href="tel:+972592124252"
                className="font-mono text-base sm:text-lg font-black text-ink hover:text-[#0d9241] transition-colors block"
              >
                +972 59-212-4252
              </a>
              <p className="mt-2 text-xs font-semibold text-muted leading-relaxed">
                Available for urgent calls, WhatsApp discussions, and remote interviews.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-ink/15 flex items-center gap-2">
              <a
                href="https://wa.me/972592124252"
                target="_blank"
                rel="noreferrer"
                className="flex-1 arcade-btn bg-[#25d366] text-ink hover:brightness-105 justify-center font-bold"
              >
                <MessageSquare size={12} />
                <span>WHATSAPP</span>
                <ArrowUpRight size={12} />
              </a>

              <a
                href="tel:+972592124252"
                className="arcade-btn bg-paper hover:bg-ink hover:text-white"
                title="Call direct"
              >
                <Phone size={13} />
                <span>CALL</span>
              </a>
            </div>
          </div>

          {/* 3. LOCATION & BASE STATION */}
          <div className="contact-card border-2 border-ink bg-paper p-5 sm:p-6 shadow-[4px_4px_0_0_#192124] hover:shadow-[6px_6px_0_0_#2556e8] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b-2 border-ink pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="grid size-7 place-items-center border border-ink bg-blue text-white shadow-[1px_1px_0_0_#192124]">
                    <MapPin size={14} />
                  </span>
                  <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-blue">
                    BASE STATION // LOCATION
                  </span>
                </div>
                <span className="font-mono text-[8px] font-bold text-white bg-ink px-1.5 py-0.5">
                  TIMEZONE GMT+3
                </span>
              </div>

              <span className="font-mono text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">
                HEADQUARTERS
              </span>
              <div className="font-mono text-base sm:text-lg font-black text-ink flex items-center gap-2">
                <span>Hebron, Palestine</span>
                <span className="text-lg" title="Palestine">🇵🇸</span>
              </div>
              <p className="mt-2 text-xs font-semibold text-muted leading-relaxed">
                Open to remote positions worldwide across European, Gulf, and US time zones, as well as hybrid or relocation opportunities.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-ink/15">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-ink bg-paper-deep/60 p-2 border border-ink/20">
                <span className="text-muted text-[10px]">WORK MODALITY:</span>
                <span className="text-blue font-black">REMOTE & HYBRID</span>
              </div>
            </div>
          </div>

          {/* 4. LINKEDIN PROFESSIONAL PROFILE */}
          <div className="contact-card border-2 border-ink bg-paper p-5 sm:p-6 shadow-[4px_4px_0_0_#192124] hover:shadow-[6px_6px_0_0_#0077b5] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b-2 border-ink pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="grid size-7 place-items-center border border-ink bg-[#0077b5] text-white shadow-[1px_1px_0_0_#192124]">
                    <LinkedinIcon size={14} />
                  </span>
                  <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-[#0077b5]">
                    CHANNEL 03 // NETWORK
                  </span>
                </div>
                <span className="font-mono text-[8px] font-bold text-white bg-ink px-1.5 py-0.5">
                  VERIFIED
                </span>
              </div>

              <span className="font-mono text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">
                PROFESSIONAL DOSSIER
              </span>
              <a
                href="https://linkedin.com/in/ahmad-is-eed"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-base font-black text-ink hover:text-[#0077b5] transition-colors block"
              >
                linkedin.com/in/ahmad-is-eed
              </a>
              <p className="mt-2 text-xs font-semibold text-muted leading-relaxed">
                Connect for professional networking, recommendations, project reviews, and career updates.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-ink/15">
              <a
                href="https://linkedin.com/in/ahmad-is-eed"
                target="_blank"
                rel="noreferrer"
                className="w-full arcade-btn arcade-btn--linkedin justify-center py-2.5"
              >
                <LinkedinIcon size={13} />
                <span>CONNECT ON LINKEDIN</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          {/* 5. GITHUB ENGINEERING CODEBASE */}
          <div className="contact-card border-2 border-ink bg-paper p-5 sm:p-6 shadow-[4px_4px_0_0_#192124] hover:shadow-[6px_6px_0_0_#192124] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div>
              <div className="flex items-center justify-between border-b-2 border-ink pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="grid size-7 place-items-center border border-ink bg-ink text-white shadow-[1px_1px_0_0_#ff432b]">
                    <GitBranch size={14} />
                  </span>
                  <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-red">
                    CHANNEL 04 // CODE REPOSITORIES
                  </span>
                </div>
                <span className="font-mono text-[8px] font-bold text-acid bg-ink px-1.5 py-0.5">
                  ACTIVE
                </span>
              </div>

              <span className="font-mono text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">
                ENGINEERING PROFILE
              </span>
              <a
                href="https://github.com/1AhmadiS1"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-base sm:text-lg font-black text-ink hover:text-red transition-colors block"
              >
                github.com/1AhmadiS1
              </a>
              <p className="mt-2 text-xs sm:text-sm font-semibold text-muted leading-relaxed">
                Inspect backend source code, architectural patterns, Docker configurations, and continuous integration workflows for my production projects.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-ink/15 flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[10px] font-bold text-muted uppercase">
                PUBLIC REPOS • COMMITS • APIS • DOCKERFILES
              </span>

              <a
                href="https://github.com/1AhmadiS1"
                target="_blank"
                rel="noreferrer"
                className="arcade-btn arcade-btn--github py-2.5 px-4"
              >
                <GitBranch size={13} />
                <span>EXPLORE ALL ON GITHUB</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

        </div>

        {/* ─── BOTTOM RETRO TERMINAL BANNER ─── */}
        <div className="mt-12 border-2 border-ink bg-ink p-4 sm:p-5 shadow-[4px_4px_0_0_#ff432b]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-acid block">
                  READY TO DEPLOY
                </span>
                <span className="font-mono text-sm sm:text-base font-black text-white uppercase tracking-wider">
                  Let's make impactful engineering happen
                </span>
              </div>
            </div>

            <a
              href="mailto:ahmad.imad.iseed@gmail.com?subject=Engineering%20Opportunity"
              className="arcade-btn bg-acid text-ink hover:brightness-110 font-black py-2.5 px-5 text-xs shadow-[3px_3px_0_0_#ffffff]"
            >
              <span>TRANSMIT MESSAGE NOW</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
