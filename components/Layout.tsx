
import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { User } from '../types';

interface LayoutProps {
  user: User | null;
  onLogout: () => void;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout, toggleDarkMode, isDarkMode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!user) return <Navigate to="/login" replace />;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar 
        user={user} 
        onLogout={onLogout} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header 
          user={user} 
          toggleDarkMode={toggleDarkMode} 
          onMenuClick={toggleSidebar} 
          isDarkMode={isDarkMode}
        />
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
