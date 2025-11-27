export type Project = {
  id: string;
  title: string;
  tagline: string;
  stack: string;
  contributions: string[];
  impact: string;
  link?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: 'auto-mossa',
    title: 'Auto Mossa – Front‑End Development',
    tagline: 'International automotive parts ordering portal',
    stack: 'ReactJS · TypeScript · TailwindCSS · ShadCN · GraphQL',
    contributions: [
      'Developed and enhanced UI features using React + ShadCN',
      'Built reusable, responsive UI components integrated with backend endpoints',
      'Implemented UX improvements and addressed customer-requested enhancements',
      'Ensured consistent styling, accessibility, and maintainability across the application'
    ],
    impact:
      'Improved global ordering workflows through consistent UI patterns and scalable frontend components.',
    featured: false
  },
  {
    id: 'beyond',
    title: 'Beyond Strategy – Front‑End Development',
    tagline: 'SaaS platform for business strategy, accountability, and execution',
    stack: 'ReactJS · TypeScript · TailwindCSS · ShadCN · Vite · REST API',
    contributions: [
      'Built and enhanced UI features using React, TypeScript, Tailwind, and ShadCN',
      'Maintained UI performance, refactored components, and fixed UX defects',
      'Upgraded front‑end build system from CRA to Vite for better DX and speed',
      'Monitored deployment logs and collaborated on release decisions',
      'Coordinated with backend (.NET/MS SQL) and Azure teams for smooth releases'
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
    stack: 'Ember.js · Handlebars · CSS · Google Maps API · oData · Swagger',
    contributions: [
      'Developed UI modules for their Ember.js‑based TMS (JAWS)',
      'Implemented new features and improved operational workflows',
      'Integrated Google Maps for routing, mapping, and location‑based tools',
      'Maintained and enhanced UI using CSS for layout consistency and usability',
      'Supported long‑term iterations for logistics digital systems'
    ],
    impact:
      "Improved operational reliability for one of NZ's major logistics companies through consistent UI enhancements.",
    featured: false
  },
  {
    id: 'lamido',
    title: 'Lamido – Product Management & Web Development',
    tagline: 'Campaign execution and newsletter automation for e‑commerce operations',
    stack: 'HTML · CSS · JavaScript · MySQL',
    contributions: [
      'Created and debugged campaign pages for marketing initiatives',
      'Handled QA coordination and testing workflows',
      'Developed automated newsletter engine and responsive templates',
      'Collaborated with category managers on promotional content'
    ],
    impact:
      'Improved campaign delivery accuracy and automated newsletter operations for regional markets.',
    featured: false
  },
  {
    id: 'lazada',
    title: 'Lazada – Product & Front‑End Engineering',
    tagline: 'Campaign pages, QA workflows, and frontend systems for Southeast Asia e‑commerce',
    stack: 'HTML · CSS · JavaScript · MySQL · CMS Tools',
    contributions: [
      'Built and maintained landing pages for campaigns and promotions',
      'Tested features pre‑release and resolved UI bugs across devices',
      'Coordinated campaign execution with regional teams',
      'Used MySQL for backend data validation',
      'Handled CMS operations and asset uploads for high‑traffic events'
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
      'Developed frontend modules using React + TypeScript + TailwindCSS',
      'Built NestJS APIs for wish‑lists, contributions, and redemption flows',
      'Used NX monorepo tooling for modular FE/BE development',
      'Integrated backend–frontend data flow for real‑time progress tracking',
      'Conducted code reviews ensuring maintainability and best practices'
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
    stack: 'ReactJS · TypeScript · TailwindCSS · GraphQL · AWS S3 · CI/CD · Zoom SDK',
    contributions: [
      'Led FE development across Patient, Doctor, and Admin applications',
      'Translated Figma designs into responsive UI systems',
      'Implemented GraphQL client layer for queries, mutations, and caching',
      'Built CI/CD pipelines and managed multi‑environment deployments (Dev→Prod)',
      'Collaborated closely with founder for product and UX decisions',
      'Deployed applications to AWS S3 ensuring high performance and reliability'
    ],
    impact:
      'Delivered a full telehealth ecosystem from scratch, enabling scalable online consultations and prescription workflows.',
    link: 'https://www.polln.com/',
    featured: true
  },
  {
    id: 'realista',
    title: 'Realista – Front‑End Development',
    tagline: 'Real estate platform for browsing and discovering property listings',
    stack: 'Laravel · JavaScript/jQuery · CSS · Google Maps · Bootstrap',
    contributions: [
      'Converted PSD designs into responsive and functional web pages',
      'Integrated front‑end views with Laravel backend logic',
      'Implemented interactive UI components using JS/jQuery',
      'Integrated Google Maps for property search and location‑based navigation',
      'Maintained UI consistency and optimized load performance'
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
      'Converted legacy PHP system into a modern ReactJS application',
      'Rebuilt UI using React + TailwindCSS for better performance and usability',
      'Implemented pages for work logs, budgets, and billing visibility',
      'Managed Azure deployments ensuring stable releases',
      'Improved UX with cleaner layouts and accessible data displays'
    ],
    impact:
      'Delivered a maintainable, modern UI that improved client billing accuracy and operational visibility.',
    featured: true
  },
  {
    id: 'xpo',
    title: 'XPO Group – Full‑Stack Development',
    tagline: 'Modernizing national expo management systems using NestJS + React',
    stack: 'NestJS · ReactJS · TypeScript · TailwindCSS · REST API · GraphQL',
    contributions: [
      'Built core backend modules and scalable APIs in NestJS',
      'Developed responsive React + Tailwind interfaces with shadcn/ui',
      'Replaced legacy PHP workflows with modern service-based architecture',
      'Helped establish reusable frontend component structures',
      'Collaborated across engineering to ensure smooth system modernization'
    ],
    impact:
      'Enabled migration from legacy systems to a scalable Node/NestJS architecture, supporting national expo operations.',
    featured: false
  }
];
