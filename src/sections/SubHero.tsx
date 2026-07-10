import { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const SubHero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  // IntersectionObserver: trigger entrance and autoplay once when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasEntered) {
          setHasEntered(true);
          const video = videoRef.current;
          if (video) {
            video.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasEntered]);

  // Entrance animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !hasEntered) return;

    canvas.style.opacity = '0';
    canvas.style.transform = 'rotateX(90deg) rotateZ(0deg) scale(0.8)';

    const timeout = setTimeout(() => {
      canvas.style.transition = 'all 2.5s cubic-bezier(0.16, 1, 0.3, 1)';
      canvas.style.opacity = '1';
      canvas.style.transform = 'rotateX(22deg) rotateZ(-12deg) scale(1)';
    }, 200);

    return () => clearTimeout(timeout);
  }, [hasEntered]);

  // Mouse parallax 3D tilt — PARALLEL to mouse direction
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const x = (e.pageX - window.innerWidth / 2) / 60;
    const y = (e.pageY - window.innerHeight / 2) / 60;

    canvas.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    canvas.style.transform = `rotateX(${22 + y / 2}deg) rotateZ(${-12 + x / 2}deg)`;
  }, []);

  useEffect(() => {
    if (!hasEntered) return;

    const timeout = setTimeout(() => {
      window.addEventListener('mousemove', handleMouseMove);
    }, 2800);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hasEntered, handleMouseMove]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full bg-transparent select-none font-clash"
    >
      <div className="w-[97%] max-w-384 mx-auto bg-background overflow-hidden">
        {/* Full section arena with bg-background + wave SVG */}
        <div className="relative w-full py-24 sm:py-32 md:py-40 lg:py-48 overflow-hidden flex flex-col items-center justify-center">

          {/* Concentric topographical contour rings */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] opacity-[0.08]"
              style={{
                backgroundImage:
                  'repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 40px, rgba(255,255,255,0.6) 41px, transparent 42px)',
              }}
            />
          </div>

          {/* 3D Viewport */}
          <div
            className="relative z-10 w-full flex items-center justify-center"
            style={{ perspective: '2000px' }}
          >
            <div
              ref={canvasRef}
              className="relative"
              style={{
                width: 'min(85vw, 800px)',
                aspectRatio: '16 / 10',
                transformStyle: 'preserve-3d',
                opacity: 0,
              }}
            >
              {/* Video layer — no interactive controls on it */}
              <div
                className="absolute inset-0 overflow-hidden border border-white/10"
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
              >
                <video
                  ref={videoRef}
                  src="/SanAndreas/San Andreas.mp4"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover pointer-events-none"
                  style={{ filter: 'contrast(1.15) brightness(0.75)' }}
                />
              </div>

            </div>
          </div>

          {/* Controls — far below the 3D card, lower-left */}
          <div className="relative z-20 w-full px-6 sm:px-10 md:px-16 mt-20 sm:mt-28 md:mt-32 lg:mt-36 flex items-center gap-3 max-w-4xl mx-auto">
            <button
              onClick={togglePlay}
              className="p-2.5 sm:p-3 rounded-none bg-background border border-border hover:bg-[#f54900] hover:border-[#f54900] text-muted-foreground hover:text-white transition-all duration-200 cursor-pointer"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
            <button
              onClick={toggleMute}
              className="p-2.5 sm:p-3 rounded-none bg-background border border-border hover:bg-[#f54900] hover:border-[#f54900] text-muted-foreground hover:text-white transition-all duration-200 cursor-pointer"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground font-clash font-semibold ml-3">
              {isPlaying ? '● Playing' : '■ Paused'}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SubHero;
