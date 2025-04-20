import React from 'react';
import { 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  Legend, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { ChartData } from '../../types';

interface PieChartProps {
  data: ChartData[];
  title?: string;
  height?: number;
  className?: string;
  dataKey?: string;
  nameKey?: string;
  colors?: string[];
}

const PieChart: React.FC<PieChartProps> = ({ 
  data, 
  title,
  height = 300,
  className = '',
  dataKey = 'value',
  nameKey = 'name',
  colors = ['#FF6B6B', '#4ECDC4', '#1A535C', '#FFE66D', '#6B705C', '#CB997E', '#3B82F6', '#4F46E5'],
}) => {
  return (
    <div className={`${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      )}
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer>
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey={dataKey}
              nameKey={nameKey}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.fill || colors[index % colors.length]} 
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value}`, 'Value']}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #f0f0f0',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              }}
            />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChart;