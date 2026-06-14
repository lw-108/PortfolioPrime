import React, { useRef } from 'react';

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
}

interface StepperData {
  subtitle?: string;
  title: string;
  steps: Step[];
}

// Data
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
          src: "https://i.ibb.co/9HxXVqMy/output-onlinepngtools.png",
          alt: "Project roadmap"
        }
      }
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
          src: "https://i.ibb.co/b5pNdvFG/dash.png",
          alt: "Interactive prototypes"
        }
      }
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
          src: "https://i.ibb.co/S7M9RfC5/codes-modified.png",
          alt: "Code testing"
        }
      }
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
          src: "https://i.ibb.co/hRcY0xqp/reshot-illustration-startup-entrepreneur-T8-A94-HSCXY-modified.png",
          alt: "Analytics and monitoring"
        }
      }
    }
  ]
};

const HEADER_HEIGHT_REM = 3.5;

const Steps: React.FC = () => {
  const data = onboardingData;
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative w-full font-clash select-none ">
      <div className="max-w-384 mx-auto w-full border-x border-dashed border-neutral-800 bg-background py-16 px-8 lg:p-12">
        {/* Header */}
        <header className="stepper__header mb-12 border-b border-dashed border-neutral-800 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-background ">
          <div>
            <span className="text-[#f54900] text-sm uppercase tracking-widest font-semibold bg-background">
              {data.subtitle}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mt-2 text-foreground bg-background">
              {data.title}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md font-clash text-base bg-background">
            A structured, collaborative approach to delivering clean code, premium designs, and production-ready applications.
          </p>
        </header>

        {/* Steps */}
        <div className="stepper__steps">
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
              </div>

              {/* Content Grid */}
              <div className="stepper__content-grid">
                {/* Step Text */}
                <div className="stepper__step" id={step.id}>
                  <h3 className="text-3xl lg:text-4xl font-medium tracking-tight text-foreground mb-6">
                    {step.title}
                  </h3>
                  <div className="stepper__step-body">
                    {step.body.map((p, idx) => (
                      <p key={idx} className="stepper__step-text text-muted-foreground font-sans text-base leading-relaxed mb-4">
                        {p}
                      </p>
                    ))}
                    {step.cta && (
                      <a
                        href={step.cta.href}
                        className="stepper__step-cta inline-flex items-center gap-2 px-6 py-3 bg-[#f54900] text-white hover:bg-[#d43f00] text-xs font-semibold uppercase tracking-wider transition-colors duration-300 font-clash"
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
                  <figure className="stepper__media border-t lg:border-t-0 lg:border-l border-neutral-200 dark:border-neutral-800">
                    <img
                      className="stepper__media-image"
                      src={step.media.back.src}
                      alt={step.media.back.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                )}
              </div>
            </div>
          ))}
          <div className="stepper__spacer w-full" />
        </div>
      </div>

      <style>{`
        .stepper__header {
          position: sticky;
          top: 0;
          z-index: 50;
          background-color: var(--background);
          background-image: url('/stripe.svg');
          background-repeat: repeat;
          background-size: 38px;
          padding-top: 2rem;
          margin-top: -2rem;
        }

        .stepper__steps {
          --sticky-top-base: 12rem;
          display: flex;
          flex-direction: column;
          padding-bottom: 0;
        }

        .stepper__spacer {
          height: 60vh;
        }

        .stepper__item {
          margin-bottom: 45vh;
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
          transition: border-color 0.3s ease;
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
        }

        .dark .stepper__number-bar {
          border-bottom-color: rgba(255, 255, 255, 0.1);
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
          .stepper__content-grid {
            grid-template-columns: 1.2fr 0.8fr;
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
        }

        .stepper__media {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background-color: rgba(0, 0, 0, 0.02);
          min-height: 240px;
        }

        .dark .stepper__media {
          background-color: rgba(255, 255, 255, 0.02);
        }

        .stepper__media-image {
          max-width: 100%;
          max-height: 220px;
          object-fit: contain;
          filter: grayscale(10%) contrast(95%);
          transition: all 0.5s ease;
        }

        .stepper__item:hover .stepper__media-image {
          transform: scale(1.02);
          filter: none;
        }

        @media (max-width: 1023px) {
          .stepper__header {
            padding-top: 1rem;
            margin-top: -1rem;
          }
          .stepper__steps {
            --sticky-top-base: 15.5rem;
            padding-bottom: 0;
          }
          .stepper__spacer {
            height: 40vh;
          }
          .stepper__item {
            min-height: auto;
            margin-bottom: 30vh;
          }
          .stepper__item:last-child {
            margin-bottom: 0;
          }
          .stepper__step {
            padding: 1.5rem;
          }
          .stepper__step h3 {
            margin-bottom: 0.75rem !important;
            font-size: 1.5rem !important;
            line-height: 1.25 !important;
          }
          .stepper__step-text {
            font-size: 0.875rem !important;
            line-height: 1.5 !important;
            margin-bottom: 0.5rem !important;
          }
          .stepper__media {
            padding: 1rem;
            min-height: 180px;
          }
          .stepper__media-image {
            max-height: 140px;
          }
        }
      `}</style>
    </section>
  );
};

export default Steps;