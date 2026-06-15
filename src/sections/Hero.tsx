import { CreepyButton } from '../components/ui/creepy-button';
import { TextFlip } from '../components/text-flip';
import { motion } from 'motion/react';
import BrandMarquee from '../components/BrnadMarquee';
import Lanyard from '../components/Lanyard';

import Dither from '../components/Dither';

export default function Hero({ isLoaded = false }: { isLoaded?: boolean }) {
  return (
    <div className="relative w-full min-h-[calc(100vh-5rem)] flex items-stretch font-clash select-none">

      {/* Outer Grid Wrapper */}
      <div className="max-w-384 mx-auto w-full grid lg:grid-cols-2 border-x border-dashed border-neutral-800  bg-background">

        {/* Left Layout (Content) */}
        <div className="flex flex-col justify-start gap-8 lg:gap-12 p-8 lg:p-12 border-r border-dashed border-neutral-800 min-w-0">

          {/* Top Wrapper to keep description and stripe shape compact */}
          <div className="flex flex-col">
            {/* Top description */}
            <div className="pb-8">
              <span className="text-sm uppercase tracking-widest text-muted-foreground ml-2">
                I AM
              </span>
              <span className="text-sm uppercase tracking-widest text-[#f54900] font-semibold px-1">
                LINGESHWARMA
              </span>
              <span className="text-sm uppercase tracking-widest text-muted-foreground">
                , A FULL-STACK DEVELOPER SPECIALIZING IN BUILDING MODERN, RESPONSIVE WEB & MOBILE APPLICATIONS.
              </span>
            </div>
          </div>

          {/* Middle Headline */}
          <div className="pb-12 mt-6 md:mt-8">
            {/* Heading and SVG Wrapper */}
            <div className="relative pt-6 pb-6 pr-4 min-h-[160px] md:min-h-[224px]">
              {/* The exact stepped stripe shape background cutout */}
              <div className="absolute inset-x-0 -top-12 h-[200px] md:-top-16 md:h-[250px] lg:-top-20 lg:h-[300px] pointer-events-none z-9998 scale-x-[-1]">
                {/* Inline SVG defining the scalable clip path with rounded corners */}
                <svg className="absolute" width="0" height="0" style={{ position: 'absolute' }}>
                  <defs>
                    <clipPath id="stripe-clip" clipPathUnits="objectBoundingBox">
                      <path d="M 0.02,0 H 0.98 Q 1,0 1,0.04 V 0.24 Q 1,0.28 0.98,0.28 H 0.76 Q 0.74,0.28 0.74,0.32 V 0.44 Q 0.74,0.48 0.72,0.48 H 0.27 Q 0.25,0.48 0.25,0.52 V 0.86 Q 0.25,0.90 0.23,0.90 H 0.02 Q 0,0.90 0,0.86 V 0.04 Q 0,0 0.02,0 Z" />
                    </clipPath>
                  </defs>
                </svg>

                {/* Dither clipped to the rounded stepped shape */}
                <div 
                  className="absolute inset-0 pointer-events-auto bg-background"
                  style={{ 
                    clipPath: 'url(#stripe-clip)', 
                    WebkitClipPath: 'url(#stripe-clip)' 
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

              {/* Foreground Content */}
              <div className="relative z-10 flex flex-col gap-2">
                <span className="text-sm md:text-xl uppercase tracking-widest text-muted-foreground mb-4">
                  I am a
                </span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1] text-foreground">
                  <TextFlip className="text-[#f54900]" as={motion.span}>
                    <span>Developer</span>
                    <span>Designer</span>
                    <span>Creator</span>
                  </TextFlip>
                </h1>
              </div>
            </div>

            {/* Paragraph and Marquee are outside the SVG wrapper */}
            <p className="text-muted-foreground text-base md:text-lg max-w-lg font-clash">
              I build scalable applications and high-fidelity digital solutions that bridge the gap between complex engineering and elegant design.
            </p>
            <div className="mt-4 md:mt-8 w-full overflow-hidden border-y-2 border-[#ffffe3] dark:border-neutral-800 bg-primary dark:bg-background">
              <BrandMarquee compact={true} />
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4">
            <a href="#projects" className="inline-block">
              <CreepyButton
                className="h-12 w-48 text-sm uppercase tracking-wider font-semibold rounded-none"
              >
                View my work
              </CreepyButton>
            </a>
          </div>

        </div>

        {/* Right Layout (Lanyard 3D component) */}
        <div className="relative min-h-[500px] lg:min-h-0 bg-background flex items-center justify-center overflow-hidden">
          <div className="w-full h-full min-h-[500px] lg:min-h-[600px] flex items-center justify-center relative z-10">
            <Lanyard
              isLoaded={isLoaded}
              lanyardImage="/lanyard.png"
              lanyardWidth={1.8}
            />
          </div>

        </div>

      </div>
    </div>
  );
}
