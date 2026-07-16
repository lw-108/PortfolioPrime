import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import CreepyButton from '@/components/ui/creepy-button';
import { techStackItems } from '../lib/tech-data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 180,
    },
  },
} as const;

export const Skills: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const getIconForSkill = (name: string): string => {
    const normalised = name.toLowerCase().trim().replace(/\.js$/, '');
    const found = techStackItems.find(t => {
      const titleNormal = t.title.toLowerCase().trim().replace(/\.js$/, '');
      return titleNormal === normalised || t.title.toLowerCase() === name.toLowerCase();
    });
    if (found) return found.image;

    // Custom fallbacks for core concepts or missing items
    const fallbacks: Record<string, string> = {
      "dsa": "https://hackr.io/tutorials/learn-data-structures-algorithms/logo/logo-data-structures-algorithms?ver=1782916304",
      "dbms": "https://www.svgrepo.com/show/458454/database-1.svg",
      "oop": "https://www.svgrepo.com/show/439241/object-oriented-programming.svg",
      "operating systems": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/500px-Tux.svg.png",
      "os": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/500px-Tux.svg.png",
      "system design": "https://static.thenounproject.com/png/4382546-200.png",
      "sql": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Sql_data_base_with_logo.svg",
      "git": "https://upload.wikimedia.org/wikipedia/commons/c/c5/Git_Icon.svg",
      "postman": "https://www.svgrepo.com/show/354202/postman-icon.svg",
    };
    return fallbacks[name.toLowerCase().trim()] || "https://i.ibb.co/TDbW3cSB/omnitrix-Bullets.png";
  };

  const skillsData = [
    {
      category: "Languages & Tools",
      items: ["C", "C++", "Python", "Java", "HTML5", "CSS3", "JavaScript", "TypeScript", "SASS", "Git", "GitHub", "Postman", "Figma", "Docker", "Netlify", "Vercel", "GIMP", "npm"]
    },
    {
      category: "Frameworks & Libraries",
      items: ["Bootstrap", "jQuery", "Tailwind CSS", "Framer Motion", "GSAP", "React", "Next.js", "Three.js", "Angular", "Chart.js", "Node.js", "Express.js", "JWT", "OpenCV"]
    },
    {
      category: "Databases & Core CS",
      items: ["Firebase", "Supabase", "PostgreSQL", "SQLite", "MongoDB", "MySQL", "DSA", "DBMS", "OOP", "Operating Systems", "System Design"]
    }
  ];

  return (
    <section
      id="skills"
      className="relative z-10 w-full bg-transparent overflow-hidden select-none font-clash"
      onMouseMove={handleMouseMove}
    >
      {/* Side border rails */}
      <div className="w-[97%] max-w-384 mx-auto bg-background relative flex flex-col border-b border-dashed border-neutral-800">
        
        {/* Main Content Grid */}
        <div className="w-full px-6 sm:px-10 lg:px-16 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Huge Titles */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col justify-start text-left lg:sticky lg:top-28"
          >
            <h2 className="font-extrabold uppercase text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] tracking-tighter text-foreground/80 dark:text-neutral-300">
              <span className="block hover:text-[#f54900] transition-colors duration-300 cursor-default">Developer</span>
              <span className="block hover:text-[#f54900] transition-colors duration-300 cursor-default">Designer</span>
              <span className="block hover:text-[#f54900] transition-colors duration-300 cursor-default">Creator/</span>
            </h2>
          </motion.div>

          {/* Right Column: Skills Lists */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            {/* "Skills" Header */}
            <div className="text-left">
              <h3 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-foreground dark:text-neutral-100 font-heading">
                Skills
              </h3>
            </div>

            {/* List columns */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 text-left"
            >
              {skillsData.map((group, groupIdx) => (
                <motion.div 
                  key={groupIdx} 
                  variants={itemVariants}
                  className="flex flex-col gap-4"
                >
                  {/* Category Title */}
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#f54900] border-b border-dashed border-border pb-2">
                    {group.category}
                  </h4>
                  {/* Category Items */}
                  <ul className="flex flex-col gap-2.5">
                    {group.items.map((skill, skillIdx) => (
                      <li 
                        key={skillIdx} 
                        className="text-xs sm:text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 cursor-pointer flex items-center group relative py-1"
                        onMouseEnter={() => {
                          if (!isMobile) {
                            setHoveredSkill(skill);
                            setHoveredIcon(getIconForSkill(skill));
                          }
                        }}
                        onMouseLeave={() => {
                          setHoveredSkill(null);
                          setHoveredIcon(null);
                        }}
                      >
                        {/* Text Flipping Container */}
                        <span className="h-[1.25em] overflow-hidden select-none block relative flex-1">
                          <span className="block translate-y-0 transition-all duration-300 ease-in-out group-hover:-translate-y-full">
                            {skill}
                          </span>
                          <span className="block transition-all duration-300 ease-in-out group-hover:-translate-y-full text-[#f54900] absolute top-full left-0 w-full">
                            {skill}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>

        {/* Bottom Footer with View More Button */}
        <div className="w-full">
          <div className="flex justify-end items-center py-4 px-6 sm:px-8 lg:px-16">
            <CreepyButton onClick={() => navigate('/skills')}>
              View More
            </CreepyButton>
          </div>
        </div>

      </div>

      {/* Cursor Follower Tech Icon Card (Desktop Only) */}
      <AnimatePresence>
        {!isMobile && hoveredIcon && (
          <motion.div
            className="fixed pointer-events-none z-50 w-16 h-16 rounded-lg border-2 border-foreground bg-background shadow-2xl p-1.5 flex items-center justify-center overflow-hidden"
            style={{
              left: mousePos.x,
              top: mousePos.y,
              x: "15px", // offset to right of cursor
              y: "-50%", // centered vertically with cursor
            }}
            initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.6, rotate: 15 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <img
              src={hoveredIcon}
              alt={hoveredSkill || "tech icon"}
              className="w-full h-full object-contain rounded-md"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Skills;