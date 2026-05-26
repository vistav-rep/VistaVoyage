import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axios';
import { Search, MapPin, Clock, Utensils, Plane, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    destination: '',
    category: '',
    season: '',
    duration: ''
  });

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search,
        ...filters
      });
      const response = await api.get(`/packages?${params.toString()}`);
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPackages();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#1a1a1a]">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop" 
            alt="Safari Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <Reveal>
            <h1 className="text-white font-serif text-5xl md:text-7xl lg:text-8xl mb-6 uppercase tracking-tighter">
              Our Packages
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-light italic">
              "Handpicked luxury getaways to the most beautiful destinations."
            </p>
          </Reveal>
        </div>
      </section>

      {/* SEARCH & FILTER SECTION */}
      <section className="relative z-20 -mt-12 max-w-6xl mx-auto px-6">
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" size={18} />
              <input 
                type="text" 
                placeholder="Search destination, hotel or title..." 
                className="w-full pl-12 pr-4 py-4 bg-[#F3F3F1] rounded-xl border-none focus:ring-2 focus:ring-[#C5A059]/30 transition-all outline-none text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Destination Filter */}
            <select 
              name="destination"
              className="px-4 py-4 bg-[#F3F3F1] rounded-xl border-none focus:ring-2 focus:ring-[#C5A059]/30 transition-all outline-none text-sm appearance-none"
              onChange={handleFilterChange}
            >
              <option value="">Destination</option>
              <option value="Maasai Mara">Maasai Mara</option>
              <option value="Diani">Diani</option>
              <option value="Amboseli">Amboseli</option>
              <option value="Samburu">Samburu</option>
              <option value="Laikipia">Laikipia</option>
            </select>

            {/* Category Filter */}
            <select 
              name="category"
              className="px-4 py-4 bg-[#F3F3F1] rounded-xl border-none focus:ring-2 focus:ring-[#C5A059]/30 transition-all outline-none text-sm appearance-none"
              onChange={handleFilterChange}
            >
              <option value="">Category</option>
              <option value="Luxury Safari">Luxury Safari</option>
              <option value="Beach Escape">Beach Escape</option>
              <option value="Adventure">Adventure</option>
              <option value="Honeymoon">Honeymoon</option>
            </select>

            {/* Season Filter */}
            <select 
              name="season"
              className="px-4 py-4 bg-[#F3F3F1] rounded-xl border-none focus:ring-2 focus:ring-[#C5A059]/30 transition-all outline-none text-sm appearance-none"
              onChange={handleFilterChange}
            >
              <option value="">Season</option>
              <option value="High Season">High Season</option>
              <option value="Low Season">Low Season</option>
              <option value="Peak Season">Peak Season</option>
            </select>
          </div>
        </div>
      </section>

      {/* PACKAGES GRID */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#C5A059] uppercase tracking-[0.2em] text-xs font-bold">Curating Experiences...</p>
          </div>
        ) : packages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence>
              {packages.map((pkg, idx) => (
                <motion.div
                  key={pkg._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-black/5"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img 
                      src={pkg.images[0] || 'https://images.unsplash.com/photo-1516426122078-c23e76319801'} 
                      alt={pkg.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {pkg.featured && (
                      <span className="absolute top-6 left-6 bg-[#C5A059] text-white text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full font-bold shadow-lg">
                        Featured
                      </span>
                    )}

                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin size={14} className="text-[#C5A059]" />
                        <span className="text-[10px] uppercase tracking-widest font-medium opacity-80">{pkg.destination}</span>
                      </div>
                      <h3 className="text-2xl font-serif mb-2 leading-tight uppercase tracking-tight">{pkg.title}</h3>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-8">
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#F3F3F1] flex items-center justify-center">
                          <Clock size={14} className="text-black/40" />
                        </div>
                        <div>
                          <p className="text-[9px] uppercase tracking-widest text-black/40">Duration</p>
                          <p className="text-xs font-bold">{pkg.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#F3F3F1] flex items-center justify-center">
                          <Utensils size={14} className="text-black/40" />
                        </div>
                        <div>
                          <p className="text-[9px] uppercase tracking-widest text-black/40">Meal Plan</p>
                          <p className="text-xs font-bold">{pkg.mealPlan}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#F3F3F1] flex items-center justify-center">
                          <Plane size={14} className="text-black/40" />
                        </div>
                        <div>
                          <p className="text-[9px] uppercase tracking-widest text-black/40">Transport</p>
                          <p className="text-xs font-bold">{pkg.transport}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-black/5">
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-black/40 mb-1">Starting From</p>
                        <p className="text-xl font-serif text-accent">USD {pkg.price.toLocaleString()}</p>
                      </div>
                      <Link 
                        to={`/packages/${pkg._id}`}
                        className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold group-hover:text-[#C5A059] transition-colors"
                      >
                        Details <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-serif uppercase mb-4">No Packages Found</h3>
            <p className="text-black/50">Try adjusting your search or filters to find your perfect getaway.</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default PackagesPage;
