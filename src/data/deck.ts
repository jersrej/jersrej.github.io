import { projects, splitTitle, type Project } from './projects';

export type SectionId = 'intro' | 'about' | 'work' | 'contact';

export type Step = {
  hash: string;
  section: SectionId;
  label: string;
  project?: Project;
};

export const sections: { id: SectionId; label: string }[] = [
  { id: 'intro', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' }
];

// Featured projects lead; the rest keep their order from the data file
export const workProjects = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));

// Every stop in the deck, in the order Next/Previous walks through them
export const steps: Step[] = [
  { hash: 'intro', section: 'intro', label: 'Intro' },
  { hash: 'about', section: 'about', label: 'About' },
  ...workProjects.map((project) => ({
    hash: `work/${project.id}`,
    section: 'work' as const,
    label: splitTitle(project.title).name,
    project
  })),
  { hash: 'contact', section: 'contact', label: 'Contact' }
];

export const firstWorkIndex = steps.findIndex((s) => s.section === 'work');

// Section-level hashes, plus the anchors the old scrolling page used
const aliases: Record<string, string> = {
  home: 'intro',
  work: steps[firstWorkIndex].hash,
  projects: steps[firstWorkIndex].hash
};

export const indexFromHash = (hash: string) => {
  const key = decodeURIComponent(hash.replace(/^#\/?/, ''));
  const target = aliases[key] ?? key;
  return steps.findIndex((s) => s.hash === target);
};
