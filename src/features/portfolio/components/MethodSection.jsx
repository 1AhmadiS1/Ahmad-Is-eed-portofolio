import { useMemo } from 'react';
import { SkillPill } from './SkillPill';

export function MethodSection({ skills }) {
  const methodItems = useMemo(
    () => [
      {
        title: 'Explicit contracts',
        body: 'Endpoints, permissions, and payloads are shaped so teams can trust what the system promises.',
      },
      {
        title: 'Data that behaves',
        body: 'Schemas, serializers, and validation rules stay close to the real product workflow.',
      },
      {
        title: 'Deployment-minded builds',
        body: 'The backend is not done until it can be documented, shipped, observed, and kept alive.',
      },
    ],
    [],
  );

  return (
    <section id="skills" className="relative px-4 py-14 sm:px-6 md:px-8 lg:px-12 w-full max-w-full overflow-x-hidden">
      <span id="method" className="absolute -top-20" />
      <div className="mx-auto grid max-w-[1580px] gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="kicker">Method 02</span>
          <h2 className="section-title">Clear boundaries. Few surprises.</h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <SkillPill key={skill.id || skill.name} skill={skill} />
            ))}
          </ul>
        </div>

        <div className="method-grid">
          {methodItems.map((item, index) => (
            <article key={item.title} className="method-item">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
