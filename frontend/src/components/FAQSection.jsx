import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Reveal from './Reveal';

const faqs = [
  {
    question: "What travel documents do I need for my trip?",
    answer: "Generally, you will need a valid passport with at least 6 months validity from your return date. Visa requirements vary by destination and nationality. Our team provides comprehensive visa support and guidance for all our travel packages."
  },
  {
    question: "How do I book a luxury tour with VistaVoyage?",
    answer: "You can book directly through our website by selecting your preferred package and filling the booking request form. Alternatively, you can book an office consultation for a personalized itinerary planning session."
  },
  {
    question: "What is included in the tour packages?",
    answer: "Our ultra-luxury packages typically include destination management, premium accommodations, private transportation, gourmet dining experiences, and 24/7 concierge support. Specific inclusions are listed on each tour's detail page."
  },
  {
    question: "Do you offer corporate travel management?",
    answer: "Yes, VistaVoyage is a distinguished Travel Management Company. We offer seamless air travel management, strategic hotel partnerships, and sophisticated booking systems tailored for global business travel."
  },
  {
    question: "What is your cancellation policy?",
    answer: "Cancellation policies vary depending on the specific tour and service providers involved. Detailed terms are provided at the time of booking. We always recommend purchasing travel insurance for added peace of mind."
  }
];

const FAQItem = ({ question, answer, isOpen, toggle }) => (
  <motion.div
    layout
    className="bg-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
  >
    <button 
      onClick={toggle}
      className="w-full flex justify-between items-center text-left"
    >
      <span className={`text-xl md:text-2xl font-be-serif transition-colors duration-500 ${isOpen ? 'text-accent' : 'text-gray-800 hover:text-accent'}`}>
        {question}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.1 : 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`${isOpen ? 'text-accent' : 'text-gray-400'}`}
      >
        <ChevronDown size={24} strokeWidth={1.5} />
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden mt-5"
        >
          <p className="text-gray-600 text-lg md:text-xl font-be-sans leading-relaxed pl-6 border-l-2 border-accent">
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section className="py-32 px-6 md:px-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 lg:gap-32 items-start">

        {/* Left Column: Header + CTA */}
        <div className="flex flex-col justify-start space-y-10">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-accent"></div>
              <span className="text-accent text-[10px] uppercase tracking-[0.5em] font-bold">
                Common Questions
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-be-serif text-gray-900 leading-[1.05] mb-6">
              Everything You <br /><span className="italic font-be-serif text-accent">Need to Know</span>
            </h2>

            <p className="text-gray-600 text-lg md:text-xl font-be-sans leading-relaxed mb-16">
              Find answers to frequently asked questions about our luxury travel services and planning process.
            </p>

            {/* CTA Card */}
            <motion.div 
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(255,215,0,0.3)" }}
              className="p-12 border border-gray-100 rounded-[3rem] shadow-lg bg-gradient-to-b from-white/80 to-white/90 transition-all duration-500"
            >
              <h4 className="text-3xl font-be-serif text-accent mb-6">Still have questions?</h4>
              <p className="text-gray-600 text-lg font-be-sans mb-12 leading-relaxed italic border-l-2 border-accent pl-6">
                Our luxury travel consultants are available 24/7 to help you plan your perfect journey.
              </p>
              <button className="w-full bg-gradient-to-r from-accent to-yellow-400 hover:from-yellow-400 hover:to-accent text-white font-bold py-4 px-8 rounded-xl text-lg uppercase tracking-wider shadow-xl transition-all duration-500 hover:scale-105">
                Contact Support
              </button>
            </motion.div>
          </Reveal>
        </div>

        {/* Right Column: FAQ Cards */}
        <div className="space-y-6 lg:mt-10">
          <Reveal delay={0.2}>
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                {...faq}
                isOpen={openIndex === index}
                toggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </Reveal>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;