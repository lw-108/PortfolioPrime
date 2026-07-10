import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import CreepyButton from '../components/ui/creepy-button';
import { AnimatedTitle } from '../components/ui/AnimatedTitle';

interface Blog {
  id: string;
  title: string;
  category: string;
  readTime: string;
  thumbnail: string;
  createdAt: Date;
}

export const LatestBlogs: React.FC = () => {
  const navigate = useNavigate();
  const [latestBlogs, setLatestBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const q = query(
          collection(db, 'blogs'),
          where('status', '==', 'published'),
          orderBy('createdAt', 'desc'),
          limit(3)
        );
        const querySnapshot = await getDocs(q);
        const list: Blog[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          list.push({
            id: doc.id,
            title: data.title,
            category: data.category,
            readTime: data.readTime,
            thumbnail: data.thumbnail,
            createdAt: data.createdAt?.toDate() || new Date(),
          });
        });
        setLatestBlogs(list);
      } catch (err) {
        console.error('Error fetching latest blogs:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestBlogs();
  }, []);

  if (isLoading) {
    return (
      <section className="relative w-full font-clash select-none bg-transparent">
        <div className="w-[97%] max-w-384 mx-auto bg-background px-6 sm:px-10 lg:px-16 py-20 border-t border-dashed border-border flex items-center justify-center min-h-[300px]">
          <span className="text-muted-foreground animate-pulse text-xs font-bold uppercase tracking-widest">
            Loading Publications...
          </span>
        </div>
      </section>
    );
  }

  if (latestBlogs.length === 0) {
    return null; // Don't render section if there are no blogs
  }

  return (
    <section id="latest-blogs" className="relative w-full font-clash select-none bg-transparent">
      {/* Boxed Rails layout matching projects/experience section */}
      <div className="w-[97%] max-w-384 mx-auto bg-background px-6 sm:px-10 lg:px-16 py-20 border-t border-dashed border-border">
        
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-dashed border-border pb-6 sm:pb-8">
          <div>
            <span className="text-[#f54900] text-sm uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Latest Publications
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold uppercase tracking-tight mt-2 text-foreground leading-none">
              <AnimatedTitle text="Insights /" />
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xs text-sm sm:text-base leading-relaxed">
            Thoughts, technical tutorials, and articles on full stack development.
          </p>
        </header>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {latestBlogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => navigate(`/blogs?id=${blog.id}`)}
              className="group cursor-pointer relative"
            >
              {/* Neobrutalist Hard Shadow */}
              <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 bg-foreground transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
              
              {/* Card Main Body */}
              <div className="relative bg-background border border-border flex flex-col h-full p-4">
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden bg-neutral-900 mb-4">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 bg-primary text-white"
                      style={{ boxShadow: '2.5px 2.5px 0px 0px var(--foreground)' }}
                    >
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-mono font-bold uppercase tracking-wider mb-2">
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

                {/* Title */}
                <h3 className="text-lg font-bold uppercase tracking-tight group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-6 flex-1">
                  {blog.title}
                </h3>

                {/* CTA Action */}
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-foreground border-t border-dashed border-border pt-4">
                  <span className="flex items-center gap-1 text-primary group-hover:underline">
                    Read article
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-end pt-4">
          <CreepyButton onClick={() => navigate('/blogs')}>
            Explore Publications
          </CreepyButton>
        </div>

      </div>
    </section>
  );
};

export default LatestBlogs;
