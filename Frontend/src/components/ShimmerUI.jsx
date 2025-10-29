import React from 'react';

// Service Card Shimmer
export const ServiceCardShimmer = () => (
  <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
    <div className="h-48 bg-gray-300 rounded-xl mb-4"></div>
    <div className="h-6 bg-gray-300 rounded mb-3"></div>
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
    <div className="h-10 bg-gray-300 rounded-lg"></div>
  </div>
);

// Stats Card Shimmer
export const StatsCardShimmer = () => (
  <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 animate-pulse">
    <div className="flex items-center justify-between mb-3">
      <div className="w-8 h-8 bg-gray-300 rounded"></div>
      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
    </div>
    <div className="h-8 bg-gray-300 rounded mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
  </div>
);

// Testimonial Card Shimmer
export const TestimonialShimmer = () => (
  <div className="bg-slate-700/80 backdrop-blur-sm rounded-3xl p-8 animate-pulse">
    <div className="flex justify-center mb-4 space-x-1">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-5 h-5 bg-gray-400 rounded"></div>
      ))}
    </div>
    <div className="space-y-3 mb-6">
      <div className="h-4 bg-gray-400 rounded"></div>
      <div className="h-4 bg-gray-400 rounded w-4/5"></div>
      <div className="h-4 bg-gray-400 rounded w-3/4"></div>
    </div>
    <div className="border-t border-slate-600 pt-4">
      <div className="h-5 bg-gray-400 rounded mb-2"></div>
      <div className="h-4 bg-gray-400 rounded w-1/2"></div>
    </div>
  </div>
);

// Benefits Card Shimmer
export const BenefitCardShimmer = () => (
  <div className="p-8 rounded-3xl bg-gray-800 animate-pulse">
    <div className="w-20 h-20 mb-6 rounded-2xl bg-gray-600"></div>
    <div className="h-6 bg-gray-600 rounded mb-4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-600 rounded"></div>
      <div className="h-4 bg-gray-600 rounded w-4/5"></div>
    </div>
  </div>
);

// Dashboard Card Shimmer
export const DashboardCardShimmer = () => (
  <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
      <div className="w-6 h-6 bg-gray-300 rounded"></div>
    </div>
    <div className="h-8 bg-gray-300 rounded mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
  </div>
);

// List Item Shimmer
export const ListItemShimmer = () => (
  <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow animate-pulse">
    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
    </div>
    <div className="w-20 h-8 bg-gray-300 rounded"></div>
  </div>
);

// Table Row Shimmer
export const TableRowShimmer = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-4"><div className="h-4 bg-gray-300 rounded"></div></td>
    <td className="px-6 py-4"><div className="h-4 bg-gray-300 rounded w-3/4"></div></td>
    <td className="px-6 py-4"><div className="h-4 bg-gray-300 rounded w-1/2"></div></td>
    <td className="px-6 py-4"><div className="h-8 bg-gray-300 rounded w-20"></div></td>
  </tr>
);

// Page Loading Shimmer
export const PageLoadingShimmer = () => (
  <div className="min-h-screen bg-gray-100 animate-pulse">
    <div className="h-16 bg-gray-300 mb-8"></div>
    <div className="container mx-auto px-6">
      <div className="h-12 bg-gray-300 rounded mb-6 w-1/3"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 bg-gray-300 rounded-xl"></div>
        ))}
      </div>
    </div>
  </div>
);