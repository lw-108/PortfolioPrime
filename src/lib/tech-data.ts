export interface TechMetric {
  label: string;
  value: number;
}

export interface TechItem {
  image: string;
  link: string;
  title: string;
  description: string;
  category: string;
  level: number;
  experience: number;
  tools: string[];
}

export const techStackItems: TechItem[] = [
  /* Programming Languages */
  {
    title: "C",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/72/C1stEdition.svg",
    link: "https://en.cppreference.com/w/c",
    level: 85,
    experience: 80,
    category: "Backend",
    description: "Proficient in systems programming, algorithms, and low-level operations.",
    tools: ["Pointers", "Memory Management", "Data Structures"],
  },
  {
    title: "C++",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
    link: "https://isocpp.org",
    level: 82,
    experience: 78,
    category: "Backend",
    description: "Object-oriented programming with STL and performance optimization.",
    tools: ["OOP", "STL", "Templates"],
  },
  {
    title: "Python",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    link: "https://www.python.org",
    level: 88,
    experience: 85,
    category: "Backend",
    description: "Versatile programming for web, automation, data analysis, and AI projects.",
    tools: ["Automation", "Data Science", "OpenCV"],
  },
  {
    title: "Java",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b1/ThumbsUp.svg",
    link: "https://www.java.com",
    level: 85,
    experience: 80,
    category: "Backend",
    description: "Enterprise-level application development with strong OOP principles.",
    tools: ["OOP", "Spring", "Multithreading"],
  },

  /* Front-end Technologies */
  {
    title: "HTML5",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Html-1.svg",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    level: 95,
    experience: 90,
    category: "Frontend",
    description: "Expert in semantic markup, accessibility, and modern HTML5 standards.",
    tools: ["Semantic HTML", "SEO", "Accessibility"],
  },
  {
    title: "CSS3",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg",
    link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    level: 92,
    experience: 88,
    category: "Frontend",
    description: "Advanced styling with modern layouts, animations, and responsive design.",
    tools: ["Flexbox", "Grid", "Animations"],
  },
  {
    title: "JavaScript",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b9/JavaScript_shield_logo_%28no_text%29.svg",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    level: 90,
    experience: 85,
    category: "Frontend",
    description: "Modern ES6+ development for interactive and dynamic web applications.",
    tools: ["ES6+", "DOM Manipulation", "Async/Await"],
  },
  {
    title: "TypeScript",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Typescript.svg",
    link: "https://www.typescriptlang.org",
    level: 88,
    experience: 82,
    category: "Frontend",
    description: "Strongly typed programming language that builds on JavaScript.",
    tools: ["Static Typing", "Interfaces", "Generics"],
  },
  {
    title: "Bootstrap",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Bootstrap_logo.svg",
    link: "https://getbootstrap.com",
    level: 85,
    experience: 80,
    category: "Frontend",
    description: "Rapid responsive UI development with Bootstrap framework components.",
    tools: ["Grid System", "Components", "Responsive"],
  },
  {
    title: "jQuery",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/61/JQuery_icon.svg",
    link: "https://jquery.com",
    level: 75,
    experience: 70,
    category: "Frontend",
    description: "Simplified DOM manipulation and AJAX operations for web applications.",
    tools: ["DOM Manipulation", "AJAX", "Animations"],
  },
  {
    title: "Tailwind CSS",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
    link: "https://tailwindcss.com",
    level: 88,
    experience: 82,
    category: "Frontend",
    description: "Utility-first CSS framework for rapid custom UI development.",
    tools: ["Utility Classes", "Responsive", "Customization"],
  },
  {
    title: "SASS",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/96/Sass_Logo_Color.svg",
    link: "https://sass-lang.com",
    level: 82,
    experience: 75,
    category: "Frontend",
    description: "CSS preprocessing with variables, mixins, and modular architecture.",
    tools: ["Variables", "Mixins", "Nesting"],
  },
  {
    title: "Framer Motion",
    image: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg",
    link: "https://www.framer.com/motion/",
    level: 75,
    experience: 68,
    category: "Frontend",
    description: "Production-ready animations for React applications.",
    tools: ["Animations", "Gestures", "Transitions"],
  },
  {
    title: "GSAP",
    image: "https://gsap.com/community/uploads/monthly_2020_03/tweenmax.thumb.png.c849c5b56c6752e3f2276b82ee702625.png",
    link: "https://gsap.com",
    level: 78,
    experience: 70,
    category: "Frontend",
    description: "High-performance animations for web applications.",
    tools: ["Tweening", "Timelines", "ScrollTrigger"],
  },
  {
    title: "React",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    link: "https://react.dev",
    level: 90,
    experience: 85,
    category: "Frontend",
    description: "Building dynamic and responsive user interfaces with React.",
    tools: ["Hooks", "Context API", "Component-Based Architecture"],
  },
  {
    title: "Next.js",
    image: "https://img.icons8.com/color/1200/nextjs.jpg",
    link: "https://nextjs.org",
    level: 85,
    experience: 80,
    category: "Frontend",
    description: "Full-stack React framework for server-side rendering and static site generation.",
    tools: ["SSR", "SSG", "API Routes"],
  },
  {
    title: "Three.js",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrIWOHq-dA9la8hmZydHjL0rAvwycI0SSdcxG60LHesPrXPujDxMRb_Qw&s=10",
    link: "https://threejs.org",
    level: 78,
    experience: 72,
    category: "Frontend",
    description: "JavaScript 3D library for creating interactive 3D graphics in the browser.",
    tools: ["3D Rendering", "WebGL", "Animations"],
  },
  {
    title: "Angular",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Deprecated_Angular_logo.svg",
    link: "https://angular.dev",
    level: 85,
    experience: 80,
    category: "Frontend",
    description: "Platform for building mobile and desktop web applications.",
    tools: ["Components", "Services", "RxJS"],
  },
  {
    title: "Chart.js",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/86/Chart.js_logo.svg",
    link: "https://www.chartjs.org",
    level: 78,
    experience: 72,
    category: "Frontend",
    description: "Simple yet flexible JavaScript charting library.",
    tools: ["Data Visualization", "Charts", "Graphs"],
  },

  /* Back-end Technologies */
  {
    title: "Node.js",
    image: "https://www.svgrepo.com/show/354119/nodejs-icon.svg",
    link: "https://nodejs.org",
    level: 85,
    experience: 80,
    category: "Backend",
    description: "JavaScript runtime for building scalable server-side applications.",
    tools: ["Express.js", "REST APIs", "Middleware"],
  },
  {
    title: "Express.js",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe1k8pM0eIDgOiGYr06gEmHlG3eJYTckNzO8R-nmjH3g&s=10d",
    link: "https://expressjs.com",
    level: 82,
    experience: 78,
    category: "Backend",
    description: "Fast, unopinionated web framework for Node.js applications.",
    tools: ["Routing", "Middleware", "Error Handling"],
  },
  {
    title: "JWT",
    image: "https://img.icons8.com/?size=256&id=rHpveptSuwDz&format=png",
    link: "https://jwt.io",
    level: 80,
    experience: 75,
    category: "Backend",
    description: "JSON Web Tokens for secure authentication and authorization.",
    tools: ["Authentication", "Authorization", "Security"],
  },
  {
    title: "OpenCV",
    image: "https://images.icon-icons.com/2699/PNG/512/opencv_logo_icon_170887.png",
    link: "https://opencv.org",
    level: 72,
    experience: 65,
    category: "Backend",
    description: "Open source computer vision and machine learning software library.",
    tools: ["Computer Vision", "Image Processing", "ML"],
  },

  /* Databases */
  {
    title: "Firebase",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Firebase_Logo_%28No_wordmark%29_%282024-%29.svg",
    link: "https://firebase.google.com",
    level: 78,
    experience: 72,
    category: "Database",
    description: "Google's platform for mobile and web application development.",
    tools: ["Authentication", "Firestore", "Hosting"],
  },
  {
    title: "Supabase",
    image: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/supabase.webp",
    link: "https://supabase.com",
    level: 75,
    experience: 68,
    category: "Database",
    description: "Open source Firebase alternative with PostgreSQL database.",
    tools: ["PostgreSQL", "Auth", "Realtime"],
  },
  {
    title: "PostgreSQL",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1280px-Postgresql_elephant.svg.png",
    link: "https://www.postgresql.org",
    level: 80,
    experience: 75,
    category: "Database",
    description: "Advanced open-source relational database with extensibility.",
    tools: ["Advanced Queries", "Transactions", "JSON Support"],
  },
  {
    title: "SQLite",
    image: "https://www.svgrepo.com/show/374094/sqlite.svg",
    link: "https://www.sqlite.org",
    level: 78,
    experience: 72,
    category: "Database",
    description: "Lightweight, serverless SQL database engine.",
    tools: ["Embedded", "Serverless", "Mobile Apps"],
  },
  {
    title: "MongoDB",
    image: "https://icon.icepanel.io/Technology/svg/MongoDB.svg",
    link: "https://www.mongodb.com",
    level: 82,
    experience: 78,
    category: "Database",
    description: "NoSQL document database for modern applications.",
    tools: ["Mongoose", "Aggregation", "Indexing"],
  },
  {
    title: "MySQL",
    image: "https://icon.icepanel.io/Technology/svg/MySQL.svg",
    link: "https://www.mysql.com",
    level: 80,
    experience: 75,
    category: "Database",
    description: "Popular open-source relational database management system.",
    tools: ["Stored Procedures", "Triggers", "Optimization"],
  },

  /* Tools / DevOps / Design */
  {
    title: "Git",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Git_Icon.svg",
    link: "https://git-scm.com",
    level: 90,
    experience: 85,
    category: "DevOps",
    description: "Distributed version control system for tracking code changes.",
    tools: ["Version Control", "Branching", "Merging"],
  },
  {
    title: "GitHub",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI0m2XETqEvIbVmv1rXkjDb1N-tRlSlInwlCcwfGkpeoCmKeU90meC6vo&s=10",
    link: "https://github.com",
    level: 88,
    experience: 85,
    category: "DevOps",
    description: "Platform for version control and collaborative software development.",
    tools: ["Repositories", "Pull Requests", "Actions"],
  },
  {
    title: "Postman",
    image: "https://www.svgrepo.com/show/354202/postman-icon.svg",
    link: "https://www.postman.com",
    level: 85,
    experience: 80,
    category: "DevOps",
    description: "API platform for building and testing APIs.",
    tools: ["API Testing", "Collections", "Mock Servers"],
  },
  {
    title: "Figma",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
    link: "https://www.figma.com",
    level: 80,
    experience: 75,
    category: "Design",
    description: "Collaborative interface design tool for UI/UX design.",
    tools: ["UI Design", "Prototyping", "Collaboration"],
  },
  {
    title: "Docker",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Docker-svgrepo-com.svg/3840px-Docker-svgrepo-com.svg.png",
    link: "https://www.docker.com",
    level: 72,
    experience: 65,
    category: "DevOps",
    description: "Containerization platform for developing, shipping, and running applications.",
    tools: ["Containers", "Images", "Docker Compose"],
  },
  {
    title: "Netlify",
    image: "https://images.seeklogo.com/logo-png/47/3/netlify-icon-logo-png_seeklogo-477950.png",
    link: "https://www.netlify.com",
    level: 78,
    experience: 72,
    category: "DevOps",
    description: "Platform for deploying modern web projects with continuous deployment.",
    tools: ["Deployment", "CI/CD", "Serverless Functions"],
  },
  {
    title: "Vercel",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpGGArTE_eXrg4L5F3A3LPOjjxf8fkt3N5urx4iuR5xN-E6B2pCIzej5o&s=10",
    link: "https://vercel.com",
    level: 80,
    experience: 75,
    category: "DevOps",
    description: "Platform for frontend frameworks and static sites deployment.",
    tools: ["Deployment", "Serverless", "Edge Functions"],
  },
  {
    title: "GIMP",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/45/The_GIMP_icon_-_gnome.svg",
    link: "https://www.gimp.org",
    level: 75,
    experience: 70,
    category: "Design",
    description: "Free and open-source image editor for photo retouching.",
    tools: ["Image Editing", "Photo Retouching", "Graphic Design"],
  },
  {
    title: "npm",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg",
    link: "https://www.npmjs.com",
    level: 85,
    experience: 80,
    category: "DevOps",
    description: "Package manager for JavaScript and the world's largest software registry.",
    tools: ["Package Management", "Scripts", "Dependencies"],
  },
];

export const getTechDetails = (title: string, category: string) => {
  const item = techStackItems.find(t => t.title === title);
  const level = item ? item.level : 80;
  const exp = item ? item.experience : 75;
  const toolsList = item ? item.tools.join(", ") : "";

  let metrics: TechMetric[] = [];
  let summary = "";

  switch (category) {
    case 'Frontend':
      metrics = [
        { label: 'Architecture', value: Math.round(level * 0.95) },
        { label: 'State Mgmt', value: Math.round(level * 0.9) },
        { label: 'UI Layout', value: Math.round(level * 1.0) },
        { label: 'Experience', value: exp },
      ];
      summary = `${item?.description || ""} Familiar with key tools: ${toolsList}.`;
      break;
    case 'Backend':
      metrics = [
        { label: 'Architecture', value: Math.round(level * 0.95) },
        { label: 'Scaling', value: Math.round(level * 0.9) },
        { label: 'Security', value: Math.round(level * 0.95) },
        { label: 'Experience', value: exp },
      ];
      summary = `${item?.description || ""} Familiar with key concepts/tools: ${toolsList}.`;
      break;
    case 'Database':
      metrics = [
        { label: 'Schema Design', value: Math.round(level * 0.95) },
        { label: 'Query Opt', value: Math.round(level * 0.9) },
        { label: 'Data Security', value: Math.round(level * 0.95) },
        { label: 'Experience', value: exp },
      ];
      summary = `${item?.description || ""} Familiar with key features/tools: ${toolsList}.`;
      break;
    case 'DevOps':
      metrics = [
        { label: 'Containers/CI', value: Math.round(level * 0.95) },
        { label: 'Automation', value: Math.round(level * 0.9) },
        { label: 'Workflow Opt', value: Math.round(level * 0.95) },
        { label: 'Experience', value: exp },
      ];
      summary = `${item?.description || ""} Experienced with: ${toolsList}.`;
      break;
    case 'Design':
      metrics = [
        { label: 'Prototyping', value: Math.round(level * 0.95) },
        { label: 'UI/UX Design', value: Math.round(level * 0.9) },
        { label: 'Asset Opt', value: Math.round(level * 0.95) },
        { label: 'Experience', value: exp },
      ];
      summary = `${item?.description || ""} Skilled in: ${toolsList}.`;
      break;
    default:
      metrics = [
        { label: 'Expertise', value: level },
        { label: 'Practical Use', value: Math.round(level * 0.9) },
        { label: 'Efficiency', value: Math.round(level * 0.95) },
        { label: 'Experience', value: exp },
      ];
      summary = `${item?.description || ""} Experienced with tools: ${toolsList}.`;
  }

  return { metrics, summary };
};
