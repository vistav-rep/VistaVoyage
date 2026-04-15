import React, { useState, useEffect } from 'react';
import {
  DollarSign, Users, ShoppingBag, Plane,
  ArrowUpRight, Bell, Activity, CreditCard,
  CheckCircle2, Clock, MapPin, TrendingUp, Package
} from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../api/axios';

const StatCard = ({ title, value, change, icon: Icon, gradient, delay }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
    transition={{ delay }} className="relative overflow-hidden rounded-3xl border border-white/5 p-6"
    style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)' }}>
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
    <div className="relative z-10 flex justify-between items-start">
      <div>
        <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-2">{title}</p>
        <h4 className="text-3xl font-bold text-white">{value}</h4>
        <p className="text-sm text-emerald-400 font-medium mt-2 flex items-center gap-1">
          <ArrowUpRight size={14} /> {change}
        </p>
      </div>
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl"
        style={{ background: gradient }}>
        <Icon size={22} />
      </div>
    </div>
  </motion.div>
);

const DashboardHome = () => {
  const [stats, setStats] = useState({ totalRevenue: 0, totalBookings: 0, staffOnline: 0, activeTours: 0 });
  const [recentBookings, setRecentBookings] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/admin/stats'),
      api.get('/bookings'),
      api.get('/admin/activity'),
    ]).then(([s, b, a]) => {
      setStats(s.data || {});
      setRecentBookings(Array.isArray(b.data) ? b.data.slice(0, 5) : []);
      setActivities(Array.isArray(a.data) ? a.data.slice(0, 6) : []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const barData = [40, 60, 35, 80, 55, 90, 65, 75, 50, 85, 70, 95];
  const months = ['J','F','M','A','M','J','J','A','S','O','N','D'];

  return (
    <div className="space-y-6 pb-10">

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard title="Today's Revenue" value={`$${(stats.totalRevenue || 53000).toLocaleString()}`} change="+55%" icon={DollarSign} gradient="linear-gradient(135deg, #8b5cf6, #6366f1)" delay={0} />
        <StatCard title="Active Clients" value={stats.staffOnline || "2,300"} change="+3%" icon={Users} gradient="linear-gradient(135deg, #06b6d4, #0ea5e9)" delay={0.1} />
        <StatCard title="New Bookings" value={stats.totalBookings || 1462} change="+8%" icon={ShoppingBag} gradient="linear-gradient(135deg, #10b981, #059669)" delay={0.2} />
        <StatCard title="Total Revenue" value={`$${(stats.totalRevenue || 103430).toLocaleString()}`} change="+5%" icon={CreditCard} gradient="linear-gradient(135deg, #f59e0b, #d97706)" delay={0.3} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Sales Overview */}
        <div className="lg:col-span-8 rounded-3xl border border-white/5 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)' }}>
          <div className="h-56 relative" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #6366f1 100%)' }}>
            <div className="absolute inset-0 flex items-end px-6 pb-4 gap-1.5">
              {barData.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                    className="w-full rounded-t-md"
                    style={{ background: 'rgba(255,255,255,0.25)', maxHeight: '100%' }} />
                </div>
              ))}
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h6 className="text-lg font-bold text-white">Sales Overview</h6>
                <p className="text-sm text-emerald-400 font-medium mt-1 flex items-center gap-1">
                  <TrendingUp size={14} /> +4.6% more in 2025
                </p>
              </div>
              <div className="flex gap-5 text-xs font-medium text-white/50">
                {['Packages','Flights','Consults'].map((l, i) => (
                  <span key={i} className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${i===0?'bg-violet-400':i==='bg-cyan-400':'bg-white/30'}`} 
                      style={{ background: i === 0 ? '#a78bfa' : i === 1 ? '#22d3ee' : 'rgba(255,255,255,0.3)' }} />
                    {l}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-between px-1">
              {months.map((m, i) => (
                <span key={i} className="text-xs font-medium text-white/30">{m}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-4 rounded-3xl border border-white/5 p-6" style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)' }}>
          <h6 className="text-lg font-bold text-white mb-1">Recent Activity</h6>
          <p className="text-sm text-emerald-400 font-medium mb-6 flex items-center gap-1">
            <ArrowUpRight size={14} /> 24% this month
          </p>
          <div className="relative space-y-5">
            <div className="absolute left-[14px] top-1 bottom-4 w-px bg-white/10" />
            {[
              { label: 'New booking received', time: '2 min ago', color: 'bg-emerald-500', icon: ShoppingBag },
              { label: 'Flight confirmed', time: '1 hr ago', color: 'bg-cyan-500', icon: Plane },
              { label: 'Payment processed', time: '3 hr ago', color: 'bg-amber-500', icon: CreditCard },
              { label: 'Tour package updated', time: 'Yesterday', color: 'bg-violet-500', icon: MapPin },
              { label: 'Client check-in', time: '2 days ago', color: 'bg-pink-500', icon: Users },
              { label: 'Report generated', time: '3 days ago', color: 'bg-rose-500', icon: Activity },
            ].concat(activities.slice(0, 2).map(a => ({
              label: a?.action || 'Activity logged',
              time: a?.createdAt ? new Date(a.createdAt).toLocaleDateString() : 'Recent',
              color: 'bg-teal-500',
              icon: Bell
            }))).slice(0, 6).map((item, i) => (
              <div key={i} className="flex gap-4 relative z-10">
                <div className={`w-8 h-8 rounded-xl ${item.color} flex items-center justify-center text-white shadow-lg`}>
                  <item.icon size={14} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white leading-tight">{item.label}</p>
                  <p className="text-xs text-white/40 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Recent Bookings Table */}
        <div className="lg:col-span-8 rounded-3xl border border-white/5 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)' }}>
          <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center">
            <div>
              <h6 className="text-lg font-bold text-white">Recent Bookings</h6>
              <p className="text-sm text-white/40 mt-1 flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400" />
                {recentBookings.length} bookings this period
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  {['Client', 'Type', 'Date', 'Amount', 'Status'].map(h => (
                    <th key={h} className="px-6 py-4 text-xs uppercase font-semibold text-white/40 tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentBookings.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-12 text-center text-sm text-white/40">No bookings yet</td></tr>
                ) : recentBookings.map((b, i) => (
                  <tr key={b._id || i} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                          {(b.guestName || 'U').charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{b.guestName || 'Guest'}</p>
                          <p className="text-xs text-white/40">{b.guestEmail || ''}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider ${
                        b.type === 'FLIGHT' ? 'bg-cyan-500/20 text-cyan-400' :
                        b.type === 'APPOINTMENT' ? 'bg-pink-500/20 text-pink-400' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>
                        {b.type === 'FLIGHT' ? 'Flight' : b.type === 'APPOINTMENT' ? 'Consult' : 'Package'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-white/70">
                      {b.fromDate ? new Date(b.fromDate).toLocaleDateString('en-GB', { day:'2-digit', month:'short' }) : 'TBA'}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-white">
                      ${(b.totalPrice || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider ${
                        b.workflowStatus === 'CONFIRMED' ? 'bg-emerald-500/20 text-emerald-400' :
                        b.workflowStatus === 'COMPLETED' ? 'bg-cyan-500/20 text-cyan-400' :
                        b.workflowStatus === 'CANCELLED' ? 'bg-red-500/20 text-red-400' :
                        'bg-white/10 text-white/50'
                      }`}>
                        {b.workflowStatus || 'New'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="lg:col-span-4 space-y-5">
          {/* Progress Bars */}
          <div className="rounded-3xl border border-white/5 p-6" style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)' }}>
            <h6 className="text-lg font-bold text-white mb-6">Platform Overview</h6>
            <div className="space-y-5">
              {[
                { label: 'Active Tours', value: stats.activeTours || 12, color: 'from-violet-500 to-purple-600', pct: 75 },
                { label: 'Confirmed Bookings', value: stats.totalBookings || 48, color: 'from-emerald-500 to-teal-600', pct: 60 },
                { label: 'Pending Payments', value: stats.pendingPayments || 8, color: 'from-amber-500 to-orange-600', pct: 30 },
                { label: 'Staff Online', value: stats.staffOnline || 5, color: 'from-cyan-500 to-blue-600', pct: 50 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-white/70">{item.label}</span>
                    <span className="text-sm font-bold text-white">{item.value}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${item.pct}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full bg-gradient-to-r ${item.color} rounded-full`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Card */}
          <div className="rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #6366f1 100%)' }}>
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <p className="text-sm font-medium text-white/70 mb-1">Monthly Revenue</p>
              <h3 className="text-4xl font-bold mb-2">${(stats.totalRevenue || 53000).toLocaleString()}</h3>
              <p className="text-sm text-white/70 flex items-center gap-1">
                <TrendingUp size={14} /> +12% from last month
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
