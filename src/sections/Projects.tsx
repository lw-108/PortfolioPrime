import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

// ── Project Data ──
interface Project {
  name: string;
  category: string;
  tags: string[];
  image: string;
  imageBg: string;
  url: string;
  year: string;
}

const projectsData: Project[] = [
  {
    name: 'Portfolio Prime',
    category: 'Frontend & Animation',
    tags: ['React', 'Tailwind', 'GSAP'],
    image: '/works/ufaf.png',
    imageBg: '/stripe.svg',
    url: '#',
    year: '2025',
  },
  {
    name: 'Dashboard UI',
    category: 'Frontend & Design',
    tags: ['React', 'TypeScript'],
    image: 'https://i.ibb.co/b5pNdvFG/dash.png',
    imageBg: 'https://i.ibb.co/S7M9RfC5/codes-modified.png',
    url: '#',
    year: '2024',
  },
  {
    name: 'Code Editor',
    category: 'Full Stack & Tools',
    tags: ['Next.js', 'Node.js'],
    image: 'https://i.ibb.co/S7M9RfC5/codes-modified.png',
    imageBg: 'https://i.ibb.co/9HxXVqMy/output-onlinepngtools.png',
    url: '#',
    year: '2024',
  },
  {
    name: 'Launch Pad',
    category: 'Frontend & Backend',
    tags: ['React', 'AWS'],
    image: 'https://i.ibb.co/hRcY0xqp/reshot-illustration-startup-entrepreneur-T8-A94-HSCXY-modified.png',
    imageBg: 'https://i.ibb.co/b5pNdvFG/dash.png',
    url: '#',
    year: '2023',
  },
  {
    name: 'Creative Lab',
    category: 'Design & Prototype',
    tags: ['Figma', 'React'],
    image: 'https://i.ibb.co/9HxXVqMy/output-onlinepngtools.png',
    imageBg: 'https://i.ibb.co/hRcY0xqp/reshot-illustration-startup-entrepreneur-T8-A94-HSCXY-modified.png',
    url: '#',
    year: '2024',
  },
];

// ── Animated Title Characters ──
const AnimatedTitle: React.FC<{ text: string }> = ({ text }) => {
  const chars = text.split('');
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.02, delayChildren: 0 },
    },
  };
  const charVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 12, stiffness: 100 },
    },
  } as const;

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="inline"
    >
      {chars.map((char, i) => (
        <motion.span key={i} variants={charVariants} className="inline-block">
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// ── Main Component ──
const Projects: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        ScrollTrigger.create({
          trigger: card,
          start: 'top 25%',
          end: 'bottom 25%',
          onEnter: () => {
            // Forward scroll — number slides up out, new number slides up in
            gsap.to(indexRef.current, {
              yPercent: -100,
              duration: 0.3,
              ease: 'power4.inOut',
              onComplete: () => {
                setActiveIndex(Math.min(i, projectsData.length - 1));
                gsap.set(indexRef.current, { yPercent: 100 });
                gsap.to(indexRef.current, {
                  yPercent: 0,
                  duration: 0.3,
                  ease: 'power1.inOut',
                });
              },
            });
          },
          onLeaveBack: () => {
            // Backward scroll — number slides down out, previous number slides down in
            if (i > 0) {
              gsap.to(indexRef.current, {
                yPercent: 100,
                duration: 0.3,
                ease: 'power4.inOut',
                onComplete: () => {
                  setActiveIndex(Math.max(i - 1, 0));
                  gsap.set(indexRef.current, { yPercent: -100 });
                  gsap.to(indexRef.current, {
                    yPercent: 0,
                    duration: 0.3,
                    ease: 'power1.inOut',
                  });
                },
              });
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative z-10 overflow-y-clip will-change-auto font-clash select-none"
    >
      <div className="max-w-384 mx-auto w-full border-x border-dashed border-neutral-800 bg-background py-16 px-6 sm:px-8 lg:py-24 lg:px-16">

        {/* ── Header ── */}
        <div className="flex flex-col">
          <header className="mb-6 border-b border-dashed border-neutral-800 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <span className="text-[#f54900] text-sm uppercase tracking-widest font-semibold">
                Projects
              </span>
              <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold uppercase tracking-tight mt-2 text-foreground leading-none">
                <AnimatedTitle text="Selected Works /" />
              </h2>
            </div>
            <p className="text-muted-foreground/50 text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold hidden sm:block leading-none">
              ( {projectsData.length} )
            </p>
          </header>

          {/* Subheader row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-muted-foreground mt-[5%] grid grid-cols-12 justify-end gap-x-4 md:gap-x-8"
          >
            <p className="text-xs sm:text-sm text-muted-foreground/85 col-span-4 text-center text-nowrap uppercase tracking-widest font-semibold lg:col-start-2">
              (
              <span className="inline sm:hidden">{projectsData.length} </span>
              PROJECTS )
            </p>
            <p className="font-clash text-base sm:text-lg col-span-8 w-full text-balance sm:font-semibold lg:col-span-7">
              Featured client projects that have been meticulously crafted with
              passion and purpose over the years.
            </p>
          </motion.div>
        </div>

        {/* ── Grid: Sticky Index + Project Cards ── */}
        <div className="relative mt-12 grid w-full grid-cols-12 gap-x-4 sm:gap-x-8 lg:mt-[10%]">

          {/* Sticky large index number — desktop only */}
          <div className="text-foreground/10 sticky top-12 col-span-5 hidden h-fit w-full overflow-hidden text-[22vw] leading-[0.8] font-semibold md:flex items-baseline">
            <span className="font-clash relative tracking-tighter">0</span>
            <span
              ref={indexRef}
              className="font-clash relative tracking-tighter will-change-transform inline-flex items-baseline"
            >
              {activeIndex + 1}
              <span className="inline-block w-[0.07em] h-[0.07em] rounded-full bg-current ml-[0.03em] translate-y-[-0.05em]" />
            </span>
          </div>

          {/* Project cards column */}
          <aside className="relative col-span-full flex flex-col space-y-10 md:col-span-7">
            <style dangerouslySetInnerHTML={{__html: `
              .scrollbar-custom::-webkit-scrollbar {
                width: 6px;
              }
              .scrollbar-custom::-webkit-scrollbar-track {
                background: transparent;
              }
              .scrollbar-custom::-webkit-scrollbar-thumb {
                background-color: rgba(120, 120, 120, 0.3);
                border-radius: 9999px;
              }
              .scrollbar-custom::-webkit-scrollbar-thumb:hover {
                background-color: rgba(120, 120, 120, 0.5);
              }
            `}} />
            {projectsData.map((work, i) => (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="work-card"
              >
                <a
                  className="group block"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={work.url}
                >
                  {/* Image container */}
                  <div className="relative aspect-video sm:aspect-[4/3] h-[350px] sm:h-[450px] overflow-hidden rounded-lg flex flex-col justify-start border border-neutral-200/50 dark:border-neutral-800/50">
                    {/* Background repeating stripe pattern */}
                    <div
                      className="absolute inset-0 w-full h-full opacity-35 dark:opacity-20 pointer-events-none select-none"
                      style={{
                        backgroundImage: "url('/stripe.svg')",
                        backgroundRepeat: 'repeat',
                        backgroundSize: '16px 16px',
                      }}
                    />
                    {/* Foreground project screenshot scrollable container */}
                    <div 
                      className="z-10 w-full h-full overflow-y-auto px-6 py-8 scrollbar-custom"
                      style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'rgba(120, 120, 120, 0.3) transparent',
                      }}
                    >
                      <img
                        alt={work.name}
                        loading="lazy"
                        className="w-full rounded-md object-contain h-auto shadow-md transition-transform duration-500 ease-in-out group-hover:scale-[1.01] group-hover:shadow-2xl"
                        src={work.image}
                      />
                    </div>
                  </div>

                  {/* Card info */}
                  <div className="mt-3">
                    <p className="font-clash text-xs sm:text-sm text-muted-foreground uppercase tracking-widest mb-1 leading-none">
                      {work.category}
                    </p>
                    <div className="items-center justify-between sm:flex">
                      <h3 className="font-clash text-2xl sm:text-3xl font-bold uppercase text-foreground">
                        {work.name}
                      </h3>
                      <div className="flex gap-1.5 select-none mt-2 sm:mt-0 flex-wrap">
                        {work.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-neutral-400 dark:border-neutral-600 text-foreground hover:bg-foreground hover:text-background rounded-full px-4 py-1.5 text-xs sm:text-sm transition-[background-color,color] duration-500 ease-in-out cursor-default"
                          >
                            {tag}
                          </span>
                        ))}
                        <span className="border border-neutral-400 dark:border-neutral-600 bg-foreground text-background hover:bg-transparent hover:text-foreground rounded-full px-4 py-1.5 text-xs sm:text-sm transition-[background-color,color] duration-500 ease-in-out cursor-default">
                          {work.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </aside>
        </div>

      </div>
    </section>
  );
};

export default Projects;
