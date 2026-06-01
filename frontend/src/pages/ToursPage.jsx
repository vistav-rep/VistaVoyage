import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TourCard from '../components/TourCard';
import Reveal from '../components/Reveal';
import { tours as staticTours } from '../data/toursData';
import { motion } from 'framer-motion';
import api from '../api/axios';
import { useSearchParams } from 'react-router-dom';

const ToursPage = () => {
  const [tours, setTours] = useState(staticTours);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await api.get('/tours?limit=200');
        const dbTours = response.data?.data || response.data || [];
        const dbIds = new Set(dbTours.map(t => t._id));
        const staticOnly = staticTours.filter(t => !dbIds.has(t._id) && !dbIds.has(t.id));
        setTours([...dbTours, ...staticOnly]);
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
    window.scrollTo(0, 0);
  }, []);

  // Initialize search query from URL param on mount
  useEffect(() => {
    const initial = searchParams.get('search') || '';
    if (initial) setSearchQuery(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync searchQuery -> URL with debounce
  useEffect(() => {
    const t = setTimeout(() => {
      if (searchQuery && searchQuery.trim()) setSearchParams({ search: searchQuery.trim() });
      else setSearchParams({});
    }, 350);
    return () => clearTimeout(t);
  }, [searchQuery, setSearchParams]);

  return (
    <div className="bg-white">
      <Navbar />
      
      {/* MINIMALIST LUXE HERO */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop" 
            alt="VistaVoyage Bespoke Collection" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/50 to-white"></div>
        </motion.div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Reveal>
            <span className="text-accent text-[11px] md:text-[13px] uppercase tracking-[0.8em] font-bold mb-10 block">
              The VistaVoyage Legacy
            </span>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-primary/40 text-[10px] uppercase tracking-[0.4em] font-bold">
              <span>Private Safaris</span>
              <div className="w-1.5 h-1.5 bg-accent/30 rounded-full hidden md:block"></div>
              <span>Global Mobility</span>
              <div className="w-1.5 h-1.5 bg-accent/30 rounded-full hidden md:block"></div>
              <span>Eco-Luxury</span>
            </div>
          </Reveal>
        </div>

        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
          <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent"></div>
        </div>
      </section>

      {/* HOLIDAY COLLECTIONS - PURE & MINIMAL */}
      <section className="py-32 relative z-10 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-40">
            <Reveal>
              <h2 className="text-5xl md:text-7xl font-serif text-primary mb-12 tracking-tight">
                Curated <span className="italic text-accent font-normal">Expeditions</span>
              </h2>
              <div className="w-20 h-px bg-accent/30 mb-12 mx-auto"></div>
              <p className="text-primary/50 text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
                A definitive selection of global journeys, engineered with absolute 
                precision and a deep respect for the art of discovery.
              </p>
            </Reveal>
          </div>

          {/* Search input */}
          <div className="mb-8">
            <label className="sr-only" htmlFor="tours-search">Search tours</label>
            <div className="max-w-3xl">
              <input
                id="tours-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { if (searchQuery && searchQuery.trim()) setSearchParams({ search: searchQuery.trim() }); else setSearchParams({}); } }}
                placeholder="Search by title or location"
                className="w-full md:w-1/2 h-12 px-4 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#c8a248]"
              />
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            (() => {
              const q = searchQuery.trim().toLowerCase();
              const filtered = q
                ? tours.filter(t => (
                  (t.title || '').toString().toLowerCase().includes(q) ||
                  (t.location || '').toString().toLowerCase().includes(q) ||
                  (t.description || '').toString().toLowerCase().includes(q)
                ))
                : tours;

              if (filtered.length === 0) {
                return (
                  <div className="py-20 text-center text-black/60">
                    No tours found for "{searchQuery}".
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
                  {filtered.map((tour, index) => (
                    <Reveal
                      key={tour._id || tour.id}
                      delay={index * 0.06}
                    >
                      <TourCard tour={tour} />
                    </Reveal>
                  ))}
                </div>
              );
            })()
          )}
        </div>
      </section>

      {/* REFINED CTA */}
      <section className="py-40 bg-surface/50 border-t border-primary/5">
        <div className="container mx-auto px-6 text-center">
          <Reveal>
            <h3 className="text-4xl md:text-6xl font-serif text-primary mb-12">Experience the Unimagined</h3>
            <button className="px-16 py-6 bg-primary text-white rounded-full text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-accent transition-all duration-700 shadow-xl">
              Inquire Privately
            </button>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ToursPage;