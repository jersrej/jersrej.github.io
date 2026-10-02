import { reactStartYear, startYear } from '../utils/constants';

export type SkillCategory = 'frontend' | 'backend' | 'tools';

export type Skill = {
  name: string;
  /** Year I started using it; displayed experience is calculated from this */
  since: number;
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
  { name: 'JavaScript (ES6+)', since: startYear, category: 'frontend' },
  { name: 'Next.js', since: 2020, category: 'frontend' },
  { name: 'GraphQL Client', since: 2019, category: 'frontend' },
  { name: 'TailwindCSS', since: 2021, category: 'frontend' },
  { name: 'React Native', since: 2025, category: 'frontend' },
  { name: 'Performance Optimization', since: reactStartYear, category: 'frontend' },
  { name: 'REST APIs', since: startYear, category: 'backend' },
  { name: 'Node.js', since: 2022, category: 'backend' },
  { name: 'NestJS', since: 2022, category: 'backend' },
  { name: 'JIRA', since: startYear, category: 'tools' },
  { name: 'Git', since: 2018, category: 'tools' },
  { name: 'Trello', since: 2022, category: 'tools' },
  { name: 'AWS (S3, CloudFront)', since: 2023, category: 'tools' },
  { name: 'CI/CD Pipelines (YML)', since: 2021, category: 'tools' },
  { name: 'Playwright', since: 2025, category: 'tools' }
];
