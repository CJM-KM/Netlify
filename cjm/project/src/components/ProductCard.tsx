import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="card h-full flex flex-col overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          <span className="badge badge-primary">
            {product.category.replace('-', ' ')}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="mb-2">
          <p className="text-sm text-gray-500">{product.brand}</p>
          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        </div>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center text-yellow-400">
            <Star size={16} fill="currentColor" />
            <span className="ml-1 text-gray-700">{product.rating.toFixed(1)}</span>
          </div>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-gray-700">${product.price.toFixed(2)}</span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{product.description}</p>
        
        <div className="mt-auto pt-4">
          <Link
            to={`/products/${product.id}`}
            className="btn btn-primary text-sm w-full"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;