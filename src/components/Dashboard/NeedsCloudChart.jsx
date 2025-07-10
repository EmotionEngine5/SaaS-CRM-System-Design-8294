import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const NeedsCloudChart = ({ companies }) => {
  const needsData = useMemo(() => {
    // 모든 회사의 니즈를 분석하여 키워드 추출
    const allNeeds = companies
      .map(company => company.needs)
      .filter(needs => needs && needs.trim())
      .join(' ');

    // 간단한 키워드 추출 (실제로는 더 정교한 분석이 필요)
    const keywords = allNeeds
      .split(/[,\s]+/)
      .filter(word => word.length > 1)
      .reduce((acc, word) => {
        const cleanWord = word.toLowerCase().replace(/[^\w가-힣]/g, '');
        if (cleanWord.length > 1) {
          acc[cleanWord] = (acc[cleanWord] || 0) + 1;
        }
        return acc;
      }, {});

    // 상위 10개 키워드 선택
    return Object.entries(keywords)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));
  }, [companies]);

  const maxCount = Math.max(...needsData.map(item => item.count), 1);

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">주요 니즈 키워드</h3>
      
      <div className="flex flex-wrap gap-2 justify-center items-center min-h-[200px]">
        {needsData.map((item, index) => {
          const fontSize = Math.max(12, (item.count / maxCount) * 24 + 12);
          const colors = [
            'text-blue-600', 'text-green-600', 'text-purple-600', 
            'text-red-600', 'text-yellow-600', 'text-indigo-600',
            'text-pink-600', 'text-gray-600', 'text-orange-600', 'text-teal-600'
          ];
          
          return (
            <motion.span
              key={item.word}
              className={`font-medium cursor-pointer hover:opacity-70 ${colors[index % colors.length]}`}
              style={{ fontSize: `${fontSize}px` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              title={`${item.word} (${item.count}회)`}
            >
              {item.word}
            </motion.span>
          );
        })}
      </div>
      
      {needsData.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">분석할 니즈 데이터가 없습니다.</p>
        </div>
      )}
    </motion.div>
  );
};

export default NeedsCloudChart;