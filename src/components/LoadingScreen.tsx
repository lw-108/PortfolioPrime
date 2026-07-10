import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

/**
 * Generates a zigzag spear-teeth SVG path along the bottom edge.
 */
function buildZigzagPath(w: number, h: number, teeth: number, depth: number): string {
  const toothWidth = w / teeth;
  let d = `M0 0 L${w} 0 L${w} ${h}`;

  for (let i = teeth; i > 0; i--) {
    const xRight = i * toothWidth;
    const xMid = xRight - toothWidth / 2;
    const xLeft = (i - 1) * toothWidth;
    
    d += ` L${xMid} ${h + depth}`;
    d += ` L${xLeft} ${h}`;
  }

  d += ' Z';
  return d;
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

  // Optimized settings for responsiveness & low-end devices:
  // Fewer teeth on mobile (width < 768) reduces path complexity drastically
  const teethCount = width < 768 ? 10 : 18; 
  
  // Medium sized spikes (8% of viewport height instead of 22%)
  const frontTeethDepth = Math.max(60, height * 0.08); 
  const backTeethDepth = frontTeethDepth * 1.15; 

  const flatPath = useMemo(
    () => buildZigzagPath(width, height, teethCount, 0),
    [width, height, teethCount]
  );
  
  const frontZigzagPath = useMemo(
    () => buildZigzagPath(width, height, teethCount, frontTeethDepth),
    [width, height, teethCount, frontTeethDepth]
  );

  const backZigzagPath = useMemo(
    () => buildZigzagPath(width, height, teethCount, backTeethDepth),
    [width, height, teethCount, backTeethDepth]
  );

  useEffect(() => {
    // Shortened wait time from 2400ms to 1200ms for quick render of the app
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

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
            y: '-115vh', // Quick slide up using GPU-accelerated transform
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-99999 size-full cursor-wait overflow-visible select-none"
        >
          {/* Layered SVG Monster Gate */}
          <svg
            width={width}
            height={height}
            className="absolute top-0 left-0 z-0 w-full"
            style={{ overflow: 'visible' }}
            preserveAspectRatio="none"
          >
            {/* Back/Shadow teeth layer for 3D depth */}
            <motion.path
              fill="#9e2e00"
              initial={{ d: flatPath }}
              animate={{
                d: backZigzagPath,
                transition: {
                  duration: 0.8,
                  ease: [0.25, 1, 0.5, 1],
                },
              }}
            />
            {/* Front primary teeth layer */}
            <motion.path
              fill="#f54900"
              initial={{ d: flatPath }}
              animate={{
                d: frontZigzagPath,
                transition: {
                  duration: 0.7,
                  ease: [0.25, 1, 0.5, 1],
                  delay: 0.05,
                },
              }}
            />
          </svg>

          {/* Loading Content */}
          <div
            id="text"
            className="relative z-10 flex size-full flex-col items-center justify-center text-center text-white px-4"
          >
            <h3 className="overflow-hidden mb-2">
              <motion.span
                initial={{ y: '100%' }}
                animate={{
                  y: 0,
                  transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1], delay: 0.2 },
                }}
                className="loading-text flicker-effect inline-block text-3xl sm:text-6xl md:text-7xl font-clash font-extrabold uppercase tracking-widest text-white"
              >
                Lingeshwarma
              </motion.span>
            </h3>

            <p className="overflow-hidden mb-8">
              <motion.span
                initial={{ y: '100%' }}
                animate={{
                  y: 0,
                  transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1], delay: 0.35 },
                }}
                className="loading-text inline-block text-xs sm:text-base md:text-lg font-clash uppercase tracking-widest opacity-80"
              >
                &copy; Folio {new Date().getFullYear()}
              </motion.span>
            </p>

            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-14 overflow-hidden">
              <motion.span
                initial={{ y: '100%' }}
                animate={{
                  y: 0,
                  transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1], delay: 0.5 },
                }}
                className="loading-text inline-block font-mono text-[10px] sm:text-sm text-white/80"
              >
                Version 1.4v
              </motion.span>
            </div>

            <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-14 overflow-hidden">
              <motion.span
                initial={{ y: '100%' }}
                animate={{
                  y: 0,
                  transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1], delay: 0.5 },
                }}
                className="loading-text inline-block font-mono text-[10px] sm:text-sm animate-pulse text-white/80"
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
                  0 0 25px rgba(245, 73, 0, 0.4),
                  0 0 50px rgba(245, 73, 0, 0.2),
                  0 0 100px rgba(245, 73, 0, 0.1);
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