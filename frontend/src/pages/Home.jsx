import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SafariRallySection from '../components/SafariRallySection';
import FeaturedTours from '../components/FeaturedTours';
import AboutSection from '../components/AboutSection';
import CSRSection from '../components/CSRSection';
import PartnersSection from '../components/PartnersSection';
import Footer from '../components/Footer';
import DestinationsGrid from '../components/DestinationsGrid';
import FAQSection from '../components/FAQSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Reveal from '../components/Reveal';
import ScrollToTop from '../components/ScrollToTop';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <Navbar />
      <Hero />
      
      <main className="relative z-10">
        <Reveal>
          <AboutSection />
        </Reveal>
        
       
        <DestinationsGrid />

         <Reveal>
          <SafariRallySection />
        </Reveal>
        
        <Reveal>
          <FeaturedTours />
        </Reveal>
        
        <Reveal>
          <TestimonialsSection />
        </Reveal>
        
        <Reveal>
          <CSRSection />
        </Reveal>
        
        <Reveal>
          <FAQSection />
        </Reveal>
        
        <Reveal>
          <PartnersSection />
        </Reveal>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
