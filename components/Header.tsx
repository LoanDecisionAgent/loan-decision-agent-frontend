
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from '../types';

interface HeaderProps {
  user: User;
  toggleDarkMode: () => void;
  onMenuClick?: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleDarkMode, onMenuClick, isDarkMode }) => {
  const pathname = usePathname();

  const getPageConfig = () => {
    const configs: Record<string, string> = {
      '/dashboard': 'Overview',
      '/dashboard/batch-upload': 'Batch Submission',
      '/dashboard/request-logs': 'Live Requests',
      '/dashboard/vendors': 'Vendor Management',
      '/dashboard/audit-logs': 'System Audits',
      '/dashboard/api-keys': 'Authentication Keys',
      '/dashboard/feedback': 'Model Feedback',
      '/dashboard/docs': 'Documentation',
      '/docs': 'API Documentation',
      '/privacy': 'Privacy Policy',
      '/terms': 'Terms of Service',
      '/support': 'Support',
      '/contact': 'Contact Us',
    };
    return configs[pathname || ''] || 'Dashboard';
  };

  const breadcrumbs = (pathname || '')
    .split('/')
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' '));

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 md:px-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden flex items-center justify-center h-10 w-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        <div className="flex flex-col">
          <h2 className="text-slate-900 dark:text-white text-lg font-black leading-tight tracking-tight">
            {getPageConfig()}
          </h2>
          <nav className="hidden sm:flex items-center gap-1.5 text-[10px] text-slate-400 uppercase font-black tracking-widest">
             {(pathname?.startsWith('/dashboard') || pathname === '/') && (
               <>
                 <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">Portal</Link>
                 {breadcrumbs.length > 0 && <span>/</span>}
                 {breadcrumbs.filter(b => b.toLowerCase() !== 'dashboard').join(' / ')}
               </>
             )}
             {pathname?.startsWith('/dashboard') === false && pathname !== '/' && (
               <>
                 <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
                 {breadcrumbs.length > 0 && <span>/</span>}
                 {breadcrumbs.join(' / ')}
               </>
             )}
          </nav>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={toggleDarkMode}
          className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-700 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>
        <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-indigo-600 transition-all relative">
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
