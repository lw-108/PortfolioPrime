import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WorldMap from '../components/ui/WorldMap';
import { useTheme } from '../components/theme-provider';
import StickerPeel from '../components/StickerPeel'
import logo from '/logo.png'

const contacts = [
  {
    name: "Mail",
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/40/Zorin_Icon_Themes_%E2%80%93_mail-message-new-symbolic.svg",
    link: "mailto:lingeshwarma108@gmail.com",
    color: "#ff5500",
    description: "Send an email"
  },
  {
    name: "Twitter",
    icon: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg",
    link: "https://x.com/lingeshwarma19",
    color: "#ff5500",
    description: "Follow for updates"
  },
  {
    name: "Instagram",
    icon: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Instagram_simple_icon.svg",
    link: "https://www.instagram.com/lingeshwarma_19/",
    color: "#ff5500",
    description: "Visual portfolio"
  },
  {
    name: "WhatsApp",
    icon: "https://upload.wikimedia.org/wikipedia/commons/9/90/WhatsApp_font_awesome.svg",
    link: "https://wa.me/919025464209",
    color: "#ff5500",
    description: "Instant messaging"
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
    name: "Dribbble",
    icon: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Feather-logos-dribbble.svg",
    link: "https://dribbble.com/lingeshwarma",
    color: "#ff5500",
    description: "Design showcase"
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
    <div className="flex flex-col items-start md:items-end font-clash text-left md:text-right gap-3 select-none md:pl-4">
      <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight uppercase leading-none ${resolvedTheme === 'light' ? 'text-neutral-900' : 'text-white'}`}>
        {timeStr} <span className="text-[#FF5500] text-sm sm:text-base font-extrabold ml-1.5">IST</span>
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
      <div className={`w-[97%] max-w-384 mx-auto relative transition-colors duration-300 ${isLight ? 'bg-[#ffffe3] text-neutral-900' : 'bg-[#0b0a0a] text-white'}`}>

        {/* Main Grid: Left Logo + Right Content */}
        <div className="grid grid-cols-1 md:grid-cols-12">

          {/* Left Section: LW Logo Container */}
          <div className={`col-span-1 md:col-span-4 flex items-center justify-center py-16 md:py-0 md:pr-10 min-h-[220px] md:min-h-[300px] relative transition-colors duration-300 ${isLight ? 'bg-[#f5f4dc]' : 'bg-black'}`}>
            <StickerPeel
              imageSrc={logo}
              width={260}
              rotate={0}
              peelBackHoverPct={30}
              peelBackActivePct={40}
              shadowIntensity={0.5}
              lightingIntensity={0.1}
              initialPosition={{ x: -100, y: 100 }}
              peelDirection={0}
            />
            {/* Vertical Stripe Divider */}
            <div
              className={`hidden md:block absolute right-0 top-0 bottom-0 w-10 border-l border-r border-dashed ${isLight ? 'border-neutral-300' : 'border-neutral-800'}`}
              style={{
                background: isLight
                  ? 'repeating-linear-gradient(135deg, #eae9d0, #eae9d0 6px, #f5f4dc 6px, #f5f4dc 12px)'
                  : 'repeating-linear-gradient(135deg, #161616, #161616 6px, #000000 6px, #000000 12px)'
              }}
            />
          </div>

          {/* Right Section: Navigation Links & Subheader */}
          <div className="col-span-1 md:col-span-8 flex flex-col justify-between">

            {/* Top Row: Tagline */}
            <div className={`px-6 py-6 sm:px-8 border-b border-dashed flex items-center ${isLight ? 'border-neutral-300' : 'border-neutral-800'}`}>
              <span className={`text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                LW19, FROM IDEA TO IMPACT, WITHOUT THE NOISE.
              </span>
            </div>

            {/* Middle Row: Links Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 flex-1">

              {/* Column 1: Your Launchpad */}
              <div className={`px-6 py-8 sm:px-8 border-b sm:border-b-0 sm:border-r border-dashed ${isLight ? 'border-neutral-300' : 'border-neutral-800'}`}>
                <h4 className={`text-sm font-bold uppercase tracking-wider mb-6 ${isLight ? 'text-neutral-900' : 'text-white'}`}>Your Launchpad</h4>
                <ul className="space-y-4">
                  <li>
                    <Link to="/" className={`text-xs transition-colors duration-250 uppercase tracking-widest font-semibold ${isLight ? 'text-neutral-600 hover:text-[#FF5500]' : 'text-neutral-400 hover:text-[#FF5500]'}`}>Home</Link>
                  </li>
                  <li>
                    <a href="#works" className={`text-xs transition-colors duration-250 uppercase tracking-widest font-semibold ${isLight ? 'text-neutral-600 hover:text-[#FF5500]' : 'text-neutral-400 hover:text-[#FF5500]'}`}>Projects</a>
                  </li>
                  <li>
                    <a href="#contact" className={`text-xs transition-colors duration-250 uppercase tracking-widest font-semibold ${isLight ? 'text-neutral-600 hover:text-[#FF5500]' : 'text-neutral-400 hover:text-[#FF5500]'}`}>Get Started</a>
                  </li>
                </ul>
              </div>

              {/* Column 2: Meet the Creator */}
              <div className={`px-6 py-8 sm:px-8 border-b sm:border-b-0 sm:border-r border-dashed ${isLight ? 'border-neutral-300' : 'border-neutral-800'}`}>
                <h4 className={`text-sm font-bold uppercase tracking-wider mb-6 ${isLight ? 'text-neutral-900' : 'text-white'}`}>Meet the Creator</h4>
                <ul className="space-y-4">
                  <li>
                    <a href="#about" className={`text-xs transition-colors duration-250 uppercase tracking-widest font-semibold ${isLight ? 'text-neutral-600 hover:text-[#FF5500]' : 'text-neutral-400 hover:text-[#FF5500]'}`}>About</a>
                  </li>
                  <li>
                    <a href="/resume" className={`text-xs transition-colors duration-250 uppercase tracking-widest font-semibold ${isLight ? 'text-neutral-600 hover:text-[#FF5500]' : 'text-neutral-400 hover:text-[#FF5500]'}`}>Resume</a>
                  </li>
                  <li>
                    <a href="#contact" className={`text-xs transition-colors duration-250 uppercase tracking-widest font-semibold ${isLight ? 'text-neutral-600 hover:text-[#FF5500]' : 'text-neutral-400 hover:text-[#FF5500]'}`}>Contact</a>
                  </li>
                </ul>
              </div>

              {/* Column 3: Let's Connect */}
              <div className={`px-6 py-8 sm:px-8 border-b sm:border-b-0 border-dashed ${isLight ? 'border-neutral-300' : 'border-neutral-800'}`}>
                <h4 className={`text-sm font-bold uppercase tracking-wider mb-6 ${isLight ? 'text-neutral-900' : 'text-white'}`}>Let's Connect</h4>
                <ul className="space-y-4">
                  <li>
                    <a href="https://x.com/lingeshwarma19" target="_blank" rel="noopener noreferrer" className={`text-xs transition-colors duration-250 uppercase tracking-widest font-semibold ${isLight ? 'text-neutral-600 hover:text-[#FF5500]' : 'text-neutral-400 hover:text-[#FF5500]'}`}>Twitter / X</a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/lingeshwarma19/" target="_blank" rel="noopener noreferrer" className={`text-xs transition-colors duration-250 uppercase tracking-widest font-semibold ${isLight ? 'text-neutral-600 hover:text-[#FF5500]' : 'text-neutral-400 hover:text-[#FF5500]'}`}>LinkedIn</a>
                  </li>
                  <li>
                    <a href="https://github.com/lw-108" target="_blank" rel="noopener noreferrer" className={`text-xs transition-colors duration-250 uppercase tracking-widest font-semibold ${isLight ? 'text-neutral-600 hover:text-[#FF5500]' : 'text-neutral-400 hover:text-[#FF5500]'}`}>GitHub</a>
                  </li>
                  <li>
                    <a href="mailto:lingeshwarma108@gmail.com" className={`text-xs transition-colors duration-250 uppercase tracking-widest font-semibold ${isLight ? 'text-neutral-600 hover:text-[#FF5500]' : 'text-neutral-400 hover:text-[#FF5500]'}`}>Mail</a>
                  </li>
                  <li>
                    <a href="https://stackoverflow.com/users/31676920/lingeshwarma" target="_blank" rel="noopener noreferrer" className={`text-xs transition-colors duration-250 uppercase tracking-widest font-semibold ${isLight ? 'text-neutral-600 hover:text-[#FF5500]' : 'text-neutral-400 hover:text-[#FF5500]'}`}>Stackoverflow</a>
                  </li>
                </ul>
              </div>

            </div>

            {/* Social Network Row */}
            <div className={`px-6 py-5 sm:px-8 border-t border-dashed flex flex-col md:flex-row justify-between items-start md:items-center gap-6 z-10 ${isLight ? 'border-neutral-300' : 'border-neutral-800'}`}>
              {/* Social Icons Column */}
              <div className="flex flex-wrap items-center justify-start gap-4">
                {contacts.map((c) => (
                  <a
                    key={c.name}
                    aria-label={c.name}
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:-translate-y-1 p-2 transition-transform duration-300 flex items-center justify-center cursor-pointer select-none"
                    title={`${c.name} - ${c.description}`}
                  >
                    <div
                      className="w-5 h-5 bg-[#FF5500] opacity-75 hover:opacity-100 transition-opacity"
                      style={{
                        WebkitMask: `url(${c.icon}) no-repeat center / contain`,
                        mask: `url(${c.icon}) no-repeat center / contain`,
                      }}
                    />
                  </a>
                ))}
              </div>

              {/* Time / Date / Day Column */}
              <LiveISTClock resolvedTheme={resolvedTheme} />
            </div>

            {/* Bottom Row: Copyright & Policy Links */}
            <div className={`px-6 py-6 sm:px-8 border-t border-dashed flex flex-col sm:flex-row justify-between items-center gap-4 ${isLight ? 'border-neutral-300' : 'border-neutral-800'}`}>
              <span className={`text-[10px] tracking-widest uppercase ${isLight ? 'text-neutral-500' : 'text-neutral-500'}`}>
                LW19, ALL RIGHTS RESERVED 2026
              </span>
              <div className="flex gap-6">
                <a href="#terms" className="text-[10px] tracking-widest font-semibold text-[#FF5500] hover:underline uppercase">Terms</a>
                <a href="#conditions" className="text-[10px] tracking-widest font-semibold text-[#FF5500] hover:underline uppercase">Conditions</a>
                <a href="#privacy" className="text-[10px] tracking-widest font-semibold text-[#FF5500] hover:underline uppercase">Privacy Policy</a>
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
