import React, { useState } from 'react';
import { AnimatedTitle } from '../components/ui/AnimatedTitle';
import { motion } from 'motion/react';
import { Download, ZoomIn, ZoomOut } from 'lucide-react';

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: 'easeOut' as const,
    },
  }),
  hidden: {
    filter: 'blur(8px)' as const,
    y: 15,
    opacity: 0,
  },
} as const;

export const ResumePage: React.FC = () => {
  const [zoomScale, setZoomScale] = useState<number>(1.0);

  const handleZoom = (direction: 'in' | 'out') => {
    setZoomScale(prev => {
      const step = 0.2;
      const nextScale = direction === 'in' ? prev + step : prev - step;
      return Math.min(2.0, Math.max(0.6, nextScale));
    });
  };

  return (
    <section id="resume-page" className="relative z-10 w-full min-h-screen bg-transparent pt-0 pb-0 px-0 overflow-hidden select-none font-clash">
      <div className="w-[97%] max-w-384 mx-auto bg-background mt-[3vh] flex flex-col relative px-4 sm:px-8 lg:px-12 pb-0">

        {/* ── Page Header ── */}
        <motion.div
          custom={0}
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-b border-dashed border-border pt-8 sm:pt-12 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
        >
          <div>
            <span className="text-primary text-sm uppercase tracking-widest font-semibold">
              Curriculum Vitae
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold uppercase tracking-tight mt-2 text-foreground leading-none">
              <AnimatedTitle text="My Resume" />
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
            <p className="text-muted-foreground text-sm max-w-xs text-left md:text-right">
              High-resolution resume image rendered directly in your browser.
            </p>
            <a
              href="https://i.ibb.co/mVY5dm3P/LW19.png"
              download="Lingeshwarma_MK_Resume.png"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider bg-primary text-[#ffffe3] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download Resume
            </a>
          </div>
        </motion.div>

        {/* ── Resume Viewer ── */}
        <motion.div
          custom={1}
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full mt-12 mb-0 pb-0 flex-1 flex flex-col items-center"
        >
          <div className="w-full max-w-4xl mx-auto relative">
            {/* Neo-brutalist offset shadow */}
            <div className="absolute inset-0 translate-x-[5px] translate-y-[5px] bg-primary pointer-events-none" />

            {/* Main frame */}
            <div className="relative w-full border-2 border-foreground bg-neutral-950 flex flex-col">

              {/* ── Toolbar ── */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-between border-b-2 border-foreground bg-background px-4 py-3 gap-3">
                {/* Left: branding */}
                <div className="flex items-center gap-2 shrink-0">
                  <img src="https://i.ibb.co/4w3Zxxx9/logo.png" alt="logo" className="w-8 h-8" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-foreground">
                    Lingeshwarma MK
                  </span>
                </div>

                {/* Right: Zoom controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    disabled={zoomScale <= 0.6}
                    onClick={() => handleZoom('out')}
                    className="p-1.5 border border-foreground hover:bg-primary hover:text-[#ffffe3] hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-foreground w-10 text-center select-none font-clash">
                    {Math.round(zoomScale * 100)}%
                  </span>
                  <button
                    disabled={zoomScale >= 2.0}
                    onClick={() => handleZoom('in')}
                    className="p-1.5 border border-foreground hover:bg-primary hover:text-[#ffffe3] hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Document Container */}
              <div 
                className="relative w-full bg-neutral-950 overflow-auto max-h-[80vh] text-center p-4 animate-fade-in"
              >
                {/* Image output */}
                <div className="inline-block overflow-hidden max-w-full">
                  <img
                    src="https://i.ibb.co/mVY5dm3P/LW19.png"
                    alt="Lingeshwarma MK Resume"
                    className="inline-block shadow-2xl origin-top transition-transform duration-200"
                    style={{ transform: `scale(${zoomScale})`, maxWidth: '100%', height: 'auto' }}
                  />
                </div>
              </div>

              {/* ── Footer ── */}
              <div className="w-full flex items-center justify-between border-t-2 border-foreground bg-background px-4 py-3 gap-4">
                <span className="text-[10px] font-black tracking-widest uppercase text-foreground">
                  Interactive View
                </span>
                <div className="flex items-center gap-3">
                  <button
                    disabled={zoomScale <= 0.6}
                    onClick={() => handleZoom('out')}
                    className="p-1 border border-foreground hover:bg-primary hover:text-[#ffffe3] hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-black tracking-widest uppercase text-foreground whitespace-nowrap">
                    Scale: {Math.round(zoomScale * 100)}%
                  </span>
                  <button
                    disabled={zoomScale >= 2.0}
                    onClick={() => handleZoom('in')}
                    className="p-1 border border-foreground hover:bg-primary hover:text-[#ffffe3] hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
                <a
                  href="https://i.ibb.co/mVY5dm3P/LW19.png"
                  download="Lingeshwarma_MK_Resume.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-[#ffffe3] transition-all cursor-pointer text-[10px] font-bold uppercase tracking-wider"
                >
                  Download
                </a>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ResumePage;
