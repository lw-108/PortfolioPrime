import { Link } from 'react-router-dom';
import { ArrowUp, Moon, Sun, Heart } from 'lucide-react';
import { useTheme } from '../components/theme-provider';
import WorldMap from '../components/ui/WorldMap';

function handleScrollTop() {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Inline SVGs for social platforms to ensure compatibility
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YouTubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="9.7 15 9.7 9 14.3 12 9.7 15" />
  </svg>
);

const XIcon = () => (
  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const ThreadsIcon = () => (
  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
    <path d="M12.012 0C5.398 0 0 5.398 0 12.012s5.398 12.012 12.012 12.012c6.614 0 12.012-5.398 12.012-12.012S18.626 0 12.012 0zm3.87 16.59c-.66.66-1.59.99-2.79.99-.9 0-1.68-.21-2.34-.63-.66-.42-1.14-1.02-1.44-1.8-.3-.78-.45-1.74-.45-2.88s.15-2.1.45-2.88c.3-.78.78-1.38 1.44-1.8.66-.42 1.44-.63 2.34-.63 1.2 0 2.13.33 2.79.99s.99 1.59.99 2.79v1.23c0 .87-.3 1.56-.9 2.07s-1.38.75-2.34.75c-.75 0-1.35-.18-1.8-.54s-.69-.9-.72-1.62c-.42.6-.96 1.05-1.62 1.35s-1.38.45-2.16.45c-1.14 0-2.04-.33-2.7-.99s-.99-1.59-.99-2.79c0-1.23.33-2.16.99-2.79s1.56-.99 2.7-.99c.78 0 1.5.15 2.16.45s1.2.75 1.62 1.35v-.63c0-.75.21-1.35.63-1.8s.99-.69 1.71-.72V5.1c-.93 0-1.68.21-2.25.63s-.93 1.02-1.08 1.8c-.45-.63-1.02-1.08-1.71-1.35s-1.44-.41-2.25-.41c-1.5 0-2.7.45-3.6 1.35s-1.35 2.1-1.35 3.6v1.8c0 1.5.45 2.7 1.35 3.6s2.1 1.35 3.6 1.35c.81 0 1.56-.14 2.25-.41s1.26-.72 1.71-1.35c.15.78.51 1.38 1.08 1.8s1.32.63 2.25.63v-.54c-.72-.03-1.29-.27-1.71-.72s-.63-1.05-.63-1.8v-1.23c0-1.2.33-2.13.99-2.79s1.59-.99 2.79-.99c.9 0 1.68.21 2.34.63s.99 1.05.99 1.89v1.23c0 1.2-.33 2.13-.99 2.79z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.298 1.448 5.356 1.449 5.514 0 10.002-4.487 10.005-10.007.001-2.673-1.036-5.186-2.922-7.071C17.202 1.636 14.69 0.6 12.012 0.6 6.498 0.6 2.01 5.088 2.008 10.604c-.001 2.062.547 3.655 1.577 5.334L2.592 21.41l5.882-1.54c-.496.3-1.243.684-1.827-.716zM17.06 14.12c-.274-.137-1.62-.8-1.87-.892-.252-.093-.437-.137-.62.137-.182.274-.707.892-.867 1.075-.16.182-.32.206-.593.07-1.042-.52-1.72-.924-2.42-2.128-.152-.258.152-.24.436-.8.084-.168.042-.314-.02-.45-.064-.138-.62-1.49-.85-2.04-.223-.538-.45-.465-.62-.473-.16-.008-.344-.01-.528-.01-.184 0-.485.07-.74.343-.254.274-.97.948-.97 2.31 0 1.363.99 2.68 1.104 2.835.114.156 1.948 2.973 4.718 4.168.658.285 1.173.454 1.574.58.662.21 1.265.18 1.742.11.53-.08 1.62-.663 1.85-1.272.23-.61.23-1.13.16-1.24-.07-.11-.253-.18-.528-.316z"/>
  </svg>
);

const BehanceIcon = () => (
  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
    <path d="M22 13.5h-8c0-1.748 1.252-2.5 3.75-2.5 2.5 0 3.75.752 3.75 2.5zm1-3.25c-.244-.24-.582-.366-.998-.366h-6.004c-.416 0-.754.126-.998.366s-.366.574-.366.99v4.528c0 .416.122.746.366.99.244.244.582.366.998.366H22c.416 0 .754-.122.998-.366s.366-.574.366-.99v-4.528c0-.416-.122-.75-.366-.99zm-13.75-6.5C8.366 3.75 7.25 3.75 5.5 3.75H2v15.5h3.5c1.75 0 2.866 0 3.75-.95 1-.95 1.5-2.2 1.5-3.8 0-1.25-.374-2.25-1.12-2.75.746-.5 1.12-1.5 1.12-2.75 0-1.6-.5-2.85-1.5-3.8zm-.75 3.5c0 .6-.2.95-.6 1.1-.4.15-1 .15-1.8.15H4.25V6.75h1.6c.8 0 1.4 0 1.8.15.4.15.6.5.6 1.1zm.5 6.5c0 .6-.2.95-.6 1.1-.4.15-1 .15-1.8.15H4.25v-3.5h1.6c.8 0 1.4 0 1.8.15.4.15.6.5.6 1.1zm11-.5c.828 0 1.5.672 1.5 1.5S19.828 16 19 16s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/>
  </svg>
);

interface NavigationItem {
  name: string;
  href: string;
  external?: boolean;
}

interface NavigationSection {
  id: string;
  name: string;
  items: NavigationItem[];
}

interface NavigationCategory {
  id: string;
  name: string;
  sections: NavigationSection[];
}

interface NavigationData {
  categories: NavigationCategory[];
}

const navigation: NavigationData = {
  categories: [
    {
      id: "portfolio",
      name: "Portfolio Navigation",
      sections: [
        {
          id: "about",
          name: "About",
          items: [
            { name: "Home", href: "/" },
            { name: "About", href: "/about" },
            { name: "Resume", href: "/resume" },
          ],
        },
        {
          id: "features",
          name: "Features",
          items: [
            { name: "Projects", href: "/projects" },
            { name: "Skills", href: "/skills" },
            { name: "Contact", href: "/contact" },
          ],
        },
        {
          id: "socials-list",
          name: "Social Profiles",
          items: [
            { name: "GitHub", href: "https://github.com/LW-8877", external: true },
            { name: "LinkedIn", href: "https://linkedin.com/in/lingeshwarma-mk", external: true },
            { name: "Mail", href: "mailto:lingeshwarma8877@gmail.com", external: true },
          ],
        },
      ],
    },
  ],
};

const Underline = `hover:-translate-y-1 border border-dotted border-neutral-600 dark:border-neutral-800 rounded-xl p-2.5 transition-transform text-muted-foreground hover:text-[#f54900] hover:border-[#f54900] duration-300`;

export const Theme = () => {
  const { setTheme } = useTheme();

  return (
    <div className="flex items-center justify-center select-none font-clash">
      <div className="flex items-center rounded-full border border-dotted border-neutral-700 p-1 bg-background/50 backdrop-blur-sm">
        <button
          onClick={() => setTheme("light")}
          className="dark:bg-background mr-3 rounded-full bg-black p-2 text-white dark:text-white cursor-pointer hover:scale-105 active:scale-95 transition-all"
        >
          <Sun className="h-5 w-5" strokeWidth={1.5} />
          <span className="sr-only">Light Theme</span>
        </button>

        <button type="button" onClick={handleScrollTop} className="cursor-pointer text-foreground hover:text-[#f54900] transition-colors p-1">
          <ArrowUp className="h-4 w-4" />
          <span className="sr-only">Top</span>
        </button>

        <button
          onClick={() => setTheme("dark")}
          className="ml-3 rounded-full p-2 text-black dark:bg-black dark:text-white cursor-pointer hover:scale-105 active:scale-95 transition-all"
        >
          <Moon className="h-5 w-5" strokeWidth={1.5} />
          <span className="sr-only">Dark Theme</span>
        </button>
      </div>
    </div>
  );
};

export function Footer() {
  return (
    <footer className="mx-auto mt-20 flex h-full w-full flex-col items-center justify-center font-clash bg-background border-t border-dashed border-neutral-800/60 pb-12 select-none z-10 relative">
      
      {/* Repeating Stripe Background Overlay */}
      <div
        className="absolute inset-x-0 top-0 h-4 opacity-[0.06] dark:opacity-[0.04] pointer-events-none select-none z-0"
        style={{
          backgroundImage: "url('/stripe.svg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '16px 16px',
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center justify-center gap-6 p-10 pb-0 md:flex z-10">
        <Link to="/" className="flex items-center justify-center rounded-full shrink-0">
          <img src="/logo-dark.svg" alt="Logo" className="w-16 h-auto dark:block hidden" />
          <img src="/logo-light.svg" alt="Logo" className="w-16 h-auto dark:hidden block" />
        </Link>
        <p className="text-muted-foreground text-center text-xs leading-5 md:text-left font-clash max-w-3xl">
          Welcome to my portfolio, where creativity meets strategy to bring your
          vision to life. I am passionate about transforming ideas into
          compelling visual experiences. I specialize in crafting unique brand
          identities, immersive digital experiences, and engaging content that
          resonates with your audience. My mission is to empower businesses and
          brands to stand out in a crowded market. I believe in quality, not quantity.
          This portfolio represents a collection of full-stack implementations, React components, 
          and creative animations tailored to deliver delightful UX.
        </p>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 py-8 z-10">
        <div className="border-b border-dotted border-neutral-700 dark:border-neutral-800"></div>
        <div className="py-10">
          {navigation.categories.map((category) => (
            <div
              key={category.name}
              className="grid grid-cols-3 flex-row justify-between gap-6 leading-6 md:flex"
            >
              {category.sections.map((section) => (
                <div key={section.name} className="flex flex-col items-center md:items-start">
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#f54900] mb-3">{section.name}</h4>
                  <ul
                    role="list"
                    className="flex flex-col space-y-2 text-center md:text-left"
                  >
                    {section.items.map((item) => (
                      <li key={item.name} className="flow-root">
                        {item.external ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-neutral-600 hover:text-[#f54900] dark:text-neutral-400 hover:dark:text-white transition-colors font-semibold uppercase tracking-wider"
                          >
                            {item.name}
                          </a>
                        ) : (
                          <Link
                            to={item.href}
                            className="text-xs text-neutral-600 hover:text-[#f54900] dark:text-neutral-400 hover:dark:text-white transition-colors font-semibold uppercase tracking-wider"
                          >
                            {item.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="border-b border-dotted border-neutral-700 dark:border-neutral-800"></div>
      </div>

      {/* Social Network Section */}
      <div className="flex flex-wrap justify-center gap-y-6 z-10 w-full px-6">
        <div className="flex flex-wrap items-center justify-center gap-6 gap-y-4 px-6">
          <a
            aria-label="Email"
            href="mailto:lingeshwarma8877@gmail.com"
            className={Underline}
          >
            <MailIcon />
          </a>
          <a
            aria-label="X / Twitter"
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className={Underline}
          >
            <XIcon />
          </a>
          <a
            aria-label="Instagram"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={Underline}
          >
            <InstagramIcon />
          </a>
          <a
            aria-label="Threads"
            href="https://threads.net"
            target="_blank"
            rel="noopener noreferrer"
            className={Underline}
          >
            <ThreadsIcon />
          </a>
          <a
            aria-label="WhatsApp"
            href="https://wa.me"
            target="_blank"
            rel="noopener noreferrer"
            className={Underline}
          >
            <WhatsAppIcon />
          </a>
          <a
            aria-label="Behance"
            href="https://behance.net"
            target="_blank"
            rel="noopener noreferrer"
            className={Underline}
          >
            <BehanceIcon />
          </a>
          <a
            aria-label="Facebook"
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={Underline}
          >
            <FacebookIcon />
          </a>
          <a
            aria-label="LinkedIn"
            href="https://linkedin.com/in/lingeshwarma-mk"
            target="_blank"
            rel="noopener noreferrer"
            className={Underline}
          >
            <LinkedInIcon />
          </a>
          <a
            aria-label="YouTube"
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className={Underline}
          >
            <YouTubeIcon />
          </a>
        </div>
        <Theme />
      </div>

      <div className="mx-auto mt-10 flex flex-col justify-between text-center text-xs md:max-w-7xl z-10">
        <div className="flex flex-row items-center justify-center gap-1 text-slate-600 dark:text-slate-400">
          <span> © </span>
          <span>{new Date().getFullYear()}</span>
          <span>Made with</span>
          <Heart className="mx-1 h-4 w-4 animate-pulse text-red-600 fill-red-600" />
          <span> by </span>
          <span className="hover:text-[#f54900] cursor-pointer text-black dark:text-white font-bold transition-colors">
            Lingeshwarma MK
          </span>
        </div>
      </div>

      {/* World Map Section at very bottom - full width */}
      <div className="w-full z-10 mt-12">
        <WorldMap />
      </div>
    </footer>
  );
}

export default Footer;
