import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

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
import { 
  BookOpen, 
  Search, 
  Calendar, 
  Clock, 
  Eye, 
  ArrowRight, 
  Play, 
  Pause, 
  Music, 
  Volume2,
  VolumeX,
  Sparkles,
  ChevronLeft,
  Home as HomeIcon,
  RotateCw,
  Maximize2,
  Minimize2,
  X,
  Repeat,
  Shuffle,
  Music3
} from "lucide-react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { trackPageView, trackBlogView, trackMediaClick } from "../lib/analyticsTracker";
import { useSearchParams } from "react-router-dom";
import CreepyButton from "../components/ui/creepy-button";

interface BlogBlock {
  id: string;
  type: "text" | "image" | "video" | "youtube";
  content: string;
  description?: string;
}

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  readingTime: string;
  featured: boolean;
  status: "draft" | "published" | "scheduled" | "archived";
  author: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  ogImage: string;
  htmlContent: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  isCustomCode: boolean;
  views: number;
  // Compatibility fields
  blocks?: BlogBlock[];
  thumbnail?: string;
  readTime?: string;
}

interface MediaItem {
  id: string;
  name: string;
  type: "image" | "video" | "song";
  url: string;
  clicks: number;
  album?: string;
  composer?: string;
  year?: string;
  artwork?: string;
}

interface ExtendedSongMetadata {
  album: string;
  composer: string;
  year: string;
  artwork: string;
  lyrics: string[];
}

const getYouTubeEmbedUrl = (url: string) => {
  if (!url) return "";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) 
    ? `https://www.youtube.com/embed/${match[2]}` 
    : url;
};

export const BlogsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const blogIdParam = searchParams.get("id");
  const [activeSubTab, setActiveSubTab] = useState<"articles" | "media">("articles");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  
  // Media Filters
  const [selectedMediaType, setSelectedMediaType] = useState<"all" | "image" | "video" | "song">("all");
  
  // Video Modal State
  const [activeVideo, setActiveVideo] = useState<MediaItem | null>(null);

  // Audio Player and Page Reload State
  const [activeSong, setActiveSong] = useState<MediaItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isFullscreenAudio, setIsFullscreenAudio] = useState(false);
  const [audioVolume, setAudioVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  
  // Custom CMS TOC states
  const [activeHeadingId, setActiveHeadingId] = useState("");
  const [headings, setHeadings] = useState<{ id: string; text: string; level: string }[]>([]);

  // Parse TOC headings from raw HTML
  useEffect(() => {
    if (!selectedBlog || !selectedBlog.htmlContent) {
      setHeadings([]);
      return;
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(selectedBlog.htmlContent, "text/html");
    const foundHeadings = Array.from(doc.querySelectorAll("h1, h2, h3"));
    const headingsData = foundHeadings.map((h, i) => ({
      id: h.id || `section-${i}`,
      text: h.textContent || "",
      level: h.tagName.toLowerCase()
    }));
    setHeadings(headingsData);
    if (headingsData.length > 0) {
      setActiveHeadingId(headingsData[0].id);
    }
  }, [selectedBlog]);

  // Track active heading scroll offset
  useEffect(() => {
    if (!selectedBlog || headings.length === 0) return;
    const handleScroll = () => {
      const elements = document.querySelectorAll(".cms-heading");
      let currentId = "";
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Trigger active class if heading is near top of viewport
        if (rect.top <= 160) {
          currentId = el.id;
        }
      });
      if (currentId) setActiveHeadingId(currentId);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedBlog, headings]);

  // HTML processing engine (attaches IDs to headings, injects code header copy triggers, filters XSS)
  const getProcessedHtml = (html: string) => {
    if (!html) return "";
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    
    // Attach IDs for TOC anchors
    const headings = doc.querySelectorAll("h1, h2, h3");
    headings.forEach((h, i) => {
      h.id = `section-${i}`;
      h.classList.add("cms-heading");
    });

    // Code blocks header copy buttons
    const preBlocks = doc.querySelectorAll("pre");
    preBlocks.forEach((block) => {
      block.classList.add("relative", "group", "my-6", "rounded-xl", "overflow-hidden", "border", "border-neutral-800");
      const lang = block.getAttribute("data-lang") || "code";
      const headerHtml = `
        <div class="flex justify-between items-center bg-neutral-900 px-4 py-2 border-b border-neutral-800 text-[10px] font-mono text-neutral-450 select-none">
          <span class="font-bold text-neutral-400">${lang.toUpperCase()}</span>
          <button class="copy-btn px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-white rounded font-bold cursor-pointer text-[9px] uppercase transition-colors">COPY</button>
        </div>
      `;
      block.insertAdjacentHTML("afterbegin", headerHtml);
    });

    // Custom alignment & styling for inline figures
    const figures = doc.querySelectorAll("figure");
    figures.forEach((fig) => {
      fig.className = "my-8 max-w-full text-center";
      const figimg = fig.querySelector("img");
      if (figimg) {
        figimg.classList.add("rounded-2xl", "max-w-full", "h-auto", "shadow-lg", "border", "border-neutral-800", "inline-block");
      }
      const figcap = fig.querySelector("figcaption");
      if (figcap) {
        figcap.className = "text-xs text-neutral-500 italic mt-2";
      }
    });

    // Local / External video wrapper
    const videos = doc.querySelectorAll("video");
    videos.forEach((video) => {
      video.className = "rounded-2xl border border-neutral-850 shadow-md max-w-full w-full inline-block my-6";
    });

    // Responsive embed player wrappers
    const embeds = doc.querySelectorAll("iframe");
    embeds.forEach((iframe) => {
      const parent = iframe.parentElement;
      if (parent && !parent.classList.contains("aspect-video")) {
        const wrapper = doc.createElement("div");
        wrapper.className = "my-8 relative rounded-2xl overflow-hidden border border-neutral-850 shadow-md aspect-video w-full bg-black";
        iframe.className = "absolute top-0 left-0 w-full h-full border-none";
        parent.replaceChild(wrapper, iframe);
        wrapper.appendChild(iframe);
      }
    });

    // Clear Script Tags and XSS event listeners
    let cleaned = doc.body.innerHTML;
    cleaned = cleaned
      .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "")
      .replace(/on\w+\s*=\s*"[^"]*"/gi, "")
      .replace(/on\w+\s*=\s*'[^']*'/gi, "")
      .replace(/javascript\s*:\s*/gi, "");

    return cleaned;
  };

  // Click interceptor for code blocks copy buttons
  const handleCopyCode = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("copy-btn")) {
      const pre = target.closest("pre");
      const code = pre?.querySelector("code");
      if (code) {
        navigator.clipboard.writeText(code.textContent || "");
        target.innerText = "COPIED!";
        target.classList.add("bg-emerald-600", "hover:bg-emerald-700");
        setTimeout(() => { 
          target.innerText = "COPY"; 
          target.classList.remove("bg-emerald-600", "hover:bg-emerald-700");
        }, 2000);
      }
    }
  };

  // Fetch functions defined first to avoid ReferenceErrors
  const fetchBlogs = async () => {
    try {
      const q = query(
        collection(db, "blogs"), 
        where("status", "==", "published"), 
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const list: Blog[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        list.push({
          id: doc.id,
          ...data,
          coverImage: data.coverImage || data.thumbnail || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop",
          thumbnail: data.coverImage || data.thumbnail || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop",
          readingTime: data.readingTime || data.readTime || "1 min read",
          readTime: data.readingTime || data.readTime || "1 min read",
          createdAt: data.createdAt?.toDate() || new Date()
        } as Blog);
      });
      setBlogs(list);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  const fetchMedia = async () => {
    try {
      const q = query(collection(db, "media"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const list: MediaItem[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        list.push({
          id: doc.id,
          ...data
        } as MediaItem);
      });
      setMediaItems(list);
    } catch (err) {
      console.error("Error fetching media:", err);
    }
  };

  const handleReadBlog = (blog: Blog) => {
    setSelectedBlog(blog);
    trackBlogView(blog.id);
    setBlogs(prev => prev.map(b => b.id === blog.id ? { ...b, views: b.views + 1 } : b));
  };

  // Mock Metadata Generator fallback + real Firestore metadata mapping
  const getSongMetadata = (song: MediaItem): ExtendedSongMetadata => {
    // Check if real metadata exists in document first
    if (song.album || song.composer || song.year || song.artwork) {
      return {
        album: song.album || "Single",
        composer: song.composer || "Unknown Artist",
        year: song.year || "2026",
        artwork: song.artwork || `https://placehold.co/600x600/f54900/ffffff?text=${encodeURIComponent(song.name.slice(0, 10))}`,
        lyrics: [
          "Lyrics loaded from media registry...",
          "Playing live synth waves.",
          "Code and design in sync."
        ]
      };
    }

    const seed = song.name.charCodeAt(0) + song.name.length;
    const albums = ["Infinite Horizons", "Neobrutal Echoes", "Binary Beats", "Creative Synthesis"];
    const composers = ["Lingesh Verma", "Cyber Synth Lab", "Mad Ben Projects", "Verma Beats"];
    const years = ["2024", "2025", "2026"];
    
    const album = albums[seed % albums.length];
    const composer = composers[seed % composers.length];
    const year = years[seed % years.length];
    
    const colors = ["f54900", "0a0a0a", "333333"];
    const artwork = `https://placehold.co/600x600/${colors[seed % colors.length]}/ffffff?text=${encodeURIComponent(song.name.slice(0, 10))}`;
    
    const lyrics = [
      "Running loops in the main thread...",
      "Pixel art on a solid canvas.",
      "Thick black borders and offset shadows.",
      "We design the cybernetic future,",
      "Neobrutalism runs in our veins.",
      "Connecting to database nodes...",
      "Beat drops, compiler succeeds."
    ];

    return { album, composer, year, artwork, lyrics };
  };

  const handleRefresh = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    await Promise.all([fetchBlogs(), fetchMedia()]);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  useEffect(() => {
    if (blogIdParam && blogs.length > 0) {
      const found = blogs.find(b => b.id === blogIdParam);
      if (found) {
        setSelectedBlog(found);
        trackBlogView(found.id);
      }
    }
  }, [blogIdParam, blogs]);

  // Automatically scroll to the top of the page when opening or closing a blog
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedBlog]);

  useEffect(() => {
    trackPageView("blogs_and_media");
    fetchBlogs();
    fetchMedia();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Update volume and mute state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : audioVolume;
    }
  }, [audioVolume, isMuted]);

  const handlePlaySong = (song: MediaItem) => {
    if (activeSong && activeSong.id === song.id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.ontimeupdate = null;
    }

    const audio = new Audio(song.url);
    audioRef.current = audio;
    audio.loop = isLooping;
    audio.volume = isMuted ? 0 : audioVolume;
    audio.play()
      .then(() => setIsPlaying(true))
      .catch(err => console.error("Playback error:", err));

    setActiveSong(song);
    trackMediaClick(song.id, song.name, "song");
    
    audio.onloadedmetadata = () => {
      setAudioDuration(audio.duration);
    };
    
    audio.ontimeupdate = () => {
      setAudioCurrentTime(audio.currentTime);
    };

    audio.onended = () => {
      if (isLooping) return;
      if (isShuffled && mediaItems.length > 0) {
        const audioTracks = mediaItems.filter(m => m.type === "song");
        if (audioTracks.length > 0) {
          const randomIndex = Math.floor(Math.random() * audioTracks.length);
          handlePlaySong(audioTracks[randomIndex]);
        }
      } else {
        setIsPlaying(false);
        setAudioCurrentTime(0);
      }
    };
  };

  const handleScrubAudio = (val: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setAudioCurrentTime(val);
    }
  };

  const handleToggleLoop = () => {
    const nextLoop = !isLooping;
    setIsLooping(nextLoop);
    if (audioRef.current) {
      audioRef.current.loop = nextLoop;
    }
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleCloseAudioPlayer = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setActiveSong(null);
    setIsPlaying(false);
    setIsFullscreenAudio(false);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const categories = ["All", ...Array.from(new Set(blogs.map(b => b.category)))];

  const filteredBlogs = blogs.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (b.blocks && b.blocks.some(block => block.content.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesCategory = selectedCategory === "All" || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredMediaItems = mediaItems.filter(item => {
    if (selectedMediaType === "all") return true;
    return item.type === selectedMediaType;
  });

  const currentSongMeta = activeSong ? getSongMetadata(activeSong) : null;

  return (
    <div className="w-full bg-transparent select-none font-clash">
      <motion.div 
        custom={0}
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-[97%] max-w-384 mx-auto bg-background px-6 sm:px-10 lg:px-16 py-24 min-h-screen relative"
      >
      
        {/* Breadcrumbs Navigation - Normal dashed hr line */}
        <nav className="mb-10 flex items-center gap-2 text-xs uppercase tracking-widest font-semibold border-b border-dashed border-border pb-4">
          <a href="/" className="hover:text-primary transition-colors flex items-center gap-1.5 text-foreground">
            <HomeIcon className="w-3.5 h-3.5" />
            Home
          </a>
          <span className="text-foreground/40 font-normal">/</span>
          {selectedBlog ? (
            <>
              <button 
                onClick={() => setSelectedBlog(null)} 
                className="hover:text-primary transition-colors bg-transparent border-none outline-none cursor-pointer uppercase font-semibold text-foreground"
              >
                Blogs & Media
              </button>
              <span className="text-foreground/40 font-normal">/</span>
              <span className="text-primary truncate max-w-[200px] sm:max-w-xs">{selectedBlog.title}</span>
            </>
          ) : (
            <span className="text-primary">Blogs & Media</span>
          )}
        </nav>

        {selectedBlog ? (
          /* Blog Reader View */
          <article className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="flex justify-start">
              <button 
                onClick={() => setSelectedBlog(null)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#ffffe3] dark:bg-neutral-900 text-foreground hover:bg-[#f54900] hover:text-white transition-all duration-300 ease-out shadow-[4px_4px_0px_0px_var(--foreground)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] text-xs font-bold uppercase select-none cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to Hub
              </button>
            </div>

            <div className="relative w-[calc(100%-12px)] group/banner">
              {/* Neobrutalist Hard Shadow */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 bg-foreground transition-transform duration-300 ease-out group-hover/banner:translate-x-0 group-hover/banner:translate-y-0" />
              
              {/* Image Container with Border - wide LinkedIn style aspect ratio */}
              <div className="relative aspect-3/1 sm:aspect-4/1 w-full min-h-[160px] sm:min-h-[220px] md:min-h-[260px] overflow-hidden border-2 border-foreground bg-neutral-950">
                <img 
                  src={selectedBlog.thumbnail} 
                  alt={selectedBlog.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent pointer-events-none"></div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-foreground">
                <span className="px-2.5 py-0.5 bg-primary text-white shadow-[2px_2px_0px_0px_var(--foreground)]"
                >
                  {selectedBlog.category}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  {selectedBlog.createdAt.toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedBlog.readTime}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Eye className="w-3.5 h-3.5" />
                  {selectedBlog.views + 1} views
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight uppercase border-b border-dashed border-border pb-6">
                {selectedBlog.title}
              </h1>
            </div>

            {/* Content view with dynamic table of contents support */}
            <div className="flex flex-col lg:flex-row gap-10 items-start relative w-full pt-4">
              
              {/* Dynamic Table of Contents sidebar */}
              {headings.length > 0 && (
                <aside className="hidden lg:block w-64 shrink-0 sticky top-28 self-start space-y-4 pr-6 select-none border-r border-dashed border-border/80">
                  <h4 className="font-heading font-black text-xs uppercase tracking-wider text-muted-foreground">Outline Index</h4>
                  <nav className="space-y-3">
                    {headings.map((h) => (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
                          setActiveHeadingId(h.id);
                        }}
                        className={`block text-xs font-bold uppercase tracking-wide transition-all duration-200 hover:text-primary ${
                          h.level === "h1" 
                            ? "pl-0 font-extrabold text-[11px]" 
                            : h.level === "h2" 
                              ? "pl-3 text-[10px]" 
                              : "pl-6 text-[9px]"
                        } ${activeHeadingId === h.id ? "text-primary border-l-2 border-primary pl-2" : "text-muted-foreground/60"}`}
                      >
                        {h.text}
                      </a>
                    ))}
                  </nav>
                </aside>
              )}

              {/* Central typography content wrapper */}
              <div 
                onClick={handleCopyCode}
                className="flex-1 max-w-3xl prose prose-invert prose-orange text-foreground/80 font-sans text-base leading-relaxed break-words relative blog-canvas"
              >
                {/* Visual styling overrides to ensure neobrutalist/medium publishing layout */}
                <style dangerouslySetInnerHTML={{ __html: `
                  .blog-canvas p { margin-bottom: 24px; font-size: 16.5px; line-height: 1.85; color: #d4d4d8; }
                  .blog-canvas h1, .blog-canvas h2, .blog-canvas h3 { font-family: 'Montserrat Variable', sans-serif; font-weight: 900; text-transform: uppercase; margin-top: 48px; margin-bottom: 20px; color: #ffffff; letter-spacing: -0.01em; }
                  .blog-canvas h1 { font-size: 26px; border-b: 2px solid #222; padding-bottom: 8px; }
                  .blog-canvas h2 { font-size: 20px; }
                  .blog-canvas h3 { font-size: 16px; }
                  .blog-canvas ul, .blog-canvas ol { margin-left: 24px; margin-bottom: 28px; list-style-position: outside; }
                  .blog-canvas ul { list-style-type: square; }
                  .blog-canvas ol { list-style-type: decimal; }
                  .blog-canvas li { margin-bottom: 10px; color: #d4d4d8; font-size: 16px; }
                  .blog-canvas blockquote { border-left: 4px solid var(--primary); padding-left: 20px; font-style: italic; color: #a1a1aa; margin: 36px 0; font-size: 17px; }
                  .blog-canvas table { width: 100%; border-collapse: collapse; margin: 36px 0; border: 2px solid #333; }
                  .blog-canvas th, .blog-canvas td { padding: 12px; border: 1px solid #333; }
                  .blog-canvas th { background: #111; font-weight: bold; text-transform: uppercase; font-size: 12px; tracking-wider; }
                  .blog-canvas hr { border: none; border-top: 2px dashed #333; margin: 48px 0; }
                  .blog-canvas a { color: var(--primary); text-decoration: underline; font-weight: bold; }
                  .blog-canvas a:hover { color: #ff8833; }
                `}} />
                
                <div dangerouslySetInnerHTML={{ __html: getProcessedHtml(selectedBlog.htmlContent) }} />
              </div>
            </div>
          </article>
        ) : (
          /* Grid Display (Articles vs Media) */
          <div className="space-y-12">
            
            {/* Header - Normal dashed divider line */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-dashed border-border pb-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary text-white px-3 py-1.5 text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ boxShadow: "3px 3px 0px 0px var(--foreground)" }}
                >
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  Prime Publications
                </div>
                <div className="flex items-center gap-4 flex-wrap mt-2">
                  <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight uppercase leading-none">Blogs & Media Hub</h2>
                  <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="p-2.5 border-2 border-foreground bg-[#ffffe3] dark:bg-neutral-900 text-foreground hover:bg-primary hover:text-white transition-all duration-300 ease-out shadow-[2px_2px_0px_0px_var(--foreground)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] cursor-pointer flex items-center justify-center select-none"
                    title="Reload Hub Content"
                  >
                    <RotateCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Sub Tabs — Borderless segmented toggle */}
              <div className="flex bg-neutral-900/60 p-1 shadow-[4px_4px_0px_0px_var(--foreground)] transition-all duration-300 ease-out hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
              >
                <button
                  onClick={() => setActiveSubTab("articles")}
                  className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeSubTab === "articles"
                      ? "bg-primary text-white"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  Articles
                </button>
                <button
                  onClick={() => setActiveSubTab("media")}
                  className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeSubTab === "media"
                      ? "bg-primary text-white"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  Media Vault
                </button>
              </div>
            </div>

            {/* ARTICLES VIEW */}
            {activeSubTab === "articles" && (
              <div className="space-y-8">
                
                {/* Search & Filters - Borderless */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-foreground/60" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search articles..."
                      className="w-full pl-10 pr-4 py-3 bg-background border border-border outline-none text-xs text-foreground font-semibold uppercase tracking-wider focus:bg-primary/5 shadow-[3px_3px_0px_0px_var(--foreground)] transition-all duration-300 ease-out hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] focus:shadow-none focus:translate-x-[3px] focus:translate-y-[3px]"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-xs font-bold uppercase tracking-wider px-4 py-2 border-none outline-none transition-all duration-300 ease-out shadow-[2px_2px_0px_0px_var(--foreground)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] cursor-pointer ${
                          selectedCategory === cat
                            ? "bg-primary text-white"
                            : "hover:bg-primary hover:text-white bg-background text-foreground"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid */}
                {filteredBlogs.length === 0 ? (
                  <div className="text-center py-24 text-muted-foreground border border-dashed border-border">
                    <p className="text-sm font-bold uppercase tracking-wider">No articles match your criteria.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-4">
                    {filteredBlogs.map(blog => (
                      <div 
                        key={blog.id}
                        onClick={() => handleReadBlog(blog)}
                        className="group cursor-pointer relative"
                      >
                        {/* 3D shadow layer */}
                        <div className="absolute inset-0 translate-x-2 translate-y-2 bg-foreground transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
                        
                        {/* Primary Card face */}
                        <div className="relative bg-background p-4 flex flex-col h-full border border-foreground">
                          <div className="relative h-56 overflow-hidden bg-neutral-950">
                            <img 
                              src={blog.thumbnail} 
                              alt={blog.title} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4">
                              <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 bg-primary text-white"
                                style={{ boxShadow: "2px 2px 0px 0px var(--foreground)" }}
                              >
                                {blog.category}
                              </span>
                            </div>
                          </div>

                        <div className="pt-6 flex-1 flex flex-col justify-between space-y-6">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 text-[10px] text-foreground/70 font-mono font-bold uppercase tracking-wider">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {blog.createdAt.toLocaleDateString()}
                              </span>
                              <span>&bull;</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {blog.readTime}
                              </span>
                            </div>
                            <h3 className="text-xl font-extrabold uppercase tracking-tight group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                              {blog.title}
                            </h3>
                          </div>

                          <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-foreground border-t border-dashed border-border pt-4">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3.5 h-3.5" />
                              {blog.views} reads
                            </span>
                            <span className="flex items-center gap-1 text-primary group-hover:underline">
                              Read article
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  </div>
                )}
              </div>
            )}

            {/* MEDIA VAULT VIEW */}
            {activeSubTab === "media" && (
              <div className="space-y-8 animate-fade-in">
                
                {/* Media Type Sub-Filters - Neobrutalist Tag row */}
                <div className="flex flex-wrap gap-2 pb-2">
                    {["all", "image", "video", "song"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedMediaType(type as any)}
                        className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 border-none outline-none cursor-pointer transition-all duration-300 ease-out shadow-[1.5px_1.5px_0px_0px_var(--foreground)] hover:shadow-none hover:translate-x-[1.5px] hover:translate-y-[1.5px] ${
                          selectedMediaType === type
                            ? "bg-primary text-white"
                            : "bg-background text-foreground hover:bg-[#f54900]/10"
                        }`}
                      >
                      {type === "song" ? "Audio" : type === "all" ? "All Media" : type + "s"}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {filteredMediaItems.length === 0 ? (
                    <div className="col-span-full text-center py-24 text-muted-foreground border border-dashed border-border">
                      <p className="text-sm font-bold uppercase tracking-wider">No media items in this category.</p>
                    </div>
                  ) : (
                    filteredMediaItems.map(item => (
                      <div 
                        key={item.id} 
                        className="group cursor-pointer relative"
                      >
                        {/* 3D shadow layer */}
                        <div className="absolute inset-0 translate-x-2 translate-y-2 bg-foreground transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
                        
                        {/* Primary Card face */}
                        <div className="relative bg-background p-4 flex flex-col justify-between space-y-4 h-full border border-foreground">
                          {/* Media Display Area - Clicking opens modal for premium sizing */}
                          <div 
                            className="relative h-44 overflow-hidden bg-neutral-900 flex items-center justify-center cursor-pointer group"
                            onClick={() => {
                              if (item.type === "video") {
                                setActiveVideo(item);
                                trackMediaClick(item.id, item.name, "video");
                              } else if (item.type === "song") {
                                handlePlaySong(item);
                              }
                            }}
                          >
                            {item.type === "image" && (
                              <img src={item.url} alt={item.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                            )}
                            
                            {item.type === "video" && (
                              <div className="relative w-full h-full">
                                <video src={item.url} className="w-full h-full object-cover" muted />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity group-hover:bg-black/50">
                                  <div className="w-12 h-12 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center transform group-hover:scale-110 transition-transform">
                                    <Play className="w-5 h-5 fill-current ml-0.5" />
                                  </div>
                                </div>
                                <span className="absolute bottom-2 right-2 text-[8px] font-bold uppercase bg-black text-white px-2 py-0.5">
                                  Watch
                                </span>
                              </div>
                            )}

                            {item.type === "song" && (
                              <div className="flex flex-col items-center justify-center space-y-3">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary transform group-hover:scale-110 transition-transform">
                                  <Music className="w-5 h-5" />
                                </div>
                                <span className="px-4 py-1.5 bg-foreground text-background hover:bg-primary hover:text-white transition-all text-xs font-bold uppercase flex items-center gap-1.5">
                                  {activeSong?.id === item.id && isPlaying ? (
                                    <>
                                      <Pause className="w-3.5 h-3.5" />
                                      Playing
                                    </>
                                  ) : (
                                    <>
                                      <Play className="w-3.5 h-3.5" />
                                      Listen
                                    </>
                                  )}
                                </span>
                              </div>
                            )}
                          </div>

                          <div>
                            <p className="text-xs font-bold uppercase truncate text-foreground" title={item.name}>{item.name}</p>
                            <div className="flex items-center justify-between mt-2 text-[10px] text-foreground/60 uppercase font-mono font-bold tracking-wider">
                              <span>{item.type}</span>
                              <span>{item.clicks || 0} plays/clicks</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Bottom Footer with Creepy Button - Normal dashed divider line */}
            <div className="w-full border-t border-dashed border-border pt-8 flex justify-end items-center">
              <CreepyButton onClick={() => window.open('https://github.com', '_blank')}>
                View More Github
              </CreepyButton>
            </div>

          </div>
        )}

      {activeSong && audioRef.current && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 select-none animate-fade-in">
          <div className="max-w-4xl mx-auto bg-background border-3 border-foreground p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[6px_6px_0px_0px_var(--foreground)] transition-all duration-300 ease-out hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]"
          >
            <div className="flex items-center gap-4 w-full sm:w-auto cursor-pointer"
              onClick={() => setIsFullscreenAudio(true)}
              title="Expand to Fullscreen Player"
            >
              {/* Stable square artwork indicator */}
              <div className="w-12 h-12 bg-primary/10 border-2 border-foreground flex items-center justify-center text-primary shrink-0 relative overflow-hidden">
                {currentSongMeta?.artwork ? (
                  <img src={currentSongMeta!.artwork} alt="Artwork" className="w-full h-full object-cover" />
                ) : (
                  <Music className="w-5 h-5" />
                )}
              </div>
              <div className="min-w-0">
                <span className="text-[8px] font-black uppercase tracking-widest text-primary flex items-center gap-1">
                  <Music3 className="w-2.5 h-2.5 animate-pulse" />
                  Now Playing
                </span>
                <h4 className="text-xs font-black uppercase truncate text-foreground leading-none mt-1 max-w-[200px]" title={activeSong!.name}>
                  {activeSong!.name}
                </h4>
                <p className="text-[9px] uppercase tracking-wider text-muted-foreground truncate mt-0.5">
                  {currentSongMeta?.composer} &bull; {currentSongMeta?.album}
                </p>
              </div>
            </div>

            {/* playback scrubber & timers */}
            <div className="flex items-center gap-3 w-full sm:flex-1 max-w-md">
              <span className="text-[10px] font-bold text-muted-foreground font-mono tabular-nums">{formatTime(audioCurrentTime)}</span>
              <input
                type="range"
                min="0"
                max={audioDuration || 100}
                value={audioCurrentTime}
                onChange={(e) => handleScrubAudio(parseFloat(e.target.value))}
                className="flex-1 h-1.5 bg-neutral-800 accent-primary cursor-pointer outline-none rounded-none"
              />
              <span className="text-[10px] font-bold text-muted-foreground font-mono tabular-nums">{formatTime(audioDuration)}</span>
            </div>

            {/* Dock controls */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => handleToggleLoop()}
                className={`p-2 border-2 border-foreground bg-background transition-all cursor-pointer ${isLooping ? 'text-primary border-primary' : 'text-foreground'}`}
                title="Repeat Track"
              >
                <Repeat className="w-4 h-4" />
              </button>
              <button
                onClick={() => handlePlaySong(activeSong!)}
                className="p-2 border-2 border-foreground bg-primary text-white hover:bg-foreground hover:text-background transition-all cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current" />
                )}
              </button>
              <button
                onClick={() => setIsFullscreenAudio(true)}
                className="p-2 border-2 border-foreground bg-background text-foreground hover:bg-primary hover:text-white transition-all cursor-pointer hidden sm:block"
                title="Expand Screen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleCloseAudioPlayer}
                className="p-2 border-2 border-foreground bg-background text-foreground hover:bg-[#f54900] hover:text-white transition-all cursor-pointer"
                title="Stop & Close Player"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PREMIUM FULLSCREEN SPOTIFY-LIKE AUDIO PLAYER MODAL */}
      {isFullscreenAudio && activeSong && currentSongMeta && (
        <div className="fixed inset-0 z-55 flex flex-col bg-background/98 backdrop-blur-xl animate-fade-in p-6 sm:p-10 font-clash select-none overflow-y-auto">
          {/* Top Bar Header */}
          <div className="w-full flex items-center justify-between border-b border-dashed border-border pb-6 mb-8">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest text-foreground">Premium Audio Engine</span>
            </div>
            <button
              onClick={() => setIsFullscreenAudio(false)}
              className="p-2 border-2 border-foreground bg-background text-foreground hover:bg-primary hover:text-white transition-all cursor-pointer"
              title="Collapse to Dock"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>

          {/* Central Workspace Container */}
          <div className="flex-1 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Left Side: Artwork & Disk */}
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="relative group">
                {/* Neobrutalist Hard Shadow */}
                <div className="absolute inset-0 translate-x-4 translate-y-4 bg-foreground border-3 border-foreground" />
                
                {/* Stable Square Album Art Body */}
                <div className="relative w-72 h-72 sm:w-96 sm:h-96 border-3 border-foreground bg-neutral-900 overflow-hidden">
                  <img
                    src={currentSongMeta!.artwork}
                    alt={activeSong!.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Title & Artist details */}
              <div className="text-center space-y-2 max-w-md pt-4">
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-foreground leading-tight">{activeSong!.name}</h2>
                <p className="text-sm font-bold uppercase tracking-wider text-primary">{currentSongMeta!.composer}</p>
                <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground uppercase font-bold tracking-widest pt-2">
                  <span>{currentSongMeta!.album}</span>
                  <span>&bull;</span>
                  <span>{currentSongMeta!.year}</span>
                </div>
              </div>
            </div>

            {/* Right Side: Lyrics Panel & Meta */}
            <div className="h-full flex flex-col justify-center border-t-2 md:border-t-0 md:border-l border-dashed border-border pt-8 md:pt-0 md:pl-12">
              <div className="space-y-6 text-left">
                <h3 className="text-lg font-black uppercase tracking-widest text-primary border-b border-dashed border-border pb-3">Scrolling Lyrics</h3>
                <div className="space-y-4 h-80 overflow-y-auto pr-4 font-sans text-lg sm:text-xl font-bold leading-relaxed text-foreground/40 scrollbar-thin">
                  {currentSongMeta!.lyrics.map((line, idx) => {
                    const isHighlighted = idx === Math.floor((audioCurrentTime / (audioDuration || 1)) * currentSongMeta!.lyrics.length);
                    return (
                      <p 
                        key={idx} 
                        className={`transition-colors duration-300 ${isHighlighted ? 'text-primary scale-[1.02] origin-left' : 'text-foreground/40'}`}
                      >
                        {line}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Player Control Center */}
          <div className="w-full max-w-4xl mx-auto border-t-2 border-dashed border-border pt-8 mt-10">
            {/* Scrubber Timeline */}
            <div className="flex items-center gap-4 w-full mb-6">
              <span className="text-xs font-bold text-muted-foreground font-mono tabular-nums">{formatTime(audioCurrentTime)}</span>
              <input
                type="range"
                min="0"
                max={audioDuration || 100}
                value={audioCurrentTime}
                onChange={(e) => handleScrubAudio(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-neutral-800 accent-primary cursor-pointer outline-none rounded-none"
              />
              <span className="text-xs font-bold text-muted-foreground font-mono tabular-nums">{formatTime(audioDuration)}</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Sub-toggles: Shuffle and Repeat */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsShuffled(!isShuffled)}
                  className={`p-2.5 border-2 border-foreground bg-background transition-all cursor-pointer ${isShuffled ? 'text-primary border-primary' : 'text-foreground'}`}
                  title="Shuffle Tracks"
                >
                  <Shuffle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleToggleLoop()}
                  className={`p-2.5 border-2 border-foreground bg-background transition-all cursor-pointer ${isLooping ? 'text-primary border-primary' : 'text-foreground'}`}
                  title="Repeat Track"
                >
                  <Repeat className="w-4 h-4" />
                </button>
              </div>

              {/* Main Playback trigger */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handlePlaySong(activeSong!)}
                  className="p-5 border-2 border-foreground bg-primary text-white hover:bg-foreground hover:text-background transition-all cursor-pointer transform active:scale-95"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current" />
                  )}
                </button>
              </div>

              {/* Volume & Sound bar */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleToggleMute}
                  className="p-2.5 border-2 border-foreground bg-background text-foreground hover:text-primary transition-all cursor-pointer"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={audioVolume}
                  onChange={(e) => {
                    setAudioVolume(parseFloat(e.target.value));
                    setIsMuted(false);
                  }}
                  className="w-24 h-1 bg-neutral-800 accent-primary cursor-pointer outline-none rounded-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PREMIUM FULLSCREEN GLASSMORPHIC VIDEO PLAYER MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
          <div className="relative w-full max-w-4xl bg-background border-3 border-foreground p-4"
            style={{ boxShadow: "8px 8px 0px 0px var(--foreground)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-dashed border-border pb-3 mb-4">
              <div className="min-w-0">
                <span className="text-[9px] font-bold uppercase tracking-widest text-primary">Media Theater</span>
                <h3 className="text-sm font-bold uppercase truncate text-foreground mt-0.5">{activeVideo!.name}</h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 border-2 border-foreground bg-background text-foreground hover:bg-primary hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Canvas Container */}
            <div className="relative aspect-video w-full overflow-hidden bg-black border-2 border-foreground">
              <video
                src={activeVideo!.url}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      </motion.div>
    </div>
  );
};

export default BlogsPage;
