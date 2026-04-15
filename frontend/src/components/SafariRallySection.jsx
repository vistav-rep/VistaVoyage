import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Hotel, MapPin } from 'lucide-react';
import Reveal from './Reveal';
import maasaiImg from "../assets/Maasai.jpeg"
//import safari6Img from"../assets/SAFARI6.jpg
import mainImage from '../assets/WRC - Safari 2023.jpeg';

const SafariRallySection = () => {
  return (
    <section className="py-24 px-6 md:px-20 bg-[#f8f6f2] relative">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT: IMAGE */}
        <div className="relative flex justify-center md:justify-start">
          <Reveal>
            <img
              src={mainImage}
              alt="WRC Safari Rally"
              className="w-[320px] md:w-[380px] h-[420px] object-cover shadow-md"
            />
          </Reveal>
        </div>

        {/* RIGHT: TEXT */}
        <div className="space-y-8 text-center md:text-left">
          
          <Reveal>
            <p className="text-[#0B3D2E] uppercase tracking-[0.3em] text-xs font-semibold">
              Limited Time Offer
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-800 leading-tight">
              Exclusive WRC <br />
              <span className="italic text-[#7A0C0C]">Safari Rally</span> Experience
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-gray-500 leading-relaxed text-base max-w-md mx-auto md:mx-0">
              Don't miss out on the thrill of the 2025 WRC Safari Rally in Naivasha.
              We've secured premium accommodation at the most sought-after lodges,
              offering you front-row access to one of the world’s most iconic rally events.
            </p>
          </Reveal>

          {/* FEATURES */}
          <div className="space-y-4 pt-2">
            <Reveal delay={0.3}>
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <Hotel className="text-[#0f1e3f]" size={20} />
                <div>
                  <p className="font-semibold text-gray-800">Premium Lodging</p>
                  <p className="text-sm text-gray-500">Sarova Lion Hill & Sawela</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <MapPin className="text-[#0f1e3f]" size={20} />
                <div>
                  <p className="font-semibold text-gray-800">Elite Locations</p>
                  <p className="text-sm text-gray-500">Naivasha Circuit Access</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* PRICE */}
          <Reveal delay={0.5}>
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                Starting from
              </p>
              <p className="text-4xl font-serif text-[#430101]">
                $134
                <span className="text-sm text-gray-500 ml-2">/pn</span>
              </p>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.6}>
            <Link
              to="/tours"
              className="inline-block text-sm tracking-widest uppercase text-black border-b border-black pb-1 hover:opacity-70 transition"
            >
              Book Your Spot Now
            </Link>
          </Reveal>

        </div>

      </div>

      {/* BOTTOM RIGHT WILDLIFE IMAGES */}
      <div className="hidden md:block absolute bottom-10 right-10">
        <div className="relative">

          {/* Image 1 */}
          <img
            src={maasaiImg}
            alt="Maasai Mara Wildlife"
            className="w-[160px] h-[120px] object-cover shadow-lg border-4 border-white"
          />

          {/* Image 2 (slightly offset) */}
         // <img
          //  src={safari6Img}
          //  alt="Safari Animals"
           // className="w-[140px] h-[100px] object-cover shadow-md border-4 border-white absolute -bottom-8 -left-16"
          />

        </div>
      </div>

    </section>
  );
};

export default SafariRallySection;