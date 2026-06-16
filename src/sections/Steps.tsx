import React, { useRef } from 'react';
import Ribbon from '../components/Ribbon';

// Types
interface MediaImage {
  src: string;
  alt: string;
}

interface Step {
  id: string;
  index: string;
  title: string;
  subtitle?: string;
  color?: string;
  body: string[];
  cta?: { label: string; href: string };
  media?: { back?: MediaImage };
  svgMarkup: React.ReactNode;
}

interface StepperData {
  subtitle?: string;
  title: string;
  steps: Step[];
}

// Data with custom SVG markups for animations
const onboardingData: StepperData = {
  subtitle: "How I Work",
  title: "Build. Ship. Iterate.",
  steps: [
    {
      id: "step-1",
      index: "01",
      title: "We start with clarity",
      subtitle: "Plan",
      body: [
        "A clear brief. Defined goals. Realistic timeline. I listen first, then map out the path forward.",
        "We'll identify the core problem, define success metrics, and remove unnecessary complexity before it ever reaches design or code.",
        "This phase ensures there are no surprises later — just a shared understanding of what we're building and why it matters."
      ],
      cta: { label: "Start a project", href: "/contact" },
      media: {
        back: {
          src: "/steps/plan.png",
          alt: "Project roadmap"
        }
      },
      svgMarkup: (
        <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="none" viewBox="0 0 256 256" className="w-8 h-8 sm:w-10 sm:h-10 text-[#f54900] animate-spin-slow">
          <path d="M 152 70.059 L 201.539 20.519 L 235.48 54.461 L 185.941 104 L 256 104 L 256 152 L 185.941 152 L 235.48 201.539 L 201.539 235.48 L 152 185.941 L 152 256 L 104 256 L 104 185.941 L 54.46 235.48 L 20.52 201.539 L 70.059 152 L 0 152 L 0 104 L 70.059 104 L 20.519 54.46 L 54.461 20.52 L 104 70.059 L 104 0 L 152 0 Z" fill="currentColor"></path>
        </svg>
      )
    },
    {
      id: "step-2",
      index: "02",
      title: "Design that works",
      subtitle: "Design",
      body: [
        "Clean interfaces. Intuitive flows. Design decisions driven by real user needs — not trends.",
        "I translate ideas into wireframes and interactive prototypes so you can see the product take shape early.",
        "Feedback loops are fast and collaborative, ensuring the final design feels natural, purposeful, and easy to use."
      ],
      cta: { label: "See designs", href: "/portfolio" },
      media: {
        back: {
          src: "/steps/design.png",
          alt: "Interactive prototypes"
        }
      },
      svgMarkup: (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-10 sm:h-10 text-[#f54900] animate-spin-slow">
          <path d="M100 0C103.395 53.7596 146.24 96.6052 200 100C146.24 103.395 103.395 146.24 100 200C96.6052 146.24 53.7596 103.395 0 100C53.7596 96.6052 96.6052 53.7596 100 0Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: "step-3",
      index: "03",
      title: "Write. Test. Refine.",
      subtitle: "Code",
      body: [
        "Clean, maintainable code built with modern tools and best practices.",
        "I work with React, Next.js, and Tailwind to create fast, scalable applications that perform well across devices.",
        "Every feature is tested, refined, and optimized — not just to work, but to last."
      ],
      cta: { label: "Tech stack", href: "/skills" },
      media: {
        back: {
          src: "/steps/code.png",
          alt: "Code testing"
        }
      },
      svgMarkup: (
        <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="none" viewBox="0 0 256 256" className="w-8 h-8 sm:w-10 sm:h-10 text-[#f54900] animate-spin-slow">
          <path d="M 78 0 C 105.614 0 128 22.386 128 50 C 128 22.386 150.386 0 178 0 L 256 0 L 256 78 C 256 105.614 233.614 128 206 128 C 233.614 128 256 150.386 256 178 L 256 256 L 178 256 C 150.386 256 128 233.614 128 206 C 128 233.614 105.614 256 78 256 L 0 256 L 0 178 C 0 150.386 22.386 128 50 128 C 22.386 128 0 105.614 0 78 L 0 0 Z" fill="currentColor"></path>
        </svg>
      )
    },
    {
      id: "step-4",
      index: "04",
      title: "Launch. Support. Grow.",
      subtitle: "Launch",
      body: [
        "Deployment is smooth, secure, and production-ready from day one.",
        "Your project goes live on Vercel or AWS with performance monitoring, analytics, and best-practice configurations.",
        "Post-launch, I stay involved — supporting improvements, fixing issues, and helping your product grow."
      ],
      cta: { label: "Launch now", href: "/contact" },
      media: {
        back: {
          src: "/steps/launch.png",
          alt: "Analytics and monitoring"
        }
      },
      svgMarkup: (
        <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="none" viewBox="0 0 256 256" className="w-8 h-8 sm:w-10 sm:h-10 text-[#f54900] animate-spin-slow">
          <path d="M 228 0 C 172.772 0 128 44.772 128 100 L 128 0 L 0 0 L 0 28 C 0 83.228 44.772 128 100 128 L 0 128 L 0 256 L 28 256 C 83.228 256 128 211.228 128 156 L 128 256 L 256 256 L 256 228 C 256 172.772 211.228 128 156 128 L 256 128 L 256 0 Z" fill="currentColor"></path>
        </svg>
      )
    }
  ]
};

const HEADER_HEIGHT_REM = 3.5;

const Steps: React.FC = () => {
  const data = onboardingData;
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative w-full font-clash select-none ">
      <div className="max-w-384 mx-auto w-full border-x border-dashed border-neutral-800 bg-background pt-10 pb-6 px-4 sm:px-8 lg:pt-12 lg:pb-8">
        {/* Header */}
        <header className="stepper__header mb-8 sm:mb-12 border-b border-dashed border-neutral-800 pb-6 sm:pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-background ">
          <div>
            <span className="text-[#f54900] text-sm uppercase tracking-widest font-semibold bg-background">
              {data.subtitle}
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold uppercase tracking-tight mt-2 text-foreground bg-background leading-none">
              {data.title}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md font-clash text-sm sm:text-base bg-background">
            A structured, collaborative approach to delivering clean code, premium designs, and production-ready applications.
          </p>
        </header>

        {/* Steps Container */}
        <div className="stepper__steps relative">
          {data.steps.map((step, index) => (
            <div
              key={step.id}
              className="stepper__item group border border-neutral-200 dark:border-neutral-800"
              style={{
                top: `calc(var(--sticky-top-base) + ${index * HEADER_HEIGHT_REM}rem - ${index}px)`,
                zIndex: (index + 1) * 10
              }}
            >
              {/* Number Header Bar */}
              <div className="stepper__number-bar">
                <span className="stepper__number">{step.index}</span>
                <span className="stepper__subtitle-label">{step.subtitle}</span>
                <div className="ml-auto flex items-center justify-center">
                  {step.svgMarkup}
                </div>
              </div>

              {/* Content Grid */}
              <div className="stepper__content-grid">
                {/* Step Text */}
                <div className="stepper__step" id={step.id}>
                  <h3 className="text-xl sm:text-2xl lg:text-4xl font-medium tracking-tight text-foreground mb-4 sm:mb-6 flex items-center gap-4">
                    {step.title}
                  </h3>
                  <div className="stepper__step-body">
                    {step.body.map((p, idx) => (
                      <p key={idx} className="stepper__step-text text-muted-foreground font-clash text-base leading-relaxed mb-4">
                        {p}
                      </p>
                    ))}
                    {step.cta && (
                      <a
                        href={step.cta.href}
                        className="stepper__step-cta inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-[#f54900] text-white hover:bg-[#d43f00] text-[0.65rem] sm:text-xs font-semibold uppercase tracking-wider transition-colors duration-300 font-clash"
                      >
                        {step.cta.label}
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M7 7l10 10m0 0V7m0 10H7" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Step Media */}
                {step.media?.back && (
                  <figure className="stepper__media border-t lg:border-t-0 lg:border-l border-neutral-200 dark:border-neutral-800 relative overflow-hidden">
                    <img
                      className="stepper__media-image z-10 relative"
                      src={step.media.back.src}
                      alt={step.media.back.alt}
                      loading="eager"
                      decoding="sync"
                    />
                  </figure>
                )}
              </div>
            </div>
          ))}
          <div className="stepper__spacer w-full" />
        </div>

        {/* Ribbon nested at the bottom of the steps section */}
        <div className="w-full mt-10 overflow-hidden border-t border-dashed border-neutral-800 pt-8">
          <Ribbon />
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }

        .stepper__header {
          position: relative;
          background-color: var(--background);
        }

        .stepper__steps {
          --sticky-top-base: 1rem;
          display: flex;
          flex-direction: column;
          padding-bottom: 0;
        }

        .stepper__spacer {
          height: 35vh;
        }

        .stepper__item {
          margin-bottom: 35vh;
        }

        .stepper__item:last-child {
          margin-bottom: 0;
        }

        .stepper__item {
          position: sticky;
          display: flex;
          flex-direction: column;
          min-height: auto;
          background-color: var(--background);
          box-shadow: 0 -10px 40px -15px rgba(0, 0, 0, 0.08);
          transition: border-color 0.3s ease, transform 0.3s ease;
          border-radius: 0;
          overflow: hidden;

          background-image:
            linear-gradient(
              to bottom,
              rgba(255, 255, 227, 1) 0%,
              rgba(255, 255, 227, 1) 100%
            ),
            url('/dot.svg');
          background-repeat: no-repeat, repeat;
          background-size: 100% 100%, 32px 32px;
          background-blend-mode: normal, soft-light;
        }

        .dark .stepper__item {
          box-shadow: 0 -10px 40px -15px rgba(0, 0, 0, 0.4);
          background-image:
            linear-gradient(
              to bottom,
              rgba(16, 16, 14, 1) 0%,
              rgba(16, 16, 14, 1) 100%
            ),
            url('/dot.svg');
        }

        /* ── Number Header Bar ── */
        .stepper__number-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.65rem 2rem;
          height: ${HEADER_HEIGHT_REM}rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          background: rgba(255, 255, 227, 0.95);
          backdrop-filter: blur(8px);
        }

        .dark .stepper__number-bar {
          border-bottom-color: rgba(255, 255, 255, 0.1);
          background: rgba(16, 16, 14, 0.95);
        }

        .stepper__number {
          font-size: 1.75rem;
          font-weight: 700;
          color: #f54900;
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .stepper__subtitle-label {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--muted-foreground);
        }

        /* ── Content Grid (text + media) ── */
        .stepper__content-grid {
          display: grid;
          flex: 1;
        }

        @media (min-width: 1024px) {
          .stepper__steps {
            --sticky-top-base: 6rem; /* Safe clearance for sticky headers */
          }

          .stepper__item {
            height: 25.5rem; /* Strict fixed height for all cards on desktop */
          }

          .stepper__content-grid {
            grid-template-columns: 1fr 1fr;
            height: 22rem; /* 25.5rem total - 3.5rem number bar height */
          }

          .stepper__step,
          .stepper__media {
            height: 100%;
          }

          /* Alternating layout for even steps */
          .stepper__item:nth-child(even) .stepper__step {
            order: 2;
          }

          .stepper__item:nth-child(even) .stepper__media {
            order: 1;
            border-left: 0 !important;
            border-right: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
          }
        }

        .stepper__step {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
        }

        .stepper__media {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background-color: var(--background);
          min-height: 0;
        }

        .stepper__media-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          filter: grayscale(10%) contrast(95%);
          transition: all 0.5s ease;
        }

        .stepper__item:hover .stepper__media-image {
          transform: scale(1.02);
          filter: none;
        }

        @media (max-width: 1023px) {
          .stepper__steps {
            --sticky-top-base: 4rem;
            padding-bottom: 0;
          }
          .stepper__item {
            min-height: auto;
            margin-bottom: 30vh;
          }
          .stepper__item:last-child {
            margin-bottom: 0;
          }
          .stepper__number-bar {
            padding: 0.5rem 1.25rem;
            height: 3rem;
          }
          .stepper__number {
            font-size: 1.5rem;
          }
          .stepper__step {
            padding: 1.25rem;
          }
          .stepper__step h3 {
            margin-bottom: 0.75rem !important;
            font-size: 1.25rem !important;
            line-height: 1.25 !important;
          }
          .stepper__step-text {
            font-size: 0.8125rem !important;
            line-height: 1.5 !important;
            margin-bottom: 0.375rem !important;
          }
          .stepper__media {
            padding: 0.75rem;
            min-height: 180px;
            height: 180px;
          }
          .stepper__media-image {
            max-height: 140px;
          }
        }

        /* ── Extra-small devices (≤ 480px) ── */
        @media (max-width: 480px) {
          .stepper__steps {
            --sticky-top-base: 3.5rem;
          }
          .stepper__item {
            margin-bottom: 25vh;
          }
          .stepper__number-bar {
            padding: 0.4rem 0.75rem;
            height: 2.5rem;
            gap: 0.5rem;
          }
          .stepper__number {
            font-size: 1.25rem;
          }
          .stepper__subtitle-label {
            font-size: 0.625rem;
          }
          .stepper__step {
            padding: 1rem;
          }
          .stepper__step h3 {
            font-size: 1.1rem !important;
          }
          .stepper__step-text {
            font-size: 0.75rem !important;
            line-height: 1.45 !important;
            margin-bottom: 0.25rem !important;
          }
          .stepper__media {
            padding: 0.5rem;
            min-height: 150px;
            height: 150px;
          }
          .stepper__media-image {
            max-height: 120px;
          }
        }
      `}</style>
    </section>
  );
};

export default Steps;