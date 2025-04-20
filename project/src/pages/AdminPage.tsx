import React, { useState } from 'react';
import { BarChart3, Users, TrendingUp, Search } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import PieChart from '../components/chart/PieChart';
import BarChart from '../components/chart/BarChart';
import JourneyMapChart from '../components/chart/JourneyMapChart';
import Button from '../components/ui/Button';
import { mockJourneys, mockProducts, getSatisfactionByBrand, getAwarenessSourceData, getDecisionFactorData } from '../data/mockData';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'journeys' | 'products' | 'reports'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter journeys based on search query
  const filteredJourneys = mockJourneys.filter(journey => {
    const product = mockProducts.find(p => p.id === journey.productId);
    return product?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           product?.brand.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  // Mock journey stages data for chart
  const journeyStagesData = [
    { 
      name: 'Awareness', 
      apple: 85, 
      sony: 70, 
      bose: 60, 
      sennheiser: 40 
    },
    { 
      name: 'Consideration', 
      apple: 75, 
      sony: 80, 
      bose: 65, 
      sennheiser: 50 
    },
    { 
      name: 'Purchase', 
      apple: 65, 
      sony: 60, 
      bose: 50, 
      sennheiser: 30 
    },
    { 
      name: 'Post-Purchase', 
      apple: 60, 
      sony: 55, 
      bose: 45, 
      sennheiser: 25 
    },
    { 
      name: 'Support', 
      apple: 30, 
      sony: 25, 
      bose: 20, 
      sennheiser: 15 
    },
  ];
  
  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-indigo-900 to-indigo-700 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">Total Journeys</h3>
              <div className="p-2 bg-white/20 rounded-lg">
                <Users size={20} className="text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold">{mockJourneys.length}</div>
            <div className="text-indigo-200 text-sm mt-2">
              <span className="font-medium text-green-300">↑ 12%</span> from last month
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-coral-500 to-coral-400 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">Avg. Satisfaction</h3>
              <div className="p-2 bg-white/20 rounded-lg">
                <TrendingUp size={20} className="text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold">4.6</div>
            <div className="text-coral-200 text-sm mt-2">
              <span className="font-medium text-green-300">↑ 0.3</span> from last month
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-600 to-green-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">Products</h3>
              <div className="p-2 bg-white/20 rounded-lg">
                <Headphones size={20} className="text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold">{mockProducts.length}</div>
            <div className="text-green-200 text-sm mt-2">
              <span className="font-medium text-green-300">+2</span> new this month
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-gray-700 to-gray-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">Brands</h3>
              <div className="p-2 bg-white/20 rounded-lg">
                <PieChart size={20} className="text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold">4</div>
            <div className="text-gray-300 text-sm mt-2">
              Out of target 10 brands
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Journey Map Chart */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">Customer Journey Map</h2>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Overview of customer journey stages by brand
          </p>
          <JourneyMapChart 
            data={journeyStagesData} 
            height={300}
          />
        </CardContent>
      </Card>
      
      {/* Insight Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">Brand Satisfaction</h2>
          </CardHeader>
          <CardContent>
            <BarChart 
              data={getSatisfactionByBrand()} 
              height={300}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">Customer Acquisition Channels</h2>
          </CardHeader>
          <CardContent>
            <PieChart 
              data={getAwarenessSourceData()} 
              height={300}
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Journeys */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Recent Journeys</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setActiveTab('journeys')}
          >
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Satisfaction
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockJourneys.slice(0, 5).map((journey) => {
                  const product = mockProducts.find(p => p.id === journey.productId);
                  const date = new Date(journey.createdAt).toLocaleDateString();
                  
                  return (
                    <tr key={journey.id}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{product?.name}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-gray-600">{product?.brand}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-gray-600">{date}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`
                            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${journey.overallSatisfaction >= 4 ? 'bg-green-100 text-green-800' : 
                              journey.overallSatisfaction >= 3 ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'}
                          `}>
                            {journey.overallSatisfaction.toFixed(1)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  
  const renderJourneysTab = () => (
    <div>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center space-y-3 md:space-y-0">
            <h2 className="text-lg font-semibold text-gray-800">All Customer Journeys</h2>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full"
                placeholder="Search journeys..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stages Completed
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Satisfaction
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJourneys.map((journey) => {
                  const product = mockProducts.find(p => p.id === journey.productId);
                  const date = new Date(journey.createdAt).toLocaleDateString();
                  const completedStages = journey.stages.filter(stage => stage.completed).length;
                  
                  return (
                    <tr key={journey.id}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{product?.name}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-gray-600">{product?.brand}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-gray-600">{date}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-gray-600">{completedStages} of 5</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`
                            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${journey.overallSatisfaction >= 4 ? 'bg-green-100 text-green-800' : 
                              journey.overallSatisfaction >= 3 ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'}
                          `}>
                            {journey.overallSatisfaction.toFixed(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button variant="text" size="sm">View</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  
  const renderProductsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Product Performance</h2>
          <Button variant="outline" size="sm">
            Add Product
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Journeys
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockProducts.map((product) => {
                  const journeyCount = mockJourneys.filter(j => j.productId === product.id).length;
                  
                  return (
                    <tr key={product.id}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 mr-3">
                            <img className="h-10 w-10 rounded-md object-cover" src={product.imageUrl} alt="" />
                          </div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-gray-600">{product.brand}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-gray-600">{product.type}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-gray-600">${product.price}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span>{product.averageRating.toFixed(1)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-gray-600">{journeyCount}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <Button variant="text" size="sm">View</Button>
                          <Button variant="text" size="sm">Edit</Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Product Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">Decision Factors</h2>
          </CardHeader>
          <CardContent>
            <BarChart 
              data={getDecisionFactorData()} 
              height={300}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">Satisfaction by Brand</h2>
          </CardHeader>
          <CardContent>
            <BarChart 
              data={getSatisfactionByBrand()} 
              height={300}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
  
  const renderReportsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">Generated Reports</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">Monthly Journey Summary</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">PDF</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Summary of all customer journeys from the past month
              </p>
              <Button variant="outline" size="sm">Download</Button>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">Brand Comparison</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">PDF</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Detailed comparison between top earphone brands
              </p>
              <Button variant="outline" size="sm">Download</Button>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">User Satisfaction Trends</h3>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">XLS</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Trends in customer satisfaction over the past 6 months
              </p>
              <Button variant="outline" size="sm">Download</Button>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">Customer Pain Points</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">PDF</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Analysis of common customer complaints and issues
              </p>
              <Button variant="outline" size="sm">Download</Button>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">Customer Acquisition</h3>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">XLS</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Data on how customers discover different products
              </p>
              <Button variant="outline" size="sm">Download</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">Generate New Report</h2>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Report Type
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                <option>Brand Comparison</option>
                <option>Customer Journey Analysis</option>
                <option>Satisfaction Trends</option>
                <option>Product Performance</option>
                <option>Support Quality Analysis</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="date" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <input 
                  type="date" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brands to Include
              </label>
              <div className="space-y-2">
                {['Apple', 'Sony', 'Bose', 'Sennheiser'].map((brand) => (
                  <label key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      defaultChecked
                    />
                    <span className="ml-2 text-sm text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Format
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="format"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    defaultChecked
                  />
                  <span className="ml-2 text-sm text-gray-700">PDF</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="format"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Excel</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="format"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">CSV</span>
                </label>
              </div>
            </div>
            
            <div className="pt-2">
              <Button variant="primary">
                Generate Report
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-8 md:pt-12 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-lg text-gray-600">
                Analyze and manage customer journey data
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex overflow-x-auto">
                <button
                  className={`px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 ${
                    activeTab === 'overview'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('overview')}
                >
                  <BarChart3 size={16} className="inline-block mr-1" />
                  Overview
                </button>
                <button
                  className={`px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 ${
                    activeTab === 'journeys'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('journeys')}
                >
                  <Users size={16} className="inline-block mr-1" />
                  Journeys
                </button>
                <button
                  className={`px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 ${
                    activeTab === 'products'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('products')}
                >
                  <Headphones size={16} className="inline-block mr-1" />
                  Products
                </button>
                <button
                  className={`px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 ${
                    activeTab === 'reports'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('reports')}
                >
                  <PieChart size={16} className="inline-block mr-1" />
                  Reports
                </button>
              </nav>
            </div>
          </div>
          
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'journeys' && renderJourneysTab()}
          {activeTab === 'products' && renderProductsTab()}
          {activeTab === 'reports' && renderReportsTab()}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;