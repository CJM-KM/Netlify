import React from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { JourneyStage } from '../../types';

interface JourneyStepsProps {
  stages: JourneyStage[];
  currentStage: string;
  onSelectStage: (stage: string) => void;
}

const JourneySteps: React.FC<JourneyStepsProps> = ({
  stages,
  currentStage,
  onSelectStage,
}) => {
  const stageInfo = {
    awareness: {
      title: 'Awareness',
      description: 'How you discovered the product',
    },
    consideration: {
      title: 'Consideration',
      description: 'Research and alternatives you considered',
    },
    purchase: {
      title: 'Purchase',
      description: 'Why and where you made your purchase',
    },
    'post-purchase': {
      title: 'Post-Purchase',
      description: 'Your experience using the product',
    },
    support: {
      title: 'Support',
      description: 'Any service or support interactions',
    },
  };

  return (
    <div className="mb-8">
      <div className="relative">
        <div className="absolute top-5 left-5 w-[calc(100%-40px)] h-0.5 bg-gray-200 z-0"></div>
        <ol className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-4">
          {stages.map((stage) => {
            const isActive = stage.stageName === currentStage;
            const info = stageInfo[stage.stageName];
            
            return (
              <li 
                key={stage.stageName}
                className={`flex flex-col items-center ${isActive ? 'cursor-default' : 'cursor-pointer'}`}
                onClick={() => onSelectStage(stage.stageName)}
              >
                <div 
                  className={`
                    flex items-center justify-center w-10 h-10 rounded-full
                    ${stage.completed 
                      ? 'bg-green-100 text-green-600' 
                      : isActive 
                        ? 'bg-indigo-100 text-indigo-600 ring-2 ring-indigo-600 ring-offset-2' 
                        : 'bg-gray-100 text-gray-500'
                    }
                    transition-all duration-200
                  `}
                >
                  {stage.completed ? (
                    <Check size={18} />
                  ) : (
                    <span className="text-sm font-semibold">{stages.indexOf(stage) + 1}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <h3 
                    className={`text-sm font-semibold ${
                      isActive ? 'text-indigo-900' : 'text-gray-700'
                    }`}
                  >
                    {info.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 hidden md:block">
                    {info.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default JourneySteps;