import React from 'react';
import { Bell, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const NotificationsPanel = ({ stats }) => {
  // Generate notifications based on data
  const notifications = [];

  if (stats.pendingProviders > 0) {
    notifications.push({
      id: 1,
      type: 'warning',
      title: 'Pending Provider Approvals',
      message: `${stats.pendingProviders} providers waiting for approval`,
      time: '2 hours ago'
    });
  }

  if (stats.totalBookings > 0 && stats.totalBookings < 10) {
    notifications.push({
      id: 2,
      type: 'info',
      title: 'Low Booking Activity',
      message: 'Consider running promotional campaigns',
      time: '1 day ago'
    });
  }

  if (stats.totalUsers > 0) {
    notifications.push({
      id: 3,
      type: 'success',
      title: 'New User Registrations',
      message: `${stats.totalUsers} users have joined this week`,
      time: '3 days ago'
    });
  }

  // Add some default notifications if none
  if (notifications.length === 0) {
    notifications.push(
      {
        id: 4,
        type: 'info',
        title: 'System Update',
        message: 'Platform maintenance completed successfully',
        time: '1 week ago'
      },
      {
        id: 5,
        type: 'success',
        title: 'Service Categories Updated',
        message: 'New cleaning services added to catalog',
        time: '2 weeks ago'
      }
    );
  }

  const getIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-900/20 border-yellow-700/50';
      case 'success':
        return 'bg-green-900/20 border-green-700/50';
      case 'info':
        return 'bg-blue-900/20 border-blue-700/50';
      default:
        return 'bg-gray-900/20 border-gray-700/50';
    }
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-700/50 p-6 hover:shadow-2xl transition-all duration-500">
      <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center">
        <div className="p-2 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg mr-3">
          <Bell className="h-5 w-5 text-white" />
        </div>
        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-black">Notifications</span>
      </h3>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-xl border ${getBgColor(notification.type)} hover:shadow-lg transition-all duration-300 group`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-100 group-hover:text-white transition-colors">
                  {notification.title}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {notification.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="text-sm text-orange-400 hover:text-orange-300 font-medium transition-colors">
          View All Notifications →
        </button>
      </div>
    </div>
  );
};

export default NotificationsPanel;
