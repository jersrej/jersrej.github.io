import { skillGroups, skills } from '../../data/skills';
import { yearsOfExperience, yearsWithReact } from '../../utils/constants';
import { formatYears, yearsSince } from '../../utils/experience';

const highlights = [
  'Led frontend architecture for multiple high-traffic applications',
  'Implemented design systems and reusable component libraries',
  'Reduced bundle sizes significantly',
  'Mentored junior developers'
];

export const AboutSection = () => {
  return (
    <div className="slide">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-16 short:min-[560px]:grid-cols-[2fr_3fr] short:min-[560px]:gap-8 short:max-[559px]:gap-3">
        <div>
          <h2 className="eyebrow">About</h2>
          <p className="mt-3 font-display text-lg leading-snug font-medium tracking-tight md:text-3xl short:text-base">
            Senior Frontend Engineer with {yearsOfExperience} years in the industry and{' '}
            {yearsWithReact}+ specializing in React, TypeScript, and modern JavaScript ecosystems.
          </p>
          <div className="roomy">
            <p className="mt-5 max-w-xl leading-relaxed text-muted">
              I've delivered enterprise-grade applications across healthcare, logistics, SaaS,
              e-commerce, and automotive platforms — building scalable UI architectures,
              establishing reusable component systems, and owning frontend delivery from concept to
              production.
            </p>
          </div>
        </div>

        <div>
          <h3 className="eyebrow tiny:hidden">Core technologies</h3>
          <dl className="mt-3 space-y-3 border-t border-line pt-3 text-sm short:mt-2 short:space-y-1.5 short:pt-2 tiny:mt-0 tiny:border-0 tiny:pt-0">
            {skillGroups.map((group) => (
              <div
                key={group.category}
                className="sm:grid sm:grid-cols-[8.5rem_minmax(0,1fr)] short:block"
              >
                <dt className="font-medium">{group.label}</dt>
                <dd className="flex flex-wrap gap-x-3 gap-y-0.5 text-muted max-sm:mt-0.5 short:mt-0.5">
                  {skills
                    .filter((s) => s.category === group.category)
                    .map((s) => (
                      <span key={s.name}>
                        {s.name}
                        <span className="ml-1 font-mono text-xs opacity-70 deck:max-md:hidden short:hidden">
                          {formatYears(yearsSince(s.since))}
                        </span>
                      </span>
                    ))}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 deck:max-md:hidden short:hidden">
            <h3 className="eyebrow">Highlights</h3>
            <ul className="mt-3 grid gap-x-8 gap-y-2 border-t border-line pt-3 text-sm sm:grid-cols-2">
              {highlights.map((item) => (
                <li key={item} className="flex gap-2">
                  <span
                    className="mt-2 size-1 shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
