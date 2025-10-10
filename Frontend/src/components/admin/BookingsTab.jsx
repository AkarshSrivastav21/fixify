import React from 'react';
import { Calendar } from 'lucide-react';

const BookingsTab = ({ bookings }) => {
  return (
    <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-600">
        <h3 className="text-xl font-bold text-gray-100 flex items-center">
          <Calendar className="h-6 w-6 mr-2 text-purple-400" />
          Bookings ({bookings.length})
        </h3>
      </div>
      <div className="divide-y divide-gray-600">
        {bookings.map((booking) => (
          <div key={booking._id} className="px-6 py-4 hover:bg-gray-700 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <div className="text-lg font-semibold text-gray-100 capitalize">
                    {booking.category}
                  </div>
                  <div className="text-sm text-gray-400">
                    User: {booking.userId?.fullname?.firstname} {booking.userId?.fullname?.lastname}
                  </div>
                  <div className="text-sm text-gray-400">
                    Provider: {booking.providerId?.fullname?.firstname} {booking.providerId?.fullname?.lastname}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className={`px-3 py-1 text-sm font-semibold rounded-full ${
                booking.status === 'completed' ? 'bg-green-900 text-green-200' :
                booking.status === 'confirmed' ? 'bg-blue-900 text-blue-200' :
                booking.status === 'pending' ? 'bg-yellow-900 text-yellow-200' :
                'bg-red-900 text-red-200'
              }`}>
                {booking.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsTab;