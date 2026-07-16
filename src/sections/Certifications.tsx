import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
  type FC,
} from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { AnimatedTitle } from '../components/ui/AnimatedTitle';
import { techStackItems } from '../lib/tech-data';

export interface CertificationPosition {
  id: string;
  title: string;
  employmentPeriod: string;
  employmentType?: string;
  description?: string;
  skills?: string[];
}

export interface CertificationItemType {
  id: string;
  companyName: string;
  companyLogo?: string;
  image: string;
  yearLabel: string;
  positions: CertificationPosition[];
  isCurrentEmployer?: boolean;
}

// Preserved internship data for future updates
export const futureInternshipData: CertificationItemType[] = [
  {
    id: 'pitowings',
    companyName: 'Pitowings Predictive Cybersecurity',
    isCurrentEmployer: true,
    image: 'https://i.ibb.co/gLVQ2rtC/pitowings.png',
    yearLabel: '2026',
    positions: [
      {
        id: 'pito-intern',
        title: 'Cyber Security Intern',
        employmentPeriod: 'May 2026 - Present',
        employmentType: 'Internship',
        description: 'Assisting in predictive threat hunting, monitoring firewall and security event logs, and analyzing vulnerabilities to secure cloud infrastructure.',
        skills: ['Cyber Security', 'Threat Analysis', 'Vulnerability Assessment', 'Network Security']
      }
    ]
  },
  {
    id: 'thiran',
    companyName: 'THIRAN360AI',
    image: '/exp/360.png',
    yearLabel: '2026',
    positions: [
      {
        id: 'thiran-mern',
        title: 'MERN Stack Developer Intern',
        employmentPeriod: 'May 2026',
        employmentType: 'Internship',
        description: 'Developed modern full-stack web applications. Participated in AI API model integrations and polished front-end user experience.',
        skills: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Tailwind CSS']
      }
    ]
  }
];

const certificationsData: CertificationItemType[] = [
  {
    id: 'qtree',
    companyName: 'Q Tree Technologies',
    image: 'https://i.ibb.co/PvqkVWZK/qtree.jpg',
    yearLabel: '2023',
    positions: [
      {
        id: 'qtree-mean',
        title: 'MEAN Stack Developer Trainee',
        employmentPeriod: 'Jul 2023 - Dec 2023',
        employmentType: 'Trainee',
        description: 'Gained hands-on training and built full-stack applications using MongoDB, Express.js, Angular, and Node.js. Managed database schemas and REST API endpoints.',
        skills: ['MongoDB', 'Express.js', 'Angular', 'Node.js', 'REST API', 'JWT']
      }
    ]
  },
  {
    id: 'csc',
    companyName: 'CSC Computer Education',
    image: 'https://i.ibb.co/8g5488Bt/csc.png',
    yearLabel: '2020',
    positions: [
      {
        id: 'csc-student',
        title: 'Programming & Automation Student',
        employmentPeriod: 'Jan 2020 - Mar 2020',
        employmentType: 'Student',
        description: 'Acquired programming basics in C and Object-Oriented programming concepts in C++ along with office automation tools.',
        skills: ['C', 'C++', 'OOP Concepts', 'Automation Tools']
      }
    ]
  }
];

// Define the type for the context value
interface ProgressSliderContextType {
  active: string;
  progress: number;
  handleButtonClick: (value: string) => void;
  vertical: boolean;
}

// Define the type for the component props
interface ProgressSliderProps {
  children: ReactNode;
  duration?: number;
  fastDuration?: number;
  vertical?: boolean;
  activeSlider: string;
  className?: string;
  onActiveChange?: (active: string) => void;
}

interface SliderContentProps {
  children: ReactNode;
  className?: string;
}

interface SliderWrapperProps {
  children: ReactNode;
  value: string;
  className?: string;
}

interface ProgressBarProps {
  children: ReactNode;
  className?: string;
}

interface SliderBtnProps {
  children: ReactNode;
  value: string;
  className?: string;
  progressBarClass?: string;
}

const ProgressSliderContext = createContext<
  ProgressSliderContextType | undefined
>(undefined);

export const useProgressSliderContext = (): ProgressSliderContextType => {
  const context = useContext(ProgressSliderContext);
  if (!context) {
    throw new Error(
      'useProgressSliderContext must be used within a ProgressSlider'
    );
  }
  return context;
};

export const ProgressSlider: FC<ProgressSliderProps> = ({
  children,
  duration = 5000,
  fastDuration = 400,
  vertical = false,
  activeSlider,
  className,
  onActiveChange,
}) => {
  const [active, setActive] = useState<string>(activeSlider);
  const [progress, setProgress] = useState<number>(0);
  const [isFastForward, setIsFastForward] = useState<boolean>(false);
  const frame = useRef<number>(0);
  const firstFrameTime = useRef<number>(performance.now());
  const targetValue = useRef<string | null>(null);
  const [sliderValues] = useState<string[]>(
    certificationsData.map((e) => e.id)
  );

  useEffect(() => {
    if (onActiveChange) {
      onActiveChange(active);
    }
  }, [active, onActiveChange]);

  useEffect(() => {
    if (sliderValues.length > 0) {
      firstFrameTime.current = performance.now();
      frame.current = requestAnimationFrame(animate);
    }
    return () => {
      cancelAnimationFrame(frame.current);
    };
  }, [sliderValues, active, isFastForward]);

  const animate = (now: number) => {
    const currentDuration = isFastForward ? fastDuration : duration;
    const elapsedTime = now - firstFrameTime.current;
    const timeFraction = elapsedTime / currentDuration;

    if (timeFraction <= 1) {
      setProgress(
        isFastForward
          ? progress + (100 - progress) * timeFraction
          : timeFraction * 100
      );
      frame.current = requestAnimationFrame(animate);
    } else {
      if (isFastForward) {
        setIsFastForward(false);
        if (targetValue.current !== null) {
          setActive(targetValue.current);
          targetValue.current = null;
        }
      } else {
        const currentIndex = sliderValues.indexOf(active);
        const nextIndex = (currentIndex + 1) % sliderValues.length;
        setActive(sliderValues[nextIndex]);
      }
      setProgress(0);
      firstFrameTime.current = performance.now();
    }
  };

  const handleButtonClick = (value: string) => {
    if (value !== active) {
      const elapsedTime = performance.now() - firstFrameTime.current;
      const currentProgress = (elapsedTime / duration) * 100;
      setProgress(currentProgress);
      targetValue.current = value;
      setIsFastForward(true);
      firstFrameTime.current = performance.now();
    }
  };

  return (
    <ProgressSliderContext.Provider
      value={{ active, progress, handleButtonClick, vertical }}
    >
      <div className={cn('relative', className)}>{children}</div>
    </ProgressSliderContext.Provider>
  );
};

export const SliderContent: FC<SliderContentProps> = ({
  children,
  className,
}) => {
  return <div className={cn('', className)}>{children}</div>;
};

export const SliderWrapper: FC<SliderWrapperProps> = ({
  children,
  value,
  className,
}) => {
  const { active } = useProgressSliderContext();

  return (
    <AnimatePresence mode='popLayout'>
      {active === value && (
        <motion.div
          key={value}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className={cn('', className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const SliderBtnGroup: FC<ProgressBarProps> = ({
  children,
  className,
}) => {
  return <div className={cn('', className)}>{children}</div>;
};

export const SliderBtn: FC<SliderBtnProps> = ({
  children,
  value,
  className,
  progressBarClass,
}) => {
  const { active, progress, handleButtonClick, vertical } =
    useProgressSliderContext();

  return (
    <button
      className={cn(
        `relative transition-all duration-300 ${active === value ? 'opacity-100 font-bold' : 'opacity-65 hover:opacity-85'}`,
        className
      )}
      onClick={() => handleButtonClick(value)}
    >
      {children}
      <div
        className='absolute bottom-0 left-0 right-0 h-1 overflow-hidden bg-neutral-800/20 dark:bg-neutral-200/10'
        role='progressbar'
        aria-valuenow={active === value ? progress : 0}
      >
        <span
          className={cn('absolute left-0 top-0 bottom-0 bg-primary transition-all duration-75', progressBarClass)}
          style={{
            [vertical ? 'height' : 'width']:
              active === value ? `${progress}%` : '0%',
          }}
        />
      </div>
    </button>
  );
};

export const Certifications: React.FC = () => {
  const getTechIcon = (skillName: string) => {
    const item = techStackItems.find(t => t.title.toLowerCase() === skillName.toLowerCase());
    return item ? item.image : null;
  };

  return (
    <section id="certifications" className="relative z-10 w-full bg-transparent pt-0 pb-0 px-0 overflow-hidden select-none">
      <div className="w-[97%] max-w-384 mx-auto bg-background flex flex-col justify-between relative px-4 sm:px-8 lg:px-12 py-12">

        {/* Header */}
        <div className="border-b border-dashed border-border pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div>
            <span className="text-[#f54900] text-sm uppercase tracking-widest font-semibold font-heading">
              Journey
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold uppercase tracking-tight mt-2 text-foreground leading-none font-clash">
              <AnimatedTitle text="Certifications" />
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xs text-sm sm:text-base text-left md:text-right font-clash-light">
            Industrial training and certifications
          </p>
        </div>

        {/* Progress Slider Component */}
        <ProgressSlider
          activeSlider="qtree"
          duration={6000}
          className="w-full"
        >
          {/* Main Slide Container */}
          <SliderContent className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Left side: Slide representation */}
            <div className="lg:col-span-6 flex flex-col gap-4 w-full">
              {/* Image container */}
              <div className="relative rounded-none overflow-hidden shadow-2xl border border-neutral-200/10 dark:border-neutral-800/50 aspect-video w-full">
                {certificationsData.map((exp) => (
                  <SliderWrapper key={exp.id} value={exp.id} className="absolute inset-0 w-full h-full">
                    {/* Background image */}
                    <img
                      src={exp.image}
                      alt={exp.companyName}
                      className="w-full h-full object-cover brightness-[0.9] dark:brightness-[0.8] transition-all duration-75"
                    />
                    {/* Year text with mix-blend-mode: difference */}
                    <div className="absolute top-4 left-6 text-4xl sm:text-6xl lg:text-9xl font-bold font-heading mix-blend-difference text-white z-20 pointer-events-none select-none tracking-tighter">
                      {exp.yearLabel}
                    </div>
                    {/* Glassmorphism Title Card overlay (Desktop view only) */}
                    <div className="hidden lg:block absolute bottom-6 left-6 right-6 p-6 backdrop-blur-md bg-white/10 dark:bg-black/30 border border-white/20 dark:border-white/10 rounded-none w-auto">
                      <h3 className="text-white text-2xl font-heading tracking-tight font-extrabold mix-blend-difference">
                        {exp.companyName}
                      </h3>
                      {exp.isCurrentEmployer && (
                        <span className="inline-flex items-center gap-1.5 mt-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-none text-xs font-semibold">
                          <span className="size-1.5 rounded-none bg-emerald-400 animate-pulse" />
                          Current Position
                        </span>
                      )}
                    </div>
                  </SliderWrapper>
                ))}
              </div>

              {/* Mobile/Tablet Glassmorphism Company Card (below the image) */}
              <div className="lg:hidden relative min-h-[80px] w-full">
                {certificationsData.map((exp) => (
                  <SliderWrapper key={exp.id} value={exp.id} className="absolute inset-x-0 top-0 w-full">
                    <div className="p-4 backdrop-blur-md bg-neutral-100/40 dark:bg-neutral-950/20 border border-neutral-200/50 dark:border-neutral-800/50 rounded-none w-full">
                      <h3 className="text-foreground text-base sm:text-lg font-heading tracking-tight font-extrabold">
                        {exp.companyName}
                      </h3>
                      {exp.isCurrentEmployer && (
                        <span className="inline-flex items-center gap-1.5 mt-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-none text-[10px] sm:text-xs font-semibold">
                          <span className="size-1.5 rounded-none bg-emerald-400 animate-pulse" />
                          Current Position
                        </span>
                      )}
                    </div>
                  </SliderWrapper>
                ))}
              </div>
            </div>

            {/* Right side: Experience Details with Glassmorphism UI */}
            <div className="lg:col-span-6 flex flex-col justify-between backdrop-blur-md bg-background border border-neutral-200/50 dark:border-neutral-800/50 p-6 sm:p-8 rounded-none shadow-sm">
              {certificationsData.map((exp) => (
                <SliderWrapper key={exp.id} value={exp.id} className="w-full h-full flex flex-col justify-between space-y-6">
                  {exp.positions.map((pos) => {
                    return (
                      <div key={pos.id} className="space-y-6 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Position Header */}
                          <div className="flex items-center gap-3 border-b border-dashed border-neutral-200 dark:border-neutral-800 pb-4">
                            <div>
                              <h4 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight font-heading">
                                {pos.title}
                              </h4>
                              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mt-1 uppercase tracking-wider font-semibold font-clash-light">
                                {pos.employmentType && (
                                  <>
                                    <span>{pos.employmentType}</span>
                                    <span className="text-border">•</span>
                                  </>
                                )}
                                <span>{pos.employmentPeriod}</span>
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          {pos.description && (
                            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-clash-light mt-6">
                              {pos.description}
                            </p>
                          )}
                        </div>

                        {/* Tech Badges */}
                        {pos.skills && pos.skills.length > 0 && (
                          <div className="mt-8 pt-4 border-t border-dashed border-neutral-200 dark:border-neutral-800">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-3 font-heading">
                              Technologies Used
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {pos.skills.map((skill, index) => {
                                const icon = getTechIcon(skill);
                                return (
                                  <span
                                    key={index}
                                    className="inline-flex items-center gap-2 bg-primary text-white px-3.5 py-2 font-clash-light text-xs sm:text-sm rounded-none border-none select-none shadow-sm hover:scale-105 transition-transform duration-200"
                                  >
                                    {icon && (
                                      <img
                                        src={icon}
                                        alt={skill}
                                        className="w-4.5 h-4.5 object-contain invert brightness-200"
                                      />
                                    )}
                                    <span>{skill}</span>
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </SliderWrapper>
              ))}
            </div>

          </SliderContent>

          {/* Navigation Button Group with Countdown Indicator */}
          <SliderBtnGroup className="flex flex-wrap gap-3 mt-8 border-t border-dashed border-neutral-200 dark:border-neutral-800 pt-6">
            {certificationsData.map((exp) => (
              <SliderBtn
                key={exp.id}
                value={exp.id}
                className="flex-1 min-w-[140px] text-left p-4 pb-6 bg-secondary/30 dark:bg-neutral-900/30 hover:bg-secondary/50 dark:hover:bg-neutral-900/50 rounded-none"
                progressBarClass="bg-primary h-[3px]"
              >
                <span className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold font-clash-light">
                  {exp.yearLabel}
                </span>
                <span className="block text-sm sm:text-base font-bold text-foreground truncate mt-1 font-heading">
                  {exp.companyName}
                </span>
              </SliderBtn>
            ))}
          </SliderBtnGroup>

        </ProgressSlider>

      </div>
    </section>
  );
};

export default Certifications;
