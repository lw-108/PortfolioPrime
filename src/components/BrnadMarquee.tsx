"use client";

import React, { useRef, useEffect, useState } from "react";

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
  { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", alt: "C" },
  { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", alt: "C++" },
  { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", alt: "Python" },
  { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", alt: "Java" },

  { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", alt: "HTML5" },
  { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", alt: "CSS3" },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b9/JavaScript_shield_logo_%28no_text%29.svg",
    alt: "JavaScript",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
    alt: "Tailwind CSS",
  },
  {
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    alt: "React",
  },

  { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "Node.js" },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Firebase_Logo_%28No_wordmark%29_%282024-%29.svg",
    alt: "Firebase",
  },
  {
    image: "https://brandlogos.net/wp-content/uploads/2025/07/supabase_icon-logo_brandlogos.net_nmv8t-512x521.png",
    alt: "Supabase",
  },

  {
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    alt: "PostgreSQL",
  },
  {
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
    alt: "SQLite",
  },

  {
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
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
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    alt: "VS Code",
  },
  {
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    alt: "Docker",
  },
  {
    image: "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/vercel.png",
    alt: "Vercel",
  },

  {
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    alt: "TypeScript",
  },
  {
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    alt: "Next.js",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Mongodb-icon.svg",
    alt: "MongoDB",
  },
  {
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg",
    alt: "Heroku",
  },
  {
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg",
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
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId: number;
    const speed = 0.8; // pixels per frame

    const updateScroll = () => {
      if (!isDragging) {
        container.scrollLeft += speed;
        const singleWidth = container.scrollWidth / 3;
        if (container.scrollLeft >= singleWidth * 2) {
          container.scrollLeft -= singleWidth;
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft += singleWidth;
        }
      }
      animationId = requestAnimationFrame(updateScroll);
    };

    animationId = requestAnimationFrame(updateScroll);
    return () => cancelAnimationFrame(animationId);
  }, [isDragging]);

  const onMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    setIsDragging(true);
    startX.current = e.pageX - container.offsetLeft;
    scrollLeft.current = container.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const container = containerRef.current;
    if (!container) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    container.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const container = containerRef.current;
    if (!container) return;
    setIsDragging(true);
    startX.current = e.touches[0].pageX - container.offsetLeft;
    scrollLeft.current = container.scrollLeft;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const container = containerRef.current;
    if (!container) return;
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    container.scrollLeft = scrollLeft.current - walk;
  };

  const tripleLogos = [...logos, ...logos, ...logos];

  const marqueeContent = (
    <div
      ref={containerRef}
      className="overflow-hidden select-none cursor-grab active:cursor-grabbing w-full"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUpOrLeave}
      onMouseLeave={onMouseUpOrLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onMouseUpOrLeave}
    >
      <div className="flex w-max">
        {tripleLogos.map((item, index) => (
          <div key={index} className="brand-grid-item">
            <img
              src={item.image}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="h-8 w-8 p-0 sm:h-8 sm:w-8 md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16 object-contain pointer-events-none"
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