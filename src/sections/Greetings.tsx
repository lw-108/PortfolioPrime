import React from 'react';

export const MaskedGreetingsText = () => {
  const textEnglish = "Thanks for visiting my portfolio, here you can see the best of my works. I am passionate about transforming ideas into compelling visual experiences. I specialize in crafting unique brand identities, digital experiences, and engaging content that resonates with your audience. My mission is to empower businesses and brands to stand out in a crowded market. I believe in quality, not quantity. This portfolio represents a collection of full-stack implementations, React components, and creative animations tailored to deliver delightful UX.";

  const textTamil = "என் போர்ட்ஃபோலியோவிற்கு வருகை தந்ததற்கு நன்றி, எனது சிறந்த படைப்புகளை இங்கே காணலாம். கருத்துக்களைக் கவரும் காட்சி அனுபவங்களாக மாற்றுவதில் நான் ஆர்வம் கொண்டவன். உங்களின் பார்வையாளர்களைக் கவரும் தனித்துவமான பிராண்ட் அடையாளங்கள், டிஜிட்டல் அனுபவங்கள் மற்றும் ஈர்க்கும் உள்ளடக்கங்களை உருவாக்குவதில் நான் நிபுணத்துவம் பெற்றுள்ளேன். நெரிசலான சந்தையில் வணிகங்களும் பிராண்டுகளும் தனித்து நிற்கச் செய்வதே எனது குறிக்கோள். நான் தரத்தையே நம்புகிறேன், அளவை அல்ல. இந்த போர்ட்ஃபோலியோ முழு-ஸ்டாக் செயலாக்கங்கள், ரியாக்ட் கூறுகள் மற்றும் மகிழ்ச்சிகரமான பயனர் அனுபவத்தை வழங்க வடிவமைக்கப்பட்ட ஆக்கப்பூர்வமான அனிமேஷன்களின் தொகுப்பாகும்.";

  return (
    <div
      className="footer-masked-text relative text-center text-3xl md:text-5xl leading-relaxed md:text-left font-clash w-full mx-auto select-none cursor-none overflow-visible"
    >
      {/* English Text */}
      <p className="text-muted-foreground">
        {textEnglish}
      </p>

      {/* Tamil Text — clip-path is driven by CustomCursor.tsx render loop */}
      <p
        className="footer-tamil-overlay absolute bg-[#f54900] text-white pointer-events-none select-none"
        style={{
          inset: '-200px',
          padding: '200px',
          fontFamily: "'Setham', serif",
          fontSize: '0.72em',
          lineHeight: 'inherit',
          opacity: 0,
          clipPath: 'circle(0px at 0px 0px)',
          transform: 'translateY(22px)',
        }}
      >
        {textTamil}
      </p>
    </div>
  );
};

export const Greetings: React.FC = () => {
  return (
    <section id="greetings" className="relative z-10 w-full bg-transparent py-0 px-0 overflow-hidden select-none font-clash">
      <div className="w-[97%] max-w-384 mx-auto bg-background px-4 sm:px-8 lg:px-12 py-20 relative">
        <MaskedGreetingsText />
      </div>
    </section>
  );
};

export default Greetings;
