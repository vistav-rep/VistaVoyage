import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TourCard from '../components/TourCard';
import Reveal from '../components/Reveal';

const TrendsPage = () => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tours');
        const data = await response.json();
        setTrends(data || []);
      } catch (error) {
        console.error('Error fetching trends:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, []);

  return (
    <div className="bg-white">
      <Navbar />
      
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center bg-primary overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-80">
          <img 
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop" 
            alt="Active Itineraries" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Reveal>
            <span className="text-accent text-[10px] uppercase tracking-[0.4em] font-semibold mb-6 block">
              Trending Now
            </span>
            <h1 className="text-4xl md:text-8xl font-serif text-white mb-8">
              Active <span className="italic text-accent">Itineraries</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20">
            <div className="max-w-xl">
              <Reveal>
                <h2 className="text-4xl font-serif text-slate-950 mb-6 hover:text-accent transition-colors duration-500 cursor-default">Latest Trends</h2>
                <p className="text-primary/80 text-lg font-medium leading-relaxed">
                  Explore our most recent curated experiences and limited-time itineraries, updated live by our travel experts.
                </p>
              </Reveal>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
          ) : trends.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {trends.map((trend, index) => (
                <Reveal key={trend._id || trend.id} delay={index * 0.1}>
                  <TourCard tour={trend} dark={false} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <p className="text-primary/60 text-xl font-serif">No active itineraries at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrendsPage;
