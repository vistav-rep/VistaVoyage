import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TourCard = ({ tour, dark = true }) => {
  const navigate = useNavigate();

  // Helper to handle image paths (works for both static imports and backend uploads)
  const getImageUrl = (image) => {
    if (!image) return 'https://images.unsplash.com/photo-1534067783941-51c9c23eccfd';
    if (image.startsWith('/uploads')) {
      const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.split('/api')[0] : 'http://localhost:5000';
      return `${baseUrl}${image}`;
    }
    return image;
  };

  const tourId = tour._id || tour.id;

  return (
    <motion.div 
      whileHover={{ y: -15 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => navigate(`/travel/${tourId}`)}
      className={`group cursor-pointer ${dark ? 'bg-white/[0.02] border-white/5' : 'bg-gray-50/50 border-gray-100 shadow-sm'} border backdrop-blur-sm overflow-hidden p-4 hover:border-accent/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-700 rounded-[2.5rem]`}
    >
      <div className="relative aspect-[12/13] overflow-hidden mb-8 rounded-[2rem]">
        <motion.img 
          src={getImageUrl(tour.image)} 
          alt={tour.title} 
          loading="lazy"
          decoding="async"
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
        <div className="absolute top-6 left-6">
          <span className="bg-accent/90 backdrop-blur-md text-white text-[9px] font-bold px-4 py-2 uppercase tracking-[0.2em] rounded-full shadow-lg">
            Luxury Expedition
          </span>
        </div>
        <div className="absolute bottom-6 right-6">
          <div className="bg-white/5 backdrop-blur-md text-white text-lg font-serif px-6 py-3 rounded-2xl border border-white/10 shadow-2xl">
            From <span className="text-accent ml-2 font-sans font-bold tracking-tight">${tour.price}</span>
          </div>
        </div>
      </div>
      
      <div className="px-4 pb-4">
        <div className={`flex items-center gap-6 ${dark ? 'text-white/30' : 'text-dark/40'} font-bold text-[10px] uppercase tracking-[0.2em] mb-4`}>
          <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            {tour.duration}
          </span>
          <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            {tour.location}
          </span>
        </div>
        
        <h3 className={`text-2xl md:text-3xl font-serif ${dark ? 'text-white' : 'text-dark'} mb-6 leading-tight group-hover:text-accent transition-colors duration-700`}>
          {tour.title}
        </h3>
        
        <div className={`flex items-center justify-between pt-6 border-t ${dark ? 'border-white/5' : 'border-gray-100'}`}>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-accent/60 group-hover:text-accent transition-colors duration-500"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            ))}
            <span className={`text-[10px] ${dark ? 'text-white/20' : 'text-dark/20'} ml-3 font-bold tracking-widest uppercase`}>Verified</span>
          </div>
          <div className={`w-12 h-12 rounded-full border ${dark ? 'border-white/10 text-white' : 'border-gray-200 text-dark'} flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-white group-hover:translate-x-2 transition-all duration-700 ease-[0.22, 1, 0.36, 1]`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TourCard;
