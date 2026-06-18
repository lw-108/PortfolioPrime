import React from 'react';
import { motion } from 'motion/react';
import { AnimatedTitle } from '../components/ui/AnimatedTitle';

interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  duration: string;
  score: string;
  coursework: string;
}

const educationHistory: EducationItem[] = [
  {
    degree: 'Master of Computer Applications (MCA)',
    field: 'Computer Application',
    institution: 'Erode Sengunthar Engineering College',
    duration: 'Aug 2024 - June 2026',
    score: 'CGPA: 80%',
    coursework: 'Computer Architecture, Comparison of Learning Algorithms, OOP Concepts in Languages'
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    field: 'Computer Application',
    institution: 'KSR College of Arts and Science',
    duration: 'May 2020 - June 2023',
    score: 'CGPA: 80%',
    coursework: 'Basics of Computer Systems, Cloud Computing Concepts, Algorithms and Problem Solving'
  },
  {
    degree: 'Higher Secondary Certificate (XII - HSC)',
    field: 'Computer Science',
    institution: 'SVN Hr.Sec. School, Kongampalam, Erode',
    duration: 'June 2019 - June 2020',
    score: 'Percentage: 76%',
    coursework: 'Computer Systems and work principles, Programming (C, C++, Java, Python), OOP concepts, R, SQL, MySQL, MS Access'
  },
  {
    degree: 'Secondary School Leaving Certificate (X - SSLC)',
    field: 'General Education',
    institution: 'Sakthi Hr.Sec. School, Chithode, Erode',
    duration: 'June 2017 - June 2018',
    score: 'Percentage: 88%',
    coursework: 'Tamil, English, Mathematics, Science, Social Science'
  }
];

export const Education: React.FC = () => {
  return (
    <section id="education" className="relative z-10 w-full min-h-screen bg-background py-20 px-6 sm:px-8 lg:px-16 overflow-hidden select-none font-clash">
      <div className="max-w-384 mx-auto w-full border-x border-dashed border-neutral-800/60 min-h-[80vh] flex flex-col justify-between relative px-4 sm:px-8 lg:px-12">
        
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

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 flex-1">
          {educationHistory.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, type: 'spring', damping: 20 }}
              className="bg-secondary/10 hover:bg-secondary/20 border border-border/70 hover:border-[#f54900]/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group"
            >
              <div>
                {/* Year tag & Score */}
                <div className="flex justify-between items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-muted border border-border rounded-full text-muted-foreground shrink-0">
                    {edu.duration}
                  </span>
                  <span className="text-xs font-bold text-[#f54900] bg-[#f54900]/10 border border-[#f54900]/20 px-2.5 py-0.5 rounded-md">
                    {edu.score}
                  </span>
                </div>

                {/* College & Degree */}
                <h3 className="text-lg sm:text-xl font-bold text-foreground mt-2 group-hover:text-[#f54900] transition-colors text-left leading-snug">
                  {edu.degree}
                </h3>
                <p className="text-xs font-bold text-muted-foreground mt-1 text-left uppercase tracking-wider">
                  {edu.institution}
                </p>
              </div>

              {/* Coursework Block */}
              <div className="mt-6 border-t border-dashed border-border/60 pt-4 text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#f54900] block mb-1.5">
                  Key Coursework
                </span>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {edu.coursework}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Education;
