import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ServiceCard from './ServiceCard';
import NavLinkContent from './NavLinkContent';
import BookingModal from '../components/BookingModal';
import { UserDataContext } from '../context/UserContext'; // get logged-in user
import { Search, Filter, MapPin, Grid, List, Star, TrendingUp } from 'lucide-react';

const ServiceInfo = ({ location, profession }) => {
  const { user } = useContext(UserDataContext); // logged-in user
  const loggedInUserId = user?._id || null;

  const [services, setServices] = useState([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  // Fetch services from database
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BASE_URL.replace(/\/$/, '');
        const response = await axios.get(`${baseUrl}/services`);
        setServices(response.data.services || []);
      } catch (error) {
        console.error('Error fetching services:', error);
        setServices([]);
      }
    };
    fetchServices();
  }, []);

  const categories = ['All', ...new Set(services.map(s => s.category))];

  // Auto-filter if provider has profession
  useEffect(() => {
    if (profession && categories.includes(profession)) {
      setCategory(profession);
    }
  }, [profession]);

  const filteredServices = services.filter(
    service =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === 'All' || service.category === category)
  );

  // Handle booking modal
  const handleOpenBooking = (service) => {
    if (!loggedInUserId) {
      alert('❌ Login first.');
      return;
    }
    setSelectedService(service);
    setShowBookingModal(true);
  };

  const handleCloseBooking = () => {
    setShowBookingModal(false);
    setSelectedService(null);
  };

  const handleConfirmBooking = async (bookingData) => {
    try {
      const payload = {
        userId: loggedInUserId,
        providerId: selectedService.providerId || selectedService.provider?._id || selectedService._id,
        category: selectedService.category,
        serviceId: selectedService.id || selectedService._id,
        location: selectedService.location || 'Customer Location',
        details: bookingData.notes || `Booking for ${selectedService.name}`,
        preferredDate: bookingData.date,
        preferredTime: bookingData.time,
      };

      const baseUrl = import.meta.env.VITE_BASE_URL.replace(/\/$/, '');
      await axios.post(
        `${baseUrl}/bookings/booking`,
        payload
      );

      alert('✅ Booking successful!');
      setShowBookingModal(false);
      setSelectedService(null);
    } catch (err) {
      console.error('Booking error:', err);
      alert('❌ Booking failed. Check console for details.');
    }
  };

  const handleBookingError = (msg) => {
    alert(msg);
  };

  return (
    <div className="min-h-screen relative" style={{
      background: 'linear-gradient(135deg, #dbeafe 0%, #ffffff 50%, #d1fae5 100%)'
    }}>
      <NavLinkContent />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full filter blur-3xl opacity-30" style={{
          background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)'
        }}></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full filter blur-3xl opacity-30" style={{
          background: 'radial-gradient(circle, #10b981 0%, transparent 70%)'
        }}></div>
        <div className="absolute top-1/3 right-1/3 w-80 h-80 rounded-full filter blur-3xl opacity-20" style={{
          background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)'
        }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full filter blur-3xl opacity-20" style={{
          background: 'radial-gradient(circle, #34d399 0%, transparent 70%)'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="relative">
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-[#0047AB] to-[#10B981] bg-clip-text text-transparent mb-4">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
              Professional services at your doorstep
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <MapPin className="w-5 h-5" />
              <span className="font-medium">{location}</span>
            </div>
          </div>
        </div>

        {/* Enhanced Filter Section */}
        <div className="backdrop-blur-xl rounded-[2rem] p-6 mb-8 relative" style={{
          background: 'rgba(255, 255, 255, 0.7)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          border: '1px solid rgba(0,0,0,0.08)'
        }}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-blue-400" strokeWidth={2.5} />
              </div>
              <input
                type="text"
                placeholder="Search services, professionals, or keywords..."
                className="w-full pl-14 pr-5 py-4 backdrop-blur-xl border border-blue-200/50 rounded-2xl focus:outline-none font-medium transition-all duration-300 placeholder:text-gray-400"
                style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)'
                }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-emerald-400" strokeWidth={2.5} />
              </div>
              <select
                className="pl-14 pr-10 py-4 backdrop-blur-xl border border-emerald-200/50 rounded-2xl focus:outline-none font-medium transition-all duration-300 appearance-none cursor-pointer"
                style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)'
                }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Results Summary */}
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-2 px-4 py-2 backdrop-blur-xl rounded-full border border-blue-100/50" style={{
              background: 'rgba(59, 130, 246, 0.1)'
            }}>
              <TrendingUp className="w-4 h-4 text-blue-600" strokeWidth={2.5} />
              <span className="font-bold text-blue-900 text-sm">
                {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
              </span>
            </div>
            
            {/* Category Pills */}
            <div className="hidden md:flex items-center space-x-2">
              {categories.slice(0, 4).map((cat, index) => (
                <button
                  key={`${cat}-${index}`}
                  onClick={() => setCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                    category === cat
                      ? 'text-white shadow-lg'
                      : 'text-gray-600 hover:bg-white/60'
                  }`}
                  style={category === cat ? {
                    background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
                    boxShadow: '0 10px 30px -10px rgba(59,130,246,0.5)'
                  } : {
                    background: 'rgba(255, 255, 255, 0.4)',
                    border: '1px solid rgba(0,0,0,0.08)'
                  }}
                >
                  {cat === 'All' ? 'All' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Service Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <div
                key={service._id || service.id || index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ServiceCard
                  service={service}
                  onBookService={() => handleOpenBooking(service)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="backdrop-blur-xl rounded-[2rem] p-12 text-center relative" style={{
            background: 'rgba(255, 255, 255, 0.7)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            border: '1px solid rgba(0,0,0,0.08)'
          }}>
            <div className="max-w-md mx-auto">
              <div className="p-8 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center backdrop-blur-xl border border-blue-200/50" style={{
                background: 'rgba(59, 130, 246, 0.15)',
                boxShadow: '0 10px 30px rgba(59,130,246,0.2)'
              }}>
                <Search className="w-16 h-16 text-blue-500" strokeWidth={2} />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">No services found</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                We couldn't find any services matching your criteria. Try adjusting your search or category filter.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCategory('All');
                }}
                className="px-10 py-4 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
                  boxShadow: '0 10px 30px -10px rgba(59,130,246,0.5)'
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedService && (
        <BookingModal
          service={selectedService}
          userId={loggedInUserId}
          onClose={handleCloseBooking}
          onConfirm={handleConfirmBooking}
          onError={handleBookingError}
        />
      )}
    </div>
  );
};

export default ServiceInfo;