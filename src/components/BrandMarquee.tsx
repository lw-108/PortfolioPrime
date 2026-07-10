"use client";

import { useRef } from "react";

type Logo = {
  image: string;
  alt: string;
};

type BrandMarqueeProps = {
  title?: string;
  logos?: Logo[];
  className?: string;
  compact?: boolean;
};

const defaultLogos: Logo[] = [
  { image: "https://fastly.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", alt: "C" },
  { image: "https://fastly.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", alt: "C++" },
  { image: "https://fastly.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", alt: "Python" },
  { image: "https://fastly.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", alt: "Java" },

  { image: "https://fastly.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", alt: "HTML5" },
  { image: "https://fastly.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", alt: "CSS3" },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b9/JavaScript_shield_logo_%28no_text%29.svg",
    alt: "JavaScript",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
    alt: "Tailwind CSS",
  },
  {
    image: "https://fastly.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    alt: "React",
  },

  { image: "https://fastly.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "Node.js" },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Firebase_Logo_%28No_wordmark%29_%282024-%29.svg",
    alt: "Firebase",
  },
  {
    image: "https://fastly.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
    alt: "Supabase",
  },

  {
    image: "https://fastly.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    alt: "PostgreSQL",
  },
  {
    image: "https://fastly.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
    alt: "SQLite",
  },

  {
    image: "https://fastly.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    alt: "Git",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/2/24/Github_logo_svg.svg",
    alt: "GitHub",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Android_Studio_icon_%282023%29.svg",
    alt: "Android Studio",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/7/79/Flutter_logo.svg",
    alt: "Flutter",
  },
  {
    image: "https://fastly.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    alt: "VS Code",
  },
  {
    image: "https://fastly.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    alt: "Docker",
  },
  {
    image: "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/Vercel.svg",
    alt: "Vercel",
  },

  {
    image: "https://fastly.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    alt: "TypeScript",
  },
  {
    image: "https://fastly.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    alt: "Next.js",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Mongodb-icon.svg",
    alt: "MongoDB",
  },
  {
    image: "https://fastly.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg",
    alt: "Heroku",
  },
  {
    image: "https://fastly.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg",
    alt: "Visual Studio",
  },
];

export default function BrandMarquee({
  title = "",
  logos = defaultLogos,
  className = "",
  compact = false,
}: BrandMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const doubleLogos = [...logos, ...logos];

  const marqueeContent = (
    <div
      ref={containerRef}
      className="overflow-hidden select-none w-full"
    >
      <div className="flex w-max animate-marquee">
        {doubleLogos.map((item, index) => (
          <div key={index} className={compact ? "brand-grid-item-compact" : "brand-grid-item"}>
            <img
              src={item.image}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              draggable={false}
              className={compact
                ? "h-6 w-6 lg:h-8 lg:w-8 object-contain pointer-events-none"
                : "h-8 w-8 p-0 sm:h-8 sm:w-8 md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16 object-contain pointer-events-none"
              }
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (compact) {
    return (
      <div className={`group relative ${className}`}>
        {marqueeContent}
      </div>
    );
  }

  return (
    <section className={`border-x border-t border-neutral-200 dark:border-neutral-700 ${className}`}>
      {/* Header */}
      <div className="relative border-b border-dashed border-neutral-200 bg-background bg-size-[18px_18px] bg-fixed px-8 py-12 dark:border-neutral-700 dark:bg-[url('/bgs/dot-gray-dark.svg')] dark:bg-size[length:18px_18px]">
        <h2 className="text-center text-2xl font-semibold">{title}</h2>
      </div>

      {/* Infinite Marquee */}
      <div className="group relative">
        {/* Left Fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-linear-to-r from-neutral-50 to-transparent dark:from-neutral-950 lg:w-24" />

        {/* Right Fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-linear-to-l from-neutral-50 to-transparent dark:from-neutral-950 lg:w-24" />

        {marqueeContent}
      </div>
    </section>
  );
}