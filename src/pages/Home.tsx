import React from 'react';
import Hero from '../sections/Hero';
import ServicesBento from '../sections/ServicesBento';
import StepRibbon from '../sections/StepRibbon';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Experience from '../sections/Experience';
import Skills from '../sections/Skills';
import Education from '../sections/Education';
import Testimonials from '../sections/Testimonials';
import CTA from '../sections/CTA';
import Greetings from '../sections/Greetings';
import Contact from '../sections/Contact';

export const Home: React.FC = () => {
  return (
    <>
      <Hero isLoaded={true} />
      <div className="w-full bg-[url(/stripe.svg)] bg-repeat bg-size-[16px_16px] flex justify-center">
        <div className="w-[97%] max-w-384 mx-auto bg-background flex justify-center">
          <div className="w-1/2 border-t border-neutral-800"></div>
        </div>
      </div>
      <ServicesBento />
      <StepRibbon />
      <About />
      <Projects />
      <section id="experience">
        <Experience />
      </section>
      <Skills />
      <section id="education">
        <Education />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <CTA />
      <Greetings />
      <Contact />
    </>
  );
};

export default Home;
