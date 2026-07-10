import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AnimatedTitle } from '../components/ui/AnimatedTitle';
import { Timeline } from '../components/ui/timeline';

interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  duration: string;
  score: string;
  coursework: string;
  image: string;
}

const educationHistory: EducationItem[] = [
  {
    degree: 'Master of Computer Applications (MCA)',
    field: 'Computer Application',
    institution: 'Erode Sengunthar Engineering College',
    duration: '2024 - 2026',
    score: 'CGPA: 80%',
    coursework: 'Computer Architecture, Comparison of Learning Algorithms, OOP Concepts in Languages',
    image: '/edu/esec.png'
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    field: 'Computer Application',
    institution: 'KSR College of Arts and Science',
    duration: '2020 - 2023',
    score: 'CGPA: 80%',
    coursework: 'Basics of Computer Systems, Cloud Computing Concepts, Algorithms and Problem Solving',
    image: '/edu/ksr.jpg'
  },
  {
    degree: 'Higher Secondary Certificate (XII - HSC)',
    field: 'Computer Science',
    institution: 'SVN Hr.Sec. School, Kongampalam, Erode',
    duration: '2019 - 2020',
    score: 'Percentage: 76%',
    coursework: 'Computer Systems and work principles, Programming (C, C++, Java, Python), OOP concepts, R, SQL, MySQL, MS Access',
    image: '/edu/svn2.jpg'
  },
  {
    degree: 'Secondary School Leaving Certificate (X - SSLC)',
    field: 'General Education',
    institution: 'Sakthi Hr.Sec. School, Chithode, Erode',
    duration: '2017 - 2018',
    score: 'Percentage: 88%',
    coursework: 'Tamil, English, Mathematics, Science, Social Science',
    image: '/edu/sakthi.jpg'
  }
];

export const Education: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsVisible(false);
  };

  const timelineData = educationHistory.map((edu, idx) => ({
    title: edu.duration,
    content: (
      <div
        className="relative py-6 transition-all duration-300 ease-out font-clash"
        onMouseEnter={() => handleMouseEnter(idx)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background highlight on hover */}
        <div
          className={`
            absolute inset-0 -mx-4 px-4  rounded-none
            transition-all duration-300 ease-out pointer-events-none
            ${hoveredIndex === idx ? "opacity-100 scale-100" : "opacity-0 scale-95"}
          `}
        />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0 text-left">
            {/* Title with animated underline */}
            <div className="inline-flex items-center gap-2">
              <h3 className="text-foreground font-bold text-lg sm:text-xl tracking-tight leading-snug">
                <span className="relative">
                  {edu.degree}
                  {/* Animated underline */}
                  <span
                    className={`
                      absolute left-0 -bottom-0.5 h-[2px] bg-primary
                      transition-all duration-300 ease-out
                      ${hoveredIndex === idx ? "w-full" : "w-0"}
                    `}
                  />
                </span>
              </h3>

              {/* Arrow that slides in */}
              <ArrowUpRight
                className={`
                  w-5 h-5 text-primary
                  transition-all duration-300 ease-out
                  ${
                    hoveredIndex === idx
                      ? "opacity-100 translate-x-0 translate-y-0"
                      : "opacity-0 -translate-x-2 translate-y-2"
                  }
                `}
              />
            </div>

            {/* Institution name */}
            <p className="text-sm font-semibold text-muted-foreground mt-1 uppercase tracking-wider">
              {edu.institution}
            </p>

            {/* Coursework Block */}
            <div className="mt-4 border-t border-dashed border-border/60 pt-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-1">
                Key Coursework
              </span>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {edu.coursework}
              </p>
            </div>
          </div>

          {/* Score Badge */}
          <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-md shrink-0">
            {edu.score}
          </span>
        </div>
      </div>
    ),
  }));

  return (
    <section ref={containerRef} onMouseMove={handleMouseMove} id="education" className="relative z-10 w-full bg-transparent pt-0 pb-0 px-0 overflow-hidden select-none font-clash">
      <div className="w-[97%] max-w-384 mx-auto bg-background flex flex-col justify-between relative px-4 sm:px-8 lg:px-12 py-12">
        
        {/* Floating Image Preview */}
        <div
          className="pointer-events-none absolute z-50 overflow-hidden rounded-xl shadow-2xl"
          style={{
            left: 0,
            top: 0,
            transform: `translate3d(${smoothPosition.x + 20}px, ${smoothPosition.y - 100}px, 0)`,
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0.8,
            transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div className="relative w-[280px] h-[180px] bg-secondary rounded-xl overflow-hidden border border-border">
            {educationHistory.map((edu, idx) => (
              <img
                key={edu.degree}
                src={edu.image || "/placeholder.svg"}
                alt={edu.degree}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out"
                style={{
                  opacity: hoveredIndex === idx ? 1 : 0,
                  scale: hoveredIndex === idx ? 1 : 1.1,
                  filter: hoveredIndex === idx ? "none" : "blur(10px)",
                }}
              />
            ))}
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent" />
          </div>
        </div>

        {/* Header */}
        <div className="border-b border-dashed border-border pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-[#f54900] text-sm uppercase tracking-widest font-semibold">
              Academics
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold uppercase tracking-tight mt-2 text-foreground leading-none">
              <AnimatedTitle text="Education /" />
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xs text-sm sm:text-base text-left md:text-right">
            My academic credentials, grades, and focus areas
          </p>
        </div>

        {/* Education Timeline */}
        <div className="mt-8">
          <Timeline data={timelineData} />
        </div>

      </div>
    </section>
  );
};

export default Education;
