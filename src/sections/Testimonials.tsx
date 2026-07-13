import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedTitle } from '../components/ui/AnimatedTitle';
import { motion } from 'motion/react';

interface Testimonial {
  id: number;
  text: string;
  name: string;
  role: string;
  company: string;
  relation: string;
  image: string;
  linkedin?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "I am extremely satisfied with the website developed by Lingesh Warma from U Fill Academy. He treated this project as if it were his own website, dedicating countless hours to it. Whenever I requested a feature, he always looked for solutions and implemented it perfectly.",
    name: "M.Muthubalaji",
    role: "CEO & Founder",
    company: "U Fill Academy",
    relation: "Web Client",
    image: "/testimonials/balaji.png",
    linkedin: "https://www.linkedin.com/",
  },
  {
    id: 2,
    text: "The U-Fill Academy website was really impressive. The design looks professional and unique compared to many other websites. The quality of the work is excellent, and the pages load smoothly. The project was completed quickly without unnecessary delays.",
    name: "Hari Krishnan",
    role: "CTO",
    company: "U Fill Academy",
    relation: "Web Client",
    image: "/testimonials/hari.png",
    linkedin: "https://www.linkedin.com/",
  },
  {
    id: 3,
    text: "I'm really satisfied with the portfolio website that's built for me. It looks professional, works smoothly on all devices, and showcases my work perfectly. Thanks for the great work and I am happy with the final result.",
    name: "D. Keerthana",
    role: "UI/UX Designer",
    company: "Freelance Client",
    relation: "Web Client",
    image: "/testimonials/fantasy-shadow.png",
    linkedin: "https://www.linkedin.com/",
  }
];

export const Testimonials: React.FC = () => {
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const newIndex = (active + 1) % testimonials.length;
      handleChange(newIndex);
    }, 8000);

    return () => clearInterval(timer);
  }, [active, isTransitioning]);

  const handleChange = (index: number) => {
    if (index === active || isTransitioning) return;
    setIsTransitioning(true);
    setProgressKey(prev => prev + 1);
    setTimeout(() => {
      setActive(index);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  const handlePrev = () => {
    const newIndex = active === 0 ? testimonials.length - 1 : active - 1;
    handleChange(newIndex);
  };

  const handleNext = () => {
    const newIndex = active === testimonials.length - 1 ? 0 : active + 1;
    handleChange(newIndex);
  };

  const current = testimonials[active];

  return (
    <section id="testimonials" className="relative z-10 w-full bg-transparent pt-0 pb-0 px-0 overflow-hidden select-none font-clash">
      <div className="w-[97%] max-w-384 mx-auto bg-background flex flex-col justify-between relative px-6 sm:px-10 lg:px-16 py-4">
        <div className="relative z-10 w-full">
          
          {/* Header */}
          <div className="border-b border-dashed border-border pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-16">
            <div>
              <span className="text-[#f54900] text-sm uppercase tracking-widest font-semibold font-clash">
                Endorsements
              </span>
              <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold uppercase tracking-tight mt-2 text-foreground leading-none font-clash">
                <AnimatedTitle text="Reviews" />
              </h2>
            </div>
            <p className="text-muted-foreground max-w-xs text-sm sm:text-base text-left md:text-right font-clash leading-relaxed">
              Feedback from team mentors, advisors, and clients
            </p>
          </div>

          {/* Card Layout Container */}
          <div className="w-full max-w-5xl lg:max-w-6xl mx-auto overflow-visible mt-8 md:mt-36 mb-16 px-2 sm:px-4">
            
            {/* Neobrutalist 3D Layered Card Wrapper */}
            <div className="relative group">
              {/* Hard shadow layer — solid black offset, no blur */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-5 sm:translate-y-5 bg-foreground" />

              {/* Primary Card — Draggable to swap to next/prev */}
              <motion.div 
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  const swipeThreshold = 50; // offset in px
                  if (info.offset.x < -swipeThreshold) {
                    handleNext();
                  } else if (info.offset.x > swipeThreshold) {
                    handlePrev();
                  }
                }}
                className="bg-primary p-6 md:p-8 pt-6 md:pt-16 pb-8 md:pb-12 md:pl-[330px] lg:pl-[390px] relative flex flex-col items-center md:items-start min-h-[220px] md:min-h-[420px] justify-center overflow-visible transition-transform duration-300 ease-out group-hover:translate-x-3 group-hover:translate-y-3 sm:group-hover:translate-x-5 sm:group-hover:translate-y-5 cursor-grab active:cursor-grabbing select-none"
              >
                
                {/* Cut-out Avatar overlapping top border on Desktop — Hidden on Mobile for compact design */}
                <div className="hidden md:block absolute bottom-0 left-6 lg:left-12 w-56 sm:w-64 md:w-72 lg:w-80 h-[380px] sm:h-[460px] md:h-[560px] lg:h-[650px] shrink-0 z-20 self-center md:self-end mt-0 mb-0 overflow-visible">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-full h-full object-contain object-bottom filter"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/madben.png";
                    }}
                  />
                </div>

                {/* Quote details */}
                <div className={`relative z-10 w-full flex flex-col items-center md:items-start transition-all duration-300 ${isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
                  <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
                    <span className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#ffffe3]/40 leading-none shrink-0 transform translate-y-1">
                      “
                    </span>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-xl font-medium text-white max-w-2xl leading-relaxed font-clash-light text-center md:text-left">
                      {current.text}
                    </p>
                  </div>

                  {/* Name badge — Neobrutalist tag style */}
                  <div className="mt-8 md:pl-10 lg:pl-12 text-center md:text-left flex flex-col items-center md:items-start gap-3">
                    <div 
                      className="inline-block bg-[#ffffe3] px-4 py-2 border-2 border-black"
                      style={{ boxShadow: '3px 3px 0px 0px rgba(0,0,0,1)' }}
                    >
                      <h4 className="text-sm sm:text-base md:text-lg font-black uppercase tracking-widest text-black">
                        {current.name}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm uppercase tracking-wider text-[#ffffe3]/70 font-clash-light">
                      {current.role} <span className="mx-1 text-[#ffffe3]/30">/</span> {current.company}
                    </p>
                    {current.linkedin && (
                      <a 
                        href={current.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-black text-white px-3 py-1.5 border-2 border-black hover:bg-white hover:text-black transition-colors duration-150 text-xs uppercase tracking-widest font-bold group"
                        title={`${current.name}'s LinkedIn`}
                        style={{ boxShadow: '2px 2px 0px 0px rgba(255,255,227,0.5)' }}
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        <span>LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>

            </div>{/* End Neobrutalist Card Wrapper */}

          </div>

          {/* Navigation Controls */}
          <div className="w-full max-w-5xl lg:max-w-6xl mx-auto flex items-center justify-between mt-8 px-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleChange(index)}
                    className="py-2 cursor-pointer focus:outline-none group"
                  >
                    <div className={`relative h-1 overflow-hidden transition-all duration-300 ${
                      index === active ? 'w-12 sm:w-16 bg-neutral-800' : 'w-3 bg-neutral-800 hover:bg-[#f54900]/40'
                    }`}>
                      {index === active && (
                        <div
                          key={progressKey}
                          className="absolute inset-0 bg-[#f54900] origin-left"
                          style={{
                            animation: 'testimonial-progress 8s linear forwards',
                          }}
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase font-semibold ml-2 tabular-nums">
                {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 border border-neutral-800 text-muted-foreground hover:text-foreground hover:border-[#f54900] transition-all duration-300 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 border border-neutral-800 text-muted-foreground hover:text-foreground hover:border-[#f54900] transition-all duration-300 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
