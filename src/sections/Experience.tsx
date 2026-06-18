import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { AnimatedTitle } from '../components/ui/AnimatedTitle';

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: 'MEAN Stack Developer Trainee',
    company: 'Q Tree Technologies',
    location: 'Coimbatore, TN',
    duration: 'Jul 2023 - Dec 2023',
    description: [
      'Gained hands-on training and built full-stack applications using MongoDB, Express.js, Angular, and Node.js.',
      'Designed database schemas and integrated secure RESTful API endpoints with JWT authentication.',
      'Optimized application performance and responsive layouts to ensure compatibility across devices.'
    ],
    skills: ['MongoDB', 'Express.js', 'Angular', 'Node.js', 'REST APIs', 'JWT']
  },
  {
    role: 'Programming & Automation Student',
    company: 'CSC Computer Education',
    location: 'Erode, TN',
    duration: 'Jan 2020 - Mar 2020',
    description: [
      'Acquired core programming principles in C and Object-Oriented programming concepts in C++.',
      'Mastered document formatting, automation tools, and spreadsheet operations using Microsoft Office Suite.'
    ],
    skills: ['C', 'C++', 'Object-Oriented Programming', 'Microsoft Office']
  }
];

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="experience" className="relative z-10 w-full min-h-screen bg-background py-20 px-6 sm:px-8 lg:px-16 overflow-hidden select-none font-clash">
      <div className="max-w-384 mx-auto w-full border-x border-dashed border-neutral-800/60 min-h-[80vh] flex flex-col justify-between relative px-4 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="border-b border-dashed border-border pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-[#f54900] text-sm uppercase tracking-widest font-semibold">
              Journey
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold uppercase tracking-tight mt-2 text-foreground leading-none">
              <AnimatedTitle text="Experience /" />
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xs text-sm sm:text-base text-left md:text-right">
            Work history, industrial training, and certifications
          </p>
        </div>

        {/* Experience Timeline Grid */}
        <div ref={containerRef} className="flex-1 flex flex-col gap-12 mt-16 relative">
          
          {/* Vertical central dashed line in timeline */}
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px border-l border-dashed border-border/80 -translate-x-1/2 hidden md:block"></div>

          {experiences.map((exp, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
                className={`relative flex flex-col md:flex-row items-center w-full ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Visual marker dot */}
                <div className="absolute left-4 md:left-1/2 top-6 w-3 h-3 rounded-full bg-[#f54900] border-4 border-background -translate-x-1/2 z-20"></div>

                {/* Left/Right Card Spacer */}
                <div className="w-full md:w-1/2"></div>

                {/* Timeline Card */}
                <div className="w-full md:w-[46%] pl-8 md:pl-0 text-left">
                  <div className="bg-secondary/20 hover:bg-secondary/35 border border-border/80 hover:border-[#f54900]/40 rounded-2xl p-6 sm:p-8 transition-all duration-300 relative group overflow-hidden">
                    
                    {/* Diagonal branding accent corner */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#f54900]/5 rounded-bl-full translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-500"></div>

                    {/* Timeline Role Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-dashed border-border/60 pb-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-[#f54900] transition-colors">
                          {exp.role}
                        </h3>
                        <p className="text-xs font-semibold text-[#f54900] tracking-wide mt-1 uppercase">
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-left sm:text-right shrink-0">
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground px-2.5 py-1 bg-muted/60 border border-border rounded-full">
                          {exp.duration}
                        </span>
                        <p className="text-[10px] text-muted-foreground mt-1.5 uppercase font-medium">
                          {exp.location}
                        </p>
                      </div>
                    </div>

                    {/* Description bullet points */}
                    <ul className="mt-5 flex flex-col gap-2.5 text-xs text-muted-foreground leading-relaxed list-disc list-outside pl-4">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="hover:text-foreground transition-colors">
                          {desc}
                        </li>
                      ))}
                    </ul>

                    {/* Skills pills */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border border-border/70 text-muted-foreground hover:text-foreground hover:border-[#f54900] transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Experience;
