import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <nav className="relative w-full border-b border-dashed border-neutral-800 bg-background text-foreground select-none font-clash transition-colors duration-300">

      {/* Main Container */}
      <div className="relative max-w-[96rem] mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center h-full">
          <a href="/">
            <img
              src={isDarkMode ? "/logo-dark.svg" : "/logo-light.svg"}
              alt="LW"
              className="h-20 w-auto cursor-pointer"
            /></a>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-12 h-full">
          <a
            href="#home"
            className="relative font-medium text-foreground hover:text-primary transition-colors duration-300 py-1"
          >
            Home
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary transform scale-x-100 transition-transform duration-300" />
          </a>
          <a
            href="#about"
            className="relative font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group py-1"
          >
            About
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </a>
          <a
            href="#projects"
            className="relative font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group py-1"
          >
            Projects
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </a>
          <a
            href="#skills"
            className="relative font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group py-1"
          >
            Skills
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </a>

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
                  <a
                    href="#contact"
                    onClick={() => setIsMoreOpen(false)}
                    className="px-4 py-2.5 text-lg font-medium text-muted-foreground hover:text-primary transition-all duration-200"
                  >
                    Contact
                  </a>
                  <a
                    href="#resume"
                    onClick={() => setIsMoreOpen(false)}
                    className="px-4 py-2.5 text-lg font-medium text-muted-foreground hover:text-primary transition-all duration-200"
                  >
                    Resume
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="text-muted-foreground hover:text-foreground transition-colors duration-300 p-1.5 focus:outline-none cursor-pointer hover:rotate-12"
          >
            {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button className="bg-foreground text-background font-semibold px-6 py-2.5 hover:bg-primary hover:text-white hover:shadow-[0_0_20px_rgba(245,73,0,0.4)] transition-all duration-300 rounded-none text-sm tracking-wider uppercase">
            Contact
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="text-muted-foreground hover:text-foreground transition-colors p-1.5"
          >
            {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative w-6 h-5 flex flex-col justify-between items-end z-50 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className={`h-[2px] bg-foreground transition-all duration-300 rounded-full ${isMenuOpen ? 'w-6 translate-y-[9px] rotate-45' : 'w-9/12'}`} />
            <span className={`h-[2px] bg-foreground transition-all duration-300 rounded-full ${isMenuOpen ? 'w-6 -rotate-45' : 'w-full'}`} />
            <span className={`h-[2px] bg-foreground transition-all duration-300 rounded-full ${isMenuOpen ? 'w-0 opacity-0' : 'w-1/2'}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 w-screen h-screen bg-background z-40 flex flex-col justify-center items-center gap-8 font-clash select-none p-8 animate-in fade-in duration-300">
          {/* Repeating stripe background for mobile menu */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: "url('/stripe.svg')",
              backgroundRepeat: 'repeat',
              backgroundSize: '38px',
            }}
          />

          <div className="relative flex flex-col items-center gap-6 text-center z-10">
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="text-2xl font-semibold text-foreground hover:text-primary transition-colors py-1">Home</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-2xl font-medium text-muted-foreground hover:text-foreground transition-colors py-1">About</a>
            <a href="#projects" onClick={() => setIsMenuOpen(false)} className="text-2xl font-medium text-muted-foreground hover:text-foreground transition-colors py-1">Projects</a>
            <a href="#skills" onClick={() => setIsMenuOpen(false)} className="text-2xl font-medium text-muted-foreground hover:text-foreground transition-colors py-1">Skills</a>

            <div className="w-24 h-[1px] border-t border-dashed border-neutral-800 my-4" />

            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-2xl font-medium text-muted-foreground hover:text-primary transition-colors py-1">Contact</a>
            <a href="#resume" onClick={() => setIsMenuOpen(false)} className="text-2xl font-medium text-muted-foreground hover:text-primary transition-colors py-1">Resume</a>

            <button className="mt-8 bg-foreground text-background font-semibold px-8 py-3.5 hover:bg-primary hover:text-white transition-colors rounded-none text-base tracking-wider uppercase">
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;