export interface Project {
  name: string;
  category: string;
  tags: string[];
  image: string;
  imageBg: string;
  url: string;
  year: string;
  description: string;
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
    description: 'U Fill Academy is a premium frontend educational platform featuring responsive layout structures, interactive animations, and optimized learning materials.',
  },
  {
    name: 'Career path AI',
    category: 'Frontend & Backend',
    tags: ['React', 'TypeScript', 'PostgreSQL', 'Supabase'],
    image: '/works/cpa.png',
    imageBg: '/stripe.svg',
    url: 'https://cpa-ebon.vercel.app/',
    year: '2024',
    description: 'Career Path AI leverages full-stack integration with Supabase, PostgreSQL, and TypeScript to help users explore personalized career paths based on AI guidance.',
  },
  {
    name: 'AI & React Seminar',
    category: 'Frontend',
    tags: ['React', 'Tailwind', 'Firebase'],
    image: '/works/seminar.png',
    imageBg: '/stripe.svg',
    url: 'https://141025mcaairtseminarlw19.vercel.app/',
    year: '2025',
    description: 'AI & React Seminar is a dedicated portal featuring firebase database integration for live registration, feedback collection, and resource sharing for technical events.',
  },
  {
    name: 'Yazhu Cakes',
    category: 'Frontend',
    tags: ['React', 'Next.js'],
    image: '/works/yazhucakes.png',
    imageBg: '/stripe.svg',
    url: 'https://yazhu-cakeshop.vercel.app/',
    year: '2026',
    description: 'Yazhu Cakes is an elegant e-commerce design built with Next.js and custom CSS, providing custom cake selections, smooth order flows, and rich visual previews.',
  },
  {
    name: 'Thiran 360AI',
    category: 'Frontend & Backend',
    tags: ['React', 'Tailwind', 'GSAP', 'Supabase'],
    image: '/works/thiran360.png',
    imageBg: '/stripe.svg',
    url: 'https://thiran360-ai-xi.vercel.app',
    year: '2026',
    description: 'Thiran 360AI is a cutting-edge platform combining GSAP animations, Tailwind CSS, and Supabase to deliver a modern, interactive full-stack AI user experience.',
  },
];
