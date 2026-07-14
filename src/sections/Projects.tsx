import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { CreepyButton } from '../components/ui/creepy-button';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../lib/projects-data';

gsap.registerPlugin(ScrollTrigger);


// ── Animated Title Characters ──
const AnimatedTitle: React.FC<{ text: string }> = ({ text }) => {
  let words = text.split(' ');
  if (words.length > 1 && words[words.length - 1] === '/') {
    const lastWord = words[words.length - 2] + ' /';
    words = [...words.slice(0, words.length - 2), lastWord];
  }
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
      className="inline-block"
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap">
          {word.split('').map((char, i) => (
            <motion.span key={i} variants={charVariants} className="inline-block">
              {char}
            </motion.span>
          ))}
          {wordIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
};

// ── Tag Icon Map ──
const tagIcons: Record<string, string> = {
  'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Tailwind': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'GSAP': 'https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg',
  'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'AWS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  'Figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  'Supabase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
  'Firebase': 'https://brandlogos.net/wp-content/uploads/2025/03/firebase_icon-logo_brandlogos.net_tcvck-512x646.png',
  'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
};

// ── Main Component ──
const Projects: React.FC = () => {
  const navigate = useNavigate();
  const { projects, loading } = useProjects();
  const featuredProjects = projects.slice(0, 5);
  const sectionRef = useRef<HTMLElement>(null);
  const indexRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const activeIndexRef = useRef(1);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (loading || featuredProjects.length === 0) return;
    if (window.innerWidth < 768) return;

    // Keep track of the active animation timeline to kill it properly
    let activeTween: gsap.core.Timeline | null = null;

    const updateIndex = (targetDigit: number, direction: 'forward' | 'backward') => {
      if (activeIndexRef.current === targetDigit) return;
      activeIndexRef.current = targetDigit;

      if (activeTween) {
        activeTween.kill();
      }

      // Ensure the element is clean before animating
      gsap.killTweensOf(indexRef.current);

      const tl = gsap.timeline();
      activeTween = tl;

      if (direction === "forward") {
        tl.to(indexRef.current, {
          yPercent: -100,
          duration: 0.15,
          ease: "power2.inOut"
        })
          .set(indexRef.current, {
            yPercent: 100
          })
          .call(() => {
            if (numberRef.current) numberRef.current.innerText = String(targetDigit);
          })
          .to(indexRef.current, {
            yPercent: 0,
            duration: 0.3,
            ease: "power1.inOut"
          });
      } else {
        tl.to(indexRef.current, {
          yPercent: 100,
          duration: 0.15,
          ease: "power2.inOut"
        })
          .set(indexRef.current, {
            yPercent: -100
          })
          .call(() => {
            if (numberRef.current) numberRef.current.innerText = String(targetDigit);
          })
          .to(indexRef.current, {
            yPercent: 0,
            duration: 0.3,
            ease: "power1.inOut"
          });
      }
    };

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card) => {
        if (!card) return;
        const imageTrigger = card.querySelector('.project-image-trigger') || card;

        ScrollTrigger.create({
          trigger: imageTrigger,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => {
            const targetDigit = parseInt(card.getAttribute('data-index') || '1', 10);
            const direction = targetDigit > activeIndexRef.current ? 'forward' : 'backward';
            updateIndex(targetDigit, direction);
          },
          onEnterBack: () => {
            const targetDigit = parseInt(card.getAttribute('data-index') || '1', 10);
            const direction = targetDigit > activeIndexRef.current ? 'forward' : 'backward';
            updateIndex(targetDigit, direction);
          },
          onToggle: (self) => {
            if (self.isActive) {
              const targetDigit = parseInt(card.getAttribute('data-index') || '1', 10);
              const direction = targetDigit > activeIndexRef.current ? 'forward' : 'backward';
              updateIndex(targetDigit, direction);
            }
          },
        });
      });
    }, sectionRef);

    // Refresh ScrollTrigger as delayed fallbacks for layout calculations
    const timer1 = setTimeout(() => ScrollTrigger.refresh(), 500);
    const timer2 = setTimeout(() => ScrollTrigger.refresh(), 1200);

    return () => {
      ctx.revert();
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [projects, loading]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative z-10 overflow-y-clip will-change-auto font-clash select-none w-full bg-transparent"
    >
      <div className="w-[97%] max-w-384 mx-auto bg-background py-16 px-6 sm:px-8 lg:py-24 lg:px-16">

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
              {loading ? '( — )' : `( ${featuredProjects.length} )`}
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
              <span className="inline sm:hidden">{featuredProjects.length} </span>
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
          <div className="text-foreground/10 sticky top-12 col-span-5 hidden h-fit w-full overflow-visible text-[25vw] leading-none font-semibold md:flex items-baseline">
            {/* Static "0" — never animates */}
            <span className="font-clash relative tracking-tighter leading-none select-none">0</span>
            {/* Only the second digit flips */}
            <div
              className="font-clash relative tracking-tighter will-change-transform inline-block overflow-visible leading-none select-none"
              style={{ height: '0.9em', minWidth: '0.6em' }}
            >
              <span
                ref={indexRef}
                className="inline-block w-full"
              >
                <span ref={numberRef}>1</span>
              </span>
            </div>
          </div>

          {/* Project cards column */}
          <aside className="relative col-span-full flex flex-col space-y-12 md:col-span-7">
            {/* Loading Skeleton */}
            {loading && Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="work-card pb-10 animate-pulse">
                <div className="w-full h-56 bg-neutral-800 rounded-lg" />
                <div className="mt-3 space-y-2">
                  <div className="h-3 w-1/3 bg-neutral-800 rounded" />
                  <div className="h-6 w-2/3 bg-neutral-800 rounded" />
                  <div className="h-3 w-full bg-neutral-800 rounded" />
                </div>
              </div>
            ))}

            {/* Project List */}
            {!loading && featuredProjects.map((work, i) => (
              <React.Fragment key={work.id ?? i}>
                {i > 0 && <div className="border-t border-dashed border-neutral-300 dark:border-neutral-800 my-4" />}
                <div
                  ref={(el) => { cardRefs.current[i] = el; }}
                  data-index={i + 1}
                  className="work-card pb-10"
                >
                  <a
                    className="group block"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={work.url}
                  >
                    {/* Image container */}
                    <div className="project-image-trigger relative w-full h-auto rounded-lg flex flex-col justify-start border border-neutral-200/50 dark:border-neutral-800/50 p-4">
                      {/* Background repeating stripe pattern */}
                      <div
                        className="absolute inset-0 w-full h-full opacity-35 dark:opacity-20 pointer-events-none select-none rounded-lg"
                        style={{
                          backgroundImage: "url('/stripe.svg')",
                          backgroundRepeat: 'repeat',
                          backgroundSize: '16px 16px',
                        }}
                      />
                      {/* Foreground project screenshot */}
                      <img
                        alt={work.name}
                        loading="lazy"
                        className="z-10 w-full object-contain h-auto shadow-md transition-transform duration-500 ease-in-out group-hover:scale-[1.01] group-hover:shadow-2xl"
                        src={work.image}
                        onLoad={() => {
                          ScrollTrigger.refresh();
                        }}
                      />
                    </div>

                    {/* Card info */}
                    <div className="mt-3">
                      <div className="flex justify-between items-end mb-1">
                        <p className="font-clash text-xs sm:text-sm text-muted-foreground uppercase tracking-widest leading-none">
                          {work.category}
                        </p>
                        <span className="md:hidden text-foreground/10 text-3xl font-semibold font-clash tracking-tighter leading-none select-none">
                          0{i + 1}
                        </span>
                      </div>
                      <div className="items-center justify-between sm:flex">
                        <h3 className="font-clash text-2xl sm:text-3xl font-bold uppercase text-foreground">
                          {work.name}
                        </h3>
                        <div className="flex gap-1.5 select-none mt-2 sm:mt-0 flex-wrap">
                          {work.tags.map((tag) => {
                            if (!tag.trim()) return null;
                            const iconUrl = tagIcons[tag];
                            return (
                              <span
                                key={tag}
                                className="bg-[#f54900] text-white text-xs sm:text-sm font-semibold px-3 py-1 flex items-center gap-1.5 cursor-default hover:bg-[#d43f00] transition-colors duration-300"
                              >
                                {iconUrl && (
                                  <img
                                    src={iconUrl}
                                    alt={tag}
                                    className="w-4 h-4 object-contain"
                                  />
                                )}
                                <span>{tag}</span>
                              </span>
                            );
                          })}
                          <span className="bg-foreground text-background text-xs sm:text-sm font-semibold px-3 py-1 flex items-center cursor-default">
                            {work.year}
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-clash leading-relaxed max-w-xl">
                        {work.description}
                      </p>
                    </div>
                  </a>
                </div>
              </React.Fragment>
            ))}
          </aside>
        </div>

        {/* More Projects Button */}
        <div className="flex justify-end mt-16 sm:mt-24">
          <CreepyButton 
            onClick={() => navigate('/projects')}
            coverClassName="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white whitespace-nowrap"
          >
            More Projects
          </CreepyButton>
        </div>

      </div>
    </section>
  );
};

export default Projects;
