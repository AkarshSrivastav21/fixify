import React from 'react';
import { UserPlus, Wrench, FileText, BarChart3, Settings, MessageSquare } from 'lucide-react';

const QuickActions = ({ onShowAddUser, onShowAddProvider, onShowAddService, setActiveTab }) => {
  const actions = [
    {
      id: 'add-user',
      title: 'Add User',
      description: 'Register a new user',
      icon: UserPlus,
      color: 'from-blue-600 to-cyan-600',
      action: onShowAddUser
    },
    {
      id: 'add-provider',
      title: 'Add Provider',
      description: 'Onboard a new service provider',
      icon: Wrench,
      color: 'from-green-600 to-emerald-600',
      action: onShowAddProvider
    },
    {
      id: 'add-service',
      title: 'Add Service',
      description: 'Create a new service category',
      icon: Settings,
      color: 'from-purple-600 to-pink-600',
      action: onShowAddService
    },
    {
      id: 'view-reports',
      title: 'View Reports',
      description: 'Access analytics and reports',
      icon: BarChart3,
      color: 'from-orange-600 to-red-600',
      action: () => setActiveTab('reports') // Assuming reports tab exists or will be added
    },
    {
      id: 'manage-bookings',
      title: 'Manage Bookings',
      description: 'View and manage all bookings',
      icon: FileText,
      color: 'from-indigo-600 to-blue-600',
      action: () => setActiveTab('bookings')
    },
    {
      id: 'feedback',
      title: 'View Feedback',
      description: 'Check user feedback and reviews',
      icon: MessageSquare,
      color: 'from-teal-600 to-cyan-600',
      action: () => setActiveTab('feedback')
    }
  ];

  return (
    <div className="bg-gray-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-gray-700/50 p-4 sm:p-6 hover:shadow-2xl transition-all duration-500">
      <h3 className="text-lg sm:text-xl font-bold text-gray-100 mb-4 sm:mb-6 flex items-center">
        <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg mr-2 sm:mr-3">
          <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        </div>
        <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-black text-sm sm:text-base">Quick Actions</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className="group p-3 sm:p-4 bg-gray-700/50 rounded-lg sm:rounded-xl border border-gray-600/50 hover:bg-gray-600/50 hover:border-gray-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className={`p-1.5 sm:p-2 bg-gradient-to-r ${action.color} rounded-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                <action.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-left min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-semibold text-gray-100 group-hover:text-white transition-colors truncate">
                  {action.title}
                </p>
                <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors truncate">
                  {action.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
