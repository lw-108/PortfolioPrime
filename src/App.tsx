import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './sections/Navbar'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import SkillsPage from './pages/SkillsPage'
import ProjectsPage from './pages/ProjectsPage' // Force reload HMR
import ContactPage from './pages/ContactPage'
import ResumePage from './pages/ResumePage'
import BlogsPage from './pages/BlogsPage'
import Footer from './sections/Footer'
import { LoadingScreen } from './components/LoadingScreen'

gsap.registerPlugin(ScrollTrigger);

// Helper to scroll window to top on route change and refresh ScrollTrigger
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTo({ top: 0, behavior: 'instant' as any });
    document.body.scrollTo({ top: 0, behavior: 'instant' as any });
    
    // Refresh ScrollTrigger once route has updated and DOM is stable
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [pathname]);

  return null;
};

// Layout wrapper for all pages
const Layout = () => {
  return (
    <section 
      className='min-h-screen bg-background text-foreground transition-colors duration-300 relative flex flex-col'
      style={{
        backgroundImage: "url('/stripe.svg')",
        backgroundRepeat: 'repeat',
        backgroundSize: '24px 24px',
        backgroundAttachment: 'fixed',
      }}
    >
      <ScrollToTop />
      <Navbar />
      <div 
        className="h-6 w-full relative z-10 animate-pulse"
        style={{
          backgroundImage: "url('/stripe.svg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '10px',
        }}
      />
      <main className="flex-1 w-full relative z-30">
        <Outlet />
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
            </Route>
          </Routes>
        </Router>
      )}
    </>
  )
}

export default App