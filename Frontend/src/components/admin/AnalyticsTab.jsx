import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Calendar, Clock } from 'lucide-react';
import axios from 'axios';

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    daily: [],
    weekly: [],
    monthly: [],
    yearly: []
  });
  const [activeTab, setActiveTab] = useState('daily');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('http://localhost:4000/admin/booking-analytics', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAnalyticsData(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentData = () => {
    return analyticsData[activeTab] || [];
  };

  const getMaxValue = () => {
    const data = getCurrentData();
    const values = data.map(item => item.value || 0);
    return Math.max(...values, 1);
  };

  const tabs = [
    { key: 'daily', label: 'Daily', icon: Clock },
    { key: 'weekly', label: 'Weekly', icon: Calendar },
    { key: 'monthly', label: 'Monthly', icon: BarChart3 },
    { key: 'yearly', label: 'Yearly', icon: TrendingUp }
  ];

  if (loading) {
    return (
      <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-700/50 p-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-600">
        <h3 className="text-xl font-bold text-gray-100 flex items-center">
          <BarChart3 className="h-6 w-6 mr-2 text-indigo-400" />
          Booking Analytics
        </h3>
      </div>

      {/* Tab Navigation */}
      <div className="px-6 py-4 border-b border-gray-600">
        <div className="flex space-x-1 bg-gray-700/50 rounded-lg p-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-600/50'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart */}
      <div className="p-6">
        <div className="h-80 flex items-end justify-between space-x-2">
          {getCurrentData().map((item, index) => {
            const value = item.value || 0;
            const height = (value / getMaxValue()) * 100;
            const label = item.label || '';
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col items-center mb-2">
                  <div
                    className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg transition-all duration-1000 ease-out flex items-end justify-center relative group"
                    style={{ height: `${Math.max(height, 5)}%`, minHeight: '20px' }}
                  >
                    <div className="absolute -top-8 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {value} bookings
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-400 text-center font-medium mt-2 transform -rotate-45 origin-center">
                  {label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">
              {getCurrentData().reduce((sum, item) => sum + (item.value || 0), 0)}
            </div>
            <div className="text-sm text-gray-400">Total Bookings</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">
              {getCurrentData().length > 0 ? Math.round(getCurrentData().reduce((sum, item) => sum + (item.value || 0), 0) / getCurrentData().length) : 0}
            </div>
            <div className="text-sm text-gray-400">Average</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">
              {getMaxValue()}
            </div>
            <div className="text-sm text-gray-400">Peak</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">
              {getCurrentData().filter(item => (item.value || 0) > 0).length}
            </div>
            <div className="text-sm text-gray-400">Active Periods</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;