import React from 'react';
import { motion } from 'motion/react';
import { CreepyButton } from '../components/ui/creepy-button';
import { AnimatedTitle } from '../components/ui/AnimatedTitle';
import { Link as RouterLink } from 'react-router-dom';

const About: React.FC = () => {
  const titleText = "Programmer,\nDeveloper,\nWeb-Designer";

  // Split title by lines to render each on a new line
  const titleLines = titleText.split('\n');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.01,
        delayChildren: 0,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  } as const;

  return (
    <section
      id="about-me-section"
      className="about-section relative z-10 overflow-y-clip will-change-auto font-clash select-none w-full bg-transparent"
    >
      <div className="w-[97%] max-w-384 mx-auto bg-background py-16 px-6 sm:px-8 lg:py-24 lg:px-16">

        {/* Header */}
        <header className="mb-12 border-b border-dashed border-neutral-800 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-[#f54900] text-sm uppercase tracking-widest font-semibold">
              நான்
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold uppercase tracking-tight mt-2 text-foreground leading-none">
              <AnimatedTitle text="About Me " />
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md font-clash text-base">
            A look into my background, my passion for crafting memorable web animations, and my creative philosophy.
          </p>
        </header>

        {/* ── Row 1: Arrow + Animated Heading ── */}
        <div className="grid grid-cols-12 md:gap-x-8">
          {/* Arrow — hidden on mobile */}
          <div className="hidden md:flex md:col-span-4 overflow-hidden items-start">
            <motion.svg
              id="down-arrow-2"
              stroke="currentColor"
              fill="none"
              strokeWidth="1.25"
              viewBox="6 6 12 12"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="m-0 size-20 p-0 text-foreground"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ x: "-100%" }}
              whileInView={{ x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
            >
              <line x1="7" y1="7" x2="17" y2="17" />
              <polyline points="17 7 17 17 7 17" />
            </motion.svg>
          </div>

          {/* Heading */}
          <div className="col-span-full md:col-span-10 md:col-start-3 lg:col-span-6 lg:col-start-7">
            <h3
              id="little-bit-about-me"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7.5xl leading-none font-extrabold uppercase text-foreground text-left lg:text-right"
            >
              <motion.span
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="inline"
              >
                {titleLines.map((line, lineIndex) => (
                  <div key={lineIndex} className="block overflow-hidden">
                    <span className="inline-block whitespace-nowrap">
                      {line.split("").map((char, charIndex) => (
                        <motion.span
                          key={charIndex}
                          variants={charVariants}
                          className="inline-block"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  </div>
                ))}
              </motion.span>
            </h3>
          </div>
        </div>

        {/* ── Row 2: Image + About Text ── */}
        <div className="grid grid-cols-12 md:gap-x-8 mt-6 py-8 sm:py-12">
          {/* Profile image */}
          <div className="col-span-full md:col-span-4 content-end rounded-lg select-none pointer-events-none">
            <motion.img
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              src="/DrManhatten.jpeg"
              loading="lazy"
              className="about-profile-img aspect-1/1.5 w-full rounded-lg object-cover object-top"
              alt="Headshot of M.K. Lingeshwarma"
            />
          </div>

          {/* Content column */}
          <div className="col-span-11 mt-10 md:mt-0 md:col-span-8 md:col-start-6 flex flex-col justify-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl sm:text-2xl lg:text-3xl relative w-full max-w-[40ch] leading-snug font-medium text-foreground text-balance"
            >
              With a passion for design and development, I take projects from
              ideation to launch, ensuring a seamless journey that leaves a lasting
              positive impact on the digital landscape and your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-muted-foreground mt-[5%] flex flex-col sm:flex-row justify-start gap-6 sm:gap-20"
            >
              <p className="text-xs sm:text-sm text-muted-foreground/85 text-center text-nowrap uppercase tracking-widest font-semibold">
                ( ABOUT ME )
              </p>
              <div className="flex flex-col items-start gap-6 w-full sm:max-w-[40ch]">
                <p className="font-clash text-md md:text-lg w-full text-balance leading-relaxed">
                  Creating great web experiences is my primary focus. I ensure each
                  project leaves users with a feel-good sensation through meticulous
                  attention to detail and user-centric design principles.
                  <br /><br />
                  When I'm not immersed in web development, you can find me
                  vibeing <span className='text-[#1DB954]'>Harris Jeyaraj</span> songs on
                  <a href="https://open.spotify.com/artist/29aw5YCdIw2FEXYyAJZI8l" target='blank'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 inline-block text-[#1DB954] align-middle mx-1"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.785-8.892-.982-.336.075-.67-.136-.746-.472-.075-.336.136-.67.472-.746 3.856-.882 7.15-.506 9.822 1.13.295.18.387.565.204.863zm1.224-2.724c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.075-1.185-.413.125-.847-.107-.972-.52-.125-.413.107-.847.52-.972 3.666-1.112 8.237-.57 11.34 1.34.368.225.488.706.26 1.077zm.106-2.833C14.384 8.71 8.563 8.52 5.176 9.548c-.54.163-1.112-.147-1.275-.687-.163-.54.147-1.112.687-1.275 3.89-1.182 10.32-.96 14.39 1.456.485.287.643.91.356 1.396-.287.485-.91.643-1.396.356z" /></svg>
                  </a>
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                  <RouterLink to="/about#about-title">
                    <CreepyButton>
                      View More
                    </CreepyButton>
                  </RouterLink>

                  {/* GitHub */}
                  <a
                    href="https://github.com/LW-8877"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="group flex items-center justify-center w-10 h-10 border border-border hover:border-primary hover:text-primary text-muted-foreground transition-all duration-200"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com/in/lingeshwarma-mk"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="group flex items-center justify-center w-10 h-10 border border-border hover:border-primary hover:text-primary text-muted-foreground transition-all duration-200"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
