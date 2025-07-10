import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import StatsCard from './StatsCard';
import PipelineChart from './PipelineChart';
import SourceChart from './SourceChart';
import ActivityChart from './ActivityChart';
import TaskList from './TaskList';
import NeedsCloudChart from './NeedsCloudChart';

const { FiUsers, FiDollarSign, FiTrendingUp, FiCalendar, FiBarChart2, FiPieChart, FiActivity, FiCloud } = FiIcons;

const Dashboard = ({ companies, contactHistory, tasks, onTaskComplete }) => {
  // 대시보드 메뉴 상태 관리
  const [activeSection, setActiveSection] = useState('overview');

  const stats = useMemo(() => {
    const totalCompanies = companies.length;
    const totalRevenue = companies.reduce((sum, company) => sum + company.expectedRevenue, 0);
    const activeDeals = companies.filter(company => 
      ['접촉', '니즈파악', '제안/견적', '검토'].includes(company.status)
    ).length;
    const thisMonthContacts = contactHistory.filter(contact => {
      const contactDate = new Date(contact.contactDate);
      const now = new Date();
      return contactDate.getMonth() === now.getMonth() && contactDate.getFullYear() === now.getFullYear();
    }).length;

    return {
      totalCompanies,
      totalRevenue,
      activeDeals,
      thisMonthContacts
    };
  }, [companies, contactHistory]);

  const pipelineData = useMemo(() => {
    const statusCounts = {};
    companies.forEach(company => {
      statusCounts[company.status] = (statusCounts[company.status] || 0) + 1;
    });

    return [
      { name: '리드', value: statusCounts['리드'] || 0 },
      { name: '접촉', value: statusCounts['접촉'] || 0 },
      { name: '니즈파악', value: statusCounts['니즈파악'] || 0 },
      { name: '제안/견적', value: statusCounts['제안/견적'] || 0 },
      { name: '계약체결', value: statusCounts['계약체결'] || 0 }
    ];
  }, [companies]);

  const sourceData = useMemo(() => {
    const sourceCounts = {};
    companies.forEach(company => {
      sourceCounts[company.source] = (sourceCounts[company.source] || 0) + 1;
    });

    return Object.entries(sourceCounts).map(([name, value]) => ({ name, value }));
  }, [companies]);

  const activityData = useMemo(() => {
    const months = ['1월', '2월', '3월', '4월', '5월', '6월'];
    return months.map(month => ({
      month,
      newCustomers: Math.floor(Math.random() * 20) + 5,
      contacts: Math.floor(Math.random() * 50) + 10,
      deals: Math.floor(Math.random() * 10) + 2
    }));
  }, []);

  // 대시보드 메뉴 항목
  const dashboardSections = [
    { id: 'overview', label: '개요', icon: FiBarChart2 },
    { id: 'pipeline', label: '영업 파이프라인', icon: FiActivity },
    { id: 'source', label: '인입경로 분석', icon: FiPieChart },
    { id: 'activity', label: '영업활동 현황', icon: FiActivity },
    { id: 'needs', label: '니즈 분석', icon: FiCloud }
  ];

  const renderDashboardContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <>
            {/* 통계 카드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
              <StatsCard
                title="총 고객사"
                value={stats.totalCompanies}
                icon={FiUsers}
                color="bg-blue-500"
                change={{ positive: true, value: 12 }}
              />
              <StatsCard
                title="예상 매출"
                value={`${(stats.totalRevenue / 100000000).toFixed(1)}억원`}
                icon={FiDollarSign}
                color="bg-green-500"
                change={{ positive: true, value: 8 }}
              />
              <StatsCard
                title="진행 중인 영업"
                value={stats.activeDeals}
                icon={FiTrendingUp}
                color="bg-yellow-500"
                change={{ positive: false, value: 3 }}
              />
              <StatsCard
                title="이번 달 접촉"
                value={stats.thisMonthContacts}
                icon={FiCalendar}
                color="bg-purple-500"
                change={{ positive: true, value: 25 }}
              />
            </div>

            {/* 파이프라인 및 인입경로 차트 */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
              <PipelineChart data={pipelineData} />
              <SourceChart data={sourceData} />
            </div>

            {/* 미완료 약속/알람 */}
            <div className="grid grid-cols-1 gap-6">
              <TaskList tasks={tasks} onTaskComplete={onTaskComplete} />
            </div>
          </>
        );
      case 'pipeline':
        return (
          <div className="grid grid-cols-1 gap-6">
            <PipelineChart data={pipelineData} />
          </div>
        );
      case 'source':
        return (
          <div className="grid grid-cols-1 gap-6">
            <SourceChart data={sourceData} />
          </div>
        );
      case 'activity':
        return (
          <div className="grid grid-cols-1 gap-6">
            <ActivityChart data={activityData} />
          </div>
        );
      case 'needs':
        return (
          <div className="grid grid-cols-1 gap-6">
            <NeedsCloudChart companies={companies} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="p-4 lg:p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 대시보드 메뉴바 */}
      <motion.div 
        className="bg-white rounded-lg shadow-sm p-2 mb-6 overflow-x-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center space-x-1">
          {dashboardSections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                activeSection === section.id
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={section.icon} className="w-4 h-4" />
              <span>{section.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* 대시보드 콘텐츠 */}
      <AnimatedSection key={activeSection}>
        {renderDashboardContent()}
      </AnimatedSection>
    </motion.div>
  );
};

// 애니메이션 효과를 위한 래퍼 컴포넌트
const AnimatedSection = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export default Dashboard;