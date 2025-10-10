import React from 'react';
import { Users, Wrench, Calendar, Activity } from 'lucide-react';
import AdminSlider from './AdminSlider';
import RecentBookings from './RecentBookings';
import NotificationsPanel from './NotificationsPanel';
import QuickActions from './QuickActions';
import SimpleChart from './SimpleChart';

const DashboardStats = ({ stats, bookings, onShowAddUser, onShowAddProvider, onShowAddService, setActiveTab }) => {
  const statItems = [
    { title: 'Total Users', value: stats.totalUsers, icon: Users, color: 'from-blue-500 to-cyan-500' },
    { title: 'Total Providers', value: stats.totalProviders, icon: Wrench, color: 'from-green-500 to-emerald-500' },
    { title: 'Total Bookings', value: stats.totalBookings, icon: Calendar, color: 'from-purple-500 to-pink-500' },
    { title: 'Active Providers', value: stats.activeProviders, icon: Activity, color: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="space-y-8">
      {/* Slider */}
      <AdminSlider />

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black mb-2">Welcome to Admin Dashboard</h2>
          <p className="text-sm sm:text-base lg:text-lg opacity-90">Manage your platform with powerful tools and insights</p>
        </div>
        <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-6 -left-6 w-20 h-20 sm:w-32 sm:h-32 bg-white/5 rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statItems.map((stat, index) => (
          <div key={index} className="group bg-gray-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-gray-700/50 p-4 sm:p-6 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer">
            <div className="flex items-center">
              <div className={`p-2 sm:p-3 bg-gradient-to-r ${stat.color} rounded-lg sm:rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors truncate">{stat.title}</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-100 group-hover:text-indigo-400 transition-colors">{stat.value || 0}</p>
              </div>
            </div>
            <div className="mt-3 sm:mt-4 h-1 bg-gray-600 rounded-full overflow-hidden">
              <div className={`h-full bg-gradient-to-r ${stat.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-gray-700/50 p-4 sm:p-6 hover:shadow-2xl transition-all duration-500">
        <h3 className="text-lg sm:text-xl font-bold text-gray-100 mb-4 sm:mb-6 flex items-center">
          <div className="p-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg mr-2 sm:mr-3">
            <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-black text-sm sm:text-base">Active Providers by Category</span>
        </h3>
        <div className="space-y-4 sm:space-y-6">
          {stats.activeProvidersByCategory?.map((category, index) => {
            const colors = [
              'from-blue-500 to-blue-600',
              'from-green-500 to-green-600', 
              'from-purple-500 to-purple-600',
              'from-orange-500 to-orange-600'
            ];
            return (
              <div key={index} className="border border-gray-600 rounded-lg sm:rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className={`bg-gradient-to-r ${colors[index % colors.length]} p-3 sm:p-4 group-hover:scale-105 transition-transform duration-300`}>
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center">
                      <Wrench className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                      <div>
                        <h4 className="text-base sm:text-lg font-bold capitalize">{category._id}</h4>
                        <p className="text-xs sm:text-sm opacity-90">{category.count} Active Providers</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-700 divide-y divide-gray-600">
                  {category.providers?.map((provider, providerIndex) => (
                    <div key={providerIndex} className="p-3 sm:p-4 hover:bg-gray-600 hover:shadow-md transition-all duration-300 transform hover:scale-102">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center min-w-0 flex-1">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                            <Users className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                          </div>
                          <div className="ml-2 sm:ml-3 min-w-0 flex-1">
                            <p className="text-xs sm:text-sm font-semibold text-gray-100 truncate">{provider.name}</p>
                            <p className="text-xs text-gray-400 truncate">{provider.email}</p>
                            <p className="text-xs text-gray-500 truncate">{provider.contact} • {provider.experience} years exp</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-2">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-900 text-green-200">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        {(!stats.activeProvidersByCategory || stats.activeProvidersByCategory.length === 0) && (
          <div className="text-center text-gray-400 py-8">
            No active providers found
          </div>
        )}
      </div>

      {/* Additional Dashboard Components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        <RecentBookings bookings={bookings} />
        <NotificationsPanel stats={stats} />
        <QuickActions
          onShowAddUser={onShowAddUser}
          onShowAddProvider={onShowAddProvider}
          onShowAddService={onShowAddService}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Analytics Chart */}
      <SimpleChart stats={stats} />
    </div>
  );
};

export default DashboardStats;