import { Routes, Route, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import UsersDashboard from './UsersDashboard';
import AnalyticsDashboard from './AnalyticsDashboard';
import { Users, BarChart2, LogOut } from 'lucide-react';

const Dashboard = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b">
            <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            <NavLink
              to="/dashboard/users"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 ${
                  isActive ? 'bg-blue-100 text-blue-700' : ''
                }`
              }
            >
              <Users className="w-5 h-5 mr-3" />
              Users
            </NavLink>
            <NavLink
              to="/dashboard/analytics"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 ${
                  isActive ? 'bg-blue-100 text-blue-700' : ''
                }`
              }
            >
              <BarChart2 className="w-5 h-5 mr-3" />
              Analytics
            </NavLink>
          </nav>
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="users" element={<UsersDashboard />} />
          <Route path="analytics" element={<AnalyticsDashboard />} />
          <Route path="/" element={<UsersDashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;