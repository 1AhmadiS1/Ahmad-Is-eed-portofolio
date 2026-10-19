import { useState } from 'react';

/**
 * SkillChip — A refined skill badge that presents each technology with clear typography
 * and subtle, meaningful hover feedback that enhances rather than distracts.
 */
export function SkillChip({ name, emoji, color }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="skill-chip-slot"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle background lift and shadow on hover */}
      <div
        className={`skill-chip-shadow ${isHovered ? 'opacity-100' : 'opacity-0'} transition-all duration-300`}
      />

      {/* Main skill container */}
      <div
        className={`skill-chip group ${isHovered ? 'skill-chip--hovered' : ''}`}
        style={{
          '--chip-color': color,
          '--chip-bg': 'rgba(255, 255, 255, 0.85)',
          '--chip-bg-hover': 'rgba(255, 255, 255, 0.95)',
          '--chip-text-color': '#192124',
          '--chip-icon-color': color,
        }}
      >
        {/* Left accent indicator */}
        <span className="skill-chip-accent" style={{ backgroundColor: color }} />

        {/* Content wrapper */}
        <div className="skill-chip-content">
          {/* Emoji icon */}
          <span className="skill-chip-emoji transition-all duration-300" aria-hidden="true">
            {emoji}
          </span>

          {/* Skill name - the primary focus */}
          <span className="skill-chip-name">{name}</span>
        </div>
      </div>
    </div>
  );
}
