import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ActivityChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>
          {payload.map((item, index) => (
            <p key={index} className="text-xs text-gray-600">
              <span 
                className="inline-block w-2 h-2 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              />
              {item.name}: {item.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">월별 영업활동 현황</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis 
              dataKey="month" 
              stroke="#6B7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="newCustomers" 
              stroke="#60A5FA" 
              strokeWidth={3}
              name="신규 고객"
              dot={{ fill: '#60A5FA', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#3B82F6' }}
            />
            <Line 
              type="monotone" 
              dataKey="contacts" 
              stroke="#4ADE80" 
              strokeWidth={3}
              name="접촉 건수"
              dot={{ fill: '#4ADE80', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#10B981' }}
            />
            <Line 
              type="monotone" 
              dataKey="deals" 
              stroke="#FB923C" 
              strokeWidth={3}
              name="계약 건수"
              dot={{ fill: '#FB923C', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#F59E0B' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ActivityChart;