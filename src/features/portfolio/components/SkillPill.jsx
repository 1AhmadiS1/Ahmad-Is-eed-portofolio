import { SkillIcon } from '../skillIcons';

export function SkillPill({ skill }) {
  return (
    <li className="skill-pill">
      <SkillIcon icon={skill.icon} size={17} strokeWidth={2.2} />
      <span>{skill.name}</span>
    </li>
  );
}
