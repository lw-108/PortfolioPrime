import React, { useState, useEffect } from "react";
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
  Sparkles,
  ChevronLeft
} from "lucide-react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { trackPageView, trackBlogView, trackMediaClick } from "../lib/analyticsTracker";

interface BlogBlock {
  id: string;
  type: "text" | "image" | "video" | "youtube";
  content: string;
  description?: string;
}

interface Blog {
  id: string;
  title: string;
  blocks: BlogBlock[];
  category: string;
  readTime: string;
  thumbnail: string;
  views: number;
  createdAt: Date;
}

interface MediaItem {
  id: string;
  name: string;
  type: "image" | "video" | "song";
  url: string;
  clicks: number;
}

export const BlogsPage: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<"articles" | "media">("articles");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  
  // Audio Player State
  const [playingSongId, setPlayingSongId] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    trackPageView("blogs_and_media");
    fetchBlogs();
    fetchMedia();
    return () => {
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, []);

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
    // Locally increment the view counter for instant UI feedback
    setBlogs(prev => prev.map(b => b.id === blog.id ? { ...b, views: b.views + 1 } : b));
  };

  const handlePlaySong = (song: MediaItem) => {
    if (playingSongId === song.id && audioElement) {
      audioElement.pause();
      setPlayingSongId(null);
    } else {
      if (audioElement) {
        audioElement.pause();
      }
      const audio = new Audio(song.url);
      audio.play();
      setAudioElement(audio);
      setPlayingSongId(song.id);
      trackMediaClick(song.id, song.name, "song");
      audio.onended = () => {
        setPlayingSongId(null);
      };
    }
  };

  const categories = ["All", ...Array.from(new Set(blogs.map(b => b.category)))];

  const filteredBlogs = blogs.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (b.blocks && b.blocks.some(block => block.content.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesCategory = selectedCategory === "All" || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24 select-none">
      
      {selectedBlog ? (
        /* Blog Reader View */
        <article className="max-w-3xl mx-auto space-y-8 animate-fade-in">
          <button 
            onClick={() => setSelectedBlog(null)}
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-all text-sm font-semibold mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Hub
          </button>

          <div className="relative h-96 w-full rounded-2xl overflow-hidden border border-neutral-800/80">
            <img 
              src={selectedBlog.thumbnail} 
              alt={selectedBlog.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background to-transparent opacity-60"></div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 text-xs text-neutral-400 font-mono">
              <span className="px-2.5 py-0.5 rounded bg-orange-500/10 text-orange-500 font-bold uppercase">
                {selectedBlog.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {selectedBlog.createdAt.toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedBlog.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {selectedBlog.views + 1} views
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {selectedBlog.title}
            </h1>
          </div>

          <hr className="border-neutral-800/60" />

          {/* Structured block renderer */}
          <div className="space-y-6 text-neutral-300 font-sans text-base md:text-lg leading-relaxed">
            {selectedBlog.blocks && selectedBlog.blocks.length > 0 ? (
              selectedBlog.blocks.map(block => (
                <div key={block.id} className="w-full">
                  {block.type === "text" && (
                    <p className="whitespace-pre-wrap">{block.content}</p>
                  )}
                  {block.type === "image" && (
                    <div className="space-y-2 mt-4 mb-4">
                      <img src={block.content} alt={block.description || "Article Image"} className="w-full rounded-xl object-cover max-h-[500px] border border-neutral-850" />
                      {block.description && (
                        <p className="text-xs text-neutral-500 italic text-center">{block.description}</p>
                      )}
                    </div>
                  )}
                  {block.type === "youtube" && (
                    <div className="w-full aspect-video rounded-xl overflow-hidden border border-neutral-800 mt-4 mb-4">
                      <iframe 
                        src={block.content} 
                        className="w-full h-full" 
                        allowFullScreen 
                        title="YouTube video" 
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="italic text-neutral-500">No content in this post.</p>
            )}
          </div>
        </article>
      ) : (
        /* Grid Display (Articles vs Media) */
        <div className="space-y-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-800/60 pb-8">
            <div>
              <div className="flex items-center gap-2 text-orange-500 font-mono text-xs font-bold uppercase tracking-widest mb-2">
                <Sparkles className="w-4 h-4" />
                Prime Publications
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">Blogs & Media Hub</h2>
            </div>

            {/* Sub Tabs */}
            <div className="flex p-1 bg-neutral-900/60 border border-neutral-800/80 rounded-xl">
              <button
                onClick={() => setActiveSubTab("articles")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeSubTab === "articles"
                    ? "bg-linear-to-r from-[#f54900] to-[#ff5d15] text-white"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Articles
              </button>
              <button
                onClick={() => setActiveSubTab("media")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeSubTab === "media"
                    ? "bg-linear-to-r from-[#f54900] to-[#ff5d15] text-white"
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
              
              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-950/60 border border-neutral-800 rounded-xl outline-none text-xs text-white focus:border-orange-500 transition-all"
                  />
                </div>

                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all border ${
                        selectedCategory === cat
                          ? "bg-orange-500/10 border-orange-500 text-orange-500"
                          : "border-neutral-800 hover:border-neutral-700 text-neutral-400"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid */}
              {filteredBlogs.length === 0 ? (
                <div className="text-center py-24 text-neutral-500">
                  <p className="text-sm">No articles match your criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredBlogs.map(blog => (
                    <div 
                      key={blog.id}
                      onClick={() => handleReadBlog(blog)}
                      className="group cursor-pointer rounded-2xl border border-neutral-800/80 bg-neutral-900/10 hover:bg-neutral-900/20 overflow-hidden flex flex-col h-full hover:border-neutral-700/80 transition-all"
                    >
                      <div className="relative h-56 overflow-hidden bg-neutral-950">
                        <img 
                          src={blog.thumbnail} 
                          alt={blog.title} 
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-black/60 backdrop-blur-md text-orange-500 rounded">
                            {blog.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 text-[10px] text-neutral-500 font-mono">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {blog.createdAt.toLocaleDateString()}
                            </span>
                            <span>&bull;</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {blog.readTime}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold group-hover:text-orange-500 transition-colors line-clamp-2">
                            {blog.title}
                          </h3>
                        </div>

                        <div className="flex items-center justify-between text-xs font-semibold text-neutral-400 group-hover:text-white transition-colors">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            {blog.views} reads
                          </span>
                          <span className="flex items-center gap-1">
                            Read article
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </span>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mediaItems.length === 0 ? (
                  <div className="col-span-full text-center py-24 text-neutral-500">
                    <p className="text-sm">No media items uploaded yet.</p>
                  </div>
                ) : (
                  mediaItems.map(item => (
                    <div 
                      key={item.id} 
                      className="rounded-2xl border border-neutral-800 bg-neutral-950/40 p-4 flex flex-col justify-between space-y-4"
                    >
                      {/* Media Display Area */}
                      <div className="relative h-44 rounded-xl overflow-hidden bg-neutral-900 flex items-center justify-center">
                        {item.type === "image" && (
                          <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                        )}
                        
                        {item.type === "video" && (
                          <video 
                            src={item.url} 
                            controls 
                            onPlay={() => trackMediaClick(item.id, item.name, "video")}
                            className="w-full h-full object-cover"
                          />
                        )}

                        {item.type === "song" && (
                          <div className="flex flex-col items-center justify-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                              <Music className="w-5 h-5" />
                            </div>
                            <button
                              onClick={() => handlePlaySong(item)}
                              className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
                            >
                              {playingSongId === item.id ? (
                                <>
                                  <Pause className="w-3.5 h-3.5" />
                                  Pause Song
                                </>
                              ) : (
                                <>
                                  <Play className="w-3.5 h-3.5" />
                                  Play Song
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>

                      <div>
                        <p className="text-xs font-bold truncate" title={item.name}>{item.name}</p>
                        <div className="flex items-center justify-between mt-2 text-[10px] text-neutral-500 uppercase font-mono tracking-wider">
                          <span>{item.type}</span>
                          <span>{item.clicks || 0} plays/clicks</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default BlogsPage;
