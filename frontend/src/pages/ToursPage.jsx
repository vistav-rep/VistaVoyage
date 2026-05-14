import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TourCard from '../components/TourCard';
import Reveal from '../components/Reveal';
import { tours as staticTours } from '../data/toursData';
import { motion } from 'framer-motion';
import api from '../api/axios';

const ToursPage = () => {
  const [tours, setTours] = useState(staticTours);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await api.get('/tours');
        const dbTours = response.data;
        
        // Combine static and dynamic tours, avoiding duplicates by title if necessary
        // or just append them
        const combined = [...dbTours, ...staticTours];
        
        // Remove duplicates based on ID or title
        const unique = combined.filter((tour, index, self) =>
          index === self.findIndex((t) => (
            (t._id || t.id) === (tour._id || tour.id)
          ))
        );

        setTours(unique);
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
    window.scrollTo(0, 0);
  }, []);

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

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
              {tours.map((pkg, index) => (
                <Reveal key={pkg._id || pkg.id} delay={index * 0.1}>
                  <div className="group relative">
                    {/* Subtle index number for each card */}
                    <span className="absolute -top-10 left-0 text-[80px] font-serif italic text-primary/5 pointer-events-none group-hover:text-accent/10 transition-colors duration-700">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                    <TourCard tour={pkg} dark={false} />
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* REFINED CTA */}
      <section className="py-40 bg-surface/50 border-t border-primary/5">
        <div className="container mx-auto px-6 text-center">
          <Reveal.fromBottom delay={0.05} once={false}>
            <h3 className="text-4xl md:text-6xl font-serif text-primary mb-6 md:mb-12">Experience the Unimagined</h3>
            <div className="flex items-center justify-center">
              <button className="w-full md:w-auto px-8 md:px-16 py-4 md:py-6 bg-accent text-white rounded-full text-[11px] uppercase tracking-wide md:tracking-[0.4em] font-bold hover:bg-accent-dark transition-all duration-700 shadow-xl">
                Inquire Privately
              </button>
            </div>
          </Reveal.fromBottom>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ToursPage;