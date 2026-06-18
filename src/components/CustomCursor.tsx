import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const blobRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<SVGSVGElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const hoveredRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Skip on touch devices
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const blob = blobRef.current;
    const dot = dotRef.current;
    if (!blob || !dot) return;

    // ── Hide the native cursor everywhere ──
    document.documentElement.style.setProperty('cursor', 'none', 'important');
    const style = document.createElement('style');
    style.id = 'custom-cursor-hide';
    style.textContent = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(style);

    // ── Theme-aware color update ──
    const circle = dot.querySelector('circle');
    
    const updateCursorColor = () => {
      if (!circle) return;
      const isDark = document.documentElement.classList.contains('dark');
      circle.setAttribute('fill', isDark ? '#f54900' : '#00ffff');
    };

    // Initial color set
    updateCursorColor();

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          updateCursorColor();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // ── Smooth follow loop using rAF + GSAP set ──
    const render = () => {
      gsap.set(blob, {
        left: posRef.current.x,
        top: posRef.current.y,
      });
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    // ── Track pointer position with lerp for smoothness ──
    const target = { x: -100, y: -100 };

    const onMouseMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;

      const t = e.target as HTMLElement;
      if (t) {
        const interactive = typeof t.closest === 'function' && (
          t.closest('a') ||
          t.closest('button') ||
          t.closest('[role="button"]') ||
          t.closest('.interactive') ||
          t.closest('.work-card')
        );

        if (interactive) {
          if (!hoveredRef.current) {
            hoveredRef.current = true;
            gsap.to(dot, {
              scale: 1,
              opacity: 0.9,
              duration: 0.3,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }
        } else {
          if (hoveredRef.current) {
            hoveredRef.current = false;
            gsap.to(dot, {
              scale: 0.25,
              opacity: 0.7,
              duration: 0.3,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }
        }
      }
    };

    // Smoothly lerp towards target every frame
    const lerpTick = gsap.ticker.add(() => {
      posRef.current.x += (target.x - posRef.current.x) * 0.15;
      posRef.current.y += (target.y - posRef.current.y) * 0.15;
    });

    window.addEventListener('mousemove', onMouseMove);

    // Also listen for storage changes (if theme is persisted)
    const handleStorageChange = () => updateCursorColor();
    window.addEventListener('storage', handleStorageChange);

    return () => {
      cancelAnimationFrame(rafRef.current);
      gsap.ticker.remove(lerpTick);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('storage', handleStorageChange);
      observer.disconnect();
      document.documentElement.style.removeProperty('cursor');
      const s = document.getElementById('custom-cursor-hide');
      if (s) s.remove();
    };
  }, []);

  return (
    <div
      ref={blobRef}
      className="pointer-events-none fixed z-9999 mix-blend-difference"
      style={{
        left: -100,
        top: -100,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <svg
        ref={dotRef}
        className="cursor-dot"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: 70,
          height: 70,
          opacity: 0.7,
          transform: 'scale(0.25)',
          transformOrigin: 'center',
          willChange: 'transform, opacity',
        }}
      >
        <circle cx="50" cy="50" r="50" fill="#f54900" />
      </svg>
    </div>
  );
};