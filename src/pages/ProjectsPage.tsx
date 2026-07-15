import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useProjects } from '../lib/projects-data';
import { techStackItems } from '../lib/tech-data';
import { CreepyButton } from '../components/ui/creepy-button';
import { AnimatedTitle } from '../components/ui/AnimatedTitle';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: 'easeOut' as const,
    },
  }),
  hidden: {
    filter: 'blur(8px)' as const,
    y: 15,
    opacity: 0,
  },
} as const;

// ── Skeleton card shown while Firestore loads ────────────────────────────────
const ProjectSkeleton: React.FC = () => (
  <div className="w-full h-full flex flex-col justify-center items-center px-4 sm:px-12 md:px-20 lg:px-32 py-8 bg-background shrink-0">
    <div className="w-full max-w-6xl h-[50vh] sm:h-[55vh] md:h-[65vh] bg-neutral-900 animate-pulse" />
    <div className="w-full max-w-6xl mt-6 flex flex-col gap-4 border-t border-border pt-6">
      <div className="h-8 w-1/3 bg-neutral-800 animate-pulse rounded-none" />
      <div className="h-4 w-2/3 bg-neutral-800 animate-pulse rounded-none" />
      <div className="h-4 w-1/2 bg-neutral-800 animate-pulse rounded-none" />
    </div>
  </div>
);

// ── Main Page ────────────────────────────────────────────────────────────────
export const ProjectsPage: React.FC = () => {
  const { projects, loading, error } = useProjects();

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const indexRef = useRef<number>(0);
  const lockRef = useRef<boolean>(false);

  const totalSlides = projects.length;

  // Helper to fetch SVG icon path for a given technology tag
  const getTechIcon = (tag: string) => {
    const normalizedTag = tag.toLowerCase().trim();
    const match = techStackItems.find(item => {
      const titleLower = item.title.toLowerCase().trim();
      if (titleLower === normalizedTag) return true;
      if (titleLower === 'tailwind css' && normalizedTag === 'tailwind') return true;
      if (titleLower === 'postgresql' && (normalizedTag === 'postgres' || normalizedTag === 'postgresql')) return true;
      return false;
    });
    return match ? match.image : null;
  };

  /* ── Tween to a specific index ── */
  const goTo = (idx: number) => {
    if (lockRef.current) return;
    const next = Math.max(0, Math.min(idx, totalSlides - 1));
    if (next === indexRef.current) return;

    lockRef.current = true;
    indexRef.current = next;

    gsap.to(trackRef.current, {
      xPercent: -100 * next,
      duration: 0.72,
      ease: 'power3.inOut',
      onComplete: () => {
        lockRef.current = false;
      },
    });
  };

  // GSAP setup deferred until projects are loaded
  useEffect(() => {
    if (loading || projects.length === 0) return;

    const section = scrollSectionRef.current;
    if (!section) return;

    // Reset index on data change
    indexRef.current = 0;
    lockRef.current = false;
    gsap.set(trackRef.current, { xPercent: 0 });

    /* ── Wheel (desktop) ── */
    const onWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      const inView = rect.top <= 10 && rect.bottom >= window.innerHeight - 10;
      if (!inView) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      // At first slide scrolling up → let native scroll take user back to header
      if (dir === -1 && indexRef.current === 0) return;
      // At last slide scrolling down → let native scroll take user to CTA below
      if (dir === 1 && indexRef.current === totalSlides - 1) return;
      e.preventDefault();
      e.stopPropagation();
      goTo(indexRef.current + dir);
    };

    /* ── Keyboard ── */
    const onKey = (e: KeyboardEvent) => {
      const rect = section.getBoundingClientRect();
      const inView = rect.top <= 10 && rect.bottom >= window.innerHeight - 10;
      if (!inView) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        // Only consume if we can still advance
        if (indexRef.current < totalSlides - 1) {
          e.preventDefault();
          goTo(indexRef.current + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        // Only consume if we can still go back
        if (indexRef.current > 0) {
          e.preventDefault();
          goTo(indexRef.current - 1);
        }
      }
    };

    /* ── Touch (mobile) ── */
    let touchStartY = 0;
    let touchStartX = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };
    const onTouchMove = (e: TouchEvent) => {
      const section = scrollSectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top <= 10 && rect.bottom >= window.innerHeight - 10;
      if (!inView) return;

      // dy > 0 = swipe-up (finger moves up → next slide)
      // dy < 0 = swipe-down (finger moves down → prev slide / scroll back to header)
      const dy = touchStartY - e.touches[0].clientY;

      // At first slide swiping down → allow native scroll back to title header
      if (dy < 0 && indexRef.current === 0) return;
      // At last slide swiping up → allow native scroll to CTA below
      if (dy > 0 && indexRef.current === totalSlides - 1) return;

      if (e.cancelable) e.preventDefault();
    };
    const onTouchEnd = (e: TouchEvent) => {
      const rect = section.getBoundingClientRect();
      const inView = rect.top <= 10 && rect.bottom >= window.innerHeight - 10;
      if (!inView) return;
      const dy = touchStartY - e.changedTouches[0].clientY;
      const dx = touchStartX - e.changedTouches[0].clientX;
      const threshold = 35; // slightly lower threshold for better responsiveness
      
      // Lock actions if animating
      if (lockRef.current) return;

      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > threshold) {
        // Vertical swipe: bottom-to-top (dy > 0) goes forward, top-to-bottom (dy < 0) goes backward
        const targetIndex = indexRef.current + (dy > 0 ? 1 : -1);
        // Sync scrolltrigger progress so that normal scrolling doesn't jump
        if (targetIndex >= 0 && targetIndex < totalSlides) {
          goTo(targetIndex);
          // Gently update ScrollTrigger's scroll position to match
          const targetProgress = targetIndex / (totalSlides - 1);
          const scrollDistance = st.end - st.start;
          window.scrollTo(0, st.start + (targetProgress * scrollDistance));
        }
      } else if (Math.abs(dx) > threshold) {
        // Horizontal swipe
        const targetIndex = indexRef.current + (dx > 0 ? 1 : -1);
        if (targetIndex >= 0 && targetIndex < totalSlides) {
          goTo(targetIndex);
          const targetProgress = targetIndex / (totalSlides - 1);
          const scrollDistance = st.end - st.start;
          window.scrollTo(0, st.start + (targetProgress * scrollDistance));
        }
      }
    };

    /* ── Pin the section ── */
    const st = ScrollTrigger.create({
      trigger: section,
      pin: true,
      start: 'top top',
      end: () => `+=${(totalSlides - 1) * window.innerHeight}`,
      onUpdate: (self) => {
        const raw = self.progress * (totalSlides - 1);
        const snapped = Math.round(raw);
        if (snapped !== indexRef.current && !lockRef.current) {
          lockRef.current = true;
          indexRef.current = snapped;
          gsap.to(trackRef.current, {
            xPercent: -100 * snapped,
            duration: 0.72,
            ease: 'power3.inOut',
            onComplete: () => { lockRef.current = false; },
          });
        }
      },
    });

    section.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    section.addEventListener('touchstart', onTouchStart, { passive: true });
    section.addEventListener('touchmove', onTouchMove, { passive: false });
    section.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      st.kill();
      section.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      section.removeEventListener('touchstart', onTouchStart);
      section.removeEventListener('touchmove', onTouchMove);
      section.removeEventListener('touchend', onTouchEnd);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, loading]);


  return (
    <div ref={containerRef} className="w-full bg-transparent text-white font-clash selection:bg-[#f54900] selection:text-white overflow-x-hidden">

      {/* Top Welcome Title Section */}
      <motion.section
        custom={0}
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-[97%] max-w-384 mx-auto bg-background mt-[3vh] pt-8 sm:pt-12 pb-8 px-4 sm:px-8 lg:px-12 relative"
      >
        <div className="border-b border-dashed border-neutral-800/60 pb-8 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[#f54900] text-sm uppercase tracking-widest font-semibold font-clash">
                MY INITIATIVES
              </span>
            </div>
           <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold uppercase tracking-tight mt-2 text-foreground leading-none">
                <AnimatedTitle text="Selected Works" />
              </h2>
          </div>
          <p className="text-neutral-400 max-w-md font-clash text-sm sm:text-base text-left lg:text-right leading-relaxed">
            Scroll down to explore interactive previews of full-stack projects, design systems, and web apps.
          </p>
        </div>
      </motion.section>

      {/* GSAP Pin Section */}
      <div className="w-[97%] max-w-384 mx-auto bg-background">
        <div ref={scrollSectionRef} className="w-full relative h-screen overflow-hidden flex items-center bg-background">

          {/* Loading State */}
          {loading && (
            <div className="w-full h-full flex items-center justify-center">
              <ProjectSkeleton />
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-red-400 text-sm font-bold uppercase tracking-widest mb-2">Failed to load projects</p>
                <p className="text-neutral-500 text-xs">{error}</p>
              </div>
            </div>
          )}

          {/* Slide track — GSAP tweens xPercent on this */}
          {!loading && !error && (
            <div ref={trackRef} className="flex flex-row flex-nowrap h-full w-full">
              {projects.map((project, i) => (
                <section
                  key={project.id ?? i}
                  className="project-slide w-full h-screen flex flex-col justify-center items-center px-6 sm:px-16 md:px-24 lg:px-36 relative shrink-0 bg-background overflow-hidden"
                >
                  {/* Project Image Frame (Super Viewer size) */}
                  <motion.div
                    custom={1}
                    variants={revealVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative w-full max-w-7xl h-[55vh] sm:h-[60vh] md:h-[68vh] overflow-hidden shadow-2xl bg-neutral-950 flex items-center justify-center border border-neutral-800"
                  >
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center overflow-hidden relative">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="project-img max-w-[95%] max-h-[92%] object-contain select-none pointer-events-none"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
                    </a>

                    {/* Mixed-Blend Mode Serial Number */}
                    <div
                      className="absolute bottom-4 left-6 sm:bottom-6 sm:left-10 text-[6rem] sm:text-[10rem] md:text-[14rem] font-black leading-none pointer-events-none select-none text-white tracking-tighter"
                      style={{ mixBlendMode: 'difference', zIndex: 10 }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </motion.div>

                  {/* Description Panel Row */}
                  <motion.div
                    custom={2}
                    variants={revealVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="w-full max-w-7xl mt-5 sm:mt-6 flex flex-col md:flex-row justify-between items-start gap-6 border-t border-neutral-800/80 pt-5"
                  >
                    {/* LEFT — Project name, description, Visit button */}
                    <div className="flex flex-col items-start gap-3.5 md:max-w-[55%]">
                      <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-foreground leading-none text-left">
                          {project.name}
                        </h2>
                        <p className="mt-1.5 text-xs sm:text-sm text-neutral-400 leading-relaxed font-clash text-left max-w-xl">
                          {project.description}
                        </p>
                      </div>
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        <CreepyButton coverClassName="text-xs uppercase text-[#ffffe3] bg-[#f54900] px-6 py-2.5">
                          <span>Visit Website</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </CreepyButton>
                      </a>
                    </div>

                    {/* RIGHT — Category, tags, year */}
                    <div className="flex flex-col items-end w-full md:w-auto gap-4 border-t md:border-t-0 md:border-l border-neutral-800/80 pt-4 md:pt-0 md:pl-6 md:min-w-[38%] text-right">
                      {/* Category */}
                      <div className="text-right w-full">
                        <span className="text-[9px] text-neutral-500 uppercase tracking-widest block font-clash font-bold">
                          Service / Category
                        </span>
                        <span className="text-xs font-bold uppercase text-primary mt-0.5 block">
                          {project.category}
                        </span>
                      </div>

                      {/* Tech tags */}
                      <div className="text-right w-full flex flex-col items-end">
                        <span className="text-[9px] text-neutral-500 font-clash font-bold uppercase tracking-widest block mb-1.5">
                          Technologies Used
                        </span>
                        <div className="flex flex-wrap justify-end gap-1.5 max-w-full">
                          {project.tags.map((tag, j) => {
                            const icon = getTechIcon(tag);
                            return (
                              <span
                                key={j}
                                className="text-[9px] bg-neutral-900 border border-neutral-800 text-neutral-300 px-2 py-0.5 uppercase font-clash font-bold flex items-center tracking-widest gap-1"
                              >
                                {icon && <img src={icon} alt={tag} className="w-3 h-3 object-contain" />}
                                <span>{tag}</span>
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Year */}
                      <div className="text-right w-full">
                        <span className="text-[9px] text-neutral-500 uppercase tracking-widest block font-clash font-bold">Year</span>
                        <span className="text-xs text-neutral-300 mt-0.5 block font-clash font-bold">
                          {project.year || '2026'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="min-h-[40vh] w-[97%] max-w-384 mx-auto flex flex-col justify-center items-center text-center px-4 py-20 border-t border-neutral-900 bg-background">
        <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-foreground mb-4">
          Want to build something together?
        </h3>
        <a href="/contact">
          <CreepyButton coverClassName="text-xs uppercase tracking-wider text-white bg-primary border border-white px-8 py-3.5 hover:bg-white hover:text-black transition-colors font-semibold">
            Get in touch
          </CreepyButton>
        </a>
      </section>

    </div>
  );
};

export default ProjectsPage;
