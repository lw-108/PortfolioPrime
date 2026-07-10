import React from 'react';
import { AnimatedTitle } from '../components/ui/AnimatedTitle';

// Types
interface FeatureCardProps {
  classes?: string;
  children: React.ReactNode;
  bgBack?: React.ReactNode;
  bgFront?: React.ReactNode;
}

interface ServiceItem {
  title: string;
  description: string;
  features: string[];
  icon: string;
  iconAlt: string;
}

// Feature Card Component
const FeatureCard: React.FC<FeatureCardProps> = ({ classes = '', children, bgBack, bgFront }) => {
  return (
    <div className={`bento-card ${classes}`}>
      {children}
      {bgBack && <div className="img-br">{bgBack}</div>}
      {bgFront && <div className="img-br">{bgFront}</div>}
    </div>
  );
};

// Main Services Bento Grid Component
const ServicesBento: React.FC = () => {
  const icons = {
    react: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    next: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
    astro: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/astro/astro-original.svg',
    flutter: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
    android: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg',
    node: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    postgres: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/postgresql.svg',
    figma: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
    tailwind: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  };

  const services: ServiceItem[] = [
    {
      title: 'Web Development',
      description: 'High-performance websites built with modern frameworks and SEO-first architecture.',
      features: ['Core Web Vitals optimized', 'SEO & accessibility baked in', 'Static & hybrid builds'],
      icon: icons.react,
      iconAlt: 'React',
    },
    {
      title: 'Mobile Apps',
      description: 'Production-ready mobile apps designed for performance, scale, and delightful UX.',
      features: ['Single codebase, native feel', 'API-driven architecture', 'Play Store & App Store ready'],
      icon: icons.android,
      iconAlt: 'Android',
    },
    {
      title: 'Full-Stack Solutions',
      description: 'End-to-end systems engineered for reliability, scalability, and security.',
      features: ['REST & real-time APIs', 'Secure auth & roles', 'Cloud-native deployments'],
      icon: icons.node,
      iconAlt: 'Node.js',
    },
    {
      title: 'UI / UX Design',
      description: 'Interfaces designed to feel effortless, intuitive, and visually refined.',
      features: ['Design systems & tokens', 'Accessibility-first layouts', 'Pixel-perfect execution'],
      icon: icons.figma,
      iconAlt: 'Figma',
    },
  ];

  return (
    <section className="relative w-full font-clash select-none overflow-hidden bg-transparent">
      <div className="w-[97%] max-w-384 mx-auto bento-section-bg py-16 px-8 lg:p-12">
        {/* Header */}
        <div className="mb-12 border-b border-dashed border-neutral-800 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-[#f54900] text-sm uppercase tracking-widest font-semibold">
              MY SPECIALITIES
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold uppercase tracking-tight mt-2 text-foreground leading-none">
              <AnimatedTitle text="Services & Capabilities /" />
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md font-clash text-base">
            Providing end-to-end development expertise to convert complex designs into functional, highly-scalable digital products.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          {/* Web Development - Span 4 */}
          <div className="col-span-12 md:col-span-4">
            <FeatureCard classes="bento-card">
              <div className="relative z-10 font-clash">
                <h3>{services[0].title}</h3>
                <p className="font-clash">{services[0].description}</p>
                <ul>
                  {services[0].features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="img-br">
                <img src={services[0].icon} alt={services[0].iconAlt} />
              </div>
            </FeatureCard>
          </div>

          {/* Mobile Apps - Span 8 */}
          <div className="col-span-12 md:col-span-8">
            <FeatureCard classes="bento-card">
              <div className="relative z-10 max-w-lg">
                <h3>{services[1].title}</h3>
                <p>{services[1].description}</p>
                <ul>
                  {services[1].features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="img-br mb-5">
                <img src={services[1].icon} alt={services[1].iconAlt} />
              </div>
            </FeatureCard>
          </div>

          {/* Full Stack - Span 8 */}
          <div className="col-span-12 md:col-span-8">
            <FeatureCard classes="bento-card">
              <div className="relative z-10 max-w-lg">
                <h3>{services[2].title}</h3>
                <p>{services[2].description}</p>
                <ul>
                  {services[2].features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="img-br">
                <img src={services[2].icon} alt={services[2].iconAlt} />
              </div>
            </FeatureCard>
          </div>

          {/* UI/UX - Span 4 */}
          <div className="col-span-12 md:col-span-4">
            <FeatureCard classes="bento-card">
              <div className="relative z-10">
                <h3>{services[3].title}</h3>
                <p>
                  Interfaces designed to feel effortless, <br /> intuitive, and visually refined.
                </p>
                <ul>
                  {services[3].features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="img-br -mt-19">
                <img src={services[3].icon} alt={services[3].iconAlt} />
              </div>
            </FeatureCard>
          </div>
        </div>
      </div>

      <style>{`
        .bento-section-bg {
          background: var(--background)
        }

        .dark .bento-section-bg {
          var(--background)
        }

        /* Core bento look with light and dark mode adaptation */
        .bento-card {
  position: relative;
  height: 100%;
  padding: 2rem;
  overflow: hidden;
  border-radius: 0;

  background-image:
    linear-gradient(
      to bottom,
      rgba(255, 255, 227, 0.85) 0%,
      rgba(255, 255, 227, 0.96) 100%
    ),
    url('/dot.svg');

  background-repeat: no-repeat, repeat;
  background-size: 100% 100%, 32px 32px;

  /* Makes the dots blend softly with the gradient */
  background-blend-mode: normal, soft-light;

  border: 1px dashed black;
  transition: all 0.3s ease-in-out;
}

        .dark .bento-card {
          background-image: 
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 0%, transparent 100%),
            url('/dot.svg');
          border: 1px solid rgba(255, 255, 255, 0.1);
        }


        .bento-card h3 {
          margin-bottom: 0.75rem;
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--foreground);
        }

        .bento-card p {
          margin-bottom: 1.5rem;
          color: var(--muted-foreground);
          line-height: 1.6;
        }

        .bento-card ul {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--foreground);
          list-style: none;
          padding: 0;
        }

        .bento-card ul li::before {
          content: "+";
          margin-right: 0.5rem;
          color: #f54900;
          font-weight: bold;
        }

        /* Unified image placement */
        .img-br {
          position: absolute;
          bottom: 1.5rem;
          right: 1.5rem;
          pointer-events: none;
        }

        .img-br img {
          width: 8rem;
          height: 8rem;
          opacity: 0.15;
          transition: all 0.5s ease;
        }

        .bento-card:hover .img-br img {
          opacity: 0.8;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .img-br {
            bottom: 1rem;
            right: 1rem;
          }
          .img-br img {
            width: 6rem;
            height: 6rem;
          }
        }

        @media (max-width: 640px) {
          .bento-card {
            padding: 1.5rem;
          }
          .img-br {
            bottom: 0.75rem;
            right: 0.75rem;
          }
          .img-br img {
            width: 5rem;
            height: 5rem;
          }
        }

        @media (max-width: 420px) {
          .img-br img {
            width: 4rem;
            height: 4rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesBento;
