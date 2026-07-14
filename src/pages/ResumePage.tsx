import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatedTitle } from '../components/ui/AnimatedTitle';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut } from 'lucide-react';

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
  const [zoomScale, setZoomScale] = useState<number>(1.0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pdfDocRef = useRef<any>(null);
  const renderTaskRef = useRef<any>(null);
  const pageNumRef = useRef<number>(1);

  // Drag and Pinch Gesture References
  const isDraggingRef = useRef<boolean>(false);
  const startDragRef = useRef({ x: 0, y: 0 });
  const scrollOffsetRef = useRef({ left: 0, top: 0 });
  const startPinchDistanceRef = useRef<number | null>(null);
  const startZoomScaleRef = useRef<number>(1.0);

  // Render a given page number onto the canvas safely with cancel/completion queues
  const renderPage = useCallback((pageNum: number, scaleMultiplier = 1.0, pdfDocInstance?: any) => {
    const doc = pdfDocInstance || pdfDocRef.current;
    if (!doc) return;

    // Helper to start the actual render operation
    const executeRender = () => {
      setRendering(true);
      setLoading(true);

      doc.getPage(pageNum).then((page: any) => {
        const canvas = canvasRef.current;
        const scrollContainer = containerRef.current;
        if (!canvas || !scrollContainer) return;
        const context = canvas.getContext('2d');
        if (!context) return;

        const containerWidth = scrollContainer.clientWidth || 800;
        const unscaledViewport = page.getViewport({ scale: 1.0 });
        const baseScale = Math.max(0.5, containerWidth / unscaledViewport.width);
        
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        const viewport = page.getViewport({ scale: baseScale * dpr * scaleMultiplier });

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        canvas.style.width = `${containerWidth * scaleMultiplier}px`;
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
          renderTaskRef.current = null;
        });
      }).catch((err: any) => {
        console.error('getPage error:', err);
        setRendering(false);
        setLoading(false);
      });
    };

    // If there is an active render task, cancel it and wait for its promise to catch/clean up
    if (renderTaskRef.current) {
      const prevTask = renderTaskRef.current;
      prevTask.cancel();
      renderTaskRef.current = null;
      
      // Wait a tick for the cancellation exception to propagate before starting next render
      setTimeout(executeRender, 50);
    } else {
      executeRender();
    }
  }, []);

  // Initialise PDF.js
  useEffect(() => {
    const PDFJS_VERSION = '3.11.174';
    const CDN_BASE = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}`;

    const existingScript = document.getElementById('pdfjs-script');
    if (existingScript) {
      const pdfjs = (window as any).pdfjsLib;
      if (pdfjs && !pdfDocRef.current) {
        pdfjs.GlobalWorkerOptions.workerSrc = `${CDN_BASE}/pdf.worker.min.js`;
        loadPDF(pdfjs);
      } else if (pdfDocRef.current) {
        renderPage(currentPage, zoomScale);
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
        renderPage(1, zoomScale, pdfDoc);
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
        renderPage(pageNumRef.current, zoomScale);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderPage, zoomScale]);

  // Touch handlers for Dragging and Pinch-to-Zoom
  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    const getDistance = (touches: React.TouchList | TouchList) => {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        // Init Single-finger drag
        isDraggingRef.current = true;
        startDragRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        scrollOffsetRef.current = { left: scrollContainer.scrollLeft, top: scrollContainer.scrollTop };
      } else if (e.touches.length === 2) {
        // Init Two-finger pinch
        isDraggingRef.current = false;
        startPinchDistanceRef.current = getDistance(e.touches);
        startZoomScaleRef.current = zoomScale;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDraggingRef.current && e.touches.length === 1) {
        // Execute drag movement
        const dx = e.touches[0].clientX - startDragRef.current.x;
        const dy = e.touches[0].clientY - startDragRef.current.y;
        scrollContainer.scrollLeft = scrollOffsetRef.current.left - dx;
        scrollContainer.scrollTop = scrollOffsetRef.current.top - dy;
        
        // Prevent default screen bounce only when dragged document exceeds container boundaries
        if (scrollContainer.scrollWidth > scrollContainer.clientWidth || scrollContainer.scrollHeight > scrollContainer.clientHeight) {
          if (e.cancelable) e.preventDefault();
        }
      } else if (e.touches.length === 2 && startPinchDistanceRef.current !== null) {
        const currentDistance = getDistance(e.touches);
        const ratio = currentDistance / startPinchDistanceRef.current;
        const calculatedScale = startZoomScaleRef.current * ratio;
        const clampedScale = Math.min(2.0, Math.max(0.6, calculatedScale));
        
        if (e.cancelable) e.preventDefault();
        setZoomScale(clampedScale);
        
        // Debounce renderPage on touch pinch to avoid overlapping render tasks
        const timeoutId = (window as any)._pinchRenderTimeout;
        if (timeoutId) clearTimeout(timeoutId);
        (window as any)._pinchRenderTimeout = setTimeout(() => {
          renderPage(currentPage, clampedScale);
        }, 100);
      }
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
      startPinchDistanceRef.current = null;
    };

    scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
    scrollContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    scrollContainer.addEventListener('touchend', handleTouchEnd);

    return () => {
      scrollContainer.removeEventListener('touchstart', handleTouchStart);
      scrollContainer.removeEventListener('touchmove', handleTouchMove);
      scrollContainer.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentPage, zoomScale, renderPage]);

  // Mouse handlers for desktop dragging when zoomed in
  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    let isMouseDown = false;
    let startX = 0;
    let startY = 0;
    let scrollLeft = 0;
    let scrollTop = 0;

    const handleMouseDown = (e: MouseEvent) => {
      if (zoomScale <= 1.0) return; // Only drag when zoomed in
      isMouseDown = true;
      startX = e.pageX - scrollContainer.offsetLeft;
      startY = e.pageY - scrollContainer.offsetTop;
      scrollLeft = scrollContainer.scrollLeft;
      scrollTop = scrollContainer.scrollTop;
      scrollContainer.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const y = e.pageY - scrollContainer.offsetTop;
      const walkX = (x - startX) * 1.5;
      const walkY = (y - startY) * 1.5;
      scrollContainer.scrollLeft = scrollLeft - walkX;
      scrollContainer.scrollTop = scrollTop - walkY;
    };

    const handleMouseUpOrLeave = () => {
      isMouseDown = false;
      scrollContainer.style.cursor = 'default';
    };

    scrollContainer.addEventListener('mousedown', handleMouseDown);
    scrollContainer.addEventListener('mousemove', handleMouseMove);
    scrollContainer.addEventListener('mouseup', handleMouseUpOrLeave);
    scrollContainer.addEventListener('mouseleave', handleMouseUpOrLeave);

    return () => {
      scrollContainer.removeEventListener('mousedown', handleMouseDown);
      scrollContainer.removeEventListener('mousemove', handleMouseMove);
      scrollContainer.removeEventListener('mouseup', handleMouseUpOrLeave);
      scrollContainer.removeEventListener('mouseleave', handleMouseUpOrLeave);
    };
  }, [zoomScale]);

  const goToPage = (newPage: number) => {
    if (rendering || newPage < 1 || newPage > numPages) return;
    pageNumRef.current = newPage;
    setCurrentPage(newPage);
    renderPage(newPage, zoomScale);
  };

  const handleZoom = (direction: 'in' | 'out') => {
    if (rendering) return;
    setZoomScale(prev => {
      const step = 0.2;
      const nextScale = direction === 'in' ? prev + step : prev - step;
      const clampedScale = Math.min(2.0, Math.max(0.6, nextScale));
      renderPage(currentPage, clampedScale);
      return clampedScale;
    });
  };

  return (
    <section id="resume-page" className="relative z-10 w-full min-h-screen bg-transparent pt-0 pb-0 px-0 overflow-hidden select-none font-clash">
      <div className="w-[97%] max-w-384 mx-auto bg-background mt-[3vh] flex flex-col relative px-4 sm:px-8 lg:px-12 pb-0">

        {/* ── Page Header ── */}
        <motion.div
          custom={0}
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-b border-dashed border-border pt-8 sm:pt-12 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
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
              <div className="w-full flex flex-col sm:flex-row items-center justify-between border-b-2 border-foreground bg-background px-4 py-3 gap-3">
                {/* Left: branding */}
                <div className="flex items-center gap-2 shrink-0">
                  <img src="/logo.png" alt="logo" className="w-8 h-8" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-foreground">
                    Lingeshwarma MK
                  </span>
                </div>

                {/* Right Area: Controls grouped together for perfect vertical alignment */}
                <div className="flex items-center justify-center gap-6 flex-wrap sm:flex-nowrap">
                  {/* Centre: top nav controls */}
                  <div className="flex items-center gap-2">
                    <button
                      disabled={currentPage <= 1 || rendering}
                      onClick={() => goToPage(currentPage - 1)}
                      className="flex items-center gap-1 px-2.5 py-1.5 border border-foreground text-foreground hover:bg-primary hover:text-[#ffffe3] hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer text-[10px] font-bold uppercase tracking-wider"
                    >
                      <ChevronLeft className="w-3 h-3" />
                      Prev
                    </button>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground whitespace-nowrap px-1">
                      {numPages > 0 ? `${currentPage} / ${numPages}` : '—'}
                    </span>
                    <button
                      disabled={currentPage >= numPages || rendering}
                      onClick={() => goToPage(currentPage + 1)}
                      className="flex items-center gap-1 px-2.5 py-1.5 border border-primary text-primary hover:bg-primary hover:text-[#ffffe3] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer text-[10px] font-bold uppercase tracking-wider"
                    >
                      Next
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Divider line for visual distinction */}
                  <div className="hidden xs:block h-6 w-px bg-border/40" />

                  {/* Right: Zoom controls */}
                  <div className="flex items-center gap-1.5">
                    <button
                      disabled={rendering || zoomScale <= 0.6}
                      onClick={() => handleZoom('out')}
                      className="p-1.5 border border-foreground hover:bg-primary hover:text-[#ffffe3] hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-foreground w-10 text-center select-none font-clash">
                      {Math.round(zoomScale * 100)}%
                    </span>
                    <button
                      disabled={rendering || zoomScale >= 2.0}
                      onClick={() => handleZoom('in')}
                      className="p-1.5 border border-foreground hover:bg-primary hover:text-[#ffffe3] hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div 
                ref={containerRef}
                className="relative w-full bg-neutral-950 overflow-auto max-h-[80vh] touch-none text-center p-4"
              >
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
                      <Download className="w-3.5 h-3.5" /> Download PDF
                    </a>
                  </div>
                )}

                {/* Canvas output */}
                <canvas
                  ref={canvasRef}
                  className="inline-block shadow-2xl origin-top mx-auto"
                  style={{ display: error ? 'none' : 'inline-block' }}
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
                <div className="flex items-center gap-3">
                  <button
                    disabled={rendering || zoomScale <= 0.6}
                    onClick={() => handleZoom('out')}
                    className="p-1 border border-foreground hover:bg-primary hover:text-[#ffffe3] hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-black tracking-widest uppercase text-foreground whitespace-nowrap">
                    <span className="hidden xs:inline">Page </span>{currentPage} / {numPages}
                  </span>
                  <button
                    disabled={rendering || zoomScale >= 2.0}
                    onClick={() => handleZoom('in')}
                    className="p-1 border border-foreground hover:bg-primary hover:text-[#ffffe3] hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
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
