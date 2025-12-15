import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, CreditCard, Star, Shield, CheckCircle, Navigation } from 'lucide-react';
import { showToast } from '../utils/toast.js';

const BookingModal = ({ service, userId, onClose, onConfirm, onError }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    notes: '',
    address: ''
  });
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: 'Home',
    name: '',
    mobile: '',
    pincode: '',
    locality: '',
    address: '',
    city: '',
    state: ''
  });
  
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);

  // Fetch user's previous booking addresses
  useEffect(() => {
    const fetchUserAddresses = async () => {
      if (!userId) {
        setIsLoadingAddresses(false);
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/bookings/user/${userId}`);
        const data = await response.json();
        
        if (data.bookings) {
          // Extract unique addresses from user's bookings
          const uniqueAddresses = [];
          const addressMap = new Map();
          
          data.bookings.forEach((booking, index) => {
            if (booking.location && booking.location !== 'Customer Location') {
              const addressKey = booking.location.toLowerCase().trim();
              if (!addressMap.has(addressKey)) {
                addressMap.set(addressKey, {
                  id: `addr_${index}`,
                  type: index === 0 ? 'Recent' : 'Previous',
                  name: booking.userId?.fullname ? 
                    `${booking.userId.fullname.firstname} ${booking.userId.fullname.lastname}` : 
                    'User',
                  mobile: booking.userId?.phone || 'N/A',
                  address: booking.location,
                  locality: '',
                  city: '',
                  state: '',
                  pincode: '',
                  bookingDate: booking.createdAt
                });
                uniqueAddresses.push(addressMap.get(addressKey));
              }
            }
          });
          
          // Sort by most recent booking
          uniqueAddresses.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
          setSavedAddresses(uniqueAddresses.slice(0, 3)); // Show max 3 recent addresses
        }
      } catch (error) {
        console.error('Error fetching user addresses:', error);
      } finally {
        setIsLoadingAddresses(false);
      }
    };

    fetchUserAddresses();
  }, [userId]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by this browser.', 'error');
      setIsGettingLocation(false);
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          console.log('Got coordinates:', latitude, longitude);
          
          // Try multiple geocoding services
          let addressText = `${latitude}, ${longitude}`;
          
          try {
            // First try Nominatim
            const nominatimResponse = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
              { headers: { 'User-Agent': 'FixifyApp/1.0' } }
            );
            
            if (nominatimResponse.ok) {
              const nominatimData = await nominatimResponse.json();
              if (nominatimData.display_name) {
                addressText = nominatimData.display_name;
              }
            }
          } catch (geocodeError) {
            console.log('Geocoding failed, using coordinates:', geocodeError);
            // Fallback to coordinates if geocoding fails
          }
          
          const currentLocationAddress = {
            id: 'current',
            type: 'Current Location',
            name: 'Current Location',
            address: addressText,
            isCurrentLocation: true
          };
          
          setSelectedAddress(currentLocationAddress);
          setFormData(prev => ({ ...prev, address: addressText }));
          setIsGettingLocation(false);
          
          showToast('📍 Location detected successfully!', 'success');
          console.log('Current location set:', addressText);
          
        } catch (error) {
          console.error('Error processing location:', error);
          showToast('Error processing your location. Please try again.', 'error');
          setIsGettingLocation(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMessage = 'Unable to get your location. ';
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Please allow location access and try again.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Location request timed out. Please try again.';
            break;
          default:
            errorMessage += 'An unknown error occurred.';
            break;
        }
        
        showToast(errorMessage, 'error');
        setIsGettingLocation(false);
      },
      options
    );
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    const fullAddress = address.address;
    setFormData({ ...formData, address: fullAddress });
  };

  const handleNewAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleAddNewAddress = () => {
    const fullAddress = `${newAddress.address}, ${newAddress.locality}, ${newAddress.city}, ${newAddress.state} - ${newAddress.pincode}`;
    const addressObj = { ...newAddress, id: Date.now(), address: fullAddress };
    setSelectedAddress(addressObj);
    setFormData({ ...formData, address: fullAddress });
    setShowAddAddress(false);
    setNewAddress({ type: 'Home', name: '', mobile: '', pincode: '', locality: '', address: '', city: '', state: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.date || !formData.time || !formData.address) {
      showToast('Please fill in all required fields', 'error');
      onError('Please fill in all required fields');
      return;
    }

    // Ensure we're sending the actual address, not a placeholder
    const finalFormData = {
      ...formData,
      address: selectedAddress?.address || formData.address
    };

    showToast('🎉 Booking confirmed successfully! You will be redirected to dashboard.', 'success');
    onConfirm(finalFormData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#0047AB] to-[#10B981] text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Book Service</h2>
              <p className="text-blue-100">Complete your booking details</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Service Details */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl p-8 mb-8 border border-blue-100">
            <div className="flex items-start gap-6">
              <img
                src={service.image}
                alt={service.name}
                className="w-40 h-40 rounded-2xl object-cover shadow-lg"
              />
              <div className="flex-1">
                <h3 className="text-3xl font-black text-gray-900 mb-4">{service.name}</h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">{service.description}</p>
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-lg">{service.rating}</span>
                    <span className="text-sm text-gray-600">Rating</span>
                  </div>
                  <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Verified</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full text-blue-700">
                    <Shield className="w-5 h-5" />
                    <span className="font-semibold">Insured</span>
                  </div>
                </div>
              </div>
              <div className="text-right bg-white rounded-2xl p-6 shadow-md">
                <div className="text-4xl font-black text-[#10B981] mb-2">₹{service.price}</div>
                <div className="text-lg text-gray-600 font-medium">per service</div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Address - Flipkart Style */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Deliver To
              </h4>
              
              {/* Current Location Option */}
              <div className="mb-4">
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={isGettingLocation}
                  className={`w-full flex items-center gap-3 p-4 border-2 border-dashed rounded-xl transition-all ${
                    selectedAddress?.isCurrentLocation 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-blue-300 hover:border-blue-500 hover:bg-blue-50'
                  } ${isGettingLocation ? 'opacity-75' : ''}`}
                >
                  <Navigation className={`w-5 h-5 text-blue-600 ${isGettingLocation ? 'animate-spin' : ''}`} />
                  <div className="text-left flex-1">
                    <div className="font-semibold text-blue-600">
                      {isGettingLocation ? 'Detecting location...' : 'Use my current location'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {selectedAddress?.isCurrentLocation ? 'Location detected' : 'Using GPS'}
                    </div>
                    {selectedAddress?.isCurrentLocation && (
                      <div className="text-xs text-gray-600 mt-1 truncate">
                        {selectedAddress.address}
                      </div>
                    )}
                  </div>
                  {selectedAddress?.isCurrentLocation && (
                    <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>
              </div>



              {/* Add New Address */}
              {!showAddAddress ? (
                <button
                  type="button"
                  onClick={() => setShowAddAddress(true)}
                  className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-blue-600 font-semibold hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  + Add a new address
                </button>
              ) : (
                <div className="border rounded-xl p-4 bg-gray-50">
                  <h5 className="font-semibold mb-3">Add New Address</h5>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={newAddress.name}
                      onChange={handleNewAddressChange}
                      className="px-3 py-2 border rounded-lg text-sm"
                    />
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Mobile Number"
                      value={newAddress.mobile}
                      onChange={handleNewAddressChange}
                      className="px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      name="pincode"
                      placeholder="Pincode"
                      value={newAddress.pincode}
                      onChange={handleNewAddressChange}
                      className="px-3 py-2 border rounded-lg text-sm"
                    />
                    <input
                      type="text"
                      name="locality"
                      placeholder="Locality"
                      value={newAddress.locality}
                      onChange={handleNewAddressChange}
                      className="px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                  <textarea
                    name="address"
                    placeholder="Address (Area and Street)"
                    value={newAddress.address}
                    onChange={handleNewAddressChange}
                    rows="2"
                    className="w-full px-3 py-2 border rounded-lg text-sm mb-3"
                  />
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      name="city"
                      placeholder="City/District/Town"
                      value={newAddress.city}
                      onChange={handleNewAddressChange}
                      className="px-3 py-2 border rounded-lg text-sm"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={newAddress.state}
                      onChange={handleNewAddressChange}
                      className="px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleAddNewAddress}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold"
                    >
                      Save Address
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddAddress(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Schedule */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Schedule Service
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    📅 Preferred Date *
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(() => {
                      const dates = [];
                      const today = new Date();
                      for (let i = 0; i < 6; i++) {
                        const date = new Date(today);
                        date.setDate(today.getDate() + i);
                        const dateStr = date.toISOString().split('T')[0];
                        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                        const dayNum = date.getDate();
                        const monthName = date.toLocaleDateString('en-US', { month: 'short' });
                        
                        dates.push(
                          <button
                            key={dateStr}
                            type="button"
                            onClick={() => setFormData({ ...formData, date: dateStr })}
                            className={`p-3 border-2 rounded-xl text-center transition-all ${
                              formData.date === dateStr
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                            }`}
                          >
                            <div className="text-xs font-semibold text-gray-500 uppercase">{dayName}</div>
                            <div className="text-xl font-bold">{dayNum}</div>
                            <div className="text-xs text-gray-600">{monthName}</div>
                          </button>
                        );
                      }
                      return dates;
                    })()}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    🕐 Preferred Time *
                  </label>
                  <div className="relative">
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-medium bg-white shadow-sm hover:border-gray-300 transition-all appearance-none cursor-pointer"
                      required
                    >
                      <option value="" className="text-gray-400">Choose your time slot</option>
                      <option value="09:00" className="py-2">🌅 09:00 AM - Morning</option>
                      <option value="10:00" className="py-2">☀️ 10:00 AM - Morning</option>
                      <option value="11:00" className="py-2">☀️ 11:00 AM - Late Morning</option>
                      <option value="12:00" className="py-2">🌞 12:00 PM - Noon</option>
                      <option value="14:00" className="py-2">🌤️ 02:00 PM - Afternoon</option>
                      <option value="15:00" className="py-2">🌤️ 03:00 PM - Afternoon</option>
                      <option value="16:00" className="py-2">🌅 04:00 PM - Evening</option>
                      <option value="17:00" className="py-2">🌆 05:00 PM - Evening</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <Clock className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any specific requirements or additional information..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#0047AB] to-[#10B981] text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;