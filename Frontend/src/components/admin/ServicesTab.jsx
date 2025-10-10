import React from 'react';
import { Activity, Trash2, Edit } from 'lucide-react';

const ServicesTab = ({ services, onDeleteService, onShowAddService, onEditService }) => {
  return (
    <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-600 flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-100 flex items-center">
          <Activity className="h-6 w-6 mr-2 text-orange-400" />
          Services ({services.length})
        </h3>
        <button
          onClick={onShowAddService}
          className="px-4 py-2 bg-orange-700 text-white rounded-xl hover:bg-orange-800 transition-colors duration-300 flex items-center"
        >
          <Activity className="h-4 w-4 mr-2" />
          Add Service
        </button>
      </div>
      <div className="divide-y divide-gray-600">
        {services.map((service) => (
          <div key={service._id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-700 transition-colors duration-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <div className="text-lg font-semibold text-gray-100">
                  {service.name}
                </div>
                <div className="text-sm text-gray-400 capitalize">
                  {service.category} • ₹{service.price}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEditService(service)}
                className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/50 rounded-xl transition-all duration-300"
              >
                <Edit className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDeleteService(service._id)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/50 rounded-xl transition-all duration-300"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesTab;