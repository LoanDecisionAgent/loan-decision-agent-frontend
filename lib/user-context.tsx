"use client";

import React, { useState, useEffect, createContext, useContext } from 'react';
import { User } from '../types';
import { login as apiLogin, getMe, register as apiRegister } from './api';
import { useRouter } from 'next/navigation';

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: import('../types').RegisterRequest) => Promise<void>;
  logout: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(isDark);

    // Check for existing token
    const token = localStorage.getItem('token');
    if (token) {
      getMe()
        .then(userData => {
          setUser(userData);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
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

  const login = async (email: string, password: string) => {
    try {
      const response = await apiLogin({ email, password });
      localStorage.setItem('token', response.access_token);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: import('../types').RegisterRequest) => {
    try {
      const response = await apiRegister(data);
      localStorage.setItem('token', response.access_token);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  if (!mounted) return null;

  return (
    <UserContext.Provider value={{ user, login, register, logout, isDarkMode, toggleDarkMode, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}