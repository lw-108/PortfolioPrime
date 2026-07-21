import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import gsap from 'gsap';

// Simple magnetic effect helper for React
const MagneticEffect: React.FC<{
  divId: string;
  textId: string;
  strength?: number;
  textStrength?: number;
  children: React.ReactElement;
}> = ({ children, strength = 20, textStrength = 10 }) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      gsap.to(el, {
        x: x * (strength / 100),
        y: y * (strength / 100),
        duration: 0.3,
        ease: "power2.out",
      });

      const innerText = el.querySelector('span, h2, p');
      if (innerText) {
        gsap.to(innerText, {
          x: x * (textStrength / 100),
          y: y * (textStrength / 100),
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
      const innerText = el.querySelector('span, h2, p');
      if (innerText) {
        gsap.to(innerText, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      }
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, textStrength]);

  return React.cloneElement(children as React.ReactElement<any>, { ref });
};

// Custom animated link component
const Link: React.FC<{
  label: string;
  url: string;
  tag?: string;
  icon?: boolean;
  className?: string;
  onClick?: () => void;
}> = ({ label, url, tag = 'span', icon = false, className = '', onClick }) => {
  const Tag = tag as any;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const svgContent = icon && (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      role="img"
      className="-scale-x-75 scale-y-75 fill-current inline-block"
    >
      <path d="M7.82834 17.2929L10.1213 19.586L8.70709 21.0001L4 16.2929L8.7071 11.5858L10.1213 13L7.82844 15.2929L18 15.2928L17.9999 3H19.9999L20 16.2928C20 16.8451 19.5523 17.2928 19 17.2928L7.82834 17.2929Z"></path>
    </svg>
  );

  return (
    <Tag className={`h-[2ch] w-fit overflow-y-hidden select-none max-md:h-5 block ${className}`}>
      <a href={url} onClick={handleClick} className="group block h-full">
        <span className="font-fancy flex items-center gap-1 translate-y-0 transition-all duration-300 ease-in-out will-change-auto group-hover:-translate-y-full">
          {svgContent}
          {label}
        </span>
        <span className="font-fancy flex items-center gap-1 transition-all duration-300 ease-in-out will-change-auto group-hover:-translate-y-full text-[#f54900]">
          {svgContent}
          {label}
        </span>
      </a>
    </Tag>
  );
};



const Navbar: React.FC = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const location = useLocation();
  
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);

  // Sync dark/light mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Lock body scroll when overlay menu is open
  useEffect(() => {
    if (isNavbarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isNavbarOpen]);

  // Initial setup for the overlay menu panel
  useEffect(() => {
    gsap.set(menuRef.current, { xPercent: 100, display: 'none' });
    gsap.set(overlayRef.current, { autoAlpha: 0, display: 'none' });
  }, []);

  // Show/Hide burger menu based on scroll position (halfway of Hero)
  useEffect(() => {
    const burger = burgerRef.current;
    if (!burger) return;

    // Set initial scale to 0 and hidden
    gsap.set(burger, { scale: 0, autoAlpha: 0, pointerEvents: 'none' });

    let isVisible = false;

    const handleScroll = () => {
      const heroHalfway = window.innerHeight / 2;
      const currentScroll = window.scrollY;

      if (currentScroll > heroHalfway && !isVisible) {
        isVisible = true;
        gsap.killTweensOf(burger);
        gsap.to(burger, {
          scale: 1,
          autoAlpha: 1,
          pointerEvents: 'auto',
          duration: 0.4,
          ease: "back.out(1.7)"
        });
      } else if (currentScroll <= heroHalfway && isVisible) {
        isVisible = false;
        gsap.killTweensOf(burger);
        gsap.to(burger, {
          scale: 0,
          autoAlpha: 0,
          pointerEvents: 'none',
          duration: 0.3,
          ease: "power2.in"
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Entrance/Exit animations for the sidebar menu panel
  useEffect(() => {
    const menu = menuRef.current;
    const overlay = overlayRef.current;
    const links = Array.from(menu?.querySelectorAll('#navLinks > div') || []);

    if (!menu || !overlay) return;

    if (isNavbarOpen) {
      burgerRef.current?.classList.add('active');

      gsap.killTweensOf([menu, overlay, ...links]);
      gsap.timeline()
        .set([menu, overlay], { display: "block" })
        .to(overlay, { 
          autoAlpha: 0.5, 
          duration: 0.4, 
          ease: "power2.out" 
        })
        .to(menu, { 
          xPercent: 0, 
          duration: 0.6, 
          ease: "power3.out" 
        }, "<")
        .fromTo(links, 
          { y: 50, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: "power2.out" },
          "<+=0.2"
        );
    } else {
      burgerRef.current?.classList.remove('active');

      gsap.killTweensOf([menu, overlay, ...links]);
      gsap.timeline()
        .to(menu, { 
          xPercent: 100, 
          duration: 0.5, 
          ease: "power3.in" 
        })
        .to(overlay, { 
          autoAlpha: 0, 
          duration: 0.4, 
          ease: "power2.in" 
        }, "<")
        .set([menu, overlay], { display: "none" });
    }
  }, [isNavbarOpen]);

  // Handle Escape key to close navbar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isNavbarOpen) {
        setIsNavbarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isNavbarOpen]);

  const navbarLinks = [
    { label: 'Home', url: '/' },
    { label: 'About', url: '/about' },
    { label: 'Projects', url: '/projects' },
    { label: 'Skills', url: '/#skills' },
    { label: 'Blogs', url: '/blogs' },
    { label: 'Contact', url: '/contact' },
    { label: 'Resume', url: '/resume' },
  ];

  const socialLinks = [
    { label: 'GitHub', url: 'https://github.com/LW-8877' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/lingeshwarma-mk' },
  ];

  const toggleBtnClickAnimation = () => {
    setIsNavbarOpen(prev => !prev);
  };

  return (
    <>
      {/* Burger Menu Button — outer wrapper controlled by GSAP scroll animation */}
      <div ref={burgerRef} className="fixed right-12 top-7 lg:right-16 lg:top-10 z-50" style={{ scale: 0, opacity: 0 }}>
        <MagneticEffect divId="magneto" textId="magnetoText">
          <button 
            id="magneto-wrapper" 
            className="border-none bg-transparent p-0 outline-hidden"
            style={{ display: isNavbarOpen ? 'none' : 'block' }}
          >
            <div
              id="magneto"
              onClick={toggleBtnClickAnimation}
              className="flex items-center justify-center w-14 h-14 lg:w-18 lg:h-18 cursor-pointer rounded-full bg-primary shadow-md group transition-all duration-300 select-none border border-primary"
            >
              <span
                id="magnetoText"
                className="relative w-full text-center block before:bg-[#ffffe3] dark:before:bg-[#ffffe3] after:bg-[#ffffe3] dark:after:bg-[#ffffe3]"
                style={{ height: '20px' }}
              >
                <style dangerouslySetInnerHTML={{ __html: `
                  #magnetoText::before,
                  #magnetoText::after {
                    width: 40%;
                    content: ' ';
                    display: block;
                    height: 2px;
                    position: absolute;
                    left: 30%;
                    transition: all 0.3s ease-in-out;
                  }
                  #magnetoText::before {
                    top: 5px;
                  }
                  #magnetoText::after {
                    top: 13px;
                  }
                  .active #magnetoText::before {
                    transform: rotate(-45deg);
                    top: 9px;
                  }
                  .active #magnetoText::after {
                    transform: rotate(45deg);
                    top: 9px;
                  }
                `}} />
              </span>
            </div>
          </button>
        </MagneticEffect>
      </div>

      {/* Dimming overlay backdrop */}
      <div
        ref={overlayRef}
        onClick={toggleBtnClickAnimation}
        className="fixed inset-0 z-40 bg-black/60 pointer-events-auto opacity-0"
        style={{ display: 'none' }}
      />

      {/* Sliding Navbar Panel */}
      <div
        ref={menuRef}
        tabIndex={0}
        className="fixed top-0 right-0 z-50 h-full w-full sm:w-[480px] bg-background text-foreground will-change-transform select-none focus:outline-none overflow-y-auto flex flex-col"
        style={{ display: 'none' }}
      >
        {/* Left accent stripe */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary z-20" />

        {/* Subtle grid dot background */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: "url('https://i.ibb.co/ZpSdBkBH/dot.jpg')",
            backgroundRepeat: 'repeat',
            backgroundSize: '28px 28px',
          }}
        />

        {/* ── Header ── */}
        <div className="relative z-10 flex items-center justify-between px-8 pt-8 pb-6 border-b border-dashed border-border">
          <RouterLink to="/" onClick={toggleBtnClickAnimation} className="flex items-center gap-3">
            <img
              src="https://i.ibb.co/4w3Zxxx9/logo.png"
              alt="LW"
              className="h-12 w-auto"
            />
          </RouterLink>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle dark mode"
              className="text-muted-foreground hover:text-primary transition-colors p-1.5 focus:outline-none cursor-pointer"
            >
              {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            {/* Close X */}
            <button
              onClick={toggleBtnClickAnimation}
              className="w-9 h-9 border border-border hover:border-primary hover:text-primary flex items-center justify-center transition-all duration-200 cursor-pointer text-muted-foreground"
              aria-label="Close menu"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── Primary Nav Links ── */}
        <nav className="relative z-10 flex-1 overflow-y-auto" id="navLinks">
        {navbarLinks.map((l, i) => {
            const isActive = location.pathname === l.url;
            return (
              <div
                key={l.label}
                className="group relative border-b border-dashed border-border"
              >
                {/* Filled hover overlay */}
                <div className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />

                <RouterLink
                  to={l.url}
                  onClick={(e) => {
                    toggleBtnClickAnimation();
                    const isHashLink = l.url.includes('#');
                    if (isHashLink) {
                      const [path, hashVal] = l.url.split('#');
                      if (location.pathname === path || (location.pathname === '/' && path === '')) {
                        e.preventDefault();
                        setTimeout(() => {
                          const element = document.getElementById(hashVal);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 350);
                      }
                    }
                  }}
                  className="relative z-10 flex items-center px-8 py-5 overflow-hidden"
                >
                  {/* Index + Label — slides right on hover */}
                  <div className="flex items-baseline gap-4 transition-transform duration-300 ease-out group-hover:translate-x-3">
                    <span className="text-[10px] font-black tabular-nums text-muted-foreground group-hover:text-[#ffffe3]/60 transition-colors duration-300 font-clash">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={`text-3xl sm:text-4xl font-extrabold uppercase tracking-tight font-clash transition-colors duration-300 ${
                      isActive ? 'text-primary group-hover:text-[#ffffe3]' : 'text-foreground group-hover:text-[#ffffe3]'
                    }`}>
                      {l.label}
                    </span>
                  </div>
                </RouterLink>
              </div>
            );
          })}
        </nav>

        {/* ── Footer: Email + Social ── */}
        <div className="relative z-10 border-t border-dashed border-border px-8 py-6 flex flex-col gap-5">
          {/* Email */}
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-primary mb-1.5 font-clash">
              Get in Touch
            </p>
            <Link
              className="text-sm font-medium tracking-wide font-clash hover:text-primary transition-colors"
              tag="span"
              label="lingeshwarma108@gmail.com"
              url="mailto:lingeshwarma108@gmail.com"
            />
          </div>

          {/* Social Pill Row */}
          <div className="flex flex-wrap gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest border border-border hover:border-primary hover:text-primary text-muted-foreground transition-all duration-200 font-clash"
              >
                {social.label}
              </a>
            ))}
          </div>

          {/* Copyright strip */}
          <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50 font-clash">
            © 2026 Lingeshwarma MK — All rights reserved
          </p>
        </div>
      </div>

      {/* REVERTED TO OLD NAVBAR LAYOUT: non-sticky, relative, has full desktop navigation */}
      <nav className="relative w-full border-b border-dashed border-neutral-800 bg-background text-foreground select-none font-clash transition-colors duration-300">
        <div className="relative max-w-384 mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center h-full">
            <RouterLink to="/">
              <img
                src="https://i.ibb.co/4w3Zxxx9/logo.png"
                alt="LW"
                className="h-20 w-auto cursor-pointer"
              />
            </RouterLink>
          </div>

          <div className="hidden md:flex items-center space-x-12 h-full">
            {[
              { label: 'Home', url: '/' },
              { label: 'About', url: '/about' },
              { label: 'Projects', url: '/projects' },
              { label: 'Skills', url: '/#skills' },
              { label: 'Blogs', url: '/blogs' },
            ].map((link) => {
              const isActive = location.pathname === link.url;
              const isHashLink = link.url.includes('#');

              const handleLinkClick = (e: React.MouseEvent) => {
                if (isHashLink) {
                  const [path, hashVal] = link.url.split('#');
                  if (location.pathname === path || (location.pathname === '/' && path === '')) {
                    e.preventDefault();
                    const element = document.getElementById(hashVal);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }
              };

              return (
                <RouterLink
                  key={link.label}
                  to={link.url}
                  onClick={handleLinkClick}
                  className={`font-medium transition-colors duration-300 py-1 ${
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                </RouterLink>
              );
            })}

            {/* More Dropdown Link */}
            <div className="relative h-full flex items-center">
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className={`flex items-center gap-1.5 font-medium transition-colors duration-300 focus:outline-none cursor-pointer ${
                  location.pathname === '/contact' || location.pathname === '/resume'
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                More <span className="text-2xl font-clash transition-colors duration-300">{isMoreOpen ? '×' : '+'}</span>
              </button>

              {isMoreOpen && (
                <div
                  className="absolute top-[85%] left-1/2 -translate-x-1/2 w-48 border-2 border-neutral-700 p-3 z-50 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur-sm"
                  style={{
                    backgroundImage: "var(--stripe-bg)",
                    backgroundRepeat: 'repeat',
                    backgroundSize: '38px',
                  }}
                >
                  <div className="border border-dashed border-neutral-700 bg-background p-3 flex flex-col gap-2 text-center">
                    <RouterLink
                      to="/contact"
                      onClick={() => setIsMoreOpen(false)}
                      className={`px-4 py-2.5 text-lg font-medium transition-all duration-200 ${
                        location.pathname === '/contact'
                          ? 'text-primary'
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      Contact
                    </RouterLink>
                    <RouterLink
                      to="/resume"
                      onClick={() => setIsMoreOpen(false)}
                      className={`px-4 py-2.5 text-lg font-medium transition-all duration-200 ${
                        location.pathname === '/resume'
                          ? 'text-primary'
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      Resume
                    </RouterLink>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Actions (Theme & Contact) */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle dark mode"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 p-1.5 focus:outline-none cursor-pointer hover:rotate-12"
            >
              {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <RouterLink to="/contact">
              <button className="bg-foreground text-background font-semibold px-6 py-2.5 hover:bg-primary hover:text-[#ffffe3] hover:shadow-[0_0_20px_rgba(245,73,0,0.4)] transition-all duration-300 rounded-none text-sm tracking-wider uppercase cursor-pointer">
                Contact
              </button>
            </RouterLink>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle dark mode"
              className="text-muted-foreground hover:text-foreground transition-colors p-1.5 focus:outline-none cursor-pointer"
            >
              {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Mobile sidebar menu button — transparent, lines are primary orange */}
            <button
              onClick={toggleBtnClickAnimation}
              className="relative flex items-center justify-center w-[34px] h-[34px] bg-transparent border-none cursor-pointer focus:outline-none transition-colors duration-300 z-50"
              style={{ display: isNavbarOpen ? 'none' : 'flex' }}
              aria-label={isNavbarOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="flex flex-col items-center justify-center w-[14px] h-[14px] relative">
                <span
                  className={`absolute block w-[14px] h-[1.5px] bg-primary rounded-none transition-all duration-300 ease-in-out ${
                    isNavbarOpen ? 'rotate-45 top-[6px]' : 'rotate-0 top-[3px]'
                  }`}
                />
                <span
                  className={`absolute block w-[14px] h-[1.5px] bg-primary rounded-none transition-all duration-300 ease-in-out ${
                    isNavbarOpen ? '-rotate-45 top-[6px]' : 'rotate-0 top-[10px]'
                  }`}
                />
              </span>
            </button>
          </div>

        </div>
      </nav>
    </>
  );
};

export default Navbar;