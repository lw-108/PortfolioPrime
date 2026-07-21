import React, { useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedTitle } from '../components/ui/AnimatedTitle';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Helper Components for SVGs
const SVGStar = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="none" viewBox="0 0 256 256" className={className}>
    <path d="M 152 70.059 L 201.539 20.519 L 235.48 54.461 L 185.941 104 L 256 104 L 256 152 L 185.941 152 L 235.48 201.539 L 201.539 235.48 L 152 185.941 L 152 256 L 104 256 L 104 185.941 L 54.46 235.48 L 20.52 201.539 L 70.059 152 L 0 152 L 0 104 L 70.059 104 L 20.519 54.46 L 54.461 20.52 L 104 70.059 L 104 0 L 152 0 Z" fill="currentColor"></path>
  </svg>
);

const SVGFourStar = ({ className = "" }) => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M100 0C103.395 53.7596 146.24 96.6052 200 100C146.24 103.395 103.395 146.24 100 200C96.6052 146.24 53.7596 103.395 0 100C53.7596 96.6052 96.6052 53.7596 100 0Z" fill="currentColor" />
  </svg>
);

const SVGClover = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="none" viewBox="0 0 256 256" className={className}>
    <path d="M 78 0 C 105.614 0 128 22.386 128 50 C 128 22.386 150.386 0 178 0 L 256 0 L 256 78 C 256 105.614 233.614 128 206 128 C 233.614 128 256 150.386 256 178 L 256 256 L 178 256 C 150.386 256 128 233.614 128 206 C 128 233.614 105.614 256 78 256 L 0 256 L 0 178 C 0 150.386 22.386 128 50 128 C 22.386 128 0 105.614 0 78 L 0 0 Z" fill="currentColor"></path>
  </svg>
);

const SVGPinwheel = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="none" viewBox="0 0 256 256" className={className}>
    <path d="M 228 0 C 172.772 0 128 44.772 128 100 L 128 0 L 0 0 L 0 28 C 0 83.228 44.772 128 100 128 L 0 128 L 0 256 L 28 256 C 83.228 256 128 211.228 128 156 L 128 256 L 256 256 L 256 228 C 256 172.772 211.228 128 156 128 L 256 128 L 256 0 Z" fill="currentColor"></path>
  </svg>
);

// Services / Stacking Section Data
interface ServiceItem {
  id: string;
  label: string;
}

interface ServiceSection {
  id: string;
  index: string;
  subtitle: string;
  title: string;
  description: string;
  items: ServiceItem[];
  cta?: { label: string; href: string };
  svgIcon: React.ReactNode;
}

const servicesData: ServiceSection[] = [
  {
    id: "service-1",
    index: "01",
    subtitle: "Full-Stack Architecture",
    title: "Full-Stack Development",
    description: "From frontend interactions to backend APIs, I build complete web solutions. I work with modern stacks to deliver apps that are scalable, maintainable, and ready for real-world users.",
    items: [
      { id: "01", label: "React, Node.js, Express.js" },
      { id: "02", label: "REST APIs, Firebase, Docker" },
      { id: "03", label: "Git, GitHub, Postman" }
    ],
    cta: { label: "Start a project", href: "/contact" },
    svgIcon: <SVGStar className="w-6 h-6 sm:w-8 sm:h-8 text-[#f54900]" />
  },
  {
    id: "service-2",
    index: "02",
    subtitle: "Frontend & Interface Design",
    title: "UI/UX & Frontend",
    description: "Good design feels effortless. I design and develop responsive, intuitive interfaces that work smoothly across devices, with a strong focus on clarity, accessibility, and performance.",
    items: [
      { id: "01", label: "NextJs, TailwindCSS, GSAP" },
      { id: "02", label: "Figma → Pixel-perfect code" },
      { id: "03", label: "HTML, CSS, JavaScript" }
    ],
    cta: { label: "See designs", href: "/projects" },
    svgIcon: <SVGFourStar className="w-7 h-7 sm:w-9 sm:h-9 text-[#f54900]" />
  },
  {
    id: "service-3",
    index: "03",
    subtitle: "Systems & Algorithms",
    title: "Optimization",
    description: "I focus on building systems that stay reliable as things scale. From handling data efficiently to designing clean architecture, I apply core computer science principles to keep applications fast, stable, and future-ready.",
    items: [
      { id: "01", label: "Data Structures & Algorithms" },
      { id: "02", label: "DBMS, OOP, OS Fundamentals" },
      { id: "03", label: "Scalable systems & data pipelines" }
    ],
    cta: { label: "Tech stack", href: "/#skills" },
    svgIcon: <SVGClover className="w-6 h-6 sm:w-8 sm:h-8 text-[#f54900]" />
  },
  {
    id: "service-4",
    index: "04",
    subtitle: "Cloud & Deployment",
    title: "Deployment & Growth",
    description: "Deployment is smooth, secure, and production-ready from day one. I set up automated pipelines, cloud infrastructure on AWS or Vercel, and continuous performance monitoring.",
    items: [
      { id: "01", label: "Vercel, AWS Cloud, Docker" },
      { id: "02", label: "Performance & SEO Audits" },
      { id: "03", label: "CI/CD & System Maintenance" }
    ],
    cta: { label: "Launch now", href: "/contact" },
    svgIcon: <SVGPinwheel className="w-6 h-6 sm:w-8 sm:h-8 text-[#f54900]" />
  }
];

function Ribbon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        marquee1Ref.current,
        { xPercent: 0 },
        {
          xPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        marquee2Ref.current,
        { xPercent: -6 },
        {
          xPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        }
      );
    }, containerRef.current || undefined);

    return () => ctx.revert();
  }, []);

  const svgClass = "mx-8 sm:mx-12 h-6 w-6 sm:h-8 sm:w-8 shrink-0";

  const sequence1 = [
    { text: "Developer", svg: <SVGStar className={svgClass} /> },
    { text: "Creator", svg: <SVGFourStar className={svgClass} /> },
    { text: "Designer", svg: <SVGClover className={svgClass} /> },
    { text: "full stack dev", svg: <SVGPinwheel className={svgClass} /> },
  ];
  const repeatedItems1 = Array(36).fill(sequence1).flat();

  const sequence2 = [
    { text: "Developer", svg: <SVGStar className={svgClass} /> },
    { text: "Creator", svg: <SVGFourStar className={svgClass} /> },
    { text: "Designer", svg: <SVGClover className={svgClass} /> },
    { text: "full stack dev", svg: <SVGPinwheel className={svgClass} /> },
  ];
  const repeatedItems2 = Array(36).fill(sequence2).flat();

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[180px] sm:h-[240px] overflow-hidden flex items-center justify-center select-none bg-background border-t border-dashed border-border"
    >
      {/* Ribbon 1 */}
      <div className="absolute w-[150%] h-14 sm:h-20 bg-primary text-black flex items-center overflow-hidden rotate-[-10deg] sm:rotate-[-4deg] z-20 origin-center">
        <div
          ref={marquee1Ref}
          className="flex whitespace-nowrap items-center font-clash text-lg sm:text-2xl md:text-3xl font-bold uppercase tracking-wider"
        >
          <div className="flex items-center shrink-0">
            {repeatedItems1.map((item, i) => (
              <div key={`r1-a-${i}`} className="flex items-center">
                <span>{item.text}</span>
                {item.svg}
              </div>
            ))}
          </div>
          <div className="flex items-center shrink-0" aria-hidden="true">
            {repeatedItems1.map((item, i) => (
              <div key={`r1-b-${i}`} className="flex items-center">
                <span>{item.text}</span>
                {item.svg}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ribbon 2 */}
      <div className="absolute w-[150%] h-14 sm:h-20 bg-primary text-black flex items-center overflow-hidden rotate-10 sm:rotate-[4deg] z-10 origin-center">
        <div
          ref={marquee2Ref}
          className="flex whitespace-nowrap items-center font-clash text-lg sm:text-2xl md:text-3xl font-bold uppercase tracking-wider"
        >
          <div className="flex items-center shrink-0">
            {repeatedItems2.map((item, i) => (
              <div key={`r2-a-${i}`} className="flex items-center">
                <span>{item.text}</span>
                {item.svg}
              </div>
            ))}
          </div>
          <div className="flex items-center shrink-0" aria-hidden="true">
            {repeatedItems2.map((item, i) => (
              <div key={`r2-b-${i}`} className="flex items-center">
                <span>{item.text}</span>
                {item.svg}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const StepRibbon: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stackContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Smooth GSAP ScrollTrigger Pinning — Every card pins at exact baseNavOffset so each card slides over and strictly hides the card below it
  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length || !stackContainerRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const baseNavOffset = isMobile ? 56 : 72; // Nav clearance

      cards.forEach((card) => {
        // Pin every card at baseNavOffset so each card slides over and strictly hides the card below it
        ScrollTrigger.create({
          trigger: card,
          start: () => `top top+=${baseNavOffset}px`,
          endTrigger: stackContainerRef.current,
          end: () => `bottom bottom-=${isMobile ? 80 : 120}px`,
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      });

      ScrollTrigger.refresh();
    }, stackContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full font-clash select-none bg-transparent text-foreground">
      {/* 97% width inner container matching Home.tsx and other sections */}
      <div className="w-[97%] max-w-384 mx-auto bg-background px-4 sm:px-8 lg:px-16 py-12 sm:py-16 border-t border-dashed border-border">
        
        {/* Section Header matching other sections */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-dashed border-border pb-6 sm:pb-8 bg-background">
          <div>
            <span className="text-[#f54900] text-sm uppercase tracking-widest font-semibold font-clash flex items-center gap-1.5">
              How I Work
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold uppercase tracking-tight mt-2 text-foreground leading-none font-clash">
              <AnimatedTitle text="WHAT I DO /" />
            </h2>
          </div>

          <p className="text-muted-foreground max-w-md font-clash text-sm sm:text-base leading-relaxed">
            A structured, collaborative approach to delivering clean code, premium designs, and production-ready applications.
          </p>
        </header>

        {/* Full-Width GSAP Stacking Cards Container */}
        <div ref={stackContainerRef} className="stepper__stack-container relative w-full flex flex-col space-y-[35vh] sm:space-y-[45vh] pt-4 pb-[15vh]">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => { cardRefs.current[index] = el; }}
              className="stepper__card w-full bg-background text-foreground border-t border-neutral-300 dark:border-neutral-800 rounded-none overflow-hidden font-clash"
              style={{
                zIndex: (index + 1) * 10,
              }}
            >
              {/* Card Title & Number Header Bar */}
              <div className="stepper__card-header py-3.5 sm:py-5 px-4 sm:px-8 flex items-center justify-between bg-background font-clash rounded-none border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-3 sm:gap-6 flex-1 min-w-0">
                  <span className="text-lg sm:text-2xl font-extrabold text-[#f54900] font-clash shrink-0">
                    ({service.index})
                  </span>
                  <h3 className="text-base sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-tight text-foreground font-clash truncate">
                    {service.title}
                  </h3>
                </div>
                <div className="flex items-center shrink-0 ml-2">
                  {service.svgIcon}
                </div>
              </div>

              {/* Card Body Content */}
              <div className="p-4 sm:p-8 lg:p-12 flex flex-col lg:flex-row gap-6 lg:gap-12 bg-background font-clash rounded-none">
                <div className="flex-1 max-w-4xl">
                  {/* Paragraph Description */}
                  <p className="text-xs sm:text-base lg:text-lg text-muted-foreground font-clash leading-relaxed mb-6 max-w-2xl">
                    {service.description}
                  </p>

                  {/* Sub-items List with Dividers */}
                  <div className="flex flex-col border-b border-neutral-200 dark:border-neutral-800 mb-6">
                    {service.items.map((item) => (
                      <div
                        key={item.id}
                        className="border-t border-neutral-200 dark:border-neutral-800 py-3 sm:py-4 flex items-center gap-3 sm:gap-6 group hover:bg-neutral-100 dark:hover:bg-neutral-900/50 px-2 transition-colors duration-200 font-clash rounded-none"
                      >
                        <span className="font-mono text-xs text-[#f54900] font-bold shrink-0">
                          {item.id}
                        </span>
                        <span className="font-clash text-sm sm:text-lg lg:text-xl font-semibold text-foreground group-hover:text-[#f54900] transition-colors">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button with sharp 90-degree rounded-none edges */}
                  {service.cta && (
                    <RouterLink
                      to={service.cta.href}
                      className="inline-flex items-center gap-2 px-5 py-3 bg-[#f54900] text-white hover:bg-[#d43f00] text-xs font-semibold uppercase tracking-wider transition-colors duration-300 font-clash rounded-none"
                    >
                      {service.cta.label}
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M7 7l10 10m0 0V7m0 10H7" />
                      </svg>
                    </RouterLink>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Animated Ribbon Marquee Banner at bottom */}
        <div className="w-full overflow-hidden bg-background">
          <Ribbon />
        </div>

      </div>

      <style>{`
        .stepper__stack-container {
          overflow: visible;
        }

        .stepper__card {
          box-shadow: none;
          border-radius: 0 !important;
        }

        .dark .stepper__card {
          box-shadow: none;
          border-radius: 0 !important;
        }
      `}</style>
    </section>
  );
};

export default StepRibbon;
