/**
 * SkillItem — A single skill displayed as a retro game collectible item.
 * Features a category-colored accent bar, staggered drop-in animation,
 * and arcade-style hover press effects.
 *
 * @param {Object}  props
 * @param {string}  props.name   - Skill display name
 * @param {string}  props.emoji  - Visual emoji identifier
 * @param {string}  props.color  - Category accent color (used for accent bar, hover shadow)
 * @param {number}  props.index  - Position index for stagger animation delay
 * @param {string}  [props.detail] - Optional subtitle (e.g., proficiency level)
 */
export function SkillItem({ name, emoji, color, index = 0, detail }) {
  return (
    <div
      className="skill-item"
      style={{
        '--item-color': color,
        '--i': index,
      }}
    >
      {/* Left accent bar in category color */}
      <span className="skill-item-accent" />

      {/* Emoji icon */}
      <span className="skill-item-emoji" aria-hidden="true">
        {emoji}
      </span>

      {/* Name + optional detail subtitle */}
      <div className="skill-item-info">
        <span className="skill-item-name">{name}</span>
        {detail && <span className="skill-item-detail">{detail}</span>}
      </div>
    </div>
  );
}
