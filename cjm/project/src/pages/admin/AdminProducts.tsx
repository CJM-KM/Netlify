import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PlusCircle, 
  Search, 
  Edit, 
  Trash2, 
  ChevronDown, 
  ChevronUp,
  Star,
  BarChart2,
  Filter,
  Download,
  Eye,
  Users,
  SortAsc,
  SortDesc
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { products, journeys } from '../../data/mockData';
import { Product } from '../../types';

const AdminProducts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'name' | 'brand' | 'rating' | 'price'>('rating');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Get unique categories for filter
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Calculate journey counts for each product
  const productJourneyCounts = products.reduce((acc, product) => {
    acc[product.id] = journeys.filter(journey => journey.productId === product.id).length;
    return acc;
  }, {} as Record<string, number>);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'brand':
          comparison = a.brand.localeCompare(b.brand);
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    setFilteredProducts(filtered);
  }, [searchQuery, sortField, sortDirection, categoryFilter]);

  // Handle sort toggle
  const handleSort = (field: 'name' | 'brand' | 'rating' | 'price') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Toggle product selection
  const toggleProductSelection = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  // Toggle all products selection
  const toggleAllSelection = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(product => product.id));
    }
  };

  // Toggle product expansion
  const toggleProductExpansion = (productId: string) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  // Format category name for display
  const formatCategoryName = (category: string) => {
    return category.replace('-', ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  // Delete selected products
  const deleteSelectedProducts = () => {
    // In a real app, you would call an API to delete the products
    alert(`Deleting products: ${selectedProducts.join(', ')}`);
    setSelectedProducts([]);
  };

  // Export selected products
  const exportSelectedProducts = () => {
    // In a real app, you would generate and download a file
    alert(`Exporting products: ${selectedProducts.join(', ')}`);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="fade-in">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary text-sm px-3 py-2 flex items-center"
          >
            <PlusCircle size={16} className="mr-1" />
            Add Product
          </button>
          <button
            onClick={exportSelectedProducts}
            disabled={selectedProducts.length === 0}
            className={`btn ${
              selectedProducts.length > 0 
                ? 'btn-outline' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            } text-sm px-3 py-2 flex items-center`}
          >
            <Download size={16} className="mr-1" />
            Export
          </button>
          <button
            onClick={deleteSelectedProducts}
            disabled={selectedProducts.length === 0}
            className={`btn ${
              selectedProducts.length > 0 
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
                placeholder="Search products by name, brand, or description..."
                className="input pl-10"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            </div>
          </div>
          
          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="input"
            >
              <option value="all">All Categories</option>
              {categories.filter(cat => cat !== 'all').map(category => (
                <option key={category} value={category}>
                  {formatCategoryName(category)}
                </option>
              ))}
            </select>
          </div>
          
          {/* Sort Filter */}
          <div>
            <select
              value={`${sortField}-${sortDirection}`}
              onChange={(e) => {
                const [field, direction] = e.target.value.split('-');
                setSortField(field as any);
                setSortDirection(direction as 'asc' | 'desc');
              }}
              className="input"
            >
              <option value="rating-desc">Highest Rated</option>
              <option value="rating-asc">Lowest Rated</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={toggleAllSelection}
                    className="rounded text-primary-600 focus:ring-primary-500 h-4 w-4"
                  />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('brand')}
                >
                  <div className="flex items-center">
                    Brand
                    {sortField === 'brand' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center">
                    Price
                    {sortField === 'price' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('rating')}
                >
                  <div className="flex items-center">
                    Rating
                    {sortField === 'rating' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Journeys
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <React.Fragment key={product.id}>
                    <tr 
                      className={`${
                        selectedProducts.includes(product.id) ? 'bg-primary-50' : ''
                      } hover:bg-gray-50 transition-colors`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => toggleProductSelection(product.id)}
                          className="rounded text-primary-600 focus:ring-primary-500 h-4 w-4"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                            <img 
                              src={product.imageUrl} 
                              alt={product.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{product.description.substring(0, 50)}...</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span>{product.brand}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                          {formatCategoryName(product.category)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                className={`${i < Math.round(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="ml-1 text-sm text-gray-600">{product.rating.toFixed(1)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Users size={16} className="mr-1 text-primary-500" />
                          <span>{productJourneyCounts[product.id] || 0}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link 
                            to={`/products/${product.id}`} 
                            className="text-primary-600 hover:text-primary-900"
                          >
                            <Eye size={18} />
                          </Link>
                          <button 
                            onClick={() => alert(`Edit product: ${product.id}`)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => toggleProductExpansion(product.id)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            {expandedProduct === product.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Expanded Product Details */}
                    {expandedProduct === product.id && (
                      <tr>
                        <td colSpan={8} className="px-6 py-4 bg-gray-50">
                          <div className="text-sm">
                            <h4 className="font-medium text-gray-900 mb-4">Product Details</h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h5 className="font-medium text-gray-700 mb-2">Description</h5>
                                <p className="text-gray-600 mb-4">{product.description}</p>
                                
                                <h5 className="font-medium text-gray-700 mb-2">Features</h5>
                                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                                  {product.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <h5 className="font-medium text-gray-700 mb-2">Stats</h5>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="bg-white p-3 rounded-lg shadow-sm">
                                    <span className="text-xs text-gray-500 block">Total Journeys</span>
                                    <div className="flex items-center">
                                      <BarChart2 size={16} className="text-primary-500 mr-1" />
                                      <span className="font-medium">{productJourneyCounts[product.id] || 0}</span>
                                    </div>
                                  </div>
                                  <div className="bg-white p-3 rounded-lg shadow-sm">
                                    <span className="text-xs text-gray-500 block">Average Rating</span>
                                    <div className="flex items-center">
                                      <Star size={16} className="text-yellow-400 fill-current mr-1" />
                                      <span className="font-medium">{product.rating.toFixed(1)}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="mt-4">
                                  <h5 className="font-medium text-gray-700 mb-2">Actions</h5>
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => alert(`Edit product: ${product.id}`)}
                                      className="btn btn-outline text-xs py-1 px-3"
                                    >
                                      Edit Details
                                    </button>
                                    <Link
                                      to={`/admin/analytics?product=${product.id}`}
                                      className="btn btn-outline text-xs py-1 px-3"
                                    >
                                      View Analytics
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-gray-500">
                    <Filter size={24} className="mx-auto mb-3 text-gray-300" />
                    No products match your current filters. Try adjusting your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Stats Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="font-medium text-gray-700 mb-4">Category Breakdown</h3>
          <div className="space-y-3">
            {categories.filter(cat => cat !== 'all').map(category => {
              const count = products.filter(p => p.category === category).length;
              const percentage = Math.round((count / products.length) * 100);
              
              return (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-sm">{formatCategoryName(category)}</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
        
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="font-medium text-gray-700 mb-4">Top Rated Products</h3>
          <div className="space-y-3">
            {[...products]
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 5)
              .map(product => (
                <div key={product.id} className="flex items-center justify-between">
                  <span className="text-sm truncate max-w-[150px]">{product.name}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={`${i < Math.round(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
        
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="font-medium text-gray-700 mb-4">Price Range</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Min: ${Math.min(...products.map(p => p.price)).toFixed(2)}</span>
                <span>Max: ${Math.max(...products.map(p => p.price)).toFixed(2)}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                {products.map((product, index) => {
                  const min = Math.min(...products.map(p => p.price));
                  const max = Math.max(...products.map(p => p.price));
                  const position = ((product.price - min) / (max - min)) * 100;
                  
                  return (
                    <div
                      key={product.id}
                      className="w-1.5 h-1.5 rounded-full bg-primary-600 absolute mt-0.25"
                      style={{ left: `calc(${position}% + 0.75rem)` }}
                    ></div>
                  );
                })}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="text-xs text-gray-500 mb-1">Average Price</h4>
                <p className="font-medium">
                  ${(products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)}
                </p>
              </div>
              <div>
                <h4 className="text-xs text-gray-500 mb-1">Median Price</h4>
                <p className="font-medium">
                  ${products.map(p => p.price).sort((a, b) => a - b)[Math.floor(products.length / 2)].toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="font-medium text-gray-700 mb-4">Journey Engagement</h3>
          <div className="space-y-3">
            {Object.entries(productJourneyCounts)
              .sort(([, countA], [, countB]) => countB - countA)
              .slice(0, 5)
              .map(([productId, count]) => {
                const product = products.find(p => p.id === productId);
                if (!product) return null;
                
                return (
                  <div key={productId} className="flex items-center justify-between">
                    <span className="text-sm truncate max-w-[150px]">{product.name}</span>
                    <div className="flex items-center text-primary-600">
                      <Users size={14} className="mr-1" />
                      <span>{count}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminProducts;