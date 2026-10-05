import { projects, splitTitle, type Project } from './projects';
import { sideQuests } from './sideQuests';

export type SectionId = 'intro' | 'about' | 'work' | 'quests' | 'contact';

export type Step = {
  hash: string;
  section: SectionId;
  label: string;
  project?: Project;
};

// `compact` stands in for the label where the nav shares a phone-width row
export const sections: { id: SectionId; label: string; compact?: string }[] = [
  { id: 'intro', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'quests', label: 'Side quests', compact: 'Quests' },
  { id: 'contact', label: 'Contact' }
];

// Featured projects lead; the rest keep their order from the data file
export const workProjects = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));

// One step per project, addressed as "section/project"
const projectSteps = (section: SectionId, list: Project[]): Step[] =>
  list.map((project) => ({
    hash: `${section}/${project.id}`,
    section,
    label: splitTitle(project.title).name,
    project
  }));

// Every stop in the deck, in the order Next/Previous walks through them
export const steps: Step[] = [
  { hash: 'intro', section: 'intro', label: 'Intro' },
  { hash: 'about', section: 'about', label: 'About' },
  ...projectSteps('work', workProjects),
  ...projectSteps('quests', sideQuests),
  { hash: 'contact', section: 'contact', label: 'Contact' }
];

export const firstWorkIndex = steps.findIndex((s) => s.section === 'work');
export const firstQuestIndex = steps.findIndex((s) => s.section === 'quests');

// Section-level hashes, plus the anchors the old scrolling page used
const aliases: Record<string, string> = {
  home: 'intro',
  work: steps[firstWorkIndex].hash,
  projects: steps[firstWorkIndex].hash,
  quests: steps[firstQuestIndex].hash,
  'side-quests': steps[firstQuestIndex].hash
};

export const indexFromHash = (hash: string) => {
  const key = decodeURIComponent(hash.replace(/^#\/?/, ''));
  const target = aliases[key] ?? key;
  return steps.findIndex((s) => s.hash === target);
};
