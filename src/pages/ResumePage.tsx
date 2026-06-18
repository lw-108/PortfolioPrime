import React from 'react';
import { AnimatedTitle } from '../components/ui/AnimatedTitle';

export const ResumePage: React.FC = () => {
  return (
    <section id="resume-page" className="relative z-10 w-full min-h-screen bg-background py-20 px-6 sm:px-8 lg:px-16 overflow-hidden select-none font-clash">
      <div className="max-w-384 mx-auto w-full border-x border-dashed border-neutral-800/60 min-h-[85vh] flex flex-col justify-between relative px-4 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="border-b border-dashed border-border pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-[#f54900] text-sm uppercase tracking-widest font-semibold">
              Curriculum Vitae
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold uppercase tracking-tight mt-2 text-foreground leading-none">
              <AnimatedTitle text="My Resume /" />
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
            <p className="text-muted-foreground text-sm max-w-xs text-left md:text-right">
              View my complete profile credentials or download the printed version.
            </p>
            <a
              href="/LW19.pdf"
              download="Lingeshwarma_MK_Resume.pdf"
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider bg-[#f54900] text-[#ffffe3] hover:scale-105 active:scale-95 transition-all rounded cursor-pointer self-start md:self-auto"
            >
              Download PDF Resume
            </a>
          </div>
        </div>

        {/* Digital Resume Card Representation */}
        <div className="bg-secondary/10 border border-border/80 rounded-2xl p-6 sm:p-10 lg:p-12 mt-16 flex-1 text-left flex flex-col gap-10">
          
          {/* Header Identity */}
          <div className="flex flex-col md:flex-row justify-between items-start border-b border-dashed border-border pb-8 gap-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground uppercase tracking-tight">Lingeshwarma MK</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-[#f54900] mt-1">Full-Stack Developer &amp; UI Specialist</p>
            </div>
            <div className="text-xs text-muted-foreground leading-relaxed">
              <p>📍 Thayirpalayam, Chithode, Erode &mdash; 638102, TN, India</p>
              <p className="mt-1">✉️ lingeshwarma8877@gmail.com | 📞 +91 90254 64209</p>
            </div>
          </div>

          {/* Section Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Objective & Skills (Left Side) */}
            <div className="md:col-span-8 flex flex-col gap-8">
              {/* Objective */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-[#f54900] border-b border-border pb-1.5 mb-3">Objective</h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  To secure a challenging position in a reputed organization where I can effectively contribute my skills, grow my technical knowledge, and gain real-world experience while being a valuable asset to the team.
                </p>
              </div>

              {/* Technical Skills Summarized */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-[#f54900] border-b border-border pb-1.5 mb-3">Key Competencies</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-semibold text-foreground block mb-1">Languages</span>
                    <span className="text-muted-foreground">C, C++, Python, Java, JavaScript, TypeScript</span>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground block mb-1">Web Development</span>
                    <span className="text-muted-foreground">HTML5, CSS3, React, Next.js, Angular, Node.js, Express.js</span>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground block mb-1">Databases</span>
                    <span className="text-muted-foreground">MongoDB, PostgreSQL, MySQL, SQLite, Firebase, Supabase</span>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground block mb-1">Tools &amp; Dev</span>
                    <span className="text-muted-foreground">Git, Docker, Figma, Postman, Vercel, Netlify, VS Code</span>
                  </div>
                </div>
              </div>

              {/* Academic Overview */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-[#f54900] border-b border-border pb-1.5 mb-3">Education Timeline</h4>
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="flex justify-between items-center text-xs font-semibold text-foreground">
                      <span>Erode Sengunthar Engineering College</span>
                      <span className="text-[#f54900]">2024 - 2026</span>
                    </div>
                    <p className="text-xs text-muted-foreground italic mt-0.5">MCA &mdash; CGPA: 80%</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-xs font-semibold text-foreground">
                      <span>KSR College of Arts and Science</span>
                      <span className="text-[#f54900]">2020 - 2023</span>
                    </div>
                    <p className="text-xs text-muted-foreground italic mt-0.5">BCA &mdash; CGPA: 80%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications & Interests (Right Side) */}
            <div className="md:col-span-4 flex flex-col gap-8">
              {/* Certifications */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-[#f54900] border-b border-border pb-1.5 mb-3">Certifications</h4>
                <div className="flex flex-col gap-3 text-xs">
                  <div>
                    <span className="font-semibold text-foreground block">MEAN Stack Developer</span>
                    <span className="text-muted-foreground italic">Q Tree Technologies, Coimbatore</span>
                    <span className="text-[10px] text-muted-foreground block mt-0.5">Jul 2023 - Dec 2023</span>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground block">Microsoft Office &amp; OOP in C++</span>
                    <span className="text-muted-foreground italic">CSC Training Center, Erode</span>
                    <span className="text-[10px] text-muted-foreground block mt-0.5">Jan 2020 - Mar 2020</span>
                  </div>
                </div>
              </div>

              {/* Personal Dossier / Hobbies */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-[#f54900] border-b border-border pb-1.5 mb-3">Interests</h4>
                <div className="flex flex-wrap gap-1.5">
                  {['Astronomy', 'Cosmology', 'History', 'Photography', 'Animation', 'Wood Crafting', 'Star Gazing', 'Blogging'].map((interest, i) => (
                    <span key={i} className="text-[10px] uppercase font-semibold border border-border px-2 py-0.5 rounded text-muted-foreground bg-muted/20">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ResumePage;
