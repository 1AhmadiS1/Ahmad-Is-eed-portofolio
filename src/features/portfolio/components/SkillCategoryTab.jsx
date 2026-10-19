/**
 * SkillCategoryTab — Arcade-style category selector button.
 * Reusable button resembling a retro game menu option with
 * emoji, label, count badge, and blinking selection cursor.
 *
 * @param {Object}   props
 * @param {string}   props.emoji    - Category emoji icon
 * @param {string}   props.label    - Category display name
 * @param {number}   props.count    - Number of skills in this category
 * @param {boolean}  props.isActive - Whether this tab is currently selected
 * @param {string}   props.color    - Accent color for active state shadow
 * @param {Function} props.onClick  - Click handler
 */
export function SkillCategoryTab({ emoji, label, count, isActive, color, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`skill-tab ${isActive ? 'skill-tab--active' : ''}`}
      style={{ '--tab-color': color }}
    >
      {/* Blinking arcade cursor — only visible when active */}
      <span className="skill-tab-cursor" aria-hidden="true">
        {isActive ? '▶' : ''}
      </span>
      <span className="skill-tab-emoji">{emoji}</span>
      <span className="skill-tab-label">{label}</span>
      <span className="skill-tab-count">{count}</span>
    </button>
  );
}
