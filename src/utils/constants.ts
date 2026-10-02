import { projects } from '../data/projects';
import { yearsSince } from './experience';

export const startYear = 2012;
export const reactStartYear = 2018;
export const yearsOfExperience = yearsSince(startYear);
export const yearsWithReact = yearsSince(reactStartYear);
export const featured = projects.filter((p) => p.featured);
