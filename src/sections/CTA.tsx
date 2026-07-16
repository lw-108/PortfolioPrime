import React from 'react';
import { CreepyButton } from '../components/ui/creepy-button';

interface CTAProps {
  text?: string;
  buttonText?: string;
  buttonLink?: string;
  emailLink?: string;
}

export const CTA: React.FC<CTAProps> = ({
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

          {/* Content (Left-aligned, stacked text, large neobrutalist styling) */}
          <div className="relative z-10 flex flex-col items-start justify-center gap-10 text-left w-full py-12 max-w-4xl mr-auto">
            <p className="text-xs sm:text-sm uppercase tracking-widest font-black font-clash text-white/80">
              {text}
            </p>
            <h2 className="text-[clamp(4.5rem,13vw,9.5rem)] font-black uppercase tracking-tighter leading-[0.85] flex flex-col select-none font-clash">
              <span className="neobrutal-text-stack ">Let's</span>
              <span className="neobrutal-text-stack ">Make It</span>
              <span className="neobrutal-text-stack ">Happen</span>
            </h2>
            <div className="mt-6 flex items-start justify-start w-full max-w-md">
              <a
                href={buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <CreepyButton
                  type="button"
                  className="w-full text-base tracking-widest uppercase rounded-none border-none cursor-pointer py-4 font-clash"
                  coverClassName="bg-white text-[#f54900] font-black uppercase tracking-widest text-base rounded-none py-4 font-clash"
                >
                  {buttonText}
                </CreepyButton>
              </a>
            </div>
          </div>

          {/* Bottom details panel (No top border / hr line) */}
          <div className="relative z-10 flex flex-col w-full items-start justify-start pt-8 mt-auto">
            {/* Inquiries */}
            <div className="text-left font-clash">
              <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-1">For further inquiries</p>
              <a 
                href={emailLink}
                className="interactive text-sm font-semibold tracking-wide text-white hover:text-white/80 transition-colors lowercase"
              >
                lingeshwarma108@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .neobrutal-text-stack {
          color: #ffffff;
          -webkit-text-stroke: 0;
          text-shadow: none;
          letter-spacing: 0.05em; /* Added clean letter-spacing */
        }
        @media (max-width: 640px) {
          .neobrutal-text-stack {
            -webkit-text-stroke: 0;
            text-shadow: none;
            letter-spacing: 0.04em;
          }
        }
      `}</style>
    </section>
  );
};

export default CTA;