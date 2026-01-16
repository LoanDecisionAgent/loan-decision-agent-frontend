
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  if (!user) {
    router.push('/login');
    return null;
  }

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
          {/* Children would go here in App Router */}
        </div>
      </main>
    </div>
  );
};

export default Layout;
