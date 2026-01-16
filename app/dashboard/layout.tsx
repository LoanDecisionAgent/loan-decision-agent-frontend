
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../layout';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, toggleDarkMode, isDarkMode } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <Sidebar user={user} onLogout={logout} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header user={user} toggleDarkMode={toggleDarkMode} onMenuClick={() => setIsSidebarOpen(true)} isDarkMode={isDarkMode} />
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
