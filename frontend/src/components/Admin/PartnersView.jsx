import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Eye, CheckCircle2, XCircle, X, Building2, Mail, Phone, Globe, MapPin, Briefcase, FileText, Clock, AlertCircle } from 'lucide-react';
import api from '../../api/axios';

const statusConfig = {
  PENDING:  { label: 'Pending Review',  bg: 'bg-amber-500/15',   text: 'text-amber-400',   border: 'border-amber-500/25',  icon: Clock,     dot: 'bg-amber-400' },
  APPROVED: { label: 'Approved',        bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/25', icon: CheckCircle2, dot: 'bg-emerald-400' },
  REJECTED: { label: 'Rejected',        bg: 'bg-red-500/15',    text: 'text-red-400',    border: 'border-red-500/25',    icon: XCircle,    dot: 'bg-red-400' },
};

const PartnersView = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => { fetchApps(); }, []);

  const fetchApps = async () => {
    try {
      const res = await api.get('/partners/applications');
      setApplications(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      console.error('Error fetching partner applications:', e);
      setApplications([]);
    } finally { setLoading(false); }
  };

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await api.patch(`/partners/applications/${id}/status`, { status });
      await fetchApps();
      if (selectedApp && selectedApp._id === id) {
        setSelectedApp(prev => ({ ...prev, status }));
      }
    } catch (e) {
      console.error('Error updating status:', e);
      alert('Failed to update application status.');
    } finally { setUpdatingId(null); }
  };

  const filtered = (applications || []).filter(app => {
    const matchSearch =
      (app.companyName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.contactName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.email || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === 'ALL' || app.status === filterStatus;
    return matchSearch && matchStatus;
  });

  if (loading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-3xl border border-white/5 p-5" style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)' }}>
        <div>
          <h2 className="text-xl font-bold text-white">Partner Applications</h2>
          <p className="text-sm text-white/40 mt-1">Review and manage travel provider partnership requests</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
            <input
              type="text"
              placeholder="Search by company, name, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent/40 transition-all"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-medium text-white/70 focus:outline-none focus:border-accent/40 appearance-none cursor-pointer"
          >
            <option value="ALL" className="bg-slate-800">All Statuses</option>
            <option value="PENDING" className="bg-slate-800">Pending</option>
            <option value="APPROVED" className="bg-slate-800">Approved</option>
            <option value="REJECTED" className="bg-slate-800">Rejected</option>
          </select>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Pending Review', value: (applications || []).filter(a => a.status === 'PENDING').length, color: 'from-amber-500/20 to-amber-700/20', icon: Clock, accent: 'text-amber-400' },
          { label: 'Approved',       value: (applications || []).filter(a => a.status === 'APPROVED').length, color: 'from-emerald-500/20 to-teal-700/20', icon: CheckCircle2, accent: 'text-emerald-400' },
          { label: 'Rejected',       value: (applications || []).filter(a => a.status === 'REJECTED').length, color: 'from-red-500/20 to-rose-700/20',   icon: XCircle, accent: 'text-red-400' },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className={`p-5 rounded-3xl border border-white/5 bg-gradient-to-br ${s.color} backdrop-blur-md flex items-center gap-4`}>
            <div className={`w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center ${s.accent} shadow-lg`}>
              <s.icon size={18} />
            </div>
            <div>
              <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1">{s.label}</p>
              <h4 className="text-2xl font-bold text-white">{s.value}</h4>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Applications Table */}
      <div className="rounded-3xl border border-white/5 overflow-hidden" style={{ background: 'rgba(var(--color-primary), 0.85)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/40 font-semibold">Company</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/40 font-semibold">Business Type</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/40 font-semibold">Location</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/40 font-semibold">Contact</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/40 font-semibold">Status</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/40 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-sm text-white/40">
                    {searchQuery ? 'No applications match your search.' : 'No partner applications yet. They will appear here once someone applies.'}
                  </td>
                </tr>
              ) : filtered.map((app, idx) => {
                const sc = statusConfig[app.status] || statusConfig.PENDING;
                const StatusIcon = sc.icon;
                return (
                  <tr key={app._id || idx} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                          style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))' }}>
                          {(app.companyName || '?').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{app.companyName}</p>
                          <p className="text-xs text-white/40">{app.businessType}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/70">{app.businessType || '—'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-white/60">
                        <MapPin size={13} />
                        {app.city && app.country ? `${app.city}, ${app.country}` : app.country || app.city || '—'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-sm text-white/60">
                          <Mail size={12} /> {app.email}
                        </div>
                        {app.phone && (
                          <div className="flex items-center gap-1.5 text-sm text-white/40">
                            <Phone size={12} /> {app.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${sc.bg} ${sc.text} border ${sc.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => { setSelectedApp(app); setShowDetail(true); }}
                          className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                          title="View Details"
                        >
                          <Eye size={15} />
                        </button>
                        {app.status !== 'APPROVED' && (
                          <button
                            onClick={() => updateStatus(app._id, 'APPROVED')}
                            disabled={updatingId === app._id}
                            className="p-2 text-white/40 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all"
                            title="Approve"
                          >
                            <CheckCircle2 size={15} />
                          </button>
                        )}
                        {app.status !== 'REJECTED' && (
                          <button
                            onClick={() => updateStatus(app._id, 'REJECTED')}
                            disabled={updatingId === app._id}
                            className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                            title="Reject"
                          >
                            <XCircle size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetail && selectedApp && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowDetail(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-luxury overflow-hidden max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="p-8 border-b border-slate-50 flex justify-between items-start"
                style={{ background: 'linear-gradient(135deg, var(--color-primary), #0d4f3c)' }}>
                <div>
                  <h3 className="text-2xl font-serif text-white">{selectedApp.companyName}</h3>
                  <p className="text-white/60 text-sm mt-1">{selectedApp.businessType} &bull; {selectedApp.country}</p>
                </div>
                <button onClick={() => setShowDetail(false)} className="text-white/40 hover:text-white">
                  <X size={22} />
                </button>
              </div>

              {/* Body */}
              <div className="p-8 space-y-8 overflow-y-auto flex-1">
                {/* Status Bar */}
                {(() => {
                  const sc = statusConfig[selectedApp.status] || statusConfig.PENDING;
                  const StatusIcon = sc.icon;
                  return (
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${sc.bg} ${sc.text} ${sc.border}`}>
                      <StatusIcon size={14} /> {sc.label}
                    </div>
                  );
                })()}

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-accent" style={{ background: 'rgba(var(--color-accent), 0.12)' }}>
                      <Building2 size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Company</p>
                      <p className="text-sm font-semibold text-slate-800">{selectedApp.companyName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-accent" style={{ background: 'rgba(var(--color-accent), 0.12)' }}>
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Email</p>
                      <p className="text-sm font-semibold text-slate-800">{selectedApp.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-accent" style={{ background: 'rgba(var(--color-accent), 0.12)' }}>
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Phone</p>
                      <p className="text-sm font-semibold text-slate-800">{selectedApp.phone || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-accent" style={{ background: 'rgba(var(--color-accent), 0.12)' }}>
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Location</p>
                      <p className="text-sm font-semibold text-slate-800">{selectedApp.city && selectedApp.country ? `${selectedApp.city}, ${selectedApp.country}` : 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-accent" style={{ background: 'rgba(var(--color-accent), 0.12)' }}>
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Years in Operation</p>
                      <p className="text-sm font-semibold text-slate-800">{selectedApp.yearsInOperation || 'N/A'} years</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-accent" style={{ background: 'rgba(var(--color-accent), 0.12)' }}>
                      <FileText size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">License Number</p>
                      <p className="text-sm font-semibold text-slate-800">{selectedApp.licenseNumber || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Extended Details */}
                <div className="space-y-4">
                  {selectedApp.website && (
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-accent" style={{ background: 'rgba(var(--color-accent), 0.12)' }}>
                        <Globe size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Website</p>
                        <p className="text-sm font-semibold text-accent">{selectedApp.website}</p>
                      </div>
                    </div>
                  )}

                  {selectedApp.servicesOffered && selectedApp.servicesOffered.length > 0 && (
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-3">Services Offered</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedApp.servicesOffered.map((s, i) => (
                          <span key={i} className="px-3 py-1.5 bg-white border border-slate-100 rounded-full text-xs font-medium text-slate-600">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedApp.targetMarkets && selectedApp.targetMarkets.length > 0 && (
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-3">Target Markets</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedApp.targetMarkets.map((m, i) => (
                          <span key={i} className="px-3 py-1.5 bg-white border border-slate-100 rounded-full text-xs font-medium text-slate-600">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedApp.documents && (
                    <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Submitted Documents</p>
                        <p className="text-sm text-accent font-medium break-all">{selectedApp.documents}</p>
                      </div>
                      <FileText size={18} className="text-slate-300 shrink-0" />
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-[10px] text-white/30 uppercase tracking-widest font-bold">
                    <Clock size={12} /> Submitted {selectedApp.createdAt ? new Date(selectedApp.createdAt).toLocaleString() : 'Unknown'}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-slate-50 flex items-center justify-between gap-4 bg-slate-50/50">
                {selectedApp.status === 'APPROVED' ? (
                  <button
                    onClick={() => { updateStatus(selectedApp._id, 'REJECTED'); }}
                    disabled={updatingId === selectedApp._id}
                    className="flex items-center gap-2 text-red-500 hover:bg-red-500/10 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border border-red-500/20"
                  >
                    <XCircle size={14} /> Revoke Approval
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => { updateStatus(selectedApp._id, 'APPROVED'); setShowDetail(false); }}
                      disabled={updatingId === selectedApp._id || selectedApp.status === 'APPROVED'}
                      className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                    >
                      <CheckCircle2 size={14} /> Approve Application
                    </button>
                    <button
                      onClick={() => { updateStatus(selectedApp._id, 'REJECTED'); setShowDetail(false); }}
                      disabled={updatingId === selectedApp._id || selectedApp.status === 'REJECTED'}
                      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-red-500/20 disabled:opacity-50"
                    >
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PartnersView;
