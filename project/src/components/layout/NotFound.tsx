import React from 'react';
import { Link } from 'react-router-dom';
import { Headphones, Home } from 'lucide-react';
import Button from '../ui/Button';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-6">
          <Headphones size={32} className="text-indigo-900" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button 
          variant="primary"
          size="lg"
          icon={<Home size={20} />}
          as={Link}
          to="/"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;