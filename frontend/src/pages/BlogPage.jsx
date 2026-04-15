import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/blogs');
      if (!response.ok) {
        console.error(`Server responded with ${response.status}`);
        setBlogs([]);
        setLoading(false);
        return;
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setBlogs(data);
      } else {
        console.error('Data is not an array:', data);
        setBlogs([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogs([]);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-80">
          <img 
            src="https://images.unsplash.com/photo-1488646015629-49bd81139f29?q=80&w=1973&auto=format&fit=crop" 
            alt="About VistaVoyage" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight text-center">
              Travel <span className="italic text-accent">Stories</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto text-center leading-relaxed font-medium">
              Explore the world through the eyes of our community. Discover hidden gems, 
              travel tips, and unforgettable experiences.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Blog Listing */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-3xl font-serif text-slate-950 hover:text-accent transition-colors duration-500 cursor-default">Latest Articles</h2>
            <Link 
              to="/blogs/add" 
              className="px-8 py-3 bg-accent text-white rounded-full font-bold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
            >
              Share Your Story
            </Link>
          </div>

          {loading ? (
            <div className="py-20 text-center text-primary/40 font-bold uppercase tracking-widest">Loading stories...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {blogs.map((blog) => (
                <Reveal key={blog._id}>
                  <div className="group cursor-pointer">
                    <div className="relative h-72 rounded-[2rem] overflow-hidden mb-8 shadow-xl">
                      <img 
                        src={blog.image || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80'} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        alt={blog.title}
                      />
                      <div className="absolute top-6 left-6 flex gap-2">
                        {blog.tags?.map(tag => (
                          <span key={tag} className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase text-accent">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest font-black text-primary/40">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-accent" />
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <User size={14} className="text-accent" />
                          {blog.author}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-serif text-slate-950 group-hover:text-accent transition-colors duration-500 leading-snug cursor-default">
                        {blog.title}
                      </h3>
                      
                      <p className="text-primary/60 text-sm line-clamp-3 leading-relaxed">
                        {blog.content}
                      </p>
                      
                      <button className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-accent group/btn pt-4">
                        Read Full Story
                        <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
              {blogs.length === 0 && (
                <div className="col-span-full py-20 text-center text-primary/40 font-bold uppercase tracking-widest">
                  No stories found. Be the first to share one!
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
