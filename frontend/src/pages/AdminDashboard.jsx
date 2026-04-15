import React, { useState, useEffect } from 'react';
import AdminLayout        from '../components/Admin/AdminLayout';
import DashboardHome      from '../components/Admin/DashboardHome';
import TablesView         from '../components/Admin/TablesView';
import BillingView        from '../components/Admin/BillingView';
import ToursManagement    from '../components/Admin/ToursManagement';
import BookingsManagement from '../components/Admin/BookingsManagement';
import CustomerManagement from '../components/Admin/CustomerManagement';
import StaffActivity      from '../components/Admin/StaffActivity';
import MessagesView       from '../components/Admin/MessagesView';
import ReviewsView        from '../components/Admin/ReviewsView';
import ReportsView        from '../components/Admin/ReportsView';
import SettingsView       from '../components/Admin/SettingsView';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) setActiveTab(hash);
  }, []);

  const render = () => {
    switch (activeTab) {
      case 'dashboard':    return <DashboardHome />;
      case 'tables':       return <TablesView />;
      case 'billing':      return <BillingView />;
      case 'tours':        return <ToursManagement />;
      case 'flights':      return <BookingsManagement initialType="FLIGHT" />;
      case 'packages':     return <BookingsManagement initialType="PACKAGE" />;
      case 'appointments': return <BookingsManagement initialType="APPOINTMENT" />;
      case 'bookings':     return <BookingsManagement initialType="ALL" />;
      case 'itinerary':    return <BookingsManagement initialType="ALL" />;
      case 'customers':    return <CustomerManagement />;
      case 'staff':        return <StaffActivity />;
      case 'messages':     return <MessagesView />;
      case 'reviews':      return <ReviewsView />;
      case 'reports':      return <ReportsView />;
      case 'trend':        return <ReportsView />;
      case 'settings':     return <SettingsView />;
      default:             return <DashboardHome />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {render()}
    </AdminLayout>
  );
};

export default AdminDashboard;
