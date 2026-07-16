import React from 'react';
import Hero from '../sections/Hero';
import SubHero from '../sections/SubHero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import ServicesBento from '../sections/ServicesBento';
import StepRibbon from '../sections/StepRibbon';
import Projects from '../sections/Projects';
import Experience from '../sections/Experience';
import Education from '../sections/Education';
import Certifications from '../sections/Certifications';
import Testimonials from '../sections/Testimonials';
import LatestBlogs from '../sections/LatestBlogs';
import CTA from '../sections/CTA';
import Greetings from '../sections/Greetings';
import Contact from '../sections/Contact';

export const Home: React.FC = () => {
  return (
    <>
      <Hero isLoaded={true} />
      <div className="w-full bg-[url(https://i.ibb.co/7x9yp8J2/stripe.jpg)] bg-repeat bg-size-[16px_16px] flex justify-center">
        <div className="w-[97%] max-w-384 mx-auto bg-background flex justify-center">
          <div className="w-1/2 border-t border-neutral-800"></div>
        </div>
      </div>
      <SubHero />
      <About />
      <Skills />
      <ServicesBento />
      <StepRibbon />
      <Projects />
      <Experience />
      <section id="education">
        <Education />
      </section>
      <Certifications />
      <section id="testimonials">
        <Testimonials />
      </section>
      <LatestBlogs />
      <CTA />
      <Greetings />
      <Contact />
    </>
  );
};

export default Home;
