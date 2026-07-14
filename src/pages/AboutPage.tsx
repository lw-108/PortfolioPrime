import React from 'react';
import { motion } from 'motion/react';
import { AnimatedTitle } from '../components/ui/AnimatedTitle';

/* ─── Reveal variant factories (with proper Easing literal types) ─── */
const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: 'blur(0px)' as const,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
  hidden: {
    filter: 'blur(10px)',
    y: -20,
    opacity: 0,
  },
} as const;

const scaleVariants = {
  visible: (i: number) => ({
    opacity: 1,
    filter: 'blur(0px)' as const,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
  hidden: {
    filter: 'blur(10px)',
    opacity: 0,
  },
} as const;

/* ─── About Page ─── */
const AboutPage: React.FC = () => {
  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <section
      id="about-me-section"
      className="about-section relative z-10 overflow-y-clip will-change-auto font-clash select-none bg-transparent"
    >
      <div className="w-[97%] max-w-384 mx-auto bg-background mt-[3vh] pt-8 sm:pt-12 pb-8 px-6 sm:px-8 lg:px-16">
        
        {/* Header */}
        <div id="about-title" className="border-b border-dashed border-neutral-800 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div>
            <span className="text-[#f54900] text-sm uppercase tracking-widest font-semibold">
              நான்
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold uppercase tracking-tight mt-2 text-foreground leading-none">
              <AnimatedTitle text="About Me /" />
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md font-clash text-base">
            A look into my background, my passion for crafting memorable web animations, and my creative philosophy.
          </p>
        </div>

        <div className="relative">

          {/* ═══════════ Header overlay ═══════════ */}
          <div className="flex justify-between items-center mb-6 w-full z-10">
            {/* Label */}
            <motion.div
              custom={0}
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center gap-2 text-xl"
            >
              <span className="text-[#f54900] animate-spin">✱</span>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                நான்
              </span>
            </motion.div>

            {/* Social icons */}
            <div className="flex gap-4">
              {/* GitHub */}
              <motion.a
                custom={0}
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                href="https://github.com/LW-8877"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-full border border-neutral-800 hover:border-[#f54900] flex items-center justify-center text-muted-foreground hover:text-[#f54900] hover:scale-105 transition-all duration-300 cursor-pointer bg-neutral-900/50"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                custom={1}
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                href="https://linkedin.com/in/lingeshwarma-mk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full border border-neutral-800 hover:border-[#f54900] flex items-center justify-center text-muted-foreground hover:text-[#f54900] hover:scale-105 transition-all duration-300 cursor-pointer bg-neutral-900/50"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </motion.a>

              {/* Mail */}
              <motion.a
                custom={2}
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                href="mailto:lingeshwarma108@gmail.com"
                aria-label="Email"
                className="w-10 h-10 rounded-full border border-neutral-800 hover:border-[#f54900] flex items-center justify-center text-muted-foreground hover:text-[#f54900] hover:scale-105 transition-all duration-300 cursor-pointer bg-neutral-900/50"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </motion.a>
            </div>
          </div>

          {/* ═══════════ SVG Clip-Path Hero Image ═══════════ */}
          <motion.figure
            custom={4}
            variants={scaleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Stripe overlay */}
            <div
              className="absolute inset-0 w-full h-full opacity-[0.06] dark:opacity-[0.04] pointer-events-none select-none z-1"
              style={{
                backgroundImage: "url('/stripe.svg')",
                backgroundRepeat: 'repeat',
                backgroundSize: '16px 16px',
              }}
            />

            <svg
              className="w-full"
              width="100%"
              height="100%"
              viewBox="0 0 100 40"
            >
              <defs>
                <clipPath
                  id="about-clip-inverted"
                  clipPathUnits="objectBoundingBox"
                >
                  <path
                    d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z"
                    fill="#D9D9D9"
                  />
                </clipPath>
              </defs>
              <image
                clipPath="url(#about-clip-inverted)"
                preserveAspectRatio="xMidYMid slice"
                width="100%"
                height="100%"
                xlinkHref="/DrManhatten.jpeg"
              />
            </svg>
          </motion.figure>

          {/* ═══════════ Stats Row ═══════════ */}
          <div className="flex flex-wrap lg:justify-start justify-between items-center py-3 text-sm">
            <motion.div
              custom={5}
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex gap-4"
            >
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                <span className="text-[#f54900] font-bold">2+</span>
                <span className="text-muted-foreground">years of experience</span>
                <span className="text-neutral-700">|</span>
              </div>
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                <span className="text-[#f54900] font-bold">10+</span>
                <span className="text-muted-foreground">projects delivered</span>
              </div>
            </motion.div>

            
          </div>
        </div>

        {/* ═══════════ Main Content Grid (matching reference 3-col layout) ═══════════ */}
        <div className="grid md:grid-cols-3 gap-8 mt-4">

          {/* Left 2/3 — Heading + Description paragraphs */}
          <div className="md:col-span-2">
            {/* Animated heading — word-by-word spring reveal */}
            <h1 className="sm:text-4xl md:text-5xl text-2xl leading-[110%]! font-semibold text-foreground mb-8">
              <motion.span
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08, delayChildren: 1.2 } },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="inline"
              >
                {'Programmer, Developer, Web-Designer/'.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { y: 40, opacity: 0 },
                      visible: {
                        y: 0,
                        opacity: 1,
                        transition: { type: 'spring', stiffness: 250, damping: 30 },
                      },
                    }}
                    className="inline-block mr-[0.3em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.span>
            </h1>

            {/* Two-column description — exactly like reference */}
            <div className="grid md:grid-cols-2 gap-8 text-muted-foreground">
              <motion.div
                custom={10}
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="sm:text-base text-xs"
              >
                <p className="leading-relaxed text-justify font-clash">
                  With a passion for design and development, I take projects from
                  ideation to launch, ensuring a seamless journey that leaves a lasting
                  positive impact on the digital landscape and your business.
                </p>
              </motion.div>
              <motion.div
                custom={11}
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="sm:text-base text-xs"
              >
                <p className="leading-relaxed text-justify font-clash">
                  Creating great web experiences is my primary focus. I ensure each
                  project leaves users with a feel-good sensation through meticulous
                  attention to detail and user-centric design principles.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right 1/3 — Name, title, CTA */}
          <div className="md:col-span-1">
            <div className="text-right">
              <motion.div
                custom={12}
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-[#f54900] text-2xl font-bold mb-2"
              >
                MK  LINGESHWARMA
              </motion.div>
              <motion.div
                custom={13}
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-muted-foreground text-sm mb-8"
              >
                Full Stack Developer | UI Designer
              </motion.div>

              <motion.div
                custom={14}
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-6"
              >
                <p className="text-foreground font-medium mb-2">
                  When I'm not immersed in web dev, you'll find me vibeing
                </p>
                <p className="text-muted-foreground text-sm flex items-center justify-end gap-1">
                  <span className="text-[#1DB954] font-medium">Harris Jeyaraj</span>
                  songs on
                  <a href="https://open.spotify.com/artist/29aw5YCdIw2FEXYyAJZI8l" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 inline-block text-[#1DB954] align-middle mx-1"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.785-8.892-.982-.336.075-.67-.136-.746-.472-.075-.336.136-.67.472-.746 3.856-.882 7.15-.506 9.822 1.13.295.18.387.565.204.863zm1.224-2.724c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.075-1.185-.413.125-.847-.107-.972-.52-.125-.413.107-.847.52-.972 3.666-1.112 8.237-.57 11.34 1.34.368.225.488.706.26 1.077zm.106-2.833C14.384 8.71 8.563 8.52 5.176 9.548c-.54.163-1.112-.147-1.275-.687-.163-.54.147-1.112.687-1.275 3.89-1.182 10.32-.96 14.39 1.456.485.287.643.91.356 1.396-.287.485-.91.643-1.396.356z" /></svg>
                  </a>
                </p>
              </motion.div>

              <motion.div
                custom={15}
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex justify-end"
              >
              </motion.div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutPage;
