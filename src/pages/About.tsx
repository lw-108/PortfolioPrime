import React from 'react';
import { motion } from 'motion/react';

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
              src="/Madben2.png"
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
              <p className="font-clash text-sm md:text-base w-full text-balance sm:max-w-[40ch] leading-relaxed">
                Creating great web experiences is my primary focus. I ensure each
                project leaves users with a feel-good sensation through meticulous
                attention to detail and user-centric design principles.
                <br /><br />
                When I'm not immersed in web development and design, you can find me
                sharing insights about my freelance journey on <i className="font-serif">𝕏</i>,
                loudly, playing music (Funk), or just relaxing.
              </p>
            </motion.div>
          </div>
        </div>

      </div>

    </section>
  );
};

export default AboutPage;