import { CreepyButton } from '../components/ui/creepy-button';
import { TextFlip } from '../components/text-flip';
import BrandMarquee from '../components/BrandMarquee';
import Lanyard from '../components/Lanyard';
import Dither from '../components/Dither';

export default function Hero({ isLoaded = false }: { isLoaded?: boolean }) {
  return (
    <div className="w-full bg-transparent overflow-hidden select-none">
      <div className="w-[97%] max-w-384 mx-auto min-h-[calc(100vh-5rem)] bg-background font-clash overflow-hidden">
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

          {/* Right Layout - Lanyard */}
          <div className="relative min-h-[200px] sm:min-h-[250px] md:min-h-[350px] lg:min-h-full bg-background flex items-center justify-center overflow-hidden">
            <div className="w-full h-full flex items-center justify-center relative z-10 p-2 sm:p-4">
              <Lanyard
                isLoaded={isLoaded}
                lanyardImage="/lanyard.png"
                lanyardWidth={1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}