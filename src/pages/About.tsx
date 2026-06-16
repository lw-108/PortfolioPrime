import React from 'react';
import { motion } from 'motion/react';
import { CreepyButton } from '../components/ui/creepy-button';

const AboutPage: React.FC = () => {
  const titleText = "Programmer, Developer,   Web-Designer/";

  // Split title by words/whitespace to keep words intact
  const titleParts = titleText.split(/(\s+)/);

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
      className="about-section relative z-10 overflow-y-clip will-change-auto font-clash select-none"
    >
      <div className="max-w-384 mx-auto w-full border-x border-dashed border-neutral-800 bg-background py-16 px-6 sm:px-8 lg:py-24 lg:px-16">

        {/* Header */}
        <header className="mb-12 border-b border-dashed border-neutral-800 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-[#f54900] text-sm uppercase tracking-widest font-semibold">
              நான்
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold uppercase tracking-tight mt-2 text-foreground leading-none">
              About Me
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md font-clash text-base">
            A look into my background, my passion for crafting memorable web animations, and my creative philosophy.
          </p>
        </header>

        {/* ── Row 1: Arrow + Animated Heading ── */}
        <div className="grid grid-cols-12 md:gap-x-8">
          {/* Arrow — hidden on mobile, matches the Vue hide-on-mobile */}
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

          {/* Heading — col-span-full on small, 8 cols starting at 6 on md+ */}
          <div className="col-span-full md:col-span-8 md:col-start-6">
            <h3
              id="little-bit-about-me"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none font-extrabold uppercase text-foreground"
            >
              <motion.span
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="inline"
              >
                {titleParts.map((part, partIndex) => {
                  const isSpace = /^\s+$/.test(part);
                  if (isSpace) {
                    return (
                      <span
                        key={partIndex}
                        className="inline-block"
                        style={{ width: `${0.3 * part.length}em` }}
                      >
                        {'\u00A0'.repeat(part.length)}
                      </span>
                    );
                  }
                  return (
                    <span key={partIndex} className="inline-block whitespace-nowrap">
                      {part.split("").map((char, charIndex) => (
                        <motion.span
                          key={charIndex}
                          variants={charVariants}
                          className="inline-block"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  );
                })}
              </motion.span>
            </h3>
          </div>
        </div>

        {/* ── Row 2: Image + About Text ── */}
        <div className="grid grid-cols-12 md:gap-x-8 mt-6 py-8 sm:py-12">
          {/* Profile image — col-span-full on mobile, 4 cols on md+ */}
          <div className="col-span-full md:col-span-4 content-end rounded-lg select-none pointer-events-none">
            <motion.img
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              src="/AboutMe.png"
              className="about-profile-img aspect-1/1.5 w-full rounded-lg object-cover object-top"
              alt="Headshot of M.K. Lingeshwarma"
            />
          </div>

          {/* Content column — col-span-11 on mobile, 8 cols at col-start-6 on md+ */}
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
                <CreepyButton onClick={() => window.open('https://github.com', '_blank')}>
                  View More
                </CreepyButton>
              </div>
            </motion.div>
          </div>
        </div>

      </div>

    </section>
  );
};

export default AboutPage;