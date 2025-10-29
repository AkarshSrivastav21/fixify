import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import HomePage from './MainContent';
import NavLinkContent from './NavLinkContent';
import Footer from './Footer';

const Portal = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Just set loading to false, no automatic redirects
    setIsLoading(false);
  }, []);

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