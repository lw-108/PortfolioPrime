"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// SVG components matching those in StepRibbon
const SVGStar = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className={className}>
    <path d="M 152 70.059 L 201.539 20.519 L 235.48 54.461 L 185.941 104 L 256 104 L 256 152 L 185.941 152 L 235.48 201.539 L 201.539 235.48 L 152 185.941 L 152 256 L 104 256 L 104 185.941 L 54.46 235.48 L 20.52 201.539 L 70.059 152 L 0 152 L 0 104 L 70.059 104 L 20.519 54.46 L 54.461 20.52 L 104 70.059 L 104 0 L 152 0 Z" fill="currentColor"></path>
  </svg>
);

const SVGFourStar = ({ className = "" }) => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M100 0C103.395 53.7596 146.24 96.6052 200 100C146.24 103.395 103.395 146.24 100 200C96.6052 146.24 53.7596 103.395 0 100C53.7596 96.6052 96.6052 53.7596 100 0Z" fill="currentColor"/>
  </svg>
);

const SVGClover = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className={className}>
    <path d="M 78 0 C 105.614 0 128 22.386 128 50 C 128 22.386 150.386 0 178 0 L 256 0 L 256 78 C 256 105.614 233.614 128 206 128 C 233.614 128 256 150.386 256 178 L 256 256 L 178 256 C 150.386 256 128 233.614 128 206 C 128 233.614 105.614 256 78 256 L 0 256 L 0 178 C 0 150.386 22.386 128 50 128 C 22.386 128 0 105.614 0 78 L 0 0 Z" fill="currentColor"></path>
  </svg>
);

const SVGPinwheel = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className={className}>
    <path d="M 228 0 C 172.772 0 128 44.772 128 100 L 128 0 L 0 0 L 0 28 C 0 83.228 44.772 128 100 128 L 0 128 L 0 256 L 28 256 C 83.228 256 128 211.228 128 156 L 128 256 L 256 256 L 256 228 C 256 172.772 211.228 128 156 128 L 256 128 L 256 0 Z" fill="currentColor"></path>
  </svg>
);

export default function Ribbon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-based translation by a smaller percentage to make the motion slower
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const svgClass = "mx-8 sm:mx-12 h-6 w-6 sm:h-8 sm:w-8 shrink-0";

  // Ribbon 1 sequence: Developer -> svg1 -> Creator -> svg2 -> Designer -> svg3 -> full stack dev -> svg4
  const sequence1 = [
    { text: "Developer", svg: <SVGStar className={svgClass} /> },
    { text: "Creator", svg: <SVGFourStar className={svgClass} /> },
    { text: "Designer", svg: <SVGClover className={svgClass} /> },
    { text: "full stack dev", svg: <SVGPinwheel className={svgClass} /> },
  ];
  const repeatedItems1 = Array(36).fill(sequence1).flat();

  // Ribbon 2 sequence: Developer -> svg1 -> Creator -> svg2 -> Designer -> svg3 -> full stack dev -> svg4
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
      className="relative w-full h-[180px] sm:h-[240px] overflow-hidden flex items-center justify-center select-none bg-background"
    >
      {/* Ribbon 1: Slanted Left to Right */}
      <div 
        className="absolute w-[150%] h-14 sm:h-20 bg-primary text-black flex items-center overflow-hidden rotate-[-5deg] sm:rotate-[-4deg] shadow-2xl z-20 origin-center"
      >
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

      {/* Ribbon 2: Slanted Right to Left */}
      <div 
        className="absolute w-[150%] h-14 sm:h-20 bg-primary text-black flex items-center overflow-hidden rotate-[5deg] sm:rotate-[4deg] shadow-2xl z-10 origin-center"
      >
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
