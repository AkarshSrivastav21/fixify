import React from 'react';
import { Wrench, Trash2 } from 'lucide-react';

const ProvidersTab = ({ providers, onDeleteProvider, onShowAddProvider }) => {
  return (
    <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-600 flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-100 flex items-center">
          <Wrench className="h-6 w-6 mr-2 text-green-400" />
          Providers ({providers.length})
        </h3>
        <button
          onClick={onShowAddProvider}
          className="px-4 py-2 bg-green-700 text-white rounded-xl hover:bg-green-800 transition-colors duration-300 flex items-center"
        >
          <Wrench className="h-4 w-4 mr-2" />
          Add Provider
        </button>
      </div>
      <div className="divide-y divide-gray-600">
        {providers.map((provider) => (
          <div key={provider._id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-700 transition-colors duration-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Wrench className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <div className="text-lg font-semibold text-gray-100">
                  {provider.fullname.firstname} {provider.fullname.lastname}
                </div>
                <div className="text-sm text-gray-400">{provider.email}</div>
                <div className="text-sm text-gray-400 capitalize">
                  {provider.profession} • {provider.experience} years
                </div>
                <div className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  provider.status === 'active' ? 'bg-green-900 text-green-200' : 'bg-gray-700 text-gray-200'
                }`}>
                  {provider.status}
                </div>
              </div>
            </div>
            <button
              onClick={() => onDeleteProvider(provider._id)}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/50 rounded-xl transition-all duration-300"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProvidersTab;