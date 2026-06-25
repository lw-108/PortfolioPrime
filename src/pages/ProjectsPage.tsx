import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../lib/projects-data';
import { techStackItems } from '../lib/tech-data';
import { CreepyButton } from '../components/ui/creepy-button';
import { AnimatedTitle } from '../components/ui/AnimatedTitle';
import { ArrowUpRight, RadioTower } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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
          scrub: 1,
          snap: {
            snapTo: 1 / (pinSections.length - 1),
            inertia: false,
            delay: 0.0,
            duration: 0.3
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
      <section className="w-[97%] max-w-384 mx-auto bg-background pt-10 pb-8 px-4 sm:px-8 lg:px-12 relative">
        <div className="border-b border-dashed border-neutral-800/60 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[#f54900] text-sm uppercase tracking-widest font-semibold font-clash">
                MY INITIATIVES
              </span>
              <RadioTower className="w-8 h-8 pb-2 text-[#f54900] animate-pulse" />
            </div>
            <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold uppercase tracking-tight text-white leading-none font-clash">
              <AnimatedTitle text="Selected Works /" />
            </h2>
          </div>
          <p className="text-neutral-400 max-w-md font-clash text-sm sm:text-base text-left md:text-right leading-relaxed">
            Scroll down to explore interactive previews of full-stack projects, design systems, and web apps.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 text-neutral-500 mt-12 animate-bounce">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll Down to view</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* GSAP Pin Section */}
      <div ref={scrollSectionRef} className="w-[97%] max-w-384 mx-auto relative h-screen overflow-hidden flex items-center bg-background">
        <div className="flex h-full" style={{ width: `${projectsData.length * 100}%` }}>
          {projectsData.map((project, i) => (
            <section
              key={i}
              className="project-slide w-full h-full flex flex-col justify-center items-center px-4 sm:px-12 md:px-20 lg:px-32 relative shrink-0 py-8 bg-background"
            >
              {/* Centered Flex Container Showing Full Image (object-contain) - Border/Radius Removed */}
              <div className="relative w-full max-w-6xl h-[50vh] sm:h-[55vh] md:h-[65vh] overflow-hidden shadow-2xl group bg-neutral-950 flex items-center justify-center">
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
                  {`0${i + 1}`}
                </div>
              </div>

              {/* Description Panel Row */}
              <div className="w-full max-w-6xl mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left border-t border-neutral-900 pt-6">

                {/* Left side: Project Name */}
                <div className="md:col-span-2 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white leading-none">
                      {project.name}
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-lg  leading-relaxed font-clash">
                      {project.description}
                    </p>
                  </div>

                  {/* Launch button */}
                  <div className="mt-6 flex gap-4">
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      <CreepyButton coverClassName="text-sm uppercase text-[#fffe3] bg-[#f54900]">
                        <span>Visit</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </CreepyButton>
                    </a>
                  </div>
                </div>

                {/* Right side: Other Details (Meta & Tags) */}
                <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-neutral-900 pt-4 md:pt-0 md:pl-6">
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest block font-clash font-bold">Service / Category</span>
                    <span className="text-sm font-bold uppercase text-[#f54900] mt-1 block">
                      {project.category}
                    </span>
                  </div>

                  <div className="mt-4">
                    <span className="text-[10px] text-neutral-500 font-clash font-bold uppercase tracking-widest block mb-2">Technologies Used</span>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, j) => {
                        const icon = getTechIcon(tag);
                        return (
                          <span
                            key={j}
                            className="text-[10px] bg-neutral-900 text-[#fffe3] border border-neutral-850 px-2.5 py-1 rounded-none uppercase font-clash font-bold flex items-center tracking-widest gap-1.5"
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

              </div>

            </section>
          ))}
        </div>
      </div>

      {/* Bottom section spacing / footer transition */}
      <section className="min-h-[40vh] w-[97%] max-w-384 mx-auto flex flex-col justify-center items-center text-center px-4 py-20 border-t border-neutral-900 bg-background">
        <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mb-4">
          Want to build something together?
        </h3>
        <a href="/#/contact">
          <CreepyButton coverClassName="text-xs uppercase tracking-wider text-white bg-transparent border border-white px-8 py-3.5 hover:bg-white hover:text-black transition-colors font-semibold">
            Get in touch
          </CreepyButton>
        </a>
      </section>

    </div>
  );
};

export default ProjectsPage;
