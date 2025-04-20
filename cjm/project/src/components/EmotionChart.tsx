import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend,
  ChartData
} from 'chart.js';
import { StageAnalysis } from '../types';

// Register ChartJS components
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend
);

interface EmotionChartProps {
  analysis: Record<string, StageAnalysis>;
}

const EmotionChart: React.FC<EmotionChartProps> = ({ analysis }) => {
  // Calculate average emotions across all stages
  const stages = Object.keys(analysis);
  const totalPositive = stages.reduce((sum, stage) => sum + analysis[stage].positivePercentage, 0) / stages.length;
  const totalNeutral = stages.reduce((sum, stage) => sum + analysis[stage].neutralPercentage, 0) / stages.length;
  const totalNegative = stages.reduce((sum, stage) => sum + analysis[stage].negativePercentage, 0) / stages.length;
  
  // Get stage-specific emotion data
  const stageEmotionData: Record<string, ChartData<'doughnut'>> = {};
  
  stages.forEach(stage => {
    const stageData = analysis[stage];
    stageEmotionData[stage] = {
      labels: ['Positive', 'Neutral', 'Negative'],
      datasets: [
        {
          data: [stageData.positivePercentage, stageData.neutralPercentage, stageData.negativePercentage],
          backgroundColor: [
            'rgba(16, 185, 129, 0.7)', // success-500 for positive
            'rgba(156, 163, 175, 0.7)', // gray-400 for neutral
            'rgba(239, 68, 68, 0.7)', // error-500 for negative
          ],
          borderColor: [
            'rgba(16, 185, 129, 1)',
            'rgba(156, 163, 175, 1)',
            'rgba(239, 68, 68, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  });
  
  // Overall emotion data for the main chart
  const overallEmotionData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        data: [totalPositive, totalNeutral, totalNegative],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)', // success-500
          'rgba(156, 163, 175, 0.7)', // gray-400
          'rgba(239, 68, 68, 0.7)', // error-500
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)', 
          'rgba(156, 163, 175, 1)', 
          'rgba(239, 68, 68, 1)', 
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.label || '';
            let value = context.parsed || 0;
            return `${label}: ${value.toFixed(1)}%`;
          }
        }
      },
    },
    cutout: '65%',
  };
  
  // Simplified options for the small charts
  const smallChartOptions = {
    ...options,
    plugins: {
      ...options.plugins,
      legend: {
        display: false,
      },
    },
    cutout: '70%',
  };
  
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-grow relative">
        <Doughnut data={overallEmotionData} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="block text-3xl font-bold text-success-600">{totalPositive.toFixed(0)}%</span>
            <span className="text-sm text-gray-500">positive</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-5 gap-2">
        {stages.map(stage => (
          <div key={stage} className="text-center">
            <div className="h-16 w-16 mx-auto relative">
              <Doughnut data={stageEmotionData[stage]} options={smallChartOptions} />
            </div>
            <span className="text-xs text-gray-600 block mt-1">
              {stage.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
            </span>
            <span className="text-xs font-medium block">
              {analysis[stage].positivePercentage}% pos
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmotionChart;