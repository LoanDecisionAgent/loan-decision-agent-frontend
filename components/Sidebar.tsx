
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, UserRole } from '../types';

interface SidebarProps {
  user: User;
  onLogout: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, onLogout, isOpen, onClose }) => {
  const isAdmin = user.role === UserRole.ADMIN;
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
    ...(isAdmin 
      ? [
          { label: 'Vendors', icon: 'group', path: '/vendors' },
          { label: 'Audit Logs', icon: 'history', path: '/audit-logs' },
          { label: 'API Keys', icon: 'vpn_key', path: '/api-keys' },
        ]
      : [
          { label: 'Batch Processing', icon: 'upload_file', path: '/batch-upload' },
          { label: 'Request Logs', icon: 'history', path: '/request-logs' },
          { label: 'Feedback', icon: 'dashboard/feedback', path: '/feedback' },
        ]
    ),
    { label: 'Documentation', icon: 'description', path: '/docs' },
  ];

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shrink-0 transform transition-transform duration-300 ease-in-out
      md:relative md:translate-x-0 
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="flex h-full flex-col justify-between p-4">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg">
                <span className="material-symbols-outlined">token</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm font-bold text-slate-900 dark:text-white">LoanDecision</h1>
                <p className="text-xs font-medium text-indigo-600">{isAdmin ? 'Admin' : 'Vendor'}</p>
              </div>
            </div>
            <button onClick={onClose} className="md:hidden text-slate-400 hover:text-slate-600">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400 font-semibold' 
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-100 dark:border-slate-800 pt-4">
          <div className="flex items-center gap-3 px-2">
            <img src={user.avatar} alt="Profile" className="h-10 w-10 rounded-full object-cover" />
            <div className="flex flex-col overflow-hidden">
              <p className="text-sm font-semibold truncate text-slate-900 dark:text-white">{user.name}</p>
              <p className="text-xs text-slate-500 truncate">{user.organization}</p>
            </div>
          </div>
          <button onClick={onLogout} className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-red-600 text-sm font-medium">
            <span className="material-symbols-outlined text-[20px]">logout</span> Log Out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
