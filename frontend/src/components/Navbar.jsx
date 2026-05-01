import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Globe, Phone } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const navLinks = [
    { 
      name: 'Home', 
      path: '/' 
    },
    { 
      name: 'About', 
      path: '/about' 
    },
    { 
      name: 'Tours', 
      path: '/tours',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Luxury Safaris', path: '/tours?category=safari' },
        { name: 'Cultural Tours', path: '/tours?category=cultural' },
        { name: 'Beach Holidays', path: '/tours?category=beach' },
        { name: 'WRC Safari Rally', path: '/tours?category=rally' },
      ]
    },
    { 
      name: 'Trends', 
      path: '/trends' 
    },
    { 
      name: 'Blog', 
      path: '/blogs' 
    },
    { 
      name: 'Partners', 
      path: '/partners',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Become a Partner', path: '/partners' },
        { name: 'Partner Dashboard', path: '/partner/dashboard' },
      ]
    },
    { 
      name: 'Gallery', 
      path: '/gallery' 
    },
    { 
      name: 'Contact', 
      path: '/contact' 
    },
  ];

  return (
    <nav className="fixed w-full z-[100] bg-white py-2 sm:py-3 md:py-4 shadow-[0_4px_30px_rgba(0,0,0,0.08)]">
      {/* Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent origin-left z-[101]"
        style={{ scaleX }}
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex justify-between items-center gap-2 sm:gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center group shrink-0">
          <div className="w-8 sm:w-10 md:w-12 h-px bg-accent scale-x-100 origin-left transition-all duration-700"></div>
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold tracking-tight text-dark hover:text-accent transition-all duration-700 ml-2 sm:ml-3 md:ml-4">
            VISTA<span className="italic font-normal text-stroke-accent group-hover:text-accent transition-colors duration-500">VOYAGE</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center space-x-0.5 xl:space-x-1">
          {navLinks.map((link) => (
            <div 
              key={link.name}
              className="relative"
              onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={link.path}
                className={`relative flex items-center gap-1 px-2 lg:px-3 py-1.5 lg:py-2 text-[9px] lg:text-[10px] uppercase tracking-[0.2em] lg:tracking-[0.25em] font-bold transition-all duration-500 group ${
                  location.pathname === link.path 
                    ? 'text-accent' 
                    : 'text-dark/50 hover:text-dark'
                }`}
              >
                {link.name}
                {link.hasDropdown && (
                  <ChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                )}
                <span className={`absolute bottom-1 left-4 right-4 h-[1.5px] transition-all duration-500 ${
                  location.pathname === link.path ? 'bg-accent' : 'bg-transparent group-hover:bg-accent/50'
                }`}></span>
              </Link>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {link.hasDropdown && activeDropdown === link.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 pt-4"
                  >
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-dark/5 overflow-hidden min-w-[180px] sm:min-w-[200px]">
                      {link.dropdownItems?.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.path}
                          className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-dark/60 hover:text-dark hover:bg-accent/5 transition-all duration-300 border-b border-dark/5 last:border-0"
                        >
                          <span className="font-medium tracking-wide">{item.name}</span>
                          <span className="opacity-0 group-hover:opacity-100 text-accent">→</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          
          {/* CTA Button (desktop) */}
          <div className="flex items-center gap-2 xl:gap-4 ml-2 xl:ml-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/appointments"
                className="hidden xl:inline-flex items-center px-4 xl:px-6 py-2 xl:py-2.5 text-[9px] xl:text-[10px] uppercase tracking-[0.18em] xl:tracking-[0.25em] font-bold transition-all duration-500 rounded-full bg-dark text-white hover:bg-accent hover:shadow-glow whitespace-nowrap"
              >
                Book Now
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="xl:hidden flex items-center gap-2 sm:gap-3">
          {/* Mobile CTA (full label, compact) */}
          <Link
            to="/appointments"
            className="inline-flex items-center px-2.5 sm:px-3 py-1.5 sm:py-2 text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.18em] font-bold rounded-full bg-accent text-white hover:bg-accent-light transition-all duration-300 whitespace-nowrap"
          >
            Book
          </Link>
          
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="focus:outline-none transition-all duration-500 p-1.5 sm:p-2 rounded-full text-dark hover:bg-dark/5"
          >
            <div className="w-5 sm:w-6 h-4 sm:h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 transition-all duration-500 ${isOpen ? 'rotate-45 translate-y-2' : ''} bg-dark`}></span>
              <span className={`w-full h-0.5 transition-all duration-500 ${isOpen ? 'opacity-0' : ''} bg-dark`}></span>
              <span className={`w-full h-0.5 transition-all duration-500 ${isOpen ? '-rotate-45 -translate-y-2' : ''} bg-dark`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden fixed inset-0 bg-dark z-[99]"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] animate-pulse-slow"></div>
              <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-jungle/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 text-white/60 hover:text-white transition-colors p-1.5 sm:p-2"
            >
              <X size={32} />
            </button>

            <div className="flex flex-col items-center justify-center h-full px-4 sm:px-6 text-center relative z-10">
              {/* Logo in Menu */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12 sm:mb-16"
              >
                <span className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight text-white">
                  VISTA<span className="italic font-normal text-accent">VOYAGE</span>
                </span>
              </motion.div>

              <div className="flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-8">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx + 0.3 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif tracking-tight transition-all duration-500 ${
                        location.pathname === link.path ? 'text-accent italic' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * navLinks.length + 0.3 }}
                className="mt-10 sm:mt-12 md:mt-16 flex flex-col gap-4 w-full px-4"
              >
                <Link
                  to="/appointments"
                  onClick={() => setIsOpen(false)}
                  className="bg-accent text-white px-8 sm:px-12 py-3 sm:py-5 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-bold shadow-glow hover:bg-accent-light transition-all duration-500"
                >
                  Book Appointment
                </Link>
                
                <div className="flex items-center justify-center gap-4 sm:gap-6 text-white/40">
                  <Globe size={16} sm:w-5 />
                  <span className="text-[10px] sm:text-xs tracking-widest">Kenya • UAE • Global</span>
                </div>
              </motion.div>
            </div>

            {/* Bottom Branding */}
            <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 opacity-10">
              <span className="text-sm sm:text-lg font-serif font-bold tracking-[1.2em] sm:tracking-[1.5em] text-white">VISTAVOYAGE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
