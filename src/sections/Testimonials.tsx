import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedTitle } from '../components/ui/AnimatedTitle';

interface Testimonial {
  id: number;
  text: string;
  name: string;
  role: string;
  company: string;
  relation: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "⭐⭐⭐⭐  Highly Recommended!\n\nI am extremely satisfied with the website developed by Lingesh Verma from U Fill Academy.\n\nFrom the very beginning, he treated this project as if it were his own website. He never worried about the time and effort required and remained fully dedicated throughout the entire development process.\n\nOne thing I truly appreciated was his positive attitude. Whenever I requested a design or feature, he never said \"it's impossible.\" Instead, he always looked for solutions and successfully implemented the ideas I had in mind.\n\nI had many repeated questions and doubts during the project, and he patiently clarified every one of them without hesitation. His communication and support were excellent.\n\nWhat impressed me even more was that he added many extra features and improvements beyond what I originally requested, making the website much better than I expected.\n\nHe worked day and night to ensure the project was completed within the promised timeline. His dedication, professionalism, and commitment to quality are truly commendable.\n\nI am very, very satisfied with his work and genuinely happy that he created this website for my startup. The final website looks amazing, and I highly recommend Lingesh Verma to anyone looking for a skilled, reliable, and hardworking web developer.\n\nThank you, Lingesh, for your outstanding work!",
    name: "M.Muthubalaji",
    role: "CEO & Founder",
    company: "U Fill Academy",
    relation: "Web Client",
    image: "/muthubalaji.png",
  },
  {
    id: 2,
    text: "The U-Fill Academy website was really impressive. The design looks professional and unique compared to many other websites. The quality of the work is excellent, and the pages load smoothly. The project was completed quickly without unnecessary delays. Overall, the website looks modern, attractive, and well-organized.",
    name: "Hari Krishnan",
    role: "CTO",
    company: "U Fill Academy",
    relation: "Web Client",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    text: "Lingeshwarma delivered our Fruit Shop Management interface exactly as planned. The user interface was responsive, visual styles were extremely neat, and mobile responsive performance was optimized to load 30% faster.",
    name: "K. Karthikeyan",
    role: "Product Lead",
    company: "Agritech Solutions",
    relation: "Freelance Web Client",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=60",
  }
];

export const Testimonials: React.FC = () => {
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Only auto-advance if the testimonial is not currently expanded
    if (isExpanded) return;

    const timer = setInterval(() => {
      const newIndex = (active + 1) % testimonials.length;
      handleChange(newIndex);
    }, 10000);

    return () => clearInterval(timer);
  }, [active, isTransitioning, isExpanded]);

  const handleChange = (index: number) => {
    if (index === active || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActive(index);
      setIsExpanded(false);
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
  const maxLen = 220;
  const shouldTruncate = current.text.length > maxLen;
  const displayText = shouldTruncate && !isExpanded
    ? current.text.slice(0, maxLen).trim() + "..."
    : current.text;

  return (
    <section id="testimonials" className="relative z-10 w-full bg-transparent pt-0 pb-0 px-0 overflow-hidden select-none font-clash">
      <div className="w-[97%] max-w-384 mx-auto bg-background flex flex-col justify-between relative px-6 sm:px-10 lg:px-16 py-12">
        <div className="relative z-10 w-full">
          {/* Header */}
          <div className="border-b border-dashed border-border pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <span className="text-[#f54900] text-sm uppercase tracking-widest font-semibold font-clash">
                Endorsements
              </span>
              <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold uppercase tracking-tight mt-2 text-foreground leading-none font-clash">
                <AnimatedTitle text="Reviews /" />
              </h2>
            </div>
            <p className="text-muted-foreground max-w-xs text-sm sm:text-base text-left md:text-right font-clash leading-relaxed">
              Feedback from team mentors, advisors, and clients
            </p>
          </div>

          {/* Testimonial Editorial Content Grid */}
          <div className="w-full max-w-4xl mx-auto px-2 sm:px-6 py-12 md:py-16">
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">
              {/* Large index number */}
              <span
                className="text-[80px] md:text-[120px] font-extrabold leading-none text-foreground/10 select-none transition-all duration-500 font-clash self-start"
                style={{ fontFeatureSettings: '"tnum"' }}
              >
                {String(active + 1).padStart(2, "0")}
              </span>

              <div className="flex-1 pt-2 md:pt-6 text-left">
                {/* Quote */}
                <blockquote
                  className={`text-lg sm:text-xl md:text-2xl leading-relaxed text-foreground tracking-tight whitespace-pre-line transition-all duration-300 ${isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
                    }`}
                  style={{ fontFamily: "'ClashDisplay-Light', sans-serif", fontWeight: 300 }}
                >
                  "{displayText}"
                  {shouldTruncate && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="ml-2 text-sm font-semibold text-[#f54900] hover:underline focus:outline-none cursor-pointer inline-block align-baseline font-clash"
                    >
                      {isExpanded ? "View Less" : "View More"}
                    </button>
                  )}
                </blockquote>

                {/* Author info with hover reveal */}
                <div
                  className={`mt-8 md:mt-10 group cursor-default transition-all duration-300 delay-100 ${isTransitioning ? "opacity-0" : "opacity-100"
                    }`}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    {/* Creative Offset Card Frame for Avatar */}
                    <div className="relative shrink-0 group/avatar">
                      {/* Decorative colored offset background shadow */}
                      <div className="absolute inset-0 bg-[#f54900] translate-x-1.5 translate-y-1.5 group-hover/avatar:translate-x-0 group-hover/avatar:translate-y-0 transition-transform duration-300" />
                      
                      {/* Interactive image container */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-background border-2 border-foreground overflow-hidden transition-all duration-300">
                        <img
                          src={current.image}
                          alt={current.name}
                          className="w-full h-full object-cover grayscale group-hover/avatar:grayscale-0 transition-all duration-500 scale-100 group-hover/avatar:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop";
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ fontFamily: "'ClashDisplay-Light', sans-serif" }}>
                      <p className="font-semibold text-foreground text-sm sm:text-base" style={{ fontWeight: 500 }}>{current.name}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground" style={{ fontWeight: 300 }}>
                        {current.role}
                        <span className="mx-2 text-[#f54900]/30">/</span>
                        <span className="group-hover:text-[#f54900] transition-colors duration-300" style={{ fontWeight: 500 }}>{current.company}</span>
                        <span className="mx-2 text-muted-foreground/30">|</span>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#f54900]">{current.relation}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation - vertical line selector */}
            <div className="mt-12 md:mt-16 flex items-center justify-between border-t border-dashed border-border/40 pt-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleChange(index)}
                      className="group relative py-4 cursor-pointer"
                    >
                      <span
                        className={`block h-[3px] transition-all duration-500 ease-out rounded-none ${index === active
                            ? "w-12 bg-[#f54900]"
                            : "w-6 bg-foreground/20 group-hover:w-8 group-hover:bg-[#f54900]/40"
                          }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground tracking-widest uppercase font-clash">
                  {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  className="p-2 border border-border/60 text-muted-foreground hover:text-foreground hover:border-[#f54900] transition-all duration-300 cursor-pointer rounded-none"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 border border-border/60 text-muted-foreground hover:text-foreground hover:border-[#f54900] transition-all duration-300 cursor-pointer rounded-none"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
