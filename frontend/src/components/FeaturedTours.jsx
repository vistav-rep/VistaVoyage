import React from 'react';
import { useNavigate } from 'react-router-dom';
import TourCard from './TourCard';
import Reveal from './Reveal';
import { tours } from '../data/toursData';

const FeaturedTours = () => {
  const navigate = useNavigate();
  const featured = tours.slice(0, 3);

  return (
    <section className="relative py-28 px-6 md:px-16 bg-[#faf9f6] overflow-hidden">

      {/* SOFT BACKGROUND GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#0f1e3f]/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-24">
          <Reveal>
            <span className="text-[#7A0C0C] text-xs uppercase tracking-[0.4em] font-semibold mb-6 block">
              Handpicked Experiences
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-7xl font-serif text-gray-900 leading-[1.1] tracking-tight mb-6">
              Curated Luxury <br />
              <span className="italic text-[#0f1e3f]">Safari Expeditions</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Discover extraordinary journeys designed for those who seek more than travel —
              immersive, unforgettable African experiences.
            </p>
          </Reveal>

          <div className="mt-8 w-24 h-[2px] bg-gradient-to-r from-transparent via-[#0f1e3f]/40 to-transparent mx-auto"></div>
        </div>

        {/* TOUR CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {featured.map((tour, i) => (
            <Reveal key={tour.id} delay={i * 0.15}>
              <div className="group transform transition duration-500 hover:-translate-y-3">

                {/* CARD WRAPPER */}
                <div className="relative">

                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-[#0f1e3f]/0 group-hover:bg-[#0f1e3f]/5 blur-xl transition duration-500"></div>

                  {/* Actual Card */}
                  <div className="relative z-10">
                    <TourCard tour={tour} />
                  </div>

                </div>

              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA SECTION */}
        <div className="mt-28 text-center">
          <Reveal delay={0.4}>
            <div className="inline-block bg-white px-10 py-8 rounded-2xl shadow-lg">

              <p className="text-gray-500 mb-4 text-sm uppercase tracking-widest">
                Limited Availability
              </p>

              <h3 className="text-2xl md:text-3xl font-serif text-gray-900 mb-6">
                Secure Your Safari Adventure Today
              </h3>

              <button
                onClick={() => navigate('/tours')}
                className="inline-flex items-center gap-4 bg-[#0f1e3f] text-white px-8 py-3 rounded-full hover:bg-[#1a2f5f] transition-all duration-300 shadow-md hover:shadow-xl"
              >
                Explore All Journeys
                <span className="w-6 h-[2px] bg-white group-hover:w-10 transition-all duration-300"></span>
              </button>

            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
};

export default FeaturedTours;