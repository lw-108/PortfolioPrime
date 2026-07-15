import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WorldMap from '../components/ui/WorldMap';
import { useTheme } from '../components/theme-provider';
import StickerPeel from '../components/StickerPeel'

const contacts = [
  {
    name: "Mail",
    icon: "/mail.svg",
    link: "mailto:lingeshwarma108@gmail.com",
    color: "#ff5500",
    description: "Send an email"
  },
  {
    name: "Stack Overflow",
    icon: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Stack_Overflow_icon.svg",
    link: "https://stackoverflow.com/users/31676920/lingeshwarma",
    color: "#ff5500",
    description: "Tech Q&A profile"
  },
  {
    name: "CodePen",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/codepen.svg",
    link: "https://codepen.io/lingeshwarma",
    color: "#ff5500",
    description: "Code experiments"
  },
  {
    name: "LinkedIn",
    icon: "/TechIcons/LinkedIn.svg",
    link: "https://www.linkedin.com/in/lingeshwarma19/",
    color: "#ff5500",
    description: "Professional network"
  },
  {
    name: "GitHub",
    icon: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
    link: "https://github.com/lw-108",
    color: "#ff5500",
    description: "Code repository"
  },
  {
    name: "Calendly",
    icon: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/calendly-jbjluknocqbqwyil7anw9.png/calendly-093vyga7bn0gcn3gt31dbhp.png?_a=DATAiZAAZAA0",
    link: "https://calendly.com/lw19",
    color: "#ff5500",
    description: "Schedule a meeting"
  },
  {
    name: "Peerlist",
    icon: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/peerlist-9912eo532tk7s5eqn07emr.png/peerlist-ov1892aql2lb1lxr57lcer.png?_a=DATAg1AAZAA0",
    link: "https://peerlist.io/",
    color: "#ff5500",
    description: "Developer community"
  },
];

const LiveISTClock: React.FC<{ resolvedTheme: "dark" | "light" }> = ({ resolvedTheme }) => {
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [dayStr, setDayStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();

      const optionsTime: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const optionsDate: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      };
      const optionsDay: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        weekday: 'long'
      };

      const tFormatter = new Intl.DateTimeFormat('en-US', optionsTime);
      const dFormatter = new Intl.DateTimeFormat('en-US', optionsDate);
      const dayFormatter = new Intl.DateTimeFormat('en-US', optionsDay);

      setTimeStr(tFormatter.format(date));
      setDateStr(dFormatter.format(date));
      setDayStr(dayFormatter.format(date));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center md:items-end font-clash text-center md:text-right gap-1.5 select-none w-full md:w-auto">
      <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight uppercase leading-none ${resolvedTheme === 'light' ? 'text-neutral-900' : 'text-white'}`}>
        {timeStr} <span className="text-[#FF5500] text-sm sm:text-base font-extrabold ml-1.5 animate-pulse">IST</span>
      </div>
      <div className={`text-xs sm:text-sm font-semibold uppercase tracking-widest ${resolvedTheme === 'light' ? 'text-neutral-500' : 'text-neutral-400'}`}>
        {dayStr} &mdash; {dateStr}
      </div>
    </div>
  );
};

export function Footer() {
  const { theme } = useTheme();
  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const root = document.documentElement;
    const updateTheme = () => {
      setResolvedTheme(root.classList.contains('dark') ? 'dark' : 'light');
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [theme]);

  const isLight = resolvedTheme === 'light';

  return (
    <footer className="relative z-10 w-full bg-transparent py-0 px-0 overflow-hidden select-none font-clash">
      <div className="w-[97%] max-w-384 mx-auto relative bg-background text-foreground transition-colors duration-300 border-t border-dashed border-neutral-800">

        {/* Main Grid: Left Logo + Right Content */}
        <div className="grid grid-cols-1 md:grid-cols-12">

          {/* Left Section: LW Logo Container (Centered on mobile, responsive padding) */}
          <div className="col-span-1 md:col-span-4 flex items-center justify-center py-10 md:py-0 md:pr-10 min-h-[180px] sm:min-h-[220px] md:min-h-[300px] relative bg-background border-b border-dashed border-neutral-800 md:border-b-0 transition-colors duration-300">
            <div className="scale-75 sm:scale-90 md:scale-100 relative w-[220px] h-[220px] flex items-center justify-center">
              <StickerPeel
                imageSrc="/logo-dark.svg"
                width={220}
                rotate={0}
                peelBackHoverPct={30}
                peelBackActivePct={40}
                shadowIntensity={0.5}
                lightingIntensity={0.1}
                initialPosition={{ x: 0, y: 0 }}
                peelDirection={0}
              />
            </div>
            {/* Vertical Stripe Divider */}
            <div
              className={`hidden md:block absolute right-0 top-0 bottom-0 w-10 border-l border-r border-dashed ${isLight ? 'border-neutral-300' : 'border-neutral-800'}`}
              style={{
                background: isLight
                  ? 'repeating-linear-gradient(135deg, rgba(0,0,0,0.04), rgba(0,0,0,0.04) 6px, transparent 6px, transparent 12px)'
                  : 'repeating-linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.03) 6px, transparent 6px, transparent 12px)'
              }}
            />
          </div>

          {/* Right Section: Navigation Links & Subheader */}
          <div className="col-span-1 md:col-span-8 flex flex-col justify-between">

            {/* Top Row: Tagline */}
            <div className={`px-6 py-5 sm:px-8 border-b border-dashed flex items-center ${isLight ? 'border-neutral-300' : 'border-neutral-800'}`}>
              <span className={`text-[10px] sm:text-xs font-medium tracking-[0.25em] uppercase leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                LW19, FROM IDEA TO IMPACT, WITHOUT THE NOISE.
              </span>
            </div>

            {/* Middle Row: Links Columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 flex-1">

              {/* Column 1: Your Launchpad */}
              <div className={`px-6 py-6 sm:px-8 border-b border-r border-dashed ${isLight ? 'border-neutral-300' : 'border-neutral-800'}`}>
                <h4 className={`text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6 ${isLight ? 'text-neutral-900' : 'text-white'}`}>Your Launchpad</h4>
                <ul className="space-y-3 sm:space-y-4">
                  <li>
                    <Link to="/" className={`text-[10px] sm:text-xs transition-colors duration-250 uppercase tracking-widest font-semibold ${isLight ? 'text-neutral-600 hover:text-[#FF5500]' : 'text-neutral-400 hover:text-[#FF5500]'}`}>Home</Link>
                  </li>
                  <li>
                    <Link to="/projects" className={`text-[10px] sm:text-xs transition-colors duration-250 uppercase tracking-widest font-semibold ${isLight ? 'text-neutral-600 hover:text-[#FF5500]' : 'text-neutral-400 hover:text-[#FF5500]'}`}>Projects</Link>
                  </li>
                  <li>
                    <Link to="/contact" className={`text-[10px] sm:text-xs transition-colors duration-250 uppercase tracking-widest font-semibold ${isLight ? 'text-neutral-600 hover:text-[#FF5500]' : 'text-neutral-400 hover:text-[#FF5500]'}`}>Get Started</Link>
                  </li>
                </ul>
              </div>

              {/* Column 2: Meet the Creator */}
              <div className={`px-6 py-6 sm:px-8 border-b sm:border-r border-dashed ${isLight ? 'border-neutral-300' : 'border-neutral-800'}`}>
                <h4 className={`text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6 ${isLight ? 'text-neutral-900' : 'text-white'}`}>Meet the Creator</h4>
                <ul className="space-y-3 sm:space-y-4">
                  <li>
                    <Link to="/about" className={`text-[10px] sm:text-xs transition-colors duration-250 uppercase tracking-widest font-semibold ${isLight ? 'text-neutral-600 hover:text-[#FF5500]' : 'text-neutral-400 hover:text-[#FF5500]'}`}>About</Link>
                  </li>
                  <li>
                    <Link to="/resume" className={`text-[10px] sm:text-xs transition-colors duration-250 uppercase tracking-widest font-semibold ${isLight ? 'text-neutral-600 hover:text-[#FF5500]' : 'text-neutral-400 hover:text-[#FF5500]'}`}>Resume</Link>
                  </li>
                  <li>
                    <Link to="/contact" className={`text-[10px] sm:text-xs transition-colors duration-250 uppercase tracking-widest font-semibold ${isLight ? 'text-neutral-600 hover:text-[#FF5500]' : 'text-neutral-400 hover:text-[#FF5500]'}`}>Contact</Link>
                  </li>
                </ul>
              </div>

              {/* Column 3: Insights & Tech */}
              <div className={`col-span-2 sm:col-span-1 px-6 py-6 sm:px-8 border-b sm:border-b-0 border-dashed ${isLight ? 'border-neutral-300' : 'border-neutral-800'}`}>
                <h4 className={`text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6 ${isLight ? 'text-neutral-900' : 'text-white'}`}>Insights &amp; Tech</h4>
                <ul className="space-y-3 sm:space-y-4">
                  <li>
                    <Link to="/skills" className={`text-[10px] sm:text-xs transition-colors duration-250 uppercase tracking-widest font-semibold ${isLight ? 'text-neutral-600 hover:text-[#FF5500]' : 'text-neutral-400 hover:text-[#FF5500]'}`}>Skills</Link>
                  </li>
                  <li>
                    <Link to="/blogs" className={`text-[10px] sm:text-xs transition-colors duration-250 uppercase tracking-widest font-semibold ${isLight ? 'text-neutral-600 hover:text-[#FF5500]' : 'text-neutral-400 hover:text-[#FF5500]'}`}>Blogs</Link>
                  </li>
                  <li>
                    <Link to="/blogs" className={`text-[10px] sm:text-xs transition-colors duration-250 uppercase tracking-widest font-semibold ${isLight ? 'text-neutral-600 hover:text-[#FF5500]' : 'text-neutral-400 hover:text-[#FF5500]'}`}>Media Vault</Link>
                  </li>
                </ul>
              </div>

            </div>

            {/* Social Network Row */}
            <div className={`px-6 py-6 sm:px-8 border-t border-dashed flex flex-col md:flex-row justify-between items-center gap-6 z-10 ${isLight ? 'border-neutral-300' : 'border-neutral-800'}`}>
              {/* Social Icons Column */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-5 w-full md:w-auto">
                {contacts.map((c) => (
                  <a
                    key={c.name}
                    aria-label={c.name}
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group hover:-translate-y-1 p-2 border border-neutral-800/40 dark:border-neutral-800/70 hover:border-[#FF5500] hover:dark:border-[#FF5500] rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer select-none w-10 h-10 bg-repeat bg-size-[15px_15px] hover:bg-primary"
                    style={{
                      backgroundImage: "url('/stripe.svg')"
                    }}
                    title={`${c.name} - ${c.description}`}
                  >
                    <div
                      className="w-5 h-5 bg-[#FF5500] group-hover:bg-background transition-all duration-300"
                      style={{
                        WebkitMask: `url(${c.icon}) no-repeat center / contain`,
                        mask: `url(${c.icon}) no-repeat center / contain`,
                      }}
                    />
                  </a>
                ))}
              </div>

              {/* Time / Date / Day Column */}
              <div className="w-full md:w-auto flex justify-center md:justify-end">
                <LiveISTClock resolvedTheme={resolvedTheme} />
              </div>
            </div>

            {/* Bottom Row: Copyright & Policy Links */}
            <div className={`px-6 py-5 sm:px-8 border-t border-dashed flex flex-col md:flex-row justify-between items-center gap-4 ${isLight ? 'border-neutral-300' : 'border-neutral-800'}`}>
              <span className={`text-[9px] sm:text-[10px] tracking-widest uppercase ${isLight ? 'text-neutral-500' : 'text-neutral-500'}`}>
                LW19, ALL RIGHTS RESERVED 2026
              </span>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                <Link to="/terms" className="text-[9px] sm:text-[10px] tracking-widest font-semibold text-[#FF5500] hover:underline uppercase">Terms</Link>
                <Link to="/conditions" className="text-[9px] sm:text-[10px] tracking-widest font-semibold text-[#FF5500] hover:underline uppercase">Conditions</Link>
                <Link to="/privacy" className="text-[9px] sm:text-[10px] tracking-widest font-semibold text-[#FF5500] hover:underline uppercase">Privacy Policy</Link>
              </div>
            </div>

          </div>

        </div>

        {/* World Map Section at very bottom - inside the 97% container */}
        <div className={`w-full z-10 border-t border-dashed ${isLight ? 'border-neutral-300' : 'border-neutral-800'}`}>
          <WorldMap />
        </div>

      </div>
    </footer>
  );
}

export default Footer;
