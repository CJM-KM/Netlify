import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Star, MessageCircle, Activity, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

import JourneyStageChart from '../components/JourneyStageChart';
import EmotionChart from '../components/EmotionChart';
import { products, journeys, productAnalyses } from '../data/mockData';
import { Product, Journey } from '../types';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [productJourneys, setProductJourneys] = useState<Journey[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'journeys' | 'analytics'>('overview');

  useEffect(() => {
    // Simulate API call to fetch product data
    setTimeout(() => {
      const foundProduct = products.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Get journeys for this product
        const relatedJourneys = journeys.filter(j => j.productId === id);
        setProductJourneys(relatedJourneys);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-gray-300 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div>
              <div className="h-8 w-48 bg-gray-300 rounded mb-4"></div>
              <div className="h-6 w-24 bg-gray-300 rounded mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-error-50 border border-error-200 rounded-lg p-6 max-w-md mx-auto text-center">
          <h2 className="text-xl font-semibold text-error-700 mb-2">Product Not Found</h2>
          <p className="text-error-600 mb-4">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products" className="btn btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center text-sm text-gray-500">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to="/products" className="hover:text-primary-600">Products</Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-700">{product.name}</span>
        </div>
      </div>

      {/* Product Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="aspect-square overflow-hidden rounded-xl shadow-md bg-white"
        >
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary-600 font-semibold">{product.brand}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={20} 
                  className={`${i < Math.round(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">{product.rating.toFixed(1)}</span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-600">{productJourneys.length} customer journeys</span>
          </div>

          <p className="text-xl font-semibold text-gray-900 mb-6">${product.price.toFixed(2)}</p>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-primary-500">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-x-4">
            <button className="btn btn-primary">
              Create Journey
            </button>
            <Link to={`/products`} className="btn btn-outline">
              Back to Products
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="mb-8 border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {['overview', 'journeys', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab as any)}
              className={`px-6 py-4 font-medium text-sm focus:outline-none whitespace-nowrap ${
                selectedTab === tab 
                  ? 'border-b-2 border-primary-600 text-primary-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mb-12">
        {selectedTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Product Overview</h2>
              <p className="text-gray-700 mb-4">
                {product.description} The {product.name} by {product.brand} offers an exceptional audio experience with its premium features and thoughtful design.
              </p>
              <p className="text-gray-700">
                This {product.category.replace('-', ' ')} earphone provides users with unparalleled sound quality, comfort, and durability for everyday use.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Journey Highlights</h2>
              {productJourneys.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-sm text-gray-500">Average Rating</span>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={`${i < Math.round(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 font-medium">{product.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500">Total Journeys</span>
                      <span className="font-medium text-lg">{productJourneys.length}</span>
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500">Completed</span>
                      <span className="font-medium text-lg">
                        {productJourneys.filter(j => j.completedAt).length}
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <span className="block text-sm text-gray-500 mb-2">Recent Journeys</span>
                    {productJourneys.slice(0, 3).map((journey) => (
                      <Link 
                        key={journey.id}
                        to={`/journey/${journey.id}`}
                        className="block p-3 hover:bg-gray-50 rounded-lg transition-colors mb-2"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">{journey.userName}</span>
                            <span className="text-xs text-gray-500 block">
                              {new Date(journey.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {journey.stages.length} stages
                          </div>
                        </div>
                      </Link>
                    ))}
                    
                    <Link 
                      to="#" 
                      className="text-primary-600 font-medium text-sm flex items-center hover:text-primary-700 mt-2"
                    >
                      <PlusCircle size={16} className="mr-1" />
                      Start Your Journey
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <MessageCircle size={40} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-600 mb-4">No journeys have been created for this product yet.</p>
                  <button className="btn btn-primary">Be the First to Add a Journey</button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {selectedTab === 'journeys' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Customer Journeys</h2>
                <button className="btn btn-primary text-sm">Create Journey</button>
              </div>
              
              {productJourneys.length > 0 ? (
                <div className="space-y-6">
                  {productJourneys.map((journey) => (
                    <div key={journey.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-lg">{journey.userName}'s Journey</h3>
                          <p className="text-sm text-gray-500">
                            Created: {new Date(journey.createdAt).toLocaleDateString()}
                            {journey.completedAt && ` • Completed: ${new Date(journey.completedAt).toLocaleDateString()}`}
                          </p>
                        </div>
                        <div>
                          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">
                            {journey.stages.length} stages
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-5 gap-2">
                        {['awareness', 'consideration', 'purchase', 'post-purchase', 'support'].map((stage) => {
                          const stageData = journey.stages.find(s => s.stage === stage);
                          return (
                            <div
                              key={stage}
                              className={`h-2 rounded-full ${
                                stageData 
                                  ? stageData.emotion === 'positive' 
                                    ? 'bg-success-500' 
                                    : stageData.emotion === 'negative' 
                                      ? 'bg-error-500' 
                                      : 'bg-gray-400'
                                  : 'bg-gray-200'
                              }`}
                            ></div>
                          );
                        })}
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <Link to={`/journey/${journey.id}`} className="text-primary-600 hover:text-primary-800 font-medium text-sm">
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Activity size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Journeys Yet</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Be the first to document your experience with this product and help others make informed decisions.
                  </p>
                  <button className="btn btn-primary">Create a Journey</button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {selectedTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {productAnalyses[product.id] ? (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col">
                    <h3 className="font-medium text-gray-500 mb-2">Total Journeys</h3>
                    <p className="text-3xl font-bold">{productAnalyses[product.id].totalJourneys}</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col">
                    <h3 className="font-medium text-gray-500 mb-2">Average Rating</h3>
                    <div className="flex items-center">
                      <p className="text-3xl font-bold">{productAnalyses[product.id].averageRating.toFixed(1)}</p>
                      <div className="flex ml-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={`${i < Math.round(productAnalyses[product.id].averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col">
                    <h3 className="font-medium text-gray-500 mb-2">Positive Experiences</h3>
                    <p className="text-3xl font-bold text-success-500">
                      {Object.values(productAnalyses[product.id].stageAnalysis).reduce((sum, stage) => sum + stage.positivePercentage, 0) / 5}%
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="font-medium text-lg mb-4">Stage Ratings</h3>
                    <div className="h-80">
                      <JourneyStageChart analysis={productAnalyses[product.id].stageAnalysis} />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="font-medium text-lg mb-4">Emotional Response</h3>
                    <div className="h-80">
                      <EmotionChart analysis={productAnalyses[product.id].stageAnalysis} />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="font-medium text-lg mb-6">Customer Touchpoints</h3>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {Object.values(productAnalyses[product.id].stageAnalysis).map((stageData) => (
                      <div key={stageData.stage}>
                        <h4 className="text-sm font-medium uppercase text-gray-500 mb-3">
                          {stageData.stage.replace('-', ' ')}
                        </h4>
                        <ul className="space-y-2">
                          {stageData.commonTouchpoints.map((touchpoint) => (
                            <li key={touchpoint.name} className="flex justify-between text-sm">
                              <span className="text-gray-700">{touchpoint.name}</span>
                              <span className="text-gray-500">{touchpoint.count}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <Activity size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Analytics Not Available</h3>
                <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                  There isn't enough journey data available yet to generate meaningful analytics for this product.
                </p>
                <button className="btn btn-primary">Create a Journey</button>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4).map((relatedProduct) => (
            <motion.div
              key={relatedProduct.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="card overflow-hidden"
            >
              <div className="h-40 overflow-hidden">
                <img 
                  src={relatedProduct.imageUrl} 
                  alt={relatedProduct.name} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">{relatedProduct.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-900 font-semibold">${relatedProduct.price.toFixed(2)}</span>
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm">{relatedProduct.rating.toFixed(1)}</span>
                  </div>
                </div>
                <Link 
                  to={`/products/${relatedProduct.id}`}
                  className="mt-3 text-sm text-primary-600 hover:text-primary-800 font-medium block"
                >
                  View Product
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;