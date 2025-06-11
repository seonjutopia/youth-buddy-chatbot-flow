
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface HousingSupportChartProps {
  data: ChartData[];
  title: string;
}

export const HousingSupportChart: React.FC<HousingSupportChartProps> = ({ data, title }) => {
  return (
    <div className="bg-white rounded-lg p-4">
      <h4 className="text-sm font-medium text-gray-700 mb-3">{title}</h4>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              stroke="#666"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke="#666"
            />
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(0)}만원`, '']}
              labelStyle={{ color: '#333' }}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
