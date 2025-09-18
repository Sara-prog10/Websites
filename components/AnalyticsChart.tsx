import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalyticsChartProps<T> {
  data: T[];
  title: string;
  dataKey: keyof T;
  unit: string;
  color: string;
}

const AnalyticsChart = <T extends object>({ data, title, dataKey, unit, color }: AnalyticsChartProps<T>) => {
  return (
    <div className="bg-secondary p-6 rounded-xl shadow-lg h-[450px] flex flex-col">
      <h3 className="text-lg font-bold text-text-primary mb-4">{title}</h3>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#8892b0' }} 
              tickLine={{ stroke: '#8892b0' }}
              axisLine={{ stroke: '#8892b0' }}
            />
            <YAxis 
              tick={{ fill: '#8892b0' }} 
              tickLine={{ stroke: '#8892b0' }}
              axisLine={{ stroke: '#8892b0' }}
              unit={unit}
              width={40}
            />
            <Tooltip 
              contentStyle={{ 
                  backgroundColor: '#1e293b', // bg-highlight
                  borderColor: '#334155',
                  color: '#e2e8f0'
              }}
              cursor={{fill: 'rgba(56, 189, 248, 0.1)'}}
              labelStyle={{ color: '#94a3b8' }}
            />
            <Legend />
            <Line type="monotone" dataKey={dataKey as string} name={title.split(' ')[0]} stroke={color} strokeWidth={2} activeDot={{ r: 8 }} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;
