import { reactStartYear, startYear } from '../utils/constants';

export type SkillCategory = 'frontend' | 'backend' | 'tools';

export type Skill = {
  name: string;
  /**
   * Year I started using it; displayed experience is calculated from this.
   * Leave it out for practices that have no meaningful start year.
   */
  since?: number;
  /** Optional start month (1–12), for recent skills where the month matters */
  sinceMonth?: number;
  category: SkillCategory;
};

export const skillGroups: { category: SkillCategory; label: string }[] = [
  { category: 'frontend', label: 'Frontend' },
  { category: 'backend', label: 'Backend & APIs' },
  { category: 'tools', label: 'Tools & workflow' }
];

export const skills: Skill[] = [
  { name: 'React', since: reactStartYear, category: 'frontend' },
  { name: 'TypeScript', since: reactStartYear, category: 'frontend' },
  { name: 'JavaScript', since: startYear, category: 'frontend' },
  { name: 'Next.js', since: 2020, category: 'frontend' },
  { name: 'TanStack Query', since: 2020, category: 'frontend' },
  { name: 'GraphQL Client', since: 2019, category: 'frontend' },
  { name: 'TailwindCSS', since: 2021, category: 'frontend' },
  { name: 'shadcn/ui', category: 'frontend' },
  { name: 'React Hook Form + Zod', category: 'frontend' },
  { name: 'REST APIs', since: startYear, category: 'backend' },
  { name: 'Swagger (OpenAPI)', since: 2021, category: 'backend' },
  { name: 'Node.js', since: 2022, category: 'backend' },
  { name: 'NestJS', since: 2022, category: 'backend' },
  { name: 'Backend-for-Frontend', category: 'backend' },
  { name: 'MySQL', since: 2015, category: 'backend' },
  { name: 'TypeORM', category: 'backend' },
  { name: 'Git', since: 2018, category: 'tools' },
  { name: 'CI/CD Pipelines (YML)', since: 2020, category: 'tools' },
  { name: 'AWS (EC2, S3)', since: 2020, category: 'tools' },
  { name: 'Azure', since: 2021, category: 'tools' },
  { name: 'Playwright', since: 2025, category: 'tools' },
  { name: 'Vitest', since: 2024, category: 'tools' },
  { name: 'Orval', since: 2020, category: 'tools' },
  { name: 'JIRA', since: startYear, category: 'tools' },
  { name: 'Confluence', category: 'tools' },
  { name: 'Trello', since: 2022, category: 'tools' }
];
