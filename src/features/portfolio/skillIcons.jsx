import {
  Atom,
  Braces,
  Code2,
  Database,
  Layers3,
  Palette,
  ServerCog,
  ShieldCheck,
  Terminal,
} from 'lucide-react';

const iconMap = {
  'lucide:atom': Atom,
  'lucide:braces': Braces,
  'lucide:code': Code2,
  'lucide:database': Database,
  'lucide:layers': Layers3,
  'lucide:palette': Palette,
  'lucide:server': ServerCog,
  'lucide:shield': ShieldCheck,
  'lucide:terminal': Terminal,
};

export function SkillIcon({ icon, ...props }) {
  const Icon = iconMap[icon] || Code2;

  return <Icon {...props} />;
}
