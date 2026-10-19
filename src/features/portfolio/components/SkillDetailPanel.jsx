import { useState } from 'react';

/**
 * SkillDetailPanel — RPG-style stat sheet that appears when selecting a skill card.
 * Looks like an inventory detail popup from a classic JRPG.
 */
export function SkillDetailPanel({ skill, onClose }) {
  const [activeTab, setActiveTab] = useState('stats');

  if (!skill) return null;

  const baseVal = (skill.name?.charCodeAt(0) || 70) % 25;
  const stats = skill.stats || {
    power: 70 + (baseVal * 3) % 25,
    speed: 65 + (baseVal * 5) % 30,
    reliability: 80 + (baseVal * 2) % 18,
    versatility: 75 + (baseVal * 4) % 22,
  };

  const statEntries = Object.entries(stats);
  const maxStat = 100;

  const tabs = [
    { id: 'stats', label: 'STATS', emoji: '📊' },
    { id: 'lore', label: 'LORE', emoji: '📜' },
  ];

  return (
    <div className="skill-detail-panel">
      {/* ─── Terminal Header ─── */}
      <div className="skill-detail-header">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-red opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-red" />
          </span>
          <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-acid">
            SKILL INSPECTOR
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="grid size-6 place-items-center border border-white/20 font-mono text-[10px] font-black text-white/60 hover:bg-red hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>

      {/* ─── Skill Title ─── */}
      <div className="border-b-2 border-ink/20 bg-paper p-4">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center border-2 border-ink bg-ink text-white">
            <span className="font-mono text-xs font-black">{skill.name?.[0] || '?'}</span>
          </div>
          <div>
            <h3 className="font-mono text-base font-black uppercase tracking-tight text-ink">
              {skill.name}
            </h3>
            <span className="font-mono text-[8px] font-black uppercase tracking-[0.2em] text-red">
              {skill.rarity?.toUpperCase() || 'COMMON'} // LVL.{String(skill.level || 1).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* ─── Tabs ─── */}
      <div className="flex border-b-2 border-ink/20">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 font-mono text-[9px] font-black uppercase tracking-[0.15em] transition-colors ${
              activeTab === tab.id
                ? 'bg-ink text-acid border-b-2 border-red'
                : 'bg-paper-deep/50 text-muted hover:text-ink'
            }`}
          >
            <span className="mr-1">{tab.emoji}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── Tab Content ─── */}
      <div className="p-4 flex-1 overflow-y-auto">
        {activeTab === 'stats' && (
          <div className="space-y-3">
            {statEntries.map(([statName, value]) => (
              <div key={statName}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[9px] font-black uppercase tracking-[0.15em] text-ink">
                    {statName}
                  </span>
                  <span className="font-mono text-[10px] font-black text-red">
                    {value}/{maxStat}
                  </span>
                </div>
                <div className="skill-stat-bar-track">
                  <div
                    className="skill-stat-bar-fill"
                    style={{ width: `${(value / maxStat) * 100}%` }}
                  />
                  {/* Segmented bar markers */}
                  {Array.from({ length: 9 }).map((_, i) => (
                    <span
                      key={i}
                      className="absolute top-0 bottom-0 w-px bg-paper/30"
                      style={{ left: `${(i + 1) * 10}%` }}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Overall power rating */}
            <div className="mt-4 border-t-2 border-ink/15 pt-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.15em] text-ink">
                  OVERALL PWR
                </span>
                <span className="font-mono text-lg font-black text-red">
                  {Math.round(statEntries.reduce((sum, [, v]) => sum + v, 0) / statEntries.length)}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lore' && (
          <div className="space-y-3">
            <p className="font-mono text-[10px] font-bold text-muted leading-relaxed">
              {skill.description || skill.lore || `${skill.name} is a battle-tested tool in the developer's arsenal. Mastered through countless deployments and debugging sessions, this skill has proven invaluable in building production-grade systems.`}
            </p>

            {/* Unlocked achievements */}
            <div className="mt-4 border-t border-ink/15 pt-3">
              <span className="font-mono text-[8px] font-black uppercase tracking-[0.2em] text-red">
                🏆 ACHIEVEMENTS
              </span>
              <div className="mt-2 space-y-1.5">
                {(skill.achievements || [
                  'First Deploy',
                  'Bug Squasher',
                  'Code Review Master',
                ]).map((achievement) => (
                  <div key={achievement} className="flex items-center gap-2 font-mono text-[9px] font-bold text-ink">
                    <span className="text-acid">✔</span>
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className="border-t-2 border-ink/20 bg-ink px-4 py-2 flex items-center justify-between">
        <span className="font-mono text-[8px] font-black text-acid tracking-widest uppercase">
          ◀ ESC TO CLOSE
        </span>
        <span className="font-mono text-[8px] font-black text-white/40 tracking-widest">
          SKILL DB v1.0
        </span>
      </div>
    </div>
  );
}
