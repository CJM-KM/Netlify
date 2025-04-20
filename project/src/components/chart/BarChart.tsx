import React from 'react';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { ChartData } from '../../types';

interface BarChartProps {
  data: ChartData[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  height?: number;
  className?: string;
}

const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  title,
  xAxisLabel,
  yAxisLabel,
  height = 300,
  className = '',
}) => {
  return (
    <div className={`${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      )}
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer>
          <RechartsBarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 25,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="name" 
              label={xAxisLabel ? { 
                value: xAxisLabel, 
                position: 'insideBottomRight', 
                offset: -10 
              } : undefined}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              label={yAxisLabel ? { 
                value: yAxisLabel, 
                angle: -90, 
                position: 'insideLeft' 
              } : undefined}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #f0f0f0',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              }}
            />
            <Legend />
            <Bar 
              dataKey="value" 
              name="Value" 
              fill="#3B82F6" 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;