import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import HomePage from './MainContent';
import NavLinkContent from './NavLinkContent';
import Footer from './Footer';

const Portal = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in and redirect accordingly
    const utilityData = localStorage.getItem('utilityData');
    const userData = localStorage.getItem('userData');
    const token = localStorage.getItem('token');

    // Clear any conflicting data first
    if (utilityData && userData) {
      // If both exist, prioritize the most recent login
      const utilityParsed = JSON.parse(utilityData);
      const userParsed = JSON.parse(userData);
      
      // Clear the older data
      localStorage.removeItem('userData');
      localStorage.removeItem('utilityData');
      
      // Keep only provider data and redirect
      localStorage.setItem('utilityData', JSON.stringify(utilityParsed));
      navigate('/provider-landing');
      return;
    }

    if (utilityData && token) {
      // Provider is logged in, redirect to provider home
      navigate('/provider-landing');
      return;
    }
    
    if (userData && token) {
      // User is logged in, show user home (current portal)
      setIsLoading(false);
      return;
    }

    // Guest user, show default portal
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-success-100 to-info-50 relative overflow-hidden">
      {/* Navigation */}
      <NavLinkContent/>
      
      {/* Main Content with enhanced styling */}
      <main className="relative z-10">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-success-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-warning-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-96 h-96 bg-info-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Content wrapper with glass morphism effect */}
        <div className="relative backdrop-blur-md bg-white/10 rounded-xl shadow-xl p-6 border border-white/20">
          <HomePage/>
        </div>
      </main>
      
      {/* Footer */}
      <Footer/>
    </div>
  )
}

export default Portal