import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './sections/Navbar'
import Home from './pages/Home'
import Footer from './sections/Footer'
import { LoadingScreen } from './components/LoadingScreen'

const AboutPage = lazy(() => import('./pages/AboutPage'))
const SkillsPage = lazy(() => import('./pages/SkillsPage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const ResumePage = lazy(() => import('./pages/ResumePage'))
const BlogsPage = lazy(() => import('./pages/BlogsPage'))
const LegalPage = lazy(() => import('./pages/LegalPage'))

gsap.registerPlugin(ScrollTrigger);

// Helper to scroll window to top on route change and refresh ScrollTrigger
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    const performScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
      document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
    };
    
    performScroll();
    const scrollTimer = setTimeout(performScroll, 80);

    // Refresh ScrollTrigger once route has updated and DOM is stable
    const triggerTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 180);

    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(triggerTimer);
    };
  }, [pathname]);

  return null;
};

// Layout wrapper for all pages
const Layout = () => {
  const { pathname } = useLocation();
  const isLegalPage = ['/terms', '/conditions', '/privacy'].includes(pathname);
  const isProjectsPage = pathname === '/projects';
  const isSkillsPage = pathname === '/skills';
  const isAboutPage = pathname === '/about';
  const isBlogsPage = pathname === '/blogs';
  const isContactPage = pathname === '/contact';
  const isResumePage = pathname === '/resume';
  const isHomePage = pathname === '/';

  const isSpaceReducedPage = isProjectsPage || isSkillsPage || isAboutPage || isBlogsPage || isContactPage || isResumePage || isHomePage;

  return (
    <section 
      className='min-h-screen bg-background text-foreground transition-colors duration-300 relative flex flex-col'
      style={{
        backgroundImage: "url('https://i.ibb.co/7x9yp8J2/stripe.jpg')",
        backgroundRepeat: 'repeat',
        backgroundSize: '24px 24px',
        backgroundAttachment: 'fixed',
      }}
    >
      <ScrollToTop />
      <Navbar />
      {!isProjectsPage && !isSkillsPage && !isAboutPage && !isBlogsPage && !isContactPage && !isResumePage && !isHomePage && (
        <div 
          className="h-6 w-full relative z-10 animate-pulse"
          style={{
            backgroundImage: "url('https://i.ibb.co/7x9yp8J2/stripe.jpg')",
            backgroundRepeat: 'repeat',
            backgroundSize: '10px',
          }}
        />
      )}
      <main className={`flex-1 w-full relative z-30 ${
        isLegalPage
          ? 'pt-10'
          : isSpaceReducedPage
          ? 'pt-0'
          : 'pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-24 lg:pb-32'
      }`}>
        <Suspense fallback={
          <div className="w-full h-[60vh] flex items-center justify-center bg-transparent">
            <div className="w-10 h-10 border-2 border-dashed border-[#f54900] rounded-full animate-spin" />
          </div>
        }>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </section>
  );
};

const App = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (showLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Refresh ScrollTrigger once DOM changes and loading screen is gone
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showLoading]);

  return (
    <>
      {showLoading && (
        <LoadingScreen onComplete={() => setShowLoading(false)} />
      )}
      {!showLoading && (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="skills" element={<SkillsPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="resume" element={<ResumePage />} />
              <Route path="blogs" element={<BlogsPage />} />
              <Route path="terms" element={<LegalPage />} />
              <Route path="conditions" element={<LegalPage />} />
              <Route path="privacy" element={<LegalPage />} />
            </Route>
          </Routes>
        </Router>
      )}
    </>
  )
}

export default App