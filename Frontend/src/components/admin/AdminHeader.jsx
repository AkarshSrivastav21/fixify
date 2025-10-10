import React from 'react';
import { LogOut, WrenchIcon, Menu } from 'lucide-react';

const AdminHeader = ({ onLogout, onToggleMobileMenu }) => {
  return (
    <nav className="bg-gray-800/80 backdrop-blur-xl shadow-lg border-b border-gray-700/50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={onToggleMobileMenu}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 mr-2"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2 text-white">
              <div className="p-1.5 bg-gradient-to-br from-gray-200 to-white rounded-lg shadow-lg">
                <WrenchIcon className="h-5 w-5 text-gray-800" />
              </div>
              <span className="text-lg font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Fixify</span>
            </div>
          </div>
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={onLogout}
              className="flex items-center px-3 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-900/50 rounded-lg transition-all duration-300"
            >
              <LogOut className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;