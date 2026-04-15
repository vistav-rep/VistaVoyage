import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, ArrowUpRight, Send, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success
  const [hoveredLink, setHoveredLink] = useState(null);
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Partner with Us', path: '/partners' },
        { name: 'Appointments', path: '/appointments' },
      ],
    },
    {
      title: 'Experiences',
      links: [
        { name: 'Luxury Safaris', path: '/tours' },
        { name: 'Corporate Travel', path: '/corporate' },
        { name: 'Cultural Tours', path: '/tours' },
        { name: 'WRC Safari Rally', path: '/tours' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Youtube, href: '#', name: 'Youtube' },
  ];

  return (
    <footer className="bg-black text-white pt-32 pb-12 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-white/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-10">
            <Link to="/" className="inline-block group">
              <motion.h2 
                whileHover={{ scale: 1.02 }}
                className="text-4xl font-serif font-bold tracking-tighter uppercase text-white"
              >
                VISTA<span className="italic font-normal text-accent">VOYAGE</span>
              </motion.h2>
            </Link>
            
            <p className="text-white/100 text-lg font-light leading-relaxed max-w-sm">
              Navigating Dreams, Endless Vistas. Specialized in bespoke luxury journeys and global travel management.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <motion.a 
                href="tel:+254 790 644 745/ +254 703 644 745"
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 text-white hover:text-accent transition-colors duration-300"
              >
                <Phone size={16} />
                <span className="text-sm font-medium">+254 790 644 745 <br/> +254 703 644 745 </span>
              </motion.a>
              <motion.a 
                href="mailto:hello@vistavoyage.com"
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 text-white hover:text-accent transition-colors duration-300"
              >
                <Mail size={16} />
                <span className="text-sm font-medium">hello@vistavoyage.com</span>
              </motion.a>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 text-white cursor-pointer"
              >
                <MapPin size={16} />
                <span className="text-sm font-medium">Nairobi, Kenya</span>
                <p className ="text-sm font-medium">Applewood Adams 904B</p>
              </motion.div>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  whileHover={{ y: -5, color: '#FFFFFF', borderColor: '#FFFFFF' }}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white transition-all duration-500"
                  title={social.name}
                >
                  <social.icon size={18} strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-12">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h4 className="text-white text-[10px] uppercase tracking-[0.4em] font-bold mb-10">
                  {section.title}
                </h4>
                <ul className="space-y-5">
                  {section.links.map((link, idx) => (
                    <li 
                      key={link.name}
                      onMouseEnter={() => setHoveredLink(link.name)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <Link 
                        to={link.path}
                        className="text-white hover:text-white transition-all duration-500 text-sm font-medium flex items-center group"
                      >
                        <span className={`transition-all duration-500 ${
                          hoveredLink === link.name ? 'text-accent' : ''
                        }`}>
                          {link.name}
                        </span>
                        <ArrowUpRight 
                          size={12} 
                          className={`ml-2 transition-all duration-500 ${
                            hoveredLink === link.name 
                              ? 'opacity-100 translate-y-0 text-accent' 
                              : 'opacity-0 -translate-y-1'
                          }`} 
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-3">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] relative overflow-hidden group"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/20 transition-colors duration-700"></div>
              
              <h4 className="text-white text-[10px] uppercase tracking-[0.3em] font-bold mb-6 relative z-10">
                Stay Informed
              </h4>
              <p className="text-white text-sm mb-8 font-light leading-relaxed relative z-10">
                Exclusive insights and curated travel collections delivered to your inbox.
              </p>
              
              <form onSubmit={handleSubscribe} className="space-y-4 relative z-10">
                <div className="relative">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address" 
                    className="w-full bg-white/5 border-b border-white/20 py-4 pr-12 outline-none focus:border-accent transition-colors text-sm font-light placeholder:text-white text-white"
                  />
                  <button 
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="absolute right-0 bottom-4 text-white/40 hover:text-accent transition-colors disabled:text-accent"
                  >
                    {status === 'loading' ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Send size={18} />
                      </motion.div>
                    ) : status === 'success' ? (
                      <Check size={18} />
                    ) : (
                      <Send size={18} />
                    )}
                  </button>
                </div>
                
                {status === 'success' && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-accent text-[10px] font-bold uppercase tracking-widest mt-4"
                  >
                    ✓ Welcome aboard!
                  </motion.p>
                )}
              </form>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
            {/* Copyright */}
            <p className="text-white text-[10px] tracking-[0.3em] uppercase font-bold text-center md:text-left">
              © {currentYear} VistaVoyage Travel Group
            </p>
            
            {/* Legal Links */}
            <div className="flex justify-center gap-10 text-white text-[10px] uppercase tracking-[0.3em] font-bold">
              <motion.a 
                href="#" 
                whileHover={{ color: '#FFFFFF' }}
                className="transition-colors"
              >
                Privacy
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ color: '#FFFFFF' }}
                className="transition-colors"
              >
                Terms
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ color: '#FFFFFF' }}
                className="transition-colors"
              >
                Cookies
              </motion.a>
            </div>
            
            {/* Tagline */}
            <div className="flex justify-center lg:justify-end gap-6 items-center">
              <span className="text-white text-[9px] uppercase tracking-[0.4em] font-bold">
                Refining Luxury
              </span>
              <div className="flex gap-2">
                <motion.div 
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-1 rounded-full bg-accent"
                ></motion.div>
                <div className="w-1 h-1 rounded-full bg-white/10"></div>
                <div className="w-1 h-1 rounded-full bg-white/10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Massive Background Text */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden opacity-[0.02] translate-y-1/3">
        <h2 className="text-[25vw] font-serif font-bold whitespace-nowrap leading-none text-white text-center">
          VISTA VOYAGE
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
