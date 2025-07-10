import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiBell, FiSearch, FiUser, FiMenu } = FiIcons;

const Header = ({ searchTerm, setSearchTerm, onMenuClick }) => {
  return (
    <motion.div 
      className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        {/* 왼쪽 영역 */}
        <div className="flex items-center space-x-4">
          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <SafeIcon icon={FiMenu} className="w-5 h-5 text-gray-600" />
          </button>

          {/* 검색창 */}
          <div className="relative hidden sm:block">
            <SafeIcon 
              icon={FiSearch} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
            />
            <input
              type="text"
              placeholder="고객사명, 담당자명, 연락처로 검색..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64 lg:w-96"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* 오른쪽 영역 */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* 모바일 검색 버튼 */}
          <motion.button
            className="sm:hidden p-2 rounded-lg hover:bg-gray-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiSearch} className="w-5 h-5 text-gray-600" />
          </motion.button>
          
          {/* 알림 버튼 */}
          <motion.button
            className="p-2 rounded-lg hover:bg-gray-100 relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiBell} className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </motion.button>

          {/* 프로필 버튼 */}
          <motion.button
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiUser} className="w-5 h-5 text-primary-600" />
            </div>
            <span className="text-sm text-gray-700 hidden sm:block">관리자</span>
          </motion.button>
        </div>
      </div>
      
      {/* 모바일 검색창 */}
      <div className="mt-4 sm:hidden">
        <div className="relative">
          <SafeIcon 
            icon={FiSearch} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
          />
          <input
            type="text"
            placeholder="검색..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Header;