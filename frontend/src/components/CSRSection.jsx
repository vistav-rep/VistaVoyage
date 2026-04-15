import React from 'react';
import Reveal from './Reveal';
import { motion } from 'framer-motion';

const CSRSection = () => {
  const initiatives = [
    {
      title: "Jamii Stawi",
      subtitle: "Social Inclusion",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="9" cy="7" r="4"/>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5"/>
        </svg>
      ),
      objective: "Empowering lives through health equity, educational support, and economic dignity for neighboring communities."
    },
    {
      title: "Uhifadhi Action",
      subtitle: "Climate Resilience",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a8 8 0 0 1-8 8Z"/>
        </svg>
      ),
      objective: "Active reforestation, waste circularity, and plastic neutrality to preserve Africa's untamed landscapes."
    },
    {
      title: "Mvuto Network",
      subtitle: "Mentorship",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5"/>
        </svg>
      ),
      objective: "Fostering the next generation of African conservationists and ethical hospitality leaders through mentorship."
    }
  ];

  return (
    <section className="py-28 px-6 md:px-20 bg-[#0a0a0a] text-white relative overflow-hidden">

      {/* SOFT GOLD GLOW BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,163,88,0.06)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="mb-24 max-w-3xl">
          <Reveal>
            <p className="text-[14px] tracking-[0.4em] uppercase text-[#FFD700] mb-6">
              Our CSR
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-6"
                style={{
                  color: "#FFD700",
                  textShadow: "0 0 8px #FFD700, 0 0 12px #FFD700, 0 0 16px #FFD700"
                }}>
              Kovu Afrika
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed">
              "Healing Landscapes, Empowering Lives". Kovu Afrika represents our commitment 
              to leaving a lasting, positive mark on the African continent—where travel meets purpose.
            </p>
          </Reveal>
        </div>

        {/* INITIATIVES */}
        <div className="grid md:grid-cols-3 gap-10">
          {initiatives.map((item, index) => (
            <Reveal key={index} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group border border-white/10 rounded-2xl p-8 bg-white/[0.03] hover:bg-white/[0.06] transition duration-500 backdrop-blur-sm"
              >
                {/* ICON */}
                <div className="text-[#FFD700] mb-6 group-hover:scale-110 transition duration-500 drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">
                  {item.icon}
                </div>

                {/* SUBTITLE */}
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/70 mb-3">
                  {item.subtitle}
                </p>

                {/* TITLE */}
                <h3 className="text-2xl font-serif mb-4"
                    style={{
                      color: "#FFD700",
                      textShadow: "0 0 6px #FFD700, 0 0 10px #FFD700"
                    }}>
                  {item.title}
                </h3>

                {/* TEXT */}
                <p className="text-white/70 leading-relaxed text-sm">
                  {item.objective}
                </p>

                {/* CTA */}
                <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-widest text-[#FFD700]">
                  Discover
                  <div className="w-6 h-[1px] bg-[#FFD700] group-hover:w-10 transition-all duration-300"></div>
                </div>

              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CSRSection;