
"use client";

import React from 'react';
import Link from 'next/link';

const features = [
  { title: 'Sub-100ms Scoring', icon: 'bolt', desc: 'Real-time decisioning for synchronous user flows.' },
  { title: 'Asynchronous Batching', icon: 'folder_zip', desc: 'Process massive historical datasets with high throughput.' },
  { title: 'Regulatory Compliance', icon: 'verified_user', desc: 'Built-in SHAP explanation values for model transparency.' },
  { title: 'Partner Management', icon: 'hub', desc: 'Granular API controls for third-party vendors and agents.' },
];

export default function LandingPage() {
  const currentYear = 2025;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <nav className="sticky top-0 z-50 w-full border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-600/20">
              <span className="material-symbols-outlined text-[24px]">dataset</span>
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">LoanDecision</span>
          </div>
          <div className="flex items-center gap-8">
            <Link href="/docs" className="hidden md:block text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors hover:underline">API Docs</Link>
            <Link href="/contact" className="hidden md:block text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors hover:underline">Contact</Link>
            <Link href="/login" className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-black hover:scale-105 transition-all">
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-32 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 dark:text-white mb-8 leading-[0.9] animate-slide-in-left">
              Decisions <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">at scale.</span>
            </h1>
            <p className="text-2xl text-slate-500 dark:text-slate-400 leading-relaxed mb-12 animate-slide-in-right">
              The lightweight alternative to enterprise scoring engines. Built for modern fintech developers who value speed, auditability, and ease of integration.
            </p>
            <div className="flex flex-wrap gap-4 animate-scale-in">
              <Link href="/score" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white h-14 px-10 rounded-2xl font-black text-lg flex items-center gap-2 shadow-2xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-105 active:scale-100 transition-all hover-lift">
                Get Started
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link href="/login" className="border-2 border-slate-200 dark:border-slate-800 h-14 px-10 rounded-2xl font-black text-lg flex items-center hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover-lift">
                Dashboard
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-slate-100 dark:border-slate-800 pt-20">
            {features.map((f, index) => (
              <div key={f.title} className="group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="mb-6 h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:text-white transition-all shadow-lg group-hover:shadow-xl group-hover:scale-110">
                  <span className="material-symbols-outlined text-[28px]">{f.icon}</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{f.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-16 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1 bg-slate-900 rounded text-white"><span className="material-symbols-outlined text-[16px]">dataset</span></div>
                <span className="font-black text-slate-900 dark:text-white">LoanDecisionAgent</span>
              </div>
              <p className="text-sm text-slate-500">© {currentYear} Fintech Core Engine. All rights reserved.</p>
            </div>
            <nav className="flex gap-10 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              <Link href="/privacy" className="hover:text-indigo-600 transition-colors hover:underline">Privacy</Link>
              <Link href="/terms" className="hover:text-indigo-600 transition-colors hover:underline">Terms</Link>
              <Link href="/support" className="hover:text-indigo-600 transition-colors hover:underline">Support</Link>
              <Link href="/contact" className="hover:text-indigo-600 transition-colors hover:underline">Contact</Link>
              <Link href="/docs" className="hover:text-indigo-600 transition-colors hover:underline">API Docs</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
