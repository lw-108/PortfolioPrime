import React, { useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import InfiniteMenu from '@/components/InfiniteMenu';
import CreepyButton from '@/components/ui/creepy-button';
import { PieChart } from '@/components/charts/pie-chart';
import { PieSlice } from '@/components/charts/pie-slice';
import { PieCenter } from '@/components/charts/pie-center';
import { PatternLines } from '@visx/pattern';
import { techStackItems, getTechDetails, type TechMetric } from '../lib/tech-data';
import { AnimatedTitle } from '../components/ui/AnimatedTitle';


/* ─── SVG Dynamic Pie Chart Component ─── */
const DynamicPieChart: React.FC<{ metrics: TechMetric[] }> = ({ metrics }) => {
  const pieData = useMemo(() => {
    return metrics.map(m => ({
      label: m.label,
      value: m.value
    }));
  }, [metrics]);

  const avg = useMemo(() => {
    if (metrics.length === 0) return 0;
    return Math.round(metrics.reduce((acc, m) => acc + m.value, 0) / metrics.length);
  }, [metrics]);

  return (
    <div className="flex flex-col items-center justify-center bg-muted/10 border border-border rounded-xl p-4 w-full max-w-[240px] mx-auto aspect-square relative select-none">
      <PieChart data={pieData} innerRadius={55} size={200}>
        <PatternLines height={6} id="dp-1" orientation={["diagonal"]}
          stroke="var(--chart-1)" width={6} />
        <PatternLines height={6} id="dp-2" orientation={["horizontal"]}
          stroke="var(--chart-2)" width={6} />
        <PatternLines height={6} id="dp-3" orientation={["vertical"]}
          stroke="var(--chart-3)" width={6} />
        <PatternLines height={8} id="dp-4" orientation={["diagonalRightToLeft"]}
          stroke="var(--chart-4)" width={8} />
        <PieSlice fill="url(#dp-1)" index={0} />
        <PieSlice fill="url(#dp-2)" index={1} />
        <PieSlice fill="url(#dp-3)" index={2} />
        <PieSlice fill="url(#dp-4)" index={3} />
        <PieCenter defaultLabel="Average" displayValue={avg} suffix="%" />
      </PieChart>
    </div>
  );
};

/* ─── Skills Section ─── */
const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTech, setSelectedTech] = useState<typeof techStackItems[0] | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return techStackItems;
    return techStackItems.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  const techDetails = useMemo(() => {
    if (!selectedTech) return null;
    return getTechDetails(selectedTech.title, selectedTech.category);
  }, [selectedTech]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative z-10 w-full min-h-screen bg-background overflow-hidden select-none font-clash"
    >
      {/* Side border rails */}
      <div className="max-w-384 mx-auto w-full min-h-screen border-x border-dashed border-neutral-800 relative flex flex-col">

        {/* Section Header */}
        <div className="w-full z-20 px-6 sm:px-8 lg:px-16 pt-10 sm:pt-14 relative">
          <header className="border-b border-dashed border-neutral-800 pb-6 sm:pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <span className="text-[#f54900] text-sm uppercase tracking-widest font-semibold">
                Expertise
              </span>
              <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold uppercase tracking-tight mt-2 text-foreground leading-none">
                <AnimatedTitle text="Tech Stack /" />
              </h2>
            </div>
            <div className="flex flex-col items-end gap-2">
              <p className="text-muted-foreground max-w-sm text-sm md:text-base pb-1 text-right">
                Interactive 3D sphere of technologies I work with
              </p>
              <div className="flex gap-4 text-xs text-muted-foreground">
                {/* <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#f54900]"></span>
                  {filteredItems.length} Technologies
                </span> */}
                <span className="flex items-center gap-1">
                  <img src="/grab.svg" className="w-3.5 h-3.5 dark:invert opacity-70" alt="Grab" />
                  Drag to explore
                </span>
              </div>
            </div>
          </header>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-6">
            {['All', 'Frontend', 'Backend', 'Database', 'DevOps', 'Design'].map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 text-xs uppercase tracking-wider border transition-all duration-300 ${isActive
                      ? 'border-[#f54900] text-[#f54900] bg-[#f54900]/10'
                      : 'border-neutral-800 text-muted-foreground hover:border-[#f54900] hover:text-[#f54900]'
                    }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Infinite Menu Container */}
        <div className="flex-1 relative min-h-[450px] sm:min-h-[500px] lg:min-h-[600px] mt-8">
          <InfiniteMenu
            key={activeCategory}
            items={filteredItems}
            scale={0.85}
            onItemClick={(item) => setSelectedTech(item as typeof techStackItems[0])}
          />
        </div>

        {/* Bottom Footer with Creepy Button */}
        <div className="w-full border-t border-dashed border-neutral-800 mt-auto">
          <div className="flex justify-end items-center py-6 px-6 sm:px-8 lg:px-16">
            <CreepyButton onClick={() => window.open('https://github.com', '_blank')}>
              View More
            </CreepyButton>
          </div>
        </div>
      </div>

      {/* Glassmorphic Popup Modal */}
      <AnimatePresence>
        {selectedTech && techDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTech(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 22, stiffness: 220 }}
              className="relative w-full max-w-xl bg-background border border-border rounded-none p-6 sm:p-8 flex flex-col gap-6 overflow-hidden max-h-[90vh] md:max-h-none select-none font-clash"
            >
              {/* Repeating Stripe Background */}
              <div
                className="absolute inset-0 w-full h-full opacity-10 dark:opacity-5 pointer-events-none select-none z-0"
                style={{
                  backgroundImage: "url('/stripe.svg')",
                  backgroundRepeat: 'repeat',
                  backgroundSize: '16px 16px',
                }}
              />

              {/* Header with Close Button Left and Title/Description Pushed to Top */}
              <div className="relative z-10 flex items-start gap-4 border-b border-dashed border-border pb-4">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedTech(null)}
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[#f54900] transition-colors cursor-pointer shrink-0 mt-0.5"
                >
                  ✕
                </button>

                <div className="text-left flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold text-foreground leading-none">{selectedTech.title}</h3>
                    <div className="w-8 h-8 flex items-center justify-center shrink-0">
                      <img
                        src={selectedTech.image}
                        alt={selectedTech.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 items-center mt-2 flex-wrap">
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded border border-border text-muted-foreground">
                      {selectedTech.category}
                    </span>
                    <span className="text-xs text-[#f54900] font-semibold">
                      {selectedTech.description}
                    </span>
                  </div>
                </div>
              </div>

              {/* Chart and Details Info */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center overflow-y-auto pr-1">
                {/* Visual SVG Diagram */}
                <div className="flex flex-col items-center gap-3">
                  <DynamicPieChart metrics={techDetails.metrics} />
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 w-full max-w-[220px]">
                    {techDetails.metrics.map((m, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[10px]">
                        <span className="text-muted-foreground truncate text-left">{m.label}:</span>
                        <span className="text-[#f54900] font-bold">{m.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Text Description & Links */}
                <div className="flex flex-col gap-5 justify-between h-full py-1">
                  <div className="flex flex-col gap-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-foreground border-b border-dashed border-border/40 pb-1 text-left">
                      Experience Details
                    </h4>
                    <p className="text-xs leading-relaxed text-muted-foreground text-left">
                      {techDetails.summary}
                    </p>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => {
                        if (selectedTech.link) window.open(selectedTech.link, '_blank');
                      }}
                      className="flex-1 py-2.5 text-[10px] font-bold uppercase tracking-wider bg-[#f54900] text-[#ffffe3] hover:scale-[1.02] active:scale-[0.98] transition-all rounded cursor-pointer"
                    >
                      Documentation
                    </button>
                    <button
                      onClick={() => setSelectedTech(null)}
                      className="flex-1 py-2.5 text-[10px] font-bold uppercase tracking-wider border border-border text-muted-foreground hover:border-foreground hover:text-foreground active:scale-[0.98] transition-all rounded cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Skills;