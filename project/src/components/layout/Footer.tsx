import React from 'react';
import { Headphones, Mail, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Headphones size={24} className="text-white" />
              <span className="text-xl font-bold">EarJourney</span>
            </div>
            <p className="text-indigo-200 text-sm">
              Mapping customer experiences with earphones to help brands and customers make better decisions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-indigo-200 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/journey" className="text-indigo-200 hover:text-white transition-colors duration-200">
                  My Journey
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-indigo-200 hover:text-white transition-colors duration-200">
                  Compare Products
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-indigo-200 hover:text-white transition-colors duration-200">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-indigo-200 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-indigo-200 hover:text-white transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-indigo-200 hover:text-white transition-colors duration-200">
                  Cookies Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-indigo-200" />
                <a href="mailto:contact@earjourney.com" className="text-indigo-200 hover:text-white transition-colors duration-200">
                  contact@earjourney.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Instagram size={16} className="text-indigo-200" />
                <a href="#" className="text-indigo-200 hover:text-white transition-colors duration-200">
                  @earjourney
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Twitter size={16} className="text-indigo-200" />
                <a href="#" className="text-indigo-200 hover:text-white transition-colors duration-200">
                  @earjourney
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-indigo-800 mt-8 pt-8 text-center text-indigo-200 text-sm">
          <p>&copy; {new Date().getFullYear()} EarJourney. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;