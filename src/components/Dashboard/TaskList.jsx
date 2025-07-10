import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiClock, FiUser, FiBuilding } = FiIcons;

const TaskList = ({ tasks, onTaskComplete }) => {
  const pendingTasks = tasks.filter(task => !task.completed).slice(0, 5);

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">미완료 약속/알람</h3>
      <div className="space-y-3">
        {pendingTasks.map((task, index) => (
          <motion.div
            key={task.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <SafeIcon icon={FiBuilding} className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">{task.companyName}</span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{task.content}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiClock} className="w-3 h-3" />
                  <span>{format(new Date(task.dueDate), 'MM/dd HH:mm')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiUser} className="w-3 h-3" />
                  <span>{task.assignee}</span>
                </div>
              </div>
            </div>
            <motion.button
              onClick={() => onTaskComplete(task.id)}
              className="ml-4 px-3 py-1 bg-primary-500 text-white rounded text-xs hover:bg-primary-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              완료
            </motion.button>
          </motion.div>
        ))}
        {pendingTasks.length === 0 && (
          <p className="text-gray-500 text-center py-4">완료되지 않은 약속이 없습니다.</p>
        )}
      </div>
    </motion.div>
  );
};

export default TaskList;