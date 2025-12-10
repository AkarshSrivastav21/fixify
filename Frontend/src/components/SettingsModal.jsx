import React, { useState, useContext } from 'react';
import { X, Camera, User, Mail, Phone, Save, Upload } from 'lucide-react';
import { UserDataContext } from '../context/UserContext';
import { UtilityDataContext } from '../context/UtilityContext';
import axios from 'axios';

const SettingsModal = ({ isOpen, onClose }) => {
  const { user, setUser } = useContext(UserDataContext);
  const { utility, setUtility } = useContext(UtilityDataContext);
  
  const currentUser = user || utility;
  const isProvider = !!utility;
  
  const [formData, setFormData] = useState({
    firstname: currentUser?.fullname?.firstname || '',
    lastname: currentUser?.fullname?.lastname || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || currentUser?.contact || '',
    profileImage: currentUser?.profileImage || ''
  });
  
  const [imagePreview, setImagePreview] = useState(currentUser?.profileImage || '');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({
          ...formData,
          profileImage: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_BASE_URL.replace(/\/$/, '');
      const endpoint = isProvider ? '/utilities/profile' : '/users/profile';
      
      const updateData = {
        fullname: {
          firstname: formData.firstname,
          lastname: formData.lastname
        },
        email: formData.email,
        [isProvider ? 'contact' : 'phone']: formData.phone,
        profileImage: formData.profileImage
      };

      const response = await axios.put(
        `${baseUrl}${endpoint}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        const updatedUser = response.data[isProvider ? 'utility' : 'user'];
        
        if (isProvider) {
          setUtility(updatedUser);
          localStorage.setItem('utilityData', JSON.stringify(updatedUser));
        } else {
          setUser(updatedUser);
          localStorage.setItem('userData', JSON.stringify(updatedUser));
        }
        
        alert('Profile updated successfully!');
        onClose();
      }
    } catch (error) {
      console.error('Profile update error:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#0047AB] to-[#10B981] text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Profile Settings</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Profile Image */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-r from-[#0047AB] to-[#10B981] flex items-center justify-center mx-auto mb-4">
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-white" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-[#10B981] p-2 rounded-full cursor-pointer hover:bg-[#059669] transition-colors">
                <Camera className="w-4 h-4 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-sm text-gray-600">Click camera to change photo</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0047AB] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0047AB] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0047AB] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0047AB] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#0047AB] to-[#10B981] text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;