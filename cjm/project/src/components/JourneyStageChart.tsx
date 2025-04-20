import React from 'react';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { StageAnalysis } from '../types';

// Register ChartJS components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend
);

interface JourneyStageChartProps {
  analysis: Record<string, StageAnalysis>;
}

const JourneyStageChart: React.FC<JourneyStageChartProps> = ({ analysis }) => {
  // Extract data from the analysis
  const stages = Object.keys(analysis).map(key => 
    key.replace('-', ' ').replace(/\b\w/g, char => char.toUpperCase())
  );
  
  const averageRatings = Object.values(analysis).map(stage => stage.averageRating);
  const counts = Object.values(analysis).map(stage => stage.count);
  
  // Define colors for each stage
  const stageColors = [
    'rgba(59, 130, 246, 0.7)', // blue - awareness
    'rgba(139, 92, 246, 0.7)', // purple - consideration
    'rgba(16, 185, 129, 0.7)', // green - purchase
    'rgba(245, 158, 11, 0.7)', // yellow - post-purchase
    'rgba(249, 115, 22, 0.7)', // orange - support
  ];
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: 'Average Rating (1-5)',
        },
      },
      y1: {
        beginAtZero: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Number of Responses',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.dataset.yAxisID === 'y') {
              label += context.raw.toFixed(1) + ' / 5';
            } else {
              label += context.raw + ' responses';
            }
            return label;
          }
        }
      },
      legend: {
        position: 'top' as const,
      },
    },
  };
  
  const data = {
    labels: stages,
    datasets: [
      {
        label: 'Average Rating',
        data: averageRatings,
        backgroundColor: stageColors,
        borderColor: stageColors.map(color => color.replace('0.7', '1')),
        borderWidth: 1,
        yAxisID: 'y',
      },
      {
        label: 'Number of Responses',
        data: counts,
        backgroundColor: 'rgba(156, 163, 175, 0.5)',
        borderColor: 'rgba(156, 163, 175, 1)',
        borderWidth: 1,
        type: 'bar' as const,
        yAxisID: 'y1',
      },
    ],
  };
  
  return <Bar options={options} data={data} />;
};

export default JourneyStageChart;