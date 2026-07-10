import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../lib/projects-data';
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

export const ProjectsPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);

  // Helper to fetch SVG icon path for a given technology tag
  const getTechIcon = (tag: string) => {
    const normalizedTag = tag.toLowerCase().trim();
    const match = techStackItems.find(item => {
      const titleLower = item.title.toLowerCase().trim();
      if (titleLower === normalizedTag) return true;

      // Safe, specific overrides
      if (titleLower === 'tailwind css' && normalizedTag === 'tailwind') return true;
      if (titleLower === 'postgresql' && (normalizedTag === 'postgres' || normalizedTag === 'postgresql')) return true;

      return false;
    });
    return match ? match.image : null;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pinSections = gsap.utils.toArray('.project-slide');
      if (pinSections.length === 0) return;

      gsap.to(pinSections, {
        xPercent: -100 * (pinSections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: scrollSectionRef.current,
          pin: true,
          scrub: 0.3,
          snap: {
            snapTo: 1 / (pinSections.length - 1),
            inertia: false,
            delay: 0.02,
            duration: { min: 0.1, max: 0.3 },
            ease: 'power2.out'
          },
          start: 'top top',
          end: () => `+=${scrollSectionRef.current?.offsetWidth || 1000}`,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-transparent text-white font-clash selection:bg-[#f54900] selection:text-white overflow-x-hidden">

      {/* Top Welcome Title Section - Configured to match ContactPage header style */}
      <motion.section 
        custom={0}
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-[97%] max-w-384 mx-auto bg-background pt-10 pb-8 px-4 sm:px-8 lg:px-12 relative"
      >
        <div className="border-b border-dashed border-neutral-800/60 pb-8 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[#f54900] text-sm uppercase tracking-widest font-semibold font-clash">
                MY INITIATIVES
              </span>
            </div>
           <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold uppercase tracking-tight mt-2 text-foreground leading-none">
                <AnimatedTitle text="Selected Works /" />
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
          <div className="flex flex-row flex-nowrap h-full w-full">
          {projectsData.map((project, i) => (
            <section
              key={i}
              className="project-slide w-full h-full flex flex-col justify-center items-center px-4 sm:px-12 md:px-20 lg:px-32 relative shrink-0 py-8 bg-background"
            >
              {/* Centered Flex Container Showing Full Image (object-contain) - Border/Radius Removed */}
              <motion.div 
                custom={1}
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative w-full max-w-6xl h-[50vh] sm:h-[55vh] md:h-[65vh] overflow-hidden shadow-2xl group bg-neutral-950 flex items-center justify-center"
              >
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center overflow-hidden relative">
                  {/* Full image display with object-contain (no hover scale up) */}
                  <img
                    src={project.image}
                    alt={project.name}
                    className="project-img max-w-full max-h-full object-contain"
                  />
                  {/* Dark overlay shield */}
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-300 pointer-events-none" />
                </a>

                {/* Mixed-Blend Mode Serial Number */}
                <div
                  className="absolute bottom-2 left-4 sm:bottom-4 sm:left-8 text-[6rem] sm:text-[9rem] md:text-[12rem] font-black leading-none pointer-events-none select-none text-white tracking-tighter"
                  style={{
                    mixBlendMode: 'difference',
                    zIndex: 10
                  }}
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
                className="w-full max-w-6xl mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center border-t border-neutral-900 pt-6"
              >

                {/* Left side: Project Name */}
                <div className="md:col-span-2 flex flex-col items-center text-center justify-between">
                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-foreground leading-none">
                      {project.name}
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-foreground max-w-lg mx-auto leading-relaxed font-clash text-left">
                      {project.description}
                    </p>
                  </div>

                  {/* Launch button */}
                  <div className="mt-6 flex justify-center gap-4">
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      <CreepyButton coverClassName="text-sm uppercase text-[#fffe3] bg-[#f54900]">
                        <span>Visit</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </CreepyButton>
                    </a>
                  </div>
                </div>

                {/* Right side: Other Details (Meta & Tags) */}
                <div className="flex flex-col items-center text-center justify-between border-t md:border-t-0 md:border-l border-neutral-900 pt-4 md:pt-0 md:pl-6">
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest block font-clash font-bold">Service / Category</span>
                    <span className="text-sm font-bold uppercase text-[#f54900] mt-1 block">
                      {project.category}
                    </span>
                  </div>

                  <div className="mt-4">
                    <span className="text-[10px] text-neutral-500 font-clash font-bold uppercase tracking-widest block mb-2">Technologies Used</span>
                    <div className="flex flex-wrap justify-center gap-2">
                      {project.tags.map((tag, j) => {
                        const icon = getTechIcon(tag);
                        return (
                          <span
                            key={j}
                            className="text-[10px] bg-primary text-[#ffffe3] border border-primary px-2.5 py-1 rounded-none uppercase font-clash font-bold flex items-center tracking-widest gap-1.5"
                          >
                            {icon && <img src={icon} alt={tag} className="w-3.5 h-3.5 object-contain" />}
                            <span>{tag}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest block font-clash font-bold">Year</span>
                    <span className="text-xs text-[#f54900] mt-1 block font-clash font-bold">
                      {project.year || '2026'}
                    </span>
                  </div>
                </div>

              </motion.div>

            </section>
          ))}
          </div>
        </div>
      </div>

      {/* Bottom section spacing / footer transition */}
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
