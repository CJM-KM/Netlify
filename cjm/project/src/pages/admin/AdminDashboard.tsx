import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BarChart2, 
  Users, 
  Package, 
  TrendingUp, 
  Clock, 
  Star,
  PieChart,
  Calendar,
  ChevronRight
} from 'lucide-react';

import { journeys, products } from '../../data/mockData';
import JourneyStageChart from '../../components/JourneyStageChart';
import EmotionChart from '../../components/EmotionChart';

// Get the first product's analysis as a demo
import { productAnalyses } from '../../data/mockData';
const demoAnalysis = productAnalyses['1'] || null;

const AdminDashboard: React.FC = () => {
  // Calculate overview statistics
  const totalJourneys = journeys.length;
  const totalProducts = products.length;
  const completedJourneys = journeys.filter(j => j.completedAt).length;
  const completionRate = Math.round((completedJourneys / totalJourneys) * 100);
  const totalUsers = new Set(journeys.map(j => j.userId)).size;
  
  // Calculate average rating across all journeys
  const allRatings = journeys.flatMap(journey => 
    journey.stages.map(stage => stage.rating)
  );
  const avgRating = allRatings.length 
    ? (allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length).toFixed(1)
    : 'N/A';
  
  // Recent journeys
  const recentJourneys = [...journeys]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  
  // Animation variants for staggered animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to the Earphones Journey Mapping admin portal.</p>
      </div>
      
      {/* Overview Stats */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <motion.div variants={item} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
              <BarChart2 size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Journeys</p>
              <p className="text-2xl font-bold">{totalJourneys}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={item} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-2xl font-bold">{totalUsers}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={item} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <Package size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Products</p>
              <p className="text-2xl font-bold">{totalProducts}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={item} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
              <Star size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Rating</p>
              <p className="text-2xl font-bold">{avgRating}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Middle Section - Journey Completion and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Journey Completion Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 lg:col-span-1"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-gray-800">Completion Rate</h2>
            <Clock size={20} className="text-gray-400" />
          </div>
          
          <div className="flex flex-col items-center">
            <div className="relative h-40 w-40">
              <svg className="h-full w-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#eee"
                  strokeWidth="3"
                  strokeDasharray="100, 100"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={completionRate > 75 ? "#10B981" : completionRate > 50 ? "#F59E0B" : "#EF4444"}
                  strokeWidth="3"
                  strokeDasharray={`${completionRate}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-bold">{completionRate}%</span>
                <span className="text-sm text-gray-500">completion</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full mt-6">
              <div className="text-center">
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-xl font-semibold">{completedJourneys}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">In Progress</p>
                <p className="text-xl font-semibold">{totalJourneys - completedJourneys}</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-gray-800">Recent Journeys</h2>
            <Calendar size={20} className="text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {recentJourneys.map((journey) => (
              <div key={journey.id} className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-start">
                  <div className="bg-gray-100 rounded-full h-10 w-10 flex items-center justify-center font-medium text-gray-700 mr-3">
                    {journey.userName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{journey.userName}</p>
                    <p className="text-sm text-gray-500">{journey.productName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-medium inline-block px-2 py-1 rounded-full ${
                    journey.completedAt 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {journey.completedAt ? 'Completed' : 'In Progress'}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(journey.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-right">
            <Link 
              to="/admin/journeys" 
              className="text-primary-600 hover:text-primary-800 text-sm font-medium inline-flex items-center"
            >
              View All Journeys
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Analytics Charts */}
      {demoAnalysis && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-gray-800">Journey Stage Analysis</h2>
              <TrendingUp size={20} className="text-gray-400" />
            </div>
            <div className="h-64">
              <JourneyStageChart analysis={demoAnalysis.stageAnalysis} />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-gray-800">Customer Emotions</h2>
              <PieChart size={20} className="text-gray-400" />
            </div>
            <div className="h-64">
              <EmotionChart analysis={demoAnalysis.stageAnalysis} />
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h2 className="font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/admin/products" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors">
            <div className="p-2 rounded-full bg-primary-100 text-primary-600 mr-3">
              <Package size={18} />
            </div>
            <span>Manage Products</span>
          </Link>
          <Link to="/admin/journeys" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors">
            <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
              <BarChart2 size={18} />
            </div>
            <span>View Journeys</span>
          </Link>
          <Link to="/admin/analytics" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors">
            <div className="p-2 rounded-full bg-purple-100 text-purple-600 mr-3">
              <TrendingUp size={18} />
            </div>
            <span>Analytics</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;