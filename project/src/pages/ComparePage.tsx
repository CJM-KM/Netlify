import React, { useState } from 'react';
import { mockProducts, getAwarenessSourceData, getDecisionFactorData, getSatisfactionByBrand } from '../data/mockData';
import ProductCard from '../components/ui/ProductCard';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import BarChart from '../components/chart/BarChart';
import PieChart from '../components/chart/PieChart';
import JourneyMapChart from '../components/chart/JourneyMapChart';
import Button from '../components/ui/Button';

const ComparePage: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  
  const handleProductSelect = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      if (selectedProducts.length < 2) {
        setSelectedProducts([...selectedProducts, productId]);
      }
    }
  };
  
  const selectedProductsData = mockProducts.filter(product => 
    selectedProducts.includes(product.id)
  );
  
  // Mock journey data for visualization
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

  return (
    <div className="min-h-screen bg-gray-50 pt-8 md:pt-12 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare Earphones</h1>
          <p className="text-lg text-gray-600 mb-8">
            Select up to 2 products to compare customer experiences and journey data
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Product Selection */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold text-gray-800">Select Products</h2>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Select up to 2 products to compare their customer journeys
                  </p>
                  
                  <div className="space-y-2">
                    {mockProducts.map(product => (
                      <div 
                        key={product.id}
                        className={`
                          flex items-center p-3 rounded-md cursor-pointer transition-colors
                          ${selectedProducts.includes(product.id) 
                            ? 'bg-indigo-50 border border-indigo-200' 
                            : 'bg-white border border-gray-200 hover:bg-gray-50'
                          }
                        `}
                        onClick={() => handleProductSelect(product.id)}
                      >
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-md mr-3"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-500">{product.brand}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Comparison Data */}
            <div className="lg:col-span-9">
              {selectedProducts.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Select products to compare
                  </h3>
                  <p className="text-gray-600">
                    Choose up to 2 products from the left panel to see comparative journey data
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Selected Products */}
                  <Card>
                    <CardHeader>
                      <h2 className="text-lg font-semibold text-gray-800">Selected Products</h2>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedProductsData.map(product => (
                          <div 
                            key={product.id}
                            className="flex items-center p-4 bg-gray-50 rounded-lg"
                          >
                            <img 
                              src={product.imageUrl} 
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-md mr-4"
                            />
                            <div>
                              <h3 className="font-semibold text-gray-900">{product.name}</h3>
                              <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                              <div className="flex items-center">
                                <span className="text-yellow-500 mr-1">★</span>
                                <span className="text-gray-700">{product.averageRating.toFixed(1)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Customer Journey Map */}
                  <Card>
                    <CardHeader>
                      <h2 className="text-lg font-semibold text-gray-800">Customer Journey Map</h2>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        This chart shows how customers progress through different stages of their journey with each product
                      </p>
                      <JourneyMapChart 
                        data={journeyStagesData} 
                        title="Customer Journey Flow"
                        height={300}
                      />
                    </CardContent>
                  </Card>
                  
                  {/* Journey Insights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <h2 className="text-lg font-semibold text-gray-800">Awareness Sources</h2>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">
                          How customers first discovered these products
                        </p>
                        <PieChart 
                          data={getAwarenessSourceData()} 
                          height={250}
                        />
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <h2 className="text-lg font-semibold text-gray-800">Decision Factors</h2>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">
                          What ultimately led customers to choose these products
                        </p>
                        <BarChart 
                          data={getDecisionFactorData()} 
                          height={250}
                        />
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Brand Satisfaction */}
                  <Card>
                    <CardHeader>
                      <h2 className="text-lg font-semibold text-gray-800">Overall Brand Satisfaction</h2>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Average customer satisfaction ratings across brands
                      </p>
                      <BarChart 
                        data={getSatisfactionByBrand()} 
                        height={250}
                      />
                    </CardContent>
                  </Card>
                  
                  {/* CTA */}
                  <div className="flex justify-center mt-8">
                    <Button size="lg">
                      Add Your Journey
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;