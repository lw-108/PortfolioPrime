import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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

// Custom animated button
const Button: React.FC<{
  label: string;
  url?: string;
  className?: string;
  onClick?: () => void;
}> = ({ label, url, className = '', onClick }) => {
  const Component = url ? 'a' : 'button';

  return (
    <Component
      href={url}
      onClick={onClick}
      className={`leading-base group pointer-events-auto relative h-full max-w-full transform-none overflow-clip rounded-full bg-neutral-900 border border-neutral-800 dark:bg-neutral-950 px-5 py-2 text-[1rem] font-semibold uppercase tracking-normal text-neutral-100 sm:text-sm cursor-pointer ${className}`}
    >
      <span
        className="ease-expo flex items-center justify-center absolute bottom-0 left-0 z-10 my-auto h-full w-full will-change-auto translate-y-full text-nowrap rounded-t-[15rem] bg-[#f54900] text-white font-fancy transition-all duration-700 group-hover:translate-y-0 group-hover:rounded-none"
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {label}
      </span>

      <span
        className="ease-expo relative z-20 overflow-hidden transition-all flex items-center justify-center"
      >
        <span
          className="ease-expo text-nowrap font-fancy transition-all duration-700 group-hover:-translate-y-full block"
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          {label}
        </span>
      </span>
    </Component>
  );
};

// Circles SVG pattern component
const Circles: React.FC<{ className?: string; id?: string }> = ({ className = '', id }) => (
  <div id={id} className={className}>
    <svg
      width="245"
      height="327"
      viewBox="0 0 245 327"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M124.649 288.937C35.0401 224.32 14.7804 99.2946 79.3978 9.68556C144.015 -79.9235 269.04 -100.183 358.649 -35.5658C448.258 29.0516 468.518 154.077 403.901 243.686C339.283 333.295 214.258 353.555 124.649 288.937Z"
        fill="url(#paint0_linear_4980_800)"
      />
      <path
        d="M92.75 234.997C-6.70156 163.282 -29.1866 24.5246 42.5283 -74.927C114.243 -174.379 253.001 -196.864 352.453 -125.149C451.904 -53.4338 474.389 85.324 402.674 184.776C330.959 284.227 192.202 306.712 92.75 234.997Z"
        fill="#AFAF9D"
        className="opacity-20"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4980_800"
          x1="424.09"
          y1="215.688"
          x2="35.1898"
          y2="-64.7502"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#AFAF9D" />
          <stop offset="1" stopColor="#AFAF9D" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const Navbar: React.FC = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  
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
    { label: 'Skills', url: '/skills' },
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
          <button id="magneto-wrapper" className="border-none bg-transparent p-0 outline-hidden">
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
      />

      {/* Sliding Navbar Panel */}
      <div
        ref={menuRef}
        tabIndex={0}
        className="bg-[#ffffe3] dark:bg-[#10100e] text-neutral-900 dark:text-neutral-100 fixed top-[1dvh] right-0 z-40 h-[98dvh] w-full rounded-s-lg p-5 sm:p-10 md:w-3/5 md:px-20 lg:w-2/5 will-change-auto select-none focus:outline-hidden max-md:w-[98%] shadow-2xl overflow-y-auto"
      >
        <Circles id="circles" className="absolute top-0 right-0 opacity-10 pointer-events-none" />
        
        <div className="flex h-full flex-col items-center justify-between min-h-[500px]">
          <div className="relative z-10 w-full">
            {/* Header section in sidebar containing logo-dark.svg and theme toggle */}
            <div className="flex items-center w-full pb-4 border-b border-neutral-300 dark:border-neutral-800 gap-4">
              <a href="/">
                <img
                  src="/logo-dark.svg"
                  alt="LW"
                  className="h-20 w-auto cursor-pointer"
                />
              </a>
              {/* Position theme toggle near logo's right side */}
              <div className="flex items-center">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="text-primary hover:text-primary/80 transition-colors p-1.5 focus:outline-none cursor-pointer hover:rotate-12"
                >
                  {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                </button>
              </div>
            </div>

            {/* Grid layout for Navlinks - 2 rows with grid lines */}
            <div className="grid grid-cols-2 mt-8 border-t border-l border-neutral-300 dark:border-neutral-800" id="navLinks">
              {navbarLinks.map((l) => (
                <div 
                  key={l.label} 
                  className="border-r border-b border-neutral-300 dark:border-neutral-800 flex items-center justify-center p-6 sm:p-10 transition-all duration-300 group relative overflow-hidden"
                  style={{
                    // Inline CSS variables or hover styles can be controlled via utility classes, but custom css for repeating bg is cleaner:
                  }}
                >
                  {/* Stripe svg repeated bg layer that shows on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none"
                    style={{
                      backgroundImage: "url('/stripe.svg')",
                      backgroundRepeat: 'repeat',
                      backgroundSize: '24px',
                    }}
                  />
                  <RouterLink
                    to={l.url}
                    onClick={toggleBtnClickAnimation}
                    className="flex h-full w-full items-center justify-center py-2 relative z-10"
                  >
                    <p className="font-clash text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold uppercase tracking-wider text-center transition-all duration-300 group-hover:text-primary">
                      {l.label}
                    </p>
                  </RouterLink>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full relative z-10">
            <div className="text-neutral-700 dark:text-neutral-300 mt-2 h-full font-normal">
              <p className="text-left text-xs font-bold uppercase tracking-widest text-[#f54900] mb-2 font-clash">Email address</p>
              
              <Link
                className="font-medium tracking-wider text-lg font-clash"
                tag="span"
                label="lingeshwarma108@gmail.com"
                url="mailto:ligeshwarma108@gmail.com"
              />

              <div className="mt-6 flex flex-wrap justify-start gap-2">
                {socialLinks.map((social) => (
                  <Button
                    key={social.label}
                    className="contact border-neutral-300 dark:border-neutral-800"
                    label={social.label}
                    url={social.url}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REVERTED TO OLD NAVBAR LAYOUT: non-sticky, relative, has full desktop navigation */}
      <nav className="relative w-full border-b border-dashed border-neutral-800 bg-background text-foreground select-none font-clash transition-colors duration-300">
        <div className="relative max-w-384 mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center h-full">
            <a href="/">
              <img
                src={isDarkMode ? "/logo-dark.svg" : "/logo-light.svg"}
                alt="LW"
                className="h-20 w-auto cursor-pointer"
              />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-12 h-full">
            <RouterLink
              to="/"
              className="relative font-medium text-foreground hover:text-primary transition-colors duration-300 py-1"
            >
              Home
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary transform scale-x-100 transition-transform duration-300" />
            </RouterLink>
            <RouterLink
              to="/about"
              className="relative font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group py-1"
            >
              About
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </RouterLink>
            <RouterLink
              to="/projects"
              className="relative font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group py-1"
            >
              Projects
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </RouterLink>
            <RouterLink
              to="/skills"
              className="relative font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group py-1"
            >
              Skills
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </RouterLink>

            {/* More Dropdown Link */}
            <div className="relative h-full flex items-center">
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="flex items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 focus:outline-none cursor-pointer"
              >
                More <span className="text-2xl font-clash transition-colors duration-300">{isMoreOpen ? '×' : '+'}</span>
              </button>

              {isMoreOpen && (
                <div
                  className="absolute top-[85%] left-1/2 -translate-x-1/2 w-48 border-2 border-neutral-700 p-3 z-50 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur-sm"
                  style={{
                    backgroundImage: "url('/stripe.svg')",
                    backgroundRepeat: 'repeat',
                    backgroundSize: '38px',
                  }}
                >
                  <div className="border border-dashed border-neutral-700 bg-background p-3 flex flex-col gap-2 text-center">
                    <RouterLink
                      to="/contact"
                      onClick={() => setIsMoreOpen(false)}
                      className="px-4 py-2.5 text-lg font-medium text-muted-foreground hover:text-primary transition-all duration-200"
                    >
                      Contact
                    </RouterLink>
                    <RouterLink
                      to="/resume"
                      onClick={() => setIsMoreOpen(false)}
                      className="px-4 py-2.5 text-lg font-medium text-muted-foreground hover:text-primary transition-all duration-200"
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
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 p-1.5 focus:outline-none cursor-pointer hover:rotate-12"
            >
              {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <RouterLink to="/contact">
              <button className="bg-foreground text-background font-semibold px-6 py-2.5 hover:bg-primary hover:text-white hover:shadow-[0_0_20px_rgba(245,73,0,0.4)] transition-all duration-300 rounded-none text-sm tracking-wider uppercase cursor-pointer">
                Contact
              </button>
            </RouterLink>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="text-muted-foreground hover:text-foreground transition-colors p-1.5 focus:outline-none cursor-pointer"
            >
              {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Mobile sidebar menu button — bg-primary, lines rotate to X when open */}
            <button
              onClick={toggleBtnClickAnimation}
              className="relative flex items-center justify-center w-[34px] h-[34px] rounded-full bg-primary border border-primary cursor-pointer focus:outline-none transition-colors duration-300 z-50"
              aria-label={isNavbarOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="flex flex-col items-center justify-center w-[14px] h-[14px] relative">
                <span
                  className={`absolute block w-[14px] h-[1.5px] bg-white rounded-full transition-all duration-300 ease-in-out ${
                    isNavbarOpen ? 'rotate-45 top-[6px]' : 'rotate-0 top-[3px]'
                  }`}
                />
                <span
                  className={`absolute block w-[14px] h-[1.5px] bg-white rounded-full transition-all duration-300 ease-in-out ${
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