import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

interface JourneyMapChartProps {
  data: any[];
  title?: string;
  height?: number;
  className?: string;
}

const JourneyMapChart: React.FC<JourneyMapChartProps> = ({ 
  data, 
  title,
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
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #f0f0f0',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="apple" 
              stackId="1" 
              stroke="#FF6B6B" 
              fill="#FF6B6B" 
              name="Apple" 
            />
            <Area 
              type="monotone" 
              dataKey="sony" 
              stackId="1" 
              stroke="#4ECDC4" 
              fill="#4ECDC4" 
              name="Sony" 
            />
            <Area 
              type="monotone" 
              dataKey="bose" 
              stackId="1" 
              stroke="#1A535C" 
              fill="#1A535C" 
              name="Bose" 
            />
            <Area 
              type="monotone" 
              dataKey="sennheiser" 
              stackId="1" 
              stroke="#FFE66D" 
              fill="#FFE66D" 
              name="Sennheiser" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default JourneyMapChart;