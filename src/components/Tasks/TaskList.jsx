import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPlus, FiEdit, FiCheck, FiClock, FiUser, FiBuilding } = FiIcons;

const TaskList = ({ tasks, onAdd, onEdit, onComplete }) => {
  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">약속/알람</h2>
          <motion.button
            onClick={onAdd}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            <span>약속/알람 추가</span>
          </motion.button>
        </div>
        
        <div className="flex space-x-2">
          {['all', 'pending', 'completed'].map((filterType) => (
            <motion.button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filter === filterType
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filterType === 'all' && '전체'}
              {filterType === 'pending' && '진행중'}
              {filterType === 'completed' && '완료'}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-4">
        {sortedTasks.map((task, index) => (
          <motion.div
            key={task.id}
            className={`p-4 rounded-lg border ${
              task.completed 
                ? 'bg-green-50 border-green-200' 
                : new Date(task.dueDate) < new Date() 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-white border-gray-200'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <SafeIcon icon={FiBuilding} className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">{task.companyName}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    task.completed 
                      ? 'bg-green-100 text-green-800' 
                      : new Date(task.dueDate) < new Date()
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.completed ? '완료' : new Date(task.dueDate) < new Date() ? '지연' : '진행중'}
                  </span>
                </div>
                
                <p className="text-sm text-gray-800 mb-2">{task.content}</p>
                
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiClock} className="w-3 h-3" />
                    <span>약속: {format(new Date(task.dueDate), 'MM/dd HH:mm')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiUser} className="w-3 h-3" />
                    <span>{task.assignee}</span>
                  </div>
                </div>
                
                {task.memo && (
                  <p className="text-xs text-gray-600 mt-2 bg-white p-2 rounded border">{task.memo}</p>
                )}
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <motion.button
                  onClick={() => onEdit(task)}
                  className="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SafeIcon icon={FiEdit} className="w-4 h-4" />
                </motion.button>
                
                {!task.completed && (
                  <motion.button
                    onClick={() => onComplete(task.id)}
                    className="p-2 text-green-600 hover:text-green-900 hover:bg-green-50 rounded"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <SafeIcon icon={FiCheck} className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        
        {sortedTasks.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              {filter === 'pending' && '진행 중인 약속/알람이 없습니다.'}
              {filter === 'completed' && '완료된 약속/알람이 없습니다.'}
              {filter === 'all' && '약속/알람이 없습니다.'}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TaskList;