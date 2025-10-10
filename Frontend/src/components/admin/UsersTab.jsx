import React from 'react';
import { Users, Trash2 } from 'lucide-react';

const UsersTab = ({ users, onDeleteUser, onShowAddUser }) => {
  return (
    <div className="bg-gray-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden">
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-600 flex justify-between items-center">
        <h3 className="text-lg sm:text-xl font-bold text-gray-100 flex items-center">
          <Users className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-blue-400" />
          <span className="hidden sm:inline">Users ({users.length})</span>
          <span className="sm:hidden">({users.length})</span>
        </h3>
        <button
          onClick={onShowAddUser}
          className="px-3 sm:px-4 py-2 bg-blue-700 text-white rounded-lg sm:rounded-xl hover:bg-blue-800 transition-colors duration-300 flex items-center text-sm sm:text-base"
        >
          <Users className="h-4 w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Add User</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
      <div className="divide-y divide-gray-600 max-h-96 overflow-y-auto">
        {users.map((user) => (
          <div key={user._id} className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-gray-700 transition-colors duration-200">
            <div className="flex items-center min-w-0 flex-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                <div className="text-base sm:text-lg font-semibold text-gray-100 truncate">
                  {user.fullname.firstname} {user.fullname.lastname}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 truncate">{user.email}</div>
                <div className="text-xs sm:text-sm text-gray-500">{user.phone}</div>
              </div>
            </div>
            <button
              onClick={() => onDeleteUser(user._id)}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/50 rounded-lg sm:rounded-xl transition-all duration-300 flex-shrink-0 ml-2"
            >
              <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        ))}
        {users.length === 0 && (
          <div className="px-4 sm:px-6 py-8 text-center text-gray-400">
            No users found
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersTab;