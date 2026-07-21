import React, { useState, useEffect, useRef, Suspense } from 'react';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Dither from '../components/Dither';
import { AnimatedTitle } from '../components/ui/AnimatedTitle';
import { motion, type Variants } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

const revealVariants: Variants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
  hidden: {
    filter: 'blur(8px)',
    y: 15,
    opacity: 0,
  },
};

// 3D Spinning & Interactive Omnitrix Model Component
function OmnitrixModel() {
  const { scene } = useGLTF('https://res.cloudinary.com/dma4ltfxa/image/upload/v1784199174/omnitrix_zaudit.glb');
  const modelRef = useRef<THREE.Group>(null);

  // Deep clone scene to avoid sharing instances across re-renders
  const clonedScene = React.useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.roughness = 0.25;
          child.material.metalness = 0.85;
          child.material.needsUpdate = true;
        }
      }
    });
    return clone;
  }, [scene]);

  useFrame((state) => {
    if (modelRef.current) {
      // Gentle auto-rotation
      modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.45;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={clonedScene}
      scale={1.1}
      position={[0, -0.2, 0]}
    />
  );
}

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '', message: '', services: [] as string[] });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '200px' }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const toggleService = (service: string) => {
    setFormData(prev => {
      const services = prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service];
      return { ...prev, services };
    });
  };

  useEffect(() => {
    const forceScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
      document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
    };
    forceScroll();
    const t1 = setTimeout(forceScroll, 80);
    const t2 = setTimeout(forceScroll, 250);
    const t3 = setTimeout(forceScroll, 500);
    const t4 = setTimeout(forceScroll, 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus('idle');

    try {
      await addDoc(collection(db, 'contactSubmissions'), {
        ...formData,
        source: 'contact-page',
        submittedAt: serverTimestamp(),
      });
      setLoading(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', phone: '', message: '', services: [] });
    } catch (err) {
      console.error('Contact form error:', err);
      setLoading(false);
      setSubmitStatus('error');
    }
  };

  return (
    <section ref={sectionRef} className="w-full relative z-10 min-h-screen bg-transparent py-0 px-0 overflow-hidden select-none font-clash">
      {/* SVG Clip Path Definition with Tighter Corners & Leftward Shifted Step Contour */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="custom-contact-page-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.20 
                     Q 0,0.16 0.04,0.16
                     L 0.18,0.16 
                     Q 0.22,0.16 0.22,0.12
                     L 0.22,0.04
                     Q 0.22,0 0.26,0
                     L 0.96,0 
                     Q 1,0 1,0.04
                     L 1,0.96
                     Q 1,1 0.96,1
                     L 0.04,1
                     Q 0,1 0,0.96
                     Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="w-[97%] max-w-384 mx-auto bg-background min-h-screen mt-[3vh] flex flex-col justify-between relative px-4 sm:px-8 lg:px-12">
        {/* Page Headers */}
        <motion.div 
          custom={0}
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-b border-dashed border-neutral-800/60 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12 pt-8 sm:pt-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[#f54900] text-sm uppercase tracking-widest font-semibold font-clash">
                CONNECT WITH ME
              </span>
            </div>
            <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold uppercase tracking-tight text-foreground leading-none font-clash">
              <AnimatedTitle text="Stay Connected" />
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md font-clash text-sm sm:text-base text-left md:text-right leading-relaxed">
            Reach out for inquiries, support, or collaboration—we'd love to hear from you!
          </p>
        </motion.div>

        {/* Content Layout Grid - Equal 50/50 split for larger form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch flex-1 pb-10">

          {/* Left Side: Form Card */}
          <div className="lg:col-span-6 bg-background dark:bg-background border border-border p-6 sm:p-8 rounded-none shadow-sm flex flex-col justify-between relative overflow-hidden">
            {/* Subtle stripe background for form card only - brighter visibility */}
            <div
              className="absolute inset-0 opacity-25 dark:opacity-15 pointer-events-none select-none z-0"
              style={{
                backgroundImage: "var(--stripe-bg)",
                backgroundRepeat: 'repeat',
                backgroundSize: '16px 16px',
              }}
            />
            <div className="relative z-10 w-full h-full flex flex-col justify-between">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left font-clash">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground uppercase tracking-wider border-b border-dashed border-border pb-3">
                  Work inquiries
                </h2>

                {/* Stacked Input Fields Container (Sharp Edges, Compact -space-y-px, Bigger Form) */}
                <div className="isolate mt-6 -space-y-px border border-border bg-white/5 dark:bg-black/10 rounded-none relative z-10">
                  {/* Name Input */}
                  <label
                    htmlFor="name"
                    className="block relative border-b border-border focus-within:z-10 focus-within:ring-2 focus-within:ring-[#f54900] px-6 pt-6 pb-4 transition-all cursor-text"
                  >
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder=" "
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="peer block w-full border-0 p-0 text-base sm:text-lg md:text-xl font-bold bg-transparent text-foreground focus:ring-0 focus:outline-none mt-2 rounded-none"
                    />
                    <span
                      className="absolute left-6 top-6 px-1.5 text-xs md:text-sm font-bold text-muted-foreground/50 transition-all duration-200 pointer-events-none origin-left uppercase tracking-wider bg-background/0
                        peer-focus:scale-80 peer-focus:translate-y-[-32px] md:peer-focus:translate-y-[-36px] peer-focus:left-4 peer-focus:text-[#f54900] peer-focus:font-extrabold peer-focus:tracking-widest peer-focus:bg-background peer-focus:opacity-100
                        peer-not-placeholder-shown:scale-80 peer-not-placeholder-shown:translate-y-[-32px] md:peer-not-placeholder-shown:translate-y-[-36px] peer-not-placeholder-shown:left-4 peer-not-placeholder-shown:text-[#f54900] peer-not-placeholder-shown:font-extrabold peer-not-placeholder-shown:tracking-widest peer-not-placeholder-shown:bg-background peer-not-placeholder-shown:opacity-100"
                    >
                      Name
                    </span>
                  </label>

                  {/* Email Input */}
                  <label
                    htmlFor="email"
                    className="block relative border-b border-border focus-within:z-10 focus-within:ring-2 focus-within:ring-[#f54900] px-6 pt-6 pb-4 transition-all cursor-text"
                  >
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder=" "
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="peer block w-full border-0 p-0 text-base sm:text-lg md:text-xl font-bold bg-transparent text-foreground focus:ring-0 focus:outline-none mt-2 rounded-none"
                    />
                    <span
                      className="absolute left-6 top-6 px-1.5 text-xs md:text-sm font-bold text-muted-foreground/50 transition-all duration-200 pointer-events-none origin-left uppercase tracking-wider bg-background/0
                        peer-focus:scale-80 peer-focus:translate-y-[-32px] md:peer-focus:translate-y-[-36px] peer-focus:left-4 peer-focus:text-[#f54900] peer-focus:font-extrabold peer-focus:tracking-widest peer-focus:bg-background peer-focus:opacity-100
                        peer-not-placeholder-shown:scale-80 peer-not-placeholder-shown:translate-y-[-32px] md:peer-not-placeholder-shown:translate-y-[-36px] peer-not-placeholder-shown:left-4 peer-not-placeholder-shown:text-[#f54900] peer-not-placeholder-shown:font-extrabold peer-not-placeholder-shown:tracking-widest peer-not-placeholder-shown:bg-background peer-not-placeholder-shown:opacity-100"
                    >
                      Email
                    </span>
                  </label>

                  {/* Company Input */}
                  <label
                    htmlFor="company"
                    className="block relative border-b border-border focus-within:z-10 focus-within:ring-2 focus-within:ring-[#f54900] px-6 pt-6 pb-4 transition-all cursor-text"
                  >
                    <input
                      id="company"
                      type="text"
                      placeholder=" "
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="peer block w-full border-0 p-0 text-base sm:text-lg md:text-xl font-bold bg-transparent text-foreground focus:ring-0 focus:outline-none mt-2 rounded-none"
                    />
                    <span
                      className="absolute left-6 top-6 px-1.5 text-xs md:text-sm font-bold text-muted-foreground/50 transition-all duration-200 pointer-events-none origin-left uppercase tracking-wider bg-background/0
                        peer-focus:scale-80 peer-focus:translate-y-[-32px] md:peer-focus:translate-y-[-36px] peer-focus:left-4 peer-focus:text-[#f54900] peer-focus:font-extrabold peer-focus:tracking-widest peer-focus:bg-background peer-focus:opacity-100
                        peer-not-placeholder-shown:scale-80 peer-not-placeholder-shown:translate-y-[-32px] md:peer-not-placeholder-shown:translate-y-[-36px] peer-not-placeholder-shown:left-4 peer-not-placeholder-shown:text-[#f54900] peer-not-placeholder-shown:font-extrabold peer-not-placeholder-shown:tracking-widest peer-not-placeholder-shown:bg-background peer-not-placeholder-shown:opacity-100"
                    >
                      Company
                    </span>
                  </label>

                  {/* Phone Input */}
                  <label
                    htmlFor="phone"
                    className="block relative border-b border-border focus-within:z-10 focus-within:ring-2 focus-within:ring-[#f54900] px-6 pt-6 pb-4 transition-all cursor-text"
                  >
                    <input
                      id="phone"
                      type="tel"
                      placeholder=" "
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="peer block w-full border-0 p-0 text-base sm:text-lg md:text-xl font-bold bg-transparent text-foreground focus:ring-0 focus:outline-none mt-2 rounded-none"
                    />
                    <span
                      className="absolute left-6 top-6 px-1.5 text-xs md:text-sm font-bold text-muted-foreground/50 transition-all duration-200 pointer-events-none origin-left uppercase tracking-wider bg-background/0
                        peer-focus:scale-80 peer-focus:translate-y-[-32px] md:peer-focus:translate-y-[-36px] peer-focus:left-4 peer-focus:text-[#f54900] peer-focus:font-extrabold peer-focus:tracking-widest peer-focus:bg-background peer-focus:opacity-100
                        peer-not-placeholder-shown:scale-80 peer-not-placeholder-shown:translate-y-[-32px] md:peer-not-placeholder-shown:translate-y-[-36px] peer-not-placeholder-shown:left-4 peer-not-placeholder-shown:text-[#f54900] peer-not-placeholder-shown:font-extrabold peer-not-placeholder-shown:tracking-widest peer-not-placeholder-shown:bg-background peer-not-placeholder-shown:opacity-100"
                    >
                      Phone
                    </span>
                  </label>

                  {/* Message Textarea */}
                  <label
                    htmlFor="message"
                    className="block relative focus-within:z-10 focus-within:ring-2 focus-within:ring-[#f54900] px-6 pt-6 pb-4 transition-all cursor-text"
                  >
                    <textarea
                      id="message"
                      required
                      rows={4}
                      placeholder=" "
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="peer block w-full border-0 p-0 text-base sm:text-lg md:text-xl font-bold bg-transparent text-foreground focus:ring-0 focus:outline-none mt-2 resize-none rounded-none"
                    />
                    <span
                      className="absolute left-6 top-6 px-1.5 text-xs md:text-sm font-bold text-muted-foreground/50 transition-all duration-200 pointer-events-none origin-left uppercase tracking-wider bg-background/0
                        peer-focus:scale-80 peer-focus:translate-y-[-32px] md:peer-focus:translate-y-[-36px] peer-focus:left-4 peer-focus:text-[#f54900] peer-focus:font-extrabold peer-focus:tracking-widest peer-focus:bg-background peer-focus:opacity-100
                        peer-not-placeholder-shown:scale-80 peer-not-placeholder-shown:translate-y-[-32px] md:peer-not-placeholder-shown:translate-y-[-36px] peer-not-placeholder-shown:left-4 peer-not-placeholder-shown:text-[#f54900] peer-not-placeholder-shown:font-extrabold peer-not-placeholder-shown:tracking-widest peer-not-placeholder-shown:bg-background peer-not-placeholder-shown:opacity-100"
                    >
                      Message
                    </span>
                  </label>
                </div>

                {/* Services Selection Grid */}
                <fieldset className="border border-border p-4 mt-6 rounded-none font-clash relative z-10 text-left bg-white/5 dark:bg-black/10">
                  <legend className="px-3 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#f54900] bg-background">
                    What services do you need?
                  </legend>
                  <div className="grid grid-cols-1 min-[420px]:grid-cols-6 gap-3 mt-2">
                    {[
                      { name: 'Web Development', cols: 'col-span-1 min-[420px]:col-span-6 md:col-span-4' },
                      { name: 'UI/UX Design', cols: 'col-span-1 min-[420px]:col-span-3 md:col-span-2' },
                      { name: 'Branding', cols: 'col-span-1 min-[420px]:col-span-3 md:col-span-2' },
                      { name: 'Mobile Apps', cols: 'col-span-1 min-[420px]:col-span-6 md:col-span-4' }
                    ].map((service) => {
                      const isSelected = formData.services.includes(service.name);
                      return (
                        <button
                          key={service.name}
                          type="button"
                          onClick={() => toggleService(service.name)}
                          className={`${service.cols} px-3 py-4 text-xs min-[420px]:text-xs sm:text-sm font-bold uppercase tracking-wider transition-all rounded-none border-2 text-center cursor-pointer select-none leading-tight
                            ${isSelected
                              ? 'bg-[#f54900] border-[#f54900] text-[#ffffe3] shadow-[0_0_15px_rgba(245,73,0,0.25)]'
                              : 'border-border bg-transparent text-foreground hover:bg-neutral-800/10 dark:hover:bg-white/5'
                            }`}
                        >
                          {service.name}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Submit Button + Status */}
                <div className="mt-10 w-full flex flex-col gap-3 relative z-10">
                  {submitStatus === 'success' && (
                    <div className="w-full px-4 py-3 border border-green-500/40 bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-widest">
                      ✓ Message received — I'll get back to you soon!
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="w-full px-4 py-3 border border-red-500/40 bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-widest">
                      ✕ Something went wrong. Please try again.
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-16 text-sm font-bold uppercase tracking-wider bg-[#f54900] text-[#ffffe3] hover:bg-[#f54900]/95 active:scale-[0.99] transition-all duration-150 border-2 border-foreground rounded-none cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending...' : 'Send →'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Side: Clipped Screen Matching Form Height (Hidden on Mobile) */}
          <div className="hidden lg:flex lg:col-span-6 flex-col justify-center items-stretch w-full relative">
            <div
              className="relative w-full h-full min-h-[480px] lg:min-h-0 bg-neutral-900 shadow-2xl transition-all duration-300"
              style={{
                clipPath: 'url(#custom-contact-page-clip)',
                WebkitClipPath: 'url(#custom-contact-page-clip)',
              }}
            >
              {/* DEEPER LAYER: Dither Wave Background Shader */}
              <div className="absolute inset-0 z-0">
                {isVisible && (
                  <Dither
                    waveSpeed={0.04}
                    waveFrequency={3.5}
                    waveAmplitude={0.25}
                    colorNum={5}
                    pixelSize={isMobile ? 3 : 2.5}
                    waveColor={[0.96, 0.28, 0.0]}
                  />
                )}
              </div>

              {/* HIGHER LAYER: Dedicated 3D Omnitrix Canvas with Orbit Rotation Controls */}
              {!isMobile && isVisible && (
                <div className="absolute inset-0 z-10 pointer-events-auto">
                  <Canvas
                    camera={{ position: [0, 0, 5.5], fov: 42 }}
                    dpr={[1, 1.2]}
                    gl={{ antialias: false, powerPreference: "high-performance" }}
                  >
                    <ambientLight intensity={0.9} />
                    <directionalLight position={[0, 8, 2]} intensity={3.5} castShadow />
                    <directionalLight position={[5, 4, 5]} intensity={1.5} />
                    <pointLight position={[-4, -4, -4]} intensity={0.5} />
                    <Suspense fallback={null}>
                      <OmnitrixModel />
                    </Suspense>
                    <OrbitControls
                      enableZoom={false}
                      enablePan={false}
                    />
                  </Canvas>
                </div>
              )}

              {/* Mobile Static Fallback overlay */}
              {isMobile && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
                  <div className="w-28 h-28 rounded-full bg-[#f54900]/10 border-4 border-dashed border-[#f54900] flex items-center justify-center animate-spin duration-15000 shadow-[0_0_35px_rgba(245,73,0,0.3)]">
                    <div className="w-16 h-16 rounded-full bg-[#f54900]/20 border-2 border-solid border-[#f54900] flex items-center justify-center">
                      <div className="w-6 h-6 bg-[#f54900] rounded-sm transform rotate-45" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Avatars overlay removed as requested */}
          </div>
        </div>
      </div>
    </section>
  );
};

useGLTF.preload('https://res.cloudinary.com/dma4ltfxa/image/upload/v1784199174/omnitrix_zaudit.glb');

export default ContactPage;
