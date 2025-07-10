import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiX, FiEdit, FiPhone, FiMail, FiBuilding, FiUser, FiCalendar, FiDollarSign } = FiIcons;

const CompanyDetail = ({ company, contactHistory, tasks, onClose, onEdit }) => {
  const [activeTab, setActiveTab] = useState('info');

  const companyContacts = contactHistory.filter(contact => contact.companyId === company.id);
  const companyTasks = tasks.filter(task => task.companyId === company.id);

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
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SafeIcon icon={FiBuilding} className="w-8 h-8 text-primary-500" />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{company.name}</h2>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(company.status)}`}>
                  {company.status}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={() => onEdit(company)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SafeIcon icon={FiEdit} className="w-4 h-4" />
                <span>수정</span>
              </motion.button>
              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SafeIcon icon={FiX} className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex space-x-1 mb-6">
            {['info', 'contacts', 'tasks'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeTab === tab
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab === 'info' && '기본정보'}
                {tab === 'contacts' && '접촉이력'}
                {tab === 'tasks' && '약속/알람'}
              </motion.button>
            ))}
          </div>

          {activeTab === 'info' && (
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">회사 정보</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiBuilding} className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">업체명:</span>
                      <span className="text-sm font-medium">{company.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiUser} className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">유저수:</span>
                      <span className="text-sm font-medium">{company.users.toLocaleString()}명</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiDollarSign} className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">예상매출:</span>
                      <span className="text-sm font-medium">{(company.expectedRevenue / 10000).toLocaleString()}만원</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiCalendar} className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">등록일:</span>
                      <span className="text-sm font-medium">{format(new Date(company.createdAt), 'yyyy-MM-dd')}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">담당자 정보</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiUser} className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">담당자:</span>
                      <span className="text-sm font-medium">{company.contactName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiPhone} className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">연락처:</span>
                      <span className="text-sm font-medium">{company.contactPhone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiMail} className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">이메일:</span>
                      <span className="text-sm font-medium">{company.contactEmail}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">니즈</h3>
                <p className="text-sm text-gray-700">{company.needs}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">메모</h3>
                <p className="text-sm text-gray-700">{company.memo}</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'contacts' && (
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {companyContacts.map((contact, index) => (
                <motion.div
                  key={contact.id}
                  className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-800">{contact.method}</span>
                      <span className="text-xs text-gray-500">{format(new Date(contact.contactDate), 'yyyy-MM-dd HH:mm')}</span>
                    </div>
                    <span className="text-xs text-gray-500">{contact.assignee}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{contact.content}</p>
                  {contact.memo && (
                    <p className="text-xs text-gray-600 bg-white p-2 rounded border">{contact.memo}</p>
                  )}
                </motion.div>
              ))}
              {companyContacts.length === 0 && (
                <p className="text-center text-gray-500 py-8">접촉 이력이 없습니다.</p>
              )}
            </motion.div>
          )}

          {activeTab === 'tasks' && (
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {companyTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  className={`p-4 rounded-lg border ${
                    task.completed ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${
                        task.completed ? 'text-green-800' : 'text-yellow-800'
                      }`}>
                        {task.content}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {task.completed ? '완료' : '진행중'}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{task.assignee}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-600">
                    <span>약속일시: {format(new Date(task.dueDate), 'yyyy-MM-dd HH:mm')}</span>
                    <span>알람: {format(new Date(task.reminderDate), 'yyyy-MM-dd HH:mm')}</span>
                  </div>
                  {task.memo && (
                    <p className="text-xs text-gray-600 mt-2 bg-white p-2 rounded border">{task.memo}</p>
                  )}
                </motion.div>
              ))}
              {companyTasks.length === 0 && (
                <p className="text-center text-gray-500 py-8">약속/알람이 없습니다.</p>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CompanyDetail;