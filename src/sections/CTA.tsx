import React from 'react';
import { MiniGlobe } from '../components/ui/MiniGlobe';
import { CreepyButton } from '../components/ui/creepy-button';

interface CTAProps {
  title?: string;
  text?: string;
  buttonText?: string;
  buttonLink?: string;
  emailLink?: string;
}

export const CTA: React.FC<CTAProps> = ({
  title = "Let's Make it happen",
  text = 'Your design is a masterpiece waiting to become alive.',
  buttonText = 'Get in touch',
  buttonLink = 'https://wa.me/+919025464209',
  emailLink = 'mailto:lingeshwarma108@gmail.com'
}) => {
  return (
    <section id="cta" className="relative z-10 w-full bg-transparent pt-0 pb-0 px-0 overflow-hidden select-none font-clash">
      <div className="w-[97%] max-w-384 mx-auto bg-background relative px-4 sm:px-8 lg:px-12 py-12">
        <div className="group relative flex flex-col justify-between overflow-hidden p-8 sm:p-12 lg:p-24 min-h-[500px] lg:min-h-[600px] text-white">
          {/* Background color gradient using our primary color theme (Tailwind v4 bg-linear) */}
          <div className="absolute inset-0 z-0 bg-linear-to-br from-[#f54900] via-[#e24300] to-[#b33500]"></div>
          
          {/* Dot background texture overlay using dotlight.svg */}
          <div 
            className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-repeat"
            style={{
              backgroundImage: "url('/dotlight.svg')",
              backgroundSize: '24px 24px',
            }}
          ></div>

          {/* Pulsing circles background decoration */}
          <div className="pointer-events-none absolute inset-0 z-1 overflow-visible" aria-hidden="true">
            <span 
              className="absolute right-0 bottom-0 aspect-square rounded-full border border-dashed border-white/20 bg-white/5 transition-transform duration-2000 group-hover:scale-110 w-[110%] lg:w-[80%] animate-pulsing"
              style={{ animationDelay: '2s' }}
            ></span>
            <span 
              className="absolute right-0 bottom-0 aspect-square rounded-full border border-dashed border-white/20 bg-white/5 transition-transform duration-2000 group-hover:scale-110 w-[80%] lg:w-[60%] animate-pulsing"
              style={{ animationDelay: '1s' }}
            ></span>
            <span 
              className="absolute right-0 bottom-0 aspect-square rounded-full border border-dashed border-white/20 bg-white/5 transition-transform duration-2000 group-hover:scale-110 w-[50%] lg:w-[40%] animate-pulsing"
            ></span>
          </div>

          {/* Top spacer */}
          <div className="hidden lg:block"></div>

          {/* Content (Left-aligned, sharp buttons) */}
          <div className="relative z-10 flex flex-col items-start justify-center gap-8 text-left max-w-4xl py-12">
            <p className="text-sm sm:text-base uppercase tracking-widest font-clash text-white/80 max-w-[30ch]">
              {text}
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight leading-none max-w-[15ch] mix-blend-difference">
              {title}
            </h2>
            <div className="mt-4 flex items-start justify-start w-full">
              <a
                href={buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <CreepyButton
                  type="button"
                  className="w-full sm:w-auto h-16 text-sm tracking-widest uppercase rounded-none border-none cursor-pointer"
                  coverClassName="bg-white text-[#f54900] font-bold uppercase tracking-wider text-sm rounded-none"
                >
                  {buttonText}
                </CreepyButton>
              </a>
            </div>
          </div>

          {/* Bottom details panel (No top border / hr line) */}
          <div className="relative z-10 flex flex-col md:flex-row w-full items-center justify-between gap-6 pt-8 mt-auto">
            {/* Rotating continents globe animation - Glass Card */}
            <div className="flex items-center backdrop-blur-md bg-white/10 border border-white/20 rounded-md p-1.5 gap-3 shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-white/5 rounded-md overflow-hidden">
                <MiniGlobe width={36} height={36} />
              </div>
              <div className="flex flex-col justify-center font-clash text-left pr-3">
                <p className="text-[11px] font-bold text-white uppercase border-b border-white/10 pb-0.5">
                  Working Globally
                </p>
                <p className="text-[10px] text-white/75 uppercase pt-0.5">
                  Available Now
                </p>
              </div>
            </div>

            {/* Inquiries */}
            <div className="text-center md:text-right font-clash">
              <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-1">For further inquiries</p>
              <a 
                href={emailLink}
                className="interactive text-sm font-semibold tracking-wide text-white hover:text-white/80 transition-colors lowercase"
              >
                lingeshwarma108@gmail
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;