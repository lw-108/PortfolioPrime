import React from 'react';
import Hero from '../sections/Hero';
import ServicesBento from '../sections/ServicesBento';
import StepRibbon from '../sections/StepRibbon';
import About from '../sections/About';
import Experience from '../sections/Experience';
import Education from '../sections/Education';
import Testimonials from '../sections/Testimonials';

export const Home: React.FC = () => {
  return (
    <>
      <Hero isLoaded={true} />
      <div className="max-w-384 mx-auto w-full border-x border-dashed border-neutral-800 bg-background flex justify-center">
        <div className="w-1/2 border-t border-neutral-800"></div>
      </div>
      <ServicesBento />
      <StepRibbon />
      <About />
      <section id="experience">
        <Experience />
      </section>
      <section id="education">
        <Education />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
    </>
  );
};

export default Home;
