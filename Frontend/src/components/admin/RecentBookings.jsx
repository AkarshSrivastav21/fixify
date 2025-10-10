import React from 'react';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const RecentBookings = ({ bookings }) => {
  const recentBookings = bookings.slice(0, 5); // Show last 5 bookings

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'confirmed':
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-900 text-green-200';
      case 'pending':
        return 'bg-yellow-900 text-yellow-200';
      case 'confirmed':
        return 'bg-blue-900 text-blue-200';
      case 'cancelled':
        return 'bg-red-900 text-red-200';
      default:
        return 'bg-gray-900 text-gray-200';
    }
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-700/50 p-6 hover:shadow-2xl transition-all duration-500">
      <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center">
        <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg mr-3">
          <Calendar className="h-5 w-5 text-white" />
        </div>
        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-black">Recent Bookings</span>
      </h3>

      <div className="space-y-4">
        {recentBookings.length > 0 ? (
          recentBookings.map((booking) => (
            <div key={booking._id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl hover:bg-gray-600/50 transition-all duration-300 group">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center">
                  {getStatusIcon(booking.status)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-100 group-hover:text-white transition-colors">
                    {booking.service?.name || 'Service'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {booking.user?.name || 'User'} • {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 py-8">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No recent bookings</p>
          </div>
        )}
      </div>

      {recentBookings.length > 0 && (
        <div className="mt-6 text-center">
          <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
            View All Bookings →
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentBookings;
