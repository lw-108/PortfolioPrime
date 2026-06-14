import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import ServicesBento from './sections/ServicesBento'
import Steps from './sections/Steps'

const App = () => {
  return (
    <section 
      className='min-h-screen bg-background text-foreground transition-colors duration-300 relative'
      style={{
        backgroundImage: "url('/stripe.svg')",
        backgroundRepeat: 'repeat',
        backgroundSize: '38px',
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
      <Hero />
      <div className="max-w-96rem mx-auto w-full border-x border-dashed border-neutral-800 bg-background flex justify-center">
        <div className="w-1/2 border-t border-neutral-800"></div>
      </div>
      <ServicesBento />
      <Steps />
    </section>
  )
}

export default App