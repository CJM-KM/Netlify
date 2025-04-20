import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, SortAsc, SortDesc } from 'lucide-react';
import { motion } from 'framer-motion';

import ProductCard from '../components/ProductCard';
import { products } from '../data/mockData';
import { Product } from '../types';

type SortOption = 'name' | 'price-asc' | 'price-desc' | 'rating';
type FilterCategory = 'all' | 'wireless' | 'wired' | 'true-wireless' | 'noise-cancelling';

const ProductsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('rating');
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter and sort products when dependencies change
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      switch (sortOption) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
    
    setFilteredProducts(result);
  }, [searchQuery, sortOption, categoryFilter]);

  const clearFilters = () => {
    setSearchQuery('');
    setSortOption('rating');
    setCategoryFilter('all');
  };

  // Categorize products
  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'wireless', name: 'Wireless', count: products.filter(p => p.category === 'wireless').length },
    { id: 'wired', name: 'Wired', count: products.filter(p => p.category === 'wired').length },
    { id: 'true-wireless', name: 'True Wireless', count: products.filter(p => p.category === 'true-wireless').length },
    { id: 'noise-cancelling', name: 'Noise Cancelling', count: products.filter(p => p.category === 'noise-cancelling').length },
  ];

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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 fade-in">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Earphone Products</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Browse our collection of premium earphones and explore customer journey experiences.
        </p>
      </div>
      
      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="w-full lg:w-1/4">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow"
            >
              <div className="flex items-center">
                <Filter size={20} className="mr-2 text-gray-500" />
                <span>Filters</span>
              </div>
              <ChevronDown
                size={20}
                className={`transition-transform ${isMobileFilterOpen ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
          
          {/* Filter Sidebar - Desktop always visible, mobile conditional */}
          <div className={`${isMobileFilterOpen || 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="font-semibold text-lg mb-4">Categories</h2>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category.id}>
                    <button
                      onClick={() => setCategoryFilter(category.id as FilterCategory)}
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                        categoryFilter === category.id
                          ? 'bg-primary-50 text-primary-700'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h2 className="font-semibold text-lg mb-4">Sort By</h2>
                <div className="space-y-2">
                  <button
                    onClick={() => setSortOption('rating')}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center transition-colors ${
                      sortOption === 'rating' ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    <SortDesc size={16} className="mr-2" />
                    <span>Highest Rated</span>
                  </button>
                  <button
                    onClick={() => setSortOption('name')}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center transition-colors ${
                      sortOption === 'name' ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    <SortAsc size={16} className="mr-2" />
                    <span>Name (A-Z)</span>
                  </button>
                  <button
                    onClick={() => setSortOption('price-asc')}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center transition-colors ${
                      sortOption === 'price-asc' ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    <SortAsc size={16} className="mr-2" />
                    <span>Price: Low to High</span>
                  </button>
                  <button
                    onClick={() => setSortOption('price-desc')}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center transition-colors ${
                      sortOption === 'price-desc' ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    <SortDesc size={16} className="mr-2" />
                    <span>Price: High to Low</span>
                  </button>
                </div>
              </div>
              
              {(searchQuery || categoryFilter !== 'all' || sortOption !== 'rating') && (
                <div className="mt-6">
                  <button
                    onClick={clearFilters}
                    className="w-full py-2 text-sm text-primary-600 hover:text-primary-800 font-medium"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-3/4">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name, brand, or features..."
                className="input pl-12 pr-4 py-3 w-full shadow-sm"
              />
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            </div>
          </div>
          
          {/* Results Summary */}
          <div className="mb-6 flex flex-wrap items-center justify-between">
            <p className="text-gray-600">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              {categoryFilter !== 'all' && ` in ${categories.find(c => c.id === categoryFilter)?.name}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>
          
          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProducts.map((product) => (
                <motion.div key={product.id} variants={item}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-12 text-center">
              <h3 className="text-xl font-medium text-gray-900 mb-3">No products found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria to find what you're looking for.
              </p>
              <button
                onClick={clearFilters}
                className="btn btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;