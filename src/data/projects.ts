export type Project = {
  id: string;
  title: string;
  tagline: string;
  stack: string;
  contributions: string[];
  impact: string;
  link?: string;
  /** Public source repository, when there is one */
  repo?: string;
  /** Image in /public, e.g. { src: '/projects/polln.webp', alt: 'Polln patient dashboard' } */
  screenshot?: { src: string; alt: string };
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: 'auto-mossa',
    title: 'Auto Mossa – Front‑End Development',
    tagline:
      'Ordering system for a manufacturer of high‑speed industrial doors and safety barriers',
    stack: 'ReactJS · TypeScript · TailwindCSS · ShadCN · GraphQL',
    contributions: [
      'Built reusable, responsive UI components with React + ShadCN',
      'Integrated GraphQL APIs into the ordering workflows',
      'Implemented UX improvements and addressed customer-requested enhancements',
      'Ensured consistent styling, accessibility, and maintainability across the application'
    ],
    impact:
      'Supported ordering across New Zealand and the United States with consistent UI patterns and scalable frontend components.',
    featured: false,
    link: 'https://www.automossa.com/'
  },
  {
    id: 'bbsdt',
    title: 'BBSDT – Senior Software Engineer',
    tagline:
      "Broadband self-service platform for one of the country's leading telecom companies, built at Stratpoint Global Outsourcing, Inc.",
    stack: 'Next.js · TypeScript · Okta OIDC · React Hook Form · Zod · Vitest · NestJS',
    contributions: [
      'Architected a Next.js (App Router) frontend with a Backend-for-Frontend layer, keeping tokens and API calls on the server',
      'Implemented enterprise SSO with Okta OIDC (Authorization Code + PKCE) and re-authentication for compliance',
      'Designed granular role-based access control around a centralized permission registry',
      'Replaced an in-memory session store with stateless, encrypted, httpOnly cookies',
      'Added idle detection with countdown warnings, automatic sign-out, and single active session detection'
    ],
    impact:
      "A complete rebuild of the client's Handyman v1 platform with a modern architecture for security, scalability, and maintainability.",
    featured: true
  },
  {
    id: 'beyond',
    title: 'Beyond Strategy – Front‑End Development',
    tagline: 'SaaS platform for business strategy, accountability, and execution',
    stack: 'ReactJS · TypeScript · TailwindCSS · ShadCN · Vite · REST API',
    contributions: [
      'Spearheaded the migration from Create React App to Vite, improving build speed and developer experience',
      'Refactored and optimized UI components using React, TypeScript, Tailwind, and ShadCN',
      'Supported backend architects and Azure hosting teams during releases',
      'Monitored deployment logs and collaborated on release decisions'
    ],
    impact:
      'Strengthened platform stability and improved development speed with the shift to Vite and cleaner UI architecture.',
    link: 'https://beyond.advisory.works/',
    featured: true
  },
  {
    id: 'gleeson',
    title: 'Gleeson & Cox – JAWS TMS Front‑End Development',
    tagline: 'Mission‑critical Transport Management System for logistics operations',
    stack: 'Ember.js · Handlebars · CSS · Google Maps API · Swagger',
    contributions: [
      'Developed UI modules for their Ember.js‑based TMS (JAWS)',
      'Implemented new features and improved operational workflows',
      'Integrated Google Maps for routing, mapping, and location‑based tools',
      'Maintained and enhanced UI using CSS for layout consistency and usability',
      'Supported long‑term iterations for logistics digital systems'
    ],
    impact:
      "Improved operational reliability for one of NZ's major logistics companies through consistent UI enhancements.",
    featured: false,
    link: 'https://www.gleesoncox.co.nz/'
  },
  {
    id: 'lamido',
    title: 'Lamido – Product Management & Web Development',
    tagline: 'Campaign execution and release QA for regional e‑commerce operations',
    stack: 'HTML · CSS · JavaScript · MySQL',
    contributions: [
      'Created campaign pages for marketing initiatives',
      'Coordinated campaign execution with other ventures',
      'Managed regional QA checklists and release testing'
    ],
    impact:
      'Kept regional campaigns accurate and on schedule through coordinated QA and release testing.',
    featured: false
  },
  {
    id: 'lazada',
    title: 'Lazada – Product & Front‑End Engineering',
    tagline: 'Campaign pages, QA workflows, and frontend systems for Southeast Asia e‑commerce',
    stack: 'HTML · CSS · JavaScript · MySQL · CMS Tools',
    contributions: [
      'Delegated frontend work and built campaign landing pages across devices',
      'Coordinated campaign checklists with regional teams and managed pre‑release testing',
      'Engineered an automated newsletter engine and redesigned its templates for Lazada Thailand',
      'Promoted from Junior to Senior Web Developer within 16 months',
      'Used MySQL queries for data'
    ],
    impact:
      'Supported high‑volume campaigns across Southeast Asia, ensuring accurate and timely releases.',
    featured: false
  },
  {
    id: 'onshout',
    title: 'OnShout – Full‑Stack Development',
    tagline: 'Group gifting platform with real‑time contributions and digital gift card flow',
    stack: 'NestJS · ReactJS · TypeScript · TailwindCSS · NX Monorepo',
    contributions: [
      'Developed wish‑list, group contribution, and gift card redemption features, with supporting NestJS work',
      'Shaped frontend architecture within an NX monorepo',
      'Conducted frontend code reviews, reinforcing maintainable TypeScript patterns'
    ],
    impact:
      'Delivered a cohesive monorepo-based gifting platform with seamless contribution and redemption workflows.',
    link: 'https://www.onshout.co/',
    featured: false
  },
  {
    id: 'polln',
    title: 'Polln – Lead Front‑End Developer',
    tagline: 'Digital healthcare platform (Patient · Doctor · Admin) with Zoom integration',
    stack: 'ReactJS · TypeScript · TailwindCSS · TanStack Query · Orval · GraphQL · AWS · Zoom SDK',
    contributions: [
      'Led frontend development across the Patient, Doctor, and Admin applications',
      'Headed the migration of the doctor and patient portals from Apollo GraphQL to REST',
      'Introduced OpenAPI-driven type and hook generation with Orval, on a TanStack Query hook layer',
      'Set up CI/CD pipelines on AWS across Development, QA, Staging, and Production',
      'Advised the founders on technical decisions and product direction',
      'Translated Figma designs into responsive React applications'
    ],
    impact:
      'Delivered a full telehealth ecosystem from scratch, enabling scalable online consultations and prescription workflows.',
    link: 'https://www.polln.com/',
    featured: true
  },
  {
    id: 'realista',
    title: 'Realista – Lead Front‑End Developer',
    tagline: 'Real estate platform for browsing and discovering property listings',
    stack: 'Laravel · JavaScript/jQuery · CSS · Google Maps · Bootstrap',
    contributions: [
      'Led the frontend implementation of the platform',
      'Integrated Google Maps for property search and location‑based navigation',
      'Applied SEO best practices and optimized load performance',
      'Integrated front‑end views with Laravel backend logic'
    ],
    impact:
      'Provided a clean, map‑driven property browsing experience with responsive front‑end components.',
    featured: false
  },
  {
    id: 'twiikflow',
    title: 'Twiikflow – Front‑End Redevelopment',
    tagline: 'Internal work‑log and budget tracking system',
    stack: 'ReactJS · TypeScript · TailwindCSS · Azure · GraphQL',
    contributions: [
      'Led the frontend redevelopment from a legacy PHP system to React',
      'Rebuilt UI using React + TailwindCSS for better performance and usability',
      'Implemented pages for work logs, budgets, and billing visibility',
      'Managed Azure deployments ensuring stable releases',
      'Improved UX with cleaner layouts and accessible data displays'
    ],
    impact: 'Improved usability and deployment stability with a maintainable, modern UI.',
    featured: true
  },
  {
    id: 'xpo',
    title: 'XPO Showtime – Full‑Stack Development',
    tagline: "Event management platform rebuilt from XPO Group's internal systems",
    stack: 'NestJS · ReactJS · TypeScript · TailwindCSS · REST API · GraphQL · Vitest',
    contributions: [
      'Redeveloped the frontend using React, TypeScript, and Tailwind CSS',
      'Contributed to replacing a legacy PHP system with a Node.js and NestJS architecture',
      'Provided backend support in NestJS for API implementation and service-layer logic',
      'Established reusable frontend components and delivered responsive, accessible features',
      'Wrote unit tests using Vitest'
    ],
    impact:
      'Moved XPO Group off a legacy PHP system onto a modern Node.js and NestJS architecture.',
    featured: false,
    link: 'https://www.xpogroup.com/'
  }
];

// Titles are written as "Client – Role"
export const splitTitle = (title: string) => {
  const [name, role = ''] = title.split(' – ');
  return { name, role };
};
