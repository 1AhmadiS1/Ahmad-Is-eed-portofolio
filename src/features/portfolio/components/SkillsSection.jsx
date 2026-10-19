import { useState, useMemo } from 'react';
import { SkillCategoryTab } from './SkillCategoryTab';
import { SkillItem } from './SkillItem';

/**
 * Arcade sound effects synthesizer (pure Web Audio API, zero dependencies)
 */
function playRetroBlip(type = 'select') {
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
      // Classic 8-bit arcade menu blip
      osc.type = 'square';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.04); // A5
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.12);
    } else if (type === 'item') {
      // Shorter tactile tick
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    }
  } catch {
    // Audio context unavailable or muted
  }
}

/**
 * Preset canonical skills organized exactly per user specifications
 */
const CANONICAL_SKILLSET = [
  // Programming
  { id: 'python', name: 'Python', category: 'programming', emoji: '🐍', color: '#ffb800' },
  { id: 'javascript', name: 'JavaScript', category: 'programming', emoji: '⚡', color: '#ffd700' },
  { id: 'sql', name: 'SQL', category: 'programming', emoji: '🗄️', color: '#2556e8' },
  { id: 'html5', name: 'HTML5', category: 'programming', emoji: '🌐', color: '#ff432b' },
  { id: 'css3', name: 'CSS3', category: 'programming', emoji: '🎨', color: '#2556e8' },
  { id: 'php', name: 'PHP', detail: 'Basics', category: 'programming', emoji: '🐘', color: '#777bb4' },
  { id: 'java', name: 'Java', detail: 'Basics', category: 'programming', emoji: '☕', color: '#f89820' },
  { id: 'cpp', name: 'C++', detail: 'Basics', category: 'programming', emoji: '⚙️', color: '#00599c' },

  // Frameworks & Libraries
  { id: 'django', name: 'Django', category: 'frameworks', emoji: '🐎', color: '#092e20' },
  { id: 'django-rest', name: 'Django REST Framework', category: 'frameworks', emoji: '🔌', color: '#ff432b' },
  { id: 'react', name: 'React.js', category: 'frameworks', emoji: '⚛️', color: '#2556e8' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frameworks', emoji: '🌊', color: '#38bdf8' },
  { id: 'bootstrap', name: 'Bootstrap', category: 'frameworks', emoji: '🅱️', color: '#7952b3' },

  // Cloud & DevOps
  {
    id: 'aws',
    name: 'AWS',
    detail: 'EC2, RDS, S3, ECR, IAM, Route 53, ACM, CloudWatch & more',
    category: 'cloud',
    emoji: '☁️',
    color: '#ff9900',
  },
  { id: 'docker', name: 'Docker', category: 'cloud', emoji: '🐳', color: '#2496ed' },
  { id: 'github-actions', name: 'Github Actions', category: 'cloud', emoji: '🤖', color: '#2556e8' },

  // Databases
  { id: 'postgresql', name: 'PostgreSQL', category: 'databases', emoji: '🐘', color: '#336791' },
  { id: 'mysql', name: 'MySQL', category: 'databases', emoji: '🐬', color: '#00758f' },

  // Tools
  { id: 'git', name: 'Git', category: 'tools', emoji: '🌱', color: '#f05032' },
  { id: 'github', name: 'GitHub', category: 'tools', emoji: '🐙', color: '#192124' },
  { id: 'postman', name: 'Postman', category: 'tools', emoji: '🚀', color: '#ff6c37' },
  { id: 'swagger', name: 'Swagger', category: 'tools', emoji: '📜', color: '#85ea2d' },
  { id: 'jmeter', name: 'JMeter', category: 'tools', emoji: '⏱️', color: '#d22128' },

  // Languages
  { id: 'arabic', name: 'Arabic', detail: 'Native', category: 'languages', emoji: '🌙', color: '#ffd700' },
  { id: 'english', name: 'English', detail: 'Excellent', category: 'languages', emoji: '🌍', color: '#00bfff' },
];

/**
 * Category metadata for arcade tabs
 */
const CATEGORIES = [
  { id: 'all', label: 'ALL SKILLS', emoji: '👾', color: '#ff432b' },
  { id: 'programming', label: 'PROGRAMMING', emoji: '⚔️', color: '#ff432b' },
  { id: 'frameworks', label: 'FRAMEWORKS & LIBS', emoji: '🛡️', color: '#2556e8' },
  { id: 'cloud', label: 'CLOUD & DEVOPS', emoji: '☁️', color: '#ff9900' },
  { id: 'databases', label: 'DATABASES', emoji: '🗄️', color: '#336791' },
  { id: 'tools', label: 'TOOLS', emoji: '🔧', color: '#d8ff66' },
  { id: 'languages', label: 'LANGUAGES', emoji: '🌐', color: '#ffd700' },
];

export function SkillsSection({ skills = [] }) {
  const [activeCategory, setActiveCategory] = useState('all');

  // Merge canonical skillset with any incoming props or API additions
  const skillInventory = useMemo(() => {
    if (!skills || skills.length === 0) return CANONICAL_SKILLSET;

    // Build a map of canonical items for easy lookup and enrichment
    const canonicalMap = new Map();
    CANONICAL_SKILLSET.forEach((item) => {
      canonicalMap.set(item.id.toLowerCase(), item);
      canonicalMap.set(item.name.toLowerCase().replace(/[\s\-_.]/g, ''), item);
    });

    // Merge incoming skills
    const merged = [];
    const seen = new Set();

    skills.forEach((skill) => {
      const normKey = (skill.id || skill.name || '').toLowerCase().replace(/[\s\-_.]/g, '');
      const match = canonicalMap.get(normKey);

      const skillItem = {
        id: skill.id || normKey,
        name: skill.name || match?.name || 'Skill',
        detail: skill.detail || match?.detail || null,
        category: match?.category || categorizeSkill(skill.name || skill.id),
        emoji: match?.emoji || '💎',
        color: match?.color || '#2556e8',
      };

      if (!seen.has(skillItem.name.toLowerCase())) {
        seen.add(skillItem.name.toLowerCase());
        merged.push(skillItem);
      }
    });

    // If canonical skills weren't provided by API, append them so nothing is missing
    CANONICAL_SKILLSET.forEach((canon) => {
      if (!seen.has(canon.name.toLowerCase())) {
        merged.push(canon);
        seen.add(canon.name.toLowerCase());
      }
    });

    return merged;
  }, [skills]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: skillInventory.length };
    CATEGORIES.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = skillInventory.filter((s) => s.category === cat.id).length;
      }
    });
    return counts;
  }, [skillInventory]);

  // Filter skills according to activeCategory
  const displayedSkills = useMemo(() => {
    if (activeCategory === 'all') return skillInventory;
    return skillInventory.filter((s) => s.category === activeCategory);
  }, [activeCategory, skillInventory]);

  // Handle category switch
  const handleSelectCategory = (catId) => {
    if (catId !== activeCategory) {
      playRetroBlip('select');
      setActiveCategory(catId);
    }
  };

  const currentCategoryMeta =
    CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];

  return (
    <section
      id="skills"
      className="skills-section relative border-t-2 border-ink w-full max-w-full overflow-x-hidden"
    >
      {/* ─── ARCADE TOP HUD BAR ─── */}
      <div className="skills-header-bar">
        <div className="mx-auto max-w-[1580px] px-4 sm:px-6 md:px-8 lg:px-12 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-8 place-items-center border-2 border-ink bg-red text-white shadow-[2px_2px_0_0_#192124]">
              <span className="text-sm">⚔️</span>
            </div>
            <div>
              <span className="font-mono text-[8px] font-black uppercase tracking-[0.2em] text-red block">
                STAGE 02 // INVENTORY
              </span>
              <span className="font-mono text-[11px] font-black uppercase tracking-wider text-ink">
                EQUIPPED ABILITIES
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4 font-mono text-[9px] font-black uppercase tracking-widest">
            <span className="text-muted">
              LOADOUT: <span className="text-red font-bold">{skillInventory.length}</span> SKILLS
            </span>
            <span className="text-muted">
              CLASS: <span className="text-ink font-bold">FULL-STACK ENGINEER</span>
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1580px] px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-14">
        {/* ─── SECTION HEADER ─── */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="kicker">⚡ Arsenal & Capabilities</span>
            <h2 className="section-title">
              Skill<br className="hidden sm:block" /> Loadout
            </h2>
            <p className="mt-3 max-w-[540px] text-sm sm:text-base font-semibold leading-relaxed text-muted">
              Battle-tested tools, languages, and frameworks. Select a category button to filter your loadout or view the complete arsenal.
            </p>
          </div>

          {/* Active Category Status Pill */}
          <div className="self-start md:self-end flex items-center gap-2 border-2 border-ink bg-paper px-3 py-1.5 shadow-[2px_2px_0_0_#192124]">
            <span className="size-2 rounded-full animate-pulse" style={{ backgroundColor: currentCategoryMeta.color }} />
            <span className="font-mono text-[10px] font-black uppercase tracking-wider text-ink">
              FILTER: {currentCategoryMeta.label} ({displayedSkills.length})
            </span>
          </div>
        </div>

        {/* ─── ARCADE CATEGORY TABS ─── */}
        <div className="skills-tabs-rack mb-8">
          <div className="skills-tabs-container">
            {CATEGORIES.map((cat) => (
              <SkillCategoryTab
                key={cat.id}
                emoji={cat.emoji}
                label={cat.label}
                count={categoryCounts[cat.id] || 0}
                isActive={activeCategory === cat.id}
                color={cat.color}
                onClick={() => handleSelectCategory(cat.id)}
              />
            ))}
          </div>
        </div>

        {/* ─── ANIMATED SKILLS GRID ─── */}
        {/* The key prop re-mounts the grid on category change, re-triggering the cascading drop-in animation */}
        <div
          key={activeCategory}
          className="skills-items-grid"
          onMouseEnter={() => playRetroBlip('item')}
        >
          {displayedSkills.map((skill, index) => (
            <SkillItem
              key={skill.id || skill.name}
              name={skill.name}
              emoji={skill.emoji}
              color={skill.color}
              detail={skill.detail}
              index={index}
            />
          ))}
        </div>

        {/* ─── BOTTOM RETRO STATS RACK ─── */}
        <div className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-2 border-ink bg-ink p-3 sm:p-4 shadow-[4px_4px_0_0_#ff432b]">
            <div className="flex items-center gap-3">
              <span className="text-xl">🏆</span>
              <div>
                <span className="font-mono text-[8px] font-black uppercase tracking-[0.2em] text-acid block">
                  DEVELOPER CLASS
                </span>
                <span className="font-mono text-sm sm:text-base font-black text-white uppercase tracking-wider">
                  Full-Stack Software Engineer
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 font-mono text-[9px] font-black uppercase tracking-widest">
              <div className="text-center">
                <span className="block text-white/50 text-[8px]">TOTAL SKILLS</span>
                <span className="block text-base sm:text-lg text-acid leading-none">{skillInventory.length}</span>
              </div>
              <div className="text-center">
                <span className="block text-white/50 text-[8px]">DISPLAYED</span>
                <span className="block text-base sm:text-lg text-white leading-none">{displayedSkills.length}</span>
              </div>
              <div className="text-center">
                <span className="block text-white/50 text-[8px]">LEVEL</span>
                <span className="block text-base sm:text-lg text-red leading-none">MAX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Fallback keyword categorizer for any dynamic skill
 */
function categorizeSkill(nameOrId = '') {
  const s = nameOrId.toLowerCase();
  if (['python', 'javascript', 'sql', 'html', 'css', 'php', 'java', 'c++'].some((k) => s.includes(k))) return 'programming';
  if (['django', 'react', 'tailwind', 'bootstrap'].some((k) => s.includes(k))) return 'frameworks';
  if (['aws', 'docker', 'action', 'cloud'].some((k) => s.includes(k))) return 'cloud';
  if (['postgres', 'mysql', 'mongo', 'redis', 'db'].some((k) => s.includes(k))) return 'databases';
  if (['arabic', 'english', 'french', 'german', 'spanish'].some((k) => s.includes(k))) return 'languages';
  return 'tools';
}
