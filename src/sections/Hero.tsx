import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion } from 'motion/react';
import { CreepyButton } from '../components/ui/creepy-button';
import { TextFlip } from '../components/text-flip';
import BrandMarquee from '../components/BrandMarquee';
import Dither from '../components/Dither';

const Lanyard = lazy(() => import('../components/Lanyard'));

export default function Hero({ isLoaded = false }: { isLoaded?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-transparent overflow-hidden select-none">
      <div className="w-[97%] max-w-384 mx-auto min-h-[calc(100vh-5rem)] bg-background mt-[3vh] font-clash overflow-hidden">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-5rem)]">

          {/* Left Layout */}
          <div className="flex flex-col justify-start gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 p-4 pt-10 sm:p-6 sm:pt-14 md:p-8 md:pt-16 lg:p-10 lg:pt-20 xl:p-12 xl:pt-24 border-r-0 lg:border-r border-dashed border-neutral-800">

            {/* Introduction */}
            <div>
              <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm uppercase tracking-widest leading-relaxed text-muted-foreground">
                I AM <span className="text-[#f54900] font-semibold">LINGESWARMA</span>, A FULL-STACK DEVELOPER SPECIALIZING IN BUILDING MODERN, RESPONSIVE WEB &amp; MOBILE APPLICATIONS.
              </p>
            </div>

            {/* Headline with Dither Effect */}
            <div className="w-full mt-10 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24">

              {/* ——— Dither band: sits ABOVE the text, never overlaps ——— */}
              <div
                className="hidden sm:block relative w-full scale-x-[-1] scale-y-[-1] -mt-10 sm:-mt-14 md:-mt-18 lg:-mt-24 xl:-mt-30 mb-2 sm:mb-3 md:mb-4"
                style={{ height: 'clamp(50px, 12vw, 170px)' }}
              >
                {/* SVG clip-path definition */}
                <svg className="absolute" width="0" height="0" aria-hidden="true">
                  <defs>
                    <clipPath id="hero-staircase-clip" clipPathUnits="objectBoundingBox">
                      {/*
                        Staircase descending left-to-right in 3 steps:
                        Step 1 (top-left block):  x 0→0.28, y 0→1.0
                        Step 2 (middle block):    x 0.28→0.72, y 0.15→1.0
                        Step 3 (right block):     x 0.72→1.0, y 0.40→1.0
                        Connected with tiny Q curves at each step corner.
                      */}
                      <path d="
                        M 0.02,0
                        H 0.26
                        Q 0.28,0 0.28,0.03
  
                        V 0.12
                        Q 0.28,0.15 0.30,0.15
                        H 0.70
                        Q 0.72,0.15 0.72,0.18
  
                        V 0.37
                        Q 0.72,0.40 0.74,0.40
                        H 0.98
                        Q 1.0,0.40 1.0,0.43
  
                        V 0.97
                        Q 1.0,1.0 0.98,1.0
                        H 0.02
                        Q 0,1.0 0,0.97
                        V 0.03
                        Q 0,0 0.02,0
                        Z
                      " />
                    </clipPath>
                  </defs>
                </svg>

                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: 'url(#hero-staircase-clip)',
                    WebkitClipPath: 'url(#hero-staircase-clip)',
                  }}
                >
                  {isInView ? (
                    <Dither
                      waveColor={[0.96, 0.29, 0.0]}
                      disableAnimation={false}
                      enableMouseInteraction={true}
                      mouseRadius={0.3}
                      colorNum={4}
                      waveAmplitude={0.3}
                      waveFrequency={3}
                      waveSpeed={0.05}
                    />
                  ) : (
                    <div className="w-full h-full bg-[#f54900] opacity-80" />
                  )}
                </div>
              </div>

              {/* ——— Hero text: below the dither, no overlap ——— */}
              <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2">
                <span className="text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg uppercase tracking-widest text-muted-foreground -mt-6 sm:-mt-8 md:-mt-12 lg:-mt-20 mb-0.5 sm:mb-1 md:mb-2">
                  I am a
                </span>

                {/* Fixed-height wrapper prevents layout shift during flip */}
                <h1
                  className="font-medium tracking-tight leading-[1.1] text-foreground"
                  style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
                >
                  <span
                    className="inline-block overflow-hidden align-bottom"
                    style={{ height: '1.15em', minWidth: '4ch' }}
                  >
                    <TextFlip
                      className="text-[#f54900]"
                      interval={2.5}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      variants={{
                        initial: { y: '-100%', opacity: 0 },
                        animate: { y: '0%', opacity: 1 },
                        exit: { y: '100%', opacity: 0 },
                      }}
                    >
                      <span>Developer</span>
                      <span>Designer</span>
                      <span>Creator</span>
                    </TextFlip>
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl max-w-md md:max-w-lg lg:max-w-xl font-clash leading-relaxed mt-4 sm:mt-5 md:mt-6">
                I build scalable applications and high-fidelity digital solutions that bridge the gap between complex engineering and elegant design.
              </p>

              {/* Marquee */}
              <div className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 w-full overflow-hidden border-y border-[#ffffe3] dark:border-neutral-800 bg-primary dark:bg-background">
                <BrandMarquee compact={true} />
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <a
                href="#projects"
                className="inline-block focus-visible:outline-2 focus-visible:outline-[#f54900] focus-visible:outline-offset-4 rounded-sm"
              >
                <CreepyButton className="h-9 sm:h-10 md:h-11 lg:h-12 xl:h-14 w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48 text-[10px] sm:text-xs md:text-sm uppercase tracking-wider font-semibold rounded-none whitespace-nowrap">
                  View my work
                </CreepyButton>
              </a>
            </div>
          </div>

          {/* Right Layout - Lanyard / Optimized Fallback (Hidden completely on mobile) */}
          <div className="hidden md:flex relative min-h-[350px] lg:min-h-full bg-background items-center justify-center overflow-hidden">
            <div className="w-full h-full flex items-center justify-center relative z-10 p-4">
              {(() => {
                // Detect slow network connection (effectiveType: 'slow-2g' | '2g' | '3g' or saveData is on)
                const conn = (navigator as any).connection;
                const isSlowNetwork = conn && (conn.saveData || ['slow-2g', '2g', '3g'].includes(conn.effectiveType));

                if (isInView && !isSlowNetwork) {
                  return (
                    <Suspense fallback={
                       <div className="w-full max-w-[340px] aspect-3/4 flex items-center justify-center relative">
                         <img
                           src="https://i.ibb.co/0jbGjxpt/omnilanyard.png"
                           alt="Loading Lanyard"
                           fetchPriority="high"
                           className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(245,73,0,0.2)] animate-pulse"
                         />
                       </div>
                     }>
                       <Lanyard
                         isLoaded={isLoaded}
                         lanyardImage="https://i.ibb.co/VWcxJNX8/lanyard.png"
                         lanyardWidth={1}
                       />
                     </Suspense>
                   );
                 } else {
                   return (
                     <motion.div
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.8, ease: 'easeOut' }}
                       className="w-full max-w-[340px] aspect-3/4 flex items-center justify-center relative"
                     >
                       <motion.img
                         src="https://i.ibb.co/0jbGjxpt/omnilanyard.png"
                         alt="Lanyard Mockup"
                         fetchPriority="high"
                         className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(245,73,0,0.2)]"
                         animate={{
                           y: [0, -12, 0],
                         }}
                         transition={{
                           duration: 4,
                           repeat: Infinity,
                           ease: "easeInOut"
                         }}
                      />
                    </motion.div>
                  );
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}