import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import { motion } from 'framer-motion';
import { Check, Target, Eye, Shield, Compass, Heart, Users, ArrowRight } from 'lucide-react';

const AboutPage = () => {
  const coreValues = [
    { 
      title: "Connoisseurship", 
      desc: "We don't just offer destinations; we offer deep, expert-vetted knowledge.",
      icon: <Compass className="text-accent" size={24} />
    },
    { 
      title: "Stewardship", 
      desc: "We are guardians of the environments and communities we visit.",
      icon: <Shield className="text-accent" size={24} />
    },
    { 
      title: "Integrity", 
      desc: "We operate with total transparency, backed by global accreditations.",
      icon: <Target className="text-accent" size={24} />
    },
    { 
      title: "Hyper-Personalization", 
      desc: "We believe true luxury is the absence of worry and the presence of perfect timing.",
      icon: <Users className="text-accent" size={24} />
    }
  ];

  const whyChooseUs = [
    "The Connoisseur’s Edge: Specialists, not generalists. Every itinerary and corporate policy is uniquely vetted for luxury, ethics, and efficiency.",
    "Global Credibility: Backed by an extensive network of top-tier global insurance, aviation, and technological partners.",
    "Unwavering Support: 'Dreams don't sleep.' True 24/7 assistance, utilizing advanced data analytics and continuous research.",
    "Impact-Driven Travel: Every journey directly funds sanitary pad banks, reforestation efforts, and youth mentorship."
  ];

  return (
    <div className="bg-[#FCFAF7] min-h-screen font-sans">
      <Navbar />
      
      {/* 1. HERO SECTION: Full-width Safari Background with Gradient Overlay */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop" 
            alt="About VistaVoyage Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>
        </motion.div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Reveal>
            <span className="text-accent text-xs md:text-sm uppercase tracking-[0.6em] font-bold mb-6 block drop-shadow-lg">
              Our Legacy
            </span>
            <h1 className="text-5xl md:text-9xl font-serif text-white mb-8 leading-tight drop-shadow-2xl">
              Navigating <br />
              <span className="italic text-accent-light font-light">Dreams</span>
            </h1>
            <div className="w-24 h-[1px] bg-accent/60 mx-auto"></div>
          </Reveal>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
          <span className="text-[10px] text-white uppercase tracking-widest">Scroll to explore</span>
          <div className="w-[1px] h-8 bg-white/40"></div>
        </div>
      </section>

      {/* 2. COMPANY OVERVIEW: Alternating Layout with White Space */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <Reveal>
                <div className="inline-block px-4 py-1 border border-accent/20 rounded-full mb-8">
                  <span className="text-accent text-[10px] uppercase tracking-widest font-bold">The Vista Experience</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-serif text-gray-900 mb-10 leading-tight">
                  About <span className="italic text-accent">Us</span>
                </h2>
                <div className="space-y-8">
                  <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed italic border-l-4 border-accent pl-6 py-2">
                    VistaVoyage Travel Group is a premier, Kenya-based Global Travel Management Company (TMC) and a distinguished Safari Connoisseur. Since 2020, we have specialized in the architecture of bespoke African luxury journeys and comprehensive corporate travel solutions.
                  </p>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    As an IATA-accredited agency, we merge the logistical precision of global travel management with the soul of experiential exploration. We don't just book travel; we curate Intentional Journeys that harmonize luxury, efficiency, and deep environmental purpose.
                  </p>
                </div>
              </Reveal>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <Reveal delay={0.2}>
                <div className="relative">
                  <div className="absolute -inset-4 border border-accent/20 rounded-[3rem] -z-10 translate-x-4 translate-y-4"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2071&auto=format&fit=crop" 
                    alt="VistaVoyage Excellence" 
                    className="w-full aspect-[4/5] object-cover rounded-[3rem] shadow-2xl"
                  />
                  <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-luxury hidden md:block">
                    <p className="text-accent font-serif text-4xl mb-1 italic">IATA</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Accredited Excellence</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION: Elegant Card Blocks */}
      <section className="py-32 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <Reveal>
              <div className="group h-full p-12 md:p-16 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-sm hover:bg-white/10 transition-all duration-700">
                <div className="w-20 h-20 bg-accent/20 rounded-2xl flex items-center justify-center text-accent mb-12 group-hover:scale-110 transition-transform duration-500">
                  <Target size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl font-serif text-white mb-8 group-hover:text-accent transition-colors">Our Mission</h3>
                <p className="text-white/60 text-lg leading-relaxed font-light">
                  To curate bespoke, eco-conscious journeys and robust corporate solutions that inspire, connect, and optimize. We are dedicated to transforming travel into a force for good—preserving our planet's vistas while delivering the highest standard of personalized connoisseurship to every client.
                </p>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="group h-full p-12 md:p-16 bg-accent border border-accent-dark rounded-[3rem] shadow-glow hover:shadow-accent transition-all duration-700">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-12 group-hover:scale-110 transition-transform duration-500">
                  <Eye size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl font-serif text-white mb-8">Our Vision</h3>
                <p className="text-white/80 text-lg leading-relaxed font-medium">
                  To be the world’s most trusted bridge to Africa, redefining travel by seamlessly blending global logistical excellence with regenerative, soul-stirring exploration.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. CORE VALUES: Clean Grid Cards with Hover Effects */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="text-center mb-24">
              <span className="text-accent text-xs uppercase tracking-[0.4em] font-bold mb-6 block">
                The DNA of Our Service
              </span>
              <h2 className="text-4xl md:text-7xl font-serif text-gray-900 leading-tight">Core Values</h2>
              <div className="w-20 h-1 bg-accent mx-auto mt-8"></div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <motion.div 
                  whileHover={{ y: -15 }}
                  className="bg-surface p-10 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:shadow-luxury transition-all duration-500 group h-full"
                >
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-accent/10 transition-colors">
                    {value.icon}
                  </div>
                  <h4 className="text-xl font-serif text-gray-900 mb-6 group-hover:text-accent transition-colors">
                    {value.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">
                    {value.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US: Timeline Style Checklist */}
      <section className="py-32 bg-[#0A0A0A] text-white relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <div className="lg:w-1/2">
              <Reveal>
                <span className="text-accent text-xs uppercase tracking-[0.5em] font-bold mb-6 block">
                  Why VistaVoyage?
                </span>
                <h2 className="text-4xl md:text-7xl font-serif mb-16 leading-tight">
                  The Vista <br /><span className="italic text-accent">Advantage</span>
                </h2>
                
                <div className="space-y-12">
                  {whyChooseUs.map((reason, i) => (
                    <div key={i} className="flex gap-8 relative group">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full border border-accent/40 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                        <Check size={20} />
                      </div>
                      <div>
                        <p className="text-gray-300 text-lg md:text-xl font-medium leading-relaxed group-hover:text-white transition-colors">
                          {reason}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <div className="grid grid-cols-2 gap-6 relative">
                <div className="absolute inset-0 bg-accent/10 blur-[100px] -z-10 rounded-full"></div>
                <Reveal delay={0.2}>
                  <img 
                    src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=2030&auto=format&fit=crop" 
                    className="rounded-[2.5rem] h-[500px] w-full object-cover shadow-2xl brightness-90" 
                    alt="Safari Experience" 
                  />
                </Reveal>
                <Reveal delay={0.4}>
                  <div className="mt-16 space-y-6">
                    <img 
                      src="https://images.unsplash.com/photo-1549144464-90408226488d?q=80&w=2070&auto=format&fit=crop" 
                      className="rounded-[2.5rem] h-64 w-full object-cover shadow-2xl brightness-75 hover:brightness-100 transition duration-700" 
                      alt="Wildlife" 
                    />
                    <div className="bg-accent p-10 rounded-[2.5rem] text-center">
                      <p className="text-5xl font-serif mb-2 italic">100%</p>
                      <p className="text-[10px] uppercase tracking-widest font-bold">Bespoke Design</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CSR SECTION: Premium Impact Overlay */}
      <section className="py-40 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-surface/50 -skew-x-12 translate-x-1/2"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-8 bg-gray-50 px-6 py-2 rounded-full border border-gray-100">
              <Heart className="text-[#FFD700]" size={14} fill="currentColor" />
              <span className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-bold">Our CSR Foundation</span>
            </div>
            <h2 className="text-5xl md:text-9xl font-serif mb-12 tracking-tight text-gray-900">
              Kovu <span className="italic text-[#FFD700]">Afrika</span>
            </h2>
            <p className="text-gray-500 text-lg md:text-2xl max-w-4xl mx-auto mb-16 leading-relaxed font-light italic">
              "Healing Landscapes, Empowering Lives". Kovu Afrika represents our commitment to leaving a positive, healing mark on the African continent. It is the bedrock of our Eco-Luxury philosophy.
            </p>
            
            <Link to="/csr" className="group inline-flex items-center gap-4 bg-gray-900 text-white px-12 py-6 rounded-xl hover:bg-accent transition-all duration-500 shadow-xl">
              <span className="uppercase tracking-[0.2em] font-bold text-sm">Our Impact Story</span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
