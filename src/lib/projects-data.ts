export interface Project {
  name: string;
  category: string;
  tags: string[];
  image: string;
  imageBg: string;
  url: string;
  year: string;
}

export const projectsData: Project[] = [
  {
    name: 'U Fill Academy',
    category: 'Frontend & Animation',
    tags: ['React', 'Tailwind', 'Next.js'],
    image: '/works/ufaf.png',
    imageBg: '/stripe.svg',
    url: 'https://ufaf.vercel.app',
    year: '2025',
  },
  {
    name: 'Career path AI',
    category: 'Frontend & Backend',
    tags: ['React', 'TypeScript', 'PostgreSQL', 'Supabase'],
    image: '/works/cpa.png',
    imageBg: '/stripe.svg',
    url: 'https://cpa-ebon.vercel.app/',
    year: '2024',
  },
  {
    name: 'AI & React Seminar',
    category: 'Frontend',
    tags: ['React', 'Tailwind', 'Firebase'],
    image: '/works/seminar.png',
    imageBg: '/stripe.svg',
    url: 'https://141025mcaairtseminarlw19.vercel.app/',
    year: '2025',
  },
  {
    name: 'Yazhu Cakes',
    category: 'Frontend',
    tags: ['React', 'Next.js'],
    image: '/works/yazhucakes.png',
    imageBg: '/stripe.svg',
    url: 'https://yazhu-cakeshop.vercel.app/',
    year: '2026',
  },
  {
    name: 'Thiran 360AI',
    category: 'Frontend & Backend',
    tags: ['React', 'Tailwind', 'GSAP', 'Supabase'],
    image: '/works/thiran360.png',
    imageBg: '/stripe.svg',
    url: 'https://thiran360-ai-xi.vercel.app',
    year: '2026',
  },
];
