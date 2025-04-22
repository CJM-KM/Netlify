import React from 'react';
import { Link } from 'react-router-dom';
import { Headphones, ArrowRight, PieChart, BarChart3, Users } from 'lucide-react';
import Button from '../components/ui/Button';
import { mockProducts } from '../data/mockData';
import ProductCard from '../components/ui/ProductCard';

const HomePage: React.FC = () => {
  const featuredProducts = mockProducts.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-indigo-900 text-white py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-indigo-800 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 animate-fade-in">
              Map Your Earphone Journey
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8">
              Discover, compare, and share your experiences with earphones to help others make better decisions.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                variant="secondary" 
                size="lg"
                icon={<Headphones size={20} />}
                as={Link}
                to="/journey"
              >
                Start Your Journey
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                as={Link}
                to="/compare"
              >
                Compare Products
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Document and analyze your earphone experience from discovery to daily use
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Headphones size={32} className="text-indigo-900" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Map Your Journey</h3>
              <p className="text-gray-600">
                Document each stage of your earphone experience from how you discovered the product to your ongoing usage.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-coral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 size={32} className="text-coral-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Visualize & Compare</h3>
              <p className="text-gray-600">
                See how your experience compares to others through interactive visualizations and detailed comparisons.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Help Others Decide</h3>
              <p className="text-gray-600">
                Your journey helps others make more informed decisions and helps brands improve their products.
              </p>
            </div>
          </div>
        </div>
      </section>

      

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 to-indigo-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Power of Shared Experiences</h2>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Our collective journey data provides valuable insights for both consumers and brands
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl font-bold mb-2">2,500+</div>
              <div className="text-indigo-200 text-lg">Customer Journeys</div>
            </div>
            
            <div className="text-center p-6">
              <div className="text-4xl font-bold mb-2">45+</div>
              <div className="text-indigo-200 text-lg">Earphone Models</div>
            </div>
            
            <div className="text-center p-6">
              <div className="text-4xl font-bold mb-2">12+</div>
              <div className="text-indigo-200 text-lg">Brands Analyzed</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Share Your Journey?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Your experience helps others make better choices and provides valuable feedback to manufacturers.
            </p>
            <Button 
              variant="primary" 
              size="lg"
              icon={<Headphones size={20} />}
              as={Link}
              to="/journey"
            >
              Start Mapping Your Journey
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;