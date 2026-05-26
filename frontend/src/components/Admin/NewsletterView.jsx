import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Mail, MapPin, Calendar, Check, Download, Users } from 'lucide-react';
import api from '../../api/axios';

const NewsletterView = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await api.get('/newsletter/subscribers');
      setSubscribers(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      console.error('Error fetching subscribers:', e);
    } finally {
      setLoading(false);
    }
  };

  const filtered = subscribers.filter(s => 
    (s.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.firstName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.lastName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.location || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const downloadCSV = () => {
    const headers = ['First Name', 'Last Name', 'Email', 'Location', 'Updates', 'Subscribed At'];
    const rows = filtered.map(s => [
      s.firstName,
      s.lastName,
      s.email,
      s.location,
      s.updates ? 'Yes' : 'No',
      new Date(s.createdAt).toLocaleDateString()
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `vistavoyage_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-3xl border border-white/5 p-5" style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)' }}>
        <div>
          <h2 className="text-xl font-bold text-white">Newsletter Subscribers</h2>
          <p className="text-sm text-white/40 mt-1">Manage your mailing list and audience</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
            <input
              type="text"
              placeholder="Search subscribers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent/40 transition-all"
            />
          </div>
          <button 
            onClick={downloadCSV}
            className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-black px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
          >
            <Download size={16} />
            EXPORT CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-3xl border border-white/5 bg-slate-800/40 backdrop-blur-md flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 shadow-lg">
            <Users size={18} />
          </div>
          <div>
            <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1">Total Subscribers</p>
            <h4 className="text-2xl font-bold text-white">{subscribers.length}</h4>
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="p-5 rounded-3xl border border-white/5 bg-slate-800/40 backdrop-blur-md flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-lg">
            <Check size={18} />
          </div>
          <div>
            <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1">Active Opt-ins</p>
            <h4 className="text-2xl font-bold text-white">{subscribers.filter(s => s.updates).length}</h4>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="p-5 rounded-3xl border border-white/5 bg-slate-800/40 backdrop-blur-md flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 shadow-lg">
            <MapPin size={18} />
          </div>
          <div>
            <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1">Global Reach</p>
            <h4 className="text-2xl font-bold text-white">{new Set(subscribers.map(s => s.location)).size} Locs</h4>
          </div>
        </motion.div>
      </div>

      <div className="rounded-3xl border border-white/5 overflow-hidden bg-slate-900/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/40 font-semibold">Subscriber</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/40 font-semibold">Location</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/40 font-semibold">Opt-in</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/40 font-semibold">Date Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-sm text-white/40">
                    No subscribers found.
                  </td>
                </tr>
              ) : filtered.map((s, idx) => (
                <tr key={s._id || idx} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent text-sm font-bold">
                        {s.firstName.charAt(0)}{s.lastName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{s.firstName} {s.lastName}</p>
                        <p className="text-xs text-white/40">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-white/70">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-white/30" />
                      {s.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {s.updates ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        ACTIVE
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/5 text-white/30 border border-white/10">
                        OFF
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-white/40 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} />
                      {new Date(s.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewsletterView;
