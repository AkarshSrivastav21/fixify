import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from '../components/admin/AdminHeader';
import AdminTabs from '../components/admin/AdminTabs';
import DashboardStats from '../components/admin/DashboardStats';
import UsersTab from '../components/admin/UsersTab';
import ProvidersTab from '../components/admin/ProvidersTab';
import ServicesTab from '../components/admin/ServicesTab';
import BookingsTab from '../components/admin/BookingsTab';
import FeedbackTab from '../components/admin/FeedbackTab';
import AnalyticsTab from '../components/admin/AnalyticsTab';
import AdminModals from '../components/admin/AdminModals';
import '../styles/admin-animations.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [providers, setProviders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddProvider, setShowAddProvider] = useState(false);
  const [showAddService, setShowAddService] = useState(false);
  const [showEditService, setShowEditService] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const [statsRes, usersRes, providersRes, bookingsRes, servicesRes] = await Promise.all([
        axios.get('http://localhost:4000/admin/dashboard', config),
        axios.get('http://localhost:4000/admin/users', config),
        axios.get('http://localhost:4000/admin/providers', config),
        axios.get('http://localhost:4000/admin/bookings', config),
        axios.get('http://localhost:4000/admin/services', config)
      ]);

      setStats(statsRes.data);
      setUsers(usersRes.data.users);
      setProviders(providersRes.data.providers);
      setBookings(bookingsRes.data.bookings);
      setServices(servicesRes.data.services);

      // Fetch feedback separately to avoid breaking main dashboard
      try {
        const feedbackRes = await axios.get('http://localhost:4000/feedback/all');
        setFeedback(feedbackRes.data.feedbacks || []);
      } catch (feedbackError) {
        console.error('Error fetching feedback:', feedbackError);
        setFeedback([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (!confirm('Are you sure?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:4000/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const deleteProvider = async (providerId) => {
    if (!confirm('Are you sure?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:4000/admin/providers/${providerId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProviders(providers.filter(provider => provider._id !== providerId));
    } catch (error) {
      console.error('Error deleting provider:', error);
    }
  };

  const addUser = async (userData) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post('http://localhost:4000/admin/users', userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers([...users, response.data.user]);
      setShowAddUser(false);
      alert('User added successfully!');
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Error adding user');
    }
  };

  const addProvider = async (providerData) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post('http://localhost:4000/admin/providers', providerData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProviders([...providers, response.data.provider]);
      setShowAddProvider(false);
      alert('Provider added successfully!');
    } catch (error) {
      console.error('Error adding provider:', error);
      alert('Error adding provider');
    }
  };

  const addService = async (serviceData) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post('http://localhost:4000/admin/services', serviceData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices([...services, response.data.service]);
      setShowAddService(false);
      alert('Service added successfully!');
    } catch (error) {
      console.error('Error adding service:', error);
      alert('Error adding service');
    }
  };

  const deleteService = async (serviceId) => {
    if (!confirm('Are you sure?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:4000/admin/services/${serviceId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(services.filter(service => service._id !== serviceId));
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const editService = async (serviceId, serviceData) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.put(`http://localhost:4000/admin/services/${serviceId}`, serviceData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(services.map(service => 
        service._id === serviceId ? response.data.service : service
      ));
      setShowEditService(false);
      setEditingService(null);
      alert('Service updated successfully!');
    } catch (error) {
      console.error('Error updating service:', error);
      alert('Error updating service');
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setShowEditService(true);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = '/admin/login';
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-400"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-600/20 to-purple-800/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-600/20 to-blue-800/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-pink-600/10 to-rose-800/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>
      
      <AdminHeader onLogout={logout} onToggleMobileMenu={toggleMobileMenu} />
      
      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6">
        <AdminTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {activeTab === 'dashboard' && (
          <DashboardStats
            stats={stats}
            bookings={bookings}
            onShowAddUser={() => setShowAddUser(true)}
            onShowAddProvider={() => setShowAddProvider(true)}
            onShowAddService={() => setShowAddService(true)}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'users' && (
          <UsersTab 
            users={users} 
            onDeleteUser={deleteUser} 
            onShowAddUser={() => setShowAddUser(true)} 
          />
        )}

        {activeTab === 'providers' && (
          <ProvidersTab 
            providers={providers} 
            onDeleteProvider={deleteProvider} 
            onShowAddProvider={() => setShowAddProvider(true)} 
          />
        )}

        {activeTab === 'services' && (
          <ServicesTab 
            services={services} 
            onDeleteService={deleteService} 
            onShowAddService={() => setShowAddService(true)}
            onEditService={handleEditService}
          />
        )}

        {activeTab === 'bookings' && <BookingsTab bookings={bookings} />}

        {activeTab === 'feedback' && <FeedbackTab feedback={feedback} />}

        {activeTab === 'analytics' && <AnalyticsTab />}

        <AdminModals 
          showAddUser={showAddUser} setShowAddUser={setShowAddUser} addUser={addUser}
          showAddProvider={showAddProvider} setShowAddProvider={setShowAddProvider} addProvider={addProvider}
          showAddService={showAddService} setShowAddService={setShowAddService} addService={addService}
          showEditService={showEditService} setShowEditService={setShowEditService} editService={editService} editingService={editingService}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;