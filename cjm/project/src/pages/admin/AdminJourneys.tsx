import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Filter, 
  Download, 
  Trash2,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { journeys } from '../../data/mockData';
import { Journey, JourneyStage } from '../../types';

const AdminJourneys: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'createdAt' | 'userName' | 'productName' | 'stages'>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filteredJourneys, setFilteredJourneys] = useState<Journey[]>([]);
  const [selectedJourneys, setSelectedJourneys] = useState<string[]>([]);
  const [expandedJourney, setExpandedJourney] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'in-progress'>('all');
  const [productFilter, setProductFilter] = useState<string>('all');

  // Get unique product names for filter
  const productOptions = ['all', ...new Set(journeys.map(journey => journey.productName))];

  // Filter and sort journeys
  useEffect(() => {
    let filtered = [...journeys];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(journey => 
        journey.userName.toLowerCase().includes(query) ||
        journey.productName.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (statusFilter === 'completed') {
      filtered = filtered.filter(journey => journey.completedAt !== null);
    } else if (statusFilter === 'in-progress') {
      filtered = filtered.filter(journey => journey.completedAt === null);
    }
    
    // Apply product filter
    if (productFilter !== 'all') {
      filtered = filtered.filter(journey => journey.productName === productFilter);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'userName':
          comparison = a.userName.localeCompare(b.userName);
          break;
        case 'productName':
          comparison = a.productName.localeCompare(b.productName);
          break;
        case 'stages':
          comparison = a.stages.length - b.stages.length;
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    setFilteredJourneys(filtered);
  }, [searchQuery, sortField, sortDirection, statusFilter, productFilter]);

  // Handle sort toggle
  const handleSort = (field: 'createdAt' | 'userName' | 'productName' | 'stages') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Toggle journey selection
  const toggleJourneySelection = (journeyId: string) => {
    if (selectedJourneys.includes(journeyId)) {
      setSelectedJourneys(selectedJourneys.filter(id => id !== journeyId));
    } else {
      setSelectedJourneys([...selectedJourneys, journeyId]);
    }
  };

  // Toggle all journeys selection
  const toggleAllSelection = () => {
    if (selectedJourneys.length === filteredJourneys.length) {
      setSelectedJourneys([]);
    } else {
      setSelectedJourneys(filteredJourneys.map(journey => journey.id));
    }
  };

  // Toggle journey expansion
  const toggleJourneyExpansion = (journeyId: string) => {
    setExpandedJourney(expandedJourney === journeyId ? null : journeyId);
  };

  // Get stage color
  const getStageColor = (stage: JourneyStage) => {
    switch(stage) {
      case 'awareness': return 'bg-blue-500';
      case 'consideration': return 'bg-purple-500';
      case 'purchase': return 'bg-green-500';
      case 'post-purchase': return 'bg-yellow-500';
      case 'support': return 'bg-orange-500';
      default: return 'bg-gray-400';
    }
  };

  // Delete selected journeys
  const deleteSelectedJourneys = () => {
    // In a real app, you would call an API to delete the journeys
    alert(`Deleting journeys: ${selectedJourneys.join(', ')}`);
    setSelectedJourneys([]);
  };

  // Export selected journeys
  const exportSelectedJourneys = () => {
    // In a real app, you would generate and download a file
    alert(`Exporting journeys: ${selectedJourneys.join(', ')}`);
  };

  return (
    <div className="fade-in">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Customer Journeys</h1>
        <div className="flex space-x-3">
          <button
            onClick={exportSelectedJourneys}
            disabled={selectedJourneys.length === 0}
            className={`btn ${
              selectedJourneys.length > 0 
                ? 'btn-outline' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            } text-sm px-3 py-2 flex items-center`}
          >
            <Download size={16} className="mr-1" />
            Export
          </button>
          <button
            onClick={deleteSelectedJourneys}
            disabled={selectedJourneys.length === 0}
            className={`btn ${
              selectedJourneys.length > 0 
                ? 'bg-error-100 text-error-600 hover:bg-error-200 border-error-200' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            } text-sm px-3 py-2 flex items-center`}
          >
            <Trash2 size={16} className="mr-1" />
            Delete
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search journeys..."
                className="input pl-10"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            </div>
          </div>
          
          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="input"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
            </select>
          </div>
          
          {/* Product Filter */}
          <div>
            <select
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
              className="input"
            >
              <option value="all">All Products</option>
              {productOptions.filter(p => p !== 'all').map(product => (
                <option key={product} value={product}>{product}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Journeys Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                  <input
                    type="checkbox"
                    checked={selectedJourneys.length === filteredJourneys.length && filteredJourneys.length > 0}
                    onChange={toggleAllSelection}
                    className="rounded text-primary-600 focus:ring-primary-500 h-4 w-4"
                  />
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('userName')}
                >
                  <div className="flex items-center">
                    Customer
                    {sortField === 'userName' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('productName')}
                >
                  <div className="flex items-center">
                    Product
                    {sortField === 'productName' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('stages')}
                >
                  <div className="flex items-center">
                    Stages
                    {sortField === 'stages' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center">
                    Date
                    {sortField === 'createdAt' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredJourneys.length > 0 ? (
                filteredJourneys.map((journey) => (
                  <React.Fragment key={journey.id}>
                    <tr 
                      className={`${
                        selectedJourneys.includes(journey.id) ? 'bg-primary-50' : ''
                      } hover:bg-gray-50 transition-colors`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedJourneys.includes(journey.id)}
                          onChange={() => toggleJourneySelection(journey.id)}
                          className="rounded text-primary-600 focus:ring-primary-500 h-4 w-4"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{journey.userName}</div>
                        <div className="text-sm text-gray-500">ID: {journey.userId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span>{journey.productName}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-1">
                          {['awareness', 'consideration', 'purchase', 'post-purchase', 'support'].map((stage) => {
                            const hasStage = journey.stages.some(s => s.stage === stage);
                            return (
                              <div 
                                key={stage} 
                                className={`h-2 w-4 rounded-full ${hasStage ? getStageColor(stage as JourneyStage) : 'bg-gray-200'}`}
                              ></div>
                            );
                          })}
                          <span className="ml-2 text-sm text-gray-600">{journey.stages.length}/5</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(journey.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          journey.completedAt 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {journey.completedAt ? 'Completed' : 'In Progress'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link 
                            to={`/journey/${journey.id}`} 
                            className="text-primary-600 hover:text-primary-900"
                          >
                            <Eye size={18} />
                          </Link>
                          <button 
                            onClick={() => toggleJourneyExpansion(journey.id)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            {expandedJourney === journey.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Expanded Journey Details */}
                    {expandedJourney === journey.id && (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 bg-gray-50">
                          <div className="text-sm">
                            <h4 className="font-medium text-gray-900 mb-2">Journey Stages</h4>
                            <div className="space-y-3">
                              {journey.stages.map((stage) => (
                                <div key={stage.id} className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-gray-200">
                                  <div>
                                    <span className={`inline-block w-3 h-3 rounded-full ${getStageColor(stage.stage)} mr-2`}></span>
                                    <span className="font-medium">
                                      {stage.stage.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </span>
                                    <span className="ml-2 text-xs text-gray-500">
                                      {new Date(stage.date).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <div className="mt-1 sm:mt-0 flex items-center">
                                    <div className="flex mr-3">
                                      {[...Array(5)].map((_, i) => (
                                        <span 
                                          key={i} 
                                          className={`text-sm ${i < stage.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                        >
                                          ★
                                        </span>
                                      ))}
                                    </div>
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                      stage.emotion === 'positive' 
                                        ? 'bg-green-100 text-green-800' 
                                        : stage.emotion === 'negative' 
                                          ? 'bg-red-100 text-red-800' 
                                          : 'bg-gray-100 text-gray-800'
                                    }`}>
                                      {stage.emotion}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                    <Filter size={24} className="mx-auto mb-3 text-gray-300" />
                    No journeys match your current filters. Try adjusting your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminJourneys;