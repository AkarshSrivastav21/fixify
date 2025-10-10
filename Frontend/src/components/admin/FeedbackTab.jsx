import React from 'react';
import { MessageSquare, Star } from 'lucide-react';

const FeedbackTab = ({ feedback }) => {
  return (
    <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-600">
        <h3 className="text-xl font-bold text-gray-100 flex items-center">
          <MessageSquare className="h-6 w-6 mr-2 text-blue-400" />
          User Feedback ({feedback.length})
        </h3>
      </div>
      <div className="p-6">
        {feedback.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-500" />
            <p className="text-lg">No feedback received yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedback.map((fb) => (
              <div
                key={fb._id}
                className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_4px_8px_rgba(0,0,0,0.1)] border border-gray-600/50 p-6 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),0_8px_16px_rgba(0,0,0,0.15)] transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1"
              >
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="text-lg font-semibold text-gray-100 mb-1">
                      {fb.userId?.fullname?.firstname} {fb.userId?.fullname?.lastname}
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < fb.rating ? 'text-yellow-400 fill-current' : 'text-gray-500'}`} />
                      ))}
                      <span className="ml-2 text-sm text-gray-400 font-medium">({fb.rating}/5)</span>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-400 mb-3">
                  <div className="mb-1">
                    <span className="font-medium">Service:</span> <span className="capitalize">{fb.serviceCategory}</span>
                  </div>
                  <div>
                    <span className="font-medium">Provider:</span> {fb.providerId?.fullname?.firstname} {fb.providerId?.fullname?.lastname}
                  </div>
                </div>

                <div className="text-gray-200 bg-gray-700/70 p-4 rounded-xl border border-gray-600/50 mb-3 shadow-inner">
                  <p className="text-sm italic">"{fb.comment}"</p>
                </div>

                <div className="text-xs text-gray-400 text-right">
                  {new Date(fb.createdAt).toLocaleDateString()} • {new Date(fb.createdAt).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackTab;