import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

export const Greetings: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const textEnglish = "Thanks for visiting my portfolio, here you can see the best of my works. I am passionate about transforming ideas into compelling visual experiences. I specialize in crafting unique brand identities, digital experiences, and engaging content that resonates with your audience. My mission is to empower businesses and brands to stand out in a crowded market. I believe in quality, not quantity. This portfolio represents a collection of full-stack implementations, React components, and creative animations tailored to deliver delightful UX.";

  const textTamil = "என் போர்ட்ஃபோலியோவிற்கு வருகை தந்ததற்கு நன்றி, எனது சிறந்த படைப்புகளை இங்கே காணலாம். கருத்துக்களைக் கவரும் காட்சி அனுபவங்களாக மாற்றுவதில் நான் ஆர்வம் கொண்டவன். உங்களின் பார்வையாளர்களைக் கவரும் தனித்துவமான பிராண்ட் அடையாளங்கள், டிஜிட்டல் அனுபவங்கள் மற்றும் ஈர்க்கும் உள்ளடக்கங்களை உருவாக்குவதில் நான் நிபுணத்துவம் பெற்றுள்ளேன். நெரிசலான சந்தையில் வணிகங்களும் பிராண்டுகளும் தனித்து நிற்கச் செய்வதே எனது குறிக்கோள். நான் தரத்தையே நம்புகிறேன், அளவை அல்ல. இந்த போர்ட்ஃபோலியோ முழு-ஸ்டாக் செயலாக்கங்கள், ரியாக்ட் கூறுகள் மற்றும் மகிழ்ச்சிகரமான பயனர் அனுபவத்தை வழங்க வடிவமைக்கப்பட்ட ஆக்கப்பூர்வமான அனிமேஷன்களின் தொகுப்பாகும்.";

  const updateMousePosition = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    // Initialize spotlight center coordinates inside text boundaries
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({ x: rect.width / 2, y: rect.height / 2 });
    }
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  const maskSize = 480;

  // Split texts to make the first letter larger
  const firstLetterEnglish = textEnglish[0];
  const restEnglish = textEnglish.slice(1);

  const firstLetterTamil = textTamil[0];
  const restTamil = textTamil.slice(1);

  return (
    <section id="greetings" className="relative z-40 w-full bg-transparent py-0 px-0 overflow-hidden select-none font-clash">
      <div className="w-[97%] max-w-384 mx-auto bg-background px-6 sm:px-10 lg:px-16 py-20 relative">

        <div
          ref={containerRef}
          className="relative w-full overflow-visible"
        >
          {/* Masked Tamil Text Layer — bg-[#f54900] prime color background (higher z-index, masks with radial gradient directly) */}
          <motion.div
            className="absolute bg-[#f54900] text-white text-base sm:text-xl md:text-2xl lg:text-3xl leading-relaxed select-none pointer-events-none z-50 text-left sm:text-justify"
            style={{
              inset: "-300px",
              padding: "300px",
              WebkitMaskImage: `radial-gradient(circle ${maskSize / 2}px at calc(${mousePosition.x}px + 300px) calc(${mousePosition.y}px + 300px), black 100%, transparent 100%)`,
              maskImage: `radial-gradient(circle ${maskSize / 2}px at calc(${mousePosition.x}px + 300px) calc(${mousePosition.y}px + 300px), black 100%, transparent 100%)`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              letterSpacing: "0.04em",
              wordSpacing: "0.28em",
              lineHeight: "2.1",
              fontFamily: "'Noto Serif Tamil', 'Latha', 'Setham', serif",
            }}
          >
            <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mr-1 float-left leading-[0.8] text-white">
              {firstLetterTamil}
            </span>
            {restTamil}
          </motion.div>

          {/* Default English Text Layer — Styled in low-contrast black/white based on theme */}
          <div 
            className="text-black/45 dark:text-white/45 font-clash text-xl sm:text-3xl md:text-4xl lg:text-5xl leading-relaxed select-none relative z-0 text-left sm:text-justify"
            style={{ letterSpacing: '0.04em', wordSpacing: '0.1em', lineHeight: '1.6' }}
          >
            <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase mr-1 float-left leading-[0.8] text-black/45 dark:text-white/45">
              {firstLetterEnglish}
            </span>
            {restEnglish}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Greetings;
