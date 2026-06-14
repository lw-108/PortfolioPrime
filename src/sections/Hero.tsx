import { CreepyButton } from '../components/ui/creepy-button';
import { TextFlip } from '../components/text-flip';
import { motion } from 'motion/react';
import BrandMarquee from '../components/BrnadMarquee';
import Lanyard from '../components/Lanyard';

export default function Hero() {
  return (
    <div className="relative w-full min-h-[calc(100vh-5rem)] flex items-stretch font-clash select-none">

      {/* Outer Grid Wrapper */}
      <div className="max-w-384 mx-auto w-full grid lg:grid-cols-2 border-x border-dashed border-neutral-800  bg-background">

        {/* Left Layout (Content) */}
        <div className="flex flex-col justify-between p-8 lg:p-12 border-r border-dashed border-neutral-800 min-w-0">

          {/* Top description */}
          <div className="pb-8 border-b border-neutral-800">
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

          {/* Middle Headline */}
          <div className="py-12 border-b border-neutral-800">
            <div className="flex flex-col gap-2">
              <span className="text-lg md:text-xl uppercase tracking-widest text-muted-foreground">
                I am a
              </span>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1] text-foreground">
                <TextFlip className="text-[#f54900]" as={motion.span}>
                  <span>Developer</span>
                  <span>Designer</span>
                  <span>Creator</span>
                </TextFlip>
              </h1>
            </div>
            <p className="mt-6 text-muted-foreground text-lg max-w-lg font-clash">
              I build scalable applications and high-fidelity digital solutions that bridge the gap between complex engineering and elegant design.
            </p>
            <div className="mt-8 w-full overflow-hidden border-y border-dashed border-[#ffffe3] dark:border-neutral-800 bg-primary dark:bg-background">
              <BrandMarquee compact={true} />
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-8">
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
              lanyardImage="/lanyard.png"
              lanyardWidth={1.8}
            />
          </div>

        </div>

      </div>
    </div>
  );
}
