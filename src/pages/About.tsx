import React, { useState, useMemo } from 'react';

// Types
interface TechItem {
  name: string;
  icon: string;
  colorClass: string;
  glowColor: string; // inline box-shadow colors
}

interface TechStack {
  [key: string]: TechItem[];
}

// SVG ICONS
const icons = {
  react: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  nextjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  astro: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/astro/astro-original.svg',
  nodejs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  express: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  c: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
  cpp: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',

  html: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  css: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  js: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  bootstrap: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
  jquery: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg',
  sass: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
  tailwind: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',

  mongodb: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  postgresql: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg',
  mysql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  firebase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  supabase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',

  git: 'https://i.ibb.co/BmqDMrk/git-svgrepo-com.png',
  github: 'https://i.ibb.co/TBqbLxC0/github-logo-svgrepo-com.png',
  vscode: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
  postman: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
  docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',

  figma: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  xd: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg',

  angular: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
  rxjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rxjs/rxjs-original.svg',
  chartjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chartjs/chartjs-original.svg',

  gsap: 'https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg',

  netlify: 'https://i.ibb.co/jkwZkgfN/netlify-svgrepo-com.png',
  vercel: 'https://reactle.vercel.app/favicon.ico'
};

// TECH STACK DATA WITH COLORS FOR SHADOWS/GLOWS ON HOVER
const techStack: TechStack = {
  "Programming Languages": [
    { name: 'C', icon: icons.c, colorClass: 'hover:border-[#00599c] hover:text-[#00599c]', glowColor: 'rgba(0, 89, 156, 0.2)' },
    { name: 'C++', icon: icons.cpp, colorClass: 'hover:border-[#00599c] hover:text-[#00599c]', glowColor: 'rgba(0, 89, 156, 0.2)' },
    { name: 'Python', icon: icons.python, colorClass: 'hover:border-[#3776ab] hover:text-[#3776ab]', glowColor: 'rgba(55, 118, 171, 0.2)' },
    { name: 'Java', icon: icons.java, colorClass: 'hover:border-[#f89820] hover:text-[#f89820]', glowColor: 'rgba(248, 152, 32, 0.2)' }
  ],

  "Frontend Technologies": [
    { name: 'HTML5', icon: icons.html, colorClass: 'hover:border-[#e34f26] hover:text-[#e34f26]', glowColor: 'rgba(227, 79, 38, 0.2)' },
    { name: 'CSS3', icon: icons.css, colorClass: 'hover:border-[#1572b6] hover:text-[#1572b6]', glowColor: 'rgba(21, 114, 182, 0.2)' },
    { name: 'JavaScript', icon: icons.js, colorClass: 'hover:border-[#f7df1e] hover:text-[#f7df1e] dark:hover:text-[#f7df1e]', glowColor: 'rgba(247, 223, 30, 0.2)' },
    { name: 'React', icon: icons.react, colorClass: 'hover:border-[#61dafb] hover:text-[#61dafb]', glowColor: 'rgba(97, 218, 251, 0.2)' },
    { name: 'GSAP', icon: icons.gsap, colorClass: 'hover:border-[#88ce02] hover:text-[#88ce02]', glowColor: 'rgba(136, 206, 2, 0.2)' },
    { name: 'Next.js', icon: icons.nextjs, colorClass: 'hover:border-foreground hover:text-foreground', glowColor: 'rgba(0, 0, 0, 0.1)' },
    { name: 'Bootstrap', icon: icons.bootstrap, colorClass: 'hover:border-[#7952b3] hover:text-[#7952b3]', glowColor: 'rgba(121, 82, 179, 0.2)' },
    { name: 'jQuery', icon: icons.jquery, colorClass: 'hover:border-[#0769ad] hover:text-[#0769ad]', glowColor: 'rgba(7, 105, 173, 0.2)' },
    { name: 'TailwindCSS', icon: icons.tailwind, colorClass: 'hover:border-[#38bdf8] hover:text-[#38bdf8]', glowColor: 'rgba(56, 189, 248, 0.2)' },
    { name: 'SCSS', icon: icons.sass, colorClass: 'hover:border-[#cc6699] hover:text-[#cc6699]', glowColor: 'rgba(204, 102, 153, 0.2)' }
  ],

  "Backend Technologies": [
    { name: 'Node.js', icon: icons.nodejs, colorClass: 'hover:border-[#339933] hover:text-[#339933]', glowColor: 'rgba(51, 153, 51, 0.2)' },
    { name: 'Express.js', icon: icons.express, colorClass: 'hover:border-[#828282] hover:text-[#828282]', glowColor: 'rgba(130, 130, 130, 0.2)' },
    { name: 'Firebase', icon: icons.firebase, colorClass: 'hover:border-[#ffca28] hover:text-[#ffca28]', glowColor: 'rgba(255, 202, 40, 0.2)' },
    { name: 'Supabase', icon: icons.supabase, colorClass: 'hover:border-[#3ecf8e] hover:text-[#3ecf8e]', glowColor: 'rgba(62, 207, 142, 0.2)' }
  ],

  Databases: [
    { name: 'PostgreSQL', icon: icons.postgresql, colorClass: 'hover:border-[#336791] hover:text-[#336791]', glowColor: 'rgba(51, 103, 145, 0.2)' },
    { name: 'MongoDB', icon: icons.mongodb, colorClass: 'hover:border-[#47a248] hover:text-[#47a248]', glowColor: 'rgba(71, 162, 72, 0.2)' },
    { name: 'MySQL', icon: icons.mysql, colorClass: 'hover:border-[#00758f] hover:text-[#00758f]', glowColor: 'rgba(0, 117, 143, 0.2)' },
    { name: 'Firebase DB', icon: icons.firebase, colorClass: 'hover:border-[#ffca28] hover:text-[#ffca28]', glowColor: 'rgba(255, 202, 40, 0.2)' }
  ],

  Tools: [
    { name: 'Git', icon: icons.git, colorClass: 'hover:border-[#f05032] hover:text-[#f05032]', glowColor: 'rgba(240, 80, 50, 0.2)' },
    { name: 'GitHub', icon: icons.github, colorClass: 'hover:border-foreground hover:text-foreground', glowColor: 'rgba(0, 0, 0, 0.1)' },
    { name: 'VS Code', icon: icons.vscode, colorClass: 'hover:border-[#007acc] hover:text-[#007acc]', glowColor: 'rgba(0, 122, 204, 0.2)' },
    { name: 'Postman', icon: icons.postman, colorClass: 'hover:border-[#ff6c37] hover:text-[#ff6c37]', glowColor: 'rgba(255, 108, 55, 0.2)' },
    { name: 'Docker', icon: icons.docker, colorClass: 'hover:border-[#0db7ed] hover:text-[#0db7ed]', glowColor: 'rgba(13, 183, 237, 0.2)' },
    { name: 'Netlify', icon: icons.netlify, colorClass: 'hover:border-[#00ad9f] hover:text-[#00ad9f]', glowColor: 'rgba(0, 173, 159, 0.2)' },
    { name: 'Vercel', icon: icons.vercel, colorClass: 'hover:border-foreground hover:text-foreground', glowColor: 'rgba(0, 0, 0, 0.1)' }
  ],

  "Libraries & Frameworks": [
    { name: 'Angular', icon: icons.angular, colorClass: 'hover:border-[#dd0031] hover:text-[#dd0031]', glowColor: 'rgba(221, 0, 49, 0.2)' },
    { name: 'RxJS', icon: icons.rxjs, colorClass: 'hover:border-[#e10098] hover:text-[#e10098]', glowColor: 'rgba(225, 0, 152, 0.2)' },
    { name: 'Chart.js', icon: icons.chartjs, colorClass: 'hover:border-[#ff6384] hover:text-[#ff6384]', glowColor: 'rgba(255, 99, 132, 0.2)' }
  ],

  Design: [
    { name: 'Figma', icon: icons.figma, colorClass: 'hover:border-[#f24e1e] hover:text-[#f24e1e]', glowColor: 'rgba(242, 78, 30, 0.2)' },
    { name: 'Adobe XD', icon: icons.xd, colorClass: 'hover:border-[#ff61f6] hover:text-[#ff61f6]', glowColor: 'rgba(255, 97, 246, 0.2)' }
  ]
};

const AboutPage: React.FC = () => {
  // IDE State
  const [activeFile, setActiveFile] = useState<'Bio.md' | 'Workflow.json' | 'Mission.sh'>('Bio.md');

  // Tech Stack state
  const [techSearch, setTechSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filter Categories list
  const categories = useMemo(() => {
    return ['All', ...Object.keys(techStack)];
  }, []);

  // Filtered Stack
  const filteredStack = useMemo(() => {
    const searchLower = techSearch.toLowerCase().trim();
    const result: TechStack = {};

    Object.entries(techStack).forEach(([category, items]) => {
      // Category match check
      if (selectedCategory !== 'All' && selectedCategory !== category) {
        return;
      }

      // Search query check
      const matchedItems = items.filter(item => 
        item.name.toLowerCase().includes(searchLower)
      );

      if (matchedItems.length > 0) {
        result[category] = matchedItems;
      }
    });

    return result;
  }, [techSearch, selectedCategory]);

  return (
    <section className="relative w-full font-clash select-none border-t border-dashed border-neutral-800">
      <div className="max-w-384 mx-auto w-full border-x border-dashed border-neutral-800 bg-background py-16 px-4 sm:px-8 lg:p-16">

        {/* Section Header */}
        <header className="mb-12 border-b border-dashed border-neutral-800 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative">
          <div>
            <span className="text-[#f54900] text-sm uppercase tracking-widest font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f54900] animate-ping" />
              நான் • ABOUT ME
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mt-2 text-foreground">
              Who I Am
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md font-clash text-sm sm:text-base leading-relaxed">
            I'm <span className="font-extrabold text-[#f54900]" style={{ fontSize: '110%' }}>M.K.Lingeshwarma</span>, a passionate Full Stack Developer focused on crafting scalable, elegant, and high-performing web applications with modern technologies.
          </p>
        </header>

        {/* Dynamic & Creative Interactive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          
          {/* File Tree Explorer (Left side of editor) - Col Span 4 */}
          <div className="lg:col-span-4 border border-neutral-800 bg-neutral-950/5 dark:bg-neutral-900/30 rounded-none p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-dashed border-neutral-800 pb-3">
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Workspace Explorer</span>
              <span className="text-[10px] text-[#f54900] bg-[#f54900]/10 px-2 py-0.5 font-mono">active</span>
            </div>
            
            <div className="flex flex-col gap-1.5 font-clash text-sm">
              <div className="flex items-center gap-2 text-neutral-400 text-xs py-1">
                <span>📁</span>
                <span>portfolio-prime</span>
              </div>
              <div className="pl-4 flex flex-col gap-1 border-l border-dashed border-neutral-800/60 ml-2">
                <button 
                  onClick={() => setActiveFile('Bio.md')}
                  className={`flex items-center gap-2 py-1.5 px-3 w-full text-left transition-all ${
                    activeFile === 'Bio.md' 
                      ? 'bg-[#f54900]/10 text-[#f54900] border-l-2 border-[#f54900] font-semibold' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-neutral-800/10'
                  }`}
                >
                  <span>📝</span> Bio.md
                </button>
                <button 
                  onClick={() => setActiveFile('Workflow.json')}
                  className={`flex items-center gap-2 py-1.5 px-3 w-full text-left transition-all ${
                    activeFile === 'Workflow.json' 
                      ? 'bg-[#f54900]/10 text-[#f54900] border-l-2 border-[#f54900] font-semibold' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-neutral-800/10'
                  }`}
                >
                  <span>⚙️</span> Workflow.json
                </button>
                <button 
                  onClick={() => setActiveFile('Mission.sh')}
                  className={`flex items-center gap-2 py-1.5 px-3 w-full text-left transition-all ${
                    activeFile === 'Mission.sh' 
                      ? 'bg-[#f54900]/10 text-[#f54900] border-l-2 border-[#f54900] font-semibold' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-neutral-800/10'
                  }`}
                >
                  <span>⚡</span> Mission.sh
                </button>
              </div>
            </div>

            {/* Quick Status / Details card under tree */}
            <div className="mt-4 p-4 bg-background border border-dashed border-neutral-800 text-xs font-clash text-muted-foreground flex flex-col gap-2">
              <div className="flex justify-between">
                <span>Degree:</span>
                <span className="text-foreground">MCA Graduate</span>
              </div>
              <div className="flex justify-between">
                <span>Focus:</span>
                <span className="text-[#f54900]">Full Stack Dev</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-green-500 animate-pulse">Open to Work</span>
              </div>
            </div>
          </div>

          {/* Interactive Code Editor (Right side) - Col Span 8 */}
          <div className="lg:col-span-8 border border-neutral-800 bg-[#fbfbf6] dark:bg-[#0c0c0b] shadow-sm relative overflow-hidden flex flex-col min-h-[420px]">
            {/* Tab header */}
            <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/40 px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 font-clash text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                  {activeFile === 'Bio.md' && '📝 Bio.md'}
                  {activeFile === 'Workflow.json' && '⚙️ Workflow.json'}
                  {activeFile === 'Mission.sh' && '⚡ Mission.sh'}
                </span>
              </div>
              <span className="text-[10px] font-clash text-muted-foreground opacity-60">UTF-8</span>
            </div>

            {/* Code Content */}
            <div className="p-6 font-clash text-sm overflow-y-auto flex-1 leading-relaxed">
              {activeFile === 'Bio.md' && (
                <div className="flex flex-col gap-4 text-foreground/90 font-clash">
                  <div className="font-clash text-xs text-muted-foreground mb-1"># Bio.md</div>
                  <h3 className="text-2xl font-bold tracking-tight text-foreground font-clash">
                    Hello 👋 I'm M.K.Lingeshwarma
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-clash">
                    I am currently pursuing my Master’s degree in Computer Applications, with a strong passion for Front-end and Full Stack Development. I enjoy building modern web applications using premium ecosystems.
                  </p>
                  
                  <div className="mt-4 border-l-4 border-[#f54900] pl-4 py-2 bg-[#f54900]/5 italic text-muted-foreground text-sm font-clash">
                    "Crafting clean, responsive and user-focused web architectures."
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 font-clash">
                    <span className="flex items-center gap-2 px-3 py-2 border border-neutral-800/40 text-xs bg-background/50 hover:bg-[#f54900]/5 transition-colors">
                      <img src={icons.react} alt="React" className="w-4 h-4" />
                      React / Next.js
                    </span>
                    <span className="flex items-center gap-2 px-3 py-2 border border-neutral-800/40 text-xs bg-background/50 hover:bg-[#f54900]/5 transition-colors">
                      <img src={icons.nodejs} alt="Node" className="w-4 h-4" />
                      Node.js / APIs
                    </span>
                    <span className="flex items-center gap-2 px-3 py-2 border border-neutral-800/40 text-xs bg-background/50 hover:bg-[#f54900]/5 transition-colors">
                      <img src={icons.tailwind} alt="Tailwind" className="w-4 h-4" />
                      TailwindCSS
                    </span>
                  </div>
                </div>
              )}

              {activeFile === 'Workflow.json' && (
                <div className="text-foreground/90 font-clash text-xs sm:text-sm">
                  <span className="text-neutral-400">// Workflow & Dev Stack Configuration</span>
                  <pre className="mt-4 leading-6 whitespace-pre-wrap overflow-x-auto font-clash">
{`{
  "${`version`}": "1.0.0",
  "${`developer`}": "M.K.Lingeshwarma",
  "${`environments`}": ["Vercel", "Netlify"],
  "${`versionControl`}": ["Git", "GitHub"],
  "${`tooling`}": ["VS Code", "Postman", "Docker"],
  "${`methodology`}": "Agile & CI/CD workflow",
  "${`status`}": "Actively deploying secure, optimized full stack APIs"
}`}
                  </pre>
                </div>
              )}

              {activeFile === 'Mission.sh' && (
                <div className="text-foreground/90 font-clash text-xs sm:text-sm flex flex-col gap-4">
                  <div>
                    <span className="text-neutral-400">#!/bin/bash</span>
                    <p className="text-[#f54900] font-semibold mt-2">$ echo "My Dev Mission Statement"</p>
                  </div>
                  
                  <div className="bg-neutral-950 text-neutral-300 p-4 border border-neutral-800/60 leading-6 font-clash text-xs sm:text-sm">
                    <p className="text-green-400 font-semibold">&gt; Executing mission statement...</p>
                    <p className="mt-2 text-neutral-300">
                      "My mission is to create impactful digital products that combine clean design, strong architecture, high performance, and real-world value. I aim to continuously push frontend interfaces to look premium and operate smoothly."
                    </p>
                    <p className="mt-4 text-green-400">&gt; Mission checklist: COMPLETE</p>
                  </div>
                </div>
              )}
            </div>

            {/* Editor Footer / Bar */}
            <div className="border-t border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/40 px-4 py-2 flex justify-between items-center text-[10px] font-clash text-muted-foreground">
              <span>Lines: 15 Col: 1</span>
              <span>Made with ❤️ and React</span>
            </div>
          </div>

        </div>

        {/* Tech Stack Header */}
        <header className="mb-10 border-b border-dashed border-neutral-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="text-[#f54900] text-sm uppercase tracking-widest font-semibold flex items-center gap-2">
              🛠️ TECHNICAL ABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mt-2 text-foreground font-clash">
              Tech Stack
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md font-clash text-sm sm:text-base leading-relaxed">
            The tools and technologies I use to design, develop, and deliver high-performance applications.
          </p>
        </header>

        {/* Interactive Filtering Dashboard */}
        <div className="border border-neutral-800 bg-neutral-950/5 dark:bg-neutral-900/20 p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Categories Selector */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 font-clash text-xs transition-all border ${
                  selectedCategory === category
                    ? 'bg-[#f54900] text-white border-[#f54900] shadow-[0_4px_12px_rgba(245,73,0,0.25)]'
                    : 'bg-background text-muted-foreground border-neutral-800 hover:text-foreground hover:border-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:max-w-xs">
            <input
              type="text"
              placeholder="Search tech/tool..."
              value={techSearch}
              onChange={(e) => setTechSearch(e.target.value)}
              className="w-full bg-background border border-neutral-800 px-4 py-2 font-clash text-xs focus:outline-none focus:border-[#f54900] focus:ring-1 focus:ring-[#f54900] text-foreground"
            />
            {techSearch && (
              <button
                onClick={() => setTechSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs font-clash"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Tech Stack Show Grid */}
        <div className="border border-neutral-800 p-8 bg-background relative z-10 min-h-[200px]">
          {Object.entries(filteredStack).length > 0 ? (
            Object.entries(filteredStack).map(([group, items]) => (
              <div className="mb-8 last:mb-0" key={group}>
                <h3 className="font-clash text-xs uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2 font-semibold">
                  <span className="w-1.5 h-3 bg-[#f54900]" />
                  {group}
                </h3>
                <div className="flex flex-wrap gap-3.5">
                  {items.map((item) => (
                    <div
                      key={item.name}
                      style={{
                        '--hover-glow': item.glowColor
                      } as React.CSSProperties}
                      className={`flex items-center gap-3 px-5 py-3 border border-neutral-800 bg-background/50 text-foreground transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_8px_20px_var(--hover-glow)] cursor-default font-clash text-xs ${item.colorClass}`}
                    >
                      <img src={item.icon} alt={item.name} className="w-5 h-5 object-contain" />
                      <span className="font-semibold">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <span className="text-3xl mb-2">🔍</span>
              <p className="font-clash text-xs text-muted-foreground">No technologies matched your filter criteria.</p>
              <button 
                onClick={() => { setTechSearch(''); setSelectedCategory('All'); }}
                className="mt-4 px-4 py-1.5 bg-[#f54900] text-white border border-[#f54900] text-xs font-clash"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default AboutPage;