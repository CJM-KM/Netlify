import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockProducts } from '../data/mockData';
import ProductCard from '../components/ui/ProductCard';
import JourneySteps from '../components/journey/JourneySteps';
import JourneyForm from '../components/journey/JourneyForm';
import Button from '../components/ui/Button';
import { JourneyStage } from '../types';

const JourneyPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'select-product' | 'journey'>('select-product');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [currentStage, setCurrentStage] = useState<string>('awareness');
  const [journeyData, setJourneyData] = useState<Record<string, any>>({});
  
  const initialStages: JourneyStage[] = [
    { stageName: 'awareness', completed: false, data: {} },
    { stageName: 'consideration', completed: false, data: {} },
    { stageName: 'purchase', completed: false, data: {} },
    { stageName: 'post-purchase', completed: false, data: {} },
    { stageName: 'support', completed: false, data: {} },
  ];
  
  const [stages, setStages] = useState<JourneyStage[]>(initialStages);
  
  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId);
  };
  
  const handleStartJourney = () => {
    if (!selectedProduct) return;
    setStep('journey');
  };
  
  const handleStageSelect = (stageName: string) => {
    setCurrentStage(stageName);
  };
  
  const handleStageSubmit = (data: Record<string, any>) => {
    // Update the completed stages
    const updatedStages = stages.map(stage => {
      if (stage.stageName === currentStage) {
        return { ...stage, completed: true, data };
      }
      return stage;
    });
    
    setStages(updatedStages);
    
    // Store the journey data
    setJourneyData(prev => ({
      ...prev,
      [currentStage]: data
    }));
    
    // Move to the next stage or complete the journey
    const currentIndex = stages.findIndex(stage => stage.stageName === currentStage);
    if (currentIndex < stages.length - 1) {
      setCurrentStage(stages[currentIndex + 1].stageName);
    } else {
      // Journey completed
      navigate('/compare');
    }
  };
  
  const handleBack = () => {
    if (step === 'journey') {
      const currentIndex = stages.findIndex(stage => stage.stageName === currentStage);
      if (currentIndex > 0) {
        setCurrentStage(stages[currentIndex - 1].stageName);
      } else {
        setStep('select-product');
      }
    }
  };

  const product = selectedProduct 
    ? mockProducts.find(p => p.id === selectedProduct) 
    : null;

  return (
    <div className="min-h-screen bg-gray-50 pt-8 md:pt-12 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Map Your Earphone Journey</h1>
          <p className="text-lg text-gray-600 mb-8">
            Share your experience with earphones to help others make better decisions
          </p>
          
          {step === 'select-product' ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Step 1: Select your earphones
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {mockProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    selected={selectedProduct === product.id}
                    onSelect={() => handleProductSelect(product.id)}
                  />
                ))}
              </div>
              
              <div className="flex justify-end">
                <Button
                  variant="primary"
                  disabled={!selectedProduct}
                  onClick={handleStartJourney}
                >
                  Continue
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Step 2: Map your journey with {product?.name}
                </h2>
                
                <JourneySteps
                  stages={stages}
                  currentStage={currentStage}
                  onSelectStage={handleStageSelect}
                />
              </div>
              
              {product && (
                <JourneyForm
                  stage={currentStage}
                  product={product}
                  onSubmit={handleStageSubmit}
                  onBack={handleBack}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JourneyPage;