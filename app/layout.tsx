
"use client";

import React, { useState, useEffect, createContext, useContext } from 'react';
import '../globals.css';
import { User, UserRole } from '../types';

interface UserContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(isDark);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode, mounted]);

  const login = (role: UserRole) => {
    const mockUser: User = {
      id: role === UserRole.ADMIN ? 'u-admin' : 'u-vendor',
      name: role === UserRole.ADMIN ? 'Alex Morgan' : 'Jordan Smith',
      email: role === UserRole.ADMIN ? 'admin@engine.io' : 'jordan@acme.com',
      role,
      organization: role === UserRole.ADMIN ? 'Fintech Core' : 'Acme Corp',
      avatar: `https://picsum.photos/seed/${role}/100/100`
    };
    setUser(mockUser);
  };

  const logout = () => setUser(null);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  if (!mounted) return null;

  return (
    <html lang="en" className={isDarkMode ? 'dark' : ''}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white dark:bg-slate-950 font-display transition-colors duration-200 selection:bg-indigo-100 dark:selection:bg-indigo-900/40">
        <UserContext.Provider value={{ user, login, logout, isDarkMode, toggleDarkMode }}>
          {children}
        </UserContext.Provider>
      </body>
    </html>
  );
}
