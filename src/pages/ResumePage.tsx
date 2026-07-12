import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatedTitle } from '../components/ui/AnimatedTitle';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: 'easeOut' as const,
    },
  }),
  hidden: {
    filter: 'blur(8px)' as const,
    y: 15,
    opacity: 0,
  },
} as const;

export const ResumePage: React.FC = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [rendering, setRendering] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pdfDocRef = useRef<any>(null);
  const renderTaskRef = useRef<any>(null);
  const pageNumRef = useRef<number>(1);

  // Render a given page number onto the canvas
  const renderPage = useCallback((pageNum: number, pdfDocInstance?: any) => {
    const doc = pdfDocInstance || pdfDocRef.current;
    if (!doc) return;

    // Cancel any in-progress render to prevent collisions
    if (renderTaskRef.current) {
      renderTaskRef.current.cancel();
      renderTaskRef.current = null;
    }

    setRendering(true);
    setLoading(true);

    doc.getPage(pageNum).then((page: any) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      if (!context) return;

      const containerWidth = canvas.parentElement?.clientWidth || 800;
      const unscaledViewport = page.getViewport({ scale: 1.0 });
      const scale = Math.max(0.5, containerWidth / unscaledViewport.width);
      // Retina/HiDPI sharpness
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const viewport = page.getViewport({ scale: scale * dpr });

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = '100%';
      canvas.style.height = 'auto';

      const renderContext = { canvasContext: context, viewport };
      const renderTask = page.render(renderContext);
      renderTaskRef.current = renderTask;

      renderTask.promise.then(() => {
        setRendering(false);
        setLoading(false);
        renderTaskRef.current = null;
      }).catch((err: any) => {
        if (err?.name !== 'RenderingCancelledException') {
          console.error('Render error:', err);
          setRendering(false);
          setLoading(false);
        }
      });
    }).catch((err: any) => {
      console.error('getPage error:', err);
      setRendering(false);
      setLoading(false);
    });
  }, []);

  // Initialise PDF.js once via CDN dynamic script injection
  useEffect(() => {
    const PDFJS_VERSION = '3.11.174';
    const CDN_BASE = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}`;

    // Avoid double-injection if script already exists
    const existingScript = document.getElementById('pdfjs-script');
    if (existingScript) {
      const pdfjs = (window as any).pdfjsLib;
      if (pdfjs && !pdfDocRef.current) {
        pdfjs.GlobalWorkerOptions.workerSrc = `${CDN_BASE}/pdf.worker.min.js`;
        loadPDF(pdfjs);
      } else if (pdfDocRef.current) {
        renderPage(currentPage);
      }
      return;
    }

    const script = document.createElement('script');
    script.id = 'pdfjs-script';
    script.src = `${CDN_BASE}/pdf.min.js`;
    script.async = true;

    script.onload = () => {
      const pdfjs = (window as any).pdfjsLib;
      if (!pdfjs) {
        setError(true);
        setLoading(false);
        return;
      }
      pdfjs.GlobalWorkerOptions.workerSrc = `${CDN_BASE}/pdf.worker.min.js`;
      loadPDF(pdfjs);
    };

    script.onerror = () => {
      setError(true);
      setLoading(false);
    };

    document.body.appendChild(script);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPDF = (pdfjs: any) => {
    pdfjs.getDocument('/LW19.pdf').promise
      .then((pdfDoc: any) => {
        pdfDocRef.current = pdfDoc;
        setNumPages(pdfDoc.numPages);
        renderPage(1, pdfDoc);
      })
      .catch((err: any) => {
        console.error('PDF load error:', err);
        setError(true);
        setLoading(false);
      });
  };

  // Re-render on responsive resize
  useEffect(() => {
    const handleResize = () => {
      if (pdfDocRef.current) {
        renderPage(pageNumRef.current);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderPage]);

  const goToPage = (newPage: number) => {
    if (rendering || newPage < 1 || newPage > numPages) return;
    pageNumRef.current = newPage;
    setCurrentPage(newPage);
    renderPage(newPage);
  };

  return (
    <section id="resume-page" className="relative z-10 w-full min-h-screen bg-transparent pt-20 pb-0 px-0 overflow-hidden select-none font-clash">
      <div className="w-[97%] max-w-384 mx-auto bg-background flex flex-col relative px-4 sm:px-8 lg:px-12 pb-0">

        {/* ── Page Header ── */}
        <motion.div
          custom={0}
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-b border-dashed border-border pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
        >
          <div>
            <span className="text-primary text-sm uppercase tracking-widest font-semibold">
              Curriculum Vitae
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold uppercase tracking-tight mt-2 text-foreground leading-none">
              <AnimatedTitle text="My Resume" />
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
            <p className="text-muted-foreground text-sm max-w-xs text-left md:text-right">
              High-resolution PDF rendered directly in your browser, no plugins needed.
            </p>
            <a
              href="/LW19.pdf"
              download="Lingeshwarma_MK_Resume.pdf"
              className="flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider bg-primary text-[#ffffe3] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </a>
          </div>
        </motion.div>

        {/* ── PDF Viewer ── */}
        <motion.div
          custom={1}
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full mt-12 mb-0 pb-0 flex-1 flex flex-col items-center"
        >
          <div className="w-full max-w-4xl mx-auto relative">
            {/* Neo-brutalist offset shadow */}
            <div className="absolute inset-0 translate-x-[5px] translate-y-[5px] bg-primary pointer-events-none" />

            {/* Main frame */}
            <div className="relative w-full border-2 border-foreground bg-neutral-950 flex flex-col">

              {/* ── Toolbar (top navigation) ── */}
              <div className="w-full flex items-center justify-between border-b-2 border-foreground bg-background px-4 py-2.5 gap-3 flex-wrap">
                {/* Left: branding */}
                <div className="flex items-center gap-2 shrink-0">
                  <img src="/logo.png" alt="logo" className="w-8 h-8" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-foreground">
                    Lingeshwarma MK
                  </span>
                </div>

                {/* Centre: top nav controls */}
                <div className="flex items-center gap-3">
                  <button
                    disabled={currentPage <= 1 || rendering}
                    onClick={() => goToPage(currentPage - 1)}
                    className="flex items-center gap-1 px-3 py-1.5 border border-foreground text-foreground hover:bg-primary hover:text-[#ffffe3] hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer text-[10px] font-bold uppercase tracking-wider"
                  >
                    <ChevronLeft className="w-3 h-3" />
                    Prev
                  </button>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                    {numPages > 0 ? `${currentPage} / ${numPages}` : '—'}
                  </span>
                  <button
                    disabled={currentPage >= numPages || rendering}
                    onClick={() => goToPage(currentPage + 1)}
                    className="flex items-center gap-1 px-3 py-1.5 border border-primary text-primary hover:bg-primary hover:text-[#ffffe3] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer text-[10px] font-bold uppercase tracking-wider"
                  >
                    Next
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>


              </div>

              {/* ── Canvas Render Area ── */}
              <div className="relative w-full bg-neutral-950 flex items-start justify-center min-h-[480px] sm:min-h-[600px]">
                {/* Loading overlay */}
                {loading && (
                  <div className="absolute inset-0 z-20 bg-neutral-950/90 flex flex-col items-center justify-center gap-3">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] font-black tracking-widest text-primary uppercase animate-pulse">
                      Rendering…
                    </span>
                  </div>
                )}

                {/* Error state */}
                {error && !loading && (
                  <div className="absolute inset-0 z-20 bg-neutral-950 flex flex-col items-center justify-center gap-4 p-8 text-center">
                    <div className="w-12 h-12 border-2 border-primary flex items-center justify-center">
                      <span className="text-primary text-xl font-black">!</span>
                    </div>
                    <p className="text-xs font-bold text-muted-foreground max-w-xs uppercase tracking-wider">
                      PDF could not be rendered. Download the file instead.
                    </p>
                    <a
                      href="/LW19.pdf"
                      download
                      className="flex items-center gap-2 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest bg-primary text-[#ffffe3] hover:scale-105 transition-all"
                    >
                      <Download className="w-3 h-3" /> Download PDF
                    </a>
                  </div>
                )}

                {/* Canvas output */}
                <canvas
                  ref={canvasRef}
                  className="block max-w-full shadow-2xl"
                  style={{ display: error ? 'none' : 'block' }}
                />
              </div>

              {/* ── Navigation Footer ── */}
              <div className="w-full flex items-center justify-between border-t-2 border-foreground bg-background px-4 py-3 gap-4">
                <button
                  disabled={currentPage <= 1 || rendering}
                  onClick={() => goToPage(currentPage - 1)}
                  className="flex items-center gap-1.5 px-4 py-2 border border-foreground text-foreground hover:bg-primary hover:text-[#ffffe3] hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer text-[10px] font-bold uppercase tracking-wider"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Prev
                </button>

                {/* Page dots */}
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: numPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i + 1)}
                      className={`w-1.5 h-1.5 transition-all ${currentPage === i + 1
                          ? 'bg-primary w-4'
                          : 'bg-muted-foreground/40 hover:bg-muted-foreground'
                        }`}
                    />
                  ))}
                </div>

                <button
                  disabled={currentPage >= numPages || rendering}
                  onClick={() => goToPage(currentPage + 1)}
                  className="flex items-center gap-1.5 px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-[#ffffe3] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer text-[10px] font-bold uppercase tracking-wider"
                >
                  Next
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ResumePage;
