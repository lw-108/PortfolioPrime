import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { AnimatedTitle } from '../components/ui/AnimatedTitle';

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  }),
  hidden: {
    filter: 'blur(8px)' as const,
    y: 24,
    opacity: 0,
  },
} as const;

type LegalSection = { heading: string; content: string };
type LegalContent = {
  title: string;
  subtitle: string;
  date: string;
  sections: LegalSection[];
};

const getContent = (type: string): LegalContent => {
  switch (type) {
    case 'terms':
      return {
        title: 'Terms of Service',
        subtitle: 'Rules & Rules of Engagement',
        date: 'Last updated: July 14, 2026',
        sections: [
          {
            heading: '1. Agreement to Terms',
            content:
              'By accessing this developer portfolio and its associated initiatives (LW19), you agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue use of this site immediately.',
          },
          {
            heading: '2. Intellectual Property Rights',
            content:
              'All source code, designs, visual assets, music assets, and text materials displayed on this portfolio are the intellectual property of the developer unless otherwise stated. You may inspect the code for educational purposes, but copying or redistributing assets for commercial ventures without direct permission is strictly prohibited.',
          },
          {
            heading: '3. Acceptable Use',
            content:
              'You agree not to attempt to disrupt the performance of this site, inject malicious code into forms, scrape portfolio project media assets using unauthorized bots, or bypass the navigation constraints designed into the user interfaces.',
          },
          {
            heading: '4. Disclaimer of Warranty',
            content:
              'This portfolio and its showcase projects are provided on an "as-is" basis. No guarantees or warranties are made regarding their uptime, suitability for commercial integration, or error-free rendering.',
          },
          {
            heading: '5. Limitation of Liability',
            content:
              'Under no circumstances shall the developer be liable for any indirect, incidental, special, or consequential damages arising from your access to or use of this portfolio, even if advised of the possibility of such damages.',
          },
        ],
      };

    case 'conditions':
      return {
        title: 'Conditions of Use',
        subtitle: 'Interactive & API Usage Agreements',
        date: 'Last updated: July 14, 2026',
        sections: [
          {
            heading: '1. Showcase Projects & External Links',
            content:
              'This site contains links to external client platforms, applications, and seminaries. By interacting with these links, you acknowledge that their content, privacy policies, and performance are managed outside our scope.',
          },
          {
            heading: '2. Submission Ingestion',
            content:
              'By submitting your data via our Contact forms or interactive features, you authorize this site to store and process the submitted details in our secure Firebase Database for engagement and consultation.',
          },
          {
            heading: '3. Audio & Media Ingestion',
            content:
              'Audio waveforms, dynamic rendering, and canvas dither effects are computationally heavy features. By loading this site, you agree to run these webGL models on your client device at your own discretion.',
          },
          {
            heading: '4. Modification of Terms',
            content:
              'We reserve the right to amend these Conditions of Use at any time. Continued use of this portfolio after modifications constitutes acceptance of the updated conditions.',
          },
        ],
      };

    case 'privacy':
    default:
      return {
        title: 'Privacy Policy',
        subtitle: 'Data Integrity & Tracking Information',
        date: 'Last updated: July 14, 2026',
        sections: [
          {
            heading: '1. Information We Collect',
            content:
              'We collect information you explicitly submit through our Contact form (Name, Email, Message, Service needs) and metadata automatically logged from page views using our custom analytics trackers (Page paths, click stats, timestamp).',
          },
          {
            heading: '2. How We Store Data',
            content:
              'Explicit inquiries are securely saved in our Cloud Firestore collection (contactSubmissions). Analytics metrics and click track logs are collected to gauge page performance and improve page loading metrics.',
          },
          {
            heading: '3. Third Party Integrations',
            content:
              'We use Firebase Firestore to store messages and Cloudinary to serve optimized project screenshot graphics. We do not sell, rent, or lease your contact information to external marketing agencies.',
          },
          {
            heading: '4. Cookie Usage',
            content:
              'This site uses lightweight client storage (localStorage) to persist user preferences like theme choices (Dark/Light Mode) to guarantee immediate loading response rates.',
          },
          {
            heading: '5. Your Rights',
            content:
              'You have the right to request deletion of any personal data you have submitted through this portfolio. Contact us directly via the Contact page and your data will be purged within 7 business days.',
          },
        ],
      };
  }
};

export const LegalPage: React.FC = () => {
  const { pathname } = useLocation();
  const type = pathname.replace('/', '');
  const { title, subtitle, date, sections } = getContent(type);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Split sections into two columns
  const mid = Math.ceil(sections.length / 2);
  const colLeft = sections.slice(0, mid);
  const colRight = sections.slice(mid);

  return (
    <section
      id="legal-section"
      className="relative z-10 font-clash select-none bg-transparent min-h-screen"
    >
      {/* ── Single Unified Container (matches AboutPage pattern) ── */}
      <div className="w-[97%] max-w-384 mx-auto bg-background min-h-[calc(100vh-4rem)] px-6 sm:px-8 lg:px-16 pt-8 sm:pt-12 pb-20 sm:pb-24 lg:pb-32">

        {/* ── Header ── */}
        <div
          id="legal-title"
          className="border-b border-dashed border-neutral-800 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12"
        >
          <div>
            <span className="text-[#f54900] text-sm uppercase tracking-widest font-semibold">
              {subtitle}
            </span>
            <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold uppercase tracking-tight mt-2 text-foreground leading-none">
              <AnimatedTitle key={title} text={`${title} /`} />
            </h1>
          </div>
          <motion.span
            custom={1}
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-neutral-500 font-clash text-xs uppercase tracking-widest whitespace-nowrap"
          >
            {date}
          </motion.span>
        </div>

        {/* ── Intro callout ── */}
        <motion.div
          custom={2}
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 border-l-2 border-[#f54900] pl-5"
        >
          <p className="text-muted-foreground font-clash text-sm sm:text-base leading-relaxed max-w-2xl">
            Please read the following carefully. Your continued use of this portfolio constitutes
            full acceptance of the content below.
          </p>
        </motion.div>

        {/* ── Two-column content grid ── */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {/* Left column */}
          <div className="space-y-10">
            {colLeft.map((sec, idx) => (
              <motion.div
                key={idx}
                custom={idx + 3}
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-3 group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#f54900] text-xs font-bold opacity-60 group-hover:opacity-100 transition-opacity">
                    ✱
                  </span>
                  <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-foreground">
                    {sec.heading}
                  </h2>
                </div>
                <p className="text-sm text-neutral-400 font-clash leading-relaxed pl-6">
                  {sec.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right column */}
          <div className="space-y-10">
            {colRight.map((sec, idx) => (
              <motion.div
                key={idx}
                custom={idx + 3 + mid}
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-3 group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#f54900] text-xs font-bold opacity-60 group-hover:opacity-100 transition-opacity">
                    ✱
                  </span>
                  <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-foreground">
                    {sec.heading}
                  </h2>
                </div>
                <p className="text-sm text-neutral-400 font-clash leading-relaxed pl-6">
                  {sec.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Footer divider row ── */}
        <motion.div
          custom={sections.length + 4}
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 border-t border-dashed border-neutral-800 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
        >
          <span className="text-neutral-600 text-xs uppercase tracking-widest font-clash">
            © {new Date().getFullYear()} MK Lingeshwarma · All rights reserved
          </span>
          <span className="text-[#f54900] text-xs uppercase tracking-widest font-clash">
            LW19 Portfolio
          </span>
        </motion.div>

      </div>
    </section>
  );
};

export default LegalPage;
