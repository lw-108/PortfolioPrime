import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const blobRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<SVGSVGElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const hoveredRef = useRef(false);
  const rafRef = useRef<number>(0);
  const maskRadiusRef = useRef({ value: 0 });

  useEffect(() => {
    // Skip on touch devices or mobile/tablet views (less than 1024px)
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobileOrTablet = window.innerWidth < 1024;
    if (isTouchDevice || isMobileOrTablet) return;

    setShouldRender(true);

    const blob = blobRef.current;
    const dot = dotRef.current;
    if (!blob || !dot) return;

    // ── Hide the native cursor everywhere ──
    document.documentElement.style.setProperty('cursor', 'none', 'important');
    const style = document.createElement('style');
    style.id = 'custom-cursor-hide';
    style.textContent = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(style);

    // ── Smooth follow loop using rAF + GSAP set ──
    const render = () => {
      gsap.set(blob, {
        x: posRef.current.x,
        y: posRef.current.y,
        xPercent: -50,
        yPercent: -50,
      });

      // Update cursor styling dynamically based on light/dark theme
      const isDark = document.documentElement.classList.contains('dark');
      const circle = dot.querySelector('circle');
      if (circle) {
        blob.style.mixBlendMode = 'difference';
        dot.style.mixBlendMode = 'difference';
        if (isDark) {
          circle.setAttribute('fill', '#f54900');
        } else {
          circle.setAttribute('fill', '#ffffff');
        }
      }

      // Synchronize Tamil text mask perfectly with the smooth cursor position
      const tamilText = document.querySelector('.footer-masked-text p:last-child') as HTMLElement;
      if (tamilText) {
        if (hoveredFooterRef.current) {
          const rect = tamilText.getBoundingClientRect();
          const relX = posRef.current.x - rect.left;
          const relY = posRef.current.y - rect.top;
          const clip = `circle(${maskRadiusRef.current.value}px at ${relX}px ${relY}px)`;
          tamilText.style.opacity = '1';
          tamilText.style.clipPath = clip;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (tamilText.style as any).WebkitClipPath = clip;
        } else {
          tamilText.style.opacity = '0';
          tamilText.style.clipPath = 'circle(0px at 0px 0px)';
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (tamilText.style as any).WebkitClipPath = 'circle(0px at 0px 0px)';
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    const hoveredFooterRef = { current: false };
    const target = { x: -100, y: -100 };

    const onMouseMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;

      const t = e.target as HTMLElement;
      if (t) {
        const footerMasked = typeof t.closest === 'function' && t.closest('.footer-masked-text');
        const interactive = typeof t.closest === 'function' && (
          t.closest('a') ||
          t.closest('button') ||
          t.closest('[role="button"]') ||
          t.closest('.interactive') ||
          t.closest('.work-card')
        );

        if (footerMasked) {
          if (!hoveredFooterRef.current) {
            hoveredFooterRef.current = true;
            // Hide cursor — the Tamil clip-path overlay IS the visual circle
            gsap.to(dot, {
              scale: 0.04375,
              opacity: 0,
              duration: 0.3,
              ease: 'power2.out',
              overwrite: 'auto',
            });
            gsap.to(maskRadiusRef.current, {
              value: 200,
              duration: 0.3,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }
        } else if (interactive) {
          if (hoveredFooterRef.current || !hoveredRef.current) {
            hoveredFooterRef.current = false;
            hoveredRef.current = true;
            gsap.to(dot, {
              scale: 0.175, // 400px * 0.175 = 70px
              opacity: 0.9,
              duration: 0.3,
              ease: 'power2.out',
              overwrite: 'auto',
            });
            gsap.to(maskRadiusRef.current, {
              value: 0,
              duration: 0.3,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }
        } else {
          if (hoveredRef.current || hoveredFooterRef.current) {
            hoveredRef.current = false;
            hoveredFooterRef.current = false;
            gsap.to(dot, {
              scale: 0.04375, // 400px * 0.04375 = 17.5px
              opacity: 0.7,
              duration: 0.3,
              ease: 'power2.out',
              overwrite: 'auto',
            });
            gsap.to(maskRadiusRef.current, {
              value: 0,
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

    return () => {
      cancelAnimationFrame(rafRef.current);
      gsap.ticker.remove(lerpTick);
      window.removeEventListener('mousemove', onMouseMove);
      document.documentElement.style.removeProperty('cursor');
      const s = document.getElementById('custom-cursor-hide');
      if (s) s.remove();
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      ref={blobRef}
      className="pointer-events-none fixed z-9999 top-0 left-0"
      style={{
        willChange: 'transform',
      }}
    >
      <svg
        ref={dotRef}
        className="cursor-dot"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: 400,
          height: 400,
          opacity: 0.7,
          transform: 'scale(0.04375)',
          transformOrigin: 'center',
        }}
      >
        <circle cx="50" cy="50" r="50" fill="#f54900" />
      </svg>
    </div>
  );
};