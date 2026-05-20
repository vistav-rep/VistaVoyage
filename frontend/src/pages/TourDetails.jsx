import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { tours as staticTours } from '../data/toursData';
import api from '../api/axios';
import {
  MapPin,
  Clock,
  Users,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  X,
  Check,
  Download,
  Calendar,
  DollarSign
} from 'lucide-react';

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedHotel, setSelectedHotel] = useState(null);

  const sections = {
    overview: useRef(null),
    highlights: useRef(null),
    itinerary: useRef(null),
    accommodation: useRef(null),
    inclusions: useRef(null),
  };

  const scrollToSection = (sectionId) => {
    setActiveTab(sectionId);
    const element = sections[sectionId].current;
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const fetchTour = async () => {
      const staticTour = staticTours.find((t) => t.id === id);

      if (staticTour) {
        setTour(staticTour);
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/tours/${id}`);
        setTour(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
    window.scrollTo(0, 0);
  }, [id]);

  const getImageUrl = (image) => {
    if (!image) {
      return 'https://images.unsplash.com/photo-1534067783941-51c9c23eccfd';
    }

    if (typeof image === 'string' && image.startsWith('/uploads')) {
      const baseUrl = import.meta.env.VITE_API_URL
        ? import.meta.env.VITE_API_URL.split('/api')[0]
        : 'http://localhost:5000';

      return `${baseUrl}${image}`;
    }

    return image;
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!tour) {
    return null;
  }

  return (
    <div className="bg-[#FAFAF8] text-black overflow-hidden font-sans">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[85vh] flex items-center pt-20">
        <div className="absolute inset-0">
          <img
            src={getImageUrl(tour.image)}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 w-full px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-white max-w-4xl"
            >
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] mb-6 opacity-80">
                <span>A Private Journey</span>
                <span className="w-1 h-1 rounded-full bg-white" />
                <span>Ready to Book</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-serif leading-[1] mb-8 uppercase">
                {tour.title}
              </h1>

              <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl leading-relaxed mb-12">
                {tour.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 border-t border-white/20 pt-8">
                <div>
                  <span className="block text-white/50 text-xs uppercase tracking-widest mb-2">Duration</span>
                  <span className="text-lg font-medium">{tour.duration}</span>
                </div>
                <div>
                  <span className="block text-white/50 text-xs uppercase tracking-widest mb-2">Destinations</span>
                  <span className="text-lg font-medium">{tour.location}</span>
                </div>
                <div>
                  <span className="block text-white/50 text-xs uppercase tracking-widest mb-2">Starting From</span>
                  <span className="text-lg font-medium">USD {tour.price.toLocaleString()} pp</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STICKY SUBNAV */}
      <div className="sticky top-20 z-40 bg-white border-b border-black/5 px-6 md:px-12 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center justify-between min-w-max md:min-w-0">
          <div className="flex gap-8 md:gap-12 py-6">
            {['overview', 'highlights', 'itinerary', 'accommodation', 'inclusions'].map((tab) => (
              <button
                key={tab}
                onClick={() => scrollToSection(tab)}
                className={`text-xs uppercase tracking-[0.2em] font-medium transition-all relative ${
                  activeTab === tab ? 'text-black' : 'text-black/40 hover:text-black'
                }`}
              >
                {tab === 'itinerary' ? 'Daily Itinerary' : tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-[25px] left-0 right-0 h-[2px] bg-black"
                  />
                )}
              </button>
            ))}
          </div>

          <button className="hidden md:block bg-black text-white text-[10px] uppercase tracking-[0.2em] px-8 py-3 rounded-full hover:bg-black/80 transition-all">
            Reserve This Journey
          </button>
        </div>
      </div>

      {/* THE JOURNEY (OVERVIEW) */}
      <section ref={sections.overview} className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 md:gap-24">
            <div className="lg:col-span-7">
              <span className="text-black/40 uppercase tracking-[0.3em] text-xs block mb-8">The Journey</span>
              <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-12 uppercase">
                A CIRCUIT COMPOSED OF KENYA'S FINEST HOURS.
              </h2>
              <div className="prose prose-lg text-black/70 max-w-none space-y-6 leading-relaxed">
                {tour.fullDescription ? tour.fullDescription.split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                )) : <p>{tour.description}</p>}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#F3F3F1] rounded-[40px] p-10 md:p-12 sticky top-40">
                <div className="space-y-8 mb-12">
                  <div className="flex justify-between items-end border-b border-black/5 pb-4">
                    <span className="text-black/40 text-xs uppercase tracking-widest">From</span>
                    <span className="text-3xl font-serif">USD {tour.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-black/5 pb-4">
                    <span className="text-black/40 text-xs uppercase tracking-widest">Duration</span>
                    <span className="text-lg">{tour.duration}</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-black/5 pb-4">
                    <span className="text-black/40 text-xs uppercase tracking-widest">Style</span>
                    <span className="text-lg">{tour.tag || 'Luxury'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <button className="bg-black text-white py-5 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-black/80 transition-all">
                    Reserve
                  </button>
                  <button className="border border-black/10 py-5 rounded-full text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-black/5 transition-all">
                    <Download size={14} />
                    PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* MOMENTS TO NOTE (HIGHLIGHTS) */}
      <section ref={sections.highlights} className="py-24 md:py-32 bg-[#1A1A1A] text-white px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <span className="text-white/40 uppercase tracking-[0.3em] text-xs block mb-8">Moments to Note</span>
          <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-20 uppercase">
            SIX EXTRAORDINARY CHAPTERS.
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-20">
            {tour.highlights && tour.highlights.map((highlight, idx) => (
              <div key={idx} className="group">
                <span className="text-accent text-sm font-serif mb-6 block opacity-50 group-hover:opacity-100 transition-opacity">
                  {['I', 'II', 'III', 'IV', 'V', 'VI'][idx]}.
                </span>
                <h3 className="text-xl font-medium mb-4 uppercase tracking-wider">{highlight.title}</h3>
                <p className="text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DAY BY DAY (ITINERARY) */}
      <section ref={sections.itinerary} className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <span className="text-black/40 uppercase tracking-[0.3em] text-xs block mb-8">Day by Day</span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight uppercase">
              YOUR JOURNEY, HOUR BY HOUR CONSIDERED.
            </h2>
          </div>

          <div className="space-y-32">
            {tour.itinerary && tour.itinerary.map((day, idx) => (
              <div key={idx} className="grid lg:grid-cols-12 gap-12 md:gap-24 items-start">
                <div className="lg:col-span-2">
                  <div className="flex flex-col">
                    <span className="text-black/30 text-xs uppercase tracking-widest mb-2">Day</span>
                    <span className="text-5xl font-serif">{day.day}</span>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <span className="text-black/40 text-xs uppercase tracking-widest block mb-4">
                    {day.location}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif uppercase mb-6 leading-tight">
                    {day.title}
                  </h3>
                  <div className="space-y-8">
                    <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-black/80">
                      {day.subtitle}
                    </h4>
                    <p className="text-lg text-black/70 leading-relaxed">
                      {day.description}
                    </p>
                    <div className="pt-8 border-t border-black/5 flex items-start gap-4">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-black/40 mt-1">Where You Rest</span>
                      <p className="text-sm text-black/60 italic leading-relaxed">
                        {day.accommodation}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 h-full min-h-[400px]">
                  <img 
                    src={getImageUrl(tour.image)} 
                    alt={day.title}
                    className="w-full h-full object-cover rounded-[32px]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHERE YOU WILL REST (ACCOMMODATION) */}
      <section ref={sections.accommodation} className="py-24 md:py-32 bg-[#F3F3F1] px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="text-black/40 uppercase tracking-[0.3em] text-xs block mb-8">Where You Will Rest</span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight uppercase">
              FOUR EXTRAORDINARY HOMES IN THE WILD.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tour.accommodations && tour.accommodations.map((hotel, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedHotel(hotel)}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-[32px] mb-8 relative">
                  <img 
                    src={getImageUrl(tour.image)} 
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs uppercase tracking-widest font-bold border border-white/40 px-6 py-3 rounded-full backdrop-blur-md">
                      View Details
                    </span>
                  </div>
                </div>
                <span className="text-black/40 text-[10px] uppercase tracking-widest block mb-2">{hotel.location}</span>
                <h3 className="text-xl font-serif uppercase mb-4">{hotel.name}</h3>
                <p className="text-sm text-black/60 leading-relaxed line-clamp-3">
                  {hotel.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* THE DETAILS (INCLUSIONS) */}
      <section ref={sections.inclusions} className="py-24 md:py-32 px-6 md:px-12 border-b border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 md:gap-24">
            <div className="lg:col-span-4">
              <span className="text-black/40 uppercase tracking-[0.3em] text-xs block mb-8">The Details</span>
              <h2 className="text-4xl md:text-5xl font-serif leading-tight uppercase">
                WHAT IS INCLUDED.
              </h2>
            </div>

            <div className="lg:col-span-8 grid md:grid-cols-2 gap-16">
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-10 text-black/40">Your Journey Includes</h3>
                <ul className="space-y-6">
                  {tour.inclusions && tour.inclusions.map((item, idx) => (
                    <li key={idx} className="flex gap-4 items-start text-black/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-black/20 mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-10 text-black/40">Not Included</h3>
                <ul className="space-y-6">
                  {tour.exclusions && tour.exclusions.map((item, idx) => (
                    <li key={idx} className="flex gap-4 items-start text-black/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-black/10 mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIGNATURE JOURNEYS (RELATED) */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <span className="text-black/40 uppercase tracking-[0.3em] text-xs block mb-8">Our Signature Journeys</span>
              <h2 className="text-4xl md:text-5xl font-serif leading-tight uppercase max-w-2xl">
                THE JOURNEYS WE HOLD CLOSEST.
              </h2>
            </div>
            <p className="text-black/50 max-w-md leading-relaxed">
              Curated, tested, and refined over years — our most loved itineraries across East Africa and the Indian Ocean Islands.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {staticTours.filter(t => t.id !== tour.id).slice(0, 3).map((t, idx) => (
              <div 
                key={idx}
                onClick={() => {
                  navigate(`/travel/${t.id}`);
                  window.scrollTo(0, 0);
                }}
                className="group cursor-pointer"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-[32px] mb-8">
                  <img 
                    src={getImageUrl(t.image)} 
                    alt={t.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-black/40 mb-3">
                  <span>{t.duration}</span>
                  <span className="w-1 h-1 rounded-full bg-black/20" />
                  <span>{t.location}</span>
                </div>
                <h3 className="text-xl font-serif uppercase mb-4 group-hover:text-black/60 transition-colors">{t.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">From USD {t.price.toLocaleString()} pp</span>
                  <span className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold group-hover:gap-4 transition-all">
                    View <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-48 px-6 md:px-12 bg-[#F3F3F1] text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-serif leading-[1] mb-12 uppercase">
            YOUR JOURNEY AWAITS.
          </h2>
          <p className="text-xl md:text-2xl text-black/60 mb-16 font-light">
            Share a few considered details, and your Safari Advisor will be in touch within 24 hours.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button className="bg-black text-white px-12 py-6 rounded-full text-xs uppercase tracking-widest font-bold hover:scale-105 transition-all">
              Reserve This Journey
            </button>
            <button className="border border-black/20 text-black px-12 py-6 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-all">
              Speak with an Advisor
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* HOTEL MODAL */}
      <AnimatePresence>
        {selectedHotel && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-6xl h-full max-h-[90vh] rounded-[40px] overflow-hidden flex flex-col md:flex-row relative"
            >
              <button 
                onClick={() => setSelectedHotel(null)}
                className="absolute top-8 right-8 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white md:text-black md:bg-black/5 md:hover:bg-black/10 transition-all"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-1/2 h-64 md:h-auto">
                <img 
                  src={getImageUrl(tour.image)} 
                  alt={selectedHotel.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-1/2 p-10 md:p-16 overflow-y-auto no-scrollbar">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] mb-8 text-black/40">
                  <MapPin size={14} />
                  <span>{selectedHotel.location}</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-10 uppercase">
                  {selectedHotel.name}
                </h2>

                <div className="prose prose-lg text-black/70 mb-12 space-y-6 leading-relaxed">
                  {selectedHotel.longDescription ? selectedHotel.longDescription.split('\n\n').map((p, i) => (
                    <p key={i}>{p}</p>
                  )) : <p>{selectedHotel.description}</p>}
                </div>

                <div className="space-y-10">
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-8 text-black/40">Facilities & Amenities</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedHotel.facilities && selectedHotel.facilities.map((f, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-black/60">
                          <Check size={14} className="text-black/20" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TourDetails;