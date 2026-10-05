import type { Project } from './projects';

// Personal projects, built for fun rather than for a client
export const sideQuests: Project[] = [
  {
    id: 'pokedex',
    title: 'Pokédex – Personal Project',
    tagline: 'The original Pokédex, rebuilt for the web',
    stack: 'ReactJS · TypeScript · TailwindCSS · TanStack Query · PokéAPI',
    contributions: [
      'Built a folding two-screen device with a searchable index and a detail view',
      'Kept it Generation I: Red/Blue sprites, the original types and cries',
      'Added display modes, favourites, keyboard navigation and sound effects',
      'Wrote a typed data layer over PokéAPI with TanStack Query'
    ],
    impact: 'A faithful Kanto Pokédex that runs entirely in the browser.',
    link: 'https://jersrej.github.io/pokedex/',
    repo: 'https://github.com/jersrej/pokedex',
    featured: false
  },
  {
    id: 'gamedex',
    title: 'GameDex – Personal Project',
    tagline: 'A game library for finding what to play next',
    stack: 'Next.js · TypeScript · TailwindCSS · ShadCN · RAWG API',
    contributions: [
      'Built search and filters by genre, platform, year and score',
      'Added a personal library, side-by-side comparison and a "Surprise me" pick',
      'Kept the game API behind a Backend-for-Frontend layer in Next.js',
      'Designed a retro-console design system on top of ShadCN'
    ],
    impact: 'A quick way to pick your next game from a catalogue of 500,000+.',
    link: 'https://jersrej-gamedex.vercel.app/',
    repo: 'https://github.com/jersrej/gamedex',
    featured: false
  },
  {
    id: 'ph-data-terminal',
    title: 'PH Data Terminal – Personal Project',
    tagline: 'Philippine census statistics on a drill-down map',
    stack: 'ReactJS · TypeScript · TailwindCSS · D3 · TanStack Query',
    contributions: [
      'Built a map that drills from region to province, city and barangay',
      'Added six data layers, rankings, comparison and search across 43,768 areas',
      'Kept the selected area, layer and year in a shareable URL',
      'Wrote a Latin-to-Baybayin converter that runs entirely in the browser'
    ],
    impact: 'Every barangay in the country, explorable from a static site with no backend.',
    link: 'https://jersrej.github.io/ph-data-terminal/',
    repo: 'https://github.com/jersrej/ph-data-terminal',
    featured: false
  }
];
