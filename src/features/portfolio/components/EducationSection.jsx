import { useState, useEffect, useRef } from 'react';
import { GraduationCap, Award, ChevronRight, Star, Zap } from 'lucide-react';

/* ─── ARCADE SOUND (same pattern as SkillsSection) ─── */
function playBlip(type = 'select') {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    if (type === 'select') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.14);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(660, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.07);
    }
  } catch { /* silent */ }
}

/* ─── DATA ─── */
const EDUCATION = [
  {
    id: 'ptu',
    type: 'degree',
    icon: '🎓',
    institution: 'Palestine Technical University – Kadoorie',
    location: 'Hebron, Palestine',
    degree: 'B.A. in Computer Systems Engineering (IoT)',
    period: 'Sep 2021 – Jun 2026',
    gpa: '85.28 / 100',
    color: '#2556e8',
    stage: 'STAGE 01',
  },
];

const CERTIFICATIONS = [
  {
    id: 'aws',
    type: 'cert',
    icon: '☁️',
    title: 'AWS Cloud Practitioner Essentials',
    issuer: 'AWS Training & Certification',
    period: 'Jun 2026 – Jul 2026',
    color: '#ff9900',
    stage: 'CERT 01',
  },
  {
    id: 'django-udemy',
    type: 'cert',
    icon: '🐍',
    title: 'Backend REST API with Python & Django',
    issuer: 'Mark Winterbottom (Udemy)',
    period: 'Dec 2025 – Mar 2026',
    color: '#092e20',
    stage: 'CERT 02',
  },
  {
    id: 'django-max',
    type: 'cert',
    icon: '🐎',
    title: 'Python Django',
    issuer: 'Maximilian Schwarzmüller (Udemy)',
    period: 'Oct 2025 – Dec 2025',
    color: '#ff432b',
    stage: 'CERT 03',
  },
  {
    id: 'udacity',
    type: 'cert',
    icon: '📊',
    title: 'Programming for Data Science',
    issuer: 'Udacity',
    period: null,
    color: '#02b3e4',
    stage: 'CERT 04',
  },
];

/* ─── TYPING TEXT ─── */
function TypingText({ text, delay = 0 }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 35);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [started, text, delay]);

  return (
    <span ref={ref}>
      {displayed}
      {displayed.length < text.length && (
        <span style={{ animation: 'edu-blink 0.7s step-end infinite' }}>█</span>
      )}
    </span>
  );
}

/* ─── DEGREE CARD ─── */
function DegreeCard({ item, isActive, onClick }) {
  return (
    <button
      type="button"
      id={`edu-card-${item.id}`}
      onClick={() => { onClick(item.id); playBlip('select'); }}
      className={`edu-card edu-card--degree${isActive ? ' edu-card--active' : ''}`}
      style={{ '--card-color': item.color }}
    >
      <span className="edu-corner edu-corner--tl" />
      <span className="edu-corner edu-corner--tr" />
      <span className="edu-corner edu-corner--bl" />
      <span className="edu-corner edu-corner--br" />

      <div className="edu-stage-badge">
        <GraduationCap size={10} />
        <span>{item.stage}</span>
      </div>

      <div className="edu-card-inner">
        <div className="edu-icon-wrap" style={{ background: item.color }}>
          <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
        </div>
        <div className="edu-card-body">
          <span className="edu-card-label">DEGREE PROGRAM</span>
          <h3 className="edu-card-title">{item.degree}</h3>
          <p className="edu-card-sub">{item.institution}</p>
          <p className="edu-card-loc">📍 {item.location}</p>
          <div className="edu-card-meta">
            <span className="edu-chip edu-chip--period">
              <Zap size={9} /> {item.period}
            </span>
            <span className="edu-chip edu-chip--gpa">
              <Star size={9} /> GPA: {item.gpa}
            </span>
          </div>
        </div>
      </div>

      {isActive && (
        <div className="edu-active-bar">
          <span className="edu-ping-dot" />
          <span>ACTIVE RECORD</span>
          <ChevronRight size={10} />
        </div>
      )}
    </button>
  );
}

/* ─── CERT CARD ─── */
function CertCard({ item, isActive, onClick, index }) {
  return (
    <button
      type="button"
      id={`edu-card-${item.id}`}
      onClick={() => { onClick(item.id); playBlip('item'); }}
      className={`edu-card edu-card--cert${isActive ? ' edu-card--active' : ''}`}
      style={{ '--card-color': item.color, animationDelay: `${index * 80}ms` }}
    >
      <span className="edu-corner edu-corner--tl" />
      <span className="edu-corner edu-corner--tr" />
      <span className="edu-corner edu-corner--bl" />
      <span className="edu-corner edu-corner--br" />

      <div className="edu-stage-badge">
        <Award size={10} />
        <span>{item.stage}</span>
      </div>

      <div className="edu-card-inner">
        <div className="edu-icon-wrap edu-icon-wrap--sm" style={{ background: item.color }}>
          <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
        </div>
        <div className="edu-card-body">
          <span className="edu-card-label">CERTIFICATION</span>
          <h3 className="edu-card-title edu-card-title--sm">{item.title}</h3>
          <p className="edu-card-sub">{item.issuer}</p>
          {item.period && (
            <div className="edu-card-meta">
              <span className="edu-chip edu-chip--period">
                <Zap size={9} /> {item.period}
              </span>
            </div>
          )}
        </div>
      </div>

      {isActive && (
        <div className="edu-active-bar">
          <span className="edu-ping-dot" />
          <span>UNLOCKED</span>
          <ChevronRight size={10} />
        </div>
      )}
    </button>
  );
}

/* ─── MAIN SECTION ─── */
export function EducationSection() {
  const [activeId, setActiveId] = useState(null);

  const handleCardClick = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="education"
      className="edu-section relative border-t-2 border-ink w-full max-w-full overflow-x-hidden bg-paper"
    >
      {/* CRT scanline overlay */}
      <div className="edu-scanline-overlay" aria-hidden="true" />

      {/* ─── HUD TOP BAR ─── */}
      <div className="skills-header-bar wave-child-1">
        <div className="mx-auto max-w-[1580px] px-4 sm:px-6 md:px-8 lg:px-12 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-8 place-items-center border-2 border-ink bg-red text-white shadow-[2px_2px_0_0_#192124]">
              <GraduationCap size={16} />
            </div>
            <div>
              <span className="font-mono text-[8px] font-black uppercase tracking-[0.2em] text-red block">
                STAGE 04 // ACADEMY RECORDS
              </span>
              <span className="font-mono text-[11px] font-black uppercase tracking-wider text-ink">
                EDUCATION &amp; CERTIFICATIONS
              </span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4 font-mono text-[9px] font-black uppercase tracking-widest">
            <span className="text-muted">
              DEGREES: <span className="text-blue font-bold">{EDUCATION.length}</span>
            </span>
            <span className="text-muted">
              CERTS: <span className="text-red font-bold">{CERTIFICATIONS.length}</span> EARNED
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1580px] px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-14">

        {/* ─── SECTION HEADING ─── */}
        <div className="wave-child-2 mb-10">
          <span className="kicker">🎮 Academy &amp; Skill Tree</span>
          <h2 className="section-title">
            Education &amp;<br className="hidden sm:block" /> Certifications
          </h2>
          <p className="mt-3 max-w-[540px] text-sm sm:text-base font-semibold leading-relaxed text-muted">
            Academic records and earned credentials. Click any card to inspect the mission file.
          </p>
        </div>

        {/* ─── DEGREE BLOCK ─── */}
        <div className="wave-child-3 mb-12">
          <div className="edu-block-label">
            <GraduationCap size={13} />
            <span>// DEGREE_PROGRAM.EXE</span>
            <span className="edu-blink-cursor">▌</span>
          </div>

          <div className="edu-degree-grid">
            {EDUCATION.map((item) => (
              <DegreeCard
                key={item.id}
                item={item}
                isActive={activeId === item.id}
                onClick={handleCardClick}
              />
            ))}

            {/* GPA Radar Panel */}
            <div className="edu-gpa-panel">
              <div className="edu-gpa-panel-header">
                <span className="edu-ping-dot" />
                <span className="font-mono text-[9px] font-black uppercase tracking-widest text-acid">
                  PERFORMANCE SCAN
                </span>
              </div>
              <div className="edu-gpa-body">
                <div className="edu-gpa-ring">
                  <svg viewBox="0 0 100 100" className="edu-gpa-svg">
                    <circle cx="50" cy="50" r="40" className="edu-gpa-track" />
                    <circle cx="50" cy="50" r="40" className="edu-gpa-fill" />
                  </svg>
                  <div className="edu-gpa-label">
                    <span className="edu-gpa-number">
                      <TypingText text="85.28" delay={400} />
                    </span>
                    <span className="edu-gpa-unit">/ 100</span>
                  </div>
                </div>
                <div className="edu-gpa-info">
                  <span className="font-mono text-[8px] font-black uppercase tracking-widest text-acid block mb-1">
                    GPA SCORE
                  </span>
                  <span className="font-mono text-xs font-bold text-white">Computer Systems Eng.</span>
                  <span className="font-mono text-[9px] text-white/50 block mt-1">IoT Specialization</span>
                  <div className="mt-3 flex flex-col gap-1.5">
                    {[
                      { label: 'Theory', val: 88 },
                      { label: 'Practicals', val: 83 },
                      { label: 'Projects', val: 90 },
                    ].map((bar) => (
                      <div key={bar.label} className="edu-stat-bar-row">
                        <span className="edu-stat-bar-label">{bar.label}</span>
                        <div className="edu-stat-bar-track">
                          <div className="edu-stat-bar-fill" style={{ width: `${bar.val}%` }} />
                        </div>
                        <span className="edu-stat-bar-val">{bar.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── CERTIFICATIONS BLOCK ─── */}
        <div className="wave-child-3">
          <div className="edu-block-label">
            <Award size={13} />
            <span>// CERTIFICATIONS.DAT</span>
            <span className="edu-blink-cursor">▌</span>
          </div>

          <div className="edu-cert-grid">
            {CERTIFICATIONS.map((item, i) => (
              <CertCard
                key={item.id}
                item={item}
                index={i}
                isActive={activeId === item.id}
                onClick={handleCardClick}
              />
            ))}
          </div>
        </div>

        {/* ─── BOTTOM STATS RACK ─── */}
        <div className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-2 border-ink bg-ink p-3 sm:p-4 shadow-[4px_4px_0_0_#ff432b]">
            <div className="flex items-center gap-3">
              <span className="text-xl">🏆</span>
              <div>
                <span className="font-mono text-[8px] font-black uppercase tracking-[0.2em] text-acid block">
                  ACADEMY STATUS
                </span>
                <span className="font-mono text-sm sm:text-base font-black text-white uppercase tracking-wider">
                  Active Student &amp; Certified Developer
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:gap-6 font-mono text-[9px] font-black uppercase tracking-widest">
              <div className="text-center">
                <span className="block text-white/50 text-[8px]">GRADUATION</span>
                <span className="block text-base sm:text-lg text-acid leading-none">JUN 2026</span>
              </div>
              <div className="text-center">
                <span className="block text-white/50 text-[8px]">CERTS</span>
                <span className="block text-base sm:text-lg text-red leading-none">×4 EARNED</span>
              </div>
              <div className="text-center">
                <span className="block text-white/50 text-[8px]">RANK</span>
                <span className="block text-base sm:text-lg text-white leading-none">A-TIER</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
