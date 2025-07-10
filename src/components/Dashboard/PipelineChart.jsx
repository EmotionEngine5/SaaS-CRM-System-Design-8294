import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiChevronRight } = FiIcons;

const PipelineChart = ({ data }) => {
  const [hoveredStage, setHoveredStage] = useState(null);

  // 색상 팔레트 - 세일즈포스 스타일
  const colors = [
    '#0176D3', // 파란색
    '#2E844A', // 초록색
    '#C9C9C9', // 회색
    '#F5675B', // 빨간색
    '#FFB75D'  // 주황색
  ];

  // 전환율 계산 (실제 데이터에서는 API로 받아올 값)
  const calculateConversionRate = (index) => {
    if (index === 0 || index >= data.length - 1) return null;
    const current = data[index].value;
    const previous = data[index - 1].value;
    if (previous === 0) return 0;
    return Math.round((current / previous) * 100);
  };

  // 전체 합계
  const totalItems = data.reduce((sum, item) => sum + item.value, 0);

  // 단계별 비율 계산
  const stageData = data.map((item, index) => ({
    ...item,
    color: colors[index % colors.length],
    percentage: totalItems > 0 ? Math.round((item.value / totalItems) * 100) : 0,
    conversionRate: calculateConversionRate(index)
  }));

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-6">영업 파이프라인</h3>

      {/* 헤더 레이블 */}
      <div className="flex mb-2 text-xs text-gray-500 font-medium">
        <div className="w-1/4">단계</div>
        <div className="w-1/4 text-center">건수</div>
        <div className="w-1/4 text-center">비율</div>
        <div className="w-1/4 text-center">전환율</div>
      </div>

      {/* 파이프라인 시각화 */}
      <div className="relative mb-8 pt-2">
        <div className="absolute left-0 right-0 h-1 bg-gray-100 top-0"></div>

        {/* 단계별 퍼널 */}
        <div className="relative">
          {stageData.map((stage, index) => (
            <div key={stage.name} className="mb-6">
              <motion.div
                className="flex items-center relative"
                onMouseEnter={() => setHoveredStage(index)}
                onMouseLeave={() => setHoveredStage(null)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {/* 단계명 */}
                <div className="w-1/4 pr-4">
                  <span className="font-medium text-gray-700 text-sm">{stage.name}</span>
                </div>

                {/* 퍼널 바 */}
                <div className="w-1/4 flex justify-center">
                  <motion.div
                    className="h-8 rounded relative flex items-center justify-center"
                    style={{
                      width: `${Math.max(stage.percentage, 5)}%`,
                      backgroundColor: stage.color,
                      opacity: hoveredStage === index ? 1 : 0.8
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(stage.percentage, 5)}%` }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="text-xs font-bold text-white absolute left-2">
                      {stage.value}
                    </span>

                    {/* 화살표 (첫 단계 제외) */}
                    {index > 0 && (
                      <div className="absolute -left-3 top-0 bottom-0 flex items-center">
                        <div
                          className="w-0 h-0 border-t-[10px] border-b-[10px] border-l-[10px] border-t-transparent border-b-transparent"
                          style={{ borderLeftColor: stage.color }}
                        ></div>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* 비율 */}
                <div className="w-1/4 text-center">
                  <span className="text-sm font-medium text-gray-600">{stage.percentage}%</span>
                </div>

                {/* 전환율 */}
                <div className="w-1/4 text-center">
                  {stage.conversionRate !== null ? (
                    <div className="flex items-center justify-center space-x-1">
                      <SafeIcon icon={FiChevronRight} className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-600">{stage.conversionRate}%</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">-</span>
                  )}
                </div>
              </motion.div>

              {/* 구분선 (마지막 항목 제외) */}
              {index < stageData.length - 1 && (
                <div className="border-b border-gray-100 mt-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 요약 정보 */}
      <div className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-lg text-sm">
        <div>
          <span className="text-gray-500">총 파이프라인:</span>
          <span className="ml-2 font-semibold text-gray-800">{totalItems}건</span>
        </div>
        <div>
          <span className="text-gray-500">평균 전환율:</span>
          <span className="ml-2 font-semibold text-gray-800">
            {stageData
              .filter(s => s.conversionRate !== null)
              .reduce((sum, s, i, arr) => sum + s.conversionRate / arr.length, 0)
              .toFixed(1)}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PipelineChart;