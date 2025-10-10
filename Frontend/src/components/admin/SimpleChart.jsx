import React from 'react';
import { TrendingUp, Users, Calendar } from 'lucide-react';

const SimpleChart = ({ stats }) => {
  // Mock data for demonstration - in real app, this would come from backend
  const userGrowthData = [
    { month: 'Jan', users: 120 },
    { month: 'Feb', users: 150 },
    { month: 'Mar', users: 180 },
    { month: 'Apr', users: 220 },
    { month: 'May', users: 280 },
    { month: 'Jun', users: stats.totalUsers || 320 }
  ];

  const bookingData = [
    { month: 'Jan', bookings: 45 },
    { month: 'Feb', bookings: 52 },
    { month: 'Mar', bookings: 61 },
    { month: 'Apr', bookings: 78 },
    { month: 'May', bookings: 89 },
    { month: 'Jun', bookings: stats.totalBookings || 95 }
  ];

  const maxUsers = Math.max(...userGrowthData.map(d => d.users));
  const maxBookings = Math.max(...bookingData.map(d => d.bookings));

  return (
    <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-700/50 p-6 hover:shadow-2xl transition-all duration-500">
      <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center">
        <div className="p-2 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg mr-3">
          <TrendingUp className="h-5 w-5 text-white" />
        </div>
        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent font-black">Analytics Overview</span>
      </h3>

      <div className="space-y-8">
        {/* User Growth Chart */}
        <div>
          <div className="flex items-center mb-4">
            <Users className="h-4 w-4 text-blue-400 mr-2" />
            <h4 className="text-sm font-semibold text-gray-100">User Growth Trend</h4>
          </div>
          <div className="flex items-end space-x-2 h-32">
            {userGrowthData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-blue-600 to-cyan-500 rounded-t-lg transition-all duration-500 hover:from-blue-500 hover:to-cyan-400"
                  style={{ height: `${(data.users / maxUsers) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-400 mt-2">{data.month}</span>
                <span className="text-xs font-semibold text-gray-300">{data.users}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Trend Chart */}
        <div>
          <div className="flex items-center mb-4">
            <Calendar className="h-4 w-4 text-green-400 mr-2" />
            <h4 className="text-sm font-semibold text-gray-100">Booking Trend</h4>
          </div>
          <div className="flex items-end space-x-2 h-32">
            {bookingData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-green-600 to-emerald-500 rounded-t-lg transition-all duration-500 hover:from-green-500 hover:to-emerald-400"
                  style={{ height: `${(data.bookings / maxBookings) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-400 mt-2">{data.month}</span>
                <span className="text-xs font-semibold text-gray-300">{data.bookings}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-gray-700/50 rounded-lg">
          <p className="text-2xl font-bold text-blue-400">{stats.totalUsers || 0}</p>
          <p className="text-xs text-gray-400">Total Users</p>
        </div>
        <div className="text-center p-3 bg-gray-700/50 rounded-lg">
          <p className="text-2xl font-bold text-green-400">{stats.totalBookings || 0}</p>
          <p className="text-xs text-gray-400">Total Bookings</p>
        </div>
      </div>
    </div>
  );
};

export default SimpleChart;
