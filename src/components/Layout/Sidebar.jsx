import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiHome, FiUsers, FiPhone, FiCalendar, FiSettings, FiBarChart3, FiX } = FiIcons;

const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: '대시보드', icon: FiHome },
    { id: 'companies', label: '고객사 관리', icon: FiUsers },
    { id: 'contacts', label: '접촉 이력', icon: FiPhone },
    { id: 'tasks', label: '약속/알람', icon: FiCalendar },
    { id: 'reports', label: '리포트', icon: FiBarChart3 },
    { id: 'settings', label: '설정', icon: FiSettings }
  ];

  return (
    <>
      {/* 모바일 오버레이 */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 사이드바 */}
      <motion.div
        className={`fixed z-50 w-64 bg-white shadow-lg h-full flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } transition-transform duration-300 ease-in-out lg:transform-none`}
        initial={false}
        animate={{ x: isOpen ? 0 : -256 }}
        transition={{ duration: 0.3 }}
      >
        {/* 헤더 */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-black">EmotionEngineCRM</h1>
              <p className="text-sm text-gray-600">영업관리 시스템</p>
            </div>
            {/* 모바일 닫기 버튼 */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <SafeIcon icon={FiX} className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 네비게이션 */}
        <nav className="flex-1 p-4 overflow-y-auto">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpen(false); // 모바일에서 메뉴 선택 시 사이드바 닫기
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                activeTab === item.id
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <SafeIcon icon={item.icon} className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          ))}
        </nav>

        {/* 푸터 */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            <p>버전 1.0.0</p>
            <p>© 2024 EmotionEngine</p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;