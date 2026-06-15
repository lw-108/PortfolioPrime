import { useState, useEffect } from 'react'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import ServicesBento from './sections/ServicesBento'
import Steps from './sections/Steps'
import AboutPage from './pages/About'
import { LoadingScreen } from './components/LoadingScreen'

const App = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (showLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
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
      <section 
        className='min-h-screen bg-background text-foreground transition-colors duration-300 relative'
        style={{
          backgroundImage: "url('/stripe.svg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '38px',
          backgroundAttachment: 'fixed',
        }}
      >
        <Navbar />
        <div 
          className="h-6 w-full relative z-10"
          style={{
            backgroundImage: "url('/stripe.svg')",
            backgroundRepeat: 'repeat',
            backgroundSize: '10px',
          }}
        />
        <Hero isLoaded={!showLoading} />
        <div className="max-w-96rem mx-auto w-full border-x border-dashed border-neutral-800 bg-background flex justify-center">
          <div className="w-1/2 border-t border-neutral-800"></div>
        </div>
        <ServicesBento />
        <Steps />
        <AboutPage />
        <div className="h-[40vh] w-full" />
      </section>
    </>
  )
}

export default App