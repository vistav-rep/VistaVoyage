import React from 'react';
import {
  LayoutDashboard, Table2, CreditCard, Plane, MessageSquare,
  ShoppingBag, Users, MapPin, Star, BarChart3, Settings,
  LogOut, Package, Clock, Compass, Activity, Route, TrendingUp
} from 'lucide-react';

const groups = [
  {
    label: 'Main',
    items: [
      { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { id: 'tables',    icon: Table2,          label: 'Tables'    },
      { id: 'billing',   icon: CreditCard,      label: 'Billing'   },
    ],
  },
  {
    label: 'Travel',
    items: [
      { id: 'tours',        icon: Compass,   label: 'Tours'        },
      { id: 'flights',      icon: Plane,     label: 'Flights'      },
      { id: 'packages',     icon: Package,   label: 'Packages'     },
      { id: 'appointments', icon: Clock,     label: 'Appointments' },
      { id: 'bookings',     icon: ShoppingBag, label: 'Bookings'   },
      { id: 'itinerary',    icon: Route,     label: 'Itinerary'    },
    ],
  },
  {
    label: 'People',
    items: [
      { id: 'customers', icon: Users,        label: 'Customers' },
      { id: 'staff',     icon: Activity,     label: 'Staff'     },
      { id: 'messages',  icon: MessageSquare,label: 'Messages'  },
      { id: 'reviews',   icon: Star,         label: 'Reviews'   },
    ],
  },
  {
    label: 'Analytics',
    items: [
      { id: 'reports',  icon: BarChart3, label: 'Reports'  },
      { id: 'trend',   icon: TrendingUp, label: 'Trend'   },
      { id: 'settings', icon: Settings,  label: 'Settings' },
    ],
  },
];

const Sidebar = ({ activeTab, setActiveTab }) => {
  const go = (id) => { setActiveTab(id); window.location.hash = id; };

  return (
    <aside className="fixed inset-y-0 left-0 w-72 z-50 hidden lg:flex flex-col p-3">
      <div className="flex-1 flex flex-col rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl"
        style={{ background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)' }}>
        
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/5 flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
            <MapPin size={20} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-lg leading-tight">VistaVoyage</p>
            <p className="text-white/40 text-[10px] uppercase tracking-widest">Admin Panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-4 overflow-y-auto space-y-6">
          {groups.map(group => (
            <div key={group.label}>
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map(item => {
                  const active = activeTab === item.id;
                  return (
                    <button key={item.id} onClick={() => go(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                        active ? 'bg-gradient-to-r from-violet-500/20 to-indigo-500/20' : 'hover:bg-white/5'
                      }`}>
                      {active && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-r-full" />
                      )}
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        active
                          ? 'bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/30'
                          : 'bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white/70'
                      }`}>
                        <item.icon size={16} />
                      </div>
                      <span className={`text-[13px] font-medium ${active ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-4 pb-4">
          <button onClick={() => { window.location.href = '/'; }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-red-500/10 transition-all group">
            <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-red-500/20 group-hover:text-red-400 transition-all">
              <LogOut size={16} />
            </div>
            <span className="text-[13px] font-medium text-white/50 group-hover:text-red-400">Logout</span>
          </button>

          {/* User card */}
          <div className="mt-4 rounded-2xl p-4 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate">Admin User</p>
                <p className="text-white/40 text-[11px]">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
