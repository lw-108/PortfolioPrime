import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { CreepyButton } from '../components/ui/creepy-button';
import { AnimatedTitle } from '../components/ui/AnimatedTitle';
import { projectsData, type Project } from '../lib/projects-data';

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
  const sectionRef = useRef<HTMLElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const activeIndexRef = useRef(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const updateIndex = (targetDigit: number, direction: 'forward' | 'backward') => {
      const currentVal = numberRef.current ? numberRef.current.innerText : '1';
      if (currentVal === String(targetDigit)) return;

      if (direction === 'forward') {
        gsap.timeline({ defaults: { duration: 0.3 } })
          .to(indexRef.current, {
            yPercent: -100,
            ease: 'power4.inOut',
            onComplete: () => {
              if (numberRef.current) numberRef.current.innerText = String(targetDigit);
              activeIndexRef.current = targetDigit - 1;
              gsap.set(indexRef.current, { yPercent: 100 });
            },
          })
          .to(indexRef.current, {
            yPercent: 0,
            ease: 'power1.inOut',
          });
      } else {
        gsap.timeline({ defaults: { duration: 0.3 } })
          .to(indexRef.current, {
            yPercent: 100,
            ease: 'power4.inOut',
            onComplete: () => {
              if (numberRef.current) numberRef.current.innerText = String(targetDigit);
              activeIndexRef.current = targetDigit - 1;
              gsap.set(indexRef.current, { yPercent: -100 });
            },
          })
          .to(indexRef.current, {
            yPercent: 0,
            ease: 'power1.inOut',
          });
      }
    };

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        ScrollTrigger.create({
          trigger: card,
          start: 'top 25%',
          end: 'bottom 25%',
          onEnter: () => {
            updateIndex(i + 1, 'forward');
          },
          onEnterBack: () => {
            updateIndex(i + 1, 'backward');
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
            {/* Static "0" — never animates */}
            <span className="font-clash relative tracking-tighter">0</span>
            {/* Only the second digit flips */}
            <span
              ref={indexRef}
              className="font-clash relative tracking-tighter will-change-transform inline-block overflow-hidden"
              style={{ height: '1em', lineHeight: '0.8', minWidth: '0.7em' }}
            >
              <span ref={numberRef} className="inline-block w-full">1</span>
            </span>
          </div>

          <aside className="relative col-span-full flex flex-col space-y-12 md:col-span-7">
            {projectsData.map((work: Project, i: number) => (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="work-card border-b border-dashed border-neutral-800 pb-10"
              >
                <a
                  className="group block"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={work.url}
                >
                  {/* Image container */}
                  <div className="relative w-full h-auto rounded-lg flex flex-col justify-start border border-neutral-200/50 dark:border-neutral-800/50 p-4">
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
                        {work.tags.map((tag: string) => {
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
                  </div>
                </a>
              </div>
            ))}
          </aside>
        </div>

        {/* More Projects Button */}
        <div className="flex justify-end mt-16 sm:mt-24">
          <CreepyButton coverClassName="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white whitespace-nowrap">
            More Projects
          </CreepyButton>
        </div>

      </div>
    </section>
  );
};

export default Projects;
