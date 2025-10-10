import React from 'react';
import { BarChart3, Users, Wrench, Activity, Calendar, MessageSquare, TrendingUp, X } from 'lucide-react';

const AdminTabs = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'providers', label: 'Providers', icon: Wrench },
    { id: 'services', label: 'Services', icon: Activity },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Tabs */}
      <div className="hidden md:block bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-700/50 p-2 mb-8">
        <div className="flex justify-center">
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fixed left-0 top-0 h-full w-80 bg-gray-900/95 backdrop-blur-xl shadow-2xl border-r border-gray-700/50" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
              <h2 className="text-xl font-bold text-white">Admin Menu</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-3" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}


    </>
  );
};

export default AdminTabs;