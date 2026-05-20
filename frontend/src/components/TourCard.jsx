import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TourCard = ({ tour }) => {
  const navigate = useNavigate();

  const getImageUrl = (image) => {
    if (!image)
      return 'https://images.unsplash.com/photo-1534067783941-51c9c23eccfd';

    if (image.startsWith('/uploads')) {
      const baseUrl = import.meta.env.VITE_API_URL
        ? import.meta.env.VITE_API_URL.split('/api')[0]
        : 'http://localhost:5000';

      return `${baseUrl}${image}`;
    }

    return image;
  };

  const tourId = tour._id || tour.id;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5 }}
      onClick={() => navigate(`/travel/${tourId}`)}
      className="
        group
        cursor-pointer
      "
    >
      <div
        className="
          overflow-hidden
          rounded-[32px]
          bg-white
          border border-black/5
          shadow-[0_10px_40px_rgba(0,0,0,0.06)]
          hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]
          transition-all
          duration-500
        "
      >
        {/* IMAGE */}
        <div className="relative overflow-hidden aspect-[4/5]">
          <motion.img
            src={getImageUrl(tour.image)}
            alt={tour.title}
            loading="lazy"
            decoding="async"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 1.2 }}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          {/* Price */}
          <div className="absolute top-5 right-5">
            <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full">
              <span className="text-l font-bold text-accent">
                ${tour.price}
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="absolute bottom-5 left-5">
            <span className="text-white/90 text-l tracking-wide">
              {tour.location}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6">
          {/* Duration */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-[0.25em] text-black/40">
              {tour.duration}
            </span>

            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  className="w-1.5 h-1.5 rounded-full bg-black/20"
                />
              ))}
            </div>
          </div>

          {/* Title */}
          <h3
            className="
              text-2xl
              font-serif
              text-black
              leading-tight
              mb-6
              group-hover:text-accent
              transition-colors
              duration-500
            "
          >
            {tour.title}
          </h3>

          {/* CTA */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-black/50">
              Explore Journey
            </span>

            <div
              className="
                w-10
                h-10
                rounded-full
                bg-black
                text-white
                flex
                items-center
                justify-center
                group-hover:translate-x-1
                transition-transform
                duration-300
              "
            >
              →
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TourCard;