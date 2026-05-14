import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import CorporateServices from './pages/CorporateServices';
import BecomePartner from './pages/BecomePartner';
import PartnerApplyPage from './pages/PartnerApplyPage';
import PartnerDashboard from './pages/PartnerDashboard';
import BlogPage from './pages/BlogPage';
import AddBlogPage from './pages/AddBlogPage';
import ToursPage from './pages/ToursPage';
import TrendsPage from './pages/TrendsPage';
import TourDetails from './pages/TourDetails';
import AppointmentsPage from './pages/AppointmentsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminCRM from './pages/AdminCRM';
import LoginPage from './pages/LoginPage';
import CheckoutPage from './pages/CheckoutPage';
import StaffLogin from './pages/StaffLogin';
import Loader from './components/Loader';
import ChatDrawer from './components/ChatDrawer';
import ScrollToTop from './components/ScrollToTop';
import { ArrowUp, MessageSquare } from 'lucide-react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    // Scroll to top on refresh
    window.scrollTo(0, 0);
    
    // Disable scrolling while loading
    document.body.style.overflow = "hidden";

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "auto";
    }, 2500); // Duration matches loader animation + extra buffer

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Router>
      {loading && <Loader />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/corporate" element={<CorporateServices />} />
        <Route path="/partners" element={<BecomePartner />} />
        <Route path="/partners/apply" element={<PartnerApplyPage />} />
        <Route path="/partner/dashboard" element={<PartnerDashboard />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blogs/add" element={<AddBlogPage />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/trends" element={<TrendsPage />} />
        <Route path="/travel/:id" element={<TourDetails />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/crm" element={<AdminCRM />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/staff/login" element={<StaffLogin />} />
      </Routes>

      <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Chat With Us Button */}
      {!loading && (
        <button 
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-10 left-10 z-[90] flex items-center gap-3 bg-primary text-white px-6 py-4 rounded-full shadow-2xl hover:bg-secondary transition-all duration-500 group animate-fade-in border border-white/10"
        >
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform">
            <MessageSquare size={16} className="text-black" />
          </div>
          <span className="text-sm font-bold uppercase tracking-widest">Chat With Us</span>
        </button>
      )}

      {/* Back to Top Arrow */}
      {showBackToTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 z-[90] w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-secondary transition-all duration-500 group animate-fade-in-up"
        >
          <ArrowUp className="group-hover:-translate-y-1 transition-transform" size={24} />
        </button>
      )}
    </Router>
  );
}

export default App;
