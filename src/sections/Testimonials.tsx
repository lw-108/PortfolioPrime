import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedTitle } from '../components/ui/AnimatedTitle';

interface Testimonial {
  text: string;
  name: string;
  role: string;
  company: string;
  relation: string;
}

const testimonials: Testimonial[] = [
  {
    text: "Lingesh is a fast learner and highly motivated developer. During his trainee project at Q Tree Technologies, he showed exceptional proficiency in full-stack JavaScript development, designing clean schemas and building secure API endpoints.",
    name: "A. Rajesh Kumar",
    role: "Senior Technical Lead",
    company: "Q Tree Technologies",
    relation: "MEAN Stack Mentor"
  },
  {
    text: "His design logic is very clean and he always structures his work perfectly. I worked with him on the Wisdom Archive project and his dedication to database schema optimization and responsive layouts was highly impressive.",
    name: "Dr. S. Priya Swaminathan",
    role: "Academic Advisor & Professor",
    company: "ESEC College",
    relation: "MCA Project Advisor"
  },
  {
    text: "Lingeshwarma delivered our Fruit Shop Management interface exactly as planned. The user interface was responsive, visual styles were extremely neat, and mobile responsive performance was optimized to load 30% faster.",
    name: "K. Karthikeyan",
    role: "Product Lead",
    company: "Agritech Solutions",
    relation: "Freelance Web Client"
  }
];

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="relative z-10 w-full min-h-[90vh] bg-background py-20 px-6 sm:px-8 lg:px-16 overflow-hidden select-none font-clash">
      <div className="max-w-384 mx-auto w-full border-x border-dashed border-neutral-800/60 min-h-[70vh] flex flex-col justify-between relative px-4 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="border-b border-dashed border-border pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-[#f54900] text-sm uppercase tracking-widest font-semibold">
              Endorsements
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold uppercase tracking-tight mt-2 text-foreground leading-none">
              <AnimatedTitle text="Reviews /" />
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xs text-sm sm:text-base text-left md:text-right">
            Feedback from team mentors, advisors, and clients
          </p>
        </div>

        {/* Carousel Slider Block */}
        <div className="flex-1 flex flex-col justify-center items-center mt-12 py-8 relative max-w-3xl mx-auto w-full min-h-[350px]">
          
          {/* Quote Symbol background accent */}
          <div className="absolute top-0 left-0 text-secondary/35 text-[15rem] leading-none select-none font-sans font-extrabold translate-y-[-40px] translate-x-[-20px] pointer-events-none">
            “
          </div>

          <div className="w-full relative z-10 text-left px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="flex flex-col gap-6"
              >
                {/* Quote Text */}
                <blockquote className="text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed text-foreground italic">
                  "{testimonials[activeIndex].text}"
                </blockquote>

                {/* Author Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-dashed border-border/60 pt-6 mt-2 gap-3">
                  <div>
                    <cite className="text-base sm:text-lg font-bold text-[#f54900] not-italic block">
                      {testimonials[activeIndex].name}
                    </cite>
                    <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                      {testimonials[activeIndex].role} &mdash; <span className="text-foreground">{testimonials[activeIndex].company}</span>
                    </span>
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 bg-secondary border border-border rounded text-[#f54900] self-start sm:self-center">
                    {testimonials[activeIndex].relation}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider controls */}
          <div className="flex gap-4 mt-12 z-20">
            <button
              onClick={prevTestimonial}
              className="w-11 h-11 border border-border text-muted-foreground hover:text-foreground hover:border-[#f54900] rounded-full flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              &#x2190;
            </button>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground tracking-wider font-sans">
              <span className="text-foreground">{activeIndex + 1}</span>
              <span>/</span>
              <span>{testimonials.length}</span>
            </div>
            <button
              onClick={nextTestimonial}
              className="w-11 h-11 border border-border text-muted-foreground hover:text-foreground hover:border-[#f54900] rounded-full flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              &#x2192;
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;
