import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
  });
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const width = dimensions.width;
  const height = dimensions.height;

  // Bulge multiplier for a liquid trailing curve on exit
  let multiplier = 0.35;
  if (width < 600) {
    multiplier = 0.25;
  } else if (width < 900) {
    multiplier = 0.3;
  }

  const curveHeight = height + height * multiplier;

  // SVG Paths:
  // Flat path (idle state while loading)
  const flatPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} Z`;
  // Bulged path (exiting state: center lags behind, creating a trailing U-curve)
  const bulgedPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${curveHeight} 0 ${height} Z`;

  useEffect(() => {
    // Automatically trigger exit animation after a short delay
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  // Tell the parent app that loading is complete after the slide-up animation ends
  const handleAnimationComplete = () => {
    if (isExiting && onComplete) {
      onComplete();
    }
  };

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {!isExiting && (
        <motion.div
          id="loading-screen"
          initial={{ y: 0 }}
          exit={{ 
            y: '-100vh',
            transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[99999] size-full cursor-wait overflow-hidden select-none bg-transparent"
        >
          {/* Morphing SVG Background - overflow: visible keeps the bulge unclipped */}
          <svg
            width={width}
            height={height}
            className="absolute top-0 left-0 z-0 w-full fill-[#f54900]"
            style={{ overflow: 'visible' }}
          >
            <motion.path
              initial={{ d: flatPath }}
              animate={isExiting ? { 
                d: bulgedPath,
                transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] }
              } : {
                d: flatPath
              }}
            />
          </svg>

          {/* Loading Content */}
          <div
            id="text"
            className="relative z-10 flex size-full flex-col items-center justify-center text-center text-white"
          >
            <h3 className="overflow-hidden mb-2">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ 
                  y: 0,
                  transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1], delay: 0.4 }
                }}
                className="loading-text flicker-effect inline-block text-4xl sm:text-6xl md:text-7xl font-clash font-extrabold uppercase tracking-widest text-white"
              >
                Lingeshwarma
              </motion.span>
            </h3>

            <p className="overflow-hidden mb-8">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ 
                  y: 0,
                  transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1], delay: 0.65 }
                }}
                className="loading-text inline-block text-sm sm:text-base md:text-lg font-clash uppercase tracking-widest opacity-80"
              >
                &copy; Folio {new Date().getFullYear()}
              </motion.span>
            </p>

            <div className="absolute bottom-10 left-6 sm:left-14 overflow-hidden">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ 
                  y: 0,
                  transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1], delay: 0.8 }
                }}
                className="loading-text inline-block font-mono text-xs sm:text-sm text-white/80"
              >
                Version 1.4v
              </motion.span>
            </div>

            <div className="absolute bottom-10 right-6 sm:right-14 overflow-hidden">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ 
                  y: 0,
                  transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1], delay: 0.8 }
                }}
                className="loading-text inline-block font-mono text-xs sm:text-sm animate-pulse text-white/80"
              >
                Loading...
              </motion.span>
            </div>
          </div>

          <style>{`
            .flicker-effect {
              animation: text-glow-flicker 3s infinite alternate;
            }

            @keyframes text-glow-flicker {
              0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
                text-shadow: 
                  0 0 4px rgba(255, 255, 255, 0.8),
                  0 0 12px rgba(245, 73, 0, 0.6),
                  0 0 25px rgba(245, 73, 0, 0.4);
                opacity: 1;
              }
              20%, 24%, 55% {
                text-shadow: none;
                opacity: 0.6;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
