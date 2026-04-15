import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import NewsletterModal from "./NewsletterModal";

import sarovaLogo from "../assets/svt.jpeg";
import serenaLogo from "../assets/serena hotel.png";
import kaLogo from "../assets/kenya airways.jfif";
import magicalKenyaLogo from "../assets/Magical kenya.jpeg";
import katoLogo from "../assets/KATO.png";
import iataaLogo from "../assets/IATAa.jfif";

const PartnersSection = () => {
  const [partners, setPartners] = useState([]);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const controls = useAnimation();

  const HEIGHT = "h-[110px]";

  const getDuration = () => {
    if (window.innerWidth < 640) return 26;
    if (window.innerWidth < 1024) return 34;
    return 42;
  };

  useEffect(() => {
    setPartners([
      { name: "IATA", logo: iataaLogo, url: "https://www.iata.org" },
      { name: "Serena Hotel", logo: serenaLogo, url: "https://www.serenahotels.com" },
      { name: "KATA", logo: serenaLogo, url: "https://katakenya.org" },
      { name: "Kenya Airways", logo: kaLogo, url: "https://www.kenya-airways.com" },
      { name: "Magical Kenya", logo: magicalKenyaLogo, url: "https://magicalkenya.com" },
      { name: "TOSK", logo: serenaLogo, url: "https://www.fairmont.com" },
      { name: "Ecotourism Kenya", logo: katoLogo, url: "https://ecotourismkenya.org/" },
      // { name: "Ecotourism Kenya", logo: katoLogo, url: "https://ecotourismkenya.org/" }
    ]);
  }, []);

  const duplicated = [...partners, ...partners];

  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: getDuration(),
        ease: "linear",
        repeat: Infinity
      }
    });
  }, [partners]);

  return (
    <>
      {/* CHAT TAB */}
      {/* <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50">
        <div
          className="bg-black text-white flex items-center justify-center cursor-pointer"
          style={{
            width: "38px",
            height: "200px",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            letterSpacing: "0.3em",
            fontSize: "11px"
          }}
        >
          CHAT WITH US
        </div>
      </div> */}

      {/* TOP LINE */}
      <div className="w-full border-t border-gray-300"></div>

      {/* NEWSLETTER */}
      <div className={`w-full border-b border-gray-300 ${HEIGHT}`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-center">

          <p className="inline-block text-sm tracking-widest uppercase text-black hover:opacity-70 transition">
            Get the latest from{" "}
            <span className="text-gray-900 font-medium">VistaVoyage</span>
            :{" "}

            {/* CUSTOM UNDERLINE */}
            <span 
              className="relative text-gray-900 font-medium cursor-pointer group hover:text-[#7A0C0C] transition-colors"
              onClick={() => setIsNewsletterOpen(true)}
            >
              Sign up to our Newsletter

              <span className="absolute left-0 -bottom-2 w-full h-[1px] bg-gray-900 opacity-70 group-hover:bg-[#7A0C0C]"></span>
            </span>
          </p>

        </div>
      </div>

      <NewsletterModal isOpen={isNewsletterOpen} onClose={() => setIsNewsletterOpen(false)} />

      {/* PARTNERS STRIP (LIGHT GRAY) */}
      <section
        className={`border-b border-gray-300 overflow-hidden ${HEIGHT}`}
        style={{ backgroundColor: "#f5f5f5" }}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center">

          <motion.div
            className="flex items-center gap-20 whitespace-nowrap"
            animate={controls}
            onHoverStart={() => controls.stop()}
            onHoverEnd={() =>
              controls.start({
                x: ["0%", "-50%"],
                transition: {
                  duration: getDuration(),
                  ease: "linear",
                  repeat: Infinity
                }
              })
            }
          >
            {duplicated.map((partner, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center flex-shrink-0 cursor-pointer opacity-80 hover:opacity-100 transition gap-2"
                onClick={() => window.open(partner.url, "_blank")}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span className="text-[10px] uppercase tracking-widest text-black font-semibold">
                  {partner.name}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default PartnersSection;