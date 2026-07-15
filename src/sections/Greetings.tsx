import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const Greetings: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const textContent = 
    "Thanks for visiting my portfolio, here you can see the best of my works. " +
    "I am passionate about transforming ideas into compelling visual experiences. " +
    "I specialize in crafting unique brand identities, digital experiences, " +
    "and engaging content that resonates with your audience. " +
    "My mission is to empower businesses and brands to stand out in a crowded market. " +
    "I believe in quality, not quantity. This portfolio represents a collection " +
    "of full-stack implementations, React components, and creative animations.";

  useEffect(() => {
    if (!textRef.current) return;

    const el = textRef.current;
    
    // Split the text content into words
    const originalText = el.textContent || "";
    el.innerHTML = ""; // Clear original string
    
    const words = originalText.split(" ");
    const wordSpans: HTMLSpanElement[] = [];

    words.forEach((wordText, wordIdx) => {
      // Create a wrapper for the word to prevent word cut-off/split at line breaks
      const wordSpan = document.createElement("span");
      wordSpan.textContent = wordText;
      wordSpan.style.opacity = "0.15";
      wordSpan.style.display = "inline-block";
      wordSpan.style.transition = "opacity 0.2s ease";
      
      el.appendChild(wordSpan);
      wordSpans.push(wordSpan);

      // Add a space after the word
      if (wordIdx < words.length - 1) {
        const spaceSpan = document.createElement("span");
        spaceSpan.innerHTML = "&nbsp;";
        spaceSpan.style.display = "inline-block";
        spaceSpan.style.opacity = "0.15";
        spaceSpan.style.marginRight = "0.22em";
        el.appendChild(spaceSpan);
        wordSpans.push(spaceSpan);
      }
    });

    const ctx = gsap.context(() => {
      gsap.to(wordSpans, {
        opacity: 1,
        stagger: 0.04,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom 50%",
          scrub: 0.5,
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
      el.innerHTML = originalText; // Restore original raw string on unmount
    };
  }, []);

  return (
    <section id="greetings" className="relative z-40 w-full bg-transparent py-0 px-0 overflow-hidden select-none font-clash">
      <div ref={containerRef} className="w-[97%] max-w-384 mx-auto bg-background px-6 sm:px-10 lg:px-16 py-24 sm:py-32 relative">
        <p
          ref={textRef}
          className="text-[clamp(1.1rem,3.2vw,3.8rem)] font-bold uppercase tracking-wide leading-[1.3] text-left sm:text-justify m-0 text-foreground dark:text-foreground"
        >
          {textContent}
        </p>
      </div>
    </section>
  );
};

export default Greetings;
