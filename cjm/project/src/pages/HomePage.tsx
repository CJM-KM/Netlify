import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Headphones, BarChart2, Users, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

import { journeys, products } from '../data/mockData';

const HomePage: React.FC = () => {
  // Calculate statistics for the hero section
  const totalJourneys = journeys.length;
  const totalProducts = products.length;
  const totalUsers = new Set(journeys.map(journey => journey.userId)).size;
  const avgRating = journeys.reduce((sum, journey) => {
    const stageRatings = journey.stages.map(stage => stage.rating);
    const journeyAvg = stageRatings.length ? stageRatings.reduce((a, b) => a + b, 0) / stageRatings.length : 0;
    return sum + journeyAvg;
  }, 0) / (totalJourneys || 1);

  // Animation variants
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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white py-20 md:py-28">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-pattern"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Map and Improve Your Earphone Customer Experience
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-100 mb-8 max-w-3xl mx-auto"
            >
              Track, analyze, and optimize every step of your customer's journey with our advanced mapping software tailored for audio products.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center"
            >
              <Link 
                to="/products" 
                className="btn bg-accent-500 hover:bg-accent-600 text-white shadow-lg hover:shadow-xl transition-all"
              >
                Browse Products
              </Link>
              <Link 
                to="/register" 
                className="btn bg-white hover:bg-gray-100 text-primary-800 shadow-lg hover:shadow-xl transition-all"
              >
                Start Mapping
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 max-w-5xl mx-auto"
          >
            <motion.div variants={item} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Headphones className="h-8 w-8 mb-3 mx-auto text-accent-400" />
              <h3 className="text-2xl md:text-3xl font-bold mb-1">{totalProducts}</h3>
              <p className="text-gray-200">Products</p>
            </motion.div>
            <motion.div variants={item} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Activity className="h-8 w-8 mb-3 mx-auto text-accent-400" />
              <h3 className="text-2xl md:text-3xl font-bold mb-1">{totalJourneys}</h3>
              <p className="text-gray-200">Journeys</p>
            </motion.div>
            <motion.div variants={item} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Users className="h-8 w-8 mb-3 mx-auto text-accent-400" />
              <h3 className="text-2xl md:text-3xl font-bold mb-1">{totalUsers}</h3>
              <p className="text-gray-200">Users</p>
            </motion.div>
            <motion.div variants={item} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <BarChart2 className="h-8 w-8 mb-3 mx-auto text-accent-400" />
              <h3 className="text-2xl md:text-3xl font-bold mb-1">{avgRating.toFixed(1)}</h3>
              <p className="text-gray-200">Avg. Rating</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our journey mapping tool helps you understand and optimize every stage of the customer experience with earphones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: 'Map the Journey',
                description: 'Document customer interactions across awareness, consideration, purchase, post-purchase, and support stages.',
                color: 'blue',
                icon: <Headphones className="h-12 w-12 mb-4 mx-auto text-blue-500" />
              },
              {
                title: 'Analyze Touchpoints',
                description: 'Identify key interactions and emotions at each stage to understand customer satisfaction drivers.',
                color: 'purple',
                icon: <Activity className="h-12 w-12 mb-4 mx-auto text-purple-500" />
              },
              {
                title: 'Optimize Experience',
                description: 'Use insights to improve product features, marketing, and support based on real customer feedback.',
                color: 'green',
                icon: <BarChart2 className="h-12 w-12 mb-4 mx-auto text-green-500" />
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition-shadow`}
              >
                {step.icon}
                <h3 className={`text-xl font-semibold mb-3 text-${step.color}-700`}>{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore customer journeys for these top-rated earphones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card overflow-hidden h-full flex flex-col"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-4">
                    <span className="text-sm text-gray-500">{product.brand}</span>
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <div className="flex items-center mt-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={`text-lg ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="ml-2 text-gray-600">{product.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="mt-auto">
                    <Link
                      to={`/products/${product.id}`}
                      className="btn btn-outline w-full flex items-center justify-center"
                    >
                      View Journey
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="btn btn-primary inline-flex items-center"
            >
              View All Products
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-accent-500 to-accent-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Map Your Customer Journey?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Start documenting and analyzing your earphone product experiences today.
            </p>
            <Link
              to="/register"
              className="btn bg-white text-accent-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all text-lg px-8 py-4"
            >
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;