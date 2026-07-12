import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatedTitle } from '../components/ui/AnimatedTitle';

interface Internship {
  id: string;
  companyName: string;
  role: string;
  period: string;
  location: string;
  image: string;
  year: string;
  description: string;
  achievements: string[];
  skills: string[];
  icon: React.ReactNode;
}

const internshipsData: Internship[] = [
  {
    id: 'pitowings',
    companyName: 'Pitowings Predictive Cybersecurity',
    role: 'Cyber Security Intern',
    period: 'May 2026 - Present',
    location: 'Remote',
    image: '/exp/pitowings.png',
    year: '2026',
    description: 'Assisting in predictive threat hunting, monitoring firewall and security event logs, and analyzing vulnerabilities to secure cloud infrastructure.',
    achievements: [
      'Performed predictive threat hunting and firewall log monitoring to identify anomalous network activity.',
      'Conducted vulnerability assessments and security auditing across simulated cloud server infrastructures.',
      'Drafted incident response guidelines and recommended system hardening protocols.'
    ],
    skills: ['Postman', 'Selenium', 'JMeter', 'Cypress', 'OWASP ZAP', 'Burp Suite'],
    icon: <img src="/pitowings.png" alt="Pitowings Logo" className="w-full h-full object-contain" />
  },
  {
    id: 'thiran',
    companyName: 'THIRAN360AI',
    role: 'MERN  Stack  Developer',
    period: 'May 2026',
    location: 'Gobichettipalayam',
    image: '/exp/360.png',
    year: '2026',
    description: 'Developed modern full-stack web applications. Participated in AI API model integrations and polished front-end user experience.',
    achievements: [
      'Designed and engineered reactive front-end states using React and Tailwind CSS.',
      'Implemented secure REST API endpoints with Node.js, Express, and MongoDB.',
      'Integrated AI LLM APIs to deliver intelligent, contextual chat completions.'
    ],
    skills: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Tailwind'],
    icon: <img src="/Thiran.png" alt="Thiran Logo" className="w-full h-full object-contain" />
  }
];

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  }),
  hidden: {
    filter: 'blur(8px)' as const,
    y: 20,
    opacity: 0,
  },
} as const;

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative z-10 w-full bg-transparent font-clash select-none py-0">
      <div className="w-[97%] max-w-384 mx-auto bg-background px-6 sm:px-10 lg:px-16 py-4 border-t border-dashed border-border">
        
        {/* Astro Layout Row: grid lg:grid-cols-12 items-start */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* LEFT COLUMN: aside className="lg:col-span-4 lg:sticky lg:top-24 self-start" */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 self-start pt-4 lg:pt-8 border-b border-b-neutral-200 dark:border-b-neutral-800 lg:border-b-0 lg:border-r lg:border-r-neutral-200 dark:lg:border-r-neutral-800 pb-4 lg:pb-0 lg:pr-8">
            <div className="space-y-6">
              <span className="text-primary text-xs font-clash font-bold uppercase tracking-widest block" style={{ letterSpacing: '0.2em', wordSpacing: '0.1em' }}>
                Professional Journey
              </span>
              <h2 className="text-[clamp(2.5rem,4.5vw,4rem)] font-extrabold uppercase tracking-tight text-foreground leading-none" style={{ letterSpacing: '0.05em', wordSpacing: '0.1em' }}>
                <AnimatedTitle text="Experience" />
              </h2>
              <p 
                className="text-muted-foreground text-sm sm:text-base leading-relaxed"
                style={{ letterSpacing: '0.05em', wordSpacing: '0.15em', lineHeight: '1.8' }}
              >
                Hands-on internship experiences building full-stack applications and hardening systems against cyber threats.
              </p>
            </div>
          </aside>

          {/* RIGHT COLUMN: main className="lg:col-span-8" */}
          <main className="lg:col-span-8 lg:border-l lg:border-neutral-200 dark:lg:border-neutral-800 pt-4 lg:pt-8 lg:pl-8 flex flex-col gap-6 lg:gap-8">
            {internshipsData.map((intern, i) => (
              <motion.div
                key={intern.id}
                custom={i}
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="faq__item relative bg-background p-6 lg:p-8 border border-neutral-200/50 dark:border-neutral-800/50 rounded-none shadow-xs transition-all duration-300 hover:shadow-md"
              >
                
                {/* Year Label top-right */}
                <div 
                  className="absolute top-6 right-6 text-xs font-bold uppercase tracking-widest px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-none"
                  style={{ letterSpacing: '0.15em', wordSpacing: '0.1em' }}
                >
                  {intern.year}
                </div>

                {/* Company & Role */}
                <div className="flex items-center gap-3 mb-4 pr-16">
                  <div className="w-10 h-10 rounded-none bg-transparent flex items-center justify-center shrink-0">
                    {intern.icon}
                  </div>
                  <div>
                    <h3 
                      className="text-lg leading-6 font-semibold sm:text-xl sm:leading-7 lg:text-2xl lg:leading-8 uppercase text-foreground tracking-tight"
                      style={{ letterSpacing: '0.075em', wordSpacing: '0.12em', lineHeight: '1.6' }}
                    >
                      {intern.companyName}
                    </h3>
                    <span 
                      className="text-xs font-bold uppercase text-primary mt-1 block"
                      style={{ letterSpacing: '0.1em', wordSpacing: '0.08em' }}
                    >
                      {intern.role}
                    </span>
                  </div>
                </div>

                {/* Banner Image - Natural aspect ratio with block, no cropping */}
                <div className="relative w-full overflow-hidden rounded-none border border-neutral-200 dark:border-neutral-850 mb-6 bg-neutral-900/10">
                  <img 
                    src={intern.image} 
                    alt={intern.companyName} 
                    className="w-full h-auto block grayscale opacity-90 transition-all duration-500 hover:grayscale-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/800x340/121212/ffffff?text=${encodeURIComponent(intern.companyName)}`;
                    }}
                  />
                </div>

                <div className="faq__item__text text-base leading-7 sm:text-lg sm:leading-8 lg:text-xl lg:leading-9 mb-6 font-clash-light text-muted-foreground">
                  <p 
                    className="mb-6 text-foreground/80 leading-relaxed font-clash-light text-sm sm:text-base"
                    style={{ letterSpacing: '0.06em', wordSpacing: '0.18em', lineHeight: '1.9' }}
                  >
                    {intern.description}
                  </p>
                  
                  <ul className="space-y-5 mb-6">
                    {intern.achievements.map((ach, j) => (
                      <li 
                        key={j} 
                        className="flex items-start gap-3 text-xs sm:text-sm text-muted-foreground font-clash-light leading-relaxed"
                        style={{ letterSpacing: '0.05em', wordSpacing: '0.15em', lineHeight: '1.8' }}
                      >
                        <img src="/omnitrixBullets.png" alt="Bullet" className="w-3.5 h-3.5 mt-1 shrink-0 object-contain" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills Section */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {intern.skills.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1 text-xs font-clash font-medium uppercase tracking-wider border border-neutral-300 dark:border-neutral-700 text-muted-foreground bg-neutral-100 dark:bg-neutral-900 rounded-none"
                      style={{ letterSpacing: '0.08em', wordSpacing: '0.05em' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Metadata details */}
                <div 
                  className="flex items-center gap-4 mt-4 text-xs font-clash font-bold uppercase tracking-wider text-muted-foreground/60"
                  style={{ letterSpacing: '0.1em', wordSpacing: '0.08em' }}
                >
                  <span className="flex items-center gap-1" style={{ letterSpacing: '0.08em' }}>
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    {intern.period}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1" style={{ letterSpacing: '0.08em' }}>
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    {intern.location}
                  </span>
                </div>

              </motion.div>
            ))}
          </main>

        </div>

      </div>
    </section>
  );
};

export default Experience;