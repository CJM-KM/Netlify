import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ChevronRight, PlusCircle, Info, AlertTriangle, Map } from 'lucide-react';
import { motion } from 'framer-motion';

import JourneyStageCard from '../components/JourneyStageCard';
import JourneyForm from '../components/JourneyForm';
import { journeys } from '../data/mockData';
import { Journey, JourneyPoint, JourneyStage } from '../types';

const stageOrder: JourneyStage[] = ['awareness', 'consideration', 'purchase', 'post-purchase', 'support'];

const JourneyMapPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [journey, setJourney] = useState<Journey | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeStage, setActiveStage] = useState<JourneyPoint | null>(null);
  const [addingStage, setAddingStage] = useState<JourneyStage | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call to fetch journey data
    setTimeout(() => {
      const foundJourney = journeys.find(j => j.id === id);
      if (foundJourney) {
        setJourney(foundJourney);
        // Set the first stage as active by default
        if (foundJourney.stages.length > 0) {
          setActiveStage(foundJourney.stages[0]);
        }
      } else {
        setError('Journey not found');
      }
      setLoading(false);
    }, 500);
  }, [id]);

  // Handle stage selection
  const handleStageClick = (stage: JourneyPoint) => {
    setActiveStage(stage);
    setAddingStage(null);
  };

  // Determine the next stage to add based on existing stages
  const getNextStageToAdd = (): JourneyStage | null => {
    if (!journey) return null;
    
    const existingStages = journey.stages.map(stage => stage.stage);
    for (const stage of stageOrder) {
      if (!existingStages.includes(stage)) {
        return stage;
      }
    }
    
    return null;
  };

  // Handle add stage button click
  const handleAddStage = () => {
    const nextStage = getNextStageToAdd();
    if (nextStage) {
      setAddingStage(nextStage);
      setActiveStage(null);
    }
  };

  // Handle form submission for new stage
  const handleSubmitNewStage = (data: {
    rating: number;
    feedback: string;
    emotion: 'positive' | 'neutral' | 'negative';
    touchpoint: string;
  }) => {
    if (!journey || !addingStage) return;
    
    // Create new journey point
    const newStage: JourneyPoint = {
      id: `${journey.productId}-${addingStage}-${journey.userId}-${Date.now()}`,
      userId: journey.userId,
      productId: journey.productId,
      stage: addingStage,
      rating: data.rating,
      feedback: data.feedback,
      emotion: data.emotion,
      touchpoint: data.touchpoint,
      date: new Date().toISOString(),
    };
    
    // Add to journey
    const updatedJourney = {
      ...journey,
      stages: [...journey.stages, newStage],
    };
    
    setJourney(updatedJourney);
    setActiveStage(newStage);
    setAddingStage(null);
    
    // In a real app, you would save this to your backend
    console.log('New stage added:', newStage);
  };

  // Render loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-48 bg-gray-300 rounded mb-4"></div>
            <div className="h-64 w-full max-w-md bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error || !journey) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-error-50 border border-error-200 rounded-lg p-6 max-w-md mx-auto">
          <div className="flex items-center text-error-500 mb-4">
            <AlertTriangle size={24} className="mr-2" />
            <h2 className="text-xl font-semibold">Error</h2>
          </div>
          <p className="text-error-600">{error || 'Journey not found'}</p>
          <button 
            onClick={() => window.history.back()}
            className="btn btn-primary mt-4"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Calculate journey progress
  const progress = Math.round((journey.stages.length / stageOrder.length) * 100);
  const nextStage = getNextStageToAdd();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Journey Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <span>Journey</span>
              <ChevronRight size={16} />
              <span>{journey.productName}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your {journey.productName} Experience</h1>
            <p className="text-gray-600">
              Created {new Date(journey.createdAt).toLocaleDateString()}
              {journey.completedAt && ` • Completed ${new Date(journey.completedAt).toLocaleDateString()}`}
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <div className="bg-white shadow rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Map size={20} className="text-primary-500 mr-2" />
                <span className="font-medium text-gray-700">Journey Progress</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-primary-600 h-2.5 rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {journey.stages.length} of {stageOrder.length} stages completed
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Journey Stages */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Journey Stages</h2>
            
            {/* List of stages */}
            <div className="space-y-4">
              {journey.stages.map((stage) => (
                <JourneyStageCard
                  key={stage.id}
                  stage={stage}
                  isActive={activeStage?.id === stage.id}
                  onClick={() => handleStageClick(stage)}
                />
              ))}
              
              {/* Add new stage button */}
              {nextStage && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  onClick={handleAddStage}
                  className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-primary-600 hover:border-primary-400 flex items-center justify-center transition-colors"
                >
                  <PlusCircle size={20} className="mr-2" />
                  <span>Add {nextStage.replace('-', ' ')} stage</span>
                </motion.button>
              )}
            </div>
          </div>
        </div>
        
        {/* Active Stage Details / Form */}
        <div className="lg:col-span-2">
          {activeStage ? (
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">
                  {activeStage.stage.replace('-', ' ').replace(/\b\w/g, char => char.toUpperCase())} Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Date</h3>
                    <p className="text-gray-900">{new Date(activeStage.date).toLocaleDateString()}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Touchpoint</h3>
                    <p className="text-gray-900">{activeStage.touchpoint}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Rating</h3>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`text-lg ${i < activeStage.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="ml-2 text-gray-600">({activeStage.rating}/5)</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Emotion</h3>
                    <p className={`
                      ${activeStage.emotion === 'positive' ? 'text-success-500' : ''}
                      ${activeStage.emotion === 'neutral' ? 'text-gray-500' : ''}
                      ${activeStage.emotion === 'negative' ? 'text-error-500' : ''}
                    `}>
                      {activeStage.emotion.charAt(0).toUpperCase() + activeStage.emotion.slice(1)}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Feedback</h3>
                  <p className="text-gray-900 p-4 bg-gray-50 rounded-lg">{activeStage.feedback}</p>
                </div>
              </div>
              
              {/* Tips based on stage */}
              <div className="bg-blue-50 rounded-xl shadow-sm p-6 border border-blue-100">
                <div className="flex items-start">
                  <Info size={24} className="text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-blue-800 mb-2">Tips for {activeStage.stage.replace('-', ' ')} stage</h3>
                    <p className="text-blue-600">
                      {activeStage.stage === 'awareness' && 'Reflect on how you first heard about this product. Was it through social media, friends, or advertisements?'}
                      {activeStage.stage === 'consideration' && 'Think about what factors influenced your decision. Was it features, price, brand reputation, or reviews?'}
                      {activeStage.stage === 'purchase' && 'Consider your purchasing experience. Was it smooth? Any challenges during checkout or delivery?'}
                      {activeStage.stage === 'post-purchase' && 'Evaluate your experience using the product. Did it meet your expectations? Any surprises?'}
                      {activeStage.stage === 'support' && 'Assess any support interactions. Were your issues resolved quickly and effectively?'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : addingStage ? (
            <JourneyForm 
              stage={addingStage} 
              productId={journey.productId} 
              onSubmit={handleSubmitNewStage} 
            />
          ) : (
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center h-64">
              <Info size={32} className="text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">Select a stage or add a new one</h3>
              <p className="text-gray-500 max-w-md">
                Click on a journey stage to view its details, or add a new stage to continue building your product experience journey.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JourneyMapPage;