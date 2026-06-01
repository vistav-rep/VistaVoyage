import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Crown,
} from "lucide-react";

import TourCard from "./TourCard";
import Reveal from "./Reveal";
import getImageUrl from '../utils/imageUrl';

import { tours as staticTours } from "../data/toursData";
import api from "../api/axios";

const FeaturedTours = () => {
  const navigate = useNavigate();

  const [featured, setFeatured] = useState(staticTours.slice(0, 3));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await api.get("/tours/featured");

        if (response.data?.length > 0) {
          setFeatured(response.data);
        }
      } catch (error) {
        console.error("Error fetching featured tours:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#f7f4ee] py-28 md:py-36 px-6 md:px-16">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        
        {/* TOP GOLD LIGHT */}
        <div className="absolute top-[-220px] right-[-180px] w-[700px] h-[700px] rounded-full bg-[#c8a248]/10 blur-[160px]" />

        {/* BOTTOM GREEN LIGHT */}
        <div className="absolute bottom-[-260px] left-[-180px] w-[700px] h-[700px] rounded-full bg-[#0b3d2e]/10 blur-[160px]" />

        {/* GRID TEXTURE */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-16 mb-24">

          {/* LEFT */}
          <div className="max-w-3xl">

            <Reveal>
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/70 backdrop-blur-md border border-white shadow-sm mb-8">
                <Sparkles size={16} className="text-[#c8a248]" />

                <p className="uppercase tracking-[0.35em] text-[11px] font-semibold text-[#0b3d2e]">
                  Luxury African Escapes
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-[-0.04em] text-[#111]">

                Extraordinary
                <br />

                <span className="text-[#0b3d2e]">
                  Safari Experiences
                </span>

              </h2>
            </Reveal>

          </div>

          {/* RIGHT */}
          <Reveal delay={0.2}>
            <div className="max-w-md">

              <p className="text-[#666] text-lg leading-relaxed mb-10">
                Immerse yourself in handcrafted safari journeys created
                for travelers who seek elegance, exclusivity, and the
                untamed beauty of Africa.
              </p>

              <button
                onClick={() => navigate("/tours")}
                className="group inline-flex items-center gap-5"
              >

                <span className="uppercase tracking-[0.25em] text-sm font-semibold text-[#111]">
                  Explore Collection
                </span>

                <div className="w-14 h-14 rounded-full bg-[#0b3d2e] flex items-center justify-center shadow-xl transition-all duration-500 group-hover:translate-x-2 group-hover:scale-110">

                  <ArrowRight
                    size={18}
                    className="text-white"
                  />

                </div>

              </button>

            </div>
          </Reveal>

        </div>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {featured.map((tour, i) => (
            <Reveal
              key={tour.id || tour._id}
              delay={i * 0.15}
            >
              <div className="group relative overflow-hidden rounded-[34px] bg-white border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] hover:shadow-[0_35px_90px_rgba(0,0,0,0.12)] transition-all duration-700">
                {/* IMAGE */}
                <div className="relative h-[420px] overflow-hidden">
                  {(() => {
                    const src = getImageUrl(tour.image || tour.images?.[0]);
                    return (
                      <img
                        src={src}
                        alt={tour.title}
                        onError={(e) => { e.currentTarget.src = getImageUrl(null); }}
                        className="w-full h-full object-cover transition-transform duration-[1600ms] group-hover:scale-110"
                      />
                    );
                  })()}

              <div className="group relative">

                {/* OUTER GLOW */}
                <div className="absolute inset-0 rounded-[40px] bg-[#c8a248]/0 group-hover:bg-[#c8a248]/10 blur-3xl transition-all duration-700" />

                {/* CARD */}
                <div className="relative overflow-hidden rounded-[40px] border border-white/50 bg-white/75 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-700 hover:-translate-y-5 hover:shadow-[0_30px_90px_rgba(0,0,0,0.15)]">

                  {/* IMAGE */}
                  <div className="relative overflow-hidden">

                      <button
                        onClick={() =>
                          navigate(
                            `/travel/${tour._id || tour.id}`
                          )
                        }
                        className="min-w-[58px] h-[58px] rounded-full bg-white text-[#111] flex items-center justify-center shadow-xl transition-all duration-500 group-hover:bg-[#c8a248] group-hover:text-white"
                      >
                        <ArrowRight size={18} />
                      </button>
                    </div>

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                  </div>

                  {/* FLOATING BADGE */}
                  <div className="absolute top-5 right-5 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/60">

                    <div className="flex items-center gap-2">
                      <Crown size={12} className="text-[#c8a248]" />

                      <p className="text-[10px] uppercase tracking-[0.28em] font-semibold text-[#111]">
                        Luxury
                      </p>
                    </div>

                  </div>

                  {/* BOTTOM ACCENT */}
                  <div className="absolute bottom-0 left-0 h-[4px] w-full bg-gradient-to-r from-[#0b3d2e] via-[#c8a248] to-[#0b3d2e] opacity-0 transition duration-500 group-hover:opacity-100" />

                </div>

              </div>

            </Reveal>
          ))}

        </div>

        {/* CTA SECTION */}
        <Reveal delay={0.5}>
          <div className="mt-32">

            <div className="relative overflow-hidden rounded-[48px] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.18)]">

              {/* BACKGROUND */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, #0b3d2e 0%, #071f18 100%)",
                }}
              />

              {/* GOLD LIGHT */}
              <div className="absolute top-[-100px] right-[-100px] w-[320px] h-[320px] rounded-full bg-[#c8a248]/20 blur-[120px]" />

              {/* CONTENT */}
              <div className="relative z-10 px-10 md:px-20 py-16 md:py-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-14">

                {/* TEXT */}
                <div className="max-w-2xl">

                  <div className="inline-flex items-center gap-3 mb-6">

                    <ShieldCheck
                      size={18}
                      className="text-[#c8a248]"
                    />

                    <p className="uppercase tracking-[0.35em] text-[11px] font-semibold text-[#c8a248]">
                      Private Journeys
                    </p>

                  </div>

                  <h3 className="text-4xl md:text-6xl font-bold leading-[1] tracking-[-0.04em] text-white mb-7">

                    Crafted For
                    <br />

                    Exceptional Travelers

                  </h3>

                  <p className="text-white/70 text-lg leading-relaxed">
                    From iconic safari destinations to hidden luxury
                    retreats, every journey is designed with elegance,
                    authenticity, and unforgettable comfort.
                  </p>

                </div>

                {/* BUTTON */}
                <button
                  onClick={() => navigate("/tours")}
                  className="group inline-flex items-center gap-5 bg-white text-[#111] px-10 py-5 rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
                >

                  <span className="uppercase tracking-[0.2em] text-sm font-semibold">
                    Discover More
                  </span>

                  <ArrowRight
                    size={18}
                    className="transition duration-300 group-hover:translate-x-1"
                  />

                </button>

              </div>

            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
};

export default FeaturedTours;