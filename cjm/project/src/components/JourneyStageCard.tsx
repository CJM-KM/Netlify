import React from 'react';
import { JourneyPoint, JourneyStage } from '../types';
import { Smile, Meh, Frown, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface JourneyStageCardProps {
  stage: JourneyPoint;
  isActive: boolean;
  onClick: () => void;
}

const stageInfo: Record<JourneyStage, { title: string; description: string; color: string }> = {
  'awareness': {
    title: 'Awareness',
    description: 'How did you discover this product?',
    color: 'blue',
  },
  'consideration': {
    title: 'Consideration',
    description: 'What factors did you consider before purchasing?',
    color: 'purple',
  },
  'purchase': {
    title: 'Purchase',
    description: 'Tell us about your purchasing experience',
    color: 'green',
  },
  'post-purchase': {
    title: 'Post-Purchase',
    description: 'How was your experience using the product?',
    color: 'yellow',
  },
  'support': {
    title: 'Support',
    description: 'Did you need any support or service?',
    color: 'orange',
  },
};

const JourneyStageCard: React.FC<JourneyStageCardProps> = ({ stage, isActive, onClick }) => {
  const stageData = stageInfo[stage.stage];
  
  const getEmotionIcon = () => {
    switch (stage.emotion) {
      case 'positive':
        return <Smile className="text-success-500" />;
      case 'neutral':
        return <Meh className="text-gray-500" />;
      case 'negative':
        return <Frown className="text-error-500" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`journey-stage cursor-pointer mb-4 ${isActive ? 'journey-stage-current' : 'journey-stage-completed'} stage-${stage.stage}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{stageData.title}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{new Date(stage.date).toLocaleDateString()}</span>
          <div className="ml-2">
            {getEmotionIcon()}
          </div>
        </div>
      </div>
      
      <div className="mt-2">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm font-medium text-gray-700">Rating:</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className={`text-lg ${i < stage.rating ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        
        <div className="mb-2">
          <span className="text-sm font-medium text-gray-700">Touchpoint:</span>
          <span className="ml-2 badge badge-secondary">{stage.touchpoint}</span>
        </div>
        
        <p className="text-gray-600">{stage.feedback}</p>
      </div>
      
      {isActive && (
        <div className="mt-4 flex items-start p-3 bg-white rounded-md border border-gray-200">
          <Info size={16} className="text-primary-500 mt-1 mr-2 flex-shrink-0" />
          <p className="text-sm text-gray-600">{stageData.description}</p>
        </div>
      )}
    </motion.div>
  );
};

export default JourneyStageCard;