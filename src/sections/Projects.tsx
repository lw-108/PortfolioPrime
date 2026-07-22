import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { CreepyButton } from '../components/ui/creepy-button';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../lib/projects-data';
import { getTechIcon } from '../lib/tech-data';
import { AnimatedTitle } from '../components/ui/AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);

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
                <AnimatedTitle text="Selected Works" />
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
                  {/* Image — clickable link */}
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
                          backgroundImage: "var(--stripe-bg)",
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
                  </a>

                  {/* Card info — outside <a> so CreepyButton isn't nested inside another anchor */}
                  <div className="mt-3 space-y-2">
                    {/* Category */}
                    <p className="font-clash text-xs sm:text-sm text-muted-foreground uppercase tracking-widest leading-none">
                      {work.category}
                    </p>

                    {/* Name + Year on same row */}
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-clash text-2xl sm:text-3xl font-bold uppercase text-foreground leading-none">
                        {work.name}
                      </h3>
                      <span className="bg-foreground text-background text-xs font-semibold px-3 py-1 shrink-0 flex items-center cursor-default">
                        {work.year}
                      </span>
                    </div>

                    {/* Tags row */}
                    <div className="flex gap-1.5 select-none flex-wrap">
                      {work.tags.map((tag) => {
                        if (!tag.trim()) return null;
                        const iconUrl = getTechIcon(tag);
                        return (
                          <span
                            key={tag}
                            className="bg-[#f54900] text-white text-xs font-semibold px-2.5 py-1 flex items-center gap-1.5 cursor-default hover:bg-[#d43f00] transition-colors duration-300"
                          >
                            {iconUrl && (
                              <img
                                src={iconUrl}
                                alt={tag}
                                className="w-3.5 h-3.5 object-contain shrink-0"
                              />
                            )}
                            <span>{tag}</span>
                          </span>
                        );
                      })}
                    </div>

                    {/* Description + Visit Button row */}
                    <div className="flex items-end justify-between gap-4 pt-1">
                      <p className="text-xs sm:text-sm text-neutral-400 font-clash leading-relaxed max-w-xl">
                        {work.description}
                      </p>
                      {work.url && (
                        <a
                          href={work.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0"
                        >
                          <CreepyButton
                            coverClassName="text-xs font-clash font-semibold uppercase tracking-wider text-white whitespace-nowrap flex items-center gap-1.5"
                          >
                            <span>Visit Live</span>
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                          </CreepyButton>
                        </a>
                      )}
                    </div>
                  </div>
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
