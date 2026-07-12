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
      <div className="w-[97%] max-w-384 mx-auto bg-background py-8 px-6 sm:px-8 lg:px-16">
        
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

          {/* ═══════════ Header overlay — sits on top of clip-path image ═══════════ */}
          <div className="flex justify-between items-center mb-8 w-[85%] absolute lg:top-4 md:top-0 sm:-top-2 -top-3 z-10">
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
            <div className="flex gap-3">
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
                className="w-10 h-10 flex items-center justify-center text-[#f54900] opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-200 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
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
                className="w-10 h-10 flex items-center justify-center text-[#f54900] opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-200 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
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
                className="w-10 h-10 flex items-center justify-center text-[#f54900] opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-200 cursor-pointer"
              >
                <img src="/mail.svg" alt="Email" width={24} height={24} className="w-6 h-6 object-contain" />
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
