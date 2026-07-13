/**
 * One-time seed script — pushes existing projects into Firestore.
 * Run with:  npx tsx scripts/seed-projects.ts
 *
 * Requires VITE_ env vars. Create a `.env` at the project root first,
 * or export them in your shell before running.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query } from 'firebase/firestore';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env from project root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const firebaseConfig = {
  apiKey:            process.env.VITE_FIREBASE_API_KEY,
  authDomain:        process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.VITE_FIREBASE_APP_ID,
  measurementId:     process.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

const projects = [
  {
    name: 'U Fill Academy',
    category: 'Frontend & Animation',
    tags: ['React', 'Tailwind', 'Next.js'],
    image: '/works/ufaf.png',
    imageBg: '/stripe.svg',
    url: 'https://ufaf.vercel.app',
    year: '2025',
    description: 'U Fill Academy is a premium frontend educational platform featuring responsive layout structures, interactive animations, and optimized learning materials.',
    order: 0,
    published: true,
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
    order: 1,
    published: true,
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
    order: 2,
    published: true,
  },
  {
    name: 'Yazhu Cakes',
    category: 'Frontend',
    tags: ['React', 'Next.js'],
    image: '/works/yazhucakes.png',
    imageBg: '/stripe.svg',
    url: 'https://yazhu-cakeshop.vercel.app/',
    year: '2025',
    description: 'Yazhu Cakes is an elegant e-commerce design built with Next.js and custom CSS, providing custom cake selections, smooth order flows, and rich visual previews.',
    order: 3,
    published: true,
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
    order: 4,
    published: true,
  },
  {
    name: 'Tamilarasan Portfolio',
    category: 'Frontend',
    tags: ['React', 'Tailwind', 'Next.js'],
    image: '/works/TamilarasanPortfolio.png',
    imageBg: '/stripe.svg',
    url: 'https://tamil-mi-prtflio.vercel.app',
    year: '2025',
    description: 'Tamilarasan.M Portfolio is a Static portfolio website built with React, Tailwind CSS, and Next.js, showcasing projects, skills, and certifications.',
    order: 5,
    published: true,
  },
  {
    name: 'Keerthana Portfolio',
    category: 'Frontend',
    tags: ['React', 'Tailwind'],
    image: '/works/KeerthanaPortfolio.png',
    imageBg: '/stripe.svg',
    url: 'https://d-keerthana.vercel.app/',
    year: '2026',
    description: 'Keerthana.D Portfolio is a Static portfolio website built with React and Tailwind CSS, showcasing Beautiful UI and Aeshetic Eye treat for users with her Career Highlights, Education, and Certifications.',
    order: 6,
    published: true,
  },
  {
    name: 'Sowmiya Portfolio',
    category: 'Frontend',
    tags: ['React', 'Tailwind', 'Next.js'],
    image: '/works/SowmiyaPortfolio.png',
    imageBg: '/stripe.svg',
    url: 'https://sowmiya-portfolio-rtm2.vercel.app/',
    year: '2026',
    description: 'Sowmiya Portfolio is a Static portfolio website built with React, Tailwind CSS, and showcasing her Education, Skills, Certifications, and Career Highlights.',
    order: 7,
    published: true,
  },
  {
    name: 'Kovais',
    category: 'Frontend',
    tags: ['React', 'Tailwind', 'Next.js'],
    image: '/works/Kovais.png',
    imageBg: '/stripe.svg',
    url: 'https://kovais2026.vercel.app',
    year: '2026',
    description: 'Kovais Group is a Corporate Web application built with React, Tailwind CSS, and Next.js, showcasing their Luxury Services and Brand Identity.',
    order: 8,
    published: true,
  },
  {
    name: 'Dharani Herbals',
    category: 'Frontend & Backend',
    tags: ['React', 'Tailwind', 'Django', 'PostgreSQL'],
    image: '/works/DharaniHerbbals.png',
    imageBg: '/stripe.svg',
    url: 'https://dharani-herbals-2026.vercel.app',
    year: '2026',
    description: 'Dharani Herbals is a Corporate Web application built with React, Tailwind CSS, Django, and PostgreSQL, showcasing their Herbal Products and Services.',
    order: 9,
    published: true,
  },
  {
    name: 'Aruljothi Bike Parts',
    category: 'Frontend & Backend',
    tags: ['React', 'Tailwind'],
    image: '/works/AruljothiBikeParts.png',
    imageBg: '/stripe.svg',
    url: 'https://ajbs-two.vercel.app/',
    year: '2026',
    description: 'Aruljothi Bike Parts is a Corporate Web application built with React, Tailwind CSS, Django, and PostgreSQL and Bike parts APIs showcasing their Bike Parts and Services.',
    order: 10,
    published: true,
  },
];

async function seed() {
  console.log(`\n🔥 Connecting to Firestore project: ${firebaseConfig.projectId}\n`);

  // Check if already seeded
  const existing = await getDocs(query(collection(db, 'projects')));
  if (!existing.empty) {
    console.log(`⚠️  'projects' collection already has ${existing.size} document(s).`);
    console.log('    Skipping seed to avoid duplicates. Delete the collection first if you want to re-seed.\n');
    process.exit(0);
  }

  let count = 0;
  for (const project of projects) {
    await addDoc(collection(db, 'projects'), project);
    count++;
    console.log(`  ✓ [${count}/${projects.length}] ${project.name}`);
  }

  console.log(`\n✅ Seeded ${count} projects into Firestore 'projects' collection.\n`);
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
