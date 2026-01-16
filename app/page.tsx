
"use client";

import React from 'react';
import { Link } from 'react-router-dom';

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
            <Link to="/docs" className="hidden md:block text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Documentation</Link>
            <Link to="/login" className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-black hover:scale-105 transition-all">
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-32">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 dark:text-white mb-8 leading-[0.9]">
              Decisions <span className="text-indigo-600">at scale.</span>
            </h1>
            <p className="text-2xl text-slate-500 dark:text-slate-400 leading-relaxed mb-12">
              The lightweight alternative to enterprise scoring engines. Built for modern fintech developers who value speed, auditability, and ease of integration.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup" className="bg-indigo-600 text-white h-14 px-10 rounded-2xl font-black text-lg flex items-center gap-2 shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all">
                Get Started Free
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link to="/support" className="border border-slate-200 dark:border-slate-800 h-14 px-10 rounded-2xl font-black text-lg flex items-center hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
                Talk to Sales
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-slate-100 dark:border-slate-800 pt-20">
            {features.map(f => (
              <div key={f.title} className="group">
                <div className="mb-6 h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <span className="material-symbols-outlined">{f.icon}</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">{f.title}</h3>
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
              <Link to="/privacy" className="hover:text-indigo-600 transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-indigo-600 transition-colors">Terms</Link>
              <Link to="/support" className="hover:text-indigo-600 transition-colors">Support</Link>
              <Link to="/docs" className="hover:text-indigo-600 transition-colors">API Docs</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
