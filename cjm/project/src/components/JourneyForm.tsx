import React, { useState } from 'react';
import { JourneyStage } from '../types';
import { Smile, Meh, Frown, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface JourneyFormProps {
  stage: JourneyStage;
  productId: string;
  onSubmit: (data: {
    rating: number;
    feedback: string;
    emotion: 'positive' | 'neutral' | 'negative';
    touchpoint: string;
  }) => void;
}

// Touchpoint options by stage
const touchpointsByStage: Record<JourneyStage, string[]> = {
  'awareness': ['Social Media', 'YouTube Review', 'Friend Recommendation', 'Online Ad', 'Store Display', 'Other'],
  'consideration': ['Product Website', 'Reviews', 'Comparisons', 'Store Demo', 'Customer Support', 'Other'],
  'purchase': ['Online Store', 'Retail Store', 'Marketplace', 'Direct from Manufacturer', 'Other'],
  'post-purchase': ['Product Usage', 'Mobile App', 'Setup Experience', 'First Impression', 'Other'],
  'support': ['Email Support', 'Chat Support', 'Phone Support', 'In-store Support', 'Online FAQ', 'Other'],
};

// Stage questions
const stageQuestions: Record<JourneyStage, string> = {
  'awareness': 'How did you discover this product?',
  'consideration': 'What factors influenced your decision to consider this product?',
  'purchase': 'How was your purchasing experience?',
  'post-purchase': 'What was your experience using the product?',
  'support': 'How was your support or service experience?',
};

// Stage color themes
const stageColors: Record<JourneyStage, { bg: string; border: string; text: string }> = {
  'awareness': { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-700' },
  'consideration': { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-700' },
  'purchase': { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-700' },
  'post-purchase': { bg: 'bg-yellow-50', border: 'border-yellow-500', text: 'text-yellow-700' },
  'support': { bg: 'bg-orange-50', border: 'border-orange-500', text: 'text-orange-700' },
};

const JourneyForm: React.FC<JourneyFormProps> = ({ stage, productId, onSubmit }) => {
  const [rating, setRating] = useState<number>(3);
  const [feedback, setFeedback] = useState<string>('');
  const [emotion, setEmotion] = useState<'positive' | 'neutral' | 'negative'>('neutral');
  const [touchpoint, setTouchpoint] = useState<string>(touchpointsByStage[stage][0]);
  const [errors, setErrors] = useState<{ feedback?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  // Get stage-specific styling
  const stageStyle = stageColors[stage];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: { feedback?: string } = {};
    if (feedback.trim().length < 10) {
      newErrors.feedback = 'Please provide feedback of at least 10 characters';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit({
        rating,
        feedback,
        emotion,
        touchpoint,
      });
      
      setIsSubmitting(false);
      setShowThanks(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setRating(3);
        setFeedback('');
        setEmotion('neutral');
        setTouchpoint(touchpointsByStage[stage][0]);
        setShowThanks(false);
      }, 2000);
    }, 800);
  };

  // Handle emotion selection
  const handleEmotionSelect = (selected: 'positive' | 'neutral' | 'negative') => {
    setEmotion(selected);
    
    // Automatically adjust rating based on emotion
    if (selected === 'positive') {
      setRating(Math.max(rating, 4));
    } else if (selected === 'negative') {
      setRating(Math.min(rating, 2));
    } else {
      setRating(3);
    }
  };

  if (showThanks) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${stageStyle.bg} rounded-xl shadow-md p-8 text-center ${stageStyle.border} border-l-4`}
      >
        <Smile size={48} className="mx-auto mb-4 text-success-500" />
        <h3 className="text-2xl font-semibold mb-2">Thank You!</h3>
        <p className="text-gray-600">Your feedback has been recorded successfully.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${stageStyle.bg} rounded-xl shadow-md p-6 ${stageStyle.border} border-l-4`}
    >
      <h3 className={`text-xl font-semibold mb-2 ${stageStyle.text}`}>
        {stage.replace('-', ' ').replace(/\b\w/g, char => char.toUpperCase())} Stage
      </h3>
      <p className="text-gray-600 mb-6">{stageQuestions[stage]}</p>
      
      <form onSubmit={handleSubmit}>
        {/* Emotion Selection */}
        <div className="mb-6">
          <label className="label">How do you feel about this experience?</label>
          <div className="flex items-center justify-center space-x-8 mt-2">
            <button
              type="button"
              onClick={() => handleEmotionSelect('negative')}
              className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                emotion === 'negative' 
                  ? 'bg-error-100 ring-2 ring-error-500 text-error-600' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <Frown size={28} className={emotion === 'negative' ? 'text-error-500' : 'text-gray-400'} />
              <span className="mt-1 text-sm">Negative</span>
            </button>
            
            <button
              type="button"
              onClick={() => handleEmotionSelect('neutral')}
              className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                emotion === 'neutral' 
                  ? 'bg-gray-100 ring-2 ring-gray-400 text-gray-700' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <Meh size={28} className={emotion === 'neutral' ? 'text-gray-500' : 'text-gray-400'} />
              <span className="mt-1 text-sm">Neutral</span>
            </button>
            
            <button
              type="button"
              onClick={() => handleEmotionSelect('positive')}
              className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                emotion === 'positive' 
                  ? 'bg-success-100 ring-2 ring-success-500 text-success-600' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <Smile size={28} className={emotion === 'positive' ? 'text-success-500' : 'text-gray-400'} />
              <span className="mt-1 text-sm">Positive</span>
            </button>
          </div>
        </div>
        
        {/* Rating */}
        <div className="mb-6">
          <label className="label">How would you rate your experience? (1-5)</label>
          <div className="flex items-center justify-center space-x-2 mt-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className="focus:outline-none transition-all"
              >
                <Star 
                  size={32} 
                  className={`${value <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                    hover:scale-110 transition-transform`}
                />
              </button>
            ))}
          </div>
          <div className="text-center mt-2 text-sm text-gray-500">
            {rating === 1 && 'Poor'}
            {rating === 2 && 'Below Average'}
            {rating === 3 && 'Average'}
            {rating === 4 && 'Good'}
            {rating === 5 && 'Excellent'}
          </div>
        </div>
        
        {/* Touchpoint */}
        <div className="mb-6">
          <label htmlFor="touchpoint" className="label">Where did this experience happen?</label>
          <select
            id="touchpoint"
            value={touchpoint}
            onChange={(e) => setTouchpoint(e.target.value)}
            className="input"
          >
            {touchpointsByStage[stage].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        
        {/* Feedback */}
        <div className="mb-6">
          <label htmlFor="feedback" className="label">
            Please share your experience
            <span className="text-xs text-gray-500 ml-1">(min. 10 characters)</span>
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => {
              setFeedback(e.target.value);
              if (e.target.value.length >= 10) {
                setErrors({ ...errors, feedback: undefined });
              }
            }}
            rows={4}
            className={`input ${errors.feedback ? 'border-error-500 focus:ring-error-500' : ''}`}
            placeholder="Tell us about your experience..."
          />
          {errors.feedback && (
            <p className="mt-1 text-sm text-error-500">{errors.feedback}</p>
          )}
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn ${
              isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'btn-primary'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default JourneyForm;