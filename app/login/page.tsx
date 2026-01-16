
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '../layout';
import { UserRole } from '../../types';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useUser();
  const router = useRouter();

  const handleAuth = (role: UserRole) => {
    login(role);
    router.push('/dashboard');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const role = email.toLowerCase().includes('admin') ? UserRole.ADMIN : UserRole.VENDOR;
    handleAuth(role);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <main className="w-full max-w-[420px] flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center gap-3">
          <Link href="/" className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 mb-2">
            <span className="material-symbols-outlined text-[36px]">account_balance</span>
          </Link>
          <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">LoanDecision</h1>
          <p className="text-slate-500 text-sm font-medium">Authentication Portal</p>
        </div>

        <div className="w-full rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Identity / Email</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-slate-400">mail</span>
                  <input 
                    className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all outline-none"
                    type="email" placeholder="name@company.com" required
                    value={email} onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Secret Key</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-slate-400">lock</span>
                  <input 
                    className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-12 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all outline-none"
                    type={showPassword ? 'text' : 'password'} placeholder="••••••••" required
                    value={password} onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600">
                    <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility' : 'visibility_off'}</span>
                  </button>
                </div>
              </div>

              <button type="submit" className="h-14 w-full rounded-2xl bg-indigo-600 text-white font-black shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all active:scale-[0.98]">
                Sign In
              </button>
            </form>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800/30 px-10 py-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-sm text-slate-500 font-medium">
              New partner? <Link href="/signup" className="font-black text-indigo-600 hover:underline">Get Access</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
