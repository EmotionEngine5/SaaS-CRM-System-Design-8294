import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiEdit, FiEye, FiPhone, FiMail, FiPlus } = FiIcons;

const CompanyList = ({ companies, searchTerm, onEdit, onView, onAdd }) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.contactPhone.includes(searchTerm) ||
    company.contactEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      '리드': 'bg-gray-100 text-gray-800',
      '접촉': 'bg-blue-100 text-blue-800',
      '니즈파악': 'bg-yellow-100 text-yellow-800',
      '제안/견적': 'bg-purple-100 text-purple-800',
      '검토': 'bg-orange-100 text-orange-800',
      '계약체결': 'bg-green-100 text-green-800',
      '실패': 'bg-red-100 text-red-800',
      '보류': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md border border-gray-200 mx-4 lg:mx-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 lg:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-800">고객사 관리</h2>
          <motion.button
            onClick={onAdd}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 w-full sm:w-auto justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            <span>고객사 추가</span>
          </motion.button>
        </div>
      </div>

      {/* 모바일 카드 뷰 */}
      <div className="block lg:hidden">
        <div className="p-4 space-y-4">
          {sortedCompanies.map((company, index) => (
            <motion.div
              key={company.id}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{company.name}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(company.status)} mt-1`}>
                    {company.status}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={() => onView(company)}
                    className="text-primary-600 hover:text-primary-900 p-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <SafeIcon icon={FiEye} className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    onClick={() => onEdit(company)}
                    className="text-indigo-600 hover:text-indigo-900 p-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <SafeIcon icon={FiEdit} className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">유저수</p>
                  <p className="font-medium">{company.users.toLocaleString()}명</p>
                </div>
                <div>
                  <p className="text-gray-600">예상매출</p>
                  <p className="font-medium">{(company.expectedRevenue / 10000).toLocaleString()}만원</p>
                </div>
                <div>
                  <p className="text-gray-600">담당자</p>
                  <p className="font-medium">{company.contactName}</p>
                </div>
                <div>
                  <p className="text-gray-600">인입경로</p>
                  <p className="font-medium">{company.source}</p>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                  <SafeIcon icon={FiPhone} className="w-3 h-3 mr-1" />
                  <span className="mr-4">{company.contactPhone}</span>
                  <span className="text-xs">{format(new Date(company.createdAt), 'yyyy-MM-dd')}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 데스크톱 테이블 뷰 */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                업체명
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                영업상태
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('users')}
              >
                유저수
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('expectedRevenue')}
              >
                예상매출
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                담당자
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                인입경로
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                등록일
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                액션
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedCompanies.map((company, index) => (
              <motion.tr
                key={company.id}
                className="hover:bg-gray-50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{company.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(company.status)}`}>
                    {company.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {company.users.toLocaleString()}명
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {(company.expectedRevenue / 10000).toLocaleString()}만원
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{company.contactName}</div>
                  <div className="text-sm text-gray-500 flex items-center space-x-2">
                    <SafeIcon icon={FiPhone} className="w-3 h-3" />
                    <span>{company.contactPhone}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {company.source}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {format(new Date(company.createdAt), 'yyyy-MM-dd')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <motion.button
                      onClick={() => onView(company)}
                      className="text-primary-600 hover:text-primary-900"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <SafeIcon icon={FiEye} className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => onEdit(company)}
                      className="text-indigo-600 hover:text-indigo-900"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <SafeIcon icon={FiEdit} className="w-4 h-4" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedCompanies.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">검색 결과가 없습니다.</p>
        </div>
      )}
    </motion.div>
  );
};

export default CompanyList;