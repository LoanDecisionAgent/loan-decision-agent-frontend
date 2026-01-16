
"use client";

import React from 'react';
import { Link } from 'react-router-dom';

const Support: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-indigo-600 font-black text-sm">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            Back
          </Link>
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 rounded-full border border-emerald-100 dark:border-emerald-800">
             <span className="size-1.5 rounded-full bg-emerald-500"></span>
             <span className="text-[10px] font-black uppercase tracking-widest">All Systems Operational</span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">How can we help?</h1>
          <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto">Get the technical resources and engineering support you need to scale your lending operations.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            { title: 'API Reference', icon: 'menu_book', desc: 'Detailed endpoint specifications for scoring and batching.', link: '/docs' },
            { title: 'Direct Engineering', icon: 'terminal', desc: 'Priority Slack channel for technical integration partners.', link: '#' },
            { title: 'Knowledge Base', icon: 'psychology', desc: 'Understanding risk metrics, tiers, and SHAP explainability.', link: '#' },
          ].map(item => (
            <div key={item.title} className="bg-white dark:bg-slate-900 p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:scale-[1.03] transition-all">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 mb-8">
                <span className="material-symbols-outlined text-[32px]">{item.icon}</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4">{item.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed text-sm font-medium">{item.desc}</p>
              <Link to={item.link} className="text-xs font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-[0.2em] flex items-center gap-2">
                Launch
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-12 lg:p-16 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[120px] pointer-events-none"></div>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Open a Support Ticket</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-10 font-medium">Expected response time is under 4 hours for production issues.</p>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Work Email</label>
                  <input className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-sm font-medium focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none" placeholder="engineer@company.com" type="email" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Urgency</label>
                  <select className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-sm font-medium focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none appearance-none cursor-pointer">
                    <option>General Inquiry</option>
                    <option>API Bug Report</option>
                    <option>Production Incident (P1)</option>
                    <option>Billing / Account</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Message Detail</label>
                <textarea className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-5 text-sm font-medium h-40 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none resize-none" placeholder="Describe the issue or integration requirement..."></textarea>
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-600/30 transition-all active:scale-[0.98]">
                Submit Ticket
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;
