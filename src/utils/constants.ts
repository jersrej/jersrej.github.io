import { projects } from '../data/projects';

export const startYear = 2012;
export const reactStartYear = 2018;
export const yearsOfExperience = new Date().getFullYear() - startYear;
export const yearsWithReact = new Date().getFullYear() - reactStartYear;
export const featured = projects.filter((p) => p.featured);
