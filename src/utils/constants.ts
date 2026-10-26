import { projects } from '../data/projects';
import { yearsSince } from './experience';

// First role: Spark Marketing, 2011; counted by calendar year
export const startYear = 2011;
export const reactStartYear = 2018;
export const yearsOfExperience = yearsSince(startYear);
export const yearsWithReact = yearsSince(reactStartYear);
export const featured = projects.filter((p) => p.featured);
