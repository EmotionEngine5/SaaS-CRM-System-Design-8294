import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from './hooks/useLocalStorage';
import {
  companies as initialCompanies,
  contactHistory as initialContactHistory,
  tasks as initialTasks
} from './data/mockData';

// Layout Components
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';

// Feature Components
import Dashboard from './components/Dashboard/Dashboard';
import CompanyList from './components/Companies/CompanyList';
import CompanyForm from './components/Companies/CompanyForm';
import CompanyDetail from './components/Companies/CompanyDetail';
import ContactList from './components/Contacts/ContactList';
import TaskList from './components/Tasks/TaskList';

import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Local Storage 기반 데이터 관리
  const [companies, setCompanies] = useLocalStorage('crm-companies', initialCompanies);
  const [contactHistory, setContactHistory] = useLocalStorage('crm-contacts', initialContactHistory);
  const [tasks, setTasks] = useLocalStorage('crm-tasks', initialTasks);

  // Modal States
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [showCompanyDetail, setShowCompanyDetail] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Company Management
  const handleAddCompany = () => {
    setSelectedCompany(null);
    setShowCompanyForm(true);
  };

  const handleEditCompany = (company) => {
    setSelectedCompany(company);
    setShowCompanyForm(true);
  };

  const handleViewCompany = (company) => {
    setSelectedCompany(company);
    setShowCompanyDetail(true);
  };

  const handleSaveCompany = (companyData) => {
    if (selectedCompany) {
      // Update existing company
      setCompanies(companies.map(c => c.id === selectedCompany.id ? companyData : c));
    } else {
      // Add new company
      setCompanies([...companies, companyData]);
    }
    setShowCompanyForm(false);
    setSelectedCompany(null);
  };

  const handleTaskComplete = (taskId) => {
    setTasks(
      tasks.map(task => 
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
  };

  const handleAddContact = () => {
    // Contact form implementation would go here
    console.log('Add contact');
  };

  const handleEditContact = (contact) => {
    // Contact form implementation would go here
    console.log('Edit contact:', contact);
  };

  const handleViewContact = (contact) => {
    // Contact detail implementation would go here
    console.log('View contact:', contact);
  };

  const handleAddTask = () => {
    // Task form implementation would go here
    console.log('Add task');
  };

  const handleEditTask = (task) => {
    // Task form implementation would go here
    console.log('Edit task:', task);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            companies={companies}
            contactHistory={contactHistory}
            tasks={tasks}
            onTaskComplete={handleTaskComplete}
          />
        );
      case 'companies':
        return (
          <CompanyList
            companies={companies}
            searchTerm={searchTerm}
            onAdd={handleAddCompany}
            onEdit={handleEditCompany}
            onView={handleViewCompany}
          />
        );
      case 'contacts':
        return (
          <ContactList
            contacts={contactHistory}
            onAdd={handleAddContact}
            onEdit={handleEditContact}
            onView={handleViewContact}
          />
        );
      case 'tasks':
        return (
          <TaskList
            tasks={tasks}
            onAdd={handleAddTask}
            onEdit={handleEditTask}
            onComplete={handleTaskComplete}
          />
        );
      case 'reports':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">리포트</h2>
            <p className="text-gray-600">리포트 기능이 곧 추가될 예정입니다.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">설정</h2>
            <p className="text-gray-600">설정 기능이 곧 추가될 예정입니다.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 사이드바 - 데스크톱에서는 항상 표시, 모바일에서는 토글 */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* 메인 콘텐츠 영역 */}
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-64">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* 모달들 */}
      <AnimatePresence>
        {showCompanyForm && (
          <CompanyForm
            company={selectedCompany}
            onSave={handleSaveCompany}
            onCancel={() => {
              setShowCompanyForm(false);
              setSelectedCompany(null);
            }}
          />
        )}
        {showCompanyDetail && selectedCompany && (
          <CompanyDetail
            company={selectedCompany}
            contactHistory={contactHistory}
            tasks={tasks}
            onClose={() => {
              setShowCompanyDetail(false);
              setSelectedCompany(null);
            }}
            onEdit={(company) => {
              setShowCompanyDetail(false);
              handleEditCompany(company);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;