import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../api/axios';
import { 
  MapPin, Clock, Utensils, Plane, ArrowRight, Check, X, 
  Calendar, Users, Mail, Phone, User, Send, ChevronRight 
} from 'lucide-react';

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingData, setBookingData] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    fromDate: '',
    guestsCount: 1,
    specialRequests: ''
  });

  const sections = {
    overview: useRef(null),
    itinerary: useRef(null),
    inclusions: useRef(null),
    booking: useRef(null)
  };

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await api.get(`/packages/${id}`);
        setPkg(response.data);
      } catch (error) {
        console.error('Error fetching package:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
    window.scrollTo(0, 0);
  }, [id]);

  const handleBookingChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    try {
      await api.post('/bookings', {
        ...bookingData,
        package: pkg._id,
        type: 'PACKAGE',
        totalPrice: pkg.price * bookingData.guestsCount
      });
      setBookingSuccess(true);
      setTimeout(() => setBookingSuccess(false), 5000);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to submit booking. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="w-10 h-10 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!pkg) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <h2 className="text-3xl font-serif mb-4 uppercase text-accent">Package Not Found</h2>
      <button onClick={() => navigate('/packages')} className="text-accent uppercase tracking-widest font-bold">Back to Packages</button>
    </div>
  );

  return (
    <div className="bg-[#FAF9F6] text-accent min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[80vh] flex items-end justify-start overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={pkg.images[0] || 'https://images.unsplash.com/photo-1516426122078-c23e76319801'} 
            alt={pkg.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>
        
        <div className="relative z-10 p-12 md:p-24 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-3 text-accent text-xs uppercase tracking-[0.4em] mb-6 font-bold">
              <MapPin size={16} />
              <span>{pkg.destination}</span>
            </div>
            <h1 className="text-white font-serif text-6xl md:text-8xl leading-none uppercase mb-8 tracking-tighter">
              {pkg.title}
            </h1>
            <div className="flex flex-wrap gap-8 text-white">
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-accent" />
                <span className="text-sm uppercase tracking-widest font-medium text-accent">{pkg.duration}</span>
              </div>
              <div className="flex items-center gap-3">
                <Utensils size={18} className="text-accent" />
                <span className="text-sm uppercase tracking-widest font-medium text-accent">{pkg.mealPlan}</span>
              </div>
              <div className="flex items-center gap-3">
                <Plane size={18} className="text-accent" />
                <span className="text-sm uppercase tracking-widest font-medium text-accent">{pkg.transport}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTENT GRID */}
      <section className="py-24 px-6 md:px-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-20">
          {/* Left Column: Info */}
          <div className="lg:col-span-8 space-y-24">
            {/* Overview */}
            <div ref={sections.overview}>
              <h2 className="text-xs uppercase tracking-[0.5em] text-accent mb-8 font-bold">The Experience</h2>
              <h3 className="text-4xl font-serif uppercase mb-8 leading-tight text-accent">Overview</h3>
              <p className="text-lg text-accent leading-relaxed font-light italic">
                {pkg.overview || "Embark on a journey beyond the ordinary, where luxury meets the untamed beauty of the wild. Our handpicked experiences ensure every moment is etched in elegance and authentic discovery."}
              </p>
            </div>

            {/* Gallery */}
            <div>
              <h3 className="text-4xl font-serif uppercase mb-8 leading-tight text-accent">Visual Journey</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {pkg.images.map((img, idx) => (
                  <div key={idx} className={`overflow-hidden rounded-2xl ${idx === 0 ? 'col-span-2 row-span-2' : ''}`}>
                    <img 
                      src={img} 
                      alt={`Gallery ${idx}`} 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div ref={sections.itinerary}>
              <h2 className="text-xs uppercase tracking-[0.5em] text-accent mb-8 font-bold">The Timeline</h2>
              <h3 className="text-4xl font-serif uppercase mb-12 leading-tight text-accent">Daily Itinerary</h3>
              <div className="space-y-12 border-l border-black/5 pl-12">
                {pkg.itinerary?.length > 0 ? pkg.itinerary.map((day, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[53px] top-0 w-2.5 h-2.5 rounded-full bg-accent ring-8 ring-[#FAF9F6]" />
                    <span className="text-[10px] uppercase tracking-widest text-accent font-bold mb-2 block">Day {day.day}</span>
                    <h4 className="text-xl font-serif uppercase mb-4 text-accent">{day.title}</h4>
                    <p className="text-accent leading-relaxed">{day.description}</p>
                  </div>
                )) : (
                  <p className="text-accent italic">Standard luxury itinerary applicable for this {pkg.duration} escape.</p>
                )}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div ref={sections.inclusions} className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-serif uppercase mb-8 flex items-center gap-3 text-accent">
                  <Check className="text-accent" size={20} /> Inclusions
                </h3>
                <ul className="space-y-4">
                  {pkg.inclusions?.map((item, idx) => (
                    <li key={idx} className="flex gap-4 text-sm text-accent">
                      <span className="w-1 h-1 rounded-full bg-accent mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-serif uppercase mb-8 flex items-center gap-3 text-accent">
                  <X className="text-accent" size={20} /> Exclusions
                </h3>
                <ul className="space-y-4">
                  {pkg.exclusions?.map((item, idx) => (
                    <li key={idx} className="flex gap-4 text-sm text-accent">
                      <span className="w-1 h-1 rounded-full bg-accent mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Booking */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 bg-white rounded-[32px] p-10 shadow-2xl border border-black/5">
              <div className="mb-10 text-center">
                <span className="text-[10px] uppercase tracking-widest text-accent block mb-2">Exclusive Offer</span>
                <h4 className="text-4xl font-serif text-accent">USD {pkg.price.toLocaleString()}</h4>
                <p className="text-[10px] uppercase tracking-widest text-accent mt-2">Per Person Sharing</p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-6 text-accent">
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/50" size={16} />
                    <input 
                      type="text" 
                      name="guestName"
                      placeholder="Your Full Name"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-[#F3F3F1] rounded-2xl text-sm outline-none focus:ring-2 focus:ring-accent/30 transition-all text-accent"
                      onChange={handleBookingChange}
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/50" size={16} />
                    <input 
                      type="email" 
                      name="guestEmail"
                      placeholder="Email Address"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-[#F3F3F1] rounded-2xl text-sm outline-none focus:ring-2 focus:ring-accent/30 transition-all text-accent"
                      onChange={handleBookingChange}
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/50" size={16} />
                    <input 
                      type="tel" 
                      name="guestPhone"
                      placeholder="Phone Number"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-[#F3F3F1] rounded-2xl text-sm outline-none focus:ring-2 focus:ring-accent/30 transition-all text-accent"
                      onChange={handleBookingChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/50" size={16} />
                      <input 
                        type="date" 
                        name="fromDate"
                        required
                        className="w-full pl-12 pr-4 py-4 bg-[#F3F3F1] rounded-2xl text-sm outline-none focus:ring-2 focus:ring-accent/30 transition-all text-accent"
                        onChange={handleBookingChange}
                      />
                    </div>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/50" size={16} />
                      <input 
                        type="number" 
                        name="guestsCount"
                        min="1"
                        placeholder="Guests"
                        required
                        className="w-full pl-12 pr-4 py-4 bg-[#F3F3F1] rounded-2xl text-sm outline-none focus:ring-2 focus:ring-accent/30 transition-all text-accent"
                        onChange={handleBookingChange}
                        value={bookingData.guestsCount}
                      />
                    </div>
                  </div>
                  <textarea 
                    name="specialRequests"
                    placeholder="Special Requests or Inquiries"
                    rows="3"
                    className="w-full p-4 bg-[#F3F3F1] rounded-2xl text-sm outline-none focus:ring-2 focus:ring-accent/30 transition-all resize-none text-accent"
                    onChange={handleBookingChange}
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full bg-[#1a1a1a] text-white py-5 rounded-2xl uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-accent transition-all flex items-center justify-center gap-3"
                >
                  {bookingLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : bookingSuccess ? (
                    <>Success <Check size={16} /></>
                  ) : (
                    <>Request Booking <Send size={14} /></>
                  )}
                </button>

                <p className="text-[9px] text-center text-accent leading-relaxed px-4">
                  By clicking "Request Booking", you agree to our terms and will receive a private consultation from our concierge team.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PackageDetails;
