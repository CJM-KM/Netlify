import React, { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { Menu, X, Home, Package, Users, BarChart2, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();
  
  // Redirect if not admin
  if (!user || !isAdmin()) {
    return <Navigate to="/login" replace />;
  }

  const sidebarItems = [
    { name: 'Dashboard', path: '/admin', icon: <Home size={20} /> },
    { name: 'Products', path: '/admin/products', icon: <Package size={20} /> },
    { name: 'Journeys', path: '/admin/journeys', icon: <Users size={20} /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <BarChart2 size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - large screens */}
      <motion.aside
        initial={{ width: isSidebarOpen ? 250 : 80 }}
        animate={{ width: isSidebarOpen ? 250 : 80 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed inset-y-0 left-0 z-50 bg-primary-800 text-white hidden md:block overflow-y-auto`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between">
            <Link to="/admin" className="flex items-center">
              {isSidebarOpen ? (
                <span className="text-xl font-bold">Admin Portal</span>
              ) : (
                <span className="text-xl font-bold">AP</span>
              )}
            </Link>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              <Menu size={24} />
            </button>
          </div>
          
          <nav className="mt-8">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-primary-700 text-white'
                        : 'text-gray-300 hover:bg-primary-700 hover:text-white'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {isSidebarOpen && <span>{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="mt-auto pt-6 border-t border-primary-700 mt-8">
            <button
              onClick={logout}
              className="flex items-center px-4 py-3 w-full text-left text-gray-300 hover:bg-primary-700 hover:text-white rounded-lg transition-colors"
            >
              <LogOut size={20} className="mr-3" />
              {isSidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </div>
      </motion.aside>
      
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 inset-x-0 z-50 bg-primary-800 text-white">
        <div className="flex items-center justify-between px-4 py-4">
          <Link to="/admin" className="text-xl font-bold">Admin Portal</Link>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white focus:outline-none"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile sidebar */}
      {isSidebarOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 md:hidden"
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={() => setIsSidebarOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64 bg-primary-800 text-white p-4">
            <div className="flex items-center justify-between mb-8">
              <Link to="/admin" className="text-xl font-bold">Admin Portal</Link>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-white hover:text-gray-300 focus:outline-none"
              >
                <X size={24} />
              </button>
            </div>
            
            <nav>
              <ul className="space-y-2">
                {sidebarItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                        location.pathname === item.path
                          ? 'bg-primary-700 text-white'
                          : 'text-gray-300 hover:bg-primary-700 hover:text-white'
                      }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="mt-auto pt-6 border-t border-primary-700 mt-8">
              <button
                onClick={logout}
                className="flex items-center px-4 py-3 w-full text-left text-gray-300 hover:bg-primary-700 hover:text-white rounded-lg transition-colors"
              >
                <LogOut size={20} className="mr-3" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 md:ml-${isSidebarOpen ? '64' : '20'} mt-16 md:mt-0`}>
        <div className="p-6 h-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;